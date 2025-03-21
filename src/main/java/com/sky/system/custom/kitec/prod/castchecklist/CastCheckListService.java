package com.sky.system.custom.kitec.prod.castchecklist;

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
@Service("kitec.CastCheckListService")
public class CastCheckListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.cvic_idcd         , a.cvic_code        , a.cvic_name         , a.cvic_spec		")
			.where("        , a.modl_name         , a.cvic_stat_dvcd   , a.cvic_kind_dvcd    , a.wkct_idcd		")
			.where("        , c.wkct_name																		")
			.where("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.where("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.where("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.where("from    cvic_mast a																			")
			.where("left outer join wkct_mast c on a.wkct_idcd = c.wkct_idcd									")
			.where("where   1=1																					")
			.where("and     a.line_stat < 2																		")
			.where("and     a.wkct_idcd = 'WT003'																")
			.where("order by a.cvic_code ) a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSearchDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("       a.invc_date         , a.wkct_idcd        , a.cvic_idcd         , a.cond_dvcd		")
			.where("     , a.line_seqn         , a.cond_name        , a.stup_veri         , a.unit_name		")
			.where("     , a.frst_msmt         , a.send_msmt        , a.thrd_msmt							")
			.where("     , w.wkct_name         , c.cvic_name												")
			.where("     , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.where("     , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.where("     , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.where("from   work_book_cast a																	")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd								")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd								")
			.where("where  1=1																				")
			.where("and    a.invc_date = :invc_date" , arg.getParameter("invc_date"))
			.where("and    a.cvic_idcd = :cvic_idcd" , arg.getParameter("cvic_idcd"))
			.where("and    a.line_stat = :line_stat" , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc, a.line_seqn limit 99999 ) a									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
