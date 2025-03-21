package com.sky.system.custom.iypkg.stock.isos.saleostt2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleOstt2Service extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb        , s.line_seqn       , a.invc_date        , a.bzpl_idcd			")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date        , a.sale_stor_yorn	")
			.where("        , s.acpt_numb        , s.ostt_qntt       , s.sale_pric        , s.sale_amnt			")
			.where("        , s.vatx_amnt        , ai.acpt_dvcd      , a.expt_dvcd        , s.vatx_incl_yorn	")
			.where("        , ifnull(s.sale_amnt,0)+ifnull(s.vatx_amnt,0) as ttsm_amnt							")
			.where("        , json_value(s.json_data , '$**.prod_name')   as prod_name							")
			.where("        , json_value(s.json_data , '$**.prod_leng')   as prod_leng							")
			.where("        , json_value(s.json_data , '$**.prod_widh')   as prod_widh							")
			.where("        , json_value(s.json_data , '$**.prod_hght')   as prod_hght							")
			.where("        , json_value(s.json_data , '$**.porm_qntt')   as porm_qntt							")
			.where("        , json_value(a.json_data , '$**.nwek_name')   as nwek_name							")
			.where("        , json_value(a.json_data , '$**.cars_idcd')   as cars_idcd							")
			.where("        , a.crny_dvcd        , a.excg_rate       , a.remk_text								")
			.where("        , s.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , c.cstm_name        , u.user_name as drtr_name               , r.cars_alis			")
			.where("        , ai.assi_cstm_idcd  , c2.dlvy_drtr_name											")
			.where("from sale_ostt_item s																		")
			.where("left outer join sale_ostt_mast a on a.invc_numb = s.invc_numb								")
			.where("left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd								")
			.where("left outer join user_mast      u on a.drtr_idcd = u.user_idcd								")
			.where("left outer join product_mast   p on s.item_idcd = p.prod_idcd								")
			.where("left outer join car_mast       r on r.cars_idcd = json_value(a.json_data , '$**.cars_idcd')	")
			.where("left outer join boxx_acpt     ai on s.acpt_numb = ai.invc_numb								")
			.where("left outer join cstm_deli     c2 on ai.assi_cstm_idcd = c2.dlvy_cstm_idcd					")
			.where("where   1=1																					")
			.where("and     s.find_name like %:find_name%     " , arg.getParamText("find_name"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
//			.where("and     a.cstm_idcd  <= :cstm_idcd2       " , arg.getParamText("cstm_idcd2" ))
			.where("and     a.invc_date  >= :invc_date1       " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc_date2       " , arg.getParamText("invc2_date" ))
			.where("and     s.item_idcd  = :item_idcd       " , arg.getParamText("item_idcd" ))
//			.where("and     s.item_idcd  <= :item_idcd2       " , arg.getParamText("item_idcd2" ))
			.where("order by a.invc_date desc, s.invc_numb, s.line_seqn limit 999999							")
			.where(") a																							")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력..
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																						")
			.where("select    ai.invc_date     , ai.invc_numb as acpt_numb           , ai.prod_name				")
			.where("        , p.prod_widh      , p.prod_hght      , ai.acpt_qntt     , a.trst_qntt as plan_qntt	")
			.where("        , purc.subt_qntt   , ai.deli_date     , s.ostt_qntt									")
			.where("        , ai.cstm_idcd     , ai.acpt_dvcd     , ai.remk_text     , a.line_seqn as orig_seqn	")
			.where("        , ai.pqty_pric     , ai.prod_idcd     , a.invc_numb as orig_invc_numb				")
			.where("        , (ifnull(a.trst_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid, p.prod_code				")
			.where("        , p.prod_leng      , c.cstm_name													")
			.where("        , ai.user_memo     , ai.sysm_memo     , ai.prnt_idcd     , ai.line_levl				")
			.where("        , ai.line_ordr     , ai.line_stat     , ai.line_clos     , ai.find_name				")
			.where("        , ai.updt_user_name, ai.updt_ipad     , ai.updt_dttm     , ai.updt_idcd				")
			.where("        , ai.updt_urif     , ai.crte_user_name, ai.crte_ipad     , ai.crte_dttm				")
			.where("        , ( select sum(ifnull(a.prod_qntt,0)) as prod_qntt									")
			.where("            from work_book a																")
			.where("            left outer join pror_item o on  a.wkod_numb = o.invc_numb						")
			.where("                                        and a.wkod_seqn = o.line_seqn						")
			.where("            left outer join prod_plan p on  p.invc_numb = o.orig_invc_numb					")
			.where("            left outer join prod_plan_acpt ap on  p.invc_numb = ap.invc_numb				")
			.where("            where ai.invc_numb	= ap.acpt_numb												")
			.where("            group by ap.acpt_numb 															")
			.where("        ) as prod_qntt																		")
			.where("        , (select sum(if(substr(x.invc_dvcd,1,1) = 1,qntt,0))								")
			.where("                - sum(if(substr(x.invc_dvcd,1,1) = 2,qntt,0))								")
			.where("         from isos_book x where x.item_idcd = a.item_idcd) as stok_qntt						")
			.where("from ostt_plan a																			")
			.where("left outer join boxx_acpt   ai on a.acpt_numb = ai.invc_numb and ai.line_clos = 0			")
			.where("left outer join cstm_mast    c on c.cstm_idcd = ai.cstm_idcd								")
			.where("left outer join product_mast p on ai.prod_idcd = p.prod_idcd								")
			.where("left outer join (select pi.orig_invc_numb, pi.orig_seqn, po.orig_invc_numb	as acpt_numb	")
			.where("                 , sum(ifnull(json_value(pi.json_data , '$**.subt_qntt'),0)) as subt_qntt	")
			.where("                 from purc_istt_item pi														")
			.where("                 left outer join purc_ordr_item po on po.invc_numb = pi.orig_invc_numb		")
			.where("                                                       and po.line_seqn = pi.orig_seqn		")
			.where("                 where pi.line_stat < 2														")
			.where("                 group by po.orig_invc_numb													")
			.where("                 ) purc on ai.invc_numb = purc.acpt_numb									")
			.where("left outer join (select orig_invc_numb, orig_seqn											")
			.where("                 , sum(ifnull(ostt_qntt,0))													")
			.where("                 + sum(ifnull(json_value(json_data , '$**.porm_qntt'),0)) as ostt_qntt		")
			.where("                 from sale_ostt_item														")
			.where("                 where line_stat < 2 														")
			.where("                 group by orig_invc_numb, orig_seqn) s on a.invc_numb = s.orig_invc_numb	")
			.where("                                                      and a.line_seqn = s.orig_seqn			")
			.where("where   1=1																					")
			.where("and     a.line_stat < 2																		")
			.where("and     (ifnull(a.trst_qntt,0) - ifnull(s.ostt_qntt,0)) > 0									")
			.where("and     a.deli_date  >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date  <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     ai.invc_date  >= :invc_date1      " , arg.getParamText("invc_date1" ))
			.where("and     ai.invc_date  <= :invc_date2      " , arg.getParamText("invc_date2" ))
			.where("and     ai.find_name like %:find_name%    " , arg.getParamText("find_name" ))
			.where("and     ai.prod_idcd  = :prod_idcd        " , arg.getParamText("prod_idcd" ))
			.where("and     ai.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd" ))
			.where("and     ai.invc_numb  = :invc_numb        " , arg.getParamText("acpt_numb" ))
			.where("and     ai.line_stat  = :line_stat        " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by ai.invc_numb																		")
			.where(") a																							")
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
		String orig_invc_numb = "";
		String orig_seqn = "";
		for (SqlResultRow row:map) {
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "sale_ostt_item_json_fields");
			String json2 = p.TranslateRow(arg, row, "sale_ostt_mast_json_fields");
			orig_invc_numb = row.getParamText("orig_invc_numb");
			orig_seqn = row.getParamText("orig_seqn");

			if(row.fixParamText("new_line_seqn").equals("1")){
				//등록
				data.param
					.table ("sale_ostt_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"))		//INVOICE번호

					.update("invc_date"			, row.getParameter("ostt_date"))			//출고일자
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"))			//거래처ID
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"))			//사업장ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))			//담당자ID
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"))			//수출구분
					.update("dept_idcd"			, row.getParameter("dept_idcd"))			//부서ID
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"))			//위탁구분
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"))		//인도조건구분
					.update("deli_date"			, row.getParameter("deli_date"))			//납기일자
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"))		//판매보관여부
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"))			//통화구분코드
					.update("excg_rate"			, row.getParameter("excg_rate"))			//환율
					.update("remk_text"			, row.getParameter("remk_text"))			//비고
					.update("json_data"			, json2)

					.update("ostt_dvcd"			, 2200						)			//출고구분코드 2200 : 판매출고

					.update("sysm_memo"			, row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("sale_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acpt_numb"        , row.getParameter("acpt_numb"))
					.update("item_idcd"        , row.getParameter("prod_idcd"))
					.update("ostt_qntt"        , row.getParameter("ostt_qntt2"))
					.update("sale_amnt"        , row.getParameter("sale_amnt"))
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))
					.update("deli_date"        , row.getParameter("deli_date"))
					.update("sale_pric"        , row.getParameter("pqty_pric"))
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))

					.update("ostt_dvcd"			, 2200						)			//출고구분코드 2200 : 판매출고

					.update("orig_invc_numb"   , row.getParameter("orig_invc_numb"))
					.update("orig_seqn"        , row.getParameter("orig_seqn"))
					.update("json_data"        , json)

					.update("find_name"        , row.getParameter("prod_code")
												+ " "
												+ row.getParameter("prod_name"))

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


			}else{
				data.param
					.table ("sale_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("acpt_numb"        , row.getParameter("acpt_numb"))
					.update("item_idcd"        , row.getParameter("prod_idcd"))
					.update("ostt_qntt"        , row.getParameter("ostt_qntt2"))
					.update("sale_amnt"        , row.getParameter("sale_amnt"))
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))
					.update("deli_date"        , row.getParameter("deli_date"))
					.update("sale_pric"        , row.getParameter("pqty_pric"))
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))

					.update("ostt_dvcd"			, 2200						)			//출고구분코드 2200 : 판매출고

					.update("orig_invc_numb"   , row.getParameter("orig_invc_numb"))
					.update("orig_seqn"        , row.getParameter("orig_seqn"))
					.update("json_data"        , json)

					.update("find_name"        , row.getParameter("prod_code")
												+ "	"
												+ row.getParameter("prod_name"))

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
			}
			System.out.println(!row.getParamText("orig_invc_numb").equals(""));
			if(!row.getParamText("orig_invc_numb").equals("")){
			// 계획수량 <= 출고량+감량 = 출고여부 1
				data.param // 집계문  입력
					.query("select a.invc_numb, a.line_seqn, a.trst_qntt, m.invc_date					")
					.query("     , sum(ifnull(s.ostt_qntt,0)) as ostt_qntt								")
					.query("     , sum(ifnull(s.ostt_qntt,0))											")
					.query("     + sum(ifnull(json_value(s.json_data , '$**.porm_qntt'),0))as fin_ostt	")
					.query("from sale_ostt_item s														")
					.query("left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb				")
					.query("left outer join ostt_plan a on s.orig_invc_numb = a.invc_numb				")
					.query("where a.invc_numb = :orig_invc_numb	", row.getParameter("orig_invc_numb"))
					.query("and   a.line_seqn = :orig_seqn		", row.getParameter("orig_seqn"))
				;
				SqlResultMap info = data.selectForMap();
				data.clear();

				for (SqlResultRow row2:info) {
					if(Double.parseDouble(row2.getParamText("trst_qntt"))
							<=Double.parseDouble(row2.getParamText("fin_ostt"))){
						data.param
							.table ("ostt_plan")
							.where ("where invc_numb = :invc_numb")
							.where ("and   line_seqn = :line_seqn")

							.unique("invc_numb"        , row2.getParameter("invc_numb"))
							.unique("line_seqn"        , row2.getParameter("line_seqn"))

							.update("ostt_yorn"        , "1")
							.update("ostt_date"        , row2.getParameter("invc_date"))
							.update("ostt_qntt"        , row2.getParameter("ostt_qntt"))
							.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
							.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
							.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
							.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
							.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
						;
						data.attach(Action.update);
						data.execute();
						data.clear();
					}
				}
				data.clear();
			// 수주수량 <= 출고량+감량 = 출고여부 1
				data.param // 집계문  입력
					.query("select a.invc_numb, a.acpt_qntt, m.invc_date									")
					.query("     , sum(ifnull(s.ostt_qntt,0)) as ostt_qntt									")
					.query("     , sum(ifnull(s.ostt_qntt,0)) 												")
					.query("     + sum(ifnull(json_value(s.json_data , '$**.porm_qntt'),0)) as fin_ostt		")
					.query("from sale_ostt_item s															")
					.query("left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb					")
					.query("left outer join boxx_acpt a on s.acpt_numb = a.invc_numb						")
					.query("where a.invc_numb = :acpt_numb2	", row.getParameter("acpt_numb"))
				;
				SqlResultMap info2 = data.selectForMap();
				data.clear();

				for (SqlResultRow row2:info2) {
					if(Double.parseDouble(row2.getParamText("acpt_qntt"))
							<=Double.parseDouble(row2.getParamText("fin_ostt"))){
						data.param
							.table ("boxx_acpt")
							.where ("where invc_numb = :invc_numb")

							.unique("invc_numb"        , row2.getParameter("invc_numb"))

							.update("ostt_yorn"        , "1")
							.update("ostt_date"        , row2.getParameter("invc_date"))
							.update("ostt_qntt"        , row2.getParameter("ostt_qntt"))
							.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
							.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
							.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
							.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
							.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
						;
						data.attach(Action.update);
						data.execute();
						data.clear();
					}
				}

				data.param
					.query("call boxx_isos_booking (		")
					.query("   :invc_numb "  , row.fixParameter("new_invc_numb"))  // Invoice 번호
					.query(" , :line_seqn "  , 0			 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , "판매출고"	 )  // 작업구분
					.query(" , :item_dvcd "  , "제품"		 )  // 품목구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}

		return null;
	}

	public SqlResultMap setUpdt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			data.param
				.table("sale_ostt_mast"					)
				.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				//
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	/*  라벨발행유무  */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null;
	}

	public SqlResultMap setModify(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		ParamToJson p = new ParamToJson();

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table ("sale_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("line_seqn"        , row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param // 집계문  입력
					.query("select count(*) as cnt											")
					.query("from sale_ostt_item a											")
					.query("where a.invc_numb = :invc_numb	", row.getParameter("invc_numb"))
				;
				SqlResultMap info2 = data.selectForMap();
				data.clear();

				if(info2.get(0).getParamText("cnt").equals("0")){
					data.param
						.table ("sale_ostt_mast")
						.where ("where invc_numb = :invc_numb")

						.unique("invc_numb"        , row.fixParameter("invc_numb"))
					;
					data.attach(Action.delete);
					data.execute();
					data.clear();
				}

				data.param
					.table ("isos_book")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("line_seqn"        , row.fixParameter("line_seqn"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}else{
				String json = p.TranslateRow(arg, row, "sale_ostt_item_json_fields");

				data.param
					.table ("sale_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("line_seqn"        , row.fixParameter("line_seqn"))

					.update("ostt_qntt"        , row.getParameter("ostt_qntt"))
					.update("sale_amnt"        , row.getParameter("sale_amnt"))
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))
					.update("sale_pric"        , row.getParameter("sale_pric"))
					.update("json_data"        , json)

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table ("sale_ostt_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))

					.update("invc_date"        , row.getParameter("invc_date"))

					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table ("isos_book")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("line_seqn"        , row.fixParameter("line_seqn"))

					.update("invc_date"        , row.getParameter("invc_date"))
					.update("qntt"             , row.getParameter("ostt_qntt"))
					.update("pric"             , row.getParameter("sale_pric"))
					.update("amnt"             , row.getParameter("sale_amnt"))

					.update("stok_qntt"        , (-1*Integer.parseInt(row.getParamText("ostt_qntt"))))
					.update("stok_pric"        , (-1* Integer.parseInt(row.getParamText("sale_pric"))))
					.update("stok_amnt"        , (-1* Integer.parseInt(row.getParamText("sale_amnt"))))

					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();


				data.param
					.table ("ostt_plan")
					.where ("where acpt_numb = :acpt_numb")
//					.where ("and   line_seqn = :line_seqn")

					.unique("acpt_numb"			, row.getParameter("acpt_numb"))
//					.unique("line_seqn"			, row.getParameter("orig_seqn"))

					.update("ostt_yorn"			, "0")
					.update("ostt_date"			, row.getParameter("invc_date"))
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}

			data.param
				.table ("boxx_acpt")
				.where ("where invc_numb = :invc_numb")

				.unique("invc_numb"			, row.getParameter("acpt_numb"))

				.update("ostt_yorn"			, "0")
				.update("ostt_date"			, row.getParameter("invc_date"))
				.update("ostt_qntt"			, row.getParameter("ostt_qntt"))

				.update("line_clos"			, "0")
				.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("sale_ostt_mast												")
			.where("where invc_numb = :invc_numb								")		//invoice번호
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.update("line_stat"			, "2" )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("sale_ostt_item													")
			.where("where invc_numb = :invc_numb									")		//invoice번호
			.unique("invc_numb"			, arg.fixParameter("invc_numb"				))
			.update("   "			, "2" )
			.update("ostt_qntt"			, "0" )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}
}
