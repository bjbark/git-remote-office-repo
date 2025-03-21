package com.sky.system.counsel.callcustinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class CallCustInfoService extends DefaultServiceHandler{


	/**
	 * 다이얼로그 -  회원
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getLookupMemb(HttpRequestArgument arg, int page, int rows) throws Exception {

		//String search_gb = arg.fixParamText("search_gb" ); // 검색어. 0: 전체, 1:매입처명, 2.사업자번호
		String find_name = arg.getParamText("find_name" );

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select ")
			.query("        o.stor_id     ")
			.query("     ,  a.cust_grp      ")
			.query("     ,  a.cust_cd      ")
			.query("     ,  a.cust_nm      ")
			.query("     ,  b.login_id     ")
			.query("     ,  a.cust_gb      ")
			.query("     ,  b.mmb_id      ")
			.query("     ,  b.mmb_nm      ")
			.query("     ,  a.cust_sts     ")
			.query("     ,  a.biz_nm       ")
//			.query("     ,  (a.biz_addr_1 || ' ' || a.biz_addr_2 ) as biz_addr_1    ")
			.query("     ,  (a.biz_addr_1 + ' ' + a.biz_addr_2 ) as biz_addr_1    ")
			.query("     ,  a.biz_tel_no   ")
			.query("     ,  a.biz_hp_no   ")
			.query("     ,  b.tel_no as tel_no   ")
			.query("     ,  b.hp_no as hp_no   ")
//			.query("     ,  (b.addr_1 || ' ' || b.addr_2 ) as memb_addr_1    ")
			.query("     ,  (b.addr_1 + ' ' + b.addr_2 ) as memb_addr_1    ")
			.query("     ,  a.user_memo   ")
		;
		data.param
			.where("from   cust_mst             a       ")
			.where("       join cust_memb        b on b.mmb_id  = a.cust_id             ")
			.where("       left outer join small_mst        s on s.small_id  = a.small_id  ")
			.where("       left outer join stor o on o.stor_id = a.mngt_stor_id            ")
			.where("       left outer join stor os on os.stor_id = b.order_stor_id    ")
			.where("       left outer join cust_grade g on g.grade_id = a.grade_id       ")
			.where("       left outer join usr_mst u on u.emp_id = b.join_salesman_id ")
			.where("where  o.stor_id  = :stor_id       "    , arg.fixParameter("stor_id" ))
			.where("and    b.find_name  like  %:find_name% "  , find_name  ) // 검색어가 고객명일 경우
			.where("and    b.row_sts  = :row_sts " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("order by   a.cust_nm , a.cust_cd				 							")
		;
		return data.selectForMap(page, rows , (page==1) );
	}


	public SqlResultMap getRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  a.hq_id     , a.mngt_stor_id, o.stor_nm as owner_nm    ")  //SQL_CALC_FOUND_ROWS
			.query("     ,  a.small_grp , a.small_id    , s.small_nm   , a.chnl  , a.cust_sts  ")
			.query("     ,  a.cust_id   , a.cust_nm     , a.cust_dt    , a.cust_gb,    a.cust_cd,     a.shop_yn 				")
			.query("     ,  a.biz_yn    , a.biz_gb      , a.biz_no     , a.biz_nm,     a.biz_kind,    a.biz_type				")
			.query("     ,  a.biz_owner   , a.biz_email   , a.biz_tel_no , a.biz_hp_no , a.biz_fax_no,  a.biz_taxtn_gb 			")
			.query("     ,  a.biz_state , a.biz_city,   a.biz_dong,   a.biz_zip_id , a.biz_zip_cd,  a.biz_addr_1,   a.biz_addr_2		")
			.query("     ,  a.pri_no    , a.biz_image        	")
			.query("     ,  a.taekbae_fee_yn    , b.order_stor_id  , os.stor_nm as order_stor_nm	")

			.query("     ,  b.login_id          , b.mmb_id      , b.mmb_nm     , b.memb_dt ,     b.memb_gb,    b.memb_sts	   ")
			.query("     ,  b.tel_no            , b.hp_no      , b.fax_no     , b.email   			")
			.query("     ,  b.state        , b.city   , b.dong  , b.zip_id,      b.zip_cd								")
			.query("     ,  b.addr_1            , b.addr_2	  																		")
			.query("     ,  b.sex               , b.birth_dt    , b.birth_dt_gb   , b.marital_yn,  b.marital_dt	   		")//, b.leave_rm
			.query("     ,  b.clause_agree_yn   , b.person_info_use_yn , b.third_party_use_yn , b.government_yn   , b.mileage_agree_yn ")
			.query("     ,  b.join_salesman_id  , u.emp_nm as join_salesman_nm , b.join_channel_gb    , b.join_channel_nm    , b.recommender_id	")
			.query("     ,  b.recv_mail_yn      , b.recv_sms_yn , b.recv_dm_yn                                       ")
			.query("     ,  a.grade_id          , g.grade_nm	, b.final_order_dt , b.final_order_tm		     	")
			.query("     ,  b.user_memo          , b.row_sts	    , b.tendency_id    , b.tendency_ds, t.bas_nm as tendency_nm, t.bas_nm_englh as tendency_color	")

			.query("from   cust_mst             a       ")
			.query("       join cust_memb        b on b.mmb_id  = a.cust_id  and b.mmb_id = :mmb_id " , arg.fixParameter("mmb_id"   ))
			.query("       left outer join small_mst s on s.small_id  = a.small_id    	 ")
			.query("       left outer join stor o on o.stor_id = a.mngt_stor_id            ")
			.query("       left outer join stor os on os.stor_id = b.order_stor_id    ")
			.query("       left outer join cust_grade g on g.grade_id = a.grade_id       ")
			.query("       left outer join usr_mst u on u.emp_id = b.join_salesman_id ")
			.query("       left outer join base_mst t on t.bas_cd = b.tendency_id and t.prnt_id = '5110' ")

			.query("where  o.stor_id  =  :stor_id    " , arg.fixParameter("stor_id"  ))
			.query("and    a.row_sts < 2  " )
		 ;
		    return data.selectForMap();
		}

}

