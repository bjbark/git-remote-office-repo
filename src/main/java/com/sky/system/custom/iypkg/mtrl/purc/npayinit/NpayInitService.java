package com.sky.system.custom.iypkg.mtrl.purc.npayinit;

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
public class NpayInitService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		// 모든거래처 표시 checkbox
		String check ="off";
		if(!arg.getParamText("optn_1").equals("")){
			check = arg.getParamText("optn_1");
		}

	data.param
		.query("with cstm as ( 																								")
		.query("	select    a.cstm_idcd           , a.cstm_code           , a.cstm_name									")
		.query("			, '' as trns_bill_amnt  , '' as rqbl_amnt       , '' as txbl_amnt								")
		.query("			, 'Y' as 'insert'   , 'Y' as modify																")
		.query("			, concat_ws(',',if(json_value(a.json_data,'$.pper_cstm_yorn' )='1','원지',null),					")
		.query("							if(json_value(a.json_data,'$.fabc_cstm_yorn' )='1','원단',null),					")
		.query("							if(json_value(a.json_data,'$.mani_cstm_yorn' )='1','마니라',null),				")
		.query("							if(json_value(a.json_data,'$.asmt_cstm_yorn' )='1','부자재',null),				")
		.query("							if(json_value(a.json_data,'$.otod_cstm_yorn' )='1','외주',null),					")
		.query("							if(json_value(a.json_data,'$.gods_cstm_yorn' )='1','상품',null)) as yorn			")


		.query("	        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name						")
		.query("	        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd						")
		.query("	        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm						")
		.query("	        , a.crte_idcd       , a.crte_urif		, b.trns_yymm											")
		.query("	from cstm_mast a																						")
		.query("	left outer join cstm_bond_init b on a.cstm_idcd = b.cstm_idcd											")
		.query("	where 1=1																								")
		.query("	and a.cstm_idcd not in (	select cstm_idcd		")
		.query("								from   cstm_bond_init	")
		.query("								where  1=1				")
		.query("								and    bond_dvcd = '2'	")
		.query("								and trns_yymm = :trns_yymm)		", arg.getParamText("trns_yymm"))
		.query("	and    ( 0																								 ")
		.query("	or    json_value(a.json_data,'$.pper_cstm_yorn' ) = :yorn  " , "1", arg.getParamText("dvcd").contains("1"))
		.query("	or    json_value(a.json_data,'$.fabc_cstm_yorn' ) = :yorn2 " , "1", arg.getParamText("dvcd").contains("2"))
		.query("	or    json_value(a.json_data,'$.mani_cstm_yorn' ) = :yorn3 " , "1", arg.getParamText("dvcd").contains("3"))
		.query("	or    json_value(a.json_data,'$.asmt_cstm_yorn' ) = :yorn4 " , "1", arg.getParamText("dvcd").contains("4"))
		.query("	or    json_value(a.json_data,'$.otod_cstm_yorn' ) = :yorn5 " , "1", arg.getParamText("dvcd").contains("5"))
		.query("	or    json_value(a.json_data,'$.gods_cstm_yorn' ) = :yorn6 " , "1", arg.getParamText("dvcd").contains("6"))
		.query("			)																								")
		.query("	and puch_cstm_yorn = '1'																				")
		.query("	and 'on' = :check ", check)
		.query("	and a.find_name  like %:find_name%	", arg.getParamText("find_name" ))
		.query("	and a.cstm_idcd  = :cstm_idcd		", arg.getParamText("cstm_idcd" ))
	;

	// 전체 조회
	data.param
		.query("	union all																								")
		.query("	select    a.cstm_idcd       , a.cstm_code       , a.cstm_name											")
		.query("			, b.trns_bill_amnt  , b.rqbl_amnt       , b.txbl_amnt											")
		.query("			, '' as 'insert'   , '' as modify																")
		.query("			, concat_ws(',',if(json_value(a.json_data,'$.pper_cstm_yorn' )='1','원지',null),					")
		.query("							if(json_value(a.json_data,'$.fabc_cstm_yorn' )='1','원단',null),					")
		.query("							if(json_value(a.json_data,'$.mani_cstm_yorn' )='1','마니라',null),				")
		.query("							if(json_value(a.json_data,'$.asmt_cstm_yorn' )='1','부자재',null),				")
		.query("							if(json_value(a.json_data,'$.otod_cstm_yorn' )='1','외주',null),					")
		.query("							if(json_value(a.json_data,'$.gods_cstm_yorn' )='1','상품',null)) as yorn			")
		.query("	        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name						")
		.query("	        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd						")
		.query("	        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm						")
		.query("	        , a.crte_idcd       , a.crte_urif		, b.trns_yymm											")
		.query("	from cstm_bond_init b																					")
		.query("	left outer join cstm_mast a on a.cstm_idcd = b.cstm_idcd												")
		.query("	where 1=1																								")
		.query("	and b.trns_yymm = :trns_yymm3		", arg.getParamText("trns_yymm"))
		.query("	and a.puch_cstm_yorn = '1'																				")
		.query("	and b.bond_dvcd      = '2'																				")
		.query("	and    b.find_name      like %:find_name2%" , arg.getParamText("find_name" ))
		.query("	and    b.line_clos      = :line_clos		" , arg.getParamText("line_clos" ))
		.query("	and    b.line_stat      = :line_stat		" , arg.getParamText("line_stat" ))
		.query("	and    b.cstm_idcd      = :cstm_idcd2		", arg.getParamText("cstm_idcd" ))
		.query("	and    ( 0 																								")
		.query("	or    json_value(a.json_data,'$.pper_cstm_yorn' ) = :yorn7  " , "1", arg.getParamText("dvcd").contains("1"))
		.query("	or    json_value(a.json_data,'$.fabc_cstm_yorn' ) = :yorn8  " , "1", arg.getParamText("dvcd").contains("2"))
		.query("	or    json_value(a.json_data,'$.mani_cstm_yorn' ) = :yorn9  " , "1", arg.getParamText("dvcd").contains("3"))
		.query("	or    json_value(a.json_data,'$.asmt_cstm_yorn' ) = :yorn10 " , "1", arg.getParamText("dvcd").contains("4"))
		.query("	or    json_value(a.json_data,'$.otod_cstm_yorn' ) = :yorn11 " , "1", arg.getParamText("dvcd").contains("5"))
		.query("	or    json_value(a.json_data,'$.gods_cstm_yorn' ) = :yorn12 " , "1", arg.getParamText("dvcd").contains("6"))
		.query("			)																								")
	;

	data.param
		.query(")																											")
		.query("select * 																									")
		.query("from cstm c																									")
		.query("order by c.cstm_code																						")
	;
	return data.selectForMap(sort) ;
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(row.getParamText("trns_bill_amnt").equals("0")&&row.getParamText("txbl_amnt").equals("0")){
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
						.query("and bond_dvcd   = '2'					")
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
					.unique("bond_dvcd"			, 2										)
					//
					.update("trns_bill_amnt"	, row.getParameter("trns_bill_amnt"		))
					.update("txbl_amnt"			, row.getParameter("txbl_amnt"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("find_name"			, row.getParameter("cstm_name")
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
}
