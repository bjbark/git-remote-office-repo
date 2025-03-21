package com.sky.system.sale.sale.saleosttlist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class SaleOsttListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select * 											 													")
		;
		data.param
			.where("from   (select    a.invc_numb         , a.invc_date 													")
			.where("        , a.updt_dttm as upt_dttm     , um.user_name as upt_usr_nm, u.user_name as inv_user_nm			")
			.where("        , c.cstm_name as cust_name    , u.user_name as drtr_name      , sum(s.ttsm_amnt) as inv_amt		")
			.where("        , sum(s.sale_amnt) as sale_amnt , sum(s.vatx_amnt) as vatx_amnt									")
			.where("        , c.tele_numb as reve_tel_no  , c.mail_addr as reve_email     , a.bzpl_idcd						")
			.where("        , a.crte_dttm as crt_dttm     , s.acpt_numb                   , i.line_clos						")
			.where("        , concat(ad.addr_1fst, ' ', ad.addr_2snd) as reve_addr_2      , ad.post_code as reve_zip_cd		")
			.where("        , c.hdph_numb as reve_hp_no																		")
			.where("from sale_ostt_mast a																		")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join acpt_mast i on s.acpt_numb = i.invc_numb									")
			.where("left outer join user_mast u on i.drtr_idcd = u.user_idcd									")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_addr ad on ad.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast um on um.user_idcd = a.updt_idcd									")
			.where("where   1=1																					")

			.where("and     s.acpt_numb like %:search_name1%"  , arg.getParamText("find_nm"), "5".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb like %:search_name3%"  , arg.getParamText("find_nm"), "7".equals(arg.getParamText("search_id")))
			.where("and     c.cstm_idcd  = :cstm_idcd"         , arg.getParamText("cstm_idcd"))
			.where("and     a.bzpl_idcd  = :bzpl_idcd"         , arg.getParamText("bzpl_idcd"))
			.where("and     i.line_clos  = :line_clos"         , arg.getParamText("line_clos"))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("fr_dt"		))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("to_dt"		))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1"	))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2"	))
			.where("and     i.drtr_idcd  = :drtr_idcd        " , arg.getParamText("drtr_idcd"	))
			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb"	))
			.where("and     a.line_stat  = :line_stat1       " , arg.getParamText("line_stat"	) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
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

	public SqlResultMap itemlist(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select    a.invc_numb        , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.where("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.where("        , a.vatx_incl_yorn   , a.vatx_rate      , a.sale_amnt        , a.ostt_qntt			")
			.where("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.where("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.where("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.where("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.where("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat      , m.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.where("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.where("        , u.user_name as inv_user_nm            , b.invc_date as inv_dt						")
			.where("        , c.cstm_name        , b.bzpl_idcd      , mi.deli_date as acpt_deli_date			")
			.where("        , (select base_name from base_mast bs where d.item_clss_bacd = bs.base_code and bs.prnt_idcd = '8001'	) as item_clss_bacd_name")
			.where("        , (select base_name from base_mast bs where bs.base_code = p.item_bacd    and bs.prnt_idcd = '8002') as item_bacd_name")
			.where("        , (select base_name from base_mast bs where bs.base_code = p.make_bacd    and bs.prnt_idcd = '8003') as make_bacd_name")
            .where("        , (select base_name from base_mast bs where bs.base_code = p.mtrl_bacd    and bs.prnt_idcd = '3101') as mtrl_bacd_name")
            .where("        , p.drwg_numb																		")
			.where("from sale_ostt_item a																		")
			.where("left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb								")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join item_desc d on d.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("left outer join acpt_mast m on a.acpt_numb = m.invc_numb									")
			.where("left outer join acpt_item mi on a.acpt_numb = mi.invc_numb and a.acpt_seqn = mi.line_seqn	")
			.where("left outer join acpt_prod_spec p on mi.invc_numb = p.invc_numb and mi.amnd_degr = p.amnd_degr and mi.line_seqn = p.line_seqn			")
			.where("left outer join user_mast u on m.drtr_idcd = u.user_idcd									")
			.where("where   1=1																					")
			.where("and     b.cstm_idcd  = :cstm_idcd"         , arg.getParamText("cstm_idcd" ))
			.where("and     i.item_idcd  = :item_idcd"         , arg.getParamText("item_idcd" ))
			.where("and     i.item_idcd  = :item_code"         , arg.getParamText("item_code" ))
			.where("and     i.lcls_idcd  = :lcls_idcd"         , arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and     i.mcls_idcd  = :mcls_idcd"         , arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and     i.scls_idcd  = :scls_idcd"         , arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     b.bzpl_idcd  = :bzpl_idcd"         , arg.getParamText("bzpl_idcd" ))
			.where("and     m.line_clos  = :line_clos"         , arg.getParamText("line_clos" ))
			.where("and     b.invc_date  >= :invc_date1"       , arg.getParamText("fr_dt"))
			.where("and     b.invc_date  <= :invc_date2"       , arg.getParamText("to_dt"))
			.where("and     a.acpt_numb  like %:search_name1%" , arg.getParamText("find_nm"), "5".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb  like %:search_name3%" , arg.getParamText("find_nm"), "7".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb  = :invc_numb"         , arg.getParamText("invc_numb" ))
			.where("and     m.drtr_idcd  = :drtr_idcd"         , arg.getParamText("drtr_idcd" ))
			.where("and     d.item_clss_bacd  = :item_clss_bacd"    , arg.getParameter("item_clss_bacd"))
			.where("and     a.line_stat  < :line_stat"         , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date desc																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap custgroup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select ifnull(sum(a.ostt_qntt),0) as inv_amt , c.cstm_name, m.cstm_idcd						")
			.where("       , m.invc_date, u.user_idcd as drtr_idcd, u.user_name, a.acpt_numb					")
			.where("       , ifnull(sum(a.sale_amnt),0) as sale_amnt											")
			.where("       , ifnull(sum(a.vatx_amnt),0) as vatx_amnt											")
			.where("       , ifnull(sum(a.sale_amnt),0) + ifnull(sum(a.vatx_amnt),0) as ttsm_amnt				")
			.where("       , a.line_stat, ap.line_clos             , m.bzpl_idcd								")
			.where("from sale_ostt_item a																		")
			.where("       left outer join sale_ostt_mast m on a.invc_numb = m.invc_numb						")
			.where("       left outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd								")
			.where("       left outer join acpt_mast ap on ap.invc_numb = a.acpt_numb							")
			.where("       left outer join user_mast u on u.user_idcd = ap.drtr_idcd							")
			.where("where 1=1																					")
			.where("and     m.invc_date  >= :invc_date1"        , arg.getParameter("fr_dt"))
			.where("and     m.invc_date  <= :invc_date2"        , arg.getParameter("to_dt"))
			.where("and     m.bzpl_idcd  = :bzpl_idcd"          , arg.getParamText("bzpl_idcd"))
			.where("and     ap.line_clos  = :line_clos"          , arg.getParamText("line_clos"))
			.where("and     a.acpt_numb  like %:search_name1%"  , arg.getParamText("find_nm"), "5".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb  like %:search_name3%"  , arg.getParamText("find_nm"), "7".equals(arg.getParamText("search_id")))
			.where("and     ap.drtr_idcd = :drtr_idcd "         , arg.getParameter("drtr_idcd"))
			.where("and     m.cstm_idcd  = :cstm_idcd2"         , arg.getParamText("cstm_idcd"))
			.where("and     a.line_stat  < :line_stat"          , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by c.cstm_idcd												")
			.where("order by c.cstm_name												")
			.where(") a																	")
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
			.query("select    a.invc_numb        , a.line_seqn as seq_dsp, a.acpt_numb   , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.deli_date			")
			.query("        , a.ostt_qntt as qty , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt as tax_amt                , a.ttsm_amnt as inv_amt					")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.sale_pric as pri , a.sale_unit as unit_name              , a.dlvy_date			")
			.query("        , a.sale_amnt as sply_amt															")
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


	public SqlResultMap itemgroup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String acpt_numb = null;
		if(arg.getParamText("search_id")=="5"){
			acpt_numb = arg.getParamText("find_name");
		}

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("       select i.item_code,a.item_idcd  ,i.item_name, i.item_spec, un.unit_name				")
			.where("       , ifnull(sum(a.ostt_qntt),0) as qty , c.cstm_name, m.cstm_idcd						")
			.where("       , m.invc_date, u.user_idcd as drtr_idcd, u.user_name, a.acpt_numb					")
			.where("       , a.line_stat, m.line_clos             , m.bzpl_idcd									")
			.where("       , a. sale_pric																		")
			.where("       , ifnull(sum(a.sale_amnt),0) as sale_amnt											")
			.where("       , ifnull(sum(a.vatx_amnt),0) as vatx_amnt											")
			.where("       , ifnull(sum(a.sale_amnt),0) + ifnull(sum(a.vatx_amnt),0) as ttsm_amnt				")
			.where("from sale_ostt_item a																		")
			.where("       left outer join sale_ostt_mast m on a.invc_numb = m.invc_numb						")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("       left outer join item_desc h on i.item_idcd = h.item_idcd and h.line_seqn = 1			")
			.where("       left outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd								")
			.where("       left outer join acpt_mast ap on a.acpt_numb = ap.invc_numb							")
			.where("       left outer join acpt_item mi on a.acpt_numb = mi.invc_numb and a.acpt_seqn = mi.line_seqn	")
			.where("       left outer join acpt_prod_spec p on mi.invc_numb = p.invc_numb and mi.amnd_degr = p.amnd_degr and mi.line_seqn = p.line_seqn")
			.where("       left outer join user_mast u on u.user_idcd = ap.drtr_idcd							")
			.where("       left outer join unit_mast un on un.unit_idcd = i.unit_idcd							")
			.where("where   1=1																					")
			.where("and     m.invc_date  >= :invc_date1"        , arg.getParameter("fr_dt"))
			.where("and     m.invc_date  <= :invc_date2"        , arg.getParameter("to_dt"))
			.where("and     m.bzpl_idcd  = :bzpl_idcd"          , arg.getParamText("bzpl_idcd"))
			.where("and     ap.line_clos  = :line_clos"         , arg.getParamText("line_clos"))
			.where("and     a.item_idcd  = :item_idcd"          , arg.getParamText("item_idcd"))
			.where("and     a.item_idcd  = :item_code"         , arg.getParamText("item_code"))
			.query("and     i.lcls_idcd   = :lcls_idcd"         , arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.query("and     i.mcls_idcd   = :mcls_idcd"         , arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.query("and     i.scls_idcd   = :scls_idcd"         , arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and     a.acpt_numb  like %:search_name1%"  , arg.getParamText("find_nm"), "5".equals(arg.getParamText("search_id")))
			.where("and     a.invc_numb  like %:search_name3%"  , arg.getParamText("find_nm"), "7".equals(arg.getParamText("search_id")))
			.where("and     m.cstm_idcd  = :cstm_idcd "         , arg.getParameter("cstm_idcd"))
			.where("and     ap.drtr_idcd = :drtr_idcd "         , arg.getParameter("drtr_idcd"))
			.where("and     p.item_bacd   = :item_clss_bacd"	, arg.getParameter("item_clss_bacd"))
			.where("and     a.acpt_numb  = :acpt_numb "         , acpt_numb)
			.where("and     a.line_stat   < :line_stat"         , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.item_idcd																		")
			.where("order by qty desc																			")
			.where(") a 																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap custgroupitem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.invc_numb        , a.line_seqn as seq_dsp, a.acpt_numb   , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.deli_date			")
			.query("        , a.ostt_qntt as qty , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt as tax_amt                , a.ttsm_amnt as inv_amt					")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.sale_pric as pri , a.sale_unit as unit_name              , a.dlvy_date			")
			.query("        , a.sale_amnt as sply_amt															")
			.query("        , m.invc_date as sale_invc_date								")
			.query("        , ap.invc_date as acpt_invc_date								")
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("	left outer join sale_ostt_mast m on a.invc_numb = m.invc_numb						")
			.where("	left outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd								")
			.where("	left outer join acpt_mast ap on ap.invc_numb = a.acpt_numb							")
			.where("	left outer join user_mast u on u.user_idcd = ap.drtr_idcd							")
			.where("	left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("	left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("where 1 = 1																					")
			.where("and	m.invc_date  >= :invc_date1"        , arg.getParameter("fr_dt"))
			.where("and	m.invc_date  <= :invc_date2"        , arg.getParameter("to_dt"))
			.where("and	m.bzpl_idcd  = :bzpl_idcd"          , arg.getParamText("bzpl_idcd"))
			.where("and	ap.line_clos = :line_clos"          , arg.getParamText("line_clos"))
			.where("and	a.acpt_numb  like %:search_name1%"  , arg.getParamText("find_nm"), "5".equals(arg.getParamText("search_id")))
			.where("and	a.invc_numb  like %:search_name3%"  , arg.getParamText("find_nm"), "7".equals(arg.getParamText("search_id")))
			.where("and	ap.drtr_idcd = :drtr_idcd "         , arg.getParameter("drtr_idcd"))
			.where("and	m.cstm_idcd  = :cstm_idcd2"         , arg.getParamText("cstm_idcd"))
			.where("and	a.line_stat  < :line_stat"          , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by m.invc_date, a.line_seqn																		")
		;
		return data.selectForMap();
	}
}
