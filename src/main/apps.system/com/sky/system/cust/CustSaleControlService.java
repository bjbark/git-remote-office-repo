package com.sky.system.cust;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class CustSaleControlService extends DefaultServiceHandler{

	/**
	 *
	 * @param http
	 * @return\
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id");
		String find_name = arg.getParamText("find_name");

		String dt_gb = arg.getParamText("dt_gb" ); // 날짜. 0: 전체, 1:등록일, 2.수정일
		String fr_dt = arg.fixParamText("fr_dt" );
		String to_dt = arg.fixParamText("to_dt" );

		String balance_gb = arg.fixParamText("balance_gb" ); // 미수금 여부 true : 미수존재

		String[] cust_gb = arg.getParamCast("cust_gb", String[].class);


		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(t1.npay_amt) as npay_amt  ")
		;
		data.param // 쿼리문  입력

			.query("select t1.owner_id     , t1.cust_id  , t1.cust_nm  , t1.cust_sts , t1.owner_nm 			")
			.query("    ,  t1.colt_schd_type  , t1.colt_schd_term											")
			.query("    ,  t1.balance_limit, t1.npay_amt													")
			.query("    ,  t1.user_memo    , t1.sts_memo , t1.salesman_id  , t1.salesman_nm					")
		;
		data.param
			.where("  from (																				")
			.where("     select b.owner_id     , a.cust_id , b.cust_nm  , b.cust_sts 						")
			.where("	    , (select stor_nm from tore where stor_id = b.owner_id) owner_nm 				")
			.where("	    ,  b.colt_schd_type  , b.colt_schd_term 										")
			.where("        ,  c.balance_limit, sum( a.npay_amt  ) as npay_amt 								")
			.where("        ,  c.user_memo    , b.sts_memo , c.salesman_id 									")
			.where("        ,  (select emp_nm from usr_mst 													")
			.where("                   where stor_grp = c.stor_grp and emp_id = c.salesman_id) as salesman_nm ")
			.where("      from  cust_stor  a 																")
			.where("            join cust_mst b  on b.cust_id  = a.cust_id									")
			.where("       	    join cust_stor c on c.stor_id = b.owner_id and c.cust_id = a.cust_id		")
			.where("	 where  a.stor_grp	    =	:stor_grp   " , arg.fixParameter("stor_grp" 	))
			.where("       and  b.cust_id   	= 	:cust_id    " , arg.getParameter("cust_id"))
			.where("       and  b.cust_sts  	= 	:cust_sts   " , arg.getParameter("cust_sts"))

			.where("	   and  a.clss_1 		= :clss_1       " , arg.getParameter("clss_1"  ))
			.where("	   and  a.clss_2 		= :clss_2       " , arg.getParameter("clss_2"  ))
			.where("	   and  a.clss_3 		= :clss_3       " , arg.getParameter("clss_3"  ))
			.where("	   and  a.clss_4 		= :clss_4       " , arg.getParameter("clss_4"  ))
			.where("	   and  a.clss_5 		= :clss_5       " , arg.getParameter("clss_5"  ))
			.where("	   and  a.clss_6 		= :clss_6       " , arg.getParameter("clss_6"  ))
			.where("	   and  b.cust_nm 	like %:find_name% 	" , find_name , "1".equals( search_id )) // 거래처명
			.where("	   and  b.cust_id 	like %:find_name% 	" , find_name , "2".equals( search_id )) // 거래처코드
			.where("	   and  b.cust_sts  	= :cust_sts     " , arg.getParameter("cust_sts" )) // 거래상태가 출하정지
			.where("	   and  b.owner_id  	= :owner_id     " , arg.getParameter("owner_id" )) // 사업장
			.where("	   and  b.cust_gb in (:cust_gb )    	" , cust_gb ,( cust_gb.length > 0) )// 거래처 구분
			.where("	   and  a.crt_dttm  between :fr_dt 		" , fr_dt + "000000" , "1".equals( dt_gb ) ) // 등록일
			.where("                        	 and :to_dt 	" , to_dt + "235959" , "1".equals( dt_gb ) ) // 등록일
			.where("	   and  a.upt_dttm  between :fr_dt 		" , fr_dt + "000000" , "2".equals( dt_gb ) ) // 수정일
			.where("                        	 and :to_dt 	" , to_dt + "235959" , "2".equals( dt_gb ) ) // 수정일
			.where("	   and  b.price_no 		= :price_no 	" ,  arg.getParameter("price_no" ))
			.where("	   and  a.npay_amt  	<> :npay_amt   	" , 0 , "true".equals( balance_gb )) // 미수금 있을 경우
			.where("	   and  a.row_sts 	= :row_sts 			" ,  arg.getParamText("row_sts" )) // 사용여부
			.where("	   and  a.row_sts 	< 2           												")

			.where("     group by a.cust_id, b.cust_nm, b.cust_sts , b.owner_id , c.balance_limit   		")
			.where("         ,  c.user_memo  , b.sts_memo   , b.colt_schd_type  , b.colt_schd_term				")
			.where("         ,  c.stor_grp	 , c.salesman_id												")
			.where("       ) t1					 															")
			.where(" order by t1.cust_nm		 															")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1),sort );
		}
	}



	/**
	 *
	 * @param http
	 * @return\
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize , sum(a.taxation) as taxation , sum(a.tax) as tax   		")
			.total("      , sum(a.amount) as amount , sum(a.payment) as payment  , sum(a.npay_amt) as npay_amt")
		;
		data.param // 쿼리문  입력

			.query("select a.stor_id , (select stor_nm from stor where stor_id = a.stor_id) as stor_nm 	")
			.query("  	 , a.inv_dt   , a.inv_no   , a.inv_work_id , a.pay_dt 									")
			.query("     , a.cust_id  , a.cust_nm  , a.taxation    , a.tax , a.amount  , a.payment  , a.npay_amt ")
			.query("     , a.salesman_id 																		")
			.query("     , (select emp_nm from usr_mst where emp_id = a.salesman_id) as salesman_nm		 	")
		;
		data.param
			.where("from sale_mst a 																	")
			.where("  where a.stor_grp 	= :stor_grp     			" 	, arg.fixParameter("stor_grp" 	))
			.where("    and a.cust_id 	= :cust_id     			  	" 	, arg.fixParameter("cust_id" 	))
			.where("    and a.npay_amt <> 0 																")
			.where("  order by a.inv_dt , a.inv_no		 												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows , (page==1), sort );
		}
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);// .request.getParam("master" ,SqlResultRow.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

					data.param
					.table("cust_mst")
					.where("where cust_id  = :cust_id  " )
					//
					.unique("cust_id"       , row.fixParameter("cust_id"         ))

					.update("cust_sts"      , row.getParameter("cust_sts"        ))
					.update("sts_memo"      , row.getParameter("sts_memo"         ))

					.update("upt_id" 	    , row.getParameter("upt_id"		))
					.update("upt_ip"   	    , new SqlParamText("'" + arg.remoteAddress + "'"))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
					;data.attach();
		}
		data.execute();
		return null ;
	}

}