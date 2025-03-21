package com.sky.system.project.phoneinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;


//import com.sky.core.encryption.Encryptor;

import com.sky.data.DataMessage;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class PhoneInfoService extends DefaultServiceHandler{


	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize										")
		;
		data.param
			.query("select a.agent_id  as call_cntr_id , a.mngt_chnl_nm as phone_nm		")
			.query("     , a.usr_memo  , a.row_sts										")
		;
		data.param
			.where("from   agent a														")
			.where("where  a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("where  a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
		    .where("and    a.mngt_chnl_nm like %:mngt_chnl_nm% " , arg.getParameter("phone_nm"))
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}
}
