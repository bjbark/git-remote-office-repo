package com.sky.system.prod.order.prodinput;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class ProdInputService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		System.out.println("getMaster");
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.invc_numb        , a.invc_date        , a.bzpl_idcd        , a.prod_dept_idcd	")
			.query("       , a.wkfw_idcd        , a.wkct_idcd        , a.item_idcd        , a.pdsd_numb			")
			.query("       , a.wkod_numb        , a.wkod_seqn        , a.prod_dept_idcd   , a.indn_qntt			")
			.query("       , a.prod_qntt        , a.good_qntt        , a.poor_qntt        , a.work_strt_dttm	")
			.query("       , a.work_endd_dttm   , a.need_time        , a.work_pcnt        , a.lott_numb			")
			.query("       , a.rewd_objt_qntt   , a.work_cond_1fst   , a.work_cond_2snd   , a.work_cond_3trd	")
			.query("       , a.work_cond_5fit   , a.work_cond_6six   , a.stun_prod_qntt							")
			.query("       , a.stun_good_qntt   , a.stun_poor_qntt   , a.work_dvcd        , a.wkct_insp_yorn	")
			.query("       , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn							")
			.query("       , b.cstm_idcd        , c.cstm_name        , i.item_name        , i.item_spec			")
			.query("       , (a.indn_qntt-a.prod_qntt) as summ_qntt  , d.trst_qntt        , e.ttsm_amnt			")
		;
		data.param //퀴리문
			.where("from	work_book a																			")
			.where("left outer join pror_item b on a.invc_numb = b.invc_numb									")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("left outer join spts_item d on a.invc_numb = d.invc_numb									")
			.where("left outer join sale_mast e on a.invc_numb = e.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("where 1=1																					")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		System.out.println("*****************************************");
		System.out.println(arg.getParameter("item_idcd"));

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
			.query("       , d.trst_qntt       , e.ttsm_amnt												")
			.query("       , (c.indn_qntt-c.prod_qntt) as summ_qntt , i.item_name       , i.item_spec		")
		;
		data.param //퀴리문
			.where("from   pror_item a																		")
			.where("left outer join cstm_mast b on a.cstm_idcd = b.cstm_idcd								")
			.where("left outer join work_book c on a.invc_numb = c.invc_numb								")
			.where("left outer join spts_item d on a.invc_numb = d.invc_numb								")
			.where("left outer join sale_mast e on a.invc_numb = e.invc_numb								")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd								")
			.where("where 1=1																				")
			.where("and (c.indn_qntt-c.prod_qntt) != 0														")
			.where("and b.cstm_name  = :cstm_name", arg.getParameter("cstm_name"))
			.where("and i.item_name  = :item_name", arg.getParameter("item_name"))

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
