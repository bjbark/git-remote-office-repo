package com.sky.system.prod.mold.moldmast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;


@Service
public class MoldMastService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String query = arg.getParamText("hqof_idcd");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.mold_code         , a.mold_name        , a.mold_spec        , a.puch_date			")
			.where("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.puch_cstm_name   , a.mold_idcd			")
			.where("        , a.egrv_numb         , a.make_date        , a.dsse_resn        , a.rcpt_cmpy_name		")
			.where("        , a.mngt_dept_idcd    , r.dept_name as mngt_dept_name           , a.stor_plac			")
			.where("        , a.dsse_date         , a.owne_riht        , a.norm_yorn        , a.puch_cstm_idcd		")
			.where("        , a.puch_amnt         , a.make_natn_idcd   , a.make_cmpy_name   , a.remk_text			")
			.where("        , a.cavity            , a.mold_edtn_numb   , a.dsig_shot        , a.init_shot			")
			.where("        , a.work_shot         , a.totl_shot        , a.updt_expc_shot   , a.updt_expc_date		")
			.where("        , a.ejac_mchn         , a.runr_wigt        , a.prod_wigt        , a.cycl_time			")
			.where("        , a.mtrl_bacd         , a.mtrl_bacd_2snd   , a.mold_grad_bacd   , a.mold_grad_bacd_2snd	")
			.where("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.where("        , a.line_stat         , a.line_clos        , a.find_name        , a.updt_user_name		")
			.where("        , a.updt_ipad         , a.updt_dttm        , a.updt_idcd        , a.updt_urif			")
			.where("        , a.crte_user_name    , a.crte_ipad        , a.crte_dttm        , a.crte_idcd			")
			.where("        , a.used_tons         , a.cvic_usge        , a.item_idcd        , a.cstm_idcd			")
		;
		if(query.length() > 0){
			if(query.equals("N1000iypkg")) {
				data.param
					.where("        , b.prod_name as item_name")
				;
			}
		}else {
			data.param
				.where("        , b.item_name")
			;
		}
		data.param
			.where("        , c.cstm_name         , a.mchn_numb        , a.insp_type_idcd   , d.insp_type_name		")
			.where("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code				")
			.where("                                          and   r.prnt_idcd = '1202')   as make_natn_name		")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd_2snd      = r.base_code			")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_2snd_name		")
			.where("        , (select base_name from base_mast r where a.mold_grad_bacd      = r.base_code			")
			.where("                                          and   r.prnt_idcd = '3105')   as mold_grad_name		")
			.where("        , (select base_name from base_mast r where a.mold_grad_bacd_2snd = r.base_code			")
			.where("                                          and   r.prnt_idcd = '3105')   as mold_grad_2snd_name	")
			.where("        , (ifnull(a.updt_expc_shot,0) - ifnull(a.totl_shot,0)) as resultshot 					")
		;
		data.param //퀴리문
			.where("from		mold_mast a   																		")
		;
		if(query.length() > 0){
			if(query.equals("N1000iypkg")) {
				data.param
					.where("		left outer join product_mast b on a.item_idcd = b.prod_idcd")
				;
			}
		}else {
			data.param
				.where("		left outer join item_mast b on a.item_idcd = b.item_idcd")
			;
		}
		data.param
			.where("			left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.where("			left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd						")
			.where("			left outer join insp_type_mast d on a.insp_type_idcd = d.insp_type_idcd				")
			.where("where		1=1																					")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and			a.mold_idcd       = :mold_idcd	" , arg.getParameter("mold_idcd"					))
			.where("and			a.mngt_dept_idcd  = :dept_idcd	" , arg.getParameter("dept_idcd"					))
			.where("and			a.puch_date      >= :fr_dt      " , arg.getParameter("fr_dt"						))
			.where("and			a.puch_date      <= :to_dt      " , arg.getParameter("to_dt"						))
			.where("and			a.updt_expc_date >= :updt_expc_date1	" , arg.getParamText("updt_expc_date1" ))
			.where("and			a.updt_expc_date <= :updt_expc_date2	" , arg.getParamText("updt_expc_date2" ))
			.where("and			ifnull(a.updt_expc_shot,0) - ifnull(a.totl_shot,0) <= :numb_shot	" , arg.getParamText("numb_shot" ))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.mold_idcd ) a																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// search
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_code         , a.mold_name        , a.mold_spec        , a.puch_date			")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.puch_cstm_name   , a.mold_idcd			")
			.query("        , a.mngt_dept_idcd    , r.dept_name as mngt_dept_name           , a.remk_text			")
			.query("        , a.dsse_date         , a.owne_riht        , a.norm_yorn        , a.puch_cstm_idcd		")
			.query("        , a.puch_amnt         , a.make_natn_idcd   , a.make_cmpy_name   						")
			.query("        , a.cavity            , a.mold_edtn_numb   , a.dsig_shot        , a.init_shot			")
			.query("        , a.work_shot         , a.totl_shot        , a.updt_expc_shot   , a.updt_expc_date		")
			.query("        , a.ejac_mchn         , a.runr_wigt        , a.prod_wigt        , a.cycl_time			")
			.query("        , a.mtrl_bacd         , a.mtrl_bacd_2snd   , a.mold_grad_bacd   , a.mold_grad_bacd_2snd	")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.query("        , a.line_stat         , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("        , a.updt_ipad         , a.updt_dttm        , a.updt_idcd        , a.updt_urif			")
			.query("        , a.crte_user_name    , a.crte_ipad        , a.crte_dttm        , a.crte_idcd			")
			.query("        , a.used_tons         , a.cvic_usge        , a.item_idcd		, b.item_name			")
			.query("        , c.cstm_name         , a.mchn_numb														")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_name			")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '3105')   as mold_grad_name		")
		;
		data.param //퀴리문
			.where("from      mold_mast a																			")
			.where("          left outer join item_adon d on a.mold_idcd      = d.mold_idcd							")
			.where("          left outer join item_mast b on d.item_idcd      = b.item_idcd							")
			.where("          left outer join cstm_mast c on a.puch_cstm_idcd = c.cstm_idcd							")
			.where("          left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd							")
			.where("where     1=1																					")
			.where("and       a.find_name like %:find_name%   " , arg.getParameter("find_name"						))
			.where("and       a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"						))
			.where("and       b.item_idcd = :item_idcd        " , arg.getParameter("item_idcd"						))
			.where("and       a.line_stat < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by  a.mold_idcd"																			)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// filesearch
	public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//		DataMessage data = new DataMessage("NETHOSTING");
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn			")
			.query("		, a.path_name       , a.file_name      , a.file_size        , a.upld_dttm			")
			.query("		, a.remk_text       , a.uper_seqn      , a.disp_seqn								")
		;
		data.param //퀴리문
			.where("from		apnd_file a																		")
			.where("where		1=1																				")
			.where("and			a.invc_numb = :mold_idcd        " , arg.getParameter("mold_idcd"				))
			.where("and			a.orgn_dvcd = :orgn_dvcd","mold_mast")												// 받아서 처리해야함
			.where("order by	a.line_seqn																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// MoveSearch
	public SqlResultMap getMoveSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_idcd             , a.line_seqn      , a.move_date        , a.move_loct_dvcd	")
			.query("		, a.move_loct_name        , a.move_memo      , a.befr_loct_dvcd   , a.befr_loct_name	")
			.query("		, a.last_yorn             , a.uper_seqn      , a.disp_seqn        , a.user_memo			")
			.query("		, a.prnt_idcd             , a.line_levl      , a.line_ordr        , a.line_stat			")
			.query("		, a.line_clos             , a.find_name      , a.updt_user_name   , a.updt_ipad			")
			.query("		, a.updt_dttm             , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
			.query("		, a.crte_ipad             , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
			.query("		, a.sysm_memo             , a.move_purp_dvcd , a.wrhs_idcd								")
		;
		data.param //퀴리문
			.where("from        mold_move a 																		")
			.where("            left outer join mold_mast b	on a.mold_idcd = b.mold_idcd							")
			.where("where       1=1																					")
			.where("and         a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"))
			.where("order by    a.line_seqn																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_mast")
					.where("where mold_idcd  = :mold_idcd")

					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("mold_mast")
					.where("where mold_idcd = :mold_idcd" )
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"))

					.update("mold_code"				, row.getParameter("mold_code"))
					.update("mold_name"				, row.getParameter("mold_name"))
					.update("mold_spec"				, row.getParameter("mold_spec"))
					.update("used_tons"				, row.getParameter("used_tons"))
					.update("mngt_dept_idcd"		, row.getParameter("mngt_dept_idcd"))
					.update("puch_cstm_idcd"		, row.getParameter("puch_cstm_idcd"))
					.update("puch_cstm_name"		, row.getParameter("puch_cstm_name"))
					.update("vend_tele_numb"		, row.getParameter("vend_tele_numb"))
					.update("afsv_tele_numb"		, row.getParameter("afsv_tele_numb"))
					.update("make_natn_idcd"		, row.getParameter("make_natn_idcd"))
					.update("make_cmpy_name"		, row.getParameter("make_cmpy_name"))
					.update("puch_amnt"				, row.getParameter("puch_amnt"))
					.update("norm_yorn"				, row.getParameter("norm_yorn"))
					.update("owne_riht"				, row.getParameter("owne_riht"))
					.update("dsse_date"				, row.getParameter("dsse_date"))
					.update("puch_date"				, row.getParameter("puch_date"))
					.update("ejac_mchn"				, row.getParameter("ejac_mchn"))
					.update("cavity"				, row.getParameter("cavity"))
					.update("mold_edtn_numb"		, row.getParameter("mold_edtn_numb"))
					.update("dsig_shot"				, row.getParameter("dsig_shot"))
					.update("init_shot"				, row.getParameter("init_shot"))
					.update("work_shot"				, row.getParameter("work_shot"))
					.update("totl_shot"				, row.getParameter("totl_shot"))
					.update("updt_expc_shot"		, row.getParameter("updt_expc_shot"))
					.update("updt_expc_date"		, row.getParameter("updt_expc_date"))
					.update("runr_wigt"				, row.getParameter("runr_wigt"))
					.update("prod_wigt"				, row.getParameter("prod_wigt"))
					.update("cycl_time"				, row.getParameter("cycl_time"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("mchn_numb"				, row.getParameter("mchn_numb"))
					.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("mtrl_bacd"				, row.getParameter("mtrl_bacd"))
					.update("mold_grad_bacd"		, row.getParameter("mold_grad_bacd"))
					.update("mtrl_2snd_bacd"		, row.getParameter("mtrl_2snd_bacd"))
					.update("mold_grad_2snd_bacd"	, row.getParameter("mold_grad_2snd_bacd"))


					.update("find_name"				, row.getParameter("mold_code")
													+ " "
													+ row.getParameter("mold_name"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}

		data.execute();
		return null ;
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String query = arg.getParamText("hqof_idcd");

		data.param
			.query("select    a.mold_code         , a.mold_name        , a.mold_spec        , a.puch_date			")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.puch_cstm_name   , a.mold_idcd			")
			.query("        , a.mngt_dept_idcd    , r.dept_name as mngt_dept_name           , a.cstm_idcd			")
			.query("        , a.dsse_date         , a.owne_riht        , a.norm_yorn        , a.puch_cstm_idcd		")
			.query("        , a.puch_amnt         , a.make_natn_idcd   , a.make_cmpy_name   , a.remk_text			")
			.query("        , a.cavity            , a.mold_edtn_numb   , a.dsig_shot        , a.init_shot			")
			.query("        , a.work_shot         , a.totl_shot        , a.updt_expc_shot   , a.updt_expc_date		")
			.query("        , a.ejac_mchn         , a.runr_wigt        , a.prod_wigt        , a.cycl_time			")
			.query("        , a.mtrl_bacd         , a.mtrl_bacd_2snd   , a.mold_grad_bacd   , a.mold_grad_bacd_2snd	")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.query("        , a.line_stat         , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("        , a.updt_ipad         , a.updt_dttm        , a.updt_idcd        , a.updt_urif			")
			.query("        , a.crte_user_name    , a.crte_ipad        , a.crte_dttm        , a.crte_idcd			")
			.query("        , a.used_tons         , a.cvic_usge        , a.item_idcd								")
		;
		if(query.length() > 0){
			if(query.equals("N1000iypkg")) {
				data.param
					.query("        , b.prod_name as item_name")
				;
			}
		}else {
			data.param
				.query("        , b.item_name")
			;
		}
		data.param
			.query("        , c.cstm_name         , a.mchn_numb        , a.insp_type_idcd   , d.insp_type_name		")
			.query("        , a.rcpt_cmpy_name    , a.stor_plac        , a.egrv_numb        , a.make_date			")
			.query("        , a.imge_1fst         , a.imge_2snd        , a.imge_3trd								")
			.query("        , a.imge_4frt         , a.imge_5fit														")
			.query("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '1202')   as make_natn_name		")
			.query("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '1202')   as make_natn_name		")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_name			")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd_2snd      = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_2snd_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd      = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3105')   as mold_grad_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd_2snd = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3105')   as mold_grad_2snd_name	")
			.query("from      mold_mast a   																		")
		;
		if(query.length() > 0){
			if(query.equals("N1000iypkg")) {
				data.param
					.query("		left outer join product_mast b on a.item_idcd = b.prod_idcd")
				;
			}
		}else {
			data.param
				.query("		left outer join item_mast b on a.item_idcd = b.item_idcd")
			;
		}
		data.param
			.query("			left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.query("			left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd						")
			.query("			left outer join insp_type_mast d on a.insp_type_idcd = d.insp_type_idcd				")
			.query("where		1=1																					")
			.query("and			a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"					))
			.query("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("order by	a.mold_idcd"																		)
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			System.out.println("info");
			data.clear();
			data.param
				.query("select    a.mold_idcd             , a.line_seqn      , a.move_date        , a.move_loct_dvcd	")
				.query("		, a.move_loct_name        , a.move_memo      , a.befr_loct_dvcd   , a.befr_loct_name	")
				.query("		, a.last_yorn             , a.uper_seqn      , a.disp_seqn        , a.user_memo			")
				.query("		, a.prnt_idcd             , a.line_levl      , a.line_ordr        , a.line_stat			")
				.query("		, a.line_clos             , a.find_name      , a.updt_user_name   , a.updt_ipad			")
				.query("		, a.updt_dttm             , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
				.query("		, a.crte_ipad             , a.crte_dttm      , a.crte_idcd        , a.crte_urif			")
				.query("		, a.sysm_memo             , a.move_purp_dvcd , a.wrhs_idcd        , w.zone_idcd			")
				.query("from        mold_move a 																		")
				.query("            left outer join mold_mast b	on a.mold_idcd = b.mold_idcd							")
				.query("            left outer join wrhs_zone w	on a.wrhs_idcd = w.wrhs_idcd							")
				.query("where       1=1																					")
				.query("and         a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"))
				.query("order by    a.line_seqn																			")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				data.param
					.table("mold_mast")
					.where("where mold_idcd  = :mold_idcd")

					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.update);
			} else {
				// master 등록/수정
				data.param
					.table("mold_move")
					.where("where mold_idcd	= :mold_idcd")

					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
				;data.attach(Action.delete);
				data.execute();
				System.out.println("delete");
				data.clear();
				data.param
				.table("mold_mast")
				.where("where mold_idcd = :mold_idcd" )
				.unique("mold_idcd"			, row.fixParameter("mold_idcd"))

				.update("mold_code"				, row.getParameter("mold_code"))
				.update("mold_name"				, row.getParameter("mold_name"))
				.update("mold_spec"				, row.getParameter("mold_spec"))
				.update("used_tons"				, row.getParameter("used_tons"))
				.update("mngt_dept_idcd"		, row.getParameter("mngt_dept_idcd"))
				.update("puch_cstm_idcd"		, row.getParameter("puch_cstm_idcd"))
				.update("puch_cstm_name"		, row.getParameter("puch_cstm_name"))
				.update("vend_tele_numb"		, row.getParameter("vend_tele_numb"))
				.update("afsv_tele_numb"		, row.getParameter("afsv_tele_numb"))
				.update("make_natn_idcd"		, row.getParameter("make_natn_idcd"))
				.update("make_cmpy_name"		, row.getParameter("make_cmpy_name"))
				.update("puch_amnt"				, row.getParameter("puch_amnt"))
				.update("norm_yorn"				, row.getParameter("norm_yorn"))
				.update("owne_riht"				, row.getParameter("owne_riht"))
				.update("dsse_date"				, row.getParameter("dsse_date"))
				.update("puch_date"				, row.getParameter("puch_date"))
				.update("ejac_mchn"				, row.getParameter("ejac_mchn"))
				.update("cavity"				, row.getParameter("cavity"))
				.update("mold_edtn_numb"		, row.getParameter("mold_edtn_numb"))
				.update("dsig_shot"				, row.getParameter("dsig_shot"))
				.update("init_shot"				, row.getParameter("init_shot"))
				.update("work_shot"				, row.getParameter("work_shot"))
				.update("totl_shot"				, row.getParameter("totl_shot"))
				.update("updt_expc_shot"		, row.getParameter("updt_expc_shot"))
				.update("updt_expc_date"		, row.getParameter("updt_expc_date"))
				.update("runr_wigt"				, row.getParameter("runr_wigt"))
				.update("prod_wigt"				, row.getParameter("prod_wigt"))
				.update("cycl_time"				, row.getParameter("cycl_time"))
				.update("item_idcd"				, row.getParameter("item_idcd"))
				.update("mchn_numb"				, row.getParameter("mchn_numb"))
				.update("insp_type_idcd"		, row.getParameter("insp_type_idcd"))
				.update("remk_text"				, row.getParameter("remk_text"))
				.update("mtrl_bacd"				, row.getParameter("mtrl_bacd"))
				.update("mtrl_bacd_2snd"		, row.getParameter("mtrl_bacd_2snd"))
				.update("mold_grad_bacd"		, row.getParameter("mold_grad_bacd"))
				.update("mold_grad_bacd_2snd"	, row.getParameter("mold_grad_bacd_2snd"))
				.update("cstm_idcd"				, row.getParameter("cstm_idcd"))
				.update("rcpt_cmpy_name"		, row.getParameter("rcpt_cmpy_name"))
				.update("stor_plac"				, row.getParameter("stor_plac"))
				.update("egrv_numb"				, row.getParameter("egrv_numb"))
				.update("make_date"				, row.getParameter("make_date"))
				.update("user_memo"				, row.getParameter("user_memo"))

				.update("find_name"				, row.getParameter("mold_code")
												+ " "
												+ row.getParameter("mold_name"))

				.update("line_stat"				, row.getParameter("line_stat"))
				.insert("line_levl"				, row.getParameter("line_levl"))
				.update("updt_idcd"				, row.getParameter("updt_idcd"))
				.insert("crte_idcd"				, row.getParameter("crte_idcd"))
				.update("updt_ipad"				, arg.remoteAddress )
				.insert("crte_ipad"				, arg.remoteAddress )
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
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

				// detail 등록/수정
			if (rowaction == Action.delete) {
			}else{
				data.param
					.table("mold_move")
					.where("where mold_idcd	= :mold_idcd" )
					.where("and line_seqn	= :line_seqn" )

					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("move_date"				, row.getParameter("move_date"))
					.update("move_loct_dvcd"		, row.getParameter("move_loct_dvcd"))
					.update("move_loct_name"		, row.getParameter("move_loct_name"))
					.update("move_purp_dvcd"		, row.getParameter("move_purp_dvcd"))
					.update("move_memo"				, row.getParameter("move_memo"))
					.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
					.update("befr_loct_dvcd"		, row.getParameter("befr_loct_dvcd"))
					.update("befr_loct_name"		, row.getParameter("befr_loct_name"))
					.update("last_yorn"				, row.getParameter("last_yorn"))



					.update("find_name"				, row.getParameter("mold_idcd")
													+ " "
													+ row.fixParameter("move_date"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.insert);
			}
		}
	}
	public SqlResultMap getFileSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    MAX(line_seqn) as line_seqn										")
		;
		data.param //퀴리문
			.where("from        apnd_file 														")
			.where("where       1=1																")
			.where("and         invc_numb = :invc_numb        " , arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		String chk3 = (String)arg.getParameter("chk3");
		String chk4 = (String)arg.getParameter("chk4");
		String chk5 = (String)arg.getParameter("chk5");
		byte[] returnByte =null;
		byte[] returnByte2 =null;
		byte[] returnByte3 =null;
		byte[] returnByte4 =null;
		byte[] returnByte5 =null;
		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos3 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos4 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos5 =  new ByteArrayOutputStream();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.


		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		ByteArrayInputStream thumnailInputStream3 = null;
		ByteArrayInputStream thumnailInputStream4 = null;
		ByteArrayInputStream thumnailInputStream5 = null;
		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
	        Thumbnails.of(file[0].getInputStream()).size(400, 533).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[1].getInputStream()).size(400, 533).toOutputStream(baos2);
			thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		if(file[2].getFileItem().getName()==null||file[2].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[2].getInputStream()).size(400, 533).toOutputStream(baos3);
			thumnailInputStream3 = new ByteArrayInputStream(baos2.toByteArray());
		}
		if(file[3].getFileItem().getName()==null||file[3].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[3].getInputStream()).size(400, 533).toOutputStream(baos4);
			thumnailInputStream4 = new ByteArrayInputStream(baos2.toByteArray());
		}
		if(file[4].getFileItem().getName()==null||file[4].getFileItem().getName()==""){
		}else{
	        Thumbnails.of(file[4].getInputStream()).size(400, 533).toOutputStream(baos5);
	        thumnailInputStream5 = new ByteArrayInputStream(baos2.toByteArray());
		}
		int readCount = 0;
		int readCount2 = 0;
		int readCount3 = 0;
		int readCount4 = 0;
		int readCount5 = 0;
		try{
			if(chk1.equals("0")){
				data.param
					.query("update mold_mast					")
					.query("       set imge_1fst = ''			")
					.query("       where mold_idcd = :mold_idcd", arg.getParameter("mold_idcd"))
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
					.table("mold_mast")
					.where("where mold_idcd	= :mold_idcd" )

					.unique("mold_idcd"				, arg.fixParameter("mold_idcd"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
				.query("update mold_mast					")
				.query("       set imge_2snd = ''			")
				.query("       where mold_idcd = :mold_idcd", arg.getParameter("mold_idcd"))
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
				.table("mold_mast")
				.where("where mold_idcd	= :mold_idcd" )

				.unique("mold_idcd"				, arg.fixParameter("mold_idcd"))

				.update("imge_2snd",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
				// logic 처리 ( DB등 )
			}
			if(chk3.equals("0")){
				data.param
				.query("update mold_mast					")
				.query("       set imge_3trd = ''			")
				.query("       where mold_idcd = :mold_idcd", arg.getParameter("mold_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk3.equals("1")){
				byte[] buf3 = new byte[1024];
				while ((readCount3 = thumnailInputStream3.read(buf3))>0) {
					baos2.write(buf3,0,readCount3);
				}
				returnByte3 = baos3.toByteArray();

				data.param
				.table("mold_mast")
				.where("where mold_idcd	= :mold_idcd" )

				.unique("mold_idcd"				, arg.fixParameter("mold_idcd"))

				.update("imge_3trd",returnByte3)
				;data.attach(Action.update);
				data.execute();
				data.clear();
				// logic 처리 ( DB등 )
			}
			if(chk4.equals("0")){
				data.param
				.query("update mold_mast					")
				.query("       set imge_4frt = ''			")
				.query("       where mold_idcd = :mold_idcd", arg.getParameter("mold_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk4.equals("1")){
				byte[] buf4 = new byte[1044];
				while ((readCount4 = thumnailInputStream4.read(buf4))>0) {
					baos4.write(buf4,0,readCount4);
				}
				returnByte4 = baos4.toByteArray();

				data.param
				.table("mold_mast")
				.where("where mold_idcd	= :mold_idcd" )

				.unique("mold_idcd"				, arg.fixParameter("mold_idcd"))

				.update("imge_4frt",returnByte4)
				;data.attach(Action.update);
				data.execute();
				data.clear();
				// logic 처리 ( DB등 )
			}
			if(chk5.equals("0")){
				data.param
					.query("update mold_mast					")
					.query("       set imge_5fit = ''			")
					.query("       where mold_idcd = :mold_idcd", arg.getParameter("mold_idcd"))
				;data.attach();
				data.execute();
				data.clear();
			}else if(chk5.equals("1")){
				byte[] buf5 = new byte[1054];
				while ((readCount5 = thumnailInputStream5.read(buf5))>0) {
					 baos5.write(buf5,0,readCount5);
				}
				returnByte5 = baos5.toByteArray();

				data.param
					.table("mold_mast")
					.where("where mold_idcd	= :mold_idcd" )

					.unique("mold_idcd"				, arg.fixParameter("mold_idcd"))

					.update("imge_5fit",returnByte5)
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
			if(thumnailInputStream3 != null) thumnailInputStream3.close();
			if(thumnailInputStream4 != null) thumnailInputStream4.close();
			if(thumnailInputStream5 != null) thumnailInputStream5.close();
		}

		return map;
	}

}
