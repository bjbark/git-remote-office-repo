package com.sky.system.custom.sjflv.mtrl.isttcalc.purcrettmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;


@Service
public class PurcRettMastService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.invc_date       , a.bzpl_idcd       , a.cstm_idcd       , a.drtr_idcd 	")
			.where("        , cm.cstm_code      , cm.cstm_name      , cm.boss_name      , cm.tele_numb						")
			.where("        , dm.dept_code      , dm.dept_name      , bz.bzpl_code      , bz.bzpl_name						")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd											")
			.where("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name	")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif	")
			.where("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif	")
			.where("        , um.user_name as drtr_name             , i.remk_text       , i.lott_numb						")
			.where("from    purc_rett_mast a																				")
			.where("        left outer join cstm_mast cm on a.cstm_idcd = cm.cstm_idcd										")
			.where("        left outer join dept_mast dm on a.dept_idcd = dm.dept_idcd										")
			.where("        left outer join bzpl_mast bz on a.bzpl_idcd = bz.bzpl_idcd										")
			.where("        left outer join user_mast um on a.drtr_idcd = um.user_idcd										")
			.where("        left outer join ( select invc_numb , lott_numb													")
			.where("                               , group_concat(im.item_name separator ' / ') as remk_text 				")
			.where("                          from purc_rett_item oi 														")
			.where("                          left outer join item_mast im on im.item_idcd = oi.item_idcd					")
			.where("                          group by oi.invc_numb															")
			.where("                        ) i on a.invc_numb = i.invc_numb												")
			.where("where   1=1																								")
			.where("and     a.find_name like %:find_name%	" , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd		" , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1		" , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2		" , arg.getParamText("invc_date2" ))
			.where("and     a.cstm_idcd  = :cstm_idcd		" , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_numb  = :invc_numb		" , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat  = :line_stat1		" , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat  < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_date desc , a.invc_numb																	")
			.where(") a																										")
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
			.query("select a.*																									")
		;
		data.param
			.where("from (																										")
			.where("select    a.invc_numb       , a.line_seqn       , a.item_idcd       , a.unit_idcd       , a.wrhs_idcd      	")
			.where("        , a.rett_resn_dvcd  , a.norm_sale_pric  , a.sale_stnd_pric  , a.istt_pric       , a.rett_qntt		")
			.where("        , a.vatx_incl_yorn  , a.vatx_rate       , a.zone_idcd												")
			.where("        , a.rett_proc_dvcd  , a.proc_drtr_idcd  , a.proc_dttm       , a.apvl_date       , a.apvl_drtr_idcd	")
			.where("        , a.rett_memo       , a.lott_numb       , a.orig_invc_numb  , a.orig_seqn       , a.uper_seqn		")
			.where("        , a.disp_seqn       , a.orig_invc_numb as invc_orgn													")
			.where("        , i.item_code      , i.item_name      , i.item_spec      , i.unit_idcd as item_unit					")
			.where("        , wh.wrhs_code      , wh.wrhs_name      , wh.func_wrhs_idcd											")
			.where("        , a.sysm_memo       , a.prnt_idcd																	")
			.where("        , case when a.rett_proc_dvcd = '5000' then concat('폐기일자:', date_format(a.proc_dttm, '%Y-%m-%d'), ' ', a.user_memo) ")
			.where("               else a.user_memo 																			")
			.where("          end user_memo 																					")
			.where("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif		")
			.where("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.where("        ,  (a.rett_qntt * a.istt_pric) as sply_amnt															")
			.where("        , ((a.rett_qntt * a.istt_pric) * 0.1) as vatx_amnt													")
			.where("        , ((a.rett_qntt * a.istt_pric)+((a.rett_qntt * a.istt_pric) * 0.1)) as ttsm_amnt					")
			.where("        , a.orig_invc_numb as istt_invc_numb																")
			.where("        , im.invc_date as istt_invc_date																	")
			.where("        , a.purc_invc_numb																					")
			.where("        , pm.invc_date as purc_invc_date																	")
			.where("from    purc_rett_item a																					")
			.where("        left outer join purc_istt_item it on a.orig_invc_numb = it.invc_numb and a.orig_seqn = it.line_seqn	")
			.where("        left outer join purc_istt_mast im on im.invc_numb = it.invc_numb									")
			.where("        left outer join purc_ordr_item po on it.orig_invc_numb = po.invc_numb and it.orig_seqn = po.line_seqn")
			.where("        left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb									")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("        left outer join wrhs_mast wh on a.wrhs_idcd = wh.wrhs_idcd											")
			.where("where   1=1																									")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																						")
			.where(") a																											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getOstt(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select a.*																										")
		;
		data.param
			.where("from (																										")
			.where("          a.invc_numb       , a.line_seqn       , a.acpt_numb       , a.acpt_seqn       , a.item_idcd		")
			.where("        , a.sale_unit       , a.norm_sale_pric  , a.sale_stnd_pric  , a.sale_pric       , a.ostt_qntt		")
			.where("        , a.vatx_incl_yorn  , a.vatx_rate       , a.sale_amnt       , a.vatx_amnt       , a.ttsm_amnt		")
			.where("        , a.deli_date       , a.dlvy_date       , a.dlvy_hhmm       , a.stnd_unit       , a.stnd_unit_qntt	")
			.where("        , a.wrhs_idcd       , a.zone_idcd       , a.dlvy_cstm_idcd  , a.dsct_yorn       , a.ostt_dvcd		")
			.where("        , a.insp_dvcd       , a.insp_date       , a.pcod_numb       , a.sale_date       , a.sale_invc_numb	")
			.where("        , a.sale_qntt       , a.lott_numb       , a.orig_invc_numb  , a.orig_seqn       , a.uper_seqn		")
			.where("        , a.disp_seqn																						")
			.where("          m.invc_numb       , m.invc_date       , m.bzpl_idcd       , m.expt_dvcd       , m.cstm_idcd		")
			.where("        , m.ostt_dvcd       , m.drtr_idcd       , m.dept_idcd       , m.trut_dvcd       , m.dlvy_cond_dvcd	")
			.where("        , m.deli_date       , m.sale_stor_yorn  , m.crny_dvcd       , m.excg_rate       , m.remk_text		")
			.where("        , im.item_code      , im.item_name      , im.item_spec      , im.unit_idcd as item_unit				")
			.where("        , wh.wrhs_code      , wh.wrhs_name      , wh.func_wrhs_idcd											")
			.where("        , cm.cstm_code      , cm.cstm_name      , cm.boss_name      , cm.tele_numb							")
			.where("        , dm.dept_code      , dm.dept_name																	")
			.where("        , bz.bzpl_code      , bz.bzpl_name																	")
			.where("        , o  as rett_qntt   , null as rett_resn_dvcd  , null as rett_proc_dvcd , null as rett_memo			")
			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd												")
			.where("        , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name		")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd       , a.updt_urif		")
			.where("        , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.where("from    sale_ostt_item a																					")
			.where("        left outer join sale_ostt_mast m on a.invc_numb = m.invc_numb										")
			.where("        left outer join item_mast im     on a.item_idcd = im.item_idcd										")
			.where("        left outer join wrhs_mast wh     on a.wrhs_idcd = wh.wrhs_idcd										")
			.where("where   1=1																									")
			.where("and     a.find_name like %:find_name%		" , arg.getParamText("find_name"  ))
			.where("and     m.cstm_idcd =  :cstm_idcd			" , arg.getParamText("cstm_idcd"  ))
			.where("and     a.acpt_numb =  :acpt_numb			" , arg.getParamText("acpt_numb"  ))
			.where("and     a.item_idcd =  :item_idcd			" , arg.getParamText("item_idcd"  ))
			.where("and     m.invc_date between :fr_date		" , arg.getParamText("ostt_date1"  ))
			.where("                    and     :to_date		" , arg.getParamText("ostt_date2"  ))
			.where(") a																											")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String cstm_idcd = arg.getParamText("cstm_idcd");
		String invc_date = arg.getParamText("invc_date");
		if (invc_date.length() == 0) {
			invc_date = new SimpleDateFormat("yyyyMMdd").format(new Date());
		}
		data.param
			.query("select    :invc_date as invc_date	" , invc_date	)
			.query("        , :cstm_idcd as cstm_idcd	" , cstm_idcd	)
			.query("from    dual 										")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb       , a.line_seqn       , a.item_idcd       , a.istt_pric       , a.istt_qntt		")
				.query("        , a.istt_amnt       , a.istt_vatx       , a.ttsm_amnt       , a.vatx_incl_yorn  , a.lott_numb		")
				.query("        , a.invc_numb as orig_invc_numb         , a.line_seqn  as   orig_seqn								")
				.query("        , m.invc_date       , m.bzpl_idcd       , m.cstm_idcd       , m.drtr_idcd       , m.dept_idcd		")
				.query("        , im.item_code      , im.item_name      , im.item_spec      , im.unit_idcd as item_unit				")
				.query("        , cm.cstm_code      , cm.cstm_name      , cm.boss_name      , cm.tele_numb							")
				.query("        , dm.dept_code      , dm.dept_name      , bz.bzpl_code      , bz.bzpl_name							")
				.query("        , us.user_code      , us.user_name																	")
				.query("        , 0  as rett_qntt   , null as rett_resn_dvcd  , null as rett_proc_dvcd , null as rett_memo			")
				.query("        , (ifnull(lo.qntt,0) + ifnull(s.rett_qntt,0)) as unpaid												")
				.query("        , pm.invc_numb as purc_invc_numb , pm.invc_date as purc_invc_date , pi.line_seqn as purc_line_seqn	")
				.query("from    purc_istt_item a																					")
				.query("        left outer join purc_istt_mast m on a.invc_numb = m.invc_numb										")
				.query("        left outer join purc_ordr_item pi on a.orig_invc_numb = pi.invc_numb and a.orig_seqn = pi.line_seqn	")
				.query("        left outer join purc_ordr_mast pm on pm.invc_numb = pi.invc_numb									")
				.query("        left outer join item_mast im     on a.item_idcd = im.item_idcd										")
				.query("        left outer join cstm_mast cm     on m.cstm_idcd = cm.cstm_idcd										")
				.query("        left outer join dept_mast dm     on m.dept_idcd = dm.dept_idcd										")
				.query("        left outer join bzpl_mast bz     on m.bzpl_idcd = bz.bzpl_idcd										")
				.query("        left outer join user_mast us     on m.drtr_idcd = us.user_idcd										")
				.query("        left outer join lot_isos_book lo on lo.invc_numb = a.invc_numb and lo.invc_seqn = a.line_seqn and lo.isos_dvcd = '1100'	")
				.query("        left outer join ( select sum(ifnull(s.rett_qntt,0))as rett_qntt, s.orig_invc_numb, s.orig_seqn		")
				.query("                               , s.lott_numb																")
				.query("                            from purc_rett_item s 															")
				.query("                            left outer join purc_rett_mast m on s.invc_numb = m.invc_numb						")
				.query("                           where m.line_stat < 2																")
				.query("                           group by s.orig_invc_numb, s.orig_seqn , s.lott_numb								")
				.query("                        ) s on a.invc_numb = s.orig_invc_numb and a.line_seqn = s.orig_seqn and a.lott_numb = s.lott_numb	")
				.query("where   1=1																									")
				.query("and     (ifnull(a.istt_qntt,0)-ifnull(s.rett_qntt,0)) > 0													")
				.query("and     a.find_name like %:find_name%		" , arg.getParamText("find_name"  ))
				.query("and     m.cstm_idcd  =  :cstm_idcd			" , arg.getParamText("cstm_idcd"  ))
				.query("and     a.wrhs_idcd  =  :wrhs_idcd			" , arg.getParamText("wrhs_idcd"  ))
				.query("and     a.item_idcd  =  :item_idcd			" , arg.getParamText("item_idcd"  ))
				.query("and     m.invc_date  >= :invc_date1			" , arg.getParamText("invc_date1" ))
				.query("and     m.invc_date  <= :invc_date2			" , arg.getParamText("invc_date2" ))
				.where("and    json_value(a.json_data, '$.trns_date') >= :invc_date3", arg.getParamText("invc_date1" ))	//납기일
				.where("and    json_value(a.json_data, '$.trns_date') <= :deli_date4", arg.getParamText("invc_date2" ))
				.query("and     a.lott_numb like :lott_numb%		" , arg.getParamText("lott_numb" )) 		// Lot번호
				.query("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
				.query("order by m.invc_date desc, m.invc_numb, a.line_seqn	")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String cstm_idcd = "";

		for (SqlResultRow row:map) {
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class) , cstm_idcd );
			}
		}
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map , String cstm_idcd) throws Exception {
		for(SqlResultRow row:map) {
			// 반품등록 시 세금계산서 발행여부를 점검한다.

//			boolean isExist = isExistTxblItem(arg, row.getParamText("orig_invc_numb"), row.getParamText("orig_seqn"));
//			if (isExist) {
//				throw new ServiceException("계산서가  발행된 품목이 선택되었습니다.<br><br>반품 등록을 할 수 없습니다." );
//			}

			data.param
				.query("call fn_seq_gen_v2 (			")
				.query("   :STOR "   	, arg.store		)  // 본사코드
				.query(" , :table "  	, "purc_rett_mast"	)  // 테이블명
				.query(" , :invc_numb " , "not defined"	)  // Invoice 번호
				.query(" ) 								")
			;
			String invc_numb = (String)data.selectForMap().get(0).get("seq");
			data.clear();

			if ( Double.parseDouble(row.getParamText("rett_qntt"))== 0) {
				/* 반품수량이 0이면 DB에 반영하지 않는다.   */
				} else {
					data.param
					.table("purc_rett_mast")
					.where("where invc_numb		= :invc_numb	")		// INVOICE번호

					.unique("invc_numb"			, invc_numb)	// INVOICE번호

					.update("invc_date"			, mst.getParameter("invc_date"			))	// INVOICE일자
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))	// 사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))	// 거래처ID
					.update("drtr_idcd"			, mst.getParameter("drtr_idcd"			))	// 담당자ID
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))	// 부서ID
					.update("rett_hhmm"			, row.getParameter("rett_hhmm"			))	// 반품시분
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"			))	// 통화구분코드
					.update("excg_rate"			, row.getParameter("excg_rate"			))	// 환율
					.update("remk_text"			, row.getParameter("remk_text"			))	// 비고
					.update("user_memo"			, row.getParameter("user_memo"			))	// 사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	// 시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	// 부모ID
					.insert("line_levl"			, row.getParameter("line_levl"			))	// ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	// ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	// ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	// ROW마감
					.update("find_name"			, row.getParamText("invc_date"			).trim()
												+ row.getParamText("invc_numb"			).trim()
												+ row.getParamText("cstm_idcd"			).trim()
												+ row.getParamText("drtr_idcd"			).trim())	// 찾기명
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	// 수정사용자명
					.update("updt_ipad"			, arg.remoteAddress )	// 수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	// 수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	// 수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	// 생성사용자명
					.insert("crte_ipad"			, arg.remoteAddress )	// 생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	// 생성ID
					.update("crte_urif"			, row.getParameter("crte_urif"			))	// 생성UI

				;data.attach(Action.insert);
				data.execute();
				data.clear();

				}

			double rett_qntt = 0 ;  //단가
			double new_sply_amnt = 0 ;  //수량
			double new_vatx_amnt = 0 ;  //공급가액
			double new_ttsm_amnt = 0 ;  //부가세액

			rett_qntt  = Double.parseDouble(row.getParamText("rett_qntt"));
			new_sply_amnt  = Double.parseDouble(row.getParamText("new_sply_amnt"));
			new_vatx_amnt  = Double.parseDouble(row.getParamText("new_vatx_amnt"));
			new_ttsm_amnt  = Double.parseDouble(row.getParamText("new_ttsm_amnt"));

				// 23.07.07 - 이강훈 - 반품등록 시  처리상태를 '재고반영'으로 설정, 삼정요청
				data.param
					.table("purc_rett_item")
					.where("where invc_numb		= :invc_numb			")	// INVOICE번호
					.where("and   line_seqn		= :line_seqn			")	// 순번

					.unique("invc_numb"			, invc_numb)								// INVOICE번호
					.unique("line_seqn"			, 1)										// 순번
					.update("purc_invc_numb"	, row.getParameter("purc_invc_numb"		))	// 품목ID
					.update("purc_seqn"			, row.getParameter("purc_line_seqn"		))	// 품목ID
					.update("item_idcd"			, row.getParameter("item_idcd"			))	// 품목ID
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))	// 단위ID
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"			))	// 창고ID
					.update("zone_idcd"			, row.getParameter("zone_idcd"			))	// 구역ID
					.update("rett_resn_dvcd"	, row.getParameter("rett_resn_dvcd"		))	// 반품사유구분코드
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))	// 정상판매단가
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))	// 판매기준단가
					.update("istt_pric"			, row.getParameter("istt_pric"			))	// 판매단가
					.update("rett_qntt"			, rett_qntt)	// 반품수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))	// 부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))	// 부가세율
					.update("sply_amnt"			, new_sply_amnt)	// 공급가액
					.update("vatx_amnt"			, new_vatx_amnt)	// 부가세금액
					.update("ttsm_amnt"			, new_ttsm_amnt)	// 합계금액
					.update("rett_proc_dvcd"	, "1000")									// 반품처리구분코드
					.update("proc_drtr_idcd"	, row.getParameter("proc_drtr_idcd"		))	// 처리담당자ID
					.update("proc_dttm"			, row.getParameter("proc_dttm"			))	// 처리일시
					.update("apvl_date"			, row.getParameter("apvl_date"			))	// 승인일자
					.update("apvl_drtr_idcd"	, row.getParameter("apvl_drtr_idcd"		))	// 승인담당자ID
					.update("rett_memo"			, row.getParameter("rett_memo"			))	// 반품메모
					.update("lott_numb"			, row.getParameter("lott_numb"			))	// LOT번호
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"			))	// invc
					.update("orig_seqn"			, row.getParameter("orig_seqn"			))	// invc_seqn
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	// 상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	// 표시순번
					.update("user_memo"			, row.getParameter("user_memo"			))	// 사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	// 시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	// 부모ID
					.insert("line_levl"			, row.getParameter("line_levl"			))	// ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	// ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	// ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	// ROW마감
					.update("find_name"			, row.getParameter("find_name"			))	// 찾기명
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))	// 수정사용자명
					.update("updt_ipad"			, arg.remoteAddress )	// 수정IP
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 수정일시
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))	// 수정ID
					.update("updt_urif"			, row.getParameter("updt_urif"			))	// 수정UI
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	// 생성사용자명
					.insert("crte_ipad"			, arg.remoteAddress )	// 생성IP
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	// 생성일시
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	// 생성ID
					.update("crte_urif"			, row.getParameter("crte_urif"			))	// 생성UI
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();



				// 23.09.07 - 이강훈 - 반품등록 시 재고 반영 처리, 삼정요청
				sequence.setBook2(arg, invc_numb, 1 ,  row.getParamText("lott_numb") , "반품출고");

			}
		}


	public SqlResultMap setIsosPopup(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String rett_proc_dvcd	= arg.getParamText("rett_proc_dvcd") ;
		String lott_numb		= arg.getParamText("lott_numb") ;

		data.param
			.table("purc_rett_item")
			.where("where invc_numb		= :invc_numb			")	// INVOICE번호
			.where("and   line_seqn		= :line_seqn			")	// 순번

			.update("invc_numb"			, arg.fixParameter("invc_numb"	))
			.update("line_seqn"			, arg.fixParameter("line_seqn"	))
			.update("rett_proc_dvcd"	, arg.getParameter("rett_proc_dvcd"	))
//			.update("orig_invc_numb"	, arg.getParameter("orig_invc_numb"	))
			.update("lott_numb"			, arg.getParameter("lott_numb"	))

		;
		data.attach(Action.update);
		data.execute();


			data.param
			.table("purc_rett_item")
			.where("where invc_numb		= :invc_numb			")	// INVOICE번호
			.where("and   line_seqn		= :line_seqn			")	// 순번

			.update("invc_numb"			, arg.fixParameter("invc_numb"	))
			.update("line_seqn"			, arg.fixParameter("line_seqn"	))
			.update("rett_proc_dvcd"	, arg.getParameter("rett_proc_dvcd"	))
			.update("proc_dttm"			, arg.getParameter("proc_dttm"	))
//			.update("orig_invc_numb"	, arg.getParameter("orig_invc_numb"	))
			.update("lott_numb"			, arg.getParameter("lott_numb"	))

		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		// 23.09.07 - 이강훈 - 반품등록 시 재고 반영을 하기 때문에 반품 폐기 건 만 처리
		if ("5000".equals(rett_proc_dvcd)) {
			boolean isExist = isExistTxblItem(arg, arg.getParamText("invc_numb"), arg.getParamText("line_seqn"));
			if (isExist) {
				throw new ServiceException("계산서가  발행된 품목이 선택되었습니다.<br><br>불량폐기를 할 수 없습니다." );
			}

			sequence.setBook2(arg, arg.getParamText("invc_numb"), 0 ,  arg.getParamText("lott_numb") , "반품폐기");
		} else if ("6000".equals(rett_proc_dvcd)) {
			data.param
				.table("isos_book													")
				.where("where invc_numb 	 = :invc_numb							")
				.where("and   line_seqn 	 = :line_seqn							")
				.where("and   stok_type_dvcd = :stok_type_dvcd						")
				.where("and   invc_dvcd 	 = :invc_dvcd							")

				.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
				.unique("stok_type_dvcd"	, 1										)
				.unique("invc_dvcd"			, "2700"								)
			;
			data.attach(Action.delete);

			data.execute();

			data.param
				.table("lot_isos_book												")
				.where("where lott_numb 	 = :lott_numb							")
				.where("and   stok_type_dvcd = :stok_type_dvcd						")
				.where("and   invc_numb 	 = :invc_numb							")
				.where("and   invc_seqn 	 = :invc_seqn							")
				.where("and   isos_dvcd 	 = :isos_dvcd							")

				.unique("lott_numb"			, arg.fixParameter("lott_numb"			))
				.unique("stok_type_dvcd"	, 1										)
				.unique("invc_numb"			, arg.getParameter("invc_numb"			))
				.unique("invc_seqn"			, 1										)
				.unique("isos_dvcd"			, "2700"								)
			;
			data.attach(Action.delete);
			data.execute();
		}

		return null;
	}

	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");


		// 반품등록 시 세금계산서 발행여부를 점검한다.
		boolean isExist = isExistCrdtItem(arg, arg.getParamText("invc_numb"), "");
		if (isExist) {
			throw new ServiceException("매입지급이 등록 되어있는 품목이 선택되었습니다.<br><br>삭제 할 수 없습니다." );
		}

		data.param
			.table("purc_rett_mast												")
			.where("where invc_numb = :invc_numb								")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))

			.update("line_stat"			, "2" 									)
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );

		;data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("purc_rett_item												")
			.where("where invc_numb = :invc_numb								")		//invoice번호

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))

			.update("line_stat"			, "2" 									 )
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );

		;data.attach(Action.update);
		data.execute();

		data.param
			.table("isos_book													")
			.where("where invc_numb = :invc_numb									")
			.where("and line_seqn = :line_seqn									")
			.where("and stok_type_dvcd = :stok_type_dvcd						")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"			))
			.unique("stok_type_dvcd"	, 1										)

		;data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("lot_isos_book												")
			.where("where lott_numb = :lott_numb								")
			.where("and   stok_type_dvcd = :stok_type_dvcd						")
			.where("and   invc_numb = :invc_numb						")
			.where("and   invc_seqn = :invc_seqn						")

			.unique("lott_numb"			, arg.fixParameter("lott_numb"			))
			.unique("stok_type_dvcd"	, 1										)
			.unique("invc_numb"			, arg.getParameter("invc_numb"))
			.unique("invc_seqn"			, 1)

		;data.attach(Action.delete);
		data.execute();


		/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
	//	sequence.setBook(arg, arg.fixParamText("invc_numb"), 0 , "반품폐기");

		return null ;
	}

	// 세금계선서가 발행된 품목인지 확인한다.
	public boolean isExistTxblItem(HttpRequestArgument arg, String invc_numb, String line_seqn) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(a.invc_numb) as count										")
			.where("from   sale_item a														")
			.where("       left outer join txbl_item b on b.invc_numb = a.prnt_idcd			")
			.where("where  1 = 1															")
			.where("and    b.orig_invc_numb = :invc_numb	" , invc_numb					 )
			.where("and    b.orig_invc_seqn = :line_seqn	" , line_seqn					 )
			;
		int count = Integer.parseInt(data.selectForRow().getParamText("count"));

		return (count == 0) ? false : true;
	}

	public boolean isExistCrdtItem(HttpRequestArgument arg, String invc_numb, String line_seqn) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select count(a.invc_numb) as count										")
			.where("from   crdt_colt_item a													")
			.where("where  1 = 1															")
			.where("and exists (select '1'													")
			.where("             from sale_item b											")
			.where("             where 1 = 1												")
			.where("             and b.invc_numb = a.orig_invc_numb							")
			.where("             and b.line_seqn = a.orig_invc_seqn							")
			.where("             and b.orig_invc_numb = :invc_numb	" , invc_numb			 )
			.where("             and b.orig_invc_seqn = :invc_seqn	" , line_seqn			 )
			.where("            )															")
			;
		int count = Integer.parseInt(data.selectForRow().getParamText("count"));

		return (count == 0) ? false : true;
	}
}