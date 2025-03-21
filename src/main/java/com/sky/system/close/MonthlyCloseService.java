package com.sky.system.close;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class MonthlyCloseService  extends DefaultServiceHandler {

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.stor_id, stor_nm                                " )
			.query("     , a.itm_month_ym , a.vend_month_ym, a.cust_month_ym  " )
		;
		data.param // 조건
			.where("  from  stor a                      " )
			.where("  where a.stor_grp    =  :stor_grp   " ,  arg.getParameter("stor_grp"))
			.where("  and   a.stor_nm like %:stor_nm%  " , arg.getParameter("stor_nm"))
			.where("  and   a.row_sts = 0              " )
			.where("  order by a.stor_id                " )
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setCloser(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
    	String  close_gb = arg.fixParamText("close_gb");

    	if       ("2072101".equals(close_gb)) { data.param.query("call net_package_closejob.close_itm_month "); // 수불장 월마감
    	}else if ("2072301".equals(close_gb)) { data.param.query("call net_package_closejob.close_cust_month "); // 매출처 월마감
    	}else if ("2072401".equals(close_gb)) { data.param.query("call net_package_closejob.close_vend_month "); // 매입처 월마감
    	}

    	data.param
			.query("     (           ")
			.query("     :trmn_dt   ", arg.fixParamText("trmn_dt"))
			.query("    ,:stor_id   ", arg.fixParamText("stor_id"))
			.query("     )           ")
		;data.attach(Action.direct).execute();
		return null;
	}


}
