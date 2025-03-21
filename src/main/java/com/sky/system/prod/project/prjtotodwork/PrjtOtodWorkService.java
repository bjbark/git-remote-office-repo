package com.sky.system.prod.project.prjtotodwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PrjtOtodWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.query("from (																									")
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date						")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd						")
			.query("		, a.divi_cont       , a.crny_dvcd       , a.excg_rate         , a.remk_text						")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl						")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name						")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd						")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm						")
			.query("		, a.crte_idcd       , a.crte_urif																")
			.query("		, c.cstm_name       , c.cstm_code       , d.user_name											")
			.query("		, (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as min_deli		")
			.query("		, (select max(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) as max_deli		")
			.query("		, (select sum(offr_qntt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_qntt	")
			.query("		, (select sum(offr_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_amnt	")
			.query("		, (select sum(offr_vatx) from purc_ordr_item r where r.invc_numb = a.invc_numb) as offr_vatx	")
			.query("		, (select sum(ttsm_amnt) from purc_ordr_item r where r.invc_numb = a.invc_numb) as ttsm_amnt	")
			.query("		, a.offr_dvcd       , a.supl_dvcd       , a.mtrl_ostt_date										")
			.query("from    purc_ordr_mast a																				")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd									")
			.query("where   1=1																								")
			.query("and     a.offr_dvcd = '3000'																			")
			.query("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.query("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date"))
			.query("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date"))
			.query("and     a.drtr_idcd   = :drtr_idcd    " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.query("and     a.cstm_idcd   = :cstm_idcd    " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.query("and     a.line_clos   = :line_clos    " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.query("and     a.prnt_idcd   = :prnt_idcd    " , arg.getParamText("pjod_idcd" ) , !"".equals(arg.getParamText("pjod_idcd")))
			.query("and		a.supl_dvcd	like %:supl_dvcd% "	, arg.getParamText("supl_dvcd"))
			.query("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and     (select min(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) >= :deli1_date " , arg.getParamText("deli1_date" ))
			.query("and     (select max(deli_date) from purc_ordr_item r where r.invc_numb = a.invc_numb) <= :deli2_date " , arg.getParamText("deli2_date" ))
			.query("order by a.invc_numb																					")
			.query(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
			.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
			.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
			.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date		")
			.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
			.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
			.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
			.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
			.query("		, a.orig_seqn																	")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		, i.item_code       , i.item_name       , i.item_spec      , i.unit_idcd		")
			.query("		, u.unit_name																	")
		;
		data.param
			.where("from   purc_ordr_item a																	")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("       left outer join unit_mast u on i.unit_idcd = u.unit_code							")
			.where("where  1=1																				")
			.query("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and    a.invc_numb	      = :invc_numb  "	, arg.getParamText("invc_numb"))
			.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String pjod_idcd	= arg.getParamText("pjod_idcd") ;

		data.param
			.query("call project_work_otod (					")
			.query("   :pjod_idcd" 					, pjod_idcd	)
			.query(" ) 											")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("call project_work_otod (					")
				.query("   :pjod_idcd" 					, pjod_idcd	)
				.query(" ) 											")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			sequence.setClose(arg);
		}
		return null;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table("purc_ordr_mast"											)
				.where("where invc_numb = :invc_numb							")		//invoice번호
				.where("and   amnd_degr = :amnd_degr							")		//차수

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"		))

				.update("offr_dvcd"			, "3000"							)	//발주구분코드
				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
				.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
				.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
				.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처 ID
				.update("divi_cont"			, row.getParameter("divi_cont"		))	//분할횟수
				.update("offr_qntt"			, row.getParameter("offr_qntt"		))	//합계수량
				.update("crny_dvcd"			, row.getParameter("crny_dvcd"		))	//통화구분코드
				.update("excg_rate"			, row.getParameter("excg_rate"		))	//환율
				.update("offr_amnt"			, row.getParameter("offr_amnt"		))	//공급가액계
				.update("offr_vatx"			, row.getParameter("offr_vatx"		))	//부가세계
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))	//합계금액
				.update("supl_dvcd"			, row.getParameter("supl_dvcd"		))	//조달구분
				.update("remk_text"			, row.getParameter("remk_text"		))	//비고
				.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
				.update("prnt_idcd"			, row.getParameter("pjod_idcd"		))	//상위 ID
				.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
				.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
				.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
				.update("find_name"			, row.getParamText("invc_date"		).trim()
											+ row.getParamText("cstm_idcd"		).trim())
				.insert("line_levl"			, row.getParameter("line_levl"		))
				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;data.attach(Action.insert);
			data.execute();
			data.clear();


			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
			}
			data.execute();
			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
			sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "판매출고");
		}
		return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {

			/*납기일자 string으로 변환*/
			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			String deli_date1 = row.getParamText("deli_date");
			String deli_date = dt.format(new Date(deli_date1));

			data.param
					.table("pjod_work_schd"											)
					.where("where pjod_idcd      = :pjod_idcd						")		//invoice번호
					.where("and   work_schd_dvcd = :work_schd_dvcd					")		//작업일정구분코드
					.where("and   id             = :id								")		//id

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"		))
					.unique("work_schd_dvcd"	, row.fixParameter("work_schd_dvcd"	))
					.unique("id"				, row.fixParameter("gant_id"		))

					.update("work_indn_date"	, mst.getParameter("invc_date"		))		//작업지시일자
					.update("work_indn_yorn"	, "1"								)		//작업지시여부

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.update);
				data.execute();
				data.clear();

			data.param
				.table("purc_ordr_item"											)
				.where("where invc_numb = :invc_numb							")		//invoice번호
				.where("and   line_seqn = :line_seqn							")		//invoice순번

				.unique("invc_numb"			, mst.fixParameter("new_invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))

				.update("amnd_degr"			, row.getParameter("amnd_degr"		))		//차수
				.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
				.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
				.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
				.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
				.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
				.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
				.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//발주금액계
				.update("prnt_idcd"			, row.getParameter("pjod_idcd"		))
				.update("user_memo"			, row.getParameter("user_memo"		))		//비고
				.update("deli_date"			, deli_date							)		//발주일자

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;data.attach(Action.insert);
			data.execute();
			data.clear();
		}
	}

	public SqlResultMap setDeleted(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");
		temp.param
			.query("select line_stat, line_clos				")
			.query("from   purc_ordr_mast					")
		 	.query("where invc_numb = :invc_numb", arg.fixParameter("invc_numb"))
		;
		SqlResultRow del = temp.selectForRow();

		if ( Double.parseDouble( del.getParamText( "line_clos" )) == 1) {
			throw new ServiceException("재고 입고가 마감되어 삭제할 수 없습니다.");
		}

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setIstt(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_item_rcpt (			")
			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :auto_insp "  , "N"			)  // 자동 합격처리 여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {
		String invc_numb		= arg.getParamText("invc_numb") ;
		String mtrl_ostt_date	= arg.getParamText("mtrl_ostt_date") ;
		DataMessage data;

		data = arg.newStorage("POS");

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb		")
			//
			.unique("invc_numb"		, invc_numb			)

			.update("mtrl_ostt_date", mtrl_ostt_date	)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.update);
		data.execute();
		return null;
	}
}
