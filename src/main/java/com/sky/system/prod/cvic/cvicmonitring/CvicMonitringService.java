package com.sky.system.prod.cvic.cvicmonitring;

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
public class CvicMonitringService extends DefaultServiceHandler {

	public SqlResultMap getTimeLine(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
		.query("SELECT  c.cvic_name																")
		.query("      , case when a.cvic_stat_dvcd = '3' then '진행중' 							")
		.query("             when a.cvic_stat_dvcd != '3' then '중단' 							")
		.query("             end as cvic_stat_dvcd 												")
		.query("      , CONCAT(DATE_FORMAT(a.invc_date,'%Y-%m-%d'),' ',time_format(a.strt_dttm,'%H:%i')) as strt_dttm	")
		.query("      , CONCAT(DATE_FORMAT(a.invc_date,'%Y-%m-%d'),' ',time_format(a.endd_dttm,'%H:%i')) as endd_dttm	")
		;
		data.param
		.where("from    work_book_cvic a									")
		.where("left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd		")
		.where("where	1=1													")
		.where("and     a.invc_date = :invc_date", arg.getParameter("invc_date"))
		.where("order by a.cvic_idcd,a.strt_dttm,a.endd_dttm				")
		;

		return data.selectForMap( );
	}
	public SqlResultMap getRunningData(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select * 																					")
		;
		data.param
			.where("from   ( SELECT  c.cvic_idcd   , a.invc_date    , '가공시간' as title						")
			.where("               , 1 as idx      , c.cvic_name			 									")
			.where("               , TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(									")
			.where("                                      TIMEDIFF(												")
			.where("                                                time_format(a.endd_dttm,'%H:%i:%s')			")
			.where("                                              , time_format(a.strt_dttm,'%H:%i:%s')			")
			.where("                                      )														")
			.where("                 ))),'%H:%i:%s') AS runn_data												")
			.where("         from    work_book_cvic a															")
			.where("                 left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd					")
			.where("         where	1=1																			")
			.where("         and     a.cvic_stat_dvcd in ('3')													")
			.where("         group by a.cvic_idcd,a.invc_date 													")
			.where("         union all 																			")
			.where("         SELECT  c.cvic_idcd    , a.invc_date     , '가동률' as title						")
			.where("               , 2 as idx      , null as cvic_name		 									")
			.where("               , CONCAT(IFNULL(ROUND(TIME_TO_SEC(SEC_TO_TIME(SUM( TIME_TO_SEC(				")
			.where("                                      TIMEDIFF(												")
			.where("                                                time_format(a.endd_dttm,'%H:%i:%s')			")
			.where("                                              , time_format(a.strt_dttm,'%H:%i:%s')			")
			.where("                 ))))																		")
			.where("               ) / (TIME_TO_SEC('24:00:00')*COUNT(DISTINCT a.cvic_idcd)) * 100,2),0),'%') AS runn_data	")
			.where("         from    work_book_cvic a															")
			.where("                 left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd					")
			.where("         where	1=1																			")
			.where("         and     a.cvic_stat_dvcd in ('3')													")
			.where("         group by a.cvic_idcd,a.invc_date 													")
			.where(") a 																						")
			.where("where 1=1 																					")
			.where("and     a.invc_date = :invc_date", arg.getParameter("invc_date"))
			.where("order by a.cvic_idcd , a.idx																")
		;

		return data.selectForMap( );
	}
	public SqlResultMap getRunnStopTime(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   ifnull(a.cvic_name,'null')  as cvic_name       , ifnull(a.runn_time,'0')  as runn_time  	")
			.query("       , ifnull(b.stop_time_perc,0)  as stop_time_perc  , ifnull(b.stop_time,0) as stop_time    	")
			.query("       , ifnull(a.runn_time_perc,0)  as runn_time_perc												")
		;
		data.param
			.where("from   ( SELECT a.cvic_idcd, c.cvic_name,a.invc_date										")
			.where("               , TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(									")
			.where("                                      TIMEDIFF(												")
			.where("                                                time_format(a.endd_dttm,'%H:%i:%s')			")
			.where("                                              , time_format(a.strt_dttm,'%H:%i:%s')			")
			.where("                                      )														")
			.where("                 ))),'%H:%i:%s') AS runn_time												")
			.where("               , IFNULL(TIME_TO_SEC(SEC_TO_TIME(SUM( TIME_TO_SEC(							")
			.where("                                                 TIMEDIFF(									")
			.where("                                                       time_format(a.endd_dttm,'%H:%i:%s')	")
			.where("                                                     , time_format(a.strt_dttm,'%H:%i:%s')	")
			.where("                   ))))																		")
			.where("                 ) / (TIME_TO_SEC('24:00:00')*COUNT(DISTINCT a.cvic_idcd)) * 100,0) AS runn_time_perc	")
			.where("         from    work_book_cvic a															")
			.where("                 left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd					")
			.where("         where	1=1																			")
			.where("         and     a.cvic_stat_dvcd in ('3')													")
			.where("and     a.invc_date = :invc_date1", arg.getParameter("invc_date"))
			.where(") a left outer join 																		")
			.where("( SELECT a.cvic_idcd, c.cvic_name,a.invc_date												")
			.where("        , TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(											")
			.where("                                 TIMEDIFF(													")
			.where("                                            time_format(a.endd_dttm,'%H:%i:%s')				")
			.where("                                          , time_format(a.strt_dttm,'%H:%i:%s')				")
			.where("                                 )															")
			.where("         ))),'%H:%i:%s') AS stop_time														")
			.where("         , IFNULL(TIME_TO_SEC(SEC_TO_TIME(SUM( TIME_TO_SEC(									")
			.where("                                             TIMEDIFF(										")
			.where("                                                       time_format(a.endd_dttm,'%H:%i:%s')	")
			.where("                                                     , time_format(a.strt_dttm,'%H:%i:%s')	")
			.where("           ))))																				")
			.where("         ) / (TIME_TO_SEC('24:00:00')*COUNT(DISTINCT a.cvic_idcd)) * 100,0) AS stop_time_perc	")
			.where("  from    work_book_cvic a																	")
			.where("          left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd							")
			.where("  where	1=1																					")
			.where("  and     a.cvic_stat_dvcd not in ('3')														")
			.where("  and     a.invc_date = :invc_date2", arg.getParameter("invc_date"))
			.where(") b on a.invc_date = b.invc_date															")
			.where("where 1=1 																					")
		;

		return data.selectForMap( );
	}
	public SqlResultMap getWorkTime(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("SELECT  c.cvic_name																")
			.query("      , IFNULL(TIME_TO_SEC(														")
			.query("             SEC_TO_TIME(														")
			.query("                  SUM(															")
			.query("                      TIME_TO_SEC(												")
			.query("                           TIMEDIFF(  time_format(a.endd_dttm,'%H:%i:%s')		")
			.query("                                    , time_format(a.strt_dttm,'%H:%i:%s')		")
			.query("                           )													")
			.query("                      )															")
			.query("                  )																")
			.query("             )																	")
			.query("        ) / TIME_TO_SEC('24:00:00')*100,0) AS timesum 							")
		;
		data.param
			.where("from    work_book_cvic a									")
			.where("left outer join cvic_mast c on a.cvic_idcd =c.cvic_idcd		")
			.where("where	1=1													")
			.where("and     a.invc_date = :invc_date", arg.getParameter("invc_date"))
			.where("and     a.cvic_stat_dvcd = '3'								")
			.where("group by a.cvic_idcd										")
			.where("order by a.cvic_idcd										")
		;

		return data.selectForMap( );
	}

}