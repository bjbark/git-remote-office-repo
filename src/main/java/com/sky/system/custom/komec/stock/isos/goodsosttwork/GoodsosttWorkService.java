package com.sky.system.custom.komec.stock.isos.goodsosttwork;

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


@Service("komec.GoodsosttWorkService")
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
			.where("        , a.crny_dvcd        , a.excg_rate       , s.line_seqn								")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif		 , i.item_name								")
			.where("        , group_concat(i.item_name separator ' / ') as remk_text							")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("        , cast(replace(json_extract(a.json_data, '$.ostt_trnt_dvcd'),'\"','') as char) as ostt_trnt_dvcd	")
			.where("        , cast(replace(json_extract(a.json_data, '$.ostt_trnt_amnt'),'\"','') as char) as ostt_trnt_amnt	")
			.where("        , c2.dely_cstm_name as dlvy_cstm_name												")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_deli c2 on replace(json_extract(a.json_data, '$.dlvy_cstm_idcd'),'\"','') = c2.dlvy_cstm_idcd	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join item_mast i on s.item_idcd = i.item_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd       "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
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

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

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
			.where("        , group_concat(i.item_name separator ' / ') as remk_text							")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("        , cast(replace(json_extract(a.json_data, '$.ostt_trnt_dvcd'),'\"','') as char) as ostt_trnt_dvcd	")
			.where("        , cast(replace(json_extract(a.json_data, '$.ostt_trnt_amnt'),'\"','') as char) as ostt_trnt_amnt	")
			.where("        , c2.dely_cstm_name as dlvy_cstm_name	 , s.ostt_qntt        , s.lott_numb			")
			.where("        , i.item_code        , i.item_spec       , s.sale_pric        , s.sale_amnt			")
			.where("        , s.vatx_amnt        , s.ttsm_amnt       , s.user_memo as user_memo2				")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join cstm_deli c2 on replace(json_extract(a.json_data, '$.dlvy_cstm_idcd'),'\"','') = c2.dlvy_cstm_idcd	")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("left outer join item_mast i on s.item_idcd = i.item_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd       "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
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

