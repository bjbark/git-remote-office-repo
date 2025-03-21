package com.sky.system.qc.insp.inspreport2;

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
import com.sky.listener.SeqListenerService;


@Service
public class InspReport2Service  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 * 검사내역 조회
	 */
	public SqlResultMap getLister(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
//		data.param
//			.query("call insp_report_01 (			")
//			.query("   :invc_numb "  , invc_numb	)  // 작업지시번호
//			.query(" , :line_seqn "  , 1			)  // 순번
//			.query(" , :query_dvcd " , "작업지시번호"	)  //
//			.query(" ) 								")
//		;
		data.param
			.query("call insp_report_01_v2 (			")
			.query("   :invc_numb " , invc_numb	)  // 작업지시번호
			.query(" , :insp_date " , arg.fixParameter("insp_date")	)  //
			.query(" ) 								")
		;
		return data.selectForMap();
	}
	//TODO 초중종
	public SqlResultMap getLister2(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
		.query("call insp_report_02 (			")
		.query("   :invc_numb  " , invc_numb	)  // 작업지시번호
		.query(" , :query_dvcd " , "작업지시번호"	)  //
		.query(" , :insp_date  " , arg.getParameter("insp_date")	)  //
		.query(" ) 								")
		;
		return data.selectForMap();
	}
	//TODO 출하검사
	public SqlResultMap getLister3(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}


		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
				.query("select      a.wkct_insp_dvcd      , a.invc_numb        , a.line_seqn        , a.insp_sbsc_seqn	")
				.query("          , a.insp_date           , a.wkod_numb        , a.lott_numb        , a.insp_strt_time	")
				.query("          , a.insp_cond           , a.smli_dvcd        , a.insp_cvic_idcd   , a.insp_mthd_dvcd	")
				.query("          , a.msmt_valu_1fst as x1      , a.msmt_valu_2snd as x2     , a.msmt_valu_3trd  as x3	")
				.query("          , a.msmt_valu_4frt as x4      , a.msmt_valu_5fit as x5     , a.judt_dvcd				")
				.query("          , r.insp_sbsc_name      , cv.cvic_name  												")
			;
			data.param
				.where("from            wkct_insp a								")
				.where("left outer join insp_cond r								")
				.where("             on a.insp_type_idcd = r.insp_type_idcd		")
				.where("             and a.insp_sbsc_seqn = r.line_seqn 		")
				.where("left outer join cvic_mast cv 							")
				.where("             on cv.cvic_idcd = a.insp_cvic_idcd			")
				.where("where 1=1					 							")
				.where("and   a.wkod_numb = :invc_numb",arg.getParameter("invc_numb"))
				.where("and   a.insp_date = :insp_date",arg.getParameter("insp_date") )
				.where("and   wkct_insp_dvcd ='3000'							")
			;
		return data.selectForMap();
	}
}
