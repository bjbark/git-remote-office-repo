package com.sky.system.custom.iypkg.mtrl.purc.purcbillwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class PurcBillWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("with item as (																							")
			.where("  select a.invc_numb      , a.line_seqn      , a.item_idcd      , f.fabc_name							")
			.where("       , s.asmt_name      , s.asmt_spec      , m.prod_name      , m.prod_spec							")
			.where("       , json_value(pm.json_data , '$**.offr_path_dvcd') as offr_path_dvcd								")
			.where("       , f.item_fxqt      , f.item_leng      , f.item_widh      , f.ppln_dvcd							")
			.where("       , f.mxm2_qntt      , f.mxm2_pric      , f.fdat_spec												")
			.where("  from purc_istt_item a																					")
			.where("   left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn	")
			.where("   left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb										")
			.where("   left outer join ( select a.invc_numb  , a.line_seqn  , a.item_idcd  , f.fabc_idcd  , bm.fabc_name	")
			.where("                          , bm.fdat_spec , bm.item_leng , bm.item_widh , bm.ppln_dvcd					")
			.where("                          , bm.item_fxqt , bm.mxm2_qntt , bm.mxm2_pric									")
			.where("                     from purc_istt_item a																")
			.where("                     left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
			.where("                     left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb					")
			.where("                     left outer join fabc_mast      f  on a.item_idcd = f.fabc_idcd						")
			.where("                     left outer join boxx_acpt_bom  bm on p.orig_invc_numb = bm.invc_numb				")
			.where("                     where json_value(pm.json_data , '$**.offr_path_dvcd') = 1							")
			.where("                   ) f on a.invc_numb = f.invc_numb and a.line_seqn = f.line_seqn						")
			.where("   left outer join ( select a.invc_numb, a.line_seqn, a.item_idcd										")
			.where("                          , s.asmt_idcd, ifnull(s.asmt_name, p.item_name) as asmt_name, s.asmt_spec		")
			.where("                     from purc_istt_item a																")
			.where("                     left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
			.where("                     left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb					")
			.where("                     left outer join asmt_mast      s  on a.item_idcd = s.asmt_idcd						")
			.where("                     where json_value(pm.json_data , '$**.offr_path_dvcd') = 2							")
			.where("                   ) s on a.invc_numb = s.invc_numb and a.line_seqn = s.line_seqn						")
			.where("   left outer join ( select a.invc_numb, a.line_seqn, a.item_idcd										")
			.where("                          , m.prod_idcd, m.prod_name													")
			.where("                          , concat(m.prod_leng,'*',m.prod_widh,'*',m.prod_hght) as prod_spec			")
			.where("                     from purc_istt_item a																")
			.where("                     left outer join purc_ordr_item p  on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
			.where("                     left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb					")
			.where("                     left outer join product_mast   m  on a.item_idcd = m.prod_idcd						")
			.where("                     where json_value(pm.json_data , '$**.offr_path_dvcd') = 3							")
			.where("                   ) m on a.invc_numb = m.invc_numb and a.line_seqn = m.line_seqn						")
			.where("  )																										")
		;
		data.param
			.where("select a.invc_numb      , a.line_seqn      , b.cstm_idcd      , c.cstm_name								")
			.where("     , a.istt_pric      , a.item_idcd      , a.istt_qntt      , b.invc_date								")
			.where("     , sum(ifnull(t.qntt,0)) as txbl_qntt  , a.istt_qntt - sum(ifnull(t.qntt,0)) as unissued			")
			.where("     , json_value(pm.json_data , '$**.offr_path_dvcd') as offr_path_dvcd								")
			.where("     , case json_value(pm.json_data , '$**.offr_path_dvcd')												")
			.where("            when 1 then i.fabc_name																		")
			.where("            when 2 then i.asmt_name when 3 then ba.prod_name else '' end as item_name					")
			.where("     , case json_value(pm.json_data , '$**.offr_path_dvcd')												")
			.where("            when 1 then i.fdat_spec																		")
			.where("            when 2 then i.asmt_spec when 3 then i.prod_spec else '' end as item_spec					")
			.where("     , ba.prod_idcd     , ba.item_leng     , ba.item_widh     , ba.item_hght							")
			.where("     , ba.acpt_qntt     , ba.bxty_idcd     , bx.bxty_name     , a.vatx_incl_yorn						")
			.where("     , ba.invc_numb as acpt_numb       , ba.invc_date as acpt_date										")
			.where("     , po.invc_numb as offr_numb       , po.line_seqn as offr_seqn										")
			.where("     , i.item_fxqt as fabc_fxqt        , i.item_leng as fabc_leng      , i.item_widh as fabc_widh		")
			.where("     , i.ppln_dvcd as fabc_ppln        , i.mxm2_qntt as fabc_mxm2_qntt , i.mxm2_pric as fabc_mxm2_pric	")
			.where("from purc_istt_item a																					")
			.where("  left outer join purc_istt_mast b  on a.invc_numb = b.invc_numb										")
			.where("  left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd										")
			.where("  left outer join purc_ordr_item po on a.orig_invc_numb = po.invc_numb and a.orig_seqn = po.line_seqn	")
			.where("  left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb										")
			.where("  left outer join boxx_acpt      ba on po.orig_invc_numb = ba.invc_numb									")
			.where("  left outer join boxtype_mast   bx on ba.bxty_idcd = bx.bxty_idcd										")
			.where("  left outer join ( select a.invc_numb, a.line_seqn, a.orig_invc_numb									")
			.where("                         , a.orig_invc_seqn, sum(a.qntt) as qntt										")
			.where("                    from txbl_item a																	")
			.where("                    group by a.orig_invc_numb, a.orig_invc_seqn											")
			.where("                  ) t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn				")
			.where("  left outer join item i on a.invc_numb = i.invc_numb and a.line_seqn = i.line_seqn						")
			.where("where    1=1																							")
			.where("and     json_value(pm.json_data , '$**.offr_path_dvcd') is not null										")
			.where("and     a.acct_bacd <> '3000'																			")
			.where("and     (a.istt_qntt - ifnull(t.qntt,0)) > 0															")
			.where("and     b.invc_date  >= :invc_date1			", arg.getParamText("fr_invc_date"))
			.where("and     b.invc_date  <= :invc_date2			", arg.getParamText("to_invc_date"))
			.where("and     a.find_name  like %:find_name%		", arg.getParamText("find_name"))
			.where("and     a.cstm_idcd   = :cstm_idcd			", arg.getParamText("cstm_idcd"))
			.where("and     ba.invc_numb  = :invc_numb			", arg.getParamText("invc_numb"))
			.where("and     ba.prod_idcd  = :prod_idcd			", arg.getParamText("prod_idcd"))
			.where("and     ba.item_leng  = :item_leng			", arg.getParamText("item_leng"))
			.where("and     ba.item_widh  = :item_widh			", arg.getParamText("item_widh"))
			.where("and     ba.item_hght  = :item_hght			", arg.getParamText("item_hght"))
			.where("and     ba.pcod_numb like %:pcod_numb%		", arg.getParamText("pcod_numb"))
			.where("and     ba.invc_date  = :invc_date			", arg.getParamText("invc_date"))
			.where("and     ba.acpt_qntt  = :acpt_qntt			", arg.getParamText("acpt_qntt"))
			.where("group by a.invc_numb, a.line_seqn																		")
			.where("order by b.invc_date desc, a.item_idcd, json_value(pm.json_data , '$**.offr_path_dvcd'), b.invc_date, a.item_idcd limit 999999")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			System.out.println("***********************************");
			String dvcd = (String) row.getParameter("rqod_rcvd_dvcd");
			String path = (String) row.getParameter("offr_path_dvcd");
			System.out.println(dvcd);

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			}else{
				if(i == 0){
					//등록
					data.param
						.table ("txbl_mast")
						.where ("where invc_numb = :invc_numb")

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"))		//INVOICE번호

						.update("puch_sale_dvcd"	, 1)										//매입매출구분코드 	1: 매입, 2: 매출
						.update("publ_date"			, row.getParameter("publ_date"))			//발행일자
						.update("txbl_volm"			, row.getParameter("txbl_volm"))			//세금계산서권
						.update("txbl_honm"			, row.getParameter("txbl_honm"))			//세금계산서호
						.update("txbl_seqn"			, row.getParameter("txbl_seqn"))			//세금계산서 일련번호
						.update("drtr_idcd"			, row.getParameter("drtr_idcd"))			//담당자ID
						.update("cstm_idcd"			, row.getParameter("txbl_cstm_idcd"))		//거래처ID
						.update("stot_dvcd"			, row.getParameter("stot_dvcd"))			//결제구분코드
						.update("rqod_rcvd_dvcd"	, row.getParameter("rqod_rcvd_dvcd"))		//청구영수구분코드
						.update("sply_amnt"			, row.getParameter("sum_sply_amnt"))		//공급가액
						.update("vatx_amnt"			, row.getParameter("sum_vatx_amnt"))		//부가세액
						.update("ttsm_amnt"			, row.getParameter("sum_ttsm_amnt"))		//합계금액
						.update("remk_text"			, row.getParameter("remk_text"))			//비고
						.update("txbl_path_dvcd"	, row.getParameter("txbl_path_dvcd"))		//세금계산서 경로구분코드

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

					data.param
						.table ("txbl_item")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

						.update("invc_date"			, row.getParameter("invc_date"))			//invoice일자 = 입고일자
						.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
						.update("item_name"			, row.getParameter("item_name"))			//품목명
						.update("item_spec"			, row.getParameter("item_spec"))			//품목규격
						.update("qntt"				, row.getParameter("qntt"))					//수량
						.update("pric"				, row.getParameter("istt_pric"))			//단가
						.update("sply_amnt"			, row.getParameter("istt_amnt"))			//공급가액
						.update("vatx_amnt"			, row.getParameter("istt_vatx"))			//부가세액
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
						.update("orig_invc_numb"	, row.getParameter("invc_numb"))			//원invoice번호
						.update("orig_invc_seqn"	, row.getParameter("line_seqn"))			//원invoice순번
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

					data.param
						.table ("purc_mast")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"			, row.fixParameter("purc_invc_numb"))
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

						.update("cstm_idcd"			, row.getParameter("txbl_cstm_idcd"))		//거래처ID
						.update("cstm_name"			, row.getParameter("txbl_cstm_name"))		//거래처명
					;

					//if절로 넘기기.
					if(path.equals("1")){
						data.param
							.update("acct_dvcd"			, 1001)						//계정구분코드
						;
						System.out.println("원단");
					}else if(path.equals("2")){
						data.param
							.update("acct_dvcd"			, 1002)						//계정구분코드
						;
						System.out.println("부자재");
					}else if(path.equals("3")){
						data.param
							.update("acct_dvcd"			, 4000)						//계정구분코드
						;
						System.out.println("상품");
					}else if(path.equals("5")){				// offr_path_dvcd가 존재하진 않고, 임시로 5를 외주로 표현
						data.param
							.update("acct_dvcd"			, 3000)						//계정구분코드
						;
						System.out.println("외주");
					}else{
						data.param
							.update("acct_dvcd"			, 1003)						//계정구분코드
						;
						System.out.println("기타");
					}

					data.param
						.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
						.update("item_name"			, row.getParameter("item_name"))			//품목명
						.update("item_spec"			, row.getParameter("item_spec"))			//품목규격
						.update("item_leng"			, row.getParameter("fabc_leng"))			//품목길이 = 장
						.update("item_widh"			, row.getParameter("fabc_widh"))			//품목폭
						.update("item_line"			, row.getParameter("fabc_ppln"))			//품목골
						.update("item_fxqt"			, row.getParameter("fabc_fxqt"))			//품목절수
						.update("mxm2_qntt"			, row.getParameter("fabc_mxm2_qntt"))		//제곱미터수량
						.update("mxm2_pric"			, row.getParameter("fabc_mxm2_pric"))		//제곱미터단가
						.update("fdat_name"			, row.getParameter(""))						//재단명

						.update("loss_qntt"			, row.getParameter(""))						//LOSS수량
						.update("puch_qntt"			, row.getParameter("istt_qntt"))			//매입수량
						.update("istt_pric"			, row.getParameter("istt_pric"))			//입고단가
						.update("sply_amnt"			, row.getParameter("istt_amnt"))			//공급가액
						.update("vatx_amnt"			, row.getParameter("istt_vatx"))			//부가세액
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
						.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))		//부가세포함여부

						.update("acpt_numb"			, row.getParameter("acpt_numb"))			//수주번호
						.update("acpt_seqn"			, row.getParameter(""))						//수주순번
						.update("acpt_date"			, row.getParameter("acpt_date"))			//수주일자
						.update("acpt_qntt"			, row.getParameter("acpt_qntt"))			//수주수량
						.update("acpt_item_idcd"	, row.getParameter("item_idcd"))			//수주품목ID
						.update("bxty_idcd"			, row.getParameter("bxty_idcd"))			//박스형식ID

						.update("offr_numb"			, row.getParameter("offr_numb"))			//발주번호
						.update("offr_seqn"			, row.getParameter("offr_seqn"))			//발주순번

						.update("istt_date"			, row.getParameter("invc_date"))			//입고일자
						.update("istt_numb"			, row.getParameter("invc_numb"))			//입고번호
						.update("istt_seqn"			, row.getParameter("line_seqn"))			//입고순번
						.update("istt_qntt"			, row.getParameter("istt_qntt"))			//입고수량
						.update("istt_cstm_idcd"	, row.getParameter("cstm_idcd"))			//입고거래처ID
						.update("istt_cstm_name"	, row.getParameter("cstm_name"))			//입고거래처명

						.update("invc_date"			, row.getParameter("publ_date"))			//세금계산서일자
						.update("txbl_date"			, row.getParameter("publ_date"))			//세금계산서일자
						.update("txbl_numb"			, row.getParameter("new_invc_numb"))		//세금계산서번호
						.update("txbl_seqn"			, row.getParameter("new_line_seqn"))		//세금계산서순번
						.update("txbl_path_dvcd"	, row.getParameter("txbl_path_dvcd"))		//세금계산서경로구분코드

						.update("rqod_date"			, row.getParameter(""))			//청구일자
						.update("rqod_numb"			, row.getParameter(""))			//청구번호
						.update("rqod_seqn"			, row.getParameter(""))			//청구순번
						;

					//청구 영수 구분코드가 '영수'이면 지급여부 1로 update
					if(dvcd.equals("2")){
						data.param
							.update("paym_yorn"			, 1								)	//지급여부
							.update("paym_date"			, row.getParameter("publ_date"))	//지급일자
						;
					}
					data.param
						.update("paym_numb"			, row.getParameter(""))			//지급번호
						.update("paym_seqn"			, row.getParameter(""))			//지급순번
						.update("find_name"			, row.getParameter("item_name")
													+ "	"
													+ row.getParameter(""))
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

					i =+ 1;

				}else{
					data.param
						.table ("txbl_item")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"))
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

						.update("invc_date"			, row.getParameter("invc_date"))			//invoice일자 = 입고일자
						.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
						.update("item_name"			, row.getParameter("item_name"))			//품목명
						.update("item_spec"			, row.getParameter("item_spec"))			//품목규격
						.update("qntt"				, row.getParameter("qntt"))					//수량
						.update("pric"				, row.getParameter("istt_pric"))			//단가
						.update("sply_amnt"			, row.getParameter("istt_amnt"))			//공급가액
						.update("vatx_amnt"			, row.getParameter("istt_vatx"))			//부가세액
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
						.update("orig_invc_numb"	, row.getParameter("invc_numb"))			//원invoice번호
						.update("orig_invc_seqn"	, row.getParameter("line_seqn"))			//원invoice순번
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

					data.param
						.table ("purc_mast")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"			, row.fixParameter("purc_invc_numb"))
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"))

						.update("cstm_idcd"			, row.getParameter("txbl_cstm_idcd"))		//거래처ID
						.update("cstm_name"			, row.getParameter("txbl_cstm_name"))		//거래처명
					;

					//if절로 넘기기.
					if(path.equals("1")){
						data.param
							.update("acct_dvcd"			, 1001)						//계정구분코드
						;
						System.out.println("원단");
					}else if(path.equals("2")){
						data.param
							.update("acct_dvcd"			, 1002)						//계정구분코드
						;
						System.out.println("부자재");
					}else if(path.equals("3")){
						data.param
							.update("acct_dvcd"			, 4000)						//계정구분코드
						;
						System.out.println("상품");
					}else if(path.equals("5")){				// offr_path_dvcd가 존재하진 않고, 임시로 5를 외주로 표현
						data.param
							.update("acct_dvcd"			, 3000)						//계정구분코드
						;
						System.out.println("상품");
					}else{
						data.param
							.update("acct_dvcd"			, 1003)						//계정구분코드
						;
						System.out.println("기타");
					}

					data.param
						.update("item_idcd"			, row.getParameter("item_idcd"))			//품목ID
						.update("item_name"			, row.getParameter("item_name"))			//품목명
						.update("item_spec"			, row.getParameter("item_spec"))			//품목규격
						.update("item_leng"			, row.getParameter("fabc_leng"))			//품목길이 = 장
						.update("item_widh"			, row.getParameter("fabc_widh"))			//품목폭
						.update("item_line"			, row.getParameter("fabc_ppln"))			//품목골
						.update("item_fxqt"			, row.getParameter("fabc_fxqt"))			//품목절수
						.update("mxm2_qntt"			, row.getParameter("fabc_mxm2_qntt"))		//제곱미터수량
						.update("mxm2_pric"			, row.getParameter("fabc_mxm2_pric"))		//제곱미터단가
						.update("fdat_name"			, row.getParameter(""))						//재단명

						.update("loss_qntt"			, row.getParameter(""))						//LOSS수량
						.update("puch_qntt"			, row.getParameter("istt_qntt"))			//매입수량
						.update("istt_pric"			, row.getParameter("istt_pric"))			//입고단가
						.update("sply_amnt"			, row.getParameter("istt_amnt"))			//공급가액
						.update("vatx_amnt"			, row.getParameter("istt_vatx"))			//부가세액
						.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))			//합계금액
						.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))		//부가세포함여부

						.update("acpt_numb"			, row.getParameter("acpt_numb"))			//수주번호
						.update("acpt_seqn"			, row.getParameter(""))						//수주순번
						.update("acpt_date"			, row.getParameter("acpt_date"))			//수주일자
						.update("acpt_qntt"			, row.getParameter("acpt_qntt"))			//수주수량
						.update("acpt_item_idcd"	, row.getParameter("item_idcd"))			//수주품목ID
						.update("bxty_idcd"			, row.getParameter("bxty_idcd"))			//박스형식ID

						.update("offr_numb"			, row.getParameter("offr_numb"))			//발주번호
						.update("offr_seqn"			, row.getParameter("offr_seqn"))			//발주순번

						.update("istt_date"			, row.getParameter("invc_date"))			//입고일자
						.update("istt_numb"			, row.getParameter("invc_numb"))			//입고번호
						.update("istt_seqn"			, row.getParameter("line_seqn"))			//입고순번
						.update("istt_qntt"			, row.getParameter("istt_qntt"))			//입고수량
						.update("istt_cstm_idcd"	, row.getParameter("cstm_idcd"))			//입고거래처ID
						.update("istt_cstm_name"	, row.getParameter("cstm_name"))			//입고거래처명

						.update("invc_date"			, row.getParameter("publ_date"))			//세금계산서일자
						.update("txbl_date"			, row.getParameter("publ_date"))			//세금계산서일자
						.update("txbl_numb"			, row.getParameter("new_invc_numb"))		//세금계산서번호
						.update("txbl_seqn"			, row.getParameter("new_line_seqn"))		//세금계산서순번
						.update("txbl_path_dvcd"	, row.getParameter("txbl_path_dvcd"))		//세금계산서경로구분코드

						.update("rqod_date"			, row.getParameter(""))			//청구일자
						.update("rqod_numb"			, row.getParameter(""))			//청구번호
						.update("rqod_seqn"			, row.getParameter(""))			//청구순번
						;

					//청구 영수 구분코드가 '영수'이면 지급여부 1로 update
					if(dvcd.equals("2")){
						data.param
							.update("paym_yorn"			, 1								)	//지급여부
							.update("paym_date"			, row.getParameter("publ_date"))	//지급일자
						;
					}
					data.param
						.update("paym_numb"			, row.getParameter(""))			//지급번호
						.update("paym_seqn"			, row.getParameter(""))			//지급순번
						.update("find_name"			, row.getParameter("item_name")
													+ "	"
													+ row.getParameter(""))
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
		}
		return null;
	}

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String txbl_path_dvcd = arg.getParamText("txbl_path_dvcd");
		String[] arr = txbl_path_dvcd.replace("[", "").replace("]","").replaceAll("\"", "").split(",");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.invc_numb          , a.puch_sale_dvcd    , a.publ_date       , a.cstm_idcd		")
			.query("        , a.txbl_volm          , a.txbl_honm         , a.txbl_seqn       , a.drtr_idcd		")
			.query("        , a.rqod_rcvd_dvcd     , a.sply_amnt         , a.vatx_amnt       , a.ttsm_amnt		")
			.query("        , a.remk_text          , a.txbl_path_dvcd    , c.cstm_name       , a.stot_dvcd		")
			.query("        , p.paym_date          , ifnull(p.paym_yorn,0) as paym_yorn							")
			.query("        , p.invc_numb as purc_numb , p.line_seqn as purc_seqn								")
		;
		data.param
			.query("from txbl_mast a																			")
			.query("  left outer join txbl_item b on a.invc_numb = b.invc_numb									")
			.query("  left outer join purc_mast p on b.invc_numb = p.txbl_numb and b.line_seqn = p.txbl_seqn	")
			.query("  left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.query("  left outer join purc_istt_item pi on b.orig_invc_numb = pi.invc_numb and b.orig_invc_seqn = pi.line_seqn")
			.query("  left outer join purc_ordr_item po on pi.orig_invc_numb = po.invc_numb	and pi.orig_seqn = po.line_seqn")
			.query("  left outer join boxx_acpt ba on po.orig_invc_numb = ba.invc_numb							")
			.query("where  1=1																					")
			.query("and  a.cstm_idcd   = :cstm_idcd			", arg.getParamText("cstm_idcd"))
			.query("and  ba.prod_idcd  = :prod_idcd			", arg.getParamText("prod_idcd"))
			.query("and  a.publ_date  >= :invc1_date		", arg.getParamText("invc1_date"))
			.query("and  a.publ_date  <= :invc2_date		", arg.getParamText("invc2_date"))
			.query("and  a.puch_sale_dvcd = 1																	")
		;
		if(!arr[0].equals("")){
			data.param
				.query("and a.txbl_path_dvcd  in (																")
			;
			for(int i = 0; arr.length>i;i++){
				data.param
					.query(":a"+i, arr[i]);
				;
				if(i!=arr.length-1){
					data.param
						.query(",");
					;
				}
			}
			data.param
				.query(")")
			;
		}
		data.param
			.query("group by a.invc_numb																		")
			.query("order by a.publ_date desc, a.invc_numb limit 99999											")
			.query(") a																							")
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
			.query("select *																								")
		;
		data.param
			.query("from (																									")
			.query("select    a.invc_numb          , a.line_seqn         , a.invc_date       , a.item_idcd					")
			.query("        , a.item_name          , a.item_spec         , a.qntt            , a.pric						")
			.query("        , a.sply_amnt          , a.vatx_amnt         , a.ttsm_amnt       , a.calc_vatx					")
			.query("        , a.orig_invc_numb     , a.orig_invc_seqn														")
			.query("        , case b.txbl_path_dvcd when 11 then '원단' when 12 then '상품'										")
			.query("                                when 13 then '기타' when 14 then '부자재' when 15 then '외주'					")
			.query("                                else '' end as txbl_path_dvcd											")
		;
		data.param
			.query("from txbl_item a																						")
			.query("  left outer join txbl_mast b on a.invc_numb = b.invc_numb												")
			.query("  left outer join purc_istt_item pi on a.orig_invc_numb = pi.invc_numb and a.orig_invc_seqn = pi.line_seqn")
			.query("  left outer join purc_ordr_mast po on pi.orig_invc_numb = po.invc_numb									")
			.query("where  1=1																								")
			.query("and      a.invc_numb  = :invc_numb		", arg.getParamText("invc_numb" ))
			.query("order by a.invc_date, json_value(po.json_data , '$**.offr_path_dvcd'), a.invc_numb limit 99999			")
			.query(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getBill(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson translate = new ParamToJson();

		result = translate.TranslateProcedure(arg, "fr_invc_date,to_invc_date,chk,find_name");

			data.param // 집계문  입력
				.query("call purc_bill_list (	")
				.query(" :param	" , result)
				.query(" )	")
				;

		return data.selectForMap() ;
	}

	public SqlResultMap getTxblSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(txbl_seqn), '10000') + 1 as txbl_seqn	")
			.where("from   txbl_mast										")
		;
		return data.selectForMap();
	}

	public SqlResultMap getTxblSeqnCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select EXISTS ( select * from txbl_mast 	")
			.query("                where 1=1					")
			.query("                and txbl_seqn	= :txbl_seqn", arg.getParamText("txbl_seqn" ))
			.where("              ) as success					")
		;
		return data.selectForMap();
	}

	public SqlResultMap setPay(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table ("purc_mast")
				.where ("where invc_numb = :invc_numb")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))

				.update("paym_yorn"			, 1								)	//지급여부
				.update("paym_date"			, row.getParameter("paym_date"))	//지급일자
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		return null;
	}


	public SqlResultMap getOtod(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.query("from (																									")
			.query("select    a.invc_numb       , b.invc_date       , b.cstm_idcd       , c.cstm_name						")
			.query("        , w.wkct_name       , bp.wkun_dvcd      , a.istt_qntt       , u.unit_name						")
			.query("        , a.istt_pric       , a.ttsm_amnt       , ifnull(t.txbl_qntt,0) as txbl_qntt					")
			.query("        , bp.wkct_idcd      , ba.invc_numb as acpt_numb             , ba.prod_name as item_name			")
			.query("        , ba.acpt_qntt      , json_value(a.json_data , '$**.subt_qntt') as subt_qntt					")
			.query("        , (a.istt_qntt + ifnull(json_value(a.json_data , '$**.subt_qntt'),0) - ifnull(t.txbl_qntt,0)) as untxbl	")
			.query("        , pr.prod_idcd as item_idcd             , a.line_seqn											")
		;
		data.param
			.query("from purc_istt_item a																					")
			.query(" left outer join purc_istt_mast b   on a.invc_numb = b.invc_numb										")
			.query(" left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd										")
			.query(" left outer join purc_ordr_item p   on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
			.query(" left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb										")
			.query(" left outer join boxx_acpt      ba  on p.orig_invc_numb = ba.invc_numb									")
			.query(" left outer join product_mast   pr  on ba.prod_idcd = pr.prod_idcd										")
			.query(" left outer join boxx_acpt_bop  bp  on p.orig_invc_numb = bp.invc_numb and p.orig_seqn = bp.line_seqn	")
			.query(" left outer join unit_mast      u   on bp.qntt_unit_idcd = u.unit_idcd									")
			.query(" left outer join wkct_mast      w   on bp.wkct_idcd=w.wkct_idcd											")
			.query(" left outer join ( select a.orig_invc_numb, a.orig_invc_seqn, sum(a.qntt) as txbl_qntt					")
			.query("                   from txbl_item a																		")
			.query("                   left outer join txbl_mast b on a.invc_numb = b.invc_numb								")
			.query("                   group by a.orig_invc_numb, a.orig_invc_seqn											")
			.query("                 ) t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn				")
			.query("where  1=1																								")
			.query(" and    (a.istt_qntt + ifnull(json_value(a.json_data , '$**.subt_qntt'),0) - ifnull(t.txbl_qntt,0)) > 0	")
			.query(" and    pm.offr_dvcd  = '3000'																			")
			.query(" and    ba.invc_numb  = :acpt_numb			", arg.getParamText("acpt_numb"))
			.query(" and    ba.invc_date  = :invc_date			", arg.getParamText("invc_date"))
			.query(" and    b.invc_date  >= :invc_date1			", arg.getParamText("fr_invc_date"))
			.query(" and    b.invc_date  <= :invc_date2			", arg.getParamText("to_invc_date"))
			.query("order by b.invc_date desc, a.invc_numb, a.line_seqn limit 999999										")
			.query(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
