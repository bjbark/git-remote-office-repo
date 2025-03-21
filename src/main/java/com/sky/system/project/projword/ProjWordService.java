package com.sky.system.project.projword;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;


@Service
public class ProjWordService extends DefaultServiceHandler{

	/**
	 *
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize														")
		;
		data.param
			.query("select *																			")
		;
		data.param
			.where("from (																				")
			.where("select  a.word_idcd       , a.hqof_idcd      , a.word_code      , a.word_name		")
			.where("      , a.word_dvcd       , a.locl_yorn												")
			.where("      , a.word_eglh_name  , a.word_chna_name , a.word_jpan_name , a.word_etcc_name	")
			.where("      , a.user_memo       , a.sysm_memo      , a.prnt_idcd							")
			.where("      , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos		")
			.where("      , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm		")
			.where("      , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad		")
			.where("      , a.crte_dttm       , a.crte_idcd      , a.crte_urif							")
			.where("from   word_mast a																	")
			.where("where  1 = 1																		")
			.where("and    a.hqof_idcd = :hqof_idcd		 "  , arg.getParameter("hqof_idcd" ))
			.where("and    a.find_name like %:find_name% "  , arg.getParameter("find_name" ))
			.where("and    a.line_stat = :line_stat      "  , arg.getParamText("line_stat" ), !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat < :line_stat      "  , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where(") a 																				")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.query("delete from word_mast											")
					.query("where word_idcd		= :word_idcd " , row.getParameter("word_idcd"))
					.query("and   hqof_idcd		= :hqof_idcd " , row.fixParameter("hqof_idcd"))
				;
				data.attach(Action.direct);
				data.execute();
			} else {
				data.param
					.table("word_mast													")
					.where("where word_idcd		= :word_idcd							")	/*  단어ID  */
					.where("and   hqof_idcd		= :hqof_idcd							")	/*  본사  */
					//
					.unique("word_idcd"			, row.fixParameter("word_idcd"			))
					.unique("hqof_idcd"			, row.getParameter("hqof_idcd"			))	/*  본사코드  */
					//
					.update("word_code"			, row.fixParameter("word_code"			))	/*  단어코드  */
					.update("word_name"			, row.getParameter("word_name"			))	/*  단어명  */
					.update("word_dvcd"			, row.getParameter("word_dvcd"			))	/*  단어구분  */
					.update("word_eglh_name"	, row.getParameter("word_eglh_name"		))	/*  영어  */
					.update("word_chna_name"	, row.getParameter("word_chna_name"		))	/*  중국어  */
					.update("word_jpan_name"	, row.getParameter("word_jpan_name"		))	/*  일어  */
					.update("word_etcc_name"	, row.getParameter("word_etcc_name"		))	/*  기타  */
					.update("locl_yorn"			, row.getParameter("locl_yorn"			))	/*  로컬 단어여부 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.update("line_stat"			, row.getParameter("line_stat"			))
					.update("user_memo"			, row.getParameter("user_memo"			))
					.update("find_name"			, row.getParamText("word_code"			).trim()
												+ row.getParamText("word_name"			).trim()
												+ row.getParamText("hqof_idcd"			).trim())
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.action = rowaction ;
				data.attach();
			}
			data.execute();
		}
		return null ;
	}
	public SqlResultMap setWordCopy(HttpRequestArgument arg) throws Exception {
	/**
	 *  관제 시스템에 등록된 단어 목록을 고객 서버 단어 정보에 등록한다.
	 *  이때 고객의 서버는 물리적으로 다른 서버에 설치되어 있어도 무관하다.
	 *  등록전 고객 서버에 이미 등록된 단어는 모두 지우고 다시 Insert 한다.(관제 단어정보가 최종이며, 단어의 수정 작업은 모두 관제 시스템에서 이루어 진다.)
	 */
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.param
			.query("delete from word_mast																			")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();

