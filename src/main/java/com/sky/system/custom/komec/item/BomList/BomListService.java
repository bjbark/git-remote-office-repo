package com.sky.system.custom.komec.item.BomList;

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

@Service("komec.BomListService")
public class BomListService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");



		data.param
			.query("select    a.item_idcd       , a.item_code      , a.item_name      , a.line_stat					")
			.query("        , c.cstm_name       , b.cstm_idcd      , a.item_spec      , d.base_name as acct_name	")
		;
		data.param
			.where("from item_mast a 																				")
			.where("left outer join item_base_spec b on a.item_idcd = b.item_idcd									")
			.where("left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd									")
			.where("left outer join base_mast      d on a.acct_bacd = d.base_code and d.prnt_idcd = '1102'			")
			.where("where 1 = 1																						")
			.where("and    a.item_code >= :item_code	" , arg.getParameter("item_code") )
			.where("and    a.item_code <= :item_code2	" , arg.getParameter("item_code2") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') >= :invc_date1	" , arg.getParameter("invc1_date") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') <= :invc_date2	" , arg.getParameter("invc2_date") )
			.where("and    a.find_name like %:find_name%	"	, arg.getParameter("find_name"))
			.where("and    substr(a.acct_bacd,1,1) in ('3','2')									")
			.where("and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and    b.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))		)
			.where("order by item_code															")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String revs_dvcd = "1";
		if(arg.getParamText("add").equals("on")){
			revs_dvcd = "2";
		}
		data.param
			.query("select   a.prnt_item_idcd       , a.revs_numb       , a.befr_splr_name      , a.splr_name	")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name							")

			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif												")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_idcd = i.item_idcd					")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("item_idcd"))
			.where("and   a.revs_dvcd = :revs_dvcd	", revs_dvcd)
			.where("order by a.revs_numb														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch3(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call bom_tree(						")
			.query("     :prnt_item_idcd		",arg.fixParameter("prnt_item_idcd"))
			.query("   , :revs_numb				",arg.fixParameter("revs_numb"))
			.query("   , :revs_dvcd				",arg.fixParameter("revs_dvcd"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}

	public SqlResultMap getCstmSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.cstm_idcd       , a.cstm_name									")
		;
		data.param
			.where("from  cstm_mast a 															")
			.where("where 1 = 1																	")
			.where("and   a.sale_cstm_yorn = 1													")
			.where("and   a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
			.where("and   a.find_name like %:find_name%	",arg.getParameter("find_name"))
			.where("order by a.cstm_name														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getCstmSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("hq_id").toUpperCase().equals("N1000SJFLV")) {
			data.param
				.query("select   b.item_idcd       , b.item_code        ,b.item_name				")
			;
			data.param
				.where("from  item_cont a 															")
				.where("left outer join item_mast b on a.item_idcd = b.item_idcd					")
				.where("where 1 = 1																	")
				.where("and a.last_yorn = '1'  														")
				.where("and b.acct_bacd = '3000'													")
				.where("and   a.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
				.where("order by b.item_code														")
			;
		} else {
			data.param
				.query("select   a.item_idcd       , a.item_code        ,a.item_name				")
			;
			data.param
				.where("from  item_mast a 															")
				.where("left outer join item_base_spec b on a.item_idcd = b.item_idcd				")
				.where("where 1 = 1																	")
				.where("and   b.cstm_idcd = :cstm_idcd			",arg.fixParameter("cstm_idcd"))
				.where("order by a.item_code														")
			;
		}

		return data.selectForMap();
	}
	public SqlResultMap getCstmSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String revs_dvcd = "1";
		if(arg.getParamText("add").equals("on")){
			revs_dvcd = "2";
		}

		data.param
			.query("select   a.prnt_item_idcd       , a.revs_numb       , a.befr_splr_name      , a.splr_name	")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name							")

			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif												")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_idcd = i.item_idcd					")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("item_idcd"))
			.where("and   a.revs_dvcd = :revs_dvcd				", revs_dvcd)
			.where("order by a.revs_numb														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getCstmSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with recursive cte as(")
			.query("    select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd	")
			.query("           , a.item_name       , a.item_spec											")
			.query("           , cast(a.mixx_rate as char) as mixx_rate										")
			.query("           , a.adpt_date       , i.item_code      , a.revs_dvcd							")
			.query("           , b.kfda            , b.fema           , b.seqc           , b.wdgb			")
			.query("           , b.caca            , b.algy_yorn											")
			.query("           , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.query("           , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("           , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("           , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("           , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
			.query("           , @rank := @rank+1 as rank													")
			.query("           , rpad('1',4,(@rank)*100) as prnt_rank										")
			.query("           , 1 as levl         															")
			.query("           , concat('ㅡ',1,'                  ') as levl_str								")
			.query("           , a.ivst_item_idcd as str													")
			.query("           , ifnull(s.has_child,0) as has_child											")
			.query("    from  bom_mast a 																	")
			.query("    left outer join item_mast i on a.ivst_item_idcd = i.item_idcd						")
			.query("    left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd						")
			.query("    left outer join ( select count(*) as has_child,prnt_item_idcd						")
			.query("                      from bom_mast 													")
			.query("                      where revs_dvcd = :revs_dvcd4			",arg.fixParameter("revs_numb"))
			.query("                      group by prnt_item_idcd											")
			.query("                    ) s on a.ivst_item_idcd = s.prnt_item_idcd							")
			.query("    ,(select @rank := 0) r																")
			.query("    where 1 = 1																			")
			.query("    and   a.prnt_item_idcd = :prnt_item_idcd					",arg.fixParameter("prnt_item_idcd"))
			.query("    and   a.revs_numb      = :revs_numb							",arg.fixParameter("revs_numb"))
			.query("    and   a.revs_dvcd      = :revs_dvcd							",arg.fixParameter("revs_dvcd"))
			.query("    union all																			")
			.query("    select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd	")
			.query("           , a.item_name       , a.item_spec											")
			.query("           , cast(a.mixx_rate as char) as mixx_rate										")
			.query("           , a.adpt_date       , i.item_code      , a.revs_dvcd							")
			.query("           , b.kfda            , b.fema           , b.seqc           , b.wdgb			")
			.query("           , b.caca            , b.algy_yorn											")
			.query("           , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.query("           , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("           , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("           , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("           , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
			.query("           , if(c.str <> a.prnt_item_idcd , @ranks:= 0,c.rank) as rank					")
			.query("           , (if(c.str = a.prnt_item_idcd,c.prnt_rank+((@rank2:=@rank2+1)*10),c.prnt_rank+@ranks:=@ranks+1)) as prnt_rank				")
			.query("           , levl+1 as levl																")
			.query("           , concat(lpad('',levl+1,'　'),'└ ',levl+1) as levl_str						")
			.query("           , @str := a.prnt_item_idcd as str											")
			.query("           , ifnull(s.has_child,0)  as has_child										")
			.query("    from  bom_mast a 																	")
			.query("    inner join       cte           c on a.prnt_item_idcd = c.ivst_item_idcd				")
			.query("    left outer join item_mast      i on a.ivst_item_idcd = i.item_idcd					")
			.query("    left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd						")
			.query("    left outer join ( select count(*) as has_child,prnt_item_idcd						")
			.query("                      from   bom_mast 													")
			.query("                      where   revs_dvcd      = :revs_dvcd3	",arg.fixParameter("revs_dvcd"))
			.query("                      group by prnt_item_idcd											")
			.query("                    ) s on a.ivst_item_idcd = s.prnt_item_idcd							")
			.query("    ,(select @ranks := 0,@rank2 := 1,@str := '') r2										")
			.query("    where a.revs_dvcd = :revs_dvcd2											",arg.fixParameter("revs_dvcd"))
			.query("    and   a.revs_numb = (select max(revs_numb) from bom_mast r where a.prnt_item_idcd = r.prnt_item_idcd)")
			.query(")																						")
			.query("select *																				")
		;
		data.param
			.where("from  cte a 																			")
			.where("order by prnt_rank,levl,line_seqn														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMtrlSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.item_idcd       , a.item_name       , a.item_spec      , a.item_code		")
			.query("       , b.kfda            , b.fema            , b.seqc           , b.wdgb			")
			.query("       , b.caca            , b.algy_yorn											")

			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
		;
		data.param
			.where("from  item_mast a															")
			.where("left outer join item_mtrl_spec b on a.item_idcd = b.item_idcd				")
			.where("left outer join item_base_spec c on a.item_idcd = c.item_idcd				")
			.where("where 1 = 1																	")
			.where("and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and    c.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
			.where("and    a.item_code >= :item_code	" , arg.getParameter("item_code") )
			.where("and    a.item_code <= :item_code2	" , arg.getParameter("item_code2") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') >= :invc_date1	" , arg.getParameter("invc1_date") )
			.where("and    date_format(a.crte_dttm,'%Y%m%d') <= :invc_date2	" , arg.getParameter("invc2_date") )
			.where("and   a.find_name like %:find_name%	", arg.getParameter("find_name"))
			.where("order by a.acct_bacd,a.item_code											")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMtrlSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String revs_dvcd = "1";
		if(arg.getParamText("add").equals("on")){
			revs_dvcd = "2";
		}
		data.param
			.query("select   i.item_code       , i.item_name       , a.revs_numb      , a.adpt_date		")
			.query("       , cast(a.mixx_rate as char) as mixx_rate										")

			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
		;
		data.param
			.where("from bom_mast a																		")
			.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd						")
			.where("where  a.ivst_item_idcd = :item_idcd	", arg.fixParameter("item_idcd"))
			.where("and    a.revs_dvcd      = :revs_dvcd	", revs_dvcd)
			.where("order by i.item_code,a.revs_numb													")
		;
		return data.selectForMap();
	}
	public SqlResultMap getSpecSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");


		data.param
			.query("select																					")
			.query("		   a.item_idcd		, a.item_spec		, a.item_code		, a.item_name		")
			.query("		 , c1.clss_name as lcls_name , c2.clss_name as mcls_name , c3.clss_name as scls_name")
			.query("		 , (select base_name from base_mast r where a.acct_bacd  = r.base_code			")
			.query("											 and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("		 , i.appr			, i.test_ordr		, i.dnst								")
			.query("		 , i.rfct_indx		, i.asen			, i.hmtl			, i.lead			")
			.query("		 , i.alin_mtrl		, i.ingd			, i.slvt_carr		, i.shlf_life		")
			.query("		 , i.strg_cond		, i.melt_pont		, i.flsh_pont		, i.ph				")
			.query("		 , i.ecil			, i.vtrl_cont		, i.brix			, i.guis			")
			.query("		 , i.etcc_cont		, i.remk_text												")
			.query("		 , a.user_memo		, a.sysm_memo		, a.prnt_idcd							")
			.query("		 , a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos		")
			.query("		 , a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm		")
			.query("		 , a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad		")
			.query("		 , a.crte_dttm		, a.crte_idcd		, a.crte_urif							")
		;
		data.param //퀴리문
			.where("from	item_mast a																		")
			.where("		left outer join item_clss    c1 on a.lcls_idcd = c1.clss_idcd					")
			.where("		left outer join item_clss    c2 on a.mcls_idcd = c2.clss_idcd					")
			.where("		left outer join item_clss    c3 on a.scls_idcd = c3.clss_idcd					")
			.where("		left outer join item_spec     i on a.item_idcd = i.item_idcd					")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and		a.acct_bacd  = :acct_code		" , arg.getParameter("acct_code"))
			.where("and		a.item_idcd  = :item_idcd		" , arg.getParameter("item_idcd"))
			.where("order by a.item_idcd")
		;
		return data.selectForMap();
	}
}
