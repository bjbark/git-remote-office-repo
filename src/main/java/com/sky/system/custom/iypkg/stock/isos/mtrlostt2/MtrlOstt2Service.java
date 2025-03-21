package com.sky.system.custom.iypkg.stock.isos.mtrlostt2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class MtrlOstt2Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.line_seqn       , b.invc_date       , a.item_idcd as asmt_idcd			")
			.where("		, i.asmt_name       , i.asmt_spec       , pi.istt_qntt      , a.ostt_qntt						")
			.where("		, a.orig_invc_numb  , a.orig_seqn       , a.vatx_incl_yorn										")
			.where("		, a.unit_idcd       , u.unit_name       , c.cstm_name       , a.remk_text						")
			.where("		, a.user_memo       , a.sysm_memo       , a.line_ordr       , a.line_stat						")
			.where("		, a.line_clos       , a.find_name       , a.updt_user_name  , a.updt_ipad						")
			.where("		, a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name					")
			.where("		, a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif						")
			.where("		, json_value(po.json_data , '$**.asmt_dvcd') as asmt_dvcd										")
			.where("from   mtrl_ostt_item a																					")
			.where("   left outer join mtrl_ostt_mast b on a.invc_numb = b.invc_numb										")
			.where("   left outer join asmt_mast i on a.item_idcd = i.asmt_idcd												")
			.where("   left outer join unit_mast u on a.unit_idcd = u.unit_idcd												")
			.where("   left outer join purc_istt_item pi on a.orig_invc_numb = pi.orig_invc_numb and a.orig_seqn = pi.line_seqn	")
			.where("   left outer join cstm_mast c on pi.cstm_idcd = c.cstm_idcd											")
			.where("   left outer join purc_ordr_item po on pi.orig_invc_numb = po.invc_numb and pi.orig_seqn = po.line_seqn")
			.where("   left outer join boxx_acpt ba on po.orig_invc_numb = ba.invc_numb										")
			.where("where  1=1																								")
			.where("and    b.ostt_path_dvcd  = 2																			")
			.where("and    a.find_name  like %:find_name%				" , arg.getParamText("find_name" ))
			.where("and    ba.pcod_numb like %:pcod_numb%				" , arg.getParamText("pcod_numb" ))
			.where("and    b.invc_date     >= :invc1_date				" , arg.getParamText("invc_date1"))
			.where("and    b.invc_date     <= :invc2_date				" , arg.getParamText("invc_date2"))
			.where("and    ba.invc_numb     = :acpt_numb				" , arg.getParamText("acpt_numb" ))
			.where("and    ba.prod_idcd     = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    ba.item_leng     = :item_leng				" , arg.getParamText("item_leng" ))
			.where("and    ba.item_widh     = :item_widh				" , arg.getParamText("item_widh" ))
			.where("and    ba.item_hght     = :item_hght				" , arg.getParamText("item_hght" ))
			.where("and    a.line_stat      < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date asc, a.invc_numb asc limit 99999													")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.line_seqn       , b.invc_date       , b.cstm_idcd						")
			.where("		, c.cstm_name       , i.asmt_code       , i.asmt_idcd       , i.asmt_name						")
			.where("		, a.istt_qntt       , ifnull(a.ostt_qntt,0) as ostt_qntt    , u.unit_name						")
			.where("		, (a.istt_qntt-ifnull(a.ostt_qntt,0)) as unused             , a.remk_text						")
			.where("		, json_value(po.json_data , '$**.asmt_dvcd') as asmt_dvcd   , po.unit_idcd						")
			.where("		, a.istt_amnt       , a.istt_pric       , a.vatx_incl_yorn										")
			.where("		, a.line_clos       , a.find_name       , a.user_memo       , a.sysm_memo						")
			.where("		, a.line_ordr       , a.line_stat       , a.crte_idcd       , a.crte_urif						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("from   purc_istt_item a																					")
			.where("   left outer join purc_istt_mast b on a.invc_numb = b.invc_numb										")
			.where("   left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("   left outer join asmt_mast i on a.item_idcd = i.asmt_idcd												")
			.where("   left outer join purc_ordr_item po on a.orig_invc_numb = po.invc_numb and a.orig_seqn = po.line_seqn	")
			.where("   left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb										")
			.where("   left outer join unit_mast u on po.unit_idcd = u.unit_idcd											")
			.where("where  1=1																								")
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and    json_value(pm.json_data , '$**.offr_path_dvcd') = 2												")
			.where("and    (a.istt_qntt-ifnull(a.ostt_qntt,0)) > 0															")
			.where("order by b.invc_date asc, a.invc_numb																	")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;

		for (SqlResultRow row:map) {
			temp.param
				.query("select ifnull(ostt_qntt,0) as ostt_qntt			")
				.query("from  purc_istt_item							")
				.query("where invc_numb = :orig_invc_numb"	, row.getParameter("invc_numb"))
				.query("and   line_seqn = :orig_seqn"		, row.getParameter("line_seqn"))
			;
			SqlResultRow purc = temp.selectForRow();
			temp.clear();

			//입고테이블에 출고수량 업데이트를 위하여 기존 수량 조회
			double purc_qntt = Double.parseDouble(purc.getParamText("ostt_qntt"));
			int mtrl_qntt = Integer.parseInt((String)row.getParameter("ostt_qntt2"));
			int qntt = (int) (purc_qntt+mtrl_qntt);

			//등록
			if(i == 0){
				data.param
					.table ("mtrl_ostt_mast")
					.where ("where invc_numb = :invc_numb")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))		//INVOICE번호

					.update("invc_date"        , row.getParameter("ostt_date"))			//INVOICE 일자
					.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"))			//사업장ID
					.update("ostt_dvcd"        , row.getParameter("ostt_dvcd"))			//출고구분코드
					.update("ostt_wrhs_idcd"   , row.getParameter("wrhs_idcd"))			//출고창고ID
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원INVOICE번호
					.update("cstm_dvcd"        , row.getParameter("cstm_dvcd"))			//거래처구분코드
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("cstm_name"        , row.getParameter("cstm_name"))			//거래처ID
					.update("drtr_idcd"        , row.getParameter("drtr_idcd"))			//담당자ID
					.update("ostt_usge_bacd"   , row.getParameter("ostt_usge_dvcd"))	//출고용도구분코드
					.update("ostt_path_dvcd"   , 2							)			//출고경로구분코드
					.update("remk_text"        , row.getParameter("remk_text"))			//비고
					.update("user_memo"        , row.getParameter("user_memo"))
					.update("sysm_memo"        , row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();


				data.param
					.table ("mtrl_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("ostt_wrhs_idcd"   , row.getParameter("ostt_wrhs_idcd"))	//출고창고ID
					.update("wkod_numb"        , row.getParameter("wkod_numb"))			//작업지시번호
					.update("ostt_resn_dvcd"   , row.getParameter("ostt_resn_dvcd"))	//출고사유구분코드
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원INVOICE번호
					.update("item_idcd"        , row.getParameter("asmt_idcd"))			//품목ID
					.update("unit_idcd"        , row.getParameter("unit_idcd"))			//단위ID
					.update("stnd_pric"        , row.getParameter("istt_pric"))			//표준단가 = 입고단가
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))	//자재구분 = 부가세포함여부
					.update("amnt"             , row.getParameter("amnt"))				//입고금액
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))			//입고부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("ostt_qntt"        , row.getParameter("ostt_qntt2"))		//출고수량
					.update("find_name"        , row.getParameter("asmt_code")
												+ "	"
												+ row.getParameter("asmt_name"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("purc_istt_item")
					.where("where invc_numb = :invc_numb ")
					.where("and   line_seqn = :line_seqn ")

					.unique("invc_numb"		, row.fixParameter("invc_numb"))
					.unique("line_seqn"		, row.fixParameter("line_seqn"))

					.update("ostt_date"	, row.getParameter("ostt_date"))
					.update("ostt_qntt"	, qntt)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();


				i =+ 1;

			}else{
				data.param
					.table ("mtrl_ostt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("ostt_wrhs_idcd"   , row.getParameter("ostt_wrhs_idcd"))	//출고창고ID
					.update("wkod_numb"        , row.getParameter("wkod_numb"))			//작업지시번호
					.update("ostt_resn_dvcd"   , row.getParameter("ostt_resn_dvcd"))	//출고사유구분코드
					.update("orig_invc_numb"   , row.getParameter("invc_numb"))			//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"))			//원INVOICE번호
					.update("item_idcd"        , row.getParameter("asmt_idcd"))			//품목ID
					.update("unit_idcd"        , row.getParameter("unit_idcd"))			//단위ID
					.update("stnd_pric"        , row.getParameter("istt_pric"))			//표준단가 = 입고단가
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"))	//자재구분 = 부가세포함여부
					.update("amnt"             , row.getParameter("amnt"))				//입고금액
					.update("vatx_amnt"        , row.getParameter("vatx_amnt"))			//입고부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("ostt_qntt"        , row.getParameter("ostt_qntt2"))		//출고수량
					.update("find_name"        , row.getParameter("asmt_code")
												+ "	"
												+ row.getParameter("asmt_name"))
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("purc_istt_item")
					.where("where invc_numb = :invc_numb ")
					.where("and   line_seqn = :line_seqn ")

					.unique("invc_numb"		, row.fixParameter("invc_numb"))
					.unique("line_seqn"		, row.fixParameter("line_seqn"))

					.update("ostt_date"	, row.getParameter("ostt_date"))
					.update("ostt_qntt"	, qntt)
				;
				data.attach(Action.update);
				data.execute();
				data.clear();
			}
		}
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		DataMessage temp2 = arg.newStorage("POS");

		data.param
			.table("mtrl_ostt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		temp.param
			.query("select ostt_qntt,															")
			.query(" ( select b.invc_date														")
			.query("   from mtrl_ostt_item a													")
			.query("   left outer join mtrl_ostt_mast b on a.invc_numb = b.invc_numb			")
			.query("   where a.orig_invc_numb = :orig_invc_numb2	", arg.fixParameter("orig_invc_numb"))
			.query("   and   a.orig_seqn      = :orig_seqn2			", arg.fixParameter("orig_seqn"))
			.query("   order by b.invc_date desc limit 1) as invc_date							")
			.query("from  purc_istt_item														")
			.query("where invc_numb = :orig_invc_numb	", arg.fixParameter("orig_invc_numb"))
		 	.query("and   line_seqn = :orig_seqn		", arg.fixParameter("orig_seqn"))
		;

		SqlResultRow purc = temp.selectForRow();


		//자재출고 테이블에서 삭제된 수량, 구매입고 테이블 수량에 복원
		double purc_qntt = Double.parseDouble(purc.getParamText("ostt_qntt"));
		int mtrl_qntt = Integer.parseInt((String)arg.getParameter("ostt_qntt"));
		int qntt = (int) (purc_qntt-mtrl_qntt);

		String invc_date = purc.getParamText("invc_date");
		String date = (String) arg.getParameter("ostt_date");
		if(qntt == 0){
			date = "";
		}
		System.out.println("ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ"+invc_date);

		data.param
			.table ("purc_istt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   line_seqn = :line_seqn")

			.unique("invc_numb"        , arg.fixParameter("orig_invc_numb"))
			.unique("line_seqn"        , arg.fixParameter("orig_seqn"))

			.update("ostt_qntt"        , qntt)	//출고수량
			.update("ostt_date"        , invc_date)	//출고일자
		;
		data.attach(Action.update);
		data.execute();
		data.clear();


		//item에 없으면 mast에서도 삭제되게끔
		temp2.param
			.query("select if((b.line_seqn),'1','0') as yorn						")
			.query("from  mtrl_ostt_mast a											")
			.query("left outer join mtrl_ostt_item b on a.invc_numb = b.invc_numb	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;

		SqlResultRow yorn = temp2.selectForRow();
		System.out.println("여부"+yorn.getParamText("yorn"));

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("mtrl_ostt_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
		return null;
	}

}
