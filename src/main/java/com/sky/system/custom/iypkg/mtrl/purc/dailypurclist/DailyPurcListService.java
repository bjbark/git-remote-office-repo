package com.sky.system.custom.iypkg.mtrl.purc.dailypurclist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class DailyPurcListService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	// 원단매입일보 조회
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort, int start) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select a.invc_numb       , b.invc_date       , b.cstm_idcd       , c.cstm_name								")
			.where("          , d.ppkd_dvcd       , d.ppln_dvcd       , d.fabc_spec       , json_value(a.json_data, '$**.item_fxqt') as item_fxqt	")
			.where("          , a.istt_qntt as istt_qntt              , json_value(p.json_data, '$**.mxm2_pric') as mxm2_pric		")
			.where("          , json_value(p.json_data, '$**.pqty_pric') as pqty_pric     , a.istt_amnt as istt_amnt				")
			.where("          , json_value(p.json_data, '$**.mxm2_pric') * json_value(p.json_data, '$**.mxm2_qntt')  as alm2_pric	")
			.where("          , c2.cstm_name as acpt_cstm_name        , ba.prod_name      , bm.fabc_name							")
			.where("          , ifnull(round((a.istt_amnt/ba.sply_amnt)*100,1),0) as cost_amnt										")
			.where("          , b.invc_date as crt_date               , null as rnum												")
			.where("     from purc_istt_item a																						")
			.where("     left outer join purc_istt_mast b   on a.invc_numb=b.invc_numb												")
			.where("     left outer join cstm_mast      c   on b.cstm_idcd=c.cstm_idcd												")
			.where("     left outer join fabc_mast      d   on a.item_idcd=d.fabc_idcd												")
			.where("     left outer join purc_ordr_item p   on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb											")
			.where("     left outer join boxx_acpt      ba  on p.orig_invc_numb = ba.invc_numb										")
			.where("     left outer join boxx_acpt_bom  bm  on p.orig_invc_numb = bm.invc_numb and p.orig_seqn = bm.line_seqn		")
			.where("     left outer join cstm_mast      c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("     where 1=1																									")
			.where("     and   json_value(pm.json_data , '$**.offr_path_dvcd') = '1'												")
			.where("     and   b.cstm_idcd not in(select cstm_idcd from cstm_mast where otod_cstm_yorn='1')							")
			.where("     and   b.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   ba.find_name like %:find_name	" , arg.getParamText("find_name"))
			.where("     and   c.cstm_code >= :cstm_code1		" , arg.getParamText("cstm_code1"))
			.where("     and   c.cstm_code <= :cstm_code2		" , arg.getParamText("cstm_code2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.ppkd_dvcd															")
			.where("       , a.ppln_dvcd															")
			.where("       , a.fabc_name															")
			.where("       , a.fabc_spec															")
			.where("       , a.item_fxqt															")
			.where("       , a.istt_qntt															")
			.where("       , a.mxm2_pric															")
			.where("       , a.pqty_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.alm2_pric															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.cost_amnt															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as invc_date														")
					.where("       , a.cstm_idcd															")
					.where("       , concat(a.cstm_name,'계') as cstm_name									")
					.where("       , null as ppkd_dvcd														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.alm2_pric) as alm2_pric											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as cost_amnt														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date, cstm_idcd													")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '일계' as cstm_name														")
					.where("       , null as ppkd_dvcd														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.alm2_pric) as alm2_pric											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as cost_amnt														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date																")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '월계' as cstm_name														")
					.where("       , null as ppkd_dvcd														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.alm2_pric) as alm2_pric											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as cost_amnt														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 4 as rnum																")
					.where(" from cte a																		")
					.where(" group by concat(substr(a.invc_date,1,6),'99')									")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , '합계' as invc_date														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_name														")
					.where("       , null as ppkd_dvcd														")
					.where("       , null as ppln_dvcd														")
					.where("       , null as fabc_name														")
					.where("       , null as fabc_spec														")
					.where("       , null as item_fxqt														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as mxm2_pric														")
					.where("       , null as pqty_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.alm2_pric) as alm2_pric											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as cost_amnt														")
					.where("       , '99999999' as crt_date													")
					.where("       , 5 as rnum																")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cstm_idcd, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 외주매입일보 조회
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select a.invc_numb       , b.invc_date       , b.cstm_idcd       , c.cstm_name								")
			.where("          , w.wkct_name       , bp.wkun_dvcd      , a.istt_qntt       , u.unit_name								")
			.where("          , a.istt_pric       , a.istt_amnt       , c2.cstm_name as acpt_cstm_name								")
			.where("          , ba.prod_name      , pr.prod_spec      , json_value(p.json_data , '$**.asmt_dvcd') as asmt_dvcd		")
			.where("          , b.invc_date as crt_date               , null as rnum												")
			.where("     from purc_istt_item a																						")
			.where("     left outer join purc_istt_mast b   on a.invc_numb = b.invc_numb											")
			.where("     left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd											")
			.where("     left outer join product_mast   pr  on a.item_idcd = pr.prod_idcd											")
			.where("     left outer join purc_ordr_item p   on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb											")
			.where("     left outer join boxx_acpt      ba  on p.orig_invc_numb = ba.invc_numb										")
			.where("     left outer join boxx_acpt_bom  bm  on p.orig_invc_numb = bm.invc_numb and p.orig_seqn = bm.line_seqn		")
			.where("     left outer join boxx_acpt_bop  bp  on p.orig_invc_numb = bp.invc_numb and p.orig_seqn = bp.line_seqn		")
			.where("     left outer join unit_mast      u   on bp.qntt_unit_idcd = u.unit_idcd										")
			.where("     left outer join wkct_mast      w   on bp.wkct_idcd = w.wkct_idcd											")
			.where("     left outer join cstm_mast      c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("     where 1=1																									")
			.where("     and   pm.offr_dvcd = '3000'																				")
			.where("     and   b.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   pr.find_name like %:find_name	" , arg.getParamText("find_name"))
			.where("     and   c.cstm_code >= :cstm_code1		" , arg.getParamText("cstm_code1"))
			.where("     and   c.cstm_code <= :cstm_code2		" , arg.getParamText("cstm_code2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.wkct_name															")
			.where("       , a.wkun_dvcd															")
			.where("       , a.istt_qntt															")
			.where("       , a.unit_name															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.asmt_dvcd															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as invc_date														")
					.where("       , a.cstm_idcd															")
					.where("       , concat(a.cstm_name,'계') as cstm_name									")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , a.crt_date																")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date, cstm_idcd													")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '일계' as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , a.crt_date																")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date																")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '월계' as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 4 as rnum																")
					.where(" from cte a																		")
					.where(" group by concat(substr(a.invc_date,1,6),'99')									")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , '합계' as invc_date														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , '99999999' as crt_date													")
					.where("       , 5 as rnum																")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cstm_idcd, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 상품매입일보 조회
	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select a.invc_numb       , b.invc_date       , b.cstm_idcd       , c.cstm_name								")
			.where("          , w.wkct_name       , bp.wkun_dvcd      , a.istt_qntt       , u.unit_name								")
			.where("          , a.istt_pric       , a.istt_amnt       , c2.cstm_name as acpt_cstm_name								")
			.where("          , ba.prod_name      , pr.prod_spec      , json_value(p.json_data , '$**.asmt_dvcd') as asmt_dvcd		")
			.where("          , b.invc_date as crt_date               , null as rnum												")
			.where("     from purc_istt_item a																						")
			.where("     left outer join purc_istt_mast b   on a.invc_numb = b.invc_numb											")
			.where("     left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd											")
			.where("     left outer join product_mast   pr  on a.item_idcd = pr.prod_idcd											")
			.where("     left outer join purc_ordr_item p   on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb											")
			.where("     left outer join boxx_acpt      ba  on p.orig_invc_numb = ba.invc_numb										")
			.where("     left outer join boxx_acpt_bom  bm  on p.orig_invc_numb = bm.invc_numb and p.orig_seqn = bm.line_seqn		")
			.where("     left outer join boxx_acpt_bop  bp  on p.orig_invc_numb = bp.invc_numb and p.orig_seqn = bp.line_seqn		")
			.where("     left outer join unit_mast      u   on bp.qntt_unit_idcd = u.unit_idcd										")
			.where("     left outer join wkct_mast      w   on bp.wkct_idcd = w.wkct_idcd											")
			.where("     left outer join cstm_mast      c2  on ba.cstm_idcd = c2.cstm_idcd											")
			.where("     where 1=1																									")
			.where("     and   ba.acpt_dvcd = '4000'																				")
			.where("     and   b.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   pr.find_name like %:find_name	" , arg.getParamText("find_name"))
			.where("     and   c.cstm_code >= :cstm_code1		" , arg.getParamText("cstm_code1"))
			.where("     and   c.cstm_code <= :cstm_code2		" , arg.getParamText("cstm_code2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.wkct_name															")
			.where("       , a.wkun_dvcd															")
			.where("       , a.istt_qntt															")
			.where("       , a.unit_name															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.prod_spec															")
			.where("       , a.asmt_dvcd															")
			.where("       , a.crt_date																")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as invc_date														")
					.where("       , a.cstm_idcd															")
					.where("       , concat(a.cstm_name,'계') as cstm_name									")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , a.crt_date																")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date, cstm_idcd													")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '일계' as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , a.crt_date																")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date																")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '월계' as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 4 as rnum																")
					.where(" from cte a																		")
					.where(" group by concat(substr(a.invc_date,1,6),'99')									")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , '합계' as invc_date														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_name														")
					.where("       , null as wkct_name														")
					.where("       , null as wkun_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , null as prod_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , '99999999' as crt_date													")
					.where("       , 5 as rnum																")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cstm_idcd, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

	// 부자재매입일보 조회
	public SqlResultMap getSearch4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("with cte as ( 																									")
			.where("     select a.invc_numb       , b.invc_date       , b.cstm_idcd       , c.cstm_name								")
			.where("          , ifnull(i.asmt_name, p.item_name) as asmt_name             , i.asmt_spec								")
			.where("          , json_value(p.json_data , '$**.asmt_dvcd') as asmt_dvcd    , null as rnum							")
			.where("          , a.istt_qntt       , u.unit_name       , a.istt_pric       , a.istt_amnt								")
			.where("          , cm.cstm_name as acpt_cstm_name        , ba.prod_name      , b.invc_date as crt_date					")
			.where("     from purc_istt_item a																						")
			.where("     left outer join purc_istt_mast b   on a.invc_numb = b.invc_numb											")
			.where("     left outer join cstm_mast      c   on b.cstm_idcd = c.cstm_idcd											")
			.where("     left outer join asmt_mast      i   on a.item_idcd = i.asmt_idcd											")
			.where("     left outer join purc_ordr_item p   on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast pm  on p.invc_numb = pm.invc_numb											")
			.where("     left outer join unit_mast      u   on p.unit_idcd = u.unit_idcd											")
			.where("     left outer join boxx_acpt      ba  on p.orig_invc_numb = ba.invc_numb										")
			.where("     left outer join cstm_mast      cm on ba.cstm_idcd = cm.cstm_idcd											")
			.where("     where 1=1																									")
			.where("     and   json_value(pm.json_data , '$**.offr_path_dvcd') = 2													")
			.where("     and   b.invc_date >= :invc_date1		" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2		" , arg.getParamText("invc_date2"))
			.where("     and   ba.find_name like %:find_name	" , arg.getParamText("find_name"))
			.where("     and   c.cstm_code >= :cstm_code1		" , arg.getParamText("cstm_code1"))
			.where("     and   c.cstm_code <= :cstm_code2		" , arg.getParamText("cstm_code2"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.invc_date															")
			.where("       , a.cstm_idcd															")
			.where("       , a.cstm_name															")
			.where("       , a.asmt_name															")
			.where("       , a.asmt_spec															")
			.where("       , a.asmt_dvcd															")
			.where("       , a.istt_qntt															")
			.where("       , a.unit_name															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.acpt_cstm_name														")
			.where("       , a.prod_name															")
			.where("       , a.invc_date as crt_date												")
			.where("       , 1 as rnum																")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as invc_date														")
					.where("       , a.cstm_idcd															")
					.where("       , concat(a.cstm_name,'계') as cstm_name									")
					.where("       , null as asmt_name														")
					.where("       , null as asmt_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 2 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date, cstm_idcd													")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//일계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , a.invc_date															")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '일계' as cstm_name														")
					.where("       , null as asmt_name														")
					.where("       , null as asmt_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , a.invc_date as crt_date												")
					.where("       , 3 as rnum																")
					.where(" from cte a																		")
					.where(" group by crt_date																")
				;
			}
			if(arg.getParamText("chk" ).contains("3")){			//월계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , substr(a.invc_date,1,6) as invc_date									")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , '월계' as cstm_name														")
					.where("       , null as asmt_name														")
					.where("       , null as asmt_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , concat(substr(a.invc_date,1,6),'99') as crt_date						")
					.where("       , 4 as rnum																")
					.where(" from cte a																		")
					.where(" group by concat(substr(a.invc_date,1,6),'99')									")
				;
			}
			if(arg.getParamText("chk" ).contains("4")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , '합계' as invc_date														")
					.where("       , max(a.cstm_idcd) as cstm_idcd											")
					.where("       , null as cstm_name														")
					.where("       , null as asmt_name														")
					.where("       , null as asmt_spec														")
					.where("       , null as asmt_dvcd														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , null as unit_name														")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , null as acpt_cstm_name													")
					.where("       , null as prod_name														")
					.where("       , '99999999' as crt_date													")
					.where("       , 5 as rnum																")
					.where(" from cte a																		")
					.where(" group by '99999999'															")
				;
			}
		data.param
			.where(" ORDER BY crt_date, cstm_idcd, rnum														")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}

}
