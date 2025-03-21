package com.sky.system.stock.lot.lotchange;

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
public class LotChangeService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getMasterSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.lott_numb   , a.wrhs_idcd   , a.ostt_date   , a.istt_date			")
			.query("       , i.item_name   , i.item_spec   , i.item_code   , w.wrhs_name			")
			.query("       , i.modl_name   , u.unit_name   , a.user_memo   , a.ostt_qntt			")
			.query("       , a.user_memo   , a.sysm_memo   , a.find_name   , a.item_idcd			")
			.query("       , (select base_name from base_mast r where i.acct_bacd  = r.base_code	")
			.query("                             and   r.prnt_idcd = '1102')   as acct_bacd_name	")
			.query("       , i.acct_bacd   , a.istt_qntt   , a.chge_qntt   , a.stok_qntt			")
			;
		data.param //퀴리문
			.where("from     lot_isos_sum a															")
			.where("         left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd				")
			.where("         left outer join item_mast i on a.item_idcd = i.item_idcd				")
			.where("         left outer join unit_mast u on i.unit_idcd = u.unit_idcd				")
			.where("where 1=1																		")
			.where("and      a.lott_numb  like %:lott_numb%", arg.getParameter("lott_numb"			))
			.where("and      i.item_name  = :item_name", arg.getParameter("item_name"				))
			.where("and      a.istt_date  = :istt_date", arg.getParameter("istt_date"				))
			.where("and      i.acct_bacd  = :acct_bacd", arg.getParameter("acct_bacd"				))
			.where("and      a.wrhs_idcd  = :wrhs_idcd", arg.getParameter("wrhs_idcd"				))
			.where("order by    a.lott_numb															")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetailSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.lott_numb        , a.qntt        , a.isos_dvcd   , a.invc_numb		")
			.query("      , concat(a.invc_numb,'-',a.invc_seqn) as full_invc_numb					")
			.query("      , a.invc_seqn        , a.item_idcd   , i.item_name   , i.item_spec		")
			.query("      , i.item_code        , i.modl_name   , u.unit_name   , a.invc_date		")
			.query("      , (select base_name from base_mast r where i.acct_bacd  = r.base_code		")
			.query("                             and   r.prnt_idcd = '1102')   as acct_bacd_name	")
			.query("      , w.wrhs_name        , a.wrhs_idcd     , a.line_seqn						")
			.query("      , a.user_memo        , a.sysm_memo   , a.prnt_idcd						")
			.query("      , a.line_stat        , a.line_clos   , a.find_name   , a.updt_user_name	")
			.query("      , a.updt_ipad        , a.updt_dttm   , a.updt_idcd   , a.updt_urif		")
			.query("      , a.crte_user_name   , a.crte_ipad   , a.crte_dttm   , a.crte_idcd		")
			.query("      , a.crte_urif																")
		;
		data.param //퀴리문
			.where("from    ( select   wrhs_idcd , wrhs_name										")
			.where("         from wrhs_mast 														")
			.where("         union all																")
			.where("         select    wkct_idcd , wkct_name										")
			.where("         from wkct_mast 														")
			.where("         ) w																	")
			.where("         left outer join lot_isos_book a on a.wrhs_idcd = w.wrhs_idcd			")
			.where("         left outer join item_mast i on a.item_idcd = i.item_idcd				")
			.where("         left outer join unit_mast u on i.unit_idcd = u.unit_idcd				")
			.where("where 1=1																		")
			.where("and   a.isos_dvcd = '2500'														")
			.where("and   a.find_name	like %:find_name%	" , arg.getParameter("find_name"		))
			.where("and   a.wrhs_idcd = :wrhs_idcd			" , arg.getParameter("wrhs_idcd"		))
			.where("and   a.item_idcd = :item_idcd			" , arg.getParameter("item_idcd"		))
			.where("and   a.lott_numb = :lott_numb			" , arg.getParameter("lott_numb"		))
			.where("order by   a.lott_numb 															")
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select ifnull(max(a.line_seqn),0) as line_seqn										")
		;
		data.param
			.where("from		lot_isos_book a   																")
			.where("where		1=1																				")
			.where("and			a.lott_numb = :lott_numb		" , arg.getParameter("lott_numb"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("lot_isos_book")
					.where("where lott_numb	= :lott_numb")
					.where("and   line_seqn	= :line_seqn")

					.unique("lott_numb"			, row.fixParameter("lott_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("lot_isos_book")
					.where("where lott_numb	= :lott_numb" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("lott_numb"				, row.fixParameter("lott_numb"))
					.unique("line_seqn"				, row.fixParameter("line_seqn"))

					.update("bzpl_idcd"				, row.getParameter("bzpl_idcd"))
					.update("isos_dvcd"				, 2500)
					.update("invc_date"				, row.getParameter("invc_date"))
					.update("invc_numb"				, row.getParameter("invc_numb"))
					.update("invc_seqn"				, row.getParameter("invc_seqn"))
					.update("wrhs_idcd"				, row.getParameter("wrhs_idcd"))
					.update("item_idcd"				, row.getParameter("item_idcd"))
					.update("qntt"					, row.getParameter("qntt"))
					.update("stok_symb"				, row.getParameter("stok_symb"))
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
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}



}
