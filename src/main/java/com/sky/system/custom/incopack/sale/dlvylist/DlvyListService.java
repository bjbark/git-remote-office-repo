package com.sky.system.custom.incopack.sale.dlvylist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class DlvyListService extends DefaultServiceHandler{
	@Autowired
	private SeqListenerService sequance;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.dlvy_date       , CONCAT(a.dlvy_addr_1fst,' ',a.dlvy_addr_2snd) as dlvy_addr		")
			.where("		, a.rctr_name       , a.tele_numb_1fst as dlvy_tele_numb       , a.dlvy_exps			")
			.where("		, c.cstm_idcd       , c.cstm_name       , a.pric_burd_dvcd     , a.dlvy_hope_date		")
			.where("		, a.dlvy_atcl       , a.dlvy_mthd_dvcd													")
			.where("from   acpt_dlvy a																				")
			.where("left   outer join acpt_item m on a.invc_numb = m.invc_numb										")
			.where("left   outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name" ))
			.where("and    c.cstm_name   = :cstm_name		" , arg.getParamText("cstm_name" ))
			.where("and    a.dlvy_date	>= :dlvy_date		" , arg.getParamText("dlvy_date" ))
			.where("and    a.dlvy_date	<= :dlvy_date		" , arg.getParamText("dlvy_date" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


}
