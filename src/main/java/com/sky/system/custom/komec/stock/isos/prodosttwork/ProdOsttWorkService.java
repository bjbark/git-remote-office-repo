package com.sky.system.custom.komec.stock.isos.prodosttwork;

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


@Service("komec.stock.isos.ProdOsttWorkService")
public class ProdOsttWorkService  extends DefaultServiceHandler {
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
			.query("select *																						")
		;
		data.param
			.where("from(																							")
			.where("select  a.invc_numb       , a.invc_date       , a.bzpl_idcd       , a.ostt_dvcd					")
			.where("      , a.ostt_wrhs_idcd  , a.orig_invc_numb  , a.orig_seqn       , a.line_clos					")
			.where("      , a.cstm_dvcd       , a.cstm_idcd       , a.cstm_name       , a.ostt_usge_bacd			")
			.where("      , a.drtr_idcd       , a.remk_text       , u.user_name as drtr_name						")
			.where("      , b.base_name as ostt_usge_name         , i.item_code       , i.item_name					")
			.where("      , p.lott_numb       , p.indn_qntt       , p.strt_dttm       , p.endd_dttm					")
			.where("      , w.wrhs_name as ostt_wrhs_name															")
		;
		data.param
			.where("from mtrl_ostt_mast a																			")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("left outer join base_mast b on a.ostt_usge_bacd = b.base_code									")
			.where("left outer join pror_mast p on a.orig_invc_numb = p.invc_numb 									")
			.where("left outer join item_mast i on p.item_idcd = i.item_idcd										")
			.where("left outer join wrhs_mast w on a.ostt_wrhs_idcd = w.wrhs_idcd									")
			.where("where  1=1																						")
			.where("and    a.ostt_dvcd = '2100'																		")
			.where("and    b.prnt_idcd = '3103'																		")
			.where("and    a.find_name like %:find_name%	"  , arg.getParamText("find_name"))
			.where("and    a.invc_date >= :fr_dt"              , arg.getParamText("fr_dt"))				//
			.where("and    a.invc_date <= :to_dt"              , arg.getParamText("to_dt"))				//
			.where("and    a.cstm_idcd = :cstm_idcd"           , arg.getParamText("cstm_idcd"))			//고객
			.where("and    a.line_stat = :line_stat"           , arg.getParamText("line_stat"))
			.where("and    a.cstm_idcd = :wkct_idcd"           , arg.getParamText("wkct_idcd"))	        //공정
			.where("and    a.ostt_wrhs_idcd = :ostt_wrhs_idcd" , arg.getParamText("ostt_wrhs_idcd"))	//출고창고
			.where("and    a.orig_invc_numb = :orig_invc_numb" , arg.getParamText("orig_invc_numb"))	//작업지시번호

			.where("and    a.line_stat   < :line_stat " , "2"  , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb)a																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLotChk(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(*) as count ")
			.where("  from purc_istt_item a ")
			.where(" where  a.lott_numb = :lott_numb2" , arg.fixParameter("lott_numb"))
		;
		return data.selectForMap();
	}

