package com.sky.system.prod.cvic.cvicanal;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class CvicAnalService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.cvic_type         , a.make_natn_bacd	")
			.query("        , a.make_cmpy_name    , a.prod_abty													")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb													")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd																		")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.query("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.query("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.query("where	1=1																					")
			.query("and     a.mntr_yorn = '1'																	")
			.query("and		a.find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.query("and     a.cvic_kind_dvcd =:cvic_kind_dvcd"  , arg.getParamText("cvic_kind_dvcd"))
			.query("and     a.cvic_stat_dvcd =:cvic_stat_dvcd"  , arg.getParamText("cvic_stat_dvcd"))
			.query("and     a.mngt_dept_idcd =:mngt_dept_idcd"  , arg.getParamText("mngt_dept_idcd"))
			.query("and     a.puch_cstm_idcd =:puch_cstm_idcd"  , arg.getParamText("puch_cstm_idcd"))
			.query("and     a.wkct_idcd =:wkct_idcd"            , arg.getParamText("wkct_idcd"))
			.query("and		a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by a.cvic_code ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.*,c.clss_name																				")
		;
		data.param
			.query("from    cvic_mast a																			")
			.query("left outer join clss_mast c on a.lcls_idcd = c.clss_idcd									")
			.query("where	1=1																					")
			.query("and		a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.lcls_idcd																		")
			.query("order by a.cvic_code ) a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getChart1(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("with cte as (")
			.query("    select a.* from(																")
			.query("       SELECT a.cvic_idcd, c.cvic_name,a.invc_date									")
			.query("            , ROUND(SUM(TIME_TO_SEC(												")
			.query("                          TIMEDIFF(													")
			.query("                              	time_format(a.endd_dttm,'%H:%i:%s')					")
			.query("                              , time_format(a.strt_dttm,'%H:%i:%s')					")
			.query("                          )															")
			.query("              ))/3600,1) AS runn_time												")
			.query("       from    work_book_cvic a														")
			.query("       left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd						")
			.query("       where	1=1																	")
			.query("       and     a.cvic_stat_dvcd in ('3')")
			.query("       and     a.invc_date >= :fr_dt1 ", arg.getParameter("fr_dt"))
			.query("       and     a.invc_date <= :to_dt1 ", arg.getParameter("to_dt"))
			.query("       group by case when :chk = 1 then a.cvic_idcd", arg.getParameter("chk"))
			.query("       else a.invc_date																")
			.query("       end																			")
			.query("    ) a																				")
			.query("    union all																		")
			.query("    select l.* from																	")
			.query("    ( select  '' as cvic_idcd , 'No Data' as cvic_name								")
			.query("             ,'No Data' as invc_date,0 as runn_time									")
			.query("      from work_book_cvic															")
			.query("      where 0 = (select count(*) from work_book_cvic  								")
			.query("                 where  1=1															")
			.query("                 and    cvic_stat_dvcd in ('3')										")
			.query("                 and    invc_date >= :fr_dt2 ", arg.getParameter("fr_dt"))
			.query("                 and    invc_date <= :to_dt2 ", arg.getParameter("to_dt"))
			.query("                 )																	")
			.query("      limit 1																		")
			.query("    ) l																				")
			.query(")														 							")
			.query("select * from cte																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getChart2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		System.out.println(arg.toString());

		data.param
			.query("with cte as (")
			.query("    select a.* from(																")
			.query("       SELECT a.cvic_idcd, c.cvic_name,a.invc_date									")
			.query("            , ROUND(SUM(TIME_TO_SEC(												")
			.query("                          TIMEDIFF(													")
			.query("                              	time_format(a.endd_dttm,'%H:%i:%s')					")
			.query("                              , time_format(a.strt_dttm,'%H:%i:%s')					")
			.query("                          )															")
			.query("              ))/3600,1) AS runn_time												")
			.query("       from    work_book_cvic a														")
			.query("       left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd						")
			.query("       where	1=1																	")
			.query("       and     a.cvic_stat_dvcd not in ('3')")
			.query("       and     a.invc_date >= :fr_dt1 ", arg.getParameter("fr_dt"))
			.query("       and     a.invc_date <= :to_dt1 ", arg.getParameter("to_dt"))
			.query("       group by case when :chk = 1 then a.cvic_idcd", arg.getParameter("chk"))
			.query("       else a.invc_date																")
			.query("       end																			")
			.query("    ) a																				")
			.query("    union all																		")
			.query("    select l.* from																	")
			.query("    ( select  '' as cvic_idcd , 'No Data' as cvic_name								")
			.query("             ,'No Data' as invc_date,0 as runn_time									")
			.query("      from work_book_cvic															")
			.query("      where 0 = (select count(*) from work_book_cvic  								")
			.query("                 where  1=1															")
			.query("                 and    cvic_stat_dvcd not in ('3')									")
			.query("                 and    invc_date >= :fr_dt2 ", arg.getParameter("fr_dt"))
			.query("                 and    invc_date <= :to_dt2 ", arg.getParameter("to_dt"))
			.query("                 )																	")
			.query("      limit 1																		")
			.query("    ) l																				")
			.query(")														 							")
			.query("select * from cte																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getChart3(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		System.out.println(arg.toString());

		data.param
			.query("with cte as (")
			.query("    select a.* from(																")
			.query("       select  a.invc_numb     , a.invc_date      , a.sttm							")
			.query("             , a.edtm          , sum(a.loss_time)   as loss_time					")
			.query("             , b.cvic_idcd     ,c.cvic_name       , bs.base_name as loss_resn_name	")
			.query("       from work_book_loss a 														")
			.query("       left outer join work_book b on a.invc_numb = b.invc_numb						")
			.query("       left outer join cvic_mast c on b.cvic_idcd = c.cvic_idcd						")
			.query("       left outer join ( select * from base_mast where prnt_idcd = '6100')  bs 		")
			.query("                    on   bs.base_code = a.loss_resn_dvcd 							")
			.query("       where	1=1																	")
			.query("       and     a.loss_resn_dvcd = 1													")
			.query("       and     a.invc_date >= :fr_dt1 ", arg.getParameter("fr_dt"))
			.query("       and     a.invc_date <= :to_dt1 ", arg.getParameter("to_dt"))
			.query("       group by loss_resn_dvcd														")
			.query("    ) a																				")
			.query("    union all																		")
			.query("    select l.* from																	")
			.query("    ( select  '' as invc_numb , 'No Data' as invc_date								")
			.query("            , '' as sttm      , '' as edtm             , 0  as loss_time			")
			.query("            , '' as cvic_idcd , 'No Data' as cvic_name , 'No Data' as loss_resn_name")
			.query("      from work_book_loss a															")
			.query("      where 0 = ( select count(*) from work_book_loss  								")
			.query("                  where  1=1														")
			.query("                  and    loss_resn_dvcd = 1											")
			.query("                  and    invc_date >= :fr_dt2 ", arg.getParameter("fr_dt"))
			.query("                  and    invc_date <= :to_dt2 ", arg.getParameter("to_dt"))
			.query("                 )																	")
			.query("      limit 1																		")
			.query("    ) l																				")
			.query(")														 							")
			.query("select * from cte																	")
		;
		return data.selectForMap();
	}
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.query("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.query("        , a.istl_loct         , a.move_drtr_name   , a.mngt_drtr_idcd    , a.mngt_dept_idcd	")
			.query("        , a.aset_idcd         , a.aset_name        , a.puch_cstm_idcd    , a.puch_cstm_name	")
			.query("        , a.vend_tele_numb    , a.afsv_tele_numb   , a.mchn_numb         , a.puch_date		")
			.query("        , a.cvic_usge         , a.puch_amnt        , a.cvic_type         , a.make_natn_bacd	")
			.query("        , a.cvic_type         , a.make_cmpy_name   , a.prod_abty							")
			.query("        , a.cvic_imge_1fst    , a.cvic_imge_2snd   , a.cstm_idcd         , a.cstm_burd_rate	")
			.query("        , a.norm_ivst_date    , a.succ_date        , a.succ_cstm_idcd    , a.chek_ccle_dvcd	")
			.query("        , a.rnmt_dvcd         , a.sral_numb													")
			.query("        , b.dept_name         , c.wkct_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd																		")
		;
		data.param
			.where("from    cvic_mast a																			")
			.where("left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd								")
			.where("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.where("left outer join cstm_mast d on a.puch_cstm_idcd = d. cstm_idcd								")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%  "	, arg.getParamText("find_name"))
			.where("and     a.cvic_kind_dvcd =:cvic_kind_dvcd"  , arg.getParamText("cvic_kind_dvcd"))
			.where("and     a.cvic_stat_dvcd =:cvic_stat_dvcd"  , arg.getParamText("cvic_stat_dvcd"))
			.where("and     a.mngt_dept_idcd =:mngt_dept_idcd"  , arg.getParamText("mngt_dept_idcd"))
			.where("and     a.puch_cstm_idcd =:puch_cstm_idcd"  , arg.getParamText("puch_cstm_idcd"))
			.where("and     a.wkct_idcd =:wkct_idcd"            , arg.getParamText("wkct_idcd"))
			.where("and		a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.cvic_code																		")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
}