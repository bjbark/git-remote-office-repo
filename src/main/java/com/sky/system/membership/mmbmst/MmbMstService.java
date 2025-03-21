package com.sky.system.membership.mmbmst;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class MmbMstService extends DefaultServiceHandler {
	/**
	 */
	public String getTest(int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
//        System.out.println("========================================================s");
//		System.out.println("jsonObj-------------------"+addr);
//		System.out.println("jsonObj-------------------"+jsonObj.toString() );
//		System.out.println("jsonOrders-------------------"+jsonOrders.toString() );
//		System.out.println("========================================================s");

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
            .query("select  *										                                           ")
        ;
		data.param
	        .where("from (												                                       ")
			.where("select                                                                                     ")
			.where("          a.mmb_id       , a.mmb_nm      , a.mmb_nicnm    , a.tel_no      , a.entry_dt     ")
			.where("        , a.bth_dt       , a.sex_gbcd    , a.local_nm     , a.etc_id      , a.passwd       ")
			.where("        , a.mmb_sts      , a.pnt_incr    , a.pnt_sbtr     , a.cur_pnt                      ")
			.where("        , a.user_memo     , a.sys_memo    , a.prnt_id                                       ")
			.where("        , a.row_lvl      , a.row_ord     , a.row_sts      , a.row_clos    , a.find_name      ")
			.where("        , a.upt_usr_nm   , a.upt_ip      , a.upt_dttm     , a.upt_id      , a.upt_ui       ")
			.where("        , a.crt_usr_nm   , a.crt_ip      , a.crt_dttm     , a.crt_id      , a.crt_ui       ")
			.where("from    mmb_mst a                                                                          ")
			.where("where   1=1                                                                                ")
//			.where("and     a.find_name  like %:find_name% " , arg.getParamText  ("find_name") )
//			.where("and     a.mmb_id = :mmb_id         " , arg.getParamText  ("mmb_id") )
//			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
//			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
//		if (page == 0 && rows == 0){
//			return data.selectForMap(sort);
//		} else {
//			return data.selectForMap(page, rows, (page==1), sort );
//		}
		return "tt";
	}

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
            .query("select  *										                                           ")
        ;
		data.param
	        .where("from (												                                       ")
			.where("select                                                                                     ")
			.where("          a.mmb_id       , a.mmb_nm      , a.mmb_nicnm    , a.tel_no      , a.entry_dt     ")
			.where("        , a.bth_dt       , a.sex_gbcd    , a.local_nm     , a.etc_id      , a.passwd       ")
			.where("        , a.mmb_sts      , a.pnt_incr    , a.pnt_sbtr     , a.cur_pnt                      ")
			.where("        , a.user_memo     , a.sys_memo    , a.prnt_id                                       ")
			.where("        , a.row_lvl      , a.row_ord     , a.row_sts      , a.row_clos    , a.find_name      ")
			.where("        , a.upt_usr_nm   , a.upt_ip      , a.upt_dttm     , a.upt_id      , a.upt_ui       ")
			.where("        , a.crt_usr_nm   , a.crt_ip      , a.crt_dttm     , a.crt_id      , a.crt_ui       ")
			.where("from    mmb_mst a                                                                          ")
			.where("where   1=1                                                                                ")
			.where("and     a.hq_id   =  :hq_id        " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name  like %:find_name% " , arg.getParamText  ("find_name") )
			.where("and     a.mmb_id  = :mmb_id        " , arg.getParamText  ("mmb_id") )
			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize ")
		;
		data.param // 쿼리문  입력
			.query("select *																				   ")
		;
		data.param
	        .where("from (												                                       ")
			.where("select                                                                                     ")
			.where("          a.mmb_id       , a.mmb_nm      , a.mmb_nicnm    , a.tel_no      , a.entry_dt     ")
			.where("        , a.bth_dt       , a.sex_gbcd    , a.local_nm     , a.etc_id      , a.passwd       ")
			.where("        , a.mmb_sts      , a.pnt_incr    , a.pnt_sbtr     , a.cur_pnt                      ")
			.where("        , a.user_memo     , a.sys_memo    , a.prnt_id                                       ")
			.where("        , a.row_lvl      , a.row_ord     , a.row_sts      , a.row_clos    , a.find_name      ")
			.where("        , a.upt_usr_nm   , a.upt_ip      , a.upt_dttm     , a.upt_id      , a.upt_ui       ")
			.where("        , a.crt_usr_nm   , a.crt_ip      , a.crt_dttm     , a.crt_id      , a.crt_ui       ")
			.where("from    mmb_mst a                                                                          ")
			.where("where   1=1                                                                                ")
			.where("and     a.hq_id   =  :hq_id       " , arg.fixParamText("hq_id") )
			.where("and     a.find_name like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.mmb_id  = :mmb_id       " , arg.getParamText("mmb_id") )
			.where("and     a.row_sts < :row_sts      " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts      " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		return data.selectForMap(page, rows, (page == 1) );
	}
	public SqlResultRow getClient(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("select *                                                                                   ")
		;
		data.param
	        .where("from (												                                       ")
			.where("select                                                                                     ")
			.where("          a.mmb_id       , a.mmb_nm      , a.mmb_nicnm    , a.tel_no      , a.entry_dt     ")
			.where("        , a.bth_dt       , a.sex_gbcd    , a.local_nm     , a.etc_id      , a.passwd       ")
			.where("        , a.mmb_sts      , a.pnt_incr    , a.pnt_sbtr     , a.cur_pnt                      ")
			.where("from    mmb_mst a                                                                          ")
			.where("where   1=1                                                                                ")
			.where("and     a.hq_id   =  :hq_id       " , arg.fixParamText("hq_id") )
			.where("and     a.mmb_id  = :mmb_id       " , arg.fixParamText("mmb_id") )
			.where("and     a.row_sts < :row_sts      " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		return data.selectForRow();
	}
	/**********************************************************************************************
	 * 로그인 후 사용자의 ip, dt를 update
	 *********************************************************************************************/
	public void setAccess(HttpRequestArgument arg, String login_pk) {
//		try {
//			DataMessage data = new DataMessage("MOASERVICE");
//			data.param
//		        .table("usr_mst ")
//		        .where("where emp_id  = :emp_id  " )
//		        .unique("emp_id"      , login_pk  )
//		        .update("access_ip"    , arg.remoteAddress 					 )
//		        .update("access_dt"    , new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
//			;data.attach(Action.update ).execute();
//		} catch (Exception ex ) {
//		}
	}

	/**
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
        			.table("mmb_mst")
        			.where("where hq_id   = :hq_id    " )
        			.where("and   mmb_id  = :mmb_id   " )
        			//
        			.unique("hq_id"            , row.fixParameter("hq_id"           ))
        			.unique("mmb_id"           , row.fixParameter("mmb_id"          ))
        			.update("row_sts"          , 2                                   )
        			.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);
			}else{
			data.param
			.table("mmb_mst"                                                            )
				.where("where hq_id           = :hq_id                                 ")  /*  본사ID  */
				.where("and   mmb_id          = :mmb_id                                ")  /*  회원ID  */
			    //
				.unique("hq_id"               , row.fixParameter("hq_id"               ))
				.unique("mmb_id"              , row.fixParameter("mmb_id"              ))
			    //
				.update("mmb_nm"              , row.getParameter("mmb_nm"              ))  /*  회원명  */
				.update("mmb_nicnm"           , row.getParameter("mmb_nicnm"           ))  /*  회원별명  */
				.update("tel_no"              , row.getParameter("tel_no"              ))  /*  전화번호  */
				.update("entry_dt"            , row.getParameter("entry_dt"            ))  /*  가입일자  */
				.update("bth_dt"              , row.getParameter("bth_dt"              ))  /*  생년월일  */
				.update("sex_gbcd"            , row.getParameter("sex_gbcd"            ))  /*  성별구분코드  */
				.update("local_nm"            , row.getParameter("local_nm"            ))  /*  지역명  */
				.update("etc_id"              , row.getParameter("etc_id"              ))  /*  기타ID  */
				.update("passwd"              , row.getParameter("passwd"              ))  /*  비밀번호  */
				.update("mmb_sts"             , row.getParameter("mmb_sts"             ))  /*  회원상태  */
				.update("pnt_incr"            , row.getParameter("pnt_incr"            ))  /*  포인트증가  */
				.update("user_memo"            , row.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("pnt_sbtr"            , row.getParameter("pnt_sbtr"            ))  /*  포인트차감  */
				.update("sys_memo"            , row.getParameter("sys_memo"            ))  /*  시스템메모  */
				.update("cur_pnt"             , row.getParameter("cur_pnt"             ))  /*  현재포인트  */
				.update("prnt_id"             , row.getParameter("prnt_id"             ))  /*  상위 ID  */
				.update("row_lvl"             , row.getParameter("row_lvl"             ))  /*  ROW레벨  */
				.update("row_ord"             , row.getParameter("row_ord"             ))  /*  ROW순서  */
				.update("row_sts"             , row.getParameter("row_sts"             ))  /*  ROW상태  */
				.update("row_clos"            , row.getParameter("row_clos"            ))  /*  마감여부  */
	        	.update("find_name"      	      , row.getParamText("mmb_id"       	   ).trim()
					                          + row.getParamText("mmb_nm"              ).trim()
					                          + row.getParamText("tel_no"              ).trim()
					                          + row.getParamText("mmb_nicnm"           ).trim() )
				.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
				.update("upt_ip"              , row.getParameter("upt_ip"              ))  /*  수정IP  */
				.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("upt_id"              , row.getParameter("upt_id"              ))  /*  수정ID  */
				.update("upt_ui"              , row.getParameter("upt_ui"              ))  /*  수정UI  */
				.insert("crt_usr_nm"          , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
				.insert("crt_ip"              , row.getParameter("crt_ip"              ))  /*  생성IP  */
				.insert("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crt_id"              , row.getParameter("crt_id"              ))  /*  생성ID  */
				.insert("crt_ui"              , row.getParameter("crt_ui"              ))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
