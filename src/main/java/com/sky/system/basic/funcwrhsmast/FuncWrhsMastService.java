package com.sky.system.basic.funcwrhsmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class FuncWrhsMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select  a.func_wrhs_idcd , a.func_wrhs_code , a.func_wrhs_name , a.istt_insp_yorn										")
			.where("      , a.poor_yorn      , a.prod_optn_yorn , a.dlvy_yorn      , a.sale_idle_yorn , a.cspc_idle_yorn					")
			.where("      , a.sets_cnst_yorn , a.issb_poor_yorn , a.prod_cotr_yorn , a.wdrw_cotr_yorn , a.istt_idle_yorn					")
			.where("      , a.puch_idle_yorn																								")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl											")
			.where("      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name					")
			.where("      , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name					")
			.where("      , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif											")
			.where("      , a.mngt_wrhs_dvcd																								")
			.where("from    wrhs_func a																										")
			.where("where   1=1																												")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																														")
			.where("order by a.func_wrhs_code																								")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select  a.func_wrhs_idcd , a.func_wrhs_code , a.func_wrhs_name , a.istt_insp_yorn										")
			.where("      , a.poor_yorn      , a.prod_optn_yorn , a.dlvy_yorn      , a.sale_idle_yorn , a.cspc_idle_yorn					")
			.where("      , a.sets_cnst_yorn , a.issb_poor_yorn , a.prod_cotr_yorn , a.wdrw_cotr_yorn , a.istt_idle_yorn					")
			.where("      , a.puch_idle_yorn																								")
			.where("      , a.mngt_wrhs_dvcd																								")
			.where("from    wrhs_func a																										")
			.where("where   1=1																												")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																														")
			.where("order by a.func_wrhs_code																								")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wrhs_func"													)
					.where("where func_wrhs_idcd  = :func_wrhs_idcd						")  /*  기능창고ID  */
					//
					.unique("func_wrhs_idcd"	, row.fixParameter("func_wrhs_idcd"		))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("wrhs_func"													)
					.where("where func_wrhs_idcd  = :func_wrhs_idcd						")  /*  기능창고ID  */
					//
					.unique("func_wrhs_idcd"	, row.fixParameter("func_wrhs_idcd"		))
					//
					.update("func_wrhs_code"	, row.getParameter("func_wrhs_code"		))  /*  기능창고코드  */
					.update("func_wrhs_name"	, row.getParameter("func_wrhs_name"		))  /*  기능창고명  */
					.update("mngt_wrhs_dvcd"	, row.getParameter("mngt_wrhs_dvcd"		))  /*  창고분류코드  */
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"		))  /*  입고검사여부  */
					.update("poor_yorn"			, row.getParameter("poor_yorn"			))  /*  불량여부  */
					.update("prod_optn_yorn"	, row.getParameter("prod_optn_yorn"		))  /*  생산옵션여부  */
					.update("dlvy_yorn"			, row.getParameter("dlvy_yorn"			))  /*  적송여부  */
					.update("sale_idle_yorn"	, row.getParameter("sale_idle_yorn"		))  /*  매출대기여부  */
					.update("cspc_idle_yorn"	, row.getParameter("cspc_idle_yorn"		))  /*  수탁매입대기여부  */
					.update("sets_cnst_yorn"	, row.getParameter("sets_cnst_yorn"		))  /*  세트구성여부  */
					.update("issb_poor_yorn"	, row.getParameter("issb_poor_yorn"		))  /*  입고대기불량여부  */
					.update("prod_cotr_yorn"	, row.getParameter("prod_cotr_yorn"		))  /*  제품용기여부  */
					.update("wdrw_cotr_yorn"	, row.getParameter("wdrw_cotr_yorn"		))  /*  회수용기여부  */
					.update("istt_idle_yorn"	, row.getParameter("istt_idle_yorn"		))  /*  입고대기여부  */
					.update("puch_idle_yorn"	, row.getParameter("puch_idle_yorn"		))  /*  매입대기여부  */
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("func_wrhs_code"		).trim()
												+ " "
												+ row.getParamText("func_wrhs_name"		).trim()
												)
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
