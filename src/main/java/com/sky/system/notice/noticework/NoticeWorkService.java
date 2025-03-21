package com.sky.system.notice.noticework;

import java.sql.Blob;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.sql.rowset.serial.SerialBlob;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class NoticeWorkService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																					")
			.query("           a.invc_numb      , a.bord_idcd       , a.ntce_stdt       , a.ntce_eddt		")
			.query("         , a.dwup_date      , a.dwup_time												")
			.query("         , a.emgc_yorn      , a.ntce_ttle       , a.sbsd_ttle       , a.ntce_cont 		")
			.query("         , a.scrt_yorn      , a.mail_addr       , a.mail_ansr_yorn  , a.tele_numb		")
			.query("         , a.inqy_qntt      , a.ansr_yorn       , a.pswd			, a.ntce_dvcd		")
			.query("         , a.user_memo      , a.sysm_memo       , a.prnt_idcd							")
			.query("         , a.line_levl      , a.line_ordr       , a.line_stat       , a.line_clos		")
			.query("         , a.find_name      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm		")
			.query("         , a.updt_idcd      , a.updt_urif       , a.crte_user_name	, a.crte_ipad		")
			.query("         , a.crte_dttm      , a.crte_idcd       , a.crte_urif							")
			.query("         , d.item_name as ntce_name 													")
			.query("         , a.dwup_empy_idcd  as empy_idcd , a.dwup_empy_name							")
		;
		data.param //퀴리문
			.where("from	ntce_mast a																		")
			.where("left outer join sscd_view d on d.sscd_code = 'ntce_dvcd' and item_code = a.ntce_dvcd	")
			.where("where	1=1																				")
			.where("and     a.ntce_eddt  >= :fr_dt   "		 , arg.getParamText("fr_dt" ))
			.where("and     a.ntce_eddt  <= :to_dt   "		 , arg.getParamText("to_dt" ))
			.where("and		a.find_name	like %:find_name%"	 , arg.getParameter("find_name"))
			.where("and		a.emgc_yorn	like %:emgc_yorn%"	 , arg.getParameter("emgc_yorn"))
			.where("and		a.line_stat	= :line_stat1"		 , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		 , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.bord_idcd")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

		// item1
		public SqlResultMap getItem1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.invc_numb      , a.line_seqn      , a.empy_idcd        , a.empy_name			")
				.query("		, a.insp_yorn      , a.insp_dttm      , a.ansr_cont									")
				.query("		, a.user_memo      , a.sysm_memo													")
				.query("		, a.prnt_idcd      , a.line_levl      , a.line_ordr        , a.line_stat			")
				.query("		, a.line_clos      , a.find_name      , a.updt_user_name   , a.updt_ipad			")
				.query("		, a.updt_dttm      , a.updt_idcd      , a.updt_urif        , a.crte_user_name		")
				.query("		, a.crte_ipad      , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
				.query("		, u.user_name      , c.wkrn_name      , d.dept_name									")
			;
			data.param //퀴리문
				.where("from	ntce_view a																			")
				.where("		left outer join user_mast u on a.empy_idcd=u.user_idcd								")
				.where("		left outer join wkrn_mast c on u.wkrn_idcd = c.wkrn_idcd							")
				.where("		left outer join dept_mast d on u.dept_idcd = d.dept_idcd						")
				.where("where		1=1																				")
				.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
				.where("and			a.empy_idcd = :empy_idcd        " , arg.getParameter("empy_idcd"				))
				.where("and			a.invc_numb = :invc_numb        " , arg.getParameter("invc_numb"				))
				.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("order by	a.line_seqn"																	)
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}


		// item2
		public SqlResultMap getItem2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");


			data.param
				.query("select    a.user_idcd       , a.user_name          , b.line_seqn								")
				.query("		, b.empy_idcd       , b.empy_name          , b.invc_numb								")
				.query("		, b.insp_yorn       , b.insp_dttm          , b.ansr_cont								")
				.query("		, a.user_memo       , a.sysm_memo          , a.prnt_idcd           , a.line_levl		")
				.query("		, a.line_ordr       , a.line_stat          , a.line_clos           , a.find_name		")
				.query("		, a.updt_user_name  , a.updt_ipad          , a.updt_dttm           , a.updt_idcd		")
				.query("		, a.updt_urif       , a.crte_user_name     , a.crte_ipad           , a.crte_dttm		")
				.query("		, a.crte_idcd       , a.crte_urif          , @curRank:=@curRank+1 as rank				")
				.query("		, d.dept_name       , c.wkrn_name																			")

				;
			data.param //퀴리문
				.where("from		user_mast a																		")
				.where("			left outer join wkrn_mast c on a.wkrn_idcd = c.wkrn_idcd						")
				.where("			left outer join dept_mast d on a.dept_idcd = d.dept_idcd						")
				.where("			left outer join (select * from ntce_view group by empy_idcd) b on a.user_idcd = b.empy_idcd	")
				.where("			,(select @curRank:=0) r 														")
				.where("where		1=1																				")
				.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
				.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
				.where("and			a.user_idcd not in (select empy_idcd from ntce_view where invc_numb = :invc_numb)", arg.getParameter("invc_numb"))
				.where("order by	rank																			")
			;
			return data.selectForMap();
		}

		//열람자조회
		public SqlResultMap getInvoice(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");
			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select	a.invc_numb    , a.empy_idcd  , a.empy_name,      a.ansr_cont		")
				.query("		, a.insp_yorn  , a.insp_dttm										")
				.query("		, a.user_memo  , a.sysm_memo										")
				.query("		, a.prnt_idcd  , a.line_levl  , a.line_ordr      , a.line_stat		")
				.query("		, a.line_clos  , a.find_name  , a.updt_user_name , a.updt_ipad		")
				.query("		, a.updt_dttm  , a.updt_idcd  , a.updt_urif      , a.crte_user_name	")
				.query("		, a.crte_ipad  , a.crte_dttm  , a.crte_idcd      , a.crte_urif		")
			;
			data.param //퀴리문
				.where("from	ntce_view a																			")
				.where("where		1=1																				")
				.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
				.where("and			a.invc_numb = :invc_numb        " , arg.getParameter("invc_numb"				))
				.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		String ntce_cont;
		Blob blob ;
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			ntce_cont = row.getParamText("ntce_cont");
			byte[] buff = ntce_cont.getBytes();
			blob = new SerialBlob(buff);

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("ntce_mast")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.update("line_stat"			, 2									)
					.update("dwup_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
					;data.attach(Action.update);
			} else {
				data.param
					.table("ntce_mast")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("bord_idcd"			, row.getParameter("bord_idcd"))
					.update("ntce_eddt"			, row.getParameter("ntce_eddt"))
					.update("ntce_stdt"			, row.getParameter("ntce_stdt"))
					.update("dwup_time"			, row.getParameter("dwup_time"))
					.update("dwup_empy_idcd"	, row.getParameter("dwup_empy_idcd"))
					.update("dwup_empy_name"	, row.getParameter("dwup_empy_name"))
					.update("emgc_yorn"			, row.getParameter("emgc_yorn"))
					.update("ntce_ttle"			, row.getParameter("ntce_ttle"))
					.update("sbsd_ttle"			, row.getParameter("sbsd_ttle"))
					.update("ntce_cont"			, blob)
					.update("scrt_yorn"			, row.getParameter("scrt_yorn"))
					.update("mail_addr"			, row.getParameter("mail_addr"))
					.update("mail_ansr_yorn"	, row.getParameter("mail_ansr_yorn"))
					.update("tele_numb"			, row.getParameter("tele_numb"))
					.update("inqy_qntt"			, row.getParameter("inqy_qntt"))
					.update("ansr_yorn"			, row.getParameter("ansr_yorn"))
					.update("pswd"				, row.getParameter("pswd"))
					.update("ntce_dvcd"			, row.getParameter("ntce_dvcd"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("dwup_empy_name")
												+ "	"
												+ row.fixParameter("ntce_ttle"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("dwup_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setItem1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				System.out.println("들어옴");
				data.param
					.table("ntce_view")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn  = :line_seqn")

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					;data.attach(Action.delete);

			} else {
				data.param
					.table("ntce_view")
					.where("where invc_numb	= :invc_numb" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("invc_numb"				, row.fixParameter("invc_numb"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("empy_idcd"				, row.getParameter("empy_idcd"))
					.update("empy_name"				, row.getParameter("empy_name"))
					.update("insp_yorn"				, row.getParameter("insp_yorn"))
					.update("insp_dttm"				, row.getParameter("insp_dttm"))
					.update("ansr_cont"				, row.getParameter("ansr_cont"))

					.update("find_name"				, row.getParameter("invc_numb")
													+ " "
													+ row.fixParameter("empy_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	// Maxid
			public SqlResultMap setMaxid(HttpRequestArgument arg ) throws Exception {

				DataMessage data = arg.newStorage("POS");
				data.param
					.total("select count(1) as maxsize  " )
				;
				data.param
					.query("select    ifnull(MAX(line_seqn)+1,0) as seqn						")
					;
				data.param //퀴리문
					.where("from		ntce_view a												")
					.where("where 1=1 and a.invc_numb = :invc_numb",arg.getParameter("invc_numb"))
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
				System.out.println(arg.getParameter("invc_numb"));
				System.out.println(arg.getParameter("_set"));
				Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
				if(rowaction == Action.delete){
					data.param
						.table("ntce_mast")
						.where("where invc_numb  = :invc_numb")

						.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
						.update("line_stat"			, 2									)
						.update("dwup_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
					;data.attach(Action.update);
				}else{
					data.param
						.table("ntce_mast"                                               )
						.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
						//
						.unique("invc_numb"			, arg.fixParameter("invc_numb"))

						//
						.update("ntce_cont"			, arg.getParameter("ntce_cont"))  /*  공지내용  */
						.update("pswd"				, arg.getParameter("pswd"))       /*  비밀번호  */
						.update("emgc_yorn"			, arg.getParameter("emgc_yorn"))  /*  긴급  */
						.update("ansr_yorn"			, arg.getParameter("ansr_yorn"))  /*  답여부  */
						.update("scrt_yorn"			, arg.getParameter("scrt_yorn"))  /*  보안  */
						.update("ntce_eddt"			, arg.getParameter("ntce_eddt"))  /*  공지시작  */
						.update("ntce_stdt"			, arg.getParameter("ntce_stdt"))  /*  공지종료  */
						.update("ntce_dvcd"			, arg.getParameter("ntce_dvcd"))  /*  공지구분코드  */
						.update("dwup_empy_name"	, arg.getParameter("dwup_empy_name"))  /*  작성자  */
						.update("sbsd_ttle"			, arg.getParameter("sbsd_ttle"))  /*  부제목  */
						.update("ntce_ttle"			, arg.getParameter("ntce_ttle"))  /*  제목  */
						.update("user_memo"			, arg.getParameter("user_memo"))  /*  메모  */
						.update("find_name"			, arg.getParameter("dwup_empy_name")
													+ "	"
													+ arg.fixParameter("ntce_ttle"))
						.update("dwup_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )/* 작성일자  */
					;
					data.attach(rowaction);
				}
				data.execute();
				return null;
			}
}
