package com.sky.system.custom.sjflv.mtrl.po.purcordrcost;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class PurcOrdrCostService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*")
		;
		data.param
			.where("from (																								")
			.where("select    a.invc_numb           , a.invc_date            , a.line_clos			 , c.cstm_name		")
			.where("        , e.entr_date           , e.bl_numb              , e.bl_pric_amnt        , e.lc_stot_amnt	")
			.where("        , e.exrt                , e.taxx_amnt            , e.taxx_vatx           , e.wrhs_insu_amnt	")
			.where("        , e.wrhs_insu_vatx      , e.entr_cmsn_amnt       , e.entr_cmsn_vatx      , e.trnt_exps_amnt	")
			.where("        , e.trnt_exps_vatx      , e.etcc_amnt_1fst       , e.etcc_amnt_1fst_vatx					")
			.where("        , e.etcc_amnt_2snd      , e.etcc_amnt_2snd_vatx  , e.remk_text								")
			.where("        , ifnull(e.taxx_amnt,0) + ifnull(e.wrhs_insu_amnt,0) + ifnull(e.entr_cmsn_amnt,0) + ifnull(e.trnt_exps_amnt,0) ")
			.where("         + ifnull(e.etcc_amnt_1fst,0) + ifnull(e.etcc_amnt_2snd,0) as ttsm_sum 						")
			.where("        ,  ifnull(e.lc_stot_amnt,0) + ifnull(e.taxx_amnt,0) 				")
			.where("         + ifnull(e.wrhs_insu_amnt,0) + ifnull(e.entr_cmsn_amnt,0)									")
			.where("         + ifnull(e.trnt_exps_amnt,0) + ifnull(e.etcc_amnt_1fst,0)									")
			.where("         + ifnull(e.etcc_amnt_2snd,0)  as ttsm_vatx_amnt											")
			.where("        ,  ifnull(e.lc_stot_amnt,0) + ifnull(e.taxx_amnt,0) + ifnull(e.wrhs_insu_amnt,0) 		")
			.where("         + ifnull(e.entr_cmsn_amnt,0) + ifnull(e.trnt_exps_amnt,0) + ifnull(e.etcc_amnt_1fst,0) + ifnull(e.etcc_amnt_2snd,0) ")
			.where("         - ifnull(e.taxx_vatx,0) - ifnull(e.wrhs_insu_vatx,0) - ifnull(e.entr_cmsn_vatx,0) - ifnull(e.trnt_exps_vatx,0)	")
			.where("         - ifnull(e.etcc_amnt_1fst_vatx,0) - ifnull(e.etcc_amnt_2snd_vatx,0) as ttsm_amnt			")
			.where("        , e.line_clos as exps_line_clos																")
			.where("from purc_istt_item b																				")
			.where("left outer join purc_istt_mast a      on a.invc_numb      = b.invc_numb								")
			.where("left outer join purc_istt_exps e      on a.invc_numb      = e.invc_numb								")
			.where("left outer join cstm_mast c           on b.cstm_idcd      = c.cstm_idcd								")
			.where("left outer join item_mast i           on b.item_idcd      = i.item_idcd								")
			.where("where   1=1																							")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and		a.invc_numb	like %:invc_numb%"	, arg.getParameter("invc_numb"))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     b.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_date desc, a.invc_numb desc limit 99999999999												")
			.where(") a																						")
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
					.table("purc_istt_exps"													)
					.where("where invc_numb		= :invc_numb							")  /*  거래처ID  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
				;
				data.attach(Action.delete);

			} else {
				data.param
					.table("purc_istt_exps"													)
					.where("where invc_numb		= :invc_numb							")  /*  원지ID  */
					//
					.unique("invc_numb"					, row.fixParameter("invc_numb"			))
					//
					.update("entr_date"					, row.getParameter("entr_date"                ))  /*  */
					.update("bl_numb"					, row.getParameter("bl_numb"                  ))  /* */
					.update("bl_pric_amnt"				, row.getParameter("bl_pric_amnt"             ))  /* */
					.update("lc_stot_amnt"				, row.getParameter("lc_stot_amnt"             ))  /* */
					.update("exrt"						, row.getParameter("exrt"                     ))  /*   */
					.update("taxx_amnt"					, row.getParameter("taxx_amnt"                ))  /*   */
					.update("taxx_vatx"					, row.getParameter("taxx_vatx"                ))  /*  */
					.update("wrhs_insu_amnt"			, row.getParameter("wrhs_insu_amnt"           ))  /*  */
					.update("wrhs_insu_vatx"			, row.getParameter("wrhs_insu_vatx"           ))  /*  */
					.update("entr_cmsn_amnt"			, row.getParameter("entr_cmsn_amnt"           ))  /*  */
					.update("entr_cmsn_vatx"			, row.getParameter("entr_cmsn_vatx"           ))  /*  */
					.update("trnt_exps_amnt"			, row.getParameter("trnt_exps_amnt"           ))  /*  */
					.update("trnt_exps_vatx"			, row.getParameter("trnt_exps_vatx"           ))  /*  */
					.update("etcc_amnt_1fst"			, row.getParameter("etcc_amnt_1fst"           ))  /*  */
					.update("etcc_amnt_1fst_vatx"		, row.getParameter("etcc_amnt_1fst_vatx"      ))  /*  */
					.update("etcc_amnt_2snd"			, row.getParameter("etcc_amnt_2snd"           ))  /*  */
					.update("etcc_amnt_2snd_vatx"		, row.getParameter("etcc_amnt_2snd_vatx"      ))  /*  */
					.update("remk_text"					, row.getParameter("remk_text"                ))  /*  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("pper_code"           ).trim()
												+ " "
												+ row.getParamText("pper_name"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(Action.modify);
			}
			data.execute();
		}
		return null ;
	}

	// 조회
	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_numb       , b.line_seqn    ,  b.istt_qntt    , b.istt_pric			")
			.where("        , a.vatx_incl_yorn  , b.vatx_rate    , b.istt_amnt								")
			.where("        , ifnull(b.istt_amnt,0)*0.1 as istt_vatx										")
			.where("        , ifnull(b.istt_amnt,0)+ifnull(b.istt_amnt,0)*0.1 as ttsm_amnt					")
			.where("        , u.user_name as drtr_name           , b.orig_seqn    , b.orig_invc_numb		")
			.where("        , b.line_ordr       , b.line_stat    , b.line_clos    , b.find_name				")
			.where("        , i.item_code       , i.item_name    , i.item_spec    , un.unit_name			")
			.where("        , json_value(b.json_data , '$**.sett_pric') as sett_pric						")
			.where("        , json_value(b.json_data , '$**.sett_amnt') as sett_amnt						")
			.where("        , ifnull(m.invc_numb, b.orig_invc_numb) as offr_numb , m.invc_date as offr_date ")
			.where("from purc_istt_item b																	")
			.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
			.where("left outer join purc_ordr_item p on b.orig_invc_numb = p.invc_numb						")
			.where("left outer join purc_ordr_mast m on p.invc_numb = m.invc_numb							")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")
			.where("where   1=1																				")
			.where("and     a.invc_numb  = :invc_numb     " , arg.getParamText("invc_numb"))
			.where("and     b.line_stat  = :line_stat     " , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )))
			.where("group by b.invc_numb , b.line_seqn														")
			.where("order by a.invc_date desc limit 99999999999												")
			.where(") a																						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setCost(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String cost_clos	= arg.getParamText("cost_clos") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call sjflv_purc_cost (			")
			.query("  :invc_numb "  , invc_numb	)  //입고번호
			.query(", :cost_clos "  , cost_clos	)  // 정산여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;


	}

	public SqlResultMap getExpsInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.line_clos																										")
		;
		data.param
			.where("  from purc_istt_exps a																									")
			.where(" where 1 = 1 																											")
			.where("   and a.invc_numb = :invc_numb	" , arg.getParameter("invc_numb"))
		;

		return data.selectForMap();
	}
}
