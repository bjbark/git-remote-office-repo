package com.sky.system.sale;

import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;

@Service
public class SaleTaxListService extends DefaultServiceHandler {

	
	/*
	 * 매출 내역 조회(eSero 제외)
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page , int rows,String sort, String gbn) throws Exception {
		
		String date_gb = arg.fixParamText("date_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.total("select count(1) as maxsize  , sum(st.amount) as amount,  sum(st.sply_amt) as sply_amt , sum(st.tax) as tax, sum(st.tax_free) as tax_free ")
		;
		data.param // 쿼리문  입력
//			.query(" select s.stor_nm as snd_stor_nm, st.tax_dt, st.tax_no, st.sply_amt, st.tax, st.amount,  ")
			.query(" select s.stor_nm as snd_stor_nm, st.tax_dt, st.tax_no, (st.sply_amt - st.tax_free) as sply_amt , st.tax, st.amount,  ")
			.query("	st.biz_nm, st.biz_no, st.biz_owner, st.mmb_nm, st.biz_email, ")
			.query("	st.taxation_no, st.taxation_sts, st.tax_free_no, st.tax_free_sts, s.biz_no as snd_biz_no, ")
			.query("	st.tax_gb, st.tax_free, st.print_yn, st.issue_dt, c.cust_nm ")
		;
		data.param
			.where(" from sale_taxbill st, store s, cust_mst c		")
			.where(" where st.stor_id = s.stor_id		 			")
			.where("   and st.cust_id = c.cust_id					")		
			.where("   and st.tax_dt between :fr_dt       	" , fr_dt , "1".equals( date_gb ))  // 발행일자 
			.where("   and 					 :to_dt       	" , to_dt , "1".equals( date_gb ))  // 발행일자 
			.where("   and st.issue_dt between :fr_dt       " , fr_dt , "2".equals( date_gb ))  // 작성일자 
			.where("   and 					:to_dt       	" , to_dt , "2".equals( date_gb ))  // 작성일자 
//			.where("   and st.cust_nm   like %:cust_nm%  	        " , arg.getParameter("cust_nm"  ))
			.where("   and st.cust_id       = :cust_id      " , arg.getParameter("cust_id"  ))
			.where("   and st.stor_grp      = :stor_grp     " , arg.fixParameter("stor_grp" 		))
			.where("   and st.stor_id      = :stor_id     " , arg.getParameter("stor_id" 		))
			.where("   and st.biz_no        = :biz_no       " , arg.getParameter("biz_no" 		    ))
//			.where("   and st.row_sts = 2 ")
			.where("   and st.row_sts = 0 				   										")
		;
		
		if(!"ALL".equals(gbn)){
			data.param.where(" and st.tax_gb = :gbn " , gbn);
		}

		data.param.where(" order by st.tax_dt desc		 														");
		
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}	
	}			

	/*
	 * 매출 내역 조회(eSero)	
	 */
	public SqlResultMap getSearchEsero(HttpRequestArgument arg, int page , int rows,String sort, String gbn) throws Exception {
		
		String date_gb = arg.fixParamText("date_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		DataMessage data = arg.newStorage("POS");
		
		data.param
			.total("select count(1) as maxsize  , sum(st.amount) as amount,  sum(st.sply_amt) as sply_amt , sum(st.tax) as tax, sum(st.tax_free) as tax_free ")
		;
		data.param // 쿼리문  입력
//			.query(" select s.stor_nm as snd_stor_nm, st.tax_dt, st.tax_no, st.sply_amt, st.tax, st.amount,  ")
//			.query(" select s.stor_nm as snd_stor_nm, st.tax_dt, st.tax_no, (st.sply_amt - st.tax_free) as sply_amt, st.tax, (st.sply_amt - st.tax_free + st.tax) as amount,  ")
			.query(" select s.biz_nm as snd_stor_nm, st.tax_dt, st.tax_no, (st.sply_amt - st.tax_free) as sply_amt, st.tax, (st.sply_amt - st.tax_free + st.tax) as amount,  ")
			.query("	substr(st.issue_dt, 7, 2) as tax_day, st.biz_nm, st.biz_no, st.biz_owner, st.mmb_nm, st.biz_email, ")
//			.query("	substr(st.tax_dt, 7, 2) as tax_day, st.biz_nm, st.biz_no, st.biz_owner, st.mmb_nm, st.biz_email, ")
			.query("	st.biz_type, st.biz_type, st.biz_addr_1 || st.biz_addr_2 as biz_addr, ")
			.query("	st.taxation_no, st.taxation_sts, st.tax_free_no, st.tax_free_sts, s.biz_no as snd_biz_no, ")
//			.query("	st.tax_gb, st.tax_free, st.print_yn, '0' || st.tax_gb as tax_gb_desc, ")
			.query("	st.tax_gb, st.tax_free, st.print_yn, '01' as tax_gb_desc, ")
			.query("	s.biz_owner as snd_biz_owner, s.biz_nm as snd_biz_nm, s.biz_type as snd_biz_cond, s.biz_type as snd_biz_types,  ")
			.query("	s.biz_state || s.biz_city || s.biz_dong || s.biz_addr_2 as snd_biz_addr, s.biz_email as snd_biz_email, ")
			.query("	replace(st.biz_no, '-', '') as biz_no_desc, replace(s.biz_no, '-', '') as snd_biz_no_desc,")
//			.query("	st.user_memo, st.taxation_item, '0' || st.pay_gb as pay_gb_desc, st.issue_dt, c.cust_nm ")
			.query("	s.stor_nm as user_memo, st.taxation_item, '0' || st.pay_gb as pay_gb_desc, st.issue_dt, c.cust_nm ")
		;
		data.param
			.where(" from sale_taxbill st, store s, cust_mst c	")
			.where(" where st.stor_id = s.stor_id		 			")
			.where("   and st.cust_id = c.cust_id					")
//			.where("   and st.tax_dt between :fr_dt       		" , arg.fixParameter("fr_dt"    ))
//			.where("   and :to_dt       			" , arg.fixParameter("to_dt"    ))
//			.where("   and st.issue_dt between :fr_dt       		" , arg.fixParameter("fr_dt"    ))
//			.where("   and :to_dt       			" , arg.fixParameter("to_dt"    ))
			.where("   and st.tax_dt between :fr_dt       	" , fr_dt , "1".equals( date_gb ))  // 발행일자 
			.where("   and 					 :to_dt       	" , to_dt , "1".equals( date_gb ))  // 발행일자 
			.where("   and st.issue_dt between :fr_dt       " , fr_dt , "2".equals( date_gb ))  // 작성일자 
			.where("   and 					:to_dt       	" , to_dt , "2".equals( date_gb ))  // 작성일자 
//			.where("   and st.cust_nm   like %:cust_nm%  	        " , arg.getParameter("cust_nm"  ))
			.where("   and st.cust_id       = :cust_id      " , arg.getParameter("cust_id"  ))
			.where("   and st.stor_grp      = :stor_grp     " , arg.fixParameter("stor_grp" 		))
			.where("   and st.stor_id      = :stor_id     " , arg.getParameter("stor_id" 		))
			.where("   and st.biz_no        = :biz_no       " , arg.getParameter("biz_no" 		    ))
			.where("   and st.row_sts = 0 				   										")
			.where("   and st.tax_gb = :gbn " , gbn)
			.where("   and st.sply_amt <> 0 							   										")
//			.where("   and st.sply_amt - st.tax_free > 0 				   										")
//			.where("   and st.row_sts = 2 ")
		;
		
		if (page == 0 && rows == 0){
			String[] key = arg.getParamCast("key", String[].class);
			if(key.length > 0){
				data.param.where("   and st.tax_no in (:key)       " , arg.getParamCast("key", String[].class));
			}
			setPrintYn(arg, gbn, key);
			data.param.where(" order by st.tax_dt desc		 														");
			return data.selectForMap(sort);
		} else {
			data.param.where(" order by st.tax_dt desc		 														");
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
			.query(" select si.inv_no, si.inv_dt, si.sply_amt, si.tax, si.tax_free, si.amount, si.cust_nm ")
			.query(" from sale_mst si														")
			.query(" where si.tax_no = :tax_no       		" , arg.fixParameter("tax_no"        ))
			.query("   and si.tax_yn = '1' 															")
			.query("   and si.row_sts = 0 				   										")
			.query(" order by si.inv_no desc														")
		;
		return data.selectForMap();	
	}		

	/**
	 * detail2 조회
	 * 
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetailSub(HttpRequestArgument arg) throws Exception {
		
		DataMessage data = arg.newStorage("POS");
		
		data.param
		.query(" select si.item_name, si.qty, si.sply_amt, si.tax, si.tax_free, si.amount, si.item_code ")
		.query(" from sale_dtl si														")
		.query(" where si.inv_no = :inv_no       		" , arg.fixParameter("inv_no"        ))
		.query("   and si.row_sts = 0 				   										")
		.query(" order by si.inv_no desc														")
		;
		return data.selectForMap();	
	}		
	
	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap reSendMail(HttpRequestArgument arg) throws Exception {

		String taxhosting = arg.getParamText("taxdb_id");
		String hq_id = arg.getParamText("hq_id");
		
		DataMessage data = new DataMessage(taxhosting);

		data.param
			.table("tsmiletax")
			.where("where arum_issue_no  = :tax_no  " , arg.fixParameter("tax_no"     ))
			.update("r_a_email"     , arg.fixParameter("biz_email"   ))
			.update("rs_email_gb"   , "Y")
		;
		
		data.attach(Action.update);
		
		data.param
			.table("sale_taxbill")
			.where("where tax_no = :tax_no  " , arg.fixParameter("tax_no"     ))
			.update("biz_email"        , arg.getParameter("biz_email"     ))
			.update("upt_nm"     , arg.getParameter("login_nm"  ))
			.update("upt_ip"     , new SqlParamText("'" + arg.remoteAddress + "'"))
			.update("upt_dttm"     , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
		;
	
		data.attach(Action.update, hq_id+".POS");
		
		data.execute();
		return null ;
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String getRemoteState(HttpRequestArgument arg, HttpMessage http) throws Exception {
		
		String[] key = arg.getParamCast("key", String[].class);
		String snd_regno = arg.getParamText("send_reg_no");
		String rcv_regno = arg.getParamText("recv_reg_no");
		String dmName = arg.getParamText("taxdb_id");
		String status = "";
		String rtnStr = "";
		String paramStr = "";
		String ntsStatus = "N";
		
		DataMessage data = new DataMessage(dmName);
		
		for(int i = 0 ; i <key.length ; i++){
			data.param
				.query(" select nts_send_state	")
				.query(" from tsmiletax			")
				.query(" where serialnum = :key " , key[i])
			;
			
			for(SqlResultRow row:data.selectForMap()){
				ntsStatus = row.getParameter("nts_send_state").toString();
			}
			
			
//			System.out.println("ntsStatus:::::::::::::" + ntsStatus);
			
			paramStr = "submitType=remoteState&s_compnum=" + snd_regno + "&r_compnum=" + rcv_regno + "&serialnum=" + key[i];
			
			String rtnVal = http.urlRequester("http://test.smileedi.com/Dti210100.do" , paramStr , Charset.forName("euc-kr"));
			
//			System.out.println("rtnVal:::::::::::::" + rtnVal);
//			System.out.println("ntsStatus:::::::::::::" + ntsStatus);
			
			Pattern pattern = Pattern.compile("(======MESSAGE SUCCESS======)(======MESSAGE START======)(상태:)(.)(======MESSAGE END======)");
			Matcher matcher = pattern.matcher(rtnVal);       
			
			boolean isReadPass = matcher.find();
			
			if(isReadPass){ // 읽기 성공
//				System.out.println("통과");
				status = matcher.group(4);
//				System.out.println(status);
			} else {
//				System.out.println("실패");
			}
			
			// 효성쪽에서 값을 받아온게 O,G,X,N 이고 국세청 전송상태가 N일경우 succes
			if(("O".equals(status) || "G".equals(status) || "X".equals(status)|| "N".equals(status)) && "N".equals(ntsStatus)){
				rtnStr = "succes";
			} else {
				rtnStr = "false";
				break;
			}
			
		}
		
//		System.out.println("rtnStr:::::::::::::::"+rtnStr);
		
		return rtnStr;
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String getRemoteCancel(HttpRequestArgument arg, HttpMessage http) throws Exception {
		
		String[] key = arg.getParamCast("key", String[].class);
		String snd_regno = arg.getParamText("send_reg_no");
		String rcv_regno = arg.getParamText("recv_reg_no");
		String tax_no = arg.getParamText("tax_no");
		String successPattern = "(={6}MESSAGE SUCCESS={6})(={6}MESSAGE START={6})(발행취소 되었습니다\\.)(={6}MESSAGE END={6})";
		String rtnStr = "";
		String paramStr = "";
		
		DataMessage data = arg.newStorage("POS");
		
		for(int i = 0 ; i <key.length ; i++){
			
			paramStr = "submitType=remoteCancel&s_compnum=" + snd_regno + "&r_compnum=" + rcv_regno + "&serialnum=" + key[i];
			
			String rtnVal = http.urlRequester("http://test.smileedi.com/Dti210100.do" , paramStr , Charset.forName("euc-kr"));
			
//			System.out.println("rtnVal :::: " + rtnVal);
			
			boolean isReadPass = Pattern.compile(successPattern).matcher(rtnVal).matches();
			
			if(isReadPass){ // 읽기 성공
				rtnStr = "succes";
			} else {
				rtnStr = "false";
				break;
			}
			
		}
		
		if("succes".equals(rtnStr)){
			data.clear();
//			data.param
//				.table("sale_taxbill")
//				.where("where tax_no = :tax_no ", tax_no)
//			;
//			
//			data.attach(Action.delete);
			
			data.param
				.query(" update sale_taxbill ")
				.query(" set upt_nm = '"+arg.getParameter("upt_nm"  ).toString() + "', ")
				.query(" upt_ip = '"+arg.remoteAddress + "', ")
				.query(" upt_dttm = to_char(sysdate, 'yyyymmddhh24miss'), ")
				.query(" row_sts = 2 ")
				.query(" where tax_no = :tax_no " , tax_no )
			;
			data.attach(Action.direct);
			
			data.param
				.query(" update sale_mst ")
				.query(" set upt_nm = '"+arg.getParameter("upt_nm"  ).toString() + "', ")
				.query(" upt_ip = '"+arg.remoteAddress + "', ")
				.query(" upt_dttm = to_char(sysdate, 'yyyymmddhh24miss'), ")
				.query(" tax_no = '', ")
				.query(" tax_dt = '', ")
				.query(" tax_yn = '0' ")
				.query("where tax_no = :tax_no " , tax_no )
				;
			data.attach(Action.direct);
			
			data.execute();
		}
		
		return rtnStr;
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String setTaxCancel(HttpRequestArgument arg) throws Exception {
		
		String tax_no = arg.getParamText("tax_no");
		
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.query(" update sale_mst ")
			.query(" set upt_nm = '"+arg.getParameter("upt_nm"  ).toString() + "', ")
			.query(" upt_ip = '"+arg.remoteAddress + "', ")
			.query(" upt_dttm = to_char(sysdate, 'yyyymmddhh24miss'), ")
			.query(" tax_no = '', ")
			.query(" tax_dt = '', ")
			.query(" tax_yn = '0' ")
			.query("where tax_no = :tax_no " , tax_no )
		;
		data.attach(Action.direct);
		
//		data.param
//			.table("sale_taxbill")
//			.where("where tax_no = :tax_no ", tax_no)
//		;
//		data.attach(Action.delete);
		
		data.param
			.query(" update sale_taxbill ")
			.query(" set upt_nm = '"+arg.getParameter("upt_nm"  ).toString() + "', ")
			.query(" upt_ip = '"+arg.remoteAddress + "', ")
			.query(" upt_dttm = to_char(sysdate, 'yyyymmddhh24miss'), ")
			.query(" row_sts = 2 ")
			.query(" where tax_no = :tax_no " , tax_no )
		;
		data.attach(Action.direct);
		
		data.execute();
		
		return "SUCCES";
	}
	
	public void setPrintYn(HttpRequestArgument arg, String gbn, String[] key) throws Exception{
		
		DataMessage data = arg.newStorage("POS");
		
		data.param
			.table(" sale_taxbill												")
//			.where(" where tax_dt between :fr_dt       		" , arg.fixParameter("fr_dt"    ))
//			.where("   and :to_dt       			" , arg.fixParameter("to_dt"    ))
//			.where("   and cust_nm   like %:cust_nm%  	        " , arg.getParameter("cust_nm"  ))
			.where(" where stor_grp      = :stor_grp     " , arg.fixParameter("stor_grp" 		))
			.where("   and stor_id      = :stor_id     " , arg.getParameter("stor_id" 		))
			.where("   and tax_gb = :gbn " , gbn)
		;
		if(key.length > 0){
			data.param.where(" and tax_no in (:key)       " , arg.getParamCast("key", String[].class));
		}
		data.param
			.update("upt_nm"         , arg.getParameter("upt_nm"  ))
			.update("upt_ip"   	    , arg.remoteAddress                      )
			.update("upt_dttm"         , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
			.update("print_yn"          , "1")
		;
		
		data.attach(Action.update);
		
		data.execute();
	}
}
