package com.sky.system.zreport;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Service;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service
public class ZSaleNotListService extends DefaultServiceHandler {


	/*
	 * 매출 내역 조회
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String inv_po_term   = arg.fixParamText("inv_po_term" );
		String fr_dt         = arg.fixParamText("fr_dt" );
		String to_dt         = arg.fixParamText("to_dt" );
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		String restqty_gubun = arg.getParamText("restqty_gubun" );

		data.param
			.total("select count(1) as maxsize , sum(b.qty) as qty , sum(b.ship_qty) as ship_qty, sum(b.rest_qty) as rest_qty   ")
			.total("    ,  sum(b.amount) as amount   ")
			;
		data.param
			.query("select a.inv_no, a.inv_dt , a.crt_dt , a.cust_nm , a.mmb_nm , a.inv_work_id	, b.line_seqn			")
			.query("     ,  (select emp_nm from usr_mst where emp_id = a.inv_user_id) as inv_user_nm 	")
			.query("     ,  a.ori_dt , c.pack_gb  , a.stor_id, a.wareh_id 													")
			.query("     ,  (select stor_nm from store where stor_id = a.stor_id) as stor_nm 				")
			.query("     ,  (select stor_nm from store where stor_id = a.wareh_id) as wareh_nm 				")
			.query("	   ,  b.item_code, b.item_name, b.item_spec, b.unt_qty 													")
			.query("	   ,  (select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name 				")
			.query("     ,  isnull(b.ship_qty, 0) as ship_qty 														")				//출고량
			.query("     ,  isnull(b.qty, 0) as qty 																	")				//확정주문량
			.query("     ,  isnull(b.rest_qty, 0) as rest_qty 														")				//확정 대비 미출고량
			.query("  	, isnull(b.org_ord_qty, 0) as baseqty														")				//원주문량
			.query("  	, isnull(b.org_ord_qty, 0) - isnull(b.ship_qty, 0) as baserest_qty					  	") 				//원주문대비미출고량
			.query("  	,  isnull(b.price, 0) as price   , isnull(b.amount, 0) as amount 	, b.user_memo	, b.ship_memo	")
			.query("  	, (select sale_zone  from itm_stor z where a.stor_id = z.stor_id and b.item_idcd = z.item_idcd) as sale_zone 		  	")		//--출고위치
//			.query("  	, case when substring( CASE WHEN INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE SUBSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END ,1,3) in  ('019','018','017','016','011','010')  and length( CASE WHEN INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE SUBSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END ) between 10 and 12 then '유효' else '결번' end   as recv_tel_state	")
//			.query("  	, CASE WHEN INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE SUBSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
			.query("  	, case when substring( CASE WHEN dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE substring( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END ,1,3) in  ('019','018','017','016','011','010')  and length( CASE WHEN dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE substring( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END ) between 10 and 12 then '유효' else '결번' end   as recv_tel_state	")
			.query("  	, CASE WHEN dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE substring( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
			.query("  	  	, decode(e.inv_no,null,'n','y') as smssend	  	")		//--출고위치

			;
		data.param
			.where("from order_mst a 																		")
			.where("   	join order_item b on a.inv_no = b.inv_no 											")
			.where("   	join order_pack c on b.pack_no = c.pack_no 											")
			.where("   	join itm_mst   d on ( b.item_idcd = d.item_idcd )											")
			.where("   	left outer join SALE_SMS_INFO e on (b.inv_no = e.inv_no and b.line_seqn = e.line_seqn) ")
			.where("where a.stor_grp 		= :stor_grp 	  		" , arg.fixParameter("stor_grp"   		))
			.where("  and( a.stor_id  	  	= :stor_id 	  		" , arg.getParameter("stor_id"   		))
			.where(" 	or  a.wareh_id   	= :stor_id   ) 		" , arg.getParameter("stor_id"   		))
			.where("and    a.inv_dt between :fr_dt       " , fr_dt , "1".equals( inv_po_term ) )  // 배송예정사작일자
			.where("                    and :to_dt       " , to_dt , "1".equals( inv_po_term ) )  // 배송예정종료일자
			.where("and    a.ori_dt between :fr_dt       " , fr_dt , "2".equals( inv_po_term ) )  // 주문사작일자
			.where("                    and :to_dt       " , to_dt , "2".equals( inv_po_term ) )  // 주문종료일자
			.where("and d.class_id like :class_id% ", 	arg.getParameter("class_id"))		//품목분류
			;
			if(restqty_gubun.equals("1")){
				data.param
				.where("  and (isnull(b.qty, 0) - isnull(b.ship_qty, 0) ) <> 0						            ");		//확주문수량 대비 미출고량
			}else{
				data.param
				.where("  and (isnull(b.org_ord_qty, 0) - isnull(b.ship_qty, 0) ) <> 0					            ");		//원주문수량 대비 미출고량
			}
			data.param
			.where("  and  a.row_sts 	  = 0 													            ")
			.where("  and  a.row_clos    = '0'  															")
			.where("  and  b.row_sts 	  = 0 													            ")
			.where("  and  a.cust_id      =  :cust_id       		" , arg.getParameter("cust_id"        	)) /* 고객 */
			.where("  and  a.inv_user_id  =  :inv_user_id       	" , arg.getParameter("inv_user_id"      )) /* 상품담당 */
		    .where("  and  a.inv_work_id in (:inv_work_id )    		" , inv_work_id ,( inv_work_id.length > 0) ) /* 매출유형 (주문 위치) */
			.where("  and  c.pack_gb      =  :pack_gb       		" , arg.getParameter("pack_gb"        	)) /* 직송여부  0: 자체배송, 1: 직납배송 */
			.where("  and  a.sts_cd       =  :sts_cd       		    " , arg.getParameter("sts_cd"        	)) /* 처리상태  */
			.where("  and  a.inv_no       =  :inv_no       		    " , arg.getParameter("inv_no"        	)) //주문번호
			.where("order by a.ori_dt , a.ori_tm		 													")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setSmssend(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage sms_insert = arg.newStorage("POS");
		DataMessage data1 = arg.newStorage("POS");

		DataMessage smsdata = new DataMessage("N2310ALPHA.FAX");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ArrayList<String> temp = new ArrayList<String>();

		String temp_store_id ="";		//사업장
		String temp_update_nm ="";	//작업자
		if(map.size() >0){
			temp_store_id = map.get(0).getParamText("stor_id");
			temp_update_nm = map.get(0).getParamText("upt_nm");
		}



		for (SqlResultRow sr : map) {
			temp.add( sr.getParamText("inv_no") );
		}
		HashSet hs = new HashSet(temp);		//주문의 중복 제거

		data.param
		.query(" with temp as(		")
		.query(" select					")
		.query(" a.inv_no				")
		.query(" , b.line_seqn			")
//		.query(" , b.item_name||'/'||b.item_spec||'='||decode(b.ship_memo,null,'결품',b.ship_memo) as ship_memo		")
//		.query(" , CASE WHEN INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE SUBSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
		.query(" , b.item_name+'/'+b.item_spec+'='+case when isnull(b.ship_memo,'') = '' then '결품' else b.ship_memo end as ship_memo		")
		.query(" , CASE WHEN dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE substring( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
		.query(" , a.mmb_nm																												")
		.query(" from order_mst a																											")
		.query("    	join order_item b on a.inv_no = b.inv_no																		")
		.query("    	join order_pack c on b.pack_no = c.pack_no																")
		.query("    	join itm_mst   d on ( b.item_idcd = d.item_idcd )																")
		.query("    	left outer join SALE_SMS_INFO e on (b.inv_no = e.inv_no and b.line_seqn = e.line_seqn)			")
		.query(" where 1=1 																													")
		.query("   and (isnull(b.org_ord_qty, 0) - isnull(b.ship_qty, 0) ) <> 0															")
		.query("   and  a.row_sts 	  = 0																								")
		.query("   and  a.row_clos    = '0'																								")
		.query("   and  b.row_sts 	  = 0																								")
		.query("   and e.inv_no is null																									")
		.query("   and a.inv_no in ( :hs )										" 														, hs)
		.query(" order by a.ori_dt , a.ori_tm																								")
		.query(" )																																")
		.query(" select * from temp																					")
		;

		data1.param
		.query(" with temp as(		")
		.query(" select					")
		.query(" a.inv_no				")
		.query(" , b.line_seqn			")
//		.query(" , b.item_name||'/'||b.item_spec||'='||decode(b.ship_memo,null,'결품',b.ship_memo) as ship_memo		")
//		.query(" , CASE WHEN INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE SUBSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , INSTR( REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
		.query(" , b.item_name+'/'+b.item_spec+'='+case when isnull(b.ship_memo,'') = '' then '결품' else b.ship_memo end as ship_memo		")
		.query(" , CASE WHEN dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') = 0 THEN  dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') ELSE substring( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , 1 , dbo.INSTR( dbo.REGEXP_REPLACE(a.reve_hp_no,'[^0-9,.]', '') , '.') -1) END  as recvtelhp	")
		.query(" , a.mmb_nm																												")
		.query(" from order_mst a																											")
		.query("    	join order_item b on a.inv_no = b.inv_no																		")
		.query("    	join order_pack c on b.pack_no = c.pack_no																")
		.query("    	join itm_mst   d on ( b.item_idcd = d.item_idcd )																")
		.query("    	left outer join SALE_SMS_INFO e on (b.inv_no = e.inv_no and b.line_seqn = e.line_seqn)			")
		.query(" where 1=1 																													")
		.query("   and (isnull(b.org_ord_qty, 0) - isnull(b.ship_qty, 0) ) <> 0															")
		.query("   and  a.row_sts 	  = 0																								")
		.query("   and  a.row_clos    = '0'																								")
		.query("   and  b.row_sts 	  = 0																								")
		.query("   and e.inv_no is null																									")
		.query("   and a.inv_no in ( :hs )										" 														, hs)
		.query(" order by a.ori_dt , a.ori_tm																								")
		.query(" )																																")
		.query(" select																															")
		.query(" inv_no , mmb_nm+'^'+recvtelhp as ist_mst , wm_concat(ship_memo) as memo					")
		.query(" from temp																													")
		.query(" group by inv_no, mmb_nm+'^'+recvtelhp																		")
		;



		SqlResultMap temp_srm1 = data.selectForMap();		//2310 db에 넣은 목록
		SqlResultMap temp_srm2 = data1.selectForMap();		//kt서버에 넣을 목록

		for (SqlResultRow sqlResultRow : temp_srm1) {
			sms_insert.param
			.table("sale_sms_info")
			.where("where inv_no = :inv_no ",  sqlResultRow.getParamText("inv_no"))
			.where("and line_seqn = :line_seqn ",  sqlResultRow.getParamText("line_seqn"))
			.unique("inv_no"			,  sqlResultRow.getParamText("inv_no"))
			.unique("line_seqn"			,  sqlResultRow.getParamText("line_seqn"))
			.update("sms_memo"	,  sqlResultRow.getParamText("ship_memo"))
			.update("reve_tel_no"	, sqlResultRow.getParamText("recvtelhp"))
			.update("reve_nm"		, sqlResultRow.getParamText("mmb_nm"))
			.update("UPDATE_NM", temp_update_nm)
			.update("UPDATE_IP", arg.remoteAddress)
			.update("UPDATE_DT",  new SqlParamText("to_char(sysdate, 'yyyymmddhh24mi')")  )			;
			sms_insert.attach(Action.modify);

		}

		for (SqlResultRow sqlResultRow : temp_srm2) {
			smsdata.param
			.table("SDK_MMS_SEND")
			.insert("MSG_ID", new SqlParamText("  SDK_SMS_SEQ.nextval "))
			.insert("USER_ID", temp_update_nm )
			.insert("reserved1",sqlResultRow.getParamText("inv_no"))
			.insert("reserved3","미출고")
			.insert("reserved4",temp_store_id)
			.insert("SCHEDULE_TYPE", "0")
			.insert("SUBJECT", "알파유통")
			.insert("NOW_DATE", new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDDHH24MISS') "))
			.insert("SEND_DATE", new SqlParamText(" TO_CHAR(sysdate,'YYYYMMDDHH24MISS') "))
			.insert("CALLBACK", "1577-3788")
			.insert("DEST_COUNT", "1")
			.insert("DEST_INFO", sqlResultRow.getParamText("ist_mst") )
			.insert("MMS_MSG", sqlResultRow.getParamText("memo") )	;
			smsdata.attach(Action.insert);
		}
		sms_insert.execute();
		smsdata.execute();
		return null;
	}

	//sms
	public SqlResultMap getSmsinfom(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage("N2310ALPHA.FAX") ; // arg.newStorage("POS");

		int i = 1;
		data.param
			.total("select count(1) as maxsize")
			;
		data.param
			.query("     select 	")
			.query("      msg_id, emp_id,  schedule_type, subject,mms_msg as sms_msg, now_date	")
			.query("     , callback, send_date, dest_count, dest_info 	")
			.query("     ,  reserved1 , reserved2 , reserved3 , reserved4	, reserved7 ")
			.query("     , succ_count, fail_count	")
			;
		data.param
			.where("     from sdk_mms_report ")
			.where("	 where substring(send_date,1,8) between :s_fr_dt ", arg.getParameter("s_fr_dt"))
			.where("     and :s_to_dt ", arg.getParameter("s_to_dt"))
			.where("     and reserved4 = :stor_id ", arg.getParameter("s_store_id"))
			.where("     and succ_count = :fax_result ",Integer.toString(i),"1".equals(arg.getParameter("sms_result")))
			.where("     and fail_count = :fax_result ",Integer.toString(i),"2".equals(arg.getParameter("sms_result"))    )
			.where("     and reserved1 like %:s_inv_no% ", arg.getParameter("s_inv_no"))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}

	}


	//sms전송현황 상세
	public SqlResultMap getSmsinfod(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage("N2310ALPHA.FAX") ; // arg.newStorage("POS");

		/* 조회 */
		data.param
			.query("     select result, tcs_result, send_date, dest_name, phone_number, deliver_date ")
			.query("      status_text, msg_id  ")
			.query("	 from sdk_mms_report_detail ")
			.query("     where msg_id = :msg_id "     , arg.getParameter("msg_id"))
		;
		return data.selectForMap();
	}

	//sms 전송현황 재전송
	public SqlResultMap setFaxSend(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage("N2310ALPHA.FAX") ;

		for(SqlResultRow tel:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			System.out.println(tel);
			data.clear();
			data.param // 쿼리문  입력
				.table ("SDK_MMS_SEND"   )
				.insert("msg_id"            , new SqlParamText("  SDK_SMS_SEQ.nextval ")  							  )
				.insert("USER_ID"           , tel.getParameter( "crt_nm"        ))
				.insert("schedule_type"     , 0                                   )  // 0 : 즉시 1 : 예약 발송
				.insert("reserved1",tel.getParameter( "reserved1"        ))
				//.insert("reserved2",tel.getParameter( "reserved2"        ))
				.insert("reserved3",tel.getParameter( "reserved3"        ))
				.insert("reserved4", tel.getParameter( "reserved4"        ))
				.insert("reserved7",1)
				.insert("SUBJECT", "알파유통")
				.insert("now_date"          , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") ) //
				.insert("send_date"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')") ) // 예약 발송 시간
				.insert("callback"          , "1577-3788") // 전송 전화번호
				.insert("dest_count", "1")
				.insert("dest_info", tel.getParameter( "dest_info"        ))
				.insert("mms_msg",tel.getParameter( "sms_msg"        ))
				;
			;data.attach(Action.insert);
		}
		data.execute();
		return null;
	}
}
