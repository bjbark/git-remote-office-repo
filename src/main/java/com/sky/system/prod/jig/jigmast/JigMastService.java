package com.sky.system.prod.jig.jigmast;

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
public class JigMastService extends DefaultServiceHandler {

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
			.query("select    a.jigg_idcd    , a.jigg_code      , a.jigg_name      , a.jigg_spec      , a.jigg_stat_dvcd	")
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

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("jigg_mast												")
					.where("where jigg_idcd  = :jigg_idcd							")

					.unique("jigg_idcd"			, row.fixParameter("jigg_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;data.attach(Action.update);
			} else {
				data.param
					.table("jigg_mast												")
					.where("where jigg_idcd  = :jigg_idcd							")

					.unique("jigg_idcd"			, row.fixParameter("jigg_idcd"		))
					.unique("jigg_code"			, row.fixParameter("jigg_code"		))

					.update("jigg_name"			, row.getParameter("jigg_name"		))		//지그명
					.update("jigg_spec"			, row.getParameter("jigg_spec"		))		//지그규격
					.update("jigg_stat_dvcd"	, row.getParameter("jigg_stat_dvcd"	))		//지그상태
					.update("jigg_kind_dvcd"	, row.getParameter("jigg_kind_dvcd"	))		//지그종류
					.update("mngt_dept_idcd"	, row.getParameter("mngt_dept_idcd"	))		//관리부서
					.update("aset_idcd"			, row.getParameter("aset_idcd"		))		//자산ID
					.update("puch_cstm_idcd"	, row.getParameter("puch_cstm_idcd"	))		//구매거래처ID
					.update("puch_cstm_name"	, row.getParameter("puch_cstm_name"	))		//구매거래처명
					.update("vend_tele_numb"	, row.getParameter("vend_tele_numb"	))		//구매처전화번호
					.update("afsv_tele_numb"	, row.getParameter("afsv_tele_numb"	))		//AS전화번호
					.update("sral_numb_strt"	, row.getParameter("sral_numb_strt"	))		//시리얼시작
					.update("sral_numb_endd"	, row.getParameter("sral_numb_endd"	))		//시리얼종료
					.update("jigg_qntt"			, row.getParameter("jigg_qntt"		))		//수량
					.update("puch_date"			, row.getParameter("puch_date"		))		//구매일자
					.update("norm_ivst_date"	, row.getParameter("norm_ivst_date"	))		//양산투입일자
					.update("jigg_usge"			, row.getParameter("jigg_usge"		))		//지그용도
					.update("puch_amnt"			, row.getParameter("puch_amnt"		))		//구매금액
					.update("chek_ccle_dvcd"	, row.getParameter("chek_ccle_dvcd"	))		//점검주기
					.update("cvic_type_dvcd"	, row.getParameter("cvic_type_dvcd"	))		//설비형식
					.update("cvic_abty"			, row.getParameter("cvic_abty"		))		//설비능력
					.update("line_stat"			, row.getParameter("line_stat"		))

					.update("find_name"			, row.getParameter("jigg_name"		)
												+ "	"
												+ row.fixParameter("jigg_code"		))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}