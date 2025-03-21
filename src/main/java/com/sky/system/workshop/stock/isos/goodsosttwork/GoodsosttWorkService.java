package com.sky.system.workshop.stock.isos.goodsosttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("workshop.GoodsosttWorkService")
public class GoodsosttWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																				 		")
			.where("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd 		")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date        , a.sale_stor_yorn	")
			.where("        , a.crny_dvcd        , a.excg_rate       , a.remk_text								")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("        , s.acpt_numb																		")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd       "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     s.acpt_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb desc																	")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb         , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.query("        , a.ostt_qntt        , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.orig_invc_numb   , a.orig_seqn      , a.acpt_seqn								")
			.query("        , p.ttle             , cl.clss_name													")
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("left outer join prnt_ordr_item p on a.acpt_numb = p.invc_numb and a.acpt_seqn = p.line_seqn	")
			.where("left outer join item_clss cl on p.item_lcls_idcd = cl.clss_idcd								")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String acpt_numb	= arg.getParamText("acpt_numb");
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call workshop_release_cancel (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :acpt_numb "  , acpt_numb	)  // 수주번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}
}
