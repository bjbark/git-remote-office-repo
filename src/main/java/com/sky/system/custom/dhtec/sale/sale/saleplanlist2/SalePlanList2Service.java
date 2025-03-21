package com.sky.system.custom.dhtec.sale.sale.saleplanlist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class SalePlanList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    b.invc_date       , a.invc_numb       , a.line_seqn       , b.cstm_idcd			")
			.where("		, a.acpt_numb       , a.item_idcd       , p.prod_idcd       , p.prod_name			")
			.where("		, p.item_leng       , p.item_widh       , p.item_hght       , p.acpt_qntt			")
			.where("		, a.ostt_qntt       , p.pqty_pric       , a.sale_amnt       , a.vatx_amnt			")
			.where("		, a.ttsm_amnt       , p.pcod_numb       , a.user_memo       , a.sysm_memo			")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name			")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd			")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm			")
			.where("		, a.crte_idcd       , a.crte_urif       , c.cstm_name								")
			.where("from   sale_ostt_item a																		")
			.where("   left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb							")
			.where("   left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join boxx_acpt p on a.acpt_numb = p.invc_numb									")
			.where("where  1=1																					")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    b.invc_date  >= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    b.invc_date  <= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    b.cstm_idcd  >= :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_idcd  <= :cstm_idcd2				" , arg.getParamText("cstm_idcd2"))
			.where("and    p.prod_idcd  >= :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    p.prod_idcd  <= :prod_idcd2				" , arg.getParamText("prod_idcd2"))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("order by b.invc_date desc, a.invc_numb desc limit 99999										")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.acpt_numb       , c.cstm_name       , b.prod_name       , p.prod_leng						")
			.where("		, p.prod_widh       , p.prod_hght       , b.acpt_qntt       , ifnull(s.ostt_qntt,0) as ostt_qntt")
			.where("		, b.pqty_pric       , b.deli_date       , a.trst_qntt       									")
			.where("		, ifnull(b.acpt_qntt,0) - ifnull(s.ostt_qntt,0) as unostt										")
			.where("		, (ifnull(b.acpt_qntt,0) - ifnull(s.ostt_qntt,0))*b.pqty_pric as sply_amnt						")
			.where("		, (ifnull(b.acpt_qntt,0) - ifnull(s.ostt_qntt,0))*b.pqty_pric*0.1 as vatx_amnt					")
			.where("		, (ifnull(b.acpt_qntt,0) - ifnull(s.ostt_qntt,0))*b.pqty_pric									")
			.where("		 +(ifnull(b.acpt_qntt,0) - ifnull(s.ostt_qntt,0))*b.pqty_pric*0.1 as ttsm_amnt					")
			.where("from   ostt_plan a																						")
			.where("    left outer join boxx_acpt b on a.acpt_numb = b.invc_numb											")
			.where("    left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd											")
			.where("    left outer join product_mast p on b.prod_idcd = p.prod_idcd											")
//			.where("    left outer join ( select a.invc_numb, sum(a.offr_qntt) as offr_qntt, a.orig_invc_numb, a.orig_seqn	")
//			.where("                      from purc_ordr_item a																")
//			.where("                      left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb						")
//			.where("                      where (json_value(b.json_data , '$**.offr_path_dvcd')) = 1						")
//			.where("                      group by orig_invc_numb															")
//			.where("                    ) p on a.invc_numb = p.orig_invc_numb												")
//			.where("    left outer join ( select sum(a.istt_qntt) as istt_qntt												")
//			.where("                           , (json_value(a.json_data , '$**.acpt_numb')) as acpt_numb					")
//			.where("                      from purc_istt_item a																")
//			.where("                      group by (json_value(a.json_data , '$**.acpt_numb'))								")
//			.where("                    ) i on a.invc_numb = i.acpt_numb													")
			.where("    left outer join ( select sum(ifnull(a.ostt_qntt,0)) as ostt_qntt, a.acpt_numb						")
			.where("                      from sale_ostt_item a																")
			.where("                      left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb						")
			.where("                      where 1=1																			")
			.where("                      and    b.invc_date  >= :invc_date1	" , arg.getParamText("invc1_date"))
//			.where("                      and    b.invc_date  <= :invc_date2	" , arg.getParamText("invc2_date"))
			.where("                      group by a.acpt_numb																")
			.where("                    ) s on b.invc_numb = s.acpt_numb													")
			.where("where  1=1																								")
			.where("and    b.acpt_qntt - ifnull(s.ostt_qntt,0) > 0															")
			.where("and    a.invc_date  >= :invc_date3				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date  <= :invc_date4				" , arg.getParamText("invc2_date"))
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    b.cstm_idcd  >= :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    b.cstm_idcd  <= :cstm_idcd2				" , arg.getParamText("cstm_idcd2"))
			.where("and    b.prod_idcd  >= :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    b.prod_idcd  <= :prod_idcd2				" , arg.getParamText("prod_idcd2"))
			.where("and    a.line_stat   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date desc, a.cstm_idcd																	")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
