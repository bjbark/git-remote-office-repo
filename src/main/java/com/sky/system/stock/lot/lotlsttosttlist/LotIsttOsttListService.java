package com.sky.system.stock.lot.lotlsttosttlist;

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
public class LotIsttOsttListService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.isos_dvcd   , a.invc_date   , a.wrhs_idcd   , a.item_idcd		")
			.query("       , a.lott_numb   , a.user_memo   , a.sysm_memo   , a.find_name		")
			.query("       , a.full_invc_numb              , a.isos_evi    , w.wrhs_name		")
			.query("       , a.istt_qntt   , a.ostt_qntt   , i.item_name   , i.item_spec		")
			.query("       , i.modl_name   , u.unit_name   , i.item_code   , i.acct_bacd		")
			.query("       , (select base_name from base_mast r where i.acct_bacd  = r.base_code")
			.query("                             and   r.prnt_idcd = '1102')   as acct_bacd_name")
		;
		if(arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("       , (case when a.isos_dvcd = '1100' then (select make_date from purc_istt_item where invc_numb = a.invc_numb and line_seqn = a.invc_seqn) ")
				.query("               when a.isos_dvcd = '1200' then (select b.invc_date from lot_isos_book b where b.lott_numb = a.lott_numb and b.stok_type_dvcd = a.stok_type_dvcd and b.isos_dvcd = a.isos_dvcd order by line_seqn limit 1 ) ")
				.query("               when a.isos_dvcd = '1300' then (select date_format(json_value(json_data, '$.make_date'), '%Y%m%d') from etit_item where invc_numb = a.invc_numb and line_seqn = a.invc_seqn)  ")
				.query("               else null ")
				.query("          end) as make_date ")

				.query("       , (case when a.isos_dvcd = '1100' then (select date_format(json_value(json_data, '$.rtil_ddln_date'), '%Y%m%d') from purc_istt_item where invc_numb = a.invc_numb and line_seqn = a.invc_seqn) ")
				.query("               when a.isos_dvcd = '1300' then (select DATE_FORMAT(json_value(json_data, '$.rtil_ddln_date'), '%Y%m%d') from etit_item where invc_numb = a.invc_numb and line_seqn = a.invc_seqn)  ")
				.query("               else null ")
				.query("          end) as  rtil_ddln_date")
				.query("       , case when a.isos_dvcd = '1300' then (select cstm_name from cstm_mast where cstm_idcd in (select cstm_idcd from etit_mast where invc_numb = a.invc_numb and cstm_dvcd = '5')) ")
				.query("              when a.isos_dvcd = '2300' then (select cstm_name from cstm_mast where cstm_idcd in (select cstm_idcd from etot_mast where invc_numb = a.invc_numb and cstm_dvcd = '5')) ")
				.query("              when a.isos_dvcd = '1200' then (select cstm_name from cstm_mast where cstm_idcd in (select cstm_idcd from acpt_mast where invc_numb in (select order_no from tbi_job_order_prod_list where job_order_no = a.invc_numb))) ")
				.query("              when a.isos_dvcd = '2200' then (select cstm_name from cstm_mast where cstm_idcd in (select cstm_idcd from acpt_mast where invc_numb = a.invc_numb)) ")
				.query("         end cstm_name ")
			;
		}
		data.param
			.where("from lot_istt_ostt_view a													")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("left outer join unit_mast u on u.unit_idcd = i.unit_idcd					")
			.where("left outer join wrhs_mast w on w.wrhs_idcd = a.wrhs_idcd					")
			.where("where 1=1																	")
			.where("       and a.lott_numb  like %:lott_numb%", arg.getParameter("lott_numb"		))
			.where("       and a.find_name  like %:find_name%", arg.getParameter("find_name"		))
			.where("       and a.invc_date >= :fr_dt"	 , arg.getParameter("fr_dt"				))
			.where("       and a.invc_date <= :to_dt"	 , arg.getParameter("to_dt"				))
			.where("       and a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"			))
			.where("       and i.acct_bacd  = :acct_bacd", arg.getParameter("acct_bacd"			))
			.where("       and a.wrhs_idcd  = :wrhs_idcd", arg.getParameter("wrhs_idcd"			))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
