package com.sky.system.custom.sjflv.prod.ProdMtrlAmnt;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class ProdMtrlAmntService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getList1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param
			.query("select DATE_FORMAT(a.real_end, '%Y%m%d') as  real_end , i.item_name    , a.batch_no		")
			.query("     , i.item_spec , a.prod_cnt_result                , a.job_order_no					")
		;
		data.param //퀴리문
			.where("from   tbi_job_order_prod_list a														")
			.where("left outer join item_mast i on a.prod_cd = i.item_idcd									")
			.where("where  1 = 1																			")
			.where("and    a.find_name	like %:find_name%" , arg.getParamText("find_name"))
			.where("and    DATE_FORMAT(a.real_end, '%Y%m%d') >= :invc_date1" , arg.getParamText("invc_date1"))
			.where("and    DATE_FORMAT(a.real_end, '%Y%m%d') <= :invc_date2" , arg.getParamText("invc_date2"))
			.where("and    a.prod_cd = :item_idcd",   arg.getParamText("item_idcd"))
			.where("and    a.batch_no like %:lott_numb%  " , arg.getParamText("lott_numb"))
			.where("order by a.real_end desc																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getList2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param
			.query("select a.part_cd       , a.recipe_rate         , a.batch_no        , a.used_amount		")
			.query("    , (ifnull(p.istt_pric,0)*ifnull(a.used_amount,0)) as ostt_amnt , i.item_name		")
		;
		data.param //퀴리문
			.where("from   haccp_ccp_monitoring_mix a														")
			.where("left outer join purc_istt_item p on a.batch_no = p.lott_numb							")
			.where("left outer join item_mast i on a.part_cd = i.item_idcd									")
			.where("where  1 = 1																			")
			.where("and    a.find_name	like %:find_name%" , arg.getParamText("find_name"))
			.where("and    a.job_order_no = :job_order_no",   arg.getParamText("job_order_no"))
			.where("order by a.seqn desc																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
