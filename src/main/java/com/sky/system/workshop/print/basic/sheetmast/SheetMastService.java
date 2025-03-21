package com.sky.system.workshop.print.basic.sheetmast;

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
public class SheetMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.shet_idcd           , a.shet_name       , a.lcls_idcd        , a.mcls_idcd		")
			.query("        , a.scls_idcd           , a.shet_size_dvcd  , a.horz_leng        , a.vrtl_leng		")
			.query("        , a.shet_wght           , a.colr_bacd       , a.stnd_pric        , a.puch_pric		")
			.query("        , a.esti_pric           , a.sale_pric       , a.sprt_blwt_pric   , a.dprt_blwt_pric	")
			.query("        , a.sprt_colr_pric      , a.dprt_colr_pric  , a.shet_code							")
			.query("        , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
			.query("        , case when c3.clss_name is not null then c3.clss_desc								")
			.query("               else case when c2.clss_name is not null then c2.clss_desc					")
			.query("                         else c1.clss_name													")
			.query("                    end																		")
			.query("          end  as clss_desc  																")
			.query("        , a.user_memo           , a.sysm_memo        , a.prnt_idcd							")
			.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("        , a.crte_urif			, b.base_name as colr_name									")
		;
		data.param //퀴리문
			.where("from	prnt_shet a																			")
			.where("		left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("		left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("		left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.where("		left outer join base_mast       b on b.base_idcd =  a.colr_bacd						")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and     a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and     a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     a.line_stat < 2																		")
			.where("order   by	a.shet_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회
	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.shet_idcd           , a.line_seqn												")
			.query("        , a.shet_wght           , a.colr_bacd       , a.stnd_pric        , a.puch_pric		")
			.query("        , a.esti_pric           , a.sale_pric       , a.sprt_blwt_pric   , a.dprt_blwt_pric	")
			.query("        , a.sprt_colr_pric      , a.dprt_colr_pric  										")
			.query("        , a.mixx_blwt_sprt_pric , a.mixx_blwt_dprt_pric  , a.mixx_colr_sprt_pric			")
			.query("        , a.mixx_colr_dprt_pric																")

			.query("        , a.user_memo           , a.sysm_memo        , a.prnt_idcd							")
			.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("        , a.crte_urif			, b.base_name as colr_name               , s.shet_name		")
		;
		data.param //퀴리문
			.where("from	prnt_shet_pric a																	")
			.where("		left outer join base_mast       b on b.base_idcd =  a.colr_bacd						")
			.where("		left outer join prnt_shet       s on s.shet_idcd =  a.shet_idcd						")
			.where("where   1=1																					")
			.where("and     a.shet_idcd	 = :shet_idcd	" , arg.fixParameter("shet_idcd"))
			.where("and     a.line_stat < 2																		")
			.where("order   by	a.shet_idcd"																	)
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
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.shet_idcd           , a.shet_name       , a.lcls_idcd        , a.mcls_idcd		")
			.query("        , a.scls_idcd           , a.shet_size_dvcd  , a.horz_leng        , a.vrtl_leng		")
			.query("        , a.shet_wght           , a.colr_bacd       , a.stnd_pric        , a.puch_pric		")
			.query("        , a.esti_pric           , a.sale_pric       , a.sprt_blwt_pric   , a.dprt_blwt_pric	")
			.query("        , a.sprt_colr_pric      , a.dprt_colr_pric  , a.shet_code							")
			.query("        , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name	")
			.query("        , case when c3.clss_name is not null then c3.clss_desc								")
			.query("               else case when c2.clss_name is not null then c2.clss_desc					")
			.query("                         else c1.clss_name													")
			.query("                    end																		")
			.query("          end  as clss_desc  																")
			.query("        , a.user_memo           , a.sysm_memo        , a.prnt_idcd							")
			.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("        , a.crte_urif			, b.base_name as colr_name									")
		;
		data.param //퀴리문
			.where("from	prnt_shet a																			")
			.where("		left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd						")
			.where("		left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd						")
			.where("		left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd						")
			.where("		left outer join base_mast       b on b.base_idcd =  a.colr_bacd						")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and     a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and     a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     a.line_stat < 2																		")
			.where("order   by	a.shet_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap getWght(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.shet_idcd           , a.line_seqn												")
			.query("        , a.shet_wght           , a.colr_bacd       , a.stnd_pric        , a.puch_pric		")
			.query("        , a.esti_pric           , a.sale_pric       , a.sprt_blwt_pric   , a.dprt_blwt_pric	")
			.query("        , a.sprt_colr_pric      , a.dprt_colr_pric  										")
			.query("        , a.mixx_blwt_sprt_pric , a.mixx_blwt_dprt_pric  , a.mixx_colr_sprt_pric			")
			.query("        , a.mixx_colr_dprt_pric																")

			.query("        , a.user_memo           , a.sysm_memo        , a.prnt_idcd							")
			.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("        , a.crte_urif			, b.base_name as colr_name									")
		;
		data.param //퀴리문
			.where("from	prnt_shet_pric a																	")
			.where("		left outer join base_mast       b on b.base_idcd =  a.colr_bacd						")
			.where("where   1=1																					")
			.where("and     a.shet_idcd	 = :shet_idcd	" , arg.fixParameter("shet_idcd"))
			.where("and     a.line_stat < 2																		")
			.where("order   by	a.shet_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prnt_shet")
					.where("where shet_idcd  = :shet_idcd")

					.unique("shet_idcd"			, row.fixParameter("shet_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"))
				;data.attach(Action.update);
				data.execute();
				data.clear();
				data.param
					.table("prnt_shet_pric")
					.where("where shet_idcd  = :shet_idcd")

					.unique("shet_idcd"			, row.fixParameter("shet_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"))
				;
				data.attach(Action.update);
			} else {
				data.param
					.table("prnt_shet")
					.where("where shet_idcd	= :shet_idcd" )

					.unique("shet_idcd"				, row.fixParameter("shet_idcd"))

					.update("shet_code"				, row.getParameter("shet_code"		))
					.update("shet_name"				, row.getParameter("shet_name"		))
					.update("lcls_idcd"				, row.getParameter("lcls_idcd"		))
					.update("mcls_idcd"				, row.getParameter("mcls_idcd"		))
					.update("scls_idcd"				, row.getParameter("scls_idcd"		))
					.update("shet_size_dvcd"		, row.getParameter("shet_size_dvcd"	))
					.update("horz_leng"				, row.getParameter("horz_leng"		))
					.update("vrtl_leng"				, row.getParameter("vrtl_leng"		))
					.update("shet_wght"				, row.getParameter("shet_wght"		))
					.update("colr_bacd"				, row.getParameter("colr_bacd"		))
					.update("stnd_pric"				, row.getParameter("stnd_pric"		))
					.update("puch_pric"				, row.getParameter("puch_pric"		))
					.update("esti_pric"				, row.getParameter("esti_pric"		))
					.update("sale_pric"				, row.getParameter("sale_pric"		))
					.update("sprt_blwt_pric"		, row.getParameter("sprt_blwt_pric"	))
					.update("dprt_blwt_pric"		, row.getParameter("dprt_blwt_pric"	))
					.update("sprt_colr_pric"		, row.getParameter("sprt_colr_pric"	))
					.update("dprt_colr_pric"		, row.getParameter("dprt_colr_pric"	))

					.update("find_name"				, row.getParameter("shet_idcd")
													+ " "
													+ row.getParameter("shet_name"))
					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
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

	public SqlResultMap setRecord2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prnt_shet_pric")
					.where("where shet_idcd  = :shet_idcd")
					.where("and   line_seqn  = :line_seqn")

					.unique("shet_idcd"			, row.fixParameter("shet_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("prnt_shet_pric")
					.where("where shet_idcd	= :shet_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("shet_idcd"				, row.fixParameter("shet_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("shet_wght"				, row.getParameter("shet_wght"		))
					.update("colr_bacd"				, row.getParameter("colr_bacd"		))
					.update("stnd_pric"				, row.getParameter("stnd_pric"		))
					.update("puch_pric"				, row.getParameter("puch_pric"		))
					.update("esti_pric"				, row.getParameter("esti_pric"		))
					.update("sale_pric"				, row.getParameter("sale_pric"		))
					.update("sprt_blwt_pric"		, row.getParameter("sprt_blwt_pric"	))
					.update("dprt_blwt_pric"		, row.getParameter("dprt_blwt_pric"	))
					.update("sprt_colr_pric"		, row.getParameter("sprt_colr_pric"	))
					.update("dprt_colr_pric"		, row.getParameter("dprt_colr_pric"	))
					.update("mixx_blwt_sprt_pric"	, row.getParameter("mixx_blwt_sprt_pric"))
					.update("mixx_blwt_dprt_pric"	, row.getParameter("mixx_blwt_dprt_pric"))
					.update("mixx_colr_sprt_pric"	, row.getParameter("mixx_colr_sprt_pric"))
					.update("mixx_colr_dprt_pric"	, row.getParameter("mixx_colr_dprt_pric"))

					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
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
