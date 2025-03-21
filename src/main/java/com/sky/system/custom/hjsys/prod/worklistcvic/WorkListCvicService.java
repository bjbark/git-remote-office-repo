package com.sky.system.custom.hjsys.prod.worklistcvic;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;



@Service("hjsys.WorkListCvicService")
public class WorkListCvicService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.invc_numb       , a.invc_date       , a.mold_idcd								")
			.query("		, a.item_idcd       , a.poor_qntt       , a.good_qntt								")
			.query("		, a.theo_qntt       , b.invc_qntt       , b.invc_pric								")
			.query("		, concat(substring(a.work_strt_dttm,1,4),'-',substring(a.work_strt_dttm,5,2),'-',substring(a.work_strt_dttm,7,2),' '")
			.query("		, substring(a.work_strt_dttm,9,2),':',substring(a.work_strt_dttm,11,2)) as work_strt_dttm")
//			.query("		, concat(substring(a.work_endd_dttm,1,4),'-',substring(a.work_endd_dttm,5,2),'-',substring(a.work_endd_dttm,7,2),' '")
//			.query("		, substring(a.work_endd_dttm,9,2),':',substring(a.work_endd_dttm,11,2)) as work_endd_dttm")
			.query("		, date_format(date_add(str_to_date(work_strt_dttm,'%Y%m%d%H%i%S') ,					")
			.query("			INTERVAL  cast(a.indn_qntt * 12.5 as int)  minute), '%Y-%m-%d %H:%i')  as work_endd_dttm")
			.query("		, a.ostt_qntt       , a.stok_qntt       , a.succ_qntt   , a.indn_qntt				")
			.query("		, a.prod_qntt       , b.invc_amnt       , mt.drwg_numb								")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd   , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos   , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm   , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad   , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , i.item_name   , i.item_spec				")
			.query("		, i.item_code       , m.cavity      , m.cycl_time									")
			.query("		, w.wkct_name       , bz.bzpl_name	    , dp.dept_name	, a.lott_numb				")
			.query("		, cs.cstm_name      , wf.wkfw_name      , m.mold_name								")
			.query("		, a.prog_stat_dvcd  , a.work_para       , a.last_wkct_yorn, a.wkct_insp_yorn		")
			.query("		, a.work_dvcd       , a.stun_prod_qntt  , a.stun_good_qntt, a.stun_poor_qntt		")
			.query("		, a.wker_idcd       , us.user_name as wker_name										")
			.query("		, a.rewd_objt_qntt  , a.mtrl_ivst_yorn  , a.wkod_numb   , a.wkod_seqn				")
			.query("		, ac.acpt_case_name as modl_name  , ac.invc_numb as acpt_numb						")
			.query("		, case ifnull(a.theo_qntt,0) when 0 then null else ifnull(a.good_qntt,0) / ifnull(a.theo_qntt,0) * 100 end as good_prgs	")
			.query("		, cast(a.indn_qntt * 12.5 as int) as need_time										")
//			.query("		, (case 																			")
//			.query("		   when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간') = 0		")
//			.query("		   then  (case when time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i') <= 0 then '0분'")
//			.query("		               else time_format(timediff(a.work_endd_dttm,a.work_strt_dttm), '%i분') end)	")
//			.query("		   else TIME_FORMAT(timediff(a.work_endd_dttm,a.work_strt_dttm), '%k시간 %i분')		")
//			.query("		   end ) as need_time																")
			.query("		, case when (substring(a.work_strt_dttm,9,4)) between 0830 and 2029 then 1 else 2 end as dayn_dvcd 	")
		;
		data.param //퀴리문
			.where("from work_book a																			")
			.where("left outer join bzpl_mast bz on a.bzpl_idcd = bz.bzpl_idcd									")
			.where("left outer join pror_mast p on a.wkod_numb = p.invc_numb									")
			.where("left outer join acpt_item b on p.acpt_numb = b.invc_numb and p.acpt_seqn = b.line_seqn		")
			.where("left outer join acpt_mast ac on p.acpt_numb = ac.invc_numb									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join dept_mast dp on a.prod_dept_idcd = dp.dept_idcd								")
			.where("left outer join cstm_mast cs on a.cstm_idcd = cs.cstm_idcd									")
			.where("left outer join wkfw_clss wf on a.wkfw_idcd = wf.wkfw_idcd									")
			.where("left outer join user_mast us on a.wker_idcd = us.user_idcd									")
			.where("left outer join (select invc_numb, sum(poor_qntt) as poor_qntt								")
			.where("                 from work_book_qc															")
			.where("                 group by invc_numb )as  z on z.invc_numb = a.invc_numb						")
			.where("left outer join mtrl_need mt on mt.invc_numb = p.acpt_numb and mt.acpt_seqn = p.acpt_seqn and mt.item_idcd = p.item_idcd")
			.where("where 1=1																					")
			.where("and     a.wkct_idcd in ('008','009')														")
			.where("and     a.prog_stat_dvcd > '1'																")
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.invc_date  < date_format(now(),'%Y%m%d')")
			.where("and     a.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.dayn_dvcd   = :dayn_dvcd    " , arg.getParamText("dayn_dvcd" ) , !"".equals(arg.getParamText("dayn_dvcd")))
			.where("and     a.item_idcd  = :item_idcd"      , arg.getParameter("item_idcd"))
			.where("and     a.cvic_idcd  = :cvic_idcd"      , arg.getParameter("cvic_idcd"))
			.where("and     a.wkct_idcd  = :wkct_idcd"      , arg.getParameter("wkct_idcd"))
			.where("and     a.lott_numb	like %:lott_numb% " , arg.getParamText("lott_numb"))
			.where("and     a.line_stat  > :line_stat"      , arg.getParameter("line_stat"))
			.where("order by a.invc_date desc")
			;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
