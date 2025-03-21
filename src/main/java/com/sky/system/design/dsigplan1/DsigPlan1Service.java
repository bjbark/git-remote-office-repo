package com.sky.system.design.dsigplan1;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class DsigPlan1Service extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.pjod_idcd        , a.dsig_schd_dvcd   , a.id                , a.seqn			")
			.query("        , a.name             , a.progress         , a.progressbyworklog , a.relevance		")
			.query("        , a.type             , a.typeld           , a.description       , a.code			")
			.query("        , a.level            , a.status           , a.depends           , a.start			")
			.query("        , a.end              , a.startismilestone , a.endismilestone						")
			.query("        , a.collapsed        , a.canwrite         , a.canadd            , a.candelete		")
			.query("        , a.canaddlssue      , a.haschild         , a.starttime         , a.endtime			")
			.query("        , a.wkct_idcd        , a.ivst_pcnt        , a.need_mnhr								")
			.query("        , a.chge_coef        , a.duration													")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd         , a.crte_urif 		")
			.query("        , a.line_stat        , a.line_clos        , a.find_name         , a.updt_user_name	")
			.query("        , a.updt_ipad        , a.updt_dttm        , a.updt_idcd         , a.updt_urif		")
			.query("        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm         , a.crte_idcd		")
			.query("        , c.user_name as rsps_name                , f.ivst_pcnt								")
			.query("        , ifnull((a.duration*f.ivst_pcnt),0) as need_mnhr									")
			.query("        , p.dsig_vsdt_cofm_yorn																")
		;
		data.param //퀴리문
			.where("from		pjod_dsig_schd a   																")
			.where("left outer join pjod_mast p on a.pjod_idcd = p.pjod_idcd									")
			.where("            left outer join pjod_dsig_assigs b on a.pjod_idcd = b.pjod_idcd					")
			.where("                                              and a.id = b.id and b.roleid = 'tmp_1'		")
			.where("                                              and a.dsig_schd_dvcd = b.dsig_schd_dvcd		")
			.where("            left outer join user_mast c        on b.resourceid = c.user_idcd 				")
			.where("            left outer join ( select a.pjod_idcd , a.dsig_schd_dvcd, a.id					")
			.where("                                                 , IFNULL(count(b.resourceid),0) as  ivst_pcnt					")
			.where("                              from pjod_dsig_schd a 															")
			.where("                              left outer join pjod_dsig_assigs b on a.id = b.id 								")
			.where("                                                                 and a.pjod_idcd = b.pjod_idcd					")
			.where("                                                                 and a.dsig_schd_dvcd = b.dsig_schd_dvcd		")
			.where("                              group by a.pjod_idcd, a.dsig_schd_dvcd,a.id										")
			.where("            ) f on a.pjod_idcd = f.pjod_idcd and 	a.id = f.id and a.dsig_schd_dvcd = f.dsig_schd_dvcd			")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd	= :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.find_name	like %:find_name%	" , arg.getParameter("find_name"				))
			.where("and			a.dsig_schd_dvcd = :dsig_schd_dvcd  " , "1000"									 )
			.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by	a.seqn"																			 )
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// search
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.pjod_dvcd        , a.expt_dvcd        , a.cstm_idcd       , a.cstm_name			")
			.query("		, a.prjt_idcd        , a.regi_date        , a.pjod_name       , a.item_idcd			")
			.query("		, a.item_name        , a.item_spec        , a.modl_name       , a.esti_amnt			")
			.query("		, a.cofm_yorn        , a.cofm_date        , a.cofm_amnt       , a.crny_dvcd			")
			.query("		, a.frst_exam_date   , a.send_exam_date   , a.deli_date       , a.ppsl_deli_date	")
			.query("		, a.strt_date        , a.endd_date        , a.drtr_idcd       , a.dlvy_date			")
			.query("		, a.last_yorn        , a.apvl_date        , a.apvl_drtr_idcd  , a.cstm_item_code	")
			.query("		, a.mold_size        , a.cavity           , a.mold_wigt       , a.used_mtrl_name	")
			.query("		, a.prod_wigt        , a.used_tons        , a.pjod_idcd       , a.amnd_degr			")
			.query("		, a.pjod_code        , c.user_name as drtr_name               , a.item_imge			")
			.query("		, a.user_memo        , a.sysm_memo        , a.prnt_idcd       , a.drtr_idcd			")
			.query("		, a.line_stat        , a.line_clos        , a.find_name       , a.updt_user_name	")
			.query("		, a.updt_ipad        , a.updt_dttm        , a.updt_idcd       , a.updt_urif			")
			.query("		, a.crte_user_name   , a.crte_ipad        , a.crte_dttm       , a.crte_idcd			")
			.query("		, a.crte_urif        , b.buss_name        , b.buss_numb       , b.buss_kind			")
			.query("		, b.buss_type        , b.boss_name        , b.tele_numb       , b.faxi_numb			")
			.query("		, b.mail_addr        , b.hdph_numb        , c.user_name       , c.user_idcd			")
			.query("		, i.item_code        , a.item_imge2													")
		;
		data.param //퀴리문
			.where("from	pjod_mast a																			")
			.where("		left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("		left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("where   1=1																					")
			.where("and     a.item_idcd  = :item_idcd", arg.getParameter("item_idcd"							))
			.where("and     a.pjod_idcd  = :pjod_idcd", arg.getParameter("pjod_idcd"							))
			.where("and     a.cstm_idcd  = :cstm_idcd", arg.getParameter("cstm_idcd"							))
			.where("and     a.drtr_idcd  = :user_idcd", arg.getParameter("user_idcd"							))
			.where("and	    a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.regi_date  between :fr_dt      " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt      " , arg.getParamText("to_dt") )
			.where("order by a.pjod_idcd desc																	")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap getCstm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select    a.cstm_idcd          ,a.cstm_code          ,a.cstm_dvcd          ,a.rtil_stru_dvcd	")
		.query("         ,a.cstm_name          ,a.cstm_stnm_1fst     ,a.cstm_stnm_2snd     ,a.engl_name			")
		.query("         ,a.engl_stnm          ,a.engl_stnm_1fst     ,a.engl_stnm_2snd     ,a.mngt_bzpl_idcd	")
		.query("         ,a.home_page_addr     ,a.cstm_dsgn_trnt     ,a.corp_dvcd          ,a.buss_name			")
		.query("         ,a.buss_numb          ,a.buss_type          ,a.buss_kind          ,a.corp_numb			")
		.query("         ,a.boss_name          ,a.tele_numb          ,a.tele_numb_2snd     ,a.faxi_numb			")
		.query("         ,a.hdph_numb          ,a.spec_buss_numb     ,a.mail_addr								")
		.query("         ,a.ccrd_puch_yorn     ,a.etbl_rpub_yorn     ,a.sale_cstm_yorn     ,a.expt_cstm_yorn	")
		.query("         ,a.incm_cstm_yorn     ,a.otod_cstm_yorn     ,a.etcc_cstm_yorn     ,a.rpst_cstm_idcd	")
		.query("         ,a.blto_idcd_1fst     ,a.blto_idcd_2snd     ,a.scrt_sett_dvcd     ,a.scrt_sett_amnt	")
		.query("         ,a.scrt_offr_aman     ,a.scrt_mltl          ,a.crdt_bacd          ,a.crdt_lmit_amnt	")
		.query("         ,a.cnio_dvcd          ,a.sale_drtr_idcd     ,a.sale_dept_idcd     ,a.insp_kind_dvcd	")
		.query("         ,a.user_memo          ,a.sysm_memo          ,a.prnt_idcd          ,a.line_levl			")
		.query("         ,a.line_ordr          ,a.line_stat          ,a.line_clos          ,a.find_name			")
		.query("         ,a.updt_user_name     ,a.updt_ipad          ,a.updt_dttm          ,a.updt_idcd			")
		.query("         ,a.updt_urif          ,a.crte_user_name     ,a.crte_ipad          ,a.crte_dttm			")
		.query("         ,a.crte_idcd          ,a.crte_urif          ,a.puch_cstm_yorn     ,b.post_code			")
		.query("         ,b.addr_1fst          ,b.addr_2snd														")
		;
		data.param //퀴리문
			.where("from        cstm_mast  a													")
			.where("            left outer join cstm_addr b on a.cstm_idcd = b.cstm_idcd		")
			.where("where       1=1																")
			.where("and         a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setApprove(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			// master 등록/수정
		data.param
			.table("pjod_mast"													 )
			.where("where pjod_idcd = :pjod_idcd								")
			//
			.unique("pjod_idcd"			, arg.fixParameter("pjod_idcd"			))
			//

			.update("line_clos"			, arg.getParameter("line_clos"			))  /*  마감여부  */

			.update("updt_idcd"			, arg.getParameter("updt_idcd"			))  /*  수정ID  */
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}

	//승인/승인취소
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("pjod_mast								")
				.where("where pjod_idcd		= :pjod_idcd		")

				.unique("pjod_idcd"				, arg.fixParameter("pjod_idcd"))

				.update("dsig_vsdt_cofm_yorn"	, arg.getParameter("dsig_vsdt_cofm_yorn"))	//승인여부
			;
			data.attach(Action.update);
			data.execute();
		return null ;
	}
}
