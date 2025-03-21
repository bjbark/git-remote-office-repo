package com.sky.system.mobile.prodistt;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class ProdIsttService {
	@Autowired
	SeqListenerService sequence ;
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    DATE_FORMAT(b.invc_date,'%Y-%m-%d') as invc_date             , a.invc_numb			")
			.query("        , ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0) as qntt          , c.cstm_name			")
			.query("        , ifnull(a.offr_qntt,0) as offr_qntt        , ifnull(a.dlvy_qntt,0) as dlvy_qntt		")
			.query("        , i.item_name          , a.item_idcd        , a.line_seqn								")
		;
		data.param
			.where("from purc_ordr_item a																			")
			.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd      = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd      = u.unit_idcd									")
			.where("where   1=1																						")
			.where("and   ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0)>0												")
			.where("and   c.cstm_name   like %:cstm_name%	" , arg.getParameter("cstm_name" ))
			.where("and   a.invc_numb   like %:find_name%	" , arg.getParameter("find_name" ))
			.where("and   b.invc_date   >= :invc_date1	" , arg.getParamText("fr_dt" ).replaceAll("-",""))
			.where("and   b.invc_date   <= :invc_date2	" , arg.getParamText("to_dt" ).replaceAll("-",""))
			.where("and   a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date desc,a.invc_numb desc														")
		;
		return data.selectForMap();
	}
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb      , DATE_FORMAT(a.invc_date,'%Y-%m-%d') as invc_date			")
			.query("        , a.bzpl_idcd      , a.istt_wrhs_idcd											")
			.query("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.query("        , a.istt_qntt      , a.vatx_incl_yorn  , a.vatx_rate    , a.istt_amnt			")
			.query("        , a.istt_vatx      , a.ttsm_amnt       , a.krwn_pric    , a.krwn_amnt			")
			.query("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text 							")
			.query("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln 							")
			.query("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.query("        , u.user_name      as drtr_name													")
			.query("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_invc_numb		")
			.query("        , b.istt_qntt      , b.istt_amnt       , b.istt_vatx    , b.ttsm_amnt			")
			.query("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.query("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.query("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
		;
		data.param
			.where("from purc_istt_mast a																	")
			.where("left outer join purc_istt_item b on a.invc_numb = b.invc_numb							")
			.where("left outer join cstm_mast c      on a.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on a.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")

			.where("where   1=1																				")
			.where("and     c.cstm_name like %:cstm_name%  " , arg.getParamText("cstm_name"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("fr_dt" ).replaceAll("-",""))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("to_dt" ).replaceAll("-",""))
			.where("and     a.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ))
			.where("and     i.item_name  = :item_name      " , arg.getParamText("item_name"  ))
			.where("and   a.invc_numb   like %:find_name%	" , arg.getParameter("find_name" ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_date desc , a.invc_numb desc											")
		;
		return data.selectForMap();

	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    DATE_FORMAT(b.invc_date,'%Y-%m-%d') as invc_date             , a.invc_numb			")
			.query("        , ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0) as qntt          , c.cstm_name			")
			.query("        , ifnull(a.offr_qntt,0) as offr_qntt        , ifnull(a.dlvy_qntt,0) as dlvy_qntt		")
			.query("        , i.item_name          , a.item_idcd        , a.line_seqn      , i.item_imge			")
		;
		data.param
			.where("from purc_ordr_item a																			")
			.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join cstm_mast c on b.cstm_idcd      = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd      = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd      = u.unit_idcd									")
			.where("where   1=1																						")
			.where("and   ifnull(a.offr_qntt,0)-ifnull(a.dlvy_qntt,0)>0												")
			.where("and   c.cstm_name   like %:cstm_name%	" , arg.getParameter("cstm_name" ))
			.where("and   a.find_name   like %:find_name%	" , arg.getParameter("find_name" ))
			.where("and   a.invc_numb   = :invc_numb	" , arg.getParameter("invc_numb" ))
			.where("and   a.line_seqn   = :line_seqn	" , arg.getParameter("line_seqn" ))
			.where("and   b.invc_date   >= :invc_date1	" , arg.getParamText("fr_dt" ).replaceAll("-",""))
			.where("and   b.invc_date   <= :invc_date2	" , arg.getParamText("to_dt" ).replaceAll("-",""))
			.where("and   a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date desc,a.invc_numb desc														")
		;
		return data.selectForMap();
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		DataMessage temp = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		SqlResultRow temp1 ;
		SqlResultRow temp2 ;
		temp.param
			.query("select  a.invc_numb          , a.amnd_degr          , a.line_seqn        , a.item_idcd		")
			.query("      , a.item_spec          , a.unit_idcd          , b.cstm_idcd        , a.make_cmpy_name	")
			.query("      , a.offr_qntt          , a.offr_pric          , a.vatx_incl_yorn   , a.vatx_rate		")
			.query("      , a.offr_amnt          , a.offr_vatx          , a.ttsm_amnt        , a.deli_reqt_date	")
			.query("      , a.pric_dvcd          , a.fund_dvcd          , a.dlvy_qntt        , a.pass_qntt		")
			.query("      , a.dlvy_date          , a.dlvy_time          , a.send_deli_date   , a.dlvy_wrhs_idcd	")
			.query("      , a.krwn_pric          , a.krwn_amnt          , a.krwn_vatx        , a.krwn_amnt_totl	")
			.query("      , a.insd_remk_text     , a.otsd_remk_text     , a.stnd_unit        , a.orig_invc_numb	")
			.query("      , a.orig_amnd_degr     , a.orig_seqn          , a.uper_seqn        , a.disp_seqn		")
		;
		temp.param
			.where("from               purc_ordr_item a					")
			.where("left outer join    purc_ordr_mast b					")
			.where("             on    a.invc_numb = b.invc_numb		")
			.where("where  1=1			 ")
			.where("and    a.invc_numb = :invc_numb",arg.getParameter("invc_numb"))
			.where("and    a.line_seqn = :line_seqn",arg.getParameter("line_seqn"))
		;
		temp1 = temp.selectForRow();
		temp.clear();
		temp.param
			.query("call fn_seq_gen_v2 (				")
			.query("   :STOR "   , arg.getParameter("hqof_idcd"))  // 본사코드
			.query(" , :table "  , "purc_istt_mast"		)  // 테이블명
			.query(" , :invc_numb "  , "not defined"	)  // Invoice 번호
			.query(" ) 									")
		;
		temp2 = temp.selectForRow();
		double istt_qntt = Double.parseDouble(arg.getParamText("istt_qntt"));
		double offr_pric = Double.parseDouble(temp1.getParamText("offr_pric"));
		double istt_amnt = offr_pric*istt_qntt;
		double istt_vatx = offr_pric*0.1;
		double ttsm_amnt = istt_vatx+istt_amnt;
		double diff_qntt = Double.parseDouble(arg.getParamText("diff_qntt"));
		/*차이수량(diff_qntt) = 미납수량(qntt) - 입고수량(istt_qntt)*/

		System.out.println("istt = "+istt_qntt+" , offr_pric = "+offr_pric+" ,istt_amnt = "+ istt_amnt+", offr_vatx = "+istt_vatx+", ttsm_amnt = "+ttsm_amnt);
		data.param
			.table("purc_istt_mast											")
			.where("where invc_numb = :invc_numb							")		//invoice번호

			.unique("invc_numb"			, temp2.fixParameter("seq"			))

			.update("invc_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()) )		//invoice일자
			.update("bzpl_idcd"			, temp1.getParameter("bzpl_idcd"		))		//사업장ID
			.update("istt_wrhs_idcd"	, temp1.getParameter("istt_wrhs_idcd"	))		//입고창고ID
			.update("coun_iout_dvcd"	, temp1.getParameter("coun_iout_dvcd"	))		//내외자구분코드
			.update("cstm_idcd"			, temp1.getParameter("cstm_idcd"		))		//거래처ID
			.update("drtr_idcd"			, temp1.getParameter("drtr_idcd"		))		//담당자ID
			.update("dept_idcd"			, temp1.getParameter("dept_idcd"		))		//부서ID
			.update("istt_qntt"			, arg.getParameter("istt_qntt"		))		//입고수량
			.update("vatx_incl_yorn"	, temp1.getParameter("vatx_incl_yorn"	))		//부가세포함여부
			.update("vatx_rate"			, temp1.getParameter("vatx_rate"		))		//부가세율
			.update("istt_amnt"			, istt_amnt								)		//입고금액
			.update("istt_vatx"			, istt_vatx								)		//입고부가세
			.update("ttsm_amnt"			, ttsm_amnt								)		//합계금액
			.update("krwn_pric"			, temp1.getParameter("krwn_pric"		))		//원화단가
			.update("krwn_amnt"			, temp1.getParameter("krwn_amnt"		))		//원화금액
			.update("krwn_vatx"			, temp1.getParameter("krwn_vatx"		))		//원화부가세
			.update("krwn_amnt_totl"	, temp1.getParameter("krwn_amnt_totl"	))		//원화금액계
			.update("remk_text"			, temp1.getParameter("remk_text"		))		//비고

			.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;data.attach(Action.insert);
		data.execute();
		data.clear();

		data.param
			.table("purc_istt_item											")
			.where("where invc_numb		= :invc_numb						")		//invoice번호
			.where("and   line_seqn		= :line_seqn						")		//순번

			.unique("invc_numb"			, temp2.fixParameter("seq"			))		//invoice번호
			.unique("line_seqn"			, 1									)		//순번

			.update("istt_wrhs_idcd"	, temp1.getParameter("istt_wrhs_idcd"	))		//입고창고ID
			.update("zone_idcd"			, temp1.getParameter("zone_idcd"		))		//보관구역ID
			.update("item_idcd"			, temp1.getParameter("item_idcd"		))		//품목ID
			.update("istt_pric"			, temp1.getParameter("offr_pric"		))		//입고단가
			.update("istt_qntt"			, arg.getParameter("istt_qntt"		))		//입고수량
			.update("vatx_incl_yorn"	, temp1.getParameter("vatx_incl_yorn"	))		//부가세포함여부
			.update("vatx_rate"			, temp1.getParameter("vatx_rate"		))		//부가세율
			.update("istt_amnt"			, istt_amnt								)		//입고금액
			.update("istt_vatx"			, istt_vatx								)		//입고부가세
			.update("ttsm_amnt"			, ttsm_amnt								)		//합계금액
			.update("krwn_pric"			, temp1.getParameter("krwn_pric"		))		//원화단가
			.update("krwn_amnt"			, temp1.getParameter("krwn_amnt"		))		//원화금액
			.update("krwn_vatx"			, temp1.getParameter("krwn_vatx"		))		//원화부가세
			.update("krwn_amnt_totl"	, temp1.getParameter("krwn_amnt_totl"	))		//원화금액계
			.update("pric_dvcd"			, temp1.getParameter("pric_dvcd"		))		//단가구분코드
			.update("cstm_idcd"			, temp1.getParameter("cstm_idcd"		))		//거래처ID
			.update("stnd_unit"			, temp1.getParameter("stnd_unit"		))		//기준단위
			.update("stnd_unit_qntt"	, temp1.getParameter("stnd_unit_qntt"	))		//기준단위수량
			.update("paym_dvcd"			, temp1.getParameter("paym_dvcd"		))		//지급구분코드
			.update("lott_numb"			, temp1.getParameter("lott_numb"		))		//LOT번호
			.update("sral_strt_numb"	, temp1.getParameter("sral_strt_numb"	))		//시리얼시작번호
			.update("sral_endd_numb"	, temp1.getParameter("sral_endd_numb"	))		//시리얼종료번호
			.update("remk_text"			, temp1.getParameter("remk_text"		))		//비고
			.update("prof_data"			, temp1.getParameter("prof_data"		))		//증빙자료
			.update("istt_insp_yorn"	, temp1.getParameter("istt_insp_yorn"	))		//입고검사여부
			.update("insp_date"			, temp1.getParameter("insp_date"		))		//검사일자
			.update("insp_drtr_idcd"	, temp1.getParameter("insp_drtr_idcd"	))		//검사담당자ID
			.update("insp_mthd_dvcd"	, temp1.getParameter("insp_mthd_dvcd"	))		//검사방법구분코드
			.update("insp_qntt"			, temp1.getParameter("insp_qntt"		))		//검사수량
			.update("msmt_valu"			, temp1.getParameter("msmt_valu"		))		//측정값
			.update("pass_qntt"			, temp1.getParameter("pass_qntt"		))		//합격수량
			.update("poor_qntt"			, temp1.getParameter("poor_qntt"		))		//불량수량
			.update("poor_caus_bacd"	, temp1.getParameter("poor_caus_bacd"	))		//불량원인구분코드
			.update("judt_dvcd"			, temp1.getParameter("judt_dvcd"		))		//판정구분코드
			.update("orig_invc_numb"	, temp1.getParameter("invc_numb"		))		//원invoice번호
			.update("orig_amnd_degr"	, temp1.getParameter("amnd_degr"		))		//원invoice번호
			.update("orig_seqn"			, temp1.getParameter("line_seqn"		))		//원순번
			.update("istt_yorn"			, temp1.getParameter("istt_yorn"		))		//입고여부
			.update("uper_seqn"			, temp1.getParameter("uper_seqn"		))		//상위순번
			.update("disp_seqn"			, temp1.getParameter("disp_seqn"		))		//표시순번
			.update("make_cmpy_name"	, temp1.getParameter("make_cmpy_name"	))		//제조회사
			.update("rtil_ddln"			, temp1.getParameter("rtil_ddln"		))		//유통기한

			.update("updt_idcd"			, arg.getParameter("updt_idcd"		))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"		))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
		;data.attach(Action.insert);
		data.execute();
		data.clear();
		if(diff_qntt == 0){
			data.param
				.table("purc_ordr_item						")
				.where("where invc_numb		= :invc_numb	")		//invoice번호
				.where("and   line_seqn		= :line_seqn	")		//순번
				.where("and   amnd_degr		= :amnd_degr	")		//amd차수

				.unique("invc_numb"			, arg.fixParameter("invc_numb"			))		//invoice번호
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))		//순번
				.unique("amnd_degr"			, temp1.fixParameter("amnd_degr"		))		//amd 차수

				.update("dlvy_qntt"			,  arg.getParameter("dvly_qntt")		)		//미납수량

			;data.attach(Action.modify);
			data.execute();
		}else{
			data.param
				.table("purc_ordr_item						")
				.where("where invc_numb		= :invc_numb	")		//invoice번호
				.where("and   amnd_degr		= :amnd_degr	")		//amend 차수
				.where("and   line_seqn		= :line_seqn	")		//순번

				.unique("invc_numb"			, arg.fixParameter("invc_numb"			))		//invoice번호
				.unique("amnd_degr"			, temp1.fixParameter("amnd_degr"		))		//amend 차수
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))		//순번

				.update("dlvy_qntt"			, arg.getParameter("dvly_qntt")			)		//미납수량
				.update("orig_invc_numb"	, arg.getParameter("invc_numb"			))		//원invoice번호
				.update("orig_amnd_degr"	, temp1.getParameter("amnd_degr"		))		//원invoice번호
				.update("orig_seqn"			, arg.getParameter("line_seqn"			))		//원순번

			;data.attach(Action.modify);
			data.execute();
			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......   */
			sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "구매입고");
		}
		return null ;
	}

}




