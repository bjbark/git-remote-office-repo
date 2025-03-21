package com.sky.system.sale.project.prjtchangelist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class PrjtChangeListService extends DefaultServiceHandler {

	public SqlResultMap getLister(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
			;
		data.param
			.query("select    a.pjod_idcd        , a.line_seqn       , a.chge_resn        , a.cpst_dvcd			")
			.query("        , a.regi_date as change_regi_date        , a.item_idcd as change_item_idcd			")
			.query("        , a.cofm_yorn        , a.cofm_date       , a.cofm_amnt        , a.crny_dvcd			")
			.query("        , a.chge_deli_date   , a.frst_exam_date  , a.send_exam_date   , a.apvl_date as change_apvl_date	")
			.query("        , a.apvl_drtr_idcd   , a.item_imge       , a.stat_date								")
			.query("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif													")
			.query("        , i1.item_code as change_item_code       , i1.item_name as change_item_name			")
			.query("        , i1.item_spec as change_item_spec       , i1.modl_name as change_modl_name			")
			.query("        , u1.user_name as apvl_drtr_name													")
			.query("        , p.amnd_degr        , p.pjod_dvcd													")
			.query("        , p.expt_dvcd        , p.cstm_idcd       , p.prjt_idcd        , p.regi_date			")
			.query("        , p.item_idcd        , p.esti_amnt       , p.cofm_yorn        , p.cofm_date			")
			.query("        , p.cofm_amnt        , p.crny_dvcd													")
			.query("        , p.deli_date        , p.ppsl_deli_date  , p.strt_date        , p.endd_date			")
			.query("        , p.drtr_idcd        , p.dlvy_date       , p.last_yorn        , p.apvl_date			")
			.query("        , p.cstm_item_code   , p.mold_size       , p.cavity									")
			.query("        , p.mold_wigt        , p.used_mtrl_name  , p.prod_wigt        , p.used_tons			")
			.query("        , p.pjod_name        , p.shkg_text       , p.cstm_item_code							")
			.query("        , c.cstm_code        , c.cstm_name       , u2.user_name as drtr_name				")
			.query("        , i2.item_code       , i2.item_spec      , i2.modl_name								")
			.query("        , c.buss_name        , c.buss_numb       , c.buss_kind        , c.buss_type			")
			.query("        , c.corp_dvcd        , c.boss_name       , c.tele_numb        , c.faxi_numb			")
			.query("        , c.mail_addr        , c.hdph_numb       , i2.item_code       , i2.item_name		")
		;
		data.param
			.where("from pjod_dsig_chge a																		")
			.where("left outer join pjod_mast p  on a.pjod_idcd      = p.pjod_idcd								")
			.where("left outer join cstm_mast c  on p.cstm_idcd      = c.cstm_idcd								")
			.where("left outer join item_mast i1 on a.item_idcd      = i1.item_idcd								")
			.where("left outer join item_mast i2 on p.item_idcd      = i2.item_idcd								")
			.where("left outer join user_mast u1 on a.apvl_drtr_idcd = u1.user_idcd							")
			.where("left outer join user_mast u2 on p.drtr_idcd = u2.user_idcd									")
			.where("where   1=1																					")
			.where("and     p.find_name like %:find_name%            " , arg.getParamText("find_name"           ))
			.where("and     a.regi_date >= :regi_date1               " , arg.getParamText("regi_date1"          ))
			.where("and     a.regi_date <= :regi_date2               " , arg.getParamText("regi_date2"          ))
			.where("and     p.cstm_idcd  = :cstm_idcd                " , arg.getParamText("cstm_idcd"           ))
			.where("and     p.line_clos  = :line_clos                " , arg.getParamText("line_clos"           ))
			.where("and     a.chge_deli_date >= :deli_date1          " , arg.getParamText("deli_date1"          ))
			.where("and     a.chge_deli_date <= :deli_date2          " , arg.getParamText("deli_date2"          ))
			.where("and     a.pjod_idcd  = :pjod_idcd                " , arg.getParamText("pjod_idcd"           ))
			.where("and     a.apvl_drtr_idcd  = :drtr_idcd           " , arg.getParamText("drtr_idcd"           ))
			.where("and     p.expt_dvcd  = :expt_dvcd                " , arg.getParamText("expt_dvcd"           ))
			.where("and     p.cstm_item_code like %:cstm_item_code%  " , arg.getParamText("cstm_item_code"      ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat"     )))
			.where("order by a.pjod_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
