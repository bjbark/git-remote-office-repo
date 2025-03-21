package com.sky.system.stock.isos.mtrlisttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class MtrlMonthListService  extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String dvcd = null;
		String istt_chk =  arg.getParamText("istt_chk");
		String ostt_chk =  arg.getParamText("ostt_chk");
				
		if(istt_chk.equals("on") && ostt_chk.equals("on")) {
			dvcd = null;
		} else if (istt_chk.equals("on")) {
			dvcd = "1";
		} else if (ostt_chk.equals("on")) {
			dvcd = "2";
		}

		data.param
			.query("select    a.item_name	, a.item_code	, a.item_spec	, a.invc_dvcd 			")
			.query("		, a.wrhs_idcd	, a.find_name 											")			
			.query(", if(date_format(invc_date,'%m') = '01' ,substring_index(substring_index(group_concat(a.qntt), ',' ,1), ',' ,-1),0) as mnth_01 ")
			.query(", if(date_format(invc_date,'%m') = '02' ,substring_index(substring_index(group_concat(a.qntt), ',' ,2), ',' ,-1),0) as mnth_02 ")
			.query(", if(date_format(invc_date,'%m') = '03' ,substring_index(substring_index(group_concat(a.qntt), ',' ,3), ',' ,-1),0) as mnth_03 ")
			.query(", if(date_format(invc_date,'%m') = '04' ,substring_index(substring_index(group_concat(a.qntt), ',' ,4), ',' ,-1),0) as mnth_04 ")
			.query(", if(date_format(invc_date,'%m') = '05' ,substring_index(substring_index(group_concat(a.qntt), ',' ,5), ',' ,-1),0) as mnth_05 ")
			.query(", if(date_format(invc_date,'%m') = '06' ,substring_index(substring_index(group_concat(a.qntt), ',' ,6), ',' ,-1),0) as mnth_06 ")
			.query(", if(date_format(invc_date,'%m') = '07' ,substring_index(substring_index(group_concat(a.qntt), ',' ,7), ',' ,-1),0) as mnth_07 ")
			.query(", if(date_format(invc_date,'%m') = '08' ,substring_index(substring_index(group_concat(a.qntt), ',' ,8), ',' ,-1),0) as mnth_08 ")
			.query(", if(date_format(invc_date,'%m') = '09' ,substring_index(substring_index(group_concat(a.qntt), ',' ,9), ',' ,-1),0) as mnth_09 ")
			.query(", if(date_format(invc_date,'%m') = '10' ,substring_index(substring_index(group_concat(a.qntt), ',' ,10), ',' ,-1),0) as mnth_10 ")
			.query(", if(date_format(invc_date,'%m') = '11' ,substring_index(substring_index(group_concat(a.qntt), ',' ,11), ',' ,-1),0) as mnth_11 ")
			.query(", if(date_format(invc_date,'%m') = '12' ,substring_index(substring_index(group_concat(a.qntt), ',' ,12), ',' ,-1),0) as mnth_12 ")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        i.item_name 	, i.item_code	, i.item_spec	, a.item_idcd			")
			.where("      , sum(a.qntt) as qntt 			, a.invc_dvcd	, a.invc_date			")
			.where("      , a.find_name		, w.wrhs_idcd											")
			.where("from   isos_book a																")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("       left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd					")
			.where("where  1=1																		")
			.where("and date_format(a.invc_date,'%Y') = :find_date	" ,  arg.getParamText("find_date"))
			.where("group by date_format(a.invc_date,'%Y%m'),a.item_idcd, substr(a.invc_dvcd,1,1)	")
			.where("order by a.invc_date , a.item_idcd asc											")
			.where(") a																				")
			.where("group by a.item_idcd,substr(a.invc_dvcd,1,1)									")
			.where("having 1=1 																		")
			.where("and    a.find_name   like %:find_name%				" , arg.getParamText("find_name"))
			.where("and    a.wrhs_idcd  = :wrhs_idcd					" , arg.getParamText("wrhs_idcd"))			
			.where("and    substr(a.invc_dvcd, 1, 1) = :dvcd			" , dvcd)
		;
		
		return data.selectForMap();
	}

}
