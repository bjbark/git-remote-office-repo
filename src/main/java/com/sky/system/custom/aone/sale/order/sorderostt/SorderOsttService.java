package com.sky.system.custom.aone.sale.order.sorderostt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;


@Service("aone.SorderOsttService")
public class SorderOsttService extends DefaultServiceHandler{
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	//출고리스트 조회(Master)
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																					")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.query("from (																											")
			.query("	select a.invc_numb        , a.amnd_degr        , a.acpt_dvcd        , a.invc_date        , a.cstm_idcd		")
			.query("		 , a.acpt_stat_dvcd 																					")
			.query("		 , json_value(a.json_data,'$.bill_date') as bill_date													")
			.query("		 , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn											")
			.query("		 , json_value(a.json_data,'$.bill_amnt') as bill_amnt													")
			.query("		 , json_value(a.json_data,'$.tkot_text') as tkot_text													")
			.query("		 , b.item_idcd        , b.remk_text        , b.invc_qntt        , b.invc_amnt        , b.line_seqn		")
			.query("		 , b.deli_date as deli_date2																			")
			.query("		 , json_value(b.json_data,'$.sral_numb') as sral_numb													")
			.query("		 , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd 										")
			.query("		 , json_value(b.json_data,'$.ostt_date') as ostt_date													")
			.query("		 , c.cstm_name																							")
			.query("		 , d.item_name        , d.item_code        , d.item_spec												")
			.query("		 , f.work_strt_dttm   , f.work_endd_dttm   , f.need_time												")
			.query("		 , json_value(f.json_data,'$.psep_exps_amnt') as psep_exps_amnt											")
			.query("		 , json_value(f.json_data,'$.pric_time') as pric_time													")
			.query("		 , json_value(f.json_data,'$.prts_repa_amnt') as prts_repa_amnt											")
			.query("		 , json_value(f.json_data,'$.etcc_repa_amnt') as etcc_repa_amnt											")
			.query("		 , json_value(f.json_data,'$.entp_pfit_amnt') as entp_pfit_amnt											")
			.query("		 , g.user_name as prod_drtr_name																		")
		;
		data.param
			.query("	from acpt_mast a																							")
			.query("		 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr					")
			.query("		 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.query("		 left outer join item_mast d on b.item_idcd = d.item_idcd												")
			.query("		 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')				")
			.query("		 left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn					")
		;
		data.param
			.query("	where 1 = 1																									")
			.query("	and   ifnull(a.ordr_dvcd,0) != '4000'																		")
			.query("	and   a.acpt_stat_dvcd = '6000' 																			")
			.query("	and   a.find_name like %:find_name%       " , arg.getParamText("find_name"))
			.query("	and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.query("	and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.query("	and   a.ordr_dvcd       = :ordr_dvcd      " , arg.getParamText("ordr_dvcd"))
			.query("	and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.query("	and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.query("	and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd"))
			.query("	and   d.item_spec   like %:item_spec%     " , arg.getParamText("item_spec"))
			.query("	and   g.user_name       = :prod_drtr_name " , arg.getParamText("prod_drtr_name"))
			.query("	and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd", arg.getParamText("repa_stat_dvcd"))
			.query("	and   json_value(b.json_data,'$.sral_numb') like %:sral_numb%      ", arg.getParamText("sral_numb"))
			.query("	and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("	order by ostt_date desc, a.invc_numb desc, a.amnd_degr desc 								")
			.query(") a																												")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//출고등록 조회(Master)
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																					")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.query("from (																											")
			.query("	select a.invc_numb        , a.amnd_degr        , a.acpt_dvcd        , a.invc_date        , a.cstm_idcd		")
			.query("		 , a.acpt_stat_dvcd 																					")
			.query("		 , json_value(a.json_data,'$.bill_date') as bill_date													")
			.query("		 , json_value(a.json_data,'$.bill_publ_yorn') as bill_publ_yorn											")
			.query("		 , json_value(a.json_data,'$.bill_amnt') as bill_amnt													")
			.query("		 , json_value(a.json_data,'$.tkot_text') as tkot_text													")
			.query("		 , b.item_idcd        , b.remk_text        , b.invc_qntt        , b.invc_amnt        , b.line_seqn		")
			.query("		 , b.deli_date as deli_date2																			")
			.query("		 , json_value(b.json_data,'$.sral_numb') as sral_numb													")
			.query("		 , json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd 										")
			.query("		 , json_value(b.json_data,'$.ostt_date') as ostt_date													")
			.query("		 , c.cstm_name																							")
			.query("		 , d.item_name        , d.item_code        , d.item_spec												")
			.query("		 , g.user_name as prod_drtr_name           , f.invc_numb as work_invc_numb								")
			.query("		 , json_value(d.json_data,'$.zone_idcd') as zone_idcd													")
			.query("		 , d.istt_wrhs_idcd as wrhs_idcd																		")
		;
		data.param
			.query("	from acpt_mast a																							")
			.query("		 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr					")
			.query("		 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.query("		 left outer join item_mast d on b.item_idcd = d.item_idcd												")
			.query("		 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')				")
			.query("		 left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn					")
			.query("		 left outer join work_book_mtrl i on f.invc_numb = i.invc_numb	 										")
		;
		data.param
			.query("	where 1 = 1																									")
			.query("	and   ifnull(a.ordr_dvcd,0) != '4000'																		")
			.query("	and   ( a.acpt_stat_dvcd = '3000' or (a.acpt_stat_dvcd = '2000' and json_value(b.json_data,'$**.repa_stat_dvcd') = '4000'))	")
			.query("	and   a.find_name like %:find_name%       " , arg.getParamText("find_name"))
			.query("	and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.query("	and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.query("	and   a.ordr_dvcd       = :ordr_dvcd      " , arg.getParamText("ordr_dvcd"))
			.query("	and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd"))
			.query("	and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd"))
			.query("	and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd"))
			.query("	and   json_value(b.json_data,'$.prod_drtr_idcd')  = :prod_drtr_idcd", arg.getParamText("prod_drtr_idcd"))
			.query("	and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd", arg.getParamText("repa_stat_dvcd"))
			.query("	and   json_value(b.json_data,'$.sral_numb') like %:sral_numb%      ", arg.getParamText("sral_numb"))
			.query("	and   d.item_spec like %:item_spec%       " , arg.getParamText("item_spec"))
			.query("	and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("	group by a.invc_numb							")
			.query("	order by a.invc_numb desc, a.amnd_degr desc 	")
			.query(") a													")
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("	,	a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("	,	a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("	,	a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd										")
			.query("	,	a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn			")
			.query("	,	a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("	,	a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd			")
			.query("	,	a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("	,	a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("	,	a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("	,	a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("	,	a.crte_idcd       , a.crte_urif															")
			.query("	,	c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("	,	w.wrhs_code       , w.wrhs_name															")
			.query("	,	i.item_idcd																				")
		;
		data.param
			.where("from	acpt_mast a																				")
			.where("		left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.where("		left outer join user_mast d on a.drtr_idcd = d.user_idcd								")
			.where("		left outer join wrhs_mast w on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("		left outer join acpt_item i on a.invc_numb = i.invc_numb								")
			.where("where	1=1																						")
			.where("and		a.ordr_dvcd != '4000'																	")
			.where("and		a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and		a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																			")
			.where("order by a.invc_numb																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")))
		.query(") a																										")
		;
		return data.selectForMap();
	}

	//이미지 불러오기
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select b.item_imge   , b.item_imge2							")
			.query("from   acpt_item a											")
			.query("	   left outer join work_book b on a.invc_numb = b.wkod_numb and a.amnd_degr = b.wkod_seqn	")
			.query("where  1=1							")
			.query("and    a.invc_numb = :invc_numb", arg.getParameter("invc_numb"))
			.query("and    a.amnd_degr = :amnd_degr", arg.getParameter("amnd_degr"))
			.query("and    a.line_seqn = :line_seqn", arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}

	//수리비 산출 정보 가져오기
	public SqlResultMap getRepairCalc(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select	a.invc_numb as work_invc_numb   , sum(w.need_time) as need_time								")
			.query("	,	sum(cast(json_unquote(json_extract(b.json_data,'$.amnt') ) as decimal)) as prts_repa_amnt	")
			.query("	,	d.user_name as prod_drtr_name																")
			.query("	,	json_value(c.json_data,'$.prod_drtr_idcd') as prod_drtr_idcd								")
		;
		data.param
			.where("from	work_book a																					")
			.where("		left outer join work_book_mtrl b on b.invc_numb = a.invc_numb								")
			.where("		left outer join work_book_mans w on w.invc_numb = a.invc_numb								")
			.where("		left outer join acpt_item c on a.wkod_numb = c.invc_numb and a.wkod_seqn = c.amnd_degr		")
			.where("		left outer join user_mast d on d.user_idcd = json_value(c.json_data,'$.prod_drtr_idcd')		")
			.where("where	1=1																							")
			.where("and		a.wkod_numb 	= :invc_numb	" ,arg.getParamText("invc_numb"))
			.where("and		a.wkod_seqn		= :amnd_degr	" ,arg.getParamText("amnd_degr"))
			.where("and		a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																				")
		;
		return data.selectForMap();
	}

	//청구내용 정보 가져오기
	public SqlResultMap getMemo(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select	a.invc_numb, a.amnd_degr, a.invc_date, a.cstm_idcd										")
			.query("	, json_value(a.json_data, '$.bill_publ_yorn') as bill_publ_yorn	")
			.query("	, json_value(a.json_data, '$.bill_date') as bill_date")
			.query("	, json_value(a.json_data, '$.bill_amnt') as bill_amnt")
			.query("	, json_value(a.json_data, '$.tkot_text') as tkot_text")
			.query("	, b.item_idcd")
			.query("	, json_value(b.json_data, '$.sral_numb') as sral_numb")
			.query("	, c.cstm_name")
			.query("	, d.item_name, d.item_spec")
		;
		data.param
			.query("from acpt_mast a																					")
			.query("		left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr")
			.query("		left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd")
			.query("		left outer join item_mast d on b.item_idcd = d.item_idcd")
			.query("where	1=1																							")
			.query("and		a.invc_numb 	= :invc_numb	" ,arg.getParamText("invc_numb"))
			.query("and		a.amnd_degr		= :amnd_degr	" ,arg.getParamText("amnd_degr"))
			.query("and		a.line_stat		< :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("group by a.invc_numb	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//amend 생성
	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
			throw new ServiceException("재수리가  등록된 제품입니다.");
		}

		DataMessage data;
		String invc_numb	= arg.getParamText("invc_numb") ;
		String amnd_degr	= arg.getParamText("amnd_degr");
		String new_amnd_degr= arg.getParamText("new_amnd_degr");
		String amnd_date	= arg.getParamText("amnd_date") ;
		String deli_date	= arg.getParamText("deli_date") ;
		String drtr_idcd	= arg.getParamText("drtr_idcd") ;
		String amnd_resn	= arg.getParamText("amnd_resn") ;
		String logn_id		= arg.getParamText("logn_id") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("call auto_acpt_amend (             ")
			.query("   :invc_numb "  	, invc_numb		)  // Invoice 번호
			.query(" , :amnd_degr "  	, amnd_degr		)  //
			.query(" , :amnd_date "  	, amnd_date		)  // 변경일자
			.query(" , :amnd_resn "  	, amnd_resn		)  //
			.query(" , :deli_date "  	, deli_date		)  //
			.query(" , :drtr_idcd "  	, drtr_idcd		)  //
			.query(" , :new_amnd_degr"  , new_amnd_degr	)  //
			.query(" , :logn_id "  		, logn_id		)  //
			.query(" )                                 ")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	//수리비 산출 저장
	public SqlResultMap setRepairCalc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble( ordrInfo.getParamText( "acpt_stat_dvcd" )) > 3000) {
		throw new ServiceException("출고된 제품은 수리비 산출을 할 수 없습니다.");
		}

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "work_book_json_fields");

		data.param
			.table ("work_book")
			.where ("where invc_numb = :invc_numb")
			.where ("and   wkod_seqn = :wkod_seqn")

			.unique("invc_numb"        , arg.fixParameter("work_invc_numb"))

			.update("wkod_numb"        , arg.getParameter("invc_numb"))
			.update("wkod_seqn"        , arg.getParameter("amnd_degr"))

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.psep_exps_amnt','$.pric_time','$.repa_exps_amnt','$.prts_repa_amnt','$.entp_pfit_amnt','$.etcc_repa_amnt','$.prod_drtr_idcd','$.prod_drtr_name'), '" + json_data + "')")
		;
		data.attach(Action.update);


		double invc_amnt = Double.parseDouble(arg.getParamText("repa_exps_amnt"));
		double sply_amnt = invc_amnt / 1.1;
		double vatx_amnt = invc_amnt - sply_amnt;

		data.param
			.table ("acpt_item")
			.where ("where invc_numb = :invc_numb")
			.where ("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"        , arg.getParameter("invc_numb"))
			.unique("amnd_degr"        , arg.getParameter("amnd_degr"))

			.update("sply_amnt"        , sply_amnt)
			.update("vatx_amnt"        , vatx_amnt)
			.update("invc_amnt"        , invc_amnt)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	//청구내용 저장
	public SqlResultMap setMemo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultRow ordrInfo = getOrderInfo(arg);

		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_mast_json_fields");

		data.param
			.table ("acpt_mast")
			.where ("where invc_numb = :invc_numb")
			.where ("and   amnd_degr = :amnd_degr")

			.unique("invc_numb"        , arg.fixParameter("invc_numb"))
			.unique("amnd_degr"        , arg.fixParameter("amnd_degr"))

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE('" + json_data + "',ifnull(JSON_REMOVE(ifnull(json_data,'{}'),'$.bill_publ_yorn','$.bill_date','$.bill_amnt','$.tkot_text'),'{}'))")

		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	//출고등록
	public SqlResultMap setRelease(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row : map) {
			ParamToJson trans = new ParamToJson();

//			// 출고일자 설정
//			row.setParameter("ostt_date", new SimpleDateFormat("yyyyMMdd").format(new Date()));
			String json_data = trans.TranslateRow(arg, row, "acpt_item_json_fields");

			data.param
				.table("acpt_mast"													 )
				.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
				.where("and   amnd_degr		= :amnd_degr							")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))

				.update("acpt_stat_dvcd"	, "6000"								)
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("acpt_item"													 )
				.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
				.where("and   amnd_degr		= :amnd_degr							")	/*  AMEND순번  */

				.unique("invc_numb"			, row.fixParameter("invc_numb"			))
				.unique("line_seqn"			, row.fixParameter("line_seqn"			))
				.unique("amnd_degr"			, row.fixParameter("amnd_degr"			))

				.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.sral_numb','$.ostt_date','$.ostt_qntt','$.ostt_drtr_idcd', '$.repa_stat_dvcd'), '" + json_data + "')")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.query("call auto_isos_booking_ostt (		")
				.query("   :invc_numb  "  , row.fixParameter("invc_numb"			))  // Invoice 번호
				.query(" , :line_seqn  "  , "0")  //
				.query(" , :wrhs_idcd  "  , row.getParameter("wrhs_idcd"			))  // Invoice 번호
//				.query(" , :zone_idcd  "  , row.getParameter("zone_idcd"			))  //
				.query(" , :source_dvcd"  , "수리출고"	 )  // 구분코드
				.query(" ) 								")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	//출고 취소
	public SqlResultMap setReleaseCancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultRow ordrInfo = getOrderInfo(arg);

		if ( Double.parseDouble(ordrInfo.getParamText("max_amnd_degr")) > Double.parseDouble(arg.getParamText("amnd_degr"))) {
			throw new ServiceException("이미 최종 차수가 아닌 수리품은 출고취소를 할 수 없습니다.");
		}

		// 출고일자 취소
//			arg.setParameter("ostt_date", "");
		ParamToJson trans = new ParamToJson();
		String json_data = trans.Translate(arg, "acpt_item_json_fields");

		data.param
			.table("acpt_mast"											 )
			.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
			.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb")	 )
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr")	 )

			.update("acpt_stat_dvcd"	, "3000"						 )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("acpt_item"											 )
			.where("where invc_numb		= :invc_numb					")  /*  INVOICE번호  */
			.where("and   line_seqn		= :line_seqn					")  /*  INVOICE순번  */
			.where("and   amnd_degr		= :amnd_degr					")	/*  AMEND순번  */

			.unique("invc_numb"			, arg.fixParameter("invc_numb")	 )
			.unique("line_seqn"			, arg.fixParameter("line_seqn")	 )
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr")	 )

			.modify("json_data", "json_data", "JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(json_data,'{}'),'$.ostt_date','$.ostt_qntt','$.ostt_drtr_idcd'), '" + json_data + "')")
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.query("delete	a																")
			.query("from	isos_book a														")
			.query("		left outer join work_book_mtrl c on c.invc_numb = a.invc_numb	")
			.query("		left outer join work_book      b on b.invc_numb = c.invc_numb	")
			.query("where	b.wkod_numb = :invc_numb " , arg.getParamText("invc_numb"))
			.query("and		b.wkod_seqn = :amnd_degr " , arg.getParamText("amnd_degr"))
		;
		data.attach(Action.direct);
		data.execute();

		data.param
			.table("isos_book ")
			.where("where invc_numb = :invc_numb ")
			.where("and   invc_dvcd = invc_dvcd  ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("invc_dvcd"		, "2800")
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"		, "0")
		;
		data.attach(Action.delete);

		data.execute();
		return null;
	}

	//최종차수 비교
	public SqlResultRow getOrderInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String invc_numb = "";
		String amnd_degr = "";

		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (arg.containsKey("amnd_degr")) {
			amnd_degr = (String)arg.getParameter("amnd_degr");
		} else if (arg.containsKey("records")) {
			amnd_degr = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("amnd_degr");
		}

		data.param
			.query("select line_clos, line_stat, acpt_stat_dvcd																											")
			.query("	 , (select max(amnd_degr) from acpt_mast where invc_numb = a.invc_numb) as max_amnd_degr 														")
			.query("	 , (select json_value(json_data,'$.repa_stat_dvcd') from acpt_item where invc_numb = a.invc_numb and amnd_degr = a.amnd_degr) as repa_stat_dvcd ")
			.query("from  acpt_mast a							")
			.query("where a.invc_numb = :invc_numb", invc_numb)
			.query("and   a.amnd_degr = :amnd_degr", amnd_degr)
		;
		return data.selectForRow();
	}

}
