package com.sky.system.custom.dehansol.sale.saleorder;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("dehansol.SaleOrderService")
public class SaleOrderService  extends DefaultServiceHandler {
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
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select    i.invc_numb       , i.amnd_degr       , i.bzpl_idcd         , i.invc_date					")
			.where("		, i.ordr_dvcd       , i.orig_invc_numb  , i.expt_dvcd         , i.pcod_numb					")
			.where("		, a.deli_date       , i.cstm_idcd       , i.mdtn_prsn         , i.cont_date					")
			.where("		, i.drtr_idcd       , i.dept_idcd       , i.crny_dvcd         , i.excg_rate					")
			.where("		, i.ostt_wrhs_idcd  , i.trut_dvcd       , i.dlvy_cond_dvcd    , i.crdt_exce_yorn			")
			.where("		, i.amnt_lack_yorn  , i.sale_stor_yorn  , i.remk_text         , i.memo						")
			.where("		, i.cofm_yorn       , i.cofm_dttm       , i.cofm_drtr_idcd    , i.acpt_stat_dvcd			")
			.where("		, i.user_memo       , i.sysm_memo       , i.prnt_idcd         , i.line_levl					")
			.where("		, i.line_ordr       , i.line_stat       , i.line_clos         , i.find_name					")
			.where("		, i.updt_user_name  , i.updt_ipad       , c.cstm_name										")
			.where("		, i.updt_idcd       , i.crte_dttm															")
			.where("		, i.updt_urif       , i.crte_user_name  , i.crte_ipad										")
			.where("		, i.crte_idcd       , i.crte_urif       , i.cstm_drtr_name									")
			.where("		, d.user_name as drtr_name																	")
			.where("		, w.wrhs_code       , w.wrhs_name															")
			.where("		, a.cstm_offr_date  , a.cstm_lott_numb  , a.item_idcd         , a.cstm_deli_date			")
			.where("		, t.item_name       , a.invc_qntt       , a.invc_pric         , a.sply_amnt					")
			.where("		, a.deli_chge_resn  , a.line_seqn       , t.item_spec         , t.item_code					")
			.where("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli		")
			.where("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli		")
			.where("		, IFNULL(invc_qntt,0)-IFNULL(ostt_qntt,0) as upid_qntt        , t.modl_name					")
			.where("		, s.fixt_type_dvcd  , s.puch_reqt_numb  , s.puch_reqt_date    , s.chit_elec_date			")
			.where("		, s.tool_numb       , s.film_numb       , s.film_kind_dvcd    , s.film_name					")
			.where("		, s.plmk_numb       , s.plmk_kind_code  , s.mesh_bacd         , s.mesh_type_dvcd			")
			.where("		, s.jigg_code       , s.jigg_grup_code  , s.bbtt_jigg_type    , s.cstm_prod_numb			")
			.where("		, s.cstm_modl_name  , s.revs_numb       , s.mtrl_name         , s.cstm_name as cstm_name2	")
			.where("		, s.pdgr            , s.strt_flor       , s.endd_flor         , s.xscl						")
			.where("		, s.yscl            , s.wkct_code       , s.wkct_name         , s.indv_qntt					")
			.where("		, s.hole_diam       , s.hpjg_proc_mthd  , s.prjg_proc_mthd    , s.yval_cetr					")
			.where("		, s.bbtt_pont       , s.jgup_qntt       , s.hole_qntt         , s.brcd						")
			.where("		, s.full_angl       , s.tens_from       , s.tens_util         , s.wkly_1fst					")
			.where("		, s.wkly_2snd       , s.spmr_hold_yorn  , s.spmr_acpt_dttm    , s.spmr_acpt_offe			")
			.where("		, b1.base_name as mesh_bacd_name        , s.film_acpt_yorn    , s.film_acpt_offe			")
			.where("		, s.plmk_kind_name  , s.updt_dttm       , s.levl_publ_yorn    , s.film_acpt_dttm			")
			.where("		, s.tool_revs       , s.fixt_code       , s.trst_name         , s.dict_dvsn_name			")
			.where("		, s.prcs_type       , s.sufc_dvcd       , s.istt_qntt         , s.base_unit					")
			.where("		, s.make_entr_name  , s.nwol_dvsn_name  , s.olmt_tick         , s.norm_yorn					")
			.where("		, s.otod_istt_cstm  , s.mcmp_istt_cstm  , s.mesh_name         , s.cstm_code					")
			.where("		, s.plmk_size       , s.wkct_ordr       , b2.base_name as plmk_kind_name2					")
			.where("		, REPLACE(json_extract(a.json_data, '$.rpst_item_idcd'),'\"','') as rpst_item_idcd			")
			.where("		, p. plmk_size_horz , p.plmk_size_vrtl  , p.dict_yorn										")
			.where("from   acpt_item a																					")
			.where("left   outer join acpt_mast         i  on a.invc_numb = i.invc_numb									")
			.where("left   outer join acpt_spec_dehan   s  on a.invc_numb = s.invc_numb									")
			.where("left   outer join cstm_mast         c  on i.cstm_idcd = c.cstm_idcd									")
			.where("left   outer join user_mast         d  on i.drtr_idcd = d.user_idcd									")
			.where("left   outer join wrhs_mast         w  on i.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join item_mast         t  on a.item_idcd = t.item_idcd									")
			.where("left   outer join base_mast        b1  on s.mesh_bacd = b1.base_code and b1.prnt_idcd = '3101'		")
			.where("left   outer join base_mast        b2  on s.plmk_kind_code = b2.base_code and b2.prnt_idcd = '3104'	")
			.where("left   outer join sale_pric         p  on a.item_idcd = p.item_idcd									")
			.where(",(select @curRank:=0) r																				")
			.where("where  1=1																							")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'																")
			.where("and    s.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    i.invc_date	  >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("and    i.invc_date	  <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("and    a.deli_date       >= :deli_date1			" , arg.getParamText("deli_date1"))
			.where("and    a.deli_date       <= :deli_date2			" , arg.getParamText("deli_date2"))
			.where("and    i.cstm_drtr_name like %:cstm_drtr_name%	" , arg.getParamText("cstm_drtr_name" ))
			.where("and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    t.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    a.cstm_deli_date	>= :cstm_deli_date1		" , arg.getParamText("cstm_deli_date1"))
			.where("and    a.cstm_deli_date	<= :cstm_deli_date2		" , arg.getParamText("cstm_deli_date2"))
			.where("and    s.levl_publ_yorn like '%0%'				" , "0".equals(arg.getParamText("levl_publ_yorn")))	//라벨발행 아니오
			.where("and    s.levl_publ_yorn like '%1%'				" , "1".equals(arg.getParamText("levl_publ_yorn")))	//라벨발행 예
			.where("and    s.levl_publ_yorn like '%%'				" , "2".equals(arg.getParamText("levl_publ_yorn")))	//전체
			.where("and    a.line_stat  like '%0%'					" , "0".equals(arg.getParamText("line_stat")))		//삭제여부 아니오
			.where("and    a.line_stat  like '%2%'					" , "2".equals(arg.getParamText("line_stat")))		//삭제여부 예
			.where("and    i.line_clos like '%1%'					" , "1".equals(arg.getParamText("line_clos")))		//마감
			.where("and    i.line_clos like '%0%'					" , "2".equals(arg.getParamText("line_clos")))		//정상
			.where("and    i.line_clos like '%%'					" , "3".equals(arg.getParamText("line_clos")))		//전체
			.where("and    i.acpt_stat_dvcd like '%0011%'			" , "2".equals(arg.getParamText("acpt_stat_dvcd")))	//승인완료
			.where("and    i.acpt_stat_dvcd like '%0600%'			" , "3".equals(arg.getParamText("acpt_stat_dvcd")))	//출고처리
			.where("and    i.acpt_stat_dvcd like '%0%'				" , "1".equals(arg.getParamText("acpt_stat_dvcd")))	//전체
			.where("order by i.invc_date desc , a.invc_numb asc														")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearchSum(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  sum(a.invc_qntt) as sum_qntt          , sum(a.sply_amnt) as sum_amnt						")
			.where("from   acpt_item a																					")
			.where("left   outer join acpt_mast         i  on a.invc_numb = i.invc_numb									")
			.where("left   outer join acpt_spec_dehan   s  on a.invc_numb = s.invc_numb									")
			.where("left   outer join cstm_mast         c  on i.cstm_idcd = c.cstm_idcd									")
			.where("left   outer join user_mast         d  on i.drtr_idcd = d.user_idcd									")
			.where("left   outer join wrhs_mast         w  on i.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join item_mast         t  on a.item_idcd = t.item_idcd									")
			.where("left   outer join base_mast        b1  on s.mesh_bacd = b1.base_code and b1.prnt_idcd = '3101'		")
			.where("left   outer join base_mast        b2  on s.plmk_kind_code = b2.base_code and b2.prnt_idcd = '3104'	")
			.where("left   outer join sale_pric         p  on a.item_idcd = p.item_idcd									")
			.where("where  1=1																							")
			.where("and    ifnull(i.ordr_dvcd,0) != '4000'																")
			.where("and    s.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    i.invc_date	  >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("and    i.invc_date	  <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("and    a.deli_date       >= :deli_date1			" , arg.getParamText("deli_date1"))
			.where("and    a.deli_date       <= :deli_date2			" , arg.getParamText("deli_date2"))
			.where("and    i.cstm_drtr_name like %:cstm_drtr_name%	" , arg.getParamText("cstm_drtr_name" ))
			.where("and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    t.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    a.cstm_deli_date	>= :cstm_deli_date1		" , arg.getParamText("cstm_deli_date1"))
			.where("and    a.cstm_deli_date	<= :cstm_deli_date2		" , arg.getParamText("cstm_deli_date2"))
			.where("and    s.levl_publ_yorn like '%0%'				" , "0".equals(arg.getParamText("levl_publ_yorn")))	//라벨발행 아니오
			.where("and    s.levl_publ_yorn like '%1%'				" , "1".equals(arg.getParamText("levl_publ_yorn")))	//라벨발행 예
			.where("and    s.levl_publ_yorn like '%%'				" , "2".equals(arg.getParamText("levl_publ_yorn")))	//전체
			.where("and    a.line_stat  like '%0%'					" , "0".equals(arg.getParamText("line_stat")))		//삭제여부 아니오
			.where("and    a.line_stat  like '%2%'					" , "2".equals(arg.getParamText("line_stat")))		//삭제여부 예
			.where("and    i.line_clos like '%1%'					" , "1".equals(arg.getParamText("line_clos")))		//마감
			.where("and    i.line_clos like '%0%'					" , "2".equals(arg.getParamText("line_clos")))		//정상
			.where("and    i.line_clos like '%%'					" , "3".equals(arg.getParamText("line_clos")))		//전체
			.where("and    i.acpt_stat_dvcd like '%0011%'			" , "2".equals(arg.getParamText("acpt_stat_dvcd")))	//승인완료
			.where("and    i.acpt_stat_dvcd like '%0600%'			" , "3".equals(arg.getParamText("acpt_stat_dvcd")))	//출고처리
			.where("and    i.acpt_stat_dvcd like '%0%'				" , "1".equals(arg.getParamText("acpt_stat_dvcd")))	//전체
			.where("order by i.invc_date desc , a.invc_numb asc														")
		;
		return data.selectForMap();
	}

	/**
	 * 검사성적서 , 라벨  , 거래명세서 레포트파일 찾기
	 */
	public SqlResultMap getInsp(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select  a.cstm_idcd,  a.rprt_dvcd,  a.rprt_file_name	")
		.where("from  cstm_rprt a										")
		.where("where 1=1												")
		.where("and   a.cstm_idcd = :cstm_idcd",arg.getParameter("cstm_idcd"))
		.where("and   a.rprt_dvcd = :rprt_dvcd",arg.getParameter("rprt_dvcd"))
		.where("and   a.a.rprt_file_name = :rprt_file_name",arg.getParameter("rprt_file_name"))

		;
		return data.selectForMap();
	}

	public SqlResultMap getReport_Kind(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call report_kind (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		return data.selectForMap();
	}

	//라벨발행체크
	public SqlResultMap setLabel(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("acpt_spec_dehan"					)
			.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
			//
			.update("levl_publ_yorn"	, arg.getParameter("levl_publ_yorn"))	/*  라벨발행유무  */
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}

	//데이터복원
		public SqlResultMap setRestore(HttpRequestArgument arg) throws Exception {

			DataMessage data;
			String hq    = arg.getParamText("hq_id") ;
			String stor  = arg.getParamText("stor_id");

			if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
			else                  { data = arg.newStorage("POS");      }
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

			data.param
				.table("acpt_item"					)
				.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
				.where("and amnd_degr		= :amnd_degr")  /*  INVOICE번호  */
				.where("and line_seqn		= :line_seqn")  /*  INVOICE번호  */
				//
				.unique("invc_numb"			, arg.getParameter("invc_numb"))
				.unique("amnd_degr"			, arg.getParameter("amnd_degr"))
				.unique("line_seqn"			, arg.getParameter("line_seqn"))
				//
				.update("line_stat"			, arg.getParameter("line_stat"))	/*  필름수령여부  */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			return null;
		}



	//필름수령
	public SqlResultMap setFilm(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("acpt_spec_dehan"					)
			.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
			//
			.unique("invc_numb"			, arg.getParameter("invc_numb"))
			//
			.update("film_acpt_yorn"	, arg.getParameter("film_acpt_yorn"))	/*  필름수령여부  */
			.update("film_acpt_offe"	, arg.getParameter("film_acpt_offe"))	/*  필름수령여부  */
			.update("film_acpt_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일자 */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	//필름수령취소
	public SqlResultMap setFilm2(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("acpt_spec_dehan"					)
			.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
			//
			.update("film_acpt_yorn"	, arg.getParameter("film_acpt_yorn"))	/*  필름수령여부 */
			.update("film_acpt_dttm"	, arg.getParameter("film_acpt_dttm"))	/*  필름수정일자 */
			.update("film_acpt_offe"	, arg.getParameter("film_acpt_offe"))	/*  필름수령처 */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}


	/*
	 * 출고
	 */

	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call acpt_to_ostt (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setReleaseCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call acpt_to_cancel (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//거래명세서
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		data = new DataMessage(hq+".POS");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		System.out.println(arg.getParamText("param"));
		data.param
			.query("call invoice_query (				")
			.query("   :param       "  , arg.fixParameter("param")		)
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
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
	 등록/수정/삭제
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		DataMessage temp = arg.newStorage("POS");

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				data.param
					.table("acpt_spec_dehan")
					.where("where invc_numb = :invc_numb	")


					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast")
					.where("where invc_numb      = :invc_numb	")
					.where("and   amnd_degr      = :amnd_degr		")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"		))
				;data.attach(Action.delete);
				data.execute();

				data.param
					.table("acpt_item")
					.where("where invc_numb      = :invc_numb	")
					.where("and   amnd_degr      = :amnd_degr	")
					.where("and   line_seqn      = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
			;data.attach(Action.delete);
			data.execute();

			data.param
					.table("item_mast")
					.where("where item_idcd      = :item_idcd	")

					.unique("item_idcd"			, row.fixParameter("item_idcd"		))
					;data.attach(Action.delete);
			data.execute();

			} else {

				// master 등록/수정
				data.param
					.table ("acpt_spec_dehan")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))			//INVOICE 번호
					.update("amnd_degr"        , 1	)									//AMD차수
					.update("line_seqn"        , 1	)									//순번

					.update("puch_reqt_numb"   , row.getParameter("puch_reqt_numb"))	//구매요청번호
					.update("fixt_type_dvcd"   , row.getParameter("fixt_type_dvcd"))	//치공구유형구분코드
					.update("puch_reqt_date"   , row.getParameter("puch_reqt_date"))	//구매요청일자
					.update("chit_elec_date"   , row.getParameter("chit_elec_date"))	//전표전기일자
					.update("tool_numb"        , row.getParameter("tool_numb"))			//TOOL번호
					.update("film_numb"        , row.getParameter("film_numb"))			//필름번호
					.update("film_kind_dvcd"   , row.getParameter("film_kind_dvcd"))	//필름종류구분코드
					.update("film_name"        , row.getParameter("film_name"))			//필름명
					.update("plmk_numb"        , row.getParameter("plmk_numb"))			//제판번호
					.update("plmk_kind_code"   , row.getParameter("plmk_kind_code"))	//제판종류코드
					.update("plmk_kind_name"   , row.getParameter("plmk_kind_name"))	//제판종류명
					.update("mesh_bacd"        , row.getParameter("mesh_bacd"))			//망사분류코드
					.update("mesh_type_dvcd"   , row.getParameter("mesh_type_dvcd"))	//망사타입구분코드
					.update("mesh_name"        , row.getParameter("mesh_name"))			//MESH
					.update("jigg_code"        , row.getParameter("jigg_code"))			//지그코드
					.update("jigg_grup_code"   , row.getParameter("jigg_grup_code"))	//지그그룹코드
					.update("bbtt_jigg_type"   , row.getParameter("bbtt_jigg_type"))	//BBT지그타입
					.update("cstm_prod_numb"   , row.getParameter("cstm_prod_numb"))	//고객제품번호
					.update("cstm_modl_name"   , row.getParameter("cstm_modl_name"))	//고객모델명
					.update("revs_numb"        , row.getParameter("revs_numb"))			//리비젼번호
					.update("mtrl_name"        , row.getParameter("mtrl_name"))			//자재명
					.update("cstm_code"        , row.getParameter("cstm_code"))			//거래처코드
					.update("cstm_name"        , row.getParameter("cstm_name2"))		//고객명
					.update("pdgr"             , row.getParameter("pdgr"))				//제품군
					.update("strt_flor"        , row.getParameter("strt_flor"))			//시층
					.update("endd_flor"        , row.getParameter("endd_flor"))			//종층
					.update("xscl"             , row.getParameter("xscl"))				//X스케일
					.update("yscl"             , row.getParameter("yscl"))				//Y스케일
					.update("wkct_code"        , row.getParameter("wkct_code"))			//공정코드
					.update("wkct_name"        , row.getParameter("wkct_name"))			//공정명
					.update("indv_qntt"        , row.getParameter("indv_qntt"))			//개체수
					.update("hole_diam"        , row.getParameter("hole_diam"))			//홈파이
					.update("hpjg_proc_mthd"   , row.getParameter("hpjg_proc_mthd"))	//HP지그가공방법
					.update("prjg_proc_mthd"   , row.getParameter("prjg_proc_mthd"))	//인쇄지그가공방법
					.update("yval_cetr"        , row.getParameter("yval_cetr"))			//Y값중심
					.update("bbtt_pont"        , row.getParameter("bbtt_pont"))			//BBT포인트
					.update("jgup_qntt"        , row.getParameter("jgup_qntt"))			//지그업수
					.update("hole_qntt"        , row.getParameter("hole_qntt"))			//홀수
					.update("brcd"             , row.getParameter("brcd"))				//바코드
					.update("full_angl"        , row.getParameter("full_angl"))			//견장각도
					.update("tens_from"        , row.getParameter("tens_from"))			//텐션부터
					.update("tens_util"        , row.getParameter("tens_util"))			//텐선까지
					.update("wkly_1fst"        , row.getParameter("wkly_1fst"))			//주간1
					.update("plmk_size"        , row.getParameter("plmk_size"))			//제판사이즈
					.update("wkly_2snd"        , row.getParameter("wkly_2snd"))			//주간2
					.update("otod_istt_cstm"   , row.getParameter("otod_istt_cstm"))	//입고거래처
					.update("spmr_hold_yorn"   , row.getParameter("spmr_hold_yorn"))	//사급자재보유여부
					.update("spmr_acpt_dttm"   , row.getParameter("spmr_acpt_dttm"))	//사급자재수령일시
					.update("film_acpt_yorn"   , row.getParameter("film_acpt_yorn"))	//필름수령여부
					.update("film_acpt_offe"   , row.getParameter("film_acpt_offe"))	//필름수령처
					.update("tool_revs"        , row.getParameter("tool_revs"))			//TOOL리비젼
					.update("sufc_dvcd"        , row.getParameter("sufc_dvcd"))			//면구분코드
					.update("trst_name"        , row.getParameter("trst_name"))			//의뢰자명
					.update("line_stat"        , 0	)
					.update("find_name"			, row.getParameter("puch_reqt_numb")
												+ "	"
												+ row.getParameter("plmk_numb")
												+ "	"
												+ row.getParameter("cstm_prod_numb")
												+ "	"
												+ row.getParameter("tool_numb"))
					.update("user_memo"        , row.getParameter("user_memo"))		/*  담당자  */
					.update("sysm_memo"        , row.getParameter("sysm_memo"))		/*  시스템메모  */
					.update("prnt_idcd"        , row.getParameter("prnt_idcd"))		/*  상위 ID  */
					.update("line_levl"        , row.getParameter("line_levl"))		/*  ROW레벨  */
					.update("line_ordr"        , row.getParameter("line_ordr"))		/*  ROW순서  */
					.update("line_clos"        , row.getParameter("line_clos"))		/*  마감여부  */
					.update("updt_ipad"        , row.getParameter("updt_ipad"))		/*  수정IP  */
					.update("updt_idcd"        , row.getParameter("updt_idcd"))		/*  수정ID  */
					.update("updt_urif"        , row.getParameter("updt_urif"))		/*  수정UI  */
					.insert("crte_user_name"   , row.getParameter("crte_user_name"))	/*  생성사용자명  */
					.insert("crte_ipad"        , row.getParameter("crte_ipad"))		/*  생성IP  */
					.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"        , row.getParameter("crte_idcd"))		/*  생성ID  */
					.insert("crte_urif"        , row.getParameter("crte_urif"))		/*  생성UI  */
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();

				data.param
					.table ("acpt_mast")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))			//INVOICE번호
					.unique("amnd_degr"        , 1	)									//AMD차수

					.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"))			//사업장ID
					.update("invc_date"        , row.getParameter("invc_date"))			//INVOICE 일자
					.update("ordr_dvcd"        , row.getParameter("ordr_dvcd"))			//오더구분코드
					.update("ordr_invc_numb"   , row.getParameter("ordr_invc_numb"))	//원INVOICE코드
					.update("expt_dvcd"        , row.getParameter("expt_dvcd"))			//수출구분코드
					.update("pcod_numb"        , row.getParameter("pcod_numb`"))		//PONO
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("dlvy_cstm_idcd"   , row.getParameter("dlvy_cstm_idcd"))	//납품거래처ID
					.update("acpt_dvcd"        , row.getParameter("acpt_dvcd"))			//수주구분코드
					.update("mdtn_prsn"        , row.getParameter("mdtn_prsn"))			//중개인
					.update("cont_date"        , row.getParameter("cont_date"))			//계약일자
					.update("drtr_idcd"        , row.getParameter("drtr_idcd"))			//담당자ID
					.update("dept_idcd"        , row.getParameter("dept_idcd"))			//부서ID
					.update("crny_dvcd"        , row.getParameter("crny_dvcd"))			//통화구분코드
					.update("excg_rate"        , row.getParameter("excg_rate"))			//환율
					.update("ostt_wrhs_idcd"   , row.getParameter("ostt_wrhs_idcd"))	//출고창고ID
					.update("trut_dvcd"        , row.getParameter("trut_dvcd"))			//위탁구분코드
					.update("dlvy_cond_dvcd"   , row.getParameter("dlvy_cond_dvcd"))	//인도조건구분코드
					.update("crdt_exce_yorn"   , row.getParameter("crdt_exce_yorn"))	//여신초과여부
					.update("amnt_lack_yorn"   , row.getParameter("amnt_lack_yorn"))	//금액미달여부
					.update("sale_stor_yorn"   , row.getParameter("sale_stor_yorn"))	//판매보관여부
					.update("remk_text"        , row.getParameter("remk_text"))			//비고
					.update("memo"             , row.getParameter("memo"))				//메모
					.update("cofm_yorn"        , row.getParameter("cofm_yorn"))			//확정여부
					.update("cofm_dttm"        , row.getParameter("cofm_dttm"))			//확정일시
					.update("cstm_drtr_name"   , row.getParameter("cstm_drtr_name"))	//고객담당자명
					.update("cstm_drtr_idcd"   , row.getParameter("cstm_drtr_idcd"))	//확정담당자ID
					.update("acpt_stat_dvcd"   , row.getParameter("acpt_stat_dvcd"))	//수주상태구분코드
					.update("user_memo"        , row.getParameter("user_memo"))
					.update("line_clos"        , row.getParameter("line_clos"))
					.update("line_stat"        , 0	)
					.update("find_name"        , row.getParameter("")
												+ "	"
												+ row.getParameter(""))
					.update("sysm_memo"        , row.getParameter("stat"))
					.update("updt_ipad"        , arg.remoteAddress )
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
				data.attach(Action.modify);
				data.execute();
				data.clear();


				//단가(invc_pric) = 금액(sply_amnt) / 수량(invc_qntt)
				double invc_pric = 0 ;
				double invc_qntt = 0 ;
				double sply_amnt = 0 ;
				double vatx_amnt = 0 ;
				double invc_amnt = 0 ;

				invc_qntt  = Double.parseDouble(row.getParamText("invc_qntt")) ;
				sply_amnt  = Double.parseDouble(row.getParamText("sply_amnt")) ;
				invc_pric  = sply_amnt / invc_qntt;
				vatx_amnt  = sply_amnt * 0.1;
				invc_amnt  = sply_amnt + vatx_amnt;


				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

				data.param
					.table ("acpt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("amnd_degr"        , 1	)
					.unique("line_seqn"        , 1	)

					.update("item_idcd"        , row.getParameter("item_idcd"))		//품목ID
					.update("invc_qntt"        , row.getParameter("invc_qntt"))		//Invoice수량
					.update("sply_amnt"        , row.getParameter("sply_amnt"))		//공급가액
					.update("pcod_numb"        , row.getParameter("pcod_numb"))		//고객발주번호
					.update("deli_chge_resn"   , row.getParameter("deli_chge_resn"))//납기변경사유
					.update("ostt_qntt"        , row.getParameter("ostt_qntt"))		//출고수량
					.update("vatx_amnt"        , vatx_amnt)		//부가세금액
					.update("invc_pric"        , row.getParameter("invc_pric"))		//단가
					.update("invc_amnt"        , invc_amnt)		//Invoice금액
					.update("deli_date"        , row.getParameter("deli_date"))		//Invoice금액
					.update("user_memo"        , row.getParameter("user_memo"))
					.update("remk_text"        , row.getParameter("remk_text"))
					.update("line_stat"        , 0	)
					.update("line_clos"        , row.getParameter("line_clos"))
					.update("pdsd_yorn"        , "0")
					.update("json_data"        , json_data)

					.update("sysm_memo"        , row.getParameter("stat"))
					.update("updt_ipad"        , arg.remoteAddress )
					.insert("crte_ipad"        , arg.remoteAddress )
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
				data.attach(Action.modify);
				data.execute();
				data.clear();

				String item_idcd = row.getParamText("item_idcd" );
			if (item_idcd != null  && item_idcd.length() != 0) {
				String json_data2 = trans.TranslateRow(arg,row, "item_json_fields");
					data.param
						.table ("item_mast")
						.where("where item_idcd = :item_idcd ")

						.unique("item_idcd"        , row.fixParameter("item_idcd"))

						.update("json_data"        , json_data2)

						.update("sysm_memo"        , row.getParameter("stat"))
						.update("updt_ipad"        , arg.remoteAddress )
						.insert("crte_ipad"        , arg.remoteAddress )
						.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
					data.attach(Action.modify);
					data.execute();
					data.clear();
					}
				}
			}
		data.execute();
		return null;
		}

	public SqlResultMap setOstt_indn_numb(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")
			.where("and   line_seqn = :line_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.update("ostt_indn_numb", arg.getParameter("ostt_indn_numb"))	/*출고지시번호*/
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
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
			.table("acpt_spec_dehan")
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

		data.param
			.table("item_mast")
			.where("where item_idcd = :item_idcd ")
			//
			.unique("item_idcd"		, arg.fixParameter("item_idcd"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setRpst_item(HttpRequestArgument arg) throws Exception {
		String invc_numb = arg.getParamText("invc_numb") ;
		DataMessage data = arg.newStorage("POS");
		String stor      = arg.getParamText("stor_id");
		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_json_fields");
		System.out.println(arg.getParameter("invc_numb"));
		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb")
			.where("and   line_seqn = :line_seqn")

			.unique("invc_numb", arg.getParameter("invc_numb"))
			.unique("line_seqn", arg.getParameter("line_seqn"))

			.update("invc_pric", arg.getParameter("invc_pric"))
			.update("sply_amnt", arg.getParameter("sply_amnt"))

			.update("updt_ipad"        , arg.remoteAddress )
			.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		data.param
			.table("item_mast")
			.where("where item_idcd = :item_idcd")

			.unique("item_idcd",arg.getParameter("item_idcd"))

			.update("json_data",  json_data)

			.update("updt_ipad"        , arg.remoteAddress )
			.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
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
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String invc_date	= arg.getParamText("invc_date");
		String deli_date	= arg.getParamText("deli_date");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_acpt_copy2 (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :invc_date "  , invc_date	)  // 수주일자
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	/**
	 * 엑셀등록
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */

	public void setExcel(HttpRequestArgument arg, SqlResultRow item, String bacd , String plmk , int chk ) throws Exception {
		DataMessage data = arg.newStorage("POS");

			data.param
				.query("call fn_seq_gen_v2 (							")
				.query("     :STOR                " ,  arg.fixParameter("stor_id"))
				.query("   , :table               " ,  arg.fixParameter("table_nm"))
				.query("   , :invc_numb           " ,  "not defind"		)
				.query(" ) 												")
			;
			String invc_numb = data.selectForRow().getParamText("seq");
			data.clear();

			data.param
				.table ("acpt_spec_dehan")
				.where ("where invc_numb = :invc_numb")

				.unique("invc_numb"        , invc_numb)								//INVOICE 번호
				.update("amnd_degr"        , 1	)									//AMD차수
				.update("line_seqn"        , 1	)									//순번

				.update("fixt_type_dvcd"   , item.getParameter("fixt_type_dvcd"))	//치공구유형구분코드
				.update("puch_reqt_date"   , item.getParameter("puch_reqt_date"))	//구매요청일자
				.update("chit_elec_date"   , item.getParameter("chit_elec_date"))	//전표전기일자
				.update("tool_numb"        , item.getParameter("tool_numb"))		//TOOL번호
				.update("tool_revs"        , item.getParameter("tool_revs"))		//TOOL_REV번호
				.update("film_numb"        , item.getParameter("film_numb"))		//필름번호
				.update("film_kind_dvcd"   , item.getParameter("film_kind_dvcd"))	//필름종류구분코드
				.update("film_name"        , item.getParameter("film_name"))		//필름명
				.update("plmk_numb"        , item.getParameter("plmk_numb"))		//제판번호
				.update("plmk_kind_code"   , plmk)									//제판종류코드
				.update("plmk_kind_name"   , item.getParameter("plmk_kind_name"))	//제판종류명
				.update("mesh_bacd"        , bacd)									//망사분류코드
				.update("mesh_name"        , item.getParameter("mesh_name"))		//망사명
				.update("mesh_type_dvcd"   , item.getParameter("mesh_type_dvcd"))	//망사타입구분코드
				.update("jigg_code"        , item.getParameter("jigg_code"))		//지그코드
				.update("jigg_grup_code"   , item.getParameter("jigg_grup_code"))	//지그그룹코드
				.update("bbtt_jigg_type"   , item.getParameter("bbtt_jigg_type"))	//BBT지그타입
				.update("otod_istt_cstm"   , item.getParameter("otod_istt_cstm"))	//외주입고거래처
				.update("mcmp_istt_cstm"   , item.getParameter("mcmp_istt_cstm"))	//자사입고거래처
				.update("cstm_prod_numb"   , item.getParameter("cstm_prod_numb"))	//고객제품번호
				.update("cstm_modl_name"   , item.getParameter("item_name"))		//고객모델명
				.update("revs_numb"        , item.getParameter("revs_numb"))		//리비젼번호
				.update("mtrl_name"        , item.getParameter("mtrl_name"))		//자재명
				.update("cstm_code"        , item.getParameter("cstm_code"))		//고객코드
				.update("cstm_name"        , item.getParameter("cstm_name"))		//고객명
				.update("pdgr"             , item.getParameter("pdgr"))				//제품군
				.update("strt_flor"        , item.getParameter("strt_flor"))		//시층
				.update("endd_flor"        , item.getParameter("endd_flor"))		//종층
				.update("xscl"             , item.getParameter("xscl"))				//X스케일
				.update("yscl"             , item.getParameter("yscl"))				//Y스케일
				.update("sufc_dvcd"        , item.getParameter("sufc_dvcd"))		//면구분코드
				.update("wkct_code"        , item.getParameter("wkct_code"))		//공정코드
				.update("wkct_name"        , item.getParameter("wkct_name"))		//공정명
				.update("indv_qntt"        , item.getParameter("indv_qntt"))		//개체수
				.update("hole_diam"        , item.getParameter("hole_diam"))		//홈파이
				.update("hpjg_proc_mthd"   , item.getParameter("hpjg_proc_mthd"))	//HP지그가공방법
				.update("prjg_proc_mthd"   , item.getParameter("prjg_proc_mthd"))	//인쇄지그가공방법
				.update("yval_cetr"        , item.getParameter("yval_cetr"))		//Y값중심
				.update("bbtt_pont"        , item.getParameter("bbtt_pont"))		//BBT포인트
				.update("jgup_qntt"        , item.getParameter("jgup_qntt"))		//지그업수
				.update("hole_qntt"        , item.getParameter("hole_qntt"))		//홀수
				.update("brcd"             , item.getParameter("brcd"))				//바코드
				.update("trst_name"        , item.getParameter("trst_name"))		//의뢰자명
				.update("asmt_code"        , item.getParameter("asmt_code"))		//부자재코드
				.update("lott_numb"        , item.getParameter("lott_numb"))		//LOT번호
				.update("kor2_brcd"        , item.getParameter("kor2_brcd"))		//코리아써키트2 바코드
				.update("film_acpt_yorn"   , "0")									//필름수령여부
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("tool_numb")
											+ " "
											+ item.getParameter("cstm_prod_numb")
											+ "	"
											)
				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.query("call fn_seq_gen_v2 (							")
				.query("     :STOR                " ,  arg.fixParameter("stor_id"))
				.query("   , :table               " ,  "item_mast"		)
				.query("   , :invc_numb           " ,  "not defind"		)
				.query(" ) 												")
			;
			String item_idcd = data.selectForRow().getParamText("seq");
			data.clear();

			ParamToJson json = new ParamToJson();
			String result = "";
			result = json.TranslateRow(arg,item, "item_json_fields");
			data.param
				.table ("item_mast")
				.where ("where item_idcd = :item_idcd")

				.unique("item_idcd"        , item_idcd)

				.update("item_code"        , item.getParameter("tool_numb"))		//품목코드
				.update("item_name"        , item.getParameter("item_name"))		//품목명
				.update("item_spec"        , item.getParameter("item_spec"))		//품목규격
				.update("modl_name"        , item.getParameter("modl_name"))		//모델명
				.update("item_brcd_1fst"   , item.getParameter("brcd"))				//바코드
				.update("unit_idcd"        , "매")									//단위ID
				.update("acct_bacd"        , "3000")								//계정구분
				.update("item_path_dvcd"   , "2")									//품목코드경로구분
				.update("json_data"        , result)								//JSONDATA
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("find_name"        , item.getParameter("tool_numb")
											+ " "
											+ item.getParameter("item_name")
											+ "	"
											)
				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

		if (chk == 1) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , invc_numb)								//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , "0001")								//거래처ID
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("") +  "")

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		if (chk == 2) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , invc_numb)								//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , "0005")								//거래처ID
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("") +  "")

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		if (chk == 3) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , invc_numb)								//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , item.getParameter("cstm_idcd"))		//거래처ID
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("") +  "")

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		if (chk == 4) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , invc_numb)								//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , "0004")								//거래처ID
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("") +  "")

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		if (chk == 5) {
			data.param
				.table ("acpt_mast")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")

				.unique("invc_numb"        , invc_numb)								//INVOICE번호
				.unique("amnd_degr"        , 1	)									//AMD차수

				.update("invc_date"        , item.getParameter("invc_date"))		//INVOICE 일자
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("cstm_idcd"        , "CM0200")								//거래처ID
				.update("acpt_stat_dvcd"   , "0011")								//수주상태구분코드
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("line_stat"        , 0	)
				.update("find_name"        , item.getParameter("") +  "")

				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

//		if

			//단가(invc_pric) = 금액(sply_amnt) / 수량(invc_qntt)
//			double invc_pric = 0 ;  //단가
//			double invc_qntt = 0 ;  //수량
//			double sply_amnt = 0 ;  //공급가액
//			double vatx_amnt = 0 ;  //부가세액

//			invc_qntt  = Double.parseDouble(item.getParamText("invc_qntt")) ;
//			invc_pric  = Double.parseDouble(item.getParamText("invc_pric")) ;
//			sply_amnt  = invc_pric * invc_qntt;
//			vatx_amnt  = sply_amnt * 0.1;

			String result2 = "";
			result2 = json.TranslateRow(arg,item, "acpt_item_json_fields");

			data.param
				.table ("acpt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"        , invc_numb)
				.unique("amnd_degr"        , 1	)
				.unique("line_seqn"        , 1	)

				.update("item_idcd"        , item.getParameter("rpst_item_idcd"))	//품목ID
				.update("invc_qntt"        , item.getParameter("invc_qntt"))		//Invoice수량
				.update("sply_amnt"        , item.getParameter("sply_amnt"))		//공급가액
				.update("deli_chge_resn"   , item.getParameter("deli_chge_resn"))	//납기변경사유
				.update("ostt_qntt"        , item.getParameter("ostt_qntt"))		//출고수량
				.update("vatx_amnt"        , item.getParameter("vatx_amnt"))		//부가세금액
				.update("invc_pric"        , item.getParameter("invc_pric"))		//단가
				.update("invc_amnt"        , item.getParameter("invc_amnt"))		//Invoice금액
				.update("deli_date"        , item.getParameter("deli_date"))		//납기일자
				.update("user_memo"        , item.getParameter("user_memo"))
				.update("remk_text"        , item.getParameter("remk_text"))
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("pdsd_yorn"        , "0")
				.update("json_data"        , result2)

				.update("sysm_memo"        , item.getParameter("stat"))
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.query("call acpt_price_find (			")
				.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
		}

