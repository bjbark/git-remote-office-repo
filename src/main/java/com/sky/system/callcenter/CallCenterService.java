package com.sky.system.callcenter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class CallCenterService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap testCall1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		// logic

		String cvic_idcd = (String) arg.getParameter("cvic_idcd");
		String chek_name = arg.getParamText("chek_name");
		String cvic_spec = arg.getParamText("cvic_spec");
		String puch_date = arg.getParamText("puch_date");
		String puch_cstm_name = arg.getParamText("puch_cstm_name");
		String afsv_tele_numb = arg.getParamText("afsv_tele_numb");
		String chek_ccle_dvcd = arg.getParamText("chek_ccle_dvcd");
		String nxrm_chek_date = arg.getParamText("nxrm_chek_date");


		return null;
	}

	public void testCall2() throws Exception {
		// logic
	}
}
