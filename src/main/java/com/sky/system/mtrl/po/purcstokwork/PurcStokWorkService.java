package com.sky.system.mtrl.po.purcstokwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.PurcStokWorkService")
public class PurcStokWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getLister(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.item_code		, a.item_name		, a.item_spec		, a.item_idcd				")
			.query("	 , d.unit_name																			")
			.query("	 , a.safe_stok		, b.stok_qntt		, c.offr_qntt									")
			.query("	 , CASE WHEN c.offr_qntt is not null													")
			.query("			THEN IFNULL(c.dlvy_qntt, 0)														")
			.query("			ELSE c.dlvy_qntt																")
			.query("		END	as dlvy_qntt																	")
			.query("	 , CASE WHEN c.offr_qntt is not null													")
			.query("			THEN (c.offr_qntt - IFNULL(c.dlvy_qntt, 0)) 									")
			.query("			ELSE NULL																		")
			.query("		END as offr_rmin_qntt																")
			.query("	 , CASE WHEN ((IFNULL(b.stok_qntt, 0) + (IFNULL(c.offr_qntt, 0) - IFNULL(c.dlvy_qntt, 0 ))) - a.safe_stok) < 0")
			.query("			THEN ((IFNULL(b.stok_qntt, 0) + (IFNULL(c.offr_qntt, 0) - IFNULL(c.dlvy_qntt, 0 ))) - a.safe_stok)")
			.query("			ELSE NULL																		")
			.query("		END as lack_offr_qntt																")
			.query("	 , a.find_name																			")
		;
		data.param
			.where("from item_mast a																		")
			.where("left outer join stok_mast b on b.item_idcd = a.item_idcd								")
			.where("left outer join purc_ordr_item c on c.item_idcd = a.item_idcd							")
			.where("left outer join unit_mast d on d.unit_idcd = a.unit_idcd								")
			.where("where 1=1																				")
			.where("and a.find_name like %:find_name%	" , arg.getParameter("find_name"))
			.where("and a.item_idcd = :item_idcd		" , arg.getParameter("item_idcd"))
			.where("and a.line_stat < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.item_code")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			}else{
				if(i == 0){
					//등록
					data.param
						.table ("purc_trst_mast")
						.where ("where invc_numb = :invc_numb")

						.unique("invc_numb"        , row.fixParameter("new_invc_numb"))	//INVOICE번호

						.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"))		//사업장ID
						.update("drtr_idcd"        , row.getParameter("drtr_idcd"))		//사업장ID
						.update("invc_date"        , row.getParameter("invc_date"))		//발주일자

					;
					data.attach(Action.insert);
					data.execute();
					data.clear();

					data.param
						.table ("purc_trst_item")
						.where ("where invc_numb = :invc_numb")
						.where ("and   line_seqn = :line_seqn")

						.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
						.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

						.update("item_idcd"        , row.getParameter("item_idcd"))		//품목ID
						.update("item_name"        , row.getParameter("item_name"))		//품명
						.update("item_spec"        , row.getParameter("item_spec"))		//규격
						.update("reqt_qntt"        , row.getParameter("rqst_offr_qntt"))//발주필요수량

					;
					data.attach(Action.insert);
					data.execute();
					data.clear();

					i =+ 1;

				}else{
					data.param
					.table ("purc_trst_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("item_idcd"        , row.getParameter("item_idcd"))			//품목ID
					.update("item_name"        , row.getParameter("item_name"))			//거래처ID
					.update("item_spec"        , row.getParameter("item_spec"))			//발주수량
					.update("reqt_qntt"        , row.getParameter("offr_qntt"))		//발주단가

				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
				}
			}
		}
		return null;
	}

		public SqlResultMap getInvc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
			DataMessage data	= arg.newStorage("POS");
			String STOR			= arg.getParamText("stor_id");
			String table		= arg.getParamText("table_nm");
			String invc_numb	= arg.getParamText("invc_numb");

			if (invc_numb.length() == 0) {
				invc_numb = "not defined" ;
			}

			data.param
				.query("call fn_seq_gen_v2 (			")
				.query("   :STOR      "  , STOR			)
				.query(" , :table     "  , table		)
				.query(" , :invc_numb "  , invc_numb	)
				.query(" )								")
			;
			return data.selectForMap();
		}

	}


