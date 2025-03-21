package com.sky.system.cust;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class CustArListService  extends DefaultServiceHandler{

	/**
	 * 
	 * @param http
	 * @return
	 * @throws Exceptionarlist
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		
		DataMessage data = arg.newStorage();  
		data.param // 쿼리문  입력  
			.query("select a.hq_id         	,  a.stor_grp   , a.cust_nm ")
			.query("   ,   a.tab_member_list  	,  a.company    , a.method_bill ")
			.query("   ,   a.day_bill         	,  a.ar_limit   ")
			.query("   ,   a.curr_ar_amount   	,  a.amount_pay  ")
			.query("   ,   a.man_sales    	  	,  a.tell_desc  ")
			.query("   ,   a.date_last_tell  	 ,  a.date_schedule_bill  ")
			.query("   ,   a.date_schedule_tell  ,  a.user_memo , a.row_sts  ")									
			
			.query("from   cust_arlist a")
			.query("where  a.hq_id  = :hq_id  " , arg.fixParameter("hq_id"  ) )
			.query("and    a.stor_grp  = :stor_grp  " , arg.getParameter("stor_grp"  ) )
			.query("and    a.row_sts < 2" )
		;
	    return new SqlResultMap(); // data.selectForMap();
	}
	
}

