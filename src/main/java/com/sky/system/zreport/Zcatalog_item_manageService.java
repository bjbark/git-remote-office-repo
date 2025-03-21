package com.sky.system.zreport;

/*
import java.util.LinkedHashMap;
import org.springframework.web.bind.annotation.RequestMapping;
import com.sky.http.HttpMessage;
import com.sky.utils.TreeHash;
import com.sky.http.HttpMessage;
*/

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class Zcatalog_item_manageService extends DefaultServiceHandler {
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	DataMessage data=null;


	public SqlResultMap getcatalog_item_manageLister1(HttpRequestArgument arg , int page , int rows ) throws Exception {
		 data =  arg.newStorage("POS"); //new DataMessage("N2330ALPHA.CHAIN");
		 String stor_grp = ((String) arg.getParameter("stor_id")).substring(0, 10);
		 String tname = stor_grp.equals("N2310ALPHA") ? "ITEM_INFO" : "N2310ALPHA.ITEM_INFO@CDN233";
		 String catalog_item = ((String) arg.getParameter("catalog_chk" )) == null ?"no":"on";

		data.clear();
		data.param
		.total("select count(1) as maxsize 							");
		data.param
		.query(" select  													")
		.query(" * 															");
		data.param
		.where(" from 														")
		.where(" itm_stor a											")
		.where(" join "+tname+" b on ( a.item_idcd = b.item_idcd )										")
		.where(" where 1 = 1																					")
		.where(" and stor_id = :stor_id			"			 , arg.getParameter("stor_id"  	));
		if( catalog_item.equals("on") ){
			data.param.where(" and b.CATALOG_NO IS NOT NULL			" );
		}


		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}

	//카다로그 등록
	public SqlResultMap getcatalog_item_manageLister2(HttpRequestArgument arg) throws Exception {
		data =  arg.newStorage("POS"); //new DataMessage("N2330ALPHA.CHAIN");

		String stor_grp = ((String) arg.getParameter("stor_id")).substring(0, 10);
		 String tname = stor_grp.equals("N2310ALPHA") ? "ITEM_INFO" : "N2310ALPHA.ITEM_INFO@CDN233";

		data.clear();
		data.param
		.query(" SELECT isnull(max(to_number(seq)),0)+1 seq 							")
		.query(" FROM ITEM_STORE_BACKUP 						")
		.query(" where 1=1												")
		.query(" and cdate = to_char(sysdate,'yyyymmdd') 	")
		.query(" and stor_id = :stor_id			" , arg.getParameter("stor_id"  	));

		SqlResultMap srm = data.selectForMap();
		SqlResultRow item = srm.get(0);
		String	temp = item.getParameter("seq").toString();
		int seq = (int)Float.parseFloat(temp);

		//백업 프로세스
		data.clear();
		data.param
		.query(" INSERT INTO ITEM_STORE_BACKUP(CDATE, SEQ, BONSA_ID, STORE_GP, STORE_ID, WAREH_ID, SHARE_GP, SALE_STS, SALE_EPO, PRDT_ID, ITEM_ID, USER_ID, SALE_PRICE, USER_PRICE, SALE_PRICE0, SALE_PRICE1, SALE_PRICE2, SALE_PRICE3, SALE_PRICE4, SALE_PRICE5, VEND_ID, PACK_GB, PO_PRICE, PO_PRICE_TYPE, PO_PRICE_RATE, PO_AVE_PRICE, BUNCH_GB, SAFE_QTY, SAFE_DAY, RECV_ZONE, SALE_ZONE, PICKING_ID, HANIN_PRICE, HANIN_FR_DT, HANIN_TO_DT, USER_MEMO, SYS_MEMO, ROW_ORDER, ROW_STATE, CONVERTED, SEARCH_NM, UPDATE_NM, UPDATE_IP, UPDATE_DT, CREATE_NM, CREATE_IP, CREATE_DT, PACK_ZONE_ID, SYNC_YN, RECV_STS) ")
		.query(" (select to_char(sysdate,'yyyymmdd') CDATE ,'"+seq+"' SEQ , BONSA_ID, STORE_GP, STORE_ID, WAREH_ID, SHARE_GP, SALE_STS, SALE_EPO, PRDT_ID, ITEM_ID, USER_ID, SALE_PRICE, USER_PRICE, SALE_PRICE0, SALE_PRICE1, SALE_PRICE2, SALE_PRICE3, SALE_PRICE4, SALE_PRICE5, VEND_ID, PACK_GB, PO_PRICE, PO_PRICE_TYPE, PO_PRICE_RATE, PO_AVE_PRICE, BUNCH_GB, SAFE_QTY, SAFE_DAY, RECV_ZONE, SALE_ZONE, isnull(PICKING_ID,' '), HANIN_PRICE, HANIN_FR_DT, HANIN_TO_DT, USER_MEMO, SYS_MEMO, ROW_ORDER, ROW_STATE, CONVERTED, SEARCH_NM, UPDATE_NM, UPDATE_IP, UPDATE_DT, CREATE_NM, CREATE_IP, CREATE_DT, PACK_ZONE_ID, SYNC_YN, RECV_STS from itm_stor A where	")
		.query(" stor_id = :stor_id		 )  "  , arg.getParameter("stor_id"  	));

		data.attach(Action.direct);
		data.execute(); //갱신한 row 수를 output 함. --execute()

		String stor_id =  ((String)arg.fixParameter("stor_id")).substring(0, 10);
		String s1 =  (String) arg.getParameter("sale_pri_1");
		String s2 =  (String) arg.getParameter("sale_pri_2");
		String s3 =  (String) arg.getParameter("sale_pri_3");
		String s4 =  (String) arg.getParameter("sale_pri_4");
		String s5 =  (String) arg.getParameter("sale_pri_5");

		//적재 프로세스
		data.clear();
		data.param
.query(" MERGE INTO ITEM_STORE T																																																				")
.query(" USING (																																																											")
.query(" SELECT S.ITEM_ID, S.PRDT_ID , S.SOBI_PRICE , S.PO_PRICE ,  S.SALE_PRICE , S.SALE_PRICE0 , S.SALE_PRICE1 , S.SALE_PRICE2 , S.SALE_PRICE3 , S.SALE_PRICE4 , S.SALE_PRICE5				")
.query(" FROM 																																																									")
.query(	tname+" S																																															")
.query(" WHERE S.CATALOG_NO IS NOT NULL																																																	")
.query(" ) S ON ( S.ITEM_ID = T.ITEM_ID AND T.STORE_ID = :stor_id )	 " 		, arg.fixParameter("stor_id") 	)
.query(" WHEN MATCHED THEN																																																						")
.query(" UPDATE SET T.UPDATE_DT = TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS') 																																				");
if(!s1.equals("")){
	data.param.query(" , T.SALE_PRICE1 = 	 S."+s1);
}
if(!s2.equals("")){
	data.param.query(" , T.SALE_PRICE2 = 	 S."+s2);
}
if(!s3.equals("")){
	data.param.query(" , T.SALE_PRICE3 = 	 S."+s3);
}
if(!s4.equals("")){
	data.param.query(" , T.SALE_PRICE4 = 	 S."+s4);
}
if(!s5.equals("")){
	data.param.query(" , T.SALE_PRICE5 = 	 S."+s5);
}
data.param
.query(" WHERE T.STORE_ID =  :stor_id " , arg.fixParameter("stor_id") 	)
.query(" WHEN NOT MATCHED THEN																																																				")
.query(" INSERT (																																																											")
.query(" 	T.BONSA_ID  			 																																																						")
.query(" 	, T.STORE_GP      	 																																																						")
.query(" 	, T.STORE_ID      	 																																																							")
.query(" 	, T.PRDT_ID					 																																																					")
.query(" 	, T.ITEM_ID					 																																																					")
.query(" 	, T.SYNC_YN					 																																																				")
.query(" 	, T.UPDATE_DT 			 																																																					");
if(!s1.equals("")){
	data.param.query(" 	, T.SALE_PRICE1  ");
}
if(!s2.equals("")){
	data.param.query(" 	, T.SALE_PRICE2  ");
}
if(!s3.equals("")){
	data.param.query(" 	, T.SALE_PRICE3  ");
}
if(!s4.equals("")){
	data.param.query(" 	, T.SALE_PRICE4  ");
}
if(!s5.equals("")){
	data.param.query(" 	, T.SALE_PRICE5  ");
}
data.param
.query(" ) VALUES (																																																										")
.query("'"+stor_id+"'")
.query(" 	, :stor_id" ,  arg.fixParameter("stor_id") )
.query(" 	, :stor_id" ,  arg.fixParameter("stor_id") )
.query(" 	, S.PRDT_ID					 																																																					")
.query(" 	, S.ITEM_ID					 																																																					")
.query(" 	, '1'      					 																																																						")
.query(" 	, TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS') 																																														");
if(!s1.equals("")){
	data.param.query(" 	, S."+s1 );
}
if(!s2.equals("")){
	data.param.query(" 	, S."+s2 );
}
if(!s3.equals("")){
	data.param.query(" 	, S."+s3 );
}
if(!s4.equals("")){
	data.param.query(" 	, S."+s4 );
}
if(!s5.equals("")){
	data.param.query(" 	, S."+s5 );
}
data.param
.query(" )																																																													");

data.attach(Action.direct);
		int cnt2 = data.execute(); //갱신한 row 수를 output 함. --execute()

		data.clear();
		data.param
		.query(" select "+cnt2+"as cnt from dual ");

		return data.selectForMap();
	}

	//백업 조회
	public SqlResultMap getcatalog_item_manageLister3(HttpRequestArgument arg , int page , int rows ) throws Exception {
		data =  arg.newStorage("POS"); //new DataMessage("N2330ALPHA.CHAIN");
		 String update_state = (String) arg.getParameter("update_state");
		 SqlResultMap srm = null;

		if(update_state.equals("no")){
			data.clear();
			data.param
			.total("select count(1) as maxsize 							");
			data.param
			.query(" select  													")
			.query(" *			 															");
			data.param
			.where(" from 																	")
			.where(" item_store_backup 												")
			.where(" where 1=1																			")
			.where(" and stor_id = :stor_id			" , arg.getParameter("stor_id"  	))
			.where(" and cdate||seq = :restore_id			" , arg.getParameter("restore_id"  	));
			if (page == 0 && rows == 0){
				srm = data.selectForMap();
			} else {
				srm= data.selectForMap(page, rows, (page==1) );
			}
		}else if( update_state.equals("ok") ) {
			//삭제
			data.clear();
			data.param
			.query("delete from itm_stor ")
			.where("where stor_id = :stor_id ", arg.fixParameter("stor_id")  );
			data.attach(Action.direct);
			data.execute();
			data.clear();
			//복구
			data.param
			.query(" INSERT INTO itm_stor( BONSA_ID, STORE_GP, STORE_ID, WAREH_ID, SHARE_GP, SALE_STS, SALE_EPO, PRDT_ID, ITEM_ID, USER_ID, SALE_PRICE, USER_PRICE, SALE_PRICE0, SALE_PRICE1, SALE_PRICE2, SALE_PRICE3, SALE_PRICE4, SALE_PRICE5, VEND_ID, PACK_GB, PO_PRICE, PO_PRICE_TYPE, PO_PRICE_RATE, PO_AVE_PRICE, BUNCH_GB, SAFE_QTY, SAFE_DAY, RECV_ZONE, SALE_ZONE, PICKING_ID, HANIN_PRICE, HANIN_FR_DT, HANIN_TO_DT, USER_MEMO, ARUM_MEMO, ROW_ORDER, ROW_STATE, CONVERTED, SEARCH_NM, UPDATE_NM, UPDATE_IP, UPDATE_DT, CREATE_NM, CREATE_IP, CREATE_DT, PACK_ZONE_ID, SYNC_YN, RECV_STS) ")
			.query(" (select BONSA_ID, STORE_GP, STORE_ID, WAREH_ID, SHARE_GP, SALE_STS, SALE_EPO, PRDT_ID, ITEM_ID, USER_ID, SALE_PRICE, USER_PRICE, SALE_PRICE0, SALE_PRICE1, SALE_PRICE2, SALE_PRICE3, SALE_PRICE4, SALE_PRICE5, VEND_ID, PACK_GB, PO_PRICE, PO_PRICE_TYPE, PO_PRICE_RATE, PO_AVE_PRICE, BUNCH_GB, SAFE_QTY, SAFE_DAY, RECV_ZONE, SALE_ZONE, PICKING_ID, HANIN_PRICE, HANIN_FR_DT, HANIN_TO_DT, USER_MEMO, ARUM_MEMO, ROW_ORDER, ROW_STATE, CONVERTED, SEARCH_NM, UPDATE_NM, UPDATE_IP, UPDATE_DT, CREATE_NM, CREATE_IP, CREATE_DT, PACK_ZONE_ID, SYNC_YN, RECV_STS from ITEM_STORE_BACKUP A where CDATE||seq = :restore_id ) " , arg.fixParameter("restore_id"));
			data.attach(Action.direct);
			int cnt = data.execute();
			//리턴
			data.clear();
			data.param
			.query("select "+cnt+" from dual" );
			srm = data.selectForMap();
		}
		return srm;
	}





}

