package com.sky.system.workshop.eis.eisreport1;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service("workshop.eisreport1Service")
public class EisReport1Service extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.invc_date       , a.cstm_name        , a.cstm_idcd			")
			.query("        , a.deli_date        , a.esti_amnt       , b.volm_qntt        , b.ttle				")
			.query("        , b.prnt_colr_bacd   , b.item_lcls_idcd  , b.item_mcls_idcd   , b.item_scls_idcd	")
			.query("        , b.shet_size_dvcd   , b.esti_pric       , c.base_name as colr_name 				")
			.query("        , m.invc_date as dlvy_date															")
			.query("        , DATEDIFF (m.invc_date,a.invc_date  ) as need_dcnt									")
			.query("        , DATEDIFF (ifnull(m.invc_date,date_format(now(),'%Y%m%d')),a.deli_date  ) as dely_dcnt		")
		;
		data.param
			.where("from prnt_ordr_mast a																				")
			.where("left outer join prnt_ordr_item b 		on a.invc_numb		=  b.invc_numb							")
			.where("left outer join item_clss 		 	 c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss 		 	 c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss 		 	 c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join base_mast		 	  c on c.base_idcd		=  b.prnt_colr_bacd						")
			.where("left outer join sale_ostt_item	  s on s.acpt_numb = b.invc_numb and s.acpt_seqn = b.line_seqn 		")
			.where("left outer join sale_ostt_mast	  m on m.invc_numb = s.invc_numb 									")
			.where("where  1=1																							")
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.cofm_yorn = '1'																			")
			.where("and    a.line_stat  < 2																				")
			.where("group by a.invc_numb 																				")
			.where("order by a.invc_date,a.deli_date																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
