package com.sky.system.basic.item.eco.ecomast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
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

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

@Service("basic.eco.EcoMastService")
public class EcoMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total("select count(1) as maxsize " )
		;
		data.param
			.query("select																											")
			.query("          a.ecod_idcd       , a.ecod_date       , a.dept_idcd       , a.drtr_idcd       , a.chge_resn_dvcd		")
			.query("        , a.strt_date       , a.endd_date       , a.chge_resn       , a.cofm_yorn       , a.mngt_docm_numb		")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_item_idcd	, a.prnt_idcd       , a.cofm_degr			")
			.query("        , a.dtrb_date       , a.prnt_date       			 													")
			.query("        , json_value(d.json_data,'$.dely_cstm_itid')      as dely_cstm_itid								")
			.query("        , json_value(d.json_data,'$.dely_cstm_spec')      as dely_cstm_spec								")
			.query("        , json_value(d.json_data,'$.dely_cstm_modl')      as dely_cstm_modl								")
			.query("        , json_value(d.json_data,'$.dely_cstm_item_name') as dely_cstm_item_name						")
			.query("        , json_value(d.json_data,'$.cstm_item_name')      as cstm_item_name								")
			.query("        , json_value(d.json_data,'$.cstm_spec')           as cstm_spec									")
			.query("        , json_value(d.json_data,'$.cstm_itid')           as cstm_itid									")
			.query("        , json_value(d.json_data,'$.crty_bacd')           as crty_bacd									")
			.query("        , json_value(d.json_data,'$.mtrl_bacd')           as mtrl_bacd									")
			.query("        , json_value(d.json_data,'$.msll_valu')           as msll_valu									")
			.query("        , json_value(d.json_data,'$.colr_bacd')           as colr_bacd									")
			.query("        , json_value(d.json_data,'$.srfc_proc')           as srfc_proc									")
			.query("        , (select base_name from base_mast r where json_value(d.json_data,'$.crty_bacd') = r.base_code			")
			.query("                                           and   r.prnt_idcd = '9001') as crty_bacd_name						")
			.query("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif			")
			.query("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif			")
			.query("        , b.dept_name       , c.user_name       , d.item_name       , d.item_spec       , d.item_code			")
		;
		data.param
			.where("from    eco_mast a																							")
			.where("        left outer join dept_mast      b on a.dept_idcd = b.dept_idcd										")
			.where("        left outer join user_mast      c on a.drtr_idcd = c.user_idcd										")
			.where("        left outer join item_mast      d on a.prnt_item_idcd = d.item_idcd									")
			.where("where   1=1																									")
			.where("and     a.prnt_item_idcd   = :prnt_item_idcd         " , arg.getParameter("prnt_item_idcd					"))
			.where("and     a.ecod_idcd= :ecod_idcd                      " , arg.getParamText("ecod_idcd						"))
			.where("and     d.find_name like %:find_name%                " , arg.getParamText("find_name						"))
			.where("and     a.strt_date >= :strt_date                    " , arg.getParamText("strt_date						"))
			.where("and     a.line_stat   < :line_stat	" , "2																	")
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
			.query("select    a.ecod_idcd      , a.prnt_item_idcd , a.line_seqn												")
			.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt						")
			.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
			.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
			.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
			.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
			.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
			.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.query("        , b.item_name      , b.item_spec      , c.wkct_name      , a.user_memo      , b.item_code		")
			.query("        , b.flat_drwg_numb , b.sold_drwg_numb , b.mker_name												")
			.query("        , json_value(b.json_data,'$.dely_cstm_itid')      as dely_cstm_itid								")
			.query("        , json_value(b.json_data,'$.dely_cstm_spec')      as dely_cstm_spec								")
			.query("        , json_value(b.json_data,'$.dely_cstm_modl')      as dely_cstm_modl								")
			.query("        , json_value(b.json_data,'$.dely_cstm_item_name') as dely_cstm_item_name						")
			.query("        , json_value(b.json_data,'$.cstm_item_name')      as cstm_item_name								")
			.query("        , json_value(b.json_data,'$.cstm_spec')           as cstm_spec									")
			.query("        , json_value(b.json_data,'$.cstm_itid')           as cstm_itid									")
			.query("        , json_value(b.json_data,'$.crty_bacd')           as crty_bacd									")
			.query("        , json_value(b.json_data,'$.mtrl_bacd')           as mtrl_bacd									")
			.query("        , json_value(b.json_data,'$.msll_valu')           as msll_valu									")
			.query("        , json_value(b.json_data,'$.item_mtrl')           as item_mtrl									")
			.query("        , (select base_name from base_mast r where json_value(b.json_data,'$.colr_bacd') = r.base_code	")
			.query("                                           and   r.prnt_idcd = '3104') as colr_bacd_name				")
			.query("        , json_value(b.json_data,'$.srfc_proc')           as srfc_proc									")
			.query("        , (select base_name from base_mast r where json_value(b.json_data,'$.crty_bacd') = r.base_code	")
			.query("                                           and   r.prnt_idcd = '9001') as crty_bacd_name				")
