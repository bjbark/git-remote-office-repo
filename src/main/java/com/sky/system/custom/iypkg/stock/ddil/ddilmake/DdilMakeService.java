package com.sky.system.custom.iypkg.stock.ddil.ddilmake;

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
import com.sky.listener.ParamToJson;
@Service("iypkg.DdilMakeService")
public class DdilMakeService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String result = "";
		result = "{\"fr_dt\":\""+arg.getParamText("invc_date")+"\",\"to_dt\":\""+arg.getParamText("invc_date")+"\"}";
		if(arg.getParamText("acct_dvcd").equals("3")){
			data.param
				.query("call stock_list_type_product (			")
				.query(" :param	" , result					)
				.query(" )									")
			;
		}else if(arg.getParamText("acct_dvcd").equals("2")){
			data.param
				.query("call stock_list_type_asmt (			")
				.query(" :param	" , result					)
				.query(" )									")
			;
		}else if(arg.getParamText("acct_dvcd").equals("1")){
			data.param
				.query("call stock_list_type_fabc1 (			")
				.query(" :param	" , result					)
				.query(" )									")
			;
		}
		return data.selectForMap();
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		if(arg.fixParamText("acct_dvcd").equals("3")){
			data.param
				.query("select    a.invc_numb       , a.line_seqn       , a.acct_bacd         , a.item_idcd			")
				.query("          , a.zone_idcd       , a.unit_idcd       , a.stnd_unit         , a.book_good_qntt	")
				.query("          , a.book_poor_qntt  , a.book_issb_qntt  , a.book_qntt_ttsm    , a.ddil_good_qntt	")
				.query("          , a.ddil_poor_qntt  , a.ddil_issb_qntt  , a.ddil_qntt_ttsm    , a.diff_good_qntt	")
				.query("          , a.diff_poor_qntt  , a.uper_seqn       , a.disp_seqn								")
				.query("          , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
				.query("          , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
				.query("          , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
				.query("          , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
				.query("          , a.crte_idcd       , a.crte_urif													")
				.query("          , d.invc_date       , d.bzpl_idcd       , d.wrhs_idcd         , d.drtr_idcd		")
				.query("          , i.prod_code as item_code              , i.prod_name as item_name     			")
				.query("          , i.prod_spec as item_spec              											")
				.query("          , w.wrhs_name       , z.zone_name as stor_plac									")
			;
			data.param
				.where("from ddil_item a																			")
				.where("right outer join product_mast i on a.item_idcd = i.prod_idcd									")
				.where("left outer join ddil_mast d on a.invc_numb = d.invc_numb									")
				.where("left outer join wrhs_mast w on d.wrhs_idcd = w.wrhs_idcd									")
				.where("left outer join wrhs_zone z on a.zone_idcd = z.zone_idcd									")
				.where("where    1=1																				")
				.where("and      a.find_name like %:find_name%   " , arg.getParamText("find_name"))
				.where("and      d.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
				.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.item_idcd																		")
			;
		}else if(arg.fixParamText("acct_dvcd").equals("2")){
			data.param
				.query("select    a.invc_numb       , a.line_seqn       , a.acct_bacd         , a.item_idcd			")
				.query("          , a.zone_idcd       , a.unit_idcd       , a.stnd_unit         , a.book_good_qntt	")
				.query("          , a.book_poor_qntt  , a.book_issb_qntt  , a.book_qntt_ttsm    , a.ddil_good_qntt	")
				.query("          , a.ddil_poor_qntt  , a.ddil_issb_qntt  , a.ddil_qntt_ttsm    , a.diff_good_qntt	")
				.query("          , a.diff_poor_qntt  , a.uper_seqn       , a.disp_seqn								")
				.query("          , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
				.query("          , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
				.query("          , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
				.query("          , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
				.query("          , a.crte_idcd       , a.crte_urif													")
				.query("          , d.invc_date       , d.bzpl_idcd       , d.wrhs_idcd         , d.drtr_idcd		")
				.query("          , i.asmt_code as item_code              , i.asmt_name as item_name       			")
				.query("          , i.asmt_spec as item_spec       													")
				.query("          , w.wrhs_name       , z.zone_name as stor_plac									")
			;
			data.param
				.where("from ddil_item a																			")
				.where("right outer join asmt_mast i on a.item_idcd = i.asmt_idcd									")
				.where("left outer join ddil_mast d on a.invc_numb = d.invc_numb									")
				.where("left outer join wrhs_mast w on d.wrhs_idcd = w.wrhs_idcd									")
				.where("left outer join wrhs_zone z on a.zone_idcd = z.zone_idcd									")
				.where("where    1=1																				")
				.where("and      a.find_name like %:find_name%   " , arg.getParamText("find_name"))
				.where("and      d.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
				.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.item_idcd																		")
			;
		}else if(arg.fixParamText("acct_dvcd").equals("1")){
			data.param
				.query("select    a.invc_numb       , a.line_seqn       , a.acct_bacd         , a.item_idcd			")
				.query("          , a.zone_idcd       , a.unit_idcd       , a.stnd_unit         , a.book_good_qntt	")
				.query("          , a.book_poor_qntt  , a.book_issb_qntt  , a.book_qntt_ttsm    , a.ddil_good_qntt	")
				.query("          , a.ddil_poor_qntt  , a.ddil_issb_qntt  , a.ddil_qntt_ttsm    , a.diff_good_qntt	")
				.query("          , a.diff_poor_qntt  , a.uper_seqn       , a.disp_seqn								")
				.query("          , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl		")
				.query("          , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name		")
				.query("          , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd		")
				.query("          , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm		")
				.query("          , a.crte_idcd       , a.crte_urif													")
				.query("          , d.invc_date       , d.bzpl_idcd       , d.wrhs_idcd         , d.drtr_idcd		")
				.query("          , i.fabc_code as item_code              , i.fabc_name as item_name    			")
				.query("          , i.fabc_spec as item_spec              											")
				.query("          , w.wrhs_name       , z.zone_name as stor_plac									")
			;
			data.param
				.where("from ddil_item a																			")
				.where("right outer join fabc_mast i on a.item_idcd = i.fabc_idcd									")
				.where("left outer join ddil_mast d on a.invc_numb = d.invc_numb									")
				.where("left outer join wrhs_mast w on d.wrhs_idcd = w.wrhs_idcd									")
				.where("left outer join wrhs_zone z on a.zone_idcd = z.zone_idcd									")
				.where("where    1=1																				")
				.where("and      a.find_name like %:find_name%   " , arg.getParamText("find_name"))
				.where("and      d.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
				.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.item_idcd																		")
			;
		}
		return data.selectForMap(sort);
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("ddil_item													")
					.where("where invc_numb = :invc_numb								")		//invoice번호
					.where("and   line_seqn = :line_seqn								")		//순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("ddil_good_qntt"	, row.getParameter("ddil_good_qntt"		))		//실사수량
					.update("diff_good_qntt"	, row.getParameter("diff_good_qntt"		))		//차이수량
					.update("zone_idcd"			, row.getParameter("zone_idcd"			))		//보관위치id
					.update("stor_plac"			, row.getParameter("stor_plac"			))		//보관장소
					.update("user_memo"			, row.getParameter("user_memo"			))		//메모사항

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String fr_dt		= arg.getParamText("invc1_date");
		String to_dt		= arg.getParamText("invc2_date");
		String hq			= arg.getParamText("hqof_idcd");
		String stor			= arg.getParamText("stor_id");
		String wrhs_idcd	= arg.getParamText("wrhs_idcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call ddil_make_type_pkg (				")
			.query("   :stor "       , stor				)		// 본사코드
			.query(" , :fr_dt"       , fr_dt			)		// invoice일자
			.query(" , :to_dt"       , to_dt			)		// invoice일자
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setDdil(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		ParamToJson param = new ParamToJson();
		String params = param.TranslateAll(arg);
		System.out.println(params);
		data.param
			.query("call ddil_confirm (				")
			.query("   :param       "  , params		 )
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
}
