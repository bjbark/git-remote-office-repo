package com.sky.system.custom.iypkg.item.ppermast;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.http.util.TextUtils;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class PperMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select  a.pper_idcd      , a.pper_code      , a.pper_name      , a.pnyg_volm		")
			.where("      , a.tons_pric      , a.kgrm_pric      , a.mxm2_pric      , a.stnd_leng		")
			.where("      , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.line_stat		")
			.where("      , a.find_name																	")
			.where("from    pper_mast a																	")
			.where("where   1=1																			")
			.where(") a																					")
			.where("where   1=1																			")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by pper_code																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select  a.pper_idcd      , a.pper_code      , a.pper_name      , a.pnyg_volm		")
			.where("      , a.tons_pric      , a.kgrm_pric      , a.mxm2_pric      , a.stnd_leng		")
			.where("      , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.line_stat		")
			.where("from    pper_mast a																	")
			.where("where   1=1																			")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																					")
			.where("order by pper_code																	")
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("pper_mast"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  거래처ID  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;data.attach(Action.update);

			} else {
				data.param
					.table("pper_mast"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  원지ID  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					//
					.update("pper_code"			, row.getParameter("pper_code"           ))  /*  원지코드  */
					.update("pper_name"			, row.getParameter("pper_name"           ))  /*  원지명  */
					.update("pnyg_volm"			, row.getParameter("pnyg_volm"           ))  /*  평량  */
					.update("tons_pric"			, row.getParameter("tons_pric"           ))  /*  톤단가  */
					.update("kgrm_pric"			, row.getParameter("kgrm_pric"           ))  /*  키로그램단가  */
					.update("mxm2_pric"			, row.getParameter("mxm2_pric"           ))  /*  제곱미터단가  */
					.update("stnd_leng"			, row.getParameter("stnd_leng"           ))  /*  표준길이  */

					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  상위순번  */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  하위순번  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("pper_code"           ).trim()
												+ " "
												+ row.getParamText("pper_name"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
			data.execute();
		}
		return null ;
	}

	// 조회
	public SqlResultMap getCstm(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select  a.pper_idcd      , a.line_seqn      , a.cstm_idcd      , c.cstm_name					")
			.where("      , c.cstm_code      , a.adpt_date      , a.bxsw_loss      , a.bxdw_loss					")
			.where("      , a.bxtw_loss      , a.bxaa_loss      , a.bxee_loss      , a.bxsw_make_cost				")
			.where("      , a.bxdw_make_cost , a.bxtw_make_cost , a.bxaa_make_cost , a.bxee_make_cost				")
			.where("from    pper_loss a																				")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("where   1=1																						")
			.where("and     a.pper_idcd   = :pper_idcd       " , arg.getParamText("pper_idcd"))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																			")
			.where(") a																								")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getCstmLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd      , a.line_seqn      , a.drtr_name      , a.wkps_name      , a.dept_name		")
			.query("      , a.drtr_tele_numb , a.drtr_hdph_numb , a.drtr_faxi_numb , a.drtr_mail_addr , a.remk_text		")
			.query("      , a.drtr_dvcd      , a.rpst_drtr_yorn 														")
		;
		data.param //퀴리문
			.where("from    cstm_drtr a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	public SqlResultMap setCstm(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("pper_loss"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  원지ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("pper_loss"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  원지ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           )) /* 거래처ID		*/
					.update("adpt_date"			, row.getParameter("adpt_date"           )) /* 적용일자		*/
					.update("bxsw_loss"			, row.getParameter("bxsw_loss"           )) /* swloss		*/
					.update("bxdw_loss"			, row.getParameter("bxdw_loss"           )) /* dwloss		*/
					.update("bxtw_loss"			, row.getParameter("bxtw_loss"           )) /* twloss		*/
					.update("bxaa_loss"			, row.getParameter("bxaa_loss"           )) /* aa골loss		*/
					.update("bxee_loss"			, row.getParameter("bxee_loss"           )) /* e골loss		*/
					.update("bxsw_make_cost"	, row.getParameter("bxsw_make_cost"      )) /* sw가공비		*/
					.update("bxdw_make_cost"	, row.getParameter("bxdw_make_cost"      )) /* dw가공비		*/
					.update("bxtw_make_cost"	, row.getParameter("bxtw_make_cost"      )) /* tw가공비		*/
					.update("bxaa_make_cost"	, row.getParameter("bxaa_make_cost"      )) /* aa골가공비		*/
					.update("bxee_make_cost"	, row.getParameter("bxee_make_cost"      )) /* e골가공비		*/
					.update("user_memo"			, row.getParameter("user_memo"           )) /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           )) /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           )) /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           )) /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           )) /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           )) /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           )) /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_code"           ).trim()
												+ " "
												+ row.getParamText("cstm_name"           ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setPric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("pper_pric"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  원지ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(Action.delete);
			} else {
				data.param
					.table("pper_pric"													)
					.where("where pper_idcd		= :pper_idcd							")  /*  원지ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처ID*/
					.update("adpt_date"			, row.getParameter("adpt_date"           ))  /*  적용일자 */
					.update("tons_pric"			, row.getParameter("tons_pric2"          ))  /*  톤단가 */
					.update("kgrm_pric"			, row.getParameter("kgrm_pric2"          ))  /*  KG단가 */
					.update("befr_tons_pric"	, row.getParameter("befr_tons_pric"      ))  /*  이전톤단가 */
					.update("befr_kgrm_pric"	, row.getParameter("befr_kgrm_pric"      ))  /*  이전KG단가 */
					.update("last_yorn"			, row.getParameter("last_yorn"           ))  /* 최종여부 */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_code"           ).trim()
												+ " "
												+ row.getParamText("cstm_name"           ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		data.clear();

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("pper_pric"													)
				.where("where pper_idcd		= :pper_idcd							")  /*  원지ID    */
				.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
				//
				.unique("pper_idcd"			, row.fixParameter("pper_idcd"			))
				.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
				//
				.update("last_yorn"			, "0")  /* 최종여부 전부 0 변경 */
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param // 집계문  입력
				.query("update pper_pric									")
				.query("set last_yorn = '1'									")
				.query("where pper_idcd = :pper_idcd" , row.getParamText("pper_idcd"))
				.query("and   cstm_idcd = :cstm_idcd" , row.getParamText("cstm_idcd"))
				.query("and line_seqn = (select ifnull(max(line_seqn),1)	")
				.query("                 from pper_pric						")
				.query("                 where pper_idcd = :pper_idcd2 ", row.getParamText("pper_idcd"))
				.query("                 and cstm_idcd   = :cstm_idcd2 ", row.getParamText("cstm_idcd"))
				.query(" )	")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null ;
	}

	// 조회
	public SqlResultMap getPric(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select  a.pper_idcd      , a.line_seqn      , a.cstm_idcd      , a.disp_seqn					")
			.where("      , a.adpt_date      , a.tons_pric as tons_pric2           , a.kgrm_pric as kgrm_pric2		")
			.where("      , a.uper_seqn      , c.cstm_name      , a.last_yorn      , c.cstm_code					")
			.where("      , date_format(a.updt_dttm,'%Y-%m-%d') as chag_date       , a.user_memo					")
			.where("      , a.befr_tons_pric , a.befr_kgrm_pric														")
			.where("from    pper_pric a																				")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("where   1=1																						")
			.where("and     a.pper_idcd   = :pper_idcd       " , arg.getParamText("pper_idcd"))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by a.line_seqn																			")
			.where(") a																								")

		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getPricLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
		.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.cstm_idcd      , a.line_seqn      , a.dlvy_drtr_name , a.trnt_mean_dvcd					")
			.query("      , a.dlvy_tele_numb , a.dlvy_hdph_numb , a.dlvy_faxi_numb , a.dlvy_mail_addr 					")
			.query("      , a.dlvy_zpcd      , a.dlvy_addr_1fst , a.dlvy_addr_2snd , a.dlvy_remk_text					")
			.query("      , a.rpst_drtr_yorn , a.dlvy_lcal_dvcd															")
		;
		data.param //퀴리문
			.where("from    cstm_deli a																					")
			.where("where   1=1																							")
			.where("and     a.cstm_idcd   = :cstm_idcd       " , arg.getParamText("cstm_idcd") )
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return data.selectForMap(page, rows, (page == 1));
	}

	// 이전단가 조회
	public SqlResultMap getCstmPric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(tons_pric,0) as tons_pric			")
			.query("     , ifnull(kgrm_pric,0) as kgrm_pric			")
			.where("from  pper_pric									")
			.where("where 1=1										")
			.where("and   last_yorn = 1								")
			.where("and   pper_idcd = :pper_idcd", arg.fixParameter("pper_idcd"))
			.where("and   cstm_idcd = :cstm_idcd", arg.fixParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}


}
