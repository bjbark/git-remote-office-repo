package com.sky.system.custom.sjflv.prod.ProdBomList;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("sjflv.ProdBomListService")
public class ProdBomListService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.where("		, i.deli_date       , a.cstm_idcd       , a.remk_text         , a.find_name				")
			.where("		, a.cofm_yorn       , a.cofm_dttm		, a.acpt_dvcd									")
			.where("		, a.line_levl       , a.line_ordr       , a.line_stat         , a.line_clos         	")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.crte_user_name  , a.crte_ipad       , a.crte_dttm		  , a.crte_idcd				")
			.where("		, c.cstm_code       , c.cstm_name														")
			.where("		, i.item_idcd       , i.invc_qntt       , i.line_seqn									")
			.where("		, im.item_code      , im.item_name      , im.item_spec									")
		;
		data.param
			.where("from   acpt_item i																				")
			.where("left   outer join acpt_mast      a  on a.invc_numb = i.invc_numb								")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join item_mast      im on i.item_idcd = im.item_idcd								")
			.where("where  1=1																						")
			.where("and    ifnull(a.ordr_dvcd,0) != '4000'															")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.acpt_dvcd	 = :acpt_dvcd		" , arg.getParamText("acpt_dvcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc,i.invc_numb desc, i.line_seqn limit 99999999								")
			.where(")a")
		;

		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd       , a.revs_numb       , a.befr_splr_name      , a.splr_name	")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name           , i.item_spec	")
			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif       , i.item_idcd							")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd				")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("item_idcd"))
			.where("and   a.revs_numb = :revs_numb	", arg.getParameter("revs_numb"))
			.where("and   a.revs_dvcd = :revs_dvcd	", arg.getParameter("revs_dvcd"))
			.where("order by a.revs_numb														")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd		")
			.query("       , a.item_name       , a.item_spec      , a.used_yorn								")
			.query("       , cast(a.mixx_rate as char) as mixx_rate											")
			.query("       , cast(a.ofap_mixx_rate as char) as ofap_mixx_rate								")
			.query("       , a.adpt_date       , i.item_code      , a.revs_dvcd								")
			.query("       , b.kfda            , b.fema           , b.seqc           , b.wdgb				")
			.query("       , b.caca            , b.algy_yorn      , a.ivst_item_idcd as item_idcd			")
			.query("       , b.hala_numb       , b.natr_name      , b.incm_cost								")
			.query("       , d.base_name as acct_name														")

			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd								")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos			")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm			")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad			")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif								")
		;
		data.param
			.where("from  bom_mast a 															")
			.where("left outer join item_mast i on a.ivst_item_idcd = i.item_idcd				")
			.where("left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd				")
			.where("left outer join base_mast      d on i.acct_bacd = d.base_code and d.prnt_idcd = '1102'	")

			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"))
			.where("and   a.revs_numb      = :revs_numb			", arg.getParameter("revs_numb"))
			.where("and   a.revs_dvcd      = :revs_dvcd			", arg.getParameter("revs_dvcd"))
			.where("and   a.prnt_idcd      = :prnt_idcd			", arg.getParameter("prnt_idcd"))
			.where("order by a.line_seqn														")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.where("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.where("		, i.deli_date       , a.cstm_idcd       , a.remk_text         , a.find_name				")
			.where("		, a.cofm_yorn       , a.cofm_dttm		, a.acpt_dvcd									")
			.where("		, a.line_levl       , a.line_ordr       , a.line_stat         , a.line_clos         	")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.crte_user_name  , a.crte_ipad       , a.crte_dttm		  , a.crte_idcd				")
			.where("		, c.cstm_code       , c.cstm_name														")
			.where("		, i.item_idcd       , i.invc_qntt       , i.line_seqn									")
			.where("		, im.item_code      , im.item_name      , im.item_spec									")
			//2023.07.20 - 이갈훈 - 생산원료 배합 리비전을 사용 중인 것 중 마지막 리비전을 가져온다.
			.where("		, (select max(cast(revs_numb as unsigned)) from bom_revs where prnt_item_idcd = i.item_idcd and revs_dvcd = '1' and line_stat = '0') as revs_numb	")
		;
		data.param
			.where("from   acpt_item i																				")
			.where("left   outer join acpt_mast      a  on a.invc_numb = i.invc_numb								")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join item_mast      im on i.item_idcd = im.item_idcd								")
			.where("where  1=1																						")
			.where("and    ifnull(a.ordr_dvcd,0) != '4000'															")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"  ))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd"  ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd"  ))
			.where("and    i.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.where("and    i.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.where("and    a.acpt_dvcd	 = :acpt_dvcd		" , arg.getParamText("acpt_dvcd"  ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    not exists (select * from tbi_job_order_prod_list b where b.order_no = i.invc_numb and b.prod_cd = i.item_idcd) ")
			.where("order by a.invc_date desc,i.invc_numb desc, i.line_seqn limit 99999999								")
			.where(")a")
		;

		return data.selectForMap();
	}

	public SqlResultMap getSearch5(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String records   = arg.getParamText("records");
		String lcls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("lcls_idcd");
		String mcls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("mcls_idcd");
		String scls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("scls_idcd");

		data.param
			.query("call product_material_lack ( ")
			.query("	:param "    , records 	  )
			.query("  ,	:lcls_idcd ", lcls_idcd   )
			.query("  ,	:mcls_idcd ", mcls_idcd   )
			.query("  ,	:scls_idcd ", scls_idcd   )
			.query(") 							 ")
		;
		return data.selectForMap();
	}
	
	public SqlResultMap getSearch7(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String records   = arg.getParamText("records");
		String lcls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("lcls_idcd");
		String mcls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("mcls_idcd");
		String scls_idcd = ("".equals(arg.getParamText("lcls_idcd"))) ? "@" : arg.getParamText("scls_idcd");

		data.param
			.query("call product_material_lot_usage ( ")
			.query("	:param "    , records 	  )
			.query("  ,	:lcls_idcd ", lcls_idcd   )
			.query("  ,	:mcls_idcd ", mcls_idcd   )
			.query("  ,	:scls_idcd ", scls_idcd   )
			.query(") 							 ")
		;
		return data.selectForMap();
	}
}
