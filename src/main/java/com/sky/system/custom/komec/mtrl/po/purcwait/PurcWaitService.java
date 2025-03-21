package com.sky.system.custom.komec.mtrl.po.purcwait;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service
public class PurcWaitService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String chek = arg.getParamText("chek");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  																					")
		;
		data.param
			.query("select a.*																										")
		;
		data.param
			.where("from (																											")
			.where("   with purc as ( 																								")
			.where("      select a.invc_numb, a.invc_date, a.cstm_idcd, a.drtr_idcd, a.supl_dvcd, a.line_clos						")
			.where("           , b.line_seqn, b.item_idcd, b.offr_qntt, b.deli_date, b.user_memo									")
			.where("           , json_value(b.json_data,'$**.lott_numb') as lott_numb												")
			.where("           , json_value(b.json_data,'$**.qntt') as qntt															")
			.where("           , json_value(b.json_data,'$**.divs_qntt') as divs_qntt												")
			.where("        from purc_ordr_mast a																					")
			.where("             left outer join purc_ordr_item b on b.invc_numb = a.invc_numb										")
			.where("       where 1 = 1																								")
			.where("         and a.find_name	like %:find_name% " 	, arg.getParamText("find_name"))
			.where("         and a.invc_date >= :invc1_date	"			, arg.getParamText("invc1_date"))
			.where("         and a.invc_date <= :invc2_date	"			, arg.getParamText("invc2_date"))
			.where("         and b.deli_date >= :deli1_date	"			, arg.getParamText("deli1_date"))
			.where("         and b.deli_date <= :deli2_date	"			, arg.getParamText("deli2_date"))
			.where("         and a.invc_numb  = :invc_numb	"			, arg.getParameter("invc_numb" ))
			.where("         and a.cstm_idcd  = :cstm_idcd	"			, arg.getParamText("cstm_idcd" ))
			.where("         and a.drtr_idcd  = :drtr_idcd	"			, arg.getParamText("drtr_idcd" ))
			.where("         and a.supl_dvcd  = :supl_dvcd	"			, arg.getParamText("supl_dvcd" ))
			.where("         and b.item_idcd  = :item_idcd	"			, arg.getParamText("item_idcd" ))
			.where("         and a.line_stat   < :line_stat	"	, "2"	, "".equals(arg.getParamText("line_stat" )))
			.where("   ), istt as ( 																								")
			.where("      select a.invc_numb, a.line_seqn, sum(b.istt_qntt) as istt_qntt											")
			.where("        from purc a																								")
			.where("             left outer join purc_istt_item b on b.orig_invc_numb = a.invc_numb and b.orig_seqn = a.line_seqn	")
			.where("             left outer join purc_istt_mast c on c.invc_numb = b.invc_numb										")
			.where("       where 1 = 1 																								")
			.where("         and c.line_stat < 2																					")
			.where("       group by a.invc_numb, a.line_seqn																		")
			.where("   )																											")
			.where("   select a.line_clos, a.invc_date, a.invc_numb, a.line_seqn, a.supl_dvcd, a.deli_date, a.offr_qntt, a.user_memo")
			.where("        , ifnull(b.istt_qntt, 0) as istt_qntt  , a.qntt     , a.lott_numb	, a.divs_qntt						")
			.where("        , a.offr_qntt - ifnull(b.istt_qntt, 0) as upid_baln_qntt												")
			.where("        , c.cstm_code, c.cstm_name 																				")
			.where("        , d.item_code, d.item_name, d.item_spec																	")
			.where("        , e.user_name as purc_drtr_name																			")
			.where("     from purc a																								")
			.where("          left outer join istt b on b.invc_numb = a.invc_numb and b.line_seqn = a.line_seqn						")
			.where("          left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd												")
			.where("          left outer join item_mast d on d.item_idcd = a.item_idcd												")
			.where("          left outer join user_mast e on e.user_idcd = a.drtr_idcd												")
			.where("    where 1 = 1																									")
		;
		if (chek.equals("false")){
			data.param
				.where("      and a.offr_qntt - ifnull(b.istt_qntt, 0) > 0															")
			;
		}
		data.param
		    .where("    order by a.invc_date desc, a.invc_numb desc, a.line_seqn limit 999999999									")
			.where(") a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap setRecords(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records",SqlResultMap.class);

		ParamToJson parse = new ParamToJson();
		
		for(SqlResultRow row : map){
			String json = parse.TranslateRow(arg, row, "purc_ordr_item_json_fields");

			data.param
				.table("purc_ordr_item")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", row.fixParameter("invc_numb"))
				.unique("line_seqn", row.fixParameter("line_seqn"))

				.update("json_data",json)

				.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.update("updt_idcd", row.getParameter("updt_idcd"))
				.update("updt_ipad", arg.remoteAddress )
			;

			data.attach(Action.update);
		}
		data.execute();
		return null;
	}
}
