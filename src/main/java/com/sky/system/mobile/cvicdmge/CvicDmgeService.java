package com.sky.system.mobile.cvicdmge;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class CvicDmgeService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getCvicDmge(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		String dmge_dttm = arg.getParamText("dmge_dttm").trim().replaceAll("[^0-9]", "");
		SqlResultRow temp1 ;
		data.param
			.query("select ifnull(max(line_seqn)+1,0) as line_seqn				")
		;
		data.param
			.where("from  cvic_dmge											")
			.where("where cvic_idcd = :cvic_idcd", arg.fixParameter("cvic_idcd"))
		;
		temp1 = data.selectForRow();
		data.clear();
		data.param
			.table("cvic_dmge")
			.where("where cvic_idcd  = :cvic_idcd")
			.where("and   line_seqn  = :line_seqn")

			.unique("cvic_idcd"			, arg.fixParameter("cvic_idcd"				))
			.unique("line_seqn"			, temp1.fixParameter("line_seqn"			))

			.update("dmge_dvcd"			, arg.getParameter("dmge_dvcd"				))
			.update("dmge_dttm"			, dmge_dttm									 )
			.update("dmge_regn"			, arg.getParameter("dmge_regn"				))
			.update("rept_aman_name"	, arg.getParameter("rept_aman_name"			))
		;data.attach(Action.insert);
		data.execute();
		return null ;
	}


}




