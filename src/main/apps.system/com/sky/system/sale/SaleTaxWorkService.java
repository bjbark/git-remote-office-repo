package com.sky.system.sale;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleTaxWorkService extends DefaultServiceHandler {

	
	/*
	 * 매출 내역 조회	
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page , int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.total("select count(1) as maxsize  , sum(t.amount) as amount,  sum(t.invoice_amount) as invoice_amount , sum(t.npay_amt) as npay_amt, sum(t.tax) as tax, sum(t.tax_free) as tax_free, sum(t.sply_amt) as sply_amt ")
		;
		data.param // 쿼리문  입력
			.query(" select t.cust_id, b.cust_nm, t.amount, t.invoice_amount, t.npay_amt, ")
			.query("	t.tax_free, t.sply_amt, t.tax, ")
//			.query("	t.biz_no, t.biz_type, t.biz_type, t.biz_owner, t.cust_cd ")
			.query("	b.biz_no, b.biz_type, b.biz_type, b.biz_owner, b.cust_cd, b.biz_email,")
			.query("	b.biz_addr_1 || b.biz_addr_2 as biz_addr, b.biz_nm , ") 
			.query("	(select min(si.inv_dt) from sale_mst si   									")
			.query(" 		where si.inv_dt between :fr_dt       	" , arg.fixParameter("fr_dt"        ))
			.query("							and :to_dt       	" , arg.fixParameter("to_dt"        ))
			.query("   		and si.cust_id = t.cust_id 													")
			.query("   		and si.stor_id      = :stor_id        " , arg.fixParameter("stor_id" 	))
			.query("   		and si.row_sts = 0 				   										")
			.query("   		and si.tax_yn = '0' 														")
			.query("   		and si.amount - si.app_cash - si.app_card <> 0  ) as st_inv_dt ,			")
			.query("	(select max(si.inv_dt) from sale_mst si   										")
			.query(" 		where si.inv_dt between :fr_dt       	" , arg.fixParameter("fr_dt"        ))
			.query("							and :to_dt       	" , arg.fixParameter("to_dt"        ))
			.query("   		and si.cust_id = t.cust_id 													")
			.query("   		and si.stor_id      = :stor_id        " , arg.fixParameter("stor_id" 	))
			.query("   		and si.row_sts = 0 				   										")
			.query("   		and si.tax_yn = '0' 														")
			.query("   		and si.amount - si.app_cash - si.app_card <> 0  ) as ed_inv_dt 				")

		;
		data.param
			.where(" from ( 																			")
//			.where("	select a.cust_id, a.cust_nm, sum(a.amount) as amount, 							")
			.where("	select a.cust_id, sum(a.amount) as amount, 							")
			.where("		sum(a.app_cash + a.app_card) as invoice_amount, 							")
			.where("		sum(a.amount - a.app_cash - a.app_card) as npay_amt, 						")
			.where("		sum(a.tax_free) as tax_free, 												")
			.where("		sum(a.sply_amt) as sply_amt, 												")
			.where("		sum(a.tax) as tax 															")
//			.where("		b.biz_no, b.biz_type, b.biz_type, b.biz_owner, b.cust_cd					")
//			.where("	from  sale_mst a, cust_mst b													")
			.where("	from  sale_mst a																")
			.where("    where a.inv_dt between :fr_dt       		" , arg.fixParameter("fr_dt"    	))
			.where("  				     and :to_dt       			" , arg.fixParameter("to_dt"    	))
//			.where("    and a.cust_nm   like %:cust_nm%  	        " , arg.getParameter("cust_nm"  	))
			.where("    and a.cust_id   	= :cust_id  	        " , arg.getParameter("cust_id"  	))
			.where("	and a.stor_id      = :stor_id     		" , arg.fixParameter("stor_id" 	))
			.where("	and a.tax_yn = '0' 																")
			.where("	and amount - app_cash - app_card <> 0  				     						")
//			.where("	and a.cust_id = b.cust_id														")
			.where("    and a.row_sts = 0 				   										    ")
//			.where("	group by a.cust_id , a.cust_nm, b.biz_no, b.biz_type, b.biz_type, b.biz_owner, b.cust_cd	")
			.where("	group by a.cust_id																")
			.where(" ) t , cust_mst b																	")
			.where(" where t.cust_id = b.cust_id														")
			.where(" order by b.cust_nm		 															")
					
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}	
	}			

	/**
	 * detail 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query(" select si.inv_no, si.amount, (si.app_cash + si.app_card) as invoice_amount, 	")
			.query(" (si.amount - si.app_cash - si.app_card) as npay_amt, si.inv_dt, 				")
			.query(" si.tax_free, si.tax, si.sply_amt , si.mmb_nm									")
			.query(" from sale_mst si																")
			.query(" where si.inv_dt between :fr_dt       		" , arg.fixParameter("fr_dt"        ))
			.query("				and :to_dt       			" , arg.fixParameter("to_dt"        ))
			.query("   and si.cust_id = :cust_id	  		    " , arg.fixParameter("cust_id"      ))
			.query("   and si.stor_id      = :stor_id         " , arg.fixParameter("stor_id" 	))
			.query("   and si.row_sts = 0 				   										    ")
			.query("   and si.tax_yn = '0' 															")
			.query("   and si.amount - si.app_cash - si.app_card <> 0  				     			")
			.query(" order by si.inv_no 														")
					
		;
		return data.selectForMap();	
	}		
	
	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDialog(HttpRequestArgument arg) throws Exception{
		
		DataMessage data = arg.newStorage("POS");
		
		//String[] inv_no = arg.getParamCast("inv_no", String[].class);

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String inv_no[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			inv_no[idx++] = row.getParamText("inv_no");
		}
		
		data.param // 쿼리문  입력
			.query(" select s.corp_id, s.stor_id, s.inv_no, s.stor_grp, s.hq_id, ") 
//			.query("	(si.item_name || ' 외 ' || (select count(*) - 1 from sale_dtl si where si.inv_no in (:inv_no) ", inv_no ) 
//			.query("	)) as item_name, substr(s.inv_dt, 0,4) as year, substr(s.inv_dt, 5,2) as month, substr(s.inv_dt, 7) as day, s.inv_dt, ") 
//			.query("	substr(s.inv_dt, 0,4) as year, substr(s.inv_dt, 5,2) as month, substr(s.inv_dt, 7) as day, s.inv_dt, ") 
			.query("	 substr(to_char(sysdate, 'YYYYMMDD'), 0,4) as year, substr(to_char(sysdate, 'YYYYMMDD'), 5,2) as month, substr(to_char(sysdate, 'YYYYMMDD'), 7) as day, s.inv_dt, ") 
			.query("	to_char(sysdate, 'YYYYMMDD') as pub_date,") 
			.query("	s.cust_grp, s.cust_id, s.cust_nm, ") 
			.query("	s.biz_owner, s.biz_no, s.biz_nm, s.biz_type, s.biz_type, s.biz_state || s.biz_city || s.biz_dong || s.biz_addr_2 as biz_addr, s.biz_email, ") 
			.query("	s.biz_state || s.biz_city || s.biz_dong as biz_addr_1, s.biz_addr_2, s.biz_zip_cd, ") 
			.query("	st.biz_owner as snd_biz_owner, st.biz_no as snd_biz_no, st.biz_nm as snd_biz_nm, st.biz_type as snd_biz_cond, st.biz_type as snd_biz_types, st.biz_state || st.biz_city || st.biz_dong || st.biz_addr_2 as snd_biz_addr, st.biz_email as snd_biz_email, ") 
//			.query("	s.inv_work_id, s.mmb_id, s.mmb_nm, s.user_memo, s.tax_free, s.tax_type, s.tax_rt, ") 
			.query("	s.inv_work_id, s.mmb_id, s.mmb_nm, s.user_memo, s.tax_type, s.tax_rt, ") 
			.query("	sisua.sply_amt as taxation_subtotal, sisua.tax as taxation_tax, sisua.amount as taxation_amount,") 
			.query("	sisub.sply_amt as tax_subtotal, sisub.tax as tax_tax, sisub.amount as tax_amount, (sisub.tax_free + sisua.tax_free) as tax_free, ") 
			.query("	(select case (select count(*) from sale_dtl si where si.inv_no in (:inv_no) and notax_yn = '0')", inv_no) 
			.query("		when 1 then s.item_name else (s.item_name || ' 외 ' || (select count(*) - 1 from sale_dtl si where si.inv_no in (:inv_no) and notax_yn = '0' ) || '건') end as item_name", inv_no) 
			.query("	from sale_dtl s ") 
			.query("	where s.inv_no in (:inv_no) ", inv_no) 
			.query("	  and s.notax_yn = '0' ") 
			.query("	  and rownum = 1) as taxation_item_name, ") 
			.query("	(select case (select count(*) from sale_dtl si where si.inv_no in (:inv_no) and notax_yn = '1')", inv_no) 
			.query("		when 1 then s.item_name else (s.item_name || ' 외 ' || (select count(*) - 1 from sale_dtl si where si.inv_no in (:inv_no) and notax_yn = '1' ) || '건') end as item_name", inv_no) 
			.query("	from sale_dtl s ") 
			.query("	where s.inv_no in (:inv_no) ", inv_no) 
			.query("	  and s.notax_yn = '1' ") 
			.query("	  and rownum = 1) as tax_item_name ") 
			.query(" from sale_mst s, store st, ( ") 
			.query("	select sum(su.amount) as amount, sum(su.sply_amt) as sply_amt, sum(su.tax) as tax, sum(su.tax_free) as tax_free ") 
			.query("	from sale_dtl su ") 
			.query("	where su.inv_no in (:inv_no) ", inv_no ) 
			.query("	  and su.notax_yn = '0' ) sisua, ( ") 
			.query("	select sum(su.amount) as amount, sum(su.sply_amt) as sply_amt, sum(su.tax) as tax, sum(su.tax_free) as tax_free ") 
			.query("	from sale_dtl su ") 
			.query("	where su.inv_no in (:inv_no) ", inv_no ) 
			.query("	  and su.notax_yn = '1' ) sisub ") 
			.query(" where s.inv_no in (:inv_no) ", inv_no ) 
			.query("   and s.stor_id = st.stor_id ") 
			.query("   and s.row_sts = 0  ")
			.query(" order by s.inv_dt desc ") 
		;
		
		SqlResultMap info = data.selectForMap();

	    return info ;
	}
	
		
	
	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String taxhosting = arg.getParamText("taxdb_id");
		String tax_chk = arg.getParamText("tax_chk");
		String pay_gb = arg.getParamText("pay_gb");
	
		String inv_no[] = new String[map.size()];
		String serialnum_taxation = "";
		String serialnum_tax = "";
		String issue_gb = "";
		String businesstype = "";
		int idx = 0;
		boolean ifChk = false;
		
		for (SqlResultRow row:map) {
			inv_no[idx++] = row.getParamText("inv_no");
		}
		
		if(!"".equals(taxhosting) && "Y".equals(tax_chk)) {
			issue_gb = "1";
			ifChk = true;
		} else if ("E".equals(tax_chk)){
			issue_gb = "2";
		} else {
			issue_gb = "0";
		}
		
		if("1".equals(pay_gb)){
			businesstype = "영수";
		} else {
			businesstype = "청구";
		}
		
		
//		String pubDate = arg.getParamText("year") + arg.getParamText("month") + arg.getParamText("day");

		data.param
			.table("sale_taxbill")
			.where("where tax_no  = :tax_no  " )
			.insert("corp_id"      , arg.fixParameter("corp_id"   ))
			.insert("hq_id"      , arg.fixParameter("hq_id"   ))
			.insert("stor_grp"      , arg.fixParameter("stor_grp"   ))
			.insert("stor_id"      , arg.fixParameter("stor_id"   ))
			.unique("tax_no"        , arg.fixParameter("tax_no"     ))
//			.insert("tax_dt"        , arg.getParameter("inv_dt"     )) // 계산서 발행일
			.insert("tax_dt"        , new SqlParamText("to_char(sysdate, 'yyyymmdd')")) // 계산서 발행일
			.insert("tax_gb"        , issue_gb                       ) // 0 : 일반계산서, 1 : 전자세금계산서, 2 : esero국세청양식
			.insert("inv_work_id"   , arg.getParameter("inv_work_id"))
			.insert("inv_dept_id"   , arg.getParameter("inv_dept_id"))
			.insert("inv_usr_id"   , arg.fixParameter("inv_usr_id"))
//			.insert("issue_dt"      , pubDate                        ) // 계산서 발행일
			.insert("issue_dt"      , arg.fixParameter("pubDate"    )) // 계산서 작성일
			.insert("pay_gb"        , arg.fixParameter("pay_gb"     )) // 영수 : 1, 청구: 2
			.insert("cust_grp"       , arg.getParameter("cust_grp"    ))
			.insert("cust_id"       , arg.getParameter("cust_id"    ))
			.insert("cust_nm"       , arg.getParameter("cust_nm"    ))
			.insert("mmb_id"       , arg.getParameter("mmb_id"    ))
			.insert("mmb_nm"       , arg.getParameter("mmb_nm"    ))
			.insert("biz_no"        , arg.getParameter("biz_no"     ))
			.insert("biz_nm"        , arg.getParameter("biz_nm"     ))
			.update("biz_email"     , arg.getParameter("biz_email"  ))
			.insert("biz_type"      , arg.getParameter("biz_type"   ))
			.insert("biz_type"     , arg.getParameter("biz_type"  ))
			.insert("biz_owner"     , arg.getParameter("biz_owner"  ))
			.insert("biz_zip_cd"  	, arg.getParameter("biz_zip_cd" ))
			.insert("biz_addr_1"     , arg.getParameter("biz_addr_1"  ))
			.insert("biz_addr_2"     , arg.getParameter("biz_addr_2"  ))
			.insert("tax_free"      , arg.getParameter("tax_free"   ))
			.insert("taxation"      , arg.getParameter("taxation"   ))
			.insert("sply_amt"      , arg.getParameter("sply_amt"   ))
			.insert("tax"           , arg.getParameter("tax"        ))
			.insert("amount"        , arg.getParameter("amount"     ))
//			.insert("taxation_unit" , arg.getParameter("user_memo"  ))
//			.update("tax_free_unit" , arg.getParameter("unit_spec"  ))

			.update("row_clos"     , arg.getParameter("row_clos"  ))
			.update("row_sts"     , arg.getParameter("row_sts"  ))
			.update("upt_nm"     , arg.getParameter("upt_nm"  ))
			.update("upt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
			.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
			.insert("crt_nm"     , arg.getParameter("crt_nm"  ))
			.insert("crt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
			.insert("crt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
		;
		
		if(!"".equals(arg.getParamText("tax")) && !"0".equals(arg.getParamText("tax"))){
			serialnum_taxation = arg.getParamText("tax_no") + "0";
			data.param
				.update("taxation_no"   , serialnum_taxation)
				.update("taxation_item" , arg.getParameter("taxation_item_name"  ))
				.update("taxation_spec" , arg.getParameter("taxation_unit_spec"  ))
				.update("taxation_sts"  , "0000" )
//				.update("taxation_result"  , "" )
			;
		}

		if(!"".equals(arg.getParamText("tax_free")) && !"0".equals(arg.getParamText("tax_free"))){
			serialnum_tax = arg.getParamText("tax_no") + "1";
			data.param
				.update("tax_free_no"   , serialnum_tax)
				.update("tax_free_item" , arg.getParameter("tax_item_name"  ))
				.update("tax_free_spec" , arg.getParameter("tax_unit_spec"  ))
				.update("tax_free_sts"  , "0000")
//				.update("tax_free_result"  , "")
			;
		}
		
		data.attach(Action.insert);
		
		//과세일때 효성쪽 Insert
		if(ifChk && !"".equals(serialnum_taxation)) {
			data.param
				.table("tsmiletax")
				//.where("where serialnum  = :tax_no  " )
				.insert("arum_bonsa_id"    , arg.getParameter("hq_id"   ))
				.insert("arum_stor_id"    , arg.getParameter("stor_id"   ))
				.insert("arum_issue_no"    , arg.getParameter("tax_no"   ))
				.insert("arum_issue_gb"    , "0")
				.insert("arum_lintener"    , new SqlParamText("date_format(now(),'%Y%m%d%H%i%s')"))
				.update("arum_agent_gb"    , "7")
				.insert("serialnum"        , serialnum_taxation)
				.insert("pubtype"          , "T")
				.insert("tax_state"        , "N")
				.insert("doctype"          , "0101")
//				.insert("modify_code"      , arg.getParameter(""   ))
//				.insert("s_a_name"         , arg.getParameter("snd_biz_nm"   ))
//				.insert("s_a_email"        , arg.getParameter("snd_biz_email"   ))
				.update("r_a_name"         , arg.getParameter("mmb_nm"   ))
				.update("r_a_email"        , arg.getParameter("biz_email"   ))
				.insert("publicdate"       , arg.fixParameter("pubDate"))
				.insert("businesstype"     , businesstype)
				.insert("s_compname"       , arg.getParameter("snd_biz_nm"   ))
				.insert("s_compnum"        , arg.getParameter("snd_RegNo"   ))
				.insert("s_classification" , arg.getParameter("snd_biz_cond"   ))
				.insert("s_type"           , arg.getParameter("snd_biz_types"   ))
				.insert("s_ceo"            , arg.getParameter("snd_biz_owner"   ))
				.insert("s_address"        , arg.getParameter("snd_biz_addr"   ))
				.update("r_compname"       , arg.getParameter("biz_nm"   ))
				.update("r_compnum"        , arg.getParameter("rcv_RegNo"   ))
				.update("r_classification" , arg.getParameter("biz_type"   ))
				.update("r_type"           , arg.getParameter("biz_type"   ))
				.update("r_ceo"            , arg.getParameter("biz_owner"   ))
				.update("r_address"        , arg.getParameter("biz_addr"   ))
				.insert("price"            , arg.getParameter("taxation_subtotal"   ))
				.insert("tax"              , arg.getParameter("taxation_tax"   ))
				.insert("itemdate1"        , arg.fixParameter("pubDate"))
				.insert("itemname1"        , arg.getParameter("taxation_item_name"   ))
				.insert("itemprice1"       , arg.getParameter("taxation_subtotal"   ))
				.insert("itemtax1"         , arg.getParameter("taxation_tax"   ))
				.update("state"            , "N")
				.update("srtype"           , "S")
				.update("nts_send_state"   , "N")
				.update("nts_send_gb"      , "N")
				.update("nts_result_code"  , "N")
				
		   ;
		   data.attach(Action.insert , taxhosting ); 	   
		}

		// 면세일때 효성쪽 Insert
		if(ifChk && !"".equals(serialnum_tax)) {
			data.param
			.table("tsmiletax")
			//.where("where serialnum  = :tax_no  " )
			.insert("arum_bonsa_id"    , arg.getParameter("hq_id"   ))
			.insert("arum_stor_id"    , arg.getParameter("stor_id"   ))
			.insert("arum_issue_no"    , arg.getParameter("tax_no"   ))
			.insert("arum_issue_gb"    , "1")
			.insert("arum_lintener"    , new SqlParamText("date_format(now(),'%Y%m%d%H%i%s')"))
			.update("arum_agent_gb"    , "7")
			.insert("serialnum"        , serialnum_tax)
			.insert("pubtype"          , "T")
			.update("tax_state"        , "N")
			.insert("doctype"          , "0101")
//				.insert("modify_code"      , arg.getParameter(""   ))
//				.insert("s_a_name"         , arg.getParameter("snd_biz_nm"   ))
//				.insert("s_a_email"        , arg.getParameter("snd_biz_email"   ))
			.update("r_a_name"         , arg.getParameter("mmb_nm"   ))
			.update("r_a_email"        , arg.getParameter("biz_email"   ))
			.insert("publicdate"       , arg.fixParameter("pubDate"))
//			.insert("publicdate"       , pubDate)
			.insert("businesstype"     , businesstype)
			.insert("s_compname"       , arg.getParameter("snd_biz_nm"   ))
			.insert("s_compnum"        , arg.getParameter("snd_biz_no"   ))
			.insert("s_classification" , arg.getParameter("snd_biz_cond"   ))
			.insert("s_type"           , arg.getParameter("snd_biz_types"   ))
			.insert("s_ceo"            , arg.getParameter("snd_biz_owner"   ))
			.insert("s_address"        , arg.getParameter("snd_biz_addr"   ))
			.update("r_compname"       , arg.getParameter("biz_nm"   ))
			.update("r_compnum"        , arg.getParameter("biz_no"   ))
			.update("r_classification" , arg.getParameter("biz_type"   ))
			.update("r_type"           , arg.getParameter("biz_type"   ))
			.update("r_ceo"            , arg.getParameter("biz_owner"   ))
			.update("r_address"        , arg.getParameter("biz_addr"   ))
			.insert("price"            , arg.getParameter("tax_subtotal"   ))
			.insert("tax"              , arg.getParameter("tax_tax"   ))
//			.insert("itemdate1"        , pubDate)
			.insert("itemdate1"        , arg.fixParameter("pubDate"))
			.insert("itemname1"        , arg.getParameter("tax_item_name"   ))
			.insert("itemprice1"       , arg.getParameter("tax_subtotal"   ))
			.insert("itemtax1"         , arg.getParameter("tax_tax"   ))
			.update("state"            , "N")
			.update("srtype"           , "S")
			.update("nts_send_state"   , "N")
			.update("nts_send_gb"      , "N")
			.update("nts_result_code"  , "N")
			
			;
			data.attach(Action.insert , taxhosting ); 	   
		}
		
		data.param
			.table("sale_mst")
			.where("where inv_no in (:inv_no) ", inv_no )
			.update("tax_no"        , arg.getParameter("tax_no"     ))
			.update("tax_dt"        , arg.getParameter("inv_dt"     ))
			.update("tax_yn"        , "1"                            )
			.update("upt_nm"     , arg.getParameter("upt_nm"  ))
			.update("upt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
			.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
		;

		data.attach(Action.update);
		
		data.execute();
		return null ;
	}

	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {
		
		String tax_no = arg.getParamText("tax_no");
//		System.out.println("=========="+tax_no);
		String gbn = tax_no.substring(14);
		
		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select 																		") 
			.query("	   a.tax_no   		as inv_no											") /* 계산서번호 */
			.query("	,  a.tax_dt   		as inv_dt											") /* 발행일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.biz_addr_1      as send_biz_addr_1   								") /* 공급자 주소 */
			.query("	,  b.biz_addr_2   	as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_type    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  a.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  a.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  a.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  a.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  a.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  a.biz_addr_1	    as recv_biz_addr_1   								") /* 공급받는자 주소 */
			.query("	,  a.biz_addr_2   	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  a.biz_type   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  a.biz_type  	as recv_biz_types 									") /* 공급받는자 종목 */
			.query("	,  a.tax_dt			as crt_dttm 										") /* 발행일자 */

//			.query("	, a.charge    		as charge 											") /* 배송료 */
//			.query("	, a.qty 			as qty 												") /* 수량 */
//			.query("	, c.npay_amt 		as npay_amt 											") /* 현미수 */
//			.query("	, c.vaccount_no 	as vaccount 										") /* 입금정보 */
//			.query("	, a.req_msg 		as reg_msg  										") /* 요청메모 */
			.query("	, a.pay_gb    		as pay_gb 											") /* 청구구분  1:영수, 2:청구 */
			.query("    , b.stamp_url		as stamp_url										") /* 직인 이미지 URL */
		;
		
		if("0".equals(gbn)){
			data.param
				.query("	, a.sply_amt - a.tax_free	as sply_amt		 						") /* 공급가 */
				.query("	, a.tax  					as tax 									") /* 세액 */
				.query("	, a.taxation 				as amount 								") /* 계 */
				.query(" from sale_taxbill a													")
				.query("	  join store b on a.stor_id = b.stor_id							")
				.query("where a.taxation_no = :tax_no " 			, tax_no					)
			;
		} else if("1".equals(gbn)){
			data.param
				.query("	, a.tax_free				as sply_amt		 						") /* 공급가 */
				.query("	, 0 	 					as tax 									") /* 세액 */
				.query("	, a.tax_free 				as amount 								") /* 계 */
				.query(" from sale_taxbill a													")
				.query("	  join store b on a.stor_id = b.stor_id							")
				.query("where a.tax_free_no = :tax_no " 			, tax_no					)
			;
		}
		
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select 																			")
				.query(" 		1				as seq_dsp 												") /* 항번 */
				.query("	,   1	 			as qty 													") /* 수량 */
//				.query("	,   b.item_sc   	as item_sc 												") /* 단축코드 */
//				.query("	,   a.item_Cd   	as item_code 												") /* 코드 */
//				.query("	,   (select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
//				.query("	,   a.price 		as price 												") /* 단가 */
			;
			if("0".equals(gbn)){
				data.param
					.query("	, a.taxation_item			as item_name		 						") /* 품목명 */
					.query("	, a.sply_amt - a.tax_free	as sply_amt		 						") /* 공급가 */
					.query("	, a.tax  					as tax 									") /* 세액 */
					.query("	, a.taxation 				as amount 								") /* 계 */
					.query(" from sale_taxbill a													")
					.query("where a.taxation_no = :tax_no " 			, tax_no					)
				;
			} else if("1".equals(gbn)){
				data.param
					.query("	, a.tax_free_item			as item_name		 						") /* 품목명 */
					.query("	, a.tax_free				as sply_amt		 						") /* 공급가 */
					.query("	, 0 	 					as tax 									") /* 세액 */
					.query("	, a.tax_free 				as amount 								") /* 계 */
					.query(" from sale_taxbill a													")
					.query("where a.tax_free_no = :tax_no " 			, tax_no					)
				;
			}
				
			info.get(0).put("product", data.selectForMap() );
		} 
		
		return info ;
	}
	