	//대덕전자 엑셀업로드시  주문번호 중복체크
//	public String getInvcNumb(HttpRequestArgument arg, String invc_numb) throws Exception {
//		DataMessage data	= arg.newStorage("POS");
//		String STOR			= arg.getParamText("stor_id") ;
//		String table		= arg.getParamText("table_nm") ;
//
//		data.param
//			.query("select ifnull(invc_numb,0)  as seq 						")
//		;
//		data.param //퀴리문
//			.where("from acpt_spec_dehan									")
//			.where("where     1=1											")
//			.where("and    puch_reqt_numb	=:puch_reqt_numb ",		invc_numb)
//		;
//		String a = "";
//		if(data.selectForMap().isEmpty()){
//			data.clear();
//			data.param
//			.query("call fn_seq_gen_v2 (							")
//			.query("     :STOR                " ,  STOR				)
//			.query("   , :table               " ,  table			)
//			.query("   , :invc_numb           " ,  "not defined"	)
//			.query(" ) 												")
//		;
//			a = data.selectForMap().get(0).getParamText("seq");
//		}else{
//			a = data.selectForMap().get(0).getParamText("seq");
//		}
//		return a;
//	}

	// MESH 내역 코드 찾아서 엑셀업로드
	public String getMeshBacd(HttpRequestArgument arg, String mesh_bacd) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		data.param
			.query("select  base_code  								")
		;
		data.param //퀴리문
			.where("from base_mast									")
			.where("where     1=1									")
			.where("and     prnt_idcd =3101							")
			.where("and     base_name	=:base_code",		mesh_bacd)
		;
		String bacd = "";
		if(data.selectForMap().size()!=0)
		{
			bacd = data.selectForMap().get(0).getParamText("base_code");
		}
		return bacd;
	}

	// MESH 내역 코드 찾아서 엑셀업로드
		public String getPlmkKind(HttpRequestArgument arg, String Plmk_Kind) throws Exception {
			DataMessage data	= arg.newStorage("POS");

			data.param
				.query("select  base_code  								")
			;
			data.param //퀴리문
				.where("from base_mast									")
				.where("where     1=1									")
				.where("and     prnt_idcd =3104							")
				.where("and     base_name	=:base_code",		Plmk_Kind)
			;
			String bacd = "";
			if(data.selectForMap().size()!=0)
			{
				bacd = data.selectForMap().get(0).getParamText("base_code");
			}
			return bacd;
		}
}