//			.query("        , cs.cstm_name																					")
			.query("        , a.wkfw_idcd      , w.wkfw_name																")
		;
		data.param
			.where("from   eco_dtil a 																						")
			.where("       left outer join item_mast b  on a.item_idcd      = b.item_idcd 									")
			.where("       left outer join wkct_mast c  on a.ivst_wkct_idcd = c.wkct_idcd									")
			.where("       left outer join unit_mast u  on a.unit_idcd      = u.unit_idcd									")
			.where("       left outer join wkfw_clss w on a.wkfw_idcd      = w.wkfw_idcd									")
			.where("where  1=1																								")
			.where("and    a.ecod_idcd= :ecod_idcd" , arg.getParamText("ecod_idcd"											))
			.where("and    a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" 					)))
			.where("order by a.line_seqn																					")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select    a.ecod_idcd      , a.prnt_item_idcd , a.line_seqn      , a.crte_urif      , a.user_memo		")
			.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt , a.updt_urif		")
			.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
			.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
			.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
			.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
			.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
			.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.crte_idcd		")
			.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , b.item_name      , b.item_spec		")
			.query("        , c.wkct_name      , s.ecod_date      , s.chge_resn      , s.chge_resn_dvcd						")
			.query("        , b.item_code      , s.prnt_date      , s.dtrb_date												")
			.query("        , a.wkfw_idcd      , w.wkfw_name																")
		;
		data.param
			.where("from   eco_dtil a 																						")
			.where("       left outer join item_mast b on a.item_idcd      = b.item_idcd 									")
			.where("       left outer join wkct_mast c on a.ivst_wkct_idcd = c.wkct_idcd									")
			.where("       left outer join unit_mast u on a.unit_idcd      = u.unit_idcd									")
			.where("       left outer join  eco_mast s on s.ecod_idcd      = a.ecod_idcd									")
			.where("       left outer join wkfw_clss w on a.wkfw_idcd      = w.wkfw_idcd									")
			.where("where  1=1																								")
			.where("and    a.ecod_idcd= :ecod_idcd" , arg.getParamText("ecod_idcd"											))
			.where("and    a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" 					)))
			.where("order by a.line_seqn																					")
			;
			return data.selectForMap();
		}

	public SqlResultMap setDetail2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total("select count(1) as maxsize " )
		;
		data.param
			.query("select    a.ecod_idcd      , a.prnt_item_idcd , a.line_seqn      , a.crte_urif      , a.user_memo		")
			.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt , a.updt_urif		")
			.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
			.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
			.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
			.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
			.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
			.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.crte_idcd		")
			.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , b.item_name      , b.item_spec		")
			.query("        , b.item_code")
			.query("        , c.wkct_name      , s.ecod_date      , s.chge_resn      , s.chge_resn_dvcd						")
		;
		data.param
			.where("from   eco_dtil a 																						")
			.where("       left outer join item_mast b on a.item_idcd      = b.item_idcd 									")
			.where("       left outer join wkct_mast c on a.ivst_wkct_idcd = c.wkct_idcd									")
			.where("       left outer join unit_mast u on a.unit_idcd      = u.unit_idcd									")
			.where("       left outer join  eco_mast s on s.ecod_idcd      = a.ecod_idcd									")
			.where("where  1=1																								")
			.where("and    a.ecod_idcd= :ecod_idcd" , arg.getParamText("ecod_idcd"											))
			.where("and    a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" 					)))
			.where("order by a.line_seqn																					")
			;
			return data.selectForMap();
		}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																										")
			.query("          a.ecod_idcd       , a.ecod_date       , a.dept_idcd       , a.drtr_idcd       , a.chge_resn_dvcd	")
			.query("        , a.strt_date       , a.endd_date       , a.chge_resn       , a.cofm_yorn       , a.mngt_docm_numb	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_item_idcd	, a.prnt_idcd       , a.cofm_degr		")
			.query("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif		")
			.query("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.query("        , a.dtrb_date       , a.prnt_date																	")
			.query("        , b.dept_name       , c.user_name       , d.item_name       , d.item_spec       , d.item_code		")
			.query("        , json_value(d.json_data,'$.dely_cstm_itid')      as dely_cstm_itid									")
			.query("        , json_value(d.json_data,'$.dely_cstm_spec')      as dely_cstm_spec									")
			.query("        , json_value(d.json_data,'$.dely_cstm_modl')      as dely_cstm_modl									")
			.query("        , json_value(d.json_data,'$.dely_cstm_item_name') as dely_cstm_item_name							")
			.query("        , json_value(d.json_data,'$.cstm_item_name')      as cstm_item_name									")
			.query("        , json_value(d.json_data,'$.cstm_spec')           as cstm_spec										")
			.query("        , json_value(d.json_data,'$.cstm_itid')           as cstm_itid										")
			.query("        , json_value(d.json_data,'$.crty_bacd')           as crty_bacd										")
			.query("        , json_value(e.json_data,'$.apvl_dvcd')           as apvl_dvcd										")
			.query("        , (select base_name from base_mast r where json_value(d.json_data,'$.crty_bacd') = r.base_code		")
			.query("                                           and   r.prnt_idcd = '9001') as crty_bacd_name					")
			.query("from    eco_mast a																							")
			.query("        left outer join dept_mast b on a.dept_idcd = b.dept_idcd											")
			.query("        left outer join user_mast c on a.drtr_idcd = c.user_idcd											")
			.query("        left outer join item_mast d on a.prnt_item_idcd = d.item_idcd										")
			.query("        left outer join purc_ordr_mast e on a.dept_idcd = e.dept_idcd										")
			.query("where   1=1																									")
			.query("and     a.ecod_idcd   = :ecod_idcd  " , arg.getParameter("ecod_idcd"										))
			.query("and     a.line_stat   < :line_stat  " , "2"																	)
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.ecod_idcd      , a.line_seqn      , i.item_code      , e.prnt_item_idcd						")
				.query("        , a.chge_optn_dvcd , a.befr_item_idcd , a.befr_unit_idcd , a.befr_ndqt_nmrt						")
				.query("        , a.befr_ndqt_dnmn , a.befr_lwcs_yorn , a.befr_incm_loss , a.befr_otcm_loss , a.befr_stok_plac	")
				.query("        , a.befr_aset_dvcd , a.item_idcd      , a.ivst_wkct_idcd , a.unit_idcd      , a.ndqt_nmrt		")
				.query("        , a.ndqt_dnmn      , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate , a.strt_date		")
				.query("        , a.endd_date 	   , a.stok_plac      , a.stok_unit_idcd , a.aset_clss_dvcd , a.remk_text		")
				.query("        , a.uper_seqn      , a.disp_seqn      , a.sysm_memo      , a.prnt_idcd      , u.unit_name		")
				.query("        , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("        , i.item_name      , i.item_spec      , c.wkct_name      , a.user_memo							")
				.query("        , i.flat_drwg_numb , i.sold_drwg_numb															")
				.query("        , json_value(i.json_data,'$.dely_cstm_itid') as dely_cstm_itid									")
				.query("        , json_value(i.json_data,'$.dely_cstm_spec') as dely_cstm_spec									")
				.query("        , json_value(i.json_data,'$.dely_cstm_modl') as dely_cstm_modl									")
				.query("        , json_value(i.json_data,'$.dely_cstm_item_name') as dely_cstm_item_name						")
				.query("        , json_value(i.json_data,'$.cstm_item_name') as cstm_item_name									")
				.query("        , json_value(i.json_data,'$.cstm_spec') as cstm_spec											")
				.query("        , json_value(i.json_data,'$.cstm_itid') as cstm_itid											")
				.query("        , json_value(i.json_data,'$.crty_bacd') as crty_bacd											")
				.query("        , json_value(i.json_data,'$.cstm_name') as cstm_name											")
				.query("        , json_value(i.json_data,'$.cstm_idcd') as cstm_idcd											")
				.query("        , json_value(i.json_data,'$.srfc_proc') as srfc_proc											")
				.query("        , json_value(i.json_data,'$.item_mtrl') as item_mtrl											")
				.query("        , json_value(i.json_data,'$.msll_valu') as msll_valu											")
				.query("        , a.wkfw_idcd      , w.wkfw_name																")

				.query("from    eco_dtil a 																						")
				.query("        left outer join item_mast i on a.item_idcd      = i.item_idcd 									")
				.query("        left outer join wkct_mast c on a.ivst_wkct_idcd = c.wkct_idcd									")
				.query("        left outer join unit_mast u on a.unit_idcd      = u.unit_idcd									")
				.query("        left outer join eco_mast  e on a.ecod_idcd      = e.ecod_idcd									")
				.query("        left outer join wkfw_clss w on a.wkfw_idcd      = w.wkfw_idcd									")
				.query("where   1=1																								")
				.query("and     a.ecod_idcd= :ecod_idcd      ", arg.getParamText("ecod_idcd"									))
				.query("and     a.line_stat   < :line_stat	", "2" , "".equals(arg.getParamText("line_stat" 					)))
				.query("order  by a.line_seqn																					")
				;
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
				data.param
					.table("eco_mast													")
					.where("where ecod_idcd = :ecod_idcd								")
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					//
					.update("ecod_date"			, row.getParameter("ecod_date"			))
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))
					.update("strt_date"			, row.getParameter("strt_date"			))
					.update("endd_date"			, row.getParameter("endd_date"			))
					.update("chge_resn"			, row.getParameter("chge_resn"			))
					.update("cofm_yorn"			, row.getParameter("cofm_yorn"			))
					.update("mngt_docm_numb"	, row.getParameter("mngt_docm_numb"		))
					.update("chge_resn_dvcd"	, row.getParameter("chge_resn_dvcd"		))
					.update("prnt_item_idcd"	, row.getParameter("prnt_item_idcd"		))
					.update("cofm_degr"			, row.getParameter("cofm_degr"			))
					.update("dtrb_date"			, row.getParameter("dtrb_date"			))
					.update("prnt_date"			, row.getParameter("prnt_date"			))

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
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
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, row.getParameter("updt_dttm"			))  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data,  row.getParameter("product", SqlResultMap.class));
				}
			}
		}
	data.execute();
	return null;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			// ECO복사 등록/수정/

		data.param
			.table("eco_mast													")
			.where("where ecod_idcd = :ecod_idcd								")

			.unique("ecod_idcd"			, arg.fixParameter("ecod_idcd"			))

			.update("dtrb_date"			, arg.getParameter("dtrb_date"			))
			.update("chge_resn_dvcd"	, arg.getParameter("chge_resn_dvcd"		))
			.update("prnt_date"			, arg.getParameter("prnt_date"			))
			.update("prnt_item_idcd"	, arg.getParameter("prnt_item_idcd"		))
			.update("cofm_yorn"			, arg.getParameter("cofm_yorn"			))
			.update("find_name"			, arg.getParameter("ecod_idcd")
										+ "	"
										)
			.update("user_memo"			, arg.getParameter("user_memo"			))  /*  시스템메모  */
			.update("sysm_memo"			, "Copy data"    )
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();

		data.param
			.query("insert into eco_dtil(")
			.query("    ecod_idcd")
			.query("  , prnt_item_idcd")
			.query("  , line_seqn")
			.query("  , chge_optn_dvcd")
			.query("  , befr_item_idcd")
			.query("  , befr_unit_idcd")
			.query("  , befr_ndqt_nmrt")
			.query("  , befr_ndqt_dnmn")
			.query("  , befr_lwcs_yorn")
			.query("  , befr_incm_loss")
			.query("  , befr_otcm_loss")
			.query("  , befr_stok_plac")
			.query("  , befr_aset_dvcd")
			.query("  , item_idcd")
			.query("  , ivst_wkct_idcd")
			.query("  , unit_idcd")
			.query("  , ndqt_nmrt")
			.query("  , ndqt_dnmn")
			.query("  , lwcs_yorn")
			.query("  , incm_loss_rate")
			.query("  , otcm_loss_rate")
			.query("  , strt_date")
			.query("  , endd_date")
			.query("  , stok_plac")
			.query("  , stok_unit_idcd")
			.query("  , aset_clss_dvcd")
			.query("  , prod_dvcd")
			.query("  , remk_text")
			.query("  , uper_seqn")
			.query("  , disp_seqn")
			.query("  , wkfw_idcd")
			.query("  , user_memo")
			.query("  , sysm_memo")
			.query("  , line_levl")  /*  ROW레벨  */
			.query("  , line_ordr")  /*  ROW순서  */
			.query("  , line_stat")  /*  ROW상태  */
			.query("  , line_clos")  /*  마감여부  */

			.query("  , crte_dttm			")
			.query("  , crte_idcd			")
			.query(")")

			.query("select ")
			.query("    :ecod_idcd"           , arg.fixParamText("ecod_idcd"))
			.query("  , :prnt_item_idcd"      , arg.fixParamText("prnt_item_idcd"))
			.query("  , line_seqn  ")
			.query("  , chge_optn_dvcd")
			.query("  , befr_item_idcd")
			.query("  , befr_unit_idcd")
			.query("  , befr_ndqt_nmrt")
			.query("  , befr_ndqt_dnmn")
			.query("  , befr_lwcs_yorn")
			.query("  , befr_incm_loss")
			.query("  , befr_otcm_loss")
			.query("  , befr_stok_plac")
			.query("  , befr_aset_dvcd")
			.query("  , item_idcd")
			.query("  , ivst_wkct_idcd")
			.query("  , unit_idcd")
			.query("  , ndqt_nmrt")
			.query("  , ndqt_dnmn")
			.query("  , lwcs_yorn")
			.query("  , incm_loss_rate")
			.query("  , otcm_loss_rate")
			.query("  , strt_date")
			.query("  , endd_date")
			.query("  , stok_plac")
			.query("  , stok_unit_idcd")
			.query("  , aset_clss_dvcd")
			.query("  , prod_dvcd")
			.query("  , remk_text")
			.query("  , uper_seqn")
			.query("  , disp_seqn")
			.query("  , wkfw_idcd")

			.query(", user_memo														")  /*  사용자메모  */
			.query(", 'CopyData' as sysm_memo										")  /*  시스템메모  */
			.query(", line_levl														")  /*  ROW레벨  */
			.query(", line_ordr														")  /*  ROW순서  */
			.query(", line_stat														")  /*  ROW상태  */
			.query(", line_clos														")  /*  마감여부  */
			.query(", :crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
			.query(", :crte_idcd"			, arg.getParameter("crte_idcd"			))  /*  생성ID  */
			.query("from eco_dtil													")
			.query("where 1=1 														")
			.query("and     ecod_idcd = :ecod_idcd2             ", arg.fixParamText("ecod_idcd2"))
			.query("and     prnt_item_idcd = :prnt_item_idcd2   ", arg.fixParamText("prnt_item_idcd2"))
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}


	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data,  SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("eco_dtil"													)
					.where("where ecod_idcd		= :ecod_idcd							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;data.attach(rowaction);

			} else {
				// detail 등록/수정
				data.param
					.table("eco_dtil"													)
					.where("where ecod_idcd       = :ecod_idcd							")  /*  INVOICE번호  */
					.where("and   prnt_item_idcd  = :prnt_item_idcd						")  /*  부모품목ID  */
					.where("and   line_seqn       = :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("ecod_idcd"			, row.fixParameter("ecod_idcd"			))
					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("chge_optn_dvcd"	, row.getParameter("chge_optn_dvcd"		))
					.update("befr_item_idcd"	, row.getParameter("befr_item_idcd"		))
					.update("befr_unit_idcd"	, row.getParameter("befr_unit_idcd"		))
					.update("befr_ndqt_nmrt"	, row.getParameter("befr_ndqt_nmrt"		))
					.update("befr_ndqt_dnmn"	, row.getParameter("befr_ndqt_dnmn"		))
					.update("befr_lwcs_yorn"	, row.getParameter("befr_lwcs_yorn"		))
					.update("befr_incm_loss"	, row.getParameter("befr_incm_loss"		))
					.update("befr_otcm_loss"	, row.getParameter("befr_otcm_loss"		))
					.update("befr_stok_plac"	, row.getParameter("befr_stok_plac"		))
					.update("befr_aset_dvcd"	, row.getParameter("befr_aset_dvcd"		))
					.update("ivst_wkct_idcd"	, row.getParameter("ivst_wkct_idcd"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("ndqt_nmrt"			, row.getParameter("ndqt_nmrt"			))
					.update("ndqt_dnmn"			, row.getParameter("ndqt_dnmn"			))
					.update("lwcs_yorn"			, row.getParameter("lwcs_yorn"			))
					.update("incm_loss_rate"	, row.getParameter("incm_loss_rate"		))
					.update("otcm_loss_rate"	, row.getParameter("otcm_loss_rate"		))
					.update("strt_date"			, row.getParameter("strt_date"			))
					.update("endd_date"			, row.getParameter("endd_date"			))
					.update("stok_plac"			, row.getParameter("stok_plac"			))
					.update("stok_unit_idcd"	, row.getParameter("stok_unit_idcd"		))
					.update("aset_clss_dvcd"	, row.getParameter("aset_clss_dvcd"		))
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))
					.update("wkfw_idcd"			, row.getParameter("wkfw_idcd"			))


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
			.query("from  eco_mast							")
		 	.query("where ecod_idcd = :ecod_idcd", arg.fixParameter("ecod_idcd"))
		;
		SqlResultRow del = temp.selectForRow();

		data.param
			.table("eco_mast")
			.where("where ecod_idcd = :ecod_idcd ")
			//
			.unique("ecod_idcd"		, arg.fixParameter("ecod_idcd"))
			.update("line_stat"		, 2)
//			.update("updt_idcd"		, arg.getParameter("updt_user_name"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String ecod_idcd = arg.getParamText("ecod_idcd") ;
		String cofm_yorn = arg.getParamText("cofm_yorn");
		System.out.println("ecod_idcd : "+ecod_idcd);
		data = arg.newStorage("POS");
		data.param
			.table("eco_mast"														)
			.where("where ecod_idcd		= :ecod_idcd								")

			.unique("ecod_idcd"			,									ecod_idcd)

			.update("cofm_yorn"	, 											cofm_yorn)
		;

		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
				.query("call auto_eco_ok (			")
				.query("   :ecod_idcd  "  , ecod_idcd	 )  // Invoice 번호
				.query(" , :cofm_yorn "  , cofm_yorn 	 )  //
				.query(" )								")
		;

		data.attach(Action.direct);
		data.execute();
		return null;

	}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.hqof_idcd  , a.refn_valu_1fst									")
			.query("     , a.base_idcd  , a.base_code , a.base_name   , a.base_engl_name	")
			.query("     , a.prnt_idcd  , a.line_levl , a.line_stat   , a.user_memo			")
			.query("     , a.code_leng														")
		;
		data.param
			.where("from   base_mast a														")
			.where("where  1=1																")
			.where("and    a.hqof_idcd   =  :hqof_idcd    " , arg.fixParameter("hqof_idcd" ))
			.where("and    a.prnt_idcd   =  :prnt_idcd    " , arg.fixParameter("prnt_idcd" ))
			.where("and    a.base_code   =  :base_code    " , arg.getParameter("base_code" ))
			.where("and    a.base_code   like '2%'        " , "반제품".equals(arg.getParamText("base_like" )))
			.where("and    a.base_code   between 2000 and 3999  " , "BOM".equals(arg.getParamText("base_like" )))
			.where("and    a.find_name   like %:find_name%" , arg.getParameter("find_name"   ))
			.where("and    a.base_name   like %:base_name%" , arg.getParameter("base_name"   ))
			.where("and    a.line_stat   =  :line_stat    " , "0"  ,( "0".equals(arg.getParamText("line_stat")) )) // 정상 거래처만 조회 요청한 경우
			.where("and    a.line_stat   <= :line_stat    " , "1"  ,(!"0".equals(arg.getParamText("line_stat")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("order by a.base_code													")
		;
	    return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("base_mast")
					.where("where   base_idcd  = :base_idcd  " )
					//
					.unique("base_idcd"			, row.fixParameter("base_idcd"         ))
					.update("line_stat"			, 2  )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("base_mast")
					.where("where base_idcd  = :base_idcd  " )
					//
					.unique("hqof_idcd"			, row.fixParameter("hqof_idcd"))
					.unique("base_idcd"			, row.fixParameter("base_idcd"))
					.update("base_code"			, row.getParameter("base_code"))
					.update("base_name"			, row.getParameter("base_name"))
					.update("base_engl_name"	, row.getParameter("base_engl_name"))
					.update("refn_valu_1fst"	, row.getParameter("refn_valu_1fst"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParamText("base_code"         ).trim()
												+ row.getParamText("base_name"         ).trim())
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	/**
	 * 출고처 구분에 따른 각종 코드 명칭
	 */
	public SqlResultMap getOffeLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select wkct_idcd   as offe_idcd														")
			.where("     , wkct_code   as offe_code														")
			.where("     , wkct_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '1'         as offe_dvcd														")
			.where("from   wkct_mast																	")
			.where("where  line_stat < '2'																")
			.where("union  all																			")
			.where("select dept_idcd   as offe_idcd														")
			.where("     , dept_code   as offe_code														")
			.where("     , dept_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '2'         as offe_dvcd														")
			.where("from   dept_mast																	")
			.where("where  line_stat < '2'																")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '3'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    ifnull(otod_cstm_yorn,'0') <> '0'											")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '4'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    (ifnull(puch_cstm_yorn,'0') <> '0' or ifnull(incm_cstm_yorn,'0') <> '0' )	")
			.where("union all																			")
			.where("select cstm_idcd   as offe_idcd														")
			.where("     , cstm_code   as offe_code														")
			.where("     , cstm_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '5'         as offe_dvcd														")
			.where("from   cstm_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    (ifnull(sale_cstm_yorn,'0') <> '0' or ifnull(expt_cstm_yorn,'0') <> '0' )	")
			.where("union all																			")
			.where("select cvic_idcd   as offe_idcd														")
			.where("     , cvic_code   as offe_code														")
			.where("     , cvic_name   as offe_name														")
			.where("     , find_name																	")
			.where("     , '6'         as offe_dvcd														")
			.where("from   cvic_mast																	")
			.where("where  line_stat < '2'																")
			.where("and    wkct_idcd = :wkct_idcd " , arg.getParameter("wkct_idcd"))
			.where(") a																					")
			.where("where a.offe_dvcd = :offe_dvcd "		, arg.getParameter("cstm_dvcd"))
			.where("and   a.find_name like  %:find_name% "  , arg.getParameter("find_name"))
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}



	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		CommonsMultipartFile file = uploadItem.getFiles()[0]; // 이미지 파일을 가져온다.

		// 파일이 이미지일 경우
		String imageYn = "Y";
		ByteArrayInputStream thumnailInputStream = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if("Y".equals(imageYn)) {
		//  이미지 파일 사이즈 체크
//			if (file.getSize()/1024/1024 > 0) {
//				throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
//			}

			// 섬네일에 강제 사이즈 지정 후 스트림 과정
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        Thumbnails.of(file.getInputStream()).size(200, 200).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}


        // FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
		HostProperty host = property.getProperty( "FTPTEST" ); // 업로드 서버 정보 가져오기

		// 서버에서 기존 path를 불러온다.
		String directory = host.getHostPath(); // 업로드 경로를 지정한다.

		// 파일이름지정 ( 확장자는 유지 )
		String imageName = "TestFile" + file.getFileItem().getName().substring(file.getFileItem().getName().lastIndexOf("."));

		// ftp 생성
		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue(host.getProvider()));

		// ftp 접속
		if (ftp.connect(host)) {
			try{
				// 업로드 진행
				// 이미지일 경우
				if("Y".equals(imageYn)){
					ftp.upload(directory, imageName, thumnailInputStream);
				} else {
					ftp.upload(directory, imageName, file);
				}

				// logic 처리 ( DB등 )

		   	} catch(Exception ex) {
				throw ex;
			} finally {
				ftp.disconnect();
			}
		}
		return map;
	}
}



