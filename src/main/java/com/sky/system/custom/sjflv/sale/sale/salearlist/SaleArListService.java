package com.sky.system.custom.sjflv.sale.sale.salearlist;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class SaleArListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_date1 = arg.getParamText("invc_date1");
		String invc_date2 = arg.getParamText("invc_date2");
		
		if (StringUtils.isEmpty(invc_date1) || StringUtils.isEmpty(invc_date2)) {
			throw new ServiceException("기준일자를 입력 후 조회하세요.");
		}
		
		String cstm_idcd = arg.getParamText("cstm_idcd");
		if (cstm_idcd.isEmpty()) {
			cstm_idcd = "@" ;
		}

		String drtr_idcd = arg.getParamText("drtr_idcd");
		if (drtr_idcd.isEmpty()) {
			drtr_idcd = "@" ;
		}

		String find_name = arg.getParamText("find_name");
		if (find_name.isEmpty()) {
			find_name = "@" ;
		}

		data.param
			.query("call sale_book (				")
			.query("  :invc_date1	" , arg.getParameter("invc_date1"))
			.query(" ,:invc_date2	" , arg.getParameter("invc_date2"))
			.query(" ,:cstm_idcd	" , cstm_idcd)
			.query(" ,:drtr_idcd	" , drtr_idcd)
			.query(" ,:find_name	" , find_name)
			.query(" ) 								")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		
		String cstm_idcd = arg.getParamText("cstm_idcd");
		if (StringUtils.isEmpty(cstm_idcd)) {
			throw new ServiceException("거래처 원장에서 거래처를 선택 후 조회하세요.");
		}

		data.param
			.query("call sale_book_list (				")
			.query("   :cstm_idcd	" , arg.getParameter("cstm_idcd"))
			.query("  ,:invc_date1	" , arg.getParameter("invc_date1"))
			.query("  ,:invc_date2	" , arg.getParameter("invc_date2"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}
}
