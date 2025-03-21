package com.sky.system.custom.sjflv.item.mtrlsubslist;

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
public class MtrlSubsListService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																" )
		;
		data.param
			.query("select	   a.invc_numb		, a.item_idcd		, a.befr_splr_name	, a.befr_mker_name	")
			.query("		 , a.splr_name		, a.mker_name		, a.usag_qntt_memo	, a.ecod_purp		")
			.query("		 , a.test_drtr_name	, a.test_date		, i.item_name		, i.item_code		")
			.query("		 , i.item_spec		, a.hala_yorn		, a.mtrl_sbzt_dvcd	, a.fema			")
			.query("		 , a.user_memo		, a.sysm_memo		, a.prnt_idcd							")
			.query("		 , a.line_levl		, a.line_ordr		, a.line_stat		, a.line_clos		")
			.query("		 , a.find_name		, a.updt_user_name	, a.updt_ipad		, a.updt_dttm		")
			.query("		 , a.updt_idcd		, a.updt_urif		, a.crte_user_name	, a.crte_ipad		")
			.query("		 , a.crte_dttm		, a.crte_idcd		, a.crte_urif							")
		;
		data.param //퀴리문
			.where("from	mtrl_subs_mast a																")
			.where("		left outer join item_mast	i  on a.item_idcd = i.item_idcd						")
			.where("where	1=1																				")
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			// .where("and		substr(a.test_date,1,4) = :test_date	" , arg.getParamText("test_date"))
			.where("   and a.test_date  >= :test_date1				" , arg.getParamText("test_date1" ))
			.where("   and a.test_date  <= :test_date2				" , arg.getParamText("test_date2" ))
			.where("and		a.test_drtr_name	like %:test_drtr_name%"	, arg.getParameter("test_drtr_name"))
			.where("and		i.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("and     a.mtrl_sbzt_dvcd   = :mtrl_sbzt_dvcd    " , arg.getParamText("mtrl_sbzt_dvcd" ))
			.where("order by a.test_date desc")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mtrl_subs_mast")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);


			} else {
				data.param
					.table("mtrl_subs_mast")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"			, row.fixParameter("invc_numb"))

					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("befr_splr_name"	, row.getParameter("befr_splr_name"))
					.update("befr_mker_name"	, row.getParameter("befr_mker_name"))
					.update("splr_name"			, row.getParameter("splr_name"))
					.update("mker_name"			, row.getParameter("mker_name"))
					.update("usag_qntt_memo"	, row.getParameter("usag_qntt_memo"))
					.update("ecod_purp"			, row.getParameter("ecod_purp"))
					.update("test_drtr_name"	, row.getParameter("test_drtr_name"))
					.update("test_date"			, row.getParameter("test_date"))
					.update("mtrl_sbzt_dvcd"	, row.getParameter("mtrl_sbzt_dvcd"))
					.update("hala_yorn"			, row.getParameter("hala_yorn"))
					.update("fema"				, row.getParameter("fema"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("item_code")
												+ "	"
												+ row.getParameter("item_name")
												+ " "
												+ row.getParameter("splr_name")
												+ " "
												+ row.getParameter("fema")
												+ " "
												+ row.getParameter("test_drtr_name"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
