package com.sky.system.cust.cstmvist;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

import java.util.Arrays;


@Service
public class CstmVistService extends DefaultServiceHandler{

	// Master earch
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("optn_1"));
		temp.add(arg.getParamText("optn_2"));
		temp.add(arg.getParamText("optn_3"));
		temp.add(arg.getParamText("optn_4"));
		temp.add(arg.getParamText("optn_5"));
		temp.add(arg.getParamText("optn_6"));

		String x = "0";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "0";
				break;
			}else{
				x = "1";
			}
		}
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.query("from (																							")
			.query("select    a.cstm_idcd       , a.cstm_code        , a.cstm_dvcd        , a.rtil_stru_dvcd		")
			.query("        , a.cstm_name       , a.cstm_stnm_1fst   , a.cstm_stnm_2snd   , a.engl_name				")
			.query("        , a.engl_stnm       , a.engl_stnm_1fst   , a.engl_stnm_2snd   , a.mngt_bzpl_idcd		")
			.query("        , a.home_page_addr  , a.cstm_dsgn_trnt   , a.corp_dvcd        , a.buss_name				")
			.query("        , a.buss_numb       , a.buss_type        , a.buss_kind        , a.corp_numb				")
			.query("        , a.boss_name       , a.tele_numb        , a.tele_numb_2snd   , a.faxi_numb				")
			.query("        , a.hdph_numb       , a.spec_buss_numb   , a.mail_addr									")
			.query("        , a.ccrd_puch_yorn  , a.etbl_rpub_yorn   , a.sale_cstm_yorn   , a.expt_cstm_yorn		")
			.query("        , a.puch_cstm_yorn  , a.incm_cstm_yorn   , a.otod_cstm_yorn   , a.etcc_cstm_yorn		")
			.query("        , a.rpst_cstm_idcd  , a.blto_idcd_1fst   , a.blto_idcd_2snd   , a.scrt_sett_dvcd		")
			.query("        , a.scrt_sett_amnt  , a.scrt_offr_aman   , a.scrt_mltl        , a.crdt_bacd				")
			.query("        , a.crdt_lmit_amnt  , a.cnio_dvcd        , a.sale_drtr_idcd   , a.sale_dept_idcd		")
			.query("        , a.insp_kind_dvcd																		")
			.query("        , a.user_memo       , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.query("        , a.line_stat       , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("        , a.updt_ipad       , a.updt_dttm        , a.updt_idcd        , a.updt_urif				")
			.query("        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm        , a.crte_idcd				")
			.query("        , b.bzpl_name as mngt_bzpl_name															")
			.query("        , d.dept_name as sale_dept_name          , u.user_name as sale_drtr_name				")
			.query("from cstm_mast a																				")
			.query("left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd									")
			.query("left outer join dept_mast d on a.sale_dept_idcd = d.dept_idcd									")
			.query("left outer join bzpl_mast b on a.mngt_bzpl_idcd = b.bzpl_idcd									")
			.query("where 1=1																						")
			.query("and     1!=1																					")
			.query("or      a.sale_cstm_yorn  =:cstm1			" , "1", "on".equals(arg.getParamText("optn_1")))	//매출(체크O)
			.query("or      a.expt_cstm_yorn  =:cstm2			" , "1", "on".equals(arg.getParamText("optn_2")))	//수출(체크O)
			.query("or      a.puch_cstm_yorn  =:cstm3			" , "1", "on".equals(arg.getParamText("optn_3")))	//매입(체크O)
			.query("or      a.incm_cstm_yorn  =:cstm4			" , "1", "on".equals(arg.getParamText("optn_4")))	//수입(체크O)
			.query("or      a.otod_cstm_yorn  =:cstm5			" , "1", "on".equals(arg.getParamText("optn_5")))	//외주(체크O)
			.query("or      a.etcc_cstm_yorn  =:cstm6			" , "1", "on".equals(arg.getParamText("optn_6")))	//기타(체크O)
			.query("and     1=2									" , "1".equals(x))									//(체크X)
			.query("order by a.cstm_name, a.cstm_code																")
			.query(") a																								")
			.query("where   1=1																						")
			.query("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.query("and     substring(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("dt_gb")))
			.query("and     substring(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("dt_gb")))
			.query("and     substring(a.updt_dttm,1,8) >= :updt_dttm1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("dt_gb")))
			.query("and     substring(a.updt_dttm,1,8) <= :updt_dttm2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("dt_gb")))
			.query("and     a.mngt_bzpl_idcd  = :mngt_bzpl_idcd	" , arg.getParamText("mngt_bzpl_idcd" ))
			.query("and     a.lcls_idcd       = :lcls_idcd		" , arg.getParamText("lcls_idcd"      ))
			.query("and     a.mcls_idcd       = :mcls_idcd		" , arg.getParamText("mcls_idcd"      ))
			.query("and     a.scls_idcd       = :scls_idcd		" , arg.getParamText("scls_idcd"      ))
			.query("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"      ))
			.query("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
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
			.query("select    a.invc_numb       , a.cstm_idcd       , a.vist_date         , a.vist_empy_idcd		")
			.query("        , a.vist_purp_dvcd  , a.vist_recd       , a.vist_stat_dvcd    , a.dwup_date				")
			.query("        , a.dwup_time       , a.dwup_empy_idcd													")
			.query("        , a.user_memo       , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 			")
			.query("        , a.line_stat       , a.line_clos        , a.find_name        , a.updt_user_name		")
			.query("        , a.updt_ipad       , a.updt_dttm        , a.updt_idcd        , a.updt_urif				")
			.query("        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm        , a.crte_idcd				")
			.query("        , u1.user_name as vist_empy_name         , u2.user_name as dwup_empy_name				")
			.query("        , c.cstm_code       , c.cstm_name        , c.cstm_stnm_1fst								")
		;
		data.param //퀴리문
			.where("from cstm_vist_book a																			")
			.where("left outer join user_mast u1 on a.vist_empy_idcd = u1.user_idcd									")
			.where("left outer join user_mast u2 on a.dwup_empy_idcd = u2.user_idcd									")
			.where("left outer join cstm_mast c  on a.cstm_idcd      = c.cstm_idcd									")
			.where("where 1=1																						")
			.where("and   a.cstm_idcd = :cstm_idcd " , arg.getParameter("cstm_idcd"))
			.where("and   a.line_stat < :line_stat " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.vist_date																			")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// Master earch
	public SqlResultMap getListSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("optn_1"));
		temp.add(arg.getParamText("optn_2"));
		temp.add(arg.getParamText("optn_3"));
		temp.add(arg.getParamText("optn_4"));
		temp.add(arg.getParamText("optn_5"));
		temp.add(arg.getParamText("optn_6"));

		String x = "0";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "0";
				break;
			}else{
				x = "1";
			}
		}
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.cstm_idcd       , a.vist_date         , a.vist_empy_idcd				")
			.query("        , a.vist_purp_dvcd  , a.vist_recd       , a.vist_stat_dvcd    , a.dwup_date						")
			.query("        , a.dwup_time       , a.dwup_empy_idcd															")
			.query("        , a.user_memo       , a.sysm_memo        , a.prnt_idcd        , a.crte_urif 					")
			.query("        , a.line_stat       , a.line_clos        , a.find_name        , a.updt_user_name				")
			.query("        , a.updt_ipad       , a.updt_dttm        , a.updt_idcd        , a.updt_urif						")
			.query("        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm        , a.crte_idcd						")
			.query("        , u1.user_name as vist_empy_name         , u2.user_name as dwup_empy_name						")
			.query("        , c.cstm_code       , c.cstm_name        , c.cstm_stnm_1fst										")
		;
		data.param //퀴리문
			.where("from  cstm_vist_book a																					")
			.where("      left outer join user_mast u1 on a.vist_empy_idcd = u1.user_idcd									")
			.where("      left outer join user_mast u2 on a.dwup_empy_idcd = u2.user_idcd									")
			.where("      left outer join (																					")
			.where("                       select   a.cstm_idcd,	a.cstm_code,	a.cstm_name,	a.mngt_bzpl_idcd		")
			.where("                              , a.lcls_idcd,	a.mcls_idcd,	a.scls_idcd	,	a.cstm_stnm_1fst		")
			.where("                       from   cstm_mast a																")
			.where("                               left outer join bzpl_mast b on a.mngt_bzpl_idcd = b.bzpl_idcd			")
			.where("                       where  1 = 1																		")
			.where("                       and    1!=1																		")
			.where("                       or     a.sale_cstm_yorn =:cstm1	" , "1", "on".equals(arg.getParamText("optn_1")) )	//매출(체크O)
			.where("                       or     a.expt_cstm_yorn =:cstm2	" , "1", "on".equals(arg.getParamText("optn_2")) )	//수출(체크O)
			.where("                       or     a.puch_cstm_yorn =:cstm3	" , "1", "on".equals(arg.getParamText("optn_3")) )	//매입(체크O)
			.where("                       or     a.incm_cstm_yorn =:cstm4	" , "1", "on".equals(arg.getParamText("optn_4")) )	//수입(체크O)
			.where("                       or     a.otod_cstm_yorn =:cstm5	" , "1", "on".equals(arg.getParamText("optn_5")) )	//외주(체크O)
			.where("                       or     a.etcc_cstm_yorn =:cstm6	" , "1", "on".equals(arg.getParamText("optn_6")) )	//기타(체크O)
			.where("                       and    1 = 2						" , "1".equals(x))									//(체크X)			
			.where("                      ) c on c.cstm_idcd = a.cstm_idcd 													")
			.where("where 1 = 1																								")
			.where("and   a.find_name like %:find_name%			" , arg.getParamText("find_name"	  ))
			.where("and   a.cstm_idcd = :cstm_idcd  			" , arg.getParameter("cstm_idcd"	  ))
			.where("and   c.mngt_bzpl_idcd  = :mngt_bzpl_idcd	" , arg.getParamText("mngt_bzpl_idcd" ))
			.where("and   c.lcls_idcd       = :lcls_idcd		" , arg.getParamText("lcls_idcd"      ))
			.where("and   c.mcls_idcd       = :mcls_idcd		" , arg.getParamText("mcls_idcd"      ))
			.where("and   c.scls_idcd       = :scls_idcd		" , arg.getParamText("scls_idcd"      ))
			.where("and   substring(a.vist_date,1,8) >= :vist_date1	" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("dt_gb")))
			.where("and   substring(a.vist_date,1,8) <= :vist_date2	" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("dt_gb")))			
			.where("and   substring(a.dwup_date,1,8) >= :dwup_date	" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("dt_gb")))
			.where("and   substring(a.dwup_date,1,8) <= :dwup_date	" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("dt_gb")))
			.where("and   a.line_stat < 2																					")
			.where("and   c.cstm_idcd is not null 																			")
			.where("order by a.vist_date																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("cstm_vist_book")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("cstm_vist_book")

			.where("where invc_numb		= :invc_numb")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"))

			.update("cstm_idcd"				, arg.getParameter("cstm_idcd"))
			.update("vist_date"				, arg.getParameter("vist_date"))
			.update("vist_empy_idcd"		, arg.getParameter("vist_empy_idcd"))
			.update("vist_purp_dvcd"		, arg.getParameter("vist_purp_dvcd"))
			.update("vist_recd"				, arg.getParameter("vist_recd"))
			.update("vist_stat_dvcd"		, arg.getParameter("vist_stat_dvcd"))
			.update("dwup_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
			.update("dwup_time"				, new SimpleDateFormat("hhmmss").format(new Date()))
			.update("dwup_empy_idcd"		, arg.getParameter("dwup_empy_idcd"))

			.update("updt_idcd"				, arg.getParameter("updt_idcd"		))
			.insert("crte_idcd"				, arg.getParameter("crte_idcd"		))
			.update("updt_ipad"				, arg.remoteAddress )
			.insert("crte_ipad"				, arg.remoteAddress )
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;
		data.attach(rowaction);
		data.execute();
		data.clear();

		return null;
	}
}