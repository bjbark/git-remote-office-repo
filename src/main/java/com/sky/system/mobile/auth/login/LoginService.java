package com.sky.system.mobile.auth.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("mobile.LoginService")
public class LoginService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getLogin(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param
			.query("select user_idcd, user_name , user_code					")
		;
		data.param
			.where("from  user_mast											")
			.where("where lgin_idcd = :lgin_idcd", arg.fixParameter("lgin_idcd"))
			.where("and   lgin_pswd = :lgin_pswd", arg.fixParameter("lgin_pswd"))
		;
		return data.selectForMap() ;
	}


}




