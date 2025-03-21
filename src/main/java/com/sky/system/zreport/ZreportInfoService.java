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
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ZreportInfoService extends DefaultServiceHandler {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	//지점
	public SqlResultMap getSpotPopup(HttpRequestArgument arg , int page , int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize " );
		data.param
		.query(" select 	corp_id	, hq_id	, stor_grp	, wareh_id	, stor_id	, stor_nm	, stor_id as edi	, biz_tel_no	, biz_fax_no	, biz_addr_1 ")
		.where(" from store ")
		.where(" where 1=1 ")
		.where(" and hq_id =  :hq_id "                       		,arg.fixParameter("hq_id" ))
		.where(" and stor_grp =  :stor_grp "                       		,arg.getParamText("stor_grp" ))
		.where(" and stor_nm like  %:class_nm% "                       ,arg.getParamText("class_nm" ))
		.where(" order by stor_id ");

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	//분류 대,중,소,세 분류 option 선택 쿼리
	public SqlResultMap getClassificationPopup(HttpRequestArgument arg , int page , int rows ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize 															");
		data.param
		.query(" select																						")
		.query(" hq_id , stor_grp , class_id , class_cd , class_nm							")
		.where(" from item_class 																		")
		.where(" where  1=1																				")
		.where(" and row_lvl = :gubun																		" ,arg.fixParameter("gubun" ))
		.where(" and class_nm like %:class_nm%															" ,arg.getParameter("class_nm" ));
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}

	//분류 부서
	public SqlResultMap getDeptPopup(HttpRequestArgument arg , int page , int rows ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize 					");
		data.param
		.query(" select 		corp_id ,		stor_grp ,		stor_id ,		dept_id ,		dept_cd ,		dept_nm 		")
		.where(" from 		dept_mst		 																									")
		.where(" where 1=1																														")
		.where(" and dept_nm like :manufacturer_nm% " 							,arg.getParameter("manufacturer_nm" ));
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}

	//영업담당
	public SqlResultMap getSaleManPopup(HttpRequestArgument arg , int page , int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize 					");

		data.param
		.query(" select 							")
		.query(" 		a.emp_id as emp_id ,					 ")
		.query(" 		a.emp_nm as emp_nm , ")
		.query(" 		a.dept_id as dept_id , ")
		.query(" 		c.dept_nm as dept_nm , ")
		.query(" 		a.jobcl_id as jobcl_id , ")
		.query(" 		b.jobcl_nm as jobcl_nm , ")
		.query(" 		a.stor_id as stor_id , ")
		.query(" 		d.stor_nm as stor_nm ")
		.where(" from usr_mst a ")
		.where(" 	join jobcl_mst b on (a.jobcl_id = b.jobcl_id) ")
		.where(" 	join dept_mst c on (a.dept_id = c.dept_id) ")
		.where(" 	join store d on (a.stor_id = d.stor_id) ")
		.where(" where 1=1 ")
		.where(" 	and a.emp_nm like :emp_nm% "	 ,arg.getParameter("emp_nm" ));

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}


	public SqlResultMap getSaleanalyticreport1(HttpRequestArgument arg , int page , int rows ) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																														")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( ID_COUNT ) 	as ID_COUNT ,																																											")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");


		data.param
		.query(" SELECT																																																			")
		.query("  	STORE_ID ,																																																	")
		.query("  	STORE_NM ,																																																")
		.query("  	ID_COUNT AS ID_COUNT ,																																									")
		.query("  	SALE_AMT  as sale_amt,																																										")
		.query("  	PO_AMT  as po_amt,																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																							")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");

		data.param
		.where("  FROM																																																			")
		.where("  		(																																																			")
		.where("  		SELECT /*+ INDEX(D PK_STORE)*/																																								")
		.where("  			A.STORE_ID ,																																														")
		.where("  			D.STORE_NM ,																																														")
		.where("  			SUM(B.QTY) AS QTY ,																																											")
		.where("  			COUNT( DISTINCT B.INV_NO ) AS ID_COUNT ,																																			")
		.where("  			SUM( B.AMOUNT ) AS SALE_AMT ,																																							")
		.where("  			SUM( B.PO_PRICE * B.QTY ) AS PO_AMT																																					")
		.where("  		FROM SALE_INFO A																																													")
		.where("  				JOIN SALE_ITEM B ON ( A.INV_NO = B.INV_NO )																																	")
		.where("  				left outer JOIN ITEM_INFO C ON ( B.ITEM_ID = C.ITEM_ID )																							")
		.where("  				JOIN STORE 		 D ON ( A.STORE_ID = D.STORE_ID )																															")
		.where("																																																						")
		.where("  				left outer join USER_INFO E ON ( A.salesman_id = E.USER_ID )																																")
		.where("  				left outer join item_class f on (c.class_id = f.class_id)																																			")
		.where("  				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																				")
		.where("  				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )																			")
		.where("  	WHERE	1=1																																															")
		.where("  	and A.INV_DT BETWEEN :fr_dt "																																 , arg.getParameter("fr_dt" ))
		.where("  	and :to_dt	"																																						 , arg.getParameter("to_dt"))
		.where("  	and a.stor_id = :stor_id " 																																	 , arg.getParameter("stor_id"))
		.where("  	and c.mfg_id = :manufacturer_id "																															 , arg.getParameter("manufacturer_id"))
		.where(" 	and c.vend_id = :vend_id "																																	 , arg.getParameter("vend_id"))
		.where(" 	and a.salesman_id = :inv_user_id "    																														 , arg.getParameter("inv_user_id"))
		.where(" 	and c.brand_id = :brand_id "																																	 , arg.getParameter("brand_id"))
		.where(" 	and E.dept_id = :departments_id "																															 , arg.getParameter("departments_id"))
		.where(" 	and f.class_id like :class_id%	"																															 	 , arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")

		.where("		and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */

		.where("  		GROUP BY																																																")
		.where("  			A.STORE_ID ,			D.STORE_NM																																							")
		.where("  		)																																																			");


		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}

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
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");


		data.param
		.query("  SELECT																																									")
		.query("  	GET_DATE(INV_DT ,'YYYY-MM-DD')  as inv_dt  ,																																								")
		.query("  	SALE_AMT  as sale_amt,																																										")
		.query("  	PO_AMT  as po_amt,																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																							")
		.query("  	ID_COUNT AS ID_COUNT ,																															")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");


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
		.where("  and a.row_sts = '0' 															")
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

	//매출이익율보고서 - 제품별 이익율
	public SqlResultMap getSaleanalyticreport3(HttpRequestArgument arg , int page , int rows ) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																								")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( qty ) 	as qty ,																																											")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");



		data.param
		.query("  SELECT																																													 	")
		.query("  	ITEM_ID , 																																										 	")
		.query("  	ITEM_SC , 																																												")
		.query("  	ITEM_NM , 																																												")
		.query("  	ITEM_SP , 																																												")
		.query("  	unt_qty ,  																																												")
		.query("  	UNIT_NM , 																																												")
		.query("  	REGEXP_SUBSTR(clss_desct, '[^>]+', 1,1) as cls1_nm , 																														")
		.query("  	REGEXP_SUBSTR(clss_desct, '[^>]+', 1,2) as cls2_nm , 																														")
		.query("  	REGEXP_SUBSTR(clss_desct, '[^>]+', 1,3) as cls3_nm , 																														")
		.query("  	REGEXP_SUBSTR(clss_desct, '[^>]+', 1,4) as cls4_nm , 																														")
		.query("  	CLASS_DS , 																																											")
		.query("  	VEND_ID , 																																												")
		.query("  	VEND_NM , 																																											")
		.query("  	SALE_AMT  as sale_amt,																																							")
		.query("  	PO_AMT  as po_amt,																																								")
		.query("  	QTY  as qty , 																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																				")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");

		data.param
		.where("  FROM 																																														")
		.where("  	( 																																															")
		.where("  	SELECT 																																													")
		.where("  		C.ITEM_ID , 																																									")
		.where("  		C.ITEM_SC , 																																										")
		.where("  		C.ITEM_NM , 																																										")
		.where("  		C.ITEM_SP , 																																										")
		.where("  		c.unt_qty ,																																											")
		.where("  		D.UNIT_NM , 																																										")
		.where("  		E.CLASS_DS , 																																										")
		.where("  		F.VEND_ID , 																																										")
		.where("  		F.VEND_NM , 																																										")
		.where("  		SUM(B.QTY) AS QTY , 																																							")
		.where("  		SUM( B.AMOUNT ) AS sale_AMT , 																																			")
		.where("  		SUM( B.PO_PRICE * B.QTY ) AS po_AMT 																																")
		.where("  	FROM SALE_INFO A 																																								")
		.where("  		JOIN SALE_ITEM B ON ( A.INV_NO = B.INV_NO ) 																														")
		.where("  		left outer JOIN ITEM_INFO C ON ( B.ITEM_ID = C.ITEM_ID  ) 																			")
		.where("  		left outer JOIN ITEM_UNIT D ON ( C.UNIT_ID = D.UNIT_ID ) 																													")
		.where("  		left outer JOIN ITEM_CLASS E ON ( C.CLASS_ID = E.CLASS_ID ) 																												")
		.where("  		left outer JOIN VEND_INFO F ON ( C.VEND_ID = F.VEND_ID ) 																													")
		.where(" 		left outer join USER_INFO G ON ( A.salesman_id = G.USER_ID )																												")

		.where("			left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																				")
		.where("			left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )																			")

		.where("  	WHERE 1=1 																																											")
		.where(" 			and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 			and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and G.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 		and E.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")
		.where("		and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */

		.where(" 	GROUP BY 																																												")
		.where("  		C.ITEM_ID ,C.ITEM_SC ,	C.ITEM_NM ,C.ITEM_SP ,D.UNIT_NM ,E.CLASS_DS ,F.VEND_ID ,F.VEND_NM ,c.unt_qty 								")
		.where("  	) 																																														");

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}

	}

	//매출이익율보고서 - 고객별 이익율
	public SqlResultMap getSaleanalyticreport4(HttpRequestArgument arg , int page , int rows) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																			")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( ID_COUNT ) 	as ID_COUNT ,																																										")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");


		data.param
		.query(" SELECT 																																														")
		.query(" 	cust_cd , 																																													")
		.query(" 	CUST_NM , 																																												")
