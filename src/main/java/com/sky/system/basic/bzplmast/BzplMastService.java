package com.sky.system.basic.bzplmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class BzplMastService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 															")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select  a.bzpl_idcd      , a.bzpl_code  , a.bzpl_name  , a.bzct_dvcd   , a.puch_wrhs_idcd	")
			.where("      , a.post_code      , a.addr_1fst  , a.addr_2snd  , a.tele_numb   , a.faxi_numb		")
			.where("      , a.buss_numb      , a.buss_type  , a.buss_kind  , a.corp_numb   , a.buss_name		")
			.where("      , a.boss_name      , a.rpst_bzpl_yorn	      , a.addr_engl_1fst   , a.addr_engl_2snd	")
			.where("      , a.prod_bzpl_yorn , a.user_memo  , a.sysm_memo  , a.prnt_idcd   , a.line_levl		")
			.where("      , a.line_ordr      , a.line_stat  , a.line_clos  , a.find_name   , a.updt_user_name	")
			.where("      , a.updt_ipad      , a.updt_dttm  , a.updt_idcd  , a.updt_urif   , a.crte_user_name	")
			.where("      , a.crte_ipad      , a.crte_dttm  , a.crte_idcd  , a.crte_urif						")
			.where("      , w.wrhs_name as puch_wrhs_name														")
			.where("from    bzpl_mast a																			")
			.where("        left outer join wrhs_mast w on a.puch_wrhs_idcd = w.wrhs_idcd						")
			.where("where   1=1																					")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.bzpl_name	like %:bzpl_name%	" , arg.getParamText("bzpl_name"))
//			.where("and     a.line_stat  < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.line_stat  = :line_stat      " , arg.getParamText("line_stat" ) , !"3".equals(arg.getParamText("line_stat" )))
			.where(") a																							")
		;

		if (page == 0 && rows == 0){
		     return data.selectForMap(sort);
		} else {
		     return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select  a.bzpl_idcd      , a.bzpl_code  , a.bzpl_name  , a.bzct_dvcd   , a.puch_wrhs_idcd	")
			.where("      , a.post_code      , a.addr_1fst  , a.addr_2snd  , a.tele_numb   , a.faxi_numb		")
			.where("      , a.buss_numb      , a.buss_type  , a.buss_kind  , a.corp_numb   , a.buss_name		")
			.where("      , a.boss_name      , a.rpst_bzpl_yorn													")
			.where("      , a.prod_bzpl_yorn , a.user_memo  , a.sysm_memo  , a.prnt_idcd   , a.line_levl		")
			.where("      , a.line_ordr      , a.line_stat  , a.line_clos  , a.find_name   , a.updt_user_name	")
			.where("      , a.updt_ipad      , a.updt_dttm  , a.updt_idcd  , a.updt_urif   , a.crte_user_name	")
			.where("      , a.crte_ipad      , a.crte_dttm  , a.crte_idcd  , a.crte_urif						")
			.where("      , w.wrhs_name as puch_wrhs_name														")
			.where("from    bzpl_mast a																			")
			.where("        left outer join wrhs_mast w on a.puch_wrhs_idcd = w.wrhs_idcd						")
			.where("where   1=1																					")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																							")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("bzpl_mast"                                                      )
					.where("where bzpl_idcd       = :bzpl_idcd                             ")  /*  사업장ID  */
					//
					.unique("bzpl_idcd"           , row.fixParameter("bzpl_idcd"           ))
					//

					.update("line_stat"			, 2							)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("bzpl_mast"                                                    )
					.where("where bzpl_idcd     = :bzpl_idcd                             ")  /*  사업장ID  */
					//
					.unique("bzpl_idcd"         , row.fixParameter("bzpl_idcd"            ))
					//
					.update("bzpl_code"         , row.getParameter("bzpl_code"            ))  /*  사업장코드  */
					.update("bzpl_name"         , row.getParameter("bzpl_name"            ))  /*  사업장명  */
					.update("bzct_dvcd"         , row.getParameter("bzct_dvcd"            ))  /*  사업부문구분코드  */
					.update("puch_wrhs_idcd"    , row.getParameter("puch_wrhs_idcd"       ))  /*  구매창고ID  */
					.update("post_code"         , row.getParameter("post_code"            ))  /*  우편번호  */
					.update("addr_1fst"         , row.getParameter("addr_1fst"            ))  /*  사업장주소  */
					.update("addr_2snd"         , row.getParameter("addr_2snd"            ))  /*  사업장상세주소  */
					.update("tele_numb"         , row.getParameter("tele_numb"            ))  /*  전화번호  */
					.update("faxi_numb"         , row.getParameter("faxi_numb"            ))  /*  팩스번호  */
					.update("prod_bzpl_yorn"    , row.getParameter("prod_bzpl_yorn"       ))  /*  생산사업장여부  */
					.update("buss_numb"         , row.getParameter("buss_numb"            ))  /*  사업자등록번호  */
					.update("buss_type"         , row.getParameter("buss_type"            ))  /*  업태  */
					.update("buss_kind"         , row.getParameter("buss_kind"            ))  /*  업종  */
					.update("corp_numb"         , row.getParameter("corp_numb"            ))  /*  법인번호  */
					.update("buss_name"         , row.getParameter("buss_name"            ))  /*  사업명 */
					.update("boss_name"         , row.getParameter("boss_name"            ))  /*  대표자명 */
					.update("rpst_bzpl_yorn"    , row.getParameter("rpst_bzpl_yorn"       ))  /*  대표사업장여부  */
					.update("addr_engl_1fst"    , row.getParameter("addr_engl_1fst"            ))  /*  영문주소  */
					.update("addr_engl_2snd"    , row.getParameter("addr_engl_2snd"       ))  /*  영문상세주소  */
					.update("user_memo"         , row.getParameter("user_memo"            ))  /*  사용자메모  */
					.update("sysm_memo"         , row.getParameter("sysm_memo"            ))  /*  시스템메모  */
					.update("prnt_idcd"         , row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
					.update("line_levl"         , row.getParameter("line_levl"            ))  /*  ROW레벨  */
					.update("line_ordr"         , row.getParameter("line_ordr"            ))  /*  ROW순서  */
					.update("line_stat"         , row.getParameter("line_stat"            ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("bzpl_code"             ).trim()
												+ row.getParamText("bzpl_name"             ).trim()
												+ row.getParamText("bzpl_idcd"             ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
