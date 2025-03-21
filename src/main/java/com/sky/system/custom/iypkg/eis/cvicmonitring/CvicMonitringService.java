package com.sky.system.custom.iypkg.eis.cvicmonitring;


import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("iypkg.CvicMonitringService")
public class CvicMonitringService extends DefaultServiceHandler{

	// 조회
		public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");
			data.param
				.query("call cvic_monitering()	")
			;
			return data.selectForMap();
		}

//		data.param // 집계문
//			.total("select count(1) as maxsize																" )
//		;
//		data.param
//			.query("select																					")
//			.query("			a.cvic_name		")
//		;
//		data.param //퀴리문
//			.where("from	cvic_mast a																		")
//			.where("where	1=1																				")
//			.where("order by a.cvic_idcd")
//		;
//		if (page == 0 && rows == 0 ) {
//			return data.selectForMap(sort);
//		} else {
//			return data.selectForMap(page, rows, (page==1),sort);
//		}
//	}
}
