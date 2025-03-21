package com.sky.system.custom.sjflv.sale.etc.smplhistorybook;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class SmplHistoryBookService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 														")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select  a.item_idcd      , a.item_name       , a.item_spec       , i.item_code			")
			.where("      , sum(a.reqt_qntt) as reqt_qntt													")
			.where("from    smpl_mast a																		")
			.where("        left outer join bzpl_mast b on a.bzpl_idcd = b.bzpl_idcd						")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd						")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd						")
			.where("where   1=1																				")
			.where("   and a.find_name like %:find_name%			" , arg.getParamText("find_name" ))
			.where("   and a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))		//사업장
			.where("   and a.cstm_idcd   = :cstm_idcd				" , arg.getParamText("cstm_idcd" ))	//접수일자
			.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.item_idcd																	")
			.where(") a																						")
			.where(" order by a.item_code																	")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 																				")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("select  a.invc_numb      , a.invc_date       , a.amnd_degr       , a.drtr_idcd									")
			.where("      , a.bzpl_idcd      , a.cstm_name       , a.smpl_usge_dvcd  , a.cstm_drtr_name  , a.post_code				")
			.where("      , a.addr_1fst      , a.addr_2snd       , a.tele_numb       , a.reqt_memo       , a.regi_item_yorn			")
			.where("      , a.item_idcd      , a.item_name       , a.item_spec       , a.reqt_qntt       , a.cstm_idcd				")
			.where("      , a.reqt_unit      , a.npay_yorn       , a.sply_amnt       , a.vatx_amnt       , a.ttsm_amnt				")
			.where("      , a.deli_date      , a.ostt_schd_date  , a.prod_date       , a.prod_drtr_idcd  , a.prod_qntt				")
			.where("      , a.prod_unit      , a.ostt_date       , a.ostt_drtr_idcd  , a.ostt_qntt       , a.ostt_unit				")
			.where("      , a.smpl_stat_dvcd , CONVERT(item_memo USING utf8) as item_memo											")
			.where("      , a.user_memo      , a.sysm_memo       , a.prnt_idcd       , a.line_levl									")
			.where("      , a.line_ordr      , a.line_stat       , a.line_clos       , a.find_name       , a.updt_user_name			")
			.where("      , a.updt_ipad      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name			")
			.where("      , a.crte_ipad      , a.crte_dttm       , a.crte_idcd       , a.crte_urif       , b.bzpl_name				")
			.where("      , u1.user_name as drtr_name            , c.cstm_code       , i.item_code       , a.labr_drtr_idcd			")
			.where("      , u2.user_name as prod_drtr_name       , u3.user_name as ostt_drtr_name									")
			.where("      , u4.user_name as labr_drtr_name																			")
			.where("      , a.ostt_amnt      , a.ostt_vatx       , a.ostt_smam														")
			.where("from    smpl_mast a																								")
			.where("        left outer join bzpl_mast b on a.bzpl_idcd = b.bzpl_idcd												")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd												")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("        left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd												")
			.where("        left outer join user_mast u2 on a.prod_drtr_idcd = u2.user_idcd											")
			.where("        left outer join user_mast u3 on a.ostt_drtr_idcd = u3.user_idcd											")
			.where("        left outer join user_mast u4 on a.labr_drtr_idcd = u4.user_idcd											")
			.where("where   1=1																										")
			.where("   and a.ostt_date is not null																					")
			.where("   and a.item_idcd   = :item_idcd				" , arg.getParamText("item_idcd" ))
			.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																												")
			.where(" order by a.invc_date desc																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 																				")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("select  a.invc_numb      , a.invc_date       , a.amnd_degr       , a.drtr_idcd									")
			.where("      , a.bzpl_idcd      , a.cstm_name       , a.smpl_usge_dvcd  , a.cstm_drtr_name  , a.post_code				")
			.where("      , a.addr_1fst      , a.addr_2snd       , a.tele_numb       , a.reqt_memo       , a.regi_item_yorn			")
			.where("      , a.item_idcd      , a.item_name       , a.item_spec       , a.reqt_qntt       , a.cstm_idcd				")
			.where("      , a.reqt_unit      , a.npay_yorn       , a.sply_amnt       , a.vatx_amnt       , a.ttsm_amnt				")
			.where("      , a.deli_date      , a.ostt_schd_date  , a.prod_date       , a.prod_drtr_idcd  , a.prod_qntt				")
			.where("      , a.prod_unit      , a.ostt_date       , a.ostt_drtr_idcd  , a.ostt_qntt       , a.ostt_unit				")
			.where("      , a.smpl_stat_dvcd , CONVERT(item_memo USING utf8) as item_memo											")
			.where("      , a.user_memo      , a.sysm_memo       , a.prnt_idcd       , a.line_levl									")
			.where("      , a.line_ordr      , a.line_stat       , a.line_clos       , a.find_name       , a.updt_user_name			")
			.where("      , a.updt_ipad      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name			")
			.where("      , a.crte_ipad      , a.crte_dttm       , a.crte_idcd       , a.crte_urif       , b.bzpl_name				")
			.where("      , u1.user_name as drtr_name            , c.cstm_code       , i.item_code       , a.labr_drtr_idcd			")
			.where("      , u2.user_name as prod_drtr_name       , u3.user_name as ostt_drtr_name									")
			.where("      , u4.user_name as labr_drtr_name																			")
			.where("      , a.ostt_amnt      , a.ostt_vatx       , a.ostt_smam														")
			.where("      , concat(a.addr_1fst,' ',a.addr_2snd) as addr 															")
			.where("from    smpl_mast a																								")
			.where("        left outer join bzpl_mast b on a.bzpl_idcd = b.bzpl_idcd												")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd												")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("        left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd												")
			.where("        left outer join user_mast u2 on a.prod_drtr_idcd = u2.user_idcd											")
			.where("        left outer join user_mast u3 on a.ostt_drtr_idcd = u3.user_idcd											")
			.where("        left outer join user_mast u4 on a.labr_drtr_idcd = u4.user_idcd											")
			.where("where   1=1																										")
			.where("   and a.ostt_date is not null																					")
			.where("   and a.invc_numb   = :invc_numb				" , arg.getParamText("invc_numb" ))
			.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																												")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

}
