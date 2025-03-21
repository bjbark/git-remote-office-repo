package com.sky.system.membership.point;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class PointService extends DefaultServiceHandler {
	/**
	 */
	public SqlResultMap getSearchMember(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
		data.param
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
			.where("and     a.hq_id   = :hq_id        " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.mmb_id  = :mmb_id       " , arg.getParamText("mmb_id") )
			.where("and     a.row_sts < :row_sts      " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts      " , "2" , "".equals(arg.getParamText("row_sts" )) )
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

		if (arg.getParamText  ("mmb_id").length() == 0) {
			throw new ServiceException("회원번호가 누락되었습니다." );
		}

		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
            .query("select  *										                                                          ")
        ;
		data.param
	        .where("from (												                                                      ")
			.where("select                                                                                                    ")
			.where("          a.inv_no        , a.inv_dt       , a.mmb_id       , a.inv_gbcd      , a.stor_id                 ")
			.where("        , a.inv_amt       , a.pnt_incr     , a.pnt_sbtr                                                   ")
			.where("        , a.user_memo      , a.sys_memo     , a.prnt_id                                                    ")
			.where("        , m.mmb_nm        , m.pnt_incr as m_pnt_incr , m.pnt_sbtr as m_pnt_sbrt , m.cur_pnt  as m_cur_pnt ")
			.where("        , s.stor_nm                                                                                       ")
			.where("        , a.row_lvl       , a.row_ord      , a.row_sts      , a.row_clos      , a.find_name                 ")
			.where("        , a.upt_usr_nm    , a.upt_ip       , a.upt_dttm     , a.upt_id        , a.upt_ui                  ")
			.where("        , a.crt_usr_nm    , a.crt_ip       , a.crt_dttm     , a.crt_id        , a.crt_ui                  ")
			.where("from    pnt_book a                                                                                        ")
			.where("        left outer join mmb_mst m on a.mmb_id = m.mmb_id                                                  ")
			.where("        left outer join pnt_stor s on a.stor_id = s.stor_id                                               ")
			.where("where   1=1                                                                                               ")
			.where("and     a.hq_id   = :hq_id       " , arg.fixParamText  ("hq_id") )
			.where("and     a.row_sts < :row_sts     " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts     " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where("and     a.inv_dt between :fr_dt  " , arg.getParamText  ("fr_dt") )
			.where("                 and     :to_dt  " , arg.getParamText  ("to_dt") )
			.where("and     a.mmb_id = :mmb_id       " , arg.getParamText  ("mmb_id") )
			.where("order by a.crt_dttm desc,   a.mmb_id                                                                      ")
			.where(") a ")
			;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	/**
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			data.clear();
			data.param
			 	.query("select a.mmb_id , a.row_clos , a.row_sts     ")
			 	.query("from   mmb_mst a        ")
			 	.query("where  a.hq_id  = :hq_id  ", row.fixParameter("hq_id"               ))
			 	.query("and    a.mmb_id = :mmb_id ", row.fixParameter("mmb_id"              ))
			 	.query("and    a.row_sts = 0    ")
			;
			SqlResultRow del = data.selectForRow();
			if (del == null) {
				throw new ServiceException("등록되지 않은 회원번호입니다." );
			}
			if ( Double.parseDouble(row.getParamText("pnt_incr")) == 0 && Double.parseDouble(row.getParamText("pnt_sbtr")) == 0 ) {
				throw new ServiceException("포인트 값이 잘못 되었습니다." );
			}

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.clear();
	        	data.param
        			.table("pnt_book")
        			.where("where hq_id   = :hq_id    " )
        			.where("and   inv_no  = :inv_no   " )
        			//
        			.unique("hq_id"             , row.fixParameter("hq_id"        ))
        			.unique("inv_no"            , row.fixParameter("inv_no"       ))
        			.update("row_sts"           , 2                                   )
        			.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);
			}else{
			data.clear();
			data.param
				.table("pnt_book"                                                       )
				.where("where hq_id           = :hq_id                                 ")  /*  거래번호  */
				.where("and   inv_no          = :inv_no                                ")  /*  거래번호  */
				.where("and   inv_dt          = :inv_dt                                ")  /*  거래일자  */
			    //
				.unique("hq_id"               , row.fixParameter("hq_id"               ))
				.unique("inv_no"              , row.fixParameter("inv_no"              ))
				.unique("inv_dt"              , row.fixParameter("inv_dt"              ))
			    //
				.update("mmb_id"              , row.fixParameter("mmb_id"              ))  /*  회원ID  */
				.update("inv_gbcd"            , row.getParameter("inv_gbcd"            ))  /*  invoice구분코드  */
				.update("stor_id"             , row.getParameter("stor_id"             ))  /*  매장ID  */
				.update("inv_amt"             , row.getParameter("inv_amt"             ))  /*  금액  */
				.update("pnt_incr"            , row.getParameter("pnt_incr"            ))  /*  포인트증가  */
				.update("pnt_sbtr"            , row.getParameter("pnt_sbtr"            ))  /*  포인트차감  */
				.update("user_memo"            , row.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("sys_memo"            , row.getParameter("sys_memo"            ))  /*  시스템메모  */
				.update("prnt_id"             , row.getParameter("prnt_id"             ))  /*  상위 ID  */
				.update("row_lvl"             , row.getParameter("row_lvl"             ))  /*  ROW레벨  */
				.update("row_ord"             , row.getParameter("row_ord"             ))  /*  ROW순서  */
				.update("row_sts"             , row.getParameter("row_sts"             ))  /*  ROW상태  */
				.update("row_clos"            , row.getParameter("row_clos"            ))  /*  마감여부  */
				.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정   */
	        	.update("find_name"      	      , row.getParamText("mmb_id"       	   ).trim()
					                          + row.getParamText("inv_dt"              ).trim()
					                          + row.getParamText("stor_id"        	   ).trim() )
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
			data.param
				.query("update mmb_mst a                                               ")
				.query("   set a.pnt_incr =( select ifnull(sum(b.pnt_incr), 0)         ")
				.query("                     from   pnt_book b                         ")
				.query("                     where  b.mmb_id = a.mmb_id                ")
				.query("   					 and    b.row_sts = 0)                     ")
				.query("     , a.pnt_sbtr =( select ifnull(sum(b.pnt_sbtr), 0)         ")
				.query("                     from   pnt_book b                         ")
				.query("                     where  b.mmb_id = a.mmb_id                ")
				.query("   					 and    b.row_sts = 0)                     ")
				.query("     , a.cur_pnt =( select  ifnull(sum(b.pnt_incr), 0)         ")
				.query("                          - ifnull(sum(b.pnt_sbtr), 0)         ")
				.query("                     from   pnt_book b                         ")
				.query("                     where  b.mmb_id = a.mmb_id                ")
				.query("   					 and    b.row_sts = 0)                     ")
				.query(" where a.hq_id  = :hq_id  ", row.fixParameter("hq_id"))
				.query(" and   a.mmb_id = :mmb_id ", row.fixParameter("mmb_id"))
			.action = Action.direct;
			data.attach();
		}
		data.execute();
		return null ;
	}

}
