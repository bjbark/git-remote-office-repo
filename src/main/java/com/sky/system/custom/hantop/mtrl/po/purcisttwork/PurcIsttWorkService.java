package com.sky.system.custom.hantop.mtrl.po.purcisttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("hntop.PurcIsttWorkService")
public class PurcIsttWorkService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*")
		;
		if(!arg.getParamText("hq_id").toUpperCase().equals("N1000HJSYS")){
			data.param
				.where("from (																					")
				.where("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
				.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
				.where("        , b.istt_qntt      , a.vatx_incl_yorn  , b.vatx_rate    , b.istt_amnt			")
				.where("        , b.istt_vatx      , b.ttsm_amnt       , a.krwn_pric    , a.krwn_amnt			")
				.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text    , a.expr_date			")
				.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln    , a.publ_date			")
				.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
				.where("        , u.user_name      as drtr_nam         , b.orig_seqn    , b.orig_invc_numb		")
				.where("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_amnd_degr		")
				.where("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
				.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
				.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
				.where("from purc_istt_item b																	")
				.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
				.where("left outer join cstm_mast c      on b.cstm_idcd      = c.cstm_idcd						")
				.where("left outer join wrhs_mast w      on b.istt_wrhs_idcd = w.wrhs_idcd						")
				.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
				.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
				.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")

				.where("where   1=1																				")
				.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
				.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
				.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
				.where("and     b.orig_invc_numb  = :invc_numb1 " , arg.getParamText("invc_numb1" ))
				.where("and     b.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ))
				.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
				.where("and     b.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_date desc,a.cstm_idcd,a.invc_numb limit 9999999999999					")
				.where(") a																						")
			;
		}else{
			data.param
			.where("from (																					")
			.where("select    a.invc_numb      , a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd		")
			.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.where("        , b.istt_qntt      , a.vatx_incl_yorn  , b.vatx_rate    , b.istt_amnt			")
			.where("        , ifnull(b.istt_amnt,0)*0.1 as istt_vatx										")
			.where("        , ifnull(b.istt_amnt,0)+ifnull(b.istt_amnt,0)*0.1 as ttsm_amnt					")
			.where("        , a.krwn_pric      , a.krwn_amnt												")
			.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text    , a.expr_date			")
			.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln    , a.publ_date			")
			.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.where("        , u.user_name as drtr_name             , b.orig_seqn    , b.orig_invc_numb		")
			.where("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_amnd_degr		")
			.where("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.where("        , p.orig_invc_numb as acpt_numb        , round(ifnull(p.offr_qntt,0)*ifnull(i.unit_wigt,0),2) as ordr_wigt	")
			.where("        , t.acpt_case_name																")
			.where("from purc_istt_item b																	")
			.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
			.where("left outer join purc_ordr_item p on b.orig_invc_numb = p.invc_numb						")
			.where("left outer join acpt_mast t      on p.orig_invc_numb = t.invc_numb						")
			.where("left outer join cstm_mast c      on b.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on b.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")

			.where("where   1=1																				")
			.where("and     b.istt_yorn = 1																	")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     b.orig_invc_numb  = :invc_numb1" , arg.getParamText("invc_numb1" ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     b.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc limit 99999999999												")
			.where(") a																						")
			;
		}
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
			.query("select    a.invc_numb        , a.line_seqn       , a.istt_wrhs_idcd   , a.zone_idcd			")
			.query("        , a.item_idcd        , a.istt_pric													")
			.query("        , a.istt_qntt        , a.istt_amnt       , a.istt_vatx        , a.ttsm_amnt			")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , i.item_code        , i.item_name       , i.item_spec        , u.unit_name			")
		;
		data.param
			.where("from purc_istt_item a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")

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

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		if(!arg.getParamText("hq_id").toUpperCase().equals("N1000HJSYS")){
			data.param
				.query("select    a.invc_numb        , a.amnd_degr        , a.line_seqn        , a.item_idcd		")
				.query("        , a.unit_idcd        , a.make_cmpy_name   , a.offr_qntt								")
				.query("        , a.offr_pric        , a.vatx_incl_yorn   , a.vatx_rate        , a.offr_amnt		")
				.query("        , a.offr_vatx        , 0 as ttsm_amnt     , a.deli_reqt_date   , a.deli_date		")
				.query("        , a.pric_dvcd        , a.fund_dvcd        , a.dlvy_qntt        , a.pass_qntt		")
				.query("        , a.dlvy_date        , a.dlvy_time        , a.send_deli_date   , a.dlvy_wrhs_idcd	")
				.query("        , a.krwn_pric        , a.krwn_amnt        , a.krwn_amnt_totl   , a.insd_remk_text	")
				.query("        , a.otsd_remk_text   , a.stnd_unit        , a.orig_invc_numb   , a.orig_amnd_degr	")
				.query("        , a.orig_seqn        , b.stot_dvcd        , b.offr_dvcd								")
				.query("        , ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0) as qntt          , 0 as istt_qntt		")
				.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
				.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
				.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
				.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("        , i.item_code        , i.item_name        , i.item_spec        , u.unit_name		")
				.query("        , i.istt_wrhs_idcd   , null as zone_idcd 											")
				.query("        , b.cstm_idcd        , b.drtr_idcd        , c.cstm_name        , i.rcpt_insp_yorn	")
			;
			data.param
				.where("from purc_ordr_item a																		")
				.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb								")
				.where("left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd								")
				.where("left outer join item_mast i on a.item_idcd      = i.item_idcd								")
				.where("left outer join unit_mast u on i.unit_idcd      = u.unit_idcd								")
				.where("where 1=1																					")
				.where("and   ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0)>0											")
				.where("and   b.cstm_idcd   =  :cstm_idcd	" , arg.getParameter("cstm_idcd" ))
				.where("and   a.invc_numb   =  :invc_numb1	" , arg.getParameter("invc_numb1"))
				.where("and   a.invc_numb   =  :invc_numb2	" , arg.getParameter("barcode_pono"))
				.where("and   a.item_idcd   =  :item_idcd	" , arg.getParameter("item_idcd" ))
				.where("and   a.deli_date   >= :deli_date1	" , arg.getParamText("deli_date1" ))
				.where("and   a.deli_date   <= :deli_date2	" , arg.getParamText("deli_date2" ))
				.where("and   b.invc_date   >= :invc_date1	" , arg.getParamText("invc_date1" ))
				.where("and   b.invc_date   <= :invc_date2	" , arg.getParamText("invc_date2" ))
				.where("and   b.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb,a.line_seqn															")
			;
		}else{
			data.param
				.query("select    a.invc_numb        , a.amnd_degr        , a.line_seqn        , a.item_idcd		")
				.query("        , a.unit_idcd        , a.make_cmpy_name   , a.offr_qntt								")
				.query("        , a.offr_pric        , a.vatx_incl_yorn   , a.vatx_rate        , a.offr_amnt		")
				.query("        , a.offr_vatx        , 0 as ttsm_amnt     , a.deli_reqt_date   , a.deli_date		")
				.query("        , a.pric_dvcd        , a.fund_dvcd        , a.dlvy_qntt        , a.pass_qntt		")
				.query("        , a.dlvy_date        , a.dlvy_time        , a.send_deli_date   , a.dlvy_wrhs_idcd	")
				.query("        , a.krwn_pric        , a.krwn_amnt        , a.krwn_amnt_totl   , a.insd_remk_text	")
				.query("        , a.otsd_remk_text   , a.stnd_unit        , a.orig_invc_numb   , a.orig_amnd_degr	")
				.query("        , a.orig_seqn        , b.stot_dvcd        , b.offr_dvcd								")
				.query("        , ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0) as qntt          , 0 as istt_qntt		")
				.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
				.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
				.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
				.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
				.query("        , a.crte_idcd        , a.crte_urif													")
				.query("        , i.item_code        , i.item_name        , i.item_spec        , u.unit_name		")
				.query("        , i.istt_wrhs_idcd   , null as zone_idcd 											")
				.query("        , b.cstm_idcd        , b.drtr_idcd        , c.cstm_name        , i.rcpt_insp_yorn	")
			;
			data.param
				.where("from purc_ordr_item a																		")
				.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb								")
				.where("left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd								")
				.where("left outer join item_mast i on a.item_idcd      = i.item_idcd								")
				.where("left outer join unit_mast u on i.unit_idcd      = u.unit_idcd								")
				.where("where 1=1																					")
				.where("and   ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0)>0											")
				.where("and   b.cstm_idcd   =  :cstm_idcd	" , arg.getParameter("cstm_idcd" ))
				.where("and   a.invc_numb   =  :invc_numb1	" , arg.getParameter("invc_numb1"))
				.where("and   a.invc_numb   =  :invc_numb2	" , arg.getParameter("barcode_pono"))
				.where("and   a.item_idcd   =  :item_idcd	" , arg.getParameter("item_idcd" ))
				.where("and   a.deli_date   >= :deli_date1	" , arg.getParamText("deli_date1" ))
				.where("and   a.deli_date   <= :deli_date2	" , arg.getParamText("deli_date2" ))
				.where("and   b.invc_date   >= :invc_date1	" , arg.getParamText("invc_date1" ))
				.where("and   b.invc_date   <= :invc_date2	" , arg.getParamText("invc_date2" ))
				.where("and   c.otod_cstm_yorn != :otod_cstm_yorn	" , "1")
				.where("and   b.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.invc_numb																		")
			;
		}
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		// TODO
		data.param
			.query("select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as optn_logc_valu ")
			.query("from optn_mast																								")
			.query("where optn_idcd = 'purc_insp_yorn'																			")
		;
		String valu = data.selectForMap().toString();
		String restr = valu.replaceAll("[^0-9]","");
		String istt_yorn;

		if(restr.equals("0")){
			istt_yorn = "1";
		}else{
			istt_yorn = "0";
		};

		int i = 0;
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			//인수검사여부 값
			String rcpt_insp_yorn = row.getParamText("rcpt_insp_yorn");

			/*차이수량(diff_qntt) = 미납수량(qntt) - 입고수량(istt_qntt)*/
			double diff_qntt = Double.parseDouble(row.getParamText("diff_qntt"));

			/*제조일자 string으로 변환*/
			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			String make_date = dt.format(new Date());

			if(i == 0){
				if(rcpt_insp_yorn.equals("1")){
					data.param
						.table("purc_insp							")
						.where("where invc_numb		= :	new_invc_numb")		//invoice번호
						.where("and   line_seqn		= :	line_seqn")			//순번

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))		//순번
						.update("dlvy_idcd"			, row.getParameter("invc_numb"		))		//발주번호
						.update("dlvy_seqn"			, row.getParameter("line_seqn"		))		//발주순번
						.update("invc_date"			, row.getParameter("invc_date"		))		//발주순번
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처아이디
						.update("item_idcd"			, row.getParameter("item_idcd"		))		//아이템아이디
						.update("dlvy_qntt"			, row.getParameter("istt_qntt"		))		//발주수량

					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}

				data.param
					.table("purc_istt_mast											")
					.where("where invc_numb = :invc_numb							")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))

					.update("invc_date"			, row.getParameter("invc_date"		))		//invoice일자
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))		//사업장ID
					.update("istt_wrhs_idcd"	, row.getParameter("wrhs_idcd"		))		//입고창고ID
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))		//내외자구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))		//담당자ID
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))		//부서ID
					.update("istt_qntt"			, row.getParameter("istt_qntt"		))		//입고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("istt_amnt"			, row.getParameter("istt_amnt"		))		//입고금액
					.update("istt_vatx"			, row.getParameter("istt_vatx"		))		//입고부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("krwn_pric"			, row.getParameter("krwn_pric"		))		//원화단가
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"		))		//원화금액
					.update("stot_dvcd"			, row.getParameter("stot_dvcd"		))		//결제구분
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"		))		//원화부가세
					.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"	))		//원화금액계
					.update("remk_text"			, row.getParameter("remk_text"		))		//비고

					.update("prnt_idcd"			, row.getParameter("prnt_idcd"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("purc_istt_item											")
					.where("where invc_numb		= :invc_numb						")		//invoice번호
					.where("and   line_seqn		= :line_seqn						")		//순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))		//순번

					.update("istt_wrhs_idcd"	, row.getParameter("wrhs_idcd"		))		//입고창고ID
					.update("zone_idcd"			, row.getParameter("zone_idcd"		))		//보관구역ID
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
					.update("istt_pric"			, row.getParameter("offr_pric"		))		//입고단가
					.update("istt_qntt"			, row.getParameter("istt_qntt"		))		//입고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("istt_amnt"			, row.getParameter("istt_amnt"		))		//입고금액
					.update("istt_vatx"			, row.getParameter("istt_vatx"		))		//입고부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("krwn_pric"			, row.getParameter("krwn_pric"		))		//원화단가
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"		))		//원화금액
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"		))		//원화부가세
					.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"	))		//원화금액계
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"		))		//단가구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
					.update("stnd_unit"			, row.getParameter("stnd_unit"		))		//기준단위
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"	))		//기준단위수량
					.update("paym_dvcd"			, row.getParameter("paym_dvcd"		))		//지급구분코드
					.update("lott_numb"			, row.getParameter("lott_numb"		))		//LOT번호
					.update("sral_strt_numb"	, row.getParameter("sral_strt_numb"	))		//시리얼시작번호
					.update("sral_endd_numb"	, row.getParameter("sral_endd_numb"	))		//시리얼종료번호
					.update("remk_text"			, row.getParameter("remk_text"		))		//비고
					.update("prof_data"			, row.getParameter("prof_data"		))		//증빙자료
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"	))		//입고검사여부
					;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("insp_date"			, row.getParameter("invc_date"		))		//검사일자
					;
				}else{
					data.param
						.update("insp_date"			, row.getParameter("insp_date"		))		//검사일자
					;
				}
				data.param
					.update("insp_drtr_idcd"	, row.getParameter("insp_drtr_idcd"	))		//검사담당자ID
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"	))		//검사방법구분코드
					.update("insp_qntt"			, row.getParameter("insp_qntt"		))		//검사수량
					.update("msmt_valu"			, row.getParameter("msmt_valu"		))		//측정값
				;
					if(restr.equals("0")){ // 수입검사를 안하는 경우
						data.param
							.update("pass_qntt"			, row.getParameter("istt_qntt"		))		//합격수량
						;
					}else{
						data.param
							.update("pass_qntt"			, row.getParameter("pass_qntt"		))		//합격수량
						;
					}
				data.param
					.update("poor_qntt"			, row.getParameter("poor_qntt"		))		//불량수량
					.update("poor_caus_bacd"	, row.getParameter("poor_caus_bacd"	))		//불량원인구분코드
					.update("judt_dvcd"			, row.getParameter("judt_dvcd"		))		//판정구분코드
					.update("orig_invc_numb"	, row.getParameter("invc_numb"		))		//원invoice번호
					.update("orig_amnd_degr"	, row.getParameter("amnd_degr"		))		//원invoice번호
					.update("orig_seqn"			, row.getParameter("line_seqn"		))		//원순번
				;
					if(rcpt_insp_yorn.equals("0")){ // 수입검사를 안하는 경우
						data.param
							.update("istt_yorn"			, 1									)		//입고여부
						;
					}else{
						data.param
							.update("istt_yorn"			, 0									)		//입고여부
						;
					}
				data.param
					.update("uper_seqn"			, row.getParameter("uper_seqn"		))		//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"		))		//표시순번
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))		//제조회사
					.update("make_date"			, make_date							)		//제조일자
					.update("rtil_ddln"			, row.getParameter("rtil_ddln"		))		//유통기한

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				if(rcpt_insp_yorn.equals("1")){
					data.param
						.table("purc_insp							")
						.where("where invc_numb		= :	new_invc_numb")		//invoice번호
						.where("and   line_seqn		= :	line_seqn")			//순번

						.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))		//invoice번호
						.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))		//순번
						.update("dlvy_idcd"			, row.getParameter("invc_numb"		))		//발주번호
						.update("dlvy_seqn"			, row.getParameter("line_seqn"		))		//발주순번
						.update("invc_date"			, row.getParameter("invc_date"		))		//발주순번
						.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처아이디
						.update("item_idcd"			, row.getParameter("item_idcd"		))		//아이템아이디
						.update("dlvy_qntt"			, row.getParameter("istt_qntt"		))		//발주수량

					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}

				data.param
					.table("purc_istt_item											")
					.where("where invc_numb		= :invc_numb						")		//invoice번호
					.where("and   line_seqn		= :line_seqn						")		//순번

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"	))		//순번

					.update("istt_wrhs_idcd"	, row.getParameter("wrhs_idcd"		))		//입고창고ID
					.update("zone_idcd"			, row.getParameter("zone_idcd"		))		//보관구역ID
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
					.update("istt_pric"			, row.getParameter("offr_pric"		))		//입고단가
					.update("istt_qntt"			, row.getParameter("istt_qntt"		))		//입고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("istt_amnt"			, row.getParameter("istt_amnt"		))		//입고금액
					.update("istt_vatx"			, row.getParameter("istt_vatx"		))		//입고부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//합계금액
					.update("krwn_pric"			, row.getParameter("krwn_pric"		))		//원화단가
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"		))		//원화금액
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"		))		//원화부가세
					.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"	))		//원화금액계
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"		))		//단가구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
					.update("stnd_unit"			, row.getParameter("stnd_unit"		))		//기준단위
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"	))		//기준단위수량
					.update("paym_dvcd"			, row.getParameter("paym_dvcd"		))		//지급구분코드
					.update("lott_numb"			, row.getParameter("lott_numb"		))		//LOT번호
					.update("sral_strt_numb"	, row.getParameter("sral_strt_numb"	))		//시리얼시작번호
					.update("sral_endd_numb"	, row.getParameter("sral_endd_numb"	))		//시리얼종료번호
					.update("remk_text"			, row.getParameter("remk_text"		))		//비고
					.update("prof_data"			, row.getParameter("prof_data"		))		//증빙자료
					.update("istt_insp_yorn"	, row.getParameter("istt_insp_yorn"	))		//입고검사여부
					;
				if(restr.equals("0")){ // 수입검사를 안하는 경우
					data.param
						.update("insp_date"			, row.getParameter("invc_date"		))		//검사일자
					;
				}else{
					data.param
						.update("insp_date"			, row.getParameter("insp_date"		))		//검사일자
					;
				}
				data.param
					.update("insp_drtr_idcd"	, row.getParameter("insp_drtr_idcd"	))		//검사담당자ID
					.update("insp_mthd_dvcd"	, row.getParameter("insp_mthd_dvcd"	))		//검사방법구분코드
					.update("insp_qntt"			, row.getParameter("insp_qntt"		))		//검사수량
					.update("msmt_valu"			, row.getParameter("msmt_valu"		))		//측정값
				;
					if(restr.equals("0")){ // 수입검사를 안하는 경우
						data.param
							.update("pass_qntt"			, row.getParameter("istt_qntt"		))		//합격수량
						;
					}else{
						data.param
							.update("pass_qntt"			, row.getParameter("pass_qntt"		))		//합격수량
						;
					}
				data.param
					.update("poor_qntt"			, row.getParameter("poor_qntt"		))		//불량수량
					.update("poor_caus_bacd"	, row.getParameter("poor_caus_bacd"	))		//불량원인구분코드
					.update("judt_dvcd"			, row.getParameter("judt_dvcd"		))		//판정구분코드
					.update("orig_invc_numb"	, row.getParameter("invc_numb"		))		//원invoice번호
					.update("orig_amnd_degr"	, row.getParameter("amnd_degr"		))		//원invoice번호
					.update("orig_seqn"			, row.getParameter("line_seqn"		))		//원순번
					.update("istt_yorn"			, istt_yorn							)		//입고여부
					.update("uper_seqn"			, row.getParameter("uper_seqn"		))		//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"		))		//표시순번
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))		//제조회사
					.update("make_date"			, make_date							)		//제조일자
					.update("rtil_ddln"			, row.getParameter("rtil_ddln"		))		//유통기한

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}
			if(diff_qntt == 0){
				data.param
					.table("purc_ordr_item						")
					.where("where invc_numb		= :invc_numb	")		//invoice번호
					.where("and   line_seqn		= :line_seqn	")		//순번
					.where("and   amnd_degr		= :amnd_degr	")		//amd차수

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))		//amd 차수

					.update("dlvy_qntt"			, row.getParameter("new_dlvy_qntt"		))		//미납수량
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
				data.param
					.table("purc_ordr_mast						")
					.where("where invc_numb		= :invc_numb	")		//invoice번호
					.where("and   amnd_degr		= :amnd_degr	")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))		//amd 차수

					.update("line_clos"			, 1										)		//마감

				;
				data.attach(Action.update);
				data.execute();
			}else{
				data.param
				.table("purc_ordr_item						")
				.where("where invc_numb		= :invc_numb	")		//invoice번호
				.where("and   amnd_degr		= :amnd_degr	")		//amend 차수
				.where("and   line_seqn		= :line_seqn	")		//순번

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))		//invoice번호
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))		//amend 차수
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))		//순번

				.update("dlvy_qntt"			, row.getParameter("new_dlvy_qntt"		))		//미납수량

				;
				data.attach(Action.modify);
				data.execute();
			}
			data.clear();

			if(restr.equals("0")){
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......   */
				sequence.setBook(arg, row.getParamText("new_invc_numb"), 0 , "구매입고");
			}
		}
		return null ;
	}
	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(rowaction == Action.delete){
				data.param
					.table("purc_istt_mast											")
					.where("where invc_numb = :invc_numb							")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

					.update("line_stat"			, 2									 )
				;data.attach(rowaction);
				data.param
					.table("purc_istt_item											")
					.where("where invc_numb = :invc_numb							")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"	))

					.update("line_stat"			, 2									 )
				;data.attach(rowaction);
				data.param
					.query("update purc_ordr_item")
					.query("set dlvy_qntt = (dlvy_qntt - :istt_qntt)", row.fixParameter("istt_qntt"))
					.query("  , line_clos = :line_clos				", "0")
					.query("where invc_numb		= :invc_numb	", row.fixParameter("orig_invc_numb"))		//invoice번호
					.query("and   amnd_degr		= :amnd_degr	", row.fixParameter("orig_amnd_degr"))		//amend 차수
					.query("and   line_seqn		= :line_seqn	", row.fixParameter("orig_seqn"))		//순번
				;
				data.attach(Action.direct);
				data.param
					.table("purc_ordr_mast											")
					.where("where invc_numb = :invc_numb")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("orig_invc_numb"))

					.update("line_clos"			, "0"								)
				;data.attach(Action.update);
			}
		}
		data.execute();
		return null ;
	}
}
