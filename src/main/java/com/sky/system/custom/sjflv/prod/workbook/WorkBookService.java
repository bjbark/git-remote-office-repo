package com.sky.system.custom.sjflv.prod.workbook;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.WorkBookService")
public class WorkBookService extends DefaultServiceHandler{
	@Autowired
    SeqListenerService sequence ;

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.wkod_dvcd       , a.lott_numb       , a.bzpl_idcd			")
			.query("        , a.pdod_date       , a.acpt_numb       , a.acpt_amnd_degr  , a.prog_stat_dvcd		")
			.query("        , a.acpt_seqn       , a.cstm_idcd       , a.pdsd_numb       , a.pdsd_date			")
			.query("        , a.pref_rank       , a.item_idcd       , a.wkfw_idcd       , a.bomt_degr			")
			.query("        , a.unit_idcd       , a.indn_qntt													")
			.query("        , LEFT(a.strt_dttm, 8) as strt_dttm     , LEFT(a.endd_dttm, 8) as endd_dttm			")
			.query("        , a.indn_qntt_1fst	, a.work_date       , a.stnd_unit       , a.stnd_unit_qntt		")
			.query("        , a.prod_bzpl_idcd  , a.prog_stat_dvcd  , a.remk_text								")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif													")
			.query("        , JSON_VALUE(a.json_data, '$.pckg_unit' ) as pckg_unit								")
			.query("        , JSON_VALUE(a.json_data, '$.labl_qntt' ) as labl_qntt								")
			.query("        , JSON_VALUE(a.json_data, '$.wker_idcd' ) as wker_idcd								")
			.query("        , JSON_VALUE(a.json_data, '$.usge_attc_yorn' ) as usge_attc_yorn					")
			.query("        , b.work_strt_dttm  , b.work_endd_dttm  , b.insp_wkct_yorn   , p.stok_used_qntt		")
			.query("        , p.plan_strt_dttm  , p.plan_endd_dttm  , p.cvic_idcd								")
			.query("        , c.cstm_name       , i.item_code       , i.item_name        , i.item_spec			")
			.query("        , (select sum(prod_qntt) from work_book w where a.invc_numb = w.wkod_numb) as prod_qntt	")
			.query("        , CASE																				")
			.query("              WHEN z.duplicate_count > 1 THEN 1												")
			.query("              ELSE 0 																		")
			.query("          END AS yorn 																		")
			.query("        , u.user_name as wker_name															")
			.query("        , v.cvic_name as cvic_name															")
			.query("        , w.invc_numb as work_invc															")
		;
		data.param
			.where("from pror_mast a																			")
			.where("left outer join pror_item p on a.invc_numb = p.invc_numb									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on p.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u on JSON_VALUE(a.json_data, '$.wker_idcd' )= u.user_idcd			")
			.where("left outer join cvic_mast v on p.cvic_idcd = v.cvic_idcd									")
			.where("left outer join work_book w on a.invc_numb = w.wkod_numb									")
			.where("left outer join (																			")
			.where("             SELECT acpt_numb, COUNT(*) AS duplicate_count								 	")
			.where("             FROM prod_plan_acpt															")
			.where("             group by acpt_numb																")
			.where("      ) z ON a.acpt_numb = z.acpt_numb														")
			.where("    , (select invc_numb , min(work_strt_dttm) as work_strt_dttm								")
			.where("            , max(work_endd_dttm) as work_endd_dttm											")
			.where("            , max(insp_wkct_yorn) as insp_wkct_yorn											")
			.where("       from pror_item																		")
			.where("       group by invc_numb																	")
			.where("      ) b																					")
			.where("where   1=1																					")
			.where("and     a.invc_numb = b.invc_numb															")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     a.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     a.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     substring(b.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
			.where("and     substring(b.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.item_idcd   = :item_idcd     " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     JSON_VALUE(a.json_data, '$.wker_idcd' ) = :wker_idcd  " , arg.getParamText("lgin_id"))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb desc																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//생산시작
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");
		String dvcd = "1";
		String invc_numb = "";

		if(set.equals("stop")){
			dvcd="2";
		}else if(set.equals("end")){
			dvcd="3";
		}else if(set.equals("restart")){
			dvcd="0";
		}else if(set.equals("cancel")){
			dvcd="1";
		}else if(set.equals("delete")){
			dvcd="0";
		}else if(set.equals("insert")){
			dvcd="5";
		}else if(set.equals("update")){
			dvcd="1";
		}

		ParamToJson trans = new ParamToJson();
		ParamToJson trans2 = new ParamToJson();
		String json_data = trans.Translate(arg, "pror_mast_json_fields");
		String json_data2 = trans2.Translate(arg, "work_book_json_fields");

		if(set.equals("insert")){
			data.param
				.table("pror_mast")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

				.update("prog_stat_dvcd"	, dvcd)
				.update("strt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("work_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, dvcd)

				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("wker_idcd"			, arg.getParameter("wker_idcd"		))

				.update("prog_stat_dvcd"	, dvcd	)

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.wigh_wker_idcd'), '" + json_data2 + "')")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			for (SqlResultRow row : map) {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("mtrl_ostt_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}else if(set.equals("update")){
			data.param
				.table("pror_mast")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

				.update("prog_stat_dvcd"	, dvcd)
				.update("strt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("work_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, dvcd)

				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

				.update("work_strt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				.update("mtrl_ivst_yorn"	, arg.getParameter("mtrl_ivst_yorn"))
				.update("prog_stat_dvcd"	, dvcd	)

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			for (SqlResultRow row : map) {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("real_ivst_qntt"	, row.getParameter("real_ivst_qntt"		))

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("mtrl_ostt_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("real_ivst_qntt"	, row.getParameter("real_ivst_qntt"		))

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}else if(set.equals("delete")){
			data.param
				.table("pror_mast")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

				.update("lott_numb"			, "")
				.update("prog_stat_dvcd"	, "0")
				.update("strt_dttm"			, "")
				.update("endd_dttm"			, "")
				.update("work_date"			, "")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, "0")

				.update("work_strt_dttm"	, "")
				.update("work_endd_dttm"	, "")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

				.update("prod_qntt"			, "0")
				.update("good_qntt"			, "0")
				.update("poor_qntt"			, "0")
				.update("work_strt_dttm"	, "")
				.update("work_endd_dttm"	, "")

				.update("mtrl_ivst_yorn"	, "0")
				.update("prog_stat_dvcd"	, "0")
				.update("lott_numb"			, "")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			for (SqlResultRow row : map) {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("stnd_unit_qntt"	, "0")

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("mtrl_ostt_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("stnd_unit_qntt"	, "0")

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}else if(set.equals("cancel")){
			data.param
				.table("pror_mast")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

				.update("prog_stat_dvcd"	, "1")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, "1")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))

				.update("prog_stat_dvcd"	, "1")

				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			for (SqlResultRow row : map) {
				data.param
					.table("work_book_mtrl")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

	//				.update("stnd_unit_qntt"	, "0")

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("mtrl_ostt_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

	//				.update("stnd_unit_qntt"	, "0")

					.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}else{
			data.param
				.table("pror_mast")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))

				.update("prog_stat_dvcd"	, dvcd)
				.update("endd_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("lott_numb"			, arg.getParameter("lott_numb"		))

				.update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("pror_item")
				.where("where invc_numb = :invc_numb								")
				.where("and   line_seqn = :line_seqn								")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, dvcd)
				.update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("lott_numb"			, arg.getParameter("lott_numb"		))

				.update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();;

			data.param
				.table("work_book")
				.where("where invc_numb = :invc_numb								")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))

				.update("prog_stat_dvcd"	, dvcd							)
				.update("mtrl_ivst_yorn"	, "1")
				.update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				.update("prod_qntt"			, arg.getParameter("prod_qntt"))
				.update("good_qntt"			, arg.getParameter("good_qntt"))
				.update("poor_qntt"			, arg.getParameter("poor_qntt"))
				.update("lott_numb"			, arg.getParameter("lott_numb"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data, '{}'), "
											+ "'$.work_drtr_1fst', "
											+ "'$.work_drtr_2snd', "
											+ "'$.work_drtr_3trd', "
											+ "'$.pckg_drtr_1fst', "
											+ "'$.pckg_drtr_2snd', "
											+ "'$.pckg_drtr_3trd', "
											+ "'$.istt_yorn', "
											+ "'$.istt_wrhs_idcd', "
											+ "'$.istt_numb', "
											+ "'$.weig_wker_idcd', "
											+ "'$.istt_seqn'), '" + json_data2 + "')")
				.update("line_levl"			, arg.getParameter("line_levl")) /* ROW레벨 */
				.update("line_ordr"			, arg.getParameter("line_ordr")) /* ROW순서 */
				.update("line_stat"			, arg.getParameter("line_stat")) /* ROW상태 */
				.update("line_clos"			, arg.getParameter("line_clos")) /* 마감여부 */
				.update("updt_user_name"	, arg.getParameter("updt_user_name")) /* 수정사용자명 */
				.update("updt_ipad"			, arg.getParameter("updt_ipad")) /* 수정IP */
				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
				.update("updt_urif"			, arg.getParameter("updt_urif")) /* 수정UI */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			if(set.equals("end")){
				for (SqlResultRow row:map) {
					data.param
						.table("work_book_chck")
						.where("where invc_numb = :invc_numb								")
						.where("and   line_seqn = :line_seqn								")

						.unique("invc_numb"				, row.fixParameter("invc_numb"))
						.unique("line_seqn"				, row.fixParameter("line_seqn"))

						.update("mngt_sbsc_dvsn_name"	, row.getParameter("mngt_sbsc_dvsn_name"))
						.update("mngt_sbsc_name"		, row.getParameter("mngt_sbsc_name"))
						.update("mngt_sbsc_spec"		, row.getParameter("mngt_sbsc_spec"))
						.update("cnfm_yorn"				, row.getParameter("cnfm_yorn"))

						.update("line_levl"				, row.getParameter("line_levl")) /* ROW레벨 */
						.update("line_ordr"				, row.getParameter("line_ordr")) /* ROW순서 */
						.update("line_stat"				, row.getParameter("line_stat")) /* ROW상태 */
						.update("line_clos"				, row.getParameter("line_clos")) /* 마감여부 */
						.update("updt_user_name"		, row.getParameter("updt_user_name")) /* 수정사용자명 */
						.update("updt_ipad"				, row.getParameter("updt_ipad")) /* 수정IP */
						.update("updt_idcd"				, row.getParameter("updt_idcd")) /* 수정ID */
						.update("updt_urif"				, row.getParameter("updt_urif")) /* 수정UI */
						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();
				}

//				data.param
//					.query("call auto_work_isos(")
//					.query("  :invc_numb",arg.fixParameter("invc_numb"))
//					.query(")")
//				;
//				data.attach(Action.direct);
//				data.execute();
//				data.clear();
			}
		}

		return null;
	}
//
//	//원재료 출고
//	public SqlResultMap setBookMtrl(HttpRequestArgument arg) throws Exception {
//		DataMessage data = arg.newStorage("POS");
//		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
//
//		for (SqlResultRow row : map) {
//			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
//
//			if(rowaction==Action.delete){
//				data.param
//					.table("work_book_mtrl")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("work_numb"))
//					.unique("line_seqn",  row.fixParameter("work_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("mtrl_ostt_item")
//					.where("where invc_numb = :invc_numb")
//					.where("and   line_seqn = :line_seqn")
//
//					.unique("invc_numb",  row.fixParameter("invc_numb"))
//					.unique("line_seqn",  row.fixParameter("line_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("isos_book")
//					.where("where invc_numb = :invc_numb	")
//					.where("and   line_seqn = :line_seqn	")
//
//					.unique("invc_numb", row.fixParameter("invc_numb"))
//					.unique("line_seqn", row.fixParameter("line_seqn"))
//				;
//				data.attach(Action.delete);
//
//				data.param
//					.table("lot_isos_book")
//					.where("where invc_numb = :invc_numb	")
//					.where("and   invc_seqn = :invc_seqn	")
//
//					.unique("invc_numb", row.fixParameter("invc_numb"))
//					.unique("invc_seqn", row.fixParameter("line_seqn"))
//				;
//				data.attach(Action.delete);
//				data.execute();
//				data.clear();
//			}else{
//				data.param
//					.table("mtrl_ostt_mast")
//					.where("where invc_numb = :invc_numb								")
//
//					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
//
//					.update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
//					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"		))
//					.update("ostt_dvcd"				, "2100")
//					.update("orig_invc_numb"		, row.getParameter("invc_numb"		))
//					.update("orig_seqn"				, row.getParameter("line_seqn"		))
//					.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
//					.update("drtr_idcd"				, row.getParameter("wker_idcd"		))
//
//					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
//					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
//					.update("updt_ipad"				, arg.remoteAddress )
//					.insert("crte_ipad"				, arg.remoteAddress )
//					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;
//				data.attach(Action.modify);
//				data.execute();
//				data.clear();
//
//				data.param
//					.table("work_book_mtrl")
//					.where("where invc_numb = :invc_numb								")
//					.where("and   line_seqn = :line_seqn								")
//
//					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
//					.unique("line_seqn"				, row.fixParameter("line_seqn"		))
//
//					.update("item_idcd"				, row.getParameter("item_idcd"		))
//					.update("lott_numb"				, row.getParameter("lott_numb"		))
//					.update("ivst_qntt"				, row.getParameter("ivst_qntt"		))
//					.update("unit_idcd"				, row.getParameter("unit_idcd"		))
//					.update("stnd_unit_qntt"		, row.getParameter("stnd_unit_qntt"	))
//
//					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
//					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
//					.update("updt_ipad"				, arg.remoteAddress )
//					.insert("crte_ipad"				, arg.remoteAddress )
//					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;
//				data.attach(Action.modify);
//				data.execute();
//				data.clear();
//
//				data.param
//					.table("mtrl_ostt_item")
//					.where("where invc_numb = :invc_numb								")
//					.where("and   line_seqn = :line_seqn								")
//
//					.unique("invc_numb"				, row.fixParameter("invc_numb"))
//					.unique("line_seqn"				, row.fixParameter("line_seqn"))
//
//					.update("wkod_numb"				, row.getParameter("orig_invc_numb"	))
//					.update("item_idcd"				, row.getParameter("item_idcd"		))
//					.update("lott_numb"				, row.getParameter("lott_numb"		))
//					.update("ostt_qntt"				, row.getParameter("ivst_qntt"		))
//					.update("ostt_wrhs_idcd"		, "02")
//					.update("oem_yorn"				, row.getParameter("used_yorn"		))
//					.update("stnd_unit_qntt"		, row.getParameter("stnd_unit_qntt"	))
//
//					.update("updt_idcd"				, row.getParameter("wker_idcd"		))
//					.insert("crte_idcd"				, row.getParameter("wker_idcd"		))
//					.update("updt_ipad"				, arg.remoteAddress )
//					.insert("crte_ipad"				, arg.remoteAddress )
//					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;
//				data.attach(Action.modify);
//				data.execute();
//				data.clear();
//			}
//			sequence.setBook(arg, (String)row.fixParameter("invc_numb"),row.getParamCast("line_seqn", Integer.class).intValue(), "삼정테스트");
//		}
//		return null;
//	}

