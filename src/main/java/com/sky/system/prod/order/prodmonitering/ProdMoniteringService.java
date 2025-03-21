package com.sky.system.prod.order.prodmonitering;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ProdMoniteringService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		System.out.println("getMaster");
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call ejac_cvic_monitering()	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.invc_numb       , a.line_seqn        , a.bzpl_idcd       , a.wkfw_idcd		")
			.query("       , a.wkct_idcd       , a.wkct_item_idcd   , a.prod_dept_idcd  , a.orig_invc_numb	")
			.query("       , a.cstm_idcd       , a.item_idcd        , a.bomt_degr       , a.unit_idcd		")
			.query("       , a.work_strt_dttm  , a.work_endd_dttm   , a.work_dvcd							")
			.query("       , a.insp_wkct_yorn  , a.last_wkct_yorn   , a.cofm_yorn       , a.remk_text		")
			.query("       , b.cstm_name       , c.indn_qntt        , c.prod_qntt							")
			.query("       ,(c.indn_qntt-c.prod_qntt) as summ_qntt , i.item_name       , i.item_spec		")
		;
		data.param //퀴리문
			.where("from   pror_item a																		")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd								")
			.where("left outer join work_book c on a.invc_numb = c.invc_numb								")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("where 1=1																				")
			.where("and (c.indn_qntt-c.prod_qntt) != 0														")
			.where("and b.cstm_name  = :cstm_name", arg.getParameter("cstm_name"))
			.where("and i.item_name  = :item_name", arg.getParameter("item_name"))
			.where("group by i.item_name , b.cstm_name , i.item_spec										")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
