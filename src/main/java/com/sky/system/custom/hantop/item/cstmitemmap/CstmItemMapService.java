package com.sky.system.custom.hantop.item.cstmitemmap;


import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service()
public class CstmItemMapService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    i.item_code       , i.item_name       , i.item_spec       , a.user_memo			")
			.where("        , a.line_stat       , a.item_idcd       , a.brnd_item_idcd  , a.brnd_item_name		")
			.where("        , a.brnd_acct_bacd  , a.acct_bacd													")
			.where("        , (select unit_name from unit_mast u where u.unit_idcd = i.unit_idcd) as unit_name	")
			.where("        , group_concat(if(a.brnd_bacd = '01', a.brnd_item_name, null)) as hanseem			")
			.where("        , group_concat(if(a.brnd_bacd = '02', a.brnd_item_name, null)) as kcc				")
			.where("        , group_concat(if(a.brnd_bacd = '03', a.brnd_item_name, null)) as winche			")
			.where("        , group_concat(if(a.brnd_bacd = '04', a.brnd_item_name, null)) as changho			")
			.where("from   wind_item_mapping a																	")
			.where("    left outer join wind_item_mast i on a.item_idcd = i.item_idcd							")
			.where("where  1=1																					")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.acct_bacd   = :acct_code				" , arg.getParamText("acct_code"))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("group by a.item_idcd																		")
			.where("order by a.item_idcd																		")
			.where(") a																							")
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
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    i.item_code       , i.item_name       , a.cont_pric								")
			.where("        , a.user_memo       , a.item_idcd       , a.line_seqn								")
			.where("        , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as brnd_name	")
			.where("from   wind_item_mapping a																	")
			.where("   left outer join wind_item_mast i on a.brnd_item_idcd = i.item_idcd						")
			.where("where  1=1																					")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.item_idcd   = :item_idcd				" , arg.getParameter("item_idcd"))
			.where("and    a.acct_bacd   = :acct_bacd				" , arg.getParameter("acct_code" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("order by a.item_idcd																		")
			.where(") a																							")
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
			.query("select    a.item_code       , a.item_name       , a.item_spec								")
			.query("        , a.user_memo       , a.item_idcd       , a.brnd_bacd								")
			.query("        , a.acct_bacd       , a.puch_pric													")
			.query("        , ( select base_name from base_mast m where a.brnd_bacd = m.base_code and m.prnt_idcd  = '4000' ) as brnd_name	")
		;
		data.param
			.where("from   wind_item_mast a																		")
			.where("   left outer join wind_item_mapping m on a.item_idcd = m.brnd_item_idcd					")
			.where("where  1=1																					")
			.where("and    a.brnd_bacd not in('00')																")
			.where("and    ifnull(m.item_idcd,'')=''															")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    a.item_name  like %:item_name%  			" , arg.getParameter("item_name"))
			.where("and    a.acct_bacd   = :acct_bacd				" , arg.getParameter("acct_code"))
			.where("and    a.brnd_bacd   = :brnd_bacd				" , arg.getParameter("brnd_bacd"))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("order by a.item_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("wind_item_mapping")
					.where("where item_idcd	= :item_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("item_idcd"			, row.fixParameter("item_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("wind_item_mapping")
					.where("where item_idcd	= :item_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("item_idcd"			, row.fixParameter("item_idcd"))		//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"))		//순번

					.update("brnd_bacd"			, row.getParameter("brnd_bacd"))		//브랜드분류코드
					.update("acct_bacd"			, row.getParameter("acct_bacd"))		//계정분류코드
					.update("brnd_item_idcd"	, row.getParameter("brnd_item_idcd"))	//브랜드품목ID
					.update("brnd_item_name"	, row.getParameter("brnd_item_name"))	//브랜드품목명
					.update("brnd_acct_bacd"	, row.getParameter("brnd_acct_bacd"))	//브랜드계정분류코드
					.update("cont_pric"			, row.getParameter("cont_pric"))		//계약단가

					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
