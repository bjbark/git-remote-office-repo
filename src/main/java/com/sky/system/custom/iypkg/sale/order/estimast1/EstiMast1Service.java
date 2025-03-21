package com.sky.system.custom.iypkg.sale.order.estimast1;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletContext;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.initech.util.BufferedOutputStream;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("iypkg.EstiMast1Service")
public class EstiMast1Service  extends DefaultServiceHandler {

	@Autowired
	private HostPropertiesService property;
	@Autowired
	ServletContext c;
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
			.where("select    a.invc_numb             , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.where("        , a.cstm_idcd             , a.esti_dvcd         , a.dept_idcd							")
			.where("        , a.drtr_idcd             , a.mdtn_prsn         , a.dlvy_cond       , a.esti_vald_term	")
			.where("        , a.excg_rate_chge_yorn   , a.paym_cond         , a.remk_text       , a.memo			")
			.where("        , a.esti_amnt             , a.esti_vatx         , a.ttsm_amnt       , a.crny_dvcd		")
			.where("        , a.excg_rate             , a.rcvr_name         , a.esti_case_name  , a.supl_dvcd		")
			.where("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
			.where("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("        , a.crte_idcd             , a.crte_urif         , a.acpt_cofm_yorn  , a.deli_date		")
			.where("        , c.cstm_code             , ifnull(a.cstm_name,c.cstm_name) as cstm_name				")
			.where("        , a.gnrl_mngt_cost_rate   , a.pfit_rate	        , c.tele_numb       , a.expt_dvcd		")
			.where("        , u.user_name as drtr_name, c.boss_name													")
			.where("from esti_mast a																				")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.where("where  1=1																						")
			.where("and    a.esti_dvcd   = :esti_dvcd		" , "1000")
			.where("and    a.find_name  like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc, a.invc_numb desc limit 999999 ) a									")
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
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception{
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb         , a.amnd_degr         , a.line_seqn         , a.esti_item_dvcd	")
			.where("        , a.item_idcd         , a.item_name         , a.item_spec         , i.prod_code as item_code")
			.where("        , a.cstm_item_name    , a.cstm_item_code    , a.unit_idcd         , b.bxty_name			")
			.where("        , a.sale_stnd_pric    , a.dsnt_rate         , a.cost_pric         , a.esti_pric as pqty_pric")
			.where("        , a.pfit_rate         , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate			")
			.where("        , a.vatx_amnt         , a.ttsm_amnt														")
			.where("        , a.sply_amnt         , a.krwn_amnt         , a.krwn_vatx         , a.krwn_ttsm_amnt	")
			.where("        , a.deli_date         , a.remk_text         , a.mney_unit         , a.exrt				")
			.where("        , a.exch_pric         , a.exch_amnt         , a.horz_leng         , a.vrtl_leng			")
			.where("        , a.item_tick         , a.real_item_tick    , a.roll_leng         , a.roll_perc_qntt	")
			.where("        , a.json_data         , a.uper_seqn         , a.disp_seqn         , a.user_memo			")
			.where("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad         , a.crte_dttm			")
			.where("        , a.crte_idcd         , a.crte_urif         , a.norm_sale_pric    , a.line_stat			")
			.where("        , m.item_fxqt																			")
			.where("        , m.item_widh as item_widh2                 , m.item_leng as item_leng2					")
			.where("        , (json_value( a.json_data , '$**.mtrl_idcd')) as mtrl_idcd								")
			.where("        , (json_value( a.json_data , '$**.mtrl_name')) as mtrl_name								")
			.where("        , (json_value( a.json_data , '$**.item_line')) as item_line								")
			.where("        , (json_value( a.json_data , '$**.bxty_idcd')) as bxty_idcd								")
			.where("        , (json_value( a.json_data , '$**.item_leng')) as item_leng								")
			.where("        , (json_value( a.json_data , '$**.item_widh')) as item_widh								")
			.where("        , (json_value( a.json_data , '$**.item_hght')) as item_hght								")
			.where("        , (json_value( a.json_data , '$**.mxm2_qntt')) as mxm2_qntt								")
			.where("        , (json_value( a.json_data , '$**.mxm2_pric')) as mxm2_pric								")
			.where("        , if(m.fabc_idcd, (select a.stnd_pric from fabc_mast a where a.fabc_idcd = m.fabc_idcd ),null) as fabc_stnd_pric")
			.where("        , ( select c.cstm_name																	")
			.where("            from purc_ordr_item p 																")
			.where("            left outer join purc_ordr_mast pb on p.invc_numb = pb.invc_numb 					")
			.where("            left outer join cstm_mast c on pb.cstm_idcd = c.cstm_idcd							")
			.where("            where m.fabc_idcd = p.item_idcd order by pb.invc_date desc limit 1					")
			.where("        )  as ordr_cstm_name																	")
			.where("        , ( select json_value( p.json_data , '$**.mxm2_pric')									")
			.where("            from purc_ordr_item p																")
			.where("            left outer join purc_ordr_mast pb on p.invc_numb = pb.invc_numb						")
			.where("            where m.fabc_idcd = p.item_idcd order by pb.invc_date desc limit 1					")
			.where("        )  as ordr_mxm2_pric																	")
			.where("from   esti_item a																				")
			.where("left outer join product_mast i on a.item_idcd = i.prod_idcd										")
			.where("left outer join boxtype_mast b on json_value( a.json_data , '$**.bxty_idcd') = b.bxty_idcd		")
			.where("left outer join product_bom  m on a.item_idcd = m.prod_idcd										")
			.where("where  1=1																						")
			.where("and    a.invc_numb	=:invc_numb2		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																							")
			.where("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn				")
			.where("        , a.file_ttle       , a.file_dvcd_1fst , a.file_dvcd_2snd   , a.file_dvcd_3trd			")
			.where("        , a.path_name       , a.file_name      , a.file_size        , a.upld_dttm				")
			.where("        , a.remk_text       , a.uper_seqn      , a.disp_seqn									")
			.where("from   apnd_file a																				")
			.where("where  1=1																						")
			.where("and    a.invc_numb	=:invc_numb2		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn limit 999999 ) a															")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb             , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.query("        , a.cstm_idcd             , a.esti_dvcd         , a.deli_date       , a.dept_idcd		")
			.query("        , a.drtr_idcd             , a.mdtn_prsn         , a.dlvy_cond       , a.esti_vald_term	")
			.query("        , a.excg_rate_chge_yorn   , a.paym_cond         , a.remk_text       , a.memo			")
			.query("        , a.esti_amnt             , a.esti_vatx         , a.ttsm_amnt       , a.crny_dvcd		")
			.query("        , a.excg_rate             , a.rcvr_name         , a.esti_case_name  , a.supl_dvcd		")
			.query("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd             , a.crte_urif													")
			.query("        , c.cstm_code             , c.cstm_name         , c.boss_name							")
			.query("        , u.user_name as drtr_name																")
			.query("from esti_mast a																				")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.query("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.query("where  1=1																						")
			.query("and    a.line_stat   < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb         , a.amnd_degr         , a.line_seqn         , a.esti_item_dvcd	")
				.query("        , a.item_idcd         , a.item_name         , a.item_spec         , i.prod_code as item_code")
				.query("        , a.cstm_item_name    , a.cstm_item_code    , a.unit_idcd         , b.bxty_name			")
				.query("        , a.sale_stnd_pric    , a.dsnt_rate         , a.cost_pric         , a.esti_pric as pqty_pric")
				.query("        , a.pfit_rate         , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate			")
				.query("        , a.vatx_amnt         , a.ttsm_amnt														")
				.query("        , a.sply_amnt         , a.krwn_amnt         , a.krwn_vatx         , a.krwn_ttsm_amnt	")
				.query("        , a.deli_date         , a.remk_text         , a.mney_unit         , a.exrt				")
				.query("        , a.exch_pric         , a.exch_amnt         , a.horz_leng         , a.vrtl_leng			")
				.query("        , a.item_tick         , a.real_item_tick    , a.roll_leng         , a.roll_perc_qntt	")
				.query("        , a.json_data         , a.uper_seqn         , a.disp_seqn         , a.user_memo			")
				.query("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad         , a.crte_dttm			")
				.query("        , a.crte_idcd         , a.crte_urif         , a.norm_sale_pric    , a.line_stat			")
				.query("        , m.item_fxqt																			")
				.query("        , m.item_widh as item_widh2                 , m.item_leng as item_leng2					")
				.query("        , (json_value( a.json_data , '$**.mtrl_idcd')) as mtrl_idcd								")
				.query("        , (json_value( a.json_data , '$**.mtrl_name')) as mtrl_name								")
				.query("        , (json_value( a.json_data , '$**.item_line')) as item_line								")
				.query("        , (json_value( a.json_data , '$**.bxty_idcd')) as bxty_idcd								")
				.query("        , (json_value( a.json_data , '$**.item_leng')) as item_leng								")
				.query("        , (json_value( a.json_data , '$**.item_widh')) as item_widh								")
				.query("        , (json_value( a.json_data , '$**.item_hght')) as item_hght								")
				.query("        , (json_value( a.json_data , '$**.mxm2_qntt')) as mxm2_qntt								")
				.query("        , (json_value( a.json_data , '$**.mxm2_pric')) as mxm2_pric								")
				.query("        , if(m.fabc_idcd, (select a.stnd_pric from fabc_mast a where a.fabc_idcd = m.fabc_idcd ),null) as fabc_stnd_pric")
				.query("        , c.cstm_name as ordr_cstm_name             , p.mxm2_pric as ordr_mxm2_pric				")
				.query("from   esti_item a																				")
				.query("left outer join product_mast i on a.item_idcd = i.prod_idcd										")
				.query("left outer join boxtype_mast b on json_value( a.json_data , '$**.bxty_idcd') = b.bxty_idcd		")
				.query("left outer join product_bom  m on a.item_idcd = m.prod_idcd										")
				.query("left outer join (select a.item_idcd, b.cstm_idcd												")
				.query("                      , json_value( a.json_data , '$**.mxm2_pric') as mxm2_pric					")
				.query("                 from purc_ordr_item a															")
				.query("                 left outer join purc_ordr_mast  b on a.invc_numb = b.invc_numb					")
				.query("                 order by b.invc_date desc														")
				.query("                 limit 1) p on m.fabc_idcd = p.item_idcd										")
				.query("left outer join cstm_mast    c on p.cstm_idcd = c.cstm_idcd										")
				.query("where  1=1																						")
				.query("and    a.invc_numb	=:invc_numb2		" , arg.getParamText("invc_numb"))
				.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by a.line_seqn																			")
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
					.table("esti_mast"														)
					.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */

					.unique("invc_numb"				, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))

					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"			))	/*  사업장ID  */
					.update("invc_date"				, row.getParameter("invc_date"			))	/*  invoice일자  */
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"			))	/*  거래처ID  */
					.update("cstm_name"				, row.getParameter("cstm_name"			))	/*  거래처명  */
					.update("esti_dvcd"				, "1000"								)	/*  견적구분코드 : 일반  */
					.update("deli_date"				, row.getParameter("deli_date"			))	/*  납기일자  */
					.update("dept_idcd"				, row.getParameter("dept_idcd"			))	/*  부서ID */
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"			))	/*  담당자ID */
					.update("mdtn_prsn"				, row.getParameter("mdtn_prsn"			))	/*  중개인 */
					.update("rcvr_name"				, row.getParameter("rcvr_name"			))	/*  수신인 */
					.update("esti_case_name"		, row.getParameter("esti_case_name"		))	/*  견적건명*/
					.update("supl_dvcd"				, row.getParameter("supl_dvcd"			))	/*  조달구분*/
					.update("dlvy_cond"				, row.getParameter("dlvy_cond"			))	/*  인도조건  */
					.update("esti_vald_term"		, row.getParameter("esti_vald_term"		))	/*  견적유효기간  */
					.update("excg_rate_chge_yorn"	, row.getParameter("excg_rate_chge_yorn"))	/*  환율변경여부  */
					.update("paym_cond"				, row.getParameter("paym_cond"			))	/*  지불조건  */
					.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */
					.update("esti_vatx"				, row.getParameter("esti_vatx"			))	/*  견적부가세  */
					.update("expt_dvcd"				, row.getParameter("expt_dvcd"			))	/*  수출구분코드  */
					.update("gnrl_mngt_cost_rate"	, row.getParameter("gnrl_mngt_cost_rate"))	/*  일반관리비율  */
					.update("pfit_rate"				, row.getParameter("pfit_rate"			))	/*  이익율  */
					.update("ttsm_amnt"				, row.getParameter("ttsm_amnt"			))	/*  합계금액  */
					.update("crny_dvcd"				, row.getParameter("crny_dvcd"			))	/*  통화구분코드  */
					.update("excg_rate"				, row.getParameter("excg_rate"			))	/*  환율 */
					.update("acpt_cofm_yorn"		, row.getParameter("acpt_cofm_yorn"		))	/*  수주확정여부  */
					.update("acpt_numb"				, row.getParameter("acpt_numb"			))	/*  수주번호  */
					.update("memo"					, row.getParameter("memo"				))	/*  메모  */
					.update("find_name"				, row.getParamText("invc_date")
													 +" "
													 +row.getParamText("cstm_name"))			/*  find_name  */
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
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
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

				;data.attach(rowaction);
			} else {
				ParamToJson json = new ParamToJson();
				String result = "";
				result = json.TranslateRow(arg,row, "esti_item_json_fields");
				// detail 등록/수정
				data.param
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					.update("esti_item_dvcd"	, row.getParameter("esti_item_dvcd"		))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("item_name"			, row.getParameter("item_name"			))
					.update("item_spec"			, row.getParameter("item_spec"			))
					.update("cstm_item_name"	, row.getParameter("cstm_item_name"		))
					.update("cstm_item_code"	, row.getParameter("cstm_item_code"		))
					.update("cost_pric"			, row.getParameter("cost_pric"			))
					.update("pfit_rate"			, row.getParameter("pfit_rate"			))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("dsnt_rate"			, row.getParameter("dsnt_rate"			))
					.update("esti_pric"			, row.getParameter("pqty_pric"			))
					.update("esti_qntt"			, row.getParameter("esti_qntt"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("deli_date"			, row.getParameter("deli_date"			))
					.update("mney_unit"			, row.getParameter("mney_unit"			))
					.update("exrt"				, row.getParameter("exrt"				))
					.update("exch_pric"			, row.getParameter("exch_pric"			))
					.update("exch_amnt"			, row.getParameter("exch_amnt"			))
					.update("horz_leng"			, row.getParameter("horz_leng"			))
					.update("vrtl_leng"			, row.getParameter("vrtl_leng"			))
					.update("item_tick"			, row.getParameter("item_tick"			))
					.update("real_item_tick"	, row.getParameter("real_item_tick"		))
					.update("roll_leng"			, row.getParameter("roll_leng"			))
					.update("roll_perc_qntt"	, row.getParameter("roll_perc_qntt"		))
					.update("json_data"			, result)
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
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

		data.param
			.table("esti_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setAcpt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String deli_date = arg.getParamText("deli_date");

		data.param
			.query("call auto_boxx_insert (			")
			.query("   :param "       , arg.getParameter("records"))	// invc번호
			.query(" , :deli_date "   , deli_date)						// 납기일자
			.query(" ) 								")
		;

		return data.selectForMap();
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String deli_date	= arg.getParamText("deli_date");
		String amnd_degr	= arg.getParamText("amnd_degr");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if (amnd_degr.length() == 0) {
			amnd_degr = "null" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call auto_esti_copy (				")
			.query("   :stor      "  , stor				)  // stor
			.query(" , :invc_numb "  , invc_numb		)  // 주문번호
			.query(" , :amnd_degr "  , amnd_degr		)  // amend
			.query(" , :deli_date "  , deli_date		)  // 납기일자
			.query(" , :job_dvcd "   , "copy"			)  // 복사여부
			.query(" ) 									")
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

	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String amnd_degr	= arg.getParamText("amnd_degr");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if (amnd_degr.length() == 0) {
			amnd_degr = "null" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_esti_copy (				")
			.query("   :stor      "  , stor				)  // stor
			.query(" , :invc_numb "  , invc_numb		)  // 주문번호
			.query(" , :amnd_degr "  , amnd_degr		)  // amend
			.query(" , :deli_date "  , "null"			)  // 납기일자
			.query(" , :job_dvcd "   , "null"			)  // 복사여부
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getFabc(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String numb = arg.getParamText("prod_idcd" );
		data.param
			.query("select  c.cstm_name as ordr_cstm_name             , a.prod_idcd									")
			.query("      , ifnull(p.mxm2_pric,0) as ordr_mxm2_pric   , p.cstm_idcd as ordr_cstm_idcd				")
			.query("from product_mast a																				")
			.query("left outer join  product_bom   m on a.prod_idcd = m.prod_idcd									")
			.query("left outer join  fabc_mast     f on m.fabc_idcd = f.fabc_idcd									")
			.query("left outer join ( select a.invc_numb,a.item_idcd, b.cstm_idcd									")
			.query("                       , json_value( a.json_data , '$**.mxm2_pric') as mxm2_pric				")
			.query("                  from purc_ordr_item a															")
			.query("                  left outer join (select invc_numb, cstm_idcd, invc_date						")
			.query("                                   from purc_ordr_mast											")
			.query("                                   where line_stat < 2) b on a.invc_numb = b.invc_numb			")
			.query("                  left outer join ( select max(a.invc_date) as invc_date ,item_idcd				")
			.query("                                    from purc_ordr_mast a										")
			.query("                                    left outer join (select invc_numb, item_idcd				")
			.query("                                    from purc_ordr_item where line_stat < 2) b on a.invc_numb = b.invc_numb")
			.query("                                    group by item_idcd											")
			.query("                                  ) c on a.item_idcd = c.item_idcd and b.invc_date = c.invc_date")
			.query("                  where c.item_idcd is not null													")
			.query("                  group by a.item_idcd															")
			.query("                ) p on m.fabc_idcd = p.item_idcd												")
			.query("left outer join cstm_mast       c on p.cstm_idcd = c.cstm_idcd									")
			.query("where  1=1																						")
//			.query("and    a.prod_idcd   in ( :prod_idcd )		"   , arg.getParameter("prod_idcd" ))
			.query("and    a.prod_idcd   in ( :prod_idcd )		"   , numb)
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		System.out.println(data.param.toString() + "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ");
		System.out.println(data.selectForMap() + "ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ");
		return data.selectForMap();
	}
}
