package com.sky.system.sale.sale.initBond;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class InitBondService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String check = arg.getParamText("optn_1");

		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																							")
		;
		data.param
			.where("from(																								")
			.where("with bond as ( 																						")
			.where("select    a.cstm_idcd       , u.user_name as drtr_name  , c.cstm_name       , a.rqbl_amnt			")
			.where("        , a.trns_yymm       , a.trns_bill_amnt          , a.txbl_amnt       , a.remk_text			")
			.where("        , c.cstm_code       , '' as 'insert'            , '' as modify								")
			.where("        , a.drtr_idcd																				")
			.where("from cstm_bond_init a																				")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd											")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd											")
			.where("where 1=1																							")
			.where("and a.bond_dvcd  = '1'																				")
			.where("and a.trns_yymm  = :trns_yymm		", arg.getParamText("trns_yymm" ))
			.where("and a.find_name  like %:find_name%	", arg.getParamText("find_name" ))
			.where("and a.drtr_idcd  = :drtr_idcd		", arg.getParamText("drtr_idcd" ))
			.where("and a.cstm_idcd  = :cstm_idcd		", arg.getParamText("cstm_idcd" ))
		;
		if(check.equals("on")){
			data.param
				.where("union all																							")
				.where("select    a.cstm_idcd          , u.user_name as drtr_name  , a.cstm_name       , 0 as rqbl_amnt		")
				.where("        , null as trns_yymm    , 0 as trns_bill_amnt       , 0 as txbl_amnt    , null as remk_text	")
				.where("        , a.cstm_code          , 'Y' as 'insert'           , 'Y' as modify							")
				.where("        , a.sale_drtr_idcd as drtr_idcd																")
				.where("from cstm_mast a																					")
				.where("left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd										")
				.where("where 1=1																							")
				.where("and    sale_cstm_yorn   = '1'																		")
				.where("and    a.find_name      like %:find_name2%	" , arg.getParamText("find_name" ))
				.where("and    a.line_clos      = :line_clos		" , arg.getParamText("line_clos" ))
				.where("and    a.line_stat      = :line_stat		" , arg.getParamText("line_stat" ))
				.where("and    a.sale_drtr_idcd = :drtr_idcd2		" , arg.getParamText("drtr_idcd" ))
				.where("and    a.cstm_idcd      = :cstm_idcd2		" , arg.getParamText("cstm_idcd" ))
				.where("and    a.cstm_idcd not in (select cstm_idcd 														")
				.where("                           from   cstm_bond_init													")
				.where("                           where  1=1																")
				.where("                           and    bond_dvcd = '1'													")
				.where("                           and    trns_yymm = :trns_yymm2		", arg.getParamText("trns_yymm" ))
				.where(")																									")
			;
		}
		data.param
			.where(")																										")
			.where("select * 																								")
			.where("from bond c																								")
			.where("order by c.cstm_code ) a																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if(row.getParamText("trns_bill_amnt").equals("0")&&row.getParamText("rqbl_amnt").equals("0")&&row.getParamText("txbl_amnt").equals("0")){
				continue;
			}else{
				if(rowaction.toString().equals("delete")){
					rowaction = SqlParameter.Action.setValue("delete");
				}else{
					data.param // 집계문  입력
						.query("select count(ifnull(cstm_idcd,0)) as cstm_idcd							")
						.query("from cstm_bond_init														")
						.query("where trns_yymm = :trns_yymm		", row.getParameter("trns_yymm"))
						.query("and cstm_idcd   = :check			", row.getParameter("cstm_idcd"))
						.query("and bond_dvcd   = '1'					")
					;
					SqlResultMap info = data.selectForMap();
					for (SqlResultRow row2:info) {
						if(row2.getParamText("cstm_idcd").equals("1")){
							rowaction = SqlParameter.Action.setValue("update");
						}else{
							rowaction = SqlParameter.Action.setValue("insert");
						}
					}
					data.clear();
				}

				data.param
					.table("cstm_bond_init"												)
					.where("where trns_yymm		= :trns_yymm							")
					.where("and   cstm_idcd		= :cstm_idcd							")
					.where("and   bond_dvcd		= :bond_dvcd							")
					//
					.unique("trns_yymm"			, row.fixParameter("trns_yymm"			))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					.unique("bond_dvcd"			, 1										)
					//
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
					.update("trns_bill_amnt"	, row.getParameter("trns_bill_amnt"		))
					.update("rqbl_amnt"			, row.getParameter("rqbl_amnt"			))
					.update("txbl_amnt"			, row.getParameter("txbl_amnt"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("find_name"			, row.getParameter("cstm_name"			)
												+ "	"
												+ row.getParameter("cstm_code"			))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
			}
		}
		return null ;
	}

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call  (			")
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();

		return null ;
	}

}
