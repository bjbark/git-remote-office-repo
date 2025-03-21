package com.sky.system.mtrl.project.prjtpurcordrlist2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PrjtPurcOrderList2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   b.prnt_idcd       , a.item_idcd    , sum(a.istt_qntt) as istt_qntt				")
			.query("       , sum(a.istt_vatx) as istt_vatx      , sum(a.istt_amnt) as istt_amnt				")
			.query("       , sum(a.ttsm_amnt) as ttsm_amnt 													")
			.query("       , b.cstm_idcd                        , c.cstm_name								")
		;
		data.param
			.where("from purc_istt_item a 																	")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd							")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd							")
			.where("where   1=1																				")
			.where("and		b.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     b.invc_date >= :st_dt           " , arg.getParamText("st_dt" ))
			.where("and     b.invc_date <= :ed_dt           " , arg.getParamText("ed_dt" ))
			.where("and     b.stot_dvcd = :stot_dvcd       " , arg.getParamText("stot_dvcd" ))
			.where("and     c.cstm_idcd  = :cstm_idcd       " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.item_idcd  = :item_idcd       " , arg.getParamText("item_idcd"  ))
			.where("group by b.prnt_idcd																	")
			.where("order by b.prnt_idcd																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb  as istt_invc_numb       , b.prnt_idcd          , a.item_idcd		")
			.query("       , a.orig_invc_numb as invc_numb        , a.orig_amnd_degr     , a.orig_seqn		")
			.query("       , a.istt_qntt        , a.istt_vatx     , a.ttsm_amnt	         , a.istt_amnt		")
			.query("       , b.cstm_idcd        , c.cstm_name     , i.item_name          , b.stot_dvcd		")
			.query("       , b.publ_date        , b.expr_date     , b.remk_text								")
		;
		data.param
			.where("from purc_istt_item a 																	")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd							")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd							")
			.where("where   1=1																")
			.where("and		b.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     b.prnt_idcd  = :prnt_idcd"        , arg.getParameter("prnt_idcd"))
			.where("and     c.cstm_idcd  = :cstm_idcd"        , arg.getParameter("cstm_idcd"))
			.where("and     c.cstm_idcd  = :cstm_idcd2"        , arg.getParameter("cstm_idcd2"))
			.where("and     a.item_idcd  = :item_idcd       " , arg.getParamText("item_idcd"  ))
			.where("and     i.item_idcd  = :item_idcd2     " , arg.getParamText("item_idcd2"  ))
			.where("and     b.invc_date >= :st_dt           " , arg.getParamText("st_dt" ))
			.where("and     b.invc_date <= :ed_dt           " , arg.getParamText("ed_dt" ))
			.where("and     b.stot_dvcd = :stot_dvcd       " , arg.getParamText("stot_dvcd" ))
			.where("order by a.invc_numb 																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLister2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   b.prnt_idcd       , a.item_idcd    , sum(a.istt_qntt) as istt_qntt				")
			.query("       , sum(a.istt_vatx) as istt_vatx      , sum(a.istt_amnt) as istt_amnt				")
			.query("       , sum(a.ttsm_amnt) as ttsm_amnt 													")
			.query("       , b.cstm_idcd                        , c.cstm_name								")
		;
		data.param
			.where("from purc_istt_item a 																	")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd							")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd							")
			.where("where   1=1																				")
			.where("and		b.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     b.invc_date >= :st_dt           " , arg.getParamText("st_dt" ))
			.where("and     b.invc_date <= :ed_dt           " , arg.getParamText("ed_dt" ))
			.where("and     b.stot_dvcd = :stot_dvcd       " , arg.getParamText("stot_dvcd" ))
			.where("and     c.cstm_idcd  = :cstm_idcd       " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.item_idcd  = :item_idcd       " , arg.getParamText("item_idcd"  ))
			.where("group by b.cstm_idcd																	")
			.where("order by c.cstm_idcd																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getLister3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   b.prnt_idcd       , a.item_idcd    , sum(a.istt_qntt) as istt_qntt				")
			.query("       , sum(a.istt_vatx) as istt_vatx      , sum(a.istt_amnt) as istt_amnt				")
			.query("       , sum(a.ttsm_amnt) as ttsm_amnt      , i.item_name        , i.item_code			")
			.query("       , b.cstm_idcd                        , c.cstm_name								")
		;
		data.param
			.where("from purc_istt_item a 																	")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast      c on b.cstm_idcd = c.cstm_idcd							")
			.where("left outer join item_mast      i on a.item_idcd = i.item_idcd							")
			.where("where   1=1																				")
			.where("and		b.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     b.invc_date >= :st_dt           " , arg.getParamText("st_dt" ))
			.where("and     b.invc_date <= :ed_dt           " , arg.getParamText("ed_dt" ))
			.where("and     b.stot_dvcd = :stot_dvcd       " , arg.getParamText("stot_dvcd" ))
			.where("and     c.cstm_idcd  = :cstm_idcd       " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.item_idcd  = :item_idcd       " , arg.getParamText("item_idcd"  ))
			.where("group by a.item_idcd																	")
			.where("order by a.item_idcd																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		String publ_date = "";
		String expr_date = "";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("purc_istt_mast")
					.where("where invc_numb = :invc_numb")
					.unique("invc_numb", row.fixParameter("istt_invc_numb"))
					.update("line_stat"			, 2							)
				;
				data.attach(rowaction);
				data.param
					.table("purc_istt_item")
					.where("where invc_numb = :invc_numb")
					.unique("invc_numb", row.fixParameter("istt_invc_numb"))
					.update("line_stat"			, 2							)
				;
				data.attach(rowaction);
				data.execute();
				data.clear();
				data.param
					.query("update purc_ordr_item")
					.query("set dlvy_qntt = (dlvy_qntt - :istt_qntt)", row.fixParameter("istt_qntt"))
					.query("where invc_numb		= :invc_numb	", row.fixParameter("invc_numb"))			//invoice번호
					.query("and   amnd_degr		= :amnd_degr	", row.fixParameter("orig_amnd_degr"))		//amend 차수
					.query("and   line_seqn		= :line_seqn	", row.fixParameter("orig_seqn"))			//순번
				;
				data.attach(Action.direct);
			}else{
				publ_date = row.getParamText("publ_date");
				expr_date = row.getParamText("expr_date");
				if(publ_date.matches("^[0-9]+$")){
				}else{
					publ_date = df.format(new Date(row.getParamText("publ_date")));
				}
				if(expr_date.matches("^[0-9]+$")){
				}else{
					expr_date = df.format(new Date(row.getParamText("expr_date")));
				}
				data.param
					.table("purc_istt_mast")
					.where("where invc_numb = :invc_numb")

					.unique("invc_numb", row.fixParameter("istt_invc_numb"))

					.update("stot_dvcd", row.getParameter("stot_dvcd"))
					.update("publ_date", publ_date)
					.update("expr_date", expr_date)
				;
				data.attach(Action.update);
			}
		}
		data.execute();
		return null;
	}


}
