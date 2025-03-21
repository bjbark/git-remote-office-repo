package com.sky.system.custom.sjflv.stock.isos.goodsosttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.GoodsosttWorkService")
public class GoodsosttWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																				 		")
			.where("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd 		")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date        , a.sale_stor_yorn	")
			.where("        , a.crny_dvcd        , a.excg_rate       											")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif		 , i.item_name								")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("        , cast(json_value(a.json_data, '$.ostt_trnt_dvcd') as char) as ostt_trnt_dvcd		")
			.where("        , cast(json_value(a.json_data, '$.ostt_trnt_amnt') as char) as ostt_trnt_amnt		")
			.where("        , a.remk_text 																		")
			.where("        , c2.dely_cstm_name as dlvy_cstm_name												")
			.where("        , (select group_concat(im.item_name separator ' / ')								")
			.where("             from sale_ostt_item oi 														")
			.where("                  left outer join item_mast im on im.item_idcd = oi.item_idcd				")
			.where("            where invc_numb = a.invc_numb) as ostt_item_list								")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_deli c2 on replace(json_extract(a.json_data, '$.dlvy_cstm_idcd'),'\"','') = c2.dlvy_cstm_idcd	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join item_mast i on s.item_idcd = i.item_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd        "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat  = :line_stat1       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb desc																	")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getMaster1Test(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																				 		")
			.where("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd 		")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date        , a.sale_stor_yorn	")
			.where("        , a.crny_dvcd        , a.excg_rate       											")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif		 , i.item_name								")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("        , cast(json_value(a.json_data, '$.ostt_trnt_dvcd') as char) as ostt_trnt_dvcd		")
			.where("        , cast(json_value(a.json_data, '$.ostt_trnt_amnt') as char) as ostt_trnt_amnt		")
			.where("        , a.remk_text 																		")
			.where("        , c2.dely_cstm_name as dlvy_cstm_name												")
			.where("        , (select group_concat(im.item_name separator ' / ')								")
			.where("             from sale_ostt_item oi 														")
			.where("                  left outer join item_mast im on im.item_idcd = oi.item_idcd				")
			.where("            where invc_numb = a.invc_numb) as ostt_item_list								")
			.where("from sale_ostt_mast_test a																	")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_deli c2 on replace(json_extract(a.json_data, '$.dlvy_cstm_idcd'),'\"','') = c2.dlvy_cstm_idcd	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item_test s on a.invc_numb = s.invc_numb							")
			.where("left outer join item_mast i on s.item_idcd = i.item_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd        "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat  = :line_stat1       " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb desc																	")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb         , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.query("        , a.ostt_qntt        , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.orig_invc_numb   , a.orig_seqn      , a.acpt_seqn								")
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getDetail1Test(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb         , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.query("        , a.ostt_qntt        , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.orig_invc_numb   , a.orig_seqn      , a.acpt_seqn								")
		;
		data.param
			.where("from sale_ostt_item_test a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from ( select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd	")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.ostt_schd_date   , a.ostt_yorn       , a.ostt_date        , a.trut_dvcd			")
			.where("        , a.dlvy_cond_dvcd   , a.deli_date       , a.sale_stor_yorn   , a.crny_dvcd			")
			.where("        , a.excg_rate        , a.pcod_numb       , a.remk_text 								")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , b.cstm_code        , b.cstm_name       , c.user_name        , e.wrhs_name 		")
			.where("from spts_mast a																			")
			.where("left outer join cstm_mast b on a.cstm_idcd      = b.cstm_idcd								")
			.where("left outer join user_mast c on a.drtr_idcd      = c.user_idcd								")
			.where("left outer join spts_item d on a.invc_numb      = d.invc_numb								")
			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.orig_invc_numb, s.orig_seqn	")
			.where("                  from sale_ostt_item s 														")
			.where("                  group by s.orig_invc_numb, s.orig_seqn										")
			.where("                  ) so on d.invc_numb = so.orig_invc_numb and d.line_seqn = so.orig_seqn			")
			.where("left outer join wrhs_mast e on d.wrhs_idcd      = e.wrhs_idcd								")
			.where(",(select invc_numb, min(ostt_yorn) as ostt_yorn from spts_item group by invc_numb) s		")
			.where("where   1=1																					")
			.where("and     a.invc_numb = s.invc_numb															")
			.where("and     0 = s.ostt_yorn																		")
			.where("and     (ifnull(d.trst_qntt,0)-ifnull(so.ostt_qntt,0)) > 0							")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     d.item_idcd  = :item_idcd        " , arg.getParamText("item_idcd"  ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
			.where(") a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.line_seqn       , a.acpt_numb        , a.acpt_seqn				")
			.query("        , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric		")
			.query("        , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate				")
			.query("        , a.sale_amnt        , a.vatx_amnt       , a.ttsm_amnt        , a.deli_date				")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.wrhs_idcd        , a.dlvy_cstm_idcd		")
			.query("        , a.dsct_yorn        , a.ostt_dvcd       , a.insp_dvcd        , a.insp_date				")
			.query("        , a.pcod_numb        , a.ostt_yorn       , a.ostt_date        , a.ostt_qntt				")
			.query("        , a. uper_seqn       , a.disp_seqn       , (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0)) as unpaid	")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
			.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name									")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , u.unit_name				")
		;
		data.param
			.where("from spts_item a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.orig_invc_numb, s.orig_seqn	")
			.where("                  from sale_ostt_item s 														")
			.where("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb					")
			.where("                  where m.line_stat < 2															")
			.where("                  group by s.orig_invc_numb, s.orig_seqn										")
			.where("                  ) s on a.invc_numb = s.orig_invc_numb and a.line_seqn = s.orig_seqn			")
			.where("where   1=1																						")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     (ifnull(a.trst_qntt,0)-ifnull(s.ostt_qntt,0)) > 0										")
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap info;
		data.param
			.query("select  *																						")
		;
		data.param
			.where("from (  select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn											")
			.where("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
			.where("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
			.where("        , a.item_idcd        , a.unit_idcd as sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric			")
			.where("        , a.stnd_unit        , a.stnd_unit_qntt               , a.wrhs_idcd        , a.dlvy_cstm_idcd			")
			.where("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
			.where("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
			.where("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
			.where("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid			")
			.where("        , a.user_memo        , a.sysm_memo       , a.line_levl        , a.invc_numb as prnt_idcd")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , i.item_code        , i.item_name       , i.item_spec								")
			.where("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd								")
			.where("        , json_value(b.json_data, '$.prod_trst_dvcd') as prod_trst_dvcd						")
			.where("from acpt_item a 																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn	")
			.where("                  from sale_ostt_item s 													")
			.where("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb				")
			.where("                  where m.line_stat < 2														")
			.where("                  group by s.acpt_numb, s.acpt_seqn											")
			.where("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn			")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("where   1=1																					")
			.where("and     (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0					")
			.where("and     b.acpt_stat_dvcd > 0010												")
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.where("and     b.acpt_dvcd = :acpt_dvcd         " , arg.getParamText("acpt_dvcd"  ))
			.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.cstm_idcd,a.invc_numb,a.line_seqn												")
			.where(") a																							")
		;
		info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("with cte as (  ")
				.query("select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn													")
				.query("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
				.query("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
				.query("        , a.item_idcd        , a.unit_idcd as sale_unit               , a.norm_sale_pric   , a.sale_stnd_pric	")
				.query("        , a.stnd_unit        , a.stnd_unit_qntt  , b.dlvy_cstm_idcd						")
				.query("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
				.query("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
				.query("        , a.user_memo        , a.sysm_memo       , a.invc_numb as prnt_idcd        , a.line_levl				")
				.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
				.query("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid			")
				.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
				.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
				.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
				.query("        , i.item_code        , i.item_name       , i.item_spec        , c.cstm_code				")
				.query("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd        , c.cstm_name				")
				.query("        , cd.dlvy_addr_1fst  , cd.dely_cstm_name , b.acpt_dvcd									")
				.query("        , json_value(b.json_data,'$.prod_trst_dvcd') as prod_trst_dvcd, i.acct_bacd				")
				.query("        , (CASE																					")
				.query("           WHEN i.acct_bacd = 1001 THEN '02'													")
				.query("           WHEN i.acct_bacd = 2002 THEN '01'													")
				.query("           WHEN i.acct_bacd = 3000 THEN '01'													")
				.query("           WHEN i.acct_bacd = 4000 THEN '01'													")
				.query("           end ) as wrhs_idcd 																	")
				.query("        , (CASE																					")
				.query("           WHEN i.acct_bacd = 1001 THEN '자재창고'												")
				.query("           WHEN i.acct_bacd = 2002 THEN '제품창고'												")
				.query("           WHEN i.acct_bacd = 3000 THEN '제품창고'												")
				.query("           WHEN i.acct_bacd = 4000 THEN '제품창고'												")
				.query("           end ) as wrhs_name																	")
				.query("from acpt_item a 																				")
				.query("left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
				.query("left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd										")
				.query("left outer join cstm_deli cd on cd.dlvy_cstm_idcd = b.dlvy_cstm_idcd							")
				.query("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn, count(*) as ostt_cont ")
				.query("                  from sale_ostt_item s 														")
				.query("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb					")
				.query("                  where m.line_stat < 2															")
				.query("                  group by s.acpt_numb, s.acpt_seqn												")
				.query("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn				")
				.query("left outer join item_mast i on a.item_idcd = i.item_idcd										")
				.query("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
				.query("where   1=1																						")
				// OEM수주이면서 재고생산인 경우 출고 건이 있으면 제외한다. 그 외는 입고수량 - 출고수량 > 0 인 것을 제외한다.
				.query("and     case when b.acpt_dvcd = '2000' and json_value(b.json_data,'$.prod_trst_dvcd') = '2000' then ")
				.query("                   ifnull(s.ostt_cont, 0) = 0 													")
				.query("             else (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0								")
				.query("        end                                                                                     ")
				.query("and     b.acpt_stat_dvcd > '0010'																")
				.query("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
				.query("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
				.query("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
				.query("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
				.query("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
				.query("and     b.acpt_dvcd = :acpt_dvcd         " , arg.getParamText("acpt_dvcd"  ))
				.query("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
				// 삼정수주는 재고생산만 제외한다.
				.query("and     ((b.acpt_dvcd = '1000' and json_value(b.json_data,'$.prod_trst_dvcd') <> '2000') or b.acpt_dvcd = '2000') ")
				.query("order by c.cstm_name,a.invc_numb,a.line_seqn													")
				.query(") 																								")
				.query("select																							")
				.query("    a.acpt_numb        , a.acpt_seqn															")
				.query("  , a.sale_amnt        , a.ttsm_amnt       , a.deli_date        , a.vatx_amnt					")
				.query("  , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate					")
				.query("  , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric				")
				.query("  , a.stnd_unit        , a.stnd_unit_qntt  , a.dlvy_cstm_idcd				")
				.query("  , dsct_yorn          , a.ostt_dvcd       , insp_dvcd          , insp_date						")
				.query("  , a.pcod_numb        , ostt_yorn         , ostt_date											")
				.query("  , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
				.query("  , a.crte_idcd        , a.crte_urif       , a.modl_name        , acpt_date						")
				.query("  , a.ostt_qntt        , unpaid																	")
				.query("  , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
				.query("  , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
				.query("  , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
				.query("  , a.item_code        , a.item_name       , a.item_spec        , a.cstm_code					")
				.query("  , a.drtr_idcd        , a.dept_idcd       , a.cstm_idcd        , a.cstm_name					")
				.query("  , a.dlvy_addr_1fst   , a.dely_cstm_name  , 0 as used_yorn    , '' as prnt_idcd				")
				.query("  , a.acpt_dvcd        , a.prod_trst_dvcd  , a.acct_bacd										")
				.query("  , a.wrhs_idcd        , a.wrhs_name 															")
				.query("from cte a																						")
			;
			// 23.10.13 - 삼정인 경우 OEM 원재료 정보를 가져온다.
			if ("N1000SJUNG".equals(arg.hq.toUpperCase())) {
				data.param
					.query("union all																						")
					// OEM수주이면서 주문생산,재고생산인 경우에만 배합비 정보를 가져온다.
					// 23.10.10 - OEM원재료 단가를 판매처 단가로 가져온다
					.query("select																							")
					.query("    a.acpt_numb        , a.acpt_seqn															")
					.query("  , a.sale_amnt        , a.ttsm_amnt       , a.deli_date        , a.vatx_amnt					")
//					.query("  , ifnull((select cont_pric from item_cont where item_idcd = d.part_cd and last_yorn = '1' and pric_dvcd <> '3000' order by cont_date desc limit 1), 0) as sale_pric ")
					.query("  , ifnull((select cont_pric from item_cont where item_idcd = ifnull(d.item_idcd, d2.part_cd) and last_yorn = '1' and pric_dvcd <> '3000' order by cont_date desc limit 1), 0) as sale_pric ")
					.query("  , round(ifnull(d.ostt_qntt, d2.used_amount),3) as trst_qntt   , a.vatx_incl_yorn   , a.vatx_rate					")
					.query("  , ifnull(d.item_idcd, d2.part_cd)  as item_idcd               , null as sale_unit  , 0 as norm_sale_pric			")
					.query("  , 0 as sale_stnd_pric, null as stnd_unit , d.stnd_unit_qntt									")
					.query("  , a.dlvy_cstm_idcd   , dsct_yorn         , a.ostt_dvcd        , insp_dvcd          , insp_date")
					.query("  , a.pcod_numb        , ostt_yorn         , ostt_date											")
					.query("  , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
					.query("  , a.crte_idcd        , a.crte_urif       , a.modl_name        , a.acpt_date					")
					.query("  , 0 as ostt_qntt     , round(ifnull(d.ostt_qntt, d2.used_amount),3) as unpaid					")
					.query("  , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
					.query("  , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
					.query("  , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
					.query("  , ifnull(i.item_code, i2.item_code) as item_code												")
					.query("  , ifnull(i.item_name, i2.item_name) as item_name												")
					.query("  , ifnull(i.item_spec, i2.item_spec) as item_spec              , a.cstm_code					")
					.query("  , a.drtr_idcd        , a.dept_idcd       , a.cstm_idcd        , a.cstm_name					")
					.query("  , a.dlvy_addr_1fst   , a.dely_cstm_name  , ifnull(c.used_yorn, c2.used_yorn) as used_yorn		")
					.query("  , a.item_idcd as prnt_idcd  , a.acpt_dvcd        , a.prod_trst_dvcd							")
					.query("  , ifnull(i.acct_bacd, i2.acct_bacd) as acct_bacd												")
					.query("  , (CASE																						")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 1001 THEN '02'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 2002 THEN '01'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 3000 THEN '01'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 4000 THEN '01'									")
					.query("    end ) as wrhs_idcd 																			")
					.query("  , (CASE																						")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 1001 THEN '자재창고'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 2002 THEN '제품창고'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 3000 THEN '제품창고'									")
					.query("     WHEN ifnull(i.acct_bacd, i2.acct_bacd) = 4000 THEN '제품창고'									")
					.query("    end ) as wrhs_name																			")
					.query("from cte a																						")
					.query("left outer join tbi_job_order_prod_list b2 on a.acpt_numb = b2.order_no and a.acpt_seqn = b2.order_seq and a.item_idcd = b2.prod_cd ")
					.query("left outer join pror_mast b  on  a.acpt_numb = b.acpt_numb and a.acpt_seqn = b.acpt_seqn and a.item_idcd = b.item_idcd ")
					.query("left outer join bom_mast  c2 on  b2.prod_cd = c2.prnt_item_idcd and c2.used_yorn = '1' and b2.bom_rev_no = c2.revs_numb and c2.revs_dvcd = '1' ")
					.query("left outer join bom_mast  c  on  b.item_idcd = c.prnt_item_idcd and c.used_yorn = '1' and b.bomt_degr = c.revs_numb and  c.revs_dvcd = '1' ")
					.query("left outer join haccp_ccp_monitoring_mix d2 on c2.ivst_item_idcd = d2.part_cd and b2.job_order_no = d2.job_order_no ")
					.query("left outer join mtrl_ostt_item d on c.ivst_item_idcd = d.item_idcd and b.invc_numb = d.wkod_numb and d.oem_yorn = '1'	")
					.query("left outer join item_mast i on d.item_idcd = i.item_idcd										")
					.query("left outer join item_mast i2 on d2.part_cd = i2.item_idcd										")
					.query("where (d.item_idcd is not null or d2.part_cd is not null)										")
					.query("and a.acpt_dvcd = '2000' 																		")
					.query("and a.prod_trst_dvcd <> '3000' 																	")
				;
			}

			data.param
				.query("order by acpt_numb, acpt_seqn																	")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String invc_numb = "";
		String wrhs_idcd = "";
		String spts_invc = null;
		for (SqlResultRow row:map) {
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class), invc_numb , wrhs_idcd );
			}
		}
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map, String invc_numb , String wrhs_idcd ) throws Exception {
		ParamToJson trans = new ParamToJson();
		String sale_invc_numb = "";
		for(SqlResultRow row:map) {
			if(row.getParamText("new_line_seqn").equals("1")){
				// 23.10.17 - 제품출고 후 운송비용 등록하는 방식으로 변경으로 주석처리
				String json_data = trans.TranslateRow(arg, row, "sale_ostt_mast_json_fields");

				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, mst.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, mst.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, mst.getParameter("ostt_date"		))	//Invoice일자
					.update("dept_idcd"			, mst.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)
					.update("json_data"			, json_data)							//json_data
					.update("remk_text"			, mst.getParameter("remk_text"		))	//비고

					.update("updt_idcd"			, mst.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, mst.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				// 2024.02.06 임수찬 : 출고시 매출내역에도 추가 등록.

				if (("1000".equals(row.getParameter("acpt_dvcd")) && !"2000".equals(row.getParameter("prod_trst_dvcd")))
				||  ("2000".equals(row.getParameter("acpt_dvcd")) && !"3000".equals(row.getParameter("prod_trst_dvcd")))) {
					data.param
						.query("call fn_seq_gen_v2 (			")
						.query("   :STOR "   	, arg.store		)  // 본사코드
						.query(" , :table "  	, "sale_mast"	)  // 테이블명
						.query(" , :invc_numb " , "not defined"	)  // Invoice 번호
						.query(" ) 								")
					;
					sale_invc_numb = (String)data.selectForMap().get(0).get("seq");
					data.clear();

					data.param
						.table("sale_mast											")
						.where("where invc_numb		= :invc_numb						")	//invoice번호

						.unique("invc_numb"			, sale_invc_numb)	//invoice번호

						.update("invc_date"			, mst.getParameter("ostt_date"		))	//출고일자
						.update("sale_path_dvcd"	, "00")									//판매경로구분코드
						.update("rqod_rcvd_dvcd"	, "2")									//청구영수구분코드
						.update("bzpl_idcd"			, mst.getParameter("bzpl_idcd"		))	//사업장ID
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
						.update("ostt_dvcd"			, "2200")								//출고구분(판매출고)
						.update("drtr_idcd"			, mst.getParameter("drtr_idcd"		))	//담당자ID
						.update("dept_idcd"			, mst.getParameter("dept_idcd"		))	//부서ID

						.update("updt_idcd"			, mst.getParameter("updt_idcd"		))
						.insert("crte_idcd"			, mst.getParameter("crte_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}
			}

			data.param
				.table("sale_ostt_item												")
				.where("where invc_numb		= :invc_numb							")		//invoice번호
				.where("and   line_seqn		= :line_seqn							")		//순번

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

				.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
				.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
				.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
				.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
				.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
				.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
				.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
				.update("ostt_qntt"			, row.getParameter("ostt_qntt2"			))		//출고수량
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
				.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
				.update("sale_amnt"			, row.getParameter("new_sale_amnt"		))		//판매금액
				.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"		))		//부가세금액
				.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"		))		//합계금액
				.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
				.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
				.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
				.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))		//창고ID
				.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
				.update("dsct_yorn"			, row.getParameter("dsct_yorn"			))		//중단여부
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))		//출고구분코드
				.update("insp_dvcd"			, row.getParameter("insp_dvcd"			))		//검사구분코드
				.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//출하지시번호
				.update("orig_seqn"			, row.getParameter("line_seqn"			))		//출하지시항번
				.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO
				.update("sale_invc_numb"	, row.getParameter("sale_invc_numb"		))		//판매invoice번호
				.update("sale_qntt"			, row.getParameter("sale_qntt"			))		//판매수량
				.update("user_memo"			, row.getParameter("user_memo"			))		//비고
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			if (("1000".equals(row.getParameter("acpt_dvcd")) && !"2000".equals(row.getParameter("prod_trst_dvcd")))
			||  ("2000".equals(row.getParameter("acpt_dvcd")) && !"3000".equals(row.getParameter("prod_trst_dvcd")))) {

				data.param
					.table("sale_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, sale_invc_numb)		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("invc_type"			, "SALE")										//수주번호
					.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("sale_qntt"			, row.getParameter("ostt_qntt2"			))		//출고수량
					.update("sale_amnt"			, row.getParameter("new_sale_amnt"		))		//판매금액
					.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"		))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"		))		//합계금액
					.update("dlvy_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.fixParameter("new_invc_numb"		))		//출하지시번호
					.update("orig_invc_seqn"	, row.fixParameter("new_line_seqn"		))		//출하지시항번
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}

			// 수주구분=OEM수주, 생산구분=재고주문은 판매현황만 관리한다.
			// 수주구분=OEM수주, 생산구분=재고생산은 원재료가 아닌 경우 수불내역을 생성하지 않는다.
			boolean isOstt = true;
			if ("2000".equals(row.getParamText("acpt_dvcd")) && "2000".equals(row.getParamText("prod_trst_dvcd")) && Integer.parseInt(row.getParamText("acct_bacd" ).substring(0, 2)) > 10) {
				isOstt = false;
			}

			// 23.10.30 - 이강훈 - Lot를 Lot번호^수령 형식으로 변경
			if (isOstt) {
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				data.param
					.query("call ostt_isos_sjflv(")
					.query("   :invc_numb", row.fixParameter("new_invc_numb"))
					.query(" , :line_seqn", row.fixParameter("new_line_seqn"))
					.query(" , :item_idcd", row.getParameter("item_idcd"))
					.query(" , :lott_numb", row.getParameter("lott_numb_sum"))
					.query(" , :ostt_qntt", row.getParameter("ostt_qntt2"))
					.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
	}

	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			data.param
				.where("select count(a.invc_numb) as count										")
				.where("from   crdt_colt_item  a												")
				.where("where  1 = 1															")
				.where("and exists (select '1'													")
				.where("             from sale_item b											")
				.where("             where 1 = 1												")
				.where("             and b.orig_invc_numb = :invc_numb	" , row.getParamText("invc_numb"))
				.where("             and b.invc_numb = a.orig_invc_numb							")
				.where("            )															")
			;
			int count = Integer.parseInt(data.selectForRow().getParamText("count"));
			data.clear();

			if ( 0 < count){
				throw new ServiceException("수금이 등록되어있는 매출입니다.<br><br>삭제 할 수 없습니다." );
			}


			//2022.04.25 - 이강훈 - 수주진행상태를 처리하기 위하여 삭제 전 출고에  등록된 수주번호를 가져온다.
			data.param
				.query("select group_concat(distinct acpt_numb) as acpt_numb ")
				.where("from   sale_ostt_item							")
				.where("where  invc_numb = :invc_numb	" ,row.getParamText("invc_numb"))
				.where("and    line_stat < '2' ")
			;

			SqlResultRow tmp = data.selectForRow();
			data.clear();

			data.param
				.table("sale_ostt_mast												")
				.where("where invc_numb = :invc_numb								")		//invoice번호
				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.update("line_stat"			, "2" )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("sale_ostt_item													")
				.where("where invc_numb = :invc_numb									")		//invoice번호
				.unique("invc_numb"			, row.fixParameter("invc_numb"				))
				.update("line_stat"			, "2" )
				.update("ostt_qntt"			, "0" )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			// 2024.02.06 임수찬 : 출고삭제시 매출내역 삭제 추가.
			data.param
				.query("delete from sale_mast ")
				.query("where invc_numb in ( select invc_numb	")
				.query("                     from sale_item		")
				.query("                     where orig_invc_numb = :invc_numb", row.fixParameter("invc_numb"))
				.query("                   )					")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

			data.param
				.query("delete from sale_item")
				.query("where orig_invc_numb = :invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
			data.param
				.query("call ostt_isos_sjflv(")
				.query("   :invc_numb", row.fixParameter("invc_numb"))
				.query(" , :line_seqn", "0")
				.query(" , :item_idcd", "0")
				.query(" , :lott_numb", "0")
				.query(" , :ostt_qntt", "0")
				.query(")")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

			//2022.04.25 - 이강훈 - 수주진행상태를 변경한다.
			data.param
				.query("call auto_acpt_stat_dvcd (	")
				.query("  :invc_numb "  , tmp.getParamText("acpt_numb")	) // Invoice 번호
				.query(" ) 							")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null ;
	}

	// 송장엑셀업로드 자료 삭제
	public void delExcelUpload(HttpRequestArgument arg, String invc_date) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("hdli_dlvy_mast							")
			.where("where invc_date		= :invc_date		")  //invoice번호
			.where("and   dlvy_used_yorn= :dlvy_used_yorn	")  //배송사용여부

			.unique("invc_date"			, invc_date		 	 )	//invoice번호
			.unique("dlvy_used_yorn"	, "1"		 	 	 )  //배송사용여부
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return;
	}

	// 송장엑셀업로드 자료 등록
	public void setExcelUpload(HttpRequestArgument arg, SqlResultRow item ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String dlvy_dinv_numb	= item.getParamText("dlvy_dinv_numb");
		String dlvy_qntt		= item.getParamText("dlvy_qntt").replaceAll(",", "");
		String dlvy_exps		= item.getParamText("dlvy_exps").replaceAll(",", "");

		if (!StringUtils.isEmpty(dlvy_dinv_numb)) {
			data.param
				.table("hdli_dlvy_mast												")
				.where("where invc_numb		= :invc_numb							")	//invoice번호

				.unique("invc_numb"			, item.fixParameter("invc_numb"			))	//invoice번호

				.insert("invc_date"			, item.getParameter("invc_date"			))	//invoice일자
				.insert("dlvy_dinv_numb"	, dlvy_dinv_numb						 )	//배송송장번호
				.insert("dlvy_rcpt_hmlf"	, item.getParameter("dlvy_rcpt_hmlf"	))	//배송수신인명
				.insert("dlvy_tele_numb"	, item.getParameter("dlvy_tele_numb"	))	//배송전화번호
				.insert("dlvy_hdph_numb"	, item.getParameter("dlvy_hdph_numb"	))	//배송휴대폰번호
				.insert("dlvy_addr_1fst"	, item.getParameter("dlvy_addr_1fst"	))	//배송주소1
				.insert("dlvy_qntt"			, dlvy_qntt								 )	//배송수량
				.insert("dlvy_exps"			, dlvy_exps								 )	//배송비용
				.insert("dlvy_brch_name"	, item.getParameter("dlvy_brch_name"	))	//배송지점
				.insert("hdli_dinv_qntt"	, item.getParameter("hdli_dinv_qntt"	))	//택배송장수량
				.insert("user_memo"			, item.getParameter("user_memo"			))	//비고
				.insert("dlvy_used_yorn"	, item.getParameter("dlvy_used_yorn"	))	//배송사용여부

				.insert("updt_idcd"			, arg.getParamText("lgin_idcd"))
				.insert("crte_idcd"			, arg.getParamText("lgin_idcd"))
				.insert("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.insert("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}

		return;
	}

	// 택배비용등록
	public SqlResultMap setTrntCost(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");

			String json_data = "{\"ostt_trnt_dvcd\":\"" + arg.getParameter("ostt_trnt_dvcd") + "\",\"ostt_trnt_amnt\":\"" + arg.getParameter("ostt_trnt_amnt") + "\",\"ostt_trnt_vatx_yorn\":\"" + arg.getParameter("ostt_trnt_vatx_yorn")+ "\",\"ostt_hdco_idcd\":\"" + arg.getParameter("ostt_hdco_idcd")+"\"}";

			data.param
				.table("sale_ostt_mast"											 )
				.where("where invc_numb		= :invc_numb						")  /*  INVOICE번호  */

				.unique("invc_numb"			, arg.fixParameter("invc_numb"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_trnt_dvcd','$.ostt_trnt_amnt','$.ostt_trnt_vatx_yorn','$.ostt_hdco_idcd'), '" + json_data + "')")
				.update("remk_text"			, arg.getParameter("remk_text"))
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null ;
	}

	public SqlResultMap getInvoiceTest(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap info;
		data.param
			.query("select  *																						")
		;
		data.param
			.where("from (  select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn											")
			.where("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
			.where("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
			.where("        , a.item_idcd        , a.unit_idcd as sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric			")
			.where("        , a.stnd_unit        , a.stnd_unit_qntt               , a.wrhs_idcd        , a.dlvy_cstm_idcd			")
			.where("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
			.where("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
			.where("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
			.where("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid			")
			.where("        , a.user_memo        , a.sysm_memo       , a.line_levl        , a.invc_numb as prnt_idcd")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , i.item_code        , i.item_name       , i.item_spec								")
			.where("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd								")
			.where("        , json_value(b.json_data, '$.prod_trst_dvcd') as prod_trst_dvcd						")
			.where("from acpt_item a 																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn	")
			.where("                  from sale_ostt_item s 													")
			.where("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb				")
			.where("                  where m.line_stat < 2														")
			.where("                  group by s.acpt_numb, s.acpt_seqn											")
			.where("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn			")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("where   1=1																					")
			.where("and     (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0					")
			.where("and     b.acpt_stat_dvcd > 0010												")
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.where("and     b.acpt_dvcd = :acpt_dvcd         " , arg.getParamText("acpt_dvcd"  ))
			.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.cstm_idcd,a.invc_numb,a.line_seqn												")
			.where(") a																							")
		;
		info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("with cte as (  ")
				.query("select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn													")
				.query("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
				.query("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
				.query("        , a.item_idcd        , a.unit_idcd as sale_unit               , a.norm_sale_pric   , a.sale_stnd_pric	")
				.query("        , a.stnd_unit        , a.stnd_unit_qntt  , b.dlvy_cstm_idcd						")
				.query("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
				.query("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
				.query("        , a.user_memo        , a.sysm_memo       , a.invc_numb as prnt_idcd        , a.line_levl				")
				.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
				.query("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid			")
				.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
				.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
				.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
				.query("        , i.item_code        , i.item_name       , i.item_spec        , c.cstm_code				")
				.query("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd        , c.cstm_name				")
				.query("        , cd.dlvy_addr_1fst  , cd.dely_cstm_name , b.acpt_dvcd									")
				.query("        , json_value(b.json_data,'$.prod_trst_dvcd') as prod_trst_dvcd, i.acct_bacd				")
				.query("        , (CASE																					")
				.query("           WHEN i.acct_bacd = 1001 THEN '02'													")
				.query("           WHEN i.acct_bacd = 2002 THEN '01'													")
				.query("           WHEN i.acct_bacd = 3000 THEN '01'													")
				.query("           WHEN i.acct_bacd = 4000 THEN '01'													")
				.query("           end ) as wrhs_idcd 																	")
				.query("        , (CASE																					")
				.query("           WHEN i.acct_bacd = 1001 THEN '자재창고'												")
				.query("           WHEN i.acct_bacd = 2002 THEN '제품창고'												")
				.query("           WHEN i.acct_bacd = 3000 THEN '제품창고'												")
				.query("           WHEN i.acct_bacd = 4000 THEN '제품창고'												")
				.query("           end ) as wrhs_name																	")
				.query("from acpt_item a 																				")
				.query("left outer join acpt_mast b on a.invc_numb = b.invc_numb										")
				.query("left outer join cstm_mast c on c.cstm_idcd = b.cstm_idcd										")
				.query("left outer join cstm_deli cd on cd.dlvy_cstm_idcd = b.dlvy_cstm_idcd							")
				.query("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn, count(*) as ostt_cont ")
				.query("                  from sale_ostt_item s 														")
				.query("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb					")
				.query("                  where m.line_stat < 2															")
				.query("                  group by s.acpt_numb, s.acpt_seqn												")
				.query("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn				")
				.query("left outer join item_mast i on a.item_idcd = i.item_idcd										")
				.query("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
				.query("where   1=1																						")
				// OEM수주이면서 재고생산인 경우 출고 건이 있으면 제외한다. 그 외는 입고수량 - 출고수량 > 0 인 것을 제외한다.
				.query("and     case when b.acpt_dvcd = '2000' and json_value(b.json_data,'$.prod_trst_dvcd') = '2000' then ")
				.query("                   ifnull(s.ostt_cont, 0) = 0 													")
				.query("             else (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0								")
				.query("        end                                                                                     ")
				.query("and     b.acpt_stat_dvcd > '0010'																")
				.query("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
				.query("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
				.query("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
				.query("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
				.query("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
				.query("and     b.acpt_dvcd = :acpt_dvcd         " , arg.getParamText("acpt_dvcd"  ))
				.query("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
				// 삼정수주는 재고생산만 제외한다.
				.query("and     ((b.acpt_dvcd = '1000' and json_value(b.json_data,'$.prod_trst_dvcd') <> '2000') or b.acpt_dvcd = '2000') ")
				.query("order by c.cstm_name,a.invc_numb,a.line_seqn													")
				.query(") 																								")
				.query("select																							")
				.query("    a.acpt_numb        , a.acpt_seqn															")
				.query("  , a.sale_amnt        , a.ttsm_amnt       , a.deli_date        , a.vatx_amnt					")
				.query("  , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate					")
				.query("  , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric				")
				.query("  , a.stnd_unit        , a.stnd_unit_qntt  , a.dlvy_cstm_idcd				")
				.query("  , dsct_yorn          , a.ostt_dvcd       , insp_dvcd          , insp_date						")
				.query("  , a.pcod_numb        , ostt_yorn         , ostt_date											")
				.query("  , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
				.query("  , a.crte_idcd        , a.crte_urif       , a.modl_name        , acpt_date						")
				.query("  , a.ostt_qntt        , unpaid																	")
				.query("  , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
				.query("  , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
				.query("  , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
				.query("  , a.item_code        , a.item_name       , a.item_spec        , a.cstm_code					")
				.query("  , a.drtr_idcd        , a.dept_idcd       , a.cstm_idcd        , a.cstm_name					")
				.query("  , a.dlvy_addr_1fst   , a.dely_cstm_name  , 0 as used_yorn    , '' as prnt_idcd				")
				.query("  , a.acpt_dvcd        , a.prod_trst_dvcd  , a.acct_bacd										")
				.query("  , a.wrhs_idcd        , a.wrhs_name 															")
				.query("from cte a																						")
			;
			// 23.10.13 - 삼정인 경우 OEM 원재료 정보를 가져온다.
			if ("N1000SJUNG".equals(arg.hq.toUpperCase())) {
				data.param
					.query("union all																						")
					// OEM수주이면서 주문생산,재고생산인 경우에만 배합비 정보를 가져온다.
					// 23.10.10 - OEM원재료 단가를 판매처 단가로 가져온다
					.query("select																							")
					.query("    a.acpt_numb        , a.acpt_seqn															")
					.query("  , a.sale_amnt        , a.ttsm_amnt       , a.deli_date        , a.vatx_amnt					")
					.query("  , ifnull((select cont_pric from item_cont where item_idcd = d.item_idcd and last_yorn = '1' and pric_dvcd <> '3000' order by cont_date desc limit 1), 0) as sale_pric ")
					.query("  , round(d.ostt_qntt,3) as trst_qntt    , a.vatx_incl_yorn   , a.vatx_rate						")
					.query("  , d.item_idcd        , null as sale_unit , 0 as norm_sale_pric								")
					.query("  , 0 as sale_stnd_pric, null as stnd_unit , null as stnd_unit_qntt  							")
					.query("  , a.dlvy_cstm_idcd   , dsct_yorn         , a.ostt_dvcd        , insp_dvcd          , insp_date")
					.query("  , a.pcod_numb        , ostt_yorn         , ostt_date											")
					.query("  , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl					")
					.query("  , a.crte_idcd        , a.crte_urif       , a.modl_name        , a.acpt_date					")
					.query("  , 0 as ostt_qntt     , round(d.ostt_qntt,3) as unpaid										")
					.query("  , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name					")
					.query("  , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd					")
					.query("  , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm					")
					.query("  , i.item_code        , i.item_name       , i.item_spec        , a.cstm_code					")
					.query("  , a.drtr_idcd        , a.dept_idcd       , a.cstm_idcd        , a.cstm_name					")
					.query("  , a.dlvy_addr_1fst   , a.dely_cstm_name  , d.oem_yorn         , a.item_idcd as prnt_idcd		")
					.query("  , a.acpt_dvcd        , a.prod_trst_dvcd  , i.acct_bacd										")
					.query("  , (CASE																						")
					.query("     WHEN i.acct_bacd = 1001 THEN '02'															")
					.query("     WHEN i.acct_bacd = 2002 THEN '01'															")
					.query("     WHEN i.acct_bacd = 3000 THEN '01'															")
					.query("     WHEN i.acct_bacd = 4000 THEN '01'															")
					.query("    end ) as wrhs_idcd 																			")
					.query("  , (CASE																						")
					.query("     WHEN i.acct_bacd = 1001 THEN '자재창고'														")
					.query("     WHEN i.acct_bacd = 2002 THEN '제품창고'														")
					.query("     WHEN i.acct_bacd = 3000 THEN '제품창고'														")
					.query("     WHEN i.acct_bacd = 4000 THEN '제품창고'														")
					.query("    end ) as wrhs_name																			")
					.query("from cte a																						")
//					.query("left outer join tbi_job_order_prod_list b on a.acpt_numb = b.order_no and a.acpt_seqn = b.order_seq and a.item_idcd = b.prod_cd ")
					.query("left outer join pror_mast b on  a.acpt_numb = b.acpt_numb and a.acpt_seqn = b.acpt_seqn and a.item_idcd = b.item_idcd ")
//					.query("left outer join bom_mast  c on  b.prod_cd = c.prnt_item_idcd and c.used_yorn = '1' and b.bom_rev_no = c.revs_numb and c.revs_dvcd = '1' ")
					.query("left outer join bom_mast  c on  b.item_idcd = c.prnt_item_idcd and c.used_yorn = '1' and  c.revs_dvcd = '1' ")
//					.query("left outer join haccp_ccp_monitoring_mix d on c.ivst_item_idcd = d.part_cd and b.job_order_no = d.job_order_no ")
					.query("left outer join mtrl_ostt_item d on c.ivst_item_idcd = d.item_idcd and b.invc_numb = d.wkod_numb and d.oem_yorn = '1'	")

					.query("left outer join item_mast i on d.item_idcd = i.item_idcd										")
					.query("where d.item_idcd is not null																	")
					.query("and a.acpt_dvcd = '2000' 																		")
					.query("and a.prod_trst_dvcd <> '3000' 																	")
				;
			}

			data.param
				.query("order by acpt_numb, acpt_seqn																	")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoiceTest(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String invc_numb = "";
		String wrhs_idcd = "";
		String spts_invc = null;
		for (SqlResultRow row:map) {
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetailTest(arg, data, row, row.getParameter("product", SqlResultMap.class), invc_numb , wrhs_idcd );
			}
		}
	return null;
	}

	public void setInvoiceDetailTest(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map, String invc_numb , String wrhs_idcd ) throws Exception {
		ParamToJson trans = new ParamToJson();
		String sale_invc_numb = "";
		for(SqlResultRow row:map) {
			if(row.getParamText("new_line_seqn").equals("1")){
				// 23.10.17 - 제품출고 후 운송비용 등록하는 방식으로 변경으로 주석처리
				String json_data = trans.TranslateRow(arg, row, "sale_ostt_mast_json_fields");

				data.param
					.table("sale_ostt_mast_test										")
					.where("where invc_numb		= :invc_numb						")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, mst.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, mst.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, mst.getParameter("ostt_date"		))	//Invoice일자
					.update("dept_idcd"			, mst.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)
					.update("json_data"			, json_data)							//json_data
					.update("remk_text"			, mst.getParameter("remk_text"		))	//비고

					.update("updt_idcd"			, mst.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, mst.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				// 2024.02.06 임수찬 : 출고시 매출내역에도 추가 등록.

				if (("1000".equals(row.getParameter("acpt_dvcd")) && !"2000".equals(row.getParameter("prod_trst_dvcd")))
				||  ("2000".equals(row.getParameter("acpt_dvcd")) && !"3000".equals(row.getParameter("prod_trst_dvcd")))) {
					data.param
						.query("call fn_seq_gen_v2 (			")
						.query("   :STOR "   	, arg.store		)  // 본사코드
						.query(" , :table "  	, "sale_mast"	)  // 테이블명
						.query(" , :invc_numb " , "not defined"	)  // Invoice 번호
						.query(" ) 								")
					;
					sale_invc_numb = (String)data.selectForMap().get(0).get("seq");
					data.clear();

					data.param
						.table("sale_mast_test											")
						.where("where invc_numb		= :invc_numb						")	//invoice번호

						.unique("invc_numb"			, sale_invc_numb)	//invoice번호

						.update("invc_date"			, mst.getParameter("ostt_date"		))	//출고일자
						.update("sale_path_dvcd"	, "00")									//판매경로구분코드
						.update("rqod_rcvd_dvcd"	, "2")									//청구영수구분코드
						.update("bzpl_idcd"			, mst.getParameter("bzpl_idcd"		))	//사업장ID
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
						.update("ostt_dvcd"			, "2200")								//출고구분(판매출고)
						.update("drtr_idcd"			, mst.getParameter("drtr_idcd"		))	//담당자ID
						.update("dept_idcd"			, mst.getParameter("dept_idcd"		))	//부서ID

						.update("updt_idcd"			, mst.getParameter("updt_idcd"		))
						.insert("crte_idcd"			, mst.getParameter("crte_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}
			}

			data.param
				.table("sale_ostt_item_test											")
				.where("where invc_numb		= :invc_numb							")		//invoice번호
				.where("and   line_seqn		= :line_seqn							")		//순번

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

				.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
				.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
				.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
				.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
				.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
				.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
				.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
				.update("ostt_qntt"			, row.getParameter("ostt_qntt2"			))		//출고수량
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
				.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
				.update("sale_amnt"			, row.getParameter("new_sale_amnt"		))		//판매금액
				.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"		))		//부가세금액
				.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"		))		//합계금액
				.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
				.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
				.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
				.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))		//창고ID
				.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
				.update("dsct_yorn"			, row.getParameter("dsct_yorn"			))		//중단여부
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))		//출고구분코드
				.update("insp_dvcd"			, row.getParameter("insp_dvcd"			))		//검사구분코드
				.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//출하지시번호
				.update("orig_seqn"			, row.getParameter("line_seqn"			))		//출하지시항번
				.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO
				.update("sale_invc_numb"	, row.getParameter("sale_invc_numb"		))		//판매invoice번호
				.update("sale_qntt"			, row.getParameter("sale_qntt"			))		//판매수량
				.update("user_memo"			, row.getParameter("user_memo"			))		//비고
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			if (("1000".equals(row.getParameter("acpt_dvcd")) && !"2000".equals(row.getParameter("prod_trst_dvcd")))
			||  ("2000".equals(row.getParameter("acpt_dvcd")) && !"3000".equals(row.getParameter("prod_trst_dvcd")))) {

				data.param
					.table("sale_item_test												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, sale_invc_numb)		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("invc_type"			, "SALE")										//수주번호
					.update("acpt_numb"			, row.getParameter("acpt_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("acpt_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("sale_qntt"			, row.getParameter("ostt_qntt2"			))		//출고수량
					.update("sale_amnt"			, row.getParameter("new_sale_amnt"		))		//판매금액
					.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"		))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"		))		//합계금액
					.update("dlvy_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.fixParameter("new_invc_numb"		))		//출하지시번호
					.update("orig_invc_seqn"	, row.fixParameter("new_line_seqn"		))		//출하지시항번
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}

			// 수주구분=OEM수주, 생산구분=재고주문은 판매현황만 관리한다.
			// 수주구분=OEM수주, 생산구분=재고생산은 원재료가 아닌 경우 수불내역을 생성하지 않는다.
			boolean isOstt = true;
			if ("2000".equals(row.getParamText("acpt_dvcd")) && "2000".equals(row.getParamText("prod_trst_dvcd")) && Integer.parseInt(row.getParamText("acct_bacd" ).substring(0, 2)) > 10) {
				isOstt = false;
			}

			// 23.10.30 - 이강훈 - Lot를 Lot번호^수령 형식으로 변경
			if (isOstt) {
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				data.param
					.query("call ostt_isos_sjflv_mes_test(")
					.query("   :invc_numb", row.fixParameter("new_invc_numb"))
					.query(" , :line_seqn", row.fixParameter("new_line_seqn"))
					.query(" , :item_idcd", row.getParameter("item_idcd"))
					.query(" , :lott_numb", row.getParameter("lott_numb_sum"))
					.query(" , :ostt_qntt", row.getParameter("ostt_qntt2"))
					.query(")")
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}
		}
	}
}