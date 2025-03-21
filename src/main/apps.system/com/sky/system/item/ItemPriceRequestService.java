package com.sky.system.item;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.listener.SeqListenerService;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class ItemPriceRequestService  extends DefaultServiceHandler {

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

		data.param // 쿼리문  입력
			.total("select count(1) as maxsize  													")
			;
		data.param // 쿼리문  입력
			.query("select a.hq_id    , a.stor_id	  	 											")
			.query("     , a.inv_id      , a.inv_dt       , a.inv_tm       , a.inv_nm               ")
			.query("     , a.sts_cd  	 , a.inv_gb       , a.dept_id      , a.emp_id  	 	        ")
			.query("     , (select dept_nm from dept_mst where dept_id = a.dept_id ) as dept_nm 	")
			.query("     , (select emp_nm from usr_mst where emp_id = a.emp_id ) as emp_nm 			")
			.query("     , a.row_sts      															")
			;
		data.param // 쿼리문  입력
			.where("from   pri_chg_mst a           								")
			.where("where  a.hq_id  = :hq_id   	" , arg.fixParameter("hq_id" ))
			.where("and    a.row_sts = 0           									")
			.where("and    a.inv_dt between :fr_dt      " , arg.fixParameter("fr_dt" )) // 사작일자
			.where("                    and :to_dt      " , arg.fixParameter("to_dt" )) // 종료일자
			.where("and    a.emp_id   = :emp_id   	" , arg.getParameter("emp_id" ))
			.where("and    a.sts_cd    = :sts_cd        " , arg.getParameter("sts_cd" ))
//			.where("order by a.inv_no desc ")
		;

		if (page == 0 && rows == 0){
		     return data.selectForMap(sort);
		} else {
		     return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id   , a.inv_id      			     						")
			.query("     , a.mst_itm_id        , a.item_idcd , b.item_code , b.item_ds as item_name	")
			.query("     , b.brcd_1 as barcode , b.unit_idcd , b.item_spec , b.unt_qty			")
			.query("     , (select unit_name from item_unit where unit_idcd = b.unit_idcd ) as unit_name")
			.query("     , a.cst_pri , a.stad_sale_pri  , a.min_ost_pri  					")
			.query("     , a.sale_pri_1, a.sale_pri_2 , a.sale_pri_3  						")
			.query("     , a.sale_pri_4, a.sale_pri_5 				  						")
			.query("     , a.b2c_pri  , a.b2b_pri   , a.epo_pri   , a.po_pri 				")
			.query("     , a.user_memo  , a.row_sts    						    			")
			.query("from   pri_chg_dtl a													")
			.query("	   join itm_mst b on a.item_idcd = b.item_idcd							")
			.query("where  a.inv_id =:inv_id 	" , arg.fixParameter("inv_id" 				))
			.query("and    a.row_sts = 0           											")
			.query("order by   b.item_code                                                    	")
		;

	    return data.selectForMap();
	}



/*
 * 고객 정보 조회
 */
	public SqlResultMap getCust(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 쿼리문  입력
			.query("select  a.stor_id    , b.owner_id  ")
	      	.query("    ,   b.cust_grp   , a.cust_id     , b.cust_cd     , b.cust_nm    , b.cust_gb    , b.cust_sts   , b.sts_memo  ")
	      	.query("    ,   b.biz_yn     , b.biz_no      , b.biz_nm      , b.biz_type   , b.biz_type   , a.pur_emp_id			")
	      	.query("    ,   (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id) as salesman_nm  ")
	      	.query("    ,   b.biz_owner    , b.biz_email   , b.biz_tel_no  , b.biz_hp_no , b.biz_fax_no  							")
	      	.query("    ,   b.biz_tax_gb , b.colt_schd_type , b.colt_schd_term  												")
	      	.query("    ,   b.biz_zip_cd , b.biz_state , b.biz_city , b.biz_dong , b.biz_addr_1 , b.biz_addr_2	")
	      	.query("    ,   case when a.price_no =  0 then b.price_no else a.price_no end  as price_no 							")
	      	.query("    ,   b.price_type , b.price_rate  																		")
	      	.query("    ,   b.user_memo   , b.row_sts  																			")
	      	.query("from   cust_stor a  																						")
	      	.query("       join cust_mst b on a.cust_id = b.cust_id  and a.stor_id = b.owner_id  								")
	      	.query("where a.stor_id = :stor_id  " , arg.fixParameter("stor_id"  ))
	      	.query("and   a.cust_id = :cust_id   " , arg.fixParameter("cust_id"  ))
	      	.query("and   a.row_sts < 2  ")
	      	.query("order by b.cust_nm  ")
		;
		return data.selectForMap();
	}


	/**
	 * 마스터/디테일 객체를 넘긴다.-- invoice
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception{
		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.hq_id     ,  a.stor_grp  , a.stor_id    , a.wrhs_id	                             ")
			.query("     , (select stor_nm from stor p where p.stor_id = a.stor_id ) as stor_nm                  ")
			.query("     , (select stor_nm from stor p where p.stor_id = a.wrhs_id ) as wareh_nm                 ")
			.query("     , a.pos_no       , a.inv_no      ,  a.inv_dt    , a.inv_tm      , a.inv_work_gb         ")
			.query("     , a.sts_cd                                                                              ")
			.query("     , a.inv_dept_id  , (select dept_nm from dept_mst where stor_grp = a.stor_grp and stor_id = a.inv_dept_id ) as inv_dept_nm")
			.query("     , a.salesman_id  , (select emp_nm  from usr_mst  where stor_grp = a.stor_grp and emp_id  = a.salesman_id ) as salesman_nm")
			.query("     , a.cust_id      , a.cust_nm     , a.cust_gb                                            ")
			.query("     , a.mmb_id      , a.mmb_nm                                                              ")
			.query("     , a.tax_type     , a.tax_rt                                                           ")
			.query("     , a.tax_free     , a.taxation    , a.sply_amt   , a.tax         , a.amount              ")
	      	.query("     , a.biz_no       , a.biz_nm      , a.biz_type   , a.biz_type                            ")
	      	.query("     , a.biz_owner    , a.biz_email   , a.biz_tel_no , a.biz_fax_no               			 ")
	      	.query("     , a.biz_zip_cd   , a.biz_state   , a.biz_city   , a.biz_dong    , a.biz_addr_1 , a.biz_addr_2  ")

	      	.query("     , a.reve_nm                                                                              ")
	      	.query("     , a.reve_email   , a.reve_tel_no , a.reve_hp_no , a.reve_fax_no                         ")
	      	.query("     , a.reve_zip_cd  , a.reve_state  , a.reve_city  , a.reve_dong   , a.reve_addr_1 , a.reve_addr_2  ")

			.query("     , b.clss_1      , (select bas_nm from base_mst where prnt_id = '9120' and bas_id = b.clss_1 ) as cls1_nm ")
			.query("     , b.clss_2      , (select bas_nm from base_mst where prnt_id = '9121' and bas_id = b.clss_2 ) as cls2_nm ")
			.query("     , b.clss_3      , (select bas_nm from base_mst where prnt_id = '9122' and bas_id = b.clss_3 ) as cls3_nm ")
			.query("     , b.clss_4      , (select bas_nm from base_mst where prnt_id = '9125' and bas_id = b.clss_4 ) as cls4_nm ")
			.query("     , b.clss_5      , (select bas_nm from base_mst where prnt_id = '9124' and bas_id = b.clss_5 ) as cls5_nm ")
			.query("     , b.clss_6      , (select bas_nm from base_mst where prnt_id = '9123' and bas_id = b.clss_6 ) as cls6_nm ")
	      	.query("     , c.biz_tax_gb  , c.colt_schd_type , c.colt_schd_term , b.user_memo as cust_usr_memo          ")
	      	.query("     , c.price_type  , c.price_rate                                              				  ")
			.query("     , case when b.price_no = 0 then c.price_no else b.price_no end as price_no           		  ")
		    .query("     , b.npay_amt    , b.balance_limit  , b.limit_control , (b.balance_limit - b.npay_amt) as balance_amount ")
	      	.query("     , a.subject     , a.limitday       , a.honorary      , a.monetary    , a.remarks             ")
			.query("     , a.user_memo    ,  a.row_clos      , a.row_sts                                               ")
			.query("     , c.cust_sts    , c.sts_memo                                                                 ")
			.query("from   esti_info a                                                                                ")
			.query("       join cust_stor b on a.stor_id = b.stor_id and a.cust_id  = b.cust_id                       ")
			.query("       join cust_mst  c on a.cust_id  = c.cust_id                                                 ")
			.query("where  a.inv_no =:inv_no " 			, arg.fixParameter("inv_no"))
			.query("and    a.row_sts = 0                                                                              ")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param // 쿼리문  입력
				.query("select a.inv_no     , a.line_seqn     , a.seq_top    , a.seq_dsp                  			")
				.query("     , a.mst_itm_id , a.mst_itm_cd  , a.unt_qty    , b.brcd_1 as barcode      				")
				.query("     , a.unit_idcd     , (select unit_name from item_unit p where p.unit_idcd = a.unit_idcd ) as unit_name ")
				.query("     , a.item_idcd     , a.item_code      , a.item_name     , a.item_spec   , b.brcd_1 as barcode		")
				.query("     , (select bas_nm from base_mst where bas_id = b.brand_id ) as brand_nm					")
				.query("     , (select bas_nm from base_mst where bas_id = b.mfg_id ) as mfg_nm						")
				.query("     , a.notax_yn   , a.cust_price  , a.cust_halin , a.unit_price , a.item_halin			")
				.query("     , a.qty        , a.price                                                   			")
				.query("     , a.tax_free   , a.taxation    , a.sply_amt   , a.tax       , a.amount     			")
				.query("     , a.po_pri     , a.po_pri_type , a.po_pri_rt                         					")
				.query("     , a.user_memo , a.row_sts                                               				")
				.query("from   esti_item a                                                             				")
				.query("	   join itm_mst b on a.item_idcd = b.item_idcd							   					")
				.query("where  a.inv_no =:inv_no " , arg.fixParameter("inv_no"))
				.query("and    a.row_sts = 0                                                         				")
				.query("order by   a.line_seqn                                                           				")
			;
			info.get(0).put("product", data.selectForMap() );
		    return info ;
		} else {

		}
	    return info ;
	}


	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage temp = arg.newStorage("POS");

		temp.param
		 	.query("select sts_cd from esti_info where inv_no = :inv_no " , arg.fixParameter("inv_no"    ))

		;
		SqlResultRow del = temp.selectForRow();

		String work_stscd = arg.getParamText("sts_cd").toString() ;  /* 로컬 주문 상태 */
		String server_stscd = del.getParamText("sts_cd").toString() ; /* 서버 주문 상태 */

		DataMessage data = arg.newStorage("POS");

		if (del != null ) {
			if ( work_stscd.equals(server_stscd)  ){ /* 로컬과 서버의 주문상태가 동일할 경우 */
			} else {
				throw new ServiceException("정상적인 삭제작업이 아닙니다. 주문상태 불일치" );
			}
		}


		if ( "0100".equals(work_stscd )  ){ /* 견적상태가 0100인 경우만 허용. 재확인 */
        	data.param
	    		.table("esti_item")
	    		.where("where  inv_no  	= :inv_no   	" )
	    		//
	    		.unique("inv_no"      	, arg.fixParameter("inv_no"))
	    		.update("row_sts"   	, 2 					)
				.update("upt_id"   		, arg.getParameter("upt_id"))
				.update("upt_ip"   		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    		;data.attach(Action.update );

			/* 정보  삭제 */
	    	data.param
				.table("esti_info")
				.where("where  inv_no  	= :inv_no   	" )
				//
				.unique("inv_no"      	, arg.fixParameter("inv_no"))
	    		.update("row_sts"   	, 2 					)
				.update("upt_id"   		, arg.getParameter("upt_id"))
				.update("upt_ip"   		, arg.remoteAddress)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	    		;data.attach(Action.update );

		}
		data.execute();
		return null;
	}

	/**
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage pos_search = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String flag = row.getParamText("_flag");
        	String sts_cd = row.getParamText("sts_cd");

			if (rowaction == Action.delete) {

				throw new ServiceException("삭제불가" );
			} else {
				if ("2".equals(flag)) {
		        	// 주문처리
		        	if ("0200".equals(sts_cd)) {

			        	// 주문서 생성(order_mst, order_item, order_pack)
		        		setOrder(arg, pos_search, data, row);

	        			// 출고사업장이 cust_stor 에 없는 경우 insert
		        		setCustStore(arg, pos_search, data, row);

	        			// 출고사업장의 상품이 itm_stor 에 없는 경우 insert
		        		setItemStore(arg, pos_search, data, row);

		        		// 상태변경
			        	data.param
			    			.table("esti_info")
			    			.where("where inv_no = :inv_no ")
			    			.where("  and sts_cd = '0100'  ")
				        	//
							.unique("inv_no"        , row.fixParameter("inv_no"))
			        		.update("sts_cd"        , sts_cd)
							.update("upt_id"   		, row.getParameter("upt_id"))
							.update("upt_ip"   		, arg.remoteAddress)
							.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
							.action = rowaction;
			        	data.attach();
		        	}
				} else {
		        	data.param
			        	.table("esti_info")
			        	.where("where inv_no  = :inv_no   " )
			        	//
			        	.unique("corp_id"         , row.fixParameter("corp_id"     ))
			        	.unique("hq_id"         , row.fixParameter("hq_id"     ))
			        	.unique("stor_grp"         , row.fixParameter("stor_grp"     ))
			        	.unique("stor_id"         , row.fixParameter("stor_id"     ))
			        	.update("wrhs_id"         , row.fixParameter("wrhs_id"     ))

			        	.unique("inv_no"           , row.fixParameter("inv_no"       ))
			        	.unique("pos_no"           , row.getParameter("pos_no"       ))
			        	.update("inv_dt"           , row.fixParameter("inv_dt"       ))
			        	.insert("inv_tm"           , row.fixParameter("inv_tm"       ))
			        	.insert("inv_work_gb"      , row.getParameter("inv_work_gb"  ))
			        	.update("inv_dept_id"      , row.getParameter("inv_dept_id"  ))
			        	.update("inv_usr_id"      , row.getParameter("inv_usr_id"  ))
			        	.update("salesman_id"      , row.getParameter("salesman_id"  ))

						.update("sts_cd"           , row.getParameter("sts_cd"       ))
						.insert("cust_id"          , row.getParameter("cust_id"      ))
						.insert("cust_nm"          , row.getParameter("cust_nm"      ))
						.insert("cust_gb"          , row.getParameter("cust_gb"      ))
						.insert("mmb_id"          , row.getParameter("mmb_id"      ))
						.insert("mmb_nm"          , row.getParameter("mmb_nm"      ))

						.insert("price_no"         , row.fixParameter("price_no"     ))


						.insert("tax_type"         , row.fixParameter("tax_type"     ))
						.insert("tax_rt"         , row.fixParameter("tax_rt"     ))
						.update("tax_free"         , row.getParameter("tax_free"     ))
						.update("taxation"         , row.getParameter("taxation"     ))
						.update("sply_amt"         , row.getParameter("sply_amt"     ))
						.update("tax"              , row.getParameter("tax"          ))
						.update("amount"           , row.getParameter("amount"       ))

						.update("biz_no"           , row.getParameter("biz_no"       ))
						.update("biz_nm"           , row.getParameter("biz_nm"       ))
						.update("biz_type"         , row.getParameter("biz_type"     ))
						.update("biz_type"         , row.getParameter("biz_type"    ))
						.update("biz_owner"          , row.getParameter("biz_owner"    ))
						.update("biz_state"   , row.getParameter("biz_state"    ))
						.update("biz_city"    , row.getParameter("biz_city"     ))
						.update("biz_dong"    , row.getParameter("biz_dong"     ))
						.update("biz_zip_cd"       , row.getParameter("biz_zip_cd"   ))
						.update("biz_addr_1"       , row.getParameter("biz_addr_1"    ))
						.update("biz_addr_2"       , row.getParameter("biz_addr_2"    ))
						.update("biz_email"        , row.getParameter("biz_email"    ))
						.update("biz_tel_no"       , row.getParameter("biz_tel_no"   ))
						.update("biz_fax_no"       , row.getParameter("biz_fax_no"   ))

						.update("reve_nm"          , row.getParameter("reve_nm"      ))
						.update("reve_zip_cd"      , row.getParameter("reve_zip_cd"  ))
						.update("reve_state"       , row.getParameter("reve_state"   ))
						.update("reve_city"        , row.getParameter("reve_city"    ))
						.update("reve_dong"        , row.getParameter("reve_dong"    ))
						.update("reve_addr_1"      , row.getParameter("reve_addr_1"   ))
						.update("reve_addr_2"      , row.getParameter("reve_addr_2"   ))
						.update("reve_email"       , row.getParameter("reve_email"   ))
						.update("reve_hp_no"      , row.getParameter("reve_hp_no"   ))
						.update("reve_tel_no"      , row.getParameter("reve_tel_no"  ))
						.update("reve_fax_no"      , row.getParameter("reve_fax_no"  ))

						.update("subject"          , row.getParameter("subject"      ))
						.update("limitday"         , row.getParameter("limitday"     ))
						.update("honorary"         , row.getParameter("honorary"     ))
						.update("monetary"         , row.getParameter("monetary"     ))
						.update("remarks"          , row.getParameter("remarks"      ))

						.update("user_memo"         , row.getParameter("user_memo"    ))
						.update("row_clos"         , row.getParameter("row_clos"    ))

						.update("upt_id"        , row.getParameter("upt_id"    ))
						.update("upt_ip"   	    , arg.remoteAddress					)
						.insert("crt_id" 	    , row.getParameter("crt_id"	 ))
						.insert("crt_ip"   	    , arg.remoteAddress					)
						.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.action = rowaction ;
		        	;data.attach();

		        	if(row.getParameter("product", SqlResultMap.class) != null){
		        		setProduct(arg , data , row.getParameter("product", SqlResultMap.class) );
		        	}
				}
			}
		}
		data.execute();
		return null ;
	}

	/**
	 *
	 * @param data
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setProduct(HttpRequestArgument arg, DataMessage data, SqlResultMap map ) throws Exception {
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				/* 상세 삭제 */
	        	data.param
	        		.table("esti_item")
	        		.where("where  inv_no  		= :inv_no   	   " )
	        		.where("and    line_seqn 		= :line_seqn   	   " )
	        		//
	        		.unique("inv_no"   , row.fixParameter("inv_no"  ))
	        		.unique("line_seqn"  , row.fixParameter("line_seqn" ))
	        		.action = rowaction
	        	; data.attach();

			} else {
	        	data.param
		        	.table("esti_item")
		        	.where("where  inv_no  		= :inv_no   	" )
		        	.where("and    line_seqn  	= :line_seqn   	" )
		        	//
		        	.unique("hq_id"          , row.fixParameter("hq_id"       ))
		        	.unique("stor_grp"          , row.fixParameter("stor_grp"       ))
		        	.unique("stor_id"          , row.fixParameter("stor_id"       ))
					.unique("inv_no"            , row.fixParameter("inv_no"         ))
					.unique("line_seqn"           , row.fixParameter("line_seqn"        ))
					.unique("seq_top"           , row.fixParameter("seq_top"        ))

					.update("seq_dsp"           , row.getParameter("seq_dsp"        ))
					.unique("mst_itm_id"           , row.fixParameter("mst_itm_id"        ))
					.unique("mst_itm_cd"           , row.fixParameter("mst_itm_cd"        ))
					.unique("unit_idcd"           , row.fixParameter("unit_idcd"        ))
					.unique("unt_qty"          , row.fixParameter("unt_qty"       ))
					.update("item_idcd"           , row.fixParameter("item_idcd"        ))
					.update("item_code"           , row.fixParameter("item_code"        ))
					.update("item_name"           , row.getParameter("item_name"        ))
					.update("item_spec"           , row.getParameter("item_spec"        ))
					.insert("notax_yn"          , row.fixParameter("notax_yn"       ))

					.update("cust_price"        , row.fixParameter("cust_price"     ))
					.update("cust_halin"        , row.fixParameter("cust_halin"     ))

					.update("unit_price"        , row.fixParameter("unit_price"     ))
					.update("item_halin"        , row.fixParameter("item_halin"     ))
					.update("price"             , row.fixParameter("price"          ))
					.update("qty"               , row.fixParameter("qty"            ))
					.update("tax_free"          , row.fixParameter("tax_free"       ))
					.update("taxation"          , row.fixParameter("taxation"       ))
					.update("sply_amt"          , row.fixParameter("sply_amt"       ))
					.update("tax"               , row.fixParameter("tax"            ))
					.update("amount"            , row.fixParameter("amount"         ))

					.update("po_pri"          , row.fixParameter("po_pri"       ))
					.update("po_pri_type"     , row.fixParameter("po_pri_type"  ))
					.update("po_pri_rt"     , row.fixParameter("po_pri_rt"  ))

					.update("user_memo" 	    , row.getParameter("user_memo"		))

					.update("upt_id" 		, row.getParameter("upt_id"		))
					.update("upt_ip"   		, arg.remoteAddress						)
					.insert("crt_id" 		, row.getParameter("crt_id"		))
					.insert("crt_ip"   		, arg.remoteAddress						)
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
	        	;data.attach();
			}
		}
		return null ;
	}

	/**
	 * 신규 문서번호 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String seqInvoice(HttpRequestArgument arg, String stor_id) throws Exception {

		DataMessage data = arg.newStorage("POS");
		return seqlistener.getInvoice(data.repository, stor_id);
	}

	/**
	 * 주문서 생성
	 *
	 * @param arg
	 * @param pos_search
	 * @param data
	 * @param inv
	 * @throws Exception
	 */
	public void setOrder(HttpRequestArgument arg, DataMessage pos_search, DataMessage data, SqlResultRow inv) throws Exception {

		String new_inv_no = seqInvoice(arg, inv.getParamText("stor_id"));

    	data.param
	    	.query("insert into order_mst ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, pos_no, inv_no, inv_dt, inv_tm, inv_nm, ret_yn, ret_no, inv_work_id, inv_work_gb, inv_dept_id, inv_usr_id, salesman_id, sts_cd, pay_dt, ori_no, ori_dt, ori_tm, cust_grp, cust_id, cust_nm, cust_gb, mmb_id, mmb_nm, item_point, item_halin, price_no, tax_type, tax_rt, tax_free, taxation, sply_amt, tax, amount, charge, payable, payment, npay_amt, perpay_yn, qty, org_ord_qty, ship_qty, point_rate_type, cash_point_rate, card_point_rate, add_point, use_point, req_msg, biz_no, biz_nm, biz_type, biz_type, biz_owner, biz_state, biz_city, biz_dong, biz_zip_cd, biz_addr_1, biz_addr_2, biz_email, biz_tel_no, biz_fax_no, reve_nm, reve_state, reve_city, reve_dong, reve_zip_cd, reve_addr_1, reve_addr_2, recv_addr3, reve_email, reve_tel_no, reve_fax_no, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_id, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, reve_hp_no, cours_id, sales_gb, tax_recv, rest_qty, converted, prom_id, invoiceno, biz_hp_no, ctrl_id, picking_yn, printer_yn, inv_usr_dt, mro_no, mro_id, inv_prt_cnt ) ")
	    	.query("select a.corp_id                                                                                         ")
	    	.query("      ,a.hq_id                                                                                         ")
	    	.query("      ,a.stor_grp                                                                                         ")
	    	.query("      ,a.wrhs_id                                                                                         ")
	    	.query("      ,a.wrhs_id                                                                                         ")
	    	.query("      ,a.pos_no                                                                                           ")
	    	.query("      ,'" + new_inv_no + "'         as inv_no                                                             ")
	    	.query("      ,convert(cahr(10,getdate(),112) as inv_dt                                                           ")
	    	.query("      ,replace(convert(char(6), getdate(),108),':','')  as inv_tm                                         ")
	    	.query("      ,null                         as inv_nm                                                             ")
	    	.query("      ,'0'                          as ret_yn                                                             ")
	    	.query("      ,null                         as ret_no                                                             ")
	    	.query("      ,'1'                          as inv_work_id                                                        ") // 1:판매관리,2:판매포스,3:쇼핑몰,4:기업물,5:수발주,A:오픈마켓,B:기업마켓
	    	.query("      ,'1'                          as inv_work_gb                                                        ") // 1:자체생성,2:매출작업에서생성
	    	.query("      ,a.inv_dept_id                                                                                      ")
	    	.query("      ,a.inv_usr_id                                                                                      ")
	    	.query("      ,a.salesman_id                                                                                      ")
	    	.query("      ,'0200'                       as sts_cd                                                             ") // 배송대기
	    	.query("      ,convert(cahr(10,getdate(),112) as pay_dt                                                           ")
	    	.query("      ,a.inv_no                     as ori_no                                                             ")
	    	.query("      ,a.inv_dt                     as ori_dt                                                             ")
	    	.query("      ,a.inv_tm                     as ori_tm                                                             ")
	    	.query("      ,c.cust_grp                                                                                          ")
	    	.query("      ,a.cust_id                                                                                          ")
	    	.query("      ,a.cust_nm                                                                                          ")
	    	.query("      ,a.cust_gb                                                                                          ")
	    	.query("      ,a.mmb_id                                                                                          ")
	    	.query("      ,a.mmb_nm                                                                                          ")
	    	.query("      ,0 as item_point                                                                                    ")
	    	.query("      ,i.item_halin                                                                                       ")
	    	.query("      ,case when b.price_no = 0 then c.price_no else b.price_no end  as price_no                          ")
	    	.query("      ,a.tax_type                                                                                         ")
	    	.query("      ,a.tax_rt                                                                                         ")
	    	.query("      ,a.tax_free                                                                                         ")
	    	.query("      ,a.taxation                                                                                         ")
	    	.query("      ,a.sply_amt                                                                                         ")
	    	.query("      ,a.tax                                                                                              ")
	    	.query("      ,a.amount                                                                                           ")
	    	.query("      ,0 as charge                                                                                        ")
	    	.query("      ,0 as payable                                                                                       ")
	    	.query("      ,0 as payment                                                                                       ")
	    	.query("      ,b.npay_amt                                                                                          ")
	    	.query("      ,'0'   as perpay_yn                                                                                 ")
	    	.query("      ,i.qty                                                                                              ")
	    	.query("      ,i.qty as org_ord_qty                                                                                  ")
	    	.query("      ,0     as ship_qty                                                                                  ")
	    	.query("      ,'0'   as point_rate_type                                                                           ")
	    	.query("      ,0     as cash_point_rate                                                                           ")
	    	.query("      ,0     as card_point_rate                                                                           ")
	    	.query("      ,0     as add_point                                                                                 ")
	    	.query("      ,0     as use_point                                                                                 ")
	    	.query("      ,null  as req_msg                                                                                   ")
	    	.query("      ,a.biz_no                                                                                           ")
	    	.query("      ,a.biz_nm                                                                                           ")
	    	.query("      ,a.biz_type                                                                                         ")
	    	.query("      ,a.biz_type                                                                                        ")
	    	.query("      ,a.biz_owner                                                                                        ")
	    	.query("      ,a.biz_state                                                                                        ")
	    	.query("      ,a.biz_city                                                                                         ")
	    	.query("      ,a.biz_dong                                                                                         ")
	    	.query("      ,a.biz_zip_cd                                                                                       ")
	    	.query("      ,a.biz_addr_1                                                                                        ")
	    	.query("      ,a.biz_addr_2                                                                                        ")
	    	.query("      ,a.biz_email                                                                                        ")
	    	.query("      ,a.biz_tel_no                                                                                       ")
	    	.query("      ,a.biz_fax_no                                                                                       ")
	    	.query("      ,a.reve_nm                                                                                          ")
	    	.query("      ,a.reve_state                                                                                       ")
	    	.query("      ,a.reve_city                                                                                        ")
	    	.query("      ,a.reve_dong                                                                                        ")
	    	.query("      ,a.reve_zip_cd                                                                                      ")
	    	.query("      ,a.reve_addr_1                                                                                       ")
	    	.query("      ,a.reve_addr_2                                                                                       ")
	    	.query("      ,null as recv_addr3                                                                                 ")
	    	.query("      ,a.reve_email                                                                                       ")
	    	.query("      ,a.reve_tel_no                                                                                      ")
	    	.query("      ,a.reve_fax_no                                                                                      ")
	    	.query("      ,a.user_memo                                                                                        ")
	    	.query("      ,null as sys_memo                                                                                  ")
	    	.query("      ,0 as row_clos                                                                                     ")
	    	.query("      ,0 as row_ord                                                                                     ")
	    	.query("      ,0 as row_sts                                                                                     ")
	    	.query("      ,:upt_id                           as upt_id                                                  ", inv.fixParameter("upt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'       as upt_ip                                                  ")
	    	.query("      ,dbo.today_char()                  as upt_dttm                                                ")
	    	.query("      ,:crt_id                           as crt_id                                                  ", inv.fixParameter("crt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'       as crt_ip                                                  ")
	    	.query("      ,dbo.today_char()                  as crt_dttm                                               ")
	    	.query("      ,a.reve_hp_no                                                                                      ")
	    	.query("      ,null as cours_id                                                                                  ")
	    	.query("      ,b.sales_gb                                                                                         ")
	    	.query("      ,a.tax_type                         as tax_recv                                                     ")
	    	.query("      ,i.qty                              as rest_qty                                                     ")
	    	.query("      ,null                               as converted                                                    ")
	    	.query("      ,null                               as prom_id                                                      ")
	    	.query("      ,null                               as invoiceno                                                    ")
	    	.query("      ,null                               as biz_hp_no                                                   ")
	    	.query("      ,null                               as ctrl_id                                                     ")
	    	.query("      ,'0'                                as picking_yn                                                   ")
	    	.query("      ,'0'                                as printer_yn                                                   ")
	    	.query("      ,dbo.today_char()                   as inv_usr_dt                                                  ")
	    	.query("      ,null                               as mro_no                                                       ")
	    	.query("      ,null                               as mro_id                                                       ")
	    	.query("      ,0                                  as inv_prt_cnt                                                ")
	    	.query(" from esti_info a                                                                                         ")
	    	.query("      join cust_stor b on a.stor_id = b.stor_id and a.cust_id  = b.cust_id                             ")
	    	.query("      join cust_mst  c on a.cust_id  = c.cust_id                                                         ")
	    	.query("      join ( select inv_no, sum(item_halin) as item_halin, sum(abs(qty)) as qty from esti_item group by inv_no ")
	    	.query("           ) i on a.inv_no = i.inv_no                                                                     ")
	    	.query(" where a.inv_no = :inv_no                                                                                 ", inv.fixParameter("inv_no"))
	    	.query("   and a.row_sts = 0                                                                                    ")
    	;data.attach(Action.direct);

    	data.param
	    	.query("insert into order_pack ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, inv_no, inv_dt, sts_cd, pack_no, pack_gb, pack_seq, pack_vend_id, pack_zone_id, sales_id, tax_free, taxation, sply_amt, tax, amount, qty, ship_qty, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_id, upt_ip, upt_dttm, crt_id, crt_ip, crt_dttm, org_ord_qty, inv_gb, rest_qty, converted, invoiceno, invoicesq ) ")
	    	.query("select c.corp_id                                                                                 ")
	    	.query("      ,c.hq_id                                                                                 ")
	    	.query("      ,c.stor_grp                                                                                 ")
	    	.query("      ,c.wrhs_id                                                                                 ")
	    	.query("      ,c.wrhs_id                                                                                 ")
	    	.query("      ,c.inv_no                                                                                   ")
	    	.query("      ,c.inv_dt                                                                                   ")
	    	.query("      ,c.sts_cd                                                                                   ")
	    	.query("      ,c.inv_no + to_char(rownum) as pack_no                                                       ")
	    	.query("      ,b.pack_gb                                                                                  ")
	    	.query("      ,rownum                    as pack_seq                                                      ")
	    	.query("      ,b.pack_vend_id                                                                             ")
	    	.query("      ,b.pack_zone_id                                                                             ")
	    	.query("      ,b.sales_id                                                                                 ")
	    	.query("      ,b.tax_free                                                                                 ")
	    	.query("      ,b.taxation                                                                                 ")
	    	.query("      ,b.sply_amt                                                                                 ")
	    	.query("      ,b.tax                                                                                      ")
	    	.query("      ,b.amount                                                                                   ")
	    	.query("      ,b.qty                                                                                      ")
	    	.query("      ,0    as ship_qty                                                                           ")
	    	.query("      ,null as user_memo                                                                          ")
	    	.query("      ,null as sys_memo                                                                          ")
	    	.query("      ,0    as row_clos                                                                          ")
	    	.query("      ,0    as row_ord                                                                          ")
	    	.query("      ,0    as row_sts                                                                          ")
	    	.query("      ,:upt_id                           as upt_id                                          ", inv.fixParameter("upt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'          as upt_ip                                          ")
	    	.query("      ,DBO.to_char(getdate(), 'yyyymmddhh24miss') as upt_dttm                                     ")
	    	.query("      ,:crt_id                           as crt_id                                          ", inv.fixParameter("crt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'          as crt_ip                                             ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as crt_dttm                                     ")
	    	.query("      ,b.qty as org_ord_qty                                                                          ")
	    	.query("      ,'1'   as inv_gb                                                                            ") // 1:주문/2:발주
	    	.query("      ,b.qty as rest_qty                                                                          ")
	    	.query("      ,null  as converted                                                                         ")
	    	.query("      ,null  as invoiceno                                                                         ")
	    	.query("      ,0     as invoicesq                                                                         ")
	    	.query("  from esti_info a                                                                                ")
	    	.query("       join (                                                                                     ")
	    	.query("            select inv_no                                                                         ")
	    	.query("                  ,case when sales_gb = '1' then sales_id else '5105000'end  as sales_id          ")
	    	.query("                  ,vend_id       as pack_vend_id                                                  ")
	    	.query("                  ,pack_zone_id  as pack_zone_id                                                  ")
	    	.query("                  ,pack_gb       as pack_gb                                                       ")
	    	.query("			      ,sum(abs(qty)) as qty                                                           ")
	    	.query("			      ,sum(tax_free) as tax_free                                                      ")
	    	.query("			      ,sum(taxation) as taxation                                                      ")
	    	.query("			      ,sum(sply_amt) as sply_amt                                                      ")
	    	.query("			      ,sum(tax)      as tax                                                           ")
	    	.query("			      ,sum(amount)   as amount                                                        ")
	    	.query("              from (                                                                              ")
	    	.query("                   select a.inv_no                                                                ")
	    	.query("                         ,c.sales_gb                                                              ")
	    	.query("                         ,i.sales_id                                                              ")
	    	.query("                         ,s.pack_gb                                                               ")
	    	.query("                         ,case when s.pack_gb = '1' then  s.vend_id else '' end   as vend_id      ")
	    	.query("                         ,case when s.pack_gb = '1' then '' else s.pack_zone_id end  as pack_zone_id ")
	    	.query("                         ,a.qty                                                                   ")
	    	.query("                         ,a.tax_free                                                              ")
	    	.query("                         ,a.taxation                                                              ")
	    	.query("                         ,a.sply_amt                                                              ")
	    	.query("                         ,a.tax                                                                   ")
	    	.query("                         ,a.amount                                                                ")
	    	.query("                     from esti_item a                                                             ")
	    	.query("                          join esti_info b                                                        ")
	    	.query("                            on b.inv_no = a.inv_no                                                ")
	    	.query("                          left outer join itm_stor s                                            ")
	    	.query("                            on s.stor_id = b.stor_id                                            ")
	    	.query("                           and s.item_idcd = a.item_idcd                                              ")
	    	.query("                          left outer join itm_mst i                                             ")
	    	.query("                            on i.item_idcd = s.item_idcd                                              ")
	    	.query("                          left outer join cust_stor c                                            ")
	    	.query("                            on c.stor_id = b.stor_id                                            ")
	    	.query("                           and c.cust_id  = b.cust_id                                             ")
	    	.query("                   )                                                                              ")
	    	.query("             group by inv_no, case when sales_gb = '1' then  sales_id else '5105000' end, pack_gb, vend_id, pack_zone_id ")
	    	.query("            ) b                                                                                   ")
	    	.query("         on a.inv_no = b.inv_no                                                                   ")
	    	.query("       join ( select * from ( select * from order_mst where ori_no = :inv_no order by inv_no desc ) where rownum = 1 ) c ", inv.fixParameter("inv_no"))
	    	.query("         on c.ori_no = a.inv_no                                                                   ")
	    	.query(" where a.inv_no = :inv_no  ", inv.fixParameter("inv_no"))
		;data.attach(Action.direct);

    	data.param
	    	.query("insert into order_item ( hq_id, stor_grp, stor_id, wrhs_id, inv_no, line_seqn, seq_top, seq_dsp, ret_yn, ret_no, ret_seq, ori_no, ori_seq, pack_no, pack_gb, pack_vend_id, pack_zone_id, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, item_spec, sales_id, notax_yn, cust_price, cust_halin, unit_price, unit_point, point_rate, item_point, item_halin, price, qty, org_ord_qty, ship_qty, tax_free, taxation, sply_amt, tax, amount, po_pri, po_pri_type, po_pri_rt, user_memo, sys_memo, row_ord, row_sts, upt_id, upt_ip, upt_dttm, crt_id, crt_ip, crt_dttm, rest_qty, converted, seq_qty, invoiceno, invoicesq, mro_no, mro_seq ) ")
	    	.query("select d.hq_id                                                                           ")
	    	.query("      ,d.stor_grp                                                                           ")
	    	.query("      ,d.wrhs_id                                                                           ")
	    	.query("      ,d.wrhs_id                                                                           ")
	    	.query("      ,o.inv_no                                                                             ")
	    	.query("      ,a.line_seqn                                                                            ")
	    	.query("      ,a.seq_top                                                                            ")
	    	.query("      ,a.seq_dsp                                                                            ")
	    	.query("      ,'0'       as ret_yn                                                                  ")
	    	.query("      ,null      as ret_no                                                                  ")
	    	.query("      ,a.line_seqn as ret_seq                                                                 ")
	    	.query("      ,a.inv_no  as ori_no                                                                  ")
	    	.query("      ,a.line_seqn as ori_seq                                                                 ")
	    	.query("      ,p.pack_no                                                                            ")
	    	.query("      ,b.pack_gb                                                                            ")
	    	.query("      ,(case when b.pack_gb = 1 then b.vend_id else '' end) as pack_vend_id                 ")
	    	.query("      ,b.pack_zone_id                                                                       ")
	    	.query("      ,a.mst_itm_id                                                                            ")
	    	.query("      ,a.mst_itm_cd                                                                            ")
	    	.query("      ,a.unit_idcd                                                                            ")
	    	.query("      ,a.unt_qty                                                                           ")
	    	.query("      ,a.item_idcd                                                                            ")
	    	.query("      ,a.item_code                                                                            ")
	    	.query("      ,a.item_name                                                                            ")
	    	.query("      ,a.item_spec                                                                            ")
	    	.query("      ,c.sales_id                                                                           ")
	    	.query("      ,a.notax_yn                                                                           ")
	    	.query("      ,a.cust_price                                                                         ")
	    	.query("      ,a.cust_halin                                                                         ")
	    	.query("      ,a.unit_price                                                                         ")
	    	.query("      ,0 as unit_point                                                                      ")
	    	.query("      ,0 as point_rate                                                                      ")
	    	.query("      ,0 as item_point                                                                      ")
	    	.query("      ,a.item_halin                                                                         ")
	    	.query("      ,a.price                                                                              ")
	    	.query("      ,a.qty                                                                                ")
	    	.query("      ,a.qty as org_ord_qty                                                                    ")
	    	.query("      ,0 as ship_qty                                                                        ")
	    	.query("      ,a.tax_free                                                                           ")
	    	.query("      ,a.taxation                                                                           ")
	    	.query("      ,a.sply_amt                                                                           ")
	    	.query("      ,a.tax                                                                                ")
	    	.query("      ,a.amount                                                                             ")
	    	.query("      ,a.po_pri                                                                           ")
	    	.query("      ,a.po_pri_type                                                                      ")
	    	.query("      ,a.po_pri_rt                                                                      ")
	    	.query("      ,a.user_memo                                                                          ")
	    	.query("      ,null as sys_memo                                                                    ")
	    	.query("      ,0 as row_ord                                                                       ")
	    	.query("      ,0 as row_sts                                                                       ")
	    	.query("      ,:upt_id                           as upt_id                                    ", inv.fixParameter("upt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'          as upt_ip                                    ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as upt_dttm                               ")
	    	.query("      ,:crt_id                           as crt_id                                    ", inv.fixParameter("crt_id"))
	    	.query("      ,'" + arg.remoteAddress + "'          as crt_ip                                       ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss') as crt_dttm                               ")
	    	.query("      ,a.qty as rest_qty                                                                    ")
	    	.query("      ,null                                 as converted                                    ")
	    	.query("      ,0                                    as seq_qty                                      ")
	    	.query("      ,null                                 as invoiceno                                    ")
	    	.query("      ,0                                    as invoicesq                                    ")
	    	.query("      ,null                                 as mro_no                                       ")
	    	.query("      ,0                                    as mro_seq                                      ")
	    	.query("  from esti_item a                                                                          ")
	    	.query("       join itm_stor b                                                                    ")
	    	.query("         on a.stor_id = b.stor_id                                                         ")
	    	.query("       	and a.item_idcd  = b.item_idcd                                                          ")
	    	.query("       join itm_mst c                                                                     ")
	    	.query("         on a.item_idcd = c.item_idcd                                                           ")
	    	.query("       join esti_info d                                                                     ")
	    	.query("         on a.inv_no = d.inv_no                                                             ")
	    	.query("       join ( select * from ( select * from order_mst where ori_no = :inv_no order by inv_no desc ) where rownum = 1 ) o ", inv.fixParameter("inv_no"))
	    	.query("         on o.ori_no = a.inv_no                                                             ")
	    	.query("       join cust_stor s                                                                    ")
	    	.query("         on s.stor_id = d.stor_id                                                         ")
	    	.query("       	and s.cust_id  = d.cust_id                                                          ")
	    	.query("       join order_pack p                                                                    ")
	    	.query("		 on p.inv_no = o.inv_no                                                             ")
	    	.query("		and isnull(p.sales_id, '5105000') = isnull(case when s.sales_gb = '1' then c.sales_id else '5105000' end, '5105000') ")
	    	.query("		and isnull(p.pack_vend_id, ' ') = isnull(case when b.pack_gb = '1' then b.vend_id else ' 'end, ' ')                 ")
	    	.query("		and isnull(p.pack_zone_id, ' ') = isnull(case when b.pack_gb = '1' then  ' ' else  b.pack_zone_id end, ' ')            ")
	    	.query(" where a.inv_no = :inv_no                                                                   ", inv.fixParameter("inv_no"))
	    	.query("   and a.row_sts = 0                                                                      ")
	    	.query(" order by a.line_seqn                                                                         ")
    	;data.attach(Action.direct);
	}

	/**
	 * 출고사업장 정보 생성
	 *
	 * @param arg
	 * @param pos_search
	 * @param data
	 * @param inv
	 * @throws Exception
	 */
	public void setCustStore(HttpRequestArgument arg, DataMessage pos_search, DataMessage data, SqlResultRow inv) throws Exception {

    	data.param
	    	.query("insert into cust_stor t (                                                        	")
	    	.query("       t.stor_id    , t.hq_id    , t.stor_grp , t.share_gp , t.sales_gb             ")
	    	.query("     , t.cust_id    , t.price_no                                                    ")
	    	.query("     , t.clss_1     , t.clss_2   , t.clss_3   , t.clss_4   , t.clss_5  , t.clss_6	")
	    	.query("     , t.pur_emp_id , t.bank_nm  , t.acct_no  , t.acct_own_nm                       ")
	    	.query("     , t.balance_limit, t.limit_control                                         	")
	    	.query(" )                                                                                	")
	    	.query("select x.stor_id    , y.hq_id , y.stor_grp , y.share_gp , y.sales_gb             	")
	    	.query("     , y.cust_id    , y.price_no                                                    ")
	    	.query("     , y.clss_1     , y.clss_2  , y.clss_3  , y.clss_4  , y.clss_5  , y.clss_6 		")
	    	.query("     , y.pur_emp_id , y.bank_nm  , y.acct_no  , y.acct_own_nm                       ")
	    	.query("     , y.balance_limit, y.limit_control                                         	")
	    	.query("  from cust_stor y                                                               	")
	    	.query("       join stor x on x.stor_id = :wrhs_id ", inv.fixParameter("wrhs_id"))
	    	.query(" where y.cust_id = :cust_id                ", inv.fixParameter("cust_id"))
	    	.query("   and y.stor_id = :stor_id                ", inv.fixParameter("stor_id"))
	    	.query("   and y.cust_id not in (                                                         	")
	    	.query("                        select cust_id                                            	")
	    	.query("                          from cust_stor                                         	")
	    	.query("                         where stor_id = :wrhs_id ", inv.fixParameter("wrhs_id"))
	    	.query("                           and cust_id = :cust_id ", inv.fixParameter("cust_id"))
	    	.query("                        )                                                         ")
	    ;data.attach(Action.direct);
	}

	/**
	 * 출고사업장의 품목 정보 생성
	 *
	 * @param arg
	 * @param pos_search
	 * @param data
	 * @param inv
	 * @throws Exception
	 */
	public void setItemStore(HttpRequestArgument arg, DataMessage pos_search, DataMessage data, SqlResultRow inv) throws Exception {

    	data.param
	    	.query("insert into                                  ")
	    	.query("   itm_stor t ( t.hq_id                      ")
	    	.query("                , t.stor_grp                 ")
	    	.query("                , t.stor_id                  ")
	    	.query("                , t.mst_itm_id               ")
	    	.query("                , t.item_idcd                   ")
	    	.query("                , t.vend_id                  ")
	    	.query("                , t.po_pri                   ")
	    	.query("                , t.po_pri_type              ")
	    	.query("                , t.po_pri_rt                ")
	    	.query(")                                            ")
	    	.query("select                                       ")
	    	.query("    a.hq_id                                  ")
	    	.query("    , :stor_grp                              ", inv.fixParameter("stor_grp"))
	    	.query("    , :wrhs_id                               ", inv.fixParameter("wrhs_id"))
	    	.query("    , a.mst_itm_id                           ")
	    	.query("    , a.item_idcd                               ")
	    	.query("    , a.vend_id                              ")
	    	.query("    , a.po_pri                               ")
	    	.query("    , a.po_pri_type                          ")
	    	.query("    , a.po_pri_rt                            ")
	    	.query("  from itm_stor a                            ")
	    	.query(" where a.stor_id = :stor_id ", inv.fixParameter("stor_id"))
	    	.query("   and a.mst_itm_id in ( select mst_itm_id from esti_item where inv_no = :inv_no ) ", inv.fixParameter("inv_no"))
	    	.query("   and a.item_idcd not in (                          ")
	    	.query("                        select distinct item_idcd    ")
	    	.query("                          from itm_stor           ")
	    	.query("                         where stor_id = :wrhs_id ", inv.fixParameter("wrhs_id"))
	    	.query("                           and mst_itm_id in ( select mst_itm_id from esti_item where inv_no = :inv_no ) ", inv.fixParameter("inv_no"))
	    	.query("                        )                                                                          ")
	    ;data.attach(Action.direct);
	}

	/**
	 * 상품검색
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}
			data.clear();
			data.param // 쿼리문  입력
				.query("select  a.mst_itm_id   , a.mst_itm_cd  , a.unt_qty , a.brcd_1 as barcode						")
				.query("     ,  a.unit_idcd       ,(select unit_name from item_unit where unit_idcd = a.unit_idcd) as unit_name		")
				.query("     ,  a.item_idcd       , a.item_code      , a.item_name  , a.item_ds , isnull(a.item_spec, '') as item_spec	")
				.query("     ,  a.cst_pri      , a.notax_yn    , '1' as qty												")
				.query("     ,  a.stad_sale_pri, a.min_ost_pri , a.sale_pri_1, a.sale_pri_2, a.sale_pri_3    			")
				.query("     ,  a.sale_pri_4  , a.sale_pri_5 												    		")
				.query("     ,  a.po_pri     , a.po_pri_type  , a.po_pri_rt   											")
				.query("from    itm_mst      a                               											")
				.query("where   a.item_idcd   in (:item_idcd) " , item_idcd )
				.query("and     a.row_sts  = 0 " )
			;
		 	SqlResultMap ret = data.selectForMap();

			return ret ;
	}



}
