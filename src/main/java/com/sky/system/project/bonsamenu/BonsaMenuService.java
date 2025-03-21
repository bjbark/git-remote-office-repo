package com.sky.system.project.bonsamenu;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class BonsaMenuService extends DefaultServiceHandler {

//	final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**********************************************************************************************
	 * 화면 리스트 조회
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception { // @ReleaseToken
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		data.param // 집계문 입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select a.hq_id   ,  a.hq_gb,  a.hq_nm   , a.hq_sts   							")
//			.query("    ,  (select corp_nm  from company where corp_id  = a.corp_id  ) as corp_nm	")
			.query("    ,  null as corp_nm															")
			.query("    ,  'N' as hq_ver   														 	")
		;
		data.param // 조건문 입력
			.where("from   head_office a				")
			.where("where  a.row_sts < 2				")
			.where("and    a.hq_sts in ('0000', '1000')	")
//			.where("and    a.hq_ver in (  'N' , '8'   ) ")
//			.where("and    a.pjt_id in ( '0', '0000015530') ")
			.where("and    a.hq_nm like  %:hq_nm%     ", arg.getParameter("hq_nm" ))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}

	}

	/**********************************************************************************************
	 * 사원 리스트 조회
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultMap getDetail(HttpRequestArgument arg ) throws Exception { // @ReleaseToken
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

//		String[]  = {"system", "supply" };
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select a.menu_id																				")
			.query("     , concat(case when a.adpt_cmpy_name = '메뉴' then ''										")
			.query("                   else case when substring(a.adpt_cmpy_name,1,1) = '(' then a.adpt_cmpy_name	")
			.query("                             else case when a.adpt_cmpy_name = '' then ''						")
			.query("                                       else concat( '(',a.adpt_cmpy_name,')') 					")
			.query("                                  end 															")
			.query("                        end 																	")
			.query("              end ,a.menu_nm) as menu_nm														")
			.query("     , a.last_modl_yn  , a.tree_expn_yn, a.prnt_id												")
			.query("     , (case when b.menu_id is null then '0' else '1' end) as active_yn							")
			.query("     , :hq_id as hq_id , null as site_id  , a.usr_memo											")
			.query("	 , a.hq_use_yn     , a.dm_use_yn, a.branch_use_yn											")
			.query("     , a.row_sts																				")
			.query("     , case when a.row_sts = 0 or last_modl_yn = 0 then '0'										")
			.query("            else case when b.menu_id is null then '1' else '0' end								")
			.query("       end as hidden_yn																			")
			.query("     , a.adpt_cmpy_name, a.cntr,a.base,a.ejac,a.prjt,a.gnrl,a.smli,a.clss						")
			.query("     , a.char_numb     , a.pcmt																	")
			.query("     , concat(a.modl_id , '.' , modl_nm) as source_path											")
		;
		data.param
			.where("from     module_mst a 						")
			.where("         left outer join hq_menu b          ")
			.where("              on  b.menu_id   = a.menu_id  	")
			.where("              and b.hq_id     = :hq_id 	", arg.fixParameter("hq_id" ))
			.where("order by a.row_lvl, a.row_ord               ")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage read = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		for(SqlResultRow row:map){
			if ("0".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 0. 삭제 */
				data.param
					.table("hq_menu										")
					.where("where hq_id     = :hq_id					")
					.where("and   menu_id   = :menu_id					")

					.unique("hq_id"            , row.fixParameter("hq_id"))
					.unique("menu_id"          , row.fixParameter("menu_id"))

				;data.attach(Action.delete);

				//------------------------
				// 실서버 데이터를 정리 한다.
				//------------------------
				data.param
					.table("menu_mst									")
					.where("where hq_id    = :hq_id   					")
					.where("and   menu_id  = :menu_id   				")
					.unique("hq_id"   , row.fixParameter("hq_id"))
					.unique("menu_id" , row.fixParameter("menu_id"     ))
				;data.attach(Action.delete , row.fixParamText("hq_id") + ".POS" );

			} else
			if ("1".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 1. 신규/수정 */
				data.param
					.table("hq_menu")
					.where("where	 hq_id     = :hq_id   					")
					.where("and	  	 menu_id   = :menu_id   				")

					.unique("hq_id"         	, row.fixParameter("hq_id"    ))
					.unique("menu_id"       	, row.fixParameter("menu_id"  ))

					.update("site_id" 	    	, row.getParameter("site_id"  ))

					.update("row_sts"       	, 0							   )
					.update("upt_nm" 	    	, row.getParameter("upt_nm"	))
					.insert("crt_nm" 	    	, row.getParameter("crt_nm"	))
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);

				//------------------------
				// 실서버 데이터를 등록한다.
				//------------------------
				read.clear();
				read.param
					.query("select a.menu_id       , a.menu_nm      , a.menu_gb							")
					.query("	 , a.tree_expn_yn  , a.last_modl_yn , a.modl_id    , a.modl_nm			")
		//			.query("	 , case when a.prnt_id = '0000014821' then 'system' else a.prnt_id end as prnt_id ")
					.query("	 ,  a.prnt_id      , a.find_nm											")
					.query("	 , a.inpt_use_yn   , a.upt_use_yn   , a.del_use_yn						")
					.query("	 , a.prt_use_yn    , a.expt_use_yn  , a.inq_use_yn						")
					.query("     , a.row_sts       , a.row_lvl      , a.row_ord , a.usr_memo			")
					.query("     , a.admin_use	   , a.auth_gb      , a.pjt_id	, a.row_clos			")
					.query("     , a.hq_use_yn     , a.dm_use_yn    , a.branch_use_yn					")
					.query("     , a.adpt_cmpy_name, a.cntr,a.base,a.ejac,a.prjt,a.gnrl,a.smli,a.clss	")
					.query("     , a.char_numb     , a.pcmt												")
					.where("from   module_mst a															")
					.where("where  a.menu_id = :menu_id "  , row.getParamText("menu_id" ))
				;
				for(SqlResultRow sub:read.selectForMap()){
					data.param
						.table("menu_mst")
						.where("where	 hq_id    = :hq_id   								")
						.where("and      menu_id  = :menu_id                                ")
						//
						.unique("menu_id"           , sub.fixParameter("menu_id"         ))
						.unique("hq_id"             , row.fixParameter("hq_id"           ))
						.update("menu_nm"           , sub.getParamText("menu_nm"         ))
						.update("pjt_id"            , sub.getParamText("pjt_id"          ))
						.update("tree_expn_yn"      , sub.getParameter("tree_expn_yn"    ))
						.update("last_modl_yn"      , sub.getParameter("last_modl_yn"    ))
						.update("modl_id"       	, sub.getParamText("modl_id"         ))
						.update("modl_nm"       	, sub.getParamText("modl_nm"         ))

						.update("inpt_use_yn"       , sub.getParameter("inpt_use_yn"     ))
						.update("upt_use_yn"        , sub.getParameter("upt_use_yn"      ))
						.update("del_use_yn"        , sub.getParameter("del_use_yn"      ))
						.update("prt_use_yn"        , sub.getParameter("prt_use_yn"      ))
						.update("expt_use_yn"       , sub.getParameter("expt_use_yn"     ))
						.update("auth_gb"           , sub.getParameter("auth_gb"         ))

						.update("hq_use_yn"         , sub.getParameter("hq_use_yn"       ))
						.update("dm_use_yn"         , sub.getParameter("dm_use_yn"       ))
						.update("branch_use_yn"     , sub.getParameter("branch_use_yn"   ))

						.update("adpt_cmpy_name"    , row.getParameter("adpt_cmpy_name"  ))
						.update("cntr"              , row.getParameter("cntr"            ))
						.update("base"              , row.getParameter("base"            ))
						.update("ejac"              , row.getParameter("ejac"            ))
						.update("prjt"              , row.getParameter("prjt"            ))
						.update("gnrl"              , row.getParameter("gnrl"            ))
						.update("smli"              , row.getParameter("smli"            ))
						.update("char_numb"         , row.getParameter("char_numb"       ))
						.update("pcmt"              , row.getParameter("pcmt"            ))

						.update("find_nm"           , sub.getParamText("find_nm"         ))
						.update("usr_memo"          , sub.getParamText("usr_memo"        ))
						.update("sys_memo"          , sub.getParamText("complited"       ))
						.update("prnt_id"           , sub.getParameter("prnt_id"         ))
						.update("row_ord"           , sub.getParameter("row_ord"         ))
						.update("row_lvl"           , sub.getParameter("row_lvl"         ))
						.update("row_sts"           , sub.getParameter("row_sts"         ))
						.update("row_clos"          , sub.getParameter("row_clos"        ))
						.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.modify , row.fixParamText("hq_id") + ".POS" );
				}
			}
		}
		data.execute();
		return null ;
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setResync(HttpRequestArgument arg ) throws Exception {
		DataMessage read = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data = new DataMessage(arg.fixParamText("hq_id") + ".POS" );

//		String[] usesite = {"system", "supply" };
//		String dbms = "MSSQL";
		if ("N1000BONIF".equals(arg.fixParameter("hq_id"))){
//           dbms = "ORACLE";
		}

		/* 메뉴 정보를 넘긴다. */
		read.clear();
		read.param
			.query("select a.menu_id       , a.menu_nm      , a.menu_gb							")
			.query("	 , a.menu_nm_englh , a.menu_nm_chi  , a.menu_nm_jpns , a.menu_nm_etc	")
			.query("	 , a.tree_expn_yn  , a.last_modl_yn , a.modl_id      , a.modl_nm		")
			.query("	 , a.prnt_id       , a.find_nm											")
			.query("	 , a.inpt_use_yn   , a.upt_use_yn   , a.del_use_yn 						")
			.query("	 , a.prt_use_yn    , a.expt_use_yn  , a.inq_use_yn						")
			.query("     , a.row_sts       , a.row_lvl      , a.row_ord      , a.usr_memo		")
			.query("     , a.admin_use	   , a.auth_gb      , a.pjt_id       , a.row_clos		")
			.query("     , a.hq_use_yn     , a.dm_use_yn    , a.branch_use_yn					")
			.query("     , a.adpt_cmpy_name, a.cntr,a.base,a.ejac,a.prjt,a.gnrl,a.smli,a.clss	")
			.query("     , a.char_numb     , a.pcmt												")
			.query("from   module_mst a															")
			.query("       join hq_menu b														")
			.query("            on  b.menu_id  = a.menu_id and b.hq_id = :hq_id	" , arg.fixParameter("hq_id" ))
		;

		for(SqlResultRow row:read.selectForMap()){
			if ("0".equals(row.getParamText("row_sts"))) {
				data.param
					.table("menu_mst")
					.where("where menu_id  = :menu_id  " )
					//
					.unique("menu_id"           , row.fixParameter("menu_id"         ))
					.unique("hq_id"             , arg.fixParameter("hq_id"           ))   // 17.04.09 추가
					.update("menu_nm"           , row.getParamText("menu_nm"         ))
					.update("menu_nm_englh"     , row.getParamText("menu_nm_englh"   ))
					.update("menu_nm_chi"       , row.getParamText("menu_nm_chi"     ))
					.update("menu_nm_jpns"      , row.getParamText("menu_nm_jpns"    ))
					.update("menu_nm_etc"       , row.getParamText("menu_nm_etc"     ))
					.update("pjt_id"            , row.getParamText("pjt_id"          ))
					.update("tree_expn_yn"      , row.getParameter("tree_expn_yn"    ))
					.update("last_modl_yn"      , row.getParameter("last_modl_yn"    ))
					.update("modl_id"       	, row.getParamText("modl_id"         ))
					.update("modl_nm"       	, row.getParamText("modl_nm"         ))

					.update("inpt_use_yn"       , row.getParameter("inpt_use_yn"     ))
					.update("upt_use_yn"        , row.getParameter("upt_use_yn"      ))
					.update("del_use_yn"        , row.getParameter("del_use_yn"      ))
					.update("prt_use_yn"        , row.getParameter("prt_use_yn"      ))
					.update("expt_use_yn"       , row.getParameter("expt_use_yn"     ))
					.update("auth_gb"           , row.getParameter("auth_gb"         ))

					.update("admin_use"         , row.getParameter("admin_use"       ))
					.update("hq_use_yn"         , row.getParameter("hq_use_yn"       ))
					.update("dm_use_yn"         , row.getParameter("dm_use_yn"       ))
					.update("branch_use_yn"     , row.getParameter("branch_use_yn"   ))

					.update("adpt_cmpy_name"    , row.getParameter("adpt_cmpy_name"  ))
					.update("cntr"              , row.getParameter("cntr"            ))
					.update("base"              , row.getParameter("base"            ))
					.update("ejac"              , row.getParameter("ejac"            ))
					.update("prjt"              , row.getParameter("prjt"            ))
					.update("gnrl"              , row.getParameter("gnrl"            ))
					.update("smli"              , row.getParameter("smli"            ))
					.update("char_numb"         , row.getParameter("char_numb"       ))
					.update("pcmt"              , row.getParameter("pcmt"            ))

					.update("find_nm"           , row.getParamText("find_nm"         ))
					.update("usr_memo"          , row.getParamText("usr_memo"        ))
					.update("sys_memo"          , row.getParamText("complited"       ))
					.update("prnt_id"           , row.getParameter("prnt_id"         ))
					.update("row_ord"           , row.getParameter("row_ord"         ))
					.update("row_lvl"           , row.getParameter("row_lvl"         ))
					.update("row_sts"           , row.getParameter("row_sts"         ))
					.update("row_clos"          , row.getParameter("row_clos"        ))
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
			} else {
				data.param
					.table("menu_mst")
					.where("where menu_id  = :menu_id  " )
					//
					.unique("menu_id"           , row.fixParameter("menu_id"         ))
					.unique("hq_id"             , arg.fixParameter("hq_id"           ))    // 17.04.09 추가
				;data.attach(Action.delete);
				if ("N".equals(arg.fixParamText("hq_ver"))) {
					data.param
						.table("usr_menu")
						.where("where menu_id  = :menu_id  " )
						//
						.unique("menu_id"           , row.fixParameter("menu_id"         ))
						.unique("hq_id"             , arg.fixParameter("hq_id"           ))   // 17.04.09 추가
					;data.attach(Action.delete);
				}
			}
		}
		data.execute();
		return null;
	}


}
