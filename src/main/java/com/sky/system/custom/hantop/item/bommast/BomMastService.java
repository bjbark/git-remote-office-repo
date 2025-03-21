package com.sky.system.custom.hantop.item.bommast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class BomMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/* 브랜드 검색 */
	public SqlResultMap getBrand(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize											 					")
		;
		data.param
			.query("select a.base_name as brnd_name , a.base_code as brnd_bacd, a.base_idcd	as brnd_idcd	")
		;
		data.param //퀴리문
			.where("from   base_mast a																		")
			.where("where  1=1																				")
			.where("and    a.prnt_idcd = '4000'																")
			.where("and    a.base_code <> '00'																")
			.where("and    a.line_stat  = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.base_code																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.item_idcd      , b.item_name      , b.item_spec      , b.item_code	")
			.query("       , a.colr_idcd      , a.colr_name      , a.stnd_pric      , a.cont_date	")
			.query("       , a.cstm_idcd      , c.cstm_name      , b.acct_bacd						")
		;
		data.param //퀴리문
			.where("from   wind_item_clor a															")
			.where("left outer join wind_item_mast  b on a.item_idcd = b.item_idcd					")
			.where("left outer join cstm_mast       c on a.cstm_idcd = c.cstm_idcd					")
			.where("where  1=1																		")
			.where("and    b.rpst_item_idcd  = :rpst_item_idcd   "  , arg.getParameter("rpst_item_idcd"))
			.where("and    a.find_name like  % :find_name%       "  , arg.getParameter("find_name"))
			.where("and    a.line_stat       = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/* 창호그룹조회 */
	public SqlResultMap getWdgr(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize														")
		;
		data.param
			.query("select a.wdgr_idcd, a.wdgr_code, a.wdgr_name									")
		;
		data.param //퀴리문
			.where("from   wind_grop a																")
			.where("where  1=1																		")
			.where("and    a.line_stat  = :line_stat    " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.wdgr_code															")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/* 창호형태조회 */
	public SqlResultMap getWdty(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																		")
		;
		data.param
			.query("select a.brnd_bacd       , a.wdgr_idcd       , a.wndw_modl_idcd       , a.wdbf_itid				")
			.query("     , a.wndw_modl_code  , a.modl_name       , a.wdsf_itid										")
		;
		data.param //퀴리문
			.where("from 		wind_item_modl a																	")
			.where("left outer join wind_grop  b on a.wdgr_idcd = b.wdgr_idcd										")
			.where("where		1=1																					")
			.where("and			a.brnd_bacd   = :brnd_bacd			", arg.getParamText("brnd_bacd"))
			.where("and			a.wdgr_idcd   = :wdgr_idcd			", arg.getParamText("wdgr_idcd"))
			.where("and			a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wndw_modl_code																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
//		data.param
//			.query("select imge_1fst					")
//			.where("from  wind_item_modl				")
//			.where("where 1=1							")
//			.where("and   wndw_modl_idcd = :wndw_modl_idcd",arg.getParameter("wndw_modl_idcd"))
//		;
//		return data.selectForMap();
		return null;
	}

	/* detail3 = BOM 목록 */
	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("call wind_bom_tree (				")
			.query("   :wndw_modl_idcd "   ,  arg.getParameter("wndw_modl_idcd"))
			.query("  ,:wdtp_idcd "        ,  arg.getParameter("wdtp_idcd"))
			.query(" ) 									")
		;
		return data.selectForMap();
	}

	/* BOM 작성 */
	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_bom_create (				")
			.query("   :param "   ,  arg.getParameter("param"))
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap getType(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param // 집계문
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select  a.wdtp_idcd,        a.wdtp_code,        a.wdtp_name,        a.wdgr_idcd			")
		;
		data.param //퀴리문
			.where("from wind_type a																		")
			.where("where		1=1																			")
//			.where("and   a.wdgr_idcd = :wdgr_idcd					",arg.getParameter("wdgr_idcd"))
			.where("and   a.line_stat	< :line_stat				", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wdtp_code limit 999999) a													")
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
		if (rowaction == Action.delete) {
			data.param
				.table("wind_bom													")
				.where("where wndw_modl_idcd	= :wndw_modl_idcd					")
				.where("and wdtp_idcd			= :wdtp_idcd						")
				.where("and wndw_itid			= :wndw_itid						")
				.where("and line_seqn			= :line_seqn						")

				.unique("wndw_modl_idcd"	, arg.fixParameter("wndw_modl_idcd"		))	//창호모델ID
				.unique("wdtp_idcd"			, arg.fixParameter("wdtp_idcd"			))	//창호형태ID
				.unique("wndw_itid"			, arg.fixParameter("wndw_itid"			))	//창호품목ID
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))	//순번

				;
			data.attach(Action.delete);
			data.execute();

		}else{
			data.param
				.table("wind_bom													")
				.where("where wndw_modl_idcd	= :wndw_modl_idcd					")
				.where("and wdtp_idcd			= :wdtp_idcd						")
				.where("and wndw_itid			= :wndw_itid						")
				.where("and line_seqn			= :line_seqn						")

				.unique("wndw_modl_idcd"	, arg.fixParameter("wndw_modl_idcd"		))	//창호모델ID
				.unique("wdtp_idcd"			, arg.fixParameter("wdtp_idcd"			))	//창호형태ID
				.unique("wndw_itid"			, arg.fixParameter("wndw_itid"			))	//창호품목ID
				.unique("line_seqn"			, arg.fixParameter("line_seqn"			))	//순번

				.update("bfsf_dvcd"			, arg.getParameter("bfsf_dvcd"			))
				.update("esnt_yorn"			, arg.getParameter("esnt_yorn"			))
				.update("ivst_item_idcd"	, arg.getParameter("ivst_item_idcd"		))
				.update("ivst_item_name"	, arg.getParameter("ivst_item_name"		))
				.update("ivst_item_spec"	, arg.getParameter("ivst_item_spec"		))
				.update("calc_frml"			, arg.getParameter("calc_frml"			))
				.update("need_qntt"			, arg.getParameter("need_qntt"			))
				.update("acct_bacd"			, arg.getParameter("acct_bacd"			))

				.update("user_memo"			, arg.getParameter("user_memo"			))	//사용자메모
				.update("sysm_memo"			, arg.getParameter("sysm_memo"			))	//시스템메모
				.update("prnt_idcd"			, arg.getParameter("prnt_idcd"			))	//부모ID
				.update("line_levl"			, arg.getParameter("line_levl"			))	//ROW레벨
				.update("line_ordr"			, arg.getParameter("line_ordr"			))	//ROW순서
				.update("line_stat"			, arg.getParameter("line_stat"			))	//ROW상태
				.update("line_clos"			, arg.getParameter("line_clos"			))	//ROW마감
				.update("find_name"			, arg.getParamText("item_code"			).trim()
											+ " "
											+ arg.getParamText("ivst_item_name"		).trim())	//찾기명
				.update("updt_user_name"	, arg.getParameter("updt_user_name"		))	//수정사용자명
				.update("updt_ipad"			, arg.getParameter("updt_ipad"			))	//수정IP
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
				.update("updt_idcd"			, arg.getParameter("updt_idcd"			))	//수정ID
				.update("updt_urif"			, arg.getParameter("updt_urif"			))	//수정UI
				.insert("crte_user_name"	, arg.getParameter("crte_user_name"		))	//생성사용자명
				.insert("crte_ipad"			, arg.getParameter("crte_ipad"			))	//생성IP
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
				.insert("crte_idcd"			, arg.getParameter("crte_idcd"			))	//생성ID
				.insert("crte_urif"			, arg.getParameter("crte_urif"			))	//생성UI
			;
			data.attach(rowaction);
			data.execute();
			data.clear();
		}
		return null ;
	}

	public SqlResultMap getSeq(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(max(a.line_seqn),0)   as 'seq'		")
			.query("      ,ifnull(max(line_ordr)  ,0)   as ordr_seq		")
			.where("from  wind_bom a									")
			.where("where 1=1											")
			.where("and   a.wndw_modl_idcd = :wndw_modl_idcd			",arg.getParameter("wndw_modl_idcd"))
			.where("and   a.wdtp_idcd = :wdtp_idcd						",arg.getParameter("wdtp_idcd"))
			.where("and   a.wndw_itid = :wndw_itid						",arg.getParameter("wndw_itid"))
		;

		return data.selectForMap();
	}
}



