package com.sky.system.custom.dehansol.cust.custmast;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("dehansol.cust.CustMastService")
public class CustMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

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
				x = "1";
				break;
			}
		}
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.cstm_idcd      , a.cstm_code      , a.rtil_stru_dvcd , a.cstm_name      ,a.cstm_stnm_1fst	")
			.where("      , a.cstm_stnm_2snd , a.engl_name      , a.engl_stnm      , a.engl_stnm_1fst ,a.engl_stnm_2snd	")
			.where("      , a.mail_addr      , a.cstm_dsgn_trnt , a.corp_dvcd      , a.tele_numb_2snd ,a.faxi_numb		")
			.where("      , a.home_page_addr , a.buss_numb      , a.corp_numb      , a.boss_name      ,a.tele_numb		")
			.where("      , a.spec_buss_numb , a.buss_type      , a.buss_kind											")
			.where("      , if(a.etcc_cstm_yorn='' or a.etcc_cstm_yorn is null,0,a.etcc_cstm_yorn) as etcc_cstm_yorn	")
			.where("      , if(a.sale_cstm_yorn='' or a.sale_cstm_yorn is null,0,a.sale_cstm_yorn) as sale_cstm_yorn	")
			.where("      , if(a.otod_cstm_yorn='' or a.otod_cstm_yorn is null,0,a.otod_cstm_yorn) as otod_cstm_yorn	")
			.where("      , if(a.puch_cstm_yorn='' or a.puch_cstm_yorn is null,0,a.puch_cstm_yorn) as puch_cstm_yorn	")
			.where("      , a.incm_cstm_yorn , a.rpst_cstm_idcd , a.blto_idcd_1fst , a.blto_idcd_2snd ,a.scrt_sett_dvcd	")
			.where("      , a.scrt_sett_amnt , a.crdt_bacd      , a.cnio_dvcd      , a.sale_drtr_idcd ,a.sale_dept_idcd	")
			.where("      , a.insp_kind_dvcd , a.hdph_numb      , a.buss_name      , a.scrt_offr_aman ,a.crdt_lmit_amnt	")
			.where("      , a.scrt_mltl      , a.ccrd_puch_yorn , a.etbl_rpub_yorn , a.expt_cstm_yorn					")
			.where("      , a.lcls_idcd      , a.mcls_idcd      ,a.scls_idcd       , a.pric_dvcd						")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      ,a.line_levl							")
			.where("      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name      ,a.updt_user_name	")
			.where("      , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      ,a.crte_user_name	")
			.where("      , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif						")
			.where("      , a.mngt_bzpl_idcd , a.cstm_dvcd      , a.favo_numb      , ifnull(a.favo_numb,99999) as ordr_seqn	")
			.where("      , d.dept_name as sale_dept_name       , u.user_name as sale_drtr_name							")
			.where("      , b.bzpl_name as mngt_bzpl_name																")
			.where("      , z.base_name as crdt_name																	")
			.where("      , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name			")
			.where("      , c.cstm_name as blto_idcd_1fst_name															")
			.where("      , e.post_code      , e.addr_1fst      , e.addr_2snd      , e.addr_engl_1fst , e.addr_engl_2snd")
			.where("      , e.line_seqn as addr_seqn            , e.base_addr_engl										")
			.where("      , ifnull(c3.clss_desc,ifnull(c2.clss_desc,ifnull(c1.clss_desc,null))) as clss_desc			")
			.where("      , p.file_name																					")
			.where("      , REPLACE(json_extract(a.json_data, '$.acpt_typl_char'),'\"','') as 	acpt_typl_char			")
			.where("      , json_value(a.json_data,'$.hdco_idcd' ) as hdco_idcd											")
			.where("      , json_value(a.json_data,'$.smpl_ostt_yorn' ) as smpl_ostt_yorn								")
			.where("      , json_value(a.json_data,'$.vatx_dvcd' ) as vatx_dvcd											")
			.where("      , (select hdco_name from hdco_mast where hdco_idcd = json_value(a.json_data,' $.hdco_idcd')) as hdco_name ")
			.where("from    cstm_mast a																					")
			.where("        left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd								")
			.where("        left outer join dept_mast d on u.dept_idcd = d.dept_idcd									")
			.where("        left outer join bzpl_mast b on a.mngt_bzpl_idcd = b.bzpl_idcd								")
			.where("        left outer join base_mast z on a.crdt_bacd = z.base_code and z.prnt_idcd = '1103'			")
			.where("        left outer join cstm_clss c1 on a.lcls_idcd = c1.clss_idcd									")
			.where("        left outer join cstm_clss c2 on a.mcls_idcd = c2.clss_idcd									")
			.where("        left outer join cstm_clss c3 on a.scls_idcd = c3.clss_idcd									")
			.where("        left outer join cstm_mast c on a.blto_idcd_1fst = c.cstm_idcd								")
			.where("        left outer join cstm_addr e on a.cstm_idcd = e.cstm_idcd									")
			.where("        left outer join (select * from apnd_file where file_dvcd_1fst  ='1000' and orgn_dvcd ='cstm_mast' ")
			.where("        ) p on a.cstm_idcd = p.invc_numb															")
			.where("where   1=1																							")
			.where("and   ( 0=:x	", x																				 )
			.where("    or  a.sale_cstm_yorn  =:cstm1				" , "1", "on".equals(arg.getParamText("optn_1")))	//매출(체크O)
			.where("    or  a.expt_cstm_yorn  =:cstm2				" , "1", "on".equals(arg.getParamText("optn_2")))	//수출(체크O)
			.where("    or  a.puch_cstm_yorn  =:cstm3				" , "1", "on".equals(arg.getParamText("optn_3")))	//매입(체크O)
			.where("    or  a.incm_cstm_yorn  =:cstm4				" , "1", "on".equals(arg.getParamText("optn_4")))	//수입(체크O)
			.where("    or  a.otod_cstm_yorn  =:cstm5				" , "1", "on".equals(arg.getParamText("optn_5")))	//외주(체크O)
			.where("    or  a.etcc_cstm_yorn  =:cstm6				" , "1", "on".equals(arg.getParamText("optn_6")))	//기타(체크O)
			.where(" )																									")
			.where(") a																									")
			.where("where   1=1																							")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     substring(a.crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("dt_gb")))
			.where("and     substring(a.crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("dt_gb")))
			.where("and     substring(a.updt_dttm,1,8) >= :updt_dttm1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("dt_gb")))
			.where("and     substring(a.updt_dttm,1,8) <= :updt_dttm2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("dt_gb")))
			.where("and     a.mngt_bzpl_idcd  = :mngt_bzpl_idcd	" , arg.getParamText("mngt_bzpl_idcd" ))
			.where("and     a.lcls_idcd       = :lcls_idcd		" , arg.getParamText("lcls_idcd"      ))
			.where("and     a.mcls_idcd       = :mcls_idcd		" , arg.getParamText("mcls_idcd"      ))
			.where("and     a.scls_idcd       = :scls_idcd		" , arg.getParamText("scls_idcd"      ))
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"      ))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by case when ifnull(a.favo_numb,99999)=0 then 99999 else ifnull(a.favo_numb,99999) end asc, a.cstm_code asc ")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.*																							")
		;
		data.param //퀴리문
			.where("from																								")
			.where("( select a.cstm_idcd      , a.cstm_code      , a.rtil_stru_dvcd , a.cstm_name      ,a.cstm_stnm_1fst	")
			.where("      , a.cstm_stnm_2snd , a.engl_name      , a.engl_stnm      , a.engl_stnm_1fst ,a.engl_stnm_2snd	")
			.where("      , a.mail_addr      , a.cstm_dsgn_trnt , a.corp_dvcd      , a.tele_numb_2snd ,a.faxi_numb		")
			.where("      , a.home_page_addr , a.buss_numb      , a.corp_numb      , a.boss_name      ,a.tele_numb		")
			.where("      , a.spec_buss_numb , a.buss_type      , a.buss_kind      ,a.etcc_cstm_yorn					")
			.where("      , a.ccrd_puch_yorn , a.etbl_rpub_yorn , a.sale_cstm_yorn , a.expt_cstm_yorn ,a.puch_cstm_yorn	")
			.where("      , a.incm_cstm_yorn , a.rpst_cstm_idcd , a.blto_idcd_1fst , a.blto_idcd_2snd ,a.scrt_sett_dvcd	")
			.where("      , a.scrt_sett_amnt , a.crdt_bacd      , a.cnio_dvcd      , a.sale_drtr_idcd ,a.sale_dept_idcd	")
			.where("      , a.mngt_bzpl_idcd , a.cstm_dvcd      														")
			.where("      , a.insp_kind_dvcd , a.hdph_numb      , a.buss_name      , a.scrt_offr_aman ,a.crdt_lmit_amnt	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl						")
			.where("      , d.dept_name as sale_dept_name       , u.user_name as sale_drtr_name							")
			.where("      , c1.clss_name as lcls_name , c2.clss_name as mcls_name  , c3.clss_name as scls_name			")
			.where("      , cd.dlvy_tele_numb, cd.dlvy_zpcd     , cd.dlvy_addr_1fst, cd.dlvy_addr_2snd					")
			.where("      , max(cd.line_seqn) as line_seqn2     , cd.line_seqn as dlvy_line_seqn						")
			.where("      , json_value(a.json_data,'$.pper_cstm_yorn' ) as pper_cstm_yorn								")
			.where("      , json_value(a.json_data,'$.fabc_cstm_yorn' ) as fabc_cstm_yorn 								")
			.where("      , json_value(a.json_data,'$.mani_cstm_yorn' ) as mani_cstm_yorn 								")
			.where("      , json_value(a.json_data,'$.asmt_cstm_yorn' ) as asmt_cstm_yorn 								")
			.where("      , json_value(a.json_data,'$.otod_cstm_yorn' ) as otod_cstm_yorn								")
			.where("      , json_value(a.json_data,'$.gods_cstm_yorn' ) as gods_cstm_yorn								")
			.where("      , json_value(a.json_data,'$.vatx_dvcd' ) as vatx_dvcd											")
			.where("      , ad.post_code     , ad.addr_1fst     , ad.addr_2snd											")
			.where("from    cstm_mast a																					")
			.where("        left outer join ( select  cd.cstm_idcd       , cd.dlvy_tele_numb   , cd.dlvy_zpcd			")
			.where("                                , cd.dlvy_addr_1fst  , cd.dlvy_addr_2snd   , cd.line_seqn			")
			.where("                                , max(cd.line_seqn) as line_seqn2  , cd.line_seqn as dlvy_line_seqn	")
			.where("                          from cstm_deli		cd													")
			.where("                          group by cd.dlvy_cstm_idcd												")
			.where("                              )  cd on cd.cstm_idcd = a.cstm_idcd									")
			.where("        left outer join dept_mast d on a.sale_dept_idcd = d.dept_idcd								")
			.where("        left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd								")
			.where("        left outer join bzpl_mast b on a.mngt_bzpl_idcd = b.bzpl_idcd								")
			.where("        left outer join cstm_clss c1 on a.lcls_idcd = c1.clss_idcd									")
			.where("        left outer join cstm_clss c2 on a.mcls_idcd = c2.clss_idcd									")
			.where("        left outer join cstm_clss c3 on a.scls_idcd = c3.clss_idcd									")
			.where("        left outer join cstm_addr ad on a.cstm_idcd = ad.cstm_idcd									")
			.where("where	1=1																							")
		;
		data.param
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and     a.lcls_idcd       = :lcls_idcd		" , arg.getParamText("lcls_idcd" )      , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and     a.mcls_idcd       = :mcls_idcd		" , arg.getParamText("mcls_idcd" )      , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and     a.scls_idcd       = :scls_idcd		" , arg.getParamText("scls_idcd" )      , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     a.sale_cstm_yorn  = :sale_cstm_yorn	" , arg.getParamText("sale_cstm_yorn" ) , !"".equals(arg.getParamText("sale_cstm_yorn" )) )
			.where("and     a.puch_cstm_yorn  = :puch_cstm_yorn	" , arg.getParamText("puch_cstm_yorn" ) , !"".equals(arg.getParamText("puch_cstm_yorn" )) )
			.where("and     a.otod_cstm_yorn  = :otod_cstm_yorn	" , arg.getParamText("otod_cstm_yorn" ) , !"".equals(arg.getParamText("otod_cstm_yorn" )) )
			.where("and     a.etcc_cstm_yorn  = :etcc_cstm_yorn	" , arg.getParamText("etcc_cstm_yorn" ) , !"".equals(arg.getParamText("etcc_cstm_yorn" )) )
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("GROUP BY a.cstm_idcd																								")
			.where("order by case when ifnull(a.favo_numb,99999)=0 then 99999 else ifnull(a.favo_numb,99999) end asc, a.cstm_code asc	")
			.where(") a	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}

	public SqlResultMap getLookup3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (select																						")
			.where("        a.cstm_idcd      , a.cstm_code      , a.rtil_stru_dvcd , a.cstm_name      ,a.cstm_stnm_1fst	")
			.where("      , a.cstm_stnm_2snd , a.engl_name      , a.engl_stnm      , a.engl_stnm_1fst ,a.engl_stnm_2snd	")
			.where("      , a.mail_addr      , a.cstm_dsgn_trnt , a.corp_dvcd      , a.tele_numb_2snd ,a.faxi_numb		")
			.where("      , a.home_page_addr , a.buss_numb      , a.corp_numb      , a.boss_name      ,a.tele_numb		")
			.where("      , a.spec_buss_numb , a.buss_type      , a.buss_kind      ,a.etcc_cstm_yorn					")
			.where("      , a.ccrd_puch_yorn , a.etbl_rpub_yorn , a.sale_cstm_yorn , a.expt_cstm_yorn ,a.puch_cstm_yorn	")
			.where("      , a.incm_cstm_yorn , a.rpst_cstm_idcd , a.blto_idcd_1fst , a.blto_idcd_2snd ,a.scrt_sett_dvcd	")
			.where("      , a.scrt_sett_amnt , a.crdt_bacd      , a.cnio_dvcd      , a.sale_drtr_idcd ,a.sale_dept_idcd	")
			.where("      , a.mngt_bzpl_idcd , a.cstm_dvcd      , a.otod_cstm_yorn										")
			.where("      , a.insp_kind_dvcd , a.hdph_numb      , a.buss_name      , a.scrt_offr_aman ,a.crdt_lmit_amnt	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl						")
			.where("      , d.dept_name as sale_dept_name       , u.user_name as sale_drtr_name							")
			.where("      , c1.clss_name as lcls_name , c2.clss_name as mcls_name  , c3.clss_name as scls_name			")
			.where("      , cd.dlvy_tele_numb, cd.dlvy_zpcd     , cd.dlvy_addr_1fst, cd.dlvy_addr_2snd					")
			.where("      , max(cd.line_seqn) as line_seqn2     , cd.line_seqn as dlvy_line_seqn						")
			.where("      , json_value( a.json_data , '$**.acpt_typl_char') as acpt_typl_char							")
		;
		data.param //퀴리문
			.where("from    cstm_mast a																					")
			.where("        left outer join cstm_deli cd on a.cstm_idcd = cd.cstm_idcd									")
			.where("        left outer join dept_mast d on a.sale_dept_idcd = d.dept_idcd								")
			.where("        left outer join user_mast u on a.sale_drtr_idcd = u.user_idcd								")
			.where("        left outer join bzpl_mast b on a.mngt_bzpl_idcd = b.bzpl_idcd								")
			.where("        left outer join cstm_clss c1 on a.lcls_idcd = c1.clss_idcd									")
			.where("        left outer join cstm_clss c2 on a.mcls_idcd = c2.clss_idcd									")
			.where("        left outer join cstm_clss c3 on a.scls_idcd = c3.clss_idcd									")
			.where("where	1=1																							")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("and     a.lcls_idcd       = :lcls_idcd		" , arg.getParamText("lcls_idcd" )      , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and     a.mcls_idcd       = :mcls_idcd		" , arg.getParamText("mcls_idcd" )      , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and     a.scls_idcd       = :scls_idcd		" , arg.getParamText("scls_idcd" )      , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     a.sale_cstm_yorn  = :sale_cstm_yorn	" , arg.getParamText("sale_cstm_yorn" ) , !"".equals(arg.getParamText("sale_cstm_yorn" )) )
			.where("and     a.puch_cstm_yorn  = :puch_cstm_yorn	" , arg.getParamText("puch_cstm_yorn" ) , !"".equals(arg.getParamText("puch_cstm_yorn" )) )
			.where("and     a.otod_cstm_yorn  = :otod_cstm_yorn	" , arg.getParamText("otod_cstm_yorn" ) , !"".equals(arg.getParamText("otod_cstm_yorn" )) )
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		data.param
			.where("GROUP BY a.cstm_idcd																									")
			.where("order by case when ifnull(a.favo_numb,99999)=0 then 99999 else ifnull(a.favo_numb,99999) end asc, a.cstm_code asc	) a")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업2
	public SqlResultMap getLookup2(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select	count(*) as result																				")
		;
		data.param //퀴리문
			.where("from    cstm_bond_init a																					")
			.where("where	1=1																							")
			.where("and     a.cstm_idcd       = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and     a.trns_yymm       = :trns_yymm		" , arg.getParamText("trns_yymm" ))
			.where("and     a.bond_dvcd      = :bond_dvcd	" , arg.getParamText("dvcd" ))
			.where("and     a.line_stat       < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	//배송지
	public SqlResultMap getCstm_Deli(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd       , a.dlvy_drtr_name , a.trnt_mean_dvcd , a.dlvy_tele_numb	")
			.query("      , a.dlvy_hdph_numb  , a.dlvy_faxi_numb , a.dlvy_mail_addr , a.dlvy_zpcd		")
			.query("      , a.dlvy_addr_1fst  , a.dlvy_addr_2snd , a.dlvy_remk_text , a.dlvy_lcal_dvcd	")
			.query("      , a.rpst_dlvy_yorn  , a.dlvy_cstm_idcd , a.dely_cstm_name						")
		;
		data.param //퀴리문
			.where("from    cstm_deli a																	")
			.where("where	1=1																			")
			.where("and     a.cstm_idcd       = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
			.where("order by a.cstm_idcd																")
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	//배송지 추가 등록
	public SqlResultMap setDeliveryAddress(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.table("cstm_deli"													)
				.where("where dlvy_cstm_idcd		= :dlvy_cstm_idcd				")  /*   납품처ID  */
				.unique("dlvy_cstm_idcd"	, arg.fixParameter("dlvy_cstm_idcd"		 ))

				.update("line_seqn"			, arg.fixParameter("line_seqn"      	 ))  /*  순번  */
				.update("cstm_idcd"			, arg.fixParameter("cstm_idcd"    		 ))  /*  거래처ID  */
				.update("dely_cstm_name"	, arg.getParameter("dely_cstm_name"      ))  /*  납품처명  */
				.update("dlvy_drtr_name"	, arg.getParameter("dlvy_drtr_name"      ))  /*  납품담당자명  */
				.update("dlvy_addr_1fst"	, arg.getParameter("dlvy_addr_1fst"      ))  /*  배송주소1  */
				.update("dlvy_tele_numb"	, arg.getParameter("dlvy_tele_numb"      ))  /*  전화번호  */
				.update("find_name"        , arg.getParameter("cstm_idcd")
											 +" "
											 +arg.getParameter("dely_cstm_name"))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		return null ;
	}

	//룩업2
	public SqlResultMap getBuss_numb(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select	count(*) as result																		")
		;
		data.param //퀴리문
		.where("from    cstm_mast a																				")
		.where("where	a.buss_numb       = :buss_numb		" , arg.getParamText("buss_numb" ))
		.where("and     a.line_stat       < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap();
	}
	public SqlResultMap getbox_cstm_idcd(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call box_cstm_idcd_seqn()")
		;
		return data.selectForMap();
	}
	public SqlResultMap getIsos(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call book_list ( :param",arg.fixParameter("param"))
			.query(")")
		;
		return data.selectForMap();
	}
	public SqlResultMap getRett(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String cstm_idcd	= arg.getParamText("cstm_idcd") ;
		String fr_date		= " ";
		String to_date		= " ";
		String item_idcd	= " ";
		/*
		data.param
			.query("call goods_rett (			")
			.query("   :item_idcd	"  , item_idcd	)  //
			.query(" , :fr_date		"  , fr_date	)  //
			.query(" , :to_date		"  , to_date	)  //
			.query(" , :cstm_idcd	"  , cstm_idcd	)  //
			.query(" ) 								")
		;
		*/
		data.param
			.query("call goods_rett (			")
			.query("   :cstm_idcd	"  , cstm_idcd	)  //
			.query(" , ''	")  //
			.query(" , ''	")  //
			.query(" , ''	")  //
			.query(" ) 		")
		;
		SqlResultMap info = data.selectForMap();
		return info;
	}


	public SqlResultMap getOrder(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																								")
			.query("         a.invc_date      , a.invc_numb      , i.item_name      , i.item_spec      , b.line_seqn	")
			.query("       , d.tick_valu      , b.invc_qntt      , b.unit_idcd      , b.invc_pric      					")
			.query("       , s.ostt_date      , s.ostt_qntt      , b.user_memo      , s.ttsm_amnt						")
			.query("       , bs.base_name   as item_clss_bacd_name														")
		;
		data.param
			.where("from    acpt_mast a																					")
			.where("        left outer join acpt_item b on a.invc_numb = b.invc_numb									")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("        left outer join item_mast i on b.item_idcd = i.item_idcd									")
			.where("        left outer join item_desc d on i.item_idcd = d.item_idcd									")
			.where("        left outer join spts_item s on b.invc_numb = s.acpt_numb and b.line_seqn = s.acpt_seqn		")
			.where("        left outer join item_desc h on b.item_idcd = h.item_idcd and h.line_seqn = 1				")
			.where("        left outer join base_mast bs on h.item_clss_bacd = bs.base_code and bs.prnt_idcd = '8001'	")
			.where("where	1=1																							")
			.where("and     c.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd") )
			.where("and     i.item_name   like %:item_name%" , arg.getParameter("item_name"))
			.where("and     i.item_spec   like %:item_spec%" , arg.getParamText("item_spec") )
			.where("and     bs.base_name  like %:base_name%" , arg.getParameter("item_clss_bacd_name"))
			.where("and     a.line_stat       < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_date desc																			")
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setAdd(HttpRequestArgument arg) throws Exception { // TODO
		DataMessage data = arg.newStorage("POS");
		String acct_bacd = "";
		String hq = "";
//		float item_tick = 0;
//		float item_leng = 0;
//		float item_widh = 0;

		ParamToJson trans = new ParamToJson();
//		String json = trans.TranslateRow(arg, row, "cstm_mast_json_fields");

		data.param
		.table("cstm_mast"													)
		.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
		//
		.unique("cstm_idcd"			, arg.fixParameter("cstm_idcd"			))
		//
		.update("cstm_code"			, arg.getParameter("cstm_code"           ))  /*  거래처코드  */
		.update("rtil_stru_dvcd"	, arg.getParameter("rtil_stru_dvcd"      ))  /*  유통구조구분코드  */
		.update("cstm_name"			, arg.getParameter("cstm_name"           ))  /*  거래처명  */
		.update("cstm_dvcd"			, arg.getParameter("cstm_dvcd"           ))  /*  거래처명  */
		.update("mngt_bzpl_idcd"	, arg.getParameter("mngt_bzpl_idcd"      ))  /*  관리사업장 */
		.update("cstm_stnm_1fst"	, arg.getParameter("cstm_stnm_1fst"      ))  /*  거래처약칭1  */
		.update("cstm_stnm_2snd"	, arg.getParameter("cstm_stnm_2snd"      ))  /*  거래처약칭2  */
		.update("engl_name"			, arg.getParameter("engl_name"           ))  /*  영문명  */
		.update("engl_stnm"			, arg.getParameter("engl_stnm"           ))  /*  영문약칭  */
		.update("engl_stnm_1fst"	, arg.getParameter("engl_stnm_1fst"      ))  /*  영문약칭1  */
		.update("engl_stnm_2snd"	, arg.getParameter("engl_stnm_2snd"      ))  /*  영문약칭2  */
		.update("cstm_dsgn_trnt"	, arg.getParameter("cstm_dsgn_trnt"      ))  /*  고객지정운송  */
		.update("corp_dvcd"			, arg.getParameter("corp_dvcd"           ))  /*  법인구분코드  */
		.update("tele_numb_2snd"	, arg.getParameter("tele_numb_2snd"      ))  /*  전화번호2  */
		.update("faxi_numb"			, arg.getParameter("faxi_numb"           ))  /*  팩스번호  */
		.update("hdph_numb"			, arg.getParameter("hdph_numb"           ))  /*  휴대폰번호 */
		.update("home_page_addr"	, arg.getParameter("home_page_addr"      ))  /*  홈페이지주소  */
		.update("buss_name"			, arg.getParameter("buss_name"           ))  /*  사업자명  */
		.update("buss_numb"			, arg.getParameter("buss_numb"           ))  /*  사업자등록번호  */
		.update("corp_numb"			, arg.getParameter("corp_numb"           ))  /*  법인번호  */
		.update("boss_name"			, arg.getParameter("boss_name"           ))  /*  대표자명  */
		.update("tele_numb"			, arg.getParameter("tele_numb"           ))  /*  전화번호  */
		.update("spec_buss_numb"	, arg.getParameter("spec_buss_numb"      ))  /*  종사업자등록번호  */
		.update("buss_type"			, arg.getParameter("buss_type"           ))  /*  업태  */
		.update("buss_kind"			, arg.getParameter("buss_kind"           ))  /*  업종  */
		.update("lcls_idcd"			, arg.getParameter("lcls_idcd"			))
		.update("mcls_idcd"			, arg.getParameter("mcls_idcd"			))
		.update("scls_idcd"			, arg.getParameter("scls_idcd"			))
		.update("mail_addr"			, arg.getParameter("mail_addr"           ))  /*  이메일주소  */
		.update("etcc_cstm_yorn"	, arg.getParameter("etcc_cstm_yorn"      ))  /*  기타거래처여부  */
		.update("ccrd_puch_yorn"	, arg.getParameter("ccrd_puch_yorn"      ))  /*  신용카드매입여부  */
		.update("etbl_rpub_yorn"	, arg.getParameter("etbl_rpub_yorn"      ))  /*  전자세금계산서역발행여부  */
		.update("sale_cstm_yorn"	, arg.getParameter("sale_cstm_yorn"      ))  /*  매출거래처여부  */
		.update("expt_cstm_yorn"	, arg.getParameter("expt_cstm_yorn"      ))  /*  수출거래처여부  */
		.update("puch_cstm_yorn"	, arg.getParameter("puch_cstm_yorn"      ))  /*  매입거래처여부  */
		.update("incm_cstm_yorn"	, arg.getParameter("incm_cstm_yorn"      ))  /*  수입거래처여부  */
		.update("otod_cstm_yorn"	, arg.getParameter("otod_cstm_yorn"      ))  /*  외주거래처여부  */
		.update("rpst_cstm_idcd"	, arg.getParameter("rpst_cstm_idcd"      ))  /*  대표거래처ID  */
		.update("blto_idcd_1fst"	, arg.getParameter("blto_idcd_1fst"      ))  /*  청구처ID1  */
		.update("blto_idcd_2snd"	, arg.getParameter("blto_idcd_2snd"      ))  /*  청구처ID2  */
		.update("scrt_sett_dvcd"	, arg.getParameter("scrt_sett_dvcd"      ))  /*  담보설정여부  */
		.update("scrt_sett_amnt"	, arg.getParameter("scrt_sett_amnt"      ))  /*  담보설정금액  */
		.update("scrt_offr_aman"	, arg.getParameter("scrt_offr_aman"      ))  /*  담보제공자 */
		.update("crdt_lmit_amnt"	, arg.getParameter("crdt_lmit_amnt"      ))  /*  여신한도금액 */
		.update("scrt_mltl"			, arg.getParameter("scrt_mltl"           ))  /*  담보물건  */
		.update("crdt_bacd"			, arg.getParameter("crdt_bacd"           ))  /*  신용등급  */
		.update("cnio_dvcd"			, arg.getParameter("cnio_dvcd"           ))  /*  국내외구분코드  */
		.update("pric_dvcd"			, arg.getParameter("pric_dvcd"           ))  /*  단가구분코드  */
		.update("sale_drtr_idcd"	, arg.getParameter("sale_drtr_idcd"      ))  /*  영업담당자ID  */
		.update("sale_dept_idcd"	, arg.getParameter("sale_dept_idcd"      ))  /*  영업부서ID  */
		.update("insp_kind_dvcd"	, arg.getParameter("insp_kind_dvcd"      ))  /*  검사종류구분코드  */
		.update("find_name"			, arg.getParamText("cstm_code"           ).trim()
												+ " "
												+ arg.getParamText("cstm_name"            ).trim() )
	;

//	if(!arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
//		data.param
//			.update("json_data"			, json)  /*  JSONDATA  */
//		;
		data.attach(Action.insert);
		data.execute();
		data.clear();

		return null;
		}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			int favo = 0;
			if(!row.getParamText("favo_numb").equals("")){
				favo = Integer.parseInt(row.getParamText("favo_numb"));
			}


			if (rowaction == Action.delete) {
				data.param
					.table("cstm_mast"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				ParamToJson trans = new ParamToJson();
				String json = trans.TranslateRow(arg, row, "cstm_mast_json_fields");

				data.param
					.table("cstm_mast"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					//
					.update("cstm_code"			, row.getParameter("cstm_code"           ))  /*  거래처코드  */
					.update("rtil_stru_dvcd"	, row.getParameter("rtil_stru_dvcd"      ))  /*  유통구조구분코드  */
					.update("cstm_name"			, row.getParameter("cstm_name"           ))  /*  거래처명  */
					.update("cstm_dvcd"			, row.getParameter("cstm_dvcd"           ))  /*  거래처명  */
					.update("mngt_bzpl_idcd"	, row.getParameter("mngt_bzpl_idcd"      ))  /*  관리사업장 */
					.update("cstm_stnm_1fst"	, row.getParameter("cstm_stnm_1fst"      ))  /*  거래처약칭1  */
					.update("cstm_stnm_2snd"	, row.getParameter("cstm_stnm_2snd"      ))  /*  거래처약칭2  */
					.update("engl_name"			, row.getParameter("engl_name"           ))  /*  영문명  */
					.update("engl_stnm"			, row.getParameter("engl_stnm"           ))  /*  영문약칭  */
					.update("engl_stnm_1fst"	, row.getParameter("engl_stnm_1fst"      ))  /*  영문약칭1  */
					.update("engl_stnm_2snd"	, row.getParameter("engl_stnm_2snd"      ))  /*  영문약칭2  */
					.update("cstm_dsgn_trnt"	, row.getParameter("cstm_dsgn_trnt"      ))  /*  고객지정운송  */
					.update("corp_dvcd"			, row.getParameter("corp_dvcd"           ))  /*  법인구분코드  */
					.update("tele_numb_2snd"	, row.getParameter("tele_numb_2snd"      ))  /*  전화번호2  */
					.update("faxi_numb"			, row.getParameter("faxi_numb"           ))  /*  팩스번호  */
					.update("hdph_numb"			, row.getParameter("hdph_numb"           ))  /*  휴대폰번호 */
					.update("home_page_addr"	, row.getParameter("home_page_addr"      ))  /*  홈페이지주소  */
					.update("buss_name"			, row.getParameter("buss_name"           ))  /*  사업자명  */
					.update("buss_numb"			, row.getParameter("buss_numb"           ))  /*  사업자등록번호  */
					.update("corp_numb"			, row.getParameter("corp_numb"           ))  /*  법인번호  */
					.update("boss_name"			, row.getParameter("boss_name"           ))  /*  대표자명  */
					.update("tele_numb"			, row.getParameter("tele_numb"           ))  /*  전화번호  */
					.update("spec_buss_numb"	, row.getParameter("spec_buss_numb"      ))  /*  종사업자등록번호  */
					.update("buss_type"			, row.getParameter("buss_type"           ))  /*  업태  */
					.update("buss_kind"			, row.getParameter("buss_kind"           ))  /*  업종  */
					.update("lcls_idcd"			, row.getParameter("lcls_idcd"			))
					.update("mcls_idcd"			, row.getParameter("mcls_idcd"			))
					.update("scls_idcd"			, row.getParameter("scls_idcd"			))
					.update("mail_addr"			, row.getParameter("mail_addr"           ))  /*  이메일주소  */
					.update("etcc_cstm_yorn"	, row.getParameter("etcc_cstm_yorn"      ))  /*  기타거래처여부  */
					.update("ccrd_puch_yorn"	, row.getParameter("ccrd_puch_yorn"      ))  /*  신용카드매입여부  */
					.update("etbl_rpub_yorn"	, row.getParameter("etbl_rpub_yorn"      ))  /*  전자세금계산서역발행여부  */
					.update("sale_cstm_yorn"	, row.getParameter("sale_cstm_yorn"      ))  /*  매출거래처여부  */
					.update("expt_cstm_yorn"	, row.getParameter("expt_cstm_yorn"      ))  /*  수출거래처여부  */
					.update("puch_cstm_yorn"	, row.getParameter("puch_cstm_yorn"      ))  /*  매입거래처여부  */
					.update("incm_cstm_yorn"	, row.getParameter("incm_cstm_yorn"      ))  /*  수입거래처여부  */
					.update("otod_cstm_yorn"	, row.getParameter("otod_cstm_yorn"      ))  /*  외주거래처여부  */
					.update("rpst_cstm_idcd"	, row.getParameter("rpst_cstm_idcd"      ))  /*  대표거래처ID  */
					.update("blto_idcd_1fst"	, row.getParameter("blto_idcd_1fst"      ))  /*  청구처ID1  */
					.update("blto_idcd_2snd"	, row.getParameter("blto_idcd_2snd"      ))  /*  청구처ID2  */
					.update("scrt_sett_dvcd"	, row.getParameter("scrt_sett_dvcd"      ))  /*  담보설정여부  */
					.update("scrt_sett_amnt"	, row.getParameter("scrt_sett_amnt"      ))  /*  담보설정금액  */
					.update("scrt_offr_aman"	, row.getParameter("scrt_offr_aman"      ))  /*  담보제공자 */
					.update("crdt_lmit_amnt"	, row.getParameter("crdt_lmit_amnt"      ))  /*  여신한도금액 */
					.update("scrt_mltl"			, row.getParameter("scrt_mltl"           ))  /*  담보물건  */
					.update("crdt_bacd"			, row.getParameter("crdt_bacd"           ))  /*  신용등급  */
					.update("cnio_dvcd"			, row.getParameter("cnio_dvcd"           ))  /*  국내외구분코드  */
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"           ))  /*  단가구분코드  */
					.update("sale_drtr_idcd"	, row.getParameter("sale_drtr_idcd"      ))  /*  영업담당자ID  */
					.update("sale_dept_idcd"	, row.getParameter("sale_dept_idcd"      ))  /*  영업부서ID  */
					.update("insp_kind_dvcd"	, row.getParameter("insp_kind_dvcd"      ))  /*  검사종류구분코드  */
				;

				if(!row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
					data.param
						.update("json_data"			, json)  /*  JSONDATA  */
					;
				} else {
					// 2022.02.11 - 이강훈  - 삼정향료 JSON애서 변경된 항목만 수정되도록 처리
					if (rowaction == Action.update) {
						data.param
							.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.vatx_dvcd', '$.smpl_ostt_yorn'), '" + json + "')")
						;
					} else {
						data.param
							.update("json_data"		, json)
						;
					}
				}

				if(favo!=0){
					data.param
						.update("favo_numb"			, favo)  /*  즐겨찾기 번호  */
					;
				}
				data.param
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_code"           ).trim()
												+ " "
												+ row.getParamText("cstm_name"            ).trim()
												+ " "
												+ row.getParamText("engl_name"            ).trim()
												+ " "
												+ row.getParamText("buss_numb"            ).trim()
												+ " "
												+ row.getParamText("tele_numb"            ).trim()
												+ " "
												+ row.getParamText("cstm_stnm_1fst"       ).trim() )
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);


				data.param
					.query("call cstm_rprt_insert (									")
					.query("   :cstm_idcd		" , row.fixParameter("cstm_idcd"))
					.query(" ) 													")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();


				// 2022.05.30 - 삼정 수입, 수출업체의 경우 해외주소를 직접입력하여 저장되도록 처리
				if(!(TextUtils.isEmpty(row.getParamText("post_code"))) || row.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
					setAddr(arg);
				}
				// 2022.05.30 - 중복적용되어 주석처리
			 	//if(!(TextUtils.isEmpty(row.getParamText("post_code")))){
				//	setAddr(arg);
				//}
			}
			data.execute();
		}
		return null ;
	}

	// 조회
	public SqlResultMap getDrtr(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.cstm_idcd      , a.line_seqn      , a.drtr_name      , a.wkps_name      , a.dept_name		")
			.where("      , a.drtr_tele_numb , a.drtr_hdph_numb , a.drtr_faxi_numb , a.drtr_mail_addr , a.remk_text		")
			.where("      , a.drtr_dvcd      , a.rpst_drtr_yorn , a.user_memo      , a.sysm_memo      , a.prnt_idcd		")
			.where("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.where("from    cstm_drtr a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
//			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																				")
			.where(") a																									")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getDrtrLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd      , a.line_seqn      , a.drtr_name      , a.wkps_name      , a.dept_name		")
			.query("      , a.drtr_tele_numb , a.drtr_hdph_numb , a.drtr_faxi_numb , a.drtr_mail_addr , a.remk_text		")
			.query("      , a.drtr_dvcd      , a.rpst_drtr_yorn 														")
		;
		data.param //퀴리문
			.where("from    cstm_drtr a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setDrtr(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cstm_drtr"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("cstm_drtr"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("drtr_name"			, row.getParameter("drtr_name"           ))  /*  담당자명  */
					.update("wkps_name"			, row.getParameter("wkps_name"           ))  /*  직위명  */
					.update("dept_name"			, row.getParameter("dept_name"           ))  /*  부서명  */
					.update("drtr_tele_numb"	, row.getParameter("drtr_tele_numb"      ))  /*  전화번호  */
					.update("drtr_hdph_numb"	, row.getParameter("drtr_hdph_numb"      ))  /*  휴대폰번호  */
					.update("drtr_faxi_numb"	, row.getParameter("drtr_faxi_numb"      ))  /*  팩스번호  */
					.update("drtr_mail_addr"	, row.getParameter("drtr_mail_addr"      ))  /*  이메일주소  */
					.update("remk_text"			, row.getParameter("remk_text"           ))  /*  비고  */
					.update("drtr_dvcd"			, row.getParameter("drtr_dvcd"           ))  /*  담당자구분코드  */
					.update("rpst_drtr_yorn"	, row.getParameter("rpst_drtr_yorn"      ))  /*  대표담당자여부  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_idcd"				).trim()
												+ " "
												+ row.getParamText("drtr_name"				).trim()
												+ " "
												+ row.getParamText("dept_name"				).trim()
												+ " "
												+ row.getParamText("tele_numb"				).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
	// 조회
	public SqlResultMap getAddr(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.cstm_idcd      , a.line_seqn      , a.addr_dvcd      , a.post_code      ,a.full_addr		")
			.where("      , a.addr_1fst      , a.addr_2snd      , a.base_addr_engl , a.addr_engl_1fst ,a.addr_engl_2snd	")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name ,a.updt_ipad		")
			.where("      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name ,a.crte_ipad		")
			.where("      , a.crte_dttm      , a.crte_idcd      , a.crte_urif											")
			.where("from    cstm_addr a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
			.where("order by a.line_seqn																				")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	//
	public SqlResultMap getBank(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *																											")
		;
		data.param
			.where("from (																												")
			.where("select  a.cstm_idcd     , a.line_seqn      , a.bank_name      , a.acct_nmbr     ,a.addr_name,     a.rpst_acct_yorn	")

			.where("      , a.user_memo as user_memo_bank      , a.sysm_memo      , a.prnt_idcd      ,a.line_levl    ,a.line_ordr		")
			.where("      , a.line_stat     , a.line_clos      , a.find_name      , a.updt_user_name ,a.updt_ipad						")
			.where("      , a.updt_dttm     , a.updt_idcd      , a.updt_urif      , a.crte_user_name ,a.crte_ipad						")
			.where("      , a.crte_dttm     , a.crte_idcd      , a.crte_urif															")
			.where("from    cstm_bank a																									")
			.where("where   1=1																											")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																								")
			.where(") a																													")
		;

		return data.selectForMap();

	}
	//룩업
	public SqlResultMap getAddrLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd      , a.line_seqn      , a.addr_dvcd      , a.post_code      ,a.full_addr		")
			.query("      , a.addr_1fst      , a.addr_2snd      , a.base_addr_engl , a.addr_engl_1fst ,a.addr_engl_2snd	")
			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr		")
		;
		data.param //퀴리문
			.where("from    cstm_addr a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
			.where("oreder by a.line_seqn																				")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setAddr(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		Action rowaction = null;
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.query("select *")

				.where("from cstm_addr"	)
				.where("where 1=1"	)
				.where("and   cstm_idcd = :cstm_idcd", row.getParameter("cstm_idcd"))
			;
			SqlResultMap addrCheck = data.selectForMap();
			if(addrCheck.isEmpty()){
				rowaction = SqlParameter.Action.setValue("insert");
			}else{
				rowaction = SqlParameter.Action.setValue("update");
			}
			data.clear();

			if (rowaction == Action.delete) {
				data.param
					.table("cstm_addr"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.update);

			} else {
				data.param
					.table("cstm_addr"													)
					.where("where cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					//
					.update("addr_dvcd"			, row.getParameter("addr_dvcd"           ))  /*  주소구분코드  */
					.update("post_code"			, row.getParameter("post_code"           ))  /*  우편번호  */
					.update("full_addr"			, row.getParameter("full_addr"           ))  /*  FULL주소  */
					.update("addr_1fst"			, row.getParameter("addr_1fst"           ))  /*  주소1  */
					.update("addr_2snd"			, row.getParameter("addr_2snd"           ))  /*  주소2  */
					.update("base_addr_engl"	, row.getParameter("base_addr_engl"      ))  /*  기본주소영문  */
					.update("addr_engl_1fst"	, row.getParameter("addr_engl_1fst"      ))  /*  주소영문1  */
					.update("addr_engl_2snd"	, row.getParameter("addr_engl_2snd"      ))  /*  주소영문2  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_idcd"           ).trim()
												)
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	// 조회
	public SqlResultMap getDeli(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.cstm_idcd      , a.line_seqn      , a.dlvy_drtr_name , a.trnt_mean_dvcd , a.dlvy_tele_numb")
			.where("      , a.dlvy_hdph_numb , a.dlvy_faxi_numb , a.dlvy_mail_addr , a.dlvy_zpcd      , a.dlvy_addr_1fst")
			.where("      , a.dlvy_addr_2snd , a.dlvy_remk_text , a.dlvy_lcal_dvcd , a.rpst_dlvy_yorn , a.dlvy_cstm_idcd")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.dely_cstm_name					")
			.where("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.where("from    cstm_deli a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
//			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
//			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																				")
			.where(") a																									")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getDeliLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd      , a.line_seqn      , a.dlvy_drtr_name , a.trnt_mean_dvcd					")
			.query("      , a.dlvy_tele_numb , a.dlvy_hdph_numb , a.dlvy_faxi_numb , a.dlvy_mail_addr 					")
			.query("      , a.dlvy_zpcd      , a.dlvy_addr_1fst , a.dlvy_addr_2snd , a.dlvy_remk_text					")
			.query("      , a.rpst_drtr_yorn , a.dlvy_lcal_dvcd , a.dely_cstm_name										")
		;
		data.param //퀴리문
			.where("from    cstm_deli a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap setDeli(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("cstm_deli"													)
					.where("where dlvy_cstm_idcd		= :dlvy_cstm_idcd				")  /*  거래처ID  */
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("cstm_deli"													)
					.where("where dlvy_cstm_idcd		= :dlvy_cstm_idcd				")  /*  거래처ID  */
					//
					.unique("dlvy_cstm_idcd"	, row.fixParameter("dlvy_cstm_idcd"		))
					//

					.update("cstm_idcd"			, row.fixParameter("cstm_idcd"      ))  /*  납품담당자명  */
					.update("line_seqn"			, row.fixParameter("line_seqn"      ))  /*  납품담당자명  */

					.update("dely_cstm_name"	, row.getParameter("dely_cstm_name"      ))  /*  납품처명  */
					.update("dlvy_drtr_name"	, row.getParameter("dlvy_drtr_name"      ))  /*  납품담당자명  */
					.update("trnt_mean_dvcd"	, row.getParameter("trnt_mean_dvcd"      ))  /*  운송수단구분코드  */
					.update("dlvy_tele_numb"	, row.getParameter("dlvy_tele_numb"      ))  /*  배송전화번호 */
					.update("dlvy_hdph_numb"	, row.getParameter("dlvy_hdph_numb"      ))  /*  납품휴대폰번호 */
					.update("dlvy_faxi_numb"	, row.getParameter("dlvy_faxi_numb"      ))  /*  납품팩스번호 */
					.update("dlvy_mail_addr"	, row.getParameter("dlvy_mail_addr"      ))  /*  납품이메일주소  */
					.update("dlvy_zpcd"			, row.getParameter("dlvy_zpcd"           ))  /*  배송우편번호  */
					.update("dlvy_addr_1fst"	, row.getParameter("dlvy_addr_1fst"      ))  /*  배송주소1  */
					.update("dlvy_addr_2snd"	, row.getParameter("dlvy_addr_2snd"      ))  /*  배송주소2  */
					.update("dlvy_remk_text"	, row.getParameter("dlvy_remk_text"      ))  /*  납품비고  */
					.update("dlvy_lcal_dvcd"	, row.getParameter("dlvy_lcal_dvcd"      ))  /*  배송지역구분코드  */
					.update("rpst_dlvy_yorn"	, row.getParameter("rpst_dlvy_yorn"      ))  /*  대표납품여부  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_idcd"				).trim()
												+ " "
												+ row.getParamText("dlvy_drtr_name"			).trim()
												+ " "
												+ row.getParamText("dely_cstm_name"				).trim()
												+ " "
												+ row.getParamText("dlvy_zpcd"				).trim()
												+ " "
												+ row.getParamText("dlvy_tele_numb"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap getCstm_Mngt(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String cstm_idcd = arg.getParamText("cstm_idcd" );
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.mngt_sbsc_idcd      , a.mngt_sbsc_name												")
		;
		if(!cstm_idcd.equals("")){
			data.param
				.query("      , b.mngt_sbsc_valu  , b.cstm_idcd														")
			;
		}
		data.param
			.where("from   mngt_sbsc_mast a																			")
		;
		if(!cstm_idcd.equals("")){
			data.param
				.where("       left    join (select * from cstm_sbsc   												")	//cstm_idcd가 없는 추가의 경우 전부 검색되게 처리해야함
				.where("       where cstm_idcd = :cstm_idcd   						", arg.fixParameter("cstm_idcd" ))
				.where("         ) b on  a.mngt_sbsc_idcd = b.mngt_sbsc_idcd   										")
			;
		}
		data.param
			.where("where  1=1																						")
			.where("and   a.mngt_sbsc_dvcd = '2000'																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getMngt(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select user_memo											")
		;
		data.param
			.where("from   mngt_sbsc_mast										")
			.where("where  1=1													")
			.where("and    mngt_sbsc_dvcd = '2000'								")
		;
		return data.selectForMap();
	}
	public SqlResultMap setCstm_Mngt(HttpRequestArgument arg) throws Exception {
		int chk = 0;
		String cstm_idcd = "";
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			if(chk == 0){
				cstm_idcd = row.getParamText("cstm_idcd");
				chk++;
			}
			data.param
			.table("cstm_sbsc")

			.where("where cstm_idcd      = :cstm_idcd")
			.where("and   mngt_sbsc_idcd = :mngt_sbsc_idcd")

			.unique("cstm_idcd"			, cstm_idcd)
			.unique("mngt_sbsc_idcd"	, row.fixParameter("mngt_sbsc_idcd"))

			.update("mngt_sbsc_valu"	, row.getParameter("mngt_sbsc_valu"))
			.update("user_memo"			, row.getParameter("user_memo"))
			.update("sysm_memo"			, row.getParameter("sysm_memo"))

			.update("updt_idcd"			, row.getParameter("updt_idcd"		))
			.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
		}
		data.execute();
		return null;
	}

	public SqlResultMap getItemPric(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select																						")
			.query("       a.item_idcd        , a.line_seqn         , a.cstm_idcd         , a.cont_date			")
			.query("     , a.drtr_idcd        , a.cont_pric         , a.trnt_mthd_dvcd    , a.deli_dcnt			")
			.query("     , a.last_yorn        , a.pric_dvcd         , a.trmn_date         , i.item_spec			")
			.query("     , u.user_name  as drtr_name                 , i.item_code        , i.item_name			")
			.query("     , bs.base_name as item_clss_bacd_name													")
		;
		data.param
			.where("from  item_cont a																			")
			.where("left outer join   cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join   user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join   item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join   item_desc h on a.item_idcd = h.item_idcd and h.line_seqn = 1				")
			.where("left outer join   base_mast bs on h.item_clss_bacd = bs.base_code and bs.prnt_idcd = '8001'	")
			.where("where  1=1																					")
			.where("and    a.last_yorn = 1																		")
			.where("and    a.cstm_idcd = :cstm_idcd", arg.fixParameter("cstm_idcd"))
			.where("and    i.item_name   like %:item_name%" , arg.getParameter("item_name"))
			.where("and    i.item_spec   like %:item_spec%" , arg.getParamText("item_spec") )
			.where("and    bs.base_name  like %:base_name%" , arg.getParameter("item_clss_bacd_name"))
			.where("and    a.line_stat < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.cont_date desc																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
