package com.sky.system.mobile.gootsosttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
import com.sky.data.SqlParamText;

@Service
public class GootsOsttWorkService {
	@Autowired
	SeqListenerService sequence ;
	final Logger logger = LoggerFactory.getLogger(this.getClass());


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param
			.query("select    a.invc_numb        , a.line_seqn       , a.acpt_numb        , a.acpt_seqn			")
			.query("        , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric	")
			.query("        , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate			")
			.query("        , a.sale_amnt        , a.vatx_amnt       , a.ttsm_amnt        , a.deli_date			")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.wrhs_idcd        , a.dlvy_cstm_idcd	")
			.query("        , a.dsct_yorn        , a.ostt_dvcd       , a.insp_dvcd        , a.insp_date			")
			.query("        , a.pcod_numb        , a.ostt_yorn       , a.ostt_date								")
			.query("        , a.ostt_qntt        , (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0)) as unpaid		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , c.invc_date			")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , s.cstm_idcd			")
			.query("        , s.drtr_idcd        , s.dept_idcd       , cs.cstm_name								")
			.query("from spts_item a 																			")
			.query("left outer join acpt_item b	 on a.acpt_numb = b.invc_numb and a.line_seqn = b.line_seqn		")
			.query("left outer join spts_mast s  on a.invc_numb = s.invc_numb									")
			.query("left outer join cstm_mast cs on cs.cstm_idcd = s.cstm_idcd									")
			.query("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.query("left outer join spts_mast c  on a.invc_numb = c.invc_numb									")
			.query("left outer join unit_mast u  on i.unit_idcd = u.unit_idcd									")
			.query("where   1=1																					")
			.query("and     (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0))!= 0									")
			.query("and     c.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.query("and     c.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.query("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.query("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.query("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.query("and     cs.cstm_name like %:cstm_name%   " , arg.getParamText("cstm_name"  ))
			.query("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.query("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by c.invc_date , a.invc_numb,a.line_seqn												")
		;
		SqlResultMap info = data.selectForMap();


		return info;
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param
			.query("select    a.invc_numb        , DATE_FORMAT(a.invc_date,'%Y-%m-%d')     as invc_date			")
			.query("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.query("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.sale_stor_yorn							")
			.query("        , a.crny_dvcd        , a.excg_rate       , a.remk_text        , a.bzpl_idcd			")
			.query("        , a.expt_dvcd        , DATE_FORMAT(a.deli_date,'%Y-%m-%d')     as deli_date			")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , c.cstm_name        , u.user_name as drtr_name										")
		;
		data.param
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb desc																")
		;
		return data.selectForMap();
	}
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = new DataMessage(hq+".POS");
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
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																		")
		;
		return data.selectForMap();
	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param
			.query("select    a.invc_numb        , a.line_seqn       , a.acpt_numb        , a.acpt_seqn			")
			.query("        , a.item_idcd        , a.sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric	")
			.query("        , a.sale_pric        , a.trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate			")
			.query("        , a.sale_amnt        , a.vatx_amnt       , a.ttsm_amnt        , a.deli_date			")
			.query("        , a.stnd_unit        , a.stnd_unit_qntt  , a.wrhs_idcd        , a.dlvy_cstm_idcd	")
			.query("        , a.dsct_yorn        , a.ostt_dvcd       , a.insp_dvcd        , a.insp_date			")
			.query("        , a.pcod_numb        , a.ostt_yorn       , a.ostt_date								")
			.query("        , a.ostt_qntt        , (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0)) as unpaid		")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , c.invc_date			")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , s.cstm_idcd			")
			.query("        , s.drtr_idcd        , s.dept_idcd       , cs.cstm_name       , i.item_imge			")
			.query("from spts_item a 																			")
			.query("left outer join acpt_item b	 on a.acpt_numb = b.invc_numb and a.line_seqn = b.line_seqn		")
			.query("left outer join spts_mast s  on a.invc_numb = s.invc_numb									")
			.query("left outer join cstm_mast cs on cs.cstm_idcd = s.cstm_idcd									")
			.query("left outer join item_mast i  on a.item_idcd = i.item_idcd									")
			.query("left outer join spts_mast c  on a.invc_numb = c.invc_numb									")
			.query("left outer join unit_mast u  on i.unit_idcd = u.unit_idcd									")
			.query("where   1=1																					")
			.query("and     (ifnull(a.trst_qntt,0)-ifnull(a.ostt_qntt,0))!= 0									")
			.query("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.query("and     a.line_seqn = :line_seqn         " , arg.getParamText("line_seqn"  ))
			.query("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("order by c.invc_date , a.invc_numb,a.line_seqn												")
		;
		SqlResultMap info = data.selectForMap();
		return info;
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		DataMessage read;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) {
			data = new DataMessage(hq+".POS");
			read = new DataMessage(hq+".POS");
		} else {
			data = new DataMessage("N1000WINFO.POS");
			read = new DataMessage("N1000WINFO.POS");
		};
		read.param
		.query("call fn_seq_gen_v2 (							")
		.query("     :STOR                " ,  hq				)
		.query("   , :table               " ,  "sale_ostt_mast"	)
		.query("   , :invc_numb           " ,  "not defined"	)
		.query(" ) 												")
		;
		SqlResultRow seq = read.selectForRow();
		SqlResultRow rst = new SqlResultRow();
		rst = arg.getParameter("record", SqlResultRow.class);
		data.param
			.table("sale_ostt_mast											")
			.where("where invc_numb		= :invc_numb						")	//invoice번호

			.unique("invc_numb"			, seq.fixParameter("seq"			))	//invoice번호

			.update("bzpl_idcd"			, rst.getParameter("bzpl_idcd"		))	//사업장ID
			.update("cstm_idcd"			, rst.getParameter("cstm_idcd"		))	//거래처ID
			.update("drtr_idcd"			, rst.getParameter("drtr_idcd"		))	//담당자ID
			.update("invc_date"			, rst.getParameter("ostt_date"		))	//Invoice일자
			.update("dept_idcd"			, rst.getParameter("dept_idcd"		))	//부서ID
			.update("deli_date"			, rst.getParameter("deli_date"		))	//납기일자
			.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

			.update("updt_idcd"			, rst.getParameter("updt_idcd"		))
			.insert("crte_idcd"			, rst.getParameter("crte_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.insert);
		data.execute();
		data.clear();
		data.param
			.table("spts_item													")
			.where("where invc_numb = :invc_numb								")		//invoice번호
			.where("and   line_seqn = :line_seqn								")		//순번

			.unique("invc_numb"			, rst.fixParameter("invc_numb"			))		//invoice번호
			.unique("line_seqn"			, rst.fixParameter("line_seqn"			))		//순번

			.update("ostt_yorn"			, rst.getParameter("ostt_yorn"			))		//출고여부
			.update("ostt_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//출고일자
			.update("ostt_qntt"			, arg.getParameter("unpaid2"			))		//출고수량

			.update("updt_idcd"			, rst.getParameter("updt_idcd"			))
			.insert("crte_idcd"			, rst.getParameter("crte_idcd"			))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("spts_item")
			.where("where invc_numb = :invc_numb								")		//invoice번호
			.where("and   line_seqn = :line_seqn								")		//순번
			.where("and   (trst_qntt-ostt_qntt) = 0								")		//순번

			.unique("invc_numb"			, rst.fixParameter("invc_numb"			))		//invoice번호
			.unique("line_seqn"			, rst.fixParameter("line_seqn"			))		//순번

			.update("ostt_yorn"			, 1)		//출고여부
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("sale_ostt_item												")
			.where("where invc_numb		= :invc_numb							")		//invoice번호
			.where("and   line_seqn		= :line_seqn							")		//순번

			.unique("invc_numb"			, seq.fixParameter("seq"				))		//invoice번호
			.unique("line_seqn"			, 1										)		//순번

			.update("acpt_numb"			, rst.getParameter("acpt_numb"			))		//수주번호
			.update("acpt_seqn"			, rst.getParameter("acpt_seqn"			))		//수주순번
			.update("item_idcd"			, rst.getParameter("item_idcd"			))		//품목ID
			.update("sale_unit"			, rst.getParameter("sale_unit"			))		//판매단위
			.update("norm_sale_pric"	, rst.getParameter("norm_sale_pric"		))		//정상판매단가
			.update("sale_stnd_pric"	, rst.getParameter("sale_stnd_pric"		))		//판매기준단가
			.update("sale_pric"			, rst.getParameter("sale_pric"			))		//판매단가
			.update("ostt_qntt"			, arg.getParameter("ostt_qntt2"			))		//출고수량
			.update("vatx_incl_yorn"	, rst.getParameter("vatx_incl_yorn"		))		//부가세포함여부
			.update("vatx_rate"			, rst.getParameter("vatx_rate"			))		//부가세율
			.update("sale_amnt"			, rst.getParameter("new_sale_amnt"		))		//판매금액
			.update("vatx_amnt"			, rst.getParameter("new_vatx_amnt"		))		//부가세금액
			.update("ttsm_amnt"			, rst.getParameter("new_ttsm_amnt"		))		//합계금액
			.update("deli_date"			, rst.getParameter("deli_date"			))		//납기일자
			.update("lott_numb"			, arg.getParameter("lott_numb"			))		//LOT번호
			.update("dlvy_hhmm"			, rst.getParameter("dlvy_hhmm"			))		//납품시분
			.update("stnd_unit"			, rst.getParameter("stnd_unit"			))		//기준단위
			.update("stnd_unit_qntt"	, rst.getParameter("stnd_unit_qntt"		))		//기준단위수량
			.update("wrhs_idcd"			, rst.getParameter("wrhs_idcd"			))		//창고ID
			.update("dlvy_cstm_idcd"	, rst.getParameter("cstm_idcd"			))		//납품거래처ID
			.update("dsct_yorn"			, rst.getParameter("dsct_yorn"			))		//중단여부
			.update("ostt_dvcd"			, rst.getParameter("ostt_dvcd"			))		//출고구분코드
			.update("insp_dvcd"			, rst.getParameter("insp_dvcd"			))		//검사구분코드
			.update("orig_invc_numb"	, rst.getParameter("invc_numb"			))		//출하지시번호
			.update("orig_seqn"			, rst.getParameter("line_seqn"			))		//출하지시항번

			.update("pcod_numb"			, rst.getParameter("pcod_numb"			))		//PONO

			.update("sale_invc_numb"	, rst.getParameter("sale_invc_numb"		))		//판매invoice번호
			.update("sale_qntt"			, rst.getParameter("sale_qntt"			))		//판매수량
			.update("remk_text"			, rst.getParameter("remk_text"			))		//비고

			.update("updt_idcd"			, rst.getParameter("updt_idcd"			))
			.insert("crte_idcd"			, rst.getParameter("crte_idcd"			))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;data.attach(Action.insert);
		data.execute();
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "판매출고");
		return null ;
	}


}




