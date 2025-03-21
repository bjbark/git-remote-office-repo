package com.sky.system.project.skycnsip;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class SkycnsIpService extends DefaultServiceHandler {

	//private final Logger logger = LoggerFactory.getLogger(this.getClass());
	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문 입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문 입력
			.query("select a.host_grp  , a.host_id , a.host_cd ,  a.host_nm  , a.host_os ")
			.query("     , a.host_ip   , a.dhcp_ip  ")
			.query("     , a.emp_id    , b.emp_nm , d.dept_nm " )
		;
		data.param // 조건문 입력
			.where("from   host_mst a          " )
			.where("	   left outer join usr_mst  b on b.emp_id  = a.emp_id " )
			.where("	   left outer join dept_mst d on d.dept_id = b.dept_id " )
			.where("where  a.host_grp= 'ARN'   " )
			.where("and    a.host_gb = '1'     " ) // 사내 컴퓨터만 조회 한다 .
			.where("and    a.emp_id = :emp_id          "  , arg.getParameter("emp_id"   ))
			.where("and    a.find_nm like %:find_nm% "  , arg.getParameter("find_nm" ))
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1) , sort );
		}
	    //return data.selectForMap();
	}

	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("host_mst")
					.where("where host_id  = :host_id  " )
					.unique("host_grp"      , row.getParameter("host_grp"      ))
					.unique("host_id"       , row.fixParameter("host_id"      ))
					.unique("host_cd"       , row.fixParameter("host_cd"      ))
					.update("host_nm"       , row.getParameter("host_nm"      ))


					.update("emp_id"       , row.getParameter("emp_id"        ))
					.update("usr_memo"      , row.getParameter("usr_memo"      ))
					.update("row_sts"       , row.getParameter("row_sts"      ))
					.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					.update("find_nm"       , row.getParamText("host_grp"      )
											+ row.getParamText("host_id"      )
											+ row.getParamText("host_nm"      ))

				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}


}
