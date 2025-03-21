package com.sky.system.custom.komec.stock.isos.prodnotwork;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service("komec.ProdNotWorkService")
public class ProdNotWorkService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select     a.pdod_date              , c.cstm_name              									")
			.where("         , sum(w.prod_qntt) as prod , sum(w.indn_qntt) as indn , w.poor_qntt  as poor			")
			.where("         , b.lott_numb              , i.item_name              , i.item_code					")
			.where("         , i.item_spec	            , u.unit_name              , w.wkod_numb as invc_numb		")
			.where("from    pror_mast a																				")
			.where("        left outer join pror_item b on a.invc_numb = b.invc_numb								")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.where("        left outer join work_book w on b.invc_numb = w.wkod_numb and b.line_seqn = w.wkod_seqn	")
			.where("        left outer join item_mast i on b.item_idcd = i.item_idcd								")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_idcd								")
			.where("where   1=1																						")
			.where("and     a.pdod_date  between :fr_dt          " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt          " , arg.getParamText("to_dt") )
			.where("        group by b.invc_numb,b.line_seqn														")
			.where("        having poor - prod <> indn																")
			.where(") a																								")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select     a.pdod_date              , c.cstm_name              , q.line_seqn					")
			.where("         , sum(w.prod_qntt) as prod , sum(w.indn_qntt) as indn , q.poor_qntt  as poor			")
			.where("         , b.lott_numb              , i.item_name              , i.item_code					")
			.where("         , i.item_spec	            , u.unit_name              , w.wkod_numb as invc_numb		")
			.where("from    pror_mast a																				")
			.where("        left outer join pror_item b on a.invc_numb = b.invc_numb								")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.where("        left outer join work_book w on b.invc_numb = w.wkod_numb and b.line_seqn = w.wkod_seqn	")
			.where("        left outer join item_mast i on b.item_idcd = i.item_idcd								")
			.where("        left outer join unit_mast u on i.unit_idcd = u.unit_idcd								")
			.where("        left outer join work_book_qc q on w.wkod_numb = q.invc_numb 							")
			.where("where   1=1																						")
			.where("and     a.pdod_date  between :fr_dt          " , arg.getParamText("fr_dt") )
			.where("                     and     :to_dt          " , arg.getParamText("to_dt") )
			.where("and q.poor_qntt < w.prod_qntt																	")
			.where("        group by b.invc_numb,b.line_seqn														")
			.where(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setPoor(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String invc_date	= arg.getParamText("invc_date");
		String qntt			= arg.getParamText("qntt");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call poor_work_book_qc (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :qntt "       , qntt			)  // a
			.query(" , :invc_date "  , invc_date	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}

	public SqlResultMap setdeletePoor(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String line_seqn	= arg.getParamText("line_seqn");
		String JOB_DVCD			= "불량폐기";
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.query("call auto_isos_booking (		")
			.query("   :invc_numb "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_seqn "  , line_seqn	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
			.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}
}
