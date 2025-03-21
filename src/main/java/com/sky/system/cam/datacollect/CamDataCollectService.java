package com.sky.system.cam.datacollect;

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
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class CamDataCollectService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	public SqlResultMap setDataIn(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param
			.table("wt_data_in")
		;
		data.param
			.update("device"	, arg.getParameter("device"))
			.update("cmd"		, arg.getParameter("cmd"))
			.update("ch"		, arg.getParameter("ch"))
			.update("param1"	, arg.getParameter("param1"))
			.update("param2"	, arg.getParameter("param2"))
			.update("param3"	, arg.getParameter("param3"))
			.update("seq"		, arg.getParameter("seq"))
			.update("timepoint"	, new SimpleDateFormat("yyMMddHHmmss").format(new Date())) /* 수정일시 */
		;
		data.attach(Action.insert);
		data.execute();
		return null;
	}
}



