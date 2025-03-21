package com.sky.system.custom.iypkg.prod.worklist3;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("iypkg.WorkList3Service")
public class WorkList3Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("with cte as (																									")
			.where("     select  a.invc_numb       , a.line_seqn       , a.istt_qntt       , w.wkct_name							")
			.where("           , b.invc_date       , a.istt_pric       , a.istt_amnt       , a.istt_vatx      , t.wkct_idcd			")
			.where("           , a.ttsm_amnt       , c.cstm_name       , json_value(a.json_data , '$**.subt_qntt') as subt_qntt		")
			.where("     from purc_istt_item a																						")
			.where("     left outer join purc_istt_mast b on a.invc_numb = b.invc_numb												")
			.where("     left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd												")
			.where("     left outer join purc_ordr_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn			")
			.where("     left outer join purc_ordr_mast m on p.invc_numb = m.invc_numb												")
			.where("     left outer join boxx_acpt_bop  t on p.orig_invc_numb = t.invc_numb and p.orig_seqn = t.line_seqn			")
			.where("     left outer join wkct_mast      w on t.wkct_idcd = w.wkct_idcd												")
			.where("     where 1=1																									")
			.where("     and   m.offr_dvcd = '3000'																					")
			.where("     and   json_value(a.json_data , '$**.acpt_numb')  = :invc_numb		" , arg.getParamText("invc_numb"))
			.where("     and   a.find_name like %:find_name			" , arg.getParamText("find_name"))
			.where("     and   b.invc_date >= :invc_date1			" , arg.getParamText("invc_date1"))
			.where("     and   b.invc_date <= :invc_date2			" , arg.getParamText("invc_date2"))
			.where("     and   b.cstm_idcd  = :cstm_idcd			" , arg.getParamText("cstm_idcd"))
			.where("     and   t.wkct_idcd  = :wkct_idcd			" , arg.getParamText("wkct_idcd"))
			.where(")																												")
		;

		data.param
			.where(" select  a.invc_numb															")
			.where("       , a.line_seqn															")
			.where("       , a.wkct_idcd															")
			.where("       , a.wkct_name															")
			.where("       , a.cstm_name															")
			.where("       , a.istt_qntt															")
			.where("       , a.subt_qntt															")
			.where("       , a.istt_pric															")
			.where("       , a.istt_amnt															")
			.where("       , a.istt_vatx															")
			.where("       , a.ttsm_amnt															")
			.where("       , 1 as rnum																")
			.where("       , null as cnt															")
			.where(" from cte a																		")
		;
			if(arg.getParamText("chk" ).contains("1")){			//소계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , a.wkct_idcd															")
					.where("       , concat(a.wkct_name,' 계') as wkct_name									")
					.where("       , null as cstm_name														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.istt_vatx) as istt_vatx											")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , 2 as rnum																")
					.where("       , count(*) as cnt														")
					.where(" from cte a																		")
					.where(" group by a.wkct_idcd															")
					.where(" having cnt > 1																	")
				;
			}
			if(arg.getParamText("chk" ).contains("2")){			//합계
				data.param
					.where(" union all																		")
					.where(" select  null as invc_numb														")
					.where("       , null as line_seqn														")
					.where("       , max(a.wkct_idcd) as wkct_idcd											")
					.where("       , '합계' as wkct_name														")
					.where("       , null as cstm_name														")
					.where("       , sum(a.istt_qntt) as istt_qntt											")
					.where("       , sum(a.subt_qntt) as subt_qntt											")
					.where("       , null as istt_pric														")
					.where("       , sum(a.istt_amnt) as istt_amnt											")
					.where("       , sum(a.istt_vatx) as istt_vatx											")
					.where("       , sum(a.ttsm_amnt) as ttsm_amnt											")
					.where("       , 3 as rnum																")
					.where("       , null as cnt															")
					.where(" from cte a																		")
				;
			}
		data.param
			.where(" ORDER BY wkct_idcd, rnum																")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
