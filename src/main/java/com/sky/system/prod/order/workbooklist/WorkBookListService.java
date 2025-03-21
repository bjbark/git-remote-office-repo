package com.sky.system.prod.order.workbooklist;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class WorkBookListService extends DefaultServiceHandler{


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("with loss as (																						")
			.query("SELECT																								")
			.query("  invc_numb,																						")
			.query("  GROUP_CONCAT(ifnull(v.item_name , a.loss_resn_dvcd), ':',format(loss_time,0)) AS 'loss_text'		")
			.query("FROM work_book_loss a																				")
			.query("     left outer join sscd_view v on a.loss_resn_dvcd = item_code and v.sscd_code = 'loss_resn_dvcd'	")
			.query("where ifnull(loss_time,0) <> 0																		")
			.query("GROUP BY invc_numb																					")
			.query("),																									")
			.query("ing as (																							")
			.query("select wo.acpt_numb , wo.acpt_seqn , a.cvic_idcd , a.invc_numb										")
			.query("     , min(a.work_strt_dttm) as strt_dttm															")
			.query("     , max(a.work_endd_dttm) as endd_dttm															")
			.query("    , max(u.user_name)      as wker_name															")
			.query("     , sum(ifnull(a.indn_qntt,0))  as indn_qntt														")
			.query("    , sum(ifnull(prod_qntt,0))    as prod_qntt														")
	//		.query("    , sum(ifnull(poor_qntt,0))    as poor_qntt														")
			.query("    , sum(ifnull(wd.indn_qntt,0)) as ordr_qntt														")
			.query("    , ( select base_name  from base_mast r where wd.mtrl_bacd = r.base_code							")
			.query("                                           and   r.prnt_idcd = '3101' ) as mtrl_name				")
			.query("from  work_book a																					")
			.query("      left outer join pror_mast wo on a.wkod_numb  = wo.invc_numb									")
			.query("      left outer join pror_item wd on a.wkod_numb  = wd.invc_numb and a.wkod_seqn = wd.line_seqn	")
			.query("      left outer join acpt_mast po on wo.acpt_numb = po.invc_numb									")
			.query("      left outer join user_mast u  on a.wker_idcd  = u.user_idcd									")
			.query("where wo.acpt_numb is not null																		")
			.query("and   po.line_stat < '2'																			")
			.query("group by  wo.acpt_numb , wo.acpt_seqn , a.cvic_idcd													")
			.query("),																									")
			.query("poor as (																							")
			.query("SELECT																								")
			.query("  a.invc_numb, sum(ifnull(poor_qntt,0))    as poor_qntt,											")
			.query("  GROUP_CONCAT(ifnull(b.base_name , a.poor_bacd), ':',format(a.poor_qntt,0)) AS 'poor_text'			")
			.query("FROM work_book_qc a																					")
			.query("     left outer join base_mast b on a.poor_bacd = b.base_code and b.prnt_idcd = '6000'				")
			.query("where ifnull(a.poor_qntt,0) <> 0																	")
			.query("GROUP BY invc_numb																					")
			.query("),																									")
			.query("wc as (																								")
			.query("select a.acpt_numb , a.acpt_seqn , c.wkct_idcd														")
			.query("     , w.wkct_name	, a.invc_numb																	")
			.query("from (																								")
			.query("    SELECT  m.acpt_numb , m.acpt_seqn , a.cvic_idcd , a.invc_numb									")
			.query("         , (CASE when @val1 = m.acpt_numb and @val2 = m.acpt_seqn  THEN @rownum:=@rownum+1			")
			.query("                 else @rownum:=1 END)   as rNum														")
			.query("         , (@val1:=m.acpt_numb) temp1																")
			.query("         , (@val2:=m.acpt_seqn) temp2																")
			.query("    FROM  work_book a																				")
			.query("        left outer join pror_mast m on a.wkod_numb = m.invc_numb									")
			.query("        ,(SELECT @val:='', @rownum:=0) SUB															")
			.query("   where m.acpt_numb is not null																	")
			.query("   order by m.acpt_numb , m.acpt_seqn , a.work_strt_dttm desc 										")
			.query(") a																									")
			.query("   left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd											")
			.query("   left outer join wkct_mast w on c.wkct_idcd = w.wkct_idcd											")
			.query("where rNum = 1																						")
			.query("order by acpt_numb , acpt_seqn , rNum																")
			.query(")																									")
			.query("select    a.invc_numb     , a.invc_date       , a.cvic_idcd   , a.mold_idcd							")
			.query("      , a.item_idcd       , a.dayn_dvcd       , a.good_qntt											")
			.query("      , a.need_time       , a.theo_qntt       , b.invc_qntt   , b.invc_pric							")
			.query("      , b.invc_amnt																					")
			.query("      , a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl							")
			.query("      , a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd							")
			.query("      , a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm							")
			.query("      , a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec							")
			.query("      , i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time							")
			.query("      , case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs	")
			.query("      , m.mold_code																					")
			.query("      , concat(ifnull(l.loss_text,'') , '  '  , ifnull(q.poor_text,'')) as remk_text				")
			.query("      , ing.indn_qntt     , ing.mtrl_name     , b.invc_numb as acpt_numb							")
			.query("      , b.cstm_lott_numb  , b.deli_date       , b.sply_amnt   , a.prod_qntt							")
			.query("      , q.poor_qntt       , wc.wkct_name															")
			.query("      , b.cstm_offr_date  , b.invc_qntt       , am.remk_text as acpt_remk_text						")
			.query("      , substring(a.updt_dttm,1,8) as updt_date														")
			.query("from work_book a																					")
			.query("left outer join loss      l on a.invc_numb   = l.invc_numb											")
			.query("left outer join ing       ing on a.invc_numb = ing.invc_numb										")
			.query("left outer join poor      q on a.invc_numb   = q.invc_numb											")
			.query("left outer join wc        wc on a.invc_numb  = wc.invc_numb											")
			.query("left outer join pror_mast p on a.wkod_numb   = p.invc_numb											")
			.query("left outer join acpt_item b on p.acpt_numb   = b.invc_numb and p.acpt_seqn = b.line_seqn			")
			.query("left outer join acpt_mast am on b.invc_numb  = am.invc_numb											")
			.query("left outer join item_mast i on a.item_idcd   = i.item_idcd											")
			.query("left outer join cvic_mast c on a.cvic_idcd   = c.cvic_idcd											")
			.query("left outer join mold_mast m on a.mold_idcd   = m.mold_idcd											")
			.query("where 1=1																							")
			.query("and     a.find_name	like %:find_name%      " , arg.getParamText("find_name"  ))
			.query("and     b.deli_date      >= :deli_date1    " , arg.getParamText("deli_date1" ))
			.query("and     b.deli_date      <= :deli_date2    " , arg.getParamText("deli_date2" ))
			.query("and     substring(a.updt_dttm,1,8)      >= :updt_dttm1    " , arg.getParamText("updt_dttm1" ))
			.query("and     substring(a.updt_dttm,1,8)      <= :updt_dttm2    " , arg.getParamText("updt_dttm2" ))
			.query("and     a.dayn_dvcd       = :dayn_dvcd     " , arg.getParamText("dayn_dvcd"  ))
			.query("and     b.invc_numb       = :acpt_numb     " , arg.getParameter("acpt_numb"  ))
			.query("and     a.cvic_idcd       = :cvic_idcd     " , arg.getParameter("cvic_idcd"  ))
			.query("and     a.item_idcd       = :item_idcd     " , arg.getParameter("item_idcd"  ))
			.query("and     wc.wkct_idcd      = :wkct_idcd     " , arg.getParameter("wkct_idcd"  ))
			.query("and     b.cstm_lott_numb like %:cstm_lott_numb%" , arg.getParameter("cstm_lott_numb"))
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	// 조회
	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																	" )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cvic_idcd   , a.mold_idcd				")
			.query("		, a.item_idcd       , a.dayn_dvcd       , a.good_qntt   , a.poor_qntt				")
			.query("		, a.need_time       , a.theo_qntt       , b.invc_qntt   , b.invc_pric				")
			.query("		, b.invc_amnt																		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec				")
			.query("		, i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time				")
			.query("		, m.mold_code       , p.acpt_numb       , a.lott_numb   , w.wkct_name				")
			.query("		, (select base_name from base_mast r where a.mtrl_bacd  = r.base_code				")
			.query("												and   r.prnt_idcd = '3101')   as mtrl_name	")
			.query("		, case ifnull(a.theo_qntt,0) when 0 												")
			.query("							then null 														")
			.query("							else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100		")
			.query("		  end as good_prgs																	")
			.query("from work_book a																			")
			.query("left outer join pror_mast p on a.wkod_numb = p.invc_numb									")
			.query("left outer join acpt_item b on p.acpt_numb = b.invc_numb and p.acpt_seqn = b.line_seqn		")
			.query("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.query("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.query("left outer join wkct_mast w on c.wkct_idcd = w.wkct_idcd									")
			.query("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.query("where 1=1																					")
			.query("and     b.invc_numb   = :invc_numb		" , arg.getParamText("invc_numb" ))
			.query("and     b.line_seqn   = :line_seqn		" , arg.getParamText("line_seqn" ))
//			.query("and     a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
//			.query("and     a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
//			.query("and     a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
//			.query("and     a.dayn_dvcd   = :dayn_dvcd		" , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
//			.query("and     a.item_idcd  = :item_idcd		" , arg.getParameter("item_idcd"))
//			.query("and     a.cvic_idcd  = :cvic_idcd		" , arg.getParameter("cvic_idcd"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
