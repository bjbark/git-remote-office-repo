package com.sky.system.project.certmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.data.SqlRepository;
import com.sky.http.HttpResponseMessage;

@Service
public class CertMastService extends DefaultServiceHandler {


	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		String index = arg.getParamText("search_id").trim();
		String value = arg.getParamText("find_name").trim();

		String[] cert_stat_dvcd = arg.getParamCast("cert_stat_dvcd", String[].class);

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize														")
		;
		data.param // 쿼리문  입력
			.query("select a.hqof_idcd      , a.cert_idcd      , a.cert_code  , a.cert_name 			")
			.query("     , a.user_idcd      , a.cert_cont      , a.issu_date  , a.used_dttm				")
			.query("     , a.cert_pswd      , substring(a.used_dttm,1,8)   as used_date , a.cert_dvcd	")
			.query("     , a.cert_stat_dvcd , a.dsse_yorn												")
			.query("     , a.user_memo      , a.line_stat												")
			.query("     , e.user_name      , d.dept_name												")
		;
		data.param // 쿼리문  입력
			.where("from   cert_mast a																	")
			.where("       left outer join user_mast  e on a.user_idcd = e.user_idcd					")
			.where("       left outer join dept_mast  d on e.dept_idcd = d.dept_idcd					")
			.where("where  1=1																			")
			.where("and    a.hqof_idcd		=     :hqof_idcd		" , arg.getParameter("hqof_idcd" ))
			.where("and    a.cert_stat_dvcd in   (:cert_stat_dvcd )	" , cert_stat_dvcd ,( cert_stat_dvcd.length > 0) ) /* 주문 위치 */
			.where("and    a.cert_idcd		=     :cert_idcd		" , value , index.equals("1" ))
			.where("and    a.cert_name		like %:cert_name%		" , value , index.equals("2" ))
			.where("and    a.line_stat < 2																")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("line_stat" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("cert_mast								")
				.where("where hqof_idcd  = :hqof_idcd			")
				.where("and   cert_idcd  = :cert_idcd			")
				//
				.unique("hqof_idcd"			, row.fixParameter("hqof_idcd"       ))
				.unique("cert_idcd"			, row.fixParameter("cert_idcd"       ))
				.insert("cert_code"			, row.getParameter("cert_code"       ))
				.update("cert_pswd"			, row.getParameter("cert_pswd"       ))
				.update("issu_date"			, row.getParameter("issu_date"       ))
				.update("user_idcd"			, row.getParameter("user_idcd"       ))

				.update("cert_name"			, row.getParameter("cert_name"       ))
				.update("cert_dvcd"			, row.getParameter("cert_dvcd"       ))
				.update("dsse_yorn"			, row.getParameter("dsse_yorn"       ))

				.update("cert_stat_dvcd"	, row.getParameter("cert_stat_dvcd"  ))

				.update("user_memo"			, row.getParameter("user_memo"       ))

				.update("line_stat"			, row.getParameter("line_stat"       ))
				.insert("updt_urif"			, row.getParameter("updt_urif"       ))
				.update("updt_idcd"			, row.getParameter("updt_idcd"       ))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"       ))
				.update("updt_ipad"			, arg.remoteAddress  )
				.insert("crte_ipad"			, arg.remoteAddress  )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(rowaction);
		}
		data.execute();
		return null ;
	}


}

