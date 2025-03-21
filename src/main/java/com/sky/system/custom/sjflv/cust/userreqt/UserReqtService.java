package com.sky.system.custom.sjflv.cust.userreqt;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

import net.sky.http.dispatch.control.DefaultServiceHandler;

@Service("sjflv.UserReqtService")
public class UserReqtService extends DefaultServiceHandler {

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.total("SELECT COUNT(1) AS maxsize  " )
		;
		data.param
			.query("SELECT ur.user_name      , ur.hdph_numb      , ur.cstm_idcd      , cm.cstm_name		")
			.query("     , ur.sign_reqt_date , ur.mail_addr      , ur.line_stat							")
			.where("  FROM user_reqt ur																	")
			.where("  LEFT OUTER JOIN cstm_mast cm ON ur.cstm_idcd = cm.cstm_idcd						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	
	public SqlResultMap setUserReqt(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq + ".POS");
		
		data.param
			.table("user_reqt												")

			.update("user_name"			, arg.getParameter("user_name"		))
			.update("sign_reqt_date"	, arg.getParameter("sign_reqt_date"	))
			.update("hdph_numb"			, arg.getParameter("hdph_numb"		))
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd"		))
			.update("mail_addr"			, arg.getParameter("mail_addr"		))

			.update("updt_user_name"	, arg.getParameter("updt_user_name"		))  /*  수정사용자명  */
			.update("updt_ipad"			, arg.getParameter("updt_ipad"			))  /*  수정IP  */
			.update("updt_idcd"			, arg.getParameter("upt_id"				))  /*  수정ID  */
			.update("updt_urif"			, arg.getParameter("updt_urif"			))  /*  수정UI  */
			.insert("crte_user_name"	, arg.getParameter("crte_user_name"		))  /*  생성사용자명  */
			.insert("crte_ipad"			, arg.getParameter("crte_ipad"			))  /*  생성IP  */
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
			.insert("crte_idcd"			, arg.getParameter("crt_id"				))  /*  생성ID  */
			.insert("crte_urif"			, arg.getParameter("crte_urif"			))  /*  생성UI  */
		;
		data.attach(Action.insert);
		data.execute();
		data.clear();
		return null ;
	}
}
