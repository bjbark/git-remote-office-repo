package com.sky.system.basic.mngtsbscmast;

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
public class MngtSbscMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																			")
		;
		data.param
			.query("select a.mngt_sbsc_dvcd  , a.mngt_sbsc_idcd  , a.mngt_sbsc_code , a.mngt_sbsc_name					")
			.query("     , a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl      , a.line_ordr	")
			.query("     , a.line_stat       , a.line_clos       , a.find_name      , a.updt_user_name , a.updt_ipad	")
			.query("     , a.updt_dttm       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad	")
			.query("     , a.crte_dttm       , a.crte_idcd       , a.crte_urif											")
		;
		data.param //퀴리문
			.where("from   mngt_sbsc_mast a													")
			.where("where  1=1																")
			.where("and    a.find_name	like %:find_name%     "  , arg.getParamText("find_nm"))
			.where("and    a.mngt_sbsc_dvcd  = :mngt_sbsc_dvcd          "  , arg.fixParameter("mngt_sbsc_dvcd"))
			.where("and    a.find_name  like %:find_name%     "  , arg.getParameter("find_name"))
			.where("and    a.mngt_sbsc_name  like %:mngt_sbsc_name%  "  , arg.getParameter("mngt_sbsc_name"))

			.where("and    a.line_stat = :line_stat1 " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.mngt_sbsc_idcd													")
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
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mngt_sbsc_mast")
					.where("where  mngt_sbsc_dvcd  = :mngt_sbsc_dvcd" )
					.where("and    mngt_sbsc_idcd  = :mngt_sbsc_idcd" )
					//
					.unique("mngt_sbsc_dvcd"	, row.fixParameter("mngt_sbsc_dvcd"         ))
					.unique("mngt_sbsc_idcd"	, row.fixParameter("mngt_sbsc_idcd"         ))
					.update("line_stat"			, 2  )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.update);
			} else {
				data.param
					.table("mngt_sbsc_mast")
					.where("where mngt_sbsc_dvcd  = :mngt_sbsc_dvcd  " )
					.where("and   mngt_sbsc_idcd  = :mngt_sbsc_idcd  " )
					//
					.unique("mngt_sbsc_dvcd"	, row.fixParameter("mngt_sbsc_dvcd"))
					.unique("mngt_sbsc_idcd"	, row.fixParameter("mngt_sbsc_idcd"))

					.update("mngt_sbsc_code"	, row.getParameter("mngt_sbsc_code"))
					.update("mngt_sbsc_name"	, row.getParameter("mngt_sbsc_name"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("find_name"			, row.getParamText("mngt_sbsc_dvcd"         ).trim()
												+ row.getParamText("mngt_sbsc_name"         ).trim())
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



