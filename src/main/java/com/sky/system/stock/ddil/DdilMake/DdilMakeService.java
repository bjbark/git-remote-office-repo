package com.sky.system.stock.ddil.DdilMake;

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


@Service
public class DdilMakeService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date	= arg.getParamText("invc_date") ;
		String wrhs_idcd1	= arg.getParamText("wrhs_idcd") ;
		String find_name	= arg.getParamText("find_name") ;
		String list_all		= "off";
		String wrhs_idcd	= null ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if(wrhs_idcd1.equals("")){
			wrhs_idcd = "@";
		}else{
			wrhs_idcd = wrhs_idcd1;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		String acct_dvcd = arg.getParamText("acct_dvcd");
		if(acct_dvcd.equals("")){
			acct_dvcd = "all";
		}
		String stok_type_dvcd = arg.getParamText("stok_type_dvcd");
		if(stok_type_dvcd.equals("")){
			stok_type_dvcd = "off";
		}

		if(find_name.equals("")){
			find_name = "@";
		}

		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("call stock_list_type_1_sjflv (		")
				.query("   concat(substring(:invc1_date,1,6),'01')" , invc_date	)	// 일자
				.query(" , :invc2_date "      , invc_date	)	// 일자
				.query(" , :wrhs_idcd "       , wrhs_idcd	)	// 창고코드
				.query(" , :list_all "        , list_all		)
				.query(" , :acct_dvcd "       , acct_dvcd	)	// 자재구분
				.query(" , :stor      "       , stor			)
				.query(" , :stok_type_dvcd "  , stok_type_dvcd	)	// 입고유형
				.query(" , :item_idcd "       , "@"				)	// 입고유형
				.query(" , :find_name      "  , find_name		)
				.query(" ) 								")
			;
		}else{
			data.param
				.query("call stock_list_type_1 (		")
				.query("   concat(substring(:invc1_date,1,6),'01')" , invc_date	)	// 일자
				.query(" , :invc2_date " , invc_date	)	// 일자
				.query(" , :wrhs_idcd "  , wrhs_idcd	)	// 창고코드
				.query(" , :list_all "   , list_all		)
				.query(" , :acct_dvcd "  , acct_dvcd	)	// 자재구분
				.query(" , :stor      "  , stor			)
				.query(" ) 								")
			;
		}
		return data.selectForMap(sort);
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String stok_type_dvcd = arg.getParamText("stok_type_dvcd");
		if(stok_type_dvcd.equals("")){
			stok_type_dvcd = "1";
		}else{
			stok_type_dvcd = "2";
		}


		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.line_seqn       , a.acct_bacd         , a.item_idcd			")
			.query("        , z.zone_idcd       , a.unit_idcd       , a.stnd_unit         , a.book_good_qntt	")
			.query("        , a.book_poor_qntt  , a.book_issb_qntt  , a.book_qntt_ttsm    , a.ddil_good_qntt	")
			.query("        , a.ddil_poor_qntt  , a.ddil_issb_qntt  , a.ddil_qntt_ttsm    , a.diff_good_qntt	")
			.query("        , a.diff_poor_qntt  , a.uper_seqn       , a.disp_seqn								")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif													")
			.query("        , d.invc_date       , d.bzpl_idcd       , d.wrhs_idcd         , d.drtr_idcd			")
			.query("        , i.item_code       , i.item_name       , i.item_spec         , i.unit_idcd			")
			.query("        , u.unit_name       , w.wrhs_name       , z.zone_name as stor_plac					")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("  , d.stok_type_dvcd ")
			;
		}
		data.param
			.where("from ddil_item a																			")
			.where("left outer join ddil_mast d on a.invc_numb = d.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("left outer join wrhs_mast w on d.wrhs_idcd = w.wrhs_idcd									")
			.where("left outer join wrhs_zone z on COALESCE(a.zone_idcd, JSON_VALUE(i.json_data, '$.zone_idcd')) = z.zone_idcd	")
			.where("where    1=1																				")
			.where("and      a.find_name like %:find_name%   " , arg.getParamText("find_name"))
			.where("and      d.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
			.where("and      d.wrhs_idcd   = :wrhs_idcd      " , arg.getParamText("wrhs_idcd"))
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and   d.stok_type_dvcd =:stok_type_dvcd        ",stok_type_dvcd)
			;
		}
		data.param
			.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by i.item_idcd																		")
		;
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
		String fr_dt			= arg.getParamText("invc1_date");
		String to_dt			= arg.getParamText("invc2_date");
		String hq				= arg.getParamText("hqof_idcd");
		String stor				= arg.getParamText("stor_id");
		String wrhs_idcd		= arg.getParamText("wrhs_idcd");
		String stok_type_dvcd	= arg.getParamText("stok_type_dvcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("call ddil_make_type_1_sjflv (				")
				.query("   :stor "       , stor				)		// 본사코드
				.query(" , :fr_dt"       , fr_dt			)		// invoice일자
				.query(" , :to_dt"       , to_dt			)		// invoice일자
				.query(" , :wrhs_idcd "  , wrhs_idcd		)		// 창고코드
				.query(" , :check"       , stok_type_dvcd		)		// 창고코드
				.query(" ) 								")
			;
		}else{
			data.param
				.query("call ddil_make_type_1 (				")
				.query("   :stor "       , stor				)		// 본사코드
				.query(" , :fr_dt"       , fr_dt			)		// invoice일자
				.query(" , :to_dt"       , to_dt			)		// invoice일자
				.query(" , :wrhs_idcd "  , wrhs_idcd		)		// 창고코드
				.query(" ) 									")
			;
		}

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
