package com.sky.system.sale.project.salecolt;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;


@Service
public class SaleColtService extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb           , a.invc_date         , a.bzpl_idcd         , a.expt_dvcd		")
			.query("        , a.cstm_idcd           , a.ostt_dvcd         , a.drtr_idcd         , a.dept_idcd		")
			.query("        , a.crny_dvcd           , a.excg_rate         , a.vatx_incl_yorn    , a.vatx_rate		")
			.query("        , b.sale_amnt           , b.vatx_amnt         , b.ttsm_amnt         , a.trut_dvcd		")
			.query("        , a.dlvy_cond_dvcd      , a.sale_stor_yorn    , a.remk_text								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif         , u.user_name								")
			.query("        , isnull((select ifnull(sum(colt_amnt),0) from    colt_item c 							")
			.query("                                                 where a.invc_numb = c.sale_numb				")
			.query("          ),0)  as yotp_amnt																	")
			.query("        , isnull((b.ttsm_amnt - (select ifnull(sum(colt_amnt),0) from colt_item c 				")
			.query("                                                              where a.invc_numb = c.sale_numb	")
			.query("          )),0) as ostd_amnt							 										")
		;
		data.param
			.where("from    sale_mast a																				")
			.where("        left outer join user_mast u on a.drtr_idcd = u.user_idcd								")
			.where("        left outer join ( select invc_numb ,sum(sale_amnt) as sale_amnt							")
			.where("                          , sum(vatx_amnt) as vatx_amnt , sum(ttsm_amnt) as ttsm_amnt			")
			.where("                          from sale_item group by invc_numb										")
			.where("        ) b on a.invc_numb = b.invc_numb														")
			.where("where   1=1																						")
			.where("and     a.cstm_idcd   = :cstm_idcd         " , arg.getParamText("cstm_idcd"))
			.where("and     a.find_name   like %:find_name%    " , arg.getParamText("find_name"))
			.where("and     a.invc_date   between :st_dt       " , arg.getParamText("st_dt"))
			.where("                      and     :ed_dt       " , arg.getParamText("ed_dt"))
			.where("and     a.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and																						")
			.where("ifnull((ifnull(b.ttsm_amnt,0) - (select ifnull(sum(colt_amnt),0) from colt_item c 				")
			.where("                                                    where a.invc_numb = c.sale_numb				")
		;
		if(arg.getParamText("chk").equals("on")){
			data.param
				.where(")),0) <= 0		")
			;
		}else{
			data.param
				.where(")),0) > 0		")
			;
		}
		data.param
			.where("order by invc_numb																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select    a.invc_numb           , a.invc_date         , a.cstm_idcd         , a.dept_idcd		")
		.query("        , a.drtr_idcd           , a.iput_amnt_date    , a.stot_dvcd         , a.stot_bass		")
		.query("        , a.apvl_yorn           , a.apvl_drtr_idcd    , a.apvl_date         , a.publ_date		")
		.query("        , a.expr_date           , a.paym_bank_name    , b.colt_amnt								")
		.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
		.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
		.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
		.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
		.query("        , a.crte_idcd           , a.crte_urif         , c.cstm_name         , d.dept_name		")
		.query("        , u.user_name as drtr_name        , u2.user_name as apvl_drtr_name						")
		;
		data.param
		.where("from    colt_mast a																				")
		.where("left outer join ( select invc_numb, ifnull(sum(colt_amnt),0) as colt_amnt						")
		.where("                  from   colt_item group by invc_numb											")
		.where("                ) b on a.invc_numb = b.invc_numb												")
		.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd										")
		.where("left outer join user_mast u  on a.drtr_idcd = u.user_idcd										")
		.where("left outer join user_mast u2 on a.apvl_drtr_idcd = u.user_idcd										")
		.where("left outer join dept_mast d  on a.dept_idcd = d.dept_idcd										")
		.where("where   1=1																						")
		.where("and     a.invc_numb   = :invc_numb         " , arg.getParamText("invc_numb"))
		.where("and     a.invc_date   >=  :st_dt           " , arg.getParamText("st_dt"))
		.where("and     a.invc_date   <=  :ed_dt           " , arg.getParamText("ed_dt"))
		.where("and     a.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
		.where("order by invc_numb																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select    a.invc_numb           , a.line_seqn         , a.acpt_numb         , a.acpt_seqn		")
		.query("        , a.assi_seqn           , a.sale_numb         , a.sale_seqn         , a.colt_dvcd		")
		.query("        , a.colt_degr           , a.plan_date         , a.plan_amnt         , a.colt_amnt		")
		.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
		.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
		.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
		.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
		.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
		.where("from    colt_item a																				")
		.where("where   1=1																						")
		.where("and     a.invc_numb   = :invc_numb         " , arg.getParamText("invc_numb"))
		.where("and     a.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
		.where("order by invc_numb																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getListerPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.invc_numb           , a.line_seqn         , a.acpt_numb         , a.acpt_seqn		")
			.query("        , a.item_idcd           , a.sale_unit         , a.norm_sale_pric    , a.sale_stnd_pric	")
			.query("        , a.sale_pric           , a.sale_qntt         , a.vatx_incl_yorn    , a.vatx_rate		")
			.query("        , a.sale_amnt           , a.vatx_amnt         , a.ttsm_amnt         , a.dlvy_date		")
			.query("        , a.dlvy_hhmm           , a.stnd_unit         , a.stnd_unit_qntt    , a.wrhs_idcd		")
			.query("        , a.dlvy_cstm_idcd      , a.pcod_numb         , a.uper_seqn         , a.disp_seqn		")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
			.query("        , isnull((ttsm_amnt - (select ifnull(sum(colt_amnt),0) from colt_item c 				")
			.query("                                                              where a.invc_numb = c.sale_numb		")
			.query("                                                                and a.line_seqn = c.sale_seqn)),0)	")
			.query("        as yotp_amnt							 												")
		;
		data.param
			.where("from    sale_item a																				")
			.where("where   1=1																						")
			.where("and     a.invc_numb   = :invc_numb         " , arg.getParamText("invc_numb"))
			.where("and     a.line_stat   < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by invc_numb																				")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		int i = 0;
		int line_seqn = 0;
		int colt_amnt,amnt;
		String form_invc_numb="";

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			if(i==0){
				temp.param
					.query("select   ifnull(Max(line_seqn),0)+1 as seqn									")
				;
				temp.param
					.where("from colt_item a															")
					.where("where   1=1																	")
					.where("and     a.invc_numb   = :invc_numb    " , row.getParamText("form_invc_numb"))
				;
				SqlResultMap info = temp.selectForMap();
				temp.clear();


				line_seqn =Integer.parseInt(info.get(0).getParamText("seqn"));
				info.clear();

				form_invc_numb = row.getParamText("form_invc_numb");


				data.param
					.table("colt_mast						")
					.where("where invc_numb  = :invc_numb	")

					.unique("invc_numb"			, form_invc_numb)

					.update("invc_date"			, row.getParameter("form_iput_amnt_date"))
					.update("cstm_idcd"			, row.getParameter("form_cstm_idcd"))
					.update("dept_idcd"			, row.getParameter("form_dept_idcd"))
					.update("drtr_idcd"			, row.getParameter("form_drtr_idcd"))
					.update("iput_amnt_date"	, row.getParameter("form_iput_amnt_date"))
					.update("stot_dvcd"			, row.getParameter("form_stot_dvcd"))
					.update("stot_bass"			, row.getParameter("form_stot_bass"))
					.update("publ_date"			, row.getParameter("form_publ_date"))
					.update("expr_date"			, row.getParameter("form_expr_date"))
					.update("paym_bank_name"	, row.getParameter("form_paym_bank_name"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
				data.execute();
				data.clear();

			}
			i++;

			amnt = Integer.parseInt(row.getParamText("colt_amnt"));
			colt_amnt = (int) Math.floor(amnt/10)*10;

			data.param
				.table("colt_item						")
				.where("where invc_numb  = :invc_numb	")
				.where("where line_seqn  = :line_seqn	")

				.unique("invc_numb"			, form_invc_numb)
				.unique("line_seqn"			, line_seqn++)

				.update("acpt_numb"			, row.getParameter("acpt_numb"))
				.update("acpt_seqn"			, "1")
				.update("assi_seqn"			, "1")
				.update("sale_numb"			, row.getParameter("invc_numb"))
				.update("sale_seqn"			, row.getParameter("line_seqn"))
				.update("colt_dvcd"			, row.getParameter("colt_dvcd"))
				.update("colt_degr"			, "1")
				.update("plan_amnt"			, row.getParameter("ttsm_amnt"))
				.update("colt_amnt"			, colt_amnt)

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
		}
		data.execute();
		return null ;
	}

}
