package com.sky.system.custom.iypkg.eis.eisreport1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("iypkg.EisReport1Service")
public class EisReport1Service extends DefaultServiceHandler {

	// 거래처별 월 원단 매입 통계
	public SqlResultMap search1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																								")
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select		concat(a.item_leng,'*', a.item_widh,'*',a.item_hght) as item 												")
			.where("			, a.item_leng		, a.item_widh		, a.item_hght		, b.istt_pric		, a.pcod_numb				")
			.where("			, a.acpt_qntt		, a.line_clos		, a.invc_date		, a.find_name		, c.line_stat				")
			.where("			, a.invc_numb		, a.dlvy_cstm_name	, a.prod_name		, c.vatx_rate		, c.ttsm_amnt				")
			.where("			, d.stnd_pric		, sum(d.stnd_pric) as stnd_pric2														")
			.where("			from boxx_acpt a																							")
			.where("			left outer join purc_istt_item b on a.invc_numb =  json_value(b.json_data,'$.acpt_numb') 					")
			.where("			left outer join purc_istt_mast c on b.invc_numb = c.invc_numb												")
			.where("			left outer join boxx_acpt_bop d on d.invc_numb = a.invc_numb												")
			.where("where 1=1																												")
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.find_name  like %:find_name%	" , arg.getParamText("find_name" ))
			.where("group by a.invc_numb																									")
			.where("order by a.invc_numb																									")
			.where(") a																														")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	public SqlResultMap detail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																								")
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select 		a.invc_numb		, a.invc_date		, ifnull(b.fabc_name,0) as fabc_name		, b.item_spec   			")
			.where("		 , ifnull(b.ppln_dvcd,0) as ppln_dvcd	, ifnull(b.item_fxqt,0) as item_fxqt		, c.istt_pric				")
			.where(" 		 , c.make_cmpy_name	, d.stnd_pric		, concat(a.item_leng,'*', a.item_widh,'*',a.item_hght) as item 			")
			.where("from boxx_acpt a																										")
			.where("left outer join purc_istt_item c on a.invc_numb =  json_value(c.json_data,'$.acpt_numb')								")
			.where("left outer join boxx_acpt_bom b on a.invc_numb = b.invc_numb															")
			.where("left outer join boxx_acpt_bop d on d.invc_numb = a.invc_numb															")
			.where("where 1=1																												")
			.where("and     a.invc_numb	  = :invc_numb  "	, arg.getParamText("invc_numb"))
			.where("and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																									")
			.where(") a																														")
		;
		return data.selectForMap();

	}


	public SqlResultMap detail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total("select count(1) as maxsize																								")
		;
		data.param
			.query("select *																												")
		;
		data.param
			.where("from (																													")
			.where("select 		a.invc_numb		, a.invc_date		, b.wkct_idcd		, b.wkun_dvcd 										")
			.where(" 		   , b.plan_qntt	,b.stnd_pric		, c.remk_text		, c.ttsm_amnt										")
			.where(" from boxx_acpt a																										")
			.where("  left outer join boxx_acpt_bop b on a.invc_numb = b.invc_numb															")
			.where("  left outer join purc_istt_item c on c.invc_numb = b.invc_numb and c.line_seqn = b.line_seqn							")
			.where("where 1=1																												")
			.where("and     a.invc_numb	  = :invc_numb  "	, arg.getParamText("invc_numb"))
			.where("and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																									")
			.where(") a																														")
		;
		return data.selectForMap();

	}


}
