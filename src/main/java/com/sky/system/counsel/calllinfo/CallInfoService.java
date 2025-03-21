package com.sky.system.counsel.calllinfo;

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
public class CallInfoService  extends DefaultServiceHandler {
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
			.where("where  a.stor_grp  =  :stor_grp " , arg.fixParameter("stor_grp" )  )
			.where("and    a.mmb_id   =  :mmb_id  " , arg.getParameter("mmb_id" )  )
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts <= 1" )
			.where("order by call_dt desc , call_tm desc" )
		;
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1),sort);
	}


	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSummary(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

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
			.where("where  a.stor_grp  =  :stor_grp " , arg.fixParameter("stor_grp" )  )
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts <= 1" )
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
				.update("call_tm"                 , row.getParameter("call_tm"          ))
				.update("send_dt"                 , row.getParameter("send_dt"          ))
				.update("send_tm"                 , row.getParameter("send_tm"          ))
				.update("reply_req_yn"            , row.getParameter("reply_req_yn"     ))
				.update("reply_dt"                , row.getParameter("reply_dt"         ))
				.update("reply_tm"                , row.getParameter("reply_tm"         ))

				.update("call_sts"                , row.getParameter("call_sts"         ))
				.update("cust_grp"                 , row.getParameter("cust_grp"          ))
				.update("cust_id"                 , row.getParameter("cust_id"          ))
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


	public SqlResultMap setCustMemb(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

        	data.param
		        .table("cust_memb")
		        .where("where mmb_id  = :mmb_id  " )
		        //
		        .unique("mmb_id"                 , row.fixParameter("mmb_id"         ))

  		        .update("tendency_id"             , row.getParameter("tendency_id"     ))
  		        .update("tendency_ds"             , row.getParameter("tendency_ds"     ))
  		        .update("upt_id"               , row.getParameter("upt_id"       ))
  		        .update("upt_ip"               , arg.remoteAddress )
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

        	;data.attach(Action.update);

		}
		data.execute();
		return null ;
	}



	public SqlResultMap setCustInfo(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

        	data.param
		        .table("cust_mst")
		        .where("where cust_id  = :cust_id  " )
		        //
		        .unique("cust_id"            , row.fixParameter("cust_id"    ))

  		        .update("biz_nm"             , row.getParameter("biz_nm"     ))
  		        .update("biz_no"             , row.getParameter("biz_no"     ))
  		        .update("biz_kind"           , row.getParameter("biz_kind"   ))
  		        .update("biz_type"          , row.getParameter("biz_type"  ))
  		        .update("biz_owner"          , row.getParameter("biz_owner"  ))
  		        .update("biz_gb"             , row.getParameter("biz_gb"     ))
  		        .update("biz_tel_no"         , row.getParameter("biz_tel_no" ))
  		        .update("biz_fax_no"         , row.getParameter("biz_fax_no" ))
  		        .update("biz_hp_no"         , row.getParameter("biz_hp_no" ))
  		        .update("biz_email"          , row.getParameter("biz_email"  ))

  		        .update("biz_zip_cd"         , row.getParameter("biz_zip_cd" ))
  		        .update("biz_state"          , row.getParameter("biz_state"  ))
  		        .update("biz_city"           , row.getParameter("biz_city"   ))
  		        .update("biz_dong"           , row.getParameter("biz_dong"   ))
  		        .update("biz_addr_1"          , row.getParameter("biz_addr_1"  ))
  		        .update("biz_addr_2"          , row.getParameter("biz_addr_2"  ))

  		        .update("upt_id"          , row.getParameter("upt_id"  ))
				.update("upt_ip"   	  	 , arg.remoteAddress )
		        .update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

        	;data.attach(Action.update);


			//if (!"".equals(row.getParameter("small_id")) && !"".equals(arg.getParamText("web_ddns")) ) {
			if ( !"".equals(arg.getParamText("web_ddns")) ) {

				data.param
					.table("cust_mst")
					.where("where cust_id  = :cust_id  " )
					//
			        .unique("cust_id"            , row.fixParameter("cust_id"    ))

	  		        .update("biz_nm"             , row.getParameter("biz_nm"     ))
	  		        .update("biz_no"             , row.getParameter("biz_no"     ))
	  		        .update("biz_kind"           , row.getParameter("biz_kind"   ))
	  		        .update("biz_type"          , row.getParameter("biz_type"  ))
	  		        .update("biz_owner"          , row.getParameter("biz_owner"  ))
	  		        .update("biz_gb"             , row.getParameter("biz_gb"     ))
	  		        .update("biz_tel_no"         , row.getParameter("biz_tel_no" ))
	  		        .update("biz_fax_no"         , row.getParameter("biz_fax_no" ))
	  		        .update("biz_hp_no"         , row.getParameter("biz_hp_no" ))
	  		        .update("biz_email"          , row.getParameter("biz_email"  ))

	  		        .update("biz_zip_cd"         , row.getParameter("biz_zip_cd" ))
	  		        .update("biz_state"          , row.getParameter("biz_state"  ))
	  		        .update("biz_city"           , row.getParameter("biz_city"   ))
	  		        .update("biz_dong"           , row.getParameter("biz_dong"   ))
	  		        .update("biz_addr_1"          , row.getParameter("biz_addr_1"  ))
	  		        .update("biz_addr_2"          , row.getParameter("biz_addr_2"  ))

					.update("upt_id" 	  	 , row.getParameter("upt_id"		))
					.update("upt_ip"   	  	 , arg.remoteAddress )
					.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.update , arg.getParamText("web_ddns") );
			}

		}
		data.execute();
		return null ;
	}


	/**
	 * 현황조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getOrderSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String search_id = arg.fixParamText("search_id" );
		String find_name = arg.getParamText("find_name" );

		String dt_gb  = arg.fixParamText("dt_gb" );
		String fr_dt  = arg.fixParamText("fr_dt" );
		String to_dt  = arg.fixParamText("to_dt" );

		String[] chnl = arg.getParamCast("chnl" , String[].class);
		String[] sts_cd  = arg.getParamCast("sts_cd"  , String[].class);


		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize	, sum(a.inv_amt) as inv_amt,  sum(a.payment) as payment, sum(a.npay_amt) as npay_amt, sum(a.paysale) as paysale	 ")
		;
		data.param
			.query("select a.stor_id  , a.wrhs_id ,  w.stor_nm as wareh_nm     ")
			//.query("   ,   (select stor_nm from stor where stor_id = a.wrhs_id ) as wareh_nm 	")
			.query("   ,   a.inv_no      , a.ori_dt      , a.ori_tm   , a.inv_dt   , a.sts_cd    , a.chnl   ")
			.query("   ,   a.inv_amt      , a.payment     , a.npay_amt  , a.pay_id    , a.paysale     		")  
			.query("   ,   a.cust_id     , c.cust_cd     , a.cust_nm 	, a.inv_inpt_path                   ")
			.query("   ,   a.mmb_id     , a.memb_login  , a.mmb_nm      	                        		")   
			.query("   ,   a.req_msg     , a.memb_email  , a.memb_tel_no , a.memb_hp_no                     ")  
			.query("   ,   a.reve_nm     , a.reve_tel_no  , a.reve_hp_no  , a.reve_email  , a.reve_zip_cd   ")
			.query("   ,   a.reve_addr_1  , a.reve_addr_2													")
			.query("   ,   a.user_memo   , a.row_clos    													")
			.query("   ,   a.pack_lst_prt_yn  , a.cash_rcpt_gb   , a.cash_rcpt_no                           ")
			.query("   ,   a.biz_no       , a.biz_nm       , a.biz_kind     , a.biz_type            		")
			.query("   ,   a.biz_owner                                                               			")
//			.query("   ,   a.biz_addr_1 || ' ' || biz_addr_2 ) as biz_addr                      			")
			.query("   ,   a.biz_addr_1 + ' ' + biz_addr_2 ) as biz_addr                      				")
			.query("   ,   a.ret_no      , a.ret_contents , a.reve_gb                             			")
			.query("   ,   r.reason_nm as ret_reason_nm                                              		")
			.query("   ,   p.cpn_no   , i.cpn_nm                                               				")

		;
		data.param
		    .where("from   order_mst a   															 ")
			.where("       join stor w      on w.stor_id = a.wrhs_id          				     ")
			.where("       join cust_mst  c on a.cust_id  = c.cust_id           				     ")
			.where("       join cust_memb  d on a.mmb_id  = d.mmb_id           				     ")
			.where("       join cust_stor b on b.stor_id = a.stor_id and b.cust_id  = a.cust_id   ")
			.where("                        and b.clss_1  = :clss_1          " , arg.getParameter("clss_1" )) // 고객1차분류
			.where("                        and b.clss_2  = :clss_2          " , arg.getParameter("clss_2" )) // 고객2차분류
			.where("                        and b.clss_3  = :clss_3          " , arg.getParameter("clss_3" )) // 고객3차분류
			.where("       left outer join shop_reason r on r.reason_id = a.ret_reason_id           ")
			.where("       left outer join cust_cpn p on p.cpn_no = a.cpn_no      		    ")
			.where("       left outer join cpn_mst i on i.cpn_id = p.cpn_id               ")
			.where("       left outer join usr_mst u on a.upt_id = u.emp_id               	")

			.where("where  a.stor_id  = :stor_id       " , arg.fixParameter("stor_id" ) )  // or a.wrhs_id = :stor_id
			.where("and    a.stor_grp  = :stor_grp 	     " , arg.fixParameter("stor_grp" ) )
			.where("and    a.wrhs_id  = :wrhs_id       " , arg.getParameter("wrhs_id" ) )  // or a.wrhs_id = :stor_id
			.where("and    a.row_sts = 0               " )
		;
		//  주문 번호가 존재 한다면
		if ("1".equals( search_id ) && !"".equals(find_name)) {
			data.param
				.where("and    a.inv_no   = :find_name   " , find_name ) // 주문번호
			;
		} else { // 주문 번호 조건이 없다면
			data.param
				.where("and    a.inv_dt between :fr_dt       " , fr_dt , "1".equals( dt_gb ))  // 배송예정사작일자
				.where("                    and :to_dt       " , to_dt , "1".equals( dt_gb ))  // 배송예정종료일자
				.where("and    a.ori_dt between :fr_dt       " , fr_dt , "2".equals( dt_gb ))  // 주문사작일자
				.where("                    and :to_dt       " , to_dt , "2".equals( dt_gb ))  // 주문종료일자
				.where("and    a.row_clos = :row_clos      " , arg.getParameter("row_clos" )) // 마감여부  1:마감
				.where("and    a.cust_id  =   :cust_id       " , arg.getParameter("cust_id" )) // 고객코드
				.where("and    a.sts_cd   in (:sts_cd  )     " , sts_cd  ,( sts_cd.length  > 0) ) // 주문상태
		    	.where("and    a.chnl  in (:chnl )     " , chnl ,( chnl.length > 0) ) /* 매출구분 */
				.where("and    a.pay_id   = :pay_id          " , arg.getParameter("pay_id" )) // 마감여부  1:마감
				.where("and    a.cust_nm  like %:find_name%  " , find_name , "2".equals( search_id )) // 고객명
				.where("and    a.mmb_nm  like %:find_name%  " , find_name , "3".equals( search_id )) // 회원명
				.where("and    d.login_id like :find_name%   " , find_name.toUpperCase() , "4".equals( search_id )) // 로그인 ID
				.where("and    a.mmb_id  like %:find_name%  " , find_name , "5".equals( search_id )) // 회원id
			;
			if ("".equals(sort)) {
				data.param
					.where(" order by a. inv_no	desc  " )
				;
			}
		}
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1),sort);
	}

	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getOrderDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query(" select a.seq_dsp                                                                           ")
			.query("      , a.item_code                                                                           ")
			.query("      , d.itm_shrt_cd                                                                           ")
			.query("      , a.item_name                                                                           ")
			.query("      , a.item_spec                                                                           ")
			.query("      , v.vend_nm as scm_nm   ")
	     	.query("      , p.zone_nm as pkg_nm   ")
			.query("      , a.unit_name                                                              ") // 단위명
			.query("      , a.piece_qty                                                                          ")
			.query("      , a.org_ord_qty                                                                          ")
			.query("      , a.qty                                                                               ")
			.query("      , a.deli_qty                                                                          ")
			.query("      , a.rest_qty                                                                          ")
			.query("      , a.pri                                                                              ")
			.query("      , a.sply_amt                                                                           ")
			.query("      , a.tax_amt                                                                                ")
			.query("      , a.txfree_amt                                                                           ")
			.query("      , a.inv_amt                                                                             ")
			.query("      , a.user_memo                                                                          ")
			.query("      , a.deli_memo                                                                          ")
			.query(" from   order_dtl a                                                                         ")
			.query("        join itm_mst d    on d.item_idcd = a.item_idcd	         			                    ")
			.query("        left outer join vend_mst  v on v.vend_id  = a.scm_id  ")
			.query("        left outer join itm_zone  p on p.zone_id  = a.pkg_id  ")
			.query(" where  a.inv_no = :inv_no                                                                   ", arg.fixParameter("inv_no"))
			.query(" and    a.row_sts = 0                                                                      ")
			.query(" order by a.seq_top, a.line_seqn                                                              ")
		;

	    return data.selectForMap();
	}

	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getOrderPayment(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.hq_id  , a.stor_id     							 ")
			.query("     , a.pay_dt    , a.pay_no     , a.pay_id      , a.pay_gb     ")
			.query("     , a.payment   , a.paysale                                   ")
			.query("from   order_payment a                                   						")
			.query("where  a.inv_no  = :inv_no     " , arg.fixParameter("inv_no" 		            ))
			.query("and    a.row_sts = 0           												")
			.query("order by a.pay_dt, a.pay_no		    											")
		;
	    return data.selectForMap();
	}
	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getOrderTel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  call_sts , call_cl , call_gb ,  call_dt ,call_tm ,call_user_nm			")
			.query("        ,cont_cont , reply_contents ,comp_user_nm ,   inv_no   ,call_no  		")
 			.query("from    call_info																")
			.query("where   inv_no  = :inv_no     " , arg.fixParameter("inv_no" 		            ))
			.query("and     row_sts = 0           												")
		;
	    return data.selectForMap();
	}
	/**
	 * 디테일 조회
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getOrderSale(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select m.inv_dt, m.wrhs_id															")
			.query("       ,(select stor_nm from stor s where m.wrhs_id = s.stor_id) as  wareh_nm	")
			.query("       ,m.inv_dt, m.inv_tm															")
			.query("       ,d.line_seqn,d.item_code, d.item_name,d.item_spec, d.unit_idcd, d.piece_qty				")
			.query("       ,d.qty, d.org_ord_qty,d.deli_qty, d.txfree_amt, d.sply_amt, d.tax_amt					")
			.query("       ,d.inv_amt																	")
			.query("from sale_dtl d, sale_mst m														")
			.query("where d.inv_no = m.inv_no															")
			.query("and   m.org_inv_no = :inv_no     " , arg.fixParameter("inv_no" 		            		))
		;
	    return data.selectForMap();
	}



}