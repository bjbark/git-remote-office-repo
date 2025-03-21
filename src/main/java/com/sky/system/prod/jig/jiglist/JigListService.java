package com.sky.system.prod.jig.jiglist;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class JigListService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.query("from (																									")
			.query("select   a.jigg_idcd    , a.jigg_code      , a.jigg_name      , a.jigg_spec      , a.jigg_stat_dvcd	")
			.query("		, a.jigg_kind_dvcd , a.wkct_idcd      , a.mngt_drtr_idcd , a.mngt_dept_idcd , a.aset_idcd		")
			.query("		, a.aset_name      , a.puch_cstm_idcd , a.puch_cstm_name , a.vend_tele_numb , a.afsv_tele_numb	")
			.query("		, a.sral_numb_strt , a.sral_numb_endd , a.jigg_qntt      , a.puch_date      , a.norm_ivst_date	")
			.query("		, a.jigg_usge      , a.puch_amnt      , a.dsse_date      , a.dsse_resn      , a.imge_1fst		")
			.query("		, a.imge_2snd      , a.chek_ccle_dvcd , a.cvic_type_dvcd , a.cvic_abty							")
			.query("		, b.dept_name      , c.cstm_code																")
			.query("		, a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr		")
			.query("		, a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name , a.updt_ipad		")
			.query("		, a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.query("		, a.crte_dttm      , a.crte_idcd      , a.crte_urif												")
		;
		data.param
			.query("from    jigg_mast a																		")
			.query("		left outer join dept_mast b on a.mngt_dept_idcd = b.dept_idcd					")
			.query("		left outer join cstm_mast c on a.puch_cstm_idcd = c. cstm_idcd					")
			.query("where	1=1																				")
			.query("and		a.find_name			like %:find_name%  "		, arg.getParamText("find_name"))
			.query("and		a.jigg_name			like %:jigg_name%  "		, arg.getParamText("jigg_name"))
			.query("and		a.jigg_kind_dvcd	like %:jigg_kind_dvcd%  "	, arg.getParamText("jigg_kind_dvcd"))
			.query("and		a.jigg_stat_dvcd	like %:jigg_stat_dvcd%  "	, arg.getParamText("jigg_stat_dvcd"))
			.query("and		b.dept_name			like %:dept_name%  "		, arg.getParamText("dept_name"))
			.query("and		a.puch_cstm_name	like %:puch_cstm_name%  "	, arg.getParamText("puch_cstm_name"))
			.query("and		a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.query("order by a.jigg_code ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}