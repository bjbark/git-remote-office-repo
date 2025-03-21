package com.sky.system.custom.hantop.item.itemgroup;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class ItemGroupService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize												")
		;
		data.param
//			.query("select a.hqof_idcd														")
//			.query("     , a.base_idcd , a.base_code , a.base_name  , a.base_engl_name		")
//			.query("     , a.prnt_idcd , a.line_levl , a.line_stat  , a.user_memo			")

			.query("select a.wdgr_idcd														")
			.query("     , a.wdgr_code , a.wdgr_name , a.user_memo  	")
			.query("     , a.prnt_idcd  , a.line_levl , a.line_stat")

		;
		data.param //퀴리문
			.where("from 		wind_grop a																														")
			.where("where		1=1																																	")
			.where("and			 a.wdgr_idcd  = :wdgr_idcd				"						, arg.getParameter("wdgr_idcd" 	))
			.where("and			a.wdgr_code  = :wdgr_code			"						, arg.getParameter("wdgr_code" 	))
			.where("and			a.user_memo  = :user_memo		"						, arg.getParameter("user_memo" 	))
			.where("and			a.find_name  like %:find_name%	"						, arg.getParameter("find_name"	 	))
			.where("and			a.line_stat	< :line_stat					", "2" , "".equals(arg.getParamText("line_stat"		)))
			.where("order by a.wdgr_code																													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select   a.wdgr_idcd																")
		.query("           , a.wdgr_code     , a.wdgr_name     , a.user_memo	")
		.query("           , a.prnt_idcd        , a.line_levl           , a.line_stat			")

	;
	data.param //퀴리문
		.where("from   wind_grop a														")
		.where("where  1=1																		")
		.where("and    a.wdgr_idcd  = :wdgr_idcd       "  , arg.getParameter("wdgr_idcd"))
		.where("and    a.wdgr_code  = :wdgr_code       "  , arg.getParameter("wdgr_code"))
		.where("and    a.user_memo  = :user_memo       "  , arg.getParameter("user_memo"))
		.where("and    a.find_name  like %:find_name%  "  , arg.getParameter("find_name"))
		.where("and			a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
		.where("order by a.wdgr_code													")
	;
	    return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wind_grop")
					.where("where wdgr_idcd  = :wdgr_idcd  " )
					//
					.unique("wdgr_idcd"			, row.fixParameter("wdgr_idcd"         ))
					.update("line_stat"				, 2  )
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("wind_grop")
					.where("where wdgr_idcd  = :wdgr_idcd  " )
					//
					.unique("wdgr_idcd"			, row.fixParameter("wdgr_idcd"))
					.update("wdgr_code"			, row.getParameter("wdgr_code"))
					.update("wdgr_name"			, row.getParameter("wdgr_name"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("find_name"			, row.getParamText("wdgr_code"         ).trim()
												+ " "
												+ row.getParamText("wdgr_name"         ).trim())
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



