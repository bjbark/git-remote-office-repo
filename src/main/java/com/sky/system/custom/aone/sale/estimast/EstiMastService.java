package com.sky.system.custom.aone.sale.estimast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;


@Service("custom.aone.EstiMastSerivce")
public class EstiMastService  extends DefaultServiceHandler {

	// master1 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.* from (                                                                                                      ")
			.query("with cte as (                                                                                                          ")
			.query("select a.invc_numb, a.amnd_degr                                                                                        ")
			.query("from esti_mast a                                                                                                       ")
			.query("     left outer join esti_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr                            ")
			.query("where 1 = 1                                                                                                            ")
			.query("and	 a.find_name like %:find_name%	" , arg.getParamText("find_name" ))
			.query("and  a.invc_date >= :invc1_date		" , arg.getParamText("invc1_date"))
			.query("and  a.invc_date <= :invc2_date		" , arg.getParamText("invc2_date"))
			.query("and  a.line_clos  < :line_clos		" , arg.getParamText("line_clos" ))
			.query("and  a.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("and  b.item_idcd  = :item_idcd		" , arg.getParamText("item_idcd" ))
			.query("and  a.drtr_idcd  = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.query("and	 a.line_stat  < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (!"on".equals(arg.getParamText("list_all"))) {
		data.param
			.query("and a.amnd_degr = (select max(amnd_degr)from esti_mast where invc_numb = a.invc_numb)                              ")
		;
		}
		data.param
			.query("group by a.invc_numb, a.amnd_degr )                                                                                    ")
			.query("select b.line_stat , b.invc_numb  , b.amnd_degr  , b.esti_case_name  , b.esti_dvcd                                     ")
			.query("     , c.cstm_name , b.invc_date  , b.memo       , b.remk_text       , b.deli_date                                     ")
			.query("     , b.acpt_cofm_yorn , d.user_name, b.cstm_idcd                                                                     ")
			.query("     , (select count(*) from esti_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as item_cnt          ")
			.query("     , (select sum(e.sply_amnt + e.vatx_amnt) from esti_item e where e.invc_numb = a.invc_numb and a.amnd_degr = e.amnd_degr ) as sum_ttsm_amnt	")
			.query("     , (select sum(e.sply_amnt) from esti_item e where e.invc_numb = a.invc_numb and a.amnd_degr = e.amnd_degr ) as esti_amnt	")
			.query("from cte a ")
			.query("     left outer join esti_mast b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr                            ")
			.query("     left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd                                                          ")
			.query("     left outer join user_mast d on b.drtr_idcd = d.user_idcd			           							           ")
			.query("where 1 = 1 ")
			.query("order by a.invc_numb desc, a.amnd_degr desc limit 0, 9999 ")
			.query(") a")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//master2조회
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb         , a.amnd_degr         , a.line_seqn        , a.esti_item_dvcd		")
			.query("        , a.item_idcd         , a.cstm_item_name    , a.cstm_item_code   , a.unit_idcd			")
			.query("        , a.norm_sale_pric    , a.sale_stnd_pric    , a.dsnt_rate        , a.esti_pric			")
			.query("        , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate        , a.sply_amnt			")
			.query("        , a.vatx_amnt         , a.ttsm_amnt         , a.krwn_amnt        , a.krwn_vatx			")
			.query("        , a.krwn_ttsm_amnt    , a.remk_text         , a.uper_seqn        , a.disp_seqn			")
			.query("        , a.user_memo         , a.sysm_memo         , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr         , a.line_stat         , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name    , a.updt_ipad         , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd         , a.crte_urif														")
			.query("        , b.mold_idcd         , a.deli_date as deli_date2										")
			.query("        , i.item_code         , i.item_name         , i.item_spec        , u.unit_name			")
			.query("        , json_value(a.json_data,'$.poor_cont') as poor_cont									")
		;
		data.param
			.where("from   esti_item a																				")
			.where("left outer join item_adon b on a.item_idcd = b.item_idcd										")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("left outer join item_desc d on d.item_idcd = b.item_idcd										")
			.where("where  1=1																						")
			.where("and    a.invc_numb	=:invc_numb			" , arg.getParamText("invc_numb"))
			.where("and    a.amnd_degr	=:amnd_degr			" , arg.getParamText("amnd_degr"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}


	// 변경이력 조회
	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.amnd_degr       , a.chge_cont        , a.amnd_date				")
			.query("        , a.drtr_idcd        																	")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
			.query("        , a.crte_idcd        , a.crte_urif														")
			.query("        , u.user_name as drtr_name																")
		;
		data.param
			.where("from esti_amnd a																				")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("where    1=1																					")
			.where("and      a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb , a.amnd_degr desc															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 상담내역 조회
	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb           , a.line_seqn         , a.cnsl_dttm         , a.drtr_idcd		")
			.query("        , a.cstm_dept_name      , a.cstm_drtr_name    , a.cnsl_cont         , a.cost_yorn		")
			.query("        , a.dsig_yorn           , a.puch_yorn         , a.otod_yorn         , a.prod_yorn		")
			.query("        , a.rply_reqt_yorn      , a.rply_mthd_dvcd     , a.rply_drtr_idcd	, a.rply_dttm		")
			.query("        , a.rply_cont           , u.user_name as drtr_name										")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from acpt_cnsl a																				")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("where   1=1																						")
			.where("and     a.invc_numb  = :invc_numb	" , arg.getParameter("invc_numb"))
			.where("and     a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 가공비 산출내역 조회
	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	 invc_numb, amnd_degr, wkct_name		, qntt		, pric		, amnt				")
		;
		data.param
			.where("from esti_make														")
			.where("where   invc_numb  = :invc_numb	" , arg.getParameter("invc_numb"))
			.where("and     amnd_degr  = :amnd_degr	" , arg.getParameter("amnd_degr"))
		;
//		data.param
//			.query("select	  a.invc_numb			, a.amnd_degr			, a.cstm_idcd		, c.cstm_name		")
//			.query("		, a.esti_case_name		, d.user_name			, a.invc_date		, a.deli_date		")
//			.query("		, a.esti_dvcd																			")
//			.query("		, (select count(*) from esti_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as item_cnt")
//			.query("		, (select sum(i.sply_amnt) from esti_item i where i.invc_numb = a.invc_numb and i.amnd_degr = a.amnd_degr ) as esti_amnt")
//			.query("		, (select e.qntt from esti_make e where e.invc_numb = a.invc_numb and e.amnd_degr = a.amnd_degr and e.line_seqn = '1') as comp_prft")
//			.query("		, (select e.amnt from esti_make e where e.invc_numb = a.invc_numb and e.amnd_degr = a.amnd_degr and e.line_seqn = '1') as comp_prft2")
//			.query("		, (select e.qntt from esti_make e where e.invc_numb = a.invc_numb and e.amnd_degr = a.amnd_degr and e.line_seqn = '2') as work_time")
//			.query("		, (select e.pric from esti_make e where e.invc_numb = a.invc_numb and e.amnd_degr = a.amnd_degr and e.line_seqn = '2') as work_time2")
//			.query("		, (select e.amnt from esti_make e where e.invc_numb = a.invc_numb and e.amnd_degr = a.amnd_degr and e.line_seqn = '2') as work_time3")
//			.query("		, a.make_cost																			")
//		;
//		data.param
//			.where("from esti_mast a																				")
//			.where("left outer join esti_make b on b.invc_numb = a.invc_numb										")
//			.where("left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd										")
//			.where("left outer join user_mast d on d.user_idcd = a.drtr_idcd										")
//			.where("left outer join esti_make e on e.invc_numb = a.invc_numb										")
//			.where("left outer join esti_item i on i.invc_numb = a.invc_numb										")
//			.where("where   1=1																						")
//			.where("and     a.invc_numb  = :invc_numb	" , arg.getParameter("invc_numb"))
//			.where("and     a.amnd_degr  = :amnd_degr	" , arg.getParameter("amnd_degr"))
////			.where("and     a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
//			.where("group by a.invc_numb																			")
//		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 자재소요 조회
	public SqlResultMap getDetail6(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb           , a.line_seqn         , a.amnd_degr         , a.assi_seqn		")
			.query("        , a.mtrl_Clss_dvcd      , a.item_idcd         , a.item_name         , a.item_spec		")
			.query("        , a.item_line           , a.item_leng         , a.item_widh         , a.item_fxqt		")
			.query("        , a.item_numb           , a.mixx_rate         , a.qntt              , a.pric			")
			.query("        , a.amnt                , a.uper_seqn         , a.disp_seqn								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from esti_mtrl a																				")
			.where("left outer join esti_item b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr and b.line_seqn = a.line_seqn")
			.where("where a.invc_numb = :invc_numb	" , arg.getParameter("invc_numb"))
			.where("and   a.amnd_degr = :amnd_degr	" , arg.getParameter("amnd_degr"))
			.where("and   a.line_seqn = :line_seqn	" , arg.getParameter("line_seqn"))
			.where("order by line_seqn																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// invoice 조회
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb             , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.query("        , a.cstm_idcd             , a.esti_dvcd         , a.deli_date       , a.dept_idcd		")
			.query("        , a.drtr_idcd             , a.mdtn_prsn         , a.dlvy_cond       , a.esti_vald_term	")
			.query("        , a.excg_rate_chge_yorn   , a.paym_cond         , a.remk_text       , a.memo			")
			.query("        , a.esti_amnt             , a.esti_vatx         , a.ttsm_amnt       , a.crny_dvcd		")
			.query("        , a.excg_rate             , a.esti_case_name											")
			.query("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd             , a.crte_urif													")
			.query("        , c.cstm_code             , c.cstm_name         , c.boss_name							")
			.query("        , u.user_name as drtr_name																")
			.query(", (select count(*) from esti_item e where e.invc_numb = a.invc_numb and a.amnd_degr = e.amnd_degr) as item_cnt	")
			.query(", (select sum(e.sply_amnt + e.vatx_amnt) from esti_item e where e.invc_numb = a.invc_numb and a.amnd_degr = e.amnd_degr ) as sum_ttsm_amnt	")
			.query("from esti_mast a																				")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.query("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.query("left outer join esti_item e on a.invc_numb = e.invc_numb										")
			.query("where  1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			.query("and     a.amnd_degr	=:amnd_degr  "	, arg.getParamText("amnd_degr"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb         , a.amnd_degr         , a.line_seqn        , a.esti_item_dvcd		")
				.query("        , a.item_idcd         , a.cstm_item_name    , a.cstm_item_code   , a.unit_idcd			")
				.query("        , a.norm_sale_pric    , a.sale_stnd_pric    , a.dsnt_rate        , a.esti_pric			")
				.query("        , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate        , a.sply_amnt			")
				.query("        , a.vatx_amnt         , a.ttsm_amnt         , a.krwn_amnt        , a.krwn_vatx			")
				.query("        , a.krwn_ttsm_amnt    , a.deli_date as deli_date2                , a.remk_text			")
				.query("        , a.uper_seqn         , a.disp_seqn								")
				.query("        , a.user_memo         , a.sysm_memo         , a.prnt_idcd        , a.line_levl			")
				.query("        , json_value(a.json_data,'$.poor_cont') as poor_cont									")
				.query("        , a.line_ordr         , a.line_stat         , a.line_clos        , a.find_name			")
				.query("        , a.updt_user_name    , a.updt_ipad         , a.updt_dttm        , a.updt_idcd			")
				.query("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad        , a.crte_dttm			")
				.query("        , a.crte_idcd         , a.crte_urif														")
				.query("        , i.item_code         , i.item_name         , i.item_spec        , u.unit_name			")
			;
			data.param
				.where("from   esti_item a																				")
				.where("       left outer join item_mast i on a.item_idcd = i.item_idcd									")
				.where("       left outer join unit_mast u on a.unit_idcd = u.unit_idcd									")
				.where("where   1=1																						")
				.where("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
				.where("and     a.amnd_degr	=:amnd_degr  "	, arg.getParamText("amnd_degr"))
			;

			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	// 마감 / 해지 건을 수정.
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
			.query("call auto_esti_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	// invoice master 등록/수정/삭제
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String hq = "";

		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("esti_mast"														)
					.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */

					.unique("invc_numb"				, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))

					// .update("amnd_degr"				, row.getParameter("amnd_degr"			))	/*  사업장ID  */
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"			))	/*  사업장ID  */
					.update("invc_date"				, row.getParameter("invc_date"			))	/*  invoice일자  */
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"			))	/*  거래처ID  */
					.update("cstm_name"				, row.getParameter("cstm_name"			))	/*  거래처명  */
					.update("esti_dvcd"				, row.getParameter("esti_dvcd"			))	/*  견적구분코드  */
					.update("esti_case_name"		, row.getParameter("esti_case_name"		))	/*  견적건명  */
					.update("deli_date"				, row.getParameter("deli_date"			))	/*  납기일자  */
					.update("dept_idcd"				, row.getParameter("dept_idcd"			))	/*  부서ID */
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"			))	/*  담당자ID */
					.update("mdtn_prsn"				, row.getParameter("mdtn_prsn"			))	/*  중개인 */
					.update("dlvy_cond"				, row.getParameter("dlvy_cond"			))	/*  인도조건  */
					.update("esti_vald_term"		, row.getParameter("esti_vald_term"		))	/*  견적유효기간  */
					.update("excg_rate_chge_yorn"	, row.getParameter("excg_rate_chge_yorn"))	/*  환율변경여부  */
					.update("paym_cond"				, row.getParameter("paym_cond"			))	/*  지불조건  */
					.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */
					.update("memo"					, row.getParameter("memo"				))	/*  메모  */
					.update("find_name"				, row.getParamText("invc_date")
													 +" "
													 +row.getParamText("cstm_idcd")
													 +" "
													 +row.getParamText("cstm_name"))			/*  find_name  */
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				data.param
					.table("esti_amnd")
					.where("where invc_numb = :invc_numb" )
					.where("and   amnd_degr = :amnd_degr" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, 1)

					.update("amnd_date"			, row.getParameter("invc_date"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				/*System.out.println(hq+"#################");

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				data.clear();
				data.param
					.query("update ( select a.invc_numb,a.line_seqn,@rank:=@rank+1 as rank									")
					.query("         from esti_item a, (select @rank := 0 ) r												")
					.query("         where a.invc_numb = :invc_numb",row.fixParameter("invc_numb"))
					.query("       ) a																						")
					.query("       left outer join esti_item b on a.invc_numb = b.invc_numb and a.line_seqn = b.line_seqn	")
					.query("set b.line_seqn = a.rank																		")
					;
				data.attach(Action.direct);
*/
				System.out.println(hq+"#################");

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				if (rowaction == Action.modify) {

				}
			}
		}
	data.execute();
	return null;
	}

	// invoice detail 등록/수정/삭제
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");
			if(deli_date2.matches("^[0-9]+$")){
			}else{
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				 	.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(rowaction);
			} else {
				// detail 등록/수정

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "esti_item_json_fields");

				data.param
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					// .update("amnd_degr"			, row.getParameter("amnd_degr"			))
					.update("esti_item_dvcd"	, row.getParameter("esti_item_dvcd"		))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("item_name"			, row.getParameter("item_name"			))
					.update("item_spec"			, row.getParameter("item_spec"			))
					.update("cstm_item_name"	, row.getParameter("cstm_item_name"		))
					.update("cstm_item_code"	, row.getParameter("cstm_item_code"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("esti_pric"			, row.getParameter("esti_pric"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("dsnt_rate"			, row.getParameter("dsnt_rate"			))
					.update("esti_qntt"			, row.getParameter("esti_qntt"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("deli_date"			, deli_date2							)
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("json_data"			, json_data)
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */

					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			}

		}
	}

	// 상담내역 저장
	public SqlResultMap setDetail3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("acpt_cnsl												")
					.where("where invc_numb		= :invc_numb							")
					.where("and line_seqn		= :line_seqn							")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))	//담당자ID
					.update("cstm_dept_name"	, row.getParameter("cstm_dept_name"		))	//고객부서명
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"		))	//거래처담당자명
					.update("cnsl_cont"			, row.getParameter("cnsl_cont"			))	//상담내용
					.update("cost_yorn"			, row.getParameter("cost_yorn"			))	//원가여부
					.update("dsig_yorn"			, row.getParameter("dsig_yorn"			))	//설계여부
					.update("puch_yorn"			, row.getParameter("puch_yorn"			))	//구매여부
					.update("otod_yorn"			, row.getParameter("otod_yorn"			))	//외주여부
					.update("prod_yorn"			, row.getParameter("prod_yorn"			))	//생산여부
					.update("rply_reqt_yorn"	, row.getParameter("rply_reqt_yorn"		))	//회신요청여부
					.update("rply_mthd_dvcd"	, row.getParameter("rply_mthd_dvcd"		))	//회신방법구분코드
					.update("rply_drtr_idcd"	, row.getParameter("rply_drtr_idcd"		))	//회산담당자ID
					.update("rply_dttm"			, row.getParameter("rply_dttm"			))	//회신일시
					.update("rply_cont"			, row.getParameter("rply_cont"			))	//회신내용
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//차수

			 		.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, row.getParamText("item_idcd"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
					;
				data.attach(rowaction);
			}
			data.execute();
		return null ;
	}

	// 자재요소 저장
	public SqlResultMap setDetail6(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("esti_mtrl												")
					.where("where invc_numb		= :invc_numb							")
					.where("and   line_seqn		= :line_seqn							")
					.where("and   amnd_degr		= :amnd_degr							")
					.where("and   assi_seqn		= :assi_seqn							")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))	//AMD순번
					.unique("assi_seqn"			, 1)										//보조순번

					.update("mtrl_clss_dvcd"	, row.getParameter("mtrl_clss_dvcd"		))	//자재분류구분코드
					.update("item_idcd"			, row.getParameter("item_idcd"			))	//품목ID
					.update("item_name"			, row.getParameter("item_name"			))	//품목명
					.update("item_spec"			, row.getParameter("item_spec"			))	//품목규격
					.update("item_line"			, row.getParameter("item_line"			))	//품목골
					.update("item_leng"			, row.getParameter("item_leng"			))	//품목길이
					.update("item_widh"			, row.getParameter("item_widh"			))	//품목폭
					.update("item_fxqt"			, row.getParameter("item_fxqt"			))	//품목절수
					.update("item_numb"			, row.getParameter("item_numb"			))	//품목개수
					.update("mixx_rate"			, row.getParameter("mixx_rate"			))	//배합비율
					.update("qntt"				, row.getParameter("qntt"				))	//수량
					.update("pric"				, row.getParameter("pric"				))	//단가
					.update("amnt"				, row.getParameter("amnt"				))	//금액
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번

			 		.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, row.getParamText("item_idcd"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
					;
				data.attach(rowaction);
			}
			data.execute();
		return null ;
	}

	//이미지 저장
	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		byte[] returnByte =null;
		byte[] returnByte2 =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		// 이미지일 경우 섬네일 과정을 거친다.

		for (int i = 0; i < file.length; i++) {
			System.out.println("***************file:"+file[i].getFileItem().getName());
		}

		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
			thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		int readCount = 0;
		int readCount2 = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update esti_item					")
					.query("       set item_imge = ''			")
					.query("       where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
					.query("         and amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
					.query("         and line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("esti_item")
					.where("where invc_numb	= :invc_numb" )
					.where("and   amnd_degr	= :amnd_degr" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("invc_numb"				, arg.getParameter("invc_numb"))
					.unique("amnd_degr"				, arg.getParameter("amnd_degr"))
					.unique("line_seqn"				, arg.getParameter("line_seqn"))

					.update("item_imge",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update esti_item					")
					.query("       set item_imge2 = ''			")
					.query("       where invc_numb = :invc_numb", arg.getParameter("invc_numb"))
					.query("         and amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
					.query("         and line_seqn = :line_seqn", arg.getParameter("line_seqn"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("esti_item")
					.where("where invc_numb = :invc_numb" )
					.where("and   amnd_degr = :amnd_degr" )
					.where("and   line_seqn = :line_seqn" )

					.unique("invc_numb"				, arg.getParameter("invc_numb"))
					.unique("amnd_degr"				, arg.getParameter("amnd_degr"))
					.unique("line_seqn"				, arg.getParameter("line_seqn"))

					.update("item_imge2",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
		} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream != null) thumnailInputStream.close();
			if(thumnailInputStream2 != null) thumnailInputStream2.close();
		}

		return map;
	}

	// 이미지 조회
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2		")
			.where("from  esti_item						")
			.where("where 1=1							")
			.where("and   invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.where("and   amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
			.where("and   line_seqn = :line_seqn", arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	// 가공비 산출내역 저장
	public SqlResultMap setEsti(HttpRequestArgument arg) throws Exception {
		String invc_numb		= arg.getParamText("invc_numb");	// 견적번호
		String amnd_degr		= arg.getParamText("amnd_degr");	// 견적차수

		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if (amnd_degr.length() == 0) {
			amnd_degr = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

			data.param // 기업이윤 저장
				.table("esti_make")
				.where("where invc_numb = :invc_numb	")
				.where("and   amnd_degr = :amnd_degr	")
				.where("and   line_seqn = :line_seqn	")
				.where("and   assi_seqn = :assi_seqn	")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))	// 견적차수
				.unique("line_seqn"		, 1							   )	// 순번
				.unique("assi_seqn"		, 0							   )	// 보조순번

				.update("wkct_name"		, "기업이윤"					   )	// 공정명
				.update("qntt"			, arg.getParameter("comp_prft"))	// 수량
				.update("amnt"			, arg.getParameter("comp_prft2"))	// 금액

				.update("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
				.update("crte_idcd"		, arg.login)	//생성ID
			;
			data.attach(Action.modify)
			;

			data.param // 작업시간 저장
				.table("esti_make")
				.where("where invc_numb = :invc_numb	")
				.where("and   amnd_degr = :amnd_degr	")
				.where("and   line_seqn = :line_seqn	")
				.where("and   assi_seqn = :assi_seqn	")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))	// 견적차수
				.unique("line_seqn"		, 2							   )	// 순번
				.unique("assi_seqn"		, 0							   )	// 보조순번

				.update("wkct_name"		, "작업시간"					   )	// 공정명
				.update("qntt"			, arg.getParameter("work_time"))	// 수량
				.update("pric"			, arg.getParameter("work_time2"))	// 단가
				.update("amnt"			, arg.getParameter("work_time3"))	// 금액


				.update("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
				.update("crte_idcd"		, arg.login)	//생성ID
			;
			data.attach(Action.modify)
			;
			data.param // 총액 저장
				.table("esti_mast")
				.where("where invc_numb = :invc_numb	")
				.where("and   amnd_degr = :amnd_degr	")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))	// 견적차수

				.update("make_cost"		, arg.getParameter("make_cost"))
			;
			data.attach(Action.modify)
			;

		data.execute();
		return null;
	}

	// 삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		//첨부파일
		data.param
			.table("apnd_file")

			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")
			.where("and   uper_seqn = :uper_seqn")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))

			.update("uper_seqn"		, arg.getParameter("uper_seqn"))
		;
		data.attach(Action.delete)
		;

		// 변경이력
		data.param
			.table("esti_amnd")

			.where("where invc_numb = :invc_numb")
			.where("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))

		;
		data.attach(Action.delete)
		;

		// 상담내역
		data.param
			.table("acpt_cnsl")

			.where("where invc_numb = :invc_numb")
			.where("and   uper_seqn = :uper_seqn")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("uper_seqn"		, arg.getParameter("uper_seqn"))
		;
		data.attach(Action.delete)
		;

		// 가공비
		data.param
		.table("esti_make")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;

		// master2
		data.param
			.table("esti_item")

			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;

		// master
		data.param
		.table("esti_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
		;
		data.attach(Action.delete)
		;

	data.execute();
	return null;
}

	// 수주등록
	public SqlResultMap setAcpt(HttpRequestArgument arg) throws Exception {
		String invc_numb		= arg.getParamText("invc_numb");
		String amnd_degr		= arg.getParamText("amnd_degr");
		String acpt_invc_numb	= arg.getParamText("acpt_invc_numb");
		String acpt_dvcd		= arg.getParamText("acpt_dvcd");
		String deli_date		= arg.getParamText("deli_date");
		String login_id			= arg.getParamText("login_id");

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
			.query("call auto_acpt_insert (")
			.query("   :invc_numb "  , invc_numb	)  // 견적서 번호
			.query(" , :amnd_degr "  , amnd_degr	)  // 견적서 차수
			.query(" , :acpt_invc_numb "  , acpt_invc_numb	)  // 수주번호
			.query(" , :acpt_dvcd "  , acpt_dvcd	)  // 수주구분
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" , :login_id "   , login_id	)  // 로그인Id
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	// 견적복사
	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
	      DataMessage data;
	      String invc_numb    = arg.getParamText("invc_numb") ;
	      String amnd_degr    = arg.getParamText("amnd_degr") ;
	      String deli_date    = arg.getParamText("deli_date");
	      String hq           = arg.getParamText("hqof_idcd") ;
	      String stor         = arg.getParamText("stor_id");
	      String logn_id      = arg.getParamText("logn_id") ;
	      if (hq.length()     == 0  && stor.length() >= 10 ) {
	         hq = stor.substring(0,10) ;
	      }
	      if (invc_numb.length() == 0) {
	         invc_numb = "not defined" ;
	      }

	      if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
	      else                  { data = arg.newStorage("POS");      }
	         data.param
	         .query("call esti_copy (         ")
	         .query("  :invc_numb "   , invc_numb   )  // Invoice 번호
	         .query(" , :amnd_degr "  , amnd_degr   )  // 차수
	         .query(" , :deli_date "  , deli_date   )  // 납기일자
	         .query(" , :STOR "       , hq         )  // 본사코드
	         .query(" , :logn_id "    , logn_id   )  //
	         .query(" )                         ")
	      ;
	      data.attach(Action.direct);
	      data.execute();
	      return null;

	   }

	// AMEND
	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
	      SqlResultRow ordrInfo = getOrderInfo(arg);
	      if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
	         throw new ServiceException("최종 차수가 아닙니다.");
	      }

	      DataMessage data;
	      String invc_numb    = arg.getParamText("invc_numb") ;
	      String amnd_date    = arg.getParamText("amnd_date") ;
	      String amnd_degr    = arg.getParamText("amnd_degr") ;
	      String new_amnd_degr= arg.getParamText("new_amnd_degr") ;
	      String drtr_idcd    = arg.getParamText("drtr_idcd") ;
	      String chge_cont    = arg.getParamText("chge_cont") ; // 변경 사유
	      String logn_id      = arg.getParamText("logn_id") ;
	      String hq           = arg.getParamText("hqof_idcd") ;
	      String stor         = arg.getParamText("stor_id");
	      if (hq.length()     == 0  && stor.length() >= 10 ) {
	         hq = stor.substring(0,10) ;
	      }
	      if (invc_numb.length() == 0) {
	         invc_numb = "not defined" ;
	      }

	      if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
	      else                  { data = arg.newStorage("POS");      }
	         data.param
	         .query("call esti_amnd (         ")
	            .query("   :invc_numb "     , invc_numb      )  // Invoice 번호
	            .query(" , :amnd_degr "     , amnd_degr      )  //
	            .query(" , :new_amnd_degr"  , new_amnd_degr   )  //
	            .query(" , :amnd_date "     , amnd_date      )  // 변경일자
	            .query(" , :drtr_idcd "     , drtr_idcd      )  //
	            .query(" , :chge_cont "     , chge_cont      )  // 변경 내용
	            .query(" , :logn_id "        , logn_id      )  //
	            .query(" )                               ")
	      ;
	      data.attach(Action.direct);
	      data.execute();
	      return null;
	   }


	// 상품검색
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

	// 출력
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

	// ?
	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_numb = "";
		String amnd_degr = "";

		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (arg.containsKey("amnd_degr")) {
			amnd_degr = (String)arg.getParameter("amnd_degr");
		} else if (arg.containsKey("records")) {
			amnd_degr = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("amnd_degr");
		}

		if (StringUtils.isEmpty(invc_numb) || StringUtils.isEmpty(amnd_degr)) {
			throw new ServiceException("수리정보를  확인할 수 없습니다." );
		}

		data.param
			.query("select line_clos")
			.query("     , (select max(amnd_degr) from esti_mast where invc_numb = a.invc_numb) as max_amnd_degr ")
			.query("from  esti_mast a							")
		 	.query("where a.invc_numb = :invc_numb", invc_numb)
		 	.query("and   a.amnd_degr = :amnd_degr", amnd_degr)
		;
		return data.selectForRow();
	}
	}
