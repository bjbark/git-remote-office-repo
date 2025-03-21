package com.sky.system.sale.sale.bondinit;

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


@Service("sjflv.BondInitService")
public class BondInitService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String check = arg.getParamText("optn_1");


		data.param
			.query("with bond_init as (																		")
			.query("  select a.cstm_idcd, a.txbl_amnt, a.remk_text											")
			.query("    from cstm_bond_init a																")
			.query("   where 1 = 1																			")
			.query("     and a.trns_yymm = :trns_yymm1", arg.getParamText("trns_yymm")						 )
			.query("     and a.bond_dvcd = '1'																")
			.query(") select a.cstm_idcd, a.cstm_code, a.cstm_name, a.buss_numb, a.mail_addr				")
			.query("       , b.txbl_amnt, b.remk_text														")
			.query("       , c.user_name																	")
			.query("       , :trns_yymm2", arg.getParamText("trns_yymm")									 )
			.query("    from cstm_mast a																	")
			.query("         left outer join bond_init b on b.cstm_idcd = a.cstm_idcd						")
			.query("         left outer join user_mast c on c.user_idcd = a.sale_drtr_idcd					")
			.query("   where 1 = 1																			")
			.query("     and a.sale_cstm_yorn  = 1															")
			.query("     and b.txbl_amnt > 0  =:optn		" , "1", "on".equals(arg.getParamText("optn_1")) )
			.query("     and a.find_name like %:find_name2%	" , arg.getParamText("find_name" )				 )
			.query("     and a.cstm_idcd = :cstm_idcd		" , arg.getParamText("cstm_idcd" )				 )
			.query("     and a.line_stat < 2																")
		;

//		data.param
//			.query("select a.*																							")
//		;
//		data.param
//			.where("from(																								")
//			.where("with bond as ( 																						")
//			.where("select    a.cstm_idcd       , c.cstm_code        , c.cstm_name                 , c.buss_numb		")
//			.where("        , c.mail_addr       , c.sale_drtr_idcd   , a.txbl_amnt                 , a.remk_text		")
//			.where("        , a.trns_yymm       , u.user_name        , '' as 'insert'            , '' as modify			")
//			.where("from cstm_bond_init a																				")
//			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd											")
//			.where("left outer join user_mast u on c.sale_drtr_idcd = u.user_idcd										")
//			.where("where 1=1																							")
//			.where("and a.trns_yymm  = :trns_yymm		", arg.getParamText("trns_yymm" ))
//			.where("and a.find_name  like %:find_name%	", arg.getParamText("find_name" ))
//			.where("and a.cstm_idcd  = :cstm_idcd		", arg.getParamText("cstm_idcd" ))
//		;
//		if(check.isEmpty()){
//			data.param
//				.where("union all																							")
//				.where("select    a.cstm_idcd     , a.cstm_code         , a.cstm_name                 , a.buss_numb			")
//				.where("        , a.mail_addr     , a.sale_drtr_idcd    , 0 as txbl_amnt              , null as remk_text	")
//				.where("        , null as trns_yymm  , u.user_name      , 'Y' as 'insert'             , 'Y' as modify		")
//				.where("from cstm_mast a																					")
//				.where("left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd										")
//				.where("where 1=1																							")
//				.where("and    sale_cstm_yorn   = '1'																		")
//				.where("and    a.find_name      like %:find_name2%	" , arg.getParamText("find_name" ))
//				.where("and    a.line_clos      = :line_clos		" , arg.getParamText("line_clos" ))
//				.where("and    a.line_stat      = :line_stat		" , arg.getParamText("line_stat" ))
//				.where("and    a.cstm_idcd      = :cstm_idcd2		" , arg.getParamText("cstm_idcd" ))
//				.where("and    a.cstm_idcd not in (select cstm_idcd 														")
//				.where("                           from   cstm_bond_init													")
//				.where("                           where  1=1																")
//				.where("                           and    bond_dvcd = '1'													")
//				.where("                           and    trns_yymm = :trns_yymm2		", arg.getParamText("trns_yymm" ))
//				.where(")																									")
//				.where("order by cstm_code asc																									")
//			;
//		}
//		data.param
//			.where(")																										")
//			.where("select * 																								")
//			.where("from bond c																								")
//			.where("order by c.cstm_code ) a																				")
//		;
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
				.unique("bond_dvcd"			, 1										)
				//
				.update("txbl_amnt"			, row.getParameter("txbl_amnt"			))
				.update("remk_text"			, row.getParameter("remk_text"			))
				.update("find_name"			, row.getParameter("cstm_code"			)
											+ "	"
											+ row.getParameter("cstm_name"			)
											+ " "
											+ row.getParameter("txbl_amnt"			)
											+ " "
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

			data.param
				.table("cstm_mast"													 )
				.where("where cstm_idcd		= :cstm_idcd							")
				//
				.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
				//
				.update("sale_drtr_idcd"	, row.getParameter("sale_drtr_idcd"		))
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		return null ;
	}
	public String getCstm(HttpRequestArgument arg, String cstm_idcd) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		data.param
			.query("select  cstm_idcd  						")
		;
		data.param //퀴리문
			.where("from cstm_mast							")
			.where("where     1=1							")
			.where("and     cstm_code	=:cstm_code",	cstm_idcd)
		;
		String cstm = "";
		if(data.selectForMap().size()!=0)
		{
			cstm = data.selectForMap().get(0).getParamText("cstm_idcd");
		}
		return cstm;
	}

	// 엑셀업로드
	public void setExcelUpload(HttpRequestArgument arg, SqlResultRow item , String cstm ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String trns_yymm	= item.getParamText("trns_yymm");

		if (!StringUtils.isEmpty(trns_yymm)) {
			data.param
				.table("cstm_bond_init												")
				.where("where trns_yymm		= :trns_yymm							")	//invoice번호
				.where("and   cstm_idcd		= :cstm_idcd							")	//invoice번호
				.where("and   bond_dvcd		= :bond_dvcd							")	//invoice번호

				.unique("trns_yymm"			, item.fixParameter("trns_yymm"			))	//invoice번호
				.unique("cstm_idcd"			, cstm)	//invoice번호
				.unique("bond_dvcd"			, 1)	//invoice번호

				.update("txbl_amnt"			, item.getParameter("txbl_amnt"	))	//배송수신인명

				.update("updt_idcd"			, arg.getParamText("lgin_idcd"))
				.update("crte_idcd"			, arg.getParamText("lgin_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.update("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}

		return;
	}
}