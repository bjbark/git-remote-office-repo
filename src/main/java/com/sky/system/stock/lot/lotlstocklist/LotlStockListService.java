package com.sky.system.stock.lot.lotlstocklist;

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


@Service
public class LotlStockListService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String fr_dt = arg.getParamText("fr_dt");
		String stok_type_dvcd = "1";
		 if(arg.getParamText("stok_type_dvcd").equals("on")){
			 stok_type_dvcd = "2";
		 }

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.item_idcd    , i.item_name    , i.item_spec     , a.lott_numb  , i.item_code				")
			.query("       , (select unit_name from unit_mast u where i.unit_idcd = u.unit_code) as unit_name			")
			.query("       , sum(ifnull(a.bfre_qntt,0)) as bfre_qntt 													")
			.query("       , sum(ifnull(a.istt_qntt,0)) as istt_qntt													")
			.query("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt													")
			.query("       , sum(ifnull(a.bfre_qntt,0)) + sum(ifnull(a.istt_qntt,0)) - sum(ifnull(a.ostt_qntt,0)) as tdtt_qntt 	")
			.query("       , user_memo      , sysm_memo      , prnt_idcd      , line_levl      , line_ordr				")
			.query("       , line_stat      , line_clos      , find_name      , updt_user_name , updt_ipad				")
			.query("       , updt_dttm      , updt_idcd      , updt_urif      , crte_user_name , crte_ipad				")
			.query("       , crte_dttm      , crte_idcd      , crte_urif												")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("  , stok_type_dvcd ")
			;
		}
		data.param //퀴리문
			.where("from  ( select item_idcd , lott_numb   , invc_date													")
			.where("	,case when invc_date < :fr_dt then qntt * stok_symb else 0 end as bfre_qntt",arg.getParamText("fr_dt"))
			.where("	,case when invc_date = :fr_dt2  and isos_dvcd between 1000 and 1999",arg.getParamText("fr_dt"))
			.where("	then qntt  else 0 end as istt_qntt																")
			.where("	,case when invc_date = :fr_dt3  and isos_dvcd between 2000 and 3000",arg.getParamText("fr_dt"))
			.where("	then qntt  else 0 end as ostt_qntt																")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("  , stok_type_dvcd ")
			;
		}
		data.param
			.where("from   lot_isos_book 																				")
			.where("where  1=1 																							")
			.where("and    invc_date <= :fr_dt4         ", arg.getParamText("fr_dt"										))
			.where("and    wrhs_idcd =:wrhs_idcd        ", arg.getParameter("wrhs_idcd"									))
			.where("and    item_idcd =:item_idcd        ", arg.getParameter("item_idcd"									))
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and    stok_type_dvcd =:stok_type_dvcd        ",stok_type_dvcd)
			;
		}
		data.param
			.where("and    lott_numb like %:lott_numb%  ", arg.getParameter("lott_numb"									))
			.where("and    lott_numb = :bar_code		", arg.getParamText("bar_code"))
			.where(")a																									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("where	1=1																							")
			.where("and		find_name			like %:find_name%  "		, arg.getParamText("find_name"))
			.where("group by a.item_idcd , i.item_name , i.item_spec , a.lott_numb										")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		System.out.println(arg.getParameter("item_idcd"));

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.lott_numb   , a.line_seqn   , a.bzpl_idcd   , a.disp_seqn						")
			.query("       , a.invc_date   , a.invc_numb   , a.invc_seqn   , a.wrhs_idcd						")
			.query("       , a.item_idcd   , a.stok_symb   , a.uper_seqn   , a.isos_dvcd						")
			.query("       , (a.invc_date+a.invc_numb) as invc_evdc												")
			.query("       , case when a.isos_dvcd between 1000 and 1999     then qntt else 0 end as istt_qntt	")
			.query("       , case when a.isos_dvcd between 2000 and 3000     then qntt else 0 end as ostt_qntt	")
		;
		// 23.07.05 - 삼정(향료) 수불구분이 '구매입고'인 경우 제조일자, 유효기간, 비고 표시
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("   , case when a.isos_dvcd= '1100' then b.make_date																				")
				.query("          when a.isos_dvcd= '1200' then a.invc_date																				")
				.query("          when a.isos_dvcd= '1300' then cast(json_value(c.json_data, '$.make_date') as char)									")
				.query("          else null																												")
				.query("     end as make_date																											")
				.query("   , case when a.isos_dvcd= '1100' then json_value(b.json_data, '$.rtil_ddln_date')												")
				.query("          when a.isos_dvcd= '1200' then if (d.rtil_ddln_dcnt = 0, null, date_add(a.invc_date, interval d.rtil_ddln_dcnt month))	")
				.query("          when a.isos_dvcd= '1300' then cast(json_value(c.json_data, '$.rtil_ddln_date') as char)								")
				.query("          else null																												")
				.query("     end as rtil_ddln_date																										")
				.query("   , case when a.isos_dvcd= '1100' then b.user_memo																				")
				.query("          when a.isos_dvcd= '2200' then cs.dely_cstm_name																		")
				.query("          else null																												")
				.query("     end as user_memo																											")
			;
		}
		data.param
			.where("from  lot_isos_book a																												")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("      left outer join purc_istt_item b on b.invc_numb = a.invc_numb and b.line_seqn = a.invc_seqn and b.lott_numb = a.lott_numb	")
				.where("      left outer join sale_ostt_item s on s.invc_numb = a.invc_numb and s.line_seqn = a.invc_seqn and s.lott_numb = a.lott_numb	")
				.where("      left outer join sale_ostt_mast sm on sm.invc_numb = s.invc_numb")
				.where("      left outer join etit_item c on c.invc_numb = a.invc_numb and c.line_seqn = a.invc_seqn and c.lott_numb = a.lott_numb		")
				.where("      left outer join item_mast d on d.item_idcd = a.item_idcd																	")
				.where("      left outer join cstm_deli cs on replace(json_extract(sm.json_data, '$.dlvy_cstm_idcd'),'\"','') = cs.dlvy_cstm_idcd		")
			;
		}
		data.param
			.where("where 1 = 1																		")
			.where("and   a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"					))
			.where("and   a.lott_numb  = :lott_numb", arg.getParameter("lott_numb"					))
			.where("and   a.invc_date <= :invc_date", arg.getParameter("fr_dt"						))
			.where("and   a.lott_numb  = :bar_code", arg.getParameter("bar_code"					))

		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.where("and    a.stok_type_dvcd =:stok_type_dvcd        ",arg.getParameter("stok_type_dvcd"))
				.where("and    a.stok_symb != 0														 ")
			;
		}

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getMasterMobile(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String fr_dt = arg.getParamText("fr_dt");
		String stok_type_dvcd = "1";
		 if(arg.getParamText("stok_type_dvcd").equals("on")){
			 stok_type_dvcd = "2";
		 }

		data.param
			.query("select   a.item_idcd    , i.item_name    , i.item_spec     , a.lott_numb  , i.item_code				")
			.query("       , a.stok_qntt    , w.wrhs_name  																")
		;

		data.param
			.where("from lot_isos_sum a																					")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd 											")
			.where("left outer join wrhs_mast w on w.wrhs_idcd = a.wrhs_idcd 											")
			.where("where	1=1																							")
			.where("and    lott_numb = :bar_code		", arg.fixParameter("bar_code"))
			.where("limit 1																								")
		;
		return data.selectForMap();
	}


	public SqlResultMap getDetailMobile(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.lott_numb   , a.line_seqn   , a.bzpl_idcd   , a.disp_seqn						")
			.query("       , a.invc_date   , a.invc_numb   , a.invc_seqn   , a.wrhs_idcd						")
			.query("       , a.item_idcd   , a.stok_symb   , a.uper_seqn   , a.isos_dvcd						")
			.query("       , (a.invc_date+a.invc_numb) as invc_evdc												")
			.query("       , qntt																				")
			.query("       , ( select r.item_name																")
			.query("           from sscd_view r																	")
			.query("           where r.sscd_code = 'isos_dvcd'													")
			.query("           and r.item_code = a.isos_dvcd													")
			.query("       ) as isos_name																		")
		;
		data.param
			.where("from  lot_isos_book a														")
			.where("where 1 = 1																		")
			.where("and   a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"					))
			.where("and   a.lott_numb  = :lott_numb", arg.getParameter("lott_numb"					))
			.where("and   a.invc_date <= :invc_date", arg.getParameter("fr_dt"						))
			.where("and   a.lott_numb  = :bar_code", arg.getParameter("bar_code"					))

		;

		return data.selectForMap();
	}

}
