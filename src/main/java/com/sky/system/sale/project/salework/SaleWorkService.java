package com.sky.system.sale.project.salework;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;


@Service
public class SaleWorkService extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String cstm_idcd,st_dt,ed_dt,remain_dvcd,modl_name,find_name;
		cstm_idcd = arg.getParamText("cstm_idcd");
		st_dt = arg.getParamText("st_dt");
		ed_dt = arg.getParamText("ed_dt");
		remain_dvcd = arg.getParamText("remain_dvcd");
		modl_name = arg.getParamText("modl_name");
		find_name = arg.getParamText("find_name");


		data.param
			.query("call sale_work(")
		;
		if(cstm_idcd.equals("")){	data.param	.query("     ''	") ;}else{ data.param	.query("     :cstm_idcd	"	, cstm_idcd); }
		if(st_dt.equals("")){		data.param	.query("    ,''	") ;}else{ data.param	.query("    ,:st_dt	"		, st_dt); }
		if(ed_dt.equals("")){		data.param	.query("    ,''	") ;}else{ data.param	.query("    ,:ed_dt	"		, ed_dt); }
		if(remain_dvcd.equals("")){	data.param	.query("    ,''	") ;}else{ data.param	.query("    ,:remain_dvcd"	, remain_dvcd); }
		if(modl_name.equals("")){	data.param	.query("    ,''	") ;}else{ data.param	.query("    ,:modl_name"	, modl_name); }
		if(find_name.equals("")){	data.param	.query("    ,''	") ;}else{ data.param	.query("    ,:find_name"	, find_name); }
		data.param
			.query(") ")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb           , a.line_seqn         , a.acpt_numb         , a.acpt_seqn		")
			.query("        , a.item_idcd           , a.sale_unit         , a.norm_sale_pric    , a.sale_stnd_pric	")
			.query("        , a.sale_pric           , a.sale_qntt         , a.vatx_incl_yorn    , a.vatx_rate		")
			.query("        , a.sale_amnt           , a.vatx_amnt         , a.ttsm_amnt         , a.dlvy_date		")
			.query("        , a.dlvy_hhmm           , a.stnd_unit         , a.stnd_unit_qntt    , a.wrhs_idcd		")
			.query("        , a.dlvy_cstm_idcd      , a.pcod_nmbr         , a.uper_seqn         , a.disp_seqn		")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , ifnull((ttsm_amnt - (select ifnull(sum(colt_amnt),0) from colt_item c 				")
			.query("                                                              where a.invc_numb = c.sale_numb		")
			.query("                                                                and a.line_seqn = c.sale_seqn)),0)	")
			.query("        as yotp_amnt							 													")
			.query("        , (select ifnull(sum(colt_amnt),0) from colt_item c											")
			.query("                                          where a.invc_numb = c.sale_numb							")
			.query("                                          and a.line_seqn = c.sale_seqn)							")
			.query("        as colt_amnt							 													")
		;
		data.param
			.where("from    sale_item a																				")
			.where("where   1=1																						")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by invc_numb																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getListerPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.query("Call sale_work_tax( :invc_numb", arg.getParameter("invc_numb"))
		.query(")															 ")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSale_work_tax_v1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("Call sale_work_tax_v1( :invc_numb", arg.getParameter("invc_numb"))
			.query(")															 ")
		;
		return data.selectForMap();
	}
	public SqlResultMap getModlPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select DISTINCT modl_name")
		;
		data.param
			.where("from  pjod_mast")
			.where("where 1 = 1")
			.where("and   modl_name like %:find_name%",arg.getParameter("find_name"));
		;
		return data.selectForMap();
	}
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("sale_mast						")
			.where("where invc_numb  = :invc_numb	")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("sale_item						")
			.where("where invc_numb  = :invc_numb	")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		return null ;
	}
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		int i = 0;
		int line_seqn = 0;
		int updt_line_seqn = 0;
		int vatx_amnt, sale_amnt ,ttsm_amnt,amnt;
		String	form_invc_numb="",form_remk_text="",form_drtr_idcd="",form_item_name=""
			  , form_cstm_idcd="",form_cstm_name="",form_invc_date =""
		;
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			if(row.getParamText("form_invc_numb")!=""){
				form_invc_numb =row.getParamText("form_invc_numb");
				form_remk_text =row.getParamText("form_remk_text");
				form_drtr_idcd =row.getParamText("form_drtr_idcd");
				form_item_name =row.getParamText("form_item_name");
				form_cstm_idcd =row.getParamText("form_cstm_idcd");
				form_cstm_name =row.getParamText("form_cstm_name");
				form_invc_date =row.getParamText("form_invc_date");
				break;
			};
		}
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(i==0){
				temp.param
					.query("select   ifnull(Max(line_seqn),0)+1 as seqn												")
				;
				temp.param
					.where("from sale_item a															")
					.where("where   1=1																	")
					.where("and     a.invc_numb   = :invc_numb    " , form_invc_numb)
				;
				SqlResultMap info = temp.selectForMap();
				temp.clear();

				line_seqn =Integer.parseInt(info.get(0).getParamText("seqn"));								// 계산서순번


				info.clear();

				data.param
					.table("sale_mast						")
					.where("where invc_numb  = :invc_numb	")

					.unique("invc_numb"			, form_invc_numb)

					.update("invc_date"			, form_invc_date)
					.update("cstm_idcd"			, form_cstm_idcd)
					.update("remk_text"			, form_remk_text)
					.update("drtr_idcd"			, form_drtr_idcd)

					.update("find_name"			, row.getParameter("invc_numb")
												+ " "
												+ form_invc_numb
												+ "	"
												+ form_item_name
												+ "	"
												+ form_cstm_idcd
												+ "	"
												+ form_cstm_name)

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
				data.execute();
				data.clear();

			}
			i++;

			if (rowaction == Action.delete) {
				data.param
					.table("sale_item						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   line_seqn  = :line_seqn	")

					.unique("invc_numb"			, form_invc_numb)
					.unique("line_seqn"			, row.getParameter("line_seqn"))
				;data.attach(Action.delete);
			}else{
				amnt = Integer.parseInt(row.getParamText("sale_amnt"));
				if(rowaction == Action.update){
					updt_line_seqn =Integer.parseInt(row.getParamText("line_seqn"));
//					amnt = amnt+Integer.parseInt(row.getParamText("ttsm_amnt"));			// 금액 합산?
				}else if(rowaction== Action.insert){
					updt_line_seqn = line_seqn++;
				}
				sale_amnt = (int) Math.floor(amnt/10)*10;
				vatx_amnt = (int) Math.floor(sale_amnt/100)*10;
				ttsm_amnt = (int) (((sale_amnt/10)*10)+vatx_amnt);
				data.param
					.table("sale_item						")
					.where("where invc_numb  = :invc_numb	")
					.where("and   line_seqn  = :line_seqn	")

					.unique("invc_numb"			, form_invc_numb)
					.unique("line_seqn"			, updt_line_seqn)

					.update("acpt_numb"			, row.getParameter("invc_numb"))
					.update("acpt_seqn"			, row.getParameter("amnd_degr"))
					.update("item_idcd"			, row.getParamText("item_idcd"))
					.update("sale_amnt"			, sale_amnt)
					.update("vatx_amnt"			, vatx_amnt)
					.update("ttsm_amnt"			, ttsm_amnt)

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
			}
			data.execute();
			data.clear();
			data.param
				.query("update sale_mast a																		")
				.query("       left outer join ( select invc_numb , sum(ifnull(sale_amnt,0)) as sale_amnt		")
				.query("                              , sum(ifnull(vatx_amnt,0)) as vatx_amnt					")
				.query("                              , sum(ifnull(ttsm_amnt,0)) as ttsm_amnt					")
				.query("                         FROM `sale_item` group by invc_numb							")
				.query("       ) b on a.invc_numb = b.invc_numb 												")
				.query("set   a.sale_amnt = b.sale_amnt															")
				.query("    , a.vatx_amnt = b.vatx_amnt															")
				.query("    , a.ttsm_amnt = b.ttsm_amnt															")
				.query("where 1=1																				")
				.query("and   a.invc_numb = :invc_numb",form_invc_numb)
			;data.attach(Action.direct);
		}
		data.execute();
		return null ;
	}

}
