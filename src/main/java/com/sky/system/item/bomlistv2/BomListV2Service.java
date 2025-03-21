package com.sky.system.item.bomlistv2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class BomListV2Service extends DefaultServiceHandler{


	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select a.item_idcd as prnt_item_idcd    , a.item_code         , a.item_name     , a.item_spec	")
			.where("from   item_mast a																				")
			.where("where  1=1																						")
			.where("and    a.acct_bacd = '3000'																		")
			.where("and   (select count(prnt_item_idcd) from bom_mast r where r.prnt_item_idcd = a.item_idcd) !=0	")
			.where("and    a.find_name like %:find_name%   " , arg.getParamText("find_name"))
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.item_code																			")
			.where(")a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("with recursive cte as (																								")
			.query("    select prnt_item_idcd    , bomt_degr    , line_seqn        , item_idcd        , ivst_wkct_idcd    , unit_idcd	")
			.query("         , ndqt_nmrt         , ndqt_dnmn    , lwcs_yorn        , incm_loss_rate   , otcm_loss_rate    , strt_date	")
			.query("         , endd_date         , stok_plac    , stok_unit_idcd   , aset_clss_dvcd 									")
			.query("         , user_memo         , sysm_memo    , prnt_idcd        , 1 as line_levl										")
			.query("         , line_ordr         , line_stat    , line_clos        , find_name        , updt_user_name					")
			.query("         , updt_ipad         , updt_dttm    , updt_idcd        , updt_urif        , crte_user_name					")
			.query("         , crte_ipad         , crte_dttm    , crte_idcd        , crte_urif											")
			.query("    from   bom_mast 																								")
			.query("    where  1=1																										")
			.query("    and    prnt_item_idcd = :item1		"	, arg.getParameter("prnt_item_idcd"))
			.query("    and    prnt_item_idcd not in  (select item_idcd from bom_mast) " , "".equals(arg.getParameter("prnt_item_idcd")))
			.query("	and    bomt_degr = (select max(bomt_degr) from bom_mast where prnt_item_idcd = :item2 )	"	, arg.getParameter("prnt_item_idcd"))

			.query("    union all																										")
			.query("    select a.prnt_item_idcd  , a.bomt_degr  , a.line_seqn      , a.item_idcd      , a.ivst_wkct_idcd  , a.unit_idcd	")
			.query("         , a.ndqt_nmrt       , a.ndqt_dnmn  , a.lwcs_yorn      , a.incm_loss_rate , a.otcm_loss_rate  , a.strt_date	")
			.query("         , a.endd_date       , a.stok_plac  , a.stok_unit_idcd , a.aset_clss_dvcd 									")
			.query("         , a.user_memo       , a.sysm_memo  , a.prnt_idcd      , b.line_levl + 1 as line_levl						")
			.query("         , a.line_ordr       , a.line_stat  , a.line_clos      , a.find_name      , a.updt_user_name				")
			.query("         , a.updt_ipad       , a.updt_dttm  , a.updt_idcd      , a.updt_urif      , a.crte_user_name				")
			.query("         , a.crte_ipad       , a.crte_dttm  , a.crte_idcd      , a.crte_urif										")
			.query("    from   bom_mast a																								")
			.query("    inner join cte b on a.prnt_item_idcd = b.item_idcd 																")
			.query(")																													")
			.query("    select a.prnt_item_idcd  , m.item_name as prnt_item_name  , m.item_spec as prnt_item_spec						")
			.query("         , a.bomt_degr       , a.line_seqn                    , d.item_code as item_code							")
			.query("         , a.item_idcd       , d.item_name as item_name       , d.item_spec as item_spec							")
			.query("         , d.item_imge as item_imge                           , d.item_imge2 as item_imge2							")
			.query("         , a.ivst_wkct_idcd  , a.unit_idcd  , a.ndqt_nmrt     , a.ndqt_dnmn       , a.lwcs_yorn						")
			.query("         , a.incm_loss_rate  , a.otcm_loss_rate																		")
			.query("         , a.strt_date       , a.endd_date  , a.stok_plac     , a.stok_unit_idcd  , a.aset_clss_dvcd				")
			.query("         , a.user_memo       , a.sysm_memo  , a.prnt_idcd     , a.line_levl       , a.line_ordr						")
			.query("         , a.line_stat       , a.line_clos  , a.find_name															")
			.query("         , a.updt_user_name  , a.updt_ipad  , a.updt_dttm     , a.updt_idcd       , a.updt_urif						")
			.query("         , a.crte_user_name  , a.crte_ipad  , a.crte_dttm     , a.crte_idcd       , a.crte_urif						")
			.query("         , w.wkct_name   as  ivst_wkct_name																			")
			.query("         , case when ifnull((select count(*) from bom_mast r 														")
			.query("                             where r.prnt_item_idcd  = a.item_idcd ),0) > 0 then 1 else 0 end as has_chld			")
			.query("    from   cte a																									")
			.query("           left outer join item_mast m on a.prnt_item_idcd = m.item_idcd											")
			.query("           left outer join item_mast d on a.item_idcd      = d.item_idcd											")
			.query("           left outer join wkct_mast w on a.ivst_wkct_idcd = w.wkct_idcd											")

		;
		return data.selectForMap();
	}


}
