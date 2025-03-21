package com.sky.system.ganttchart;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service
public class GanttChartService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap testCall1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		// logic

		String hq_id = (String) arg.getParameter("hq_id");
		String stor_id = arg.getParamText("stor_id");
		logger.debug("hq_id --> " + hq_id);
		logger.debug("stor_id --> " + stor_id);
		return null;
	}

	public void testCall2() throws Exception {
		// logic
	}
	public SqlResultMap setGantt(HttpRequestArgument arg) throws Exception {
		int seqn = 1;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		data.param
			.table("gantt_chart_tasks									")
			;data.attach(Action.delete);
			data.execute();
			System.out.println("delete 완료");
		for (SqlResultRow row:map) {
				data.param
					.table("gantt_chart_tasks"                                                    )
					.where("where id       = :id												 ")
					//
					.unique("id"				, row.fixParameter("id"							 ))  //id,
					//
					.update("seqn"				, seqn++										  )  /*  순번  */
					.update("name"				, row.getParameter("name"                        ))  /*  name  */
					.update("progress"			, row.getParameter("progress"                    ))  /*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"           ))
					.update("relevance"			, row.getParameter("relevance"                   ))
					.update("type"				, row.getParameter("type"                        ))
					.update("typeld"			, row.getParameter("typeld"                      ))
					.update("description"		, row.getParameter("description"                 ))  /*   */
					.update("code"				, row.getParameter("code"                        ))  /*  코드  */
					.update("level"				, row.getParameter("level"                       ))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"                      ))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"                     ))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"                       ))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"                    ))  /*  소요기간  */
					.update("end"				, row.getParameter("end"                         ))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"            ))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"              ))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"                   ))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"                    ))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"                      ))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"                   ))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"                 ))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"                    ))  /*    */
					.update("endTime"			, row.getParameter("endTime"                     ))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"                   ))  /* 종료시간 */

				;data.attach(Action.modify);

				setAssigs(arg,data,row,row.getParameter("assigs", SqlResultMap.class));

		}
	data.execute();
	return null;
	}
	public SqlResultMap setAssigs(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, SqlResultMap map) throws Exception {
		data.param
			.table("gantt_chart_assigs")
			.where("where id  = :id")
			.unique("id"			, mst.fixParameter("id"					))
		;data.attach(Action.delete);
		for(SqlResultRow row:map){
				data.param
					.table("gantt_chart_assigs")
					.where("where id	= :id" )
					.where("and   resourceId	= :resourceId" )

					.unique("id"				, mst.fixParameter("id"))
					.unique("resourceId"		, row.fixParameter("resourceId"))

					.update("roleId"			, row.getParameter("roleId"))
					.update("effort"			, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}

	public SqlResultMap getGantt(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
			.query("select *																	")
		;
		data.param // 조회
			.where("from    gantt_chart_tasks													")
			.where("where   1=1																	")
			.where("order by seqn																")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigs(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("select *																	")
		;
		data.param // 조회
			.where("from gantt_chart_assigs														")
			.where("where   1=1																	")
			.where("and     prjt_idcd = :prjt_idcd ", arg.getParameter("invc_numb"))
		;

		return data.selectForMap();
	}
	public SqlResultMap getGanttProjectDesign(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
			.query("select 																								")
			.query("        prjt_idcd       , dsig_schd_dvcd  , id                  , seqn								")
			.query("      , name            , progress        , progressbyworklog   , relevance   , type				")
			.query("      , typeld          , description     , code                , level       , status				")
			.query("      , depends         , start           , duration            , end         , startismilestone	")
			.query("      , endismilestone  , collapsed       , canwrite            , canadd      , wkct_idcd			")
			.query("      , candelete       , canaddlssue     , haschild            , starttime   , endtime				")
		;
		data.param // 조회
			.where("from    prjt_dsig_schd																				")
			.where("where   1=1																							")
			.where("and     prjt_idcd      = :prjt_idcd ", arg.getParameter("invc_numb"))
			.where("and     dsig_schd_dvcd = :schd_dvcd ", arg.getParameter("schd_dvcd"))
			.where("order by seqn																						")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigsProjectDesign(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("select *																	")
		;
		data.param // 조회
			.where("from    prjt_dsig_assigs													")
			.where("where   1=1																	")
			.where("and     prjt_idcd = :prjt_idcd ", arg.getParameter("invc_numb"))
		;

		return data.selectForMap();
	}
	public SqlResultMap setGanttProjectDesign(HttpRequestArgument arg) throws Exception {
		int seqn = 1;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		String invc_numb = arg.getParamText("invc_numb");
		String schd_dvcd = arg.getParamText("schd_dvcd");
		data.param
			.table("prjt_dsig_schd														")
			.where("where prjt_idcd = :prjt_idcd										")
			.where("and   dsig_schd_dvcd = :dsig_schd_dvcd								")

			.unique("prjt_idcd"			, invc_numb)  //  프로젝트 번호,
			.unique("dsig_schd_dvcd"	, schd_dvcd)  //  일정구분,
			;data.attach(Action.delete);
			data.execute();
			System.out.println("delete 완료");
		for (SqlResultRow row:map) {
				data.param
					.table("prjt_dsig_schd"												)
					.where("where id             = :id									")
					.where("and   prjt_idcd      = :prjt_idcd							")
					.where("and   dsig_schd_dvcd = :dsig_schd_dvcd						")
					//
					.unique("id"				, row.fixParameter("id"					))	//  id,
					.unique("prjt_idcd"			, invc_numb)								//  프로젝트 번호,
					.unique("dsig_schd_dvcd"	, schd_dvcd)								//  일정구분,
					//
					.update("seqn"				, seqn++								)	/*  순번  */
					.update("dsig_schd_dvcd"	, row.getParameter("schd_dvcd"))			/*  name  */
					.update("name"				, row.getParameter("name"				))	/*  name  */
					.update("progress"			, row.getParameter("progress"			))	/*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"	))
					.update("relevance"			, row.getParameter("relevance"			))
					.update("type"				, row.getParameter("type"				))
					.update("typeld"			, row.getParameter("typeld"				))
					.update("description"		, row.getParameter("description"		))  /*   */
					.update("code"				, row.getParameter("code"				))  /*  코드  */
					.update("level"				, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"				))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"			))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"				))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
					.update("end"				, row.getParameter("end"				))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"	))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"		))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"			))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"			))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"				))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"			))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"		))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"			))  /*    */
					.update("endTime"			, row.getParameter("endTime"			))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"			))  /* 종료시간 */
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))  /* 종료시간 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, "0")
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("name")
												+ "	"
												+ invc_numb
												+ "	"
												+ row.fixParameter("id")
												)
					.insert("line_levl"			, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.modify);

				setAssigsProjectDesign(arg,data,row, invc_numb, schd_dvcd, row.getParameter("assigs", SqlResultMap.class));

		}
	data.execute();
	return null;
	}
	public SqlResultMap setAssigsProjectDesign(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, String invc_numb, String schd_dvcd, SqlResultMap map) throws Exception {
		data.param
			.table("prjt_dsig_assigs")
			.where("where id              = :id					")
			.where("and   prjt_idcd       = :prjt_idcd			")
			.where("and   dsig_schd_dvcd  = :dsig_schd_dvcd		")
			//
			.unique("id"				, mst.fixParameter("id"))
			.unique("prjt_idcd"			, invc_numb)
			.unique("dsig_schd_dvcd"	, schd_dvcd)
		;data.attach(Action.delete);
		for(SqlResultRow row:map){
				data.param
					.table("prjt_dsig_assigs								")
					.where("where id              = :id						")
					.where("and   resourceId      = :resourceId				")
					.where("and   prjt_idcd       = :prjt_idcd				")
					.where("and   dsig_schd_dvcd  = :dsig_schd_dvcd			")

					.unique("id"				, mst.fixParameter("id"))
					.unique("resourceId"		, row.fixParameter("resourceId"))
					.unique("prjt_idcd"			, invc_numb)
					.unique("dsig_schd_dvcd"	, schd_dvcd)

					.update("roleId"			, row.getParameter("roleId"))
					.update("effort"			, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}

	public SqlResultMap getGanttProjectWork(HttpRequestArgument arg) throws Exception {
		String invc_numb = arg.getParamText("invc_numb");
		String schd_dvcd = arg.getParamText("schd_dvcd");

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
			.query("select 																								")
			.query("        prjt_idcd       , work_schd_dvcd  , id                  , seqn        , cvic_idcd			")
			.query("      , name            , progress        , progressbyworklog   , relevance   , type				")
			.query("      , typeld          , description     , code                , level       , status				")
			.query("      , depends         , start           , duration            , end         , startismilestone	")
			.query("      , endismilestone  , collapsed       , canwrite            , canadd      , wkct_idcd			")
			.query("      , candelete       , canaddlssue     , haschild            , starttime   , endtime				")
		;
		data.param // 조회
			.where("from    prjt_work_schd																				")
			.where("where   1=1																							")
			.where("and     prjt_idcd      = :prjt_idcd 		", invc_numb)
			.where("and     work_schd_dvcd = :work_schd_dvcd	", schd_dvcd)
			.where("order by seqn																						")
		;
		return data.selectForMap();
	}
	public SqlResultMap getGanttResource(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param // 조회
			.query("select  *														")
		;
		data.param // 조회
			.where("FROM (															")
			.where("select  cvic_idcd as id											")
			.where("      , cvic_name as name										")
			.where("      , '1'       as dvcd										")
			.where("from    cvic_mast												")
			.where("where   wkct_idcd = :wkct_idcd1	",	arg.getParamText("wkct_idcd"))
			.where("union all														")
			.where("select  empy_idcd as id											")
			.where("      , empy_name as name										")
			.where("      , '2'       as dvcd										")
			.where("from    wkct_mans												")
			.where("where   wkct_idcd = :wkct_idcd2	",	arg.getParamText("wkct_idcd"))
			.where(") a																")
		;
		return data.selectForMap();
	}


	public SqlResultMap getGanttWkct(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param // 조회
			.query("select  *														")
		;
		data.param // 조회
			.where("FROM (															")
			.where("select wkct_idcd  as idcd										")
			.where("     , wkct_code  as code										")
			.where("     , wkct_name  as name										")
			.where("     , '0'        as dvcd										")
			.where("from   wkct_mast												")
			.where("where  line_stat < '2'											")
			.where("and    rslt_rept_yorn = '1'										")
			.where(") a																")
		;
		return data.selectForMap();
	}


	public SqlResultMap getAssigsProjectWork(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("select *																	")
		;
		data.param // 조회
			.where("from    prjt_work_assigs													")
			.where("where   1=1																	")
			.where("and     prjt_idcd = :prjt_idcd ", arg.getParameter("invc_numb"))
		;

		return data.selectForMap();
	}
	public SqlResultMap setGanttProjectWork(HttpRequestArgument arg) throws Exception {
		int seqn = 1;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		String invc_numb = arg.getParamText("invc_numb");
		data.param
			.table("prjt_work_schd														")
			.where("where prjt_idcd = :prjt_idcd										")

			.unique("prjt_idcd"			, invc_numb)  //프로젝트 번호,
			;data.attach(Action.delete);
			data.execute();
			System.out.println("delete 완료");
		for (SqlResultRow row:map) {
				data.param
					.table("prjt_work_schd"												)
					.where("where id        = :id										")
					.where("and   prjt_idcd = :prjt_idcd								")
					//
					.unique("id"				, row.fixParameter("id"					))  //id,
					.unique("prjt_idcd"			, invc_numb								)  //프로젝트 번호,
					//
					.update("seqn"				, seqn++								)  /*  순번  */
					.update("work_schd_dvcd"	, "1000")  /*  name  */
					.update("name"				, row.getParameter("name"				))  /*  name  */
					.update("progress"			, row.getParameter("progress"			))  /*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"	))
					.update("relevance"			, row.getParameter("relevance"			))
					.update("type"				, row.getParameter("type"				))
					.update("typeld"			, row.getParameter("typeld"				))
					.update("description"		, row.getParameter("description"		))  /*   */
					.update("code"				, row.getParameter("code"				))  /*  코드  */
					.update("level"				, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"				))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"			))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"				))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
					.update("end"				, row.getParameter("end"				))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"	))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"		))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"			))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"			))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"				))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"			))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"		))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"			))  /*    */
					.update("endTime"			, row.getParameter("endTime"			))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"			))  /* 종료시간 */
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))  /* 종료시간 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("line_stat"			, "0")
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("name")
												+ "	"
												+ invc_numb
												+ "	"
												+ row.fixParameter("id")
												)
					.insert("line_levl"			, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.modify);

				setAssigsProjectWork(arg,data,row,row.getParameter("assigs", SqlResultMap.class));

		}
	data.execute();
	return null;
	}
	public SqlResultMap setAssigsProjectWork(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, SqlResultMap map) throws Exception {
		String invc_numb = arg.getParamText("invc_numb");
		data.param
			.table("prjt_work_assigs")
			.where("where id  = :id")
			.where("and   prjt_idcd  = :prjt_idcd")
			.unique("id"			, mst.fixParameter("id"))
			.unique("prjt_idcd"		, invc_numb)
		;data.attach(Action.delete);
		for(SqlResultRow row:map){
				data.param
					.table("prjt_work_assigs")
					.where("where id	= :id" )
					.where("and   resourceId	= :resourceId" )
					.where("and   prjt_idcd     = :prjt_idcd" )

					.unique("id"				, mst.fixParameter("id"))
					.unique("resourceId"		, row.fixParameter("resourceId"))
					.unique("prjt_idcd"			, invc_numb)

					.update("roleId"			, row.getParameter("roleId"))
					.update("effort"			, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}
	public SqlResultMap getGanttProjectDesign1(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
		.query("select 																								")
		.query("        pjod_idcd       , dsig_schd_dvcd  , id                  , seqn								")
		.query("      , name            , progress        , progressbyworklog   , relevance   , type				")
		.query("      , typeld          , description     , code                , level       , status				")
		.query("      , depends         , start           , duration            , end         , startismilestone	")
		.query("      , endismilestone  , collapsed       , canwrite            , canadd      , wkct_idcd			")
		.query("      , candelete       , canaddlssue     , haschild            , starttime   , endtime				")
		.query("      , wkct_idcd       , rsps_name       , ivst_pcnt           , need_mnhr   , chge_coef			")
		;
		data.param // 조회
		.where("from    pjod_dsig_schd																				")
		.where("where   1=1																							")
		.where("and     pjod_idcd      = :pjod_idcd ", arg.getParameter("invc_numb"))
		.where("and     dsig_schd_dvcd = :schd_dvcd ", arg.getParameter("schd_dvcd"))
		.where("order by seqn																						")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigsProjectDesign1(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
		.query("select *																	")
		;
		data.param // 조회
		.where("from    pjod_dsig_assigs													")
		.where("where   1=1																	")
		.where("and     pjod_idcd = :pjod_idcd ", arg.getParameter("invc_numb"))
		;

		return data.selectForMap();
	}
	public SqlResultMap setGanttProjectDesign1(HttpRequestArgument arg) throws Exception {
		int seqn = 1;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		String invc_numb = arg.getParamText("invc_numb");
		String schd_dvcd = arg.getParamText("schd_dvcd");
		data.param
		.table("pjod_dsig_schd														")
		.where("where pjod_idcd = :pjod_idcd										")
		.where("and   dsig_schd_dvcd = :dsig_schd_dvcd								")

		.unique("pjod_idcd"			, invc_numb)  //  프로젝트 번호,
		.unique("dsig_schd_dvcd"	, schd_dvcd)  //  일정구분,
		;data.attach(Action.delete);
		data.execute();
		System.out.println("delete 완료");
		for (SqlResultRow row:map) {
			data.param
			.table("pjod_dsig_schd"												)
			.where("where id             = :id									")
			.where("and   pjod_idcd      = :pjod_idcd							")
			.where("and   dsig_schd_dvcd = :dsig_schd_dvcd						")
			//
			.unique("id"				, row.fixParameter("id"					))	//  id,
			.unique("pjod_idcd"			, invc_numb)								//  프로젝트 번호,
			.unique("dsig_schd_dvcd"	, schd_dvcd)								//  일정구분,
			//
			.update("seqn"				, seqn++								)	/*  순번  */
			.update("dsig_schd_dvcd"	, row.getParameter("schd_dvcd"))			/*  name  */
			.update("name"				, row.getParameter("name"				))	/*  name  */
			.update("progress"			, row.getParameter("progress"			))	/*  진행률  */
			.update("progressByWorklog"	, row.getParameter("progressByWorklog"	))
			.update("relevance"			, row.getParameter("relevance"			))
			.update("type"				, row.getParameter("type"				))
			.update("typeld"			, row.getParameter("typeld"				))
			.update("description"		, row.getParameter("description"		))  /*   */
			.update("code"				, row.getParameter("code"				))  /*  코드  */
			.update("level"				, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
			.update("status"			, row.getParameter("status"				))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
			.update("depends"			, row.getParameter("depends"			))  /*  종속관계 및 진행관계 */
			.update("start"				, row.getParameter("start"				))  /*  시작일  */
			.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
			.update("end"				, row.getParameter("end"				))  /*  종료일자  */
			.update("startismilestone"	, row.getParameter("startismilestone"	))  /*    */
			.update("endismilestone"	, row.getParameter("endismilestone"		))  /*    */
			.update("collapsed"			, row.getParameter("collapsed"			))  /*    */
			.update("canWrite"			, row.getParameter("canWrite"			))  /*    */
			.update("canAdd"			, row.getParameter("canAdd"				))  /*   */
			.update("canDelete"			, row.getParameter("canDelete"			))  /*    */
			.update("canaddlssue"		, row.getParameter("canaddlssue"		))  /*    */
			.update("hasChild"			, row.getParameter("hasChild"			))  /*    */
			.update("endTime"			, row.getParameter("endTime"			))  /* 시작시간 */
			.update("startTime"			, row.getParameter("startTime"			))  /* 종료시간 */
			.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))  /* 종료시간 */
			.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
			.update("line_stat"			, "0")
			.update("user_memo"			, row.getParameter("user_memo"))
			.update("find_name"			, row.getParameter("name")
					+ "	"
					+ invc_numb
					+ "	"
					+ row.fixParameter("id")
					)
					.insert("line_levl"			, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

					;data.attach(Action.modify);

					setAssigsProjectDesign1(arg,data,row, invc_numb, schd_dvcd, row.getParameter("assigs", SqlResultMap.class));

		}
		data.execute();
		return null;
	}
	public SqlResultMap setAssigsProjectDesign1(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, String invc_numb, String schd_dvcd, SqlResultMap map) throws Exception {
		data.param
		.table("pjod_dsig_assigs")
		.where("where id              = :id					")
		.where("and   pjod_idcd       = :pjod_idcd			")
		.where("and   dsig_schd_dvcd  = :dsig_schd_dvcd		")
		//
		.unique("id"				, mst.fixParameter("id"))
		.unique("pjod_idcd"			, invc_numb)
		.unique("dsig_schd_dvcd"	, schd_dvcd)
		;data.attach(Action.delete);

		for(SqlResultRow row:map){
			data.param
			.table("pjod_dsig_assigs								")
			.where("where id              = :id						")
			.where("and   resourceId      = :resourceId				")
			.where("and   pjod_idcd       = :pjod_idcd				")
			.where("and   dsig_schd_dvcd  = :dsig_schd_dvcd			")

			.unique("id"				, mst.fixParameter("id"))
			.unique("resourceId"		, row.fixParameter("resourceId"))
			.unique("pjod_idcd"			, invc_numb)
			.unique("dsig_schd_dvcd"	, schd_dvcd)

			.update("roleId"			, row.getParameter("roleId"))
			.update("effort"			, row.getParameter("effort"))

			;data.attach(Action.modify);
		}
		return null ;
	}
	public SqlResultMap getGanttProjectWork1(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
			.query("select 																								")
			.query("        pjod_idcd       , work_schd_dvcd  , id                  , seqn								")
			.query("      , name            , progress        , progressbyworklog   , relevance   , type				")
			.query("      , typeld          , description     , code                , level       , status				")
			.query("      , depends         , start           , duration            , end         , startismilestone	")
			.query("      , endismilestone  , collapsed       , canwrite            , canadd      , wkct_idcd			")
			.query("      , candelete       , canaddlssue     , haschild            , starttime   , endtime				")
			.query("      , wkct_idcd       , item_idcd       , prnt_idcd           , work_item_idcd,line_levl			")
			.query("      , bomt_seqn       , work_ordr_dvcd  , ordr_degr												")
		;
		data.param // 조회
			.where("from    pjod_work_schd																				")
			.where("where   1=1																							")
			.where("and     pjod_idcd      = :pjod_idcd      " , arg.getParameter("invc_numb"							))
			.where("and     work_schd_dvcd = :schd_dvcd      " , arg.getParameter("schd_dvcd"							))
			.where("and     work_ordr_dvcd = :work_ordr_dvcd " , arg.getParameter("work_ordr_dvcd"						))
			.where("and     ordr_degr = :ordr_degr           " , arg.getParameter("ordr_degr"							))
			.where("and     level <= 2 																					")
			.where("order by seqn																						")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigsProjectWork1(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
		.query("select *																		")
		;
		data.param // 조회
		.where("from    pjod_work_assigs														")
		.where("where   1=1																		")
		.where("and     pjod_idcd      = :pjod_idcd ",      arg.getParameter("invc_numb"		))
		.where("and     work_schd_dvcd = :schd_dvcd ",      arg.getParameter("schd_dvcd"		))
		.where("and     work_ordr_dvcd = :work_ordr_dvcd ", arg.getParameter("work_ordr_dvcd"	))
		.where("and     ordr_degr = :ordr_degr ", arg.getParameter("ordr_degr"))
		;
		return data.selectForMap();
	}
	public SqlResultMap gantt_query_1(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("call gantt_query_1(														 ")
			.query("                    :title              ",      arg.getParameter("title" ))
			.query("                  , :fr_dt              ",      arg.getParameter("fr_dt" ))
			.query("                  , :to_dt              ",      arg.getParameter("to_dt" ))
			.query("                  , :source            ",      arg.getParameter("source"))
			.query(")																		 ")
		;
		return data.selectForMap();
	}
	public SqlResultMap setGanttProjectWork1(HttpRequestArgument arg) throws Exception {
		int seqn = 0;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		String invc_numb = arg.getParamText("invc_numb");
		String schd_dvcd = arg.getParamText("schd_dvcd");
		data.param
			.table("pjod_work_schd														")
			.where("where pjod_idcd = :pjod_idcd										")
			.where("and   line_levl <= 3												")
			.where("and   work_schd_dvcd = :work_schd_dvcd								")

			.unique("pjod_idcd"			, invc_numb)  //  프로젝트 번호,
			.unique("work_schd_dvcd"	, schd_dvcd)  //  일정구분,
		;data.attach(Action.delete);
		data.execute();
		System.out.println("delete 완료");
		for (SqlResultRow row:map) {
			if(!row.getParamText("seqn").equals("")){
				seqn = Integer.parseInt(row.getParamText("seqn"));
			}else{
				seqn++;
			}
				data.param
					.table("pjod_work_schd"												)
					.where("where id             = :id									")
					.where("and   pjod_idcd      = :pjod_idcd							")
					.where("and   work_schd_dvcd = :work_schd_dvcd						")
					//
					.unique("id"				, row.fixParameter("id"					))	//  id,
					.unique("pjod_idcd"			, invc_numb)								//  프로젝트 번호,
					.unique("work_schd_dvcd"	, schd_dvcd)								//  일정구분,
					//
					.update("seqn"				, seqn									)	/*  순번  */
//					.update("seqn"				, row.getParameter("seqn"))					/*  순번  */
					.update("work_schd_dvcd"	, row.getParameter("schd_dvcd"))			/*  name  */
					.update("name"				, row.getParameter("name"				))	/*  name  */
					.update("progress"			, row.getParameter("progress"			))	/*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"	))
					.update("relevance"			, row.getParameter("relevance"			))
					.update("type"				, row.getParameter("type"				))
					.update("typeld"			, row.getParameter("typeld"				))
					.update("description"		, row.getParameter("description"		))  /*   */
					.update("code"				, row.getParameter("code"				))  /*  코드  */
					.update("level"				, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"				))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"			))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"				))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
					.update("end"				, row.getParameter("end"				))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"	))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"		))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"			))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"			))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"				))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"			))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"		))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"			))  /*    */
					.update("endTime"			, row.getParameter("endTime"			))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"			))  /* 종료시간 */
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))  /* 종료시간 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("work_item_idcd"	, row.getParameter("work_item_idcd"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("line_stat"			, "0")
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("name")
												+ "	"
												+ invc_numb
												+ "	"
												+ row.fixParameter("id")
												)
					.insert("line_levl"			, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.modify);

				if ("3".equals(row.getParameter("level"	))) {
					data.param
						.table("pjod_work_schd"												)
						.where("where level  = 4											")
						.where("and   pjod_idcd      = :pjod_idcd							")
						.where("and   prnt_idcd      = :prnt_idcd							")
						.where("and   work_schd_dvcd = :work_schd_dvcd						")
						//
						.unique("prnt_idcd"			, row.getParameter("item_idcd"))
						.unique("pjod_idcd"			, invc_numb)								//  프로젝트 번호,
						.unique("work_schd_dvcd"	, schd_dvcd)								//  일정구분,
						//
						.update("start"				, row.getParameter("start"				))  /*  시작일  */
						.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
						.update("end"				, row.getParameter("end"				))  /*  종료일자  */
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);
				}



				setAssigsProjectWork1(arg,data,row, invc_numb, schd_dvcd, row.getParameter("assigs", SqlResultMap.class));

		}
	data.execute();
	return null;
	}
	public SqlResultMap getGanttProjectWork1_2(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");

		data.param // 조회
			.query("select 																								")
			.query("        pjod_idcd       , work_schd_dvcd  , id                  , seqn        , cvic_idcd			")
			.query("      , name            , progress        , progressbyworklog   , relevance   , type				")
			.query("      , typeld          , description     , code                , level       , status				")
			.query("      , depends         , start           , duration            , end         , startismilestone	")
			.query("      , endismilestone  , collapsed       , canwrite            , canadd      , wkct_idcd			")
			.query("      , candelete       , canaddlssue     , haschild            , starttime   , endtime				")
			.query("      , wkct_idcd       , item_idcd       , prnt_idcd           , work_item_idcd,line_levl			")
			.query("      , bomt_seqn       , work_ordr_dvcd  , ordr_degr           , otod_yorn   						")
		;
		data.param // 조회
			.where("from    pjod_work_schd																				")
			.where("where   1=1																							")
			.where("and     pjod_idcd      = :pjod_idcd ", arg.getParameter("invc_numb"))
			.where("and     work_schd_dvcd = :schd_dvcd ", arg.getParameter("schd_dvcd"))
			.where("and     work_ordr_dvcd = :work_ordr_dvcd ", arg.getParameter("work_ordr_dvcd"))
			.where("and     ordr_degr = :ordr_degr ", arg.getParameter("ordr_degr"))
			.where("order by seqn																						")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigsProjectWork1_2(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
			.query("select *																	")
		;
		data.param // 조회
			.where("from    pjod_work_assigs													")
			.where("where   1=1																	")
			.where("and     pjod_idcd      = :pjod_idcd ",      arg.getParameter("invc_numb")	)
			.where("and     work_schd_dvcd = :schd_dvcd ",      arg.getParameter("schd_dvcd")	)
			.where("and     work_ordr_dvcd = :work_ordr_dvcd ", arg.getParameter("work_ordr_dvcd"))
			.where("and     ordr_degr = :ordr_degr ", arg.getParameter("ordr_degr"))
		;

		return data.selectForMap();
	}
	public SqlResultMap setGanttProjectWork1_2(HttpRequestArgument arg) throws Exception {
		int seqn = 1;
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		String invc_numb = arg.getParamText("invc_numb");
		String schd_dvcd = arg.getParamText("schd_dvcd");
		String updt_idcd = arg.getParamText("updt_idcd");
		data.param
			.table("pjod_work_schd														")
			.where("where pjod_idcd = :pjod_idcd										")
			.where("and   work_schd_dvcd = :work_schd_dvcd								")
			.where("and   work_ordr_dvcd = :work_ordr_dvcd								")
			.where("and   ordr_degr = :ordr_degr								")

			.unique("pjod_idcd"			, invc_numb)  //  프로젝트 번호,
			.unique("work_schd_dvcd"	, schd_dvcd)  //  일정구분,
			.unique("work_ordr_dvcd"	, map.get(0).fixParameter("work_ordr_dvcd"))								//  일정구분,
			.unique("ordr_degr"			, map.get(0).fixParameter("ordr_degr"))								//  일정구분,
			;data.attach(Action.delete);
			data.execute();
			System.out.println("delete 완료");
		for (SqlResultRow row:map) {
				data.param
					.table("pjod_work_schd"												)
					.where("where id             = :id									")
					.where("and   pjod_idcd      = :pjod_idcd							")
					.where("and   work_schd_dvcd = :work_schd_dvcd						")
					.where("and   work_ordr_dvcd = :work_ordr_dvcd						")
					.where("and   ordr_degr       = :ordr_degr						")
					//
					.unique("id"				, row.fixParameter("id"					))	//  id,
					.unique("pjod_idcd"			, invc_numb)								//  프로젝트 번호,
					.unique("work_schd_dvcd"	, schd_dvcd)								//  일정구분,
					.unique("work_ordr_dvcd"	, map.get(0).fixParameter("work_ordr_dvcd"))								//  일정구분,
					.unique("ordr_degr"			, row.fixParameter("ordr_degr"))								//  일정구분,
					//
					.update("seqn"				, seqn++								)	/*  순번  */
					.update("work_schd_dvcd"	, row.getParameter("schd_dvcd"))			/*  name  */
					.update("name"				, row.getParameter("name"				))	/*  name  */
					.update("progress"			, row.getParameter("progress"			))	/*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"	))
					.update("relevance"			, row.getParameter("relevance"			))
					.update("type"				, row.getParameter("type"				))
					.update("typeld"			, row.getParameter("typeld"				))
					.update("description"		, row.getParameter("description"		))  /*   */
					.update("code"				, row.getParameter("code"				))  /*  코드  */
					.update("level"				, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"				))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"			))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"				))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"			))  /*  소요기간  */
					.update("end"				, row.getParameter("end"				))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"	))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"		))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"			))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"			))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"				))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"			))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"		))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"			))  /*    */
					.update("endTime"			, row.getParameter("endTime"			))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"			))  /* 종료시간 */
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"			))  /* 종료시간 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("work_item_idcd"	, row.getParameter("work_item_idcd"))
					.update("item_idcd"			, row.getParameter("item_idcd"))
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"))
					.update("otod_yorn"			, row.getParameter("otod_yorn"))
					.update("line_stat"			, "0")
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("name")
												+ "	"
												+ invc_numb
												+ "	"
												+ row.fixParameter("id")
												)
					.insert("line_levl"			, row.getParameter("level"				))  /*  들여쓰기(작업의 종속)  */
					.update("updt_idcd"			, updt_idcd)
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
				setAssigsProjectWork1_2(arg,data,row, invc_numb, schd_dvcd,map.get(0).fixParamText("work_ordr_dvcd"),row.getParamText("ordr_degr"), row.getParameter("assigs", SqlResultMap.class));
		}
		data.execute();
		data.param
			.query("call project_work_rebuild( :pjod_idcd		",invc_numb)
			.query("                         , :work_ordr_dvcd	",map.get(0).fixParameter("work_ordr_dvcd"))
			.query("                         , :ordr_degr  		",map.get(0).fixParameter("ordr_degr"))
			.query(")											")
		;data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setAssigsProjectWork1(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, String invc_numb, String schd_dvcd, SqlResultMap map) throws Exception {
		data.param
			.table("pjod_work_assigs")
			.where("where id              = :id					")
			.where("and   pjod_idcd       = :pjod_idcd			")
			.where("and   work_schd_dvcd  = :work_schd_dvcd		")
			//
			.unique("id"				, mst.fixParameter("id"))
			.unique("pjod_idcd"			, invc_numb)
			.unique("work_schd_dvcd"	, schd_dvcd)
		;data.attach(Action.delete);

		for(SqlResultRow row:map){
				data.param
					.table("pjod_work_assigs								")
					.where("where id              = :id						")
					.where("and   resourceId      = :resourceId				")
					.where("and   pjod_idcd       = :pjod_idcd				")
					.where("and   work_schd_dvcd  = :work_schd_dvcd			")

					.unique("id"				, mst.fixParameter("id"))
					.unique("resourceId"		, row.fixParameter("resourceId"))
					.unique("pjod_idcd"			, invc_numb)
					.unique("work_schd_dvcd"	, schd_dvcd)

					.update("roleId"			, row.getParameter("roleId"))
					.update("effort"			, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}
	public SqlResultMap setAssigsProjectWork1_2(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, String invc_numb, String schd_dvcd,String work_ordr_dvcd,String ordr_degr, SqlResultMap map) throws Exception {
		data.param
			.table("pjod_work_assigs")
			.where("where id              = :id					")
			.where("and   pjod_idcd       = :pjod_idcd			")
			.where("and   work_schd_dvcd  = :work_schd_dvcd		")
			.where("and   work_ordr_dvcd  = :work_ordr_dvcd		")
			.where("and   ordr_degr  = :ordr_degr		")
			//
			.unique("id"				, mst.fixParameter("id"))
			.unique("pjod_idcd"			, invc_numb)
			.unique("work_schd_dvcd"	, schd_dvcd)
			.unique("work_ordr_dvcd"	, work_ordr_dvcd)
			.unique("ordr_degr"	, ordr_degr)
		;data.attach(Action.delete);

		for(SqlResultRow row:map){
				data.param
					.table("pjod_work_assigs								")
					.where("where id              = :id						")
					.where("and   resourceId      = :resourceId				")
					.where("and   pjod_idcd       = :pjod_idcd				")
					.where("and   work_schd_dvcd  = :work_schd_dvcd			")
					.where("and   work_ordr_dvcd  = :work_ordr_dvcd		")
					.where("and   ordr_degr  = :ordr_degr		")

					.unique("id"				, mst.fixParameter("id"))
					.unique("resourceId"		, row.fixParameter("resourceId"))
					.unique("pjod_idcd"			, invc_numb)
					.unique("work_schd_dvcd"	, schd_dvcd)
					.unique("work_ordr_dvcd"	, work_ordr_dvcd)
					.unique("ordr_degr"	, ordr_degr)

					.update("roleId"			, row.getParameter("roleId"))
					.update("effort"			, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hq_id")+".POS");
		data.param
		.query("select imge_1fst,imge_2snd			 						")
		;
		data.param //퀴리문
		.where("from pjod_work_schd											")
		.where("where     1=1												")
		.where("and pjod_idcd = :pjod_idcd	" , arg.getParameter("pjod_idcd"))
		.where("and id = :id				" , arg.getParameter("id"))
		.where("and ordr_degr = :ordr_degr	" , arg.getParameter("ordr_degr"))
		;
		return data.selectForMap();
	}

}
