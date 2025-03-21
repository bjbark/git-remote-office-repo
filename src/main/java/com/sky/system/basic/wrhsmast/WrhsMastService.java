package com.sky.system.basic.wrhsmast;

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
public class WrhsMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wrhs_idcd           , a.wrhs_code       , a.wrhs_name        , a.bzct_dvcd		")
			.query("		, a.bzpl_idcd           , a.mngt_wrhs_name											")
			.query("		, a.mngt_wrhs_dvcd      , a.dept_idcd       , a.drtr_idcd        , a.trut_cstm_idcd	")
			.query("		, a.drtr_cntr_dvcd      , a.lcal_dvcd       , a.full_addr        , a.wms_code		")
			.query("		, a.nega_stok_yorn      , a.user_memo       , a.sysm_memo        , a.prnt_idcd		")
			.query("		, a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("		, a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("		, a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("		, a.crte_urif           , a.post_code       , a.addr_1fst        , a.addr_2snd		")
			.query("		, b.dept_name as dept_name   , c.user_name as drtr_name								")
			.query("		, z.bzpl_code           , z.bzpl_name as bzpl_name									")
		;
		data.param //퀴리문
			.where("from	wrhs_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("		left outer join bzpl_mast z on a.bzpl_idcd = z.bzpl_idcd							")
			.where("where   1=1																					")
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     A.wrhs_idcd   = :wrhs_idcd		" , arg.getParamText("wrhs_idcd" ))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.wrhs_idcd"																	)
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.wrhs_idcd           , a.wrhs_code       , a.wrhs_name        ,a.bzct_dvcd		")
			.query("		, a.bzpl_idcd           , a.mngt_wrhs_name											")
			.query("		, a.mngt_wrhs_dvcd      , a.dept_idcd       , a.drtr_idcd        , a.trut_cstm_idcd	")
			.query("		, a.drtr_cntr_dvcd      , a.lcal_dvcd       , a.full_addr        , a.wms_code		")
			.query("		, a.nega_stok_yorn      , a.user_memo       , a.sysm_memo        , a.prnt_idcd		")
			.query("		, a.line_stat           , a.line_clos       , a.find_name        , a.updt_user_name	")
			.query("		, a.updt_ipad           , a.updt_dttm       , a.updt_idcd        , a.updt_urif		")
			.query("		, a.crte_user_name      , a.crte_ipad       , a.crte_dttm        , a.crte_idcd		")
			.query("		, a.crte_urif           , a.post_code       , a.addr_1fst        , a.addr_2snd		")
			.query("		, b.dept_name as dept_name , c.user_name as drtr_name								")
			.query("		, z.bzpl_code           , z.bzpl_name as bzpl_name									")
		;
		data.param //퀴리문
			.where("from	wrhs_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join user_mast c on a.drtr_idcd = c.user_idcd							")
			.where("		left outer join bzpl_mast z on a.bzpl_idcd = z.bzpl_idcd							")
			.where("where   1=1																					")
			.where("and     a.mngt_wrhs_dvcd = :mngt_wrhs_dvcd " , arg.getParameter("mngt_wrhs_dvcd"))
			.where("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"))
			.where("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
			.where("order   by	a.wrhs_idcd"																	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}

	public SqlResultMap getWrhsWkctLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("with rec as (")
			.query("select   a.wrhs_idcd    , a.wrhs_code    , a.wrhs_name    , a.bzpl_idcd		")
			.query("       , a.dept_idcd    , z.bzpl_code    , z.bzpl_name    , b.dept_name		")
			.query("       , a.find_name    , a.line_stat										")
			.query("from wrhs_mast a															")
			.query("left outer join dept_mast b on a.dept_idcd = b.dept_idcd					")
			.query("left outer join bzpl_mast z on a.bzpl_idcd = z.bzpl_idcd					")
			.query("union all																	")
			.query("select   a.wkct_idcd    , a.wkct_code    , a.wkct_name    , null			")
			.query("       , null           , null           , null           , null			")
			.query("       , a.find_name    , a.line_stat										")
			.query("from wkct_mast a")
			.query(")																							")
			.query("select a.* from rec a																		")
			.query("where 1=1																					")
			.query("and     a.find_name	like %:find_name%	" , arg.getParameter("find_name"					))
			.query("and     a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" ))	)
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wrhs_mast")
					.where("where wrhs_idcd  = :wrhs_idcd")

					.unique("wrhs_idcd"			, row.fixParameter("wrhs_idcd"		))
					.update("line_stat"			, 2									)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("wrhs_mast")
					.where("where wrhs_idcd	= :wrhs_idcd" )

					.unique("wrhs_idcd"				, row.fixParameter("wrhs_idcd"))

					.update("wrhs_code"				, row.getParameter("wrhs_code"			))
					.update("wrhs_name"				, row.getParameter("wrhs_name"			))
					.update("mngt_wrhs_dvcd"		, row.getParameter("mngt_wrhs_dvcd"		))
					.update("mngt_wrhs_name"		, row.getParameter("mngt_wrhs_name"		))
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"			))
					.update("nega_stok_yorn"		, row.getParameter("nega_stok_yorn"		))
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"			))
					.update("full_addr"				, row.getParameter("addr_1fst"			)
													+ " "
													+ row.getParameter("addr_2snd"			))
					.update("lcal_dvcd"				, row.getParameter("lcal_dvcd"			))
					.update("trut_cstm_idcd"		, row.getParameter("trut_cstm_idcd"		))
					.update("addr_1fst"				, row.getParameter("addr_1fst"			))
					.update("addr_2snd"				, row.getParameter("addr_2snd"			))
					.update("post_code"				, row.getParameter("post_code"			))
					.update("dept_idcd"				, row.getParameter("dept_idcd"			))

					.update("find_name"				, row.getParameter("wrhs_name")
													+ " "
													+ row.fixParameter("wrhs_idcd")
													+ " "
													+ row.getParameter("dept_name")
													+ " "
													+ row.getParameter("drtr_name"))
					.insert("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
}
