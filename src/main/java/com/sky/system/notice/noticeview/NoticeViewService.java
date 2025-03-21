package com.sky.system.notice.noticeview;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class NoticeViewService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																			")
			.query("           a.invc_numb , a.bord_idcd      , a.ntce_stdt      , a.ntce_eddt		")
			.query("         , a.dwup_date , a.dwup_time											")
			.query("         , a.emgc_yorn , a.ntce_ttle      , a.sbsd_ttle      , a.ntce_cont		")
			.query("         , a.scrt_yorn , a.mail_addr      , a.mail_ansr_yorn , a.tele_numb		")
			.query("         , a.inqy_qntt , a.ansr_yorn      , a.pswd								")
			.query("         , a.user_memo , a.sysm_memo      , a.prnt_idcd							")
			.query("         , a.line_levl , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("         , a.find_name , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("         , a.updt_idcd , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("         , a.crte_dttm , a.crte_idcd      , a.crte_urif      , b.ansr_cont		")
			.query("         , a.dwup_empy_idcd  as empy_idcd , a.dwup_empy_name 					")
			.query("         , a.ansr_yorn , b.insp_yorn		 									")

		;
		data.param //퀴리문
			.where("from	ntce_mast a															")
			.where("		left outer join ntce_view b on a.invc_numb= b.invc_numb				")
			.where("where	1=1																	")
			.where("and		b.empy_idcd =   :empy_idcd"		, arg.getParamText("empy_idcd"))
			.where("and     a.ntce_eddt  >= :fr_dt   "		, arg.getParamText("fr_dt" ))
			.where("and     a.ntce_eddt  <= :to_dt   "		, arg.getParamText("to_dt" ))
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and     a.emgc_yorn  = :emgc_yorn   "	, arg.getParamText("emgc_yorn" ) , !"".equals(arg.getParamText("emgc_yorn" )) )
			.where("and    a.line_stat  =  :line_stat1   " , "0"  ,( "0".equals(arg.getParamText("line_stat")) ))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getMobileSearch(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select																			")
			.query("           a.invc_numb , a.ntce_ttle      										")
			.query("         , a.dwup_empy_idcd  as empy_idcd , a.dwup_empy_name 					")
			.query("         , a.ansr_yorn , b.insp_yorn		 									")
			.query("         , convert(a.ntce_cont	using utf8 ) as ntce_cont						")

		;
		data.param //퀴리문
			.where("from	ntce_mast a															")
			.where("		left outer join ntce_view b on a.invc_numb= b.invc_numb				")
			.where("where	1=1																	")
			.where("and		b.empy_idcd =   :empy_idcd"		, arg.getParamText("empy_idcd"))
			.where("and     a.ntce_stdt  <= date_format(now(),'%Y%m%d')   						")
			.where("and     a.ntce_eddt  >= date_format(now(),'%Y%m%d')   						")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap();
	}
	public SqlResultMap getNotification(HttpRequestArgument arg ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   group_concat(a.ntce_ttle) as ntce_ttle									")

		;
		data.param //퀴리문
			.where("from	ntce_mast a																")
			.where("left outer join ntce_view b on a.invc_numb= b.invc_numb							")
			.where("where   1=1																		")
			.where("and     b.insp_yorn  <> '1'														")
			.where("and     b.empy_idcd  = :empy_idcd"		, arg.getParamText("empy_idcd"))
			.where("and     a.line_stat  =  :line_stat   " , "0"  ,( "0".equals(arg.getParamText("line_stat")) ))
		;
		return data.selectForMap();
	}
		/**
		공지내용저장 *
		 */
			public SqlResultMap setInsp(HttpRequestArgument arg) throws Exception {

				DataMessage data;
				String hq    = arg.getParamText("hq_id") ;
				String stor  = arg.getParamText("stor_id");

				if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
				else                  { data = arg.newStorage("POS");      }
				Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

				data.param
					.table("ntce_view"                                               )
					.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
					.where("and   empy_idcd		= :empy_idcd")  /*  사원ID  */
					//
					.unique("invc_numb"			, arg.fixParameter("invc_numb"))
					.unique("empy_idcd"			, arg.fixParameter("empy_idcd"))
					//
					.update("ansr_cont"			, arg.getParameter("ansr_cont"))  	/*  답글  */
					.update("insp_yorn"			, arg.getParameter("insp_yorn"))   /*  확인여부  */
					.update("insp_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 작성일자 */
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				return null;
			}



}
