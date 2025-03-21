package com.sky.system.custom.iypkg.item.asmtmast;

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
public class AsmtMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select    a.asmt_idcd, a.asmt_code, a.asmt_name												")
			.query("		, a.asmt_spec, a.stnd_pric, a.asmt_dvcd												")
			.query("		, b.unit_name, c.cstm_name, c.cstm_idcd												")
			.query("		, a.unit_idcd, a.mngt_numb, d.prod_name												")
			.query("		, a.asmt_usge, a.prod_idcd, a.sale_cstm_idcd										")
		;
		data.param
			.where("from asmt_mast a																			")
			.where("left outer join unit_mast    b on a.unit_idcd = b.unit_idcd									")
			.where("left outer join cstm_mast    c on a.sale_cstm_idcd = c.cstm_idcd							")
			.where("left outer join product_mast d on a.prod_idcd = d.prod_idcd									")
			.where("where  1=1																					")
			.where("and    a.asmt_dvcd   = :asmt_dvcd				"	, arg.getParamText("asmt_dvcd"))
			.where("and    c.cstm_idcd   = :cstm_idcd				"	, arg.getParameter("cstm_idcd"))
			.where("and    c.cstm_code   = :cstm_code				"	, arg.getParameter("cstm_code"))
			.where("and    d.prod_idcd   = :prod_idcd				"	, arg.getParameter("prod_idcd"))

			.where("and    a.find_name   like %:find_name%			" , arg.getParamText("find_name"))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by asmt_idcd																			")
		;

		return data.selectForMap();
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select  a.asmt_idcd      , a.asmt_code      , a.asmt_name      , a.asmt_spec		")
			.where("      , a.asmt_dvcd      , a.unit_idcd      , a.stnd_pric      , a.sale_cstm_idcd	")
			.where("      , a.prod_idcd      , a.prod_leng      , a.prod_widh      , a.prod_hght		")
			.where("      , a.used_cstm_idcd , a.mngt_numb      , a.asmt_regi_dvcd , a.asmt_usge		")
			.where("      , u.unit_name																	")
			.where("      , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo		")
			.where("      , a.prnt_idcd      , a.line_levl      , a.line_ordr      , a.line_stat		")
			.where("      , a.line_clos      , a.find_name      , a.updt_user_name , a.updt_ipad		")
			.where("      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name	")
			.where("      , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
			.where("from    asmt_mast a																	")
			.where("   left outer join unit_mast u on a.unit_idcd = u.unit_idcd							")
			.where("where   1=1																			")
			.where("and     a.asmt_dvcd  = :asmt_dvcd			" , arg.getParamText("asmt_dvcd"))
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where(") a																					")
			.where("order by asmt_code																	")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// 디테일 조회
	public SqlResultMap getAsmtpric(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize																	")
		;

		data.param
			.query("select    a.asmt_idcd, b.cstm_code, b.cstm_name												")
			.query("		, a.puch_pric, a.adpt_date, a.updt_dttm												")
			.query("		, a.find_name, a.befr_pric, b.cstm_name												")
			.query("		, d.unit_name, c.asmt_dvcd, a.line_seqn												")
			.query("		, a.cstm_idcd, a.unit_idcd															")
		;

		data.param
			.where("from asmt_pric a																			")
			.where("left outer join cstm_mast b on a.cstm_idcd=b.cstm_idcd										")
			.where("left outer join asmt_mast c on a.asmt_idcd=c.asmt_idcd										")
			.where("left outer join unit_mast d on a.unit_idcd=d.unit_idcd										")
			.where("where  1=1																					")
			.where("and    a.asmt_idcd   = :asmt_idcd				" , arg.getParamText("asmt_idcd" ))
			.where("and    a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))
			.where("and    a.line_stat   < :line_stat				" , "2" , "".equals(arg.getParamText("line_stat")))
		;

		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// 저장
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			data.param
				.table("asmt_mast"													)
				.where("where asmt_idcd		= :asmt_idcd							")	//부자재ID
				//
				.unique("asmt_idcd"			, row.fixParameter("asmt_idcd"			))
				//
				.unique("asmt_code"			, row.fixParameter("asmt_code"			))	//부자재코드
				.update("asmt_name"			, row.getParameter("asmt_name"			))	//부자재명
				.update("asmt_spec"			, row.getParameter("asmt_spec"			))	//부자재규격
				.update("asmt_dvcd"			, row.getParameter("asmt_dvcd"			))	//부자재구분코드
				.update("unit_idcd"			, row.getParameter("unit_idcd"			))	//단위ID
				.update("stnd_pric"			, row.getParameter("stnd_pric"			))	//표준단가
				.update("sale_cstm_idcd"	, row.getParameter("cstm_idcd"			))	//매출거래처ID
				.update("prod_idcd"			, row.getParameter("prod_idcd"			))	//제품ID
				.update("used_cstm_idcd"	, row.getParameter("used_cstm_idcd"		))	//사용거래처ID
				.update("mngt_numb"			, row.getParameter("mngt_numb"			))	//관리번호
				.update("asmt_usge"			, row.getParameter("asmt_usge"			))	//용도
			;

			data.param
				.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
				.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
				.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
				.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
				.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
				.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
				.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
				.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
				.update("find_name"			, row.getParamText("asmt_code"			).trim()
											+ " "
											+ row.getParamText("asmt_name"			).trim() )	//찾기명

				.update("updt_user_name"	, row.getParameter("updt_user_name"		))	//수정사용자명
				.update("updt_ipad"			, row.getParameter("updt_ipad"			))	//수정IP
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//수정일시
				.update("updt_idcd"			, row.getParameter("updt_idcd"			))	//수정ID
				.update("updt_urif"			, row.getParameter("updt_urif"			))	//수정UI
				.insert("crte_user_name"	, row.getParameter("crte_user_name"		))	//생성사용자명
				.insert("crte_ipad"			, row.getParameter("crte_ipad"			))	//생성IP
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )	//생성일시
				.insert("crte_idcd"			, row.getParameter("crte_idcd"			))	//생성ID
				.insert("crte_urif"			, row.getParameter("crte_urif"			))	//생성UI
			;
			data.attach(Action.modify);
			data.execute();
			data.clear();
		}
		return null ;
	}

	//부자재발주관리에서 코드추가
	public SqlResultMap setSimple(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("asmt_mast"													)
			.where("where asmt_idcd		= :asmt_idcd							")	//부자재ID
			//
			.unique("asmt_idcd"			, arg.fixParameter("asmt_idcd"			))
			//
			.unique("asmt_code"			, arg.fixParameter("asmt_code"			))	//부자재코드
			.update("asmt_name"			, arg.getParameter("asmt_name"			))	//부자재명
			.update("asmt_spec"			, arg.getParameter("asmt_spec"			))	//부자재규격
			.update("asmt_dvcd"			, arg.getParameter("asmt_dvcd"			))	//부자재구분코드
			.update("unit_idcd"			, arg.getParameter("unit_idcd"			))	//단위ID
			.update("stnd_pric"			, arg.getParameter("stnd_pric"			))	//표준단가
			.update("sale_cstm_idcd"	, arg.getParameter("cstm_idcd"			))	//매출거래처ID
			.update("prod_idcd"			, arg.getParameter("item_idcd"			))	//제품ID
			.update("used_cstm_idcd"	, arg.getParameter("used_cstm_idcd"		))	//사용거래처ID
			.update("mngt_numb"			, arg.getParameter("mngt_numb"			))	//관리번호
			.update("asmt_usge"			, arg.getParameter("asmt_usge"			))	//용도
		;
		data.param
			.update("uper_seqn"			, arg.getParameter("uper_seqn"			))	//상위순번
			.update("disp_seqn"			, arg.getParameter("disp_seqn"			))	//표시순번
			.update("user_memo"			, arg.getParameter("user_memo"			))	//사용자메모
			.update("sysm_memo"			, arg.getParameter("sysm_memo"			))	//시스템메모
			.update("prnt_idcd"			, arg.getParameter("prnt_idcd"			))	//부모ID
			.update("line_levl"			, arg.getParameter("line_levl"			))	//ROW레벨
			.update("line_ordr"			, arg.getParameter("line_ordr"			))	//ROW순서
			.update("line_stat"			, arg.getParameter("line_stat"			))	//ROW상태
			.update("line_clos"			, arg.getParameter("line_clos"			))	//ROW마감
			.update("find_name"			, arg.getParamText("asmt_code"			).trim()
										+ " "
										+ arg.getParamText("asmt_name"			).trim() )	//찾기명
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
		data.attach(Action.insert);
		data.execute();
		data.clear();

		return null;
	}

	// 디테일 저장
	public SqlResultMap setAsmtpric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("asmt_pric"													)
					.where("where asmt_idcd		= :asmt_idcd							")	//부자재ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("asmt_idcd"			, row.fixParameter("asmt_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))

					;
				data.attach(Action.delete);
			}else{
				data.param
					.table("asmt_pric"													)
					.where("where asmt_idcd		= :asmt_idcd							")	//부자재ID
					.where("and   line_seqn		= :line_seqn							")	//순번
					//
					.unique("asmt_idcd"			, row.fixParameter("asmt_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))	//거래처ID
					.update("puch_pric"			, row.getParameter("puch_pric"			))	//구매단가
					.update("unit_idcd"			, row.getParameter("unit_idcd"			))	//단위ID
					.update("adpt_date"			, row.getParameter("adpt_date"			))	//적용일자
					.update("uper_seqn"			, row.getParameter("uper_seqn"			))	//상위순번
					.update("disp_seqn"			, row.getParameter("disp_seqn"			))	//표시순번
					.update("befr_pric"			, row.getParameter("befr_pric"			))	//전단가
				;
				data.param
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
				data.attach(Action.modify);
			}
		}

		data.execute();
		data.clear();

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			data.param
				.table("asmt_pric"													)
				.where("where asmt_idcd		= :asmt_idcd							")  /*  부자재ID    */
				.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
				//
				.unique("asmt_idcd"			, row.fixParameter("asmt_idcd"			))
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
				.query("update asmt_pric									")
				.query("set last_yorn = '1'									")
				.query("where asmt_idcd = :asmt_idcd" , row.getParamText("asmt_idcd"))
				.query("and   cstm_idcd = :cstm_idcd" , row.getParamText("cstm_idcd"))
				.query("and line_seqn = (select ifnull(max(line_seqn),1)	")
				.query("                 from asmt_pric						")
				.query("                 where asmt_idcd = :asmt_idcd2 ", row.getParamText("asmt_idcd"))
				.query("                 and cstm_idcd   = :cstm_idcd2 ", row.getParamText("cstm_idcd"))
				.query(" )	")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}


		return null;
	}

	// 삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("asmt_mast")
			.where("where asmt_idcd = :asmt_idcd ")
			//
			.unique("asmt_idcd"		, arg.fixParameter("asmt_idcd"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();

		data.param
			.table("asmt_pric")
			.where("where asmt_idcd = :asmt_idcd ")
			//
			.unique("asmt_idcd"		, arg.fixParameter("asmt_idcd"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
	}

	// 이전단가 조회
	public SqlResultMap getCstmPric(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select ifnull(puch_pric,0) as puch_pric			")
			.where("from  asmt_pric									")
			.where("where 1=1										")
			.where("and   last_yorn = 1								")
			.where("and   asmt_idcd = :asmt_idcd", arg.fixParameter("asmt_idcd"))
			.where("and   cstm_idcd = :cstm_idcd", arg.fixParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}

}
