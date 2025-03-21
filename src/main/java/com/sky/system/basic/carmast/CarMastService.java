package com.sky.system.basic.carmast;

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
public class CarMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.cars_idcd           , a.cars_code       , a.cars_numb        , a.cars_alis		")
			.query("		, a.puch_date           , a.cars_year_prod  , a.insp_date        , a.runn_dvcd		")
			.query("		, a.nwek_name           , a.load_volm       , a.crty_bacd        , a.inst_totl_amnt	")
			.query("		, a.inst_mont           , a.monh_paid_amnt  , a.paid_date        , a.expr_date		")
			.query("		, a.inst_bank_name      , a.insu_amnt       , a.insu_dvcd        , a.insu_trff		")
			.query("		, a.insu_open_date      , a.insu_expr_date  , a.paid_mthd_dvcd   , a.insu_cmpy_name	")
			.query("		, a.insu_drtr_name      , a.tele_numb       , a.hdph_numb        , a.emgc_tele_numb	")
			.query("		, a.frst_date           , a.frst_amnt       , a.secd_date        , a.secd_amnt		")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("		, a.line_ordr           , a.line_stat       , a.line_clos        , a.find_name		")
			.query("		, a.updt_user_name      , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("		, a.updt_urif           , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("		, a.crte_idcd           , a.crte_urif       , b.base_name							")
		;
		data.param //퀴리문
			.where("from	car_mast a																			")
			.where("left outer join (select * from base_mast where prnt_idcd='3105') b on a.crty_bacd = b.base_code	")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.cars_code"																	)
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
			.query("select    a.cars_idcd           , a.cars_code       , a.cars_numb        , a.cars_alis		")
			.query("		, a.puch_date           , a.cars_year_prod  , a.insp_date        , a.runn_dvcd		")
			.query("		, a.nwek_name           , a.load_volm       , a.crty_bacd        , a.inst_totl_amnt	")
			.query("		, a.inst_mont           , a.monh_paid_amnt  , a.paid_date        , a.expr_date		")
			.query("		, a.inst_bank_name      , a.insu_amnt       , a.insu_dvcd        , a.insu_trff		")
			.query("		, a.insu_open_date      , a.insu_expr_date  , a.paid_mthd_dvcd   , a.insu_cmpy_name	")
			.query("		, a.insu_drtr_name      , a.tele_numb       , a.hdph_numb        , a.emgc_tele_numb	")
			.query("		, a.frst_date           , a.frst_amnt       , a.secd_date        , a.secd_amnt		")
			.query("		, a.user_memo           , a.sysm_memo       , a.prnt_idcd        , a.line_levl		")
			.query("		, a.line_ordr           , a.line_stat       , a.line_clos        , a.find_name		")
			.query("		, a.updt_user_name      , a.updt_ipad       , a.updt_dttm        , a.updt_idcd		")
			.query("		, a.updt_urif           , a.crte_user_name  , a.crte_ipad        , a.crte_dttm		")
			.query("		, a.crte_idcd           , a.crte_urif       , b.base_name							")
		;
		data.param //퀴리문
			.where("from	car_mast a																			")
			.where("left outer join base_mast b on a.crty_bacd = b.base_code									")
			.where("where   1=1																					")
//			.where("and b.prnt_idcd='3105'																		")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.cars_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("car_mast")
					.where("where cars_idcd  = :cars_idcd")

					.unique("cars_idcd"			, row.fixParameter("cars_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("car_mast")
					.where("where cars_idcd	= :cars_idcd" )

					.unique("cars_idcd"				, row.fixParameter("cars_idcd"))

					.update("cars_code"				, row.getParameter("cars_code"			))	//차량코드
					.update("cars_numb"				, row.getParameter("cars_numb"			))	//차량번호
					.update("cars_alis"				, row.getParameter("cars_alis"			))	//차량별칭
					.update("puch_date"				, row.getParameter("puch_date"			))	//구입일자
					.update("cars_year_prod"		, row.getParameter("cars_year_prod"		))	//년식
					.update("insp_date"				, row.getParameter("insp_date"			))	//검사일자
					.update("runn_dvcd"				, row.getParameter("runn_dvcd"			))	//운행구분코드
					.update("nwek_name"				, row.getParameter("nwek_name"			))	//차주명
					.update("load_volm"				, row.getParameter("load_volm"			))	//적재량
					.update("crty_bacd"				, row.getParameter("base_code"			))	//차종분류코드
					.update("inst_totl_amnt"		, row.getParameter("inst_totl_amnt"		))	//할부총액
					.update("inst_mont"				, row.getParameter("inst_mont"			))	//할부개월
					.update("monh_paid_amnt"		, row.getParameter("monh_paid_amnt"		))	//월납부금
					.update("paid_date"				, row.getParameter("paid_date"			))	//납부일자
					.update("expr_date"				, row.getParameter("expr_date"			))	//만기일자
					.update("inst_bank_name"		, row.getParameter("inst_bank_name"		))	//할부금융사명
					.update("insu_amnt"				, row.getParameter("insu_amnt"			))	//보험금액
					.update("insu_dvcd"				, row.getParameter("insu_dvcd"			))	//보험구분코드
					.update("insu_open_date"		, row.getParameter("insu_open_date"		))	//보험개시일자
					.update("insu_expr_date"		, row.getParameter("insu_expr_date"		))	//보험만기일자
					.update("paid_mthd_dvcd"		, row.getParameter("paid_mthd_dvcd"		))	//납부방법구분코드
					.update("insu_cmpy_name"		, row.getParameter("insu_cmpy_name"		))	//보험회사명
					.update("insu_drtr_name"		, row.getParameter("insu_drtr_name"		))	//보험담당자명
					.update("tele_numb"				, row.getParameter("tele_numb"			))	//전화번호
					.update("hdph_numb"				, row.getParameter("hdph_numb"			))	//휴대폰번호
					.update("emgc_tele_numb"		, row.getParameter("emgc_tele_numb"		))	//비상전화번호
					.update("frst_date"				, row.getParameter("frst_date"			))	//1회일자
					.update("frst_amnt"				, row.getParameter("frst_amnt"			))	//1회금액
					.update("secd_date"				, row.getParameter("secd_date"			))	//2회일자
					.update("secd_amnt"				, row.getParameter("secd_amnt"			))	//2회금액
					.update("user_memo"				, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"				, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"				, row.getParameter("prnt_idcd"			))	//부모ID

					.update("find_name"				, row.getParameter("cars_alis")	//차량명
													+ " "
													+ row.fixParameter("cars_code")	//차량코드
													+ " "
													+ row.getParameter("nwek_name")	//차주명
													+ " "
													+ row.getParameter("crty_bacd"))//차종분류코드

					.insert("line_levl"				, row.getParameter("line_levl"))
					.insert("line_ordr"				, row.getParameter("line_ordr"))
					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_clos"				, row.getParameter("line_clos"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
