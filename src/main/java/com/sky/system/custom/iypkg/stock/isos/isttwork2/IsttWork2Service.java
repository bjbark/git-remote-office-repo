package com.sky.system.custom.iypkg.stock.isos.isttwork2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class IsttWork2Service extends DefaultServiceHandler {
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
			.where("select    a.invc_numb       , a.line_seqn       , b.invc_date       , b.cstm_idcd						")
			.where("		, c.cstm_name       , a.item_idcd       , i.asmt_name       , i.asmt_code						")
			.where("		, json_value(p.json_data , '$**.asmt_dvcd') as asmt_dvcd    , p.offr_qntt						")
			.where("		, p.unit_idcd       , u.unit_name       , a.istt_qntt       , a.istt_pric						")
			.where("		, a.istt_amnt       , a.istt_vatx       , a.ttsm_amnt       , cm.cstm_name as acpt_cstm_name	")
			.where("		, a.line_clos       , a.find_name       , a.user_memo       , a.sysm_memo						")
			.where("		, a.line_ordr       , a.line_stat       , a.crte_idcd       , a.crte_urif						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("		, a.vatx_incl_yorn																				")
			.where("from   purc_istt_item a																					")
			.where("   left outer join purc_istt_mast b on a.invc_numb = b.invc_numb										")
			.where("   left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd												")
			.where("   left outer join asmt_mast i on a.item_idcd = i.asmt_idcd												")
			.where("   left outer join purc_ordr_item p on a.orig_invc_numb = p.invc_numb and a.orig_seqn = p.line_seqn		")
			.where("   left outer join purc_ordr_mast pm on p.invc_numb = pm.invc_numb										")
			.where("   left outer join unit_mast u on p.unit_idcd = u.unit_idcd												")
			.where("   left outer join boxx_acpt ba on p.orig_invc_numb = ba.invc_numb										")
			.where("   left outer join cstm_mast cm on ba.cstm_idcd = cm.cstm_idcd											")
			.where("where  1=1																								")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    ba.pcod_numb like %:pcod_numb%			" , arg.getParamText("pcod_numb" ))
			.where("and    b.invc_date  >= :invc1_date				" , arg.getParamText("fr_dt"))
			.where("and    b.invc_date  <= :invc2_date				" , arg.getParamText("to_dt"))
			.where("and    ba.prod_idcd   = :prod_idcd				" , arg.getParamText("prod_idcd" ))
			.where("and    ba.cstm_idcd  = :acpt_cstm_idcd			" , arg.getParamText("acpt_cstm_idcd" ))	//매출처
			.where("and    b.cstm_idcd   = :cstm_idcd2				" , arg.getParamText("cstm_idcd2"))			//매입처
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("and    json_value(a.json_data , '$**.offr_path_dvcd') = 2												")
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
			.where("select    a.invc_numb       , a.line_seqn         , i.asmt_code											")
			.where("		, a.offr_pric       , a.offr_qntt         , a.unit_idcd       , u.unit_name						")
			.where("		, ifnull(pi.istt_qntt,0) as sum_istt_qntt , (a.offr_qntt - ifnull(pi.istt_qntt,0)) as unistt	")
			.where("		, a.item_idcd as asmt_idcd     , json_value(a.json_data , '$**.asmt_dvcd') as asmt_dvcd			")
			.where("		, c.cstm_name as acpt_cstm_name, ba.cstm_idcd as acpt_cstm_idcd									")
			.where("		, ba.invc_numb as acpt_numb    , a.vatx_incl_yorn												")
			.where("		, if(a.item_idcd is null, a.item_name, i.asmt_name) as asmt_name								")
			.where("		, c2.cstm_idcd      , c2.cstm_name        , b.invc_date       , p.prod_name						")
			.where("		, a.line_clos       , a.find_name         , a.user_memo       , a.sysm_memo						")
			.where("		, a.line_ordr       , a.line_stat         , a.crte_idcd       , a.crte_urif						")
			.where("		, a.updt_user_name  , a.updt_ipad         , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name    , a.crte_ipad       , a.crte_dttm						")
			.where("from   purc_ordr_item a																					")
			.where("   left outer join purc_ordr_mast b  on a.invc_numb = b.invc_numb										")
			.where("   left outer join asmt_mast      i  on a.item_idcd = i.asmt_idcd										")
			.where("   left outer join unit_mast      u  on a.unit_idcd = u.unit_idcd										")
			.where("   left outer join (																					")
			.where("      select sum(ifnull(istt_qntt,0)) as istt_qntt, orig_invc_numb, orig_seqn from purc_istt_item		")
			.where("      group by orig_invc_numb, orig_seqn																")
			.where("   ) pi on a.invc_numb = pi.orig_invc_numb and a.line_seqn = pi.orig_seqn								")
			.where("   left outer join boxx_acpt      ba on a.orig_invc_numb = ba.invc_numb									")
			.where("   left outer join cstm_mast      c  on ba.cstm_idcd = c.cstm_idcd										")
			.where("   left outer join cstm_mast      c2 on b.cstm_idcd = c2.cstm_idcd										")
			.where("   left outer join product_mast   p  on ba.prod_idcd = p.prod_idcd										")
			.where("where  1=1																								")
			.where("and    json_value(b.json_data , '$**.offr_path_dvcd') = 2												")
//			.where("and    b.offr_dvcd = 1300																				")
			.where("and    (a.offr_qntt - ifnull(pi.istt_qntt,0)) > 0														")
			.where("and    b.invc_date  >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and    b.invc_date  <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and    ba.prod_idcd  = :prod_idcd		" , arg.getParamText("prod_idcd" ))
			.where("and    ba.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.invc_date asc, a.invc_numb asc limit 99999													")
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
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		data.param
			.query("select case when optn_logc_valu in ('예','1','YES','Yes','yes','Y','y') then 1 else 0 end as optn_logc_valu ")
			.query("from optn_mast																								")
			.query("where optn_idcd = 'purc_insp_yorn'																			")
		;
		String valu = data.selectForMap().toString();
		String restr = valu.replaceAll("[^0-9]","");
		String istt_yorn = restr;

		if(restr.equals("0")){
			istt_yorn = "1";
		}else{
			istt_yorn = "0";
		};

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_istt_item_json_fields");
			if(i == 0){
				//등록
				data.param
					.table ("purc_istt_mast")
					.where ("where invc_numb = :invc_numb")
					.where ("and   invc_date = :invc_date")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"	))	//INVOICE번호
					.unique("invc_date"        , row.fixParameter("invc_date"		))	//INVOICE일자

					.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("istt_wrhs_idcd"   , row.getParameter("istt_wrhs_idcd"	))	//입고창고
					.update("istt_dvcd"        , "1100"								)	//입고구분코드-구매입고
					.update("coun_iout_dvcd"   , row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"        , row.getParameter("drtr_idcd"		))	//담당자ID
					.update("dept_idcd"        , row.getParameter("dept_idcd"		))	//부서ID
					.update("stot_date"        , row.getParameter("stot_date"		))	//결제일자
					.update("stot_dvcd"        , row.getParameter("stot_dvcd"		))	//결제구분코드
					.update("stot_bass"        , row.getParameter("stot_bass"		))	//결제근거
					.update("paym_bank_name"   , row.getParameter("paym_bank_name"	))	//지급은행명
					.update("istt_insp_yorn"   , row.getParameter("istt_insp_yorn"	))	//입고검사여부

					.update("user_memo"        , row.getParameter("user_memo"		))
					.update("sysm_memo"        , row.getParameter("sysm_memo"		))
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.insert("line_stat"			, row.getParameter("line_stat"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("purc_istt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"	))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"	))

					.update("istt_wrhs_idcd"   , row.getParameter("istt_wrhs_idcd"	))		//입고창고ID
					.update("zone_idcd"        , row.getParameter("zone_idcd"		))		//구역ID
					.update("acct_bacd"        , 1002								)		//계정구분코드
					.update("item_idcd"        , row.getParameter("asmt_idcd"		))		//품목ID
					.update("istt_pric"        , row.getParameter("offr_pric"		))		//입고단가
					.update("istt_qntt"        , row.getParameter("istt_qntt"		))		//입고수량
					.update("istt_amnt"        , row.getParameter("istt_amnt"		))		//입고금액
					.update("istt_vatx"        , row.getParameter("istt_vatx"		))		//입고부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"		))		//합계금액
					.update("pric_dvcd"        , row.getParameter("pric_dvcd"		))		//단가구분코드
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"		))		//거래처ID
					.update("paym_dvcd"        , row.getParameter("paym_dvcd"		))		//지급구분코드
					.update("lott_numb"        , row.getParameter("lott_numb"		))		//LOT번호
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"	))		//자료구분 = 부가세포함여부
					.update("orig_invc_numb"   , row.getParameter("invc_numb"		))		//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"		))		//원순번
					.update("istt_yorn"        , 1									)		//입고여부
					.update("json_data"        , json								)		//jsondata
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
					.update("find_name"        , row.getParameter("asmt_code"		)
												+ "	"
												+ row.getParameter("asmt_name"		))
					.update("updt_user_name"	, row.getParameter("updt_user_name"	))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"		))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"		))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"	))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"		))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"		))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table ("purc_istt_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"	))
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"	))

					.update("istt_wrhs_idcd"   , row.getParameter("istt_wrhs_idcd"	))		//입고창고ID
					.update("zone_idcd"        , row.getParameter("zone_idcd"		))		//구역ID
					.update("acct_bacd"        , row.getParameter("acct_dvc"		))		//계정구분코드
					.update("item_idcd"        , row.getParameter("asmt_idcd"		))		//품목ID
					.update("istt_pric"        , row.getParameter("offr_pric"		))		//입고단가
					.update("istt_qntt"        , row.getParameter("istt_qntt"		))		//입고수량
					.update("istt_amnt"        , row.getParameter("istt_amnt"		))		//입고금액
					.update("istt_vatx"        , row.getParameter("istt_vatx"		))		//입고부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"		))		//합계금액
					.update("pric_dvcd"        , row.getParameter("pric_dvcd"		))		//단가구분코드
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"		))		//거래처ID
					.update("paym_dvcd"        , row.getParameter("paym_dvcd"		))		//지급구분코드
					.update("lott_numb"        , row.getParameter("lott_numb"		))		//LOT번호
					.update("vatx_incl_yorn"   , row.getParameter("vatx_incl_yorn"	))		//자료구분 = 부가세포함여부
					.update("orig_invc_numb"   , row.getParameter("invc_numb"		))		//원INVOICE번호
					.update("orig_seqn"        , row.getParameter("line_seqn"		))		//원순번
					.update("istt_yorn"        , 1									)		//입고여부
					.update("json_data"        , json								)		//jsondata
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
					.update("find_name"        , row.getParameter("asmt_code"		)
												+ "	"
												+ row.getParameter("asmt_name"		))
					.update("updt_user_name"	, row.getParameter("updt_user_name"	))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"		))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"		))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"	))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"		))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"		))  /*  생성UI  */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
			}
		}
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("purc_istt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		//item에 없으면 mast에서도 삭제되게끔
		temp.param
			.query("select if((b.line_seqn),'1','0') as yorn						")
			.query("from  purc_istt_mast a											")
			.query("left outer join purc_istt_item b on a.invc_numb = b.invc_numb	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("purc_istt_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
		return null;

	}

	public SqlResultMap getInvc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id");
		String table		= arg.getParamText("table_nm");
		String invc_numb	= arg.getParamText("invc_numb");

		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		data.param
			.query("call fn_seq_gen_v2 (			")
			.query("   :STOR      "  , STOR			)
			.query(" , :table     "  , table		)
			.query(" , :invc_numb "  , invc_numb	)
			.query(" )								")
		;
		return data.selectForMap();
	}

}
