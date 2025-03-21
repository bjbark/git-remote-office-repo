package com.sky.system.qc.insp.inspentry3;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class InspEntry3Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		int chk = arg.getParamText("stor_grp").indexOf("DOWON");
		String qry = arg.getParamText("query"); /* entry(검사성적을 입력하기 위해 조회)  or query(등록된 검사성적 조회)  */
		String check = null;
		if (qry.length() == 0 ) {
			qry	= "entry";
		}

		if(arg.getParamText("index").length() > 0){
			if(arg.getParamText("index").equals("0")) check = "and    (i.judt_dvcd is null or i.judt_dvcd = 0)" ;
			else check = "(i.judt_dvcd is null or i.judt_dvcd = 0)";
		}
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.coun_iout_dvcd , a.cstm_idcd		")
			.where("      , a.drtr_idcd      , a.dept_idcd      , a.remk_text      , bz.bzpl_name     , c.cstm_name		")
			.where("      , u.user_name as drtr_name            , d.dept_name      , sub.istt_qntt    , a.istt_vatx		")
			.where("      , a.istt_amnt     , a.ttsm_amnt       , a.istt_wrhs_idcd , w.wrhs_name as istt_wrhs_name		")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd     , a.line_levl      , a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name											")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm     , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm     , a.crte_idcd      , a.crte_urif		")
			.where("from    purc_istt_mast a																			")
			.where("       left outer join bzpl_mast bz on a.bzpl_idcd      = bz.bzpl_idcd								")
			.where("       left outer join user_mast u  on a.drtr_idcd      = u.user_idcd								")
			.where("       left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd								")
			.where("       left outer join dept_mast d  on a.dept_idcd      = d.dept_idcd								")
			.where("       left outer join wrhs_mast w  on a.istt_wrhs_idcd = w.wrhs_idcd								")
			.where("       left outer join (select a.invc_numb,a.line_seqn, i.rcpt_insp_yorn, sum(a.istt_qntt) as istt_qntt	")
			.where("                        from purc_istt_item a														")
			.where("                        join item_mast i on a.item_idcd = i.item_idcd								")
			.where("                        where i.rcpt_insp_yorn = 1													")
			.where("                        and ifnull(a.istt_yorn,0) <> 1												")
			.where("                        group by a.invc_numb) sub on a.invc_numb = sub.invc_numb					")
			.where("where  1=1																							")
			.where("and case (select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as optn_logc_valu	")
			.where("          from optn_mast																								")
			.where("          where optn_idcd = 'purc_insp_yorn' )																			")
			.where("    when '0' then 1=1																									")
			.where("    when '1' then sub.rcpt_insp_yorn = '1' end																			")
			.where("and    a.istt_wrhs_idcd  = :wrhs_idcd		" , arg.getParamText("wrhs_idcd" ))
			.where("and    a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                   and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and    a.drtr_idcd       = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and    a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		int chk = arg.getParamText("stor_grp").indexOf("DOWON");
		String qry = arg.getParamText("query"); /* entry(검사성적을 입력하기 위해 조회)  or query(등록된 검사성적 조회)  */
		String check = null;
		if (qry.length() == 0 ) {
			qry	= "entry";
		}

		if(arg.getParamText("index").length() > 0){
			if(arg.getParamText("index").equals("0")) check = "and    (i.judt_dvcd is null or i.judt_dvcd = 0)" ;
			else check = "(i.judt_dvcd is null or i.judt_dvcd = 0)";
		}
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.coun_iout_dvcd , a.cstm_idcd		")
			.where("      , a.drtr_idcd      , a.dept_idcd      , a.remk_text      , bz.bzpl_name     , c.cstm_name		")
			.where("      , u.user_name as drtr_name            , d.dept_name      , sub.istt_qntt    , a.istt_vatx		")
			.where("      , a.istt_amnt     , a.ttsm_amnt       , a.istt_wrhs_idcd										")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd     , a.line_levl      , a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name											")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm     , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm     , a.crte_idcd      , a.crte_urif		")
			.where("from    purc_istt_mast a																			")
			.where("       left outer join bzpl_mast bz on a.bzpl_idcd      = bz.bzpl_idcd								")
			.where("       left outer join user_mast u  on a.drtr_idcd      = u.user_idcd								")
			.where("       left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd								")
			.where("       left outer join dept_mast d  on a.dept_idcd      = d.dept_idcd								")
			.where("       left outer join purc_insp p  on a.invc_numb      = p.invc_numb								")
			.where("       left outer join (select a.invc_numb,a.line_seqn, i.rcpt_insp_yorn, sum(a.istt_qntt) as istt_qntt	")
			.where("                        from purc_istt_item a														")
			.where("                        join item_mast i on a.item_idcd = i.item_idcd								")
			.where("                        where i.rcpt_insp_yorn = 1													")
			.where("                        group by a.invc_numb) sub on a.invc_numb = sub.invc_numb					")
			.where("where  1=1																							")
			.where("and p.invc_numb is not null																			")
			.where("and case (select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as optn_logc_valu	")
			.where("          from optn_mast																								")
			.where("          where optn_idcd = 'purc_insp_yorn' )																			")
			.where("    when '0' then 1=1																									")
			.where("    when '1' then sub.rcpt_insp_yorn = '1' end																			")
			.where("and    a.istt_wrhs_idcd  = :wrhs_idcd		" , arg.getParamText("wrhs_idcd" ))
			.where("and    a.invc_date between :fr_dt			" , arg.getParamText("fr_dt" ))
			.where("                   and     :to_dt			" , arg.getParamText("to_dt" ))
			.where("and    a.drtr_idcd       = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and    a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb      , a.line_seqn      , a.istt_wrhs_idcd , a.item_idcd      , a.istt_pric			")
			.where("      , a.istt_qntt      , a.vatx_incl_yorn , a.vatx_rate      , a.istt_amnt      , a.istt_vatx			")
			.where("      , a.ttsm_amnt      , a.krwn_pric      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_amnt_totl	")
			.where("      , a.pric_dvcd      , a.cstm_idcd      , a.stnd_unit      , a.stnd_unit_qntt , a.paym_dvcd			")
			.where("      , a.lott_numb      , a.sral_strt_numb , a.sral_endd_numb , a.remk_text      , a.prof_data			")
			.where("      , a.istt_insp_yorn , a.insp_drtr_idcd , a.poor_caus_bacd , a.uper_seqn      , a.disp_seqn			")
			.where("      , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code							")
			.where("                                           and   r.prnt_idcd = '6001') as poor_caus_name				")
			.where("      , i.item_code      , i.item_name      ,  i.item_spec		")
			.where("      , a.orig_invc_numb , a.orig_amnd_degr , a.orig_seqn												")
			.where("      , u.user_name as   insp_drtr_name																	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
			.where("      , a.line_stat      , a.line_clos      , a.find_name												")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.where("      , p.invc_date as insp_date            , p.insp_mthd_dvcd , a.insp_qntt      , a.poor_qntt			")
			.where("      , p.judt_dvcd      , a.pass_qntt																	")
			.where("from    purc_istt_item a																				")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("        left outer join user_mast u on a.insp_drtr_idcd = u.user_idcd									")
			.where("        left outer join purc_insp p on a.invc_numb = p.invc_numb and a.line_seqn = p.line_seqn			")
			.where("where   1=1																								")
//			.where("and     i.rcpt_insp_yorn = 1																			")
			.where("and     a.invc_numb      = :invc_numb		" , arg.getParamText("invc_numb" ))
			.where("and     a.find_name   like %:find_name%	" , arg.getParamText("find_name" ))
			.where("and     a.line_stat   = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																										")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																								")
			.query("        a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.istt_wrhs_idcd ,a.coun_iout_dvcd	")
			.query("      , a.cstm_idcd      , a.drtr_idcd      , a.dept_idcd      , a.remk_text						")
			.query("      , bz.bzpl_name																				")
			.query("      , w.wrhs_name as istt_wrhs_name																")
			.query("      , c.cstm_name																					")
			.query("      , u.user_name as drtr_name																	")
			.query("      , d.dept_name																					")
			.query("      , a.istt_qntt      , a.istt_vatx      , a.istt_amnt     , a.ttsm_amnt							")
			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr		")
			.query("      , a.line_stat      , a.line_clos      , a.find_name											")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif		")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif		")
			.query("from    purc_istt_mast a																			")
			.query("       left outer join bzpl_mast bz on a.bzpl_idcd      = bz.bzpl_idcd								")
			.query("       left outer join wrhs_mast w  on a.istt_wrhs_idcd = w.wrhs_idcd								")
			.query("       left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd								")
			.query("       left outer join user_mast u  on a.drtr_idcd      = u.user_idcd								")
			.query("       left outer join dept_mast d  on a.dept_idcd      = d.dept_idcd								")
			.query("where  1=1																							")
			.query("and    a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select  a.invc_numb      , a.line_seqn      , a.istt_wrhs_idcd , a.item_idcd      , a.istt_pric			")
				.query("      , a.istt_qntt      , a.vatx_incl_yorn , a.vatx_rate      , a.istt_amnt      , a.istt_vatx			")
				.query("      , a.ttsm_amnt      , a.krwn_pric      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_amnt_totl	")
				.query("      , a.pric_dvcd      , a.cstm_idcd      , a.stnd_unit      , a.stnd_unit_qntt , a.paym_dvcd			")
				.query("      , a.lott_numb      , a.sral_strt_numb , a.sral_endd_numb , a.remk_text      , a.prof_data			")
				.query("      , a.istt_insp_yorn , a.insp_date      , a.insp_drtr_idcd , a.insp_mthd_dvcd , a.insp_qntt			")
				.query("      , a.pass_qntt      , a.poor_qntt      , a.poor_caus_bacd , a.judt_dvcd							")
				.query("      , (select base_name from base_mast r where a.poor_caus_bacd = r.base_code							")
				.query("                                           and   r.prnt_idcd = '6001') as poor_caus_name				")
				.query("      , a.uper_seqn      , a.disp_seqn																	")
				.query("      , i.item_code      , i.item_name      , i.item_spec												")
				.query("      , a.orig_invc_numb , a.orig_amnd_degr , a.orig_seqn												")
				.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
				.query("      , a.line_stat      , a.line_clos      , a.find_name												")
				.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
				.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
				.query("from    purc_istt_item a																				")
				.query("       left outer join item_mast i on a.item_idcd = i.item_idcd											")
				.query("where   1=1																								")
				.query("and    a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
//				 master 등록/수정
				data.param
					.table("purc_istt_mast"                                                 )
					.where("where invc_numb       = :invc_numb                             ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					//
					.update("invc_date"			, row.getParameter("invc_date"           ))  /*  INVOICE일자  */
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"           ))  /*  사업장ID  */
					.update("istt_wrhs_idcd"	, row.getParameter("istt_wrhs_idcd"      ))  /*  입고창고ID  */
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"      ))  /*  내외자구분코드  */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처ID  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"           ))  /*  담당자ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"           ))  /*  부서ID  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"           ))  /*  입고수량  */
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"      ))  /*  부가세 포함여부 */
					.update("vatx_rate"			, row.getParameter("vatx_rate"           ))  /*  부가세  */
					.update("istt_amnt"			, row.getParameter("istt_amnt"           ))  /*  입고금액 */
					.update("istt_vatx"			, row.getParameter("istt_vatx"           ))  /*  부가세  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  합계금액  */
					.update("krwn_rate"			, row.getParameter("krwn_rate"           ))  /*  환율 */
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"           ))  /*  원화금액  */
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"           ))  /*  부가세  */
					.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"      ))  /*  부가세  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"            ).trim()
												+ " "
												+ row.getParamText("bzpl_name"            ).trim()
												+ " "
												+ row.getParamText("istt_wrhs_idcd"       ).trim()
												+ " "
												+ row.getParamText("istt_wrhs_name"       ).trim()
												+ " "
												+ row.getParamText("cstm_idcd"            ).trim()
												+ " "
												+ row.getParamText("cstm_name"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(rowaction);

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......   */
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "구매입고");
			}
		}

	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("purc_istt_item"                                               )
					.where("where invc_numb		= :invc_numb                             ")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn                             ")  /*  순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;data.attach(rowaction);

			} else {
				data.param
					.table("purc_istt_item"                                               )
					.where("where invc_numb		= :invc_numb                             ")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn                             ")  /*  순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
					.update("istt_wrhs_idcd"	, row.getParameter("istt_wrhs_idcd"      ))  /*  입고창고ID  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("istt_pric"			, row.getParameter("istt_pric"           ))  /*  입고단가  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"           ))  /*  입고수량  */
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"      ))  /*  부가세포함여부  */
					.update("vatx_rate"			, row.getParameter("vatx_rate"           ))  /*  부가세율  */
					.update("istt_amnt"			, row.getParameter("istt_amnt"           ))  /*  입고금액  */
					.update("istt_vatx"			, row.getParameter("istt_vatx"           ))  /*  입고부가세  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  입고금액계  */
					.update("krwn_pric"			, row.getParameter("krwn_pric"           ))  /*  원화단가  */
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"           ))  /*  원화금액  */
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"           ))  /*  원화부가세  */
					.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"      ))  /*  원화금액계  */
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"           ))  /*  단가구분코드  */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처ID  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("paym_dvcd"			, row.getParameter("paym_dvcd"           ))  /*  지급구분코드  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("sral_strt_numb"	, row.getParameter("sral_strt_numb"      ))  /*  시리얼시작번호  */
					.update("sral_endd_numb"	, row.getParameter("sral_endd_numb"      ))  /*  시리얼종료번호  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("prof_data"			, row.getParameter("prof_data"           ))  /*  증빙자료  */
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"      ))  /*  입고검사여부  */
					.update("insp_date"			, row.getParameter("insp_date"           ))  /*  검사일자  */
					.update("insp_drtr_idcd"	, row.getParameter("insp_drtr_idcd"      ))  /*  검사담당자ID  */
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"      ))  /*  검사방법구분코드  */
					.update("insp_qntt"			, row.getParameter("insp_qntt"           ))  /*  검사수량  */
					.update("pass_qntt"			, row.getParameter("pass_qntt"           ))  /*  합격수량  */
					.update("poor_qntt"			, row.getParameter("poor_qntt"           ))  /*  불량수량  */
					.update("poor_caus_bacd"	, row.getParameter("poor_caus_bacd"      ))  /*  불량원인구분코드  */
					.update("judt_dvcd"			, row.getParameter("judt_dvcd"           ))  /*  판정구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*  발주번호  */
					.update("orig_amnd_degr"	, row.getParameter("orig_amnd_degr"      ))  /*  발주Amend  */
					.update("orig_seqn"			, row.getParameter("orig_seqn"           ))  /*  발주항번  */
					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  상위순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  표시순번  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"            ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("item_name"            ).trim()
												)
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public SqlResultMap setInsp(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.table("purc_istt_item"												)
			.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn							")	/*  순번  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			//
			.update("istt_insp_yorn"	, 1										)	/*  입고검사여부  */
			.update("istt_yorn"			, 1										)	/*  입고여부  */
			.update("insp_date"			, arg.getParameter("insp_date"			))	/*  검사일자  */
			.update("insp_drtr_idcd"	, arg.getParameter("insp_drtr_idcd"		))	/*  검사담당자ID  */
			.update("insp_mthd_dvcd"	, arg.getParameter("insp_mthd_dvcd"		))	/*  검사방법구분코드  */
			.update("insp_qntt"			, arg.getParameter("insp_qntt"			))	/*  검사수량  */
			.update("istt_qntt"			, arg.getParameter("istt_qntt"			))	/*  입고수량  */
			.update("pass_qntt"			, arg.getParameter("pass_qntt"			))	/*  합격수량  */
			.update("poor_qntt"			, arg.getParameter("poor_qntt"			))	/*  불량수량  */
			.update("poor_caus_bacd"	, arg.getParameter("poor_caus_bacd"		))	/*  불량원인구분코드  */
			.update("judt_dvcd"			, arg.getParameter("judt_dvcd"			))	/*  판정구분코드  */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("purc_insp"													)
			.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn							")	/*  순번  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			//
			.update("invc_date"			, arg.getParameter("insp_date"			))	/*  검사일자  */
			.update("insp_dvcd"			, arg.getParameter("insp_dvcd"			))	/*  검사구분코드  */
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd"			))	/*  거래처ID  */
			.update("dlyy_idcd"			, arg.getParameter("dlyy_idcd"			))	/*  납품ID  */
			.update("dlyy_seqn"			, arg.getParameter("dlyy_seqn"			))	/*  납품순번  */
			.update("cnfm_dept_idcd"	, arg.getParameter("cnfm_dept_idcd"		))	/*  확인부서ID  */
			.update("cnfm_drtr_idcd"	, arg.getParameter("cnfm_drtr_idcd"		))	/*  확인담당자ID  */
			.update("item_idcd"			, arg.getParameter("item_idcd"			))	/*  품목ID  */
			.update("dlvy_qntt"			, arg.getParameter("dlvy_qntt"			))	/*  납품수량  */
			.update("dlyy_wrhs_idcd"	, arg.getParameter("dlyy_wrhs_idcd"		))	/*  납품창고ID  */
			.update("lott_numb"			, arg.getParameter("lott_numb"			))	/*  LOT번호  */
			.update("insp_drtr_idcd"	, arg.getParameter("insp_drtr_idcd"		))	/*  검사담당자ID  */
			.update("insp_mthd_dvcd"	, arg.getParameter("insp_mthd_dvcd"		))	/*  검사방법구분코드  */
			.update("msmt_valu"			, arg.getParameter("msmt_valu"			))	/*  측정값  */
			.update("insp_qntt"			, arg.getParameter("insp_qntt"			))	/*  검사수량  */
			.update("poor_qntt"			, arg.getParameter("poor_qntt"			))	/*  불량수량  */
			.update("pass_qntt"			, arg.getParameter("pass_qntt"			))	/*  합격수량  */
			.update("poor_type_bacd"	, arg.getParameter("poor_type_bacd"		))	/*  불량유형구분코드  */
			.update("poor_caus_bacd"	, arg.getParameter("poor_caus_bacd"		))	/*  불량원인구분코드  */
			.update("istt_yorn"			, arg.getParameter("istt_yorn"			))	/*  입고여부  */
			.update("pass_yorn"			, arg.getParameter("pass_yorn"			))	/*  입고여부  */
			.update("judt_dvcd"			, arg.getParameter("judt_dvcd"			))	/*  판정구분코드  */
		;
		data.attach(Action.modify);
		data.execute();

		sequence.setBook(arg,arg.getParamText("invc_numb"), Integer.parseInt(arg.getParamText("line_seqn")) , "구매입고");
		return null;
	}

	public SqlResultMap setPass(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String invc_date1		= arg.getParamText("invc_date") ;
		String invc_date		= invc_date1.replaceAll("-", "") ;
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		int line_seqn		= Integer.parseInt(arg.getParamText("line_seqn"));
		int istt_qntt		= Integer.parseInt(arg.getParamText("istt_qntt"));

		data.param
			.query("call auto_item_pass2 (							")
			.query("   :invc_numb "  , invc_numb					 )	// Invoice 번호
			.query("  ,:line_seqn "  , line_seqn					 )	// 순번
			.query("  ,:istt_qntt "  , istt_qntt					 )	// 입고수량
			.query("  ,:auto_insp "  , "Y"							 )	// 자동 합격처리 여부
			.query(" ) 												")
		;
		data.attach(Action.direct);
		data.execute();

		data.param
			.table("purc_istt_item"												)
			.where("where invc_numb		= :invc_numb							")	/*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn							")	/*  순번  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			//
			.update("istt_insp_yorn"	, 1										)	/*  입고검사여부  */
			.update("istt_yorn"			, 1										)	/*  입고여부  */
			.update("insp_date"			, arg.getParameter("insp_date"			))	/*  검사일자  */
			.update("insp_drtr_idcd"	, arg.getParameter("insp_drtr_idcd"		))	/*  검사담당자ID  */
			.update("insp_mthd_dvcd"	, 2000									)	/*  검사방법구분코드  */
			.update("insp_qntt"			, arg.getParameter("istt_qntt"			))	/*  검사수량  */
			.update("istt_qntt"			, arg.getParameter("istt_qntt"			))	/*  입고수량  */
			.update("pass_qntt"			, arg.getParameter("istt_qntt"			))	/*  합격수량  */
			.update("poor_qntt"			, 0										)	/*  불량수량  */
			.update("judt_dvcd"			, 1										)	/*  판정구분코드  */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "구매입고");
		return null;
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from   purc_istt_mast					")
		 	.query("where  invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("purc_istt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
			.query("select a.*																								")
			.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
			.query("from (																									")
			.query("select																									")
			.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
			.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
			.query("     ,  0  as cst_pri																					")
			.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
			.query("     ,  0  as sale_pri																					")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
			.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
			.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
			.query("     ,  a.modl_name																						")
			.query("from    item_mast a																						")
			.query("where   1=1																								")
			.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
			.query("and     a.line_stat = 0																					")
			.query("and    a.acct_bacd in ('3000')                       " , "제품".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('1001', '1002','1003','1004') " , "자재".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('2001', '2002')               " , "재공품".equals(arg.getParameter("acct_bacd")) )
			.query("and    a.acct_bacd in ('5000', '6000')               " , "기타".equals(arg.getParameter("acct_bacd")) )
			.query(") a																										")
		;
		return data.selectForMap();
	}
}
