package com.sky.system.project.moduleinfo;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import java.util.Date;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlRepository;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;

@Service
public class ModuleInfoService extends DefaultServiceHandler {

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param
			.query("select a.menu_id       , a.menu_nm											")
			.query("	 , a.tree_expn_yn  , a.last_modl_yn , a.modl_id    , a.modl_nm			")
			.query("	 , a.prnt_id  															")
			.query("	 , a.inpt_use_yn   , a.upt_use_yn   , a.del_use_yn 						")
			.query("	 , a.prt_use_yn    , a.expt_use_yn										")
			.query("     , a.row_sts       , a.row_lvl      , a.row_ord , a.usr_memo			")
			.query("     , a.admin_use															")
			.query("     , a.menu_nm_englh , a.menu_nm_chi  , menu_nm_jpns , menu_nm_etc		")
			.query("     , a.adpt_cmpy_name, a.cntr,a.base,a.ejac,a.prjt,a.gnrl,a.smli,a.clss	")
			.query("     , a.char_numb     , a.pcmt												")
			.query("from   module_mst  a														")
			.query("where  1=1																	")
			.query("and    (a.last_modl_yn = 0 or a.find_nm like %:find_nm% ) " , arg.getParameter("find_nm"))
			.query("and    a.row_sts = :row_sts " , "0" , arg.getParamText("row_sts").equals("0" ) )
			.query("and    a.row_sts = :row_sts " , "1" , arg.getParamText("row_sts").equals("1" ) )
			.query("and    a.row_sts < 2														")
//			.query("and    a.menu_id not in ('30000', '0000000064','0000000048')				")
			.query("order  by a.row_lvl, a.row_ord    											")
		;
		return data.selectForMap();
	}

	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
//		SimpleDateFormat dfmt = new SimpleDateFormat("yyyyMMddHHmmss");
//		String today  	 = dfmt.format(new Date());
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		SqlResultMap map = arg.getParameter(HttpResponseMessage.RECORDS, SqlResultMap.class);
		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				row.setParameter("row_sts" , 2   );
				rowaction = Action.update;
			}
			data.param
				.table("module_mst")
				.where("where menu_id  = :menu_id  " )
				 //
				.unique("menu_id"         	, row.fixParameter("id"            ))
				.update("pjt_id"          	, row.getParameter("pjt_id"        ))
				.update("menu_gb"         	, "1"        						)
				.update("menu_nm"         	, row.getParameter("text"          ))
				.update("menu_nm_englh"   	, row.getParameter("menu_nm_englh" ))
				.update("menu_nm_chi"     	, row.getParameter("menu_nm_chi"   ))
				.update("menu_nm_jpns"    	, row.getParameter("menu_nm_jpns"  ))
				.update("menu_nm_etc"     	, row.getParameter("menu_nm_etc"   ))
				.update("tree_expn_yn"    	, row.getParameter("tree_expn_yn"  ))
				.update("last_modl_yn"    	, row.getParameter("last_modl_yn"  ))
				.update("modl_id"         	, row.getParameter("modl_id"       ))
				.update("modl_nm"         	, row.getParameter("modl_nm"       ))

				.update("admin_use"       	, row.getParameter("admin_use"     ))
				.update("inq_use_yn"      	, row.getParameter("inq_use_yn"    ))
				.update("inpt_use_yn"     	, row.getParameter("inpt_use_yn"   ))
				.update("upt_use_yn"      	, row.getParameter("upt_use_yn"    ))
				.update("del_use_yn"      	, row.getParameter("del_use_yn"    ))
				.update("prt_use_yn"      	, row.getParameter("prt_use_yn"    ))
				.update("expt_use_yn"     	, row.getParameter("expt_use_yn"   ))

				.update("auth_gb"         	, "1"     						  )
				.update("usr_memo"        	, row.getParameter("usr_memo"      ))
				.update("prnt_id"         	, row.getParameter("prnt_id"       ))
				.update("row_ord"         	, row.getParameter("row_ord"       ))
				.update("row_lvl"         	, row.getParameter("row_lvl"       ))
				.update("row_sts"         	, row.getParameter("row_sts"       ))

				.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.update("find_nm"      	    , row.getParamText("pjt_id").trim()
											+ "/"
											+ row.getParamText("text"			).trim()
											+ "/"
											+ row.getParamText("modl_id"		).trim()
											+ "/"
											+ row.getParamText("modl_nm"		).trim()
											+ "/"
											)

			;data.attach(Action.modify);
		}
		data.execute();
		return null ;
	}
}

