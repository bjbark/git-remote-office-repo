package com.sky.system.prod.order.workbook;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class WorkBookService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.cvic_idcd   , a.mold_idcd				")
			.query("		, a.item_idcd       , a.dayn_dvcd       , a.poor_qntt   , a.wkct_idcd				")
			.query("		, a.theo_qntt       , b.invc_qntt       , b.invc_pric								")
			.query("		, date_format(ifnull(a.work_strt_dttm,0), '%Y-%m-%d %H:%i') as work_strt_dttm		")
			.query("		, date_format(ifnull(a.work_endd_dttm,0), '%Y-%m-%d %H:%i') as work_endd_dttm		")
			.query("		, a.ostt_qntt       , a.stok_qntt       , a.succ_qntt   , p.indn_qntt				")
			.query("		, a.prod_qntt       , b.invc_amnt													")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec				")
			.query("		, i.item_code       , c.cvic_name       , m.cavity      , m.cycl_time				")
			.query("		, w.wkct_name       , bz.bzpl_name	    , dp.dept_name	, a.lott_numb				")
			.query("		, cs.cstm_name      , wf.wkfw_name      , m.mold_name								")
			.query("		, a.prog_stat_dvcd  , a.work_para       , a.last_wkct_yorn, a.wkct_insp_yorn		")
			.query("		, a.work_dvcd       , a.stun_prod_qntt  , a.stun_good_qntt, a.stun_poor_qntt		")
			.query("		, a.wker_idcd       , us.user_name as wker_name										")
			.query("		, a.rewd_objt_qntt  , a.mtrl_ivst_yorn  , a.wkod_numb   , a.wkod_seqn				")
			.query("		, a.work_cond_1fst  , a.work_cond_2snd  , a.work_cond_3trd							")
			.query("		, a.work_cond_5fit  , a.work_cond_6six  , a.work_cond_7svn							")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs	")
			.query("		, (case 																			")
			.query("		   when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간') = 0		")
			.query("		   then  (case when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i') <= 0 then '0분'")
			.query("		               else time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i분') end)	")
			.query("		   else TIME_FORMAT(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간 %i분')		")
			.query("		   end ) as need_time																")
			.query("		, ( ifnull(a.prod_qntt,0)- ifnull(z.poor_qntt,0))as good_qntt						")
		;
		data.param //퀴리문
			.where("from work_book a																			")
			.where("left outer join bzpl_mast bz on a.bzpl_idcd = bz.bzpl_idcd									")
			.where("left outer join pror_mast p on a.wkod_numb = p.invc_numb									")
			.where("left outer join acpt_item b on p.acpt_numb = b.invc_numb and p.acpt_seqn = b.line_seqn		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join dept_mast dp on a.prod_dept_idcd = dp.dept_idcd								")
			.where("left outer join cstm_mast cs on a.cstm_idcd = cs.cstm_idcd									")
			.where("left outer join wkfw_clss wf on a.wkfw_idcd = wf.wkfw_idcd									")
			.where("left outer join user_mast us on a.wker_idcd = us.user_idcd									")
			.where("left outer join (select invc_numb, sum(poor_qntt) as poor_qntt								")
			.where("                 from work_book_qc															")
			.where("                 group by invc_numb )as  z on z.invc_numb = a.invc_numb						")
			.where("where 1=1																					")
			.where("and     a.prog_stat_dvcd > '1'																")
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
			.where("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.where("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
			.where("and     a.wkct_idcd  = :wkct_idcd"      , arg.getParameter("wkct_idcd"))
			.where("and     a.lott_numb	like %:lott_numb% " , arg.getParamText("lott_numb"))
			.where("and     a.line_stat  > :line_stat"      , arg.getParameter("line_stat"))
			.where("order by a.invc_date desc, a.invc_numb desc")
			;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getMans(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.line_seqn       , a.invc_date   , a.work_pcnt_dvcd			")
			.query("		, a.work_pcnt   , a.need_time														")
			.query("		, a.work_mnhr       , a.drtr_idcd       , a.remk_text   , a.uper_seqn				")
			.query("		, a.disp_seqn																		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif													")
			.query("		, u.user_name as drtr_name															")
			.query("		, (case when time_format(timediff(z.work_edtm,z.work_sttm), '%k시간') = 0				")
			.query("		   then  (case when time_format(timediff(z.work_edtm,z.work_sttm), '%i') <= 0 then '0분'")
			.query("		   else time_format(timediff(z.work_edtm,z.work_sttm), '%i분') end)						")
			.query("		   else time_format(timediff(z.work_edtm,z.work_sttm), '%k시간 %i분')						")
			.query("		   end ) as need_time																	")
			.query("		, z.work_sttm       , z.work_edtm													")
		;
		data.param //퀴리문
			.where("from work_book_mans a																		")
			.where("left outer join work_book b on a.invc_numb = b.invc_numb									")
			.where("left outer join ( select date_format(ifnull(concat(substring(a.crte_dttm,1,8),a.work_sttm),0), '%Y-%m-%d %H:%i') as work_sttm				")
			.where("                    , date_format(ifnull(concat(substring(a.updt_dttm,1,8),a.work_edtm),0), '%Y-%m-%d %H:%i') as work_edtm					")
			.where("                    , a.invc_numb , a.line_seqn																								")
			.where("                  from work_book_mans a																										")
			.where("                  left outer join work_book b on a.invc_numb = b.invc_numb ) as z on z.invc_numb = a.invc_numb and z.line_seqn = a.line_seqn")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where 1=1																					")
			.where("and     a.invc_numb  = :invc_numb"      , arg.getParameter("invc_numb"))
			.where("and     a.line_stat  > :line_stat"      , arg.getParameter("line_stat"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getQc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.invc_numb       , a.line_seqn       , a.invc_date   , a.poor_bacd				")
		.query("		, a.sttm            , a.edtm            , a.wker_idcd   , a.occr_qntt				")
		.query("		, a.good_qntt       , a.poor_qntt       , a.poor_proc_dvcd							")
		.query("		, a.remk_text       , a.uper_seqn       , a.disp_seqn								")
		.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
		.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
		.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
		.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
		.query("		, a.crte_idcd       , a.crte_urif													")
		.query("		, u.user_name as drtr_name															")
		.query("        , (select base_name  from base_mast r where a.poor_bacd  = r.base_code				")
		.query("                                           and   r.prnt_idcd = '6000') as poor_bacd_name	")
		;
		data.param //퀴리문
		.where("from work_book_qc a																			")
		.where("left outer join user_mast u on a.wker_idcd = u.user_idcd									")
		.where("where 1=1																					")
		.where("and     a.invc_numb  = :invc_numb"      , arg.getParameter("invc_numb"))
		.where("and     a.line_stat = :line_stat"       , arg.getParameter("line_stat"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getLoss(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.invc_numb       , a.line_seqn       , a.invc_date   , a.loss_resn_dvcd			")
		.query("		, b.sttm            , b.edtm            , date_format(timediff(b.edtm,b.sttm), '%H:%i') as loss_time")
		.query("		, a.loss_pcnt																		")
		.query("		, a.remk_text       , a.uper_seqn       , a.disp_seqn   , a.runn_dsct_yorn			")
		.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
		.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
		.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
		.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
		.query("		, a.crte_idcd       , a.crte_urif													")
		.query("		, (select base_name from base_mast r where a.loss_resn_dvcd  = r.base_code			")
		.query("		           and   r.prnt_idcd = '6100')   as loss_name								")
		;
		data.param //퀴리문
		.where("from work_book_loss a																		")
		.where("left outer join ( select (date_format(ifnull(concat(substring(a.crte_dttm,1,8),a.sttm),0),'%Y-%m-%d %H:%i')) as sttm")
		.where("                        ,(date_format(ifnull(concat(substring(a.updt_dttm,1,8),a.edtm),0),'%Y-%m-%d %H:%i')) as edtm")
		.where("                        , a.invc_numb , a.line_seqn																	")
		.where("                 from work_book_loss a																				")
		.where("                 where a.invc_numb  = :invc_numb2 ) b on a.invc_numb  = b.invc_numb and a.line_seqn = b.line_seqn", arg.getParameter("invc_numb"))
		.where("where 1=1																					")
		.where("and     a.invc_numb  = :invc_numb"       , arg.getParameter("invc_numb"))
		.where("and     a.line_stat  = :line_stat"       , arg.getParameter("line_stat"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getMtrl(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.invc_numb       , a.line_seqn       , a.item_idcd        , a.unit_idcd			")
		.query("		, a.need_qntt       , a.ivst_qntt       , a.stnd_unit_qntt   , a.lott_numb			")
		.query("		, a.lott_mngt_yorn  , a.remk_text       , a.uper_seqn   , a.disp_seqn				")
		.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
		.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
		.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
		.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
		.query("		, a.crte_idcd       , a.crte_urif													")
		.query("		, u.unit_name       , i.item_name													")
		;
		data.param //퀴리문
		.where("from work_book_mtrl a																		")
		.where("left outer join unit_mast u on u.unit_idcd = a.unit_idcd									")
		.where("left outer join item_mast i on i.item_idcd = a.item_idcd									")
		.where("where 1=1																					")
		.where("and     a.invc_numb  = :invc_numb"       , arg.getParameter("invc_numb"))
		.where("and     a.line_stat  = :line_stat"       , arg.getParameter("line_stat"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
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

		return null;
	}

	public SqlResultMap getWkct(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select    a.invc_numb       , a.insp_type_idcd  , a.line_seqn				")
		.query("		, a.wkct_idcd       , a.frst_msmt       , a.frst_msmt_2hr			")
		.query("		, ic.insp_sbsc_name , ic.remk_text      , a.invc_date				")
		;
		data.param //퀴리문
		.where("from work_book_cast a																		")
		.where("left outer join insp_cond ic on a.insp_type_idcd = ic.insp_type_idcd and a.line_seqn = ic.line_seqn	")
		.where("where 1=1																					")
		.where("and     a.invc_numb  = :wkod_numb"       , arg.getParameter("wkod_numb"))
		.where("and     a.wkct_idcd  = :wkct_idcd"       , arg.getParameter("wkct_idcd"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
