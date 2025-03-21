package com.sky.system.cust.cstmclass;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;




//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class CstmClassService extends DefaultServiceHandler{
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize											")
		;
		data.param
			.query("select a.*																")
		;
		data.param
			.where("from (																	")
			.where("select a.clss_idcd  , a.clss_code     , a.clss_name  , clss_code_numb	")
			.where("     , a.clss_desc  , a.code_issu_key , a.code_leng						")
			.where("     , a.line_levl  , a.prnt_idcd										")
			.where("     , a.user_memo  , a.line_stat										")
			.where("from   cstm_clss a														")
			.where("where  1=1																")
			.where("and    a.prnt_idcd  = :prnt_idcd   " , arg.getParamText("prnt_idcd"		))
			.where("and    a.line_levl  = :line_levl   " , arg.getParamText("line_levl"		))
			.where("and    a.find_name  like %:find_name%   " , arg.getParamText("find_name"))

			.where("and    a.line_stat  = :line_stat   " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and    a.line_stat  < :line_stat   " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order  by a.clss_code													")
			.where(")a																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 상품분류현황
	 */
	public SqlResultMap getSearchExcel(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize															")
		;
		data.param
			.query("select x.clss_idcd , x.clss_code,  x.clss_name											")
			.query("     , concat( x.line_levl ) as class_lv , x.clss_desc , x.line_stat					")
		;
		data.param
			.where("from (																					")
			.where("with recursive cte as (																	")
			.where("    select clss_idcd    , clss_code     , clss_name    , 0 as line_levl 				")
			.where("         , prnt_idcd    , clss_desc     , line_stat										")
			.where("    from   cstm_clss																	")
			.where("    where  ifnull(prnt_idcd,'') = ''													")
			.where("    union all																			")
			.where("    select a.clss_idcd  , a.clss_code   , a.clss_name  , b.line_levl + 1 as line_levl	")
			.where("         , a.prnt_idcd  , a.clss_desc   , a.line_stat									")
			.where("    from   cstm_clss a																	")
			.where("    inner join cte b on a.prnt_idcd = b.clss_idcd 										")
			.where(")																						")
			.where("    select a.clss_idcd  , a.clss_code   , a.clss_name  , a.line_levl 					")
			.where("         , a.line_stat  , a.prnt_idcd	, a.clss_desc									")
			.where("    from   cte a																		")
			.where("           left outer join cstm_clss m on a.prnt_idcd = m.clss_idcd						")
			.where("           left outer join cstm_clss d on a.clss_idcd = d.clss_idcd						")
			.where(") x																						")
			.where("where 1=1																				")
			.where("and   x.line_stat  = :line_stat " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and   x.line_stat  < :line_stat " , "2" , "".equals(arg.getParamText("line_stat" )) )
		;
		return (page == 0 && rows == 0) ? data.selectForMap(sort) : data.selectForMap(page, rows, (page==1), sort );
	}

	/**
	 *
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
		.query("select a.clss_idcd  , a.clss_code     , a.clss_name  , clss_code_numb	")
		.query("     , a.clss_desc  , a.code_issu_key , a.code_leng						")
		.query("     , a.line_levl  , a.prnt_idcd										")
		.query("     , a.user_memo  , a.line_stat										")
	;
	data.param //퀴리문
		.where("from   cstm_clss a														")
		.where("where  1=1																")
		.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
		.where("and    a.prnt_idcd  = :prnt_idcd   " , arg.getParamText("prnt_idcd"		))
		.where("and    a.clss_idcd  = :clss_idcd   " , arg.getParameter("clss_idcd"		))

		.where("and    a.line_stat  = :line_stat   " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
		.where("and    a.line_stat  < :line_stat   " , "2" , "".equals(arg.getParamText("line_stat" )) )
		.where("order  by a.clss_code													")
	;
	return data.selectForMap(page, rows, (page == 1));
}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String provider = "";

		for(SqlResultRow row:map){
			provider = row.fixParameter("provider").toString().trim();
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			//  삭제 인경우
			if (rowaction.equals(Action.delete)){
				data.param
					.query( " update cstm_clss set line_stat = 2												")
					.query( " where clss_idcd in (																")
					.query("with recursive cte as (																")
					.query("    select a.clss_idcd  , a.clss_code , a.clss_name  , a.line_levl , a.prnt_idcd	")
					.query("    from   cstm_clss a																")
					.query("    where  a.clss_idcd = :item1		"	, row.getParameter("clss_idcd"				))
					.query("    union all																		")
					.query("    select a.clss_idcd  , a.clss_code , a.clss_name  , a.line_levl , a.prnt_idcd	")
					.query("    from   cstm_clss a																")
					.query("    inner  join cte b on a.prnt_idcd = b.clss_idcd 									")
					.query(")																					")
					.query("    select a.clss_idcd																")
					.query("    from   cte a																	")
					.query("           left outer join cstm_clss m on a.prnt_idcd = m.clss_idcd					")
					.query("           left outer join cstm_clss d on a.clss_idcd = d.clss_idcd					")
					.query( " )																					")
				;data.attach(Action.direct);
			} else {
				// 등록/수정 인 경우
				data.param
					.table("cstm_clss											")
					.where("where clss_idcd		= :clss_idcd					")
					//
					.unique("clss_idcd"			, row.fixParameter("clss_idcd"	))
					.update("clss_code"			, row.fixParameter("clss_code"	))
					//
					.update("clss_name"			, row.getParameter("clss_name"	))
					.update("clss_desc"			, row.getParameter("clss_desc"	))
					.insert("prnt_idcd"			, row.fixParameter("prnt_idcd"	))
					.insert("clss_code_numb"	, "0")
					.insert("line_levl"			, row.getParameter("line_levl"	))
					.update("user_memo"			, row.getParameter("user_memo"	))
					.update("line_stat"			, row.getParameter("line_stat"	))
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);

				//   품목 분류명을 업데이트 한다.
				if (provider.equals("oracle")) {
					data.param
						.query( " merge into cstm_clss t														")
						.query( " using ( select x.clss_idcd													")
						.query( "              , case when x.parent_ds is null then x.clss_desct else x.parent_ds || ' > ' || x.clss_desct end as clss_desct  " )
						.query( "         from ( select  a.clss_id, SUBSTR( SYS_CONNECT_BY_PATH(clss_nm , ' > ' ),4) AS CLASS_DS   " )
						.query( "                     ,( select clss_desct from cstm_clss where clss_id = :prnt_id ) as parent_ds  " )
						.query( "                from    cstm_clss a											")
						.query( "                start   with a.clss_id = :clss_id      " , row.fixParameter("clss_idcd" ))
						.query( "                connect by prior a.clss_id = a.prnt_id						")
						.query( "         ) x																")
						.query( " ) s on ( t.clss_id = s.clss_id )											")
						.query( " when matched then															")
						.query( "      update set t.clss_desct  = s.clss_desct								")
						.query( "               , t.upt_dttm = to_char(sysdate,'yyyymmddhh24miss')			")
						.assign("prnt_id" , row.fixParameter("prnt_idcd" ))
					;
					data.attach(Action.direct);
				}
				if (provider.equals("mssql")) {
					data.param
						.query(" with tmp as																				")
						.query(" (select  a.clss_id, a.prnt_id																")
						.query("          , convert(varchar(200), cast(clss_desct  as varchar(200)) + ' > ' ) AS CLSS_DS	")
						.query("  from    cstm_clss a																		")
						.query("  where   a.clss_id = :prnt_id ", row.fixParameter("prnt_id" ) )
						.query("  union all																					")
						.query("  select  a.clss_id , a.prnt_id																")
						.query("          , convert(varchar(200), b.clss_ds +												")
						.query("   		   cast(a.clss_nm as varchar(100))+' > ') as clss_ds								")
						.query("  from    cstm_clss a																		")
						.query("          inner join tmp b on a.prnt_id = b.clss_id											")
						.query(" )																							")
						.query(" merge cstm_clss as t																		")
						.query(" using( select  clss_id, substring(clss_ds, 1, len(clss_ds)-2) as clss_ds					")
						.query("        from    tmp																			")
						.query("        where   clss_id = :clss_id      " , row.fixParameter("clss_id" ))
						.query(" ) as s																						")
						.query(" on t.clss_id = s.clss_id																	")
						.query(" when matched then																			")
						.query("     update set t.clss_desct = s.clss_ds													")
						.query("            , t.upt_dttm = dbo.to_char(getdate(),'yyyymmddhh24miss')						")
						.query(" ;																							")
					;
				data.attach(Action.direct);
				}
				if (provider.equals("mysql")) {
					data.param
						.query("update cstm_clss 																			")
						.query("inner join 																					")
						.query("(with recursive cte as (																	")
						.query("      select clss_idcd    , clss_code   , clss_name  , line_levl , prnt_idcd				")
						.query("           , clss_name as ref_name															")
						.query("      from   cstm_clss																		")
//						.query("      where  clss_idcd = :clss_id      " , row.fixParameter("prnt_idcd" ))
						.query("      union all																				")
						.query("      select a.clss_idcd    , a.clss_code   , a.clss_name  , a.line_levl , a.prnt_idcd 		")
						.query("           , concat(b.ref_name , ' > ', a.clss_name)	as ref_name							")
						.query("      from   cstm_clss a																	")
						.query("      inner join cte b on a.prnt_idcd = b.clss_idcd 										")
						.query(")																							")
						.query("select a.clss_idcd , a.ref_name 															")
						.query("from   cte a																				")
						.query("       left outer join cstm_clss m on a.prnt_idcd = m.clss_idcd								")
						.query("       left outer join cstm_clss d on a.clss_idcd = d.clss_idcd								")
						.query(") b																							")
						.query("on    cstm_clss.clss_idcd = b.clss_idcd														")
						.query("set   clss_desc = b.ref_name																")
						.query("where cstm_clss.clss_idcd = :clss_idcd " , row.fixParameter("clss_idcd"))
						.query("and   cstm_clss.line_levl = :line_levl " , row.fixParameter("line_levl"))
					;
					data.attach(Action.direct);
				}
			}
		}
		data.execute();
		return null ;
	}
}
