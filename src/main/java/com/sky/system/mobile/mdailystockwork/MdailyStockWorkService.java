package com.sky.system.mobile.mdailystockwork;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class MdailyStockWorkService {
	@Autowired
	SeqListenerService sequence ;
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param
			.query("select    a.wkct_idcd       , a.invc_date       , a.item_idcd								")
			.query("        , a.cudt_istt_qntt  , a.cudt_ostt_qntt  , a.chge_qntt         , a.tody_stok_qntt	")
			.query("        , a.optm_stok_qntt  , a.uper_seqn       , a.disp_seqn         , a.pday_stok_qntt	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif       , w.stok_mngt_yorn							")
			.query("        , i.item_code       , i.item_name       , i.item_spec         , i.unit_idcd			")
			.query("        , u.unit_name       , a.cstm_idcd       , c.cstm_name								")
			.query("        ,(ifnull(a.tody_stok_qntt,0) - ifnull(a.optm_stok_qntt,0))as exc_qntt				")
		;
		data.param
			.where("from daily_stock a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("where    1=1																				")
			.where("and      a.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
			.where("and      a.wkct_idcd   = :wkct_idcd      " , arg.getParamText("wkct_idcd"))
			.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.wkct_idcd																		")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMWkct(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    wkct_idcd,wkct_name		")
		;
		data.param
			.where("from wkct_mast																			")

			.where("where   1=1																				")
			.where("and     stok_mngt_yorn   = :stok_mngt_yorn","1"										)
			.where("and     line_stat < 2																	")
		;
		return data.selectForMap();
	}
}




