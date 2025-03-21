package com.sky.system.prod.cvic.cviclist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class CvicList2Service extends DefaultServiceHandler {

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
	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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
	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
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