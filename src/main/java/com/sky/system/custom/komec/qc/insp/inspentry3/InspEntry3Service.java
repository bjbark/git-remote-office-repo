package com.sky.system.custom.komec.qc.insp.inspentry3;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service("komec.InspEntry3Service")
public class InspEntry3Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
			.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.where("        , b.istt_qntt      , a.vatx_incl_yorn  , b.vatx_rate    , b.istt_amnt			")
			.where("        , b.istt_vatx      , b.ttsm_amnt       , a.krwn_pric    , a.krwn_amnt			")
			.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text    , a.expr_date			")
			.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln    , a.publ_date			")
			.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.where("        , u.user_name      as drtr_name        , b.orig_seqn    , b.orig_invc_numb		")
			.where("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_amnd_degr		")
			.where("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.where("        , b.lott_numb																	")
			.where("        , json_value(b.json_data,'$.cstm_lott_numb') as cstm_lott_numb					")
			.where("        , json_value(b.json_data,'$.make_natn') as make_natn							")
			.where("        , json_value(b.json_data,'$.rtil_ddln_date') as rtil_ddln_date					")
			.where("from purc_istt_item b																	")
			.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
			.where("left outer join cstm_mast c      on a.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on a.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")
			.where("left outer join purc_insp pi     on pi.orig_invc_numb  = b.invc_numb and pi.orig_seqn = b.line_seqn	")
			.where("where   1=1																				")
			.where("and     ifnull(b.istt_insp_yorn,0) = '1'												")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     b.orig_invc_numb  = :invc_numb1" , arg.getParamText("invc_numb1" ))
			.where("and     b.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     c.cstm_code  = :cstm_idcd          " , arg.getParamText("cstm_idcd"  )) 	// 거래처
			.where("and     a.drtr_idcd  = :drtr_idcd          " , arg.getParamText("drtr_idcd"  )) 	// 입고담당
			.where("and     b.istt_wrhs_idcd  = :istt_wrhs_idcd" , arg.getParamText("istt_wrhs_idcd"  ))// 입고창고
			.where("and     b.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if(arg.getParamText("yorn").equals("")){
			data.param
				.where("and     pi.invc_numb is null														 ")
			;
		}
		data.param
			.where("group by b.invc_numb, b.line_seqn														")// 입고창고
			.where("order by a.invc_date desc,a.cstm_idcd,a.invc_numb limit 9999999999999					")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}
	public SqlResultMap getInsp_cond(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
			.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
			.query("        , a.rslt_iput_dvcd   , a.goal_levl        , a.insp_cvic_idcd						")
			.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
			.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
			.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd        , w.wkct_name		")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")


		;
		data.param
			.where("from insp_cond a																		")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 				")
			.where("       left outer join wkct_mast      w on b.wkct_idcd = w.wkct_idcd 					")
			.where("where   1=1																				")
			.where("and     a.insp_type_idcd = :insp_type_idcd" ,	arg.getParameter("insp_type_idcd"		))
			.where("and     a.line_seqn = :line_seqn" ,				arg.getParameter("line_seqn"			))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where("order by a.line_seqn																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getWkct_Insp_Seqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.println("wkod_numb : " + arg.getParameter("wkod_numb"));
		data.param
			.query("select ifnull(Max(line_seqn),0)+1 as seqn											")
		;
		data.param
			.where("from purc_insp a																	")
			.where("where   1=1																			")
			.where("and     a.orig_invc_numb = :wkod_numb" 		, arg.getParameter("wkod_numb"					))
			//.where("and     a.wkct_insp_dvcd = :wkct_insp_dvcd" , arg.fixParameter("wkct_insp_dvcd"		))

		;
		return data.selectForMap();
	}
	public SqlResultMap getWkct_invc_numb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select invc_numb																	")
		;
		data.param
		.where("from wkct_insp a																	")
		.where("where   1=1																			")
		.where("and     a.wkod_numb = :wkod_numb" , arg.getParameter("wkod_numb"					))

		;
		return data.selectForMap();
	}

	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	a.*																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("	  a.invc_numb		, a.line_seqn		, a.invc_date		, a.insp_dvcd			")
			.where("	, a.msmt_valu		, a.insp_qntt		, a.poor_qntt		, a.pass_qntt			")
			.where("	, a.judt_dvcd		, b.insp_sbsc_name	, b.insp_cond		, a.insp_mthd_dvcd		")
			.where("	, a.orig_invc_numb	, a.orig_seqn													")
			.where("	, a.msmt_valu2		, a.msmt_valu3		, a.msmt_valu4		, a.msmt_valu5			")
			.where("from 	purc_insp a																		")
			.where("		left outer join insp_cond b on a.prnt_idcd = b.insp_type_idcd 					")
			.where("								   and a.line_seqn = b.line_seqn						")
			.where("where   1=1																				")
			.where("and     a.orig_invc_numb = :invc_numb	" , arg.getParameter("invc_numb"))
			.where("and     a.orig_seqn = :line_seqn		" , arg.getParameter("line_seqn"))
			.where("and     a.line_stat   < :line_stat      " , "2"											 )
			.where(" order by a.invc_numb asc, a.line_seqn asc												")
			.where(" LIMIT 18446744073709551615) a 															")  //mysql에서는 서브쿼리 order by가 안먹히는 경우가 있음 그럴 경우 해결방법으로 limit를 주면됨

		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("purc_insp")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))
			;
			data.attach(Action.delete);
			data.param
				.table("isos_book")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")
				.where("and invc_dvcd        = :invc_dvcd			")

				.unique("invc_numb"			, row.fixParameter("orig_invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("orig_seqn"		))
				.unique("invc_dvcd"			, "1100")
			;
			data.attach(Action.delete);
			data.param
				.table("lot_isos_book")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")
				.where("and isos_dvcd        = :isos_dvcd			")

				.unique("invc_numb"			, row.fixParameter("orig_invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("orig_seqn"		))
				.unique("isos_dvcd"			, "1100")
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
			data.param
				.query("update purc_istt_item set pass_qntt = 0, poor_qntt = 0 ")
				.query("where invc_numb = :invc_numb ",row.fixParameter("orig_invc_numb"		))
				.query("and   line_seqn = :line_seqn ",row.fixParameter("orig_seqn"		))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

		}
		return null;
	}
	public SqlResultMap setlist1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("purc_insp")
					.where("where invc_numb      = :invc_numb					")
					.where("and line_seqn        = :line_seqn					")

					.unique("invc_numb"			, row.fixParameter("invc_numb"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))
				;data.attach(Action.delete);
			}
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setListerPopup(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("purc_insp")
				.where("where invc_numb       = :invc_numb			")
				.where("and line_seqn         = :line_seqn			")

				.unique("invc_numb"				, row.fixParameter("invc_numb"		))
				.unique("line_seqn"				, row.fixParameter("line_seqn"		))

				.update("msmt_valu"				, row.getParameter("msmt_valu"		))
				.update("msmt_valu2"			, row.getParameter("msmt_valu2"		))
				.update("msmt_valu3"			, row.getParameter("msmt_valu3"		))
				.update("msmt_valu4"			, row.getParameter("msmt_valu4"		))
				.update("msmt_valu5"			, row.getParameter("msmt_valu5"		))
				.update("judt_dvcd"				, row.getParameter("judt_dvcd"		))
				.update("invc_date"				, row.getParamText("insp_date"		))
				.update("cstm_idcd"				, row.getParamText("cstm_idcd"		))
				.update("orig_invc_numb"		, row.getParameter("wkod_numb"		))
				.update("orig_seqn"				, row.getParameter("wkod_seqn"		))
				.update("insp_qntt"				, "1")
				.update("poor_qntt"				, row.getParameter("poor_qntt"		))
				.update("pass_qntt"				, row.getParameter("pass_qntt"		))
				.update("item_idcd"				, row.getParameter("item_idcd"		))
				.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"	))
				.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"	))

				.update("uper_seqn"				, row.getParameter("line_seqn"		))
				.update("prnt_idcd"				, row.getParameter("insp_type_idcd"	))
				.update("line_stat"				, row.getParameter("line_stat"		))
				.insert("line_levl"				, row.getParameter("line_levl"		))
				.update("updt_idcd"				, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			String pass_qntt = row.getParamText("pass_qntt").equals("")?"0":row.getParamText("pass_qntt");
			String poor_qntt = row.getParamText("poor_qntt").equals("")?"0":row.getParamText("poor_qntt");

			data.param
				.query("update purc_istt_item					")
				.query("set pass_qntt      = pass_qntt + :pass_qntt" ,pass_qntt)
				.query("  , poor_qntt      = poor_qntt + :poor_qntt", poor_qntt)
				.query("  , insp_qntt      = :insp_qntt" , "1"	)
				.query("  , insp_date      = :insp_date" , row.getParameter("insp_date"))
				.query("  , judt_dvcd      = :judt_dvcd" , row.getParameter("judt_dvcd"))
				.query("  , insp_invc_numb = :insp_invc_numb", row.getParameter("invc_numb"))
				.query("where invc_numb    = :invc_numb ", row.fixParameter("wkod_numb"))
				.query("and   line_seqn    = :line_seqn ", row.fixParameter("wkod_seqn"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();


			if(row.getParamText("judt_dvcd").equals("1")){
				sequence.setBook(arg, row.fixParamText("wkod_numb"), Integer.parseInt(row.fixParamText("wkod_seqn")) , "구매입고");
			}
		}
		return null ;
	}

	public SqlResultMap getMobileInsp(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("select    b.invc_numb        , b.line_seqn        , a.invc_date       					 	")
			.query("        , i.item_name        , b.lott_numb        , w.wrhs_name								")
			.query("        , b.istt_qntt        , ifnull(b.pass_qntt,0) as pass_qntt  							")
			.query("        , sum(ifnull(a.poor_qntt ,0)) as poor_qntt  										")
			.query("        , a.invc_numb as insp_invc_numb   , a.line_seqn as insp_line_seqn					")

			.query("        , a.uper_seqn        , a.disp_seqn        , a.user_memo								")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif 	      , i.insp_type_idcd						")
		;
		data.param
			.where("from  purc_istt_item  b																		")
			.where("left outer join purc_istt_mast m on b.invc_numb = m.invc_numb								")
			.where("left outer join purc_insp      a on a.orig_invc_numb = b.invc_numb and a.orig_seqn = b.line_seqn	")
			.where("left outer join wrhs_mast      w on m.istt_wrhs_idcd = w.wrhs_idcd 						")
			.where("left outer join item_mast      i on i.item_idcd = b.item_idcd 							")
			.where("where   1=1																				")
			.where("and    m.invc_date = date_format(now(),'%Y%m%d')										")
			.where("and    ifnull(b.istt_insp_yorn,0) = '1'													")
			.where("and    concat(ifnull(b.find_name,''),' ',ifnull(b.lott_numb,''),' ',ifnull(w.wrhs_name,'')) like %:find_name%" ,	arg.getParameter("find_name"))
			.where("and    m.invc_date = :invc_date     " , arg.getParameter("invc_date"))
		;
		if(arg.fixParamText("dvcd").equals("1")){
			data.param
				.where("and a.invc_numb is not null			")
			;
		}else{
			data.param
				.where("and a.invc_numb is null				")
			;
		}
		data.param
			.where("and    b.line_stat   < :line_stat      " , "2"											 )
			.where("group by b.invc_numb,b.line_seqn														")
			.where("order by b.invc_numb,b.line_seqn														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMobileInspCond(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("SELECT    a.invc_numb      , a.line_seqn   , b.line_seqn as insp_seqn 	")
			.query("        , b.insp_sbsc_name , b.insp_cond   , a.istt_qntt				")
		;
		data.param
			.where("FROM purc_istt_item a													")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd				")
			.where("left outer join insp_cond b on b.insp_type_idcd = i.insp_type_idcd		")
			.where("where   1=1																")
			.where("and    a.invc_numb = :invc_numb     " , arg.fixParameter("invc_numb"))
			.where("and    a.line_seqn = :line_seqn     " , arg.fixParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	public SqlResultMap setMobileInsp(HttpRequestArgument arg) throws Exception {

		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		int chk = 0;

		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}

		data.param
			.query("call fn_seq_gen_v2(			")
			.query("   :stor", hq+"1000"		 )
			.query(" , :table","purc_insp"		 )
			.query(" , :invc_numb","not defined" )
			.query(")							")
		;
		SqlResultRow key = data.selectForRow();
		data.clear();

		String invc_numb = "";
		int    line_seqn = 0;
		float  qntt = 0;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			String judt_dvcd = "1";
			float pass_qntt = row.getParamCast("istt_qntt", Float.class);
			float poor_qntt = 0;
			if(!row.getParamText("poor_qntt").equals("")){
				poor_qntt = row.getParamCast("poor_qntt", Float.class);
				if(poor_qntt>0){
					judt_dvcd = "2";
					pass_qntt = (pass_qntt - poor_qntt);
					chk = 1;
				}
			}else{
				invc_numb = row.fixParamText("invc_numb");
				line_seqn = row.getParamCast("line_seqn", Integer.class);
				qntt = pass_qntt;
			}
			data.param
				.table("purc_insp")
				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", key.fixParameter("seq"))
				.unique("line_seqn", row.fixParameter("insp_seqn"))

				.insert("orig_invc_numb", row.fixParameter("invc_numb"))
				.insert("orig_seqn",      row.fixParameter("line_seqn"))
				.insert("msmt_valu",      row.getParameter("msmt_valu"))

				.insert("judt_dvcd",      judt_dvcd)
				.insert("pass_qntt",      pass_qntt)
				.insert("poor_qntt",      poor_qntt)

				.insert("crte_idcd"				, row.getParameter("crte_idcd"		))
				.insert("crte_ipad"				, arg.remoteAddress )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
		}
		data.execute();
		data.clear();


		if(chk==0){
			//update pass qntt
			data.param
				.table("purc_istt_item")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", invc_numb)
				.unique("line_seqn", line_seqn)

				.update("pass_qntt", qntt)
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			//isos and lot insert
			data.param
				.query("call mobile_insp_isos_booking(	")
				.query("	  :invc_numb 	",invc_numb)
				.query("	, :line_seqn	",line_seqn)
				.query(")								")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

			//ordr close
			data.param
				.query("update purc_ordr_item a											")
				.query("left outer join purc_istt_item b								")
				.query("on a.invc_numb = b.orig_invc_numb and a.line_seqn = b.orig_seqn	")
				.query("set a.dlvy_qntt = b.pass_qntt,a.line_clos = '1'					")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}


		return null ;
	}

	public SqlResultMap setMobileInspAll(HttpRequestArgument arg) throws Exception {

		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("call mobile_insp_insert(					")
			.query("    :invc_numb ",arg.fixParameter("invc_numb"))
			.query("  , :line_seqn ",arg.fixParameter("line_seqn"))
			.query("  , :crte_idcd ",arg.fixParameter("crte_idcd"))
			.query(")											")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null ;
	}
	public SqlResultMap setMobileDelete(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("update purc_istt_item a  																			")
			.query("left outer join purc_ordr_item b on a.orig_invc_numb = b.invc_numb and a.orig_seqn = b.line_seqn	")
			.query("set b.dlvy_qntt = (b.dlvy_qntt - a.istt_qntt)														")
			.query("where a.invc_numb = :invc_numb	",arg.fixParameter("invc_numb"))
			.query("and   a.line_seqn = :line_seqn	",arg.fixParameter("line_seqn"))
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		data.param
			.table("purc_istt_item")
			.where("where invc_numb      = :invc_numb			")
			.where("and line_seqn        = :line_seqn			")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);

		if(!arg.getParamText("insp_invc_numb").equals("")){
			data.param
				.table("purc_insp")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")

				.unique("invc_numb"			, arg.fixParameter("insp_invc_numb"		))
				.unique("line_seqn"			, arg.fixParameter("insp_line_seqn"		))
			;
			data.attach(Action.delete);
			data.param
				.table("isos_book")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")
				.where("and invc_dvcd        = :invc_dvcd			")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
				.unique("invc_dvcd"			, "1100")
			;
			data.attach(Action.delete);
			data.param
				.table("lot_isos_book")
				.where("where invc_numb      = :invc_numb			")
				.where("and line_seqn        = :line_seqn			")
				.where("and isos_dvcd        = :isos_dvcd			")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
				.unique("isos_dvcd"			, "1100")
			;
			data.attach(Action.delete);
		}
		data.execute();
		data.clear();

		data.param
			.query("delete a from purc_istt_mast a left outer join purc_istt_item b on a.invc_numb = b.invc_numb where b.invc_numb is null")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}
}
