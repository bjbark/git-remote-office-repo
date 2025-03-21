package com.sky.system.prod.basic.stndbopwork;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class StndBopWorkService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call project_bop_tree_v1 (				")
			.query("   :pjod_idcd "          ,  arg.getParamText("pjod_idcd"))
			.query("   , :work_ordr_dvcd "   ,  arg.getParamText("work_ordr_dvcd"))
			.query("   , :ordr_degr "        ,  arg.getParamText("ordr_degr"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}
	public SqlResultMap setBop(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = "";
		String standard = "";

		pjod_idcd = arg.getParamText("pjod_idcd");
		standard = arg.getParamText("standard");

		data.param
			.query("call project_bop_create_v1 (										")
			.query("     :pjod_idcd              " ,  pjod_idcd							 )
			.query("   , :standard               " ,  standard							 )
			.query("   , :work_ordr_dvcd         " ,  arg.getParamText("work_ordr_dvcd" ))
			.query("   , :ordr_degr              " ,  arg.getParamText("ordr_degr"		))
			.query(" ) 																	")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setBopWork(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String pjod_idcd = "";
		String st_dt = "";

		pjod_idcd = arg.getParamText("pjod_idcd");
		st_dt = arg.getParamText("st_dt");
		// 복사
		data.param
			.query("call project_bop_copy_v1 (				")
			.query("     :pjod_idcd              " ,  pjod_idcd							 )
			.query("   , :st_dt                  " ,  st_dt								 )
			.query("   , :work_ordr_dvcd         " ,  arg.getParamText("work_ordr_dvcd" ))
			.query("   , :ordr_degr              " ,  arg.getParamText("ordr_degr"		))
			.query("   , :crte_idcd              " ,  arg.getParameter("crte_idcd"		))
			.query(" ) 																	")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		// 승인해제
		data.param
			.table("pjod_mast")

			.where("where pjod_idcd = :pjod_idcd" )
			.unique("pjod_idcd"			, pjod_idcd)

			.update("prod_cofm_yorn"	, 0)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		// 이미지 복사
		data.param
			.query("update pjod_work_schd p											")
			.query("left outer join item_mast i on p.item_idcd = i.item_idcd		")
			.query("set   p.imge_1fst = i.item_imge									")
			.query("    , p.imge_2snd = i.item_imge2								")
			.query("where p.pjod_idcd = :pjod_idcd						 ", pjod_idcd)
		;
		data.attach(Action.direct);
		data.execute();
		return null;
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
	public SqlResultMap getDeli_date(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select    deli_date															")
	;
	data.param //퀴리문
		.where("from      pjod_mast															")
		.where("where     1=1																")
		.where("and       pjod_idcd = :pjod_idcd			" , arg.getParameter("pjod_idcd"))
	;
		return data.selectForMap();
	}
	public SqlResultMap getPrint(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_project_plan_copy(:invc_numb"    , arg.getParameter("invc_numb"))
			.query("                          , :plan_dvcd	)" , arg.getParameter("plan_dvcd"))
		;
		data.execute();
		return null;
	}
	public SqlResultMap setTree(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String used = row.getParamText("used_yorn");
			String i;
			if(used=="true"){
				i="1";
			}else{
				i="0";
			}
			data.param
				.table("pjod_bop")
				.where("where pjod_idcd = :pjod_idcd" )
				.where("and   line_seqn = :line_seqn" )
				.where("and   work_ordr_dvcd = :work_ordr_dvcd" )
				.where("and   ordr_degr = :ordr_degr" )
				.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))
				.unique("work_ordr_dvcd"	, row.fixParameter("work_ordr_dvcd"))
				.unique("ordr_degr"			, row.fixParameter("ordr_degr"))

				.update("used_yorn"				, i)

			;data.attach(rowaction);
		}
		data.execute();
		System.out.println(arg);
		return null;
	}
	public SqlResultMap getLookup(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String dvcd = arg.getParamText("dvcd");
		data.param
			.query("call pjod_popup_v1 (				")
			.query("     :work_ordr_dvcd "   ,  arg.getParamText("work_ordr_dvcd"))
		;
		System.out.println(arg.getParamText("find_name"));
		if(arg.getParamText("find_name").equals("")){
			data.param
				.query("   , ''  						")
			;
		}else{
			data.param
				.query("   , :find_name      "   ,  arg.getParamText("find_name"))
			;
		}
		if(dvcd.equals("")){
			data.param
				.query("   , '' " 							)
			;
		}else{
			data.param
				.query("   , :dvcd " , dvcd					)
			;
		}
		data.param
			.query(" ) 									")
		;
		return data.selectForMap();
	}
}
