package com.sky.system.custom.kitec.prod.prodplan;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service("kitec.ProdPlanService")
public class ProdPlanService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param // 집계문  입력
				.query("call prod_plan_list (	")
				.query("  :invc_date1	" , arg.getParameter("invc_date1"))
				.query(" ,:invc_date2	" , arg.getParameter("invc_date2"))
				.query(" )	")
			;
		return data.selectForMap() ;
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from(																						")
			.where("select  a.invc_numb        , a.cvic_idcd        , c.cvic_name        , b.lott_numb			")
			.where("      , a.plan_sttm        , a.plan_edtm        , a.plan_qntt        , a.plan_qntt_1fst		")
			.where("      , a.item_idcd        , i.item_code        , i.item_name        , a.prod_trst_dvcd		")
			.where("      , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl			")
			.where("      , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name			")
			.where("      , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd			")
			.where("      , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm			")
			.where("      , a.crte_idcd        , a.crte_urif        , b.invc_numb as pror_numb					")
		;
		data.param
			.where("from prod_plan a																			")
			.where("  right outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("  left outer join  pror_mast b on a.invc_numb = b.pdsd_numb									")
			.where("  left outer join  item_mast i on a.item_idcd = i.item_idcd									")
			.where("where  1=1																					")
			.where(" and    a.cvic_idcd is not null																")
			.where(" and    c.wkct_idcd    = :wkct_idcd"        , arg.getParamText("wkct_idcd"))		//공정ID
			.where("and     a.plan_sttm   >= :invc_date3      " , arg.getParamText("invc_date3"))		//시작일자
			.where("and     a.plan_edtm   <= :invc_date4      " , arg.getParamText("invc_date4"))		//종료일자
			.where("and     a.line_stat    = :line_stat1"		, arg.getParamText("line_stat"))
			.where("and     a.line_stat    < :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.cvic_idcd, a.plan_sttm asc, invc_numb limit 999999								")
			.where(")a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getStok(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_idcd      , sum(stok_qntt) as qntt	")
			.query("from stok_mast									")
			.query("where  wrhs_idcd = '01'							")
			.query("and    item_idcd    =:item_idcd" , arg.getParamText("item_idcd"))
			.query("and    line_stat   < :line_stat" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by item_idcd								")
		;
		return data.selectForMap() ;
	}

	public SqlResultMap getQntt(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select  sum(a.invc_qntt) as invc_qntt    , sum(b.ostt_qntt) as ostt_qntt					")
			.query("      , (sum(a.invc_qntt) - sum(b.ostt_qntt)) as unostt										")
			.query("from  acpt_item a																			")
			.query("left outer join sale_ostt_item b on a.invc_numb = b.acpt_numb and a.line_seqn = b.acpt_seqn	")
			.query("where  1=1																					")
			.query("and    a.item_idcd    =:item_idcd" , arg.getParamText("item_idcd"))
			.query("and    a.line_clos    =  '0'" 										)
			.query("and    a.line_stat   < :line_stat" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.item_idcd																		")
		;

		return data.selectForMap() ;
	}



	public SqlResultMap setProdPlan(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("prod_plan")
			.where("where invc_numb	= :invc_numb" )

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

			.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"))		//사업장ID
			.update("item_idcd"			, arg.getParameter("item_idcd"))		//품목 ID
			.update("cstm_idcd"			, arg.getParameter("cstm_idcd"))		//거래처 ID
			.update("prod_line_idcd"	, arg.getParameter("wkfw_idcd"))		//생산라인 ID
			.update("cvic_idcd"			, arg.getParameter("cvic_idcd"))		//설비ID
			.update("mold_idcd"			, arg.getParameter("mold_idcd"))		//금형ID
			.update("mtrl_bacd"			, arg.getParameter("mtrl_bacd"))		//재질분류코드
			.update("bomt_degr"			, arg.getParameter("bomt_degr"))		//BOM차수
			.update("optn_yorn"			, arg.getParameter("optn_yorn"))		//사양여부
			.update("optn_sbsc"			, arg.getParameter("optn_sbsc"))		//사양항목
			.update("optn_sbsc_valu"	, arg.getParameter("optn_sbsc_valu"))	//사양항목값
			.update("plan_sttm"			, arg.getParameter("strt_date"))		//계획시작시간
			.update("plan_qntt"			, arg.getParameter("plan_qntt"))		//계획수량
			.update("plan_qntt_1fst"	, arg.getParameter("plan_qntt_1fst"))	//계획수량1
			.update("plan_edtm"			, arg.getParameter("endd_date"))		//계획종료시간
			.update("mngt_dept_idcd"	, arg.getParameter("mngt_dept_idcd"))	//관리부서
			.update("trst_dept_idcd"	, arg.getParameter("trst_dept_idcd"))	//의뢰부서
			.update("trst_drtr_idcd"	, arg.getParameter("trst_drtr_idcd"))	//의뢰담당자
			.update("prod_trst_dvcd"	, arg.getParameter("prod_trst_dvcd"))	//생산의뢰구분코드
			.update("prod_trst_numb"	, arg.getParameter("prod_trst_numb"))	//생산의뢰번호
			.update("trst_qntt"			, arg.getParameter("trst_qntt"))		//의뢰수량
			.update("stok_used_qntt"	, arg.getParameter("stok_used_qntt"))	//재고사용수량
			.update("cmpl_reqt_date"	, arg.getParameter("cmpl_reqt_date"))	//완료요청일자
			.update("curr_stok_qntt"	, arg.getParameter("curr_stok_qntt"))	//현재재고수량
			.update("cofm_drtr_idcd"	, arg.getParameter("cofm_drtr_idcd"))	//확정담당자
			.update("cofm_date"			, arg.getParameter("cofm_date"))		//최종일자
			.update("last_wker_idcd"	, arg.getParameter("last_wker_idcd"))	//최종작업자
			.update("last_work_date"	, arg.getParameter("last_work_date"))	//최종작업일자
			.update("find_name"			, arg.getParamText("new_invc_numb"		).trim()
										+ " "
										+ arg.getParamText("item_idcd"			).trim() )	//찾기명

			.update("remk_text"			, arg.getParameter("remk_text"))		//비고
			.update("user_memo"			, arg.getParameter("user_memo"))		//사용자메모
			.insert("line_levl"			, arg.getParameter("line_levl"))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		data.param
			.table("pror_mast")
			.where("where invc_numb	= :invc_numb" )

			.unique("invc_numb"			, arg.fixParameter("pror_invc_numb"))

			.update("wkod_dvcd"			, 3								)		//작업지시구분코드
			.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"))		//사업장ID
			.update("lott_numb"			, arg.getParameter("lott_numb"))		//lot번호
			.update("pdsd_numb"			, arg.getParameter("invc_numb"))		//생산계획번호
			.update("pdod_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산지시일자
			.update("pdsd_date"			, new SimpleDateFormat("yyyyMMdd").format(new Date()))		//생산계획일자
			.update("item_idcd"			, arg.getParameter("item_idcd"))		//품목ID
			.update("wkfw_idcd"			, arg.getParameter("wkfw_idcd"))		//공정흐름ID
			.update("indn_qntt"			, arg.getParameter("plan_qntt"))		//지시수량 = 계획수량(L)
			.update("indn_qntt_1fst"	, arg.getParameter("plan_qntt_1fst"))	//지시수량 = 계획수량1(R)
			.update("strt_dttm"			, arg.getParameter("strt_date"))		//시작일시
			.update("endd_dttm"			, arg.getParameter("endd_date"))		//종료일시
			.update("prog_stat_dvcd"	, 0								)		//진행상태구분코드 : 0 = 대기
			.update("find_name"			, arg.getParamText("pror_invc_numb"		).trim()
										+ " "
										+ arg.getParamText("item_idcd"			).trim() )	//찾기명

			.insert("line_levl"			, arg.getParameter("line_levl"))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		data.param
			.table("pror_item")
			.where("where invc_numb	= :invc_numb" )
			.where("and   line_seqn	= :line_seqn" )

			.unique("invc_numb"			, arg.fixParameter("pror_invc_numb"))
			.unique("line_seqn"			, 1								)		//1고정 하나만 들어감!

			.update("lott_numb"			, arg.getParameter("lott_numb"))		//lot번호
			.update("bzpl_idcd"			, arg.getParameter("bzpl_idcd"))		//사업장ID
			.update("cvic_idcd"			, arg.getParameter("cvic_idcd"))		//설비ID
			.update("item_idcd"			, arg.getParameter("item_idcd"))		//품목ID
			.update("wkfw_idcd"			, arg.getParameter("wkfw_idcd"))		//공정흐름ID
			.update("wkct_idcd"			, arg.getParameter("wkct_idcd"))		//공정ID
			.update("wkct_item_idcd"	, arg.getParameter("item_idcd"))		//공정품목ID
			.update("mold_idcd"			, arg.getParameter("mold_idcd"))		//금형ID
			.update("indn_qntt"			, arg.getParameter("plan_qntt"))		//지시수량 = 계획수량(L)
			.update("indn_qntt_1fst"	, arg.getParameter("plan_qntt_1fst"))	//지시수량 = 계획수량1(R)
			.update("plan_strt_dttm"	, arg.getParameter("strt_date"))		//시작일시
			.update("plan_endd_dttm"	, arg.getParameter("endd_date"))		//종료일시
			.update("prog_stat_dvcd"	, 0								)		//진행상태구분코드 : 0 = 대기
			.update("find_name"			, arg.getParamText("pror_invc_numb"		).trim()
										+ " "
										+ arg.getParamText("item_idcd"			).trim()
										+ " "
										+ arg.getParamText("wkct_idcd"			).trim())	//찾기명

			.insert("line_levl"			, arg.getParameter("line_levl"))
			.update("updt_idcd"			, arg.getParameter("updt_idcd"))
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"))
			.update("updt_ipad"			, arg.remoteAddress )
			.insert("crte_ipad"			, arg.remoteAddress )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("pror_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("pror_numb"))
		;
		data.attach(Action.delete);
		data.execute();

		data.param
			.table("pror_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("pror_numb"))
			.unique("line_seqn"		, 1)
		;
		data.attach(Action.delete);
		data.execute();

		data.param
			.table("prod_plan")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;
	}

}