//	/**
//	 *
//	 * @param arg
//	 * @return
//	 * @throws Exception
//	 */
//	public SqlResultMap setListerInvoice(HttpRequestArgument arg) throws Exception {
//
//		DataMessage data = arg.newStorage("POS");
//		
//		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
////		String taxhosting = arg.getParamText("taxdb_id");
////		String tax_chk = arg.getParamText("tax_chk");
//		String pay_gb = arg.getParamText("pay_gb");
//	
//		String inv_no[] = new String[map.size()];
//		int idx = 0;
//		String serialnum_taxation = "";
//		String serialnum_tax = "";
////		String issue_gb = "";
//		String businesstype = "";
////		boolean ifChk = false;
//		
//		for (SqlResultRow row:map) {
//			inv_no[idx++] = row.getParamText("inv_no");
//		}
//		
////		if(!"".equals(taxhosting) && "Y".equals(tax_chk)) {
////			issue_gb = "1";
////			ifChk = true;
////		} else if ("E".equals(tax_chk)){
////			issue_gb = "2";
////		} else {
////			issue_gb = "0";
////		}
////		
//		if("1".equals(pay_gb)){
//			businesstype = "영수";
//		} else {
//			businesstype = "청구";
//		}
//		
//		
////		String pubDate = arg.getParamText("year") + arg.getParamText("month") + arg.getParamText("day");
//
//		data.param
//			.table("sale_taxbill")
//			.where("where tax_no  = :tax_no  " )
//			.insert("corp_id"      , arg.fixParameter("corp_id"   ))
//			.insert("hq_id"      , arg.fixParameter("hq_id"   ))
//			.insert("stor_grp"      , arg.fixParameter("stor_grp"   ))
//			.insert("stor_id"      , arg.fixParameter("stor_id"   ))
//			.unique("tax_no"        , arg.fixParameter("tax_no"     ))
////			.insert("tax_dt"        , arg.getParameter("inv_dt"     )) // 계산서 발행일
//			.insert("tax_dt"        , new SqlParamText("to_char(sysdate, 'yyyymmdd')")) // 계산서 발행일
////			.insert("tax_gb"        , issue_gb                       ) // 0 : 일반계산서, 1 : 전자세금계산서, 2 : esero국세청양식
//			.insert("tax_gb"        , arg.getParameter("tax_gb"     )) // 0 : 일반계산서, 1 : 전자세금계산서, 2 : esero국세청양식
//			.insert("inv_work_id"   , arg.getParameter("inv_work_id"))
//			.insert("inv_dept_id"   , arg.getParameter("inv_dept_id"))
//			.insert("inv_usr_id"   , arg.fixParameter("inv_usr_id"))
////			.insert("issue_dt"      , pubDate                        ) // 계산서 발행일
//			.insert("issue_dt"      , arg.fixParameter("pubDate"    )) // 계산서 작성일
//			.insert("pay_gb"        , arg.fixParameter("pay_gb"     )) // 영수 : 1, 청구: 2
//			.insert("cust_grp"       , arg.getParameter("cust_grp"    ))
//			.insert("cust_id"       , arg.getParameter("cust_id"    ))
//			.insert("cust_nm"       , arg.getParameter("cust_nm"    ))
//			.insert("mmb_id"       , arg.getParameter("mmb_id"    ))
//			.insert("mmb_nm"       , arg.getParameter("mmb_nm"    ))
//			.insert("biz_no"        , arg.getParameter("biz_no"     ))
//			.insert("biz_nm"        , arg.getParameter("biz_nm"     ))
//			.update("biz_email"     , arg.getParameter("biz_email"  ))
//			.insert("biz_type"      , arg.getParameter("biz_type"   ))
//			.insert("biz_type"     , arg.getParameter("biz_type"  ))
//			.insert("biz_owner"     , arg.getParameter("biz_owner"  ))
//			.insert("biz_zip_cd"  	, arg.getParameter("biz_zip_cd" ))
//			.insert("biz_addr_1"     , arg.getParameter("biz_addr_1"  ))
//			.insert("biz_addr_2"     , arg.getParameter("biz_addr_2"  ))
//			.insert("tax_free"      , arg.getParameter("tax_free"   ))
////			.insert("taxation"      , arg.getParameter("taxation_amount"   ))
////			.insert("sply_amt"      , arg.getParameter("taxation_subtotal" ))
////			.insert("tax"           , arg.getParameter("taxation_tax"      ))
////			.insert("amount"        , arg.getParameter("taxation_amount"   ))
//			.insert("taxation"      , arg.getParameter("taxation"   ))
//			.insert("sply_amt"      , arg.getParameter("sply_amt"   ))
//			.insert("tax"           , arg.getParameter("tax"        ))
//			.insert("amount"        , arg.getParameter("amount"     ))
////			.insert("taxation_unit" , arg.getParameter("user_memo"  ))
////			.update("tax_free_unit" , arg.getParameter("unit_spec"  ))
//
//			.update("row_clos"     , arg.getParameter("row_clos"  ))
//			.update("row_sts"     , arg.getParameter("row_sts"  ))
//			.update("upt_nm"     , arg.getParameter("upt_nm"  ))
//			.update("upt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
//			.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//			.insert("crt_nm"     , arg.getParameter("crt_nm"  ))
//			.insert("crt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
//			.insert("crt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
////			.update("taxation_no"   , arg.fixParameter("tax_no"     )+"0")
////			.update("taxation_no"   , serialnum_taxation)
////			.update("taxation_item" , arg.getParameter("taxation_item_name"  ))
////			.update("taxation_spec" , arg.getParameter("taxation_unit_spec"  ))
////			.update("taxation_sts"  , "0000" )
////			.update("taxation_result"  , "" )
//		;
//		
//		if(!"".equals(arg.getParamText("tax")) && !"0".equals(arg.getParamText("tax"))){
//			serialnum_taxation = arg.getParamText("tax_no") + "0";
//			data.param
//				.update("taxation_no"   , serialnum_taxation)
//				.update("taxation_item" , arg.getParameter("taxation_item_name"  ))
//				.update("taxation_spec" , arg.getParameter("taxation_unit_spec"  ))
//				.update("taxation_sts"  , "0000" )
////				.update("taxation_result"  , "" )
//			;
//		}
//
//		if(!"".equals(arg.getParamText("tax_free")) && !"0".equals(arg.getParamText("tax_free"))){
//			serialnum_tax = arg.getParamText("tax_no") + "1";
//			data.param
//				.update("tax_free_no"   , serialnum_tax)
//				.update("tax_free_item" , arg.getParameter("tax_item_name"  ))
//				.update("tax_free_spec" , arg.getParameter("tax_unit_spec"  ))
//				.update("tax_free_sts"  , "0000")
////				.update("tax_free_result"  , "")
//			;
//		}
//		
//		data.attach(Action.insert);
//		
////		if(ifChk && !"".equals(serialnum_taxation)) {
////			data.param
////				.table("tsmiletax")
////				//.where("where serialnum  = :tax_no  " )
////				.insert("arum_bonsa_id"    , arg.getParameter("hq_id"   ))
////				.insert("arum_stor_id"    , arg.getParameter("stor_id"   ))
////				.insert("arum_issue_no"    , arg.getParameter("tax_no"   ))
////				.insert("arum_issue_gb"    , "0")
////				.insert("arum_lintener"    , new SqlParamText("date_format(now(),'%Y%m%d%H%i%s')"))
////				.update("arum_agent_gb"    , "7")
////				.insert("serialnum"        , serialnum_taxation)
////				.insert("pubtype"          , "T")
////				.insert("tax_state"        , "N")
////				.insert("doctype"          , "0101")
//////				.insert("modify_code"      , arg.getParameter(""   ))
//////				.insert("s_a_name"         , arg.getParameter("snd_biz_nm"   ))
//////				.insert("s_a_email"        , arg.getParameter("snd_biz_email"   ))
////				.update("r_a_name"         , arg.getParameter("mmb_nm"   ))
////				.update("r_a_email"        , arg.getParameter("biz_email"   ))
//////				.insert("publicdate"       , pubDate)
////				.insert("businesstype"     , businesstype)
////				.insert("s_compname"       , arg.getParameter("snd_biz_nm"   ))
////				.insert("s_compnum"        , arg.getParameter("snd_RegNo"   ))
////				.insert("s_classification" , arg.getParameter("snd_biz_cond"   ))
////				.insert("s_type"           , arg.getParameter("snd_biz_types"   ))
////				.insert("s_ceo"            , arg.getParameter("snd_biz_owner"   ))
////				.insert("s_address"        , arg.getParameter("snd_biz_addr"   ))
////				.update("r_compname"       , arg.getParameter("biz_nm"   ))
////				.update("r_compnum"        , arg.getParameter("rcv_RegNo"   ))
////				.update("r_classification" , arg.getParameter("biz_type"   ))
////				.update("r_type"           , arg.getParameter("biz_type"   ))
////				.update("r_ceo"            , arg.getParameter("biz_owner"   ))
////				.update("r_address"        , arg.getParameter("biz_addr"   ))
////				.insert("price"            , arg.getParameter("taxation_subtotal"   ))
////				.insert("tax"              , arg.getParameter("taxation_tax"   ))
//////				.insert("itemdate1"        , pubDate)
////				.insert("itemname1"        , arg.getParameter("taxation_item_name"   ))
////				.insert("itemprice1"       , arg.getParameter("taxation_subtotal"   ))
////				.insert("itemtax1"         , arg.getParameter("taxation_tax"   ))
////				.update("state"            , "N")
////				.update("srtype"           , "S")
////				.update("nts_send_state"   , "N")
////				.update("nts_send_gb"      , "N")
////				.update("nts_result_code"  , "N")
////				
////		   ;
//////		   data.attach(Action.insert , taxhosting ); 	   
////		}
//
////		if(ifChk && !"".equals(serialnum_tax)) {
////			data.param
////			.table("tsmiletax")
////			//.where("where serialnum  = :tax_no  " )
////			.insert("arum_bonsa_id"    , arg.getParameter("hq_id"   ))
////			.insert("arum_stor_id"    , arg.getParameter("stor_id"   ))
////			.insert("arum_issue_no"    , arg.getParameter("tax_no"   ))
////			.insert("arum_issue_gb"    , "1")
////			.insert("arum_lintener"    , new SqlParamText("date_format(now(),'%Y%m%d%H%i%s')"))
////			.update("arum_agent_gb"    , "7")
////			.insert("serialnum"        , serialnum_tax)
////			.insert("pubtype"          , "T")
////			.update("tax_state"        , "N")
////			.insert("doctype"          , "0101")
//////				.insert("modify_code"      , arg.getParameter(""   ))
//////				.insert("s_a_name"         , arg.getParameter("snd_biz_nm"   ))
//////				.insert("s_a_email"        , arg.getParameter("snd_biz_email"   ))
////			.update("r_a_name"         , arg.getParameter("mmb_nm"   ))
////			.update("r_a_email"        , arg.getParameter("biz_email"   ))
////			.insert("publicdate"       , pubDate)
////			.insert("businesstype"     , businesstype)
////			.insert("s_compname"       , arg.getParameter("snd_biz_nm"   ))
////			.insert("s_compnum"        , arg.getParameter("snd_biz_no"   ))
////			.insert("s_classification" , arg.getParameter("snd_biz_cond"   ))
////			.insert("s_type"           , arg.getParameter("snd_biz_types"   ))
////			.insert("s_ceo"            , arg.getParameter("snd_biz_owner"   ))
////			.insert("s_address"        , arg.getParameter("snd_biz_addr"   ))
////			.update("r_compname"       , arg.getParameter("biz_nm"   ))
////			.update("r_compnum"        , arg.getParameter("biz_no"   ))
////			.update("r_classification" , arg.getParameter("biz_type"   ))
////			.update("r_type"           , arg.getParameter("biz_type"   ))
////			.update("r_ceo"            , arg.getParameter("biz_owner"   ))
////			.update("r_address"        , arg.getParameter("biz_addr"   ))
////			.insert("price"            , arg.getParameter("tax_subtotal"   ))
////			.insert("tax"              , arg.getParameter("tax_tax"   ))
////			.insert("itemdate1"        , pubDate)
////			.insert("itemname1"        , arg.getParameter("tax_item_name"   ))
////			.insert("itemprice1"       , arg.getParameter("tax_subtotal"   ))
////			.insert("itemtax1"         , arg.getParameter("tax_tax"   ))
////			.update("state"            , "N")
////			.update("srtype"           , "S")
////			.update("nts_send_state"   , "N")
////			.update("nts_send_gb"      , "N")
////			.update("nts_result_code"  , "N")
////			
////			;
////			data.attach(Action.insert , taxhosting ); 	   
////		}
//		
//		data.param
//			.table("sale_mst")
//			.where("where inv_no in (:inv_no) ", inv_no )
//			.update("tax_no"        , arg.getParameter("tax_no"     ))
//			.update("tax_dt"        , arg.getParameter("inv_dt"     ))
//			.update("tax_yn"        , "1"                            )
//			.update("upt_nm"     , arg.getParameter("upt_nm"  ))
//			.update("upt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
//			.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
//		;
//
//		data.attach(Action.update);
//		
//		data.execute();
//		return null ;
//	}

}
