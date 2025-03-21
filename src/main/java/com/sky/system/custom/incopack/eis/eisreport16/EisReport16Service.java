package com.sky.system.custom.incopack.eis.eisreport16;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class EisReport16Service extends DefaultServiceHandler{
	@Autowired
	private HostPropertiesService property;

	// search
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select b.deli_date           , c.cstm_name           , i.item_code      , i.item_name	")
			.query("     , i.item_spec           , it.istt_chk as chk1   , p1.chk as chk2					")
			.query("     , p2.chk as chk3        , p3.chk as chk4        , sp.chk as chk6					")
		;
		data.param
			.where("from  acpt_item b 																		")
			.where("left outer join acpt_mast a on a.invc_numb = b.invc_numb								")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.where("left outer join item_mast i on b.item_idcd = i.item_idcd								")
			.where("left outer join (																		")
			.where("  select a.prnt_idcd, 1 as istt_chk 													")
			.where("	from ( select count(a.prnt_idcd) as cnt,a.prnt_idcd									")
			.where("	       from (																		")
			.where("				       select c.prnt_idcd, a.offr_qntt ,sum(b.istt_qntt) as istt_qntt	")
			.where("	             from purc_ordr_item a													")
			.where("	             left outer join purc_istt_item b on b.orig_invc_numb = a.invc_numb and b.orig_seqn = a.line_seqn")
			.where("	             left outer join purc_istt_mast c on b.invc_numb = c.invc_numb			")
			.where("	             group by c.prnt_idcd,b.item_idcd										")
			.where("         ) a																			")
			.where("	       where a.offr_qntt = a.istt_qntt												")
			.where("				 group by a.prnt_idcd													")
			.where("	) a																					")
			.where("	,( select count(a.prnt_idcd) as cnt,a.prnt_idcd										")
			.where("	   from purc_ordr_item a															")
			.where("		 group by a.prnt_idcd															")
			.where("	) b																					")
			.where("  where a.prnt_idcd = b.prnt_idcd														")
			.where("	and   a.cnt = b.cnt																	")
			.where(") it on it.prnt_idcd = a.invc_numb														")
			.where("left outer join (																		")
			.where("     select 1 as chk,pa.acpt_numb,pa.acpt_seqn											")
			.where("     from pror_item a																	")
			.where("     left outer join prod_plan p on a.invc_numb = p.prod_trst_numb						")
			.where("     left outer join prod_plan_acpt pa on p.invc_numb = pa.invc_numb					")
			.where("     and   a.wkct_idcd='WT016'															")
			.where(") p1 on a.invc_numb = p1.acpt_numb and b.line_seqn = p1.acpt_seqn						")
			.where("left outer join (																		")
			.where("     select 1 as chk,pa.acpt_numb,pa.acpt_seqn											")
			.where("     from pror_item a																	")
			.where("     left outer join prod_plan p on a.invc_numb = p.prod_trst_numb						")
			.where("     left outer join prod_plan_acpt pa on p.invc_numb = pa.invc_numb					")
			.where("		 left outer join pror_item c on p.prod_trst_numb = c.invc_numb					")
			.where("		 left outer join work_book d on c.invc_numb = d.wkod_numb and c.line_seqn = d.wkod_seqn")
			.where("	   where d.prog_stat_dvcd = 3														")
			.where("     and   a.wkct_idcd='A01'															")
			.where(") p2 on a.invc_numb = p2.acpt_numb and b.line_seqn = p2.acpt_seqn						")
			.where("left outer join (																		")
			.where("     select a.acpt_numb,a.acpt_seqn,1 as chk from prod_plan_acpt a						")
			.where("     left outer join prod_plan b on a.invc_numb = b.invc_numb							")
			.where("	   left outer join pror_item c on b.prod_trst_numb = c.invc_numb					")
			.where("	   left outer join (select * from wkfw_rout where last_wkct_yorn = 1) e on b.prod_line_idcd = e.wkfw_idcd")
			.where("	   left outer join work_book d on c.invc_numb = d.wkod_numb and c.line_seqn = d.wkod_seqn and e.wkct_Idcd = d.wkct_idcd")
			.where("	   where d.prog_stat_dvcd = 3														")
			.where("	   group by a.acpt_numb,a.acpt_seqn													")
			.where(") p3 on a.invc_numb = p3.acpt_numb and b.line_seqn = p3.acpt_seqn						")
			.where("left outer join (																		")
			.where("     select 1 as chk , a.acpt_numb ,a.acpt_seqn											")
			.where("		 from spts_item a																")
			.where("		 where (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0)) = 0						")
			.where(") sp on a.invc_numb = sp.acpt_numb and b.line_seqn = sp.acpt_seqn						")
			.where("where 1=1																				")
			.where("and b.deli_date >= :fr_dt",      arg.getParameter("fr_dt"								))
			.where("and b.deli_date <= :to_dt",      arg.getParameter("to_dt"								))
			.where("and c.cstm_idcd <= :cstm_idcd",  arg.getParameter("cstm_idcd"							))
			.where("and b.item_idcd <= :item_idcd",  arg.getParameter("item_idcd"							))
			.where("order by deli_date asc, cstm_name asc,item_name asc										")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// search

}
