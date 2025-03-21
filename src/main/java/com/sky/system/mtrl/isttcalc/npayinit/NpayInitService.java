package com.sky.system.mtrl.isttcalc.npayinit;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.NpayInitService")
public class NpayInitService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with bond_init as (																		")
			.query("  select a.cstm_idcd, a.txbl_amnt, a.remk_text											")
			.query("    from cstm_bond_init a																")
			.query("   where 1 = 1																			")
			.query("     and a.trns_yymm = :trns_yymm1", arg.getParamText("trns_yymm")						 )
			.query("     and a.bond_dvcd = '2'																")
			.query(") select a.cstm_idcd, a.cstm_code, a.cstm_name, a.buss_numb, a.mail_addr				")
			.query("       , b.txbl_amnt, b.remk_text														")
			.query("       , c.user_name																	")
			.query("       , :trns_yymm2", arg.getParamText("trns_yymm")									 )
			.query("    from cstm_mast a																	")
			.query("         left outer join bond_init b on b.cstm_idcd = a.cstm_idcd						")
			.query("         left outer join user_mast c on c.user_idcd = a.sale_drtr_idcd					")
			.query("   where 1 = 1																			")
			.query("     and a.puch_cstm_yorn  = 1															")
			.query("     and b.txbl_amnt > 0  =:optn		" , "1", "on".equals(arg.getParamText("optn_1")) )
			.query("     and a.find_name like %:find_name2%	" , arg.getParamText("find_name" )				 )
			.query("     and a.cstm_idcd = :cstm_idcd		" , arg.getParamText("cstm_idcd" )				 )
	;

		return data.selectForMap();
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			data.param
				.table("cstm_bond_init"												)
				.where("where trns_yymm		= :trns_yymm							")
				.where("and   cstm_idcd		= :cstm_idcd							")
				.where("and   bond_dvcd		= :bond_dvcd							")
				//
				.unique("trns_yymm"			, row.fixParameter("trns_yymm"			))
				.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
				.unique("bond_dvcd"			, 2										)
				//
				.update("txbl_amnt"			, row.getParameter("txbl_amnt"			))
				.update("remk_text"			, row.getParameter("remk_text"			))
				.update("find_name"			, row.getParameter("cstm_code"			)
											+ "	"
											+ row.getParameter("cstm_name"			)
											+ "	"
											+ row.getParameter("txbl_amnt"			)
											+ "	"
											+ row.getParameter("remk_text"			))
				.insert("line_levl"			, row.getParameter("line_levl"			))
				.insert("line_stat"			, row.getParameter("line_stat"			))
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		return null ;
	}
}
