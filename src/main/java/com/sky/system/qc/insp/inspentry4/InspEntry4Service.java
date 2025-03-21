package com.sky.system.qc.insp.inspentry4;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

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
public class InspEntry4Service  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearchSpts(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.query("from (																									")
			.query("select  m.invc_numb      , m.bzpl_idcd      , m.pdod_date      , m.acpt_numb      , m.acpt_seqn			")
			.query("      , m.pdsd_numb      , m.pdsd_date      , m.wkfw_idcd      , m.strt_dttm      , m.endd_dttm			")
			.query("      , m.work_date      , m.stnd_unit      , m.stnd_unit_qntt , m.prod_bzpl_idcd 						")
			.query("      , m.last_insp_yorn , m.last_insp_date , m.prog_stat_dvcd as pror_prog_stat_dvcd					")
			.query("      , d.line_seqn      , d.wkfw_seqn      , d.wkct_idcd      , d.cvic_idcd      , d.wkct_item_idcd	")
			.query("      , d.mold_idcd      , d.mtrl_bacd      , d.prod_dept_idcd , d.orig_invc_numb						")
			.query("      , d.cstm_idcd      , d.item_idcd      , d.bomt_degr      , i.unit_idcd      , d.indn_qntt			")
			.query("      , d.work_strt_dttm , d.work_endd_dttm , d.work_dvcd      , d.insp_wkct_yorn , d.last_wkct_yorn	")
			.query("      , d.cofm_yorn      , d.prog_stat_dvcd , d.uper_seqn      , d.disp_seqn							")
			.query("      , d.user_memo      , d.sysm_memo      , d.prnt_idcd      , d.line_levl      , d.line_ordr			")
			.query("      , d.line_stat      , d.line_clos      , d.find_name												")
			.query("      , d.updt_user_name , d.updt_ipad      , d.updt_dttm      , d.updt_idcd      , d.updt_urif			")
			.query("      , d.crte_user_name , d.crte_ipad      , d.crte_dttm      , d.crte_idcd      , d.crte_urif			")
			.query("      , c.cstm_name      , i.item_name      , i.item_spec      , j.item_name as work_item_name			")
			.query("      , s.dept_name      , j.item_spec as work_item_spec       , l.smor_pass_qntt , l.smor_poor_qntt	")
			.query("      , l.invc_date      , l.insp_dvcd      , l.invc_numb as last_invc_numb       , l.insp_mthd_dvcd	")
			.query("      , l.lott_numb      , l.pass_yorn      , l.insp_qntt      , l.remk_text      , l.judt_dvcd			")
			.query("      , l.istt_yorn      , ifnull(prod.prod_qntt,0) as prod_qntt                  , ai.deli_date		")
			.query("      , w.wkct_name      , prod.work_book_invc_numb														")
		;
		data.param
			.query("from   pror_item d																						")
			.query("left outer join pror_mast m on d.invc_numb      = m.invc_numb											")
			.query("left outer join (select ifnull(sum(a.prod_qntt),0) as prod_qntt, a.wkod_numb, a.invc_numb as work_book_invc_numb")
			.query("				from (select b.prod_qntt as prod_qntt, b.wkod_numb, w.last_wkct_yorn, b.invc_numb		")
			.query("					from work_book b																	")
			.query("					left outer join pror_item pm on pm.invc_numb = b.wkod_numb and pm.line_seqn = b.wkod_seqn	")
			.query("					left outer join wkfw_rout w on pm.wkfw_idcd = w.wkfw_idcd and pm.wkfw_seqn = w.line_seqn	")
		;
		if(!arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("					where w.last_wkct_yorn = '1'														")
			;
		}
		data.param
			.query("					) a																					")
			.query("				group by a.wkod_numb) prod on m.invc_numb = prod.wkod_numb								")
			.query("left outer join acpt_item ai on ai.invc_numb    = m.acpt_numb   and ai.line_seqn = m.acpt_seqn 			")
			.query("left outer join cstm_mast c on m.cstm_idcd      = c.cstm_idcd											")
			.query("left outer join item_mast i on d.item_idcd      = i.item_idcd											")
			.query("left outer join wkct_mast w on d.wkct_idcd      = w.wkct_idcd											")
			.query("left outer join dept_mast s on d.prod_dept_idcd = s.dept_idcd											")
			.query("left outer join item_mast j on d.wkct_item_idcd = j.item_idcd											")
			.query("left outer join last_insp l on d.invc_numb      = l.wkod_numb											")
			.query("where  1=1																								")
		;

		if(!arg.getParamText("mes_system_type").toUpperCase().equals("SJFLV")){
			data.param
				.query("					where w.last_wkct_yorn = '1'														")
			;
		}
		data.param
			.query("and    d.prog_stat_dvcd in ('3')																		")  /* 작업이 완료된 건수만을 검사한다.(0:대기, 1:생산착수,  2:중단 , 3:완료    */
			.query("and    d.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.query("and    m.acpt_numb   = :invc_numb		" , arg.getParamText("invc_numb" ))
			.query("and    m.pdod_date  >= :pdod_date1		" , arg.getParamText("fr_dt" ))
			.query("and    m.pdod_date  <= :pdod_date2		" , arg.getParamText("to_dt" ))
			.query("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.query("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.query("and    ai.deli_date	>= :deli1_date		" , arg.getParamText("fr_dt2" ))
			.query("and    ai.deli_date	<= :deli2_date		" , arg.getParamText("to_dt2" ))
			.query("and    d.line_stat   < :line_stat2		" , arg.getParamText("line_stat" ))
			.query("and    d.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap setOstt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("last_insp")
					.where("where invc_numb  = :invc_numb")
					.where("and   line_seqn  = :line_seqn")

					.unique("invc_numb"				, row.fixParameter("invc_numb"		))
					.unique("line_seqn"				, row.fixParameter("line_seqn"		))

					.update("wkod_numb"				, row.fixParameter("wkod_numb"		))
					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"))
					.update("invc_date"				, row.getParameter("invc_date"))
					.update("insp_dvcd"				, row.getParameter("insp_dvcd"))
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"))
					.update("dlvy_idcd"				, row.getParameter("dlvy_idcd"))
					.update("dlvy_seqn"				, row.getParameter("dlvy_seqn"))
					.update("cnfm_dept_idcd"		, row.getParameter("cnfm_dept_idcd"))
					.update("cnfm_drtr_idcd"		, row.getParameter("cnfm_drtr_idcd"))
					.update("pdsd_numb"				, row.getParameter("pdsd_numb"))
					.update("acpt_numb"				, row.getParameter("acpt_numb"))
					.update("acpt_seqn"				, row.getParameter("acpt_seqn"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("unit_idcd"				, row.getParameter("unit_idcd"))
					.update("wkct_idcd"				, row.getParameter("wkct_idcd"))
					.update("wkct_item_idcd"		, row.getParameter("wkct_item_idcd"))
					.update("work_indn_qntt"		, row.getParameter("work_indn_qntt"))
					.update("prod_qntt"				, row.getParameter("prod_qntt"))
					.update("insp_qntt"				, row.getParameter("insp_qntt"))
					.update("smor_pass_qntt"		, row.getParameter("smor_pass_qntt"))
					.update("smor_poor_qntt"		, row.getParameter("smor_poor_qntt"))
					.update("pass_yorn"				, row.getParameter("pass_yorn"))
					.update("stnd_unit"				, row.getParameter("stnd_unit"))
					.update("lott_numb"				, row.getParameter("lott_numb"))
					.update("sral_strt_numb"		, row.getParameter("sral_strt_numb"))
					.update("work_dvcd"				, row.getParameter("work_dvcd"))
					.update("insp_scre_numb"		, row.getParameter("insp_scre_numb"))
					.update("smpl_numb"				, row.getParameter("smpl_numb"))
					.update("istt_yorn"				, row.getParameter("istt_yorn"))
					.update("istt_date"				, row.getParameter("istt_date"))
					.update("prod_istt_qntt"		, row.getParameter("prod_istt_qntt"))
					.update("remk_text"				, row.getParameter("remk_text"))
					.update("memo"					, row.getParameter("memo"))
					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.update("sysm_memo"				, row.getParameter("sysm_memo"))
					.update("prnt_idcd"				, row.getParameter("prnt_idcd"))
					.update("line_levl"				, row.getParameter("line_levl"))
					.update("line_ordr"				, row.getParameter("line_ordr"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.update("line_clos"				, row.getParameter("line_clos"))
					.update("find_name"				, row.getParameter("find_name"))
					.update("updt_user_name"		, row.getParameter("updt_user_name"))
					.update("updt_ipad"				, row.getParameter("updt_ipad"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.update("uper_seqn"				, row.getParameter("updt_urif"))
					.update("crte_user_name"		, row.getParameter("crte_user_name"))
					.update("crte_ipad"				, row.getParameter("crte_ipad"))
					.update("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("crte_urif"				, row.getParameter("crte_urif"))
					.update("judt_dvcd"				, row.getParameter("judt_dvcd"))
					.update("insp_mthd_dvcd"		, row.getParameter("insp_mthd_dvcd"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.insert("line_levl"				, row.getParameter("line_levl"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )

					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(Action.modify);
			}
		}

		data.execute();
		return null ;
	}

//	public SqlResultMap setPass(HttpRequestArgument arg) throws Exception {
//		DataMessage data;
//		String invc_numb	= arg.getParamText("invc_numb") ;
//		String invc_date1	= arg.getParamText("invc_date") ;
//		String invc_date	= invc_date1.replaceAll("-", "") ;
//		String hq			= arg.getParamText("hqof_idcd") ;
//		String stor			= arg.getParamText("stor_id");
//
//		if (hq.length()		== 0  && stor.length() >= 10 ) {
//			hq = stor.substring(0,10) ;
//		}
//		if (invc_numb.length() == 0) {
//			invc_numb = "not defined" ;
//		}
//
//		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = arg.newStorage("POS");      }
//			data.param
//			.query("call auto_inspentry5 (			")
//			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
//			.query(" , '' 							")  // 납기일자
//			.query(" ) 								")
//		;
//		data.attach(Action.direct);
//		data.execute();
//		return null;
//
//	}

	public SqlResultMap setPass2(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.query("call prod_to_insp_ok (			")
			.query("   :_param "  , arg.fixParameter("param"))
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		data.param
			.table("last_insp")
			.where ("where wkod_numb  = :wkod_numb")

			.unique("wkod_numb"							, arg.fixParamText("invc_numb"))
			.update("smor_pass_qntt"					, arg.getParamText("prod_qntt"))
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}

	public SqlResultMap setPass3(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.query("call insp_to_istt_prod (			")
			.query("   :_param "  , arg.fixParameter("param"))
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();


		return null;
	}

	public SqlResultMap setPass4(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");
		data.param
			.query("call auto_work_isos_2(						")
			.query("   :invc_numb",arg.fixParameter("invc_numb"	))
			.query(" , :wrhs_idcd",arg.fixParameter("wrhs_idcd"	))
			.query(" , :drtr_idcd",arg.fixParameter("drtr_idcd"	))
			.query(")											")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}




	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 										") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 							") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0                   								")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}

	public SqlResultMap getInspCond(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    a.insp_type_idcd   , a.line_seqn        , a.insp_sbsc_name   , a.insp_cond		")
			.query("        , a.insp_levl_uppt   , a.insp_levl_midl   , a.insp_levl_lprt						")
			.query("        , a.rslt_iput_dvcd   , a.goal_levl        , a.insp_cvic_idcd						")
			.query("        , a.ctq_sbsc_yorn    , a.msmt_mthd_dvcd   , a.insp_levl        , a.lott_judt_stnd	")
			.query("        , a.insp_mthd_dvcd   , a.uppr_valu        , a.lwlt_valu								")
			.query("        , a.remk_text        , a.uper_seqn        , a.disp_seqn        , a.user_memo		")
			.query("        , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat        , a.line_clos        , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad        , a.updt_dttm        , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name   , a.crte_ipad        , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif        , b.wkct_idcd        , w.wkct_name		")
			.query("        , b.insp_type_name   , b.insp_type_code   , d.cvic_idcd        , d.cvic_name		")


		;
		data.param
			.where("from insp_cond a																		")
			.where("       left outer join insp_type_mast b on a.insp_type_idcd = b.insp_type_idcd			")
			.where("       left outer join cvic_mast      d on a.insp_cvic_idcd = d.cvic_idcd 				")
			.where("       left outer join wkct_mast      w on b.wkct_idcd = w.wkct_idcd 					")
			.where("where   1=1																				")
			.where("and     a.insp_type_idcd = :insp_type_idcd	" ,	arg.getParameter("insp_type_idcd"		))
			.where("and     a.line_stat < :line_stat			" , "2"										 )
			.where("order by a.line_seqn																	")
		;

		return data.selectForMap();
	}

	public SqlResultMap setLastInsp(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {

			} else {
				if (row.getParameter("isMaster") != null) {
					data.param
						.table("last_insp")
						.where("WHERE invc_numb = :invc_numb")
						.where("  AND line_seqn = :line_seqn")

						.unique("invc_numb"				, row.fixParameter("invc_numb"		))
						.unique("line_seqn"				, row.fixParameter("line_seqn"		))

						.update("invc_date"				, row.getParameter("invc_date"		))
						.update("cstm_idcd"				, row.getParameter("cstm_idcd"		))
						.update("pdsd_numb"				, row.getParameter("pdsd_numb"		))
						.update("wkod_numb"				, row.getParameter("orig_invc_numb"	))
						.update("acpt_numb"				, row.getParameter("acpt_numb"		))
						.update("acpt_amnd_degr"		, row.getParameter("acpt_amnd_degr"	))
						.update("acpt_seqn"				, row.getParameter("acpt_seqn"		))
						.update("item_idcd"				, row.getParameter("item_idcd"		))
						.update("unit_idcd"				, row.getParameter("unit_idcd"		))
						.update("wkct_idcd"				, row.getParameter("wkct_idcd"		))
						.update("wkct_item_idcd"		, row.getParameter("wkct_item_idcd"	))
						.update("work_indn_qntt"		, row.getParameter("work_indn_qntt"	))
						.update("smor_pass_qntt"		, row.getParameter("pass_qntt"		))
						.update("smor_poor_qntt"		, row.getParameter("poor_qntt"		))
						.update("insp_qntt"				, row.getParameter("insp_qntt"		))
						.update("judt_dvcd"				, row.getParameter("judt_dvcd"		))
						.update("wkct_insp_dvcd"		, row.getParameter("wkct_insp_dvcd"	))

						.update("updt_idcd"				, row.getParameter("updt_idcd"))
						.insert("crte_idcd"				, row.getParameter("crte_idcd"))
						.update("updt_ipad"				, arg.remoteAddress )
						.insert("crte_ipad"				, arg.remoteAddress )
						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(rowaction);
				} else {
					data.param
						.table("last_insp_dtil")
						.where("WHERE invc_numb = :invc_numb")
						.where("  AND line_seqn = :line_seqn")
						.where("  AND assi_seqn = :assi_seqn")

						.unique("invc_numb"				, row.fixParameter("invc_numb"		))
						.unique("line_seqn"				, row.fixParameter("orig_line_seqn"	))
						.unique("assi_seqn"				, row.fixParameter("assi_seqn"		))

						.update("insp_sbsc_idcd"		, row.getParameter("insp_type_idcd"	))
						.update("insp_sbsc_seqn"		, row.getParameter("line_seqn"		))
						.update("insp_sbsc_name"		, row.getParameter("insp_sbsc_name"	))
						.update("insp_cvic_idcd"		, row.getParameter("insp_cvic_idcd"	))
						.update("insp_cond"				, row.getParameter("insp_cond"		))
						.update("msmt_valu_1fst"		, row.getParameter("msmt_valu"		))
						.update("judt_dvcd"				, row.getParameter("judt_dvcd"		))

						.update("updt_idcd"				, row.getParameter("updt_idcd"))
						.insert("crte_idcd"				, row.getParameter("crte_idcd"))
						.update("updt_ipad"				, arg.remoteAddress )
						.insert("crte_ipad"				, arg.remoteAddress )
						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(rowaction);
				}
			}
		}
		data.execute();
		return null ;
	}
}
