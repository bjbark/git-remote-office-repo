package com.sky.system.custom.sjflv.mtrl.imp.estimast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;



@Service("sjflv.mtrl.imp.EstiMastService")
public class EstiMastService  extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.query("from (																							")
			.query("select    a.invc_numb             , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.query("        , a.cstm_idcd             , a.esti_dvcd         , a.dept_idcd							")
			.query("        , a.drtr_idcd             , a.mdtn_prsn         , a.dlvy_cond       , a.esti_vald_term	")
			.query("        , a.excg_rate_chge_yorn   , a.paym_cond         , a.remk_text       , a.memo			")
			.query("        , a.esti_amnt             , a.esti_vatx         , a.ttsm_amnt       , a.crny_dvcd		")
			.query("        , a.excg_rate             , a.expt_dvcd													")
			.query("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd             , a.crte_urif         , a.acpt_cofm_yorn  , a.deli_date		")
			.query("        , c.cstm_code             , ifnull(c.cstm_name, a.cstm_name) as cstm_name         , c.boss_name	")
			.query("        , u.user_name as drtr_name , a.supl_dvcd												")
			.query("        , count(e.item_idcd) as item_count 														")
		;
		data.param
			.query("from esti_mast a																				")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.query("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.query("left outer join esti_item e on a.invc_numb = e.invc_numb										")
			.query("where  1=1																						")
			.query("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.query("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.query("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.query("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.query("and    c.cstm_code   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.query("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.query("and    e.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.query("and    a.deli_date	>= :deli1_date		" , arg.getParamText("deli1_date" ))
			.query("and    a.deli_date	<= :deli2_date		" , arg.getParamText("deli2_date" ))
			.query("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and     a.supl_dvcd        = 6000																")
			.query("group by a.invc_numb																			")
			.query("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
//	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
//
//		DataMessage data = arg.newStorage("POS");
//		data.param
//			.query("select    a.invc_numb         , a.amnd_degr         , a.line_seqn        , a.esti_item_dvcd		")
//			.query("        , a.item_idcd         , a.cstm_item_name    , a.cstm_item_code   , a.unit_idcd			")
//			.query("        , a.norm_sale_pric    , a.sale_stnd_pric    , a.dsnt_rate        , a.esti_pric			")
//			.query("        , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate        , a.sply_amnt			")
//			.query("        , a.vatx_amnt         , a.ttsm_amnt         , a.krwn_amnt        , a.krwn_vatx			")
//			.query("        , a.krwn_ttsm_amnt    , a.remk_text														")
//			.query("        , a.uper_seqn         , a.disp_seqn								")
//			.query("        , a.user_memo         , a.sysm_memo         , a.prnt_idcd        , a.line_levl			")
//			.query("        , a.line_ordr         , a.line_stat         , a.line_clos        , a.find_name			")
//			.query("        , a.updt_user_name    , a.updt_ipad         , a.updt_dttm        , a.updt_idcd			")
//			.query("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad        , a.crte_dttm			")
//			.query("        , a.crte_idcd         , a.crte_urif														")
//			.query("        , b.mold_idcd         , a.deli_date as deli_date2										")
//			.query("        , i.item_code         , i.item_name         , i.item_spec        , u.unit_name			")
//		;
//		data.param
//			.where("from   esti_item a																				")
//			.where("left outer join item_adon b on a.item_idcd = b.item_idcd										")
//			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
//			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
//			.where("where  1=1																						")
//			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
//			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
//			.where("order by a.invc_numb																	")
//		;
//		return data.selectForMap();
//	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    case when rownum = 1 then t.item_code else null end item_code					")
			.query("        , case when rownum = 1 then t.item_name else null end item_name					")
			.query("        , case when rownum = 1 then t.item_spec else null end item_spec					")
			.query("        , t.qntt         , t.pric         , t.amnt           , t.unit_name				")
			.query("        , t.rownum       , t.dum														")
		;
		data.param
			.where("from ( 																					")
			.where("select    d.item_code     , d.item_name     , d.item_spec								")
			.where("        , c.qntt          , c.pric          , c.amnt         ,u.unit_name				")
			.where(", case when @grp = b.line_seqn then @rownum:=@rownum + 1 else @rownum :=1 end as rownum	")
			.where(", (@grp := b.line_seqn) as dum															")
			.where("from esti_mast a																		")
			.where("left outer join esti_item b on b.invc_numb = a.invc_numb								")
			.where("left outer join esti_mtrl c on c.invc_numb = b.invc_numb and c.line_seqn = b.line_seqn	")
			.where("left outer join item_mast d on d.item_idcd = b.item_idcd								")
			.where("left outer join unit_mast u on d.unit_idcd = u.unit_idcd								")
			.where(", (select @rownum:=0, @grp:='') r 														")
			.where("where  1 = 1 ")
			.where("and    a.invc_numb	=:invc_numb					" , arg.getParamText("invc_numb"))
			.where("order  by b.line_seqn, c.assi_seqn														")
			.where(") t																						")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb             , a.amnd_degr         , a.bzpl_idcd       , a.invc_date		")
			.query("        , a.cstm_idcd             , a.esti_dvcd         , a.deli_date       , a.dept_idcd		")
			.query("        , a.drtr_idcd             , a.mdtn_prsn         , a.dlvy_cond       , a.esti_vald_term	")
			.query("        , a.excg_rate_chge_yorn   , a.paym_cond         , a.remk_text       , a.memo			")
			.query("        , a.esti_amnt             , a.esti_vatx         , a.ttsm_amnt       , a.crny_dvcd		")
			.query("        , a.excg_rate																			")
			.query("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd             , a.crte_urif													")
			.query("        , c.cstm_code             , c.cstm_name         , c.boss_name							")
			.query("        , u.user_name as drtr_name 																")
			.query("from esti_mast a																				")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.query("left outer join user_mast u on a.drtr_idcd = u.user_idcd										")
			.query("where  1=1																						")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb         , a.amnd_degr         , a.line_seqn        , a.esti_item_dvcd		")
				.query("        , a.item_idcd         , a.cstm_item_name    , a.cstm_item_code   , a.unit_idcd			")
				.query("        , a.norm_sale_pric    , a.sale_stnd_pric    , a.dsnt_rate        , a.esti_pric			")
				.query("        , a.esti_qntt         , a.vatx_incl_yorn    , a.vatx_rate        , a.sply_amnt			")
				.query("        , a.vatx_amnt         , a.ttsm_amnt         , a.krwn_amnt        , a.krwn_vatx			")
				.query("        , a.krwn_ttsm_amnt    , a.deli_date as deli_date2                , a.remk_text			")
				.query("        , a.uper_seqn         , a.disp_seqn								")
				.query("        , a.user_memo         , a.sysm_memo         , a.prnt_idcd        , a.line_levl			")
				.query("        , a.line_ordr         , a.line_stat         , a.line_clos        , a.find_name			")
				.query("        , a.updt_user_name    , a.updt_ipad         , a.updt_dttm        , a.updt_idcd			")
				.query("        , a.updt_urif         , a.crte_user_name    , a.crte_ipad        , a.crte_dttm			")
				.query("        , a.crte_idcd         , a.crte_urif														")
				.query("        , i.item_code         , i.item_name         , i.item_spec        , u.unit_name			")
				.query("from   esti_item a																				")
				.query("left outer join item_mast i on a.item_idcd = i.item_idcd										")
				.query("left outer join unit_mast u on a.unit_idcd = u.unit_idcd										")
				.query("where   1=1																								")
				.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap getLister3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.line_seqn       , a.item_idcd       , i.item_name				")
			.where("        , i.item_code       , i.item_spec														")
			.where("        , cast(json_unquote(json_extract(a.json_data,'$.revs_numb')) as decimal ) as revs_numb 	")
			.where("        , u.unit_name																		 	")
		;
		data.param
			.where("from esti_item a																				")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd										")
			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%" , arg.getParameter("find_name"))
			.where("and    a.invc_numb = :invc_numb" , arg.getParameter("invc_numb"))
			.where(") a																								")
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getBom(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap info;

		data.param
			.query("select    a.invc_numb        , a.amnd_degr         , a.line_seqn					")
			.query("        , a.assi_seqn        , a.item_idcd         , a.item_name       , a.item_spec")
			.query("        , a.qntt             , a.pric              , a.amnt									")
			.query("        , a.user_memo        , a.sysm_memo         , a.find_name							")
			.query("from  esti_mtrl a 																			")
			.query("where a.invc_numb = :invc_numb    " , arg.getParameter("invc_numb") )
			.query("and   a.line_seqn = :line_seqn    " , arg.getParameter("line_seqn") )
			.query("order by a.assi_seqn																		")
//			.query("and   a.line_seqn = :assi_seqn    " , arg.getParameter("line_seqn") )
		;
		info = data.selectForMap();

		System.out.println("***************"+info.size());

		if (info.size() == 0 ) {
			data.clear();
			data.param
				.query("select a.* , (a.pric * (a.mixx_rate / 100)) as amnt												")
			;
			data.param
				.where("from (																							")
				.where("select    a.prnt_item_idcd        , a.revs_numb         , a.line_seqn as assi_seqn				")
				.where("        , cast(a.mixx_rate as char) as mixx_rate        , i.item_code       , i.item_idcd		")
				.where("        , a.item_name             , a.item_spec													")
				.where("        , ifnull(( select max(istt_pric) 														")
				.where("                    from purc_istt_item r 														")
				.where("                    left outer join purc_istt_mast em on r.invc_numb = em.invc_numb 			")
				.where("                    where r.item_idcd = i.item_idcd 											")
				.where("                    and   em.invc_date BETWEEN date_format(DATE_SUB(now(),interval 6 MONTH),'%Y%m%d') and date_format(now(),'%Y%m%d')	")
				.where("                    and   em.line_stat < 2														")
				.where("          ),0) as pric																			")
				.where("        ,(   select invc_numb																	")
				.where("             from esti_mast																		")
				.where("             where invc_numb = :invc_numb	", arg.getParameter("invc_numb"))
				.where("         ) as invc_numb																			")
				.where("        ,(   select line_seqn																	")
				.where("             from esti_mast																		")
				.where("             where invc_numb = :invc_numb2	", arg.getParameter("invc_numb"))
				.where("               and amnd_degr = :line_seqn	", arg.getParameter("amnd_degr"))
				.where("         ) as line_seqn																			")
				.where("        , a.user_memo             , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
				.where("        , a.line_ordr             , a.line_stat         , a.line_clos       , a.find_name		")
				.where("        , a.updt_user_name        , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
				.where("        , a.updt_urif             , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
				.where("        , a.crte_idcd             , a.crte_urif													")

				.where("from  bom_mast a 																				")
				.where("left outer join item_mast i on a.ivst_item_idcd = i.item_idcd									")
				.where("left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd									")
				.where("where 1 = 1																						")
				.where("and     a.prnt_item_idcd = :item_idcd    " , arg.getParameter("item_idcd") )
				.where("and     a.revs_numb      = :revs_numb    " , arg.getParameter("revs_numb") )
				.where("and   a.revs_dvcd        = 1																	" )
				.where(") a																								" )
			;
			info = data.selectForMap();
			//return info;
		}
		return info;
	}

	/*
	 * 마감 / 해지 건을 수정.
	 */

	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String line_clos	= arg.getParamText("line_clos");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_esti_close (			")
			.query("   :STOR       "  , hq			 )  // 본사코드
			.query(" , :invc_numb  "  , invc_numb	 )  // Invoice 번호
			.query(" , :line_close "  , line_clos 	)  //
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("esti_mast")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"		))
					;data.attach(rowaction);


			} else {
				data.param
				.table("esti_mast"														)
				.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
				.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */

				.unique("invc_numb"				, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))

				.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"			))	/*  사업장ID  */
				.update("invc_date"				, row.getParameter("invc_date"			))	/*  invoice일자  */
				.update("cstm_idcd"				, row.getParameter("cstm_idcd"			))	/*  거래처ID  */
				.update("cstm_name"				, row.getParameter("cstm_name"			))	/*  거래처명  */
				.update("esti_dvcd"				, row.getParameter("esti_dvcd"			))	/*  견적구분코드  */
				.update("expt_dvcd"				, row.getParameter("expt_dvcd"			))	/*  견적구분코드  */
				.update("supl_dvcd"				, 6000)	/*  납기일자  */
				.update("deli_date"				, row.getParameter("deli_date"			))	/*  납기일자  */
				.update("dept_idcd"				, row.getParameter("dept_idcd"			))	/*  부서ID */
				.update("drtr_idcd"				, row.getParameter("drtr_idcd"			))	/*  담당자ID */
				.update("mdtn_prsn"				, row.getParameter("mdtn_prsn"			))	/*  중개인 */
				.update("dlvy_cond"				, row.getParameter("dlvy_cond"			))	/*  인도조건  */
				.update("esti_vald_term"		, row.getParameter("esti_vald_term"		))	/*  견적유효기간  */
				.update("excg_rate_chge_yorn"	, row.getParameter("excg_rate_chge_yorn"))	/*  환율변경여부  */
				.update("paym_cond"				, row.getParameter("paym_cond"			))	/*  지불조건  */
				.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */
				.update("memo"					, row.getParameter("memo"				))	/*  메모  */
				.update("crny_dvcd"				, row.getParameter("crny_dvcd"			))	/*  통화구분  */
				.update("find_name"				, row.getParamText("invc_date")
												 +" "
												 +row.getParamText("cstm_idcd")
												 +" "
												 +row.getParamText("cstm_name"))			/*  find_name  */
				.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
				;data.attach(rowaction);

				ParamToJson trans = new ParamToJson();

				String json = trans.TranslateRowSelect(row, "mtrl_yeld,make_cost,revs_numb");


				data.param
					.table("esti_item"														)
					.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */
					.where("and   line_seqn = :line_seqn									")	/*  순번     */

					.unique("invc_numb"				, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"				, "1")

					.update("esti_item_dvcd"		, "1")	/*  견적품목구분코드 1:등록 2:미등록 */
					.update("item_idcd"				, row.getParameter("item_idcd"			))	/*  품목ID    */
					.update("item_name"				, row.getParameter("item_name"			))	/*  품명      */
					.update("item_spec"				, row.getParameter("item_spec"			))	/*  품목규격  */
					.update("cost_pric"				, row.getParameter("cost_pric"			))	/*  원가단가  */
					.update("esti_pric"				, row.getParameter("esti_pric"			))	/*  견적단가  */
					.update("pfit_rate"				, row.getParameter("pfit_rate"			))	/*  마진율    */
					.update("ttsm_amnt"				, row.getParameter("ttsm_amnt"			))	/*  합계금액  */
					.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */



					.update("json_data"				, json)	/*  합계금액  */

					.update("find_name"				, row.getParamText("invc_date")
													 +" "
													 +row.getParamText("cstm_code")
													 +" "
													 +row.getParamText("cstm_name")			/*  find_name  */
													 +" "
													 +row.getParamText("item_name")			/*  find_name  */
													 +" "
													 +row.getParamText("item_code"))			/*  find_name  */
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
				; data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setLister3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("esti_item")
					.where("where   invc_numb  = :invc_numb  " )
					.where("and     amnd_degr  = :amnd_degr  " )
					.where("and     line_seqn  = :line_seqn  " )


					.unique("invc_numb"			, row.fixParameter("invc_numb"))
					.unique("amnd_degr"			, 1)
					.unique("line_seqn"			, row.fixParameter("line_seqn"))
					;
				data.attach(Action.delete);
				data.execute();
				data.clear();

			}else{
			ParamToJson trans = new ParamToJson();
			String json = trans.TranslateRowSelect(row, "revs_numb");

			data.param
				.table("esti_item")
				.where("where   invc_numb  = :invc_numb  " )
				.where("and     amnd_degr  = :amnd_degr  " )
				.where("and     line_seqn  = :line_seqn  " )

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("amnd_degr"			, 1)
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("esti_item_dvcd"	, "1")									/*  견적품목구분코드 1:등록 2:미등록 */
				.update("item_idcd"			, row.getParameter("item_idcd"			))	/*  품목ID    */
				.update("item_name"			, row.getParameter("item_name"			))	/*  품명      */
				.update("item_spec"			, row.getParameter("item_spec"			))	/*  품목규격  */

				.update("json_data"			, json)	/*  리비전 */

				.update("find_name"			, row.getParamText("invc_date")
											 +" "
											 +row.getParamText("cstm_code")
											 +" "
											 +row.getParamText("cstm_name")			/*  find_name  */
											 +" "
											 +row.getParamText("item_name")			/*  find_name  */
											 +" "
											 +row.getParamText("item_code"))			/*  find_name  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"			));  /*  생성UI  */
				data.attach(Action.modify);
				data.execute();
				data.clear();
			}
		}
		return null;
	}

	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
//		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){



			ParamToJson trans = new ParamToJson();

//			String json = trans.Translate(arg, "esti_item_json_fields");
//
//		data.param
//			.table("esti_item")
//			.where("where   invc_numb  = :invc_numb  " )
//			.where("and     amnd_degr  = :amnd_degr  " )
//			.where("and     line_seqn  = :line_seqn  " )
//
//			.unique("invc_numb"			, arg.fixParameter("invc_numb"))
//			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"))
//			.unique("line_seqn"			, arg.fixParameter("line_seqn"))
//
//
//			.update("cost_pric"			, arg.getParameter("cost_pric"			))	/*  원가단가  */
//			.update("esti_pric"			, arg.getParameter("esti_pric"			))	/*  견적단가  */
//			.update("pfit_rate"			, arg.getParameter("pfit_rate"			))	/*  마진율    */
//			.update("ttsm_amnt"			, arg.getParameter("ttsm_amnt"			))	/*  합계금액  */
//			.update("json_data"			, json)	/*  리비전 */
//
//			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
//			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) );  /*  생성일시  */
//		data.attach(Action.modify);
//		data.execute();
//		data.clear();

			data.param
			.table("esti_mtrl"													)
			.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
			.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
			.where("and   line_seqn = :line_seqn								")  /*  순번  */
			.where("and   assi_seqn = :assi_seqn								")  /*  보조순번  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.unique("amnd_degr"			, 1)
			.unique("line_seqn"			, arg.fixParameter("assi_seqn"			))
			.unique("assi_seqn"			, arg.fixParameter("line_seqn"			))

			.update("item_idcd"			, arg.getParameter("item_idcd"			))
			.update("item_name"			, arg.getParameter("item_name"			))
			.update("amnt"				, arg.getParameter("amnt"				))
			.update("pric"				, arg.getParameter("pric"				))
			.update("qntt"				, arg.getParameter("qntt"				))
			.update("mixx_rate"			, arg.getParameter("mixx_rate"			))

			.update("user_memo"			, arg.getParameter("user_memo"			))  /*  사용자메모  */

			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
			.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))  /*  생성ID  */
			.insert("crte_urif"			, arg.getParameter("crte_urif"			))  /*  생성UI  */
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
//		}
		return null;
	}


	public SqlResultMap setMtrl(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			ParamToJson trans = new ParamToJson();

//			String json = trans.TranslateRowSelect(row, "mtrl_yeld,make_cost,revs_numb");
//
//
//			data.param
//			.table("esti_item"													)
//			.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
//			.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
//			.where("and   line_seqn = :line_seqn								")  /*  순번  */
//
//			.unique("invc_numb"			, row.fixParameter("invc_numb"			))
//			.unique("amnd_degr"			, 1										)
//			.unique("line_seqn"			, row.fixParameter("line_seqn"			))
//
//			.update("esti_item_dvcd"	, row.getParameter("esti_item_dvcd"		))
//			.update("item_idcd"			, row.getParameter("item_idcd"			))
//			.update("item_name"			, row.getParameter("item_name"			))
//			.update("item_spec"			, row.getParameter("item_spec"			))
//			.update("esti_pric"			, row.getParameter("esti_pric"			))
//			.update("esti_qntt"			, row.getParameter("esti_qntt"			))
//			.update("vatx_rate"			, row.getParameter("vatx_rate"			))
//			.update("sply_amnt"			, row.getParameter("sply_amnt"			))
//			.update("remk_text"			, row.getParameter("remk_text"			))
//			.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
//
//			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
//			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
//			.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
//			.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
//			;
//		data.attach(Action.modify);
//		data.execute();
//		data.clear();

			data.param
			.table("esti_mtrl"													)
			.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
			.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
			.where("and   line_seqn = :line_seqn								")  /*  순번  */
			.where("and   assi_seqn = :assi_seqn								")  /*  보조순번  */

			.unique("invc_numb"			, row.fixParameter("invc_numb"			))
			.unique("amnd_degr"			, 1)
			.unique("line_seqn"			, row.fixParameter("line_seqn"			))
			.unique("assi_seqn"			, row.fixParameter("assi_seqn"			))

			.update("item_idcd"			, row.getParameter("item_idcd"			))
			.update("item_name"			, row.getParameter("item_name"			))
			.update("amnt"				, row.getParameter("amnt"				))
			.update("pric"				, row.getParameter("pric"				))
			.update("qntt"				, row.getParameter("qntt"				))
			.update("mixx_rate"			, row.getParameter("mixx_rate"			))

			.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */

			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
			.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
			.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
			.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("esti_mast"														)
					.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */

					.unique("invc_numb"				, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))

					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"			))	/*  사업장ID  */
					.update("invc_date"				, row.getParameter("invc_date"			))	/*  invoice일자  */
					.update("cstm_idcd"				, row.getParameter("cstm_idcd"			))	/*  거래처ID  */
					.update("cstm_name"				, row.getParameter("cstm_name"			))	/*  거래처명  */
					.update("esti_dvcd"				, row.getParameter("esti_dvcd"			))	/*  견적구분코드  */
					.update("expt_dvcd"				, row.getParameter("expt_dvcd"			))	/*  견적구분코드  */
					.update("deli_date"				, row.getParameter("deli_date"			))	/*  납기일자  */
					.update("dept_idcd"				, row.getParameter("dept_idcd"			))	/*  부서ID */
					.update("drtr_idcd"				, row.getParameter("drtr_idcd"			))	/*  담당자ID */
					.update("mdtn_prsn"				, row.getParameter("mdtn_prsn"			))	/*  중개인 */
					.update("dlvy_cond"				, row.getParameter("dlvy_cond"			))	/*  인도조건  */
					.update("esti_vald_term"		, row.getParameter("esti_vald_term"		))	/*  견적유효기간  */
					.update("excg_rate_chge_yorn"	, row.getParameter("excg_rate_chge_yorn"))	/*  환율변경여부  */
					.update("paym_cond"				, row.getParameter("paym_cond"			))	/*  지불조건  */
					.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */
					.update("memo"					, row.getParameter("memo"				))	/*  메모  */
					.update("find_name"				, row.getParamText("invc_date")
													 +" "
													 +row.getParamText("cstm_idcd")
													 +" "
													 +row.getParamText("cstm_name"))			/*  find_name  */
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
					.action = rowaction;
					data.attach();

					ParamToJson trans = new ParamToJson();

					String json = trans.TranslateRowSelect(row, "mtrl_yeld,make_cost,revs_numb");


					data.param
						.table("esti_item"														)
						.where("where invc_numb = :invc_numb									")	/*  INVOICE번호  */
						.where("and   amnd_degr = :amnd_degr									")	/*  amd차수  */
						.where("and   line_seqn = :line_seqn									")	/*  순번     */

						.unique("invc_numb"				, row.fixParameter("invc_numb"			))
						.unique("amnd_degr"				, row.fixParameter("amnd_degr"			))
						.unique("line_seqn"				, "1")

						.update("esti_item_dvcd"		, "1")	/*  견적품목구분코드 1:등록 2:미등록 */
						.update("item_idcd"				, row.getParameter("item_idcd"			))	/*  품목ID    */
						.update("item_name"				, row.getParameter("item_name"			))	/*  품명      */
						.update("item_spec"				, row.getParameter("item_spec"			))	/*  품목규격  */
						.update("cost_pric"				, row.getParameter("cost_pric"			))	/*  원가단가  */
						.update("esti_pric"				, row.getParameter("esti_pric"			))	/*  견적단가  */
						.update("pfit_rate"				, row.getParameter("pfit_rate"			))	/*  마진율    */
						.update("ttsm_amnt"				, row.getParameter("ttsm_amnt"			))	/*  합계금액  */
						.update("remk_text"				, row.getParameter("remk_text"			))	/*  비고  */



						.update("json_data"				, json)	/*  합계금액  */

						.update("find_name"				, row.getParamText("invc_date")
														 +" "
														 +row.getParamText("cstm_code")
														 +" "
														 +row.getParamText("cstm_name")			/*  find_name  */
														 +" "
														 +row.getParamText("item_name")			/*  find_name  */
														 +" "
														 +row.getParamText("item_code"))			/*  find_name  */
						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  수정일시  */
						.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss"	).format(new Date()) )  /*  생성일시  */
						.insert("crte_idcd"				, row.getParameter("crte_idcd"			))  /*  생성ID  */
						.insert("crte_urif"				, row.getParameter("crte_urif"			))  /*  생성UI  */
					;
					data.attach(rowaction);
					data.execute();
					data.clear();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				if (rowaction == Action.modify) {

				}
			}
		}
	data.execute();
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");
			if (deli_date2.matches("^[0-9]+$")){
			}else{
				if (!deli_date2.isEmpty()){
					deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
				}
			}
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

				;data.attach(rowaction);
			} else {
				// detail 등록/수정
				data.param
					.table("esti_item"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr								")  /*  amd차수  */
					.where("and   line_seqn = :line_seqn								")  /*  순번  */

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("esti_item_dvcd"	, row.getParameter("esti_item_dvcd"		))
					.update("item_idcd"			, row.getParameter("item_idcd"			))
					.update("item_name"			, row.getParameter("item_name"			))
					.update("item_spec"			, row.getParameter("item_spec"			))
					.update("cstm_item_name"	, row.getParameter("cstm_item_name"		))
					.update("cstm_item_code"	, row.getParameter("cstm_item_code"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))
					.update("esti_pric"			, row.getParameter("esti_pric"			))
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))
					.update("dsnt_rate"			, row.getParameter("dsnt_rate"			))
					.update("esti_qntt"			, row.getParameter("esti_qntt"			))
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))
					.update("krwn_amnt"			, row.getParameter("krwn_amnt"			))
					.update("krwn_vatx"			, row.getParameter("krwn_vatx"			))
					.update("krwn_ttsm_amnt"	, row.getParameter("krwn_ttsm_amnt"		))
					.update("deli_date"			, deli_date2							)
					.update("remk_text"			, row.getParameter("remk_text"			))
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */

					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;data.attach(rowaction);
			}

		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("esti_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	public SqlResultMap setAcpt(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String deli_date	= arg.getParamText("deli_date").replace("-", "") ;
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

		//2023.01.04 - 이강훈 - 견적서 수주 등록시 검증로직 추가
		data.param
			.query("select if(length(deli_date) = 0, 1, 0) as deli_cont ")
			.query("  from esti_item ")
			.query(" where line_stat < 2 ")
			.query("   and invc_numb = :invc_numb1 ", invc_numb)
		;
		SqlResultRow estiInfo = data.selectForRow();

		if (0 < Integer.parseInt(estiInfo.getParamText("deli_cont"))) {
			throw new ServiceException("견적서에 납기일자가 없는 품목이 있습니다.");
		}

		data.clear();
		data.param
			.query("call auto_acpt_insert (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		String deli_date	= arg.getParamText("deli_date");
		String amnd_degr	= arg.getParamText("amnd_degr");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_esti_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" , :amnd_degr "  , amnd_degr	)  // amnd차수
			.query(" , :deli_date "  , deli_date	)  // 납기일자
			.query(" , 'copy'						") // 구분
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
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
}
