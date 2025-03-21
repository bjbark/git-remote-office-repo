package com.sky.system.mobile.eis.dailystock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("mobile.DailyStockService")
public class DailyStockService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("select																								")
			.query("  ( select sum(ifnull(oi.offr_qntt,0)) as offr_qntt													")
			.query("    from purc_ordr_mast om																			")
			.query("    left outer join purc_ordr_item oi on oi.invc_numb = om.invc_numb								")
			.query("    where om.invc_date = date_format(now(),'%Y%m%d')												")
			.query("  ) as offr_qntt																					")
			.query("  ,( select sum(ifnull(ii.istt_qntt,0)) as istt_qntt												")
			.query("     from purc_istt_mast im																			")
			.query("     left outer join purc_istt_item ii on ii.invc_numb = im.invc_numb								")
			.query("     where im.invc_date = date_format(now(),'%Y%m%d')												")
			.query("  ) as istt_qntt																					")
			.query("  ,( select sum(ifnull(w.prod_qntt,0))  as prod_qntt												")
			.query("     from pror_item      pi																			")
			.query("     left outer join work_book       w on pi.invc_numb = w.wkod_numb and pi.line_seqn = w.wkod_seqn	")
			.query("     where date_format(now(),'%Y%m%d') between pi.work_strt_dttm and pi.work_endd_dttm 				")
			.query("     and   pi.last_wkct_yorn = 1																	")
			.query("  ) as prod_qntt																					")
			.query("  ,( select sum(ifnull(si.ostt_qntt,0))  as ostt_qntt												")
			.query("     from sale_ostt_mast sm																			")
			.query("     left outer join sale_ostt_item si on sm.invc_numb = si.invc_numb								")
			.query("     where sm.invc_date = date_format(now(),'%Y%m%d')												")
			.query("  ) as ostt_qntt																					")
		;
		return data.selectForMap() ;
	}


}




