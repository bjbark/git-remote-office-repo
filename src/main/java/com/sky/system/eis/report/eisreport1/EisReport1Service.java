package com.sky.system.eis.report.eisreport1;

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
public class EisReport1Service extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("  select                                                                                                                                                                     ")
			.query("        line_numb                                                                                                                                                            ")
			.query("        ,dvcd                                                                                                                                                                ")
			.query("        ,yyyymm                                                                                                                                                              ")
			.query("        ,acpt_numb                                                                                                                                                           ")
			.query("        ,item_clss                                                                                                                                                           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(invc_date,1,4), '-', substring(invc_date,5,2), '-',substring(invc_date,7,2)) else invc_date end as invc_date         ")
			.query("        ,cstm_name                                                                                                                                                           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(strt_date,1,4), '-',substring(strt_date,5,2),'-',substring(strt_date,7,2)) else strt_date end as strt_date           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(endd_date,1,4), '-',substring(endd_date,5,2),'-',substring(endd_date,7,2)) else endd_date end as endd_date           ")
			.query("        ,lead_time                                                                                                                                                           ")
			.query("  from sheet_lead_time                                                                                                                                                       ")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
//			return data.selectForMap(page, rows, (page==1),sort);
			return data.selectForMap();
		}
	}

	/**
	 */
	public SqlResultMap getSearch2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("  select                                                                                                                                                                     ")
			.query("        yyyymm                                                                                                                                                               ")
			.query("        ,item_clss                                                                                                                                                           ")
			.query("        ,cstm_idcd                                                                                                                                                           ")
			.query("        ,cstm_name                                                                                                                                                           ")
			.query("        ,acpt_numb                                                                                                                                                           ")
			.query("        ,case when acpt_numb is not null then  concat(substring(invc_date,1,4), '-', substring(invc_date,5,2), '-',substring(invc_date,7,2)) else invc_date end as invc_date ")
			.query("        ,case when acpt_numb is not null then                                                                                                                                ")
			.query("                   concat(substring(org_deli_date,1,4), '-', substring(org_deli_date,5,2), '-',substring(org_deli_date,7,2)) else org_deli_date end as org_deli_date         ")
			.query("        ,case when acpt_numb is not null then  concat(substring(deli_date,1,4), '-', substring(deli_date,5,2), '-',substring(deli_date,7,2)) else deli_date end as deli_date ")
			.query("  from sheet_deli_date                                                                                                                                                       ")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
//			return data.selectForMap(page, rows, (page==1),sort);
			return data.selectForMap();
		}
	}
	/**
	 */
	public SqlResultMap getSearch3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("  select                                                                                                                                                                     ")
			.query("        line_numb                                                                                                                                                            ")
			.query("        ,dvcd                                                                                                                                                                ")
			.query("        ,yyyymm                                                                                                                                                              ")
			.query("        ,acpt_numb                                                                                                                                                           ")
			.query("        ,cstm_idcd                                                                                                                                                           ")
			.query("        ,cstm_name                                                                                                                                                           ")
			.query("        ,item_clss                                                                                                                                                           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(onvc_date,1,4), '-', substring(onvc_date,5,2), '-',substring(onvc_date,7,2)) else onvc_date end as invc_date         ")
			.query("        ,invc_qntt                                                                                                                                                           ")
			.query("        ,poor_cont                                                                                                                                                           ")
//			.query("        ,case when dvcd = 'data' then  concat(substring(strt_date,1,4), '-',substring(strt_date,5,2),'-',substring(strt_date,7,2)) else strt_date end as strt_date           ")
//			.query("        ,case when dvcd = 'data' then  concat(substring(endd_date,1,4), '-',substring(endd_date,5,2),'-',substring(endd_date,7,2)) else endd_date end as endd_date           ")
			.query("        ,strt_date           ")
			.query("        ,endd_date           ")
			.query("  from sheet_poor                                                                                                                                                            ")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
//			return data.selectForMap(page, rows, (page==1),sort);
			return data.selectForMap();
		}
	}
	/**
	 */
	public SqlResultMap getSearch4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("  select                                                                                                                                                                     ")
			.query("        line_seqn                                                                                                                                                            ")
			.query("        ,dvcd                                                                                                                                                                ")
			.query("        ,yyyymm                                                                                                                                                              ")
			.query("        ,item_clss                                                                                                                                                           ")
			.query("        ,acpt_numb                                                                                                                                                           ")
			.query("        ,cstm_idcd                                                                                                                                                           ")
			.query("        ,cstm_name                                                                                                                                                           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(invc_date,1,4), '-', substring(invc_date,5,2), '-',substring(invc_date,7,2)) else invc_date end as invc_date         ")
			.query("        ,f9                                                                                                                                                                  ")
			.query("        ,case when dvcd = 'data' then  concat(substring(deli_date,1,4), '-',substring(deli_date,5,2),'-',substring(deli_date,7,2)) else deli_date end as deli_date           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(strt_date,1,4), '-',substring(strt_date,5,2),'-',substring(strt_date,7,2)) else strt_date end as strt_date           ")
			.query("        ,case when dvcd = 'data' then  concat(substring(endd_date,1,4), '-',substring(endd_date,5,2),'-',substring(endd_date,7,2)) else endd_date end as endd_date           ")
			.query("        ,mh                                                                                                                                                                  ")
			.query("  from sheet_mh                                                                                                                                                              ")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
//			return data.selectForMap(page, rows, (page==1),sort);
			return data.selectForMap();
		}
	}
}
