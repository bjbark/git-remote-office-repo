package com.sky.system.prod.wmold.wmoldlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class WmoldListService extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

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
			.where("        , a.used_tons         , a.cvic_usge        , a.item_idcd		, b.item_name			")
			.where("        , c.cstm_name         , a.mchn_numb        , a.insp_type_idcd   , d.insp_type_name		")
			.where("        , a.cstm_idcd         																	")
			.where("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code				")
			.where("                                          and   r.prnt_idcd = '1202')   as make_natn_name		")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code					")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_name			")
			.where("        , (select base_name from base_mast r where a.mtrl_bacd_2snd  = r.base_code				")
			.where("                                          and   r.prnt_idcd = '3101')   as mtrl_2snd_name		")
			.where("        , (select base_name from base_mast r where a.mold_grad_bacd  = r.base_code				")
			.where("                                          and   r.prnt_idcd = '3105')   as mold_grad_name		")
			.where("        , (select base_name from base_mast r where a.mold_grad_bacd_2snd  = r.base_code			")
			.where("                                          and   r.prnt_idcd = '3105')   as mold_grad_2snd_name	")
			.where("        , (ifnull(a.updt_expc_shot,0) - ifnull(a.totl_shot,0)) as resultshot 					")
		;
		data.param //퀴리문
			.where("from		mold_mast a   																		")
			.where("			left outer join item_mast b on a.item_idcd = b.item_idcd							")
			.where("			left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.where("			left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd						")
			.where("			left outer join insp_type_mast d on a.insp_type_idcd = d.insp_type_idcd				")
			.where("where		1=1																					")
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and			a.mold_idcd      = :mold_idcd	" , arg.getParameter("mold_idcd"					))
			.where("and			a.mngt_dept_idcd = :dept_idcd	" , arg.getParameter("dept_idcd"					))
			.where("and			a.puch_date     >= :from_date	" , arg.getParameter("from_date"					))
			.where("and			a.puch_date     <= :to_date		" , arg.getParameter("to_date"						))
			.where("and			a.updt_expc_date >= :updt_expc_date1	" , arg.getParamText("updt_expc_date1"		))
			.where("and			a.updt_expc_date <= :updt_expc_date2	" , arg.getParamText("updt_expc_date2"		))
			.where("and			ifnull(a.updt_expc_shot,0) - ifnull(a.totl_shot,0) <= :numb_shot	" , arg.getParamText("numb_shot" ))
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")	))
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
			.query("        , a.mngt_dept_idcd    , r.dept_name as mngt_dept_name									")
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
		;
		data.param //퀴리문
			.where("from      mold_mast a   left outer join item_mast b on a.item_idcd = b.item_idcd				")
			.where("          left outer join cstm_mast c on a.puch_cstm_idcd = c.cstm_idcd							")
			.where("          left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd							")
			.where("where     1=1																					")
			.where("and       a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and       a.mold_idcd = :mold_idcd			" , arg.getParameter("mold_idcd"					))
			.where("and       a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
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
			.query("select    a.mold_idcd      , a.line_seqn      , a.move_date      , a.move_loct_dvcd		")
			.query("		, a.move_loct_name , a.move_memo      , a.befr_loct_dvcd , a.befr_loct_name		")
			.query("		, a.last_yorn      , a.uper_seqn      , a.disp_seqn      , a.user_memo			")
			.query("		, a.prnt_idcd      , a.line_levl      , a.line_ordr      , a.line_stat			")
			.query("		, a.line_clos      , a.find_name      , a.updt_user_name , a.updt_ipad			")
			.query("		, a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name		")
			.query("		, a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
			.query("		, a.sysm_memo      , a.move_purp_dvcd , a.wrhs_idcd								")
		;
		data.param //퀴리문
			.where("from        mold_move a 																")
			.where("            left outer join mold_mast b	on a.mold_idcd = b.mold_idcd					")
			.where("where       1=1																			")
			.where("and         a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"))
			.where("order by    a.line_seqn																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// Detailsearch
	public SqlResultMap getShotSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_idcd   , a.line_seqn      , a.invc_date        , a.invc_numb						")
			.query("        , a.invc_seqn   , a.item_idcd      , a.cvic_idcd        , a.cavity							")
			.query("        , a.work_shot   , a.updt_shot      , a.uper_seqn											")
			.query("        , a.disp_seqn   , b.cvic_name      , c.item_code        , c.item_name						")
			.query("        , a.user_memo   , a.sysm_memo      , a.totl_shot											")
			.query("        , a.prnt_idcd   , a.line_levl      , a.line_ordr        , a.line_stat						")
			.query("        , a.line_clos   , a.find_name      , a.updt_user_name   , a.updt_ipad						")
			.query("        , a.updt_dttm   , a.updt_idcd      , a.updt_urif        , a.crte_user_name					")
			.query("        , a.crte_ipad   , a.crte_dttm      , a.crte_idcd        , a.crte_urif						")
			.query("        , ifnull(e.init_shot,0) + (select ifnull(sum(ifnull(d.work_shot,0)+ifnull(d.updt_shot,0)),0)")
			.query("                                   from   mold_shot d												")
			.query("                                   where  d.line_seqn < a.line_seqn									")
			.query("                                   and    d.mold_idcd = a.mold_idcd) as init_shot					")
			.query("        , ifnull(e.init_shot,0) + (select ifnull(sum(ifnull(d.work_shot,0)+ifnull(d.updt_shot,0)),0)")
			.query("                                   from   mold_shot d												")
			.query("                                   where  d.line_seqn < a.line_seqn									")
			.query("                                   and    d.mold_idcd = a.mold_idcd)								")
			.query("                                + (select ifnull(work_shot,0)+ifnull(updt_shot,0)					")
			.query("                                   from   mold_shot													")
			.query("                                   where  mold_idcd = a.mold_idcd									")
			.query("                                   and    line_seqn = a.line_seqn)   as temp_totl_shot				")
			.query("        , (select count(*)+1																		")
			.query("           from   mold_shot																			")
			.query("           where  mold_idcd = a.mold_idcd															")
			.query("           and    line_seqn < a.line_seqn) as seq													")

		;
		data.param //퀴리문
			.where("from     mold_shot a 																				")
			.where("         left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd									")
			.where("         left outer join item_mast c on a.item_idcd = c.item_idcd, mold_mast e						")
			.where("where    1=1																						")
			.where("and      a.mold_idcd = e.mold_idcd																	")
			.where("and      a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd")							)
			.where("order by a.line_seqn																				")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.mold_code      , a.mold_name      , a.mold_spec      , a.puch_date			")
			.query("        , a.vend_tele_numb , a.afsv_tele_numb , a.puch_cstm_name , a.mold_idcd			")
			.query("        , a.dsse_date      , a.owne_riht      , a.norm_yorn      , a.puch_cstm_idcd		")
			.query("        , a.puch_amnt      , a.make_natn_idcd , a.make_cmpy_name , a.mold_idcd			")
			.query("        , a.cavity         , a.mold_edtn_numb , a.dsig_shot      , a.init_shot			")
			.query("        , a.work_shot      , a.totl_shot      , a.updt_expc_shot , a.updt_expc_date		")
			.query("        , a.ejac_mchn      , a.runr_wigt      , a.prod_wigt      , a.cycl_time			")
			.query("        , a.mtrl_bacd      , a.mtrl_bacd_2snd , a.mold_grad_bacd , a.mold_grad_bacd_2snd")
			.query("        , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.crte_urif 			")
			.query("        , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name		")
			.query("        , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("        , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
			.query("        , a.used_tons      , a.cvic_usge      , a.item_idcd      , b.item_name			")
			.query("        , a.cstm_idcd      , r.dept_name as mngt_dept_name       , a.remk_text			")
			.query("        , c.cstm_name      , a.mchn_numb      , a.insp_type_idcd , d.insp_type_name		")
			.query("        , a.rcpt_cmpy_name , a.stor_plac      , a.egrv_numb      , a.make_date			")
			.query("        , (select base_name from base_mast r where a.make_natn_idcd  = r.base_code			")
			.query("                                          and   r.prnt_idcd = '1202')   as make_natn_name	")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code				")
			.query("                                          and   r.prnt_idcd = '3101')   as mtrl_name		")
			.query("        , (select base_name from base_mast r where a.mtrl_bacd_2snd  = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3101') as mtrl_2snd_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd  = r.base_code			")
			.query("                                          and   r.prnt_idcd = '3105') as mold_grad_name		")
			.query("        , (select base_name from base_mast r where a.mold_grad_bacd_2snd  = r.base_code		")
			.query("                                          and   r.prnt_idcd = '3105') as mold_grad_2snd_name")
			.query("        , a.imge_1fst        , a.imge_2snd        , a.imge_3trd							")
			.query("        , a.imge_4frt         , a.imge_5fit												")
			.query("from      mold_mast a																	")
			.query("          left outer join item_mast b on a.item_idcd = b.item_idcd						")
			.query("          left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd						")
			.query("          left outer join insp_type_mast d on a.insp_type_idcd = d.insp_type_idcd		")
			.query("          left outer join dept_mast r on a.mngt_dept_idcd = r.dept_idcd					")
			.query("where     1=1																			")
			.query("and       a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"			))
			.query("and       a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.query("order by  a.mold_idcd																	")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select   a.mold_idcd       , a.line_seqn      , a.move_date        , a.move_loct_dvcd	")
				.query("       , a.move_loct_name  , a.move_memo      , a.befr_loct_dvcd   , a.befr_loct_name	")
				.query("       , a.last_yorn       , a.uper_seqn      , a.disp_seqn        , a.user_memo		")
				.query("       , a.prnt_idcd       , a.line_levl      , a.line_ordr        , a.line_stat		")
				.query("       , a.line_clos       , a.find_name      , a.updt_user_name   , a.updt_ipad		")
				.query("       , a.updt_dttm       , a.updt_idcd      , a.updt_urif        , a.crte_user_name	")
				.query("       , a.crte_ipad       , a.crte_dttm      , a.crte_idcd        , a.crte_urif		")
				.query("       , a.sysm_memo       , a.move_purp_dvcd , a.wrhs_idcd								")
				.query("from     mold_move a 																	")
				.query("         left outer join mold_mast b	on a.mold_idcd = b.mold_idcd					")
				.query("where    1=1																			")
				.query("and      a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd"))
				.query("order by a.line_seqn																	")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getFileSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  MAX(line_seqn) as line_seqn										")
		;
		data.param //퀴리문
			.where("from    apnd_file 														")
			.where("where   1=1																")
			.where("and     invc_numb = :invc_numb        " , arg.getParameter("invc_numb"))
		;
		return data.selectForMap();
	}


}