//		.query(" 	VEND_ID , 																																													")
//		.query(" 	VEND_NM , 																																												")
		.query("  	SALE_AMT  as sale_amt,																																							")
		.query("  	PO_AMT  as po_amt,																																								")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																				")
		.query(" 		ID_COUNT AS ID_COUNT , 																																						")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");

		data.param
		.where(" FROM  ( 																																														")
		.where(" 	SELECT 																																														")

		.where(" 	D.cust_cd , 																																											")
		.where("		D.CUST_NM , 																																											")
		.where("		SUM( B.PO_PRICE * B.QTY ) AS po_AMT , 																																	")
		.where("		SUM( B.AMOUNT ) AS sale_AMT ,   																																			")
		.where("		COUNT( DISTINCT A.INV_NO ) AS ID_COUNT 																																")
		.where(" 	FROM SALE_INFO A 																																								")
		.where(" 	JOIN SALE_ITEM B ON ( A.INV_NO = B.INV_NO ) 																															")
		.where(" 	left outer JOIN ITEM_INFO C ON ( B.ITEM_ID = C.ITEM_ID ) 																	")
		.where(" 	left outer  JOIN CUST_INFO D ON ( A.CUST_ID = D.CUST_ID ) 																										")
		.where("		left outer JOIN VEND_INFO E ON ( C.VEND_ID = E.VEND_ID ) 																										")
		.where("		left outer join USER_INFO F ON ( A.salesman_id = F.USER_ID )																										")
		.where("		left outer join item_class G on (c.class_id = G.class_id)																													")

		.where("				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																")
		.where("				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )															")

		.where(" 	WHERE 1=1 																																											")
		.where(" 		AND A.QTY !=0 																																									")
		.where(" 			and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 			and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and F.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 		and G.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")
		.where("	 and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */

		.where(" 	GROUP BY  d.cust_cd , D.CUST_NM 																										")
		.where(" ) 																																																");



		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}

	}

	//매출이익율보고서 - 담당자별 이익율
	public SqlResultMap getSaleanalyticreport5(HttpRequestArgument arg , int page , int rows ) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																			")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( ID_COUNT ) 	as ID_COUNT ,																																											")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");


		data.param
		.query("select 																																															")
		.query("	user_cd , 																																												")
		.query("	emp_nm , 																																													")
		.query("	( sale_amt ) as sale_amt , 																																						")
		.query("	( po_amt ) as po_amt , 																																							")
		.query("	(sale_amt - po_amt) as profit, 																																					")
		.query("	( id_count) as id_count , 																																							")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");

		data.param
		.where("from  ( 																																														")
		.where("	select 																																														")
		.where("		isnull(d.user_cd,'미등록') as user_cd , 																																										")
		.where("		isnull(d.emp_nm,'미등록') as emp_nm , 																																											")
		.where("		count( distinct b.inv_no ) as id_count , 																																		")
		.where("		sum( b.amount ) as sale_amt , 																																					")
		.where("		sum( b.po_pri * b.qty ) as po_amt 																																			")
		.where("	from sale_mst a 																																											")
		.where("		join sale_dtl b on ( a.inv_no = b.inv_no ) 																																	")
		.where("		left outer join itm_mst c on ( b.item_idcd = c.item_idcd  ) 																								")
		.where("		left outer join usr_mst d on ( a.salesman_id = d.emp_id ) 																															")
		.where("		left outer join item_class g on (c.class_id = G.class_id)																																")

		.where("				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																				")
		.where("				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )																			")
		.where("	where 1=1 																																													")
		.where(" 		and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 		and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and d.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 		and G.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")
		.where("	 and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */

		.where("	group by 																																													")
		.where("		isnull(d.user_cd,'미등록') , isnull(d.emp_nm,'미등록')																																")
		.where("	) 																																																")	;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1)  );
		}

	}

	//매출이익율보고서 - 고객분류별 이익율
	public SqlResultMap getSaleanalyticreport6(HttpRequestArgument arg , int page , int rows) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize ,																																			")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( ID_COUNT ) 	as ID_COUNT ,																																											")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");


		data.param
		.query("select  																																														")
		.query("	cls1_id ,  																																													")
		.query("	cls2_id ,  																																													")
		.query("	cls3_id ,  																																													")
		.query("  	SALE_AMT  as sale_amt,																																										")
		.query("  	PO_AMT  as po_amt,																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																							")
		.query("	    id_count as id_count ,  																																						")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");

		data.param
		.where("from  (  																																														")
		.where("	select 																																")
		.where("		b.mst_itm_id , 																																												")
		.where("		(select converted from base_mst z where t4.cls1_id = z.bas_id)	as cls1_id , 																						")
		.where("		(select converted from base_mst z where t4.cls2_id = z.bas_id)	as cls2_id , 																						")
		.where("		(select converted from base_mst z where t4.cls3_id = z.bas_id)	as cls3_id , 																						")
		.where("		sum( b.po_pri * b.qty ) as po_amt , 																																			")
		.where("		sum( b.amount ) as sale_amt , 																																					")
		.where("		count( distinct a.inv_no ) as id_count 																																			")
		.where("	from 	sale_mst a 																																											")
		.where("		join sale_dtl b on ( a.inv_no = b.inv_no ) 																																	")
		.where("		left outer join itm_mst c on ( b.item_idcd = c.item_idcd  ) 																								")

		.where("		left outer join usr_mst e on ( a.salesman_id = e.emp_id )  																															")
		.where("		left outer join item_class g on (c.class_id = G.class_id) 																																")

		.where("				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																				")
		.where("				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )																			")

		.where("	where 1=1 																																													")
		.where(" 			and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 			and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and e.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 			and G.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")
		.where("	 and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */

		.where("	group by  b.mst_itm_id , t4.cls1_id , t4.cls2_id, t4.cls3_id 																															")
		.where(" )  																																																");
		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}

	//매출이익율보고서 - 제품분류별 이익율
	public SqlResultMap getSaleanalyticreport7(HttpRequestArgument arg , int page , int rows) throws Exception {
		String[] inv_work_id = arg.getParamCast("inv_work_id", String[].class);
		DataMessage data = arg.newStorage("POS");
		data.param

		.total("select count(1) as maxsize ,																																			")
		.total("	sum( SALE_AMT ) 	as SALE_AMT ,																																											")
		.total("	sum( po_amt ) 	as po_amt ,																																													")
		.total("	sum( SALE_AMT - PO_AMT ) 	as PROFIT ,																																								")
		.total("	sum( qty ) 	as qty ,																																											")
		.total("	round( decode (sum(sale_amt) ,0 ,0 , sum(po_amt) / sum(sale_amt) )*100,1) as profit_rate1 ,																			")
		.total("	round( decode (sum(sale_amt) ,0 ,0 ,  1-(sum(po_amt) / sum(sale_amt))  )*100,1) as profit_rate2																		");

		data.param
		.query("select  																																														")
		.query("	brcd_2 ,  																																												")
		.query("	item_sc ,  																																													")
		.query("	item_name ,  																																													")
		.query("	item_spec ,  																																													")
		.query("	unit_name ,  																																													")
		.query("	regexp_substr(clss_desct, '[^>]+', 1,1) as cls1_nm,  																																")
		.query("	regexp_substr(clss_desct, '[^>]+', 1,2) as cls2_nm,  																																")
		.query("	regexp_substr(clss_desct, '[^>]+', 1,3) as cls3_nm,  																																")
		.query("	regexp_substr(clss_desct, '[^>]+', 1,4) as cls4_nm ,  																															")
		.query("	vend_id ,  																																													")
		.query("	vend_nm ,  																																													")
		.query("	    qty  as qty ,  																																										")
		.query("  	SALE_AMT  as sale_amt,																																										")
		.query("  	PO_AMT  as po_amt,																																											")
		.query("  	SALE_AMT - PO_AMT AS PROFIT,																																							")
		.query("	round( decode (sale_amt ,0 ,0 , po_amt / sale_amt  )*100,1) as profit_rate1 ,																			")
		.query("	round( decode (sale_amt ,0 ,0 ,  1-(po_amt / sale_amt )  )*100,1) as profit_rate2																		");


		data.param
		.where("from  																																															")
		.where("	(  																																																")
		.where("	select  																																														")
		.where("		c.brcd_2 ,  																																											")
		.where("		c.item_sc ,  																																												")
		.where("		c.item_name , 																																											")
		.where("		c.item_spec ,  																																											")
		.where("		d.unit_name ,  																																											")
		.where("		e.clss_desct ,  																																											")
		.where("		f.vend_id ,  																																												")
		.where("		f.vend_nm ,  																																											")
		.where("		sum(b.qty) as qty ,  																																									")
		.where("		sum( b.amount ) as sale_amt ,  																																					")
		.where("		sum( b.po_pri * b.qty ) as po_amt  																																			")
		.where("	from sale_mst a  																																										")
		.where("		join sale_dtl b on ( a.inv_no = b.inv_no )  																																	")
		.where("		left outer join itm_mst c on ( b.item_idcd = c.item_idcd  )  																				")
		.where("		left outer join item_unit d on ( c.unit_idcd = d.unit_idcd )  																													")
		.where("		left outer join item_class e on ( c.class_id = e.class_id )  																												")
		.where("		left outer join vend_mst f on ( c.vend_id = f.vend_id )  																													")
		.where("		left outer join usr_mst g on ( a.salesman_id = g.emp_id ) 																											")
		.where("				left outer join  cust_stor t4 on ( a.stor_id = t4.stor_id 	 and a.cust_id  = t4.cust_id )																")
		.where("				left outer join vend_store t5 on ( t5.stor_grp   = a.stor_grp and t5.vend_id    = c.vend_id )															")

		.where("	where  1=1 																																												")

		.where(" 		and A.INV_DT BETWEEN :fr_dt "									 																						, arg.getParameter("fr_dt" ))
		.where(" 		and :to_dt	"										 																											, arg.getParameter("to_dt"))
		.where("  		and a.stor_id = :stor_id " 									 																							, arg.getParameter("stor_id"))
		.where("			and c.mfg_id = :manufacturer_id "																														, arg.getParameter("manufacturer_id"))
		.where("			and c.vend_id = :vend_id "									 																							, arg.getParameter("vend_id"))
		.where("			and a.salesman_id = :inv_user_id "    																													, arg.getParameter("inv_user_id"))
		.where("			and c.brand_id = :brand_id "									 																							, arg.getParameter("brand_id"))
		.where("			and g.dept_id = :departments_id "																														, arg.getParameter("departments_id"))
		.where(" 		and e.class_id like :class_id%	"							 	 																							, arg.getParameter("class_id"))
		.where("  and a.row_sts = '0' 															")
		.where("	 and a.inv_work_id in ( :inv_work_id ) " 	, inv_work_id ,( inv_work_id.length > 0) ) /* 주문 위치 */
		.where("  and     t4.cls1_id  = :cls1_id 		" , arg.getParameter("cls1_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls2_id  = :cls2_id 		" , arg.getParameter("cls2_id"  	)) /* 고객분류1 */
		.where("  and     t4.cls3_id  = :cls3_id 		" , arg.getParameter("cls3_id"  	)) /* 고객분류1 */
		.where("  and   t5.cls1_id  = :vend_cls1_id 	" , arg.getParameter("vend_cls1_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls2_id  = :vend_cls2_id 	" , arg.getParameter("vend_cls2_id"  	)) /* 매입처분류1 */
		.where("  and   t5.cls3_id  = :vend_cls3_id 	" , arg.getParameter("vend_cls3_id"  	)) /* 매입처분류1 */


		.where("	group by  																																													")
		.where("		c.brcd_2 ,c.item_sc ,c.item_name ,c.item_spec ,d.unit_name ,e.clss_desct ,f.vend_id ,	f.vend_nm  																		")
		.where("	)  																																																");


		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) );
		}
	}


	//매출이익율보고서  - test 리포트
	public SqlResultMap getSaleanalyticreport8(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query(" select																																						")
		.query(" 		t2.stor_grp as  stor_grp																														")
		.query(" 	, 	t3.vend_id  as vend_id																															")
		.query(" 	,	(select vend_nm from vend_mst where vend_id = t3.vend_id) as vend_nm													")
		.query(" 	,	sum(t2.tax_free) as tax_free, sum(t2.sply_amt) as sply_amt																			")
		.query(" 	,	sum(t2.tax ) as tax																																")
		.query(" 	, 	sum(t2.amount ) as amount																													")
		.query(" 	,	sum(t2.qty ) as qty																																")
		.query(" 	, 	sum(t2.unit_price * t2.qty) as unit_amount																								")
		.query(" 	,	sum(t2.qty * t2.po_pri ) as sale_po_price																								")
		.query(" 	,	max(t3.po_pri) as po_pri																													")
		.query(" 	, 	max(t3.sale_pri_1) as sale_pri_1																											")
		.query(" from   sale_mst t1																																	")
		.query(" 	join sale_dtl t2 on  t1.inv_no       = t2.inv_no																								")
		.query(" 	left outer join itm_stor t3 on  t3.stor_id    = t1.stor_id 		 and t3.item_idcd      = t2.item_idcd								")
		.query(" 	left outer join cust_stor t4 on  t1.stor_id    = t4.stor_id 		 and t1.cust_id      = t4.cust_id								")
		.query(" where 1=1																																				")
		.query(" and	t1.inv_dt = '20141201'																														")
		.query(" group by 																																				")
		.query(" t2.stor_grp , t3.vend_id																																");

		return  data.selectForMap();
	}


}

