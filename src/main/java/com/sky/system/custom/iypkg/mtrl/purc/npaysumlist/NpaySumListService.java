package com.sky.system.custom.iypkg.mtrl.purc.npaysumlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class NpaySumListService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from ( 																											")
			.where("select   c.cstm_idcd      , c.cstm_name      , ifnull(a.istt_amnt,0) as istt_amnt								")
			.where("       , ifnull(a.istt_vatx,0) as istt_vatx  , ifnull(a.ttsm_amnt,0) as ttsm_amnt								")
			.where("       , ifnull(a.txbl_ttsm,0) as txbl_ttsm  , ifnull(b.carr_amnt,0) as carr_amnt								")
			.where("       , (ifnull(b.carr_amnt,0) + ifnull(a.ttsm_amnt,0) - ifnull(a.txbl_ttsm,0)) as unpay						")
			.where("       , ifnull(b.befr_pric,0) as befr_pric																		")
			.where("from cstm_mast c																								")
			.where("   left outer join ( select b.cstm_idcd   , b.invc_date															")
			.where("                          , ifnull(sum(a.istt_amnt),0) as istt_amnt												")
			.where("                          , ifnull(sum(a.istt_vatx),0) as istt_vatx												")
			.where("                          , ifnull(sum(a.ttsm_amnt),0) as ttsm_amnt												")
			.where("                          , ifnull(sum(t.ttsm_amnt),0) as txbl_ttsm												")
			.where("                     from purc_istt_item a																		")
			.where("                     left outer join purc_istt_mast b on a.invc_numb = b.invc_numb								")
			.where("                     left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where("                     where 1=1																					")
			.where("                     and  b.invc_date > :invc_date1			" , arg.getParamText("invc1_date"))
			.where("                     and  b.invc_date < :invc_date2			" , arg.getParamText("invc2_date"))
			.where("                     group by b.cstm_idcd																		")
			.where("                    ) a on c.cstm_idcd = a.cstm_idcd															")
			.where("   left outer join ( select b.cstm_idcd																			")
			.where("                          , sum(a.ttsm_amnt) - ifnull(sum(t.ttsm_amnt),0) as carr_amnt							")
			.where("                          , ( select (ifnull(sum(a.ttsm_amnt),0) - ifnull(sum(t.ttsm_amnt),0)) as price			")
			.where("                              from purc_istt_item a																")
			.where("                              left outer join purc_istt_mast z on a.invc_numb = z.invc_numb						")
			.where("                              left outer join txbl_item      t on t.orig_invc_numb = a.invc_numb and t.orig_invc_seqn = a.line_seqn	")
			.where("                              where 1=1																			")
			.where("                              and  z.cstm_idcd = b.cstm_idcd													")
			.where("                              and  substr(z.invc_date,1,6) = substr(:invc_date3,1,6)-1		" , arg.getParamText("invc1_date"))
			.where("                              group by z.cstm_idcd																")
			.where("                            ) as befr_pric																		")
			.where("                     from purc_istt_item a																		")
			.where("                     left outer join purc_istt_mast b on a.invc_numb = b.invc_numb								")
			.where("                     left outer join txbl_item      t on a.invc_numb = t.orig_invc_numb and a.line_seqn = t.orig_invc_seqn	")
			.where("                     where 1=1																					")
			.where("                     and  b.invc_date < :invc_date4			" , arg.getParamText("invc1_date"))
			.where("                     group by b.cstm_idcd																		")
			.where("                    ) b on c.cstm_idcd = b.cstm_idcd															")
			.where("where 1=1																										")
			.where("and c.puch_cstm_yorn = 1																						")
			.where("and c.find_name  like %:find_name%	", arg.getParamText("find_name" ))
			.where("and c.line_stat  < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and c.cstm_idcd >= :cstm_idcd1		" , arg.getParamText("cstm_idcd"))
			.where("and c.cstm_idcd <= :cstm_idcd2		" , arg.getParamText("cstm_idcd2"))
			.where(") a																												")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


}
