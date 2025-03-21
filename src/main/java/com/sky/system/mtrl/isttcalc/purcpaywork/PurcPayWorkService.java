package com.sky.system.mtrl.isttcalc.purcpaywork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class PurcPayWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																											")
		;
		data.param
			.where("from (																												")
			.where("with txbl as (																										")
			.where("    select a.invc_numb  , b.line_seqn																				")
			.where("      from txbl_mast a																								")
			.where("           left outer join txbl_item b on b.puch_sale_dvcd = a.puch_sale_dvcd and b.invc_numb = a.invc_numb			")
			.where("           left outer join purc_istt_mast c on c.invc_numb = b.orig_invc_numb										")
			.where("     where 1 = 1																									")
			.where("       and a.puch_sale_dvcd = '2'																					")
			.where("       and a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.where("       and a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.where("       and a.publ_date >= :publ_date1"    , arg.getParamText("publ_date1"))
			.where("       and a.publ_date <= :publ_date2"    , arg.getParamText("publ_date2"))
			.where("       and a.cstm_idcd = :cstm_idcd"    , arg.getParamText("cstm_idcd"))
			.where("       and a.line_stat < 2																							")
			.where("       and c.line_stat < 2																							")
			.where("), colt as (																										")
			.where("   select   a.invc_numb    , sum(b.sply_amnt) as sply_amnt    , sum(b.vatx_amnt) as vatx_amnt						")
			.where("          , sum(b.ttsm_amnt) as ttsm_amnt																			")
			.where("          , group_concat(b.line_seqn) as txbl_line_seqn																")
			.where("          , b.invc_numb as colt_numb																				")
			.where("      from txbl a																									")
			.where("            left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn 			")
			.where("            left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb											")
			.where("      where 1 = 1																									")
			.where("        and c.iomy_dvcd = '2'																						")
			.where("        and c.line_stat < 2	 																						")
			.where("      group by a.invc_numb																							")
			.where(")																													")
			.where("   select  b.invc_numb       , b.invc_date   , c.cstm_code   , c.cstm_name   , b.mail_addr   , b.publ_date			")
			.where("         , b.rqod_rcvd_dvcd  , d.dept_name   , e.user_name   , a.sply_amnt   , a.vatx_amnt   , a.ttsm_amnt			")
			.where("         , a.txbl_line_seqn  , a.colt_numb																			")
			.where("     from colt a																									")
			.where("            left outer join txbl_mast b on b.invc_numb = a.invc_numb												")
			.where("            left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd												")
			.where("            left outer join dept_mast d on d.dept_idcd = b.dept_idcd												")
			.where("            left outer join user_mast e on e.user_idcd = b.drtr_idcd												")
			.where("     where 1 = 1																									")
			.where(") a																													")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String [] line_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("txbl_line_seqn"))) {
				line_seqn = ((String)arg.getParameter("txbl_line_seqn")).split(",");
		}


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																											")
		;
		data.param
			.where("from (																												")
			.where("   select   b.line_seqn   , g.item_code    , b.item_name    , b.item_spec      , b.qntt								")
			.where("          , c.istt_pric   , e.sply_amnt    , e.vatx_amnt    , e.ttsm_amnt      , u.unit_name						")
			.where("          , concat(c.invc_numb, '-', c.line_seqn) as memo															")
			.where("      from txbl_mast a																								")
			.where("            left outer join txbl_item      b on b.invc_numb = a.invc_numb											")
			.where("            left outer join purc_istt_item c on c.invc_numb = b.orig_invc_numb and c.line_seqn = b.orig_seqn		")
			.where("            left outer join purc_istt_mast d on d.invc_numb = c.invc_numb											")
			.where("            left outer join crdt_colt_item e on e.txbl_numb = a.invc_numb and e.txbl_seqn = b.line_seqn				")
			.where("            left outer join crdt_colt_mast f on f.invc_numb = e.invc_numb											")
			.where("            left outer join item_mast      g on g.item_idcd = b.item_idcd											")
			.where("            left outer join unit_mast      u on g.unit_idcd = u.unit_idcd											")
			.where("     where 1 = 1																									")
			.where("       and a.puch_sale_dvcd = '2'																					")
			.where("       and a.invc_numb = :invc_numb"    , arg.getParamText("invc_numb"))
			.where("       and b.line_seqn in (:line_seqn)", line_seqn)
			.where("       and a.line_stat < 2																							")
			.where("       and d.line_stat < 2																							")
			.where("       and f.line_stat < 2																							")
			.where(") a																													")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																				")

		;
		data.param
			.query("with txbl as (																								")
			.query("   select  a.invc_numb       , b.line_seqn   , b.ttsm_amnt													")
			.query("         , b.orig_invc_numb  , b.orig_seqn 																	")
			.query("      from txbl_mast a																						")
			.query("           left outer join txbl_item b      on b.puch_sale_dvcd = a.puch_sale_dvcd and b.invc_numb = a.invc_numb	")
			.query("           left outer join purc_istt_mast c on c.invc_numb = b.orig_invc_numb								")
			.query("     where 1 = 1																							")
			.query("       and a.puch_sale_dvcd = '2'																			")
			.query("       and a.bzpl_idcd = :bzpl_idcd"      , arg.getParamText("bzpl_idcd"))
			.query("       and a.cstm_idcd = :cstm_idcd"      , arg.getParamText("cstm_idcd"))
			.query("       and a.invc_date >= :invc_date1"    , arg.getParamText("invc_date1"))
			.query("       and a.invc_date <= :invc_date2"    , arg.getParamText("invc_date2"))
			.query("       and a.publ_date >= :publ_date1"    , arg.getParamText("publ_date1"))
			.query("       and a.publ_date <= :publ_date2"    , arg.getParamText("publ_date2"))
			.query("       and a.line_stat  < 2																					")
			.query("), colt as (																								")
			.query("   select  a.invc_numb        , a.line_seqn   , sum(b.iomy_amnt) as iomy_amnt								")
			.query("      from txbl a																							")
			.query("           left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
			.query("           left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb					 				")
			.query("      where 1 = 1																							")
			.query("        and c.iomy_dvcd																						")
			 .query("       and c.line_stat < 2																				")
			.query("      group by a.invc_numb, a.line_seqn																		")
			.query(")																											")
			.query("   select  b.invc_date        , b.invc_numb   , c.cstm_code   , c.cstm_name   , c.tele_numb					")
			.query("         , c.mail_addr        , d.dept_name   , e.user_name as drtr_name      , a.istt_line_seqn			")
			.query("         , a.orig_invc_numb																					")
			.query("      from (select a.orig_invc_numb, group_concat(a.orig_seqn) as istt_line_seqn							")
			.query("           from txbl a																						")
			.query("           left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
			.query("           where 1 = 1																						")
			.query("           and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)															")
			.query("           group by orig_invc_numb																			")
			.query("           ) a																								")
			.query("      left outer join purc_istt_mast b on b.invc_numb = a.orig_invc_numb									")
			.query("      left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd												")
			.query("      left outer join dept_mast d on d.dept_idcd = b.dept_idcd												")
			.query("      left outer join user_mast e on e.user_idcd = b.drtr_idcd												")
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
		if (!StringUtils.isEmpty((String)arg.getParameter("orig_line_seqn"))) {
				line_seqn = ((String)arg.getParameter("orig_line_seqn")).split(",");
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.*																											")
		;
		data.param
			.where("from (																												")
			.where("   select   b.line_seqn   , e.item_code    , b.item_name    , b.item_spec      , b.qntt								")
			.where("          , c.istt_pric   , b.sply_amnt    , b.vatx_amnt    , b.ttsm_amnt      										")
			.where("          , concat(c.orig_invc_numb, '-', c.orig_seqn) as memo														")
			.where("          , b.ttsm_amnt - ifnull(f.iomy_amnt, 0) as unpaid 																	")
			.where("      from txbl_mast a																								")
			.where("            left outer join txbl_item b on b.invc_numb = a.invc_numb												")
			.where("            left outer join purc_istt_item c on c.invc_numb = b.orig_invc_numb and c.line_seqn = b.orig_seqn		")
			.where("            left outer join purc_istt_mast d on d.invc_numb = c.invc_numb and d.line_stat < 2						")
			.where("            left outer join item_mast e on e.item_idcd = b.item_idcd												")
			.where("            left outer join crdt_colt_item f on f.txbl_numb = a.invc_numb and f.txbl_seqn = b.line_seqn				")
			.where("            left outer join crdt_colt_mast g on g.invc_numb = f.invc_numb and g.line_stat < 2						")
			.where("     where 1 = 1																									")
			.where("       and a.puch_sale_dvcd = '2'																					")
			.where("       and b.orig_invc_numb = :invc_numb"    , arg.getParamText("orig_invc_numb"))
			.where("       and b.orig_seqn in (:line_seqn)", line_seqn)
			.where("       and a.line_stat < 2																							")
			.where(") a																													")
		;

		String [] orig_seqn = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("txbl_line_seqn"))) {
			orig_seqn = ((String)arg.getParameter("txbl_line_seqn")).split(",");
		}

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with txbl as (																							")
			.query("   select a.invc_numb, b.line_seqn																		")
			.query("        , d.item_code, b.item_name, b.item_spec  , b.sply_amnt, b.vatx_amnt, b.ttsm_amnt				")
			.query("        , c.invc_numb as istt_numb, c.invc_date as istt_date											")
			.query("        , a.cstm_idcd             , b.item_idcd  , b.qntt												")
			.query("     from txbl_mast a																					")
			.query("        left outer join txbl_item b on b.puch_sale_dvcd = a.puch_sale_dvcd and b.invc_numb = a.invc_numb")
			.query("        left outer join purc_istt_mast c on c.invc_numb = b.orig_invc_numb								")
			.query("        left outer join item_mast d on d.item_idcd = b.item_idcd										")
			.query("    where 1 = 1																							")
			.query("      and a.puch_sale_dvcd = '2'																		")
			.query("      and a.line_stat < 2																				")
			.query("      and a.cstm_idcd   = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.query("      and c.invc_date  >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("      and c.invc_date  <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("), colt  as (																							")
			.query("   select a.invc_numb  , a.line_seqn, sum(b.iomy_amnt) as iomy_amnt , b.item_idcd    , c.cstm_idcd		")
			.query("        , c.invc_date  , b.orig_invc_numb   , b.orig_invc_seqn      , b.qntt         , b.pric			")
			.query("        , b.txbl_numb  , b.txbl_seqn																	")
			.query("     from txbl a																						")
			.query("        left outer join crdt_colt_item b on b.txbl_numb = a.invc_numb and b.txbl_seqn = a.line_seqn		")
			.query("        left outer join crdt_colt_mast c on c.invc_numb = b.invc_numb									")
			.query("   where 1 = 1																							")
			.query("     and c.iomy_dvcd = '2'																				")
			.query("     and c.line_stat < 2																				")
			.query("   group by a.invc_numb, a.line_seqn																	")
			.query(")																										")
			.query("   select  a.invc_numb   , a.line_seqn   , a.istt_numb   , a.istt_date    , a.item_code   , a.item_name	")
			.query("         , a.item_spec   , a.sply_amnt   , a.vatx_amnt   , a.ttsm_amnt    , a.item_idcd					")
			.query("         , a.cstm_idcd   , a.qntt																		")
			.query("         , (a.ttsm_amnt - ifnull(b.iomy_amnt,0)) as unpaid														")
			.query("     from txbl a 																						")
			.query("          left outer join colt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn				")
			.query("   where 1 = 1																							")
			.query("      and a.ttsm_amnt > ifnull(b.iomy_amnt, 0)															")
			.query("   order by a.istt_date desc   , a.istt_numb desc   , a.invc_numb desc   , a.line_seqn					")
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

					.unique("iomy_dvcd"			, 2)									//입출금구분코드
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

				double sply_amnt = Double.parseDouble(row.getParamText("sply_amnt"));
				double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
				double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt"));

				if(ttsm_amnt != iomy_amnt) {
					sply_amnt = ((double)Math.round(iomy_amnt / 1.1) * 10.0) / 10.0;
					vatx_amnt = iomy_amnt - sply_amnt;
					ttsm_amnt = sply_amnt + vatx_amnt;
				}

				data.param
					.table ("crdt_colt_item")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("iomy_dvcd"			, 2)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

					.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
					.update("item_name"			, row.getParameter("item_name"))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"))		//품목규격
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))	//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("orig_invc_seqn"))	//원invoice순번
					.update("txbl_numb"			, row.getParameter("invc_numb"))		//세금계산서번호
					.update("txbl_seqn"			, row.getParameter("line_seqn"))		//세금계산서순번
					.update("iomy_amnt"			, row.getParameter("iomy_amnt"))		//입출금금액
					.update("qntt"				, row.getParameter("qntt"))				//수량
					.update("pric"				, row.getParameter("pric"))				//단가
					.update("sply_amnt"			, sply_amnt)							//공급가액
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
				System.out.println("@@@@@@@@@@@@@@@@@@@"+sply_amnt);
				System.out.println("!!!!!!!!!!!!!!!!!!!"+vatx_amnt);
				System.out.println("###################"+ttsm_amnt);

			}else{

				double sply_amnt = Double.parseDouble(row.getParamText("sply_amnt"));
				double vatx_amnt = Double.parseDouble(row.getParamText("vatx_amnt"));
				double ttsm_amnt = Double.parseDouble(row.getParamText("ttsm_amnt"));
				double iomy_amnt = Double.parseDouble(row.getParamText("iomy_amnt"));

				if(ttsm_amnt != iomy_amnt) {
					sply_amnt = ((double)Math.round(iomy_amnt / 1.1) * 10.0) / 10.0;
					vatx_amnt = iomy_amnt - sply_amnt;
					ttsm_amnt = sply_amnt + vatx_amnt;
				}

				data.param
					.table ("crdt_colt_item")
					.where ("where iomy_dvcd = :iomy_dvcd")
					.where ("and   invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("iomy_dvcd"			, 2)									//입출금구분코드
					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

					.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
					.update("item_name"			, row.getParameter("item_name"))		//품목명
					.update("item_spec"			, row.getParameter("item_spec"))		//품목규격
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"))	//원invoice번호
					.update("orig_invc_seqn"	, row.getParameter("orig_invc_seqn"))	//원invoice순번
					.update("txbl_numb"			, row.getParameter("invc_numb"))		//세금계산서번호
					.update("txbl_seqn"			, row.getParameter("line_seqn"))		//세금계산서순번
					.update("iomy_amnt"			, row.getParameter("iomy_amnt"))		//입출금금액
					.update("qntt"				, row.getParameter("qntt"))				//수량
					.update("pric"				, row.getParameter("pric"))				//단가
					.update("sply_amnt"			, sply_amnt)							//공급가액
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
