package com.sky.system.auth.authclient;

import java.io.File;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class AuthClientService extends DefaultServiceHandler {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**********************************************************************************************
	 * 사용자 로그인 조회
	 *********************************************************************************************/
	public SqlResultRow getClient(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb

		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.query("select *																						")
			;
			data.param
				.where("from (																							")
				.where(" select a.emp_id    as login_pk  , a.login_id as login_id, null as other_pw , null as login_ip	")
				.where("      , a.emp_nm    as login_nm  , isnull(a.login_pwd,lower(a.emp_id)) as login_pwd				")
				.where("      , 'N' as admin_yn          , a.stor_id as stor_id , s.stor_grp							")
				.where("      , s.stor_nm   as stor_nm   , null as user_gb												")
				.where("      , 'n'  as manager_gb																		")
				.where("      , 1    as frc_chg																			")
				.where("      , 1    as brd_chg																			")
				.where("      , 1    as stor_chg																		")
				.where("      , null   as frc_cd																		")
				.where("      , null   as brd_cd																		")
//				.where("      , case when ifnull(auth_frc,'')      = 1 then 1 else 0 end   as frc_chg					")
//				.where("      , case when ifnull(auth_stor_grp,'') = 1 then 1 else 0 end   as brd_chg					")
//				.where("      , case when ifnull(auth_stor,'')     = 1 then 1 else 0 end   as stor_chg					")
//				.where("      , a.frc_id   as frc_cd																	")
//				.where("      , a.stor_grp as brd_cd																	")
//				.where("      , (select broff_nm from branch_mst r where r.broff_id = a.frc_id)   as frc_nm				")
//				.where("      , (select broff_nm from branch_mst r where r.broff_id = a.stor_grp) as brd_nm				")
				.where("     , 'ANGEL System' as frc_nm																	")
				.where("     , 'ANGEL ERP'  as brd_nm																	")
				.where("from    usr_mst     a																			")
				.where("        left outer join stor s on a.stor_id = s.stor_id   										")
				.where("where   1=1																						")
				.where("and     lower(a.login_id)    = :login_id  " , arg.fixParamText("login_id" ).toLowerCase() )
				.where("union all																						")
				.where("select 'developer' as login_pk  , 'developer' as login_id, null as other_pw , null as login_ip	")
				.where("     , '개발자'     as login_nm  , 'wsinfomes!@#'   as login_pwd, 'Y' as admin_yn				")
				.where("     , :stor_id as stor_id", hq+"1000"  )
				.where("     , :stor_grp as stor_grp, '개발팀' as stor_nm , 'A' as user_gb  ", hq + "1000"				)
				.where("     , 'y'          as manager_gb																")
				.where("     , 1            as frc_chg																	")
				.where("     , 1            as brd_chg																	")
				.where("     , 1            as str_chg																	")
				.where("     , 'BONSA'      as frc_cd																	")
				.where("     , 'BONSA101'   as brd_cd																	")
				.where("     , 'ANGEL System' as frc_nm																	")
				.where("     , 'ANGEL ERP'  as brd_nm																	")
				.where("from dual 																						")
				.where("where 'developer'  <> :developer  " , "developer" , !"developer".equals(arg.fixParamText("login_id" ).toLowerCase()) )
				.where(") a																								")
				;
		return data.selectForRow();


	}
	/**********************************************************************************************
	 * 사용자 로그인 조회
	 *********************************************************************************************/
	public SqlResultRow getClientMes(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb

		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.query("select *																						")
			;
			data.param
				.where("from (																							")
				.where(" select a.user_idcd as login_pk  , a.lgin_idcd  as login_id, null as other_pw 					")
				.where("      , null as login_ip																		")
				.where("      , a.user_name as login_nm  , isnull(a.lgin_pswd,lower(a.user_idcd)) as login_pwd			")
				.where("      , 'N'         as admin_yn																	")
				.where("      , :stor_id1   as stor_id", hq+"1000")
				.where("      , null        as stor_grp  , null   as stor_nm   , null   as user_gb						")
				.where("      , 'n'         as manager_gb																")
				.where("      , 1           as frc_chg																	")
				.where("      , 1           as brd_chg																	")
				.where("      , 1           as stor_chg																	")
				.where("      , null        as frc_cd																	")
				.where("      , null        as brd_cd																	")
				.where("     , 'WIS System' as frc_nm																	")
				.where("     , 'WIS MES'    as brd_nm																	")
				.where("     , ifnull(a.cost_drtr_yorn,0) as cost_drtr_yorn												")
				.where("     , cast(sysm_memo as int)  as lgin_cont														")
				.where("     , ifnull((select optn_logc_valu from optn_mast b  where a.hqof_idcd=b.hqof_idcd and b.optn_idcd='pswd_level' ),0) as pswd_levl	")
				.where("from    user_mast     a																			")
				.where("where   1=1																						")
				.where("and     lower(a.lgin_idcd)    = :login_id  " , arg.fixParamText("login_id" ).toLowerCase() )
				.where("union all																						")
				.where("select 'developer'  as login_pk  , 'developer' as login_id, null as other_pw , null as login_ip	")
				.where("     , '개발자'      as login_nm  , 'wsinfomes!@#'   as login_pwd, 'Y' as admin_yn				")
				.where("     , :stor_id2    as stor_id", hq+"1000"  )
				.where("     , :stor_grp    as stor_grp, '개발팀' as stor_nm , 'A' as user_gb  ", hq + "1000"			 )
				.where("     , 'y'          as manager_gb																")
				.where("     , 1            as frc_chg																	")
				.where("     , 1            as brd_chg																	")
				.where("     , 1            as str_chg																	")
				.where("     , 'BONSA'      as frc_cd																	")
				.where("     , 'BONSA101'   as brd_cd																	")
				.where("     , 'Wooshin Info tech' as frc_nm															")
				.where("     , 'WIS MES'    as brd_nm																	")
				.where("     , '1'          as cost_drtr_yorn															")
				.where("     , '1'          as lgin_cont																")
				.where("     , '아니오'         as pswd_levl																")
				.where("from dual 																						")
				.where("where 1=1																						")
				.where("and   'developer'  = :developer  " , "developer" , "developer".equals(arg.fixParamText("login_id" ).toLowerCase()) )
				.where("and   'N1000ADMIN'  <> :admin1    " , hq														 )
//				.where("and   'N1000SJFLV'  <> :hq", hq.toUpperCase())
				.where("union all																						")
				.where("select 'wsrndteam'  as login_pk  , 'wsrndteam' as login_id , null as other_pw , null as login_ip")
				.where("     , '관제'        as login_nm  , 'rndislife' as login_pwd, 'Y' as admin_yn					")
				.where("     , :stor_id3    as stor_id", hq+"1000"  )
				.where("     , :stor_grp3   as stor_grp, '관제팀' as stor_nm , 'A' as user_gb  ", hq + "1000"				 )
				.where("     , 'y'          as manager_gb																")
				.where("     , 1            as frc_chg																	")
				.where("     , 1            as brd_chg																	")
				.where("     , 1            as str_chg																	")
				.where("     , 'BONSA'      as frc_cd																	")
				.where("     , 'BONSA101'   as brd_cd																	")
				.where("     , 'Wooshin Info tech' as frc_nm															")
				.where("     , 'WIS MES'    as brd_nm																	")
				.where("     , '1'          as cost_drtr_yorn															")
				.where("     , '1'          as lgin_cont																")
				.where("     , '아니오'         as pswd_levl																")
				.where("from dual 																						")
				.where("where 1=1																						")
				.where("and   'wsrndteam'  = :wsrndteam  " , "wsrndteam" , "wsrndteam".equals(arg.fixParamText("login_id" ).toLowerCase()) )
				.where("and   'N1000ADMIN' = :admin2    " , hq															 )
				.where(") a																								")
				;
		return data.selectForRow();


	}
	public SqlResultRow getAngelClient(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb

		String hq = "N1000ANGEL";
		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.query("select *																						")
			;
			data.param
				.where("from (																							")
				.where(" select a.login_id  as login_pk  , a.login_id as login_id, null as other_pw , null as login_ip	")
				.where("      , a.mmb_nm    as login_nm  , isnull(a.login_pwd,lower(a.login_id)) as login_pwd			")
				.where("      , 'N'  as admin_yn         , null as stor_id , null as stor_grp							")
				.where("      , null as stor_nm          , null as user_gb												")
				.where("      , 'n'  as manager_gb																		")
				.where("      , case when ifnull(auth_frc,'')      = 1 then 1 else 0 end   as frc_chg					")
				.where("      , case when ifnull(auth_stor_grp,'') = 1 then 1 else 0 end   as brd_chg					")
				.where("      , case when ifnull(auth_stor,'')     = 1 then 1 else 0 end   as stor_chg					")
				.where("      , frc_id																					")
				.where("      , (select broff_nm from branch_mst r where r.broff_id = a.frc_id)   as frc_nm				")
				.where("      , (select broff_nm from branch_mst r where r.broff_id = a.stor_grp) as stor_grp_nm		")
				.where("      , (select broff_nm from branch_mst r where r.broff_id = a.stor_id)  as stor_nm			")
				.where("      , a.auth_frc , a.auth_stor_grp a.auto_stor												")
				.where("from    mmb_mst     a																			")
				.where("where   1=1																						")
				.where("and     lower(a.login_id)  = :login_id  " , arg.fixParamText("login_id" ).toLowerCase() )
//				.where("union all																						")
//				.where("select 'developer' as login_pk  , 'developer' as login_id, null as other_pw , null as login_ip	")
//				.where("     , '개발자'     as login_nm  , '1234567'   as login_pwd, 'Y' as admin_yn						")
//				.where("     , :stor_id as stor_id", hq+"1000"  )
//				.where("     , :stor_grp as stor_grp, '개발팀' as stor_nm , 'A' as user_gb  ", hq + "1000"				)
//				.where("     , 'y'          as manager_gb																")
//				.where("     , 1            as frc_chg																	")
//				.where("     , 1            as brd_chg																	")
//				.where("     , 1            as str_chg																	")
//				.where("     , 'BONSA'      as frc_cd																	")
//				.where("     , 'System'     as frc_nm																	")
//				.where("     , 'BONSA101'   as brd_cd																	")
//				.where("     , 'ANGEL ERP'  as brd_nm																	")
				.where(") a																								")
				;
		return data.selectForRow();


	}

	/**********************************************************************************************
	 * 사용자 로그인 조회
	 *********************************************************************************************/
	public SqlResultRow getSystemOption(HttpRequestArgument arg ) throws Exception { // @ReleaseToken  String loginGb

		String hq = arg.getParamText("hq_id");
		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.query("call system_option_new (							")
				.query("    :hqof_idcd " , arg.getParamText("hq_id"))
				.query(")													")
			;
		return data.selectForRow();


	}


	/**********************************************************************************************
	 * 로그인 후 사용자의 ip, dt를 update
	 *********************************************************************************************/
	public void setAccess(HttpRequestArgument arg, String login_pk , String cert_idcd , String solution,SqlResultRow row) {
		String hq = arg.getParamText("hq_id");
		String json;
		try {
			DataMessage data = new DataMessage(hq+".POS");
			data.param
				.table("user_mast							")
				.where("where user_idcd	= :user_idcd		")
				.unique("user_idcd"		, login_pk			)
				.update("sysm_memo"		, ""				)
				.update("used_ipad"		, arg.remoteAddress	)
				.update("used_dttm"		, new SqlParamText("cast( date_format( now(),'%Y%m%d%H%i%s' ) as char(14))") )
			;data.attach(Action.update ).execute();
			json = "{user_idcd="	+	row.getParameter("user_idcd")	+ ","
					+"crud_dvcd="	+	row.getParameter("crud_dvcd")	+ ","
					+"tabl_name="	+	row.getParameter("table_name")	+ ","
					+"idcd_valu="	+	row.getParameter("idcd_valu")	+ ","
					+"line_seqn="	+	row.getParameter("line_seqn")	+ ","
					+"assi_seqn="	+	row.getParameter("assi_seqn")	+ ","
					+"qury_text="	+	row.getParameter("qury_text")	+ ","
					+"ipad_addr="	+	row.getParameter("ipad_addr")	+ "}"
			;
			data.clear();
			data.param
				.query("call mes_log_insert (						")
				.query("   :json_data			" , json 			)
				.query(" ) 											")
			;
			data.attach(Action.direct);
			data.execute();
		} catch (Exception ex ) {
			ex.printStackTrace();
		}
	}


	/**********************************************************************************************
	 * 로그인 실패시 카운트
	 *********************************************************************************************/
	public void setCount(HttpRequestArgument arg, String login_pk , int lgin_cont) throws Exception {
		String hq = arg.getParamText("hq_id");

		DataMessage data = new DataMessage(hq+".POS");
			data.param
				.table ("user_mast")
				.where ("where user_idcd = :user_idcd")

				.unique("user_idcd"     , login_pk)

				.update("sysm_memo"     , lgin_cont)
			;data.attach(Action.update).execute();
		}

	/**********************************************************************************************
	 * 로그인 후 사용자의 ip, dt를 update
	 *********************************************************************************************/
	public void setToken(HttpRequestArgument arg, String login_pk, String fcm_token) {
		try {
			String hq = "N1000ANGEL";
			DataMessage data = new DataMessage(hq+".POS");

			data.param
				.table("mmb_mst                       ")
				.where("where login_id  = :login_id   ")
				.unique("login_id"     , login_pk      )
				.update("fcm_token"    , fcm_token     )
			;data.attach(Action.update ).execute();
		} catch (Exception ex ) {
		}
	}

	/**********************************************************************************************
	 * 사용자 화면 조회
	 *********************************************************************************************/
	public SqlResultMap getScreen(HttpRequestArgument arg ) throws Exception { // @ReleaseToken
		String lang_gbcd = arg.getParamText("lang_gbcd");
		String hq_id     = arg.getParamText("hq_id");
		if (lang_gbcd.length() == 0   ) {
			lang_gbcd = "KOR" ;
		}

		DataMessage data = new DataMessage(hq_id+".POS");
		if (("developer".equals(arg.fixParameter("login_pk"	)))||("wsrndteam".equals(arg.fixParameter("login_pk"	)))) {
			data.param // 쿼리문  입력
			.query("select a.active_id  ,  a.menu_id 																						")
			.query("     , case a.lang_gbcd																									")
			.query("            when 'KOR' then a.menu_nm																					")
			.query("            when 'ENG' then a.menu_nm_englh																				")
			.query("            when 'JPN' then a.menu_nm_jpns																				")
			.query("            when 'CHI' then a.menu_nm_chi																				")
			.query("            when 'ETC' then a.menu_nm_etc																				")
			.query("            else a.menu_nm end as menu_nm																				")
			.query("     , a.pjt_id       , a.prnt_id      , a.mymenu_yn																	")
			.query("     , a.tree_expn_yn , a.last_modl_yn , a.modl_id  																	")
			.query("     , a.modl_nm      , a.loader_gb    , a.sys_memo																		")
			.query("     , insert_no 																										")
			.query("     , modify_no 																										")
			.query("     , delete_no 																										")
			.query("     , report_no 																										")
			.query("     , export_no 																										")
			.query("     , a.hq_use_yn , a.dm_use_yn, a.branch_use_yn																		")
			.query("from (                    																								")
			.query("  select a.menu_id as active_id  ,  a.menu_id 																			")
			.query("       , :lang_gbcd  as   lang_gbcd" , lang_gbcd)
			.query("       , case :hq_idcd when 'N1000WINFO' then concat(a.adpt_cmpy_name , a.menu_nm) else a.menu_nm end as menu_nm" , hq_id)
			.query("       , case when ifnull(a.menu_nm_englh,'')  = '' then a.menu_nm else menu_nm_englh end as menu_nm_englh				")
			.query("       , case when ifnull(a.menu_nm_jpns ,'')  = '' then a.menu_nm else menu_nm_jpns  end as menu_nm_jpns				")
			.query("       , case when ifnull(a.menu_nm_chi  ,'')  = '' then a.menu_nm else menu_nm_chi   end as menu_nm_chi				")
			.query("       , case when ifnull(a.menu_nm_etc  ,'')  = '' then a.menu_nm else menu_nm_etc   end as menu_nm_etc				")
			.query("       , a.pjt_id as pjt_id , a.prnt_id as prnt_id, b.my_menu_yn as mymenu_yn											")
			.query("       , a.tree_expn_yn as tree_expn_yn , a.last_modl_yn as last_modl_yn, a.modl_id as modl_id  						")
			.query("       , a.modl_nm as modl_nm , '1' as loader_gb , a.sys_memo  as sys_memo												")
			.query("       , case when a.inpt_use_yn = '0' or b.inpt_use_yn is null or b.inpt_use_yn = '0' then 0 else  2 end as insert_no	")
			.query("       , case when a.upt_use_yn  = '0' or b.upt_use_yn  is null or b.upt_use_yn  = '0' then 0 else  4 end as modify_no	")
			.query("       , case when a.del_use_yn  = '0' or b.del_use_yn  is null or b.del_use_yn  = '0' then 0 else  8 end as delete_no	")
			.query("       , case when a.prt_use_yn  = '0' or b.prt_use_yn  is null or b.prt_use_yn  = '0' then 0 else 16 end as report_no	")
			.query("       , case when a.expt_use_yn = '0' or b.expt_use_yn is null or b.expt_use_yn = '0' then 0 else 32 end as export_no	")
			.query("       , a.hq_use_yn as hq_use_yn , a.dm_use_yn  as dm_use_yn, a.branch_use_yn as branch_use_yn							")
			.query("       , a.row_lvl , a.row_ord																							")
			.query("  from   menu_mst  a  																									")
			.query("         left outer join usr_menu b  on a.menu_id = b.menu_id  and b.emp_id = :login_pk ", arg.fixParameter("login_pk"	))
			.query("  where  1=1																											")
			.query("  and    a.pjt_id    = :pjt_id    ", arg.fixParameter("pjt_id"))
			.query("  and    a.hq_id     = :hq_id     ", arg.fixParameter("hq_id"))
//			.query("  and    ifnull(a.admin_use,'N') = :admin_use ", admin_yn , "N".equals( admin_yn ) )
			.query("  and    a.row_sts   = '0'																								")
			.query("  ) a 																													")
			.query("    order by   a.row_lvl, a.row_ord																						")
		;

		} else {
		data.param // 쿼리문  입력
			.query("select a.active_id  ,  a.menu_id 																						")
			.query("     , case a.lang_gbcd																									")
			.query("            when 'KOR' then a.menu_nm																					")
			.query("            when 'ENG' then a.menu_nm_englh																				")
			.query("            when 'JPN' then a.menu_nm_jpns																				")
			.query("            when 'CHI' then a.menu_nm_chi																				")
			.query("            when 'ETC' then a.menu_nm_etc																				")
			.query("            else a.menu_nm end as menu_nm																				")
			.query("     , a.pjt_id       , a.prnt_id      , a.mymenu_yn																	")
			.query("     , a.tree_expn_yn , a.last_modl_yn , a.modl_id  																	")
			.query("     , a.modl_nm      , a.loader_gb    , a.sys_memo																		")
			.query("     , insert_no 																										")
			.query("     , modify_no 																										")
			.query("     , delete_no 																										")
			.query("     , report_no 																										")
			.query("     , export_no 																										")
			.query("     , a.hq_use_yn , a.dm_use_yn, a.branch_use_yn																		")
			.query("from (                    																								")
			.query("  select a.menu_id as active_id  ,  a.menu_id 																			")
			.query("       , :lang_gbcd  as   lang_gbcd" , lang_gbcd)
			.query("       , case :hq_idcd when 'N1000WINFO' then concat(a.adpt_cmpy_name , a.menu_nm) else a.menu_nm end as menu_nm	" , hq_id)
			.query("       , case when ifnull(a.menu_nm_englh,'')  = '' then a.menu_nm else menu_nm_englh end as menu_nm_englh				")
			.query("       , case when ifnull(a.menu_nm_jpns ,'')  = '' then a.menu_nm else menu_nm_jpns  end as menu_nm_jpns				")
			.query("       , case when ifnull(a.menu_nm_chi  ,'')  = '' then a.menu_nm else menu_nm_chi   end as menu_nm_chi				")
			.query("       , case when ifnull(a.menu_nm_etc  ,'')  = '' then a.menu_nm else menu_nm_etc   end as menu_nm_etc				")
			.query("       , a.pjt_id as pjt_id , a.prnt_id as prnt_id, b.my_menu_yn as mymenu_yn											")
			.query("       , a.tree_expn_yn as tree_expn_yn , a.last_modl_yn as last_modl_yn, a.modl_id as modl_id  						")
			.query("       , a.modl_nm as modl_nm , '1' as loader_gb , a.sys_memo  as sys_memo												")
			.query("       , case when a.inpt_use_yn = '0' or b.inpt_use_yn is null or b.inpt_use_yn = '0' then 0 else  2 end as insert_no	")
			.query("       , case when a.upt_use_yn  = '0' or b.upt_use_yn  is null or b.upt_use_yn  = '0' then 0 else  4 end as modify_no	")
			.query("       , case when a.del_use_yn  = '0' or b.del_use_yn  is null or b.del_use_yn  = '0' then 0 else  8 end as delete_no	")
			.query("       , case when a.prt_use_yn  = '0' or b.prt_use_yn  is null or b.prt_use_yn  = '0' then 0 else 16 end as report_no	")
			.query("       , case when a.expt_use_yn = '0' or b.expt_use_yn is null or b.expt_use_yn = '0' then 0 else 32 end as export_no	")
			.query("       , a.hq_use_yn as hq_use_yn , a.dm_use_yn  as dm_use_yn, a.branch_use_yn as branch_use_yn							")
			.query("       , a.row_lvl , a.row_ord																							")
			.query("  from   menu_mst  a  																									")
			.query("         join usr_menu b  on a.menu_id = b.menu_id  and b.emp_id = :login_pk ", arg.fixParameter("login_pk"	))
			.query("  where  1=1																											")
			.query("  and    a.pjt_id    = :pjt_id    ", arg.fixParameter("pjt_id"))
			.query("  and    a.hq_id     = :hq_id     ", arg.fixParameter("hq_id"))
//			.query("  and    ifnull(a.admin_use,'N') = :admin_use ", admin_yn , "N".equals( admin_yn ) )
			.query("  and    a.row_sts   = '0'																								")
			.query("  ) a 																													")
			.query("    order by   a.row_lvl, a.row_ord																						")
		;
		}
		return data.selectForMap();
	}

	/**********************************************************************************************
	 * 사용자 단어 조회
	 * 2020년 6월 16일 관제 DB 접속 관계를 각 사용자 환경의 단어 파일로 전환하여 처리 함.
	 * (관제 시스템에 통합할 경우 데이터 ROWS 증가로 인한 처리속도에 영향을 줄 것으로 판단 함.)
	 *********************************************************************************************/
	public SqlResultMap getLanguage(HttpRequestArgument arg ) throws Exception {
		DataMessage data;
		SqlResultRow temp ;
		String hq = arg.getParamText("hq_id") ;
		if (hq.length() == 0 ) {
			hq = "COMMON" ;
		}
		if	(hq.length() > 0 )	{ data = new DataMessage(hq+".POS"); }
		else					{ data = new DataMessage(SqlRepository.NETHOSTING);      }

		String lang_gbcd = arg.getParamText("lang_gbcd");
		if (lang_gbcd.length() == 0   ) {
			lang_gbcd = "KOR" ;
		}
		data.param
			.query("select  case when optn_logc_valu  in ('예', 'y','Y','Yes','YES','yes')	")
			.query("             then 1 else 0 end as optn_logc_valu 						")

			.where("from  optn_mast															")
			.where("where optn_idcd = 'word_used_yorn'										")
		;
		temp = data.selectForRow();
		if(!temp.getParamText("optn_logc_valu").equals("0")){
			data.clear();
			data.param
				.query("select a.word_code  as word_cd											")
				.query("     , case a.lang_gbcd 												")
				.query("             when 'ENG'   then a.word_eglh_name							")
				.query("             when 'CHI'   then a.word_chna_name							")
				.query("             when 'JPN'   then a.word_jpan_name							")
				.query("             when 'ETC'   then a.word_etcc_name							")
				.query("             else a.word_name end as word_nm							")
				.query("     , a.word_dvcd as word_gb											")
				.query("from (																	")
				.query("select lower(a.word_code) as word_code  , a.word_dvcd					")
				.query("      , :lang_gbcd as lang_gbcd	", lang_gbcd							)
				.query("      , ifnull(a.word_eglh_name , a.word_name) as word_eglh_name		")
				.query("      , ifnull(a.word_chna_name , a.word_name) as word_chna_name		")
				.query("      , ifnull(a.word_jpan_name , a.word_name) as word_jpan_name		")
				.query("      , ifnull(a.word_etcc_name , a.word_name) as word_etcc_name		")
				.query("      , a.word_name  as word_name										")
				.query("from   word_mast a														")
	//			.query("where  a.word_dvcd in ('0000' , '2000')									")  // 전체 , 단어코드
				.query("where  a.line_stat <= 2													")
				.query("and    a.hqof_idcd = :hq1 " , hq										 )
				.query(") a 																	")
			;

		}
		return data.selectForMap();
	}
	/**********************************************************************************************
	 * 사용자 단어 조회
	 *********************************************************************************************/
	public SqlResultMap getProvider(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String hq = arg.getParamText("hq_id")+".POS";
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select a.provider														")
			.query("     , t.hq_grp      , t.hq_gb      , t.logo_url						")
			.query("     , t.pos_ddns    , t.web_ddns   , t.img_ddns , t.img_http			")
			.query("     , t.epo_ddns														")
			.query("     , t.hq_nts_id    as taxdb_id										")
			.query("     , t.hq_sms_id    as smsdb_id										")
			.query("     , t.itm_typl_nm  as regex_itm_ds									")
			.query("     , t.itm_find_nm  as regex_itm_sn									")
			.query("     , t.clnt_find_nm as regex_cust_sn									")
			.query("     , t.vndr_find_nm as regex_vend_sn									")
			.query("from  host_ddn a,														")
			.query("    (select *															")
			.query("     from head_office													")
			.query("     where hq_id = :hq1 " , arg.getParamText("hq_id"))
			.query("    ) t																	")
			.query("where  a.ddn_id = :hq2  ", hq											)


		;
		return data.selectForMap(sort);
	}


	/**********************************************************************************************
	 * 리소스 데이터 조회
	 *********************************************************************************************/
	public SqlResultMap getResource(HttpRequestArgument arg) throws Exception {
//		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }

		String lang_dvcd = arg.getParamText("lang_gbcd");
		if (lang_dvcd.length() == 0   ) {
			lang_dvcd = "KOR" ;
		}
		data.param
			.query("select * 														")
			.query("from (															")
			.query("select  a.sscd_code as wrd_cd  , a.lkup_valu  as lookup_val		")
			.query("from    sscd_mast   a              								")
			.query("where   a.line_stat < 2 										")
			.query("and     a.lang_dvcd  = :lang_dvcd1 " , lang_dvcd				 )
			.query("and     a.site_idcd  in ( 'SYSTEM' , 'common')					")
			.query("and     a.sscd_code not in (select sscd_code					")
			.query("                            from   sscd_mast r					")
			.query("                            where  site_idcd = :hq1 ", hq		 )
			.query("                           )									")
			.query("union all 														")
			.query("select  a.sscd_code as wrd_cd  , a.lkup_valu  as lookup_val		")
			.query("from    sscd_mast   a              								")
			.query("where   a.line_stat < 2 										")
			.query("and     a.lang_dvcd = 'KOR'										")
			.query("and     a.sscd_code not in (select sscd_code					")
			.query("                            from   sscd_mast 					")
			.query("                            where  lang_dvcd = :lang_dvcd2 " , lang_dvcd )
			.query("                           )									")
			.query("and     a.site_idcd  in ('SYSTEM' , 'common')					")
			.query("and     a.sscd_code not in (select sscd_code					")
			.query("                            from   sscd_mast r					")
			.query("                            where  site_idcd = :hq2 ", hq		 )
			.query("                           )									")
			.query("union all 														")
			.query("select  a.sscd_code as wrd_cd  , a.lkup_valu  as lookup_val		")
			.query("from    sscd_mast   a              								")
			.query("where   a.line_stat < 2 										")
			.query("and     a.lang_dvcd  = :lang_dvcd3 " , lang_dvcd				 )
			.query("and     a.site_idcd  = :hq3 ", hq								 )
			.query("union all 														")
			.query("select  a.sscd_code as wrd_cd  , a.lkup_valu  as lookup_val		")
			.query("from    sscd_mast   a              								")
			.query("where   a.line_stat < 2 										")
			.query("and     a.lang_dvcd = 'KOR'										")
			.query("and     a.sscd_code not in (select sscd_code					")
			.query("                            from   sscd_mast 					")
			.query("                            where  lang_dvcd = :lang_dvcd4 " , lang_dvcd )
			.query("                           )									")
			.query("and     a.site_idcd  = :hq4 ", hq								 )
			.query(") a																")
			.query("order by   a.wrd_cd												")
		;
		return data.selectForMap();
	}
	/**********************************************************************************************
	 * 사용자별 권한 조회
	 *********************************************************************************************/
	public SqlResultRow getUserAuth(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		data.param
			.query("select  a.user_idcd  , a.auth_idcd  , a.auth_name				")
			.query("from    user_auth   a , user_mast u								")
			.query("where   a.line_stat < 2 										")
			.query("and     a.user_idcd = u.user_idcd								")
			.query("and     u.lgin_idcd  = :login_idcd " , arg.getParamText("login_id" ).toLowerCase())
//			.query("union all														")
//			.query("select  'developer' as user_idcd  ,'auth_sale_1001' as  auth_idcd  , '개발자' as auth_name				")
		;
		SqlResultMap info = data.selectForMap();
		SqlResultRow row = new SqlResultRow();
		if (info.size() >=1) {
			for (SqlResultRow dt:info) {
				if(!dt.getParamText("auth_idcd").equals("")) {
					row.put(dt.getParamText("auth_idcd"), true);
				}
//				if ("auth_admn_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1001", true );};
//				if ("auth_admn_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1002", true );};
//				if ("auth_admn_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1003", true );};
//				if ("auth_admn_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1004", true );};
//				if ("auth_admn_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1005", true );};
//				if ("auth_admn_1006".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1006", true );};
//				if ("auth_admn_1007".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1007", true );};
//				if ("auth_admn_1008".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1008", true );};
//				if ("auth_admn_1009".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1009", true );};
//				if ("auth_admn_1010".equals(dt.getParamText("auth_idcd"))) {row.put("auth_admn_1010", true );};
//				if ("auth_sale_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1001", true );};
//				if ("auth_sale_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1002", true );};
//				if ("auth_sale_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1003", true );};
//				if ("auth_sale_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1004", true );};
//				if ("auth_sale_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1005", true );};
//				if ("auth_sale_1006".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1006", true );};
//				if ("auth_sale_1007".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1007", true );};
//				if ("auth_sale_1008".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1008", true );};
//				if ("auth_sale_1009".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1009", true );};
//				if ("auth_sale_1010".equals(dt.getParamText("auth_idcd"))) {row.put("auth_sale_1010", true );};
//				if ("auth_mtrl_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1001", true );};
//				if ("auth_mtrl_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1002", true );};
//				if ("auth_mtrl_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1003", true );};
//				if ("auth_mtrl_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1004", true );};
//				if ("auth_mtrl_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1005", true );};
//				if ("auth_mtrl_1006".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1006", true );};
//				if ("auth_mtrl_1007".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1007", true );};
//				if ("auth_mtrl_1008".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1008", true );};
//				if ("auth_mtrl_1009".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1009", true );};
//				if ("auth_mtrl_1010".equals(dt.getParamText("auth_idcd"))) {row.put("auth_mtrl_1010", true );};
//				if ("auth_stok_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1001", true );};
//				if ("auth_stok_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1002", true );};
//				if ("auth_stok_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1003", true );};
//				if ("auth_stok_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1004", true );};
//				if ("auth_stok_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1005", true );};
//				if ("auth_stok_1006".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1006", true );};
//				if ("auth_stok_1007".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1007", true );};
//				if ("auth_stok_1008".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1008", true );};
//				if ("auth_stok_1009".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1009", true );};
//				if ("auth_stok_1010".equals(dt.getParamText("auth_idcd"))) {row.put("auth_stok_1010", true );};
//				if ("auth_prod_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1001", true );};
//				if ("auth_prod_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1002", true );};
//				if ("auth_prod_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1003", true );};
//				if ("auth_prod_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1004", true );};
//				if ("auth_prod_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1005", true );};
//				if ("auth_prod_1006".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1006", true );};
//				if ("auth_prod_1007".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1007", true );};
//				if ("auth_prod_1008".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1008", true );};
//				if ("auth_prod_1009".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1009", true );};
//				if ("auth_prod_1010".equals(dt.getParamText("auth_idcd"))) {row.put("auth_prod_1010", true );};
//				if ("auth_qc_1001".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1001"  , true );};
//				if ("auth_qc_1002".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1002"  , true );};
//				if ("auth_qc_1003".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1003"  , true );};
//				if ("auth_qc_1004".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1004"  , true );};
//				if ("auth_qc_1005".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1005"  , true );};
//				if ("auth_qc_1006".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1006"  , true );};
//				if ("auth_qc_1007".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1007"  , true );};
//				if ("auth_qc_1008".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1008"  , true );};
//				if ("auth_qc_1009".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1009"  , true );};
//				if ("auth_qc_1010".equals(dt.getParamText("auth_idcd")))   {row.put("auth_qc_1010"  , true );};
//				if ("auth_cost_1001".equals(dt.getParamText("auth_idcd"))) {row.put("auth_cost_1001", true );};
//				if ("auth_cost_1002".equals(dt.getParamText("auth_idcd"))) {row.put("auth_cost_1002", true );};
//				if ("auth_cost_1003".equals(dt.getParamText("auth_idcd"))) {row.put("auth_cost_1003", true );};
//				if ("auth_cost_1004".equals(dt.getParamText("auth_idcd"))) {row.put("auth_cost_1004", true );};
//				if ("auth_cost_1005".equals(dt.getParamText("auth_idcd"))) {row.put("auth_cost_1005", true );};
//				if ("auth_eis_1001".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1001" , true );};
//				if ("auth_eis_1002".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1002" , true );};
//				if ("auth_eis_1003".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1003" , true );};
//				if ("auth_eis_1004".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1004" , true );};
//				if ("auth_eis_1005".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1005" , true );};
//				if ("auth_eis_1006".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1006" , true );};
//				if ("auth_eis_1007".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1007" , true );};
//				if ("auth_eis_1008".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1008" , true );};
//				if ("auth_eis_1009".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1009" , true );};
//				if ("auth_eis_1010".equals(dt.getParamText("auth_idcd")))  {row.put("auth_eis_1010" , true );};
			}
		}
		 else {
//			throw new ServiceException( "일련번호 생성 실패 " );
		}
		return row;
	}



	/**********************************************************************************************
	 * 마이메뉴 수정
	 *********************************************************************************************/
	public void editMyMenu(HttpRequestArgument arg) throws Exception {
			DataMessage data = arg.newStorage("POS");
			data.param
				.table("usr_menu ")
				.where("where emp_id  = :emp_id and menu_id = :menu_id " )
				.unique("emp_id"           , arg.fixParameter("login_pk") )
				.unique("menu_id"          , arg.fixParameter("menu_id")  )
				.update("my_menu_yn"        , arg.fixParameter("mymenu_yn")  )
			;
			data.attach(Action.update ).execute();
	}
	public SqlResultMap setConnectXml(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(SqlRepository.NETHOSTING);
		data.param // 쿼리문  입력
			.query("select   a.provider        , a.host_conn_port      , a.host_path		")
			.query("       , a.host_conn_acct  , a.HOST_CONN_PWD							")
			.query("       , ( select host_ip 												")
			.query("           from   host_mst h 											")
			.query("           where  a.host_id = h.host_id) as host_ip 					")
			.query("from     host_ddn a														")
			.query("where a.ddn_id = :ddn_id", arg.getParameter("hq_id")+".POS")
		;
		SqlResultMap da = data.selectForMap();
		String driverClassName = "";
		String url = "";
		if(da.get(0).getParamText("provider").equals("mysql")){
			driverClassName = "com.mysql.jdbc.Driver";
			url = "jdbc:mysql://"+da.get(0).getParamText("host_ip")+":"
								 +da.get(0).getParamText("host_conn_port")+"/"
								 +da.get(0).getParamText("host_path");
		}else if(da.get(0).getParamText("provider").equals("oracle")){
			driverClassName = "oracle.jdbc.driver.OracleDriver";
			url = "jdbc:oracle:thin@"+da.get(0).getParamText("host_ip")+":1521:xe";
		}else if(da.get(0).getParamText("provider").equals("mssql")){
			driverClassName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
			url = "jdbc:sqlserver://"+da.get(0).getParamText("host_ip")+";DatabaseName="+da.get(0).getParamText("host_path");
		}else{
			return da;
		}

//		String resources = "./src/websource/WEB-INF/lib/ubiserver.xml/";
//		File resources =  new File("/usr/share/tomcat/ROOT/WEB-INF/lib/ubiserver.xml/");
		File resources = new File("src/websource/WEB-INF/lib/ubiserver.xml/");
//		if(!resources.isFile()){
//			resources = new File("/usr/share/tomcat/webapps/ROOT/WEB-INF/lib/ubiserver.xml/");
//		}
		Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new InputSource(resources.getAbsolutePath()));
		XPath xpath = XPathFactory.newInstance().newXPath();
		NodeList nodes = (NodeList)xpath.evaluate("//Resources/DataSource", doc, XPathConstants.NODESET);
		// make the change
		for (int idx = 0; idx < nodes.getLength(); idx++) {
			Node node = nodes.item(idx);
				if(node.getAttributes().getNamedItem("id").getNodeValue().equals("db1")){
					node.getAttributes().getNamedItem("vendor").setNodeValue(da.get(0).getParamText("provider"));
					node.getAttributes().getNamedItem("driverClassName").setNodeValue(driverClassName);
					node.getAttributes().getNamedItem("url").setNodeValue(url);
					node.getAttributes().getNamedItem("username").setNodeValue(da.get(0).getParamText("host_conn_acct"));
					node.getAttributes().getNamedItem("password").setNodeValue(da.get(0).getParamText("host_conn_pwd"));
				}

		}

		// save the result
		Transformer xformer = TransformerFactory.newInstance().newTransformer();
		xformer.transform(new DOMSource(doc), new StreamResult(resources));
		return da;
	}
}
