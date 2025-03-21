package com.sky.system.user.userauth;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class UserAuthService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows,String sort) throws Exception { // @ReleaseToken
		DataMessage data = arg.newStorage("POS");
		String hq = arg.getParamText("hq_id");
			data.param
				.total("select count(1) as maxsize " )
			;
			data.param // 쿼리문  입력
				.query("select a.*																								")
			;
			data.param // 쿼리문  입력
				.where("from (																									")
				.where("  select a.hqof_idcd , a.user_name , lgin_idcd , a.user_idcd   , a.user_idcd   as emp_no				")
				.where("       , a.dept_idcd , (select dept_name from dept_mast r where a.dept_idcd = r.dept_idcd)  as dept_name")
				.where("       , a.auth_dvcd  																					")
				.where("       , null as frc_cd																					")
				.where("       , null as frc_nm																					")
				.where("       , null as brd_cd																					")
				.where("       , null as brd_nm																					")
				.where("  from  user_mast  a																					")
				.where("  where 1=1																								")
				.where("  and   a.find_name  like %:find_name1%   " , arg.getParameter("find_name"))
				.where("  and   a.user_name  like %:find_name2%   " , arg.getParameter("user_name"))
				.where("  and   a.user_idcd  like %:find_name3%   " , arg.getParameter("logn_idcd"))
				.where("  and   a.dept_idcd  =:dept_idcd          " , arg.getParameter("dept_idcd"))
				.where("  and   a.line_stat < '2'																				")
				.where("  order by a.dept_idcd , user_name limit 9999999														")
				.where(") a																										")
			;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1),sort);
	}

	/**********************************************************************************************
	 * 메뉴 조회
	 *********************************************************************************************/
	public SqlResultMap getDetail(HttpRequestArgument arg ) throws Exception { // @ReleaseToken

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;

		data.param // 쿼리문  입력
			.query("select  a.menu_id, a.menu_nm, a.prnt_id, a.last_modl_yn , a.tree_expn_yn		")
			.query("     ,  :user_idcd as emp_id													")
			.query("     ,  case when b.menu_id is not null then 1 else 0 end as active_yn			")
			.query("     , (case when b.inpt_use_yn = '1' then b.upt_use_yn  else '0' end ) as insert_yn , a.upt_use_yn  as insert_yn_def ")
			.query("     , (case when b.upt_use_yn  = '1' then b.upt_use_yn  else '0' end ) as modify_yn , a.upt_use_yn  as modify_yn_def ")
			.query("     , (case when b.del_use_yn  = '1' then b.del_use_yn  else '0' end ) as delete_yn , a.del_use_yn  as delete_yn_def ")
			.query("     , (case when b.prt_use_yn  = '1' then b.prt_use_yn  else '0' end ) as report_yn , a.prt_use_yn  as report_yn_def ")
			.query("     , (case when b.expt_use_yn = '1' then b.expt_use_yn else '0' end ) as export_yn , a.expt_use_yn as export_yn_def ")
			.query("     , a.row_sts																")
			.query("     , case when a.row_sts = 0 or last_modl_yn = 0 then '0'						")
			.query("            else case when b.menu_id is null then '1' else '0' end				")
			.query("            end as hidden_yn													")
			.query("from menu_mst a																	")
			.query("     left outer join usr_menu b													")
			.query("          on  b.menu_id  = a.menu_id											")
			.query("          and b.emp_id   = :user_idcd  ", arg.fixParameter("user_idcd"))
			.query("group by a.menu_id																")
			.query("order by a.row_lvl, a.row_ord													")
		;


		return data.selectForMap();
	}




	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

