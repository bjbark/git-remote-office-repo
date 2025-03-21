package com.sky.system.custom.hjsys.eis.eisreport;

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



@Service("hjsys.EisReprotService")
public class EisReportService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    ntce_dvcd, emgc_yorn, CONVERT(ntce_cont USING utf8) as ntce_cont					")
		;
		data.param //퀴리문
			.where("from ntce_mast																				")
			.where("where 1=1																					")
			.where("and   date_format(ntce_eddt,'%Y%m') >= date_format(now(),'%Y%m') 							")
			.where("and   line_stat < 2																			")
			.where("order by emgc_yorn desc , invc_numb															")
		;

		return data.selectForMap();
	}
	public SqlResultMap getSearchDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call order_monthly_total(")
			.query(")")
		;


		return data.selectForMap();
	}
}
