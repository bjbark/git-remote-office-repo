package com.sky.system.stock.movework;

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
public class MoveWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																				")
		;
		data.param // 조회
			.query("select *																								")
		;
		data.param // 조회
			.where("from (																									")
			.where("select																									")
			.where("        a.invc_numb      , a.invc_date      , a.istt_bzpl_idcd , a.istt_wrhs_idcd , a.ostt_bzpl_idcd	")
			.where("      , a.ostt_wrhs_idcd , a.move_hope_date , a.trns_yorn      , a.reqt_dept_idcd , a.reqt_drtr_idcd	")
			.where("      , a.remk_text      , a.proc_dept_idcd , a.proc_drtr_idcd											")
			.where("      , b1.bzpl_name as istt_bzpl_name																	")
			.where("      , b2.bzpl_name as ostt_bzpl_name																	")
			.where("      , w1.wrhs_name as istt_wrhs_name																	")
			.where("      , w2.wrhs_name as ostt_wrhs_name																	")
			.where("      , d1.dept_name as reqt_dept_name																	")
			.where("      , u1.user_name as reqt_drtr_name																	")
			.where("      , d2.dept_name as proc_dept_name																	")
			.where("      , u2.user_name as proc_drtr_name																	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr			")
			.where("      , a.line_stat      , a.line_clos      , a.find_name												")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif			")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif			")
			.where("from    move_mast a																						")
			.where("       left outer join bzpl_mast b1 on a.istt_bzpl_idcd = b1.bzpl_idcd									")
			.where("       left outer join bzpl_mast b2 on a.ostt_bzpl_idcd = b2.bzpl_idcd									")
			.where("       left outer join wrhs_mast w1 on a.istt_wrhs_idcd = w1.wrhs_idcd									")
			.where("       left outer join wrhs_mast w2 on a.ostt_wrhs_idcd = w2.wrhs_idcd									")
			.where("       left outer join dept_mast d1 on a.reqt_dept_idcd = d1.dept_idcd									")
			.where("       left outer join dept_mast d2 on a.proc_dept_idcd = d2.dept_idcd									")
			.where("       left outer join user_mast u1 on a.reqt_drtr_idcd = u1.user_idcd									")
			.where("       left outer join user_mast u2 on a.proc_drtr_idcd = u2.user_idcd									")
			.where("where   1=1																								")
			.where("and    invc_date between :fr_dt           " , arg.getParamText("fr_dt" ))
			.where("                 and     :to_dt           " , arg.getParamText("to_dt" ))
			.where("and    istt_wrhs_idcd  = :istt_wrhs_idcd  " , arg.getParamText("istt_wrhs_idcd" ))
			.where("and    ostt_wrhs_idcd  = :ostt_wrhs_idcd  " , arg.getParamText("ostt_wrhs_idcd" ))
			.where("and    istt_bzpl_idcd  = :istt_bzpl_idcd  " , arg.getParamText("istt_bzpl_idcd" ))
			.where("and    ostt_bzpl_idcd  = :ostt_bzpl_idcd  " , arg.getParamText("ostt_bzpl_idcd" ))
			.where("and    proc_dept_idcd  = :proc_dept_idcd  " , arg.getParamText("proc_dept_idcd" ))
			.where("and    a.line_clos     = :line_clos       " , arg.getParamText("line_clos" ))
			.where("and    proc_drtr_idcd  = :proc_drtr_idcd  " , arg.getParamText("proc_drtr_idcd" ))
			.where("and     a.find_name    like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat    = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat    < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_numb) a																					")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																							")
			.where("select																							")
			.where("        a.invc_numb      , a.line_seqn      , a.item_idcd      , a.unit_idcd      , a.move_qntt	")
			.where("      , a.stnd_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.amnt           , a.vatx_amnt	")
			.where("      , a.ttsm_amnt      , a.move_dvcd      , a.stnd_unit      , a.stnd_unit_qntt , a.remk_text	")
			.where("      , a.lott_numb      , a.orig_invc_numb , a.orig_seqn      , a.uper_seqn      , a.disp_seqn	")
			.where("      , i.item_name      , i.item_spec      , i.item_code										")
			.where("      , u.unit_name																				")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr	")
			.where("      , a.line_stat      , a.line_clos      , a.find_name										")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif	")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif	")
			.where("from    move_item a																				")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("       left outer join unit_mast u on a.unit_idcd = u.unit_idcd										")
			.where("where   1=1																						")
			.where("and    invc_numb      = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																								")
			.where("order by disp_seqn																				")


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
			.query("        a.invc_numb      , a.invc_date      , a.istt_bzpl_idcd , a.istt_wrhs_idcd , a.ostt_bzpl_idcd	")
			.query("      , a.ostt_wrhs_idcd , a.move_hope_date , a.trns_yorn      , a.reqt_dept_idcd , a.reqt_drtr_idcd	")
			.query("      , a.remk_text      , a.proc_dept_idcd , a.proc_drtr_idcd											")
			.query("      , b1.bzpl_name as istt_bzpl_name																	")
			.query("      , b2.bzpl_name as ostt_bzpl_name																	")
			.query("      , w1.wrhs_name as istt_wrhs_name																	")
			.query("      , w2.wrhs_name as ostt_wrhs_name																	")
			.query("      , d1.dept_name as reqt_dept_name																	")
			.query("      , u1.user_name as reqt_drtr_name																	")
			.query("      , d2.dept_name as proc_dept_name																	")
			.query("      , u2.user_name as proc_drtr_name																	")
			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr			")
			.query("      , a.line_stat      , a.line_clos      , a.find_name												")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      ,a.updt_urif			")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      ,a.crte_urif			")
			.query("from    move_mast a																						")
			.query("       left outer join bzpl_mast b1 on a.istt_bzpl_idcd = b1.bzpl_idcd									")
			.query("       left outer join bzpl_mast b2 on a.ostt_bzpl_idcd = b2.bzpl_idcd									")
			.query("       left outer join wrhs_mast w1 on a.istt_wrhs_idcd = w1.wrhs_idcd									")
			.query("       left outer join wrhs_mast w2 on a.ostt_wrhs_idcd = w2.wrhs_idcd									")
			.query("       left outer join dept_mast d1 on a.reqt_dept_idcd = d1.dept_idcd									")
			.query("       left outer join dept_mast d2 on a.proc_dept_idcd = d2.dept_idcd									")
			.query("       left outer join user_mast u1 on a.reqt_drtr_idcd = u1.user_idcd									")
			.query("       left outer join user_mast u2 on a.proc_drtr_idcd = u2.user_idcd									")
			.query("where   1=1																								")
			.query("and     a.invc_numb  = :invc_numb  ", arg.fixParameter("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select																								")
				.query("        a.invc_numb      , a.line_seqn      , a.item_idcd      , a.unit_idcd      , a.move_qntt		")
				.query("      , a.stnd_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.amnt           , a.vatx_amnt		")
				.query("      , a.ttsm_amnt      , a.move_dvcd      , a.stnd_unit      , a.stnd_unit_qntt , a.remk_text		")
				.query("      , a.lott_numb      , a.orig_invc_numb , a.orig_seqn      , a.uper_seqn      , a.disp_seqn		")
				.query("      , i.item_name      , i.item_spec      , i.item_code											")
				.query("      , u.unit_name																					")
				.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr		")
				.query("      , a.line_stat      , a.line_clos      , a.find_name											")
				.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("from    move_item a																					")
				.query("       left outer join item_mast i on a.item_idcd = i.item_idcd										")
				.query("       left outer join unit_mast u on a.unit_idcd = u.unit_idcd										")
				.query("where   1=1																							")
				.query("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
				.query("order by a.invc_numb, a.disp_seqn																	")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}

		return info;
	}

	//재고이동내역 마감/해지
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("move_mast								")
				.where("where invc_numb		= :invc_numb		")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))

				.update("line_clos"			, arg.getParameter("line_clos"))	//마감여부
			;
			data.attach(Action.update);
			data.execute();
		return null ;
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
					.table("move_mast"                                                      )
					.where("where invc_numb       = :invc_numb                             ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"         , row.fixParameter("invc_numb"           ))
					//
					.update("invc_date"         , row.getParameter("invc_date"           ))  /*  INVOICE일자  */
					.update("istt_bzpl_idcd"    , row.getParameter("istt_bzpl_idcd"      ))  /*  입고사업장ID  */
					.update("istt_wrhs_idcd"    , row.getParameter("istt_wrhs_idcd"      ))  /*  입고창고ID  */
					.update("ostt_bzpl_idcd"    , row.getParameter("ostt_bzpl_idcd"      ))  /*  출고사업장ID  */
					.update("ostt_wrhs_idcd"    , row.getParameter("ostt_wrhs_idcd"      ))  /*  출고창고ID  */
					.update("move_hope_date"    , row.getParameter("move_hope_date"      ))  /*  이동희망일자  */
					.update("trns_yorn"         , row.getParameter("trns_yorn"           ))  /*  수송여부  */
					.update("reqt_dept_idcd"    , row.getParameter("reqt_dept_idcd"      ))  /*  요청부서ID  */
					.update("reqt_drtr_idcd"    , row.getParameter("reqt_drtr_idcd"      ))  /*  요청담당자ID  */
					.update("remk_text"         , row.getParameter("remk_text"           ))  /*  비고  */
					.update("proc_dept_idcd"    , row.getParameter("proc_dept_idcd"      ))  /*  처리부서ID  */
					.update("proc_drtr_idcd"    , row.getParameter("proc_drtr_idcd"      ))  /*  처리담당자ID  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("istt_wrhs_name"            ).trim()
												+ " "
												+ row.getParamText("ostt_wrhs_name"            ).trim()
												+ row.getParamText(""            ).trim()
												+ " "
//												+ row.getParamText(""            ).trim()
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
					.action = rowaction;
				data.attach();
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "이동출고");
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "이동입고");
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
					.table("move_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;data.attach(rowaction);

			} else {
				// detail 등록/수정
				data.param
					.table("move_item"                                                      )
					.where("where invc_numb       = :invc_numb                             ")  /*  INVOICE번호  */
					.where("and   line_seqn       = :line_seqn                             ")  /*  순번  */
					//
					.unique("invc_numb"         , row.fixParameter("invc_numb"           ))
					.unique("line_seqn"         , row.fixParameter("line_seqn"           ))
					//
					.update("item_idcd"         , row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("unit_idcd"         , row.getParameter("unit_idcd"           ))  /*  단위ID  */
					.update("move_qntt"         , row.getParameter("move_qntt"           ))  /*  이동수량  */
					.update("stnd_pric"         , row.getParameter("stnd_pric"           ))  /*  표준단가  */
					.update("vatx_incl_yorn"    , row.getParameter("vatx_incl_yorn"      ))  /*  부가세포함여부  */
					.update("vatx_rate"         , row.getParameter("vatx_rate"           ))  /*  부가세율  */
					.update("amnt"              , row.getParameter("amnt"                ))  /*  금액  */
					.update("vatx_amnt"         , row.getParameter("vatx_amnt"           ))  /*  부가세금액  */
					.update("ttsm_amnt"         , row.getParameter("ttsm_amnt"           ))  /*  합계금액  */
					.update("move_dvcd"         , row.getParameter("move_dvcd"           ))  /*  이동구분코드  */
					.update("stnd_unit"         , row.getParameter("stnd_unit"           ))  /*  기준단위  */
					.update("stnd_unit_qntt"    , row.getParameter("stnd_unit_qntt"      ))  /*  기준단위수량  */
					.update("remk_text"         , row.getParameter("remk_text"           ))  /*  비고  */
					.update("lott_numb"         , row.getParameter("lott_numb"           ))  /*  LOT번호  */
					.update("orig_invc_numb"    , row.getParameter("orig_invc_numb"      ))  /*  원INVOICE번호  */
					.update("orig_seqn"         , row.getParameter("orig_seqn"           ))  /*  원INVOICE순번  */
					.update("uper_seqn"         , row.getParameter("uper_seqn"           ))  /*  상위순번  */
					.update("disp_seqn"         , row.getParameter("disp_seqn"           ))  /*  표시순번  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("item_code"            ).trim()
												+ " "
												+ row.getParamText("item_name"            ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("invc_numb"            ).trim()
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
			.query("from   move_mast						")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("move_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

		data.param
			.table("move_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);

			// 재고(입출고 대장) 삭제
//		data.param
//			.table("stock_book")
//			.where("where invc_dvsn = :invc_dvsn 		")
//			.where("and   invc_numb = :invc_numb 		")
//			.where("and   bzpl_idcd = :bzpl_idcd 		")
//			//
//			.unique("invc_dvsn"   , "'1200'")
//			.unique("invc_numb"   , arg.fixParameter("invc_numb"))
//			.unique("bzpl_idcd"   , arg.fixParameter("bzpl_idcd"))
//		;data.attach(Action.delete);

		data.execute();
		/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "이동출고");

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
				.query("	,   a.item_code   		as item_code 										") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 							") /* 품목 / 규격 */
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
