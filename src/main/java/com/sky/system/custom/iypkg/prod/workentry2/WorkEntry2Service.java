package com.sky.system.custom.iypkg.prod.workentry2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

@Service("iypkg.WorkEntry2Service")
public class WorkEntry2Service extends DefaultServiceHandler{

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *, @rownum:=@rownum+1 as rnum																")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.line_seqn       , bp.invc_numb as acpt_numb							")
			.where("      , ba.prod_idcd      , p.prod_name       , bp.line_seqn as acpt_seqn							")
			.where("      , p.prod_leng       , p.prod_widh       , p.prod_hght       , p.prod_code						")
			.where("      , ba.pcod_numb      , ba.cstm_idcd      , c.cstm_code       , c.cstm_name						")
			.where("      , ba.acpt_qntt      , b.invc_date       , ba.invc_date as acpt_date							")
			.where("from  purc_istt_item a																				")
			.where("   left outer join purc_istt_mast b  on a.invc_numb = b.invc_numb									")
			.where("   left outer join purc_ordr_item po on a.orig_invc_numb = po.invc_numb and a.orig_seqn = po.line_seqn")
			.where("   left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb									")
			.where("   left outer join boxx_acpt_bop  bp on po.orig_invc_numb = bp.invc_numb and po.orig_seqn = bp.line_seqn")
			.where("   left outer join boxx_acpt      ba on bp.invc_numb = ba.invc_numb									")
			.where("   left outer join product_mast   p  on ba.prod_idcd = p.prod_idcd									")
			.where("   left outer join cstm_mast      c  on ba.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
			.where("and      pm.offr_dvcd = '3000'																		")
			.where("and      b.invc_date >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and      b.invc_date <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and      ba.cstm_idcd  = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and      ba.prod_idcd  = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and      ba.invc_numb  = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and      a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by ba.invc_numb																				")
			.where(") a, (SELECT @rownum:=0) r																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *, @rownum:=@rownum+1 as rnum																")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.invc_date       , a.prod_idcd       , p.prod_code						")
			.where("      , p.prod_name       , p.prod_leng       , p.prod_widh       , p.prod_hght						")
			.where("      , a.acpt_qntt       , a.pcod_numb       , a.cstm_idcd       , c.cstm_code						")
			.where("      , c.cstm_name																					")
			.where("from  boxx_acpt a																					")
			.where("   right outer join boxx_acpt_bop   b on a.invc_numb = b.invc_numb									")
			.where("   right outer join purc_ordr_item po on b.invc_numb = po.orig_invc_numb and b.line_seqn = po.orig_seqn")
			.where("   left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb									")
			.where("   left outer join product_mast   p  on a.prod_idcd = p.prod_idcd									")
			.where("   left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join ( select sum(a.offr_qntt) as offr_qntt, orig_invc_numb, orig_seqn				")
			.where("                     from purc_ordr_item a															")
			.where("                     left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb					")
			.where("                     where b.offr_dvcd = '3000'														")
			.where("                     group by orig_invc_numb														")
			.where("                   ) cnt1 on b.invc_numb = cnt1.orig_invc_numb and b.line_seqn = cnt1.orig_seqn		")
			.where("   left outer join ( select sum(a.istt_qntt + ifnull(json_value(a.json_data , '$**.subt_qntt'),0)) as istt_qntt")
			.where("                          , b.orig_invc_numb, b.orig_seqn											")
			.where("                     from purc_istt_item a															")
			.where("                     left outer join purc_ordr_item b on a.orig_invc_numb = b.invc_numb and a.orig_seqn = b.line_seqn")
			.where("                     left outer join purc_ordr_mast m on b.invc_numb = m.invc_numb					")
			.where("                     where m.offr_dvcd = '3000'														")
			.where("                     group by b.orig_invc_numb														")
			.where("                   ) cnt2 on b.invc_numb = cnt2.orig_invc_numb and b.line_seqn = cnt2.orig_seqn		")
			.where("where   1=1																							")
			.where("and     pm.offr_dvcd = '3000'																		")
			.where("and     cnt1.offr_qntt <> ifnull(cnt2.istt_qntt,0)													")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     pm.invc_date  >= :invc_date1      " , arg.getParamText("invc_date1" ))
			.where("and     pm.invc_date  <= :invc_date2      " , arg.getParamText("invc_date2" ))
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																				")
			.where("order by a.invc_date desc, a.invc_numb desc															")
			.where(") a, (SELECT @rownum:=0) r																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb      , a.line_seqn      , sum(a.istt_qntt) as istt_qntt							")
			.where("      , json_value(a.json_data , '$**.subt_qntt') as subt_qntt , w.wkct_name						")
			.where("      , b.cstm_idcd      , c.cstm_name      , bp.wkun_dvcd     , bp.wkct_idcd						")
			.where("      , u.unit_name      , a.istt_pric      , a.istt_amnt      , a.istt_vatx						")
			.where("      , a.ttsm_amnt      , b.invc_date      , a.vatx_incl_yorn										")
			.where("      , po.orig_invc_numb, po.orig_seqn																")
			.where("from    purc_istt_item a 																			")
			.where("   left outer join purc_istt_mast b  on a.invc_numb = b.invc_numb									")
			.where("   left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join purc_ordr_item po on a.orig_invc_numb = po.invc_numb and a.orig_seqn = po.line_seqn")
			.where("   left outer join purc_ordr_mast pm on po.invc_numb = pm.invc_numb									")
			.where("   left outer join boxx_acpt_bop  bp on po.orig_invc_numb = bp.invc_numb and po.orig_seqn = bp.line_seqn")
			.where("   left outer join wkct_mast      w  on bp.wkct_idcd = w.wkct_idcd									")
			.where("   left outer join unit_mast      u  on bp.qntt_unit_idcd = u.unit_idcd								")
			.where("where   1=1																							")
			.where("and     pm.offr_dvcd = '3000'																		")
			.where("and     po.orig_invc_numb  = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat       < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by po.orig_invc_numb, po.orig_seqn, a.cstm_idcd												")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.line_seqn       , bp.wkun_dvcd      , bp.wkct_idcd					")
			.where("      , w.wkct_name       , a.offr_qntt       , c.cstm_name       , b.cstm_idcd						")
			.where("      , b.invc_date       , a.offr_pric	      , bp.qntt_unit_idcd , u.unit_name						")
			.where("      , a.item_idcd       , p.prod_code       , p.prod_name       , bp.invc_numb as acpt_numb		")
			.where("      , a.offr_qntt - ifnull(i.istt_qntt,0) - ifnull(json_value(i.json_data , '$**.subt_qntt'),0) as unistt	")
			.where("      , bp.line_seqn as acpt_seqn																	")
			.where("from   purc_ordr_item a																				")
			.where("   left outer join purc_ordr_mast b  on a.invc_numb = b.invc_numb									")
			.where("   left outer join boxx_acpt_bop  bp on a.orig_invc_numb = bp.invc_numb and a.orig_seqn = bp.line_seqn")
			.where("   left outer join wkct_mast      w  on bp.wkct_idcd = w.wkct_idcd									")
			.where("   left outer join cstm_mast      c  on b.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join unit_mast      u  on bp.qntt_unit_idcd = u.unit_idcd								")
			.where("   left outer join purc_istt_item i  on a.invc_numb = i.orig_invc_numb and a.line_seqn = i.orig_seqn")
			.where("   left outer join product_mast   p  on a.item_idcd = p.prod_idcd									")
			.where("where   1=1																							")
			.where("and     b.offr_dvcd = '3000'																		")
			.where("and     (a.offr_qntt -  ifnull(i.istt_qntt,0) - ifnull(json_value(i.json_data , '$**.subt_qntt'),0)) > 0")
			.where("and     a.orig_invc_numb = :invc_numb       " , arg.getParamText("invc_numb"))
			.where("and     a.line_stat      < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetailFabc(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
		.where("from (																								")
		.where("select  if(ifnull(a.offr_yorn,0) = 1,'발주', '수주') as dvcd											")
		.where("      , if(ifnull(a.offr_yorn,0) = 1, 2, 1) as dvcd_numb											")
		.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
		.where("      , a.fabc_name       , a.item_leng       , a.item_widh       , a.item_fxqt						")
		.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
		.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
		.where("from    boxx_acpt_bom a																				")
		.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
		.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
		.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
		.where("where   1=1																							")
		.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
		.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat")))
		.where(") a																									")
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
		for (SqlResultRow row:map){
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_istt_item_json_fields");

			data.param
				.table("purc_istt_mast					")
				.where("where invc_numb		= :invc_numb")		//invoice번호

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"))	//invoice번호

				.update("invc_date"			, row.getParameter("invc_date"))		//입고일자
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//거래처ID
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))	//부가세포함여부
				.update("istt_qntt"			, row.getParameter("istt_qntt"))		//입고수량
				.update("istt_amnt"			, row.getParameter("istt_amnt"))		//입고금액
				.update("istt_vatx"			, row.getParameter("istt_vatx"))		//입고부가세
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))		//입고합계금액

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

			data.param
				.table("purc_istt_item					")
				.where("where invc_numb		= :invc_numb")		//invoice번호
				.where("and   line_seqn		= :line_seqn")		//순번

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"))	//invoice번호
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"))	//순번

				.update("acct_bacd"			, 3000							)		//계정구분코드
				.update("acct_bacd"			, row.getParameter("acct_bacd"))		//계정분류코드
				.update("item_idcd"			, row.getParameter("item_idcd"))		//품목ID
				.update("istt_pric"			, row.getParameter("offr_pric"))		//입고단가
				.update("istt_qntt"			, row.getParameter("istt_qntt"))		//입고수량
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"))	//부가세포함여부
				.update("istt_amnt"			, row.getParameter("istt_amnt"))		//입고금액
				.update("istt_vatx"			, row.getParameter("istt_vatx"))		//부가세
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"))		//합계금액
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//거래처ID
				.update("find_name"			, row.getParameter("cstm_code")
											+ "	"
											+ row.getParameter("cstm_name")
											+ "	"
											+ row.getParameter("item_code")
											+ "	"
											+ row.getParameter("item_name"))
				.update("orig_invc_numb"	, row.getParameter("invc_numb"))		//원invoice번호 (수주번호)
				.update("orig_seqn"			, row.getParameter("line_seqn"))		//원순번 (수주순번)
				.update("json_data"			, json							)		//jsondata
				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

		}
		return null;
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("purc_istt_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("purc_istt_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;
	}

}
