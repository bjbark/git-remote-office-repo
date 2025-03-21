package com.sky.system.custom.hantop.item.cstmitemmast;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class CstmItemMastService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select a.item_idcd      , a.item_code      , a.item_dvcd      , a.item_name					")
			.query("     , a.item_spec      , a.unit_idcd      , a.acct_bacd      , a.item_leng					")
			.query("     , a.item_widh      , a.item_hght      , a.colr_idcd      , a.colr_name					")
			.query("     , a.wdgr_idcd      , a.rpst_item_idcd , a.brnd_bacd      , a.wdbf_yorn					")
			.query("     , a.wdsf_yorn      , a.wdmf_yorn      , a.wdmc_yorn      , a.bfrn_yorn					")
			.query("     , a.sfrn_yorn      , a.mfrn_yorn      , a.glss_yorn      , a.wryp_yorn					")
			.query("     , a.puch_pric																			")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.base_name as brnd_name																")
			.query("     , (select base_name  from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.query("       as rpst_item_name																	")
			;
		data.param
			.where("from   wind_item_mast a																		")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("where  1=1																					")
			.where("and   a.brnd_bacd = 01																		")
			.where("and   a.acct_bacd  = :acct_dvcd		" , arg.getParamText("acct_dvcd"))
			.where("order by a.item_idcd																		")
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
			.query("select a.item_idcd      , a.item_code      , a.item_dvcd      , a.item_name					")
			.query("     , a.item_spec      , a.unit_idcd      , a.acct_bacd      , a.item_leng					")
			.query("     , a.item_widh      , a.item_hght      , a.colr_idcd      , a.colr_name					")
			.query("     , a.wdgr_idcd      , a.rpst_item_idcd , a.brnd_bacd      , a.wdbf_yorn					")
			.query("     , a.wdsf_yorn      , a.wdmf_yorn      , a.wdmc_yorn      , a.bfrn_yorn					")
			.query("     , a.sfrn_yorn      , a.mfrn_yorn      , a.glss_yorn      , a.wryp_yorn					")
			.query("     , a.puch_pric																			")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.base_name as brnd_name																")
			.query("     , (select base_name  from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.query("       as rpst_item_name																	")
		;
		data.param
			.where("from   wind_item_mast a																		")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("where  1=1																					")
			.where("and   a.brnd_bacd = 02																		")
			.where("and   a.acct_bacd  = :acct_dvcd		" , arg.getParamText("acct_dvcd"))
			.where("order by a.item_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.item_idcd      , a.item_code      , a.item_dvcd      , a.item_name					")
			.query("     , a.item_spec      , a.unit_idcd      , a.acct_bacd      , a.item_leng					")
			.query("     , a.item_widh      , a.item_hght      , a.colr_idcd      , a.colr_name					")
			.query("     , a.wdgr_idcd      , a.rpst_item_idcd , a.brnd_bacd      , a.wdbf_yorn					")
			.query("     , a.wdsf_yorn      , a.wdmf_yorn      , a.wdmc_yorn      , a.bfrn_yorn					")
			.query("     , a.sfrn_yorn      , a.mfrn_yorn      , a.glss_yorn      , a.wryp_yorn					")
			.query("     , a.puch_pric																			")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.base_name as brnd_name																")
			.query("     , (select base_name  from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.query("       as rpst_item_name																	")
		;
		data.param
			.where("from   wind_item_mast a																		")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("where  1=1																					")
			.where("and   a.brnd_bacd = 03																		")
			.where("and   a.acct_bacd  = :acct_dvcd		" , arg.getParamText("acct_dvcd"))
			.where("order by a.item_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.item_idcd      , a.item_code      , a.item_dvcd      , a.item_name					")
			.query("     , a.item_spec      , a.unit_idcd      , a.acct_bacd      , a.item_leng					")
			.query("     , a.item_widh      , a.item_hght      , a.colr_idcd      , a.colr_name					")
			.query("     , a.wdgr_idcd      , a.rpst_item_idcd , a.brnd_bacd      , a.wdbf_yorn					")
			.query("     , a.wdsf_yorn      , a.wdmf_yorn      , a.wdmc_yorn      , a.bfrn_yorn					")
			.query("     , a.sfrn_yorn      , a.mfrn_yorn      , a.glss_yorn      , a.wryp_yorn					")
			.query("     , a.puch_pric																			")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.base_name as brnd_name																")
			.query("     , (select base_name  from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.query("       as rpst_item_name																	")
		;
		data.param
			.where("from   wind_item_mast a																		")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("where  1=1																					")
			.where("and   a.brnd_bacd = 04																		")
			.where("and   a.acct_bacd  = :acct_dvcd		" , arg.getParamText("acct_dvcd"))
			.where("order by a.item_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
