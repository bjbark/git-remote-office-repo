package com.sky.system.custom.hantop.item.itemcam;

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
public class ItemCamService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/* 브랜드 검색 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String dvcd = arg.getParamText("dvcd");

		data.param
			.query("select a.*																														")
		;
		data.param
			.where("from																															")
			.where("(select  a.brnd_bacd           , a.item_idcd           , a.item_code           , a.cstm_item_code      , a.item_name			")
			.where("       , a.bfsf_dvcd																											")
			.where("       , a.proc_item_name      , a.item_widh           , a.item_hght           , a.item_dpth           , a.open_widh			")
			.where("       , a.dbwd_yorn           , a.cmbf_yorn           , a.brcd_hght           , a.brcd_plac           , a.assa_yorn			")
			.where("       , a.hdho_type_dvcd      , a.hdho_1pcs_hght      , a.hdho_2pcs_hght      , a.hdho_hght_grip_1fst , a.hdho_hght_grip_2snd	")
			.where("       , a.hdho_qntt           , a.hdho_itvl           , a.hdho_pass_yorn      , a.lkho_incl_yorn      , a.lkho_1pcs_widh		")
			.where("       , a.lkho_1pcs_leng      , a.lkho_2pcs_widh      , a.lkho_2pcs_leng      , a.lkho_plac_cpsn      , a.lkho_grip_leng_1fst	")
			.where("       , a.rnpc_widh_1fst      , a.rnpc_widh_2snd      , a.omhd_widh           , a.omhd_leng           , a.omhd_hght			")
			.where("       , a.rlho_incl_yorn      , a.rolr_name           , a.midl_rolr_name      , a.rlho_strt_plac      , a.rlho_1pcs_widh		")
			.where("       , a.rlho_1pcs_leng      , a.rlho_2pcs_widh      , a.rlho_2pcs_leng      , a.rlho_3pcs_widh      , a.rlho_3pcs_leng		")
			.where("       , a.midl_rolr_leng      , a.rein_plac_1fst      , a.rein_plac_2snd      , a.rein_plac_3trd      , a.bsmt_leng			")
			.where("       , a.wthl_yorn           , a.rail_zero_yorn      , a.rail_1fst_yorn      , a.rail_2snd_yorn      , a.rail_midl_yorn		")
			.where("       , a.rail_3trd_yorn      , a.rail_4frt_yorn      , a.scrn_wthl_yorn      , a.akho_widh_1fst      , a.akho_widh_2snd		")
			.where("       , a.user_memo           , a.sysm_memo           , a.prnt_idcd           , a.line_levl           , a.line_ordr			")
			.where("       , a.line_stat           , a.line_clos           , a.find_name           , a.updt_user_name      , a.updt_ipad			")
			.where("       , a.updt_dttm           , a.updt_idcd           , a.updt_urif           , a.crte_user_name      , a.crte_ipad			")
			.where("       , a.crte_dttm           , a.crte_idcd           , a.crte_urif           													")
			.where("       , r.base_name as brnd_name																								")
			.where("       , a.rail_zero_hght      , a.rail_1fst_hght      , a.rail_2snd_hght      , a.rail_midl_hght								")
			.where("       , a.rail_3trd_hght      , a.rail_4frt_hght																				")
			.where("from     wind_pfil_cam a																	")
			.where("left outer join ( select * 																	")
			.where("                  from base_mast															")
			.where("                  where prnt_idcd = '4000'													")
			.where("                ) r on r.base_code = a.brnd_bacd											")
			.where("where    1=1																				")
		;
		if(dvcd.equals("1")){
			data.param
				.where("and      a.bfsf_dvcd in ('BF')													")
			;
		}else if(dvcd.equals("2")){
			data.param
				.where("and      a.bfsf_dvcd in ('SF')													")
			;
		}else if(dvcd.equals("3")){
			data.param
				.where("and      a.bfsf_dvcd in ('MF')													")
			;
		}else if(dvcd.equals("4")){
			data.param
				.where("and      a.bfsf_dvcd in ('GB')													")
			;
		}else if(dvcd.equals("5")){
			data.param
				.where("and      a.bfsf_dvcd in ('MC')													")
			;
		}else if(dvcd.equals("6")){
			data.param
				.where("and      a.bfsf_dvcd not in ('BF','BFRN','SF','SFRN','MF','MFRN','GB','MC')		")
			;
		}else if(dvcd.equals("7")){
			data.param
				.where("and      a.bfsf_dvcd in ('BFRN')												")
			;
		}else if(dvcd.equals("8")){
			data.param
				.where("and      a.bfsf_dvcd in ('SFRN')												")
			;
		}else if(dvcd.equals("9")){
			data.param
				.where("and      a.bfsf_dvcd in ('MFRN')												")
			;
		}
		data.param
			.where("and      a.line_clos = :line_clos"		 , arg.getParameter("line_clos"))
			.where("and      a.brnd_bacd = :brnd_bacd"		 , arg.getParameter("brnd_bacd"))
			.where("and      a.find_name  like %:find_name%	", arg.getParameter("find_name"))
			.where("and      a.line_stat	< :line_stat		", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.item_idcd) a																		")
		;
		return data.selectForMap(sort);
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wind_pfil_cam												")
					.where("where brnd_bacd		= :brnd_bacd							")
					.where("and item_idcd		= :item_idcd							")

					.unique("brnd_bacd"			, row.fixParameter("brnd_bacd"			))	//브랜드분류코드
					.unique("item_idcd"			, row.fixParameter("item_idcd"			))

					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					;data.attach(Action.update)
				;
			}else{
				data.param
					.table("wind_pfil_cam												")
					.where("where brnd_bacd		= :brnd_bacd							")
					.where("and item_idcd		= :item_idcd							")

					.unique("brnd_bacd"					, row.fixParameter("brnd_bacd"			))	//브랜드분류코드
					.unique("item_idcd"					, row.fixParameter("item_idcd"			))
					//
					.update("bfsf_dvcd"					, row.getParameter("bfsf_dvcd"				))	//bfsf구분코드
					.update("item_code"					, row.getParameter("item_code"				))	//품목코드
					.update("cstm_item_code"			, row.getParameter("cstm_item_code"			))	//거래처품목코드
					.update("item_name"					, row.getParameter("item_name"				))	//품목명
					.update("proc_item_name"			, row.getParameter("proc_item_name"			))	//가공품목명
					.update("item_widh"					, row.getParameter("item_widh"				))	//품목폭
					.update("item_hght"					, row.getParameter("item_hght"				))	//품목높이
					.update("item_dpth"					, row.getParameter("item_dpth"				))	//품목깊이
					.update("bsmt_leng"					, row.getParameter("bsmt_leng"				))	//품목깊이
					.update("open_widh"					, row.getParameter("open_widh"				))	//개공폭
					.update("dbwd_yorn"					, row.getParameter("dbwd_yorn"				))	//이중창여부
					.update("cmbf_yorn"					, row.getParameter("cmbf_yorn"				))	//공틀여부
					.update("brcd_hght"					, row.getParameter("brcd_hght"				))	//바코드높이
					.update("brcd_plac"					, row.getParameter("brcd_plac"				))	//바코드위치
					.update("assa_yorn"					, row.getParameter("assa_yorn"				))	//아사여부
					.update("hdho_type_dvcd"			, row.getParameter("hdho_type_dvcd"			))	//핸드홀타입구분코드
					.update("hdho_1pcs_hght"			, row.getParameter("hdho_1pcs_hght"			))	//핸드홀1P높이
					.update("hdho_2pcs_hght"			, row.getParameter("hdho_2pcs_hght"			))	//핸드홀2P높이
					.update("hdho_hght_grip_1fst"		, row.getParameter("hdho_hght_grip_1fst"	))	//핸드홀높이그립1
					.update("hdho_hght_grip_2snd"		, row.getParameter("hdho_hght_grip_2snd"	))	//핸드홀높이그립2
					.update("hdho_qntt"					, row.getParameter("hdho_qntt"				))	//핸드홀수
					.update("hdho_itvl"					, row.getParameter("hdho_itvl"				))	//핸드홀간격
					.update("hdho_pass_yorn"			, row.getParameter("hdho_pass_yorn"			))	//핸드홀관통여부
					.update("lkho_incl_yorn"			, row.getParameter("lkho_incl_yorn"			))	//락킹홀포함여부
					.update("lkho_1pcs_widh"			, row.getParameter("lkho_1pcs_widh"			))	//락킹홀1P폭
					.update("lkho_1pcs_leng"			, row.getParameter("lkho_1pcs_leng"			))	//락킹홀1P길이
					.update("lkho_2pcs_widh"			, row.getParameter("lkho_2pcs_widh"			))	//락킹홀2P폭
					.update("lkho_2pcs_leng"			, row.getParameter("lkho_2pcs_leng"			))	//락킹홀2P길이
					.update("lkho_plac_cpsn"			, row.getParameter("lkho_plac_cpsn"			))	//락킹홀위치보정
					.update("lkho_grip_leng_1fst"		, row.getParameter("lkho_grip_leng_1fst"	))	//락킹홀그립길이1
					.update("rnpc_widh_1fst"			, row.getParameter("rnpc_widh_1fst"			))	//고리펀칭폭1
					.update("rnpc_widh_2snd"			, row.getParameter("rnpc_widh_2snd"			))	//고리펀칭폭2
					.update("omhd_widh"					, row.getParameter("omhd_widh"				))	//오목핸들폭
					.update("omhd_leng"					, row.getParameter("omhd_leng"				))	//오목핸들길이
					.update("omhd_hght"					, row.getParameter("omhd_hght"				))	//오목핸들높이
					.update("rlho_incl_yorn"			, row.getParameter("rlho_incl_yorn"			))	//롤러홀포함여부
					.update("rolr_name"					, row.getParameter("rolr_name"				))	//롤러명
					.update("midl_rolr_name"			, row.getParameter("midl_rolr_name"			))	//중간롤러명
					.update("rlho_strt_plac"			, row.getParameter("rlho_strt_plac"			))	//롤러홀시작위치
					.update("rlho_1pcs_widh"			, row.getParameter("rlho_1pcs_widh"			))	//롤러홀1P폭
					.update("rlho_1pcs_leng"			, row.getParameter("rlho_1pcs_leng"			))	//롤러홀1P길이
					.update("rlho_2pcs_widh"			, row.getParameter("rlho_2pcs_widh"			))	//롤러홀2P폭
					.update("rlho_2pcs_leng"			, row.getParameter("rlho_2pcs_leng"			))	//롤러홀2P길이
					.update("rlho_3pcs_widh"			, row.getParameter("rlho_3pcs_widh"			))	//롤러홀3P폭
					.update("rlho_3pcs_leng"			, row.getParameter("rlho_3pcs_leng"			))	//롤러홀3P길이
					.update("midl_rolr_leng"			, row.getParameter("midl_rolr_leng"			))	//중간롤러길이
					.update("rein_plac_1fst"			, row.getParameter("rein_plac_1fst"			))	//보강재위치1
					.update("rein_plac_2snd"			, row.getParameter("rein_plac_2snd"			))	//보강재위치2
					.update("rein_plac_3trd"			, row.getParameter("rein_plac_3trd"			))	//보강재위치3
					.update("wthl_yorn"					, row.getParameter("wthl_yorn"				))	//물개공여부
					.update("rail_zero_yorn"			, row.getParameter("rail_zero_yorn"			))	//레일0여부
					.update("rail_1fst_yorn"			, row.getParameter("rail_1fst_yorn"			))	//레일1여부
					.update("rail_2snd_yorn"			, row.getParameter("rail_2snd_yorn"			))	//레일2여부
					.update("rail_midl_yorn"			, row.getParameter("rail_midl_yorn"			))	//레일중간여부
					.update("rail_3trd_yorn"			, row.getParameter("rail_3trd_yorn"			))	//레일3여부
					.update("rail_4frt_yorn"			, row.getParameter("rail_4frt_yorn"			))	//레일4여부

					.update("rail_zero_hght"			, row.getParameter("rail_zero_hght"			))	//레일0여부
					.update("rail_1fst_hght"			, row.getParameter("rail_1fst_hght"			))	//레일1여부
					.update("rail_2snd_hght"			, row.getParameter("rail_2snd_hght"			))	//레일2여부
					.update("rail_midl_hght"			, row.getParameter("rail_midl_hght"			))	//레일중간여부
					.update("rail_3trd_hght"			, row.getParameter("rail_3trd_hght"			))	//레일3여부
					.update("rail_4frt_hght"			, row.getParameter("rail_4frt_hght"			))	//레일4여부
					.update("scrn_wthl_yorn"			, row.getParameter("scrn_wthl_yorn"			))	//스크린물개공여부
					.update("akho_widh_1fst"			, row.getParameter("akho_widh_1fst"			))	//앙카홀폭1
					.update("akho_widh_2snd"			, row.getParameter("akho_widh_2snd"			))	//앙카홀폭2

					.update("user_memo"					, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"					, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"					, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"					, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"					, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"					, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"					, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"					, row.getParamText("item_idcd"			).trim()
														+ " "
														+ row.getParamText("item_code"			).trim())
					.update("updt_user_name"			, row.getParameter("updt_user_name"		))	//수정사용자명
					.update("updt_ipad"					, row.getParameter("updt_ipad"			))	//수정IP
					.update("updt_dttm"					, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
					.update("updt_idcd"					, row.getParameter("updt_idcd"			))	//수정ID
					.update("updt_urif"					, row.getParameter("updt_urif"			))	//수정UI
					.insert("crte_user_name"			, row.getParameter("crte_user_name"		))	//생성사용자명
					.insert("crte_ipad"					, row.getParameter("crte_ipad"			))	//생성IP
					.insert("crte_dttm"					, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
					.insert("crte_idcd"					, row.getParameter("crte_idcd"			))	//생성ID
					.insert("crte_urif"					, row.getParameter("crte_urif"			))	//생성UI
					;
				data.attach(rowaction);
			}
			data.execute();
			data.clear();
		}
		return null ;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String brnd_bacd	= arg.getParamText("brnd_bacd") ;
		String item_idcd	= arg.getParamText("item_idcd") ;
		String item_idcd2	= arg.getParamText("item_idcd2") ;
		String hq			= arg.getParamText("hqof_idcd") ;
		String stor			= arg.getParamText("stor_id");
		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}


		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call wind_pfil_copy (			")
			.query("   :STOR "       , hq			)  // 본사코드
			.query(" , :brnd_bacd "  , brnd_bacd	)  // Invoice 번호
			.query(" , :item_idcd "  , item_idcd	)  // 복사할자재
			.query(" , :item_idcd2 " , item_idcd2	)  // 추가할자재
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;

	}
}



