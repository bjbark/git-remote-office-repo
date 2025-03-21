package com.sky.system.sale.sale.newitemsale;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class NewItemSaleService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select * 											 										")
		;
		data.param
			.where("from    (																					")
			.where("select    a.invc_date        , a.cstm_idcd      , c.cstm_name        , b.item_idcd			")
			.where("        , d.item_name        , d.item_spec      , b.sale_qntt        , b.sale_pric			")
			.where("        , b.sale_amnt        , b.vatx_amnt      , b.ttsm_amnt        , d.crte_dttm			")
			.where("        , d.item_code																		")
			.where("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name , a.crte_ipad								")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("from sale_mast a																			")
			.where("left outer join sale_item b on b.invc_numb = a.invc_numb									")
			.where("left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd									")
			.where("left outer join item_mast d on d.item_idcd = b.item_idcd									")
			.where("left outer join acpt_mast e on e.invc_numb = b.acpt_numb									")
			.where("where   1=1																					")
			.where("and     a.bzpl_idcd  = :bzpl_idcd"         , arg.getParamText("bzpl_idcd"))		//사업장
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1"))	//매출기간
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2"))	//매출기간
			.where("and     d.crte_dttm >= :invc_date3       " , arg.getParamText("invc_date3"))	//등록기간
			.where("and     d.crte_dttm <= :invc_date4       " , arg.getParamText("invc_date4"))	//등록기간
			.where("and     a.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"))		//거래처
			.where("and     e.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"))		//영업담당
			.where("and     b.item_idcd  = :item_idcd        " , arg.getParamText("item_idcd"))		//품목
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select case when t.item_idcd is null or t.invc_info is null then ''					")
			.query("                  else t.item_code													")
			.query("           end item_code 															")
			.query("     , case when t.item_idcd is null and t.invc_info is null then '<<합계>>'			")
			.query("            when t.item_idcd is not null and t.invc_info is null then '<<품목계>>'		")
			.query("                else t.item_name													")
			.query("        end item_name																")
			.query("     , case when t.item_idcd is null or t.invc_info is null then ''					")
			.query("                else t.item_spec													")
			.query("        end item_spec																")
			.query("     , case when t.item_idcd is null or t.invc_info is null then ''					")
			.query("                else t.invc_date													")
			.query("        end invc_date																")
			.query("     , case when t.item_idcd is null or t.invc_info is null then ''					")
			.query("                else t.cstm_name													")
			.query("        end cstm_name																")
			.query("     , t.sale_qntt																	")
			.query("     , case when t.item_idcd is null or t.invc_info is null then ''					")
			.query("                else t.sale_pric													")
			.query("        end sale_pric																")
			.query("     , t.sale_amnt																	")
			.query("     , t.vatx_amnt																	")
			.query("     , t.ttsm_amnt																	")
			.query("from (																				")
			.query("      select s.item_idcd, s.invc_info												")
			.query("           , s.invc_date, s.item_code, s.item_name									")
			.query("           , s.item_spec, s.cstm_name, s.sale_pric									")
			.query("           , sum(s.sale_qntt) as sale_qntt, sum(s.sale_amnt) as sale_amnt			")
			.query("           , sum(s.vatx_amnt) as vatx_amnt, sum(s.ttsm_amnt) as ttsm_amnt			")
			.query("        from(																		")
			.query("             select b.item_idcd, concat(a.invc_numb,'-',b.line_seqn) as invc_info	")
			.query("                  , a.invc_date, d.item_code, d.item_name							")
			.query("                  , d.item_spec, c.cstm_name, b.sale_pric							")
			.query("                  , b.sale_qntt, b.sale_amnt, b.vatx_amnt, b.ttsm_amnt				")
			.query("               from sale_mast a														")
			.query("                    left outer join sale_item b on b.invc_numb = a.invc_numb		")
			.query("                    left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd		")
			.query("                    left outer join item_mast d on d.item_idcd = b.item_idcd		")
			.query("                    left outer join acpt_mast e on e.invc_numb = b.acpt_numb		")
			.query("              where 1 = 1															")
			.query("                and a.bzpl_idcd = :bzpl_idcd   " , arg.getParamText("bzpl_idcd"))		//사업장
			.query("                and a.invc_date >= :invc_date1 " , arg.getParamText("invc_date1"))		//매출기간(From)
			.query("                and a.invc_date <= :invc_date2 " , arg.getParamText("invc_date2"))		//매출기간(To)
			.query("                and d.crte_dttm >= :invc_date3 " , arg.getParamText("invc_date3"))		//등록기간
			.query("                and d.crte_dttm <= :invc_date4 " , arg.getParamText("invc_date4"))		//등록기간
			.query("                and a.cstm_idcd = :cstm_idcd   " , arg.getParamText("cstm_idcd"))		//거래처
			.query("                and e.drtr_idcd = :drtr_idcd   " , arg.getParamText("drtr_idcd"))		//영업담당
			.query("                and b.item_idcd = :item_idcd   " , arg.getParamText("item_idcd"))		//품목
			.query("            ) s																		")
			.query("        group by s.item_idcd, s.invc_info with rollup								")
			.query(") t																					")
		;

		return data.selectForMap();
	}
}
