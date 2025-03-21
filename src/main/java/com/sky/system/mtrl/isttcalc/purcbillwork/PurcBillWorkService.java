package com.sky.system.mtrl.isttcalc.purcbillwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.axis.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("sjflv.PurcBillWorkService")
public class PurcBillWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("   select a.invc_numb, a.invc_date, d.cstm_code, d.cstm_name, a.mail_addr, a.publ_date, a.rqod_rcvd_dvcd					")
			.where("        , e.dept_name, f.user_name																							")
			.where("        , a.sply_amnt, a.vatx_amnt, a.ttsm_amnt																				")
			.where("     from txbl_mast a																										")
			.where("          left outer join cstm_mast d on d.cstm_idcd = a.cstm_idcd															")
			.where("          left outer join dept_mast e on e.dept_idcd = a.dept_idcd															")
			.where("          left outer join user_mast f on f.user_idcd = a.drtr_idcd															")
			.where("    where 1 = 1																												")
			.where("      and a.puch_sale_dvcd = '2'																							")
			.where("      and a.bzpl_idcd  = :bzpl_idcd"    , arg.getParamText("bzpl_idcd"))	// 사업장
			.where("      and a.publ_date >= :publ_date1"   , arg.getParamText("publ_date1")) 	// 매출기간
			.where("      and a.publ_date <= :publ_date2"   , arg.getParamText("publ_date2"))
			.where("      and a.cstm_idcd >= :cstm_idcd"    , arg.getParamText("cstm_idcd"))	// 거래처
			.where("      and a.line_stat  < 2																									")
			.where("      and exists (																											")
			.where("                  select '1'																								")
			.where("                    from txbl_item b																						")
			.where("                         left outer join purc_istt_mast c on c.invc_numb = b.orig_invc_numb and c.line_stat < 2				")
			.where("                   where 1 = 1																								")
			.where("                     and b.puch_sale_dvcd = a.puch_sale_dvcd																")
			.where("                     and b.invc_numb = a.invc_numb																			")
			.where("                     and c.invc_date >= :istt_date1"   , arg.getParamText("istt_date1")) 	// 매출기간
			.where("                     and c.invc_date <= :istt_date2"   , arg.getParamText("istt_date2"))
			.where("                  )																											")
			.where("    order by a.invc_numb																									")
			.where(") a																															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("select a.line_seqn, d.item_code, a.item_name, a.item_spec																	")
			.where("     , a.qntt as istt_qntt, b.istt_pric, a.sply_amnt, a.vatx_amnt, a.ttsm_amnt												")
			.where("     , concat(b.invc_numb, '-', b.line_seqn) as remk																		")
			.where("  from txbl_item a																											")
			.where("       left outer join purc_istt_item b on b.invc_numb = a.orig_invc_numb and b.line_seqn = a.orig_seqn						")
			.where("       left outer join purc_istt_mast c on c.invc_numb = b.invc_numb and c.line_stat < 2									")
			.where("       left outer join item_mast d on d.item_idcd = a.item_idcd																")
			.where(" where 1 = 1																												")
			.where("   and a.puch_sale_dvcd = '2'																									")
			.where("   and a.invc_numb = :invc_numb"   , arg.getParamText("invc_numb"))
			.where(" order by b.line_seqn																										")
			.where(") a																															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("with istt as (																												")
			.where("   select a.invc_numb, group_concat(b.line_seqn) as line_seqn							")
			.where("     from purc_istt_mast a																									")
			.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb														")
			.where("          left outer join txbl_item c on c.orig_invc_numb = b.invc_numb and c.orig_seqn = b.line_seqn						")
			.where("          left outer join txbl_mast d on d.invc_numb = c.invc_numb and d.line_stat < 2										")
			.where("    where 1 = 1																												")
			.where("      and a.bzpl_idcd  = :bzpl_idcd"    , arg.getParamText("bzpl_idcd"))	// 사업장
			.where("      and a.invc_date >= :sale_date1"   , arg.getParamText("sale_date1")) 	// 매출기간
			.where("      and a.invc_date <= :sale_date2"   , arg.getParamText("sale_date2"))
			.where("      and a.cstm_idcd >= :cstm_idcd"    , arg.getParamText("cstm_idcd"))	// 거래처
			.where("      and a.line_stat  < 2																									")
			.where("      and d.invc_numb is null																								")
			.where("    group by a.invc_numb																									")
			.where(")																															")
			.where("select a.invc_numb, b.invc_date, c.cstm_code, c.cstm_name, c.tele_numb, c.buss_numb, c.mail_addr, d.dept_name, e.user_name	")
			.where("     , a.line_seqn 																											")
			.where("  from istt a																												")
			.where("       left outer join purc_istt_mast b on b.invc_numb = a.invc_numb														")
			.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd																")
			.where("       left outer join dept_mast d on d.dept_idcd = b.dept_idcd																")
			.where("       left outer join user_mast e on e.user_idcd = b.drtr_idcd																")
			.where(") a																															")
			.where("order by a.invc_date desc, a.invc_numb desc																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] line_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("line_seqn"))) {
			 line_seqn = ((String)arg.getParameter("line_seqn")).split(",");
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																												")
		;
		data.param
		.where("from (																														")
		.where("   select b.line_seqn, c.item_code, c.item_name, c.item_spec, b.istt_qntt, b.istt_pric										")
		.where("        , b.istt_amnt as sply_amnt, b.istt_vatx as vatx_amnt, b.ttsm_amnt													")
		.where("        , concat(b.orig_invc_numb, '-', b.orig_seqn) as remk																")
		.where("     from purc_istt_mast a																									")
		.where("          left outer join purc_istt_item b on b.invc_numb = a.invc_numb														")
		.where("          left outer join item_mast c on c.item_idcd = b.item_idcd															")
		.where("    where 1 = 1																												")
		.where("      and a.invc_numb = :invc_numb"    	, arg.getParamText("invc_numb"))	// 입고번호
		.where("      and b.line_seqn in (:line_seqn)"  , line_seqn)						// 입고항번
		.where(") a																															")
		.where("order by a.line_seqn																										")
	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
