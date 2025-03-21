package com.sky.system.mtrl.project.prjtpurcorderlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PrjtPurcOrderListService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
			.query("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.query("        , a.istt_dvcd      , u.user_name       , c.cstm_name							")
		;
		data.param
			.where("from purc_istt_mast a																	")
			.where("left outer join purc_istt_item b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd							")
			.where("left outer join user_mast      u on a.drtr_idcd = u.user_idcd							")

			.where("where   1=1																				")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     a.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     a.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_date desc, a.invc_numb desc												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb      , a.line_seqn       , a.zone_idcd    , a.istt_wrhs_idcd		")
			.query("        , a.acct_bacd      , a.item_idcd       , a.istt_pric    , a.istt_qntt			")
			.query("        , a.pric_dvcd      , a.vatx_incl_yorn  , a.vatx_rate    , a.istt_amnt			")
			.query("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text    , a.stnd_unit			")
			.query("        , a.stnd_unit_qntt , a.paym_dvcd												")
			.query("        , i.item_name      , i.item_spec       , i.item_code    , u.unit_name			")
			.query("        , (a.istt_amnt * 0.1) as istt_vatx     , a.istt_amnt + (a.istt_amnt * 0.1) as ttsm_amnt	")
		;
		data.param
			.where("from purc_istt_item a																	")
			.where("left outer join item_mast i      on a.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast u      on i.unit_idcd      = u.unit_idcd						")

			.where("where   1=1																				")
			.where("and      a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb" ))
			.where("and      a.line_stat   = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
