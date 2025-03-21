package com.sky.system.custom.iypkg.prod.prodordr;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;


@Service("iypkg.ProdOrdrService")
public class ProdOrdrService extends DefaultServiceHandler{

	// 생산지시내역 조회
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
			data.param
			.where("from (																								")
			.where("select  p.pdod_date       , c.cstm_name       , a.prod_name       , a.item_leng						")
			.where("      , a.item_widh       , a.item_hght       , a.acpt_qntt       , a.invc_numb						")
			.where("      , a.cstm_idcd       , a.prod_idcd       , p.indn_qntt       , a.ostt_date						")
			.where("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.where("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.where("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.where("      , bt.bxty_name      , p.invc_numb as pror_numb												")
			.where("      , pp.cvic_idcd      , v.cvic_name																")
			.where("from  pror_mast p 																					")
			.where("      left outer join pror_item     pp  on p.invc_numb = pp.invc_numb								")
			.where("      left outer join cvic_mast      v  on pp.cvic_idcd = v.cvic_idcd								")
			.where("      left outer join boxx_acpt      a  on p.acpt_numb  = a.invc_numb								")
			.where("      left outer join boxtype_mast   bt on bt.bxty_idcd = a.bxty_idcd								")
			.where("      left outer join cstm_mast      c  on a.cstm_idcd  = c.cstm_idcd								")
			.where("where   1=1																							")
			.where("and     p.pdod_date  >= :invc_date1      " , arg.getParamText("invc_date1"))
			.where("and     p.pdod_date  <= :invc_date2      " , arg.getParamText("invc_date2"))
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     p.find_name  like %:find_name%   " , arg.getParamText("find_name"))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by p.pdod_date desc, p.invc_numb, pp.cvic_idcd												")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 생산지시등록 조회
	public SqlResultMap getMaster2(HttpRequestArgument arg , int page, int rows , String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.query("from (																								")
			.query("select  pa.invc_numb as plan_numb																	")
			.query("      , pa.plan_sttm      , c.cstm_name       , a.prod_name       , a.item_leng						")
			.query("      , a.item_widh       , a.item_hght       , a.acpt_qntt       , a.invc_numb						")
			.query("      , a.cstm_idcd       , a.prod_idcd       , a.ostt_date       , bx.bxty_name					")
			.query("      , a.pcod_numb       , a.invc_date       , pa.plan_qntt										")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.query("      , ifnull(b.indn_qntt,0) as indn_qntt    , pp.cvic_idcd      , v.cvic_name						")
			.query("from  prod_plan pp																					")
			.query("   left outer join ( select invc_numb, plan_sttm, sum(plan_qntt) as plan_qntt, acpt_numb			")
			.query("                     from prod_plan_acpt															")
			.query("                     where 1=1																		")
			.query("                     and plan_sttm >= :invc_date3      " , arg.getParamText("invc_date1"))
			.query("                     and plan_sttm <= :invc_date4      " , arg.getParamText("invc_date2"))
			.query("                     group by invc_numb																")
			.query("                   ) pa on pp.invc_numb = pa.invc_numb												")
			.query("   left outer join boxx_acpt a on pa.acpt_numb = a.invc_numb										")
			.query("   left outer join boxtype_mast   bx on a.bxty_idcd = bx.bxty_idcd									")
			.query("   left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.query("   left outer join cvic_mast      v  on pp.cvic_idcd = v.cvic_idcd									")
			.query("   left outer join ( select sum(a.indn_qntt) as indn_qntt, a.invc_numb, b.pdsd_numb					")
			.query("                     from pror_item a																")
			.query("                     left outer join pror_mast b on a.invc_numb = b.invc_numb						")
			.query("                     where 1=1																		")
			.query("                     and b.pdod_date >= :invc_date5      " , arg.getParamText("invc_date1"))
			.query("                     group by b.pdsd_numb															")
			.query("                   ) b on pp.invc_numb = b.pdsd_numb												")
			.query("where   1=1																							")
			.query("and     a.apvl_yorn = '1'																			")
			.query("and     pa.plan_qntt > ifnull(b.indn_qntt,0)														")
			.query("and     pp.plan_sttm >= :invc_date1      " , arg.getParamText("invc_date1"))
			.query("and     pp.plan_sttm <= :invc_date2      " , arg.getParamText("invc_date2"))
			.query("and     a.invc_numb   = :invc_numb       ", arg.getParamText("invc_numb"))
			.query("and     a.cstm_idcd   = :cstm_idcd       ", arg.getParamText("cstm_idcd"))
			.query("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.query("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.query(" order by plan_numb asc																			")
			.query(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1,'입고','발주'), '수주') as dvcd					")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, if(a.istt_yorn = 1, 3, 2), 1) as dvcd_numb					")
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

	public SqlResultMap getDetail3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																" )
		;
		data.param
			.where("select  MAX(CASE WHEN wkct_idcd = '100' THEN plan_qntt END) AS plan_qntt_01 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '110' THEN plan_qntt END) AS plan_qntt_02 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '120' THEN plan_qntt END) AS plan_qntt_03 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '130' THEN plan_qntt END) AS plan_qntt_04 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '140' THEN plan_qntt END) AS plan_qntt_05 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '150' THEN plan_qntt END) AS plan_qntt_06 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '160' THEN plan_qntt END) AS plan_qntt_07 ,					")
			.where("        MAX(CASE WHEN wkct_idcd = '100' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_01 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '110' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_02 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '120' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_03 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '130' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_04 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '140' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_05 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '150' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_06 ,	")
			.where("        MAX(CASE WHEN wkct_idcd = '160' THEN (b.need_qntt/plan_qntt)  END) AS mxm2_qntt_07 		")
			.where("from    boxx_acpt_bop a																	")
			.where("        left outer join boxx_acpt_bom b on a.invc_numb = b.invc_numb 					")
			.where("where   a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
		;
		return data.selectForMap();
	}

	public SqlResultMap getWrite(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		SqlResultMap map	= arg.getParameter("records", SqlResultMap.class);
		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateRowRec(map, "", "invc_numb");

		data.param // 집계문  입력
			.query("call plan_write_list(")
			.query("    :param", param)
			.query(")")
		;
		return data.selectForMap();
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateRowRec(map, "", "invc_numb,plan_qntt2,invc_seqn,cvic_idcd");

		data.param // 집계문  입력
			.query("call work_pror_create(")
			.query("    :param", param)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();
		return null;
	}

	public SqlResultMap setWrite2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateRowRec(map, "", "invc_numb");

		data.param // 집계문  입력
			.query("call work_pror_create_all(")
			.query("   :param "       , param)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getWkct1(HttpRequestArgument arg , int page, int rows , String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb       , a.line_seqn       , b.pdsd_numb       , a.indn_qntt							")
			.query("      , p.wkct_idcd       , w.wkct_name       , w.wkct_stnm       , u.unit_name							")
			.query("      , json_value(p.json_data, '$**.wkun_dvcd') as wkun_dvcd     , p.plan_qntt							")
			.query("      , o.plan_qntt as need_qntt																		")
		;
		data.param
			.where("from    pror_item a																						")
			.where("     left outer join pror_mast      b  on a.invc_numb = b.invc_numb										")
			.where("     left outer join prod_plan_wkct p  on b.pdsd_numb = p.invc_numb and a.line_seqn = p.invc_seqn		")
			.where("     left outer join prod_plan_acpt c  on p.invc_numb = c.invc_numb and p.invc_seqn = c.line_seqn		")
			.where("     left outer join boxx_acpt_bop  o  on c.acpt_numb = o.invc_numb and c.acpt_seqn = o.line_seqn		")
			.where("     left outer join wkct_mast      w  on p.wkct_idcd = w.wkct_idcd")
			.where("     left outer join unit_mast      u  on u.unit_idcd = json_value(p.json_data, '$**.qntt_unit_idcd')	")
			.where("where   1=1																								")
			.where("and     a.invc_numb   = :pror_numb  " , arg.getParamText("pror_numb" ))
			.where("and     a.line_stat   = :line_stat1 " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_numb, a.line_seqn asc																	")
			;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap getWkct2(HttpRequestArgument arg , int page, int rows , String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb       , a.plan_qntt       , a.item_idcd       , a.plan_sttm							")
			.query("      , w.wkct_name       , u.unit_name       , w.wkct_stnm       , a.invc_seqn							")
			.query("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos							")
			.query("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd							")
			.query("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd							")
			.query("      , bp.wkun_dvcd      , ifnull(p.indn_qntt,0) as indn_qntt    , bp.plan_qntt as need_qntt			")
		;
		data.param
			.where("from    prod_plan_wkct a																				")
			.where("        left outer join wkct_mast      w  on a.wkct_idcd = w.wkct_idcd									")
			.where("        left outer join prod_plan_acpt pa on a.invc_numb = pa.invc_numb and a.invc_seqn = pa.line_seqn	")
			.where("        left outer join boxx_acpt_bop  bp on pa.acpt_numb = bp.invc_numb and pa.acpt_seqn = bp.line_seqn")
			.where("        left outer join unit_mast      u  on bp.qntt_unit_idcd = u.unit_idcd							")
			.where("        left outer join ( select sum(ifnull(a.indn_qntt,0)) as indn_qntt, a.orig_invc_numb, a.line_seqn	")
			.where("                          from pror_item a																")
			.where("                          left outer join pror_mast b on a.invc_numb = b.invc_numb						")
			.where("                          where 1=1																		")
			.where("                          and b.pdod_date >= :invc_date1      " , arg.getParamText("invc_date1"))
			.where("                          group by a.orig_invc_numb, a.line_seqn										")
			.where("                        ) p on a.invc_numb = p.orig_invc_numb and a.invc_seqn = p.line_seqn				")
			.where("where   1=1																								")
			.where("and     a.plan_qntt - ifnull(p.indn_qntt,0) > 0															")
			.where("and     a.invc_numb   = :plan_numb  " , arg.getParamText("plan_numb" ))
			.where("and     a.line_stat   = :line_stat1 " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.invc_numb asc																				")
			;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("pror_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		//item 있는지 한번 거르기
		temp.param
			.query("select if(count(b.line_seqn) > 0, 1, 0) as yorn					")
			.query("from  pror_mast a												")
			.query("left outer join pror_item b on a.invc_numb = b.invc_numb		")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("pror_mast")
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
