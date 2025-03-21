package com.sky.system.custom.iypkg.prod.workentry;

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


@Service("iypkg.WorkEntryService")
public class WorkEntryService extends DefaultServiceHandler{

	// 생산지시내역 조회
	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																			")
		;
			data.param
			.where("from (																				")
			.where("select   b.invc_date    , c.cstm_name     , b.prod_name     , a.invc_numb			")
			.where("       , b.item_leng  as prod_leng        , b.item_widh as prod_widh				")
			.where("       , b.item_hght  as prod_hght        , max(p.indn_qntt) as indn_qntt			")
			.where("       , ( select w.wkct_stnm														")
			.where("           from work_book wb														")
			.where("       	 left outer join wkct_mast w on wb.wkct_idcd = w.wkct_idcd					")
			.where("       	 where wb.wkod_numb = a.invc_numb											")
			.where("       	 order by wb.invc_date desc , wb.wkod_seqn desc								")
			.where("       	 limit 1																	")
			.where("       ) as wkct_stnm																")
			.where("       , ( select wb.prog_stat_dvcd 												")
			.where("           from work_book wb														")
			.where("       	 where wb.wkod_numb = a.invc_numb											")
			.where("       	 order by wb.invc_date desc , wb.wkod_seqn desc 							")
			.where("       	 limit 1																	")
			.where("       ) as prog_stat_dvcd															")


			.where("from pror_mast a																	")
			.where("left outer join pror_item p on a.invc_numb = p.invc_numb							")
			.where("left outer join boxx_acpt b on b.invc_numb = a.acpt_numb							")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd							")


			.where("where   1=1																			")
			.where("and     b.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     b.invc_date  >= :invc_date1      " , arg.getParamText("invc_date1"))
			.where("and     b.invc_date  <= :invc_date2      " , arg.getParamText("invc_date2"))
			.where("and     a.acpt_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     b.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     b.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																")
			.where(") a																					")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	// 생산지시내역 조회
	public SqlResultMap getMaster2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
			data.param
			.where("from (																								")
			.where("select  a.invc_date       , a.prod_qntt       , a.invc_numb       , a.wkod_numb						")
			.where("      , t.pcod_numb       , t.invc_date as acpt_date              , a.prog_stat_dvcd				")
			.where("      , t.invc_numb as acpt_numb              , w.wkct_name											")
			.where("      , w.wkct_stnm       , b.indn_qntt       , a.wkod_seqn											")
			.where("      , CONVERT(json_value(						")
			.where("          (select g.json_data from prod_plan_wkct g where b.orig_invc_numb = g.invc_numb and b.wkct_idcd = g.wkct_idcd group by g.invc_numb , g.wkct_idcd)	")
			.where("        ,'$.wkun_dvcd' ), CHAR(100)) as wkun_dvcd													")
			.where("      , json_value(																					")
			.where("          (select g.json_data from prod_plan_wkct g where b.orig_invc_numb = g.invc_numb and b.wkct_idcd = g.wkct_idcd group by g.invc_numb , g.wkct_idcd)	")
			.where("        ,'$.qntt_unit_idcd') as qntt_unit_idcd														")


			.where("from    work_book a																					")
			.where("   left outer join pror_item      b on a.wkod_numb = b.invc_numb and a.wkod_seqn = b.line_seqn		")
			.where("   left outer join pror_mast      p on b.invc_numb = p.invc_numb									")
			.where("   left outer join boxx_acpt      t on p.acpt_numb = t.invc_numb									")
			.where("   left outer join wkct_mast      w on a.wkct_idcd = w.wkct_idcd									")


