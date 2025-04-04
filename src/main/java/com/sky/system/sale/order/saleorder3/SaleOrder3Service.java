package com.sky.system.sale.order.saleorder3;

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
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class SaleOrder3Service  extends DefaultServiceHandler {
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
			.where("select *																						")
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
			.where("		, a.crte_idcd       , a.crte_urif       , a.cstm_drtr_name								")
			.where("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.where("		, w.wrhs_code       , w.wrhs_name														")
			.where("		, i.item_idcd																			")
			.where("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.where("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.where("		, ifnull((select count(*) from acpt_item r where r.invc_numb = a.invc_numb				")
			.where("					and r.pdsd_yorn = '0'),0) as pror_cont										")
			.where("from	acpt_mast a																				")
			.where("left	outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("left	outer join user_mast d on a.drtr_idcd = d.user_idcd										")
			.where("left	outer join wrhs_mast w on a.ostt_wrhs_idcd = w.wrhs_idcd								")
			.where("left	outer join acpt_item i on a.invc_numb = i.invc_numb										")
			.where("where  1=1																						")
			.where("and		ifnull(a.ordr_dvcd,0) != '4000'															")
			.where("and		a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and		a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and		i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_numb desc																		")
			.where(") a																								")
			.where("where  1=1																						")
			.where("and    a.pror_cont <> 0 	" , "1".equals(arg.getParamText("pdsd_yorn" )))
			.where("and    a.pror_cont =  0 	" , "2".equals(arg.getParamText("pdsd_yorn" )))
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
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, w.wrhs_code       , w.wrhs_name														")
			.query("		, i.item_idcd																			")

		;
		data.param
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    a.ordr_dvcd != '4000'																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("deli1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb desc																		")
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
			.query("select s.invc_numb      , a.amnd_degr      , a.line_seqn      , a.item_idcd      , a.unit_idcd		")
			.query("     , a.orig_invc_numb , a.orig_seqn      , a.orig_invc_qntt , a.optn_dvcd      , a.optn_psbl_yorn	")
			.query("     , a.optn_adtn      , a.pric_adpt      , a.norm_sale_pric , a.sale_stnd_pric , a.invc_qntt		")
			.query("     , a.invc_pric      , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt		")
			.query("     , a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
			.query("     , a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.deli_date      , a.dlvy_date		")
			.query("     , a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
			.query("     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.query("     , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("     , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("     , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("     , a.cstm_lott_numb , a.pdsd_yorn      , w.wkfw_idcd      										")
			.query("     , b.item_code      , b.item_name      , b.item_spec      , u.unit_name      , i.mold_idcd		")
			.query("     , p.mtrl_bacd      , p.item_clss_bacd , p.item_bacd      , p.make_bacd      , p.srfc_proc_yorn	")
			.query("     , p.emgc_yorn      , p.drwg_numb      , p.prod_lott_numb , a.deli_date as 'deli_date2'			")
			.query("     , p.drwg_yorn      , d.item_wigt																")
			.query("     , (select base_name from base_mast r where r.base_code = d.item_clss_bacd and r.prnt_idcd = '8001') as item_clss_bacd_name	")
			.query("     , (select base_name from base_mast r where r.base_code = p.item_bacd      and r.prnt_idcd = '8002') as item_bacd_name		")
			.query("     , (select base_name from base_mast r where r.base_code = p.make_bacd      and r.prnt_idcd = '8003') as make_bacd_name		")
			.query("     , (select base_name from base_mast r where r.base_code = p.mtrl_bacd      and r.prnt_idcd = '3101') as mtrl_bacd_name		")
			.query("     , a.invc_numb as invc_numb2																	")

		;
		data.param
			.where("from   acpt_item a																					")
			.where("       left outer join item_mast b on a.item_idcd = b.item_idcd										")
			.where("       left outer join unit_mast u on b.unit_idcd = u.unit_idcd										")
			.where("       left outer join item_adon i on a.item_idcd = i.item_idcd										")
			.where("       left outer join item_desc d on d.item_idcd = b.item_idcd										")
			.where("       left outer join acpt_prod_spec p on a.invc_numb = p.invc_numb and a.amnd_degr = p.amnd_degr and a.line_seqn = p.line_seqn")
			.where("       left outer join wkfw_clss w on p.item_bacd = w.wkfw_code										")
			.where("       left outer join pror_mast s on s.acpt_numb = a.invc_numb and s.acpt_seqn = a.line_seqn		")
			.where("where  1=1																							")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    p.item_bacd	=:item_bacd		" , arg.getParamText("item_bacd"))
			.where("and    p.make_bacd	=:make_bacd		" , arg.getParamText("make_bacd"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb , a.amnd_degr      , a.line_seqn													")
		;
		return data.selectForMap();
	}

	/**
	 * 지시서파일 찾기
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
			.query("		, a.crte_idcd       , a.crte_urif       												")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, (select min(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as min_deli	")
			.query("		, (select max(deli_date) from acpt_item r where r.invc_numb = a.invc_numb) as max_deli	")
			.query("		, REPLACE(json_extract(a.json_data, '$.cstm_prcs_numb'),'\"','') as 	cstm_prcs_numb	")
			.query("		, REPLACE(json_extract(a.json_data, '$.cstm_mold_code'),'\"','') as 	cstm_mold_code	")
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
				.query("		, a.invc_pric as cont_pric            , a.vatx_incl_yorn , a.vatx_rate      , a.sply_amnt      , a.vatx_amnt")
				.query("		, a.invc_amnt      , a.krwn_amnt      , a.krwn_vatx      , a.krwn_ttsm_amnt , a.stnd_unit		")
				.query("		, a.stnd_unit_qntt , a.wrhs_idcd      , a.dlvy_cstm_idcd , a.dlvy_date      , i.wkfw_idcd		")
				.query("		, a.dlvy_hhmm      , a.remk_text      , a.ostt_dvcd      , a.dsct_qntt      , a.dlvy_memo		")
				.query("		, a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("		, a.cstm_lott_numb , b.item_code      , b.item_name      , b.item_spec      , u.unit_name		")
				.query("		, p.mtrl_bacd      , p.item_clss_bacd , p.item_bacd      , p.make_bacd      , p.srfc_proc_yorn	")
				.query("		, p.emgc_yorn      , p.drwg_numb      , p.prod_lott_numb , a.deli_date as deli_date2			")
				.query("		, p.drwg_yorn																					")
				.query("		, (select base_name from base_mast r where r.base_code = d.item_clss_bacd and r.prnt_idcd = '8001') as item_clss_bacd_name	")
				.query("		, (select base_name from base_mast r where r.base_code = p.item_bacd      and r.prnt_idcd = '8002') as item_bacd_name		")
				.query("		, (select base_name from base_mast r where r.base_code = p.make_bacd      and r.prnt_idcd = '8003') as make_bacd_name		")
				.query("		, (select base_name from base_mast r where r.base_code = p.mtrl_bacd      and r.prnt_idcd = '3101') as mtrl_bacd_name		")
				.query("		, REPLACE(json_extract(a.json_data, '$.cstm_prcs_numb'),'\"','') as 	cstm_prcs_numb			")
				.query("		, REPLACE(json_extract(a.json_data, '$.cstm_mold_code'),'\"','') as 	cstm_mold_code			")
				.query("		, d.item_wigt																					")
				.query("from	acpt_item a																						")
				.query("		left outer join item_mast b on a.item_idcd = b.item_idcd										")
				.query("		left outer join unit_mast u on b.unit_idcd = u.unit_idcd										")
				.query("		left outer join item_desc d on d.item_idcd = b.item_idcd										")
				.query("		left outer join item_adon i on a.item_idcd = i.item_idcd										")
				.query("		left outer join acpt_prod_spec p on a.invc_numb = p.invc_numb and a.amnd_degr = p.amnd_degr and a.line_seqn = p.line_seqn")
				.query("where	1=1																								")
				.query("and		a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
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

	//생산지시
	public SqlResultMap setPror(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		double line_seqn	= Double.parseDouble(arg.getParamText("line_seqn")) ;
		String strt_date	= arg.getParamText("strt_date");
		String endd_date	= arg.getParamText("endd_date");
		String lott_numb	= arg.getParamText("lott_numb");
		int invc_qntt		= Integer.parseInt(arg.getParamText("invc_qntt")) ;
		System.out.println("***************invc_qntt : "+ arg.getParameter("invc_qntt"));
		data = arg.newStorage("POS");
		data.param
		.query("call work_order_create_v2 (					")
		.query("   :invc_numb       "  , invc_numb			)  // invc_numb
		.query(" , :line_seqn       "  , line_seqn			)  // 순번
		.query(" , :strt_date       "  , strt_date			)  // 착수일자
		.query(" , :endd_date       "  , endd_date			)  // 종료일자
		.query(" , :lott_numb       "  , lott_numb			)  // Lot번호
		.query(" , :invc_qntt       "  , invc_qntt			)  // 지시수량
		.query(" ) 											")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//생산지시일괄
	public SqlResultMap setPror2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);
		data.param
			.query("call work_order_create_v2_all (			")
			.query("   :param       "  , result				)
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	//work_book 생성
	public SqlResultMap setWorkBook(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);

		System.out.println("**********************************************");
		System.out.println(result);

		data.param
			.query("call work_order_book (			")
			.query("   :param       "  , result				)
			.query(" ) 										")
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
					.where("and   amnd_degr = :amnd_degr								")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					//
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
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ " "
												+ row.getParamText("ostt_wrhs_idcd"		).trim()
												+ " "
												+ row.getParamText("invc_numb"			).trim()
												+ " "
												+ row.getParamText("cstm_name"			).trim()
												+ " "
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
					;
					data.attach(rowaction);

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				data.clear();
				data.param
					.query("update ( select a.invc_numb,a.line_seqn,@rank:=@rank+1 as rank									")
					.query("         from acpt_item a, (select @rank := 0 ) r												")
					.query("         where a.invc_numb = :invc_numb",row.fixParameter("invc_numb"))
					.query("       ) a																						")
					.query("       left outer join acpt_item b on a.invc_numb = b.invc_numb and a.line_seqn = b.line_seqn	")
					.query("set b.line_seqn = a.rank																		")
					;
				data.attach(Action.direct);
			}
		}
	data.execute();
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		System.out.println(map+"<<<<<<<<<<<<<<<<<<< ");
		ParamToJson p = new ParamToJson();
		String json ;
		for(SqlResultRow row:map) {
			json = p.TranslateRow(arg, row, "acpt_json_fields");
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");

			if(!deli_date2.equals("")){
				if(deli_date2.matches("^[0-9]+$")){
				}else{
					deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
				}
			}
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
				data.execute();
				data.clear();
				data.param
					.table("acpt_prod_spec												")
					.where("where invc_numb		= :invc_numb							")	// INVOICE번호
					.where("and   amnd_degr		= :amnd_degr							")	// AMD차수
					.where("and   line_seqn		= :line_seqn							")	// 순번
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	// INVOICE번호
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))	// AMD차수
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	// 순번
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
				data.param
					.query("update item_mast set find_name =replace(find_name,:cstm_name,'')",mst.getParameter("cstm_name"))
					.query("where item_idcd = :item_idcd3",row.fixParameter("item_idcd"))
				;
				data.attach(Action.direct);
			} else {
				// detail 등록/수정
				data.param
					.table("acpt_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   amnd_degr		= :amnd_degr							")  /*  AMD차수  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
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
					.update("invc_pric"			, row.getParameter("cont_pric"			))
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
					.update("deli_date"			, deli_date2							)
					.update("dlvy_date"			, row.getParameter("dlvy_date"			))
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
					.update("dsct_qntt"			, row.getParameter("dsct_qntt"			))
					.update("dlvy_memo"			, row.getParameter("dlvy_memo"			))
					.update("json_data"			, json									 )  /*  jsondata  */

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ " "
												+ row.getParamText("item_code"			).trim()
												+ " "
												+ row.getParamText("item_name"			).trim()
												+ " "
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
				;
				data.attach(rowaction);

				data.param
					.table("acpt_prod_spec")
					.where("where invc_numb		= :invc_numb							")	// INVOICE번호
					.where("and   amnd_degr		= :amnd_degr							")	// AMD차수
					.where("and   line_seqn		= :line_seqn							")	// 순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))	// INVOICE번호
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))	// AMD차수
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	// 순번

					.update("item_idcd"			, row.getParameter("item_idcd"			))	// 품목ID
					.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"			))	// 재질분류코드
					.update("item_clss_bacd"	, row.getParameter("item_clss_bacd"		))	// 품목분류분류코드
					.update("item_bacd"			, row.getParameter("item_bacd"			))	// 품목분류코드
					.update("make_bacd"			, row.getParameter("make_bacd"			))	// 제조분류코드
					.update("drwg_yorn"			, row.getParameter("drwg_yorn"			))	// 도면확인여부
					.update("srfc_proc_yorn"	, row.getParameter("srfc_proc_yorn"		))	// 표면처리여부
					.update("emgc_yorn"			, row.getParameter("emgc_yorn"			))	// 긴급여부
					.update("drwg_numb"			, row.getParameter("drwg_numb"			))	// 도면번호
					.update("prod_lott_numb"	, row.getParameter("prod_lott_numb"		))	// 생산LOT번호
					.update("user_memo"			, row.getParameter("user_memo"			))	// 사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	// 시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	// 부모ID
					.insert("line_levl"			, row.getParameter("line_levl"			))	// ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	// ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	// ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	// ROW마감
					.update("find_name"			, row.getParameter("find_name"			))	// 찾기명
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	// 수정사용자명
					.update("updt_ipad"			, arg.remoteAddress )	// 수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	// 수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	// 수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	// 생성사용자명
					.insert("crte_ipad"			, arg.remoteAddress )	// 생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	// 생성ID
					.update("crte_urif"			, row.getParameter("crte_urif"			))	// 생성UI
				;
				data.attach(Action.modify);
				data.param
					.query("update item_mast set find_name = concat(find_name,' ',:cstm_name) ",mst.getParameter("cstm_name"))
					.query("where item_idcd = :item_idcd2",row.fixParameter("item_idcd"))
				;
				data.attach(Action.direct);
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
			.query("select a.line_stat, a.line_clos, a.acpt_stat_dvcd, b.pdsd_yorn			")
			.query("from  acpt_mast a										")
			.query("left outer join acpt_item b on a.invc_numb = b.invc_numb")
		 	.query("where a.invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("마감되어 삭제할 수 없습니다.");
		}

		// 2020.04.01 - 이강훈 - 승인대기 상태만 삭제되도록 변경
//		if ( !"0010".equals(del.getParamText("acpt_stat_dvcd")) ) {
//			throw new ServiceException("승인 또는 진행중인 오더는  삭제할 수 있습니다.");
//		}
		if ( !"0".equals(del.getParamText("pdsd_yorn")) ) {
			throw new ServiceException("생산지시가 된 오더는  삭제할 수 없습니다.");
		}

		data.param
			.table("acpt_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
		return null;
	}

	/**
	 * 삭제1
	 *
	 */
	public SqlResultMap setDel_yn1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*)	as count							")
		;
		data.param
			.where("from acpt_item												")
			.where("where invc_numb = :invc_numb",arg.fixParameter("invc_numb"))
			.where("and   pdsd_yorn = 1											")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDel_yn2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("acpt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();
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
			.query("call auto_acpt_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
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

		// 2022.04.01 - 이강훈 - 주문오더 승인/취소 시 검증조건 추가
		data.param
			.query("select a.acpt_stat_dvcd, max(b.pdsd_yorn) as pdsd_yorn			")
			.query("  from acpt_mast a												")
			.query("       left outer join acpt_item b on b.invc_numb = a.invc_numb	")
			.query(" where 1 = 1													")
			.query("   and a.invc_numb = :invc_numb", invc_numb)
		;
		SqlResultRow info = data.selectForRow();

//		if ("0010".equals(acpt_stat_dvcd)) {
//			// 취소 시 - 진행상태가 '승인완료', 생산계획 등록된 품목이 없어야 한다.
//			if ( !"0011".equals(info.getParamText( "acpt_stat_dvcd")) ) {
//				throw new ServiceException("승인 해지할 수 없는 상태입니다.");
//			}
//
//			if ( Double.parseDouble(info.getParamText( "pdsd_yorn" )) == 1) {
//				throw new ServiceException("진행중인 오더는 승인 해지할 수 없습니다.");
//			}
//		} else {
//			// 승인 시 - 진행상태가 '승인대기' 상태야 한다.
//			if ( !"0010".equals(info.getParamText( "acpt_stat_dvcd")) ) {
//				throw new ServiceException("승인 처리할 수 없는 상태입니다.");
//			}
//		}

		data.clear();
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
}