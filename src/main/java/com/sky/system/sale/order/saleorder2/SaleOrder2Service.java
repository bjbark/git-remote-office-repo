package com.sky.system.sale.order.saleorder2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
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


@Service
public class SaleOrder2Service  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    i.invc_numb       , i.amnd_degr       , i.bzpl_idcd         , i.invc_date				")
			.where("		, i.ordr_dvcd       , i.orig_invc_numb  , i.expt_dvcd         , i.pcod_numb				")
			.where("		, a.deli_date       , i.cstm_idcd       , i.mdtn_prsn         , i.cont_date				")
			.where("		, i.drtr_idcd       , i.dept_idcd       , i.crny_dvcd         , i.excg_rate				")
			.where("		, i.ostt_wrhs_idcd  , i.trut_dvcd       , i.dlvy_cond_dvcd    , i.crdt_exce_yorn		")
			.where("		, i.amnt_lack_yorn  , i.sale_stor_yorn  , i.remk_text         , i.memo					")
			.where("		, i.cofm_yorn       , i.cofm_dttm       , i.cofm_drtr_idcd    , i.acpt_stat_dvcd		")
			.where("		, i.user_memo       , i.sysm_memo       , i.prnt_idcd         , i.line_levl				")
			.where("		, i.line_ordr       , i.line_stat       , i.line_clos         , i.find_name				")
			.where("		, i.updt_user_name  , i.updt_ipad       , SUBSTRING(a.updt_dttm,1,8)  as updt_dttm		")
			.where("		, i.updt_idcd       , SUBSTRING(a.crte_dttm,1,8) as crte_dttm							")
			.where("		, i.updt_urif       , i.crte_user_name  , i.crte_ipad									")
			.where("		, i.crte_idcd       , i.crte_urif       , i.cstm_drtr_name								")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, w.wrhs_code       , w.wrhs_name														")
			.where("		, a.cstm_offr_date  , a.cstm_lott_numb  , a.item_idcd         , a.cstm_deli_date		")
			.where("		, t.item_name       , a.invc_qntt       , a.invc_pric         , a.sply_amnt				")
			.where("		, a.deli_chge_resn  , a.line_seqn       , t.item_spec         , t.item_code				")
			.where("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.where("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.where("		, IFNULL(invc_qntt,0)-IFNULL(ostt_qntt,0) as upid_qntt									")
			.where("		, (select count(*) from acpt_item r where r.invc_numb = a.invc_numb) as item_count		")
			.where("		, @curRank:=@curRank+1 as rank          , u.user_name as crte_name						")
			.where("from   acpt_item a																				")
			.where("left   outer join acpt_mast      i  on a.invc_numb = i.invc_numb								")
			.where("left   outer join cstm_mast      c  on i.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on i.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on i.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join item_mast      t  on a.item_idcd = t.item_idcd								")
			.where("left   outer join user_mast      u  on u.user_idcd = a.crte_idcd								")
			.where(",(select @curRank:=0) r																			")
			.where("where  1=1																						")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'															")
			.where("and    i.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb"))
			.where("and    a.deli_date >= :deli_date1" , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("and    a.deli_date <= :deli_date2" , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("and    a.cstm_offr_date >= :invc_date1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("and    a.cstm_offr_date <= :invc_date2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("and    SUBSTRING(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("and    i.cstm_drtr_name like %:cstm_drtr_name%	" , arg.getParamText("cstm_drtr_name" ))
			.where("and    a.invc_numb like %:search_name1%			" , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//수주번호
			.where("and    i.acpt_stat_dvcd like %:acpt_stat%		" , arg.getParamText("acpt_stat"), "2".equals(arg.getParamText("search_id")))		//수주상태
			.where("and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    i.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    a.sysm_memo like '%납품중%'					" , "1".equals(arg.getParamText("state")))		//발주상태
			.where("and    a.sysm_memo like '%확정%'					" , "2".equals(arg.getParamText("state")))		//발주상태
			.where("and    a.sysm_memo like '%중단%'					" , "3".equals(arg.getParamText("state")))		//발주상태
			.where("and    a.sysm_memo like '%입고완료%'				" , "4".equals(arg.getParamText("state")))		//발주상태
			.where("order by i.line_clos asc, a.deli_date desc,t.item_code										")
			.where(") a																								")
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																								")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.where("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.where("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.where("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.where("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.where("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd       , a.crte_urif       , c.boss_name									")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, w.wrhs_code       , w.wrhs_name														")
			.where("		, i.item_idcd																			")
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    ifnull(a.ordr_dvcd,'') != '4000'															")
			.where("and    a.line_stat = '0'																		")
			.where("and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date				" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date				" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    a.acpt_stat_dvcd   = :acpt_stat_dvcd		" , arg.getParamText("acpt_stat_dvcd" ))
			.where("and    i.deli_date	>= :deli1_date				" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date				" , arg.getParamText("deli2_date" ))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
			.where(") a 																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
			.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
			.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
			.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
			.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
			.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
			.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("		, a.cstm_lott_numb																				")
			.query("		, b.item_code      , b.item_name      , b.item_spec      , u.unit_name      , i.mold_idcd		")
		;
		data.param
			.where("from   acpt_item a																						")
			.where("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
			.where("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
			.where("       left outer join item_adon i on a.item_idcd = i.item_idcd											")
			.where("where  1=1																								")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         , a.excg_rate				")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , a.cstm_drtr_name								")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.query("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.query("from    acpt_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd							")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd							")
			.query("where   1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
				.query("		, a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
				.query("		, a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
				.query("		, a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
				.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
				.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
				.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
				.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("		, a.cstm_lott_numb , b.item_code      , b.item_name      , b.item_spec      , u.unit_name		")
				.query("		, a.cstm_deli_date , a.cstm_offr_date , a.deli_chge_resn										")
				.query("from   acpt_item a																						")
				.query("       left outer join item_mast b on a.item_idcd = b.item_idcd											")
				.query("       left outer join unit_mast u on b.unit_idcd = u.unit_code											")
				.query("where   1=1																								")
				.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
				.query("order by a.line_seqn																					")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String line_clos	= arg.getParamText("line_clos");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
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
				// master 등록/수정
				data.param
					.table("acpt_mast"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))  /*  amd차수  */
					.update("bzct_dvcd"			, row.getParameter("bzct_dvcd"			))  /*  사업부문구분코드  */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  invoice일자  */
					.update("ordr_dvcd"			, row.getParameter("ordr_dvcd"			))  /*  오더구분코드  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))  /*  원invoice번호  */
					.update("expt_dvcd"			, row.getParameter("expt_dvcd"			))  /*  수출구분코드  */
					.update("pcod_numb"			, row.getParameter("pcod_numb"			))  /*  pono */
					.update("deli_date"			, row.getParameter("deli_date"			))  /*  납기일자 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  거래처ID */
					.update("mdtn_prsn"			, row.getParameter("mdtn_prsn"			))  /*  중개인  */
					.update("cont_date"			, row.getParameter("cont_date"			))  /*  계약일자  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))  /*  부서ID  */
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"			))  /*  통화구분코드  */
					.update("excg_rate"			, row.getParameter("excg_rate"			))  /*  환율  */
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"		))  /*  출고창고  */
					.update("trut_dvcd"			, row.getParameter("trut_dvcd"			))  /*  위탁구분코드  */
					.update("dlvy_cond_dvcd"	, row.getParameter("dlvy_cond_dvcd"		))  /*  인도조건구분코드  */
					.update("crdt_exce_yorn"	, row.getParameter("crdt_exce_yorn"		))  /*  여신초과여부  */
					.update("amnt_lack_yorn"	, row.getParameter("amnt_lack_yorn"		))  /*  금액미달여부  */
					.update("sale_stor_yorn"	, row.getParameter("sale_stor_yorn"		))  /*  판매보관여부  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고  */
					.update("memo"				, row.getParameter("memo"				))  /*  메모  */
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))  /*  확정여부  */
					.update("cofm_dttm"			, row.getParameter("cofm_dttm"			))  /*  확정일시  */
					.update("cofm_drtr_idcd"	, row.getParameter("cofm_drtr_idcd"		))  /*  확정담당자ID  */
					.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd"		))  /*  수주상태구분코드  */
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"		))  /*  담당자  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("ostt_wrhs_idcd"		).trim()
												+ row.getParamText("cstm_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
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
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;data.attach(rowaction);

			} else {
				// detail 등록/수정
				data.param
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("amnd_degr"			, row.getParameter("amnd_degr"			))
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("cstm_lott_numb"	, row.getParameter("cstm_lott_numb"		))
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"		))
					.update("orig_seqn"			, row.getParameter("orig_seqn"			))
					.update("orig_invc_qntt"	, row.getParameter("orig_invc_qntt"		))
					.update("ortn_dvcd"			, row.getParameter("ortn_dvcd"			))
					.update("optn_psbl_yorn"	, row.getParameter("optn_psbl_yorn"		))
					.update("optn_adtn"			, row.getParameter("optn_adtn"			))
					.update("pric_adpt"			, row.getParameter("pric_adpt"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("invc_qntt"			, row.getParameter("invc_qntt"			))
					.update("invc_pric"			, row.getParameter("invc_pric"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("invc_amnt"			, row.getParameter("invc_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("stnd_unit"			, row.getParameter("stnd_unit"			))
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))
					.update("deli_date"			, row.getParameter("deli_date"			))
					.update("cstm_deli_date"	, row.getParameter("cstm_deli_date"		))
					.update("cstm_offr_date"	, row.getParameter("cstm_offr_date"		))
					.update("dlvy_date"			, row.getParameter("dlvy_date"			))
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
					.update("dsct_qntt"			, row.getParameter("dsct_qntt"			))
					.update("dlvy_memo"			, row.getParameter("dlvy_memo"			))
					.update("deli_chge_resn"	, row.getParameter("deli_chge_resn"		))

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("item_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from  acpt_mast							")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();

		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_spts_insert (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		String cstm_deli_date	= arg.getParamText("cstm_deli_date");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_copy (					")
			.query("   :STOR "            , hq				)  // 본사코드
			.query(" , :invc_numb "       , invc_numb		)  // Invoice 번호
			.query(" , :cstm_deli_date "  , cstm_deli_date	)  // 납기일자
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}


	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String acpt_stat_dvcd  = arg.getParamText("acpt_stat_dvcd");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_ok (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :acpt_stat_dvcd	" , acpt_stat_dvcd	)  // 결재여부
			.query(" ) 										")
		;
		data.attach(Action.direct);
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
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}





	/**
	 * 엑셀등록
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public void setExcel(HttpRequestArgument arg, DataMessage data, SqlResultRow item
			) throws Exception {
		data.clear();
		DataMessage read = arg.newStorage("POS");
		SqlResultRow temp ; // = read.selectForRow();
		DataMessage data1 = arg.newStorage("POS");
		SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMdd");
		//deli_date
			if(item.getParameter("deli_date") != null) {
				String temp1,deli_date_temp;
				temp1 = item.getParamText("deli_date");
				deli_date_temp =dateformat.format(new Date(temp1));
				item.setParameter("deli_date", deli_date_temp);
			}
		//cstm_offr_date
			if(item.getParameter("cstm_offr_date") != null) {
				String temp2,cstm_offr_date_temp;
				temp2 = item.getParamText("cstm_offr_date");
				cstm_offr_date_temp =dateformat.format(new Date(temp2));
				item.setParameter("cstm_offr_date", cstm_offr_date_temp);
			}

		//cstm_deli_date
			if(item.getParameter("cstm_deli_date") != null) {
				String temp3,cstm_deli_date_temp;
				temp3 = item.getParamText("cstm_deli_date");
				cstm_deli_date_temp = dateformat.format(new Date(temp3));
				item.setParameter("cstm_deli_date", cstm_deli_date_temp);
			}

		//ostt_qntt = 수주수량(invc_qntt) - 미납수량(upid_qntt)
			double ostt_qntt = 0 ;
			double invc_qntt = 0 ;
			double upid_qntt = 0 ;

			invc_qntt = Double.parseDouble(item.getParamText("invc_qntt")) ;
			upid_qntt = Double.parseDouble(item.getParamText("upid_qntt")) ;

			ostt_qntt = invc_qntt - upid_qntt;
			item.setParameter("ostt_qntt", ostt_qntt);

		//부가세(vatx_amnt) = 금액(sply_amnt) *0.1
			double vatx_amnt = 0 ;
			double sply_amnt = 0 ;

			if(!item.getParamText("sply_amnt").equals("")){
				sply_amnt = Double.parseDouble(item.getParamText("sply_amnt")) ;
			}
			vatx_amnt = Math.floor(sply_amnt*0.1/10)*10;
			item.setParameter("vatx_amnt", vatx_amnt);

		//합계금액(invc_amnt) = 금액(sply_amnt) + 부가세(vatx_amnt)
			double invc_amnt1 = 0 ;
			double invc_amnt = 0 ;
			if(!item.getParamText("vatx_amnt").equals("")){
				vatx_amnt  = Double.parseDouble(item.getParamText("vatx_amnt")) ;
			}
			invc_amnt1 = sply_amnt + vatx_amnt;
			invc_amnt  = Math.floor(invc_amnt1/10)*10;
			item.setParameter("invc_amnt", invc_amnt);

		//발주상태(납품중or확정=cofm_yorn(1)/중단or입고완료=line_clos(1))
			String stat = item.getParamText("stat");
			String acpt_stat_dvcd = null;
			String line_clos = null;

			if(stat.equals("납품중")){
				acpt_stat_dvcd = "0011";
				line_clos = "0";
				item.setParameter("acpt_stat_dvcd", acpt_stat_dvcd);
				item.setParameter("line_clos", line_clos);
			}else if(stat.equals("확정")){
				acpt_stat_dvcd = "0011";
				line_clos = "0";
				item.setParameter("acpt_stat_dvcd", acpt_stat_dvcd);
				item.setParameter("line_clos", line_clos);
			}else if(stat.equals("중단")){
				acpt_stat_dvcd = "0010";
				line_clos = "1";
				item.setParameter("acpt_stat_dvcd", acpt_stat_dvcd);
				item.setParameter("line_clos", line_clos);
			}else if(stat.equals("입고완료")){
				acpt_stat_dvcd = "0010";
				line_clos = "1";
				item.setParameter("acpt_stat_dvcd", acpt_stat_dvcd);
				item.setParameter("line_clos", line_clos);
			}
		data1.clear();
		data1.param
			.query("select invc_numb from acpt_mast where invc_numb = :invc_numb", item.fixParameter("invc_numb"));
		SqlResultMap invc_numb = data1.selectForMap();
		data.clear();
		if(invc_numb.isEmpty()){
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.unique("invc_numb"        , item.fixParameter("invc_numb"))
				.unique("amnd_degr"        , 1	)

				.update("bzpl_idcd"        , "001")
				.update("invc_date"        , item.getParameter("cstm_offr_date"))
				.update("pcod_numb"        , item.getParameter("invc_numb"))
				.update("deli_date"        , item.getParameter("deli_date"))
				.update("cstm_idcd"        , "DOOINCSTMYNW01")
				.update("cstm_drtr_name"   , item.getParameter("cstm_drtr_name"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("acpt_stat_dvcd"   , item.getParameter("acpt_stat_dvcd"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("cstm_offr_date") +  "DOOINCSTMYNW01")

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.update("updt_idcd"        , arg.getParameter("updt_idcd"))
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_idcd"        , arg.getParameter("crte_idcd"))
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.modify);
			data.execute();

			data.param
				.table ("acpt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")
				.unique("invc_numb"        , item.fixParameter("invc_numb"  ))
				.unique("amnd_degr"        , 1	)
				.unique("line_seqn"        , 1	)

				.update("item_idcd"        , item.getParameter("item_idcd"))
				.update("invc_qntt"        , item.getParameter("invc_qntt"))
				.update("invc_pric"        , item.getParameter("invc_pric"))
				.update("sply_amnt"        , item.getParameter("sply_amnt"))
				.update("deli_date"        , item.getParameter("deli_date"))
				.update("cstm_lott_numb"   , item.getParameter("cstm_lott_numb"))
				.update("cstm_offr_date"   , item.getParameter("cstm_offr_date"))
				.update("cstm_deli_date"   , item.getParameter("cstm_deli_date"))
				.update("pcod_numb"        , item.getParameter("invc_numb"))
				.update("deli_chge_resn"   , item.getParameter("deli_chge_resn"))
				.update("ostt_qntt"        , item.getParameter("ostt_qntt"))
				.update("vatx_amnt"        , item.getParameter("vatx_amnt"))
				.update("invc_amnt"        , item.getParameter("invc_amnt"))
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.insert("pdsd_yorn"        , "0")

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_idcd"        , arg.getParameter("updt_idcd"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_idcd"        , arg.getParameter("crte_idcd"))
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.modify);
			data.execute();
			// 품목코드 등록 여부를 확인한다.
				data.param
					.table ("item_mast")
					.where ("where item_idcd = :item_idcd")
					.unique("item_idcd"        , item.fixParameter("item_idcd"))

					.update("acct_bacd"        , "3000"						)
					.update("item_code"        , item.getParameter("item_idcd"))
					.update("item_name"        , item.getParameter("item_name"))
					.update("item_spec"        , item.getParameter("item_spec"))
					.update("find_name"			, item.getParamText("item_idcd").trim()
												+ item.getParamText("item_name").trim())

					.update("sysm_memo"        , "Excel Upload"    )
					.update("updt_ipad"        , arg.remoteAddress )
					.update("updt_idcd"        , arg.getParameter("updt_idcd"))
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_idcd"        , arg.getParameter("crte_idcd"))
					.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.modify);
				data.execute();
		}else{
//			data.param
//				.table ("acpt_mast")
//				.where ("where invc_numb = :invc_numb")
//				.where ("and   amnd_degr = :amnd_degr")
//
//				.unique("invc_numb"        , item.fixParameter("invc_numb"))
//				.unique("amnd_degr"        , 1	)
//
//				.update("invc_date"        , item.getParameter("cstm_offr_date"))
//				.update("pcod_numb"        , item.getParameter("invc_numb"))
//				.update("deli_date"        , item.getParameter("deli_date"))
//				.update("cstm_drtr_name"   , item.getParameter("cstm_drtr_name"))
//				.update("remk_text"        , item.getParameter("remk_text"))
//				.update("user_memo"        , item.getParameter("user_memo"))
//				.update("acpt_stat_dvcd"   , item.getParameter("acpt_stat_dvcd"))
//				.update("line_clos"        , item.getParameter("line_clos"))
//				.update("line_stat"        , 0	)
//				.update("find_name"        , item.getParameter("cstm_offr_date") +  "DOOINCSTMYNW01")
//
//				.update("sysm_memo"        , item.getParameter("stat"))
//				.update("updt_ipad"        , arg.remoteAddress )
//			;
//			data.attach(Action.modify);
//			data.execute();
//
//			data.param
//				.table ("acpt_item")
//				.where ("where invc_numb = :invc_numb")
//				.where ("and   amnd_degr = :amnd_degr")
//				.where ("and   line_seqn = :line_seqn")
//
//				.unique("invc_numb"        , item.fixParameter("invc_numb"  ))
//				.unique("amnd_degr"        , 1	)
//				.unique("line_seqn"        , 1	)
//
//				.update("item_idcd"        , item.getParameter("item_idcd"))
//				.update("invc_qntt"        , item.getParameter("invc_qntt"))
//				.update("invc_pric"        , item.getParameter("invc_pric"))
//				.update("sply_amnt"        , item.getParameter("sply_amnt"))
//				.update("deli_date"        , item.getParameter("deli_date"))
//				.update("cstm_lott_numb"   , item.getParameter("cstm_lott_numb"))
//				.update("cstm_offr_date"   , item.getParameter("cstm_offr_date"))
//				.update("cstm_deli_date"   , item.getParameter("cstm_deli_date"))
//				.update("pcod_numb"        , item.getParameter("invc_numb"))
//				.update("deli_chge_resn"   , item.getParameter("deli_chge_resn"))
//				.update("ostt_qntt"        , item.getParameter("ostt_qntt"))
//				.update("vatx_amnt"        , item.getParameter("vatx_amnt"))
//				.update("invc_amnt"        , item.getParameter("invc_amnt"))
//				.update("user_memo"        , item.getParameter("user_memo"))
//				.update("remk_text"        , item.getParameter("remk_text"))
//				.update("line_stat"        , 0	)
//				.update("line_clos"        , item.getParameter("line_clos"))
//				.insert("pdsd_yorn"        , "0")
//
//				.update("sysm_memo"        , item.getParameter("stat"))
//				.update("updt_ipad"        , arg.remoteAddress )
//			;
//			data.attach(Action.modify);
//			data.execute();
		}
	}


	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 								") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 					") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0                   								")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

}
