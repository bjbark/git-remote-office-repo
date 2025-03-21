package com.sky.system.membership.lssnschd;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

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

@Service
public class LssnSchdService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);

		data.param
			.query("call lssn_cldr( :param "     , result)
			.query("              )")
		;
		return data.selectForMap();

	}
}