	public SqlResultMap getLot(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

//		boolean isDupCheck = true;
//
//		if (isDupCheck) {
//			data.param
//				.where("select count(*) as count ")
//				.where("  from purc_istt_item a ")
//				.where(" where  a.lott_numb = :lott_numb2" , arg.getParamText("lott_numb"))
//			;
//			if (Integer.parseInt(data.selectForRow().getParamText("count")) == 0) {
//				throw new ServiceException(" 입고되어있지않는 lot번호입니다. 확인 후 진행 하세요. ");
//			}
//		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
			.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.where("        , b.istt_qntt      , a.vatx_incl_yorn  , b.vatx_rate    , b.istt_amnt as amnt	")
			.where("        , ifnull(b.istt_amnt,0)*0.1 as istt_vatx										")
			.where("        , ifnull(b.istt_amnt,0)+ifnull(b.istt_amnt,0)*0.1 as ttsm_amnt					")
			.where("        , a.krwn_pric      , a.krwn_amnt 												")
			.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text as user_memo   , a.expr_date")
			.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln    , a.publ_date			")
			.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.where("        , u.user_name as drtr_name             , b.orig_seqn							")
			.where("        , ROW_NUMBER() OVER (ORDER BY b.invc_numb) as line_seqn      , b.item_idcd       , b.istt_pric as stnd_pric   , b.orig_amnd_degr	")
			.where("        , b.sysm_memo       , b.prnt_idcd      , b.line_levl							")
			.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.where("        , p.orig_invc_numb as acpt_numb        , round(ifnull(p.offr_qntt,0)*ifnull(i.unit_wigt,0),2) as ordr_wigt	")
			.where("        , t.acpt_case_name , b.lott_numb       , a.invc_numb as orig_invc_numb			")
			.where("        , s.ostt_qntt as mtrl_ostt_qntt													")
			.where("from purc_istt_item b																	")
			.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
			.where("left outer join purc_ordr_item p on b.orig_invc_numb = p.invc_numb						")
			.where("left outer join acpt_mast t      on p.orig_invc_numb = t.invc_numb						")
			.where("left outer join cstm_mast c      on b.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on b.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")
//			.where("left outer join ( select s.ostt_qntt, s.orig_invc_numb, s.orig_seqn						")
//			.where("                  from mtrl_ostt_item s 												")
//			.where("                ) s on a.invc_numb = s.orig_invc_numb and b.line_seqn = s.orig_seqn		")
			.where("where   1=1																				")
			.where("and    b.lott_numb = :lott_numb" , arg.getParamText("lott_numb"))	//작업지시번호
			.where("order by a.invc_numb)a																	")
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
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select																								")
			.where("        a.invc_numb       , a.line_seqn      , a.ostt_wrhs_idcd  , a.wkod_numb    , a.item_idcd		")
			.where("      , a.unit_idcd       , a.stnd_unit      , a.reqt_qntt       , a.ostt_qntt						")
			.where("      , a.stnd_unit_qntt  , a.stnd_pric      , a.vatx_incl_yorn  , a.vatx_rate    , a.amnt			")
			.where("      , a.vatx_amnt       , a.ttsm_amnt      , a.curr_stok_qntt  , a.lott_numb						")
			.where("      , a.wkct_item_idcd  , a.orig_invc_numb , a.orig_seqn       , a.remk_text						")
			.where("      , a.user_memo       , a.sysm_memo																")
			.where("      , a.prnt_idcd       , a.line_levl      , a.line_ordr       , a.line_stat    , a.line_clos		")
			.where("      , a.find_name       , a.updt_user_name , a.updt_ipad       , a.updt_dttm    , a.updt_idcd		")
			.where("      , a.updt_urif       , a.crte_user_name , a.crte_ipad       , a.crte_dttm    , a.crte_idcd		")
			.where("      , a.crte_urif       , a.uper_seqn      , a.disp_seqn											")
			.where("      , i.item_code       , i.item_name  as item_name												")
			.where("      , i.item_spec  as item_spec																	")
			.where("      , u.unit_name																					")
			.where("from    mtrl_ostt_item a																			")
			.where("        left outer join item_mast i   on a.item_idcd  = i.item_idcd									")
			.where("        left outer join unit_mast u   on i.unit_idcd  = u.unit_idcd									")
			.where("where   1=1																							")
			.where("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																							")
			.where("order by line_seqn																			")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																									")
			.query("        a.invc_numb      , a.invc_date      , a.bzpl_idcd      , a.ostt_wrhs_idcd , a.ostt_dvcd			")
			.query("      , a.cstm_dvcd      , a.cstm_idcd      , a.cstm_name      , a.ostt_usge_bacd						")
			.query("      , a.remk_text      , a.ostt_dvcd      , a.orig_invc_numb , a.orig_seqn							")
			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.query("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name			")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.query("      , w1.wrhs_name as ostt_wrhs_name																	")
			.query("      , u1.user_name as drtr_name																		")
			.query("     , (select base_name from base_mast r where a.ostt_usge_bacd  = r.base_code							")
			.query("                                          and   r.prnt_idcd = '3103')   as ostt_usge_name				")
			.query("from    mtrl_ostt_mast a																				")
			.query("        left outer join wrhs_mast w1  on a.ostt_wrhs_idcd = w1.wrhs_idcd								")
			.query("        left outer join user_mast u1  on a.drtr_idcd = u1.user_idcd										")
			.query("where   1=1																								")
			.query("and     a.invc_numb  = :invc_numb  ", arg.fixParameter("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select																								")
				.query("        a.invc_numb       , a.line_seqn      , a.ostt_wrhs_idcd  , a.wkod_numb  , a.item_idcd		")
				.query("      , a.unit_idcd       , a.stnd_unit      , a.reqt_qntt       , a.ostt_qntt						")
				.query("      , a.stnd_unit_qntt  , a.stnd_pric      , a.vatx_incl_yorn  , a.vatx_rate  , a.amnt			")
				.query("      , a.vatx_amnt       , a.ttsm_amnt      , a.curr_stok_qntt  , a.lott_numb						")
				.query("      , a.wkct_item_idcd  , a.orig_invc_numb , a.orig_seqn       , a.remk_text						")
				.query("      , a.user_memo       , a.sysm_memo																")
				.query("      , a.prnt_idcd       , a.line_levl      , a.line_ordr      , a.line_stat    , a.line_clos		")
				.query("      , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm    , a.updt_idcd		")
				.query("      , a.updt_urif       , a.crte_user_name , a.crte_ipad      , a.crte_dttm    , a.crte_idcd		")
				.query("      , a.crte_urif       , a.uper_seqn      , a.disp_seqn											")
				.query("      , i.item_code       , i.item_name  as item_name												")
				.query("      , i.item_spec  as item_spec																	")
				.query("      , u.unit_name																					")
				.query("from    mtrl_ostt_item a																			")
				.query("        left outer join item_mast i   on a.item_idcd = i.item_idcd									")
				.query("        left outer join unit_mast u   on a.unit_idcd = u.unit_idcd									")
				.query("where   1=1																							")
				.query("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
				.query("order by a.invc_numb, a.disp_seqn																	")
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

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("mtrl_ostt_mast")
				.where("where invc_numb     = :invc_numb	")
				.where("and   line_clos <> :line_clos		")
				//
				.unique("invc_numb"		, row.fixParamText("invc_numb"  ))
				//
				.update("line_clos"		, row.getParameter("line_clos"))
				.update("updt_ipad"		, arg.remoteAddress				  )
		        .update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
		}
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
				//2022.02.22 - 이강훈 - 작업지시번호 공정의 line_seqn을 orig_seq로 등록한다.
				data.param
					.query("select line_seqn ")
					.where("from   pror_item ")
					.where("where  invc_numb = :invc_numb ", row.getParameter("orig_invc_numb"))
					.where("and    wkct_idcd = :cstm_idcd ", row.getParameter("cstm_idcd"))
				;

				int orig_seqn = 0;
				try {
					orig_seqn = Integer.parseInt(data.selectForRow().getParamText("line_seqn"));
				} catch (Exception e) {
				}

				data.clear();

				// master 등록/수정
				data.param
					.table("mtrl_ostt_mast"                                                    )
					.where("where invc_numb       = :invc_numb                           ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					//
					.update("invc_date"			, row.getParameter("invc_date"           ))  /*  INVOICE일자  */
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"           ))  /*  출고사업부문ID  */
					.update("ostt_wrhs_idcd"	, row.getParameter("ostt_wrhs_idcd"      ))  /*  출고창고ID  */
					.update("ostt_dvcd"			, "2100"								 )  /*  출고창고ID  */
					.update("cstm_dvcd"			, row.getParameter("cstm_dvcd"           ))  /*  거래처 구분코드 */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처 코드 */
					.update("cstm_name"			, row.getParameter("cstm_name"           ))  /*  거래처명 */
					.update("ostt_usge_bacd"	, row.getParameter("ostt_usge_bacd"      ))  /*  출고용도분류코드  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"           ))  /*  처리담당자ID  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*  작업지시번호  */
					//2022.02.22 - 이강룬 - 기존 orig_seqn에 생산년도가 등록되어 DB에서 가져오는 방식으로 변경
					//.update("orig_seqn"		, row.getParameter("orig_seqn"           ))  /*  출고근거 */
					.update("orig_seqn"			, orig_seqn                               )  /*  출고근거 */
					;

				data.param
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"            ).trim()
												+ " "
												+ row.getParamText("ostt_wrhs_idcd"       ).trim()
												+ " "
												+ row.getParamText("cstm_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
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

				if(row.getParameter("product") != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class),row.getParamText("orig_invc_numb"));
				}
				data.execute();
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "생산출고");
			}
		}
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map,String orig_invc_numb) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("mtrl_ostt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;data.attach(rowaction);
				if (row.getParamText("lott_numb").length() == 0) {
					sequence.setLot(arg
						, row.getParamText("invc_numb")
						, Integer.parseInt(row.getParamText("line_seqn"))
						, row.getParamText("item_idcd")
						, Double.parseDouble(row.getParamText("ostt_qntt"))
						, "생산출고"
						, "delete"
					);
				}

			} else {
				// detail 등록/수정
				data.param
					.table("mtrl_ostt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
					.update("ostt_wrhs_idcd"	, mst.getParameter("ostt_wrhs_idcd"      ))  /*  출고창고ID  */
					.update("ostt_resn_dvcd"	, row.getParameter("ostt_resn_dvcd"      ))  /*  원INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"			, row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"           ))  /*  출고수량  */
					.update("stnd_unit"			, row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("reqt_qntt"			, row.getParameter("reqt_qntt"           ))  /*  요청수량  */
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("stnd_pric"			, row.getParameter("stnd_pric"           ))  /*  표준단가  */
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"      ))  /*  부가세율포함여부  */
					.update("vatx_rate"			, row.getParameter("vatx_rate"           ))  /*  부가세율  */
					.update("amnt"				, row.getParameter("amnt"                ))  /*  금액  */
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"           ))  /*  부가세금액  */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"           ))  /*  합계금액  */
					.update("curr_stok_qntt"	, row.getParameter("curr_stok_qntt"      ))  /*  현재재고수량  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"			, row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("lott_mngt_yorn"	, row.getParameter("lott_mngt_yorn"      ))  /*  LOT관리여부  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"      ))  /*   */
					.update("orig_seqn"			, row.getParameter("line_seqn"           ))  /*   */
					.update("wkct_item_idcd"	, row.getParameter("wkct_item_idcd"      ))  /*  공정품목ID  */
					.update("wkod_numb"			, orig_invc_numb						  )  /*  작업지시번호  */

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
												+ row.getParamText("remk_text"            ).trim())
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
				;data.attach(rowaction);
				if (row.getParamText("lott_numb").length() == 0) {
					sequence.setLot(arg
						, row.getParamText("invc_numb")
						, Integer.parseInt(row.getParamText("line_seqn"))
						, row.getParamText("item_idcd")
						, Double.parseDouble(row.getParamText("ostt_qntt"))
						, "생산출고"
						, "insert"
					);
				}
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("mtrl_ostt_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.execute();
		data.clear();

		data.param
			.table("mtrl_ostt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.execute();
		data.clear();

			// 재고(입출고 대장) 삭제
//		data.param
//			.table("stock_book")
//			.where("where   invc_numb = :invc_numb 		")
//			//
//			.unique("invc_numb"   , arg.fixParameter("invc_numb"))
//		;data.attach(Action.delete);

//		data.execute();
		/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "생산출고");

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
			.query("and     a.acct_bacd in ('3000')						" , "제품".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('4000')						" , "상품".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('1001', '1002','1003','1004')		" , "자재".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('2001', '2002','3000')		" , "재공품".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('2001', '2002','3000')		" , "생산품".equals(arg.getParameter("acct_bacd")) )
			.query("and     a.acct_bacd in ('5000', '6000')				" , "기타".equals(arg.getParameter("acct_bacd")) )
			.query(") a																										")
		;
		return data.selectForMap();
	}


}
