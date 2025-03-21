package com.sky.system.custom.aone.sale.order.sorderplan;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("aone.SorderPlanService")
public class SorderPlanService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	//마스터 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																								")
		;
		data.param
			.query("select *																													")
		;
		data.param
			.query("from (																														")
			.query("		select a.invc_numb       , a.amnd_degr       , a.acpt_dvcd       , a.invc_date       , a.cstm_idcd					")
			.query("			 , a.ordr_dvcd       , a.memo            , a.acpt_stat_dvcd														")
			.query("			 , b.item_idcd       , b.remk_text       , b.invc_qntt       , b.line_seqn       , b.deli_date as deli_date2	")
			.query("			 , json_value(b.json_data,'$.sral_numb') as sral_numb															")
			.query("			 , json_value(b.json_data,'$.pdod_date') as  pdod_date															")
			.query("			 , concat(date_format(json_value(b.json_data,'$.plan_strt_date' ), '%Y-%m-%d'), '~', date_format(json_value(b.json_data,'$.plan_endd_date'), '%Y-%m-%d')) as  plan_date ")
			.query("			 , json_value(b.json_data,'$.prod_drtr_idcd') as  prod_drtr_idcd												")
			.query("			 , json_value(b.json_data,'$.plan_strt_date') as  plan_strt_date												")
			.query("			 , json_value(b.json_data,'$.plan_endd_date') as  plan_endd_date												")
			.query("			 , json_value(b.json_data,'$.repa_stat_dvcd') as  repa_stat_dvcd												")
			.query("			 , c.cstm_name																									")
			.query("			 , d.item_name       , d.item_code       , d.item_spec															")
			.query("			 , f.work_strt_dttm  , f.work_endd_dttm  , f.need_time															")
			.query("			 , g.user_name as prod_drtr_name																				")
			.query("			 ,(select sum(h.amnt) from esti_mtrl h where h.invc_numb = a.invc_numb and h.amnd_degr = a.amnd_degr) as esti_amnt	")
			.query("			 , i.make_cost																									")
			.query("			 , j.qntt as comp_prft  , j.amnt as comp_prft2																	")
			.query("			 , k.qntt as work_time  , k.pric as work_time2  , k.amnt as work_time3 		,g.dept_idcd						")
			.query("		from acpt_mast a																									")
			.query("			 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr							")
			.query("			 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd														")
			.query("			 left outer join item_mast d on b.item_idcd = d.item_idcd														")
			.query("			 left outer join work_book f on b.invc_numb = f.wkod_numb and b.line_seqn = f.wkod_seqn							")
			.query("			 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')						")
			.query("			 left outer join esti_mtrl h on h.invc_numb = a.invc_numb and h.amnd_degr = a.amnd_degr 						")
			.query("			 left outer join esti_mast i on i.invc_numb = a.invc_numb and i.amnd_degr = a.amnd_degr 						")
			.query("			 left outer join esti_make j on a.invc_numb = j.invc_numb and a.amnd_degr = j.amnd_degr and j.line_seqn = 1")
			.query("			 left outer join esti_make k on a.invc_numb = k.invc_numb and a.amnd_degr = k.amnd_degr and k.line_seqn = 2")
			.query("		where 1 = 1																											")
			.query("		and   ifnull(a.ordr_dvcd,0) != '4000'																				")
			.query("		and   a.acpt_stat_dvcd not in ('0010' , '6000')																		")
			.query("		and   a.line_clos = 0																								")
			.query("		and   a.find_name  like %:find_name%	" , arg.getParamText("find_name" ))
			.query("		and   a.invc_date     >= :invc1_date	" , arg.getParamText("invc1_date"))
			.query("		and   a.invc_date     <= :invc2_date	" , arg.getParamText("invc2_date"))
			.query("		and   a.acpt_stat_dvcd = :acpt_stat_dvcd" , arg.getParamText("acpt_stat_dvcd"))
			.query("		and   a.acpt_dvcd      = :acpt_dvcd		" , arg.getParamText("acpt_dvcd"))
			.query("		and   a.cstm_idcd      = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("		and   a.drtr_idcd      = :drtr_idcd		" , arg.getParamText("drtr_idcd"))
			.query("		and   b.item_idcd      = :item_idcd		" , arg.getParamText("item_idcd"))
			.query("		and   d.item_spec  like %:item_spec%    " , arg.getParamText("item_spec"))
			.query("		and   g.user_name      = :prod_drtr_name" , arg.getParamText("prod_drtr_name"))
			.query("		and   json_value(b.json_data,'$.repa_stat_dvcd') = :repa_stat_dvcd	" , arg.getParamText("repa_stat_dvcd"))
			.query("		and   json_value(b.json_data,'$.sral_numb')  like %:sral_numb%		" , arg.getParamText("sral_numb"))
			.query("		and   a.line_stat  < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("		group by a.invc_numb																								")
			.query("		order by a.invc_numb desc, a.amnd_degr desc														")
			.query(") a																															")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd         			            	")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, w.wrhs_code       , w.wrhs_name														")
			.query("		, i.item_idcd                                                                           ")
		;
		data.param
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    a.ordr_dvcd != '4000'																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	        ")
			.where("order by a.invc_numb																	        ")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
	;
	data.param
		.query(" select  json_value(a.json_data,'$.prod_drtr_idcd') as prod_drtr_idcd	,u.user_name 			")
	;
	data.param
		.where(" from acpt_item a																				")
		.where(" left outer join user_mast u on u.user_idcd = json_value(a.json_data,'$.prod_drtr_idcd')		")
		.where(" where u.user_name is not null																	")
		.where(" group by u.user_name																			")
		.where(" order by prod_drtr_idcd																		")
//		.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
//		.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
//		.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
//		.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
//		.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
//		.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
//		.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
//		.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
	;
	if (page == 0 && rows == 0){
		return data.selectForMap(sort);
	} else {
		return data.selectForMap(page, rows, (page==1), sort );
	}
}

	public SqlResultMap getMaster4(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

//		data.param // 집계문  입력
//			.total(" select  count(1) as maxsize  ")
//		;

		data.param
			.query("with temp as (																			")
			.query("	select a.drtr_idcd , a.invc_date , a.acpt_qntt , d.user_name 						")
			.query("		  , json_value(i.json_data,'$.prod_drtr_idcd') as prod_drtr_idcd				")
			.query("	from acpt_mast a																	")
			.query("	left outer join acpt_item i on a.invc_numb = i.invc_numb							")
			.query("	left outer join user_mast d on json_value(i.json_data,'$.prod_drtr_idcd') = d.user_idcd ")
			.query("	where 1 = 1																			")
			.query("	and   a.invc_date = :invc_date1 " , arg.getParamText("invc_date1"))
			.query("	and   a.invc_date = :invc_date2 " , arg.getParamText("invc_date2"))
			.query("    and   a.line_stat  < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.query(")																						")
			.query("select t.*																				")
			.query("from (																					")
			.query("	select   prod_drtr_idcd	, a.user_name												")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 1, a.acpt_qntt, 0)) AS 1_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 2, a.acpt_qntt, 0)) AS 2_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 3, a.acpt_qntt, 0)) AS 3_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 4, a.acpt_qntt, 0)) AS 4_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 5, a.acpt_qntt, 0)) AS 5_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 6, a.acpt_qntt, 0)) AS 6_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 7, a.acpt_qntt, 0)) AS 7_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 8, a.acpt_qntt, 0)) AS 8_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 9, a.acpt_qntt, 0)) AS 9_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 10, a.acpt_qntt, 0)) AS 10_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 11, a.acpt_qntt, 0)) AS 11_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 12, a.acpt_qntt, 0)) AS 12_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 13, a.acpt_qntt, 0)) AS 13_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 14, a.acpt_qntt, 0)) AS 14_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 15, a.acpt_qntt, 0)) AS 15_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 16, a.acpt_qntt, 0)) AS 16_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 17, a.acpt_qntt, 0)) AS 17_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 18, a.acpt_qntt, 0)) AS 18_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 19, a.acpt_qntt, 0)) AS 19_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 20, a.acpt_qntt, 0)) AS 20_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 21, a.acpt_qntt, 0)) AS 21_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 22, a.acpt_qntt, 0)) AS 22_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 23, a.acpt_qntt, 0)) AS 23_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 24, a.acpt_qntt, 0)) AS 24_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 25, a.acpt_qntt, 0)) AS 25_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 26, a.acpt_qntt, 0)) AS 26_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 27, a.acpt_qntt, 0)) AS 27_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 28, a.acpt_qntt, 0)) AS 28_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 29, a.acpt_qntt, 0)) AS 29_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 30, a.acpt_qntt, 0)) AS 30_day			")
			.query("		, sum(if(DAY(substr(a.invc_date,7,8)) = 31, a.acpt_qntt, 0)) AS 31_day			")
			.query("		, 1 as row_num 																	")
			.query("	from temp a																			")
			.query("	where a.user_name is not null														")
			.query("	and substr(a.invc_date,1,5)															")
			.query("	group by a.user_name 																")
			.query(") t																						")
		;

		return data.selectForMap();
	}

	//견적 자재 내역 조회
	public SqlResultMap getMtrl(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.*, (a.qntt * a.pric) as amnt															")
			.query("from (																							")
			.query("	select a.invc_numb    , a.amnd_degr   , a.line_seqn     , a.assi_seqn						")
			.query("		 , a.item_name    , a.item_spec   , a.qntt          , a.pric							")
			.query("		 , a.item_idcd    , c.item_code   , d.stok_qntt											")
		;
		data.param
			.where("	from esti_mtrl a																			")
			.where("		 left outer join acpt_mast b on b.invc_numb = a.invc_numb and b.amnd_degr = a.amnd_degr	")
			.where("		 left outer join item_mast c on c.item_idcd = a.item_idcd								")
			.where("		 left outer join stok_mast d on d.item_idcd = a.item_idcd								")
			.where("	where 1=1																					")
			.where("	and   b.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("	and   b.amnd_degr	=:amnd_degr		" , arg.getParamText("amnd_degr"))
			.where("	and   a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("	group by a.item_idcd																		")
			.where("	order by a.invc_numb, a.line_seqn asc														")
			.where(") a																								")
		;
		return data.selectForMap();
	}

	//견적 자재 둥록
	public SqlResultMap setMtrl(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String hq = "";

		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}

			data.param
				.table("esti_mtrl")

				.where("where invc_numb = :invc_numb")
				.where("and   amnd_degr = :amnd_degr")
				.where("and   assi_seqn = :assi_seqn")

				.unique("invc_numb", row.fixParameter("invc_numb"))
				.unique("amnd_degr", row.fixParameter("amnd_degr"))
				.unique("line_seqn", row.fixParameter("line_seqn"))
				.unique("assi_seqn", row.fixParameter("assi_seqn"))

				.update("mtrl_clss_dvcd", row.getParameter("mtrl_clss_dvcd"))
				.update("item_idcd", row.getParameter("item_idcd"))
				.update("item_name", row.getParameter("item_name"))
				.update("item_spec", row.getParameter("item_spec"))
				.update("qntt"     , row.getParameter("qntt"))
				.update("pric"     , row.getParameter("pric"))
				.update("amnt"     , row.getParameter("amnt"))
				.update("uper_seqn", row.getParameter("uper_seqn"))
				.update("disp_seqn", row.getParameter("disp_seqn"))
				.update("user_memo", row.getParameter("user_memo"))
				.update("sysm_memo", row.getParameter("sysm_memo"))

				.update("updt_idcd", row.getParameter("updt_idcd"		))
				.insert("crte_idcd", row.getParameter("crte_idcd"		))
				.update("updt_ipad", arg.remoteAddress )
				.insert("crte_ipad", arg.remoteAddress )
				.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		data.execute();
		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;
		return data.selectForMap();
	}

	//이미지 검색
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge, item_imge2		")
			.where("from  acpt_item						")
			.where("where 1=1							")
			.where("      and  invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.where("      and  amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
			.where("      and  line_seqn = :line_seqn", arg.getParameter("line_seqn"))
			.where("      and  item_idcd = :item_idcd", arg.getParameter("item_idcd"))
		;
		return data.selectForMap();
	}

	/**
	 * master 등록/수정/삭제
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String hq = "";

		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}

			ParamToJson trans = new ParamToJson();
			String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

			// 마스터 등록/수정
			data.param
				.table("acpt_mast"													 )
				.where("where invc_numb = :invc_numb								")  /*  aone_code  */
				.where("and   amnd_degr = :amnd_degr								")

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))  /*  aone_code */
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))  /*  차수  */

				.update("memo"				, row.getParameter("memo"				))
				.update("acpt_stat_dvcd"	, row.getParameter("acpt_stat_dvcd")	)  /*  수주상태구분코드  */
			;
			data.param
				.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
				.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
				.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
				.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
				.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
				.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */

				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   amnd_degr = :amnd_degr")
			.where ("and   line_seqn = :line_seqn")

			.unique("invc_numb"		, row.getParameter("invc_numb"))
			.unique("amnd_degr"		, row.getParameter("amnd_degr"))
			.unique("line_seqn"		, row.getParameter("line_seqn"))

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.sral_numb','$.prod_drtr_idcd', '$.plan_strt_date', '$.plan_endd_date', '$.pdod_date'), '" + json_data + "')")

			.update("updt_ipad"		, row.getParameter("updt_ipad"))  /*  수정IP  */
			.update("updt_idcd"		, row.getParameter("updt_idcd"))  /*  수정ID  */
			.update("updt_urif"		, row.getParameter("updt_urif"))  /*  수정UI  */
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))  /*  수정일시  */
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		data.execute();
		return null;
	}
	public SqlResultMap setRecordsAll(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String hq = "";

		for (SqlResultRow row:map) {
			if(row.getParamText("hqof_idcd").length() > 0){
				hq = row.getParamText("hqof_idcd");
			}

			ParamToJson trans = new ParamToJson();
			String json_data = trans.TranslateRowAll(arg, row, "acpt_item_json_fields");

			// 마스터 등록/수정
			data.param
				.table("acpt_mast"													 )
				.where("where invc_numb = :invc_numb								")  /*  aone_code  */
				.where("and   amnd_degr = :amnd_degr								")

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))  /*  aone_code */
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))  /*  차수  */

				.update("memo"				, arg.getParameter("memo"				))
				.update("acpt_stat_dvcd"	, arg.getParameter("acpt_stat_dvcd")	)  /*  수주상태구분코드  */
			;
			data.param
				.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
				.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
				.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
				.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
				.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
				.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */

				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
			;
			data.attach(Action.modify);

			data.param
				.table ("acpt_item")
				.where ("where invc_numb = :invc_numb")
				.where ("and   amnd_degr = :amnd_degr")
				.where ("and   line_seqn = :line_seqn")

				.unique("invc_numb"		, row.getParameter("invc_numb"))
				.unique("amnd_degr"		, row.getParameter("amnd_degr"))
				.unique("line_seqn"		, row.getParameter("line_seqn"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.sral_numb','$.prod_drtr_idcd', '$.plan_strt_date', '$.plan_endd_date', '$.pdod_date'), '" + json_data + "')")

				.update("updt_ipad"		, row.getParameter("updt_ipad"))  /*  수정IP  */
				.update("updt_idcd"		, row.getParameter("updt_idcd"))  /*  수정ID  */
				.update("updt_urif"		, row.getParameter("updt_urif"))  /*  수정UI  */
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))  /*  수정일시  */
			;
			data.attach(Action.modify);

			data.execute();
			data.clear();
		}
		return null;
	}
	// 가공비 산출내역 저장
	public SqlResultMap setEsti(HttpRequestArgument arg) throws Exception {
		String invc_numb		= arg.getParamText("invc_numb");	// 견적번호
		String amnd_degr		= arg.getParamText("amnd_degr");	// 견적차수
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}
		if (amnd_degr.length() == 0) {
			amnd_degr = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

			data.param // 기업이윤 저장
				.table("esti_make")
				.where("where invc_numb = :invc_numb")
				.where("and   amnd_degr = :amnd_degr")
				.where("and   line_seqn = :line_seqn")
				.where("and   assi_seqn = :assi_seqn")

				.unique("invc_numb"		, arg.fixParameter("invc_numb") )	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr") )	// 견적차수
				.unique("line_seqn"		, 1								)	// 순번
				.unique("assi_seqn"		, 0								)	// 보조순번

				.update("wkct_name"		, "기업이윤"						)	// 공정명
				.update("qntt"			, arg.getParameter("comp_prft") )	// 수량
				.update("amnt"			, arg.getParameter("comp_prft2"))	// 금액

				.update("updt_idcd"		, arg.getParameter("updt_idcd") )
				.insert("crte_idcd"		, arg.getParameter("crte_idcd") )
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				.insert("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.param // 작업시간 저장
				.table("esti_make")
				.where("where invc_numb = :invc_numb	")
				.where("and   amnd_degr = :amnd_degr	")
				.where("and   line_seqn = :line_seqn	")
				.where("and   assi_seqn = :assi_seqn	")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))	// 견적차수
				.unique("line_seqn"		, 2							   )	// 순번
				.unique("assi_seqn"		, 0							   )	// 보조순번

				.update("wkct_name"		, "작업시간"					   )	// 공정명
				.update("qntt"			, arg.getParameter("work_time"))	// 수량
				.update("pric"			, arg.getParameter("work_time2"))	// 단가
				.update("amnt"			, arg.getParameter("work_time3"))	// 금액


				.update("updt_idcd"		, arg.getParameter("updt_idcd"))
				.insert("crte_idcd"		, arg.getParameter("crte_idcd"))
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.param // 총액 저장
				.table("esti_mast")
				.where("where invc_numb = :invc_numb	")
				.where("and   amnd_degr = :amnd_degr	")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))	// 견적번호
				.unique("amnd_degr"		, arg.fixParameter("amnd_degr"))	// 견적차수

				.update("invc_date"		, arg.getParameter("invc_date"))	//작성날짜
				.update("cstm_idcd"		, arg.getParameter("cstm_idcd"))	//거래처ID
				.update("cstm_name"		, arg.getParameter("cstm_name"))	//거래처명
				.update("deli_date"		, arg.getParameter("deli_date2"))	//납기예정일자
				.update("drtr_idcd"		, arg.getParameter("user_idcd"))	//작성자ID
				.update("make_cost"		, arg.getParameter("make_cost"))	//견적 총 비용
				.update("esti_amnt"		, arg.getParameter("esti_amnt"))	//부품원가

				.update("updt_idcd"		, arg.getParameter("updt_idcd"))
				.insert("crte_idcd"		, arg.getParameter("crte_idcd"))
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

		data.execute();
		return null;
	}

	//반려
	public SqlResultMap setReturn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_item_json_fields");
		for (SqlResultRow row : arg.getParameter("records", SqlResultMap.class)) {
			data.param
				.table("acpt_item")
				.where("where invc_numb		= :invc_numb	")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn	")  /*  INVOICE순번  */
				.where("and   amnd_degr		= :amnd_degr	")	/*  AMEND순번  */

				.unique("invc_numb"		, row.fixParameter("invc_numb"))
				.unique("line_seqn"		, row.fixParameter("line_seqn"))
				.unique("amnd_degr"		, row.fixParameter("amnd_degr"))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.repa_stat_dvcd'), '" + json_data + "')")

				.update("updt_idcd"		, row.getParameter("updt_idcd"))  /*  수정ID  */
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))  /*  수정일시  */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("acpt_mast" )
				.where("where invc_numb		= :invc_numb				  ")  /*  INVOICE번호  */
				.where("and   amnd_degr		= :amnd_degr				  ")  /*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"))

				.update("acpt_stat_dvcd"	, 3000)

				.update("updt_idcd"			, row.getParameter("updt_idcd"))  /*  수정ID  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null;
	}

}