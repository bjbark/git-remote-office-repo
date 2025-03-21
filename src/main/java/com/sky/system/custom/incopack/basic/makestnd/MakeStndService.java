package com.sky.system.custom.incopack.basic.makestnd;

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
public class MakeStndService extends DefaultServiceHandler{

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select	a.*																				")
		;
		data.param
			.where("from(																					")
			.where("select	  a.item_idcd      , a.item_code       , a.item_name       , a.item_spec		")
			.where("		, i.spec_horz      , i.spec_vrtl       , i.spec_tick							")
			.where("		, i.bath_qntt      , i.colr_ccnt       , i.liqu_type       , i.fabc_widh		")
			.where("		, i.proc_bacd      , i.roll_perc_poch  , i.ygls_tick       , i.ngls_tick		")
			.where("		, i.poch_wdth      , i.poch_hght       , i.nutc_valu							")
			.where("		, i.poch_tick      , i.item_tick       , i.real_item_tick						")
			.where("		, a.user_memo      , a.sysm_memo       , a.prnt_idcd							")
			.where("		, a.line_levl      , a.line_ordr       , a.line_stat        , a.line_clos		")
			.where("		, a.find_name      , a.updt_user_name  , a.updt_ipad        , a.updt_dttm		")
			.where("		, if(i.sgsp_sccs_yorn,'true','false') as sgsp_sccs_yorn							")
			.where("		, if(i.rond_yorn,'true','false') as rond_yorn									")
			.where("		, if(i.zipr_yorn,'true','false') as zipr_yorn									")
			.where("		, if(i.hole_yorn,'true','false') as hole_yorn									")
			.where("		, if(i.stnd_yorn,'true','false') as stnd_yorn									")
			.where("		, if(i.uppr_open_yorn,'true','false') as uppr_open_yorn							")
			.where("		, if(i.lwrp_open_yorn,'true','false') as lwrp_open_yorn							")
			.where("		, if(i.left_open_yorn,'true','false') as left_open_yorn							")
			.where("		, if(i.righ_open_yorn,'true','false') as righ_open_yorn							")
			.where("		, a.updt_idcd      , a.updt_urif       , a.crte_user_name   , a.crte_ipad		")
			.where("		, a.crte_dttm      , a.crte_idcd       , a.crte_urif							")
			.where("        , (select base_name from base_mast r where i.proc_bacd  = r.base_code			")
			.where("                                         and   r.prnt_idcd = '8001')   as proc_name		")
		;
		data.param //퀴리문
			.where("from	item_mast a																		")
			.where("        left outer join item_make_spec i on a.item_idcd = i.item_idcd					")
			.where("where	1=1																				")
			.where("and		a.acct_bacd = 3000																")
			.where("and				a.crte_dttm  >= :st_dt		" , arg.getParamText("st_dt" ))
			.where("and				a.crte_dttm  <= :ed_dt		" , arg.getParamText("ed_dt" ))
			.where("and		a.find_name	like %:find_name%"	, arg.getParameter("find_name"))
			.where("and		a.line_stat	= :line_stat1"		, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.item_idcd")
			.where(") a																						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String zipr_yorn = row.getParamText("zipr_yorn");
			String sgsp_sccs_yorn = row.getParamText("sgsp_sccs_yorn");
			String rond_yorn = row.getParamText("rond_yorn");
			String hole_yorn = row.getParamText("hole_yorn");
			String stnd_yorn = row.getParamText("stnd_yorn");
			String uppr_open_yorn = row.getParamText("uppr_open_yorn");
			String lwrp_open_yorn = row.getParamText("lwrp_open_yorn");
			String left_open_yorn = row.getParamText("left_open_yorn");
			String righ_open_yorn = row.getParamText("righ_open_yorn");
			//true false 체크
			String chek1 = "0";
			String chek2 = "0";
			String chek3 = "0";
			String chek4 = "0";
			String chek5 = "0";
			String chek6 = "0";
			String chek7 = "0";
			String chek8 = "0";
			String chek9 = "0";

			if(sgsp_sccs_yorn == "true"){
				chek1 = "1";
			}
			if(hole_yorn == "true"){
				chek2 = "1";
			}
			if(stnd_yorn == "true"){
				chek3 = "1";
			}
			if(uppr_open_yorn == "true"){
				chek4 = "1";
			}
			if(lwrp_open_yorn == "true"){
				chek5 = "1";
			}
			if(left_open_yorn == "true"){
				chek6 = "1";
			}
			if(righ_open_yorn == "true"){
				chek7 = "1";
			}
			if(zipr_yorn == "true"){
				chek8 = "1";
			}
			if(rond_yorn == "true"){
				chek9 = "1";
			}

			if (rowaction == Action.delete) {
				data.param
					.table("item_make_spec						")
					.where("where item_idcd  = :item_idcd		")

					.unique("item_idcd"			, row.fixParameter("item_idcd"	))
					;data.attach(Action.delete);
			} else {
				data.param
					.table("item_make_spec")
					.where("where item_idcd  = :item_idcd		")

					.unique("item_idcd"			, row.fixParameter("item_idcd"))

					.update("spec_horz"			, row.getParameter("spec_horz"))	//(규격)가로
					.update("spec_vrtl"			, row.getParameter("spec_vrtl"))	//(규격)세로
					.update("spec_tick"			, row.getParameter("spec_tick"))	//(규격)두께 - 높이
					.update("bath_qntt"			, row.getParameter("bath_qntt"))	//batch 수량
					.update("colr_ccnt"			, row.getParameter("colr_ccnt"))	//컬러도수
					.update("liqu_type"			, row.getParameter("liqu_type"))	//액형
					.update("fabc_widh"			, row.getParameter("fabc_widh"))	//원단폭
					.update("proc_bacd"			, row.getParameter("proc_bacd"))	//가공분류코드
					.update("roll_perc_poch"	, row.getParameter("roll_perc_poch"))	//Roll당 파우치
					.update("ygls_tick"			, row.getParameter("ygls_tick"))	//유광두께
					.update("ngls_tick"			, row.getParameter("ngls_tick"))	//무광두께
					.update("nutc_valu"			, row.getParameter("nutc_valu"))	//넛찌값
					.update("sgsp_sccs_yorn"	, chek1)							//분리배출여부
					.update("hole_yorn"			, chek2)							//타공여부
					.update("stnd_yorn"			, chek3)							//스텐드여부
					.update("uppr_open_yorn"	, chek4)							//상단오픈여부
					.update("lwrp_open_yorn"	, chek5)							//하단오픈여부
					.update("left_open_yorn"	, chek6)							//좌측오픈여부
					.update("righ_open_yorn"	, chek7)							//우측오픈여부
					.update("zipr_yorn"			, chek8)							//지퍼여부
					.update("rond_yorn"			, chek9)							//라운드여부
					.update("poch_wdth"			, row.getParameter("poch_wdth"))	//(파우치)가로
					.update("poch_hght"			, row.getParameter("poch_hght"))	//(파우치)세로
					.update("poch_tick"			, row.getParameter("poch_tick"))	//(파우치)두께
					.update("item_tick"				, row.getParameter("item_tick"))	//품목두께
					.update("real_item_tick"	, row.getParameter("real_item_tick"))	//실품목두께
					.update("user_memo"		, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("item_name")
												+ "	"
												+ row.getParameter("item_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;data.attach(Action.modify);
				}
			}
		data.execute();
		return null ;
	}


}
