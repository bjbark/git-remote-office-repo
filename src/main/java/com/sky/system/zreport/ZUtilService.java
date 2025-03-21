package com.sky.system.zreport;

/*
import java.util.LinkedHashMap;
import org.springframework.web.bind.annotation.RequestMapping;
import com.sky.http.HttpMessage;
import com.sky.utils.TreeHash;
import com.sky.http.HttpMessage;
*/

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class ZUtilService extends DefaultServiceHandler {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap setSmsSend(HttpRequestArgument arg)  throws Exception {
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SqlResultRow sr = map.get(0);
		System.out.println(sr.getParamText("crt_nm"));
		System.out.println(sr.getParamText("subject"));

		DataMessage data = new DataMessage("N2310ALPHA.FAX");
		data.param
		.table("SDK_SMS_SEND")
		.insert("MSG_ID", new SqlParamText("  SDK_SMS_SEQ.nextval "))
		.insert("USER_ID", sr.getParamText("crt_nm"))
		.insert("CDR_ID", "90823093823093")
		.insert("SCHEDULE_TYPE", "0")
		.insert("SUBJECT", sr.getParamText("subject"))
		.insert("NOW_DATE", new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDDHH24MISS') "))
		.insert("SEND_DATE", new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDDHH24MISS') "))
		.insert("CALLBACK", sr.getParamText("sender_name")+"^"+sr.getParamText("sender_number"))
		.insert("DEST_COUNT", "1")
		.insert("DEST_INFO", sr.getParamText("call_name")+"^"+sr.getParamText("call_number"))
		.insert("SMS_MSG", sr.getParamText("content"))
		;

		data.attach(Action.insert);
		data.execute();


		return null;
	}

	//매출이익율보고서 - 일자별 이익율
	public SqlResultMap getSaleanalyticreport2(HttpRequestArgument arg ,  int page , int rows) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																			")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( ID_COUNT ) 	as ID_COUNT ,																																											")
		.total("	round( decode (sum(po_amt) ,0 ,0 ,(sum(sale_amt) - sum(po_amt))/ sum(po_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,(sum(sale_amt) - sum(po_amt))/ sum(sale_amt) )*100,1) as profit_rate2																		");


		data.param
		.query("  SELECT																																									")
		.query("  	to_char(to_date( INV_DT),'yyyy-mm-dd') as inv_dt  ,																																								")
		.query("  	SALE_AMT  as sale_amt,																																										")
		.query("  	PO_AMT  as po_amt,																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																							")
		.query("  	ID_COUNT AS ID_COUNT ,																															")
		.query("  	ROUND( DECODE ( PO_AMT  ,0 ,0 ,( SALE_AMT - PO_AMT )/ PO_AMT )*100,1) AS PROFIT_RATE1 ,											")
		.query("  	ROUND( DECODE ( SALE_AMT ,0 ,0 ,( SALE_AMT - PO_AMT )/ SALE_AMT )*100,1) AS PROFIT_RATE2											");


		data.param
		.where("  FROM																																									")
		.where(" 	(																																											")
		.where("  	SELECT																																								")
		.where("  		A.INV_DT ,																																						")
		.where("  		COUNT( DISTINCT B.INV_NO ) AS ID_COUNT ,																										")
		.where("  		SUM( B.AMOUNT ) AS sale_AMT ,																														")
		.where("  		SUM( B.PO_PRICE * B.QTY ) AS po_AMT																											")
		.where("  	FROM	SALE_INFO A																																			")
		.where("  		JOIN SALE_ITEM B ON ( A.INV_NO = B.INV_NO )																									")
		.where(" 			left outer JOIN ITEM_INFO C ON ( B.ITEM_ID = C.ITEM_ID  )															")
		.where(" 			left outer join USER_INFO E ON ( A.salesman_id = E.USER_ID )																								")
		.where(" 			left outer join item_class f on (c.class_id = f.class_id)																											")

		.where("				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																				")
		.where("				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )																			")

		.where("  	WHERE	1=1																																						")
		.where(" 			and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 			and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and E.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 			and f.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))

		.where("		and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */


		.where(" 	GROUP BY A.INV_DT																																				")
		.where("  	)																																										");


		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}

	}

	public SqlResultMap setServeoneBill(HttpRequestArgument arg,  ArrayList<Object> al)  throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.print(arg.getParamText("emp_id"));
		System.out.print(al.get(0));
		System.out.print(al.get(1));
		data.param
		.table("SERVEONE_BILING")
		.insert("cdate",  new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDD') ") )
		.insert("order_id_item",  al.get(0) )
		.insert("ord_no_itm",  al.get(1) )
		.insert("buyer_name",  al.get(2) )
		.insert("buyer_tel",  al.get(3) )
		.insert("dlv_type",  al.get(4) )
		.insert("client_name",  al.get(5) )
		.insert("client_group",  al.get(6) )
		.insert("product_id",  al.get(7) )
		.insert("serveone_item_nm",  al.get(8) )
		.insert("price",  al.get(9) )
		.insert("qty",  al.get(10) )
		.insert("unit",  al.get(11) )
		.insert("amount",  al.get(12) )
		.insert("currency",  al.get(13) )
		.insert("amount_krw",  al.get(14) )
		.insert("currency_kwr",  al.get(15) )
		.insert("exchange_rates",  al.get(16) )
		.insert("tex_type",  al.get(17) )
		.insert("invoice_no",  al.get(18) )
		.insert("if_date",  al.get(19) )
		.insert("dlv_date",  al.get(20) )
		.insert("stockno",  al.get(21) )
		.insert("alpha_invoice_no",  al.get(22) )
		.insert("prdt_item_sc",  al.get(23) )
		.insert("dlv_memo",  al.get(24) )
		.insert("recipient",  al.get(25) )
		.insert("order_nm",  al.get(26) )
		.insert("dept_nm",  al.get(27) )
		.insert("crt_nm", arg.getParamText("emp_id"))
		.insert("crt_dt",  new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDDHH24MISS') ") )
		.insert("crt_ip", arg.remoteAddress)
		;
		data.attach(Action.insert);
		data.execute()	;
		return null;
	}




}

