package com.sky.system.mobile.mMoldmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;


@Service
public class MmoldMastService {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param // 조회
			.query("select *																								")
		;
		data.param // 조회
			.where("from (																									")
			.where("select																									")
			.where("        a.mold_idcd      , a.mold_code      , a.mold_name      , a.mold_spec							")
			.where("      , a.item_idcd      , a.make_natn_idcd , a.make_cmpy_name , a.make_date							")
			.where("      , a.puch_cstm_idcd ,a.puch_cstm_name																")
			.where("      , a.vend_tele_numb , a.afsv_tele_numb , a.mchn_numb      , a.puch_date      ,a.cvic_usge			")
			.where("      , a.puch_amnt      , a.cavity         , a.mold_edtn_numb , a.dsig_shot      ,a.init_shot			")
			.where("      , a.work_shot      , a.totl_shot      , a.updt_expc_shot , a.updt_expc_date ,a.mold_stat_dvcd		")
			.where("      , a.egrv_numb      , a.rcpt_cmpy_name , a.mtrl_bacd      , a.mtrl_bacd_2snd ,a.mold_grad_bacd		")
			.where("      , a.mold_grad_bacd_2snd , a.norm_yorn      , a.ejac_mchn      , a.runr_wigt      ,a.prod_wigt		")
			.where("      , a.cycl_time      , a.dsse_date      , a.dsse_resn      , a.owne_riht							")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      ,a.line_levl								")
			.where("      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name      ,a.updt_user_name		")
			.where("      , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      ,a.crte_user_name		")
			.where("      , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif							")
			.where("      , i.item_name      , i.item_spec																	")
			.where("from    mold_mast a																						")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd										")
			.where("where   1=1																								")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name")								)
			.where("and     a.mold_idcd   = :mold_idcd       " , arg.getParamText("mold_idcd")								)
			.where("and     a.mold_code   = :mold_code       " , arg.getParamText("mold_code")								)
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																										")
		;
		return data.selectForMap();
	}
	public SqlResultMap getShot(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		data.param // 집계문
			.total("select count(1) as maxsize																			")
		;
		data.param // 조회
			.query("select *																							")
		;
		data.param // 조회
			.where("from (																								")
			.where("select																								")
			.where("		a.mold_idcd	     , a.line_seqn      , a.invc_numb      , a.line_seqn      ,a.item_idcd		")
			.where("	  , a.cvic_idcd																					")
			.where("	  , a.cavity         , a.work_shot      , a.updt_shot      , a.totl_shot      ,a.user_memo		")
			.where("	  , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr      ,a.line_stat		")
			.where("	  , a.line_clos      , a.find_name      , a.updt_user_name , a.updt_ipad      ,a.updt_dttm		")
			.where("	  , a.updt_idcd      , a.updt_urif      , a.crte_user_name , a.crte_ipad      ,a.crte_dttm		")
			.where("	  , a.crte_idcd      , a.crte_urif																")
			.where("	  , m.mold_idcd      , m.mold_code      , m.mold_name      , m.mold_spec      ,m.cvic_idcd		")
			.where("	  , m.item_idcd      , m.make_natn_idcd , m.make_cmpy_name , m.puch_cstm_idcd ,m.puch_cstm_name	")
			.where("	  , m.vend_tele_numb , m.afsv_tele_numb , m.mchn_numb      , m.puch_date      ,m.cvic_usge		")
			.where("	  , m.puch_amnt      , m.cavity         , m.mold_edtn_numb , m.dsig_shot      ,m.init_shot		")
			.where("	  , m.work_shot      , m.totl_shot      , m.updt_expc_shot , m.updt_expc_date ,m.mold_stat_dvcd	")
			.where("	  , m.egrv_numb      , m.rcpt_cmpy_name , m.mtrl_bacd      , m.mtrl_bacd_2snd ,m.mold_grad_bacd		")
			.where("	  , m.mold_grad_bacd_2snd , m.norm_yorn      , m.ejac_mchn      , m.runr_wigt      ,m.prod_wigt		")
			.where("	  , m.cycl_time      , m.dsse_date      , m.dsse_resn      , m.owne_riht      ,m.imge_1fst		")
			.where("from	mold_shot a																					")
			.where("		left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("where   1=1																							")
			.where("and	 a.find_name   like %:find_name% " , arg.getParamText("find_name")								)
			.where("and	 a.mold_idcd   = :mold_idcd      " , arg.getParamText("mold_idcd")								)
			.where("and	 a.mold_code   = :mold_code      " , arg.getParamText("mold_code")								)
			.where("and	 a.line_stat   = :line_stat1     " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and	 a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getRepa(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param // 조회
			.query("select *																							")
		;
		data.param // 조회
			.where("from (																								")
			.where("select																								")
			.where("        a.mold_idcd      , a.line_seqn      , a.repa_date      , a.repa_cont      ,a.repa_resn		")
			.where("      , a.repa_entr_name , a.repa_need_time , a.need_amnt      , a.init_shot      ,a.updt_expc_shot	")
			.where("      , a.updt_expc_date , a.user_memo      , a.sysm_memo      , a.prnt_idcd      ,a.line_levl		")
			.where("      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name      ,a.updt_user_name	")
			.where("      , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      ,a.crte_user_name	")
			.where("      , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif						")
			.where("      , m.mold_code      , m.mold_name      , m.mold_spec      										")
			.where("      , m.item_idcd      , m.make_natn_idcd , m.make_cmpy_name , m.puch_cstm_idcd ,m.puch_cstm_name	")
			.where("      , m.vend_tele_numb , m.afsv_tele_numb , m.mchn_numb      , m.puch_date      ,m.cvic_usge		")
			.where("      , m.puch_amnt      , m.cavity         , m.mold_edtn_numb , m.dsig_shot      					")
			.where("      , m.work_shot      , m.totl_shot      , m.mold_stat_dvcd , m.stor_plac						")
			.where("      , m.egrv_numb      , m.rcpt_cmpy_name , m.mtrl_bacd      , m.mtrl_bacd_2snd ,m.mold_grad_bacd	")
			.where("      , m.mold_grad_bacd_2snd , m.norm_yorn , m.ejac_mchn      , m.runr_wigt      ,m.prod_wigt		")
			.where("      , m.cycl_time      , m.dsse_date      , m.dsse_resn      , m.owne_riht      ,m.imge_1fst		")
			.where("from    mold_repa a																					")
			.where("        left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("where   1=1																							")
			.where("and     a.find_name   like %:find_name% " , arg.getParamText("find_name")							)
			.where("and     a.mold_idcd   = :mold_idcd      " , arg.getParamText("mold_idcd")							)
			.where("and     m.mold_code   = :mold_code      " , arg.getParamText("mold_code")							)
			.where("and     a.line_stat   = :line_stat1     " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		return data.selectForMap();
	}
	public SqlResultMap getMove(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		data.param // 집계문
			.total("select count(1) as maxsize																			")
		;
		data.param // 조회
			.query("select *																							")
		;
		data.param // 조회
			.where("from (																								")
			.where("select																								")
			.where("        a.mold_idcd      , a.line_seqn      , a.move_date      , a.move_loct_dvcd ,a.move_loct_name	")
			.where("      , a.move_purp_dvcd , a.move_memo      , a.befr_loct_dvcd , a.befr_loct_name ,a.last_yorn		")
			.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd      , a.line_levl      ,a.line_ordr		")
			.where("      , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name ,a.updt_ipad		")
			.where("      , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name ,a.crte_ipad		")
			.where("      , a.crte_dttm      , a.crte_idcd      , a.crte_urif											")
			.where("      , m.mold_code      , m.mold_name																")
			.where("from    mold_move a																					")
			.where("        left outer join mold_mast m on a.mold_idcd = m.mold_idcd									")
			.where("where   1=1																							")
			.where("and     a.find_name   like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     m.mold_code   = :mold_code       " , arg.getParamText("mold_code") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a																									")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_mast"														)
					.where("where mold_idcd       = :mold_idcd								")  /*  금형ID  */
					//
					.unique("mold_idcd" 			, row.fixParameter("mold_idcd")			)
					.update("line_stat"				, '2'									)
				;
				data.attach(Action.update);

			} else {
				data.param
					.table("mold_mast"														)
					.where("where mold_idcd		= :mold_idcd                             ")  /*  금형ID  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"           ))
					//
					.update("mold_code"			, row.getParameter("mold_code"           ))  /*  금형코드  */
					.update("mold_name"			, row.getParameter("mold_name"           ))  /*  금형명  */
					.update("mold_spec"			, row.getParameter("mold_spec"           ))  /*  금형규격  */
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"           ))  /*  설비ID  */
					.update("item_idcd"			, row.getParameter("item_idcd"           ))  /*  품목ID  */
					.update("make_natn_idcd"	, row.getParameter("make_natn_idcd"      ))  /*  제조국가ID  */
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"      ))  /*  제조회사명  */
					.update("make_date"			, row.getParameter("make_date"           ))  /*  제조회사명  */
					.update("puch_cstm_idcd"	, row.getParameter("puch_cstm_idcd"      ))  /*  구매거래처ID  */
					.update("puch_cstm_name"	, row.getParameter("puch_cstm_name"      ))  /*  구매거래처명  */
					.update("vend_tele_numb"	, row.getParameter("vend_tele_numb"      ))  /*  구매처전화번호  */
					.update("afsv_tele_numb"	, row.getParameter("afsv_tele_numb"      ))  /*  AS전화번호  */
					.update("mchn_numb"			, row.getParameter("mchn_numb"           ))  /*  기기번호  */
					.update("puch_date"			, row.getParameter("puch_date"           ))  /*  구매일자  */
					.update("cvic_usge"			, row.getParameter("cvic_usge"           ))  /*  설비용도  */
					.update("puch_amnt"			, row.getParameter("puch_amnt"           ))  /*  구매금액  */
					.update("cavity"			, row.getParameter("cavity"              ))  /*  CAVITY  */
					.update("mold_edtn_numb"	, row.getParameter("mold_edtn_numb"      ))  /*  금형판개수  */
					.update("dsig_shot"			, row.getParameter("dsig_shot"           ))  /*  설계SHOT  */
					.update("init_shot"			, row.getParameter("init_shot"           ))  /*  초기SHOT  */
					.update("work_shot"			, row.getParameter("work_shot"           ))  /*  작업SHOT  */
					.update("totl_shot"			, row.getParameter("totl_shot"           ))  /*  누계SHOT  */
					.update("updt_expc_shot"	, row.getParameter("updt_expc_shot"      ))  /*  수정예상SHOT  */
					.update("updt_expc_date"	, row.getParameter("updt_expc_date"      ))  /*  수정예상일자  */
					.update("mold_stat_dvcd"	, row.getParameter("mold_stat_dvcd"      ))  /*  금형상태구분코드  */
					.update("egrv_numb"			, row.getParameter("egrv_numb"           ))  /*  각인번호  */
					.update("rcpt_cmpy_name"	, row.getParameter("rcpt_cmpy_name"      ))  /*  인수업체명  */
					.update("mtrl_bacd"			, row.getParameter("mtrl_bacd"           ))  /*  재질구분코드  */
					.update("mtrl_bacd_2snd"	, row.getParameter("mtrl_bacd_2snd"      ))  /*  재질구분코드2  */
					.update("mold_grad_bacd"	, row.getParameter("mold_grad_bacd"      ))  /*  등급구분코드  */
					.update("mold_grad_bacd_2snd", row.getParameter("mold_grad_bacd_2snd"))  /*  등급구분코드2  */
					.update("norm_yorn"			, row.getParameter("norm_yorn"           ))  /*  양산여부  */
					.update("ejac_mchn"			, row.getParameter("ejac_mchn"           ))  /*  사출기기  */
					.update("runr_wigt"			, row.getParameter("runr_wigt"           ))  /*  런너중량  */
					.update("prod_wigt"			, row.getParameter("prod_wigt"           ))  /*  제품중량  */
					.update("cycl_time"			, row.getParameter("cycl_time"           ))  /*  회전시간  */
					.update("dsse_date"			, row.getParameter("dsse_date"           ))  /*  폐기일자  */
					.update("dsse_resn"			, row.getParameter("dsse_resn"           ))  /*  폐기사유  */
					.update("owne_riht"			, row.getParameter("owne_riht"           ))  /*  소유권리  */
					.update("imge_1fst"			, row.getParameter("imge_1fst"           ))  /*  이미지1  */
					.update("imge_2snd"			, row.getParameter("imge_2snd"           ))  /*  이미지2  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("mold_idcd"            ).trim()
												+ row.getParamText("mold_code"            ).trim()
												+ row.getParamText("mold_name"            ).trim()
												+ row.getParamText("mold_spec"            ).trim() )
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
				data.attach(Action.update);
				}
			}
		data.execute();
		return null ;
	}
	/**
	 *
	 */
	public SqlResultMap setShot(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		DataMessage read;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) {
			data = new DataMessage(hq+".POS");
			read = new DataMessage(hq+".POS");
		} else	{
			data = new DataMessage("N1000WINFO.POS");
			read = new DataMessage("N1000WINFO.POS");
		}
		SqlResultRow temp1 ;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_shot"												)
					.where("where mold_idcd		= :mold_idcd						")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn						")  /*  순번  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;
				data.attach(Action.delete);

			} else {
				read.clear();
				read.param
					.query("select	isnull(max(line_seqn),0) + 1  as last_seqn		")
					.query("from    mold_shot  a									")
					.query("where   mold_idcd = :mold_idcdx" , row.fixParameter("mold_idcd"))
				;
				temp1 = read.selectForRow();


				data.param
					.table("mold_shot"												)
					.where("where mold_idcd		= :mold_idcd						")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn						")  /*  순번  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"		))
					.unique("line_seqn"			, temp1.getParamText("last_seqn"	))
					//
					.update("invc_numb"			, row.getParameter("invc_numb"		))  /*  INVOICE번호  */
					.update("invc_date"			, row.getParameter("line_seqn"		))  /*  INVOICE순번  */
					.update("item_idcd"			, row.getParameter("item_idcd"		))  /*  품목ID  */
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"		))  /*  품목ID  */
					.update("cavity"			, row.getParameter("cavity"			))  /*  CAVITY  */
					.update("work_shot"			, row.getParameter("work_shot"		))  /*  작업SHOT  */
					.update("updt_shot"			, row.getParameter("updt_shot"		))  /*  수정SHOT  */
					.update("totl_shot"			, row.getParameter("totl_shot"		))  /*  누계SHOT  */
					.update("user_memo"			, row.getParameter("user_memo"		))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"		))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"		))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"		))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"		))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"		))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"		))  /*  마감여부  */
					.update("find_name"			, row.getParamText("mold_idcd"		).trim()
												+ row.getParamText("invc_date"		).trim()
												+ row.getParamText("invc_numb"		).trim()
												+ row.getParamText("cvic_idcd"		).trim())
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
				data.attach(Action.update);
				}
			}
		data.execute();
		return null ;
	}
	/**
	 *
	 */
	public SqlResultMap setRepa(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		DataMessage read;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) {
			data = new DataMessage(hq+".POS");
			read = new DataMessage(hq+".POS");
		} else	{
			data = new DataMessage("N1000WINFO.POS");
			read = new DataMessage("N1000WINFO.POS");
		}
		SqlResultRow temp1 ;
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_repa"													)
					.where("where mold_idcd		= :mold_idcd							")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;
				data.attach(Action.delete);

			} else {
				read.clear();
				read.param
					.query("select	isnull(max(line_seqn),0) + 1  as last_seqn			")
					.query("from    mold_repa  a										")
					.query("where   mold_idcd = :mold_idcdx" , row.fixParameter("mold_idcd"))
				;
				temp1 = read.selectForRow();

				data.param
					.table("mold_repa"													)
					.where("where mold_idcd		= :mold_idcd							")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"			))
					.unique("line_seqn"			, temp1.getParamText("last_seqn"		))
					//
					.update("repa_date"			, row.getParameter("repa_date"			))  /*  수리일자  */
					.update("repa_cont"			, row.getParameter("repa_cont"			))  /*  수리내용  */
					.update("repa_resn"			, row.getParameter("repa_resn"           ))  /*  수리사유  */
					.update("repa_entr_name"	, row.getParameter("repa_entr_name"      ))  /*  수리업체명  */
					.update("repa_need_time"	, row.getParameter("repa_need_time"      ))  /*  수리소요시간  */
					.update("need_amnt"			, row.getParameter("need_amnt"           ))  /*  소요금액  */
					.update("init_shot"			, row.getParameter("init_shot"           ))  /*  초기SHOT  */
					.update("updt_expc_shot"	, row.getParameter("updt_expc_shot"      ))  /*  수정예상SHOT  */
					.update("updt_expc_date"	, row.getParameter("updt_expc_date"      ))  /*  수정예상일자  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("mold_idcd"           ).trim()
												+ row.getParamText("repa_date"           ).trim()
												+ row.getParamText("repa_resn"           ).trim()
												+ row.getParamText("repa_cont"           ).trim())
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
				data.attach(Action.insert);
				}
			}
		data.execute();
		return null ;
	}
	/**
	 *
	 */
	public SqlResultMap setMove(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = new DataMessage("N1000WINFO.POS");}
		int    seq			= 0;
		SqlResultRow inv;


		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("mold_move													")
					.where("where mold_idcd		= :mold_idcd							")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
					//
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(Action.delete);

			} else {
				if ("".equals(row.getParamText("line_seqn").trim())) {
					data.clear();
					data.param
						.query("select isnull(max(line_seqn),0)+ 1 as last_seq		")
						.query("from   mold_move									")
						.query("where  mold_idcd  = :mold_idcd1  " , row.fixParameter("mold_idcd"   ))
					;
					inv = data.selectForRow();
					if (inv != null) {
						seq = Integer.parseInt(inv.getParamText("last_seq"  ));
					} else {
						seq =1;
					}
				} else {
					seq = Integer.parseInt(row.getParamText("line_seqn"));
			}
				data.clear();
				data.param
					.table("mold_move													")
					.where("where mold_idcd		= :mold_idcd							")  /*  금형ID  */
					.where("and   line_seqn		= :line_seqn							")  /*  순번  */
				    //
					.unique("mold_idcd"			, row.fixParameter("mold_idcd"			))
					.unique("line_seqn"			, seq									)
				    //
					.update("move_date"			, row.getParameter("move_date"			))  /*  이동일자  */
					.update("move_loct_dvcd"	, row.getParameter("move_loct_dvcd"		))  /*  이동장소구분코드  */
					.update("move_loct_name"	, row.getParameter("move_loct_name"		))  /*  이동장소명  */
					.update("move_purp_dvcd"	, row.getParameter("move_purp_dvcd"		))  /*  이동목적구분코드  */
					.update("move_memo"			, row.getParameter("move_memo"			))  /*  이동메모  */
					.update("befr_loct_dvcd"	, row.getParameter("befr_loct_dvcd"		))  /*  전장소구분코드  */
					.update("befr_loct_name"	, row.getParameter("befr_loct_name"		))  /*  전장소명  */
					.update("last_yorn"			, row.getParameter("last_yorn"			))  /*  최종여부  */
					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("mold_idcd"			).trim()
												+ row.getParamText("move_date"			).trim()
												+ row.getParamText("move_loct_name"		).trim()
												)
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(rowaction);
				}
			}
		data.execute();
		return null ;
	}


}
