package com.sky.system.prod.order.workbookv2;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class WorkBookV2Service extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("with loss as (																						")
			.query("SELECT																								")
			.query("  invc_numb,																						")
			.query("  GROUP_CONCAT(																						")
			.query("          CONCAT(v.base_name, ' : '																	")
			.query("               , if((format(a.loss_time,0)>0)														")
			.query("               , ROUND((a.loss_time/60),1),'0'))													")
			.query("               , '' order by a.line_seqn desc 														")
			.query("               SEPARATOR ', '																		")
			.query("  ) AS 'loss_text',																					")
			.query("  a.crte_dttm as loss_time,																			")
			.query("  ifnull(sum(a.loss_time),0) as totl_loss_time														")
			.query("FROM work_book_loss a																				")
			.query("     left outer join (select * from base_mast where prnt_idcd ='6100')v on a.loss_resn_dvcd = v.base_code	")
			.query(" group by invc_numb																					")
			.query("),																									")
			.query("ing as (																							")
			.query("select  a.invc_numb																					")
			.query("     , ( select sum(ifnull(r.prod_qntt,0)) 															")
			.query("         from   work_book r																			")
			.query("         where  a.work_strt_dttm >= r.work_strt_dttm												")
			.query("         and    a.wkod_numb = r.wkod_numb															")
			.query("         group by r.wkod_numb)																		")
			.query("     as prod_qntt 																					")
			.query("from  work_book a																					")
			.query("group by  a.invc_numb																				")
			.query("),																									")
			.query("poor as (																							")
			.query("SELECT																								")
			.query("  a.invc_numb, sum(ifnull(poor_qntt,0))    as poor_qntt,											")
			.query("  CONCAT(ifnull(b.base_name , a.poor_bacd), ':',format(a.poor_qntt,0)) AS 'poor_text',				")
			.query("  a.crte_dttm as poor_time																			")
			.query("FROM work_book_qc a																					")
			.query("     left outer join (select * from base_mast  where prnt_idcd = '6000') b on a.poor_bacd = b.base_code		")
			.query("where ifnull(a.poor_qntt,0) <> 0																	")
