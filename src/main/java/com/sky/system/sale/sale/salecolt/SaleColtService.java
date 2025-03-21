package com.sky.system.sale.sale.salecolt;

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


@Service("sale.SaleColtService")
public class SaleColtService extends DefaultServiceHandler {

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
			.where("with sale as (																												")
			.where("   select a.invc_numb, b.line_seqn																							")
			.where("     from sale_mast a																										")
			.where("          left outer join sale_item b on b.invc_numb = a.invc_numb															")
			.where("          left outer join acpt_mast d on d.invc_numb = b.acpt_numb															")
			.where("    where 1 = 1																												")
			.where("      and a.bzpl_idcd  = :bzpl_idcd"    , arg.getParamText("bzpl_idcd"))	// 사업장
			.where("      and a.invc_date >= :sale_date1"   , arg.getParamText("sale_date1")) 	// 매출기간
			.where("      and a.invc_date <= :sale_date2"   , arg.getParamText("sale_date2"))
			.where("      and a.cstm_idcd >= :cstm_idcd"    , arg.getParamText("cstm_idcd"))	// 거래처
			.where("      and d.drtr_idcd  = :drtr_idcd"     , arg.getParamText("drtr_idcd"))
			.where("      and a.line_stat  < :line_stat"     , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("), colt as (																												")
			.where("   select c.invc_numb, sum(b.sply_amnt) as sply_amnt, sum(b.vatx_amnt) as vatx_amnt, sum(b.ttsm_amnt) as ttsm_amnt 			")
			.where("        , group_concat(b.line_seqn) as line_seqn																		")
			.where("     from sale a																											")
			.where("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn				")
			.where("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb														")
			.where("    where 1 = 1																												")
			.where("      and c.iomy_dvcd = '1'																									")
			.where("      and c.iomy_date >= :iomy_date1"   , arg.getParamText("iomy_date1")) 	// 수금일자
			.where("      and c.iomy_date <= :iomy_date2"   , arg.getParamText("iomy_date2"))
			.where("      and c.line_stat < 2	 																								")
			.where("    group by c.invc_numb																									")
			.where(")																															")
			.where("select b.invc_date, c.cstm_code, c.cstm_name, d.dept_name, e.user_name, a.sply_amnt, a.vatx_amnt, a.ttsm_amnt				")
			.where("     , b.stot_dvcd, b.stot_bass																		")
			.where("     , a.invc_numb, a.line_seqn																		")
			.where("  from colt a																												")
			.where("       left outer join crdt_colt_mast b on b.invc_numb = a.invc_numb														")
			.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd																")
			.where("       left outer join dept_mast d on d.dept_idcd = b.dept_idcd																")
			.where("       left outer join user_mast e on e.user_idcd = b.drtr_idcd																")
			.where(" where 1 = 1																												")
			.where(") a																															")
			.where("order by a.invc_date desc, a.cstm_code																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] line_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("line_seqn"))) {
			 line_seqn = ((String)arg.getParameter("line_seqn")).split(",");
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																													")
		;
		data.param
			.where("from (																														")
			.where("select b.line_seqn, e.item_code, b.item_name, b.item_spec  																")
			.where("     , d.sale_unit, d.sale_qntt, d.sale_pric, d.sale_amnt, d.vatx_amnt, d.ttsm_amnt, b.iomy_amnt							")
			.where("     , concat(d.acpt_numb, '-', d.acpt_seqn) as acpt_numb, concat(b.txbl_numb, '-', b.txbl_seqn) as txbl_numb				")
			.where("     , '' as remk																											")
			.where("  from crdt_colt_mast a																							")
			.where("       left outer join crdt_colt_item b on b.invc_numb = a.invc_numb														")
			.where("       left outer join sale_mast c on c.invc_numb = b.orig_invc_numb														")
			.where("       left outer join sale_item d on d.invc_numb = c.invc_numb and d.line_seqn = b.orig_invc_seqn							")
			.where("       left outer join item_mast e on e.item_idcd = b.item_idcd																")
			.where(" where 1 = 1																												")
			.where("   and a.iomy_dvcd = '1'																									")	// 사업장
			.where("   and a.invc_numb = :invc_numb"   , arg.getParamText("invc_numb"))
			.where("   and b.line_seqn in (:line_seqn)", line_seqn)
			.where(") a																															")
			.where("order by a.line_seqn																										")
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
			.where("with sale as (																												")
			.where("   select a.invc_numb, b.line_seqn, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt							")
			.where("     from sale_mast a																										")
			.where("          left outer join sale_item b on b.invc_numb = a.invc_numb															")
			.where("    where 1 = 1																												")
			.where("      and a.bzpl_idcd  = :bzpl_idcd"    , arg.getParamText("bzpl_idcd"))	// 사업장
			.where("      and a.invc_date >= :sale_date1"   , arg.getParamText("sale_date1")) 	// 매출기간
			.where("      and a.invc_date <= :sale_date2"   , arg.getParamText("sale_date2"))
			.where("      and a.cstm_idcd >= :cstm_idcd"    , arg.getParamText("cstm_idcd"))	// 거래처
			.where("      and a.drtr_idcd >= :drtr_idcd"    , arg.getParamText("drtr_idcd"))	// 담당자
			.where("      and a.line_stat  < 2																									")
			.where("), colt as (																												")
			.where("   select a.invc_numb, b.line_seqn, sum(b.iomy_amnt) as iomy_amnt 															")
			.where("     from sale a																											")
			.where("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn				")
			.where("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb														")
			.where("    where 1 = 1																												")
			.where("      and c.iomy_dvcd = '1'																									")
			.where("      and c.line_stat < 2	 																								")
			.where("    group by a.invc_numb, b.line_seqn																						")
			.where(")																															")
			.where("select b.invc_date, c.cstm_code, c.cstm_name																				")
			.where("     , a.sale_amnt, a.vatx_amnt, a.ttsm_amnt, a.iomy_amnt, (a.ttsm_amnt - a.iomy_amnt) as npay_amnt							")
			.where("     , c.tele_numb, c.buss_numb, c.mail_addr, d.dept_name, e.user_name														")
			.where("     , a.invc_numb, a.line_seqn																								")
			.where("  from (																													")
			.where("        select a.invc_numb, sum(a.sale_amnt) as sale_amnt, sum(a.vatx_amnt) as vatx_amnt, sum(a.ttsm_amnt) as ttsm_amnt 	")
			.where("             , ifnull(b.iomy_amnt, 0) as iomy_amnt 																			")
			.where("             , group_concat(a.line_seqn) as line_seqn 																		")
			.where("          from sale a																										")
			.where("               left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn							")
			.where("         where 1 = 1																										")
			.where("           and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)																			")
			.where("         group by a.invc_numb 																								")
			.where("       ) a																													")
			.where("       left outer join sale_mast b on b.invc_numb = a.invc_numb																")
			.where("       left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd																")
			.where("       left outer join dept_mast d on d.dept_idcd = b.dept_idcd																")
			.where("       left outer join user_mast e on e.user_idcd = b.drtr_idcd																")
			.where(") a																															")
			.where("order by a.invc_date desc, a.cstm_code																						")
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
		.where("with sale as (																												")
		.where("   select a.invc_numb, b.line_seqn, b.item_idcd, b.sale_qntt, b.sale_pric, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt			")
		.where("        , b.acpt_numb, b.acpt_seqn																							")
		.where("     from sale_mast a																										")
		.where("          left outer join sale_item b on b.invc_numb = a.invc_numb															")
		.where("    where 1 = 1																												")
		.where("      and a.invc_numb = :invc_numb"    	, arg.getParamText("invc_numb"))	// 사업장
		.where("      and b.line_seqn in (:line_seqn)"  , line_seqn)						// 매출기간
		.where("), colt as (																												")
		.where("   select a.invc_numb, b.line_seqn, sum(b.iomy_amnt) as iomy_amnt 															")
		.where("     from sale a																											")
		.where("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn				")
		.where("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb														")
		.where("    where 1 = 1																												")
		.where("      and c.iomy_dvcd = '1'																									")
		.where("      and c.line_stat < 2	 																								")
		.where("    group by a.invc_numb, b.line_seqn																						")
		.where(")																															")
		.where("select a.line_seqn, b.item_code, b.item_name, b.item_spec																	")
		.where("     , a.sale_qntt, a.sale_pric, a.sale_amnt, a.vatx_amnt, a.ttsm_amnt, a.iomy_amnt											")
		.where("     , (a.ttsm_amnt - a.iomy_amnt) as npay_amnt																				")
		.where("     , concat(a.acpt_numb, '-', a.acpt_seqn) as remk																		")
		.where("  from (																													")
		.where("        select a.*, ifnull(b.iomy_amnt, 0) as iomy_amnt 																	")
		.where("          from sale a																										")
		.where("               left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn							")
		.where("         where 1 = 1																										")
		.where("           and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)																			")
		.where("       ) a																													")
		.where("       left outer join item_mast b on b.item_idcd = a.item_idcd																")
		.where(") a																															")
		.where("order by a.line_seqn																										")
	;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with sale as (																									")
			.query("   select a.invc_numb  , b.line_seqn  , c.item_code  , c.item_name  , c.item_spec , a.invc_date					")
			.query("        , b.sale_unit  , b.sale_qntt  , b.sale_pric  , b.sale_amnt  , b.vatx_amnt , b.ttsm_amnt  , b.user_memo	")
			.query("        , a.cstm_idcd  , b.item_idcd																			")
			.query("     from sale_mast a																							")
			.query("        left outer join sale_item b on b.invc_numb = a.invc_numb												")
			.query("        left outer join item_mast c on c.item_idcd = b.item_idcd												")
			.query("    where 1 = 1																									")
			.query("      and a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("      and a.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("      and a.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("      and a.line_stat < 2																						")
			.query("), colt  as (																									")
			.query("   select a.invc_numb, a.line_seqn, sum(b.iomy_amnt) as iomy_amnt												")
			.query("     from sale a																								")
			.query("          left outer join crdt_colt_item b on b.orig_invc_numb = a.invc_numb and b.orig_invc_seqn = a.line_seqn	")
			.query("          left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb											")
			.query("   where 1 = 1																									")
			.query("     and c.iomy_dvcd = '1'																						")
			.query("     and c.line_stat < 2																						")
			.query("   group by a.invc_numb, a.line_seqn																			")
			.query(")																												")
			.query("select a.*																										")
			.query("     , a.ttsm_amnt - ifnull(b.iomy_amnt,0) as unpaid												")
			.query("  from sale a 																									")
			.query("       left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn						")
			.query(" where 1 = 1																									")
			.query("   and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)																		")
			.query(" order by a.invc_date desc   , a.invc_numb desc   , a.line_seqn													")
		;

		return data.selectForMap();

	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {

			if(i == 0){
				//등록
				data.param
					.table ("crdt_colt_mast")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")

					.unique("iomy_dvcd"			, 1)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))	//INVOICE번호

					.update("invc_date"			, row.getParameter("invc_date"))		//발행일자
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//세금계산서 일련번호
					.update("dept_idcd"			, row.getParameter("dept_idcd"))		//부서ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))		//담당자ID
					.update("iomy_date"			, row.getParameter("iomy_date"))		//입출금일자
					.update("stot_dvcd"			, row.getParameter("stot_dvcd"))		//결제구분코드
					.update("stot_bass"			, row.getParameter("stot_bass"))		//결제근거
					.update("publ_date"			, row.getParameter("publ_date"))		//발행일자
					.update("expr_date"			, row.getParameter("expr_date"))		//만기일자
					.update("paym_bank_name"	, row.getParameter("paym_bank_name"))	//지급은행명
					.update("apvl_yorn"			, row.getParameter("apvl_yorn"))		//승인여부
					.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"))	//승인담당자ID
					.update("apvl_date"			, row.getParameter("apvl_date"))		//승인일자
					.update("plan_date"			, row.getParameter("plan_date"))		//계획일자
					.update("plan_amnt"			, row.getParameter("plan_amnt"))		//계획금액
					.update("remk_text"			, row.getParameter("remk_text"))		//비고
					.update("find_name"			, row.getParameter("")
												+ "	"
												+ row.getParameter(""))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("sysm_memo"			, row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

//				double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt")) ;
//				double sply_amnt = Double.parseDouble(row.getParamText("sply_amnt")) ;
//				double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt")) ;
//				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt")) ;
//
//				if( ttsm_amnt != iomy_amnt) {
//					sply_amnt = iomy_amnt / 1.1;
//					vatx_amnt = sply_amnt * 0.1;
//					ttsm_amnt = sply_amnt + vatx_amnt;
//				}

				double sale_amnt = Double.parseDouble(row.getParamText("sale_amnt"));
				double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
				double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt"));

				if(ttsm_amnt != iomy_amnt) {
					sale_amnt = ((double)Math.round(iomy_amnt / 1.1) * 10.0) / 10.0;
					vatx_amnt = iomy_amnt - sale_amnt;
					ttsm_amnt = sale_amnt + vatx_amnt;
				}

				data.param
					.table ("crdt_colt_item")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("iomy_dvcd"			, 1)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

					.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
					.update("item_name"			, row.getParameter("item_name"))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"))		//품목규격
					.update("orig_invc_numb"	, row.getParameter("invc_numb"))		//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("line_seqn"))		//원invoice순번
					.update("txbl_numb"			, row.getParameter("txbl_numb"))		//세금계산서번호
					.update("txbl_seqn"			, row.getParameter("txbl_seqn"))		//세금계산서순번
					.update("iomy_amnt"			, row.getParameter("iomy_amnt"))		//입출금금액
					.update("qntt"				, row.getParameter("qntt"))				//수량
					.update("pric"				, row.getParameter("pric"))				//단가
					.update("sply_amnt"			, sale_amnt)							//공급가액
					.update("vatx_amnt"			, vatx_amnt)							//부가세액
					.update("ttsm_amnt"			, ttsm_amnt)							//합계금액
					.update("find_name"			, row.getParameter("invc_date")
												+ "	"
												+ row.getParameter("item_name"))
					.update("user_memo"			, row.getParameter("user_memo"))
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
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				i=+1;

			}else{

				double sale_amnt = Double.parseDouble(row.getParamText("sale_amnt"));
				double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
				double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt"));

				if(ttsm_amnt != iomy_amnt) {
					sale_amnt = ((double)Math.round(iomy_amnt / 1.1) * 10.0) / 10.0;
					vatx_amnt = iomy_amnt - sale_amnt;
					ttsm_amnt = sale_amnt + vatx_amnt;
				}

				data.param
					.table ("crdt_colt_item")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("iomy_dvcd"			, 1)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

					.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
					.update("item_name"			, row.getParameter("item_name"))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"))		//품목규격
					.update("orig_invc_numb"	, row.getParameter("invc_numb"))		//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("line_seqn"))		//원invoice순번
					.update("txbl_numb"			, row.getParameter("txbl_numb"))		//세금계산서번호
					.update("txbl_seqn"			, row.getParameter("txbl_seqn"))		//세금계산서순번
					.update("iomy_amnt"			, row.getParameter("iomy_amnt"))		//입출금금액
					.update("qntt"				, row.getParameter("qntt"))				//수량
					.update("pric"				, row.getParameter("pric"))				//단가
					.update("sply_amnt"			, sale_amnt)							//공급가액
					.update("vatx_amnt"			, vatx_amnt)							//부가세액
					.update("ttsm_amnt"			, ttsm_amnt)							//합계금액
					.update("find_name"			, row.getParameter("invc_date")
												+ "	"
												+ row.getParameter("item_name"))
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
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
				}
			}

		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("crdt_colt_mast")
			.where("where invc_numb = :invc_numb ")
//			.where("and   invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
//			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

			data.param
			.table("crdt_colt_item")
//			.where("where iomy_dvcd = :iomy_dvcd ")
			.where("and   invc_numb = :invc_numb ")

//			.unique("iomy_dvcd"		, arg.fixParameter("iomy_dvcd"))
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();


		return null;
	}
}
