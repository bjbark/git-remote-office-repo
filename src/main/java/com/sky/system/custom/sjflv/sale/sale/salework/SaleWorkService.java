package com.sky.system.custom.sjflv.sale.sale.salework;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baroservice.api.BarobillApiService;
import com.baroservice.api.taxinvoice.Tests;
import com.baroservice.ws.TaxInvoiceStateEX;
import com.sky.barobill.BaroBillService; // static key
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

import net.sky.http.dispatch.control.DefaultServiceHandler;


@Service("sjflv.sale.SaleWorkService")
public class SaleWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence;
	private BarobillApiService barobillApiService;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  a.invc_numb     , a.invc_date      , a.bzpl_idcd     , a.cstm_idcd		")
			.query("      , a.drtr_idcd     , a.dept_idcd      , a.trsm_dvcd						")
			.query("      , a.sply_amnt     , a.vatx_amnt      , a.ttsm_amnt     , a.rqod_rcvd_dvcd	")
			.query("      , a.remk_text     , a.stot_date      , a.stot_dvcd     , a.vatx_dvcd		")
			.query("      , a.stot_bass     , a.paym_bank_name , a.publ_date     , a.expr_date		")
			.query("      , a.trsm_yorn     , a.trsm_dttm      , a.trsm_idcd     , z.bzpl_name		")
			.query("      , z.buss_numb as bzpl_buss_numb      , z.buss_name as bzpl_buss_name		")
			.query("      , z.boss_name as bzpl_boss_name      , z.buss_type as bzpl_buss_type		")
			.query("      , z.buss_kind as bzpl_buss_kind      , a.drtr_name as bzpl_drtr_name		")
			.query("      , u.hdph_numb as bzpl_tele_numb      , u.mail_addr as bzpl_mail_addr		")

			.query("      , ifnull(cu.drtr_hdph_numb,c.tele_numb) as tele_numb						")
			.query("      , ifnull(cu.drtr_name,c.boss_name) as drtr_name							")
			.query("      , ifnull(cu.drtr_mail_addr,c.mail_addr) as mail_addr						")

			.query("      , concat(ifnull(z.addr_1fst,''),' ',ifnull(z.addr_2snd,'')) as bzpl_addr		")
			.query("      , concat(ifnull(cd.addr_1fst,''),' ',ifnull(cd.addr_2snd,'')) as cstm_addr	")
			.query("      , c.cstm_code     , c.cstm_name     , c.buss_numb     , c.buss_name			")
			.query("      , c.boss_name     , c.buss_type     , c.buss_kind								")