	public SqlResultMap getMtrlIvst(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("SELECT count(1) as maxsize  " )
		;
		data.param
			.query("SELECT   im.acct_bacd   , im.item_code   , im.item_name   , im.item_idcd				")
			.query("       , bm.mixx_rate   , im.item_spec   , bs.base_name AS acct_name					")
			.query("       , im.unit_idcd																	")
		;
		data.param
			.where("  FROM bom_mast bm																		")
			.where("  LEFT OUTER JOIN item_mast im      ON im.item_idcd = bm.ivst_item_idcd					")
			.where("  LEFT OUTER JOIN bom_revs  br      ON br.prnt_item_idcd = bm.prnt_item_idcd			")
			.where("                                   AND br.revs_numb = bm.revs_numb						")
			.where("                                   AND br.revs_dvcd = bm.revs_dvcd						")
			.where("  LEFT OUTER JOIN base_mast bs      ON bs.base_code = im.acct_bacd						")
			.where("                                   AND bs.prnt_idcd = '1102'							")
			.where("                                   AND bs.line_stat < 2									")
			.where(" WHERE 1=1																				")
			.where("   AND br.line_stat = '0'																")
			.where("   AND bm.prnt_item_idcd = :item_idcd	", arg.getParameter("item_idcd"					))
			.where("   AND br.revs_dvcd = '1'																")
			.where(" ORDER BY im.item_code ASC																")
		;
		return data.selectForMap();
	}

	//최종차수 비교
	public SqlResultRow getLottInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("SELECT max(lott_numb) as seq		")
			.query("FROM  pror_mast 					")
			.query("WHERE 1=1							")
			.query("and lott_numb like :invc_date%  " , arg.getParamText("invc_date"))
		;
		return data.selectForRow();
	}

}
