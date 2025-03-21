package com.sky.system.custom.incopack.prod.pdodlist;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("inkopack.PdodListService")
public class PdodListService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call pdod_list_v1('0')")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call pdod_list_v1('1')")
		;

		return data.selectForMap();
	}
}