		sql.param
			.query("select a.word_idcd      , a.hqof_idcd      , a.word_code      , a.word_name						")
			.query("     , a.word_dvcd      , a.word_eglh_name , a.word_chna_name , a.word_jpan_name				")
			.query("     , a.word_etcc_name , a.locl_yorn															")
			.query("     , a.user_memo      , a.sysm_memo      , a.prnt_idcd										")
			.query("     , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos						")
			.query("     , a.find_name																				")
			.query("     , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif	")
			.query("     , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif	")
			.query("from   word_mast a																				")
			.query("where  1=1																						")
			.query("and    a.hqof_idcd = :hq_id " ,  arg.getParamText("hqof_idcd" ))
			.query("union all																						")
			.query("select a.word_idcd      , a.hqof_idcd      , a.word_code      , a.word_name						")
			.query("     , a.word_dvcd      , a.word_eglh_name , a.word_chna_name , a.word_jpan_name				")
			.query("     , a.word_etcc_name , locl_yorn																")
			.query("     , a.user_memo      , a.sysm_memo      , a.prnt_idcd										")
			.query("     , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos						")
			.query("     , a.find_name																				")
			.query("     , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif	")
			.query("     , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif	")
			.query("from   word_mast a																				")
			.query("where  1=1																						")
			.query("and    a.hqof_idcd = 'common'																	")
			.query("and    a.word_idcd not in (select word_idcd														")
			.query("                            from   word_mast													")
			.query("                            where  hqof_idcd = :hq_id2 " ,  arg.getParamText("hqof_idcd" ))
			.query("                           )																	")
		;
		SqlResultMap map1 = sql.selectForMap();
		if (map1.size() > 0) {
			for(SqlResultRow row:map1){
				data.param
					.table("word_mast													")
					.where("where word_idcd		= :word_idcd							")	/*  단어ID  */
					.where("and   hqof_idcd		= :hqof_idcd							")	/*  본사       */
					//
					.unique("word_idcd"			, row.fixParameter("word_idcd"			))
					.unique("hqof_idcd"			, arg.getParamText("hqof_idcd" ))
					//
					.update("word_code"			, row.fixParameter("word_code"			))	/*  단어코드  */
					.update("word_name"			, row.getParameter("word_name"			))	/*  단어명  */
					.update("word_dvcd"			, row.getParameter("word_dvcd"			))	/*  단어구분  */
					.update("word_eglh_name"	, row.getParameter("word_eglh_name"		))	/*  영어  */
					.update("word_chna_name"	, row.getParameter("word_chna_name"		))	/*  중국어  */
					.update("word_jpan_name"	, row.getParameter("word_jpan_name"		))	/*  일어  */
					.update("word_etcc_name"	, row.getParameter("word_etcc_name"		))	/*  기타  */
					.update("locl_yorn"			, row.getParameter("locl_yorn"			))	/*  로컬 단어 여부 */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))
					.update("line_stat"			, row.getParameter("line_stat"			))
					.update("user_memo"			, row.getParameter("user_memo"			))
					.update("find_name"			, row.getParamText("word_code"			).trim()
												+ row.getParamText("word_name"			).trim()
												+ row.getParamText("hqof_idcd"			).trim())
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.modify);
			}
			data.execute();
		}
		return null;
	}
	public SqlResultMap setWordMake(HttpRequestArgument arg) throws Exception {
	/**
	 *   << 고객별 공통 단어 적용 >>
	 *  관제 시스템내에서 처리한다.
	 *  고객별 공통 사용 단어를 삭제한다.
	 *  공통으로 사용하는 단어를 고객별 단어 목록에 추가한다.
	 */
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
		sql.clear();
		sql.param
			.query("delete from word_mast																	")
			.query("where  hqof_idcd = :hqof_idcd3 " ,  arg.getParamText("hqof_idcd" ))
			.query("and    ifnull(locl_yorn, '0') = '0'														")
		;
		sql.attach(Action.direct);
		sql.execute();
		sql.clear();
		sql.param
			.query("insert into word_mast																	")
			.query("     ( word_idcd      , hqof_idcd      , word_code      , word_name						")
			.query("     , word_dvcd      , word_eglh_name , word_chna_name , word_jpan_name				")
			.query("     , word_etcc_name , locl_yorn														")
			.query("     , user_memo      , sysm_memo      , prnt_idcd										")
			.query("     , line_levl      , line_ordr      , line_stat      , line_clos						")
			.query("     , find_name																		")
			.query("     , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif	")
			.query("     , crte_user_name , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif	")
			.query("     )																					")
			.query("select 																					")
			.query("       word_idcd      , :hqof_idcd2    " ,  arg.getParamText("hqof_idcd" ))
			.query("     , word_code      , word_name														")
			.query("     , word_dvcd      , word_eglh_name , word_chna_name , word_jpan_name				")
			.query("     , word_etcc_name , locl_yorn														")
			.query("     , user_memo      , sysm_memo      , prnt_idcd										")
			.query("     , line_levl      , line_ordr      , line_stat      , line_clos						")
			.query("     , find_name																		")
			.query("     , updt_user_name , updt_ipad      , updt_dttm      , updt_idcd      , updt_urif	")
			.query("     , crte_user_name , crte_ipad      , crte_dttm      , crte_idcd      , crte_urif	")
			.query("from   word_mast																		")
			.query("where  1=1																				")
			.query("and    hqof_idcd = 'common'																")
			.query("and    word_idcd not in (select word_idcd 												")
			.query("                         from   word_mast 												")
			.query("                         where  hqof_idcd = :hqof_idcd3 " ,  arg.getParamText("hqof_idcd" ))
			.query("                        )																")
		;
		sql.attach(Action.direct);
		sql.execute();
		return null;
	}
	public SqlResultMap setWordAllCopy(HttpRequestArgument arg) throws Exception {
	/**
	 *  DB에 등록된 필드를 이용하여 단어 목록을 만든다...(DB --> word_mast)
	 */
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);

		sql.param
			.query("call word_all_copy()				")
		;
		sql.attach(Action.direct);
		sql.execute();
		return null;
	}
	public SqlResultMap setWordCreate(HttpRequestArgument arg) throws Exception {
	/**
	 *  DB에 등록된 필드를 이용하여 단어 목록을 만든다...(DB --> word_mast)
	 */
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);

		sql.param
			.query("call word_create( 'wismes')			")
		;
		sql.attach(Action.direct);
		sql.execute();
		return null;
	}

}
