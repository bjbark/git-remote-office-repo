package com.sky.system.custom.komec.eis.eisreport;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service("komec.EisReportService")
public class EisReportService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");



		data.param
			.query("select   a.invc_numb      , a.pdod_date     , i.item_name				")
			.query("       , a.indn_qntt      , ifnull(a.prod_qntt,0) as prod_qntt			")
			.query("       , a.prog_stat_dvcd , sum(ifnull(qc.poor_qntt,0)) as poor_qntt	")
			.query("       , cv.cvic_name													")

		;
		data.param
			.where("from pror_mast a 														")
			.where("left outer join pror_item p on a.invc_numb = p.invc_numb				")
			.where("left outer join cvic_mast cv on p.cvic_idcd = cv.cvic_idcd				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd				")
			.where("left outer join work_book_qc qc on a.invc_numb = qc.invc_numb			")
			.where("where 1 = 1																")
			.where("and   a.pdod_date >= :invc_date1	",arg.getParameter("invc_date1"))
			.where("and   a.pdod_date <= :invc_date2	",arg.getParameter("invc_date2"))
			.where("and   cv.cvic_idcd <= :cvic_idcd	",arg.getParameter("cvic_idcd"))
			.where("group by invc_numb order by pdod_date asc								")
		;
		return data.selectForMap();
	}
	public SqlResultMap getProgress(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   c.cvic_name														")
			.query("       , ifnull(( select s.item_name										")
			.query("	       from pror_mast pr												")
			.query("	       left outer join sscd_view s on pr.prog_stat_dvcd = item_code 	")
			.query("	       		                    and s.sscd_code = 'prog_stat_dvcd'		")
			.query("	       where pr.cvic_idcd = a.cvic_idcd									")
//			.query("	       and   date_format(pr.strt_dttm,'%Y-%m-%d') = CURRENT_DATE() 		")
			.query("	       order by pr.updt_dttm desc										")
			.query("	       limit 1															")
			.query("	   ),'대기') as prog_stat_name											")
			.query("	   , sum(ifnull(a.indn_qntt,0)) as indn_qntt							")
			.query("	   , sum(ifnull(stok_qntt,0)) as prod_qntt								")
			.query("	   , sum(ifnull(q.poor_qntt,0)) as poor_qntt							")
		;
		data.param
			.where("from cvic_mast c												")
			.where("left outer join pror_mast a on a.cvic_idcd = c.cvic_idcd		")
			.where("left outer join lot_isos_sum s on a.lott_numb = s.lott_numb		")
			.where("left outer join work_book_qc q on a.invc_numb = q.invc_numb		")
			.where("where 1 = 1														")
			.where("and   a.pdsd_date >= :invc_date1 	",arg.getParameter("invc_date1"))
			.where("and   a.pdsd_date <= :invc_date2 	",arg.getParameter("invc_date2"))
			.where("and   c.cvic_kind_dvcd = '1000'									")
			.where("group by c.cvic_idcd											")
			.where("order by c.cvic_idcd											")
		;
		return data.selectForMap();
	}
	public SqlResultMap getGraph(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.dttm       , temperature , rpm         , a.wkct_name						")
			.query("     , a.temp_valu  , a.rpm_valu  , a.temp_appr , a.rpm_appr						")
		;
		data.param
			.where("from(																				")
			.where("select   date_format(b.TIMEPOINT,'%Y%m%d%H%i') as dttm 							 	")
			.where("       , if(b.param2=65535,0,b.param2) * (1/pow(10,b.param1)) as rpm 				")
			.where("       , w.wkct_name as wkct_name 													")
			.where("       , json_value(wr.json_data,'$.temp_valu' ) as temp_valu 						")
			.where("       , json_value(wr.json_data,'$.rpm_valu' ) as rpm_valu 						")
			.where("       , json_value(wr.json_data,'$.temp_appr' ) as temp_appr 						")
			.where("       , json_value(wr.json_data,'$.rpm_appr' ) as rpm_appr							")
			.where("from WT_DATA_IN b																	")
			.where("left outer join WT_DEVICES d on b.device = d.device									")
			.where("left outer join cvic_mast  c on substr(c.cvic_code,1,4) = substr(d.`NAME`,1,4)		")
			.where("left outer join pror_item p on date_format(b.TIMEPOINT,'%Y%m%d%H%i%s') between p.work_strt_dttm ")
			.where("and ifnull(p.work_endd_dttm, date_format(now(),'%Y%m%d%H%i%s'))						")
			.where("and p.work_strt_dttm is not null													")
			.where("and p.cvic_idcd = c.cvic_idcd														")
			.where("left outer join wkct_mast w on p.wkct_idcd = w.wkct_idcd							")
			.where("left outer join wkfw_rout wr on p.wkct_idcd = wr.wkct_idcd and p.wkfw_idcd = wr.wkfw_idcd and p.wkfw_seqn = wr.line_seqn	")
			.where("where 1 = 1																			")
			.where("and   date_format(b.TIMEPOINT,'%Y%m%d%H%i') >= :invc_date1 	",arg.getParameter("invc_date1")+"000000")
			.where("and   date_format(b.TIMEPOINT,'%Y%m%d%H%i') <= :invc_date2 	",arg.getParameter("invc_date2")+"235959")
			.where("and   c.cvic_idcd = :cvic_idcd								",arg.getParameter("cvic_idcd"))
			.where("and   instr(d.DESCR,'RPM') >0														")
			.where("group by dttm																		")
			.where("having dttm is not null																")
			.where(") a																					")
			.where("left outer join  (																	")
			.where("select   date_format(b.TIMEPOINT,'%Y%m%d%H%i') as dttm 								")
			.where("       , if(b.param2=65535,0,b.param2) * (1/pow(10,b.param1)) as temperature 		")
			.where("from WT_DATA_IN b																	")
			.where("left outer join WT_DEVICES d on b.device = d.device									")
			.where("left outer join cvic_mast  c on substr(c.cvic_code,1,4) = substr(d.`NAME`,1,4)		")
			.where("where 1 = 1																			")
			.where("and   date_format(b.TIMEPOINT,'%Y%m%d') >= :invc_date3 	",arg.getParameter("invc_date1"))
			.where("and   date_format(b.TIMEPOINT,'%Y%m%d') <= :invc_date4 	",arg.getParameter("invc_date2"))
			.where("and   c.cvic_idcd = :cvic_idcd2							",arg.getParameter("cvic_idcd"))
			.where("and   instr(d.DESCR,'온도') >0														")
			.where("group by dttm																		")
			.where("having dttm is not null																")
			.where(") b on a.dttm = b.dttm																")
		;
		return data.selectForMap();
	}

}