//			.query(", a.txbl_path_dvcd ")
			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")

		;
		data.param
			.where("from txbl_mast a														")
			.where("left outer join user_mast u  on a.drtr_idcd = u.user_idcd")
			.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd")
			.where("left outer join cstm_addr cd on c.cstm_idcd = cd.cstm_idcd")
			.where("left outer join cstm_drtr cu on c.cstm_idcd = cu.cstm_idcd and cu.rpst_drtr_yorn = '1'")
			.where("left outer join bzpl_mast z  on a.bzpl_idcd = z.bzpl_idcd")
			.where("where 1=1																")
			.where("and   a.puch_sale_dvcd = '2000'											")
			.where("and   a.bzpl_idcd   = :bzpl_idcd		" , arg.getParamText("bzpl_idcd" ))
			.where("and   a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and   a.invc_date  >= :invc1_date		" , arg.getParamText("txbl_date1"))
			.where("and   a.invc_date  <= :invc2_date		" , arg.getParamText("txbl_date2"))
			.where("and   a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and   a.find_name	like %:find_name%	" , arg.getParamText("find_name" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date																")
		;

		SqlResultMap map = data.selectForMap(sort);
		String msg = "";
		for (SqlResultRow row:map) {
			Tests barobil = new Tests();
			TaxInvoiceStateEX tax = barobil.GetTaxInvoiceStateEX( new BaroBillService().getKey() ,row.fixParamText("bzpl_buss_numb"),row.fixParamText("invc_numb"));
			int a = 0;
			a = tax.getBarobillState();
			if(0 > a){
				com.baroservice.api.barobill.Tests error = new com.baroservice.api.barobill.Tests();

				row.setParameter("baro_stat", error.GetError( Integer.toString(a)));
			}else{
				switch (a) {
				case 1000:
					msg = "임시저장";
					break;
				case 5031:
					msg = "발급취소";
					break;
				case 3014:
					int t = tax.getNTSSendState();
					if(t==1){
						msg = "국세청 전송전";
					}else if(t==2 || t==3){
						msg = "국세청 전송중";
					}else if(t==4){
						msg = "국세청 전송성공";
						data.clear();
						data.param
							.table("txbl_mast")
							.where("where invc_numb = :invc_numb")

							.unique("invc_numb", row.fixParameter("invc_numb"))

							.update("trsm_yorn", 1)
						;
						data.attach(Action.update);
						data.execute();
						row.setParameter("trsm_yorn", 1);
					}else if(t==5){
						msg = "국세청 전송실패";
					}
					break;

				default:
					msg = "국세청 전송성공";
					break;
				}
				row.setParameter("baro_stat", msg);
			}
		}
		return map;
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb        , a.invc_date       , a.sale_path_dvcd   , a.bzpl_idcd	")
			.query("       , a.expt_dvcd        , a.cstm_idcd       , a.ostt_dvcd        , a.drtr_idcd	")
			.query("       , a.dept_idcd        , a.trut_dvcd       , a.dlvy_cond_dvcd   , a.deli_date	")
			.query("       , a.sale_stor_yorn   , a.crny_dvcd       , a.excg_rate        , a.remk_text	")
			.query("       , c.cstm_name        , c.cstm_code       , u.user_name as drtr_name			")
			.query("       , d.dept_name        , c.tele_numb       , c.buss_numb        , c.mail_addr	")
			.query("       , ifnull(sum(b.sale_amnt),0) as sale											")
			.query("       , ifnull(sum(t.ttsm_amnt),0) as sply											")

			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
			.query("       , a.crte_idcd        , a.crte_urif											")

		;
		data.param
			.where("from sale_ostt_mast a													")
			.where("left outer join sale_ostt_item b on a.invc_numb = b.invc_numb			")
			.where("left outer join txbl_item      t on b.invc_numb = t.orig_invc_numb and b.line_seqn = t.orig_invc_seqn	")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd				")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd				")
			.where("left outer join dept_mast d on u.dept_idcd = d.dept_idcd				")
			.where("where 1=1																")
			.where("and   a.bzpl_idcd   = :bzpl_idcd		" , arg.getParamText("bzpl_idcd" ))
			.where("and   a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and   a.invc_date  >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and   a.invc_date  <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and   a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and   a.find_name	like %:find_name%	" , arg.getParamText("find_name" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb													")
			.where("having (ifnull(sum(b.sale_amnt),0) - ifnull(sum(t.ttsm_amnt),0)) > 0		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.puch_sale_dvcd       , a.invc_numb       , a.line_seqn       , a.acct_bacd				")
			.query("       , a.item_idcd            , a.item_name       , a.item_spec       , a.lott_numb				")
			.query("       , a.vatx_incl_yorn       , a.vatx_rate       , a.qntt            , a.sply_amnt				")
			.query("       , a.vatx_amnt            , a.ttsm_amnt       , a.stnd_unit       , a.stnd_unit_qntt			")
			.query("       , a.remk_text            , a.prof_data       , a.orig_invc_numb  , a.orig_invc_seqn 			")
			.query("       , a.orig_seqn            , a.sply_pric														")
			.query("       , i.item_code            , i.item_name       , i.item_spec									")
			.query("       , u.unit_name																				")

			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos        , a.find_name				")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
			.query("       , a.crte_idcd            , a.crte_urif														")
		;
		data.param
			.where("from txbl_item a																					")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("left outer join unit_mast u on a.stnd_unit = u.unit_idcd											")
			.where("where  1 = 1																						")
			.where("and    a.invc_numb	=:invc_numb		" , arg.fixParamText("invc_numb"))
			.where("order by line_seqn																					")
		;
		return data.selectForMap();
		}

	public SqlResultMap getPopup(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.puch_sale_dvcd       , a.invc_numb       , a.line_seqn       , a.acct_bacd				")
			.query("       , a.item_idcd            , a.item_spec       , a.lott_numb									")
			.query("       , a.vatx_incl_yorn       , a.vatx_rate       , a.qntt            , a.stnd_unit				")
			.query("       , a.remk_text            , a.prof_data       , a.orig_invc_numb as new_invc_numb  , a.orig_invc_seqn 			")
			.query("       , a.orig_seqn            , a.stnd_unit_qntt  , a.sply_pric       , a.orig_invc_numb			")
			.query("       , u.unit_name            , a.sply_amnt as sply_amnt2             , a.vatx_amnt  as  vatx_amnt2	")
			.query("       , a.item_name            , a.ttsm_amnt as ttsm_amnt2             , a.qntt as qntt2			")
			.query("       , a.orig_invc_type																			")

			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos        , a.find_name				")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
			.query("       , a.crte_idcd            , a.crte_urif       , m.hdph_numb as bzpl_tele_numb     , m.mail_addr as bzpl_mail_addr	")
			.query("       , l.lgin_idcd																				")
		;
		data.param
			.where("from txbl_item a																					")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("left outer join unit_mast u on a.stnd_unit = u.unit_idcd											")
			.where("left outer join txbl_mast b on a.invc_numb = b.invc_numb											")
			.where("left outer join user_mast m  on b.drtr_idcd = m.user_idcd											")
			.where("left outer join baro_logn l on m.user_idcd = l.user_idcd											")
			.where("where  1 = 1																						")
			.where("and    a.invc_numb	=:invc_numb		" , arg.fixParamText("invc_numb"))
			.where("order by a.invc_numb																				")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb        , a.line_seqn        , a.acpt_numb        , a.acpt_seqn		")
			.query("        , a.item_idcd        , a.sale_unit        , a.norm_sale_pric   , a.sale_stnd_pric	")
			.query("        , a.sale_pric        , a.ostt_qntt        , a.vatx_incl_yorn   , a.vatx_rate		")
			.query("        , a.sale_amnt        , a.vatx_amnt        , a.ttsm_amnt        , a.deli_date		")
			.query("        , a.dlvy_date        , a.dlvy_hhmm        , a.stnd_unit        , a.stnd_unit_qntt	")
			.query("        , a.wrhs_idcd        , a.zone_idcd        , a.dlvy_cstm_idcd   , a.dsct_yorn		")
			.query("        , a.ostt_dvcd        , a.insp_dvcd        , a.insp_date        , a.pcod_numb		")
			.query("        , a.rett_date        , a.rett_resn_dvcd   , a.rett_qntt        , a.rett_drtr_idcd	")
			.query("        , a.rqod_date        , a.rqod_invc_numb   , a.rqod_qntt        , a.sale_date		")
			.query("        , a.sale_invc_numb   , a.sale_qntt        , a.lott_numb        , a.orig_invc_numb	")
			.query("        , a.orig_seqn        , a.json_data        , a.uper_seqn        , a.disp_seqn		")
			.query("        , i.item_code        , i.item_name        , i.item_spec        , u.unit_name		")

			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif													")
		;
		data.param
			.where("from sale_ostt_item a												")
			.where("left outer join item_mast i on i.item_idcd = a.item_idcd			")
			.where("left outer join unit_mast u on u.unit_idcd = a.sale_unit			")
			.where("where 1=1															")
			.where("and    a.invc_numb	=:invc_numb		" , arg.fixParamText("invc_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");


			data.param
				.where(" select    a.invc_numb        , b.invc_date       , b.cstm_idcd        , c.cstm_name	")
				.where("         , a.ostt_qntt        , a.sale_pric       , a.sale_amnt	       , c.cstm_code	")
				.where("         , (a.sale_amnt - ifnull((t.sply_amnt),0)) as deff_amnt							")
				.where("         , ifnull((t.sply_amnt),0) as sply_amnt											")
				.where("         , c.mail_addr        , c.tele_numb	      , t.vatx_amnt							")
				.where("         , i.item_spec        , t.qntt            , t.sply_pric        , t.sply_amnt	")

				.where("         , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl	")
				.where("         , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name	")
				.where("         , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd	")
				.where("         , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm	")
				.where("         , a.crte_idcd        , a.crte_urif       , ifnull((a.vatx_amnt),0) as vatx_amnt")
				.where("         , ifnull((a.ttsm_amnt),0) as ttsm_amnt											")
				.where("         , i.item_name        , i.item_code	      , i.item_idcd							")
				.where(" from sale_ostt_item a 												")
				.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb")
				.where(" left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn")
				.where(" left outer join unit_mast      u on a.sale_unit = u.unit_idcd")
				.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd")
				.where(" left outer join item_mast      i on a.item_idcd = i.item_idcd")
				.where(" left outer join acpt_item     ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn	")
				.where(" left outer join acpt_mast      m on ai.invc_numb = m.invc_numb		")
				.where(" where 1=1															")
				.where(" and   b.line_stat   < :line_stat ", "2" , "".equals(arg.getParamText("line_stat" )))
//				.where(" and   b.invc_numb   = :invc_numb ", arg.getParamText("invc_numb" ))
				.where(" and   b.cstm_idcd   = :cstm_idcd ", arg.getParamText("cstm_idcd" ))
				.where(" and   m.acpt_dvcd   = :acpt_dvcd ", arg.getParamText("acpt_dvcd"  ))
				.where(" and   t.item_idcd   = :item_idcd ", arg.getParamText("item_idcd"  ))
			;
			if ("1000".equals(arg.getParamText("acpt_dvcd"  ))) {
				data.param
					.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '3000') ")
				;
			} else {
				data.param
					.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '2000') ")
				;
			}
			;
			return data.selectForMap();
	}


	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   min(a.invc_numb) as invc_numb          , a.invc_date											")
			.query("       , a.cstm_idcd        , a.cstm_name       , a.cstm_code											")
			.query("       , a.ostt_qntt        , a.sale_pric       , a.sale_amnt											")
			.query("       , sum(deff_amnt) as deff_amnt            , sum(sply_amnt) as sply_amnt							")
			.query("       , a.mail_addr        , a.tele_numb																")
			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl						")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name						")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd						")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm						")
			.query("       , a.crte_idcd        , a.crte_urif																")
			.query("       , sum(sale_deff_amnt) as sale_deff_amnt  , sum(rett_deff_amnt) as rett_deff_amnt					")
		;
		// 1. 출고 집계
		data.param
			.where("from (																									")
			.where(" select    a.invc_numb        , b.invc_date																")
			.where("         , b.cstm_idcd        , c.cstm_name       , c.cstm_code											")
			.where("         , a.ostt_qntt        , a.sale_pric       , a.sale_amnt											")
			.where("         , (a.sale_amnt - ifnull(sum(t.sply_amnt),0)) as deff_amnt										")
			.where("         , ifnull(sum(t.sply_amnt),0) as sply_amnt														")
			.where("         , c.mail_addr        , c.tele_numb																")
			.where("         , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
			.where("         , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
			.where("         , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
			.where("         , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
			.where("         , a.crte_idcd        , a.crte_urif																")
			.where("         , (a.sale_amnt - ifnull(sum(t.sply_amnt),0)) as sale_deff_amnt									")
			.where("         , 0 as rett_deff_amnt																			")
			.where(" from sale_ostt_item a 																					")
			.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb											")
			.where(" left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where(" left outer join unit_mast      u on a.sale_unit = u.unit_idcd											")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd											")
			.where(" left outer join item_mast      i on a.item_idcd = i.item_idcd											")
			.where(" left outer join acpt_item     ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn			")
			.where(" left outer join acpt_mast      m on ai.invc_numb = m.invc_numb											")
			.where(" where 1=1																								")
			.where(" and   json_value(a.json_data, '$.trns_date') is null													")
			.where(" and   b.cstm_idcd   = :cstm_idcd1 ", arg.getParamText("cstm_idcd"))
			.where(" and   b.line_stat   < :line_stat1 ", "2" , "".equals(arg.getParamText("line_stat")))
			.where(" and   b.invc_numb   = :invc_numb1 ", arg.getParamText("invc_numb"))
			.where(" and   m.acpt_dvcd   = :acpt_dvcd1 ", arg.getParamText("acpt_dvcd"))
		;
		// 출고는 납기일자로 가져온다.
//		data.param
//			.where(" and   ai.deli_date >= :deli_date11", arg.getParamText("deli_date1"))
//			.where(" and   ai.deli_date <= :deli_date12", arg.getParamText("deli_date2"))
//		;

		if ("1000".equals(arg.getParamText("acpt_dvcd"  ))) {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '3000') 								")
				.where(" and   ai.deli_date >= :deli_date11", arg.getParamText("deli_date1"))
				.where(" and   ai.deli_date <= :deli_date12", arg.getParamText("deli_date2"))
			;
		} else {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '2000') 								")
				.where(" and   b.invc_date >= :invc_date11", arg.getParamText("deli_date1"))
				.where(" and   b.invc_date <= :invc_date12", arg.getParamText("deli_date2"))
			;
		}
		data.param
			.where(" group by a.invc_numb,a.line_seqn																		")
			.where(" having (sale_amnt-sply_amnt) > 0")
		;

		// 2. 이월된  출고 집계
		data.param
			.where(" union all																								")
			.where(" select    a.invc_numb        , b.invc_date																")
			.where("         , b.cstm_idcd        , c.cstm_name       , c.cstm_code											")
			.where("         , a.ostt_qntt        , a.sale_pric       , a.sale_amnt											")
			.where("         , (a.sale_amnt - ifnull(sum(t.sply_amnt),0)) as deff_amnt										")
			.where("         , ifnull(sum(t.sply_amnt),0) as sply_amnt														")
			.where("         , c.mail_addr        , c.tele_numb																")
			.where("         , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
			.where("         , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
			.where("         , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
			.where("         , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
			.where("         , a.crte_idcd        , a.crte_urif																")
			.where("         , (a.sale_amnt - ifnull(sum(t.sply_amnt),0)) as sale_deff_amnt									")
			.where("         , 0 as rett_deff_amnt																			")
			.where(" from sale_ostt_item a 																					")
			.where(" left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb											")
			.where(" left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where(" left outer join unit_mast      u on a.sale_unit = u.unit_idcd											")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd											")
			.where(" left outer join item_mast      i on a.item_idcd = i.item_idcd											")
			.where(" left outer join acpt_item     ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn			")
			.where(" left outer join acpt_mast      m on ai.invc_numb = m.invc_numb											")
			.where(" where 1 = 1																							")
			.where(" and   b.cstm_idcd   = :cstm_idcd2 ", arg.getParamText("cstm_idcd" ))
			.where(" and   b.line_stat   < :line_stat2 ", "2" , "".equals(arg.getParamText("line_stat")))
			.where(" and   b.invc_numb   = :invc_numb2 ", arg.getParamText("invc_numb"))
			.where(" and   m.acpt_dvcd   = :acpt_dvcd2 ", arg.getParamText("acpt_dvcd"))
		;
		// 이월품목은  이월일자로 가져온다.
		data.param
			.where(" and json_value(a.json_data, '$.trns_date') >= :deli_date21", arg.getParamText("deli_date1" ))	//납기일
			.where(" and json_value(a.json_data, '$.trns_date') <= :deli_date22", arg.getParamText("deli_date2" ))
		;

		if ("1000".equals(arg.getParamText("acpt_dvcd"))) {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '3000')								 ")
			;
		} else {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '2000') 								")
			;
		}
		data.param
			.where(" group by a.invc_numb,a.line_seqn																		")
			.where(" having (sale_amnt-sply_amnt) > 0")
		;

		// 3. 반품   집계
		data.param
			.where(" union all																								")
			.where(" select    a.invc_numb        , b.invc_date																")
			.where("         , b.cstm_idcd        , c.cstm_name       , c.cstm_code											")
			.where("         , (s.ostt_qntt - a.rett_qntt) as ostt_qntt  , a.sale_pric     , a.sply_amnt as sale_amnt		")
			.where("         , (a.sply_amnt + ifnull(sum(t.sply_amnt),0)) * -1 as deff_amnt									")
			.where("         , ifnull(sum(t.sply_amnt),0) * -1 as sply_amnt													")
			.where("         , c.mail_addr        , c.tele_numb																")
			.where("         , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
			.where("         , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
			.where("         , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
			.where("         , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
			.where("         , a.crte_idcd        , a.crte_urif																")
			.where("         , 0 as sale_deff_amnt																			")
			.where("         , (a.sply_amnt + ifnull(sum(t.sply_amnt),0)) * -1 as rett_deff_amnt							")
			.where(" from sale_rett_item a 																					")
			.where(" left outer join sale_rett_mast b on a.invc_numb = b.invc_numb											")
			.where(" left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where(" left outer join sale_ostt_item s on a.acpt_numb = s.acpt_numb and a.acpt_seqn = s.acpt_seqn			")
			.where(" left outer join unit_mast      u on a.unit_idcd = u.unit_idcd											")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd											")
			.where(" left outer join item_mast      i on a.item_idcd = i.item_idcd											")
			.where(" left outer join acpt_item     ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn			")
			.where(" left outer join acpt_mast      m on ai.invc_numb = m.invc_numb											")
			.where(" where 1 = 1																							")
			.where(" and   a.rett_proc_dvcd != '5000'																		")
			.where(" and   b.cstm_idcd   = :cstm_idcd3 ", arg.getParamText("cstm_idcd" ))
			.where(" and   b.line_stat   < :line_stat3 ", "2" , "".equals(arg.getParamText("line_stat")))
			.where(" and   b.invc_numb   = :invc_numb3 ", arg.getParamText("invc_numb"))
			.where(" and   m.acpt_dvcd   = :acpt_dvcd3 ", arg.getParamText("acpt_dvcd"))
		;
		data.param
			.where(" and b.invc_date >= :deli_date31", arg.getParamText("deli_date1" ))	//납기일
			.where(" and b.invc_date <= :deli_date32", arg.getParamText("deli_date2" ))
		;

		if ("1000".equals(arg.getParamText("acpt_dvcd"))) {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '3000')								 ")
			;
		} else {
			data.param
				.where(" and   json_value(m.json_data, '$.prod_trst_dvcd') in ('1000', '2000') 								")
			;
		}
		data.param
			.where(" group by a.invc_numb,a.line_seqn																		")
			.where(" having (sale_amnt - sply_amnt) > 0																		")
		;
		data.param
			.where(") a 																									")
			.where("group by cstm_idcd																						")
		;

		SqlResultMap info = new SqlResultMap();
		info.add(0, new SqlResultRow());
		info.get(0).put("product", data.selectForMap());

		return info;
	}

	public SqlResultMap getInvoice2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   min(a.invc_numb) as invc_numb          , a.invc_date											")
			.query("       , a.cstm_idcd        , a.cstm_name       , a.cstm_code											")
			.query("       , a.ostt_qntt        , a.sale_pric       , a.sale_amnt											")
			.query("       , sum(deff_amnt) as deff_amnt            , sum(sply_amnt) as sply_amnt							")
			.query("       , a.mail_addr        , a.tele_numb																")
			.query("       , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl						")
			.query("       , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name						")
			.query("       , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd						")
			.query("       , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm						")
			.query("       , a.crte_idcd        , a.crte_urif							")
		;
		data.param
			.where("from (																									")
			.where(" select    a.invc_numb        , b.invc_date																")
			.where("         , b.cstm_idcd        , c.cstm_name       , c.cstm_code											")
			.where("         , a.rett_qntt * -1 as ostt_qntt , a.sale_pric       , a.sply_amnt	as sale_amnt					")
			.where("         , (a.sply_amnt + ifnull(sum(t.sply_amnt),0)) * -1 as deff_amnt										")
			.where("         , ifnull(sum(t.sply_amnt),0) * -1 as sply_amnt														")
			.where("         , c.mail_addr        , c.tele_numb																")
			.where("         , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
			.where("         , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
			.where("         , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
			.where("         , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
			.where("         , a.crte_idcd        , a.crte_urif																")
			.where(" from sale_rett_item a 																					")
			.where(" left outer join sale_rett_mast b on a.invc_numb = b.invc_numb											")
			.where(" left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where(" left outer join unit_mast      u on a.unit_idcd = u.unit_idcd											")
			.where(" left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd											")
			.where(" left outer join item_mast      i on a.item_idcd = i.item_idcd											")
			.where(" left outer join acpt_item     ai on a.acpt_numb = ai.invc_numb and a.acpt_seqn = ai.line_seqn			")
			.where(" left outer join acpt_mast      m on ai.invc_numb = m.invc_numb											")
			.where(" where 1=1																								")
			.where(" and   a.rett_proc_dvcd != '5000'																		")
			.where(" and   b.cstm_idcd   = :cstm_idcd1 ", arg.getParamText("cstm_idcd"))
			.where(" and   b.line_stat   < :line_stat1 ", "2" , "".equals(arg.getParamText("line_stat")))
			.where(" and   b.invc_numb   = :invc_numb1 ", arg.getParamText("invc_numb"))
			.where(" and   m.acpt_dvcd   = :acpt_dvcd1 ", arg.getParamText("acpt_dvcd"))
		;
		data.param
			.where(" and   b.invc_date >= :invc_date1", arg.getParamText("invc_date1"))//납기일
			.where(" and   b.invc_date <= :invc_date2", arg.getParamText("invc_date2"))
			.where(" group by a.invc_numb,a.line_seqn																		")
			.where(" having (sale_amnt-sply_amnt) > 0")
		;
		data.param
			.where(") a 																									")
			.where("group by cstm_idcd																						")
		;

		SqlResultMap info = new SqlResultMap();
		info.add(0, new SqlResultRow());
		info.get(0).put("product", data.selectForMap());

		return info;
	}


	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();

		for (SqlResultRow row:map) {
			SqlResultMap product = row.getParameter("product", SqlResultMap.class);

			// 23.10.17 - 이강훈 - 출고일자를 납기일자와 같이 사용 변경, 일자구분코드 추가
			String param = trans.TranslateInvoice(map, product, "acpt_dvcd,drtr_idcd,drtr_name,publ_date,rqod_rcvd_dvcd,vatx_dvcd,bzpl_idcd,acpt_dvcd,deli_date1,deli_date2,deli_yorn", "cstm_idcd,invc_numb,amnt,sply,remk_text,sale_deff_amnt,rett_deff_amnt,vatx");

			data.param
				.query("call crdt_work_insert(	")
				.query("	:param	",param		)
				.query(")						")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setInvoice2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();

		for (SqlResultRow row:map) {
			SqlResultMap product = row.getParameter("product", SqlResultMap.class);

			// 23.10.17 - 이강훈 - 출고일자를 납기일자와 같이 사용 변경, 일자구분코드 추가
			String param = trans.TranslateInvoice(map, product, "acpt_dvcd,drtr_idcd,drtr_name,publ_date,rqod_rcvd_dvcd,vatx_dvcd,bzpl_idcd,acpt_dvcd,invc_date1,invc_date2", "cstm_idcd,invc_numb,amnt,sply,remk_text");

			data.param
				.query("call crdt_work_insert_rett(	")
				.query("	:param	",param		)
				.query(")						")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map ) throws Exception {

		int i = 1;
		String invc = "";

		for(SqlResultRow row:map) {
			if(row.getParamText("chk").equals("1")){
				data.param
					.table("txbl_mast")
					.where("where invc_numb = :invc_numb")
					.where("and   puch_sale_dvcd = :puch_sale_dvcd")

					.unique("invc_numb", row.fixParameter("new_invc_numb"))
					.unique("puch_sale_dvcd", "2000")

					.update("publ_date"		, mst.getParameter("publ_date"))
					.update("invc_date"		, new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.update("cstm_idcd"		, row.getParameter("cstm_idcd"))
					.update("drtr_idcd"		, mst.getParameter("drtr_idcd"))
					.update("dept_idcd"		, mst.getParameter("dept_idcd"))
					.update("mail_addr"		, row.getParameter("mail_addr"))
					.update("bzpl_idcd"		, mst.getParameter("bzpl_idcd"))
					.update("rqod_rcvd_dvcd", mst.getParameter("rqod_rcvd_dvcd"))
					.update("vatx_dvcd"		, mst.getParameter("vatx_dvcd"))

					.update("user_memo"			, row.getParameter("user_memo"			))
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.update("line_levl"			, row.getParameter("line_levl"			))
					.update("line_ordr"			, row.getParameter("line_ordr"			))
					.update("line_stat"			, row.getParameter("line_stat"			))
					.update("line_clos"			, row.getParameter("line_clos"			))
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("invc_numb"			).trim()
												+ row.getParamText("expt_lcal_name"		).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.update("updt_urif"			, row.getParameter("updt_urif"			))
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.insert("crte_urif"			, row.getParameter("crte_urif"			))
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
			if(invc.equals(row.fixParamText("new_invc_numb"))){
				i++;
			}else{
				invc = row.fixParamText("new_invc_numb");
				i = 1;
			}
			data.param
				.table("txbl_item")
				.where("where invc_numb      = :invc_numb		")
				.where("and   puch_sale_dvcd = :puch_sale_dvcd	")
				.where("and   line_seqn      = :line_seqn		")

				.unique("invc_numb", row.fixParameter("new_invc_numb"))
				.unique("puch_sale_dvcd", "2000					")
				.unique("line_seqn", i)

				.update("acct_bacd"		, arg.getParameter("acct_bacd"))
				.update("item_idcd"		, row.getParameter("item_idcd"))
				.update("item_name"		, row.getParameter("item_name"))
				.update("item_spec"		, row.getParameter("item_spec"))
				.update("lott_numb"		, row.getParameter("lott_numb"))
				.update("vatx_incl_yorn", row.getParameter("vatx_incl_yorn"))
				.update("vatx_rate"		, row.getParameter("vatx_rate"))
				.update("qntt"			, row.getParameter("qntt"))
				.update("sply_pric"		, row.getParameter("sply_pric"))
				.update("sply_amnt"		, row.getParameter("amnt"))
				.update("vatx_amnt"		, row.getParameter("vatx"))
				.update("ttsm_amnt"		, row.getParameter("sply"))
				.update("stnd_unit"		, row.getParameter("stnd_unit"))
				.update("stnd_unit_qntt", row.getParameter("stnd_unit_qntt"))
				.update("remk_text"		, row.getParameter("remk_text"))
				.update("prof_data"		, row.getParameter("prof_data"))
				.update("orig_invc_numb", row.getParameter("invc_numb"))
				.update("orig_invc_seqn", row.getParameter("line_seqn"))
				.update("orig_seqn"		, row.getParameter("orig_seqn"))


				.update("user_memo"			, row.getParameter("user_memo"			))
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
				.update("line_levl"			, row.getParameter("line_levl"			))
				.update("line_ordr"			, row.getParameter("line_ordr"			))
				.update("line_stat"			, row.getParameter("line_stat"			))
				.update("line_clos"			, row.getParameter("line_clos"			))
				.update("find_name"			, row.getParamText("invc_date"			).trim()
											+ row.getParamText("invc_numb"			).trim()
											+ row.getParamText("expt_lcal_name"		).trim())
				.update("updt_user_name"	, row.getParameter("updt_user_name"		))
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.update("updt_urif"			, row.getParameter("updt_urif"			))
				.insert("crte_user_name"	, row.getParameter("crte_user_name"		))
				.insert("crte_ipad"			, row.getParameter("crte_ipad"			))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.insert("crte_urif"			, row.getParameter("crte_urif"			))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}
	}
	public SqlResultMap setTaxSend(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String msg = "";
		String mailError = "";
		for (SqlResultRow row:map) {
			data.param
				.query("select   ifnull(a.sply_amnt,0) as sply_amnt						")
				.query("       , ifnull(a.vatx_amnt,0) as vatx_amnt						")
				.query("       , b.buss_numb     , b.lgin_idcd     , b.lgin_pswd		")
				.query("       , b.tele_numb     , b.mail_addr     , c.user_name		")
				.query("       , z.buss_type     , z.buss_kind     						")
				.query("       , s.buss_type as cstm_buss_type							")
				.query("       , s.buss_kind as cstm_buss_kind							")
				.query("       , s.tele_numb as cstm_tele_numb							")
				.query("       , a.item_name											")
				.query("       , a.qntt          , round((a.sply_amnt/a.qntt),0) as sply_pric	")
			;
			data.param
				.where("from txbl_item a											")
				.where("left outer join txbl_mast m on a.invc_numb = m.invc_numb 	")
				.where("left outer join cstm_mast s on s.cstm_idcd = m.cstm_idcd 	")
				.where(", baro_logn b 												")
				.where("left outer join user_mast c on b.user_idcd = c.user_idcd 	")
				.where("left outer join bzpl_mast z on b.buss_numb = z.buss_numb	")
				.where("where a.invc_numb = :invc_numb",row.fixParameter("invc_numb"))
				.where("and   b.user_idcd = :user_idcd",row.fixParameter("crte_idcd"))
			;

			SqlResultMap mnt =  data.selectForMap();
			Tests test = new Tests();
			int res = test.RegistAndIssueTaxInvoice(row, mnt,new BaroBillService().getKey());
			com.baroservice.api.barobill.Tests error = new com.baroservice.api.barobill.Tests();
			if(res < 0) {
				msg = error.GetError( Integer.toString(res));
			}else{
				data.clear();
				data.param
					.table("txbl_mast")

					.where("where invc_numb = :invc_numb")

					.unique("invc_numb",row.fixParameter("invc_numb"))

					.update("trsm_dvcd", "1")
					.update("trsm_yorn", "1")
					.update("trsm_dttm", new SimpleDateFormat("yyyyMMddHHmm").format(new Date()))
					.update("updt_idcd", row.getParameter("crte_idcd"))
					.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmm").format(new Date()))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.query("select a.drtr_mail_addr		")
					.where("from   cstm_drtr a			")
					.where("where  a.cstm_idcd = :cstm_idcd	",row.fixParameter("cstm_idcd"))
					.where("and    a.drtr_dvcd = '6000'	") // 세금계산서담당자
					.where("and    a.drtr_mail_addr <> ''		") // 세금계산서담당자
					.where("and    a.drtr_mail_addr is not null	") // 세금계산서담당자
				;
				SqlResultMap drtr = data.selectForMap();
				data.clear();

				for (SqlResultRow drtrRow : drtr) {
					int res2 =  test.ReSendEmail(new BaroBillService().getKey(), row.fixParamText("bzpl_buss_numb").replaceAll("-", ""), row.fixParamText("invc_numb"), drtrRow.fixParamText("drtr_mail_addr"));
					if(res2 < 0 ) {
						msg = barobillApiService.taxInvoice.getErrString(new BaroBillService().getKey(),res2);
					}
				}
			}
		}



		SqlResultRow ro = new SqlResultRow();
		ro.setParameter("result", msg);
		ro.setParameter("mailError", mailError);
		SqlResultMap result = new SqlResultMap();
		result.add(ro);
		return result;
	}
	public SqlResultMap reSendMail(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String msg = "";
		for (SqlResultRow row : map) {
			data.param
				.query("select a.drtr_mail_addr		")
				.where("from   cstm_drtr a			")
				.where("where  a.cstm_idcd = :cstm_idcd	",row.fixParameter("cstm_idcd"))
				.where("and    a.drtr_dvcd = '6000'	") // 세금계산서담당자
				.where("and    a.drtr_mail_addr <> ''		") // 세금계산서담당자
				.where("and    a.drtr_mail_addr is not null	") // 세금계산서담당자
			;
			SqlResultMap drtr = data.selectForMap();
			data.clear();
			Tests test = new Tests();
			int res = test.ReSendEmail(new BaroBillService().getKey(), row.fixParamText("bzpl_buss_numb").replaceAll("-", ""), row.fixParamText("invc_numb"), row.fixParamText("mail_addr"));

			if(res<0) {
				msg = barobillApiService.taxInvoice.getErrString(new BaroBillService().getKey(),res);
			}

			for (SqlResultRow drtrRow : drtr) {
				int res2 = test.ReSendEmail(new BaroBillService().getKey(), row.fixParamText("bzpl_buss_numb").replaceAll("-", ""), row.fixParamText("invc_numb"), drtrRow.fixParamText("drtr_mail_addr"));

				if(res2<0) {
					msg = barobillApiService.taxInvoice.getErrString(new BaroBillService().getKey(),res2);
				}
			}
		}
		SqlResultRow ro = new SqlResultRow();
		ro.setParameter("result", msg);
		SqlResultMap result = new SqlResultMap();
		result.add(ro);
		return result;
	}
	//TODO Popup
	public SqlResultMap setPopup(HttpRequestArgument arg) throws Exception {
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SqlResultRow row = arg.getParameter("master",SqlResultRow.class);
		DataMessage data = arg.newStorage("POS");
		String msg = "";
		String text = "";
		Tests barobil = new Tests();
		com.baroservice.api.barobill.Tests error = new com.baroservice.api.barobill.Tests();
		if(row.fixParamText("txbl_mdfy_dvcd").equals("1")){
			data.param
				.query("select      a.vatx_dvcd       , a.rqod_rcvd_dvcd   , a.publ_date     , a.remk_text		")
				.query("          , a.puch_sale_dvcd  , a.bzpl_idcd        , a.cstm_idcd						")
				.query("          , a.sply_amnt*-1 as sply_amnt_form											")
				.query("          , a.vatx_amnt*-1 as vatx_amnt_form											")
				.query("          , a.ttsm_amnt*-1 as ttsm_amnt_form											")
				.query("          , b.buss_name as bzpl_buss_name												")
				.query("          , b.buss_numb as bzpl_buss_numb												")
				.query("          , b.boss_name as bzpl_boss_name												")
				.query("          , concat(ifnull(b.addr_1fst,''),' ',ifnull(b.addr_2snd,'')) as bzpl_addr		")
				.query("          , b.buss_type as bzpl_buss_type												")
				.query("          , b.buss_kind as bzpl_buss_kind												")
				.query("          , concat(ifnull(cd.addr_1fst,''),' ',ifnull(cd.addr_2snd,'')) as cstm_addr	")
				.query("          , c.cstm_code     , c.cstm_name     , c.buss_numb     , c.buss_name			")
				.query("          , c.boss_name     , c.buss_type     , c.buss_kind								")
				.query("          , ifnull(cu.drtr_hdph_numb,c.tele_numb) as tele_numb							")
				.query("          , ifnull(cu.drtr_name,c.boss_name) as drtr_name								")
				.query("          , ifnull(cu.drtr_mail_addr,c.mail_addr) as mail_addr							")

				.query("          , :lgin_idcd  as lgin_idcd								" ,row.fixParameter("lgin_idcd"))
				.query("          , :drtr_idcd  as drtr_idcd								" ,row.fixParameter("drtr_idcd"))
				.query("          , :bzpl_drtr_name as bzpl_drtr_name						" ,row.fixParameter("bzpl_drtr_name"))
				.query("          , :bzpl_tele_numb as bzpl_tele_numb						" ,row.fixParameter("bzpl_tele_numb"))
				.query("          , :bzpl_mail_addr as bzpl_mail_addr						" ,row.fixParameter("bzpl_mail_addr"))
				.query("          , :new_invc_numb as new_invc_numb							" ,row.fixParameter("new_invc_numb2"))
				.query("          , :txbl_mdfy_dvcd as txbl_mdfy_dvcd						" ,row.fixParameter("txbl_mdfy_dvcd"))

				.where("from txbl_mast a																					")
				.where("left outer join bzpl_mast b on a.bzpl_idcd = b.bzpl_idcd											")
				.where("left outer join cstm_mast c  on a.cstm_idcd = c.cstm_idcd											")
				.where("left outer join cstm_addr cd on c.cstm_idcd = cd.cstm_idcd											")
				.where("left outer join cstm_drtr cu on c.cstm_idcd = cu.cstm_idcd and cu.rpst_drtr_yorn = '1'				")
				.where("where a.invc_numb = :invc_numb",row.fixParameter("invc_numb"))
				.where("and   a.line_stat = '0'										")
//				.where("and   l.lgin_idcd = :lgin_idcd",row.fixParameter("lgin_idcd"))
			;
			SqlResultRow mast = data.selectForRow();

			data.clear();
//
			data.param
				.query("select  line_seqn    , item_name    , item_idcd      , item_spec					")
				.query("      , acct_bacd    , lott_numb    , orig_invc_numb , orig_invc_seqn				")
				.query("      , orig_seqn    , qntt*-1 as qntt          , round((sply_amnt/qntt),0) as sply_pric	")
				.query("      , sply_amnt*-1 as sply_amnt  , vatx_amnt*-1 as vatx_amnt						")
				.query("      , ((sply_amnt+vatx_amnt)*-1) as ttsm_amnt , orig_invc_type					")

				.where("from  txbl_item							")
				.where("where invc_numb = :invc_numb 			",row.fixParameter("invc_numb"))
			;
			SqlResultMap detail = data.selectForMap();

			for(SqlResultRow r : detail){
				System.out.println(r.toString());
			}
			data.clear();
			int res = barobil.ModifyTaxInvoice(mast, detail,new BaroBillService().getKey());
			if(res < 0) {
				text = error.GetError( Integer.toString(res));
			}
			if(text==""){
				data.param
					.table("txbl_mast")

					.where("where invc_numb = :invc_numb")

					.unique("invc_numb", row.fixParameter("new_invc_numb2"))

					.insert("puch_sale_dvcd", mast.getParameter("puch_sale_dvcd"))
					.insert("invc_date", new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.insert("bzpl_idcd", row.getParameter("bzpl_idcd"))
					.insert("vatx_dvcd", mast.getParameter("vatx_dvcd"))
					.insert("cstm_idcd", mast.getParameter("cstm_idcd"))
					.insert("drtr_idcd", mast.getParameter("drtr_idcd"))
					.insert("drtr_name", mast.getParameter("bzpl_drtr_name"))
					.insert("mail_addr", mast.getParameter("bzpl_mail_addr"))
					.insert("sply_amnt", mast.getParameter("sply_amnt_form"))
					.insert("vatx_amnt", mast.getParameter("vatx_amnt_form"))
					.insert("ttsm_amnt", mast.getParameter("ttsm_amnt_form"))
					.insert("rqod_rcvd_dvcd", mast.getParameter("rqod_rcvd_dvcd"))
					.insert("publ_date", row.getParameter("publ_date") )
					.insert("trsm_yorn", "1")
					.insert("trsm_dvcd", "2")
					.insert("trsm_dttm", new SimpleDateFormat("yyyyMMddHHmm").format(new Date()))
					.insert("crte_idcd", mast.getParameter("drtr_idcd"))
					.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("line_clos", 1)
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();


				for (SqlResultRow de:detail) {
//					System.out.println("$$$$$$$$$$$$$$$$$$$$567"+de.getParameter("orig_invc_type"));
					if(de.getParameter("qntt").equals("") || de.getParameter("qntt").equals("0")){
						data.param
							.table("txbl_item")
							.where("where puch_sale_dvcd = :puch_sale_dvcd	")
							.where("and   invc_numb      = :invc_numb		")
							.where("and   line_seqn      = :line_seqn		")

							.unique("puch_sale_dvcd", mast.fixParameter("puch_sale_dvcd"))
							.unique("invc_numb"		, row.fixParameter("invc_numb"))
							.unique("line_seqn"		, de.fixParameter("line_seqn"))
						;
						data.attach(Action.delete);
					}else{
						data.param
							.table("txbl_item")
							.where("where puch_sale_dvcd = :puch_sale_dvcd	")
							.where("and   invc_numb      = :invc_numb		")
							.where("and   line_seqn      = :line_seqn		")

							.unique("puch_sale_dvcd", mast.fixParameter("puch_sale_dvcd"))
							.unique("invc_numb"		, row.fixParameter("new_invc_numb2"))
							.unique("line_seqn"		, de.fixParameter("line_seqn"))

							.insert("item_idcd"		, de.getParameter("item_idcd"))
							.insert("item_name"		, de.getParameter("item_name"))
							.insert("item_spec"		, de.getParameter("item_spec"))
							.insert("acct_bacd"		, de.getParameter("acct_bacd"))
							.insert("lott_numb"		, de.getParameter("lott_numb"))
							.insert("orig_invc_type", de.getParameter("orig_invc_type"))
							.insert("orig_invc_numb", de.getParameter("orig_invc_numb"))
							.insert("orig_invc_seqn", de.getParameter("orig_invc_seqn"))
							.insert("prnt_idcd"		, de.getParameter("invc_numb"))
							.insert("orig_seqn"		, de.getParameter("orig_seqn"))
							.insert("qntt"			, de.getParameter("qntt"))
							.insert("sply_pric"		, de.getParameter("sply_pric"))
							.insert("sply_amnt"		, de.getParameter("sply_amnt"))
							.insert("vatx_amnt"		, de.getParameter("vatx_amnt"))
							.insert("ttsm_amnt"		, de.getParameter("ttsm_amnt"))
						;
						data.attach(Action.insert);
					}
				}
				data.execute();
				data.clear();
			}
		}
		if(text!=""){
			msg = text;
		}else{
			int res = barobil.ModifyTaxInvoice(row, map,new BaroBillService().getKey());
			if(res < 0) {
				text = error.GetError( Integer.toString(res));
			}
			if(text!=""){
				msg = text;
			}else{
				data.param
					.table("txbl_mast")

					.where("where invc_numb = :invc_numb")

					.unique("invc_numb", row.fixParameter("new_invc_numb"))

					.insert("puch_sale_dvcd", "2000")
					.insert("invc_date", new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.insert("bzpl_idcd", row.getParameter("bzpl_idcd"))
					.insert("cstm_idcd", row.getParameter("cstm_idcd"))
					.insert("drtr_idcd", row.getParameter("drtr_idcd"))
					.insert("drtr_name", row.getParameter("bzpl_drtr_name"))
					.insert("mail_addr", row.getParameter("bzpl_mail_addr"))
					.insert("sply_amnt", row.getParameter("sply_amnt_form"))
					.insert("vatx_amnt", row.getParameter("vatx_amnt_form"))
					.insert("ttsm_amnt", row.getParameter("ttsm_amnt_form"))
					.insert("rqod_rcvd_dvcd", row.getParameter("rqod_rcvd_dvcd"))
					.insert("trsm_yorn", "1")
					.insert("trsm_dvcd", "2")
					.insert("trsm_dttm", new SimpleDateFormat("yyyyMMddHHmm").format(new Date()))
					.insert("publ_date", row.getParameter("publ_date") )
					.insert("crte_idcd", row.getParameter("drtr_idcd"))
					.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				int i = 1;
				for (SqlResultRow de:map) {
//					System.out.println("$$$$$$$$$$$$$$$$$$$$123"+de.getParameter("orig_invc_type"));
//					System.out.println("$$$$$$$$$$$$$$$$$$$$5555555"+de);
					if(de.getParameter("qntt").equals("") || de.getParameter("qntt").equals("0")){
						data.param
							.table("txbl_item")
							.where("where puch_sale_dvcd = :puch_sale_dvcd	")
							.where("and   invc_numb      = :invc_numb		")
							.where("and   line_seqn      = :line_seqn		")

							.unique("puch_sale_dvcd", "2000")
							.unique("invc_numb"		, row.fixParameter("invc_numb"))
							.unique("line_seqn"		, de.fixParameter("line_seqn"))
						;
						data.attach(Action.delete);
					}else{
						data.param
							.table("txbl_item")
							.where("where puch_sale_dvcd = :puch_sale_dvcd	")
							.where("and   invc_numb      = :invc_numb		")
							.where("and   line_seqn      = :line_seqn		")

							.unique("puch_sale_dvcd", "2000")
							.unique("invc_numb", row.fixParameter("new_invc_numb"))
							.unique("line_seqn", i++)

							.insert("item_idcd", de.getParameter("item_idcd"))
							.insert("item_name", de.getParameter("item_name"))
							.insert("item_spec", de.getParameter("item_spec"))
							.insert("acct_bacd", de.getParameter("acct_bacd"))
							.insert("lott_numb", de.getParameter("lott_numb"))
							.insert("orig_invc_type", de.getParameter("orig_invc_type"))
							.insert("orig_invc_numb", de.getParameter("orig_invc_numb"))
							.insert("orig_invc_seqn", de.getParameter("orig_invc_seqn"))
							.insert("prnt_idcd", de.getParameter("invc_numb"))
/*							.insert("orig_invc_numb", row.getParameter("new_invc_numb"))     2024.01.18 임수찬 수정 반품관련 수정
							.insert("orig_invc_seqn", i++)							*/
							.insert("qntt", de.getParameter("qntt"))
							.insert("sply_pric", de.getParameter("sply_pric"))
							.insert("sply_amnt", de.getParameter("sply_amnt"))
							.insert("vatx_amnt", de.getParameter("vatx_amnt"))
							.insert("ttsm_amnt", de.getParameter("ttsm_amnt"))
						;
						data.attach(Action.insert);
					}
				}
				data.execute();
				data.clear();
			}
		}
		SqlResultRow ro = new SqlResultRow();
		ro.setParameter("result", msg);
		SqlResultMap result = new SqlResultMap();
		result.add(ro);

//		System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+row.getParameter("new_invc_numb"));
//		System.out.println("############################"+row.getParameter("new_invc_numb2"));

		data.param
			.query("update txbl_mast						")
			.query("   set line_clos = 1					")
			.query(" where invc_numb  = :invc_numb2" , row.getParameter("invc_numb") )
		;
		data.attach(Action.direct);

		data.param
			.query("update txbl_mast 						")
			.query("   set prnt_idcd = :invc_numb2" , row.getParameter("invc_numb") )
			.query(" where invc_numb  = :invc_numb3" , row.getParameter("new_invc_numb") )
		;
		data.attach(Action.direct);


		data.param
			.query("call sale_update (	")
			.query("   :invc_numb "	, row.getParameter("new_invc_numb"))
			.query(" , :orig_invc_numb", row.getParameter("invc_numb"))
			.query(")					")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return result;
	}

	public SqlResultMap setDeleteMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table("txbl_mast")
				.where("where invc_numb = :invc_numb")

				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);

			data.param
				.table("txbl_item")

				.where("where invc_numb = :invc_numb")
				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);

			data.param
				.table("sale_mast")

				.where("where prnt_idcd = :invc_numb")
				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);

			data.param
				.table("sale_item")

				.where("where prnt_idcd = :invc_numb")
				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
		}
		data.execute();

		return null;
	}
}