//		String dbms = "MSSQL";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			if ("0".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 0. 삭제 */
				data.param
					.table("usr_menu								")
					.where("where    emp_id  = :emp_id				")
					.where("and      menu_id = :menu_id				")

					.unique("emp_id"            , row.fixParameter("emp_id"))
					.unique("menu_id"           , row.fixParameter("menu_id"))
				;data.attach(Action.delete );

			} else if ("1".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 1. 신규/수정 */
				data.param
					.table("usr_menu")
					.where("where    emp_id   = :emp_id    " )
					.where("and      menu_id  = :menu_id   " )

					.unique("hq_id"				, row.fixParameter("hq_id"))
					.unique("emp_id"			, row.fixParameter("emp_id"))
					.unique("menu_id"			, row.fixParameter("menu_id"))

					.update("inpt_use_yn"		, row.getParameter("insert_yn"))
					.update("upt_use_yn"		, row.getParameter("modify_yn"))
					.update("del_use_yn"		, row.getParameter("delete_yn"))
					.update("prt_use_yn"		, row.getParameter("report_yn"))
					.update("expt_use_yn"		, row.getParameter("export_yn"))

					.update("upt_ui"			, row.getParameter("upt_ui"))
					.update("upt_id"			, row.getParameter("upt_id"))
					.update("upt_ip"			, arg.remoteAddress)

					.insert("crt_ui"			, row.getParameter("crt_ui"))
					.insert("crt_id"			, row.getParameter("crt_id"))
					.insert("crt_ip"			, arg.remoteAddress)
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
			}
		}
		data.execute();
		return null ;

	}


	/**
	 * 사용자 다이얼로그
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.user_idcd   , a.user_idcd as emp_no   ,  a.user_name  , a.logn_idcd						")
			.query("   ,   a.dept_idcd  , (select dept_name from dept_mast where dept_idcd = a.dept_idcd ) as dept_name	")
//			.query("   ,   a.jobcl_id , (select jobcl_nm from jobcl_mst where jobcl_id = a.jobcl_id ) as jobcl_nm		")
			.query("   ,   a.user_memo , a.line_stat																	")
		;
		data.param
			.where("from   user_mast a																					")
			.where("where  a.line_stat   = 0																			") // 정상 거래처만 조회 요청한 경우
			.where("and    a.user_name   like %:user_name% " , arg.getParameter("user_name" ))
			.where("and    a.logn_idcd   = :logn_idcd      " , arg.getParameter("logn_idcd" ))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	/*
	 * 사용자 권한 복사
	 */
	public SqlResultMap setAuthCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			data.param
				.table("usr_menu")
				.where("where emp_id  = :emp_id  " )
				//
				.unique("emp_id"            , row.fixParameter("new_user_idcd"))
			;data.attach(Action.delete);
			 data.execute();

			data.clear();
			data.param
				.query("insert into usr_menu (											")
				.query("         hq_id      , emp_id      , menu_id    , my_menu_yn		")
				.query("       , inq_use_yn , inpt_use_yn , upt_use_yn , del_use_yn		")
				.query("       , prt_use_yn , expt_use_yn , row_ord    , row_sts		")
				.query("       , upt_id     , upt_ip      , crt_id						")
		//		.query("       , crt_ip     , perm_no									")
				.query("       , crt_ip     											")
				.query("  )																")

				.query("select a.hq_id 													")
				.query("     , :emp_id " , row.fixParameter("new_user_idcd"))
				.query("     , a.menu_id 												")
				.query("     , a.my_menu_yn												")
				.query("     , a.inq_use_yn 											")
				.query("     , a.inpt_use_yn 											")
				.query("     , a.upt_use_yn 											")
				.query("     , a.del_use_yn 											")
				.query("     , a.prt_use_yn 											")
				.query("     , a.expt_use_yn 											")
				.query("     , a.row_ord 												")
				.query("     , a.row_sts 												")
				.query("     , a.upt_id 												")
				.query("     , :remote1 " , arg.remoteAddress)
				.query("     , a.crt_id 												")
				.query("     , :remote2 " , arg.remoteAddress)
		//		.query("     , a.perm_no 												")
				.query("from   usr_menu a 												")
				.query("where  a.emp_id = :new_user_idcd "	, row.fixParameter("user_idcd"))
			;data.attach(Action.direct);

		    data.execute();
		}
		return null ;
	}
	public SqlResultMap getPopupSearch(HttpRequestArgument arg, int page, int rows) throws Exception { // @ReleaseToken
		DataMessage data = arg.newStorage("POS");
		String search_nm = arg.getParamText("find_name");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
			.query("select a.hqof_idcd , a.user_name , a.lgin_idcd  , a.user_idcd 	, a.user_idcd as user_code			")
			.query("     , a.dept_idcd , (select dept_name from dept_mast where dept_idcd = a.dept_idcd) as dept_name	")
			.query("     , a.wkrn_idcd , (select wkrn_name from wkrn_mast where wkrn_idcd = a.wkrn_idcd) as wkrn_name	")
			.query("     , a.auth_dvcd																					")
		;

		data.param
			.where("from   user_mast  a																					")
			.where("where  1=1																							")
			.where("and    a.dept_idcd  = :dept_idcd  " , arg.getParameter("dept_idcd"))
			.where("and    a.find_name  like %:search_nm%   " , search_nm)
			.where("and    a.line_stat  = 0 																			")
			.where("order by user_name																					")

		;
		if (page == 0 && rows == 0){
		     return data.selectForMap();
		} else {
		     return data.selectForMap(page, rows, (page==1));
		}
	}
}

