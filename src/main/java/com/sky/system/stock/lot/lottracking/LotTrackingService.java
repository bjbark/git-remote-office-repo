package com.sky.system.stock.lot.lottracking;

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
public class LotTrackingService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getIsos(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.isos_dvcd   , a.invc_date   , a.wrhs_idcd   , a.item_idcd		")
			.query("       , a.lott_numb   , a.user_memo   , a.sysm_memo   , a.find_name		")
			.query("       , a.full_invc_numb              , a.isos_evi    , w.wrhs_name		")
			.query("       , i.item_name   , i.item_spec										")
			.query("       , i.modl_name   , u.unit_name   , i.item_code   , i.acct_bacd		")
			.query("       , (select base_name from base_mast r where i.acct_bacd  = r.base_code")
			.query("                             and   r.prnt_idcd = '1102')   as acct_bacd_name")
			.query("       , if( a.istt_qntt is not null,a.istt_qntt,a.ostt_qntt) as qntt		")
		;
		data.param
			.where("from lot_istt_ostt_view a													")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("left outer join unit_mast u on u.unit_idcd = i.unit_idcd					")
			.where("left outer join wrhs_mast w on w.wrhs_idcd = a.wrhs_idcd					")
			.where("where 1=1																	")
			.where("and a.lott_numb  = :lott_numb" , arg.fixParameter("lott_numb"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getAcpt(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.invc_numb     , a.line_seqn     , u.unit_name    , a.invc_qntt     , a.invc_pric ")
			.query("       , a.sply_amnt     , a.vatx_amnt     , a.invc_amnt    , a.cstm_lott_numb, a.dlvy_date	")
			.query("       , b.invc_date																		")
		;
		data.param
			.where("from pror_mast p																			")
			.where("left outer join acpt_item a on p.acpt_numb = a.invc_numb and p.acpt_seqn = a.line_seqn		")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join unit_mast u on a.unit_idcd = u.unit_idcd									")
			.where("where 1=1																					")
			.where("and p.lott_numb  = :lott_numb", arg.fixParameter("lott_numb"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getOrdr(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.invc_numb    , a.line_seqn    , b.invc_date    , c.cstm_name    , b.deli_date	")
			.query("       , u.unit_name    			    													")
		;
		if(arg.getParamText("open_yorn").equals("on")){
			data.param
				.query("       , a.offr_qntt  																	")
				.query("       , json_value(a.json_data,'$**.qntt') as qntt   									")
			;
		}

		data.param
			.where("from purc_ordr_item a															")
			.where("left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb					")
			.where("left outer join unit_mast      u on u.unit_idcd = a.unit_idcd					")
			.where("left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd					")
			.where("where 1=1																		")
			.where("and   json_value(a.json_data,'$**.lott_numb') = :lott_numb", arg.fixParameter("lott_numb"		))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getPror(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select     a.invc_numb       , a.line_seqn       , w.wkct_name   , a.prog_stat_dvcd	")
			.query("         , a.work_strt_dttm  , a.work_endd_dttm  , c.cvic_name						")
		;
		data.param
			.where("from pror_item a												")
			.where("left outer join pror_mast b on a.invc_numb = b.invc_numb		")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd		")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd		")
			.where("where 1 = 1														")
			.where("and b.lott_numb  = :lott_numb", arg.fixParameter("lott_numb"	))
			.where("order by a.invc_numb,a.line_seqn								")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getIstt(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.invc_numb   , a.line_seqn   , b.invc_date   					")
		;
		if(arg.getParamText("open_yorn").equals("on")){
			data.param
				.query("       , a.istt_qntt  												")
			;
		}
		data.param
			.where("from purc_istt_item a														")
			.where("left outer join purc_istt_mast b on a.invc_numb = b.invc_numb				")
			.where("where 1=1																	")
			.where("and a.lott_numb = :lott_numb", arg.getParameter("lott_numb"	))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getWorkMtrl(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   b.invc_numb , b.line_seqn , k.wkct_name , w.invc_numb as work_numb				")
			.query("       , i.item_code , i.item_name , m.lott_numb as mtrl_lott_numb						")
		;
		if(arg.getParamText("open_yorn").equals("on")){
			data.param
				.query("       , m.ivst_qntt 																")
			;
		}
		data.param
			.where("from work_book_mtrl m																	")
			.where("left outer join work_book w on m.invc_numb = w.invc_numb								")
			.where("left outer join pror_item b on w.wkod_numb = b.invc_numb and w.wkod_seqn = b.line_seqn	")
			.where("left outer join pror_mast p on b.invc_numb = p.invc_numb								")
			.where("left outer join wkct_mast k on b.wkct_idcd = k.wkct_idcd								")
			.where("left outer join item_mast i on i.item_idcd = m.item_idcd								")
			.where("where 1=1																				")
			.where("and p.lott_numb  = :lott_numb", arg.fixParameter("lott_numb"))
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getProd(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select p.invc_numb  , p.item_idcd , p.lott_numb , w.work_strt_dttm , p.wkct_idcd		")
			.query("     , wk.wkct_name , i.item_name , i.item_code , w.work_endd_dttm , p.prog_stat_dvcd	")
		;
		if(arg.getParamText("open_yorn").equals("on")){
			data.param
				.query("       , a.ivst_qntt 																")
			;
		}
		data.param
			.where("from work_book_mtrl a																	")
			.where("left outer join work_book w  on a.invc_numb = w.invc_numb								")
			.where("left outer join pror_item p  on w.wkod_numb = p.invc_numb and w.wkod_seqn = p.line_seqn	")
			.where("left outer join wkct_mast wk on wk.wkct_idcd = p.wkct_idcd								")
			.where("left outer join item_mast i  on i.item_idcd = p.item_idcd								")
			.where("where 1=1																				")
			.where("and a.lott_numb  = :lott_numb", arg.fixParameter("lott_numb"))
			.where("and p.invc_numb is not null																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
}
