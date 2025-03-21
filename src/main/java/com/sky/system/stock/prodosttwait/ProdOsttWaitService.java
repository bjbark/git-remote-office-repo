package com.sky.system.stock.prodosttwait;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class ProdOsttWaitService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd			")
			.query("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.query("        , a.ostt_schd_date   , a.ostt_yorn       , a.ostt_date        , a.trut_dvcd			")
			.query("        , a.dlvy_cond_dvcd   , a.deli_date       , a.sale_stor_yorn   , a.crny_dvcd			")
			.query("        , a.excg_rate        , a.pcod_numb       , a.remk_text 								")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , b.cstm_code        , b.cstm_name       , c.user_name        , e.wrhs_name 		")
		;
		data.param
			.where("from spts_mast a																			")
			.where("left outer join cstm_mast b on a.cstm_idcd      = b.cstm_idcd								")
			.where("left outer join user_mast c on a.drtr_idcd      = c.user_idcd								")
			.where("left outer join spts_item d on a.invc_numb      = d.invc_numb								")
			.where("left outer join wrhs_mast e on d.wrhs_idcd      = e.wrhs_idcd								")
			.where("left outer join acpt_mast f on d.acpt_numb      = f.invc_numb								")
			.where(",(select invc_numb, min(ostt_yorn) as ostt_yorn from spts_item group by invc_numb) s		")
			.where("where   1=1																					")
			.where("and     a.invc_numb = s.invc_numb															")
			.where("and     0 = s.ostt_yorn																	")
			.where("and     a.find_name like %:find_name%     " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1        " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2        " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1        " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2        " , arg.getParamText("deli_date2" ))
			.where("and     a.invc_numb  = :invc_numb         " , arg.getParamText("invc_numb" ))
			.where("and     d.item_idcd  = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.where("and     a.line_stat  = :line_stat1        " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     d.wrhs_idcd  = :ostt_wrhs_idcd    " , arg.getParamText("ostt_wrhs_idcd"  ))	//출고창고
			.where("and     d.acpt_numb  = :acpt_numb         " , arg.getParamText("acpt_numb"       ))	//수주번호
			.where("and     f.drtr_idcd  = :drtr_idcd         " , arg.getParamText("drtr_idcd"       ))	//영업담당자
			.where("and     f.cstm_idcd  = :cstm_idcd         " , arg.getParamText("cstm_idcd"       ))	//거래처
			.where("and     f.dlvy_cstm_idcd = :dlvy_cstm_idcd" , arg.getParamText("dlvy_cstm_idcd"  ))	//납품처
			.where("and     a.line_stat  < :line_stat        " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
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
			.query("select    a.invc_numb        , a.line_seqn       , a.acpt_numb        , a.acpt_seqn				")
			.query("        , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric		")
			.query("        , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate				")
			.query("        , a.sale_amnt        , a.vatx_amnt       , a.ttsm_amnt        , a.deli_date				")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.wrhs_idcd        , a.dlvy_cstm_idcd		")
			.query("        , a.dsct_yorn        , a.ostt_dvcd       , a.insp_dvcd        , a.insp_date				")
			.query("        , a.pcod_numb        , a.ostt_yorn       , a.ostt_date        , a.ostt_qntt				")
			.query("        , a. uper_seqn       , a.disp_seqn       , (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0)) as unpaid	")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl				")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name				")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd				")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm				")
			.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name									")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , u.unit_name				")
		;
		data.param
			.where("from spts_item a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("where   1=1																						")
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
}