//			.query("and   a.line_seqn = (select ifnull(max(l.line_seqn),0)												")
//			.query("                     from   work_book_qc l where a.invc_numb = l.invc_numb)							")
			.query(" group by invc_numb																					")
			.query("),																									")
			.query("wc as (																								")
			.query("select a.acpt_numb , a.acpt_seqn																	")
			.query("     , w.wkct_name	, a.invc_numb																	")
			.query("from (																								")
			.query("    SELECT  m.acpt_numb , m.acpt_seqn , a.cvic_idcd , a.invc_numb									")
			.query("         , (CASE when @val1 = m.acpt_numb and @val2 = m.acpt_seqn  THEN @rownum:=@rownum+1			")
			.query("                 else @rownum:=1 END)   as rNum														")
			.query("         , (@val1:=m.acpt_numb) temp1																")
			.query("         , (@val2:=m.acpt_seqn) temp2																")
			.query("    FROM  work_book a																				")
			.query("        left outer join pror_mast m on a.wkod_numb = m.invc_numb									")
			.query("        ,(SELECT @val:='', @rownum:=0) SUB															")
			.query("   where m.acpt_numb is not null																	")
			.query("   order by m.acpt_numb , m.acpt_seqn , a.work_strt_dttm desc 										")
			.query(") a																									")
			.query("   left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd											")
			.query("   left outer join wkct_mast w on c.wkct_idcd = w.wkct_idcd											")
			.query("where rNum = 1																						")
			.query("order by acpt_numb , acpt_seqn , rNum																")
			.query(")																									")
			.query("select    a.invc_numb     , a.invc_date       , a.cvic_idcd   , a.mold_idcd							")
			.query("      , a.item_idcd       , a.dayn_dvcd       , a.good_qntt											")
			.query("      , DATE_FORMAT(a.work_endd_dttm,'%Y%m%d') as work_eddt											")
			.query("      , DATE_FORMAT(a.work_endd_dttm,'%H%i%s') as work_edtm											")
			.query("      , DATE_FORMAT(a.work_strt_dttm,'%Y%m%d') as work_stdt											")
			.query("      , DATE_FORMAT(a.work_strt_dttm,'%H%i%s') as work_sttm											")
			.query("      , if(a.need_time>0,case ifnull(l.totl_loss_time,0)											")
			.query("        when 0 then round((a.need_time/60),1)													")
			.query("        else round(((a.need_time - ifnull(l.totl_loss_time,0))/60),1) end,0)  as need_time		")
			.query("      , b.invc_amnt       , b.invc_qntt   , b.invc_pric												")
			.query("      , a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl							")
			.query("      , a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name							")
			.query("      , a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd							")
			.query("      , a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm							")
			.query("      , a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec							")
			.query("      , i.item_code       , c.cvic_name       , a.cavity      , a.cycl_time							")
			.query("      , case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs	")
			.query("      , m.mold_code																					")
			.query("      , case when ifnull(l.loss_time,0) > ifnull(q.poor_time,0) 									")
			.query("             then concat(ifnull(l.loss_text,''),',',ifnull(q.poor_text,'')) 						")
			.query("             when ifnull(l.loss_time,0) < ifnull(q.poor_time,0)										")
			.query("             then concat(ifnull(q.poor_text,''),',',ifnull(l.loss_text,'')) 						")
			.query("             else '' 																				")
			.query("             end as remk_text																		")
			.query("      , a.indn_qntt       , b.invc_numb as acpt_numb												")
			.query("      , b.cstm_lott_numb  , b.deli_date       , b.sply_amnt   , a.prod_qntt							")
			.query("      , q.poor_qntt       , wc.wkct_name															")
			.query("      , (select base_name from base_mast r where a.mtrl_bacd  = r.base_code							")
			.query("                                           and   r.prnt_idcd = '3101')   as mtrl_name				")
			.query("      , (a.indn_qntt - ing.prod_qntt) as deff_qntt													")
			.query("      , a.theo_qntt																					")
			.query("      , (TRUNCATE(a.prod_qntt / a.theo_qntt,4))*100 as good_perc									")
			.query("      , TRUNCATE(a.prod_qntt * b.invc_pric,0) as total												")
			.query("      , u.user_name as wker_name   																	")
			.query("              , (ifnull(a.prod_qntt,0) +															")
			.query("                 ifnull((select sum(r.prod_qntt) 													")
			.query("                        from work_book r															")
			.query("                        where a.work_strt_dttm > r.work_strt_dttm									")
			.query("                        and    a.wkod_numb = r.wkod_numb											")
			.query("                        and    r.prog_stat_dvcd != 1												")
			.query("                        group by r.wkod_numb),0)													")
			.query("                ) as acum_qntt									 									")
			.query("      , (ifnull(a.theo_qntt,0) - ifnull(a.prod_qntt,0)) as loss_qntt								")
			.query("     , REPLACE(json_extract(a.json_data, '$.mold_repa'),'\"','') as mold_repa						")
			.query("     , a.wkod_numb        , a.wkod_seqn           , a.prog_stat_dvcd								")
			.query("     , u2.user_name as cvic_drtr_name             ,date_format(work_strt_dttm,'%Y%m%d') as prod_date")
			.query("from work_book a																					")
			.query("left outer join loss      l on a.invc_numb   = l.invc_numb											")
			.query("left outer join ing       ing on a.invc_numb = ing.invc_numb										")
			.query("left outer join poor      q on a.invc_numb   = q.invc_numb											")
			.query("left outer join wc        wc on a.invc_numb  = wc.invc_numb											")
			.query("left outer join pror_mast p on a.wkod_numb   = p.invc_numb											")
			.query("left outer join acpt_item b on p.acpt_numb   = b.invc_numb and p.acpt_seqn = b.line_seqn			")
			.query("left outer join item_mast i on a.item_idcd   = i.item_idcd											")
			.query("left outer join cvic_mast c on a.cvic_idcd   = c.cvic_idcd											")
			.query("left outer join mold_mast m on a.mold_idcd   = m.mold_idcd											")
			.query("left outer join user_mast u on a.wker_idcd   = u.user_idcd											")
			.query("left outer join user_mast u2 on a.cvic_drtr_idcd   = u2.user_idcd									")
			.query("where 1=1																							")
			.query("and     a.prog_stat_dvcd not in (1)																	")
			.query("and     (a.work_endd_dttm is not null and a.work_endd_dttm <> ' ')									")
			.query("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.query("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.query("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.query("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
			.query("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.query("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
			.query("and     a.mold_idcd  = :mold_idcd"      , arg.getParameter("mold_idcd"))
			.query("and     b.cstm_lott_numb	like %:cstm_lott_numb%  ", arg.getParameter("cstm_lott_numb"))
			.query("order by a.invc_date desc,a.cvic_idcd,a.dayn_dvcd desc, a.work_strt_dttm desc						")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//불량조회
	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
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
			.where("      , a.good_qntt   , a.poor_qntt    , a.poor_proc_dvcd  , a.crte_dttm		")
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

	//유실조회
	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
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
			.where("      , a.crte_dttm																")
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
	public SqlResultMap setModify(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		if(arg.getParamText("prog_stat_dvcd").equals("3") || arg.getParamText("prog_stat_dvcd").equals("4")){
			data.param // 집계문  입력
				.table("pror_item										")
				.where("where invc_numb = :invc_numb					")
				.where("and   line_seqn = :line_seqn					")

				.unique("invc_numb"			, arg.fixParameter("wkod_numb"))
				.unique("line_seqn"			, arg.fixParameter("wkod_seqn"))

				.update("work_endd_dttm"	, arg.getParameter("work_endd_dttm"))
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
				.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		data.param // 집계문  입력
			.table("work_book										")
			.where("where invc_numb = :invc_numb					")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

			.update("invc_date"			, arg.getParameter("invc_date"))
			.update("work_strt_dttm"	, arg.getParameter("work_strt_dttm"))
			.update("work_endd_dttm"	, arg.getParameter("work_endd_dttm"))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		data.param
			.query("call work_theo_qntt_create( :invc_numb )",arg.fixParameter("invc_numb"))
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}
	public SqlResultMap setRemkModify(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.table("work_book										")
			.where("where invc_numb = :invc_numb					")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"))

			.update("user_memo"			, arg.getParameter("user_memo"))
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일시 */
			.update("updt_idcd"			, arg.getParameter("updt_idcd")) /* 수정ID */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
		data.param
			.query("call work_theo_qntt_create( :invc_numb )",arg.getParameter("invc_numb"))
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}
}
