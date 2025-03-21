package com.sky.system.counsel.calllist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class CallListService  extends DefaultServiceHandler {
	final Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private SeqListenerService seqlistener;

	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");


		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String dt_gb  = arg.fixParamText("dt_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] call_gb  = arg.getParamCast("call_gb"  , String[].class);



		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  hq_id,		stor_grp,		stor_id,		small_grp,		small_id,				")
			.query("        call_tp,		call_cl,		call_gb,		call_gp,		call_no,	call_dt,	")
			.query("        call_tm,		send_dt,		send_tm,		reply_req_yn,	reply_dt,	reply_tm,	")
			.query(" 		call_sts,   	cust_grp,		cust_id,		cust_nm,								")
			.query("		mmb_id,		mmb_nm,    	memb_login,		memb_hp_no,							")
			.query("		memb_state,		memb_city,    	memb_dong,		memb_zip_cd,	memb_addr_1,	memb_addr_2,	")
			.query("		clss_1,		clss_2,    	clss_3,		clss_4,		clss_5,				")
			.query("		inv_no,			cont_cont,    	reply_contents,	call_user_nm,							")
			.query("		divi_user_nm,	regi_user_nm,  	send_user_nm,	comp_user_nm,							")
			.query("		user_memo,		sys_memo																")
		;
		data.param
			.where("from   call_info a ")

			.where("where  a.stor_id  = :stor_id       	" , arg.fixParameter("stor_id" ) )
			.where("and    a.stor_grp  = :stor_grp 	     	" , arg.fixParameter("stor_grp" ) )
			.where("and    a.wrhs_id  = :wrhs_id       	" , arg.getParameter("wrhs_id" ) )
			.where("and    a.call_dt between :fr_dt      	" , fr_dt , "1".equals( dt_gb ))
			.where("                     and :to_dt      	" , to_dt , "1".equals( dt_gb ))
			.where("and    a.reply_dt between :fr_dt     	" , fr_dt , "2".equals( dt_gb ))
			.where("                     and :to_dt      	" , to_dt , "2".equals( dt_gb ))
			.where("and    a.row_sts = 0               	" )
			.where("and    a.row_clos = :row_clos      	" , arg.getParameter("row_clos" )) // 마감여부  1:마감
			.where("and    a.cust_id   =   :cust_id      	" , arg.getParameter("cust_id" )) // 고객코드주문상태
			.where("and    a.call_sts  = :call_sts       	" , arg.getParameter("call_sts" ))
			.where("and    a.call_gb   in (:call_gb  )   	" , call_gb  ,( call_gb.length  > 0) ) // 주문상태
			.where("and    a.call_tp   = :call_tp        	" , arg.getParameter("call_tp" ))
			.where("and    a.call_cl   = :call_cl        	" , arg.getParameter("call_cl" ))
			.where("and    a.call_user_nm = :call_user_nm   " , arg.getParameter("call_user_nm" ))
			.where("and    a.inv_no   like :find_name%   	" , find_name , "1".equals( search_id )) // 주문번호
			.where("and    a.cust_nm  like %:find_name%  	" , find_name , "2".equals( search_id )) // 고객명
			.where("and    a.mmb_nm  like %:find_name%  	" , find_name , "3".equals( search_id )) // 회원명

			//.where("and    a.mmb_id   =  :mmb_id  " , arg.getParameter("mmb_id" )  )
			.where("and    a.row_sts = :row_sts 		" , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts 		" , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts <= 1					" 	)
			.where("order by call_dt desc , call_tm desc" 		)
		;
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1),sort);
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

        	data.param
		        .table("call_info")
		        .where("where call_no  = :call_no  " )
		        //
		        .unique("hq_id"                , row.fixParameter("hq_id"         ))
		        .unique("stor_grp"                , row.fixParameter("stor_grp"         ))
		        .unique("stor_id"                , row.fixParameter("stor_id"         ))
		        .update("small_grp"                 , row.getParameter("small_grp"          ))
  		        .update("small_id"                 , row.getParameter("small_id"          ))

                .update("call_tp"                 , row.getParameter("call_tp"          ))
                .update("call_cl"                 , row.getParameter("call_cl"          ))
                .update("call_gb"                 , row.getParameter("call_gb"          ))
                .update("call_gp"                 , row.getParameter("call_gp"          ))
                .update("call_no"                 , row.getParameter("call_no"          ))
                .update("call_dt"                 , row.getParameter("call_dt"          ))
				.update("call_tm"                 , row.getParamText("call_tm"          ))
				.update("send_dt"                 , row.getParamText("send_dt"          ))
				.update("send_tm"                 , row.getParamText("send_tm"          ))
				.update("reply_req_yn"            , row.getParamText("reply_req_yn"     ))
				.update("reply_dt"                , row.getParamText("reply_dt"         ))
				.update("reply_tm"                , row.getParamText("reply_tm"         ))

				.update("call_sts"                , row.getParamText("call_sts"         ))
				.update("cust_grp"                 , row.getParamText("cust_grp"          ))
				.update("cust_id"                 , row.getParamText("cust_id"          ))
  		        .update("cust_nm"                 , row.getParameter("cust_nm"          ))
  		        .update("mmb_id"                 , row.fixParameter("mmb_id"          ))
  		        .update("mmb_nm"                 , row.getParameter("mmb_nm"          ))
  		        .update("memb_login"              , row.getParameter("memb_login"       ))
  		        .update("memb_hp_no"             , row.getParameter("memb_hp_no"      ))
                .update("memb_state"              , row.getParameter("memb_state"       ))
                .update("memb_city"               , row.getParameter("memb_city"        ))
  		        .update("memb_dong"               , row.getParameter("memb_dong"        ))
  		        .update("memb_zip_cd"             , row.getParameter("memb_zip_cd"      ))
  		        .update("memb_addr_1"              , row.getParameter("memb_addr_1"       ))
  		        .update("memb_addr_2"              , row.getParameter("memb_addr_2"       ))
  		        .update("clss_1"                 , row.getParameter("clss_1"          ))
  		        .update("clss_2"                 , row.getParameter("clss_2"          ))
  		        .update("clss_3"                 , row.getParameter("clss_3"          ))
  		        .update("clss_4"                 , row.getParameter("clss_4"          ))
  		        .update("clss_5"                 , row.getParameter("clss_5"          ))
  		        .update("inv_no"                  , row.getParameter("inv_no"           ))
  		        .update("cont_cont"                , row.getParameter("cont_cont"         ))
  		        .update("reply_contents"          , row.getParameter("reply_contents"   ))
  		        .update("divi_user_nm"            , row.getParameter("divi_user_nm"     ))
  		        .update("regi_user_nm"            , row.getParameter("call_user_nm"     ))
  		        .update("send_user_nm"            , row.getParameter("send_user_nm"     ))
  		        .update("call_user_nm"            , row.getParameter("call_user_nm"     ))
  		        .update("comp_user_nm"            , row.getParameter("comp_user_nm"     ))
  		        .update("user_memo"               , row.getParameter("user_memo"        ))
  		        .update("sys_memo"               , row.getParameter("sys_memo"        ))
  		        .update("row_ord"               , row.getParameter("row_ord"        ))
  		        .update("row_sts"               , row.getParameter("row_sts"        ))
  		        .update("find_name"               , row.getParameter("find_name"        ))
  		        .update("upt_id"               , row.getParameter("upt_id"        ))
  		        .update("upt_ip"               , arg.remoteAddress )
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		        .insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

        	;data.attach(Action.modify);
		}
		data.execute();
		return null ;
	}

}