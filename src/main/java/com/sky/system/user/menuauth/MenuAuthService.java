package com.sky.system.user.menuauth;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;



@Service
public class MenuAuthService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**********************************************************************************************
	 * 화면 리스트 조회
	 *********************************************************************************************/

	public SqlResultMap getSearch(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		String stor_grp = arg.fixParameter("stor_grp").toString() ;

		data.param
			.total("select count(1) as maxsize " )
		;

		data.param // 쿼리문  입력
			.query("select  a.menu_id , a.menu_nm , a.prnt_id , a.last_modl_yn , a.tree_expn_yn	")
			.query("     ,  a.auth_gb , a.pjt_id												")

			.query("     ,  a.row_sts															")
			.query("     ,  case when a.row_sts = 0 or a.last_modl_yn = 0 then '0'				")
			.query("             else '1' end as hidden_yn 										")

			.query("from    menu_mst a 															")
			.query("where   a.pjt_id        = :pjt_id   " , arg.fixParameter("pjt_id"  	))
			.query("and     a.hq_use_yn     = :stor_grp " , "1" ,( "1".equals(stor_grp)) ) /* 로그인 매장이 본사 */
			.query("and     a.dm_use_yn     = :stor_grp " , "1" ,( "2".equals(stor_grp)) ) /* 로그인 매장이 직영 */
			.query("and     a.branch_use_yn = :stor_grp " , "1" ,( "3".equals(stor_grp)) ) /* 로그인 매장이 체인 */
			.query("and     (a.last_modl_yn = 0 or  a.menu_nm like  %:menu_nm%  ) 	", arg.getParameter("find_name"))
			.query("and     a.row_sts  = '0' 													")
			.query("group by a.menu_id															")
			.query("order by a.row_lvl, a.row_ord  												")
		;

		return data.selectForMap();
	}

	/**********************************************************************************************
	 * 사원 리스트 조회
	 *********************************************************************************************/
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize 															" )
		;

		data.param
		.query("select a.user_idcd    , a.user_name   , a.lgin_idcd  , b.menu_id ,  a.auth_dvcd  , a.hqof_idcd	")
		.query("  	 , case when c.menu_id is not null then 1 else 0 end as active_yn							")
		.query("  	 , case when c.menu_id is not null then 1 else 0 end as active_yn_def						")
		.query(" 	 , isnull(c.inpt_use_yn , '0') as inpt_use_yn , b.inpt_use_yn as insert_yn_def				")
		.query(" 	 , isnull(c.upt_use_yn  , '0') as upt_use_yn  , b.upt_use_yn  as modify_yn_def				")
		.query(" 	 , isnull(c.del_use_yn  , '0') as del_use_yn  , b.del_use_yn  as delete_yn_def				")
		.query(" 	 , isnull(c.prt_use_yn  , '0') as prt_use_yn  , b.prt_use_yn  as report_yn_def				")
		.query(" 	 , isnull(c.expt_use_yn , '0') as expt_use_yn , b.expt_use_yn as export_yn_def				")
		.query("     , (select dept_name from dept_mast where dept_idcd = a.dept_idcd)   as dept_name			")
		;
		data.param
		.where("  from user_mast a 																				")
		.where("       join menu_mst b  on b.pjt_id = :pjt_id "  , arg.fixParameter("pjt_id" ))
		.where("       left outer join usr_menu c on a.user_idcd   = c.emp_id 									")
		.where("                       and b.menu_id   = c.menu_id 												")
		.where("                       and ifnull(c.row_sts,'0') = '0' 											")
		.where(" where b.menu_id   	= :menu_id 	"  , arg.fixParameter("menu_id" ))
		.where("   and a.line_stat		< '2' 																	")
		.where("   and a.hoof_stat_dvcd	= '0' 																	")
		.where("   and b.row_sts		= 0 																	")
		.where("   and b.last_modl_yn 	= '1' 																	")
//		.where("   and ifnull(a.admn_yorn,'0')  = :admn_yorn 	" , "0", !"1".equals(arg.getParamText("admn_yorn"))   )
		.where("   and a.dept_idcd  = :dept_idcd 	" , arg.getParameter("dept_idcd" ))
		.where("   and a.user_idcd  = :user_idcd 	" , arg.getParameter("user_idcd" ))
		.where("order by a.dept_idcd , a.user_name	 															")

		;

		return data.selectForMap();
	}


	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){

			if ("0".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 0. 삭제 */

				data.param
					.table("usr_menu")
					.where("where	 emp_id  = :emp_id								")
					.where("and	  	 menu_id  = :menu_id							")

					.unique("emp_id"           , row.fixParameter("user_idcd"))
					.unique("menu_id"          , row.fixParameter("menu_id"))

					.action = Action.delete ;
				;data.attach();

			} else if ("1".equals(row.fixParameter("active_yn"))   ) { /* 사용여부 1. 신규/수정 */
				data.param
					.table("usr_menu")
					.where("where	emp_id  = :emp_id						")
					.where("and		menu_id  = :menu_id						")

					.unique("hq_id"         , row.fixParameter("hqof_idcd"  ))
					.unique("emp_id"        , row.fixParameter("user_idcd"  ))
					.unique("menu_id"       , row.fixParameter("menu_id"    ))

					.update("inpt_use_yn"   , row.getParameter("inpt_use_yn"))
					.update("upt_use_yn"    , row.getParameter("upt_use_yn" ))
					.update("del_use_yn"    , row.getParameter("del_use_yn" ))
					.update("prt_use_yn"    , row.getParameter("prt_use_yn" ))
					.update("expt_use_yn"   , row.getParameter("expt_use_yn"))

					.update("upt_ui"        , row.getParameter("updt_urif"	))
					.update("upt_id"        , row.getParameter("updt_idcd"	))
					.update("upt_ip"        , arg.remoteAddress				)

					.insert("crt_ui"        , row.getParameter("crte_urif"	))
					.insert("crt_id"        , row.getParameter("crte_idcd"	))
					.insert("crt_ip"        , arg.remoteAddress				)
					.update("upt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crt_dttm"      , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )

				;data.attach(Action.modify );
			}
		}
		data.execute();
		return null ;
	}

}




