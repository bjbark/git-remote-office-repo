package com.sky.system.workshop.print.basic.mmbrmast;

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
public class MmbrMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																					")
		;
		data.param //퀴리문
			.where("from (																						")
			.where("select    a.mmbr_idcd           , a.mmbr_name       , a.regi_dvcd							")
			.where("        , a.entr_dvcd           , a.mmbr_dvcd       , a.lgin_pswd        , a.entr_date		")
			.where("        , a.scsn_date           , a.scsn_resn_dvcd  , a.scsn_resn        , a.mmbr_grad		")
			.where("        , a.tele_numb           , a.mmbr_stat_dvcd  , a.hdph_numb        , a.faxi_numb		")
			.where("        , a.post_code           , a.addr_1fst       , a.addr_2snd        , a.wker_name		")
			.where("        , a.wker_hdph           , a.wker_mail       , a.boss_name        , a.buss_numb		")
			.where("        , a.bzpl_zpcd           , a.bzpl_addr_1fst  , a.bzpl_addr_2snd   , a.buss_type		")
			.where("        , a.buss_item           , a.mail_addr       , a.intr_mmbr_idcd   , a.asgn_mmbr_idcd	")
			.where("        , a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
			.where("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.where("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.where("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.where("        , a.crte_urif           , b.cstm_name as asgn_mmbr_name								")
			.where("from	prnt_mmbr_mast a																	")
			.where("left outer join cstm_mast b on a.asgn_mmbr_idcd = b.cstm_idcd								")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%			" , arg.getParameter("find_name"))
			.where("and     a.regi_dvcd =:regi_dvcd					" , arg.getParameter("regi_dvcd"))
			.where("and     a.mmbr_dvcd =:mmbr_dvcd					" , arg.getParameter("mmbr_dvcd"))
			.where("and     a.entr_dvcd =:entr_dvcd					" , arg.getParameter("entr_dvcd"))
			.where("and     a.entr_date >= :invc_date1				" , arg.getParameter("invc_date1"))
			.where("and     a.entr_date <= :invc_date2				" , arg.getParameter("invc_date2"))
			.where("and     a.mmbr_stat_dvcd =:mmbr_stat_dvcd		" , arg.getParameter("mmbr_stat_dvcd"))
			.where("order by a.mmbr_name																		")
			.where(") a																							")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회
		public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.mmbr_idcd           , a.line_seqn       , a.dlvy_alis        , a.base_yorn		")
				.query("        , a.dlvy_zpcd           , a.dlvy_addr_1fst  , a.dlvy_addr_2snd   , a.rctr_name		")
				.query("        , a.tele_numb																		")

				.query("        , a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
				.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
				.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
				.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
				.query("        , a.crte_urif																		")
			;
			data.param //퀴리문
				.where("from	prnt_mmbr_dlvy a																	")
				.where("where   1=1																					")
				.where("and     a.mmbr_idcd = :mmbr_idcd	" , arg.getParameter("mmbr_idcd"))
				.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
				.where("order by a.line_seqn																		")
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

		// 조회
		public SqlResultMap getSearch3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select    a.mmbr_idcd           , a.line_seqn       , a.dlvy_alis        , a.base_yorn		")
				.query("        , a.dlvy_zpcd           , a.dlvy_addr_1fst  , a.dlvy_addr_2snd   , a.rctr_name		")
				.query("        , a.tele_numb																		")

				.query("        , a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
				.query("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
				.query("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
				.query("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
				.query("        , a.crte_urif																		")
			;
			data.param //퀴리문
				.where("from	prnt_mmbr_dlvy a																	")
				.where("where   1=1																					")
				.where("and     a.mmbr_idcd = :mmbr_idcd	" , arg.getParameter("mmbr_idcd"))
				.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
				.where("order by a.line_seqn																		")
			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																					")
		;
		data.param //퀴리문
			.where("from (																						")
			.where("select    a.mmbr_idcd           , a.mmbr_name       , a.regi_dvcd							")
			.where("        , a.entr_dvcd           , a.mmbr_dvcd       , a.lgin_pswd        , a.entr_date		")
			.where("        , a.scsn_date           , a.scsn_resn_dvcd  , a.scsn_resn        , a.mmbr_grad		")
			.where("        , a.tele_numb           , a.mmbr_stat_dvcd  , a.hdph_numb        , a.faxi_numb		")
			.where("        , a.post_code           , a.addr_1fst       , a.addr_2snd        , a.wker_name		")
			.where("        , a.wker_hdph           , a.wker_mail       , a.boss_name        , a.buss_numb		")
			.where("        , a.bzpl_zpcd           , a.bzpl_addr_1fst  , a.bzpl_addr_2snd   , a.buss_type		")
			.where("        , a.buss_item           , a.mail_addr       , a.intr_mmbr_idcd   , a.asgn_mmbr_idcd	")
			.where("        , a.user_memo           , a.sysm_memo       , a.prnt_idcd							")
			.where("        , a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.where("        , a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.where("        , a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.where("        , a.crte_urif																		")
			.where("from	prnt_mmbr_mast a																	")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     a.line_stat < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order by a.mmbr_name																		")
			.where(") a																							")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prnt_mmbr_mast")
					.where("where mmbr_idcd  = :mmbr_idcd")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("prnt_mmbr_mast")
					.where("where mmbr_idcd	= :mmbr_idcd" )

					.unique("mmbr_idcd"				, row.fixParameter("mmbr_idcd"))

					.update("mmbr_name"				, row.getParameter("mmbr_name"		))
					.update("regi_dvcd"				, row.getParameter("regi_dvcd"		))
					.update("entr_dvcd"				, row.getParameter("entr_dvcd"		))
					.update("mmbr_dvcd"				, row.getParameter("mmbr_dvcd"		))
					.update("lgin_pswd"				, row.getParameter("lgin_pswd"		))
					.update("entr_date"				, row.getParameter("entr_date"		))
					.update("scsn_date"				, row.getParameter("scsn_date"		))
					.update("scsn_resn_dvcd"		, row.getParameter("scsn_resn_dvcd"	))
					.update("scsn_resn"				, row.getParameter("scsn_resn"		))
					.update("mmbr_grad"				, row.getParameter("mmbr_grad"		))
					.update("tele_numb"				, row.getParameter("tele_numb"		))
					.update("mmbr_stat_dvcd"		, row.getParameter("mmbr_stat_dvcd"	))
					.update("hdph_numb"				, row.getParameter("hdph_numb"		))
					.update("faxi_numb"				, row.getParameter("faxi_numb"		))
					.update("post_code"				, row.getParameter("post_code"		))
					.update("addr_1fst"				, row.getParameter("addr_1fst"		))
					.update("addr_2snd"				, row.getParameter("addr_2snd"		))
					.update("wker_name"				, row.getParameter("wker_name"		))
					.update("wker_hdph"				, row.getParameter("wker_hdph"		))
					.update("wker_mail"				, row.getParameter("wker_mail"		))
					.update("boss_name"				, row.getParameter("boss_name"		))
					.update("buss_numb"				, row.getParameter("buss_numb"		))
					.update("bzpl_zpcd"				, row.getParameter("bzpl_zpcd"		))
					.update("bzpl_addr_1fst"		, row.getParameter("bzpl_addr_1fst"	))
					.update("bzpl_addr_2snd"		, row.getParameter("bzpl_addr_2snd"	))
					.update("buss_type"				, row.getParameter("buss_type"		))
					.update("buss_item"				, row.getParameter("buss_item"		))
					.update("mail_addr"				, row.getParameter("mail_addr"		))
					.update("intr_mmbr_idcd"		, row.getParameter("intr_mmbr_idcd"	))
					.update("asgn_mmbr_idcd"		, row.getParameter("asgn_mmbr_idcd"	))



					.update("user_memo"				, row.getParameter("user_memo"))
					.update("find_name"				, row.getParameter("mmbr_name")
													+ " "
													+ row.getParameter("mail_addr"))
					.insert("line_stat"				, row.getParameter("line_stat"))
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

	public SqlResultMap setRecord2(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("prnt_mmbr_mast"					)
			.where("where mmbr_idcd		= :mmbr_idcd")  /*  회원ID  */
			.unique("mmbr_idcd"			, arg.getParameter("mmbr_idcd"))
			.update("line_stat"			, 0									)
			.update("mmbr_stat_dvcd"	, arg.getParameter("mmbr_stat_dvcd"))	/*  회원상태코드 */
//			.insert("scsn_date"			, arg.getParameter("scsn_date"		))
//			.update("scsn_date"			, new SimpleDateFormat("yyMMdd").format(new Date()))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일자 */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setRecord3(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("prnt_mmbr_mast"					)
			.where("where mmbr_idcd		= :mmbr_idcd")  /*  회원ID  */
			.unique("mmbr_idcd"			, arg.getParameter("mmbr_idcd"))
			.update("line_stat"			, 2									)
			.update("mmbr_stat_dvcd"	, arg.getParameter("mmbr_stat_dvcd"))	/*  회원상태코드 */
//			.insert("scsn_date"			, arg.getParameter("scsn_date"		))
			.update("scsn_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일자 */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setAddress(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("prnt_mmbr_dlvy")
					.where("where mmbr_idcd  = :mmbr_idcd")
					.where("and   line_seqn  = :line_seqn")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					;data.attach(Action.delete);

			} else {
				data.param
					.table("prnt_mmbr_dlvy")
					.where("where mmbr_idcd  = :mmbr_idcd")
					.where("and   line_seqn  = :line_seqn")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("dlvy_alis"				, row.getParameter("dlvy_alis"		))
					.update("base_yorn"				, row.getParameter("base_yorn"		))
					.update("dlvy_zpcd"				, row.getParameter("dlvy_zpcd"		))
					.update("dlvy_addr_1fst"		, row.getParameter("dlvy_addr_1fst"	))
					.update("dlvy_addr_2snd"		, row.getParameter("dlvy_addr_2snd"	))
					.update("rctr_name"				, row.getParameter("rctr_name"		))
					.update("tele_numb"				, row.getParameter("tele_numb"		))


					.update("user_memo"				, row.getParameter("user_memo"))
					.update("find_name"				, row.getParameter("mmbr_name")
													+ " "
													+ row.getParameter("mail_addr"))
					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
			}
		}
		data.execute();
		return null ;
	}
}