//	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
//		DataMessage data = arg.newStorage("POS");
//		data.param // 집계문  입력
//			.total(" select  count(1) as maxsize  ")
//		;
//		data.param
//			.query("select *																					")
//		;
//		data.param
//			.where("from ( select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd	")
//			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
//			.where("        , a.ostt_schd_date   , a.ostt_yorn       , a.ostt_date        , a.trut_dvcd			")
//			.where("        , a.dlvy_cond_dvcd   , a.deli_date       , a.sale_stor_yorn   , a.crny_dvcd			")
//			.where("        , a.excg_rate        , a.pcod_numb       , a.remk_text 								")
//			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
//			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
//			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
//			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
//			.where("        , a.crte_idcd        , a.crte_urif													")
//			.where("        , b.cstm_code        , b.cstm_name       , c.user_name        , e.wrhs_name 		")
//			.where("from spts_mast a																			")
//			.where("left outer join cstm_mast b on a.cstm_idcd      = b.cstm_idcd								")
//			.where("left outer join user_mast c on a.drtr_idcd      = c.user_idcd								")
//			.where("left outer join spts_item d on a.invc_numb      = d.invc_numb								")
//			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.orig_invc_numb, s.orig_seqn	")
//			.where("                  from sale_ostt_item s 														")
//			.where("                  group by s.orig_invc_numb, s.orig_seqn										")
//			.where("                  ) so on d.invc_numb = so.orig_invc_numb and d.line_seqn = so.orig_seqn			")
//			.where("left outer join wrhs_mast e on d.wrhs_idcd      = e.wrhs_idcd								")
//			.where(",(select invc_numb, min(ostt_yorn) as ostt_yorn from spts_item group by invc_numb) s		")
//			.where("where   1=1																					")
//			.where("and     a.invc_numb = s.invc_numb															")
//			.where("and     0 = s.ostt_yorn																		")
//			.where("and     (ifnull(d.trst_qntt,0)-ifnull(so.ostt_qntt,0)) > 0							")
//			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
//			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
//			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
//			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
//			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
//			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
//			.where("and     d.item_idcd  = :item_idcd        " , arg.getParamText("item_idcd"  ))
//			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
//			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
//			.where("group by a.invc_numb																	")
//			.where("order by a.invc_numb																	")
//			.where(") a																						")
//		;
//		if (page == 0 && rows == 0){
//			return data.selectForMap(sort);
//		} else {
//			return data.selectForMap(page, rows, (page==1), sort );
//		}
//	}

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

		String [] item_idcd = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("item_idcd"))) {
			item_idcd = ((String)arg.getParameter("item_idcd")).split(",");
		}
		data.param
			.query("select    a.invc_numb    , a.line_seqn      , a.acpt_numb   , am.invc_date as acpt_date			")
			.query("        , ai.deli_date   , c.cstm_name      , i.item_code   , i.item_name						")
			.query("        , i.item_spec    , a.trst_qntt															")
			.query("        , si.ostt_qntt   , a.acpt_seqn															")
			.query("        , c2.cstm_name as dlvy_cstm_name    , a.sale_pric   , pm.prog_stat_dvcd					")
			.query("        , a.trst_qntt - ifnull(si.ostt_qntt, 0)  as unpaid										")
			.query("        , a.item_idcd    , a.user_memo    , a.sysm_memo											")
			.query("        , a.prnt_idcd    , a.line_levl      , a.line_ordr   , a.line_stat    , a.line_clos		")
			.query("        , a.find_name    , a.updt_user_name , a.updt_ipad   , a.updt_dttm    , a.updt_idcd		")
			.query("        , a.updt_urif    , a.crte_user_name , a.crte_ipad   , a.crte_dttm    , a.crte_idcd		")
		;
		data.param
			.where("from spts_item a																				")
			.where("left outer join spts_mast b  on a.invc_numb = b.invc_numb										")
			.where("left outer join acpt_item ai on ai.invc_numb = a.acpt_numb and ai.line_seqn = a.acpt_seqn		")
			.where("left outer join acpt_mast am on am.invc_numb = ai.invc_numb										")
			.where("left outer join cstm_mast c  on am.cstm_idcd = c.cstm_idcd										")
			.where("left outer join item_mast i  on a.item_idcd = i.item_idcd										")
			.where("left outer join cstm_mast c2 on ai.dlvy_cstm_idcd = c2.cstm_idcd								")
			.where("left outer join pror_mast pm on ai.invc_numb = pm.acpt_numb and ai.line_seqn = pm.acpt_seqn		")

			.where("left outer join (																				")
			.where("				select acpt_numb, acpt_seqn, sum(ifnull(ostt_qntt, 0)) as ostt_qntt				")
			.where("				from   sale_ostt_item															")
			.where("				group by acpt_numb, acpt_seqn													")
			.where(") si on si.acpt_numb = a.acpt_numb and si.acpt_seqn = a.acpt_seqn								")
			.where("left outer join ostt_insp o on a.invc_numb = o.spts_numb and a.line_seqn = o.spts_seqn			")

			.where("where   1=1																	")
			.where("and     o.judt_dvcd = '1'													")
			.where("and     b.invc_date >= :invc1_date       " , arg.getParamText("invc1_date" ))
			.where("and     b.invc_date <= :invc2_date       " , arg.getParamText("invc2_date" ))
			.where("and     a.item_idcd in (:item_idcd)      " , item_idcd)
			.where("and     c.cstm_idcd  = :cstm_idcd        " , arg.getParamText("cstm_idcd"  ))
			.where("and     am.invc_numb = :invc_numb        " , arg.getParamText("invc_numb"  ))
			.where("and     b.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by ai.invc_numb,ai.line_seqn																")
			.where("having unpaid > 0																")
			.where("order by ai.invc_numb,ai.line_seqn																")
		;
		return data.selectForMap();
	}

	public SqlResultMap getInvoice2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		boolean check = false;
		SqlResultMap info;
		if(arg.getParamText("check").length() > 0 ){
			check = true;
		}

		data.param
		.query("select  *																						")
		;


		// 2022.04.08 - 이강훈 - 제품출고등록 시 선택된 품목이 1건 이상 조회되도록 적용
		String [] item_idcd = null;
		if (!StringUtils.isEmpty((String)arg.getParameter("item_idcd"))) {
			item_idcd = ((String)arg.getParameter("item_idcd")).split(",");
		}

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
			.where("and     a.ostt_qntt < a.invc_qntt											")
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
		//	.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.where("and     a.item_idcd in (:item_idcd)      " , item_idcd)
			.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb,a.line_seqn															")
			.where(") a																							")
		;
		info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select  *																					")
			;
			data.param
				.where("from (  select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn											")
				.where("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
				.where("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
				.where("        , a.item_idcd        , a.unit_idcd as sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric			")
				.where("        , a.stnd_unit        , a.stnd_unit_qntt               , a.dlvy_cstm_idcd								")
				.where("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
				.where("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
				.where("        , a.user_memo        , a.sysm_memo       , a.invc_numb as prnt_idcd        , a.line_levl				")
				.where("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
				.where("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid							")
				.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name								")
				.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd									")
				.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm									")
				.where("        , i.item_code        , i.item_name       , i.item_spec        , ifnull(a.wrhs_idcd,r.wrhs_idcd) as wrhs_idcd")
				.where("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd        , c.cstm_name			")
				.where("from acpt_item a 																			")
				.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
				.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn	")
				.where("                  from sale_ostt_item s 													")
				.where("                  left outer join sale_ostt_mast m on s.invc_numb = m.invc_numb				")
				.where("                  where m.line_stat < 2														")
				.where("                  group by s.acpt_numb, s.acpt_seqn										")
				.where("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn			")
				.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
				.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
				.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
				.where(",(select wrhs_idcd from wrhs_mast where mngt_wrhs_dvcd = '0002' limit 1) r					")
				.where("where   1=1																					")
				.where("and     (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0					")
				.where("and     b.acpt_stat_dvcd > 0010												")
				.where("and     b.ordr_dvcd = '4000'												")
				.where("and     a.ostt_qntt < a.invc_qntt											")
				.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
				.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			//	.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
				.where("and     a.item_idcd in (:item_idcd)      " , item_idcd)
				.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
				.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
				.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb,a.line_seqn															")
				.where(") a																							")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();

		for (SqlResultRow row:map) {
			String json_data = trans.TranslateRow(arg, row, "sale_ostt_mast_json_fields");
			if(row.getParamText("new_line_seqn").equals("1")){
				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, row.getParameter("ostt_date"		))	//Invoice일자
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)
					.update("json_data"			, json_data)							//json_data
					.update("remk_text"			, row.getParameter("remk_text"		))	//비고

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.insert);
				data.execute();
				data.clear();
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
				.update("ostt_qntt"			, row.getParameter("qntt"				))		//출고수량
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
				.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
				.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
				.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
				.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
				.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
				.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
				.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
				.update("wrhs_idcd"			, "01")		//창고ID
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

			data.param
				.query("call ostt_isos_komec(								")
				.query("    :invc_numb ",row.fixParameter("new_invc_numb"))
				.query("  , :line_seqn ",row.fixParameter("new_line_seqn"))
				.query("  , :item_idcd ",row.fixParameter("item_idcd"))
				.query("  , :lott_numb ",row.fixParameter("lott_numb"))
				.query("  , :ostt_qntt ",row.fixParameter("qntt"))
				.query(")													")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	public SqlResultMap setCofm(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String lott_numb		= arg.getParamText("lott_numb") ;
		String stok_qntt		= arg.getParamText("stok_qntt") ;
		String ostt_qntt		= arg.getParamText("ostt_qntt") ;
		String hq				= arg.getParamText("hqof_idcd") ;
		String stor				= arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);

		data.param
		.query("call ostt_isos_komec_2(		")
		.query("   :param "  ,     result)  // Invoice 번호
		.query(" ) 							")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}



	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

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

			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
			data.param
				.query("call ostt_isos_komec(")
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
	public SqlResultMap getOsttList(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.invc_numb       , a.line_seqn      , a.lott_numb       , a.trst_qntt		")
			.query("       , i.item_code       , a.item_idcd      , i.item_name  						")
			.query("       , a.wrhs_idcd       , w.wrhs_name											")
		;
		data.param
			.where("from spts_item a																	")
			.where("left outer join spts_mast  b on a.invc_numb = b.invc_numb							")
			.where("left outer join item_mast  i on i.item_idcd = a.item_idcd							")
			.where("left outer join wrhs_mast  w on w.wrhs_idcd = a.wrhs_idcd							")
			.where("where b.ostt_schd_date = date_format(now(),'%Y%m%d')								")
			.where("and   a.ostt_yorn = '0'																")
			.where("and   concat(a.invc_numb,'-',a.line_seqn) = :bar_code	", arg.fixParameter("bar_code"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		// sale_path_dvcd = '00' 정상
		// ostt_dvcd = '2200' 판매출고
		// trut_dvcd = '1'
		data.param
			.query("select   b.expt_dvcd      , b.bzpl_idcd      , b.cstm_idcd       , b.ostt_dvcd						")
			.query("       , b.drtr_idcd      , b.deli_date      , a.*						                  			")
			.query("       , ifnull(max(s.line_seqn),0)+1 as max_seqn       										    ")
			.where("from spts_item a																					")
			.where("left outer join spts_mast b on a.invc_numb = b.invc_numb											")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.orig_invc_numb and a.line_seqn = s.orig_seqn	")
			.where("where a.invc_numb = :invc_numb	",arg.fixParameter("invc_numb"))
			.where("and   a.line_seqn = :line_seqn	",arg.fixParameter("line_seqn"))
			.where("group by a.invc_numb, a.line_seqn																	")
			.where("order by a.invc_numb, a.line_seqn																	")
		;
		SqlResultRow row = data.selectForRow();
		data.clear();
		try {
			String invc_numb = new SimpleDateFormat("yyyyMMdd").format(new Date())+'-'+row.fixParamText("invc_numb");
			data.param
				.table("sale_ostt_mast")

				.where("where invc_numb = :invc_numb	")

				.unique("invc_numb", invc_numb)

				.insert("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.insert("sale_path_dvcd"	, "00")
				.insert("bzpl_idcd"			, row.getParameter("bzpl_idcd"))
				.insert("expt_dvcd"			, row.getParameter("expt_dvcd"))
				.insert("cstm_idcd"			, row.getParameter("cstm_idcd"))
				.insert("ostt_dvcd"			, row.getParameter("ostt_dvcd"))
				.insert("drtr_idcd"			, row.getParameter("drtr_idcd"))
				.insert("deli_date"			, row.getParameter("deli_date"))

				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.modify);

			int pric = 0;
			int qntt = 0;
			if(!row.getParamText("sale_pric").equals("")){
				pric = row.getParamCast("sale_pric", Integer.class);
			}
			if(!arg.fixParamText("ostt_qntt").equals("")){
				qntt = row.getParamCast("ostt_qntt", Integer.class);
			}
			data.param
				.table("sale_ostt_item")

				.where("where invc_numb = :invc_numb")
				.where("and   line_seqn = :line_seqn")

				.unique("invc_numb", invc_numb)
				.unique("line_seqn", row.fixParameter("max_seqn"))

				.update("acpt_numb"			, row.getParameter("acpt_numb"))
				.update("acpt_seqn"			, row.getParameter("acpt_seqn"))
				.update("item_idcd"			, row.getParameter("item_idcd"))
				.update("sale_unit"			, row.getParameter("sale_unit"))
				.update("sale_pric"			, row.getParameter("sale_pric"))
				.update("ostt_qntt"			, arg.getParameter("ostt_qntt"))
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))
				.update("vatx_rate"			, row.getParameter("vatx_rate"))
				.update("sale_amnt"			, pric*qntt)
				.update("vatx_amnt"			, (pric*qntt)*0.1)
				.update("ttsm_amnt"			, (pric*qntt)*1.1)
				.update("deli_date"			, row.getParameter("deli_date"))
				.update("dlvy_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))
				.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"))
				.update("lott_numb"			, row.getParameter("lott_numb"))
				.update("orig_invc_numb"	, row.getParameter("invc_numb"))
				.update("orig_seqn"			, row.getParameter("line_seqn"))

				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(Action.modify);
			data.execute();

			sequence.setBook(arg, invc_numb, row.getParamCast("line_seqn", Integer.class), "판매출고");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null ;
	}
	public SqlResultMap getDailyList(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.invc_numb       , a.line_seqn      , a.lott_numb       , a.ostt_qntt		")
			.query("       , i.item_code       , a.item_idcd      , i.item_name  						")
		;
		data.param
			.where("from sale_ostt_item a																")
			.where("left outer join sale_ostt_mast b on a.invc_numb = b.invc_numb						")
			.where("left outer join item_mast i on i.item_idcd = a.item_idcd							")
			.where("where b.invc_date = date_format(now(),'%Y%m%d')										")
			.where("and   concat(i.item_name,' ',a.lott_numb) like %:find_name%",arg.getParameter("find_name"))
			.where("order by a.invc_numb,a.line_seqn													")
		;
		return data.selectForMap();
	}
	public SqlResultMap setDailyList(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call ostt_daily_list_delete(						")
			.query("     :invc_numb ",arg.fixParameter("invc_numb"))
			.query("   , :line_seqn ",arg.fixParameter("line_seqn"))
			.query(")													")
		;
		data.attach(Action.direct)
		;
		data.execute();

		return null ;
	}
}