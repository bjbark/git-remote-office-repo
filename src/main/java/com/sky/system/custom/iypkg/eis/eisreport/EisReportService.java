package com.sky.system.custom.iypkg.eis.eisreport;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

@Service("iypkg.EisReportService")
public class EisReportService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																									")
		;
		data.param
		.where("from (																										")
		.where("select    a.invc_numb as wkod_numb            , a.line_seqn as wkod_seqn									")
		.where("        , c.cvic_idcd      , c.cvic_name      , a.prog_stat_dvcd      , w.invc_numb							")
		.where("        , a.item_idcd      , b.cstm_idcd      , m.cstm_name           , i.prod_name as item_name			")
		.where("        , DATE_FORMAT(w.work_strt_dttm,'%Y-%m-%d %H:%i:%s') as work_strt_dttm								")
		.where("        , a.indn_qntt      , ifnull(json_value(a.json_data , '$**.pkg_qntt'),1) as pkg_qntt					")
		.where("from 																										")
		.where(" ( select a.cvic_idcd , a.cvic_name								 											")
		.where("   from ( select @rownum := @rownum+1 as num, cvic_idcd, cvic_name	 										")
		.where("          from cvic_mast, (select @rownum:=0) tmp order by cvic_code	 									")
		.where("   ) a 												 														")
		.where("   where 1=1												 												")
		.where("   and a.num = :num	", arg.getParamText("num"))
		.where(" )c																											")
		.where("left outer join work_book    w on c.cvic_idcd = w.cvic_idcd													")
		.where("left outer join pror_item    a on w.wkod_numb = a.invc_numb and w.wkod_seqn = a.line_seqn	")
		.where("left outer join pror_mast    b on a.invc_numb = b.invc_numb													")
		.where("left outer join product_mast i on a.item_idcd = i.prod_idcd													")
		.where("left outer join cstm_mast    m on b.cstm_idcd = m.cstm_idcd													")
		.where("where 1=1																									")
		.where("order by w.work_strt_dttm desc limit 1																		")
		.where(") a																											")
		;
		return data.selectForMap() ;
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																										")
			.where("select     a.invc_numb     , a.cvic_idcd                  , a.prog_stat_dvcd     , b.cstm_idcd				")
			.where("         , c.cstm_name     , i.prod_name as item_name     , a.item_idcd          , a.indn_qntt				")
			.where("from work_book a																							")
			.where("left outer join pror_mast b on a.wkod_numb = b.invc_numb													")
			.where("left outer join pror_item m on a.wkod_numb = m.invc_numb and a.wkod_seqn = m.line_seqn						")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
			.where("left outer join product_mast i on a.item_idcd = i.prod_idcd													")
			.where("where 1=1																									")
			.where("and   a.prog_stat_dvcd <> 3																					")
			.where("and   m.invc_numb is not null																				")
			.where("and   a.cvic_idcd  = :cvic_idcd        " , arg.getParamText("cvic_idcd"))
			.where("and   a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1"))
			.where("and   a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2"))
			.where(") a																											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																									")
		;
		data.param
			.where("from (																										")
			.where("select     a.invc_numb     , a.cvic_idcd                  , a.prog_stat_dvcd     , b.cstm_idcd				")
			.where("         , c.cstm_name     , i.prod_name as item_name     , a.item_idcd          , a.indn_qntt				")
			.where("         , w.work_strt_dttm, w.work_endd_dttm, w.prod_qntt													")
			.where("         , w.invc_numb as work_numb          , ifnull(q.poor_qntt,0) as sum_poor_qntt						")
			.where("from pror_item a																							")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb													")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd													")
			.where("left outer join product_mast i on a.item_idcd = i.prod_idcd													")
			.where("left outer join work_book w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn						")
			.where("left outer join ( select sum(ifnull(poor_qntt,0)) as poor_qntt, invc_numb									")
			.where("                  from work_book_qc																			")
			.where("                  group by invc_numb																		")
			.where("                ) q on w.invc_numb = q.invc_numb															")
			.where("where 1=1																									")
			.where("and   w.prog_stat_dvcd = 3																					")
			.where("and   w.cvic_idcd  = :cvic_idcd        " , arg.getParamText("cvic_idcd"))
			.where("and   w.invc_date >= :invc_date1       " , arg.getParamText("invc_date1"))
			.where("and   w.invc_date <= :invc_date2       " , arg.getParamText("invc_date2"))
			.where(") a																											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//불량조회
	public SqlResultMap getPoor(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb   , a.line_seqn    , a.invc_date       , a.poor_bacd		")
			.where("      , a.sttm        , a.edtm         , a.wker_idcd       , a.occr_qntt		")
			.where("      , a.good_qntt   , a.poor_qntt    , a.poor_proc_dvcd						")
			.where("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6000')   as poor_name")
			.where("from   work_book_qc a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb		" , arg.getParameter("invc_numb"))
			.where("and    a.line_stat = :line_stat		" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getPlc_Cnt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select sum(PARAM1) as cnt 																	")
		;
		data.param
		.where("from work_book a																			")
		.where("left outer join wt_conv c on a.cvic_idcd = c.cvic_idcd										")
		.where("left outer join  WT_DATA_IN b on a.work_strt_dttm <= DATE_FORMAT(b.TIMEPOINT,'%Y%m%d%H%i00')")
		.where("                 and if(a.work_endd_dttm='',DATE_FORMAT(now(),'%Y%m%d%H%i00'),a.work_endd_dttm)	")
		.where("                        >= DATE_FORMAT(b.TIMEPOINT,'%Y%m%d%H%i00')							")
		.where("                 and c.device = b.device													")
		.where("where a.wkod_numb = :invc_numb", arg.fixParameter("invc_numb"))
		.where("and   a.wkod_seqn = :line_seqn", arg.fixParameter("line_seqn"))
		.where("and   a.cvic_idcd <> ''																		")
		;
		return data.selectForMap();
	}



}
