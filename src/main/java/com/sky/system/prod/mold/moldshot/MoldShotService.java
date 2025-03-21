package com.sky.system.prod.mold.moldshot;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class MoldShotService extends DefaultServiceHandler{

	// search
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
			.where("        , a.mngt_dept_idcd    , a.stor_plac        , a.cstm_idcd								")
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
			.where("        , a.used_tons         , a.cvic_usge        , a.item_idcd        , b.item_name			")
			.where("        , a.mchn_numb         , a.insp_type_idcd   , c.cstm_name								")
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
			.where("from      mold_mast a																			")
			.where("          left outer join item_mast b on a.item_idcd      = b.item_idcd							")
			.where("          left outer join dept_mast f on a.mngt_dept_idcd = f.dept_idcd							")
			.where("          left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.where("          left outer join mold_repa d on a.mold_idcd = d.mold_idcd								")
			.where("where     1=1																					")
			.where("and       a.find_name	like %:find_name%	   "   , arg.getParameter("find_name"				))
			.where("and       a.mold_idcd = :mold_idcd             "   , arg.getParameter("mold_idcd"				))
			.where("and       a.mngt_dept_idcd = :dept_idcd        "   , arg.getParameter("dept_idcd"				))
			.where("and       substring(d.repa_date,1,8)	>= :chek1_date " , arg.getParamText("chek1_date" 		))
			.where("and       substring(d.repa_date,1,8)	<= :chek2_date " , arg.getParamText("chek2_date" 		))
			.where("and       substring(a.puch_date,1,8)	>= :chek_date3 " , arg.getParamText("chek_date3"		))
			.where("and       substring(a.puch_date,1,8)	<= :chek_date4 " , arg.getParamText("chek_date4" 		))
			.where("and       a.line_stat	< :line_stat		   " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("group by  a.mold_idcd"																			 )
			.where("order by  a.mold_idcd"																			 )
			.where(")a																								")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// Detailsearch
	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.mold_idcd   , a.line_seqn      , a.invc_date        , a.invc_numb					")
			.query("        , a.invc_seqn   , a.item_idcd      , a.cvic_idcd        , a.cavity						")
			.query("        , a.work_shot   , a.updt_shot      , a.uper_seqn										")
			.query("        , a.disp_seqn   , b.cvic_name      , c.item_code        , c.item_name					")
			.query("        , a.user_memo   , a.sysm_memo      , a.totl_shot										")
			.query("        , a.prnt_idcd   , a.line_levl      , a.line_ordr        , a.line_stat					")
			.query("        , a.line_clos   , a.find_name      , a.updt_user_name   , a.updt_ipad					")
			.query("        , a.updt_dttm   , a.updt_idcd      , a.updt_urif        , a.crte_user_name				")
			.query("        , a.crte_ipad   , a.crte_dttm      , a.crte_idcd        , a.crte_urif					")
			.query("        , (ifnull(e.init_shot,0)+(select ifnull(sum(ifnull(d.work_shot,0)+ifnull(d.updt_shot,0)),0)	")
			.query("                   from   mold_shot d where d.line_seqn < a.line_seqn and d.mold_idcd = a.mold_idcd)) as init_shot")
			.query("        , (ifnull(e.init_shot,0)+(select ifnull(sum(ifnull(d.work_shot,0)+ifnull(d.updt_shot,0)),0)	")
			.query("        from   mold_shot d where d.line_seqn < a.line_seqn and d.mold_idcd = a.mold_idcd)		")
			.query("        +(select (ifnull(work_shot,0)+ifnull(updt_shot,0) ) from mold_shot						")
			.query("                   where mold_idcd = a.mold_idcd and line_seqn = a.line_seqn))   as temp_totl_shot")
		;
		data.param //퀴리문
			.where("from     mold_shot a 																			")
			.where("         left outer join cvic_mast b on a.cvic_idcd = b.cvic_idcd								")
			.where("         left outer join item_mast c on a.item_idcd = c.item_idcd, mold_mast e					")
			.where("where		1=1																					")
			.where("and			a.mold_idcd = e.mold_idcd															")
			.where("and			a.mold_idcd = :mold_idcd        " , arg.getParameter("mold_idcd")					 )
			.where("order by	a.line_seqn																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		mold_shot a   																	")
			.where("where		1=1																				")
			.where("and			a.mold_idcd = :mold_idcd		" , arg.getParameter("mold_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_shot")
					.where("where mold_idcd	= :mold_idcd")
					.where("and   line_seqn	= :line_seqn")

					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("mold_shot")
					.where("where mold_idcd	= :mold_idcd" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("mold_idcd"				, row.fixParameter("mold_idcd"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("invc_date"				, row.getParameter("invc_date"))
					.update("invc_numb"				, row.getParameter("invc_numb"))
					.update("invc_seqn"				, row.getParameter("invc_seqn"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("cvic_idcd"				, row.getParameter("cvic_idcd"))
					.update("cavity"				, row.getParameter("cavity"))
					.update("init_shot"				, row.getParameter("init_shot"))
					.update("work_shot"				, row.getParameter("work_shot"))
					.update("updt_shot"				, row.getParameter("updt_shot"))
					.update("totl_shot"				, row.getParameter("temp_totl_shot"))

					.update("find_name"				, row.getParameter("mold_idcd")
													+ " "
													+ row.fixParameter("invc_date"))

					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
				data.execute();


				data.clear();
				data.param
				.table("mold_mast")
				.where("where mold_idcd	= :mold_idcd" )

				.unique("mold_idcd"				, row.fixParameter("mold_idcd"))

				.update("totl_shot"				, row.getParameter("totl_shot"))
				.update("mold_stat_dvcd"		, row.getParameter("mold_stat_dvcd"))

			;data.attach(Action.modify);
			data.execute();
			}
		}
		data.execute();
		return null ;
	}

}