			.where("where   1=1																							")
			.where("and     p.invc_numb is not null																		")
			.where("and     p.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getMaster3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.acpt_numb       , a.pdsd_date       , a.cstm_idcd						")
			.where("      , a.item_idcd       , m.prod_name       , m.prod_leng       , m.prod_widh						")
			.where("      , m.prod_hght       , c.cstm_name       , t.invc_date as acpt_date							")
			.where("      , t.acpt_qntt       , t.pcod_numb       , m.prod_code											")
			.where("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.where("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.where("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.where("from    pror_mast a																					")
			.where("   left outer join pror_item      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join product_mast   m on a.item_idcd = m.prod_idcd									")
			.where("   left outer join boxx_acpt      t on a.acpt_numb = t.invc_numb									")
			.where("where   1=1 																						")
			.where("and     b.prog_stat_dvcd in('0','2','4')															")
//			.where("and     (a.indn_qntt <= b.acpt_qntt)	   															")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd" ))
			.where("and     t.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     m.prod_idcd   = :prod_idcd       " , arg.getParamText("prod_idcd" ))
			.where("and     a.pdod_date  >= :invc_date1      " , arg.getParamText("invc_date1"))
			.where("and     a.pdod_date  <= :invc_date2      " , arg.getParamText("invc_date2"))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																				")
			.where("order by a.acpt_numb																				")
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// 조회
	public SqlResultMap getMaster4(HttpRequestArgument arg , int page, int rows , String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  a.invc_numb       , a.line_seqn       , a.indn_qntt       , a.wkct_idcd						")
			.where("      , w.wkct_name       , w.wkct_stnm       , u.unit_name       , a.prog_stat_dvcd				")
			.where("      , json_value(p.json_data,'$.qntt_unit_idcd') as qntt_unit_idcd								")
			.where("      , CONVERT(json_value(p.json_data,'$.wkun_dvcd' ), CHAR(100)) as wkun_dvcd						")
			.where("      , b.invc_numb as pdsd_numb              , a.indn_qntt - ifnull(k.prod_qntt,0) as unprod		")
			.where("from    pror_item a																					")
			.where("   left outer join prod_plan       b on a.orig_invc_numb = b.invc_numb								")
			.where("   left outer join prod_plan_wkct  p on b.invc_numb = p.invc_numb and a.line_seqn = p.invc_seqn		")
			.where("   left outer join wkct_mast       w on a.wkct_idcd = w.wkct_idcd									")
			.where("   left outer join unit_mast       u on json_value(p.json_data,'$.qntt_unit_idcd') = u.unit_idcd	")
			.where("   left outer join (select wkod_numb,wkod_seqn,sum(prod_qntt) as prod_qntt from work_book group by wkod_numb,wkod_seqn) k on a.invc_numb = k.wkod_numb and a.line_seqn = k.wkod_seqn 	")
			.where("where   1=1																							")
			.where("and     a.prog_stat_dvcd not in('3')																")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn asc limit 99999																")
			.where(") a																									")
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1,'발주', '수주') as dvcd											")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, 2, 1) as dvcd_numb											")
			.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
			.where("      , a.item_ttln       , a.item_ttwd       , a.item_fxqt											")
			.where("      , a.item_widh       , a.fabc_name																")
			.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
			.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
			.where("from   pror_mast p																					")
			.where("   left outer join (select a.invc_numb, a.acpt_numb from prod_plan_acpt a group by a.invc_numb) w on p.pdsd_numb = w.invc_numb")
			.where("   left outer join boxx_acpt_bom  a on w.acpt_numb = a.invc_numb									")
			.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
			.where("and     p.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getDetail2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from (																								")
			.where("select  if(ifnull(a.offr_yorn,0) = 1,'발주', '수주') as dvcd											")
			.where("      , if(ifnull(a.offr_yorn,0) = 1, 2, 1) as dvcd_numb											")
			.where("      , a.invc_numb       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd						")
			.where("      , a.fabc_name       , a.item_ttln       , a.item_ttwd       , a.item_fxqt						")
			.where("      , a.item_widh																					")
			.where("      , a.fdat_spec       , a.cstm_idcd       , c.cstm_name       , a.need_qntt						")
			.where("      , if(ifnull(a.offr_yorn,0) = 1,if(length(ifnull(a.cstm_idcd,''))>0, a.istt_date, a.offr_date), b.invc_date) as invc_date")
			.where("from   pror_mast p																					")
			.where("   left outer join (select a.invc_numb, a.acpt_numb from prod_plan_acpt a group by a.invc_numb) w on p.pdsd_numb = w.invc_numb")
			.where("   left outer join boxx_acpt_bom  a on w.acpt_numb = a.invc_numb									")
			.where("   left outer join boxx_acpt      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join fabc_mast      f on a.fabc_idcd = f.fabc_idcd									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																							")
			.where("and     p.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																									")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWrite(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.where("select  a.invc_numb       , a.acpt_numb       , a.pdsd_date       , a.cstm_idcd						")
			.where("      , a.item_idcd       , m.prod_name       , m.prod_leng       , m.prod_widh						")
			.where("      , m.prod_hght       , c.cstm_name       , t.invc_date as acpt_date							")
			.where("      , t.acpt_qntt       , t.pcod_numb       , t.deli_date											")
			.where("      , a.user_memo       , a.sysm_memo       , a.line_stat       , a.line_clos						")
			.where("      , a.line_levl       , a.line_ordr       , a.updt_urif       , a.crte_urif						")
			.where("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("      , a.crte_user_name  , a.crte_ipad       , a.crte_dttm       , a.crte_idcd						")
			.where("from    pror_mast a																					")
			.where("   left outer join pror_item      b on a.invc_numb = b.invc_numb									")
			.where("   left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd									")
			.where("   left outer join product_mast   m on a.item_idcd = m.prod_idcd									")
			.where("   left outer join boxx_acpt      t on a.acpt_numb = t.invc_numb									")
			.where("where   1=1 																						")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("group by a.invc_numb																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWriteBop(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select  a.invc_numb       , a.line_seqn       , a.indn_qntt       , a.wkct_idcd						")
			.where("      , w.wkct_name       , w.wkct_stnm       , u.unit_name       , a.item_idcd as prod_idcd		")
			.where("      , json_value(p.json_data,'$.qntt_unit_idcd') as qntt_unit_idcd								")
			.where("      , CONVERT(json_value(p.json_data,'$.wkun_dvcd' ), CHAR(100)) as wkun_dvcd						")
			.where("      , b.invc_numb as pdsd_numb              , m.prod_code       , m.prod_name						")
			.where("from    pror_item a																					")
			.where("   left outer join prod_plan       b on a.orig_invc_numb = b.invc_numb								")
			.where("   left outer join prod_plan_wkct  p on b.invc_numb = p.invc_numb and a.line_seqn = p.invc_seqn		")
			.where("   left outer join wkct_mast       w on a.wkct_idcd = w.wkct_idcd									")
			.where("   left outer join product_mast    m on a.item_idcd = m.prod_idcd									")
			.where("   left outer join unit_mast       u on json_value(p.json_data,'$.qntt_unit_idcd') = u.unit_idcd	")
			.where("where   1=1																							")
			.where("and     a.prog_stat_dvcd not in('3')																")
			.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn asc																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getWriteBop2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select  a.invc_numb       , a.wkod_numb       , a.wkod_seqn       , p.pdod_date					")
			.where("      , p.cstm_idcd       , c.cstm_name       , b.item_idcd       , a.prod_qntt					")
			.where("      , a.wkct_idcd       , json_value(t.json_data,'$.qntt_unit_idcd') as qntt_unit_idcd		")
			.where("      , u.unit_name       , w.wkct_name       , b.indn_qntt       , w.wkct_stnm					")
			.where("      , CONVERT(json_value(t.json_data,'$.wkun_dvcd' ), CHAR(100)) as wkun_dvcd					")
			.where("      , m.prod_name       , m.prod_code       , a.prog_stat_dvcd								")
			.where("from    work_book a																				")
			.where("   left outer join pror_item      b on a.wkod_numb = b.invc_numb and a.wkod_seqn = b.line_seqn	")
			.where("   left outer join pror_mast      p on b.invc_numb = p.invc_numb								")
			.where("   left outer join cstm_mast      c on p.cstm_idcd = c.cstm_idcd								")
			.where("   left outer join product_mast   m on b.item_idcd = m.prod_idcd								")
			.where("   left outer join prod_plan_wkct t on b.orig_invc_numb = t.invc_numb and b.wkct_idcd = t.wkct_idcd	")
			.where("   left outer join wkct_mast      w on a.wkct_idcd = w.wkct_idcd								")
			.where("   left outer join unit_mast      u on u.unit_idcd = json_value(t.json_data,'$.qntt_unit_idcd')	")
			.where("where   1=1																						")
			.where("and     a.prog_stat_dvcd in ('2')																")
			.where("and     a.wkod_numb   = :invc_numb       " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by b.line_seqn asc																		")
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map){
			data.param
				.table("work_book						")
				.where("where invc_numb		= :invc_numb")		//invoice번호

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"))	//invoice번호

				.update("invc_date"			, row.getParameter("work_strt_dttm"))	//invoice일자
				.update("item_idcd"			, row.getParameter("prod_idcd"))		//품목 ID
				.update("wkct_idcd"			, row.getParameter("wkct_idcd"))		//공정 ID
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"))		//거래처 ID
				.update("wkod_numb"			, row.getParameter("invc_numb"))		//작업지시번호
				.update("wkod_seqn"			, row.getParameter("line_seqn"))		//작업지시번호
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"))	//상태
				.update("indn_qntt"			, row.getParameter("indn_qntt"))		//지시수량
				.update("prod_qntt"			, row.getParameter("prod_qntt"))		//생산수량
				.update("pdsd_numb"			, row.getParameter("pdsd_numb"))		//생산계획번호
				.update("user_memo"			, row.getParameter("user_memo"))		//사용자메모
				.update("work_strt_dttm"	, row.getParameter("work_strt_dttm"))	//작업시작일자
				.update("work_endd_dttm"	, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//작업종료일자
				.update("find_name"			, row.getParameter("work_strt_dttm")
											+ "	"
											+ row.getParameter("prod_code")
											+ "	"
											+ row.getParameter("prod_name"))
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
				.table("pror_item						")
				.where("where invc_numb		= :invc_numb")
				.where("and   line_seqn		= :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"))
				.unique("line_seqn"			, row.fixParameter("line_seqn"))

				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"))	//상태
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.query("call boxx_istt_prod (								")
				.query("   :invc_numb "  , row.fixParameter("new_invc_numb"))
				.query(" ) 													")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();

		}
		return null;
	}
	public SqlResultMap setWriteAll(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		ParamToJson parse	= new ParamToJson();
		String param		= parse.TranslateGantt(arg, map, "invc_date", "invc_numb");
		data.param // 집계문  입력
			.query("call work_book_create2_all(")
			.query("   :param "       , param)
			.query(")")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("work_book")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("pror_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("wkod_numb"))
			.unique("line_seqn"		, arg.fixParameter("wkod_seqn"))

			.update("prog_stat_dvcd", 0)
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.query("call auto_work_isos_delete (						")
			.query("   :invc_numb "  ,  arg.fixParameter("invc_numb"))
			.query(" ) 													")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setWrite2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for (SqlResultRow row:map){
			data.param
				.table("work_book						")
				.where("where invc_numb		= :invc_numb")		//invoice번호

				.unique("invc_numb"			, row.fixParameter("invc_numb"))	//invoice번호

				.update("invc_date"			, row.getParameter("work_strt_dttm"))	//invoice일자
				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"))	//상태
				.update("prod_qntt"			, row.getParameter("prod_qntt"))		//생산수량
				.update("work_strt_dttm"	, row.getParameter("work_strt_dttm"))	//작업시작일자
				.update("work_endd_dttm"	, row.getParameter("work_endd_dttm"))	//작업종료일자

				.insert("line_levl"			, row.getParameter("line_levl"))
				.update("updt_idcd"			, row.getParameter("updt_idcd"))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();

			data.param
				.table("pror_item						")
				.where("where invc_numb		= :invc_numb")
				.where("and   line_seqn		= :line_seqn")

				.unique("invc_numb"			, row.fixParameter("wkod_numb"))
				.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

				.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"))	//상태
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		return null;
	}

	//불량조회
	public SqlResultMap getPoor(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb   , a.line_seqn    , a.invc_date       , a.poor_bacd		")
			.where("      , a.sttm        , a.edtm         , a.wker_idcd       , a.occr_qntt		")
			.where("      , a.good_qntt   , a.poor_qntt    , a.poor_proc_dvcd						")
			.where("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6000')   as poor_name")
			.where("from   work_book_qc a															")
			.where("left outer join work_book k on a.invc_numb = k.invc_numb						")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//유실조회
	public SqlResultMap getFail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																		")
		;
		data.param
			.where("from (																			")
			.where("select																			")
			.where("        a.invc_numb      , a.line_seqn      , a.invc_date    , a.loss_pcnt 		")
			.where("      , a.loss_resn_dvcd , a.sttm           , a.edtm         , a.loss_time		")
			.where("      , (select base_name from base_mast r where a.loss_resn_dvcd  = r.base_code		")
			.where("                                             and   r.prnt_idcd = '6100')   as loss_name	")
			.where("from   work_book_loss a															")
			.where("where  1=1																		")
			.where("and    a.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn ) a														")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

}
