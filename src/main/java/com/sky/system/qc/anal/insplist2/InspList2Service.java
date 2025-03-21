package com.sky.system.qc.anal.insplist2;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class InspList2Service extends DefaultServiceHandler{

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception{
		DataMessage data = arg.newStorage("POS");

		data.param
		.query("select	a.invc_numb      , a.invc_date      , a.line_seqn		, a.poor_bacd , a.sttm,b.wkct_idcd		")
		.query("      , a.edtm           , a.wker_idcd      , a.poor_qntt		, w.wkct_name       					")
		.query("      , p.acpt_numb      , cs.cstm_name     , i.modl_name		,a.poor_proc_dvcd						")
		.query("      , c.indn_qntt      , u.user_name		, cp.poor_name as poor_name								")
		.query("      , b.prod_qntt      																			")
		.query("      , a.line_stat      , a.line_clos      , a.find_name											")
		.query("      , i.item_code      , i.item_name      , i.item_spec											")
		.where("from work_book_qc a 																				")
		.where("left outer join work_book b			on b.invc_numb  = a.invc_numb									")
		.where("left outer join pror_item c    		on a.invc_numb  = b.wkod_numb and c.line_seqn = b.wkod_seqn		")
		.where("left outer join pror_mast p    		on c.invc_numb  = p.invc_numb									")
		.where("left outer join wkct_mast w    		on w.wkct_idcd  = b.wkct_idcd									")
		.where("left outer join user_mast u  		on a.wker_idcd  = u.user_idcd									")
		.where("left outer join item_mast i    		on c.item_idcd  = i.item_idcd									")
		.where("left outer join cnvt_poor_code cp 	on cp.poor_code=a.poor_bacd										")
		.where("left outer join cstm_mast cs  		on cs.cstm_idcd = c.cstm_idcd									")
		.where("left outer join cvic_mast cv   		on cv.cvic_idcd = c.cvic_idcd									")

		.where("where  1=1																							")
		.where("and    a.invc_numb       = :invc_numb       " , arg.getParamText("invc_numb"))
		.where("and    a.invc_date between :invc1_date		" , arg.getParamText("invc1_date" ))
		.where("                   and     :invc2_date		" , arg.getParamText("invc2_date" ))
		.where("and    a.wker_idcd         = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
		.where("and    b.wkct_idcd         = :wkct_idcd		" , arg.getParamText("wkct_idcd" ))
		.where("and    a.poor_proc_dvcd    = :poor_proc_dvcd" , arg.getParamText("poor_proc_dvcd" ))
		.where("and    a.find_name   like %:find_name%		" , arg.getParamText("find_name") )
		.where("and    a.wker_idcd         = :wker_idcd 		" , arg.getParamText("wker_idcd") )
		.where("and    a.line_clos         = :line_clos		" , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos" )) )
		.where("and    a.line_stat         < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )) )
		.where("order by a.invc_date desc 																								")
		;

		return data.selectForMap();
	}

	public SqlResultMap getLister2(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.invc_numb, u.user_name as user_name, sum(a.poor_qntt) as poor_qntt , a.wker_idcd			")
			.query("		, a. invc_date																				")
		;
		data.param
			.where("from  work_book_qc	a																				")
			.where("left outer join user_mast u on u.user_idcd = a.wker_idcd											")
			.where("where 1=1																							")
			.where("and   a.invc_date >= :invc1_date ", arg.getParameter("invc1_date"))
			.where("and   a.invc_date <= :invc2_date ", arg.getParameter("invc2_date"))
			.where("and   u.user_name = :user_name ", arg.getParameter("user_name"))
			.where("and   u.find_name like %:find_name% ", arg.getParameter("find_name"))
			.where("group by a.wker_idcd												")
		;


	return data.selectForMap();

	}

	public SqlResultMap getLister3(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select 	a.invc_numb, w.wkct_idcd, sum(a.poor_qntt) as poor_qntt ,wm.wkct_name						")
		;
		data.param
			.where("from  work_book_qc	a																				")
			.where("left outer join work_book w on a.invc_numb=w.invc_numb											")
			.where("left outer join wkct_mast wm on w.wkct_idcd=wm.wkct_idcd											")
			.where("where 1=1																							")
			.where("and   a.invc_date >= :invc1_date ", arg.getParameter("invc1_date"))
			.where("and   a.invc_date <= :invc2_date ", arg.getParameter("invc2_date"))
			.where("and   u.find_name like %:find_name% ", arg.getParameter("find_name"))
			.where("group by w.wkct_idcd												")
		;


	return data.selectForMap();

	}

	public SqlResultMap getLister4(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select sum(a.poor_qntt) as poor_qntt ,wm.wkct_name,a.poor_bacd, cp.poor_name			")
			.query("		, a. invc_date																				")
		;
		data.param
			.where("from  work_book_qc	a																				")
			.where("left outer join work_book w on a.invc_numb=w.invc_numb											")
			.where("left outer join user_mast u on u.user_idcd = a.wker_idcd											")
			.where("left outer join wkct_mast wm on w.wkct_idcd=wm.wkct_idcd											")
			.where("left outer join cnvt_poor_code cp on cp.poor_code=a.poor_bacd											")
			.where("where 1=1																							")
			.where("and   a.invc_date >= :invc1_date ", arg.getParameter("invc1_date"))
			.where("and   a.invc_date <= :invc2_date ", arg.getParameter("invc2_date"))
			.where("and   u.user_name = :user_name ", arg.getParameter("user_name"))
			.where("and   u.find_name like %:find_name% ", arg.getParameter("find_name"))
			.where("group by cp.poor_name												")
		;


	return data.selectForMap();

	}
}
