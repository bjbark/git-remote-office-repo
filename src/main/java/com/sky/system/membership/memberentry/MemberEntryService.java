package com.sky.system.membership.memberentry;

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
public class MemberEntryService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String find_name = "";
		if(!arg.getParamText("find_name").equals("")){
			String[] find = arg.getParamText("find_name").split(" ");
			if(find.length>0){
				for (int i = 0; i < find.length; i++) {
					if(i ==0){
						find_name += "(?=(.*("+find[i]+")){1,})";
					}else{
						find_name += ".*"+find[i];
					}
				}
			}
		}
		String brth_fr_date = "";
		String brth_to_date = "";
		if (arg.getParamText("brth_fr_dt").length()		== 10 ) {
			brth_fr_date = arg.getParamText("brth_fr_dt").substring(4,7);
		}
		if (arg.getParamText("brth_to_dt").length()		== 10 ) {
			brth_to_date = arg.getParamText("brth_to_dt").substring(4,7);
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select a.mmbr_idcd      , a.mmbr_code      , a.mmbr_name      , a.alis_name				")
			.where("     , a.gndr_dvcd      , a.mmbr_phot      , a.hght           , a.wght					")
			.where("     , a.brth_date      , a.pass_idcd      , a.entr_dvcd      , a.enps_dvcd				")
			.where("     , a.etcc_enps      , a.carr_dvcd      , a.etcc_carr      , a.enpp_dvcd				")
			.where("     , a.etcc_enpp      , a.entr_date      , a.scsn_date      , a.hdph_numb				")
			.where("     , a.post_code      , a.addr_1fst      , a.addr_2snd      , a.grad_dvcd				")
			.where("     , a.paid_dvcd      , a.cont_pric      , a.mmbr_stat_dvcd , a.annc_date				")
			.where("     , a.paid_bank_idcd , a.paid_acct_nmbr , a.lssn_type_dvcd , a.lssn_ccle_dvcd		")
			.where("     , a.lssn_stdt      , a.amtm_yorn													")
			.where("     , substring(a.amtm_sttm,1,4) as amtm_sttm											")
			.where("     , substring(a.amtm_edtm,1,4) as amtm_edtm											")
			.where("     , a.pmtm_yorn																		")
			.where("     , substring(a.pmtm_sttm,1,4) as pmtm_sttm											")
			.where("     , substring(a.pmtm_edtm,1,4) as pmtm_edtm											")
			.where("     , a.mond_yorn      , a.tued_yorn      , a.wedd_yorn      , a.thud_yorn				")
			.where("     , a.frid_yorn      , a.satd_yorn      , a.sund_yorn								")
			.where("     , a.mond_time_dvcd , a.tued_time_dvcd , a.wedd_time_dvcd , a.thud_time_dvcd		")
			.where("     , a.frid_time_dvcd , a.satd_time_dvcd , a.sund_time_dvcd							")
			.where("     , a.utli_strt_time , a.utli_endd_time												")
			.where("     , a.rcom_idcd      , a.conn_mmbr_idcd , a.cars_numb								")
			.where("     , a.cars_dvcd																		")
			.where("     , a.drtr_idcd       , e.user_name	as drtr_name									")
			.where("     , substring(a.amtm_sttm,1,2) as amtm_sttm_hh										")
			.where("     , substring(a.amtm_sttm,3,2) as amtm_sttm_mm										")
			.where("     , substring(a.pmtm_sttm,1,2) as pmtm_sttm_hh										")
			.where("     , substring(a.pmtm_sttm,3,2) as pmtm_sttm_mm										")
			.where("     , substring(a.amtm_edtm,1,2) as amtm_edtm_hh										")
			.where("     , substring(a.amtm_edtm,3,2) as amtm_edtm_mm										")
			.where("     , substring(a.pmtm_edtm,1,2) as pmtm_edtm_hh										")
			.where("     , substring(a.pmtm_edtm,3,2) as pmtm_edtm_mm										")
			.where("     , concat(substring(a.amtm_sttm,1,2),':',substring(a.amtm_sttm,3,2)) as amtm_term	")
			.where("     , concat(substring(a.pmtm_sttm,1,2),':',substring(a.pmtm_sttm,3,2)) as pmtm_term	")
			.where("     , if(mond_time_dvcd = 'AM', amtm_sttm,if(mond_time_dvcd = 'PM',pmtm_sttm,null)) as mond_time")
			.where("     , if(tued_time_dvcd = 'AM', amtm_sttm,if(tued_time_dvcd = 'PM',pmtm_sttm,null)) as tued_time")
			.where("     , if(wedd_time_dvcd = 'AM', amtm_sttm,if(wedd_time_dvcd = 'PM',pmtm_sttm,null)) as wedd_time")
			.where("     , if(thud_time_dvcd = 'AM', amtm_sttm,if(thud_time_dvcd = 'PM',pmtm_sttm,null)) as thud_time")
			.where("     , if(frid_time_dvcd = 'AM', amtm_sttm,if(frid_time_dvcd = 'PM',pmtm_sttm,null)) as frid_time")
			.where("     , if(satd_time_dvcd = 'AM', amtm_sttm,if(satd_time_dvcd = 'PM',pmtm_sttm,null)) as satd_time")
			.where("     , if(sund_time_dvcd = 'AM', amtm_sttm,if(sund_time_dvcd = 'PM',pmtm_sttm,null)) as sund_time")
			.where("     , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl				")
			.where("     , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name				")
			.where("     , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd				")
			.where("     , a.updt_urif																		")
			.where("     , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd				")
			.where("     , a.crte_urif																		")
			.where("from   mmbr_mast a																		")
			.where("       left join user_mast e on a.drtr_idcd = e.user_idcd								")
			.where("where  1=1																				")
			.where("and    a.find_name REGEXP :find_name	"	, find_name									)
			.where("and    a.mmbr_name        = :mmbr_name		" , arg.getParameter("mmbr_name"))
			.where("and    e.user_name        = :drtr_name		" , arg.getParameter("drtr_name"))
			.where("and    a.mmbr_stat_dvcd   = :mmbr_stat_dvcd	" , arg.getParamText("mmbr_stat_dvcd" ) , !"".equals(arg.getParamText("mmbr_stat_dvcd" )))
			.where("and    a.entr_dvcd        = :entr_dvcd		" , arg.getParamText("entr_dvcd" )      , !"".equals(arg.getParamText("entr_dvcd" )))
			.where("and    a.enps_dvcd        = :enps_dvcd		" , arg.getParamText("enps_dvcd" )      , !"".equals(arg.getParamText("enps_dvcd" )))
			.where("and    a.enpp_dvcd        = :enpp_dvcd		" , arg.getParamText("enpp_dvcd" )      , !"".equals(arg.getParamText("enpp_dvcd" )))
			.where("and    a.gndr_dvcd        = :gndr_dvcd		" , arg.getParamText("gndr_dvcd" )      , !"".equals(arg.getParamText("gndr_dvcd" )))
			.where("and    a.lssn_type_dvcd   = :lssn_type_dvcd	" , arg.getParamText("lssn_type_dvcd" ) , !"".equals(arg.getParamText("lssn_type_dvcd" )))
			.where("and    a.lssn_ccle_dvcd   = :lssn_ccle_dvcd	" , arg.getParamText("lssn_ccle_dvcd" ) , !"".equals(arg.getParamText("lssn_ccle_dvcd" )))
			.where("and    a.carr_dvcd        = :carr_dvcd		" , arg.getParamText("carr_dvcd" )      , !"".equals(arg.getParamText("carr_dvcd" )))
			.where("and    a.hdph_numb        like %:hdph_numb%	" , arg.getParamText("hdph_numb" )      , !"".equals(arg.getParamText("hdph_numb" )))
			.where("and		a.line_stat	= :line_stat1"		 , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
//			.where("and		a.line_stat	< :line_stat"		 , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and    a.entr_date  between :entr_fr_dt     ", arg.getParamText("entr_fr_dt"))
			.where("                        and :entr_to_dt     ", arg.getParamText("entr_to_dt"))
			.where("and    substring(a.brth_date,5,4)  between :bdth_fr_dt     ", brth_fr_date)
			.where("                                   and     :brth_to_dt     ", brth_to_date)
			.where("order by a.mmbr_name  )a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getMemo(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																					")
		;
		data.param
			.where("from (																					")
			.where("select  a.mmbr_idcd      , a.line_seqn													")
			.where("      , a.scrt_dvcd      , a.memo_dttm													")
			.where("      , a.dwup_empy_idcd , e.user_name as dwup_empy_name								")
			.where("      , a.ttle																			")
			.where("      , a.memo_1fst      , a.memo_2snd													")
			.where("      , a.memo_3trd      , a.memo_4frt													")
			.where("      , a.dwup_date      , a.dwup_time      , a.memo_dvcd								")
			.where("      , m.mmbr_name 																	")
			.where("      , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl			")
			.where("      , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd			")
			.where("      , a.updt_urif																		")
			.where("      , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
			.where("      , a.crte_urif																		")
			.where("from mmbr_memo a	 																	")
			.where("     left join mmbr_mast m on a.mmbr_idcd = m.mmbr_idcd									")
			.where("     left join user_mast e on a.dwup_empy_idcd = e.user_idcd							")
			.where("where  1=1																				")
			.where("and    a.mmbr_idcd   = :mmbr_idcd		"	, arg.getParameter("mmbr_idcd"))
			.where("order by a.line_seqn desc																")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getCrct(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																					")
		;
		data.param
			.where("from (																					")
			.where("select  a.mmbr_idcd      , a.line_seqn													")
			.where("      , a.acce_date      , a.annc_dvcd													")
			.where("      , a.qntt           , a.pric           , a.amnt									")
			.where("      , a.sply_amnt      , a.vatx_amnt      , a.ttsm_amnt      , a.cbil_yorn			")
			.where("      , a.lssn_stdt      , a.stot_dvcd      , a.acct_nmbr      , a.prtl_colt_yorn		")
			.where("      , a.drtr_idcd      , e.user_name as drtr_name										")
			.where("      , m.mmbr_name 																	")
			.where("      , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl			")
			.where("      , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd			")
			.where("      , a.updt_urif																		")
			.where("      , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
			.where("      , a.crte_urif																		")
			.where("from  crct_mast a	 																	")
			.where("      left join mmbr_mast m on a.mmbr_idcd = m.mmbr_idcd								")
			.where("      left join user_mast e on a.drtr_idcd = e.user_idcd								")
			.where("where 1=1																				")
			.where("and   a.mmbr_idcd   = :mmbr_idcd		"	, arg.getParameter("mmbr_idcd"))
			.where("order by a.line_seqn desc																")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getInot(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																					")
		;
		data.param
			.where("from (																					")
			.where("select  a.mmbr_idcd      , a.line_seqn													")
			.where("      , a.resv_date      , a.resv_time      , a.need_time								")
			.where("      , a.drtr_idcd      , u1.user_name as drtr_name									")
			.where("      , a.acce_date      , a.acce_seqn      , a.memo									")
			.where("      , a.resv_stat_dvcd , a.proc_drtr_idcd , u2.user_name as proc_drtr_name			")
			.where("      , a.qntt           , a.proc_date      , a.proc_time								")
			.where("      , m.mmbr_name 																	")
			.where("      , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl			")
			.where("      , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd			")
			.where("      , a.updt_urif																		")
			.where("      , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
			.where("      , a.crte_urif																		")
			.where("from  inot_mast a	 																	")
			.where("      left join mmbr_mast m on a.mmbr_idcd = m.mmbr_idcd								")
			.where("      left join user_mast u1 on a.drtr_idcd      = u1.user_idcd							")
			.where("      left join user_mast u2 on a.proc_drtr_idcd = u2.user_idcd							")
			.where("where  1=1																				")
			.where("and    a.mmbr_idcd   = :mmbr_idcd			" , arg.getParameter("mmbr_idcd"))
			.where("and    a.resv_date   between  :fr_date		" , arg.getParameter("resv_fr_dt"))
			.where("                     and      :to_date		" , arg.getParameter("resv_to_dt"))
			.where("and    a.drtr_idcd        = :drtr_idcd		" , arg.getParameter("drtr_idcd"))
			.where("and    m.mmbr_name        = :mmbr_name		" , arg.getParameter("mmbr_name"))
			.where("and    m.lssn_type_dvcd   = :lssn_type_dvcd	" , arg.getParamText("lssn_type_dvcd" ) , !"".equals(arg.getParamText("lssn_type_dvcd" )))
			.where("and    m.lssn_ccle_dvcd   = :lssn_ccle_dvcd	" , arg.getParamText("lssn_ccle_dvcd" ) , !"".equals(arg.getParamText("lssn_ccle_dvcd" )))
			.where("and    m.gndr_dvcd        = :gndr_dvcd		" , arg.getParamText("gndr_dvcd" )      , !"".equals(arg.getParamText("gndr_dvcd" )))
			.where("and    m.hdph_numb        like %:hdph_numb%	" , arg.getParamText("hdph_numb" )      , !"".equals(arg.getParamText("hdph_numb" )))
			.where("and    a.line_stat	= :line_stat1"		 , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("order by a.resv_date desc, a.resv_time, a.line_seqn desc								")
			.where("limit 100																				")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getItem_Mngt(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String item_idcd = arg.getParamText("item_idcd" );
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.mngt_sbsc_idcd      , a.mngt_sbsc_name												")
		;
		if(!item_idcd.equals("")){
			data.param
				.query("      , b.mngt_sbsc_valu  , b.item_idcd														")
			;
		}
		data.param
			.where("from   mngt_sbsc_mast a																			")
		;
		if(!item_idcd.equals("")){
			data.param
				.where("       left    join (select * from item_sbsc   												")	//item_idcd가 없는 추가의 경우 전부 검색되게 처리해야함
				.where("       where item_idcd = :item_idcd   						", arg.fixParameter("item_idcd" ))
				.where("         ) b on  a.mngt_sbsc_idcd = b.mngt_sbsc_idcd   										")
			;
		}
		data.param
			.where("where  1=1																						")
			.where("and   a.mngt_sbsc_dvcd = '1000'																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String find_name = "";
		if(!arg.getParamText("find_name").equals("")){
			String[] find = arg.getParamText("find_name").split(" ");
			if(find.length>0){
				for (int i = 0; i < find.length; i++) {
					String x = "";
					x = find[i].replace("(", "\\(").replace(")", "\\)");
					if(i ==0){
						find_name += "(?=(.*("+x+")){1,})";
					}else{
						find_name += ".*"+x;
					}
				}
			}
		}
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select a.mmbr_idcd      , a.mmbr_code      , a.mmbr_name      , a.alis_name				")
			.where("     , a.gndr_dvcd      , a.mmbr_phot      , a.hght           , a.wght					")
			.where("     , a.brth_date      , a.pass_idcd      , a.entr_dvcd      , a.enps_dvcd				")
			.where("     , a.etcc_enps      , a.carr_dvcd      , a.etcc_carr      , a.enpp_dvcd				")
			.where("     , a.etcc_enpp      , a.entr_date      , a.scsn_date      , a.hdph_numb				")
			.where("     , a.post_code      , a.addr_1fst      , a.addr_2snd      , a.grad_dvcd				")
			.where("     , a.paid_dvcd      , a.cont_pric      , a.mmbr_stat_dvcd , a.annc_date				")
			.where("     , a.paid_bank_idcd , a.paid_acct_nmbr , a.lssn_type_dvcd , a.lssn_ccle_dvcd		")
			.where("     , a.lssn_stdt      , a.amtm_yorn													")
			.where("     , substring(a.amtm_sttm,1,4) as amtm_sttm											")
			.where("     , substring(a.amtm_edtm,1,4) as amtm_edtm											")
			.where("     , a.pmtm_yorn																		")
			.where("     , substring(a.pmtm_sttm,1,4) as pmtm_sttm											")
			.where("     , substring(a.pmtm_edtm,1,4) as pmtm_edtm											")
			.where("     , a.mond_yorn      , a.tued_yorn      , a.wedd_yorn      , a.thud_yorn				")
			.where("     , a.frid_yorn      , a.satd_yorn      , a.sund_yorn								")
			.where("     , a.mond_time_dvcd , a.tued_time_dvcd , a.wedd_time_dvcd , a.thud_time_dvcd		")
			.where("     , a.frid_time_dvcd , a.satd_time_dvcd , a.sund_time_dvcd							")
			.where("     , a.utli_strt_time , a.utli_endd_time												")
			.where("     , a.rcom_idcd      , a.conn_mmbr_idcd , a.cars_numb								")
			.where("     , a.cars_dvcd																		")
			.where("     , a.drtr_idcd       , e.user_name	as drtr_name									")
			.where("     , substring(a.amtm_sttm,1,2) as amtm_sttm_hh										")
			.where("     , substring(a.amtm_sttm,3,2) as amtm_sttm_mm										")
			.where("     , substring(a.pmtm_sttm,1,2) as pmtm_sttm_hh										")
			.where("     , substring(a.pmtm_sttm,3,2) as pmtm_sttm_mm										")
			.where("     , substring(a.amtm_edtm,1,2) as amtm_edtm_hh										")
			.where("     , substring(a.amtm_edtm,3,2) as amtm_edtm_mm										")
			.where("     , substring(a.pmtm_edtm,1,2) as pmtm_edtm_hh										")
			.where("     , substring(a.pmtm_edtm,3,2) as pmtm_edtm_mm										")
			.where("     , concat(substring(a.amtm_sttm,1,2),':',substring(a.amtm_sttm,3,2), 				")
			.where("          '~',substring(a.amtm_edtm,1,2),':',substring(a.amtm_edtm,3,2)) as amtm_term	")
			.where("     , concat(substring(a.pmtm_sttm,1,2),':',substring(a.pmtm_sttm,3,2),				")
			.where("          '~',substring(a.pmtm_edtm,1,2),':',substring(a.pmtm_edtm,3,2)) as pmtm_term	")
			.where("     , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl				")
			.where("     , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name				")
			.where("     , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd				")
			.where("     , a.updt_urif																		")
			.where("     , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd				")
			.where("     , a.crte_urif																		")
			.where("from   mmbr_mast a																		")
			.where("       left join user_mast e on a.drtr_idcd = e.user_idcd								")
			.where("where  1=1																				")
			.where("and    a.find_name REGEXP   :find_name		" , find_name								)
			.where("and    a.mmbr_stat_dvcd   = :mmbr_stat_dvcd	" , arg.getParameter("mmbr_stat_dvcd"))
			.where("and    a.mmbr_name        = :mmbr_name		" , arg.getParameter("mmbr_name"))
			.where("and    a.mmbr_stat_dvcd   = :mmbr_stat_dvcd	" , arg.getParamText("mmbr_stat_dvcd" ) , !"".equals(arg.getParamText("mmbr_stat_dvcd" )))
			.where("and    a.entr_dvcd        = :entr_dvcd		" , arg.getParamText("entr_dvcd" )      , !"".equals(arg.getParamText("entr_dvcd" )))
			.where("and    a.enps_dvcd        = :enps_dvcd		" , arg.getParamText("enps_dvcd" )      , !"".equals(arg.getParamText("enps_dvcd" )))
			.where("and    a.enpp_dvcd        = :enpp_dvcd		" , arg.getParamText("enpp_dvcd" )      , !"".equals(arg.getParamText("enpp_dvcd" )))
			.where("and    a.lssn_type_dvcd   = :lssn_type_dvcd	" , arg.getParamText("lssn_type_dvcd" ) , !"".equals(arg.getParamText("lssn_type_dvcd" )))
			.where("and    a.lssn_ccle_dvcd   = :lssn_ccle_dvcd	" , arg.getParamText("lssn_ccle_dvcd" ) , !"".equals(arg.getParamText("lssn_ccle_dvcd" )))
			.where("and    a.carr_dvcd        = :carr_dvcd		" , arg.getParamText("carr_dvcd" )      , !"".equals(arg.getParamText("carr_dvcd" )))
			.where("and    a.line_stat        < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))		)
			.where("and    a.entr_date  between :entr_fr_dt     ", arg.getParamText("entr_fr_dt"))
			.where("                        and :entr_to_dt     ", arg.getParamText("entr_to_dt"))
			.where("order by a.mmbr_name  )a																")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMmbrCode(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select lpad(cast(cast(ifnull(max(mmbr_code),0) as integer)+1 as char(5)),5,'0') as mmbr_code	")
			.where("from   mmbr_mast																				")
			.where("where  length(mmbr_code) = 5																	")
			.where("and mmbr_code <> '99999'																		")
		;
		return data.selectForMap();
	}

	public SqlResultMap getMmbrCodeCheck(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as chk													")
			.where("from  mmbr_mast															")
			.where("where mmbr_code = :mmbr_code", arg.fixParameter("mmbr_code"))

		;
		return data.selectForMap();
	}


	public SqlResultMap getLastSeq(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String table	= arg.getParamText("table_name") ;
		System.out.println(table);

		data.param
			.query("select ifnull(max(line_seqn),0) + 1  as line_seqn							")
		;
		if ("memo".equals(table)) {
			data.param
				.query("from mmbr_memo a														")
			;
		}
		if ("altr".equals(table)) {
			data.param
				.where("from mmbr_altr a														")
			;
		}
		if ("inot".equals(table)) {
			data.param
				.where("from inot_mast a														")
			;
		}
		if ("crct".equals(table)) {
			data.param
				.where("from crct_mast a														")
			;
		}
		data.param
			.where("where  mmbr_idcd =	:mmbr_idcd", arg.fixParameter("mmbr_idcd"))
		;
		return data.selectForMap();
	}


	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2		")
			.where("from  item_mast						")
			.where("where 1=1							")
			.where("and   item_idcd = :item_idcd",arg.getParameter("item_idcd"))
		;
		return data.selectForMap();
	}



	public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//			DataMessage data = new DataMessage("NETHOSTING");
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
			.where("and			a.invc_numb = :item_idcd        " , arg.getParameter("item_idcd"				))
			.where("and			a.orgn_dvcd = :orgn_dvcd", "item_mast")												// 받아서 처리해야함
			.where("order by	a.line_seqn																		")
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
					.table("mmbr_mast												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.delete);

				data.param
					.table("mmbr_memo												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.delete);
				data.param
					.table("mmbr_altr												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.delete);
				data.param
					.table("inot_mast												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.delete);
				data.param
					.table("crct_mast												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.delete);
				data.execute();
			} else {
				data.param
					.table("mmbr_mast												")
					.where("where mmbr_idcd  = :mmbr_idcd							")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"		))
					.update("mmbr_code"			, row.fixParameter("mmbr_code"		))
					.update("mmbr_name"			, row.fixParameter("mmbr_name"		))
					.update("alis_name"			, row.getParameter("alis_name"		))
					.update("gndr_dvcd"			, row.getParameter("gndr_dvcd"		))
					.update("mmbr_phot"			, row.getParameter("mmbr_phot"		))
					.update("hght"				, row.getParameter("hght"			))
					.update("wght"				, row.getParameter("wght"			))
					.update("brth_date"			, row.getParameter("brth_date"		))
					.update("pass_idcd"			, row.getParameter("pass_idcd"		))
					.update("entr_dvcd"			, row.getParameter("entr_dvcd"		))
					.update("enps_dvcd"			, row.getParameter("enps_dvcd"		))
					.update("etcc_enps"			, row.getParameter("etcc_enps"		))
					.update("carr_dvcd"			, row.getParameter("carr_dvcd"		))
					.update("etcc_carr"			, row.getParameter("etcc_carr"		))
					.update("enpp_dvcd"			, row.getParameter("enpp_dvcd"		))
					.update("etcc_enpp"			, row.getParameter("etcc_enpp"		))
					.update("entr_date"			, row.getParameter("entr_date"		))
					.update("scsn_date"			, row.getParameter("scsn_date"		))
					.update("hdph_numb"			, row.getParameter("hdph_numb"		))
					.update("post_code"			, row.getParameter("post_code"		))
					.update("addr_1fst"			, row.getParameter("addr_1fst"		))
					.update("addr_2snd"			, row.getParameter("addr_2snd"		))
					.update("grad_dvcd"			, row.getParameter("grad_dvcd"		))
					.update("paid_dvcd"			, row.getParameter("paid_dvcd"		))
					.update("cont_pric"			, row.getParameter("cont_pric"		))
					.update("mmbr_stat_dvcd"	, row.getParameter("mmbr_stat_dvcd"	))
					.update("annc_date"			, row.getParameter("annc_date"		))
					.update("paid_bank_idcd"	, row.getParameter("paid_bank_idcd"	))
					.update("paid_acct_nmbr"	, row.getParameter("paid_acct_nmbr"	))
					.update("lssn_type_dvcd"	, row.getParameter("lssn_type_dvcd"	))
					.update("lssn_ccle_dvcd"	, row.getParameter("lssn_ccle_dvcd"	))
					.update("lssn_stdt"			, row.getParameter("lssn_stdt"		))
					.update("amtm_yorn"			, row.getParameter("amtm_yorn"		))
					.update("amtm_sttm"			, row.getParameter("amtm_sttm"		))
					.update("amtm_edtm"			, row.getParameter("amtm_edtm"		))
					.update("pmtm_sttm"			, row.getParameter("pmtm_sttm"		))
					.update("pmtm_edtm"			, row.getParameter("pmtm_edtm"		))

//					.update("amtm_sttm"			, row.getParameter("amtm_sttm_hh"	)
//												+ ""
//												+ row.getParameter("amtm_sttm_mm"	)
//												+ "00")
//					.update("amtm_edtm"			, row.getParameter("amtm_edtm_hh"	)
//												+ ""
//												+ row.getParameter("amtm_edtm_mm"	)
//												+ "00")
					.update("pmtm_yorn"			, row.getParameter("pmtm_yorn"		))
//					.update("pmtm_sttm"			, row.getParameter("pmtm_sttm_hh"	)
//												+ ""
//												+ row.getParameter("pmtm_sttm_mm"	)
//												+ "00")
//					.update("pmtm_edtm"			, row.getParameter("pmtm_edtm_hh"	)
//												+ ""
//												+ row.getParameter("pmtm_edtm_mm"	)
//												+ "00")
					.update("mond_yorn"			, row.getParameter("mond_yorn"		))
					.update("tued_yorn"			, row.getParameter("tued_yorn"		))
					.update("wedd_yorn"			, row.getParameter("wedd_yorn"		))
					.update("thud_yorn"			, row.getParameter("thud_yorn"		))
					.update("frid_yorn"			, row.getParameter("frid_yorn"		))
					.update("satd_yorn"			, row.getParameter("satd_yorn"		))
					.update("sund_yorn"			, row.getParameter("sund_yorn"		))
					.update("mond_time_dvcd"	, row.getParameter("mond_time_dvcd"	))
					.update("tued_time_dvcd"	, row.getParameter("tued_time_dvcd"	))
					.update("wedd_time_dvcd"	, row.getParameter("wedd_time_dvcd"	))
					.update("thud_time_dvcd"	, row.getParameter("thud_time_dvcd"	))
					.update("frid_time_dvcd"	, row.getParameter("frid_time_dvcd"	))
					.update("satd_time_dvcd"	, row.getParameter("satd_time_dvcd"	))
					.update("sund_time_dvcd"	, row.getParameter("sund_time_dvcd"	))
					.update("utli_strt_time"	, row.getParameter("utli_strt_time"	))
					.update("utli_endd_time"	, row.getParameter("utli_endd_time"	))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))
					.update("rcom_idcd"			, row.getParameter("rcom_idcd"		))
					.update("conn_mmbr_idcd"	, row.getParameter("conn_mmbr_idcd"	))
					.update("cars_numb"			, row.getParameter("cars_numb"		))
					.update("cars_dvcd"			, row.getParameter("cars_dvcd"		))
					.update("find_name"			, row.getParameter("mmbr_name"		)
												+ "	"
												+ row.getParameter("mmbr_code"		)
												+ "	"
												+ row.getParameter("hdph_numb"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("line_stat"			, row.getParameter("line_stat"		))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
				data.execute();
				data.clear();

//				data.param
//					.table("mmbr_altr												")
//					.where("where item_idcd  = :item_idcd							")
//
//					.unique("item_idcd"			, row.fixParameter("item_idcd"	))
//
//					.update("cstm_idcd"			, row.getParameter("base_vend_idcd"	))
//					.update("ogin_bacd"			, row.getParameter("ogin_bacd"		))
//					.update("minm_puch_qntt"	, row.getParameter("minm_puch_qntt"	))
//					.update("puch_itvl_qntt"	, row.getParameter("puch_itvl_qntt"	))
//					.update("avrg_supl_dcnt"	, row.getParameter("avrg_supl_dcnt"	))
//					.update("optm_offr_volm"	, row.getParameter("optm_offr_volm"	))
//					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))
//					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))
//					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))
//
//					.insert("line_levl"			, row.getParameter("line_levl"		))
//					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
//					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
//					.update("updt_ipad"			, arg.remoteAddress )
//					.insert("crte_ipad"			, arg.remoteAddress )
//					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
//				;
//				data.attach(Action.modify);
//				data.execute();
//				data.clear();



			}
		}
		return null ;
	}

	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
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
					.query("update item_mast					")
					.query("       set item_imge = ''			")
					.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
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
					.table("item_mast")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"				, arg.fixParameter("item_idcd"))

					.update("item_imge",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			if(chk2.equals("0")){
				data.param
					.query("update item_mast					")
					.query("       set item_imge2 = ''			")
					.query("       where item_idcd = :item_idcd", arg.getParameter("item_idcd"))
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
					.table("item_mast")
					.where("where item_idcd	= :item_idcd" )

					.unique("item_idcd"				, arg.fixParameter("item_idcd"))

					.update("item_imge2",returnByte2)
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

	public SqlResultMap setMemo(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {
			data.param
				.table("mmbr_memo											")
				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")
				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			;data.attach(Action.delete);
			data.execute();
		} else {
			data.param
				.table("mmbr_memo")

				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")

				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("scrt_dvcd"			, arg.getParameter("scrt_dvcd"))
				.update("memo_dttm"			, arg.getParameter("memo_dttm"))
				.update("dwup_empy_idcd"	, arg.getParameter("dwup_empy_idcd"))
				.update("ttle"				, arg.getParameter("ttle"))
				.update("memo_1fst"			, arg.getParameter("memo_1fst"))
				.update("memo_2snd"			, arg.getParameter("memo_2snd"))
				.update("memo_3trd"			, arg.getParameter("memo_3trd"))
				.update("memo_4frt"			, arg.getParameter("memo_4frt"))
				.update("dwup_date"			, arg.getParameter("dwup_date"))
				.update("dwup_time"			, arg.getParameter("dwup_time"))
				.update("memo_dvcd"			, arg.getParameter("memo_dvcd"))
				.update("user_memo"			, arg.getParameter("user_memo"))
				.update("sysm_memo"			, arg.getParameter("sysm_memo"))

				.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(rowaction);
			data.execute();
		}
		return null;
	}
	public SqlResultMap setCrct(HttpRequestArgument arg) throws Exception {
		String acce_date = "";
		String lssn_date = "";
		double amnt			= 0 ;  //금액
		double sply_amnt	= 0 ;  //공급가액
		int    vatx_amnt	= 0 ;  //부가세액
		double ttsm_amnt	= 0 ;  //합계금액
		String cbil_yorn	= "0" ;  //현금영수증 여부
		String prtl_colt_yorn	= "0" ;  //일부수금 여부
		DataMessage data = arg.newStorage("POS");
		lssn_date = arg.getParamText("lssn_stdt");
		acce_date = arg.getParamText("acce_date");
		if ( acce_date.length() == 0 ){
			acce_date = new SimpleDateFormat("yyyyMMdd").format(new Date());
		}
		if ( lssn_date.length() == 0 ){
			lssn_date = new SimpleDateFormat("yyyyMMdd").format(new Date());
		}

		System.out.println("acce_date : " + acce_date);
//		System.out.println("cbil_yorn : " + cbil_yorn);
//		System.out.println("amnt : " + amnt);
//		System.out.println("vatx_amnt : " + vatx_amnt);
//		System.out.println("sply_amnt : " + sply_amnt);
//		System.out.println("ttsm_amnt : " + ttsm_amnt);

		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {
			data.param
				.table("crct_mast											")
				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")
				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			;data.attach(Action.delete);
			data.execute();
		} else {
			cbil_yorn		= (String) arg.getParameter("cbil_yorn");
			prtl_colt_yorn	= (String) arg.getParameter("prtl_colt_yorn");
			if ( prtl_colt_yorn.length() == 0 ){
				prtl_colt_yorn = "0";
			}
			if (arg.getParameter("stot_dvcd")=="2") {
				cbil_yorn = "1";
			}
			amnt  =  Double.parseDouble(arg.getParamText("amnt")) ;
			if (cbil_yorn.equals("1")) {
				vatx_amnt	= (int) (amnt * 0.1);
				sply_amnt	= amnt - vatx_amnt;
				ttsm_amnt	= sply_amnt + vatx_amnt;
			}
			data.param
				.table("crct_mast")

				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")

				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("acce_date"			, arg.getParameter("acce_date"))
				.update("annc_dvcd"			, arg.getParameter("annc_dvcd"))
				.update("qntt"				, arg.getParameter("qntt"))
				.update("pric"				, arg.getParameter("pric"))
				.update("amnt"				, arg.getParameter("amnt"))
				.update("sply_amnt"			, sply_amnt)
				.update("vatx_amnt"			, vatx_amnt)
				.update("ttsm_amnt"			, ttsm_amnt)
				.update("cbil_yorn"			, cbil_yorn)
				.update("lssn_stdt"			, arg.getParameter("lssn_stdt"))
				.update("stot_dvcd"			, arg.getParameter("stot_dvcd"))
				.update("acct_nmbr"			, arg.getParameter("acct_nmbr"))
				.update("prtl_colt_yorn"	, arg.getParameter("prtl_colt_yorn"))
				.update("drtr_idcd"			, arg.getParameter("drtr_idcd"))
				.update("user_memo"			, arg.getParameter("user_memo"))
				.update("sysm_memo"			, arg.getParameter("sysm_memo"))
				.update("updt_idcd"			, arg.getParameter("updt_idcd"))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(rowaction);
			data.execute();
		}
		if (prtl_colt_yorn.equals("0")) {
			data.clear();
			data.param
				.query("call coupon_create (						")
				.query("   :mmbr_idcd			" , arg.fixParameter("mmbr_idcd"))
				.query("  ,:from_date			" , lssn_date)
				.query("  ,:count				" , arg.getParameter("qntt"))
				.query("  ,:acce_date			" , acce_date)
				.query("  ,:acce_seq			" , arg.fixParameter("line_seqn"))
				.query(" ) 											")
			;
			data.attach(Action.direct);
			data.execute();
		}
		return null;
	}
	public SqlResultMap setInot(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {
			data.param
				.table("inot_mast											")
				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")
				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			;data.attach(Action.delete);
			data.execute();
		} else {
			data.param
				.table("inot_mast")

				.where("where mmbr_idcd = :mmbr_idcd")
				.where("and   line_seqn = :line_seqn")

				.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"))

				.update("resv_date"			, arg.getParameter("resv_date"))
				.update("resv_time"			, arg.getParameter("resv_time"))
				.update("need_time"			, arg.getParameter("need_time"))
				.update("drtr_idcd"			, arg.getParameter("drtr_idcd"))
				.update("acce_date"			, arg.getParameter("acce_date"))
				.update("acce_seqn"			, arg.getParameter("acce_seqn"))
				.update("memo"				, arg.getParameter("memo"))
				.update("resv_stat_dvcd"	, arg.getParameter("resv_stat_dvcd"))
				.update("proc_drtr_idcd"	, arg.getParameter("proc_drtr_idcd"))
				.update("qntt"				, arg.getParameter("qntt"))
				.update("proc_date"			, arg.getParameter("proc_date"))
				.update("proc_time"			, arg.getParameter("proc_time"))
				.update("user_memo"			, arg.getParameter("user_memo"))
				.update("sysm_memo"			, arg.getParameter("sysm_memo"))
				.update("updt_idcd"			, arg.getParameter("updt_idcd"))
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(rowaction);
			data.execute();
		}
		return null;
	}

	public SqlResultMap setInot2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("inot_mast											")
					.where("where mmbr_idcd = :mmbr_idcd")
					.where("and   line_seqn = :line_seqn")
					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
				;data.attach(Action.delete);
				data.execute();
			} else {
				data.param
					.table("inot_mast")

					.where("where mmbr_idcd = :mmbr_idcd")
					.where("and   line_seqn = :line_seqn")

					.unique("mmbr_idcd"			, row.fixParameter("mmbr_idcd"))
					.unique("line_seqn"			, row.fixParameter("line_seqn"))

					.update("resv_date"			, row.getParameter("resv_date"))
					.update("resv_time"			, row.getParameter("resv_time"))
					.update("need_time"			, row.getParameter("need_time"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("acce_date"			, row.getParameter("acce_date"))
					.update("acce_seqn"			, row.getParameter("acce_seqn"))
					.update("memo"				, row.getParameter("memo"))
					.update("resv_stat_dvcd"	, row.getParameter("resv_stat_dvcd"))
					.update("proc_drtr_idcd"	, row.getParameter("proc_drtr_idcd"))
					.update("qntt"				, row.getParameter("qntt"))
					.update("proc_date"			, row.getParameter("proc_date"))
					.update("proc_time"			, row.getParameter("proc_time"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("sysm_memo"			, row.getParameter("sysm_memo"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
				data.execute();
			}
		}
		return null ;
	}
	public SqlResultMap setInotOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("inot_mast")

			.where("where mmbr_idcd = :mmbr_idcd")
			.where("and   line_seqn = :line_seqn")

			.unique("mmbr_idcd"			, arg.fixParameter("mmbr_idcd"))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"))
			.update("resv_stat_dvcd"	, arg.getParameter("ok_dvcd"))
			.update("proc_drtr_idcd"	, arg.getParameter("proc_drtr_idcd"))
			.update("qntt"				, arg.getParameter("qntt"))
			.update("proc_date"			, arg.getParameter("proc_date"))
			.update("proc_time"			, arg.getParameter("proc_time"))
			.update("updt_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}
	public SqlResultMap setItem_Mngt(HttpRequestArgument arg) throws Exception {
		int chk = 0;
		String item_idcd = "";
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			if(chk == 0){
				item_idcd = row.getParamText("item_idcd");
				chk++;
			}
			data.param
			.table("item_sbsc")

			.where("where item_idcd      = :item_idcd")
			.where("and   mngt_sbsc_idcd = :mngt_sbsc_idcd")

			.unique("item_idcd"			, item_idcd)
			.unique("mngt_sbsc_idcd"	, row.fixParameter("mngt_sbsc_idcd"	))

			.update("mngt_sbsc_valu"	, row.getParameter("mngt_sbsc_valu"	))
			.update("user_memo"			, row.getParameter("user_memo"		))
			.update("sysm_memo"			, row.getParameter("sysm_memo"		))

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

}
