package com.sky.system.custom.hjsys.prod.workentry;

import java.text.SimpleDateFormat;
import java.util.Date;

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


@Service("hjsys.WorkEntryService")
public class WorkEntryService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.println(arg);
			data.param // 집계문  입력
				.query("call pror_list_hj (	")
				.query(" :invc_numb	" , arg.getParameter("invc_numb"))
				.query(" )	")
				;
		return data.selectForMap() ;
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.query("call pror_list_hj (	")
			.query(" :invc_numb	" , arg.getParameter("invc_numb"))
			.query(" )	")
			;
	return data.selectForMap() ;
	}


	public SqlResultMap getSearch3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from(																								")
			.where("select	  a.invc_numb      , i.item_name      , a.item_idcd      , a.need_qntt						")
			.where("        , m.invc_date      , c.cstm_name      , i.item_widh      , i.item_leng						")
			.where("        , a.drwg_numb      , a.revs_numb      , a.line_seqn      , m.deli_date						")
			.where("        , mi.user_memo     , a.sysm_memo      , a.prnt_idcd      , a.line_levl						")
			.where("        , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name						")
			.where("        , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd						")
			.where("        , a.updt_urif      , a.crte_user_name , a.crte_ipad      , a.crte_dttm						")
			.where("        , a.crte_idcd      , a.crte_urif      , m.acpt_case_name as modl_name, m.acpt_qntt			")
			.where("        , u.unit_name																				")
			.where("from	mtrl_need a																					")
			.where("left outer join pror_mast  p on p.acpt_numb = a.invc_numb and p.item_idcd = a.item_idcd				")
			.where("left outer join item_mast  i on a.item_idcd = i.item_idcd											")
			.where("left outer join acpt_mast  m on a.invc_numb = m.invc_numb											")
			.where("left outer join cstm_mast  c on m.cstm_idcd = c.cstm_idcd											")
			.where("left outer join acpt_item mi on a.invc_numb = mi.invc_numb											")
			.where("left outer join unit_mast  u on mi.unit_idcd = u.unit_idcd											")
			.where("left outer join item_mast i2 on mi.item_idcd = i2.item_idcd											")
			.where("where	1=1																							")
			.where("and		p.invc_numb  = :invc_numb"			, arg.getParameter("invc_numb"))
			.where("and		a.line_stat	< :line_stat"				, "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																									")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getPror(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																							")
		;
		data.param
			.where("from(																								")
			.where("select	  a.invc_numb         , a.line_seqn         , t.invc_qntt         , m.acpt_case_name		")
			.where("		, a.prog_stat_dvcd    , c.cstm_name         , i.item_name         , a.indn_qntt				")
			.where("		, a.wkct_idcd         , k.wkct_name         , u.user_name         , w.invc_date as work_date")
			.where("		, mt.drwg_numb        , t.item_idcd         , mt.revs_numb        , a.cstm_idcd				")
			.where("		, a.wkfw_seqn         , w.good_qntt         , w.poor_qntt									")
			.where("		, a.user_memo         , a.sysm_memo         , a.prnt_idcd         , a.line_levl				")
			.where("		, a.line_ordr         , a.line_stat         , a.line_clos         , a.find_name				")
			.where("		, a.updt_user_name    , a.updt_ipad         , a.updt_dttm         , a.updt_idcd				")
			.where("		, a.updt_urif         , a.crte_user_name    , a.crte_ipad         , a.crte_dttm				")
			.where("		, a.crte_idcd         , a.crte_urif															")
			.where("from	pror_item a																					")
			.where("        left outer join pror_mast b on a.invc_numb = b.invc_numb									")
			.where("        left outer join acpt_item t on b.acpt_numb = t.invc_numb and b.acpt_seqn = t.line_seqn		")
			.where("        left outer join acpt_mast m on t.invc_numb = m.invc_numb									")
			.where("        left outer join cstm_mast c on m.cstm_idcd = c.cstm_idcd									")
			.where("        left outer join item_mast i on b.item_idcd = i.item_idcd									")
			.where("        left outer join work_book w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn		")
			.where("        left outer join wkct_mast k on a.wkct_idcd = k.wkct_idcd									")
			.where("        left outer join user_mast u on w.wker_idcd = u.user_idcd									")
			.where("        left outer join mtrl_need mt on b.item_idcd = mt.item_idcd and b.acpt_numb = mt.invc_numb	")
			.where("where	1=1																							")
			.where("and     ifnull(a.otod_yorn,0) = 0																	")
			.where("and     ifnull(a.wkfw_seqn,0) > 0																	")
			.where("and     b.pdod_date      >= :pdod1_date			" , arg.getParamText("pdod_date1"))
			.where("and     b.pdod_date      <= :pdod2_date			" , arg.getParamText("pdod_date2"))
			.where("and     a.wkct_idcd       = :wkct_idcd			" , arg.getParameter("wkct_idcd" ))
			.where("and     a.prog_stat_dvcd  = :prog_stat_dvcd		" , arg.getParameter("prog_stat_dvcd"))
		;
		if(!arg.getParamText("prog_stat_dvcd").equals("0")){
			data.param
			.where("and     w.invc_numb =  ( select r.invc_numb															")
			.where("                        from work_book r  															")
			.where("                        where a.invc_numb = r.wkod_numb and a.line_seqn = r.wkod_seqn				")
			.where("                        order by crte_dttm desc limit 1												")
			.where("                       )																			")
			;
		}
		data.param
			.where("and     a.line_stat	      < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by w.invc_date, a.invc_numb, a.wkfw_seqn limit 99999999999									")
			.where(") a																									")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getWork(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select	  a.invc_numb         , a.line_seqn        , a.wkfw_seqn        , a.wkct_idcd				")
			.where("		, a.indn_qntt         , w.wker_idcd        , a.prog_stat_dvcd   , a.otod_yorn				")
//			.where("		, w.good_qntt         , w.poor_qntt        , u.user_name        , w.invc_date				")
			.where("		, 0 as good_qntt      , 0 as poor_qntt     , u.user_name        , w.invc_date				")
			.where("		, DATE_FORMAT(str_to_date(w.work_strt_dttm,'%Y%m%d'),'%Y-%m-%d')   as strt_date				")
			.where("		, DATE_FORMAT(str_to_date(w.work_strt_dttm,'%Y%m%d%H%i'),'%H:%i') as strt_time				")
			.where("		, DATE_FORMAT(str_to_date(w.work_endd_dttm,'%Y%m%d'),'%Y-%m-%d')   as endd_date				")
			.where("		, DATE_FORMAT(str_to_date(w.work_endd_dttm,'%Y%m%d%H%i'),'%H:%i') as endd_time				")
			.where("		, ifnull((	select count(r.prog_stat_dvcd) 													")
			.where("					from work_book r 																")
			.where("					where a.invc_numb=r.wkod_numb													")
			.where("					and a.wkct_idcd = r.wkct_idcd													")
			.where("					and prog_stat_dvcd = 3															")
			.where("				),0) as chk_prog																	")
			.where("from	pror_item a																					")
			.where("        left outer join work_book w on a.invc_numb = w.wkod_numb and a.line_seqn = w.wkod_seqn		")
			.where("        left outer join user_mast u on w.wker_idcd = u.user_idcd									")
			.where("where	1=1																							")
			.where("and     a.invc_numb  = :invc_numb 			" , arg.getParamText("invc_numb"))
			.where("and     a.wkct_idcd      = :wkct_idcd			" , arg.getParamText("wkct_idcd"))
			.where("and     a.line_stat	      < :line_stat			" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getMaxWkfw(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.where("select  ifnull(max(b.wkfw_seqn),0) as max_wkfw												")
			.where("from    work_book a																			")
			.where("left outer join pror_item b on a.wkod_numb = b.invc_numb and a.wkod_seqn = b.line_seqn		")
			.where("where	1=1																					")
			.where("and     a.wkod_numb  = :wkod_numb		" , arg.getParamText("wkod_numb"))
			.where("and     a.line_stat	     < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setWorkBook(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String set = arg.getParamText("_set");

		for (SqlResultRow row : map) {
			if(set.equals("insert")){

				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, row.getParamText("prog_stat_dvcd"))
				;
				if(row.getParamText("prog_stat_dvcd").equals("3")){
					data.param
						.update("work_endd_dttm", row.getParameter("work_endd_dttm"	))
					;
				}
				data.attach(Action.update);
				data.execute();
				data.clear();

				int prod_qntt = Integer.parseInt(row.getParamText("poor_qntt"))+ Integer.parseInt(row.getParamText("good_qntt"));

				data.param
					.table("work_book")
					.where("where invc_numb = :invc_numb							")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))

					.update("invc_date"			, row.getParameter("invc_date"		))
					.update("work_strt_dttm"	, row.getParameter("work_strt_dttm"	))
					.update("work_endd_dttm"	, row.getParameter("work_endd_dttm"	))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"		))
					.update("item_idcd"			, row.getParameter("item_idcd"		))
					.update("wkod_numb"			, row.getParameter("wkod_numb"		))
					.update("wkod_seqn"			, row.getParameter("wkod_seqn"		))
					.update("indn_qntt"			, row.getParameter("indn_qntt"		))
					.update("good_qntt"			, row.getParameter("good_qntt"		))
					.update("poor_qntt"			, row.getParameter("poor_qntt"		))
					.update("prod_qntt"			, prod_qntt)
					.update("wker_idcd"			, row.getParameter("wker_idcd"		))
					.update("prog_stat_dvcd"	, row.getParameter("prog_stat_dvcd"	))


					.update("line_levl"			, row.getParameter("line_levl")) /* ROW레벨 */
					.update("line_ordr"			, row.getParameter("line_ordr")) /* ROW순서 */
					.update("line_stat"			, row.getParameter("line_stat")) /* ROW상태 */
					.update("line_clos"			, row.getParameter("line_clos")) /* 마감여부 */
					.update("find_name"			, row.getParamText("pjod_idcd").trim() + row.getParamText("invc_date").trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name")) /* 수정사용자명 */
					.update("updt_ipad"			, row.getParameter("updt_ipad")) /* 수정IP */
					.update("updt_idcd"			, row.getParameter("updt_idcd")) /* 수정ID */
					.update("updt_urif"			, row.getParameter("updt_urif")) /* 수정UI */
					.insert("crte_user_name"	, row.getParameter("crte_user_name")) /* 생성사용자명 */
					.insert("crte_ipad"			, row.getParameter("crte_ipad")) /* 생성IP */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
					.insert("crte_idcd"			, row.getParameter("crte_idcd")) /* 생성ID */
					.insert("crte_urif"			, row.getParameter("crte_urif")) /* 생성UI */
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();
				if(row.getParamText("prog_stat_dvcd").equals("3")){
					data.param
						.query("call acpt_prod_isos(")
						.query("       :invc_numb",row.fixParameter("new_invc_numb"))
						.query("     , :wkod_numb",row.fixParameter("wkod_numb"))
						.query("     , :wkod_seqn",row.fixParameter("wkod_seqn"))
						.query(")")
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
				data.param
					.query("update pror_item a																	")
					.query("left outer join ( select wkod_numb,wkod_seqn,min(work_strt_dttm) as work_strt_dttm	")
					.query("                  from work_book													")
					.query("                  where wkod_numb = :wkod_numb	",row.fixParameter("wkod_numb"))
					.query("                  and   wkod_seqn = :wkod_seqn	",row.fixParameter("wkod_seqn"))
					.query("                  group by wkod_numb ,wkod_seqn										")
					.query(") b on a.invc_numb = b.wkod_numb and a.line_seqn = b.wkod_seqn						")
					.query("set a.work_strt_dttm = b.work_strt_dttm												")
					.query("where  a.invc_numb = :invc_numb",row.fixParameter("wkod_numb"))
					.query("and    a.line_seqn = :line_seqn",row.fixParameter("wkod_seqn"))
				;
				data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(set.equals("cancel")){
				data.param
					.table("pror_item")
					.where("where invc_numb = :invc_numb								")
					.where("and   line_seqn = :line_seqn								")

					.unique("invc_numb"			, row.fixParameter("wkod_numb"))
					.unique("line_seqn"			, row.fixParameter("wkod_seqn"))

					.update("prog_stat_dvcd"	, row.getParamText("prog_stat_dvcd"))
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				data.param
					.table("work_book")
					.where("where wkod_numb = :wkod_numb								")
					.where("and   wkod_seqn = :wkod_seqn								")
					.where("and   wkct_idcd = :wkct_idcd								")

					.unique("wkod_numb"				, row.fixParameter("wkod_numb"))
					.unique("wkod_seqn"				, row.fixParameter("wkod_seqn"))
					.unique("wkct_idcd"				, row.fixParameter("wkct_idcd"))
				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			}
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

	public SqlResultMap getPoorSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *																	")
		;
		data.param
			.query("from (																		")
			.query("select   ifnull(max(a.line_seqn),0) as line_seqn							")
		;
		data.param
			.query("from work_book_qc a															")
			.query("where 1=1																	")
			.query("and   a.invc_numb =:invc_numb"  , arg.getParamText("invc_numb"))
			.query("and a.line_stat   < '2'														")
			.query(") a																			")
		;
		return data.selectForMap();
	}


	public SqlResultMap setPoor(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))

			.update("invc_date"				, arg.getParameter("invc_date"		))
			.update("poor_bacd"				, arg.getParameter("poor_bacd"		))
			.update("sttm"					, arg.getParameter("sttm"			))
			.update("edtm"					, arg.getParameter("edtm"			))
			.update("wker_idcd"				, arg.getParameter("wker_idcd"		))
			.update("occr_qntt"				, arg.getParameter("occr_qntt"		))
			.update("poor_qntt"				, arg.getParameter("poor_qntt"		))
			.update("poor_proc_dvcd"		, arg.getParameter("poor_proc_dvcd"	))
			.update("remk_text"				, arg.getParameter("remk_text"		))

			.update("line_levl"				, arg.getParameter("line_levl")) /* ROW레벨 */
			.update("line_ordr"				, arg.getParameter("line_ordr")) /* ROW순서 */
			.update("line_stat"				, arg.getParameter("line_stat")) /* ROW상태 */
			.update("line_clos"				, arg.getParameter("line_clos")) /* 마감여부 */
			.update("updt_user_name"		, arg.getParameter("updt_user_name")) /* 수정사용자명 */
			.update("updt_ipad"				, arg.getParameter("updt_ipad")) /* 수정IP */
			.update("updt_idcd"				, arg.getParameter("updt_idcd")) /* 수정ID */
			.update("updt_urif"				, arg.getParameter("updt_urif")) /* 수정UI */
			.insert("crte_user_name"		, arg.getParameter("crte_user_name")) /* 생성사용자명 */
			.insert("crte_ipad"				, arg.getParameter("crte_ipad")) /* 생성IP */
			.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 생성일시 */
			.insert("crte_idcd"				, arg.getParameter("crte_idcd")) /* 생성ID */
			.insert("crte_urif"				, arg.getParameter("crte_urif")) /* 생성UI */
		;
		data.attach(Action.insert);
		data.execute();
		return null;
	}

	//불량내역삭제
	public SqlResultMap setPoorDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")
			.where("and   line_seqn = :line_seqn								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	//취소시 불량내역삭제
	public SqlResultMap setPoorDelete2(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("work_book_qc")
			.where("where invc_numb = :invc_numb								")

			.unique("invc_numb"				, arg.fixParameter("invc_numb"		))
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	//불량이력조회
	public SqlResultMap getPoor2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_date   , w.wkct_name    , a.poor_qntt    , p.invc_numb						")
			.query("      , (select base_name from base_mast r where a.poor_bacd  = r.base_code					")
			.query("                                             and   r.prnt_idcd = '6000')   as poor_name		")
			.query("from   work_book_qc a																		")
			.query("left outer join work_book k on a.invc_numb = k.invc_numb									")
			.query("left outer join pror_item p on k.wkod_numb = p.invc_numb and k.wkod_seqn = p.line_seqn		")
			.query("left outer join wkct_mast w on k.wkct_idcd = w.wkct_idcd									")
			.query("where  1=1																					")
			.query("and    p.invc_numb = :invc_numb"		, arg.getParameter("invc_numb"))
			.query("order by a.invc_date desc, p.wkfw_seqn, a.line_seqn											")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getMtrlStock(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.*																					")
		;
		data.param
			.where("from (																						")
			.where("select  a.invc_numb       , a.amnd_degr       , a.acpt_seqn       , a.line_seqn				")
			.where("      , a.acct_bacd       , a.item_idcd       , a.item_widh       , a.item_leng				")
			.where("      , a.need_qntt       , i.item_name       , i.item_code       , i.item_spec				")
			.where("      , ifnull(ordr.stok_used_qntt,0) as stok_used_qntt           , r.base_qntt				")
			.where("      , if(ifnull(ordr.stok_used_qntt,0) - ifnull(isos.qntt2,0) < 0, 0,ifnull(ordr.stok_used_qntt,0) - ifnull(isos.qntt2,0)) as useqntt ")
			.where("from mtrl_need a																			")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join acpt_item b on a.invc_numb = b.invc_numb and a.acpt_seqn = b.line_seqn		")
			.where("left outer join acpt_mast c on a.invc_numb = c.invc_numb									")
			.where("left outer join (																			")
			.where("  select  b.item_idcd , ifnull(a.base_qntt,0)+ifnull(b.base_qntt,0) as base_qntt			")
			.where("  from (																					")
			.where("    select item_idcd  , base_qntt + istt_qntt - ostt_qntt as base_qntt, a.clos_yymm			")
			.where("    from isos_sum a																			")
			.where("    where  a.clos_yymm																		")
			.where("           in ( select ifnull(max(r.clos_yymm),'202001') as clos_yymm						")
			.where("                from  isos_sum r															")
			.where("                where a.item_idcd = r.item_idcd												")
			.where("                group by r.item_idcd														")
			.where("              )																				")
			.where("  ) a right outer join (																	")
			.where("        select sum(base_qntt) as base_qntt,invc_date,item_idcd								")
			.where("        from(																				")
			.where("          select a.bzpl_idcd , a.wrhs_idcd , a.item_idcd									")
			.where("               , case invc_dvcd when '1100' then a.qntt										")
			.where("                                when '1200' then a.qntt										")
			.where("                                when '1300' then a.qntt										")
			.where("                                when '1400' then a.qntt										")
			.where("                                when '1500' then a.qntt										")
			.where("                                when '2100' then a.qntt * -1								")
			.where("                                when '2200' then a.qntt * -1								")
			.where("                                when '2300' then a.qntt * -1								")
			.where("                                when '2400' then a.qntt * -1								")
			.where("                                when '2500' then a.qntt * -1								")
			.where("                                when '2600' then a.qntt * -1								")
			.where("                                when '2700' then a.qntt * -1								")
			.where("                                else a.qntt  end as base_qntt								")
			.where("               , invc_date																	")
			.where("          from   isos_book a																")
			.where("         ) a																				")
			.where("         group by item_idcd																	")
			.where("   ) b on b.item_idcd  = a.item_idcd and b.invc_date >= ifnull( a.clos_yymm,'20190101')		")
			.where(") r on a.item_idcd = r.item_idcd															")
			.where("left outer join ( 																			")
			.where("    select ifnull(sum(json_value(a.json_data , '$**.stok_used_qntt')),0) as stok_used_qntt	")
			.where("         , a.orig_invc_numb   , a.item_idcd													")
			.where("    from   purc_ordr_item a																	")
			.where("    left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb							")
			.where("    where  b.line_stat < 2																	")
			.where("    group  by a.orig_invc_numb, a.item_idcd													")
			.where(") ordr on a.invc_numb = ordr.orig_invc_numb and a.item_idcd = ordr.item_idcd				")
			.where("left outer join ( 																			")
			.where("    select ifnull(sum(a.qntt),0) as qntt2, a.invc_numb, a.line_seqn, a.assi_seqn			")
			.where("    from   isos_book a																		")
			.where("    group  by a.invc_numb, a.line_seqn														")
			.where(") isos on a.invc_numb = isos.invc_numb and a.line_seqn = isos.line_seqn and a.acpt_seqn = isos.assi_seqn")
			.where("where 1=1																					")
			.where("and   a.acct_bacd in ('1001','1002','1003')													")
			.where("and   ifnull(ordr.stok_used_qntt,0) - ifnull(isos.qntt2,0) > 0								")
			.where("and   r.base_qntt > 0																		")
			.where("and   a.invc_numb = :invc_numb"		,arg.getParameter("invc_numb"))
			.where("and   a.prnt_idcd = :prnt_idcd"		,arg.getParameter("prnt_idcd"))
			.where("and   a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by	a.line_seqn	limit 99999999) a													")
		;
		return data.selectForMap();
	}


	//자재투입시 재고 반영
	public SqlResultMap setIsos(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String base = "01";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
			} else {
				data.param
					.table("isos_book")
					.where("where invc_numb	= :invc_numb" )
					.where("and   bzpl_idcd	= :bzpl_idcd" )
					.where("and   invc_dvcd	= :invc_dvcd" )
					.where("and   line_seqn	= :line_seqn" )
					.where("and   assi_seqn	= :assi_seqn" )

					.unique("bzpl_idcd"				, base)
					.unique("invc_numb"				, row.fixParameter("invc_numb"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))
					.unique("assi_seqn"				, row.fixParameter("seqn"))
					.unique("invc_dvcd"				, 2100)

					.update("invc_date"				, new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.update("acct_bacd"				, row.getParameter("acct_bacd"))
					.update("wrhs_idcd"				, base)

					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("item_code"				, row.getParameter("item_code"))
					.update("unit_idcd"				, row.getParameter("unit_idcd"))
					.update("qntt"					, row.getParameter("qntt"))
					.update("orig_invc_numb"		, row.getParameter("invc_numb"))
					.update("orig_seqn"				, row.getParameter("line_seqn"))


					.update("uper_seqn"				, row.getParameter("uper_seqn"))
					.update("disp_seqn"				, row.getParameter("disp_seqn"))
					.update("user_memo"				, row.getParameter("user_memo"))
					.update("sysm_memo"				, row.getParameter("sysm_memo"))
					.update("prnt_idcd"				, row.getParameter("prnt_idcd"))
					.update("line_levl"				, row.getParameter("line_levl"))
					.update("line_ordr"				, row.getParameter("line_ordr"))
					.update("line_stat"				, row.getParameter("line_stat"))
					.update("line_clos"				, row.getParameter("line_clos"))
					.update("find_name"				, row.getParameter("lott_numb")
													+ "	"
													+ row.fixParameter("item_idcd"))
					.update("updt_user_name"		, row.getParameter("updt_user_name"))
					.update("updt_ipad"				, row.getParameter("updt_ipad"))
					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.update("updt_urif"				, row.getParameter("updt_urif"))
					.update("crte_user_name"		, row.getParameter("crte_user_name"))
					.update("crte_ipad"				, row.getParameter("crte_ipad"))
					.update("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("crte_urif"				, row.getParameter("crte_urif"))
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
			}
		}
		data.execute();
		return null ;
	}

	//순번
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(assi_seqn),0)+1 as seqn from isos_book		")
			.where("where  invc_numb = :invc_numb"		,arg.getParameter("invc_numb"))
			.where("and    line_seqn = :line_seqn"		,arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}


}
