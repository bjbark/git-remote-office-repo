package com.sky.system.project.querymaker;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class QueryMakerService extends DefaultServiceHandler{

	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getService(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage query;
		query = new DataMessage(SqlRepository.NETHOSTING);
		String BUSINESS = "project";
		String MODULE   = "querymst";
		String SERVICE  = "getService";

		query.param // 집계문
			.total("select count(1) as maxsize   ")
		;
		query = sequence.getSql(arg , BUSINESS , MODULE , SERVICE , query,"allinone");

		if (page == 0 && rows == 0 ) {
			return query.selectForMap(sort);
		} else {
			return query.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage query;
		query = new DataMessage(SqlRepository.NETHOSTING);
		String BUSINESS = "project";
		String MODULE   = "querymst";
		String SERVICE  = "getSearch";

		query.param // 집계문
			.total("select count(1) as maxsize   ")
		;
		query = sequence.getSql(arg , BUSINESS , MODULE , SERVICE , query,"allinone");

		if (page == 0 && rows == 0 ) {
			return query.selectForMap(sort);
		} else {
			return query.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage query;
		query = new DataMessage(SqlRepository.NETHOSTING);
		String BUSINESS = "angel";
		String MODULE   = "angelcust";
		String SERVICE  = "getLookup";
		query = sequence.getSql(arg , BUSINESS , MODULE , SERVICE , query,"body");
		query.param
			.where("and     a.row_sts   < :row_sts     " , "2" , "".equals(arg.getParamText("row_sts" )) )
		;
		query = sequence.getSql(arg , BUSINESS , MODULE , SERVICE , query,"footer");
	    return query.selectForMap(page, rows, (page == 1));
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("qry_mst"                                                        )
					.where("where path         = :path                                     ")
					.where("and   srvc         = :srvc                                     ")
					.where("and   modl         = :modl                                     ")
					.where("and   line_no      = :line_no                                  ")
				    //
					.unique("path"              , row.fixParameter("path"             ))
					.unique("srvc"              , row.fixParameter("srvc"             ))
					.unique("modl"              , row.fixParameter("modl"             ))
					.unique("line_no"           , row.fixParameter("line_no"          ))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("qry_mst"                                                        )
					.where("where path            = :path                                  ")  /*  path  */
					.where("and   srvc            = :srvc                                  ")  /*  srvc  */
					.where("and   modl            = :modl                                  ")  /*  modl  */
					.where("and   line_no         = :line_no                               ")  /*  line_no  */
				    //
					.unique("path"                , row.fixParameter("path"                ))
					.unique("srvc"                , row.fixParameter("srvc"                ))
					.unique("modl"                , row.fixParameter("modl"                ))
					.unique("line_no"             , row.fixParameter("line_no"             ))
				    //
					.update("type_cd"             , row.getParameter("type_cd"             ))  /*  type_cd  */
					.update("query_txt"           , row.getParameter("query_txt"           ))  /*  query_txt  */
					.update("ref_1"               , row.getParameter("ref_1"               ))  /*  ref_1  */
					.update("ref_2"               , row.getParameter("ref_2"               ))  /*  ref_2  */
					.update("ref_3"               , row.getParameter("ref_3"               ))  /*  ref_3  */
					.update("ref_4"               , row.getParameter("ref_4"               ))  /*  ref_4  */
					.update("ref_5"               , row.getParameter("ref_5"               ))  /*  ref_1  */
					.update("ref_6"               , row.getParameter("ref_6"               ))  /*  ref_2  */
					.update("ref_7"               , row.getParameter("ref_7"               ))  /*  ref_3  */
					.update("ref_8"               , row.getParameter("ref_8"               ))  /*  ref_4  */
					.update("deli_val"            , row.getParameter("deli_val"            ))  /*  deli_val  */
					.update("cnst_val"            , row.getParameter("cnst_val"            ))  /*  deli_val  */
					.update("find_nm"      	      , row.getParamText("path"       	   ).trim()
											   	  + row.getParamText("srvc"            ).trim()
												  + row.getParamText("modl"            ).trim() )
					.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
					.update("upt_ip"              , row.getParameter("upt_ip"              ))  /*  수정IP  */
					.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("upt_id"              , row.getParameter("upt_id"              ))  /*  수정ID  */
					.update("upt_ui"              , row.getParameter("upt_ui"              ))  /*  수정UI  */
					.insert("crt_usr_nm"          , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
					.insert("crt_ip"              , row.getParameter("crt_ip"              ))  /*  생성IP  */
					.insert("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crt_id"              , row.getParameter("crt_id"              ))  /*  생성ID  */
					.insert("crt_ui"              , row.getParameter("crt_ui"              ))  /*  생성UI  */
		        ;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
