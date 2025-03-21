package com.sky.system.custom.sjflv.stock.isos.hdlidlvymast;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class HdliDlvyMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param
			.query("select a.invc_numb      , a.invc_date     	, a.dlvy_dinv_numb	, a.dlvy_rcpt_hmlf		")
			.query("     , a.dlvy_zpcd		, a.dlvy_addr_1fst	, a.dlvy_addr_2snd  , a.dlvy_tele_numb		")
			.query("     , a.dlvy_hdph_numb , a.dlvy_qntt       , a.dlvy_exps		, a.dlvy_date			")
			.query("     , a.dlvy_brch_name , a.dlvy_memo       , a.hdli_dinv_qntt							")
			.query("     , a.user_memo																		")
		;
		data.param //퀴리문
			.where("from   hdli_dlvy_mast a																	")
			.where("where  1 = 1																			")
			.where("and    a.find_name	like %:find_name%			" , arg.getParamText("find_name"		))
			.where("and    a.invc_date >= :invc_date1				" , arg.getParamText("invc_date1"		))
			.where("and    a.invc_date <= :invc_date2				" , arg.getParamText("invc_date2"		))
			.where("and    a.dlvy_dinv_numb like %:dlvy_dinv_numb%  " , arg.getParamText("dlvy_dinv_numb"   ))
			.where("and    a.dlvy_rcpt_hmlf like %:dlvy_rcpt_hmlf%  " , arg.getParamText("dlvy_rcpt_hmlf"   ))
			.where("and    a.dlvy_brch_name like %:dlvy_brch_name%  " , arg.getParamText("dlvy_brch_name"   ))
			.where("and    a.invc_regi_yorn != '1'															")
			.where("order by a.invc_numb desc																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}