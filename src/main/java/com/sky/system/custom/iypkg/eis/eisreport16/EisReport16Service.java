package com.sky.system.custom.iypkg.eis.eisreport16;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service("iypkg.EisReport16Service")
public class EisReport16Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select * 											 													")
		;
		data.param
			.where("from   (select    a.invc_numb         , a.invc_date 													")
			.where("        , a.updt_dttm as upt_dttm     , um.user_name as upt_usr_nm, u.user_name as inv_user_nm			")
			.where("        , c.cstm_name as cust_name    , u.user_name as drtr_name      , sum(s.ttsm_amnt) as inv_amt		")
			.where("        , c.tele_numb as reve_tel_no  , c.mail_addr as reve_email     , a.bzpl_idcd						")
			.where("        , a.crte_dttm as crt_dttm     , s.acpt_numb                   , i.line_clos						")
			.where("        , concat(ad.addr_1fst, ' ', ad.addr_2snd) as reve_addr_2      , ad.post_code as reve_zip_cd		")
			.where("        , c.hdph_numb as reve_hp_no																		")
			.where("from sale_ostt_mast a																		")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join acpt_mast i on s.acpt_numb = i.invc_numb									")
			.where("left outer join user_mast u on i.drtr_idcd = u.user_idcd									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_addr ad on ad.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast um on um.user_idcd = a.updt_idcd									")
			.where("where   1=1																					")

			.where("and     s.acpt_numb like %:search_name1%"  , arg.getParamText("find_name"), "5".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb like %:search_name3%"  , arg.getParamText("find_name"), "7".equals(arg.getParamText("search_id")))
			.where("and     c.cstm_idcd  = :cstm_idcd"         , arg.getParamText("cstm_idcd"))
			.where("and     a.bzpl_idcd  = :bzpl_idcd"         , arg.getParamText("bzpl_idcd"))
			.where("and     i.line_clos  = :line_clos"         , arg.getParamText("line_clos"))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("fr_dt"		))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("to_dt"		))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1"	))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2"	))
			.where("and     i.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"	))
			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb"	))
			.where("and     a.line_stat  = :line_stat1       " , arg.getParamText("line_stat"	) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getChart(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");


		data.param
			.query("select @RANK := @RANK+1+'월' as `name` , @RANK+40 as `data` 													")
		;
		data.param
			.where("from base_mast a , (select @RANK := 0) r limit 6")
		;
		return data.selectForMap();
	}


}
