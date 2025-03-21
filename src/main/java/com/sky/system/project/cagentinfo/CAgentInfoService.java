package com.sky.system.project.cagentinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;


@Service
public class CAgentInfoService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String index = arg.getParamText("search_id").trim();
		String value = arg.getParamText("search_nm").trim();

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select a.agent_id     , a.mngt_chnl_nm				")
			.query("     , a.call_cntr_id , p.mngt_chnl_nm as phone_nm	")
			.query("     , a.biz_gb										")
			.query("     , a.biz_no										")
			.query("     , a.biz_nm										")
			.query("     , a.biz_type									")
			.query("     , a.biz_kind									")
			.query("     , a.biz_owner									")
			.query("     , a.biz_email									")
			.query("     , a.biz_tel_no									")
			.query("     , a.biz_hp_no									")
			.query("     , a.biz_fax_no									")
			.query("     , a.biz_state									")
			.query("     , a.biz_city									")
			.query("     , a.biz_dong									")
			.query("     , a.biz_zip_cd									")
			.query("     , a.biz_addr_1									")
			.query("     , a.biz_addr_2									")
			.query("     , a.usr_memo , a.row_sts						")
		;
		data.param // 쿼리문  입력
			.where("from   agent a "     )
			.where("       left outer join agent p on p.agent_id = a.call_cntr_id " )
			.where("where  1=1											")
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
		    .where("and    a.mngt_chnl_nm like %:mngt_chnl_nm% " , value , index.equals("1" ))
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}


	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("select a.agent_id       , b.mngt_chnl_nm						")
			.query("     , a.retail_chnl_id , d.mngt_chnl_nm  as distr_nm			")
			.query("     , b.call_cntr_id   , p.mngt_chnl_nm  as phone_nm			")
			.query("     , b.usr_memo       , b.row_sts								")
		;
		data.param // 쿼리문  입력
			.where("from   agent_distr a											")
			.where("       join agent  d on d.agent_id = a.retail_chnl_id			")
			.where("       join agent  b on b.agent_id = a.agent_id					")
			.where("       left outer join agent  p on p.agent_id = b.call_cntr_id	")
			.where("where  1=1														")
			.where("and    a.row_sts = :row_sts " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and    a.row_sts < :row_sts " , "2" , "".equals(arg.getParamText("row_sts" )) )
		    .where("and    b.mngt_chnl_nm like %:mngt_chnl_nm% " , arg.getParameter("mngt_chnl_nm"))
		;
		return (page == 0 && rows == 0) ? data.selectForMap() : data.selectForMap(page, rows, (page==1) , sort );
	}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("row_sts" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("agent")
				.where("where agent_id  = :agent_id  " )
		        //
		        .update("retail_chnl_id", row.getParameter("retail_chnl_id"       ))
		        .unique("agent_id"      , row.fixParameter("agent_id"       ))
		        .update("mngt_chnl_nm"  , row.getParameter("mngt_chnl_nm"       ))
		        .update("call_cntr_id"  , row.fixParameter("call_cntr_id"       ))

		        .update("biz_gb"        , row.getParameter("biz_gb"         ))
		        .update("biz_no"        , row.getParameter("biz_no"         ))
		        .update("biz_nm"        , row.getParameter("biz_nm"         ))
		        .update("biz_type"      , row.getParameter("biz_type"       ))
		        .update("biz_kind"      , row.getParameter("biz_kind"       ))
		        .update("biz_owner"     , row.getParameter("biz_owner"       ))
		        .update("biz_email"     , row.getParameter("biz_email"       ))
		        .update("biz_tel_no"    , row.getParameter("biz_tel_no"       ))
		        .update("biz_hp_no"     , row.getParameter("biz_hp_no"       ))
		        .update("biz_fax_no"    , row.getParameter("biz_fax_no"       ))
		        .update("biz_state"     , row.getParameter("biz_state"       ))
		        .update("biz_city"      , row.getParameter("biz_city"       ))
		        .update("biz_dong"      , row.getParameter("biz_dong"       ))
		        .update("biz_zip_cd"    , row.getParameter("biz_zip_cd"       ))
		        .update("biz_addr_1"    , row.getParameter("biz_addr_1"       ))
		        .update("biz_addr_2"    , row.getParameter("biz_addr_2"       ))

		        .update("usr_memo"      , row.getParameter("usr_memo"      ))
		        .update("row_sts"       , row.getParameter("row_sts"      ))
		        //
		        .update("upt_id"        , row.getParameter("upt_id"      ))
		        .update("upt_ui"        , row.getParameter("upt_ui"      ))
		        .update("upt_ip"        , arg.remoteAddress  )

		        .insert("crt_id"        , row.getParameter("upt_id"      ))
		        .insert("crt_ui"        , row.getParameter("upt_ui"      ))
		        .insert("crt_ip"        , arg.remoteAddress  )
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
        	;data.attach(rowaction);
        	//  신규 인경우
        	if (Action.insert.equals(rowaction)) {
    			data.param
					.table("agent_distr")
					.where("where retail_chnl_id  = :retail_chnl_id  " )
					.where("and   agent_id  = :agent_id  " )
					//
					.unique("retail_chnl_id"     , row.fixParameter("agent_id"       ))
					.unique("agent_id"           , row.fixParameter("agent_id"       ))
					.update("row_sts"            , "0" )
					//
				;data.attach(Action.modify);
        	}
		}
		data.execute();
		return null ;
	}
}

