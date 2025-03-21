package com.sky.system.sale.order.slorlist6;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class SlorList6Service  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("with ing as (																						")
			.where("select wo.acpt_numb , wo.acpt_seqn 																	")
			.where("     , ( select b.cvic_idcd from work_book b														")
			.where("                            where a.wkod_numb = b.wkod_numb											")
			.where("                            and a.wkod_seqn = b.wkod_seqn											")
			.where("                            order by b.invc_date desc limit 1										")
			.where("       ) as cvic_idcd																				")
			.where("     , ifnull(wd.wkct_item_idcd, wd.item_idcd) as wkct_item_idcd									")
			.where("     , min(a.work_strt_dttm)       as strt_dttm														")
			.where("     , w.work_endd_dttm            as endd_dttm														")
			.where("     , w3.user_name                as wker_name														")
			.where("     , ifnull(wd.indn_qntt,0)      as indn_qntt														")
			.where("     , w2.prod_qntt                as prod_qntt														")
			.where("     , sum(ifnull(poor_qntt,0))    as poor_qntt														")
			.where("     , ifnull(wd.indn_qntt,0)      as ordr_qntt														")
			.where("from  work_book a																					")
			.where("      left outer join (select invc_numb,acpt_numb,acpt_seqn from pror_mast where acpt_numb is not null) wo on a.wkod_numb  = wo.invc_numb									")
			.where("      left outer join pror_item wd on a.wkod_numb  = wd.invc_numb and a.wkod_seqn = wd.line_seqn	")
			.where("      left outer join (select invc_numb from acpt_mast where line_stat < '2') po on wo.acpt_numb = po.invc_numb									")
			.where("      left outer join ( select b.wkod_numb, b.wkod_seqn, b.work_endd_dttm,b.cvic_idcd				")
			.where("                        from work_book b															")
			.where("                        where prog_stat_dvcd in (3,4)												")
			.where("                      ) w on wd.invc_numb = w.wkod_numb and wd.line_seqn = w.wkod_seqn and wd.cvic_idcd = w.cvic_idcd	")
			.where("      left outer join (  select wkod_numb,wkod_seqn													")
			.where("                              , sum(prod_qntt) as prod_qntt											")
			.where("                         from work_book 															")
			.where("                         where prog_stat_dvcd != 1  												")
			.where("                         group by wkod_numb,wkod_seqn												")
			.where("                      ) w2 																			")
			.where("                on wd.invc_numb = w2.wkod_numb and wd.line_seqn = w2.wkod_seqn 						")
			.where("      left outer join (  select a.wkod_numb,a.wkod_seqn												")
			.where("                              , a.wker_idcd		,u.user_name , a.invc_numb 							")
			.where("                         from ( select max(invc_numb)	as invc_numb from work_book  group by wkod_numb,wkod_seqn	) w		")
			.where("	                     left outer join work_book a  on a.invc_numb = w.invc_numb					")
			.where("						 left outer join user_mast u  on a.wker_idcd  = u.user_idcd					")
			.where("                      ) w3 																			")
			.where("                on wd.invc_numb = w3.wkod_numb and wd.line_seqn = w3.wkod_seqn						")
			.where("group by  wo.acpt_numb , wo.acpt_seqn , wd.wkct_item_idcd											")
			.where("),																									")
			.where("wc as (																								")
			.where("select a.acpt_numb , a.acpt_seqn																	")
			.where("     , max(wkct_idcd) as wkct_idcd																	")
			.where("     , (select wkct_name from wkct_mast r where r.wkct_idcd = max(a.wkct_idcd)) as wkct_name		")
			.where("     , ( select b.cvic_idcd from work_book b														")
			.where("                            where a.wkod_numb = b.wkod_numb											")
			.where("                            and a.wkod_seqn = b.wkod_seqn											")
			.where("                            order by b.invc_date desc limit 1										")
			.where("       ) as cvic_idcd																				")
			.where("FROM ( select m.acpt_numb , m.acpt_seqn																")
			.where("            , a.cvic_idcd																			")
			.where("            , c.wkct_idcd																			")
			.where("            , concat(m.acpt_numb , m.acpt_seqn) as tmp												")
			.where("            , a.wkod_numb																			")
			.where("            , a.wkod_seqn																			")
			.where("       FROM   work_book a																			")
			.where("       left   outer join pror_mast m on a.wkod_numb = m.invc_numb									")
			.where("       left   outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("       where  m.acpt_numb is not null																")
			.where("      ) a																							")
			.where(" group by a.acpt_numb , a.acpt_seqn																	")
			.where(")																									")
			.where("select *																							")
			.where("from (																								")
			.where("select  i.invc_numb       , i.amnd_degr       , i.bzpl_idcd         , i.invc_date					")
			.where("      , i.ordr_dvcd       , i.orig_invc_numb  , i.expt_dvcd         , i.pcod_numb					")
			.where("      , a.deli_date       , i.cstm_idcd       , i.mdtn_prsn         , i.cont_date					")
			.where("      , i.drtr_idcd       , i.dept_idcd       , i.crny_dvcd         , i.excg_rate					")
			.where("      , i.ostt_wrhs_idcd  , i.trut_dvcd       , i.dlvy_cond_dvcd    , i.crdt_exce_yorn				")
			.where("      , i.amnt_lack_yorn  , i.sale_stor_yorn  , i.remk_text         , i.memo						")
			.where("      , i.cofm_yorn       , i.cofm_dttm       , i.cofm_drtr_idcd    , i.acpt_stat_dvcd				")
			.where("      , i.user_memo       , i.sysm_memo       , i.prnt_idcd         , i.line_levl					")
			.where("      , i.line_ordr       , i.line_stat       , i.line_clos         , i.find_name					")
			.where("      , i.updt_user_name  , i.updt_ipad       , SUBSTRING(a.updt_dttm,1,8)  as updt_dttm			")
			.where("      , i.updt_idcd       , DATE_FORMAT(a.crte_dttm,'%Y%m%d') as crte_dttm							")
			.where("      , i.updt_urif       , i.crte_user_name  , i.crte_ipad											")
			.where("      , i.crte_idcd       , i.crte_urif       , i.cstm_drtr_name									")
			.where("      , c.cstm_code       , c.cstm_name       , d.user_name as drtr_name							")
			.where("      , w.wrhs_code       , w.wrhs_name																")
			.where("      , a.cstm_offr_date  , a.cstm_lott_numb  , a.item_idcd         , a.cstm_deli_date				")
			.where("      , t.item_name       , a.invc_qntt       , a.invc_pric         , a.sply_amnt					")
			.where("      , a.deli_chge_resn  , a.line_seqn       , t.item_spec         , t.item_code					")
			.where("      , mn.min as min_deli																			")
			.where("      , mn.max as max_deli																			")
			.where("      , IFNULL(invc_qntt,0)-IFNULL(ostt_qntt,0) as upid_qntt        , cv.cvic_name					")
			.where("      , ig.cvic_idcd      , ig.strt_dttm      , ig.endd_dttm        , ig.wker_name					")
			.where("      , p.indn_qntt as indn_qntt      , ig.prod_qntt      , ig.poor_qntt        , ig.ordr_qntt		")
			.where("      , ifnull(p.indn_qntt,0) - ifnull(ig.prod_qntt,0) as jan_qntt									")
			.where("      , wc.wkct_name      , ig.wkct_item_idcd             , d2.user_name as crte_name				")
			.where("      , ifnull(t.item_name,t2.item_name) as wkct_item_name											")
			.where("      , ifnull(t.item_spec,t2.item_spec) as wkct_item_spec											")
			.where("      , ifnull(t.item_code,t2.item_code) as wkct_item_code											")
			.where("      , (select count(*) from acpt_item r where r.invc_numb = a.invc_numb) as item_count			")
			.where("      , @curRank:=@curRank+1 as rank																")
			.where("from   ( select invc_numb, line_seqn																")
			.where("         from acpt_item 																			")
			.where("         where 1=1																					")
			.where("         and   line_stat   < :line_stat			"   , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("         and    DATE_FORMAT(crte_dttm,'%Y%m%d') >= :strt_dttm		" , arg.getParamText("prod_strt_dttm"))
			.where("         and    DATE_FORMAT(crte_dttm,'%Y%m%d') <= :endd_dttm		" , arg.getParamText("prod_endd_dttm"))
			.where("         and    deli_date >= :deli_date1" , arg.getParamText("fr_dt"), "3".equals(arg.getParamText("date")))
			.where("         and    deli_date <= :deli_date2" , arg.getParamText("to_dt"), "3".equals(arg.getParamText("date")))
			.where("         and    cstm_offr_date >= :invc_date1" , arg.getParamText("fr_dt"), "2".equals(arg.getParamText("date")))
			.where("         and    cstm_offr_date <= :invc_date2" , arg.getParamText("to_dt"), "2".equals(arg.getParamText("date")))
			.where("         and    SUBSTRING(crte_dttm,1,8) >= :crte_dttm1" , arg.getParamText("fr_dt"), "1".equals(arg.getParamText("date")))
			.where("         and    SUBSTRING(crte_dttm,1,8) <= :crte_dttm2" , arg.getParamText("to_dt"), "1".equals(arg.getParamText("date")))
			.where("         and    cstm_lott_numb like %:cstm_lott_numb%	" , arg.getParamText("cstm_lott_numb"))
			.where("         and    item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("         and    sysm_memo like '%납품중%'				" , "1".equals(arg.getParamText("state")))		//발주상태
			.where("         and    sysm_memo like '%확정%'					" , "2".equals(arg.getParamText("state")))		//발주상태
			.where("         and    sysm_memo like '%중단%'					" , "3".equals(arg.getParamText("state")))		//발주상태
			.where("         and    sysm_memo like '%입고완료%'				" , "4".equals(arg.getParamText("state")))		//발주상태
			.where("         and    invc_numb like %:search_name1%			" , arg.getParamText("search_name"), "1".equals(arg.getParamText("search_id")))		//수주번호
			.where("       ) cnid																						")
			.where("left   outer join acpt_item      a  on cnid.invc_numb = a.invc_numb and cnid.line_seqn and a.line_seqn")
			.where("left   outer join ( select invc_numb																")
			.where("                    from acpt_mast																	")
			.where("                    where ifnull(ordr_dvcd,0) != '4000'												")
			.where("                  )          cnid2  on a.invc_numb = cnid2.invc_numb								")
			.where("left   outer join acpt_mast      i  on cnid.invc_numb = i.invc_numb									")
			.where("left   outer join cstm_mast      c  on i.cstm_idcd = c.cstm_idcd									")
			.where("left   outer join user_mast      d  on i.drtr_idcd = d.user_idcd									")
			.where("left   outer join user_mast      d2 on a.crte_idcd = d2.user_idcd									")
			.where("left   outer join wrhs_mast      w  on i.ostt_wrhs_idcd = w.wrhs_idcd								")
			.where("left   outer join item_mast      t  on a.item_idcd = t.item_idcd									")
			.where("left   outer join ing            ig on a.invc_numb = ig.acpt_numb and a.line_seqn = ig.acpt_seqn	")
			.where("left   outer join item_mast      t2 on ig.wkct_item_idcd = t2.item_idcd								")
			.where("left   outer join wc             wc on a.invc_numb = wc.acpt_numb and a.line_seqn = wc.acpt_seqn	")
			.where("left   outer join cvic_mast      cv on ig.cvic_idcd = cv.cvic_idcd									")
			.where("left   outer join ( SELECT b.acpt_numb,b.acpt_seqn,sum(a.indn_qntt) as indn_qntt					")
			.where("                    FROM pror_item a 																")
			.where("                    left outer join `pror_mast` b  on b.invc_numb = a.invc_numb						")
			.where("                    where a.line_stat = 1															")
			.where("                    group by b.acpt_numb,b.acpt_seqn												")
			.where("                  ) p on a.invc_numb = p.acpt_numb and a.line_seqn = p.acpt_seqn					")
			.where("left   outer join ( select max(deli_date) as max,min(deli_date) as min ,invc_numb					")
			.where("                    from acpt_item r																")
			.where("										group by invc_numb											")
			.where("									) mn on a.invc_numb = mn.invc_numb								")
			.where(",(select @curRank:=0) r																				")
			.where("where  1=1																							")
//			.where("and    a.deli_date >= :cstm_deli_date1		" , arg.getParamText("cstm_deli_date1"))					// 2020-10-07 두인 요청사항으로 deli_date가
//			.where("and    a.deli_date <= :cstm_deli_date2		" , arg.getParamText("cstm_deli_date2"))					// 협력사 납기일자라고 계속 말하여 검색조건을 바꿔줌 (장우영)
			.where("and    i.find_name	like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    i.acpt_stat_dvcd like %:acpt_stat%		" , arg.getParamText("acpt_stat"), "2".equals(arg.getParamText("search_id")))		//수주상태
			.where("and    i.cstm_drtr_name like %:cstm_drtr_name%	" , arg.getParamText("cstm_drtr_name" ))
			.where("and    i.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))
			.where("and    i.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("order by i.line_clos asc, a.deli_date desc, t.item_code												")
			.where(") a																									")
			.where(") z																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
