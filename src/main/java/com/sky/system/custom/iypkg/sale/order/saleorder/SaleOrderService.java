package com.sky.system.custom.iypkg.sale.order.saleorder;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;

@Service("iypkg.SaleOrderService")
public class SaleOrderService extends DefaultServiceHandler{

	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb        , a.invc_date       , a.acpt_dvcd       , a.drtr_idcd       , a.cstm_idcd	")
			.where("      , a.assi_cstm_idcd   , a.mker_name       , a.prod_idcd       , a.prod_name       , a.item_leng	")
			.where("      , a.item_widh        , a.item_hght       , a.sgam_relx       , a.scre_spec_frml  , a.scre_spec	")
			.where("      , a.cpst_numb        , a.wmld_numb       , a.wmld_size       , a.inkk_colr_name  , a.pqty_mxm2	")
			.where("      , a.bxty_idcd        , a.acpt_qntt       , a.prod_qntt       , a.mxm2_pric						")
			.where("      , a.pqty_pric        , a.crny_dvcd       , a.deli_date       , a.pcod_numb       , a.vatx_dvcd	")
			.where("      , a.sply_amnt        , a.vatx_amnt       , a.ttsm_amnt       , a.remk_text       , a.prod_yorn	")
			.where("      , a.prod_date        , a.ostt_yorn       , a.ostt_date       , a.ostt_qntt       , a.rqod_yorn	")
			.where("      , a.rqod_date        , a.rqod_amnt       , a.bill_yorn       , a.bill_date       , a.bill_amnt	")
			.where("      , a.iamt_yorn        , a.iamt_date       , a.iamt_amnt       , a.apvl_yorn						")
			.where("      , a.uper_seqn        , a.disp_seqn       , a.user_memo       , a.sysm_memo       , a.prnt_idcd	")
			.where("      , a.line_levl        , a.line_ordr       , a.line_stat       , a.line_clos						")
			.where("      , a.find_name        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd	")
			.where("      , u.user_name as drtr_name               , c1.cstm_name      , c2.dlvy_drtr_name as assi_cstm_name")
			.where("      , bx.bxty_name       , pm.prod_code      , pm.scre_dvcd      , a.sets_qntt						")
			.where("      , (a.pqty_mxm2 * a.acpt_qntt) as mxm2_qntt , s.item_idcd     , a.stok_qntt       , s.base_qntt	")
			.where("      , json_value(a.json_data , '$**.stat_dvcd') as stat_dvcd	   , s.item_code						")
			.where("from   boxx_acpt a  																					")
			.where("left outer join user_mast    u  on a.drtr_idcd = u.user_idcd											")
			.where("left outer join cstm_mast    c1 on a.cstm_idcd = c1.cstm_idcd											")
			.where("left outer join cstm_deli    c2 on a.assi_cstm_idcd = c2.dlvy_cstm_idcd									")
			.where("left outer join product_mast pm on a.prod_idcd = pm.prod_idcd											")
			.where("left outer join boxtype_mast bx on a.bxty_idcd = bx.bxty_idcd											")
			.where("left outer join stok_mast     s on pm.prod_idcd = s.item_idcd											")
			.where("where 1=1  																								")
			.where("and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.invc_date	>= :invc_date1				" , arg.getParamText("invc1_date"))
			.where("and    a.invc_date	<= :invc_date2				" , arg.getParamText("invc2_date"))
			.where("and    a.prod_name	= :item_name				" , arg.getParamText("item_name" ))
			.where("and    a.drtr_idcd	= :drtr_idcd				" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd	= :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    a.prod_idcd	= :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and    a.deli_date	>= :deli_date1				" , arg.getParamText("deli1_date"))
			.where("and    a.deli_date	<= :deli_date2				" , arg.getParamText("deli2_date"))
			.where("and    a.line_clos	= :line_clos				" , arg.getParamText("line_clos"))
			.where("and    a.line_stat	< :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    c1.cstm_name	= :cstm_name				" , arg.getParamText("cstm_name" ))
		;

		if(arg.getParamText("stor_grp").toUpperCase().equals("N1000DAE-A1000")){
			data.param
				.where("group by a.invc_numb																			")
			;
		}
		data.param
			.where("order by a.invc_date desc,a.invc_numb asc limit 99999												")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  *																								")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb        , a.invc_date       , a.acpt_dvcd       , a.drtr_idcd       , a.cstm_idcd	")
			.where("      , a.assi_cstm_idcd   , a.mker_name       , a.prod_idcd       , a.prod_name       , a.item_leng	")
			.where("      , a.item_widh        , a.item_hght       , a.sgam_relx       , a.scre_spec_frml  , a.scre_spec	")
			.where("      , a.cpst_numb        , a.wmld_numb       , a.wmld_size       , a.inkk_colr_name  , a.pqty_mxm2	")
			.where("      , a.bxty_idcd        , a.acpt_qntt       , a.stok_qntt       , a.prod_qntt       , a.mxm2_pric	")
			.where("      , a.pqty_pric        , a.crny_dvcd       , a.deli_date       , a.pcod_numb       , a.vatx_dvcd	")
			.where("      , a.sply_amnt        , a.vatx_amnt       , a.ttsm_amnt       , a.remk_text       , a.prod_yorn	")
			.where("      , a.prod_date        , a.ostt_yorn       , a.ostt_date       , a.ostt_qntt       , a.rqod_yorn	")
			.where("      , a.rqod_date        , a.rqod_amnt       , a.bill_yorn       , a.bill_date       , a.bill_amnt	")
			.where("      , a.iamt_yorn        , a.iamt_date       , a.iamt_amnt       , a.apvl_yorn       , a.prnt_idcd	")
			.where("      , a.uper_seqn        , a.disp_seqn       , a.user_memo       , a.sysm_memo						")
			.where("      , a.line_levl        , a.line_ordr       , a.line_stat       , a.line_clos						")
			.where("      , a.find_name        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd	")
			.where("      , u.user_name as drtr_name               , c1.cstm_name      , c2.cstm_name as assi_cstm_name		")
			.where("      , bx.bxty_name       , pm.prod_code                 , s.item_idcd	")
			.where("from   boxx_acpt a																						")
			.where("left outer join user_mast    u  on a.drtr_idcd = u.user_idcd											")
			.where("left outer join cstm_mast    c1 on a.cstm_idcd = c1.cstm_idcd											")
			.where("left outer join cstm_mast    c2 on a.assi_cstm_idcd = c2.cstm_idcd										")
			.where("left outer join product_mast pm on a.prod_idcd = pm.prod_idcd											")
			.where("left outer join boxtype_mast bx on a.bxty_idcd = bx.bxty_idcd											")
			.where("left outer join stok_mast    s  on a.drtr_idcd = s.wrhs_idcd											")
			.where("where  1=1																								")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.deli_date  >= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    a.deli_date  <= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    pm.item_idcd  = :prod_idcd		" , arg.getParamText("prod_idcd" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc,a.invc_numb desc	limit 999999999999											")
			.where(") a 																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 조회
	public SqlResultMap getStok(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String prod_code = "";
		if(!arg.getParamText("prod_code").equals("")){
			prod_code = arg.getParamText("prod_code").substring(0,arg.getParamText("prod_code").length()-1);
		}
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select   a.item_idcd      , a.base_qntt      , a.stok_qntt     , a.wrhs_idcd					")
			.where("      , b.prod_name      , substr(b.prod_code,1,6) as prod_code2								")
			.where("      ,(b.prod_code) as prod_code																")
			.where("from    product_mast b																			")
			.where("left outer join stok_mast a on a.item_idcd = b.prod_idcd										")
			.where("where   1=1																						")
			.where("and   a.wrhs_idcd   = :wrhs_idcd    " , arg.getParamText("wrhs_idcd"))
			.where("and   prod_code like :prod_code%	", prod_code)
			.where(") a																								")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getFabc(HttpRequestArgument arg,String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb        , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd       , a.need_qntt	")
			.where("      , a.item_ttln        , a.item_ttwd       , a.item_leng       , a.item_widh as length				")
			.where("      , a.item_fxqt        , a.mxm2_qntt       , a.mxm2_pric       , a.pqty_pric						")
			.where("      , a.offr_yorn        , a.offr_date       , a.offr_numb       , a.cstm_idcd						")
			.where("      , a.istt_yorn        , a.istt_date       , a.istt_qntt       , a.fdat_spec						")
			.where("      , a.uper_seqn        , a.disp_seqn       , a.user_memo       , a.sysm_memo       , a.prnt_idcd	")
			.where("      , a.line_levl        , a.line_ordr       , a.line_stat       , a.line_clos						")
			.where("      , a.find_name        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd	")
			.where("      , a.fabc_name        , c.cstm_name       , s.item_idcd											")
			.where("from   boxx_acpt_bom a																					")
			.where("left outer join fabc_mast    f  on a.fabc_idcd = f.fabc_idcd											")
			.where("left outer join cstm_mast    c  on a.cstm_idcd = c.cstm_idcd											")
			.where("left outer join stok_mast    s  on f.fabc_idcd = s.item_idcd											")
			.where("where  1=1																								")
			.where("and    a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb"))
//			.where("and    s.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																					")
			.where(") a																										")
		;
		return data.selectForMap(sort) ;
	}
	public SqlResultMap getFabcCopy(HttpRequestArgument arg,String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);
		data.param
			.query("call  fabc_need_calc_All(								")
			.query("         :param						", param		)
			.query(")													")
		;
		return data.selectForMap();
	}
	public SqlResultMap getWkct(HttpRequestArgument arg,String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																									")
			.where("select  a.invc_numb        , a.line_seqn       , a.wkct_idcd       , a.wkun_dvcd 						")
			.where("      , a.qntt_unit_idcd   , a.stnd_pric       , a.otod_yorn       , a.otod_cstm_idcd  , a.plan_qntt	")
			.where("      , a.line_levl        , a.line_ordr       , a.line_stat       , a.line_clos						")
			.where("      , a.find_name        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd	")
			.where("      , w.wkct_name        , u.unit_name       , c.cstm_name as otod_cstm_name							")
			.where("      , REPLACE(json_extract(a.json_data, '$.rep_chek'),'\"','') as rep_chek							")
			.where("from   boxx_acpt_bop a																					")
			.where("left outer join wkct_mast    w  on a.wkct_idcd = w.wkct_idcd											")
			.where("left outer join unit_mast    u  on a.qntt_unit_idcd = u.unit_idcd										")
			.where("left outer join cstm_mast    c  on a.otod_cstm_idcd = c.cstm_idcd										")
			.where("where  1=1																								")
			.where("and    a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																					")
			.where(") a																										")
		;
		return data.selectForMap(sort) ;
	}
	public SqlResultMap getInvcNumb(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(invc_numb),concat(date_format(now(),'%y%m%d'),'000'))+1 as seq 						")
		;
		data.param
			.where("from  boxx_acpt																							")
			.where("where invc_numb regexp '[0-9]'													")
			.where("and   substring(invc_numb,1,6) = :date				" , arg.getParamText("date"))
		;
		return data.selectForMap() ;
	}
	public SqlResultMap getWkctCopy(HttpRequestArgument arg, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																									")
			.where("select  a.line_seqn        , a.wkct_idcd       , a.wkun_dvcd   											")
			.where("      , a.qntt_unit_idcd   , a.stnd_pric       , a.otod_yorn       , a.otod_cstm_idcd 					")
			.where("      , a.line_levl        , a.line_ordr       , a.line_stat       , a.line_clos						")
			.where("      , a.find_name        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd	")
			.where("      , w.wkct_name        , u.unit_name       , c.cstm_name as otod_cstm_name							")
			.where("      , REPLACE(json_extract(a.json_data, '$.rep_chek'),'\"','') as rep_chek							")
			.where("from   product_bop a																					")
			.where("left outer join wkct_mast    w  on a.wkct_idcd = w.wkct_idcd											")
			.where("left outer join unit_mast    u  on a.qntt_unit_idcd = u.unit_idcd										")
			.where("left outer join cstm_mast    c  on a.otod_cstm_idcd = c.cstm_idcd										")
			.where("where  1=1																								")
			.where("and    a.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd"))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																					")
			.where(") a																										")
		;

		return data.selectForMap(sort) ;

	}

	public SqlResultMap getChild(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  count(*)	as count		")

			.where("from  product_mast					")
			.where("where prod_code like :prod_code%	", arg.fixParamText("prod_code").substring(0,arg.fixParamText("prod_code").length()-1))
			.where("and   prod_code != :prod_code2		", arg.fixParamText("prod_code"))
		;
		return data.selectForMap();
	}

	/*
	등록/수정/삭제
	*/
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson p = new ParamToJson();
		String json = "";

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//삭제
			if (rowaction == Action.delete) {
				data.param
					.table("boxx_acpt")
					.where("where invc_numb      = :invc_numb	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))

					.unique("line_stat"			, 2)
				;
				data.attach(rowaction);
				data.param
					.table("product_bom")
					.where("where invc_numb      = :invc_numb	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))

					.unique("line_stat"			, 2)
				;
				data.param
					.table("boxx_acpt_bop")
					.where("where invc_numb      = :invc_numb	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))

					.unique("line_stat"			, 2)
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
			} else {
				json = p.TranslateRow(arg, row, "boxx_acpt_fields");

				//등록, 수정
				data.param
					.table ("boxx_acpt")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))			//INVOICE번호

					.update("apvl_yorn"        , 1							)			//승인여부
					.update("invc_date"        , row.getParameter("invc_date"))			//INVOICE일자
					.update("acpt_dvcd"        , row.getParameter("acpt_dvcd"))			//수주구분코드
					.update("drtr_idcd"        , row.getParameter("drtr_idcd"))			//담당자ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("assi_cstm_idcd"   , row.getParameter("assi_cstm_idcd"))	//보조거래처ID
					.update("mker_name"        , row.getParameter("mker_name"))			//생산자명
					.update("prod_idcd"        , row.getParameter("prod_idcd"))			//제품ID
					.update("prod_name"        , row.getParameter("prod_name"))			//제품명
					.update("item_leng"        , row.getParameter("item_leng"))			//품목길이
					.update("item_widh"        , row.getParameter("item_widh"))			//품목폭
					.update("item_hght"        , row.getParameter("item_hght"))			//품목높이
					.update("sgam_relx"        , row.getParameter("sgam_relx"))			//외날개여유
					.update("scre_spec_frml"   , row.getParameter("scre_spec_frml"))	//스코어규격공식
					.update("scre_spec"        , row.getParameter("scre_spec"))			//스코어규격
					.update("cpst_numb"        , row.getParameter("cpst_numb"))			//조판번호
					.update("wmld_numb"        , row.getParameter("wmld_numb"))			//목형번호
					.update("wmld_size"        , row.getParameter("wmld_size"))			//목형사이즈
					.update("inkk_colr_name"   , row.getParameter("inkk_colr_name"))	//잉크컬러명
					.update("pqty_mxm2"        , row.getParameter("pqty_mxm2"))			//개당제곱미터
					.update("bxty_idcd"        , row.getParameter("bxty_idcd"))			//박스형식ID
					.update("acpt_qntt"        , row.getParameter("acpt_qntt"))			//수주수량
					.update("stok_qntt"        , row.getParameter("stok_qntt"))			//재고수량
					.update("prod_qntt"        , row.getParameter("prod_qntt"))			//생산수량
					.update("mxm2_pric"        , row.getParameter("mxm2_pric"))			//제곱미터단가
					.update("pqty_pric"        , row.getParameter("pqty_pric"))			//개당단가
					.update("crny_dvcd"        , row.getParameter("crny_dvcd"))			//통화구분코드
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("pcod_numb"        , row.getParameter("pcod_numb"))			//PONO
					.update("vatx_dvcd"        , row.getParameter("vatx_dvcd"))			//부가세구분코드
					.update("sply_amnt"        , row.getParameter("sply_amnt"))			//공급가액
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))			//부가세액
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("remk_text"        , row.getParameter("remk_text"))			//비고
					.update("prod_yorn"        , row.getParameter("prod_yorn"))			//생산여부
					.update("prod_date"        , row.getParameter("prod_date"))			//생산일자
					.update("ostt_yorn"        , row.getParameter("ostt_yorn"))			//출고여부
					.update("ostt_date"        , row.getParameter("ostt_date"))			//출고일자
					.update("ostt_qntt"        , row.getParameter("ostt_qntt"))			//출고수량
					.update("rqod_yorn"        , row.getParameter("rqod_yorn"))			//청구여부
					.update("rqod_date"        , row.getParameter("rqod_date"))			//청구일자
					.update("rqod_amnt"        , row.getParameter("rqod_amnt"))			//청구금액
					.update("bill_yorn"        , row.getParameter("bill_yorn"))			//계산서여부
					.update("bill_date"        , row.getParameter("bill_date"))			//계산서일자
					.update("bill_amnt"        , row.getParameter("bill_amnt"))			//계산서금액
					.update("iamt_yorn"        , row.getParameter("iamt_yorn"))			//입금여부
					.update("iamt_date"        , row.getParameter("iamt_date"))			//입금일자
					.update("iamt_amnt"        , row.getParameter("iamt_amnt"))			//입금금액
					.update("sets_qntt"        , row.getParameter("sets_qntt"))			//입금금액
					.update("json_data"        , json						)			//jsondata

					.update("user_memo"        , row.getParameter("user_memo"))
					.update("find_name"        , row.getParameter("invc_numb")
												+ "	"
												+ row.getParameter("cstm_name")
												+ "	"
												+ row.getParameter("prod_code")
												+ "	"
												+ row.getParameter("assi_cstm_name"))
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
				data.execute();
				data.clear();
			}
			String new_invc_numb ="";
			int new_line_seqn = 1;
			if(row.getParamText("child_change").equals("Y")){
				if(row.fixParamText("prod_code").substring(row.fixParamText("prod_code").length()-1).equals("0")) {
					if(rowaction==Action.insert) {

						data.param
							.query("select *							")

							.where("from  product_mast					")
							.where("where prod_code like :prod_code%	", row.fixParamText("prod_code").substring(0,row.fixParamText("prod_code").length()-1))
							.where("and   prod_code != :prod_code2		", row.fixParamText("prod_code"))
						;

						SqlResultMap alpha = data.selectForMap();
						data.clear();
						SqlResultMap temp;
						new_invc_numb = row.fixParamText("invc_numb");


						for (SqlResultRow beta : alpha) {
							String acpt_numb = row.getParamText("invc_numb");
							String prod_idcd = row.getParamText("prod_idcd");
							String prod_code = row.getParamText("prod_code");
							String prod_name = row.getParamText("prod_name");

							// temp = getInvcNumb(arg); // 처리 과정에서 속도차이로 쓰기 어려움
							int test = Integer.parseInt(new_invc_numb.substring(new_invc_numb.length()-3));
							String sub =  String.format("%03d",test+1);
							new_invc_numb = new SimpleDateFormat("yyMMdd").format(new Date())+sub;
							float sply = Float.parseFloat(beta.getParamText("pqty_pric"))*Integer.parseInt(row.getParamText("acpt_qntt"));
							data.param
								.table ("boxx_acpt")
								.where ("where invc_numb = :invc_numb")

								.unique("invc_numb"        , new_invc_numb)			//INVOICE번호

								.update("apvl_yorn"        , 1							)			//승인여부
								.update("invc_date"        , row.getParameter("invc_date"))			//INVOICE일자
								.update("acpt_dvcd"        , row.getParameter("acpt_dvcd"))			//수주구분코드
								.update("drtr_idcd"        , row.getParameter("drtr_idcd"))			//담당자ID
								.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
								.update("assi_cstm_idcd"   , row.getParameter("assi_cstm_idcd"))	//보조거래처ID
								.update("mker_name"        , row.getParameter("mker_name"))			//생산자명
								.update("prod_idcd"        , beta.getParameter("prod_idcd"))		//제품ID
								.update("prod_name"        , beta.getParameter("prod_name"))		//제품명
								.update("item_leng"        , beta.getParameter("prod_leng"))		//품목길이
								.update("item_widh"        , beta.getParameter("prod_widh"))		//품목폭
								.update("item_hght"        , beta.getParameter("prod_hght"))		//품목높이
								.update("scre_spec_frml"   , beta.getParameter("scre_spec_frml"))	//스코어규격공식
								.update("scre_spec"        , beta.getParameter("scre_spec"))		//스코어규격
								.update("cpst_numb"        , beta.getParameter("cpst_numb"))		//조판번호
								.update("wmld_numb"        , beta.getParameter("wmld_numb"))		//목형번호
								.update("wmld_size"        , beta.getParameter("wmld_size"))		//목형사이즈
								.update("inkk_colr_name"   , beta.getParameter("inkk_colr_name"))	//잉크컬러명
								.update("pqty_mxm2"        , beta.getParameter("pqty_mxm2"))		//개당제곱미터
								.update("bxty_idcd"        , beta.getParameter("bxty_idcd"))		//박스형식ID
	//							.update("stok_qntt"        , row.getParameter("stok_qntt"))			//재고수량
	//							.update("acpt_qntt"        , row.getParameter("acpt_qntt"))			//수주수량
	//							.update("prod_qntt"        , row.getParameter("prod_qntt"))			//생산수량
								.update("mxm2_pric"        , beta.getParameter("mxm2_pric"))		//제곱미터단가
								.update("pqty_pric"        , beta.getParameter("pqty_pric"))		//개당단가
								.update("crny_dvcd"        , row.getParameter("crny_dvcd"))			//통화구분코드
								.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
								.update("pcod_numb"        , beta.getParameter("pcod_numb"))		//PONO
								.update("vatx_dvcd"        , row.getParameter("vatx_dvcd"))			//부가세구분코드
								.update("sply_amnt"        , sply)			//공급가액
								.update("vatx_amnt"        , Math.floor(sply*0.1))			//부가세액
								.update("ttsm_amnt"        , sply + Math.floor(sply*0.1))			//합계금액
								.update("remk_text"        , row.getParameter("remk_text"))			//비고
								.update("prod_yorn"        , row.getParameter("prod_yorn"))			//생산여부
								.update("prod_date"        , row.getParameter("prod_date"))			//생산일자
								.update("ostt_yorn"        , row.getParameter("ostt_yorn"))			//출고여부
								.update("ostt_date"        , row.getParameter("ostt_date"))			//출고일자
								.update("ostt_qntt"        , row.getParameter("ostt_qntt"))			//출고수량
								.update("rqod_yorn"        , row.getParameter("rqod_yorn"))			//청구여부
								.update("rqod_date"        , row.getParameter("rqod_date"))			//청구일자
								.update("rqod_amnt"        , row.getParameter("rqod_amnt"))			//청구금액
								.update("bill_yorn"        , row.getParameter("bill_yorn"))			//계산서여부
								.update("bill_date"        , row.getParameter("bill_date"))			//계산서일자
								.update("bill_amnt"        , row.getParameter("bill_amnt"))			//계산서금액
								.update("iamt_yorn"        , row.getParameter("iamt_yorn"))			//입금여부
								.update("iamt_date"        , row.getParameter("iamt_date"))			//입금일자
								.update("iamt_amnt"        , row.getParameter("iamt_amnt"))			//세트수량
								.update("json_data"        , json						)			//jsondata
								.update("sets_qntt"        , beta.getParameter("sets_qntt"))			//set수량

								.update("user_memo"        , row.getParameter("user_memo"))
								.update("find_name"        , new_invc_numb
															+ "	"
															+ row.getParameter("cstm_name")
															+ "	"
															+ beta.getParameter("prod_code")
															+ "	"
															+ row.getParameter("assi_cstm_name"))
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
							data.execute();
							data.clear();
							data.param
								.query("call auto_boxx_include(")
								.query("    :prod_idcd",beta.fixParameter("prod_idcd"))
								.query("  , :invc_numb",new_invc_numb)
								.query("  , :crte_idcd",row.getParameter("crte_idcd"))
								.query("  , :prod_qntt",row.getParameter("prod_qntt"))
								.query(")")
							;
							data.attach(Action.direct);
							data.execute();
							data.clear();

							acpt_numb = new_invc_numb;
							prod_idcd = beta.fixParamText("prod_idcd");
							prod_code = beta.fixParamText("prod_code");
							prod_name = beta.fixParamText("prod_name");


							if(row.getParamText("auto_spts_yorn").equals("1")){
								if(rowaction == Action.insert){
									data.param
										.query("call fn_seq_gen_v2(")
										.query("    :stor",row.fixParameter("stor_id"))
										.query("  , :table","ostt_plan")
										.query("  , :invc_numb","undefined")
										.query(")")
									;
									temp = data.selectForMap();
									String new_ostt_numb="";

									if(temp.size()>0){
										new_ostt_numb = temp.get(0).getParamText("seq");
									}
									data.clear();

									data.param
										.table("ostt_plan"													)
										.where("where invc_numb		= :invc_numb							")
										.where("and   line_seqn		= :line_seqn							")
										//
										.unique("invc_numb"			, new_ostt_numb							)
										.unique("line_seqn"			, new_line_seqn							)
										//
										.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
										.update("invc_date"			, row.getParameter("deli_date"			))
										.update("acpt_numb"			, row.getParameter("invc_numb"			)) // 새로운걸로 바꿔야함.
										.update("item_idcd"			, prod_idcd) //
										.update("trst_qntt"			, row.getParameter("acpt_qntt"			))
										.update("dlvy_cstm_idcd"	, row.getParameter("assi_cstm_idcd"		))
										.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
										.update("pcod_numb"			, row.getParameter("pcod_numb"			))
										.update("deli_date"			, row.getParameter("deli_date"			))
										.update("find_name"			, acpt_numb
																	+ "	"
																	+ row.getParameter("cstm_name"			)
																	+ "	"
																	+ prod_code
																	+ "	"
																	+ prod_name)
										.insert("line_levl"			, row.getParameter("line_levl"			))
										.insert("line_stat"			, row.getParameter("line_stat"			))
										.update("updt_idcd"			, row.getParameter("updt_idcd"			))
										.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
										.update("updt_ipad"			, arg.remoteAddress )
										.insert("crte_ipad"			, arg.remoteAddress )
										.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
										.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
									;
									data.attach(Action.insert);
									data.execute();
									data.clear();
								}
							}
						}
					}
				}
			}
			if(row.getParamText("auto_spts_yorn").equals("1")){ // 위 insert if절은 반복문이 돌아야하고 수정은 개별수정이므로 따로 빼둠.
				if(rowaction == Action.insert){
					data.param
						.query("call fn_seq_gen_v2(")
						.query("    :stor",row.fixParameter("stor_id"))
						.query("  , :table","ostt_plan")
						.query("  , :invc_numb","undefined")
						.query(")")
					;
					SqlResultMap temp;
					temp = data.selectForMap();
					String new_ostt_numb="";

					if(temp.size()>0){
						new_ostt_numb = temp.get(0).getParamText("seq");
					}
					data.clear();

					data.param
						.table("ostt_plan"													)
						.where("where acpt_numb		= :acpt_numb							")
						//
						.unique("invc_numb"			, new_ostt_numb)
						.unique("acpt_numb"			, row.getParameter("invc_numb"			))
						.unique("line_seqn"			, 0)
						//
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
						.update("invc_date"			, row.getParameter("deli_date"			))
						.update("item_idcd"			, row.getParameter("prod_idcd"			))
						.update("trst_qntt"			, row.getParameter("acpt_qntt"			))
						.update("dlvy_cstm_idcd"	, row.getParameter("assi_cstm_idcd"		))
						.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
						.update("pcod_numb"			, row.getParameter("pcod_numb"			))
						.update("deli_date"			, row.getParameter("deli_date"			))
						.update("find_name"			, row.getParameter("invc_numb"			)
													+ "	"
													+ row.getParameter("cstm_name"			)
													+ "	"
													+ row.getParameter("prod_code"			)
													+ "	"
													+ row.getParameter("prod_name"			))
						.insert("line_levl"			, row.getParameter("line_levl"			))
						.insert("line_stat"			, row.getParameter("line_stat"			))
						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}else if(rowaction == Action.update){
					data.clear();

					data.param
						.table("ostt_plan"													)
						.where("where acpt_numb		= :acpt_numb							")
						//
						.unique("acpt_numb"			, row.getParameter("invc_numb"			))
						//
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))
						.update("invc_date"			, row.getParameter("deli_date"			))
						.update("item_idcd"			, row.getParameter("prod_idcd"			))
						.update("trst_qntt"			, row.getParameter("acpt_qntt"			))
						.update("dlvy_cstm_idcd"	, row.getParameter("assi_cstm_idcd"		))
						.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))
						.update("pcod_numb"			, row.getParameter("pcod_numb"			))
						.update("deli_date"			, row.getParameter("deli_date"			))
						.update("find_name"			, row.getParameter("invc_numb"			)
													+ "	"
													+ row.getParameter("cstm_name"			)
													+ "	"
													+ row.getParameter("prod_code"			)
													+ "	"
													+ row.getParameter("prod_name"			))
						.insert("line_levl"			, row.getParameter("line_levl"			))
						.insert("line_stat"			, row.getParameter("line_stat"			))
						.update("updt_idcd"			, row.getParameter("updt_idcd"			))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.update);
					data.execute();
					data.clear();
				}
			}
		}
		return null;
	}
	public SqlResultMap setWkct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//삭제
			if (rowaction == Action.delete) {
				data.param
					.table("boxx_acpt_bop")
					.where("where invc_numb      = :invc_numb	")
					.where("and   line_seqn      = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			} else {
				ParamToJson trans = new ParamToJson();
				String rep_chek = trans.TranslateRowSelect(row,"rep_chek");

				//등록, 수정
				data.param
					.table("boxx_acpt_bop")
					.where("where invc_numb      = :invc_numb	")
					.where("and   line_seqn      = :line_seqn	")

					.unique("invc_numb"        , row.fixParameter("invc_numb"))
					.unique("line_seqn"        , row.fixParameter("line_seqn"))


					.update("wkct_idcd"        , row.getParameter("wkct_idcd"))			//공정ID
					.update("wkun_dvcd"        , row.getParameter("wkun_dvcd"))			//작업단위구분코드
					.update("qntt_unit_idcd"   , row.getParameter("qntt_unit_idcd"))	//수량단위ID
					.update("stnd_pric"        , row.getParameter("stnd_pric"))			//표준단가
					.update("otod_yorn"        , row.getParameter("otod_yorn"))			//외주여부
					.update("otod_cstm_idcd"   , row.getParameter("otod_cstm_idcd"))	//외주거래처ID
					.update("plan_qntt"        , row.getParameter("plan_qntt"))			//계획수량
					.update("json_data"        , rep_chek						   )  /*  최종공정여부         */

					.update("user_memo"        , row.getParameter("user_memo"))
					.update("updt_user_name"   , row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"        , row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"        , row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"        , row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"   , row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"        , row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"        , row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"        , row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}
		return null;
	}
	public SqlResultMap setFabc(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//삭제
			if (rowaction == Action.delete) {
				data.param
					.table("boxx_acpt_bom")
					.where("where invc_numb      = :invc_numb	")
					.where("and   line_seqn      = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			} else {
				//등록, 수정
				data.param
					.table("boxx_acpt_bom")
					.where("where invc_numb      = :invc_numb	")
					.where("and   line_seqn      = :line_seqn	")

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("fabc_idcd"        , row.getParameter("fabc_idcd"))			//원단ID
					.update("fabc_name"        , row.getParameter("fabc_name"))			//지골구분코드
					.update("ppln_dvcd"        , row.getParameter("ppln_dvcd"))			//지골구분코드
					.update("item_ttln"        , row.getParameter("item_ttln"))			//품목총장
					.update("item_ttwd"        , row.getParameter("item_ttwd"))			//품목총폭
					.update("item_leng"        , row.getParameter("item_leng"))			//품목길이
					.update("item_widh"        , row.getParameter("length"))			//품목폭
					.update("item_fxqt"        , row.getParameter("item_fxqt"))			//품목절수
					.update("fdat_spec"        , row.getParameter("fdat_spec"))			//재단규격
					.update("need_qntt"        , row.getParameter("need_qntt"))			//소요수량
					.update("mxm2_qntt"        , row.getParameter("mxm2_qntt"))			//제곱미터수량
					.update("mxm2_pric"        , row.getParameter("mxm2_pric"))			//제곱미터단가
					.update("pqty_pric"        , row.getParameter("pqty_pric"))			//개당단가
					.update("offr_yorn"        , row.getParameter("offr_yorn"))			//발주여부
					.update("offr_date"        , row.getParameter("offr_date"))			//발주일자
					.update("offr_numb"        , row.getParameter("offr_numb"))			//발주번호
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("istt_yorn"        , row.getParameter("istt_yorn"))			//입고여부
					.update("istt_date"        , row.getParameter("istt_date"))			//입고일자
					.update("istt_qntt"        , row.getParameter("istt_qntt"))			//입고수량

					.update("user_memo"        , row.getParameter("user_memo"))
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
				data.execute();
				data.clear();
			}
		}
		return null;
	}
	public SqlResultMap setAuto_Bom_Copy(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_bom_copy(				")
			.query("       :invc_numb ", arg.fixParameter("invc_numb"))
			.query("     , :prod_idcd ", arg.fixParameter("prod_idcd"))
			.query("     , :crte_idcd ", arg.fixParameter("crte_idcd"))
			.query(")				")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setAuto_Bop_Copy(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_bop_copy(				")
			.query("       :invc_numb ", arg.fixParameter("invc_numb"))
			.query("     , :prod_idcd ", arg.fixParameter("prod_idcd"))
			.query("     , :crte_idcd ", arg.fixParameter("crte_idcd"))
			.query(")				")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setAuto_Bom_Bop_Delete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_bom_bop_delete(						 ")
			.query("       :invc_numb ", arg.fixParameter("invc_numb"))
			.query(")												 ")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	//삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");



		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		DataMessage temp = arg.newStorage("POS");

		for (SqlResultRow row:map) {
			temp.clear();
			temp.param
				.query("select line_stat, line_clos				")
				.query("from  boxx_acpt							")
			 	.query("where invc_numb = :invc_numb", row.fixParameter("invc_numb"))
			;
			SqlResultRow del = temp.selectForRow();

			if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
				throw new ServiceException("수주번호 : "+row.fixParamText("invc_numb")+"는 재고 입고가 마감되어 삭제할 수 없습니다.");
			}

			data.param
				.table("boxx_acpt")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
			data.param
				.table("boxx_acpt_bom")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
			data.param
				.table("boxx_acpt_bop")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
			data.param
				.table("ostt_plan")
				.where("where acpt_numb = :acpt_numb ")

				.unique("acpt_numb"		, row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
		return null;
	}


	//승인
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String apvl_yorn	= arg.getParamText("apvl_yorn");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call auto_boxx_ok (						")
			.query("   :STOR			" , hq				)  // 본사코드
			.query(" , :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :apvl_yorn		" , apvl_yorn		)  // 결재여부
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setBoxx_To_Ostt(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb		= arg.getParamText("invc_numb") ;
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");
		String crte_idcd		= arg.getParamText("crte_idcd");
		String invc_date		= arg.getParamText("invc_date");
		String trst_qntt		= arg.getParamText("trst_qntt");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call boxx_to_ostt (						")
			.query("   :invc_numb		" , invc_numb	 	)  // Invoice 번호
			.query(" , :crte_idcd		" , crte_idcd		)  //
			.query(" , :invc_date		" , invc_date	)  //
			.query(" , :trst_qntt		" , trst_qntt	)  //
			.query(" ) 										")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	//주문복사
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
			.query("call auto_boxx_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setImageUpload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
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
					.query("update boxx_acpt					")
					.query("       set imge_1fst = null			")
					.query("       where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
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
					.table("boxx_acpt")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"				, arg.fixParameter("invc_numb"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update boxx_acpt					")
					.query("       set imge_2snd = null			")
					.query("       where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
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
					.table("boxx_acpt")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"				, arg.fixParameter("invc_numb"))

					.update("imge_2snd",returnByte2)
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
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select imge_1fst, imge_2snd			")
			.where("from  boxx_acpt						")
			.where("where 1=1							")
			.where("and   invc_numb = :invc_numb",arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getIsos_Load(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_isos_load(							")
			.query("      :prod_idcd", arg.fixParameter("prod_idcd"))
			.query(")												")
		;
		return data.selectForMap();
	}
	public SqlResultMap getOstt_Plan_Qntt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select sum(trst_qntt) as qntt 								")
			.where("from ostt_plan												")
			.where("where acpt_numb = :acpt_numb",arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}
	public SqlResultMap getFabc_Need_Calc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			ParamToJson trans = new ParamToJson();
			String param = trans.TranslateAll(arg);
		data.param
			.query("call  fabc_need_calc(								")
			.query("         :param						", param		)
			.query(")													")
		;
		return data.selectForMap();
	}
	public SqlResultMap getCheck_ostt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(invc_numb) as cnt								")
			.where("from ostt_plan												")
			.where("where acpt_numb = :acpt_numb",arg.getParameter("invc_numb"))
			.where("and   invc_date = :invc_date",arg.getParameter("invc_date"))
		;
		return data.selectForMap();
	}
}
