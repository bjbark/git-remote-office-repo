package com.sky.system.custom.komec.item.BomMast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;

@Service("komec.BomMastService")
public class BomMastService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *																							")
		;
		data.param
			.query("from																								")
			.query("( select    a.item_idcd       , a.item_code      , a.item_name      , a.item_spec,      a.line_stat	")
			.query("          , c.cstm_name       , b.cstm_idcd      , d.base_name as acct_name							")
			.query("          , a.acct_bacd       																		")
		;
		// 22.02.03 - 배합비관리, 삼정향료 원재료 추가
		data.param
			.where("from item_mast a 															")
			.where("left outer join item_base_spec b on a.item_idcd = b.item_idcd				")
			.where("left outer join cstm_mast      c on c.cstm_idcd = b.cstm_idcd				")
			.where("left outer join base_mast      d on a.acct_bacd = d.base_code and d.prnt_idcd = '1102'			")
			.where("where 1 = 1																	")
			.where("and    a.find_name like %:find_name%	"	, arg.getParameter("find_name"))
			.where("and    a.acct_bacd = '3000' and  '2002'										")
//			.where("and    a.acct_bacd = :acct_bacd        " , arg.getParameter("acct_bacd") )
			.where("and    c.cstm_idcd = :cstm_idcd        " , arg.getParameter("cstm_idcd") )
			.where("and    a.lcls_idcd   = :lcls_idcd		"	, arg.getParamText("lcls_idcd" ) , !"".equals(arg.getParamText("lcls_idcd" )))
			.where("and    a.mcls_idcd   = :mcls_idcd		"	, arg.getParamText("mcls_idcd" ) , !"".equals(arg.getParamText("mcls_idcd" )))
			.where("and    a.scls_idcd   = :scls_idcd		"	, arg.getParamText("scls_idcd" ) , !"".equals(arg.getParamText("scls_idcd" )))
			.where("and    a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" ))		)
			.where("order by item_code															")
			.where(") a ")
		;
		return data.selectForMap();

	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		String hq = arg.hq;

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd       , a.revs_numb       , a.befr_splr_name      , a.splr_name	")
			.query("       , a.usag_qntt_memo       , a.ecod_purp       , a.drtr_idcd           , a.test_date	")
			.query("       , a.adpt_date            , a.remk_text       , u.user_name as drtr_name				")
			.query("       , a.revs_dvcd            , i.item_code       , i.item_name           , i.item_spec	")
			.query("       , i.incm_loss_rate																	")

			.query("       , a.user_memo            , a.sysm_memo       , a.prnt_idcd           , a.line_levl	")
			.query("       , a.line_ordr            , a.line_stat       , a.line_clos           , a.find_name	")
			.query("       , a.updt_user_name       , a.updt_ipad       , a.updt_dttm           , a.updt_idcd	")
			.query("       , a.updt_urif            , a.crte_user_name  , a.crte_ipad           , a.crte_dttm	")
			.query("       , a.crte_idcd            , a.crte_urif       , i.item_idcd			, a.line_stat	")
		;
		data.param
			.where("from  bom_revs a 															")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd					")
			.where("left outer join item_mast i on a.prnt_item_idcd = i.item_idcd					")
			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.fixParameter("item_idcd"))
			.where("and   a.revs_numb = :revs_numb	", arg.getParameter("revs_numb"))
			.where("and   a.revs_dvcd = :revs_dvcd	", arg.getParameter("revs_dvcd"))
			.where("and   a.line_stat = :line_stat  ", arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
		;
		if(hq.toUpperCase().equals("N1000SJFLV")) {
			if("1".equals(arg.getParameter("revs_dvcd"))) {
				data.param
				.where("order by a.befr_splr_name, a.splr_name											");
			} else {
				data.param
					.where("order by a.befr_splr_name, a.splr_name										");
			}
		} else {
			data.param
				.where("order by a.revs_numb															");
		}
		;
		return data.selectForMap();
	}
	public SqlResultMap getSearch3(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select   a.prnt_item_idcd  , a.revs_numb      , a.line_seqn      , a.ivst_item_idcd		")
			.query("       , a.item_name       , a.item_spec      , a.used_yorn								")
			.query("       , cast(a.mixx_rate as char) as mixx_rate											")
			.query("       , cast(a.ofap_mixx_rate as char) as ofap_mixx_rate								")
			.query("       , a.adpt_date       , i.item_code      , a.revs_dvcd								")
			.query("       , b.kfda            , b.fema           , b.seqc           , b.wdgb				")
			.query("       , b.caca            , b.algy_yorn      , a.ivst_item_idcd as item_idcd			")
			.query("       , b.hala_numb       , b.natr_name      , b.incm_cost								")
			.query("       , d.base_name as acct_name														")
			.query("       , json_value(a.json_data,'$.wkct_idcd') as wkct_idcd								")
			.query("       , w.wkct_name																	")

			.query("       , a.user_memo       , a.sysm_memo      , a.prnt_idcd								")
			.query("       , a.line_levl       , a.line_ordr      , a.line_stat      , a.line_clos			")
			.query("       , a.find_name       , a.updt_user_name , a.updt_ipad      , a.updt_dttm			")
			.query("       , a.updt_idcd       , a.updt_urif      , a.crte_user_name , a.crte_ipad			")
			.query("       , a.crte_dttm       , a.crte_idcd      , a.crte_urif								")
		;
		data.param
			.where("from  bom_mast a 																		")
			.where("left outer join item_mast      i on a.ivst_item_idcd = i.item_idcd						")
			.where("left outer join item_mtrl_spec b on i.item_idcd = b.item_idcd							")
			.where("left outer join wkct_mast      w on json_value(a.json_data,'$.wkct_idcd') = w.wkct_idcd	")
			.where("left outer join base_mast      d on i.acct_bacd = d.base_code and d.prnt_idcd = '1102'	")

			.where("where 1 = 1																	")
			.where("and   a.prnt_item_idcd = :prnt_item_idcd	", arg.getParameter("prnt_item_idcd"))
			.where("and   a.revs_numb      = :revs_numb			", arg.getParameter("revs_numb"))
			.where("and   a.revs_dvcd      = :revs_dvcd			", arg.getParameter("revs_dvcd"))
			.where("and   a.prnt_idcd      = :prnt_idcd			", arg.getParameter("prnt_idcd"))
			.where("order by a.line_seqn														")
		;
		return data.selectForMap();
	}
	public SqlResultMap setRecordRevs(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		if(arg.fixParamText("_set").equals("insert")){
			for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
				data.param
					.table("bom_revs")
					.where("where prnt_item_idcd = :prnt_item_idcd")
					.where("and   revs_numb = :revs_numb")
					.where("and   revs_dvcd = :revs_dvcd")

					.unique("prnt_item_idcd", row.fixParameter("prnt_item_idcd"))
					.unique("revs_numb"		, row.fixParameter("revs_numb"))
					.unique("revs_dvcd"		, row.fixParameter("revs_dvcd"))

					.insert("befr_splr_name", row.getParameter("befr_splr_name"))
					.insert("splr_name"		, row.getParameter("splr_name"))
					.insert("usag_qntt_memo", row.getParameter("usag_qntt_memo"))
					.insert("ecod_purp"		, row.getParameter("ecod_purp"))
					.insert("drtr_idcd"		, row.getParameter("drtr_idcd"))
					.insert("test_date"		, row.getParameter("test_date"))
					.insert("adpt_date"		, row.getParameter("adpt_date"))
					.insert("remk_text"		, row.getParameter("remk_text"))

					.insert("user_memo"		, row.getParameter("user_memo"))
					.insert("sysm_memo"		, row.getParameter("sysm_memo"))
					.insert("prnt_idcd"		, row.getParameter("prnt_idcd"))
					.insert("line_levl"		, row.getParameter("line_levl"))
					.insert("line_ordr"		, row.getParameter("line_ordr"))
					.insert("line_stat"		, row.getParameter("line_stat"))
					.insert("line_clos"		, row.getParameter("line_clos"))
					.insert("find_name"		, row.getParameter("find_name"))
					.insert("updt_user_name", row.getParameter("updt_user_name"))
					.insert("updt_ipad"		, row.getParameter("updt_ipad"))
					.insert("updt_dttm"		, row.getParameter("updt_dttm"))
					.insert("updt_idcd"		, row.getParameter("updt_idcd"))
					.insert("updt_urif"		, row.getParameter("updt_urif"))
					.insert("crte_user_name", row.getParameter("crte_user_name"))
					.insert("crte_ipad"		, row.getParameter("crte_ipad"))
					.insert("crte_dttm"		, row.getParameter("crte_dttm"))
					.insert("crte_idcd"		, row.getParameter("crte_idcd"))
					.insert("crte_urif"		, row.getParameter("crte_urif"))
				;
				data.attach(Action.insert)
				;
				data.execute();
				data.clear();
				String prnt_idcd = " ";
				if(!row.getParamText("prnt_idcd").equals("")){
					prnt_idcd = row.getParamText("prnt_idcd");
				}
				data.param
					.query("insert into bom_mast(			")
					.query("    prnt_item_idcd				")
					.query("  , revs_numb					")
					.query("  , revs_dvcd					")
					.query("  , line_seqn					")
					.query("  , ivst_item_idcd				")
					.query("  , item_name					")
					.query("  , item_spec					")
					.query("  , mixx_rate					")
					.query("  , ofap_mixx_rate				")
					.query("  , adpt_date					")
					.query("  , prnt_idcd					")
					.query(")								")
					.query("select							")
					.query("    prnt_item_idcd				")
					.query("  , :revs_numb2				",row.fixParameter("revs_numb"))
					.query("  , revs_dvcd					")
					.query("  , line_seqn					")
					.query("  , ivst_item_idcd				")
					.query("  , item_name					")
					.query("  , item_spec					")
					.query("  , mixx_rate					")
					.query("  , ofap_mixx_rate				")
					.query("  , date_format(now(),'%Y%m%d')	")
					.query("  , :prnt_idcd	",prnt_idcd)
					.query("from  bom_mast					")
					.query("where prnt_item_idcd = :prnt_item_idcd	", row.fixParameter("prnt_item_idcd"))
					.query("and   revs_numb = (:revs_numb - 1)		", row.fixParameter("revs_numb"))
					.query("and   revs_dvcd = :revs_dvcd			", row.fixParameter("revs_dvcd"))
				;
				data.attach(Action.direct);

			}
		}else if(arg.fixParamText("_set").equals("delete")){
			data.param
				.table("bom_revs")
				.where("where prnt_item_idcd = :prnt_item_idcd")
				.where("and   revs_numb = :revs_numb")
				.where("and   revs_dvcd = :revs_dvcd")

				.unique("prnt_item_idcd", arg.fixParameter("prnt_item_idcd"))
				.unique("revs_numb"		, arg.fixParameter("revs_numb"))
				.unique("revs_dvcd"		, arg.fixParameter("revs_dvcd"))
			;
			data.attach(Action.delete)
			;
			data.execute();
			data.clear();
			data.param
				.table("bom_mast")
				.where("where prnt_item_idcd = :prnt_item_idcd")
				.where("and   revs_numb = :revs_numb")
				.where("and   revs_dvcd = :revs_dvcd")

				.unique("prnt_item_idcd", arg.fixParameter("prnt_item_idcd"))
				.unique("revs_numb"		, arg.fixParameter("revs_numb"))
				.unique("revs_dvcd"		, arg.fixParameter("revs_dvcd"))
			;
			data.attach(Action.delete)
			;
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setUpdateRevs(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			data.param
				.table("bom_revs")
				.where("where prnt_item_idcd = :prnt_item_idcd")
				.where("and   revs_numb = :revs_numb")
				.where("and   revs_dvcd = :revs_dvcd")

				.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd" ))
				.unique("revs_numb"			, row.fixParameter("revs_numb"		))
				.unique("revs_dvcd"			, row.fixParameter("revs_dvcd"		))

				.update("line_stat"			, row.getParameter("line_stat"		))
				.update("befr_splr_name"	, row.getParameter("befr_splr_name" ))
				.update("splr_name"			, row.getParameter("splr_name"		))
				.update("usag_qntt_memo"	, row.getParameter("usag_qntt_memo" ))
				.update("ecod_purp"			, row.getParameter("ecod_purp"		))
				.update("remk_text"			, row.getParameter("remk_text"		))
			;
			data.attach(rowaction)
			;
			data.execute();
			data.clear();
		}

		return null;
	}

	public SqlResultMap setUpdown(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call bom_updown(							")
			.query("     :item_idcd, ", arg.fixParameter("item_idcd"))
			.query("     :line_seqn, ", arg.fixParameter("line_seqn"))
			.query("     :revs_numb, ", arg.fixParameter("revs_numb"))
			.query("     :revs_dvcd, ", arg.fixParameter("revs_dvcd"))
			.query("     :dvcd       ", arg.fixParameter("dvcd"))
			.query(")												")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
	public SqlResultMap setRecordBom(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		SqlResultMap map =  arg.getParameter("records",SqlResultMap.class);
		String prnt_item_idcd = map.get(0).getParamText("prnt_item_idcd");
		String revs_numb = map.get(0).getParamText("revs_numb");
		String revs_dvcd = map.get(0).getParamText("revs_dvcd");
		/*
		  순번을 맞추기 위해 돌릴 프로시저의 param값 1번만 돌려야하므로 for밖으로 빼둔것.
		*/

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("bom_mast												")
					.where("where prnt_item_idcd  = :prnt_item_idcd					")
					.where("and   revs_numb  = :revs_numb							")
					.where("and   revs_dvcd  = :revs_dvcd							")
					.where("and   ivst_item_idcd  = :ivst_item_idcd					")

					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"	))
					.unique("revs_numb"			, row.fixParameter("revs_numb"		))
					.unique("revs_dvcd"			, row.fixParameter("revs_dvcd"		))
					.unique("ivst_item_idcd"	, row.fixParameter("ivst_item_idcd"	))
				;data.attach(rowaction);
				data.execute();
				data.clear();
			} else {

				ParamToJson trans = new ParamToJson();
				String json_data = trans.TranslateRow(arg, row, "bom_mast_json_fields");

				data.param
					.table("bom_mast												")
					.where("where prnt_item_idcd  = :prnt_item_idcd					")
					.where("and   revs_numb  = :revs_numb							")
					.where("and   revs_dvcd  = :revs_dvcd							")
					.where("and   line_seqn  = :line_seqn							")

					.unique("prnt_item_idcd"	, row.fixParameter("prnt_item_idcd"	))
					.unique("revs_numb"			, row.fixParameter("revs_numb"		))
					.unique("revs_dvcd"			, row.fixParameter("revs_dvcd"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("ivst_item_idcd"	, row.getParameter("ivst_item_idcd"))
					.update("item_name"			, row.getParameter("item_name"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("mixx_rate"			, row.getParameter("mixx_rate"))
					.update("ofap_mixx_rate"	, row.getParameter("ofap_mixx_rate"))
					.update("adpt_date"			, row.getParameter("adpt_date"))
					.update("used_yorn"			, row.getParameter("used_yorn"))
					.update("json_data"			, json_data)

					.update("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParameter("item_code")
												+ "	"
												+ row.fixParameter("item_name")
												+ "	")
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
				data.execute();
				data.clear();
			}
		}
		data.param
			.query("call bom_seqn_sort(					")
			.query("     :prnt_item_idcd	",prnt_item_idcd)
			.query("   , :revs_numb			",revs_numb)
			.query("   , :revs_dvcd			",revs_dvcd)
			.query(")									")
		;
		data.attach(Action.direct);
		data.execute();
		data.clear();


		return null ;
	}
	public SqlResultMap setCopyBom(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String str = "prnt_item_idcd,item_idcd,befr_splr_name,splr_name,usag_qntt_memo,ecod_purp,drtr_idcd,test_date,adpt_date,revs_numb,revs_dvcd,prnt_idcd,remk_text";
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			ParamToJson trans = new ParamToJson();
			String json = trans.TranslateRowSelect(row, str);
			data.param
				.query("call bom_copy(							")
				.query("       :json       ", json)
				.query("     , :crte_idcd  ", arg.fixParameter("crte_idcd"))
				.query(")												")
			;
			data.attach(Action.direct);
		}
		data.execute();
		return null;
	}

	public String getAcctBacd(HttpRequestArgument arg, SqlResultRow item, String isParent) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		if ("Y".equals(isParent)) {
			//if ()
		}

		String bacd = item.getParamText("accd_bacd");
		if ("반제품".equals(bacd)) {
			if ("Y".equals(isParent)) {
				bacd = "품목보고서";
			}
		} else if ("원료".equals(bacd)){
			bacd = "반제품";
		}
		data.param
			.query("select  base_code  								")
		;
		data.param //퀴리문
			.where("from base_mast									")
			.where("where   1=1										")
			.where("and     prnt_idcd =1102							")
			.where("and     base_name	=:base_code",		bacd)
		;
//		String bacd = "";
		if(data.selectForMap().size()!=0)
		{
			bacd = data.selectForMap().get(0).getParamText("base_code");
		}
		data.clear();
		return bacd;
	}

	public String getItemIdcd(HttpRequestArgument arg, SqlResultRow item , String bacd ) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		data.param
			.query("select  item_idcd 								")
		;
		data.param //퀴리문
			.where("from item_mast									")
			.where("where   1=1										")
			.where(" and     item_name	=:item_name",		item.getParamText("item_name"))
			.where(" and     item_spec	=:item_spec",		item.getParamText("item_spec"))
			.where(" and     acct_bacd	=:acct_bacd",		bacd)
		;
		String idcd = "";
		if(data.selectForMap().size()!=0)
		{
			idcd = data.selectForMap().get(0).getParamText("item_idcd");
		}
		data.clear();
		return idcd;
	}

	public String getItemIdcd2(HttpRequestArgument arg, SqlResultRow item  , String bacd ) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		data.param
			.query("select  item_idcd 								")
		;
		data.param //퀴리문
			.where("from item_mast									")
			.where("where   1=1										")
			.where(" and     item_name	=:item_name",		item.getParamText("prnt_item_name"))
			.where(" and     item_spec	=:item_spec",		item.getParamText("prnt_item_spec"))
			.where(" and     acct_bacd	=:acct_bacd",		bacd)
		;
		String idcd = "";
		if(data.selectForMap().size()!=0)
		{
			idcd = data.selectForMap().get(0).getParamText("item_idcd");
		}
		data.clear();
		return idcd;
	}

	public String getChildItemIdcd(HttpRequestArgument arg, SqlResultRow item , String bacd) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String idcd = "";

		data.clear();
		data.param
			.query("select  item_idcd 								")
		;
		data.param
			.where("from item_mast									")
			.where("where   1=1										")
			.where(" and     item_name	=:item_name",		item.getParamText("item_name"))
			.where(" and     item_spec	=:item_spec",		item.getParamText("item_spec"))
			.where(" and     acct_bacd	=:acct_bacd",		bacd)
		;

		if(data.selectForMap().size()!=0) {
			idcd = data.selectForMap().get(0).getParamText("item_idcd");
		}

		return idcd;
	}

	public String getParentItemIdcd(HttpRequestArgument arg, SqlResultRow item) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String idcd = "";

		data.clear();
		data.param
			.query("select  item_idcd 								")
		;
		data.param
			.where("from item_mast									")
			.where("where   1=1										")
			.where(" and     item_name	=:item_name",		item.getParamText("prnt_item_name"))
			.where(" and     item_spec	=:item_spec",		item.getParamText("prnt_item_spec"))
			.where(" and     acct_bacd	in ('2003', '2002')")
		;

		if(data.selectForMap().size()!=0) {
			idcd = data.selectForMap().get(0).getParamText("item_idcd");
		}

		return idcd;
	}

	public String getNewItemIdcd(HttpRequestArgument arg, SqlResultRow item , String bacd ) throws Exception {
		DataMessage data	= arg.newStorage("POS");

		String idcd = "";
		data.param
			.query("call fn_seq_gen_v2 (							")
			.query("     :STOR                " , arg.fixParameter("stor_id"))
			.query("   , :table               " ,  "item_mast")
			.query("   , :item_idcd           " , "not defind"		)
			.query(" ) 												")
		;
		idcd = data.selectForRow().getParamText("seq");
		data.clear();

		if (!"2002".equals(bacd)) {
			idcd = "P" + idcd;

		}
		data.param
			.table ("item_mast")
			.where ("where item_idcd = :item_idcd")

			.unique("item_idcd"        , idcd)

			.update("item_code"        , idcd)
			.update("acct_bacd"        , bacd)
			.update("item_name"        , item.getParameter("item_name"))		//품목명
			.update("item_spec"        , item.getParameter("item_spec"))		//품목규굑
			.update("line_stat"        , 0	)
			.update("line_clos"        , item.getParameter("line_clos"))
			.update("find_name"        , idcd
										+ " "
										+ item.getParameter("item_name")
										+ "	"
										)
			.update("sysm_memo"        , "Excel Upload"    )
			.update("updt_ipad"        , arg.remoteAddress )
			.insert("crte_ipad"        , arg.remoteAddress )
			.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.insert);
		data.execute();

		return idcd;
	}

	public SqlResultMap getLineSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select ifnull(max(line_seqn),0) as seq	")
		;
		data.param //퀴리문
		.where("from bom_mast												")
		.where("where 1=1													")
		.where("and   prnt_item_idcd = :prnt_item_idcd" , arg.getParameter("prnt_item_idcd"))
		.where("and   revs_numb = :revs_numb" , arg.getParameter("revs_numb"))
		;
		return data.selectForMap();
	}

	public void setExcel(HttpRequestArgument arg, SqlResultRow item , String upper, int seqn , String bacd  ,String idcd  ,String idcd2) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultRow revs = new SqlResultRow();
		SqlResultRow max_seqn = new SqlResultRow();
		String prnt_idcd = "";
		if (!item.getParamText("prnt_idcd").equals("")) {
			data.param
				.query("select item_idcd ")
				.where("from item_mast")
				.where("where item_code = :item_code",item.fixParameter("prnt_idcd"))
			;

			prnt_idcd = data.selectForRow().getParamText("item_idcd");
			data.clear();
		}

		/*if ("2".equals(item.fixParameter("revs_dvcd")) && "".equals(idcd)) {
			data.param
				.query("call fn_seq_gen_v2 (							")
				.query("     :STOR                " , arg.fixParameter("stor_id"))
				.query("   , :table               " ,  "item_mast")
				.query("   , :item_idcd           " , "not defind"		)
				.query(" ) 												")
			;
			idcd = data.selectForRow().getParamText("seq");
			data.clear();

			if (!"2002".equals(bacd)) {
				idcd = "P" + idcd;

			}
			data.param
				.table ("item_mast")
				.where ("where item_idcd = :item_idcd")

				.unique("item_idcd"        , idcd)

				.update("item_code"        , idcd)
				.update("acct_bacd"        , bacd)
				.update("item_name"        , item.getParameter("item_name"))		//품목명
				.update("item_spec"        , item.getParameter("item_spec"))		//품목규굑
				.update("line_stat"        , 0	)
				.update("line_clos"        , item.getParameter("line_clos"))
				.update("find_name"        , idcd
											+ " "
											+ item.getParameter("item_name")
											+ "	"
											)
				.update("sysm_memo"        , "Excel Upload"    )
				.update("updt_ipad"        , arg.remoteAddress )
				.insert("crte_ipad"        , arg.remoteAddress )
				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();
		}*/
//		else if ( "2003".equals(bacd)) {
//			data.param
//				.query("call fn_seq_gen_v2 (							")
//				.query("     :STOR                " , arg.fixParameter("stor_id"))
//				.query("   , :table               " ,  "item_mast")
//				.query("   , :item_idcd           " , "not defind"		)
//				.query(" ) 												")
//			;
//			idcd = data.selectForRow().getParamText("seq");
//			data.clear();
//
//			data.param
//				.table ("item_mast")
//				.where ("where item_idcd = :item_idcd")
//
//				.unique("item_idcd"        , "P"+idcd)
//
//				.update("item_code"        , "P"+idcd)
//				.update("acct_bacd"        , 2002)
//				.update("item_name"        , item.getParameter("item_name"))		//품목명
//				.update("item_spec"        , item.getParameter("item_spec"))		//품목규격
//				.update("line_stat"        , 0	)
//				.update("line_clos"        , item.getParameter("line_clos"))
//				.update("find_name"        , idcd
//											+ " "
//											+ item.getParameter("item_name")
//											+ "	"
//											)
//				.update("sysm_memo"        , "Excel Upload"    )
//				.update("updt_ipad"        , arg.remoteAddress )
//				.insert("crte_ipad"        , arg.remoteAddress )
//				.insert("crte_dttm"        , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
//			;
//			data.attach(Action.insert);
//			data.execute();
//			data.clear();
//		}

		if(!item.getParamText("prnt_item_idcd").equals(upper) && item.getParamText("revs_numb").equals("")){
			data.clear();

			// 품목BOM
			if ("2".equals(item.fixParameter("revs_dvcd"))){
				data.param
					.query("select cast((ifnull(max(a.revs_numb),0)+1) as unsigned) as max_revs	")
					.query("     , i.item_idcd,  i2.item_idcd as ivst_item_idcd 				")
					.query("     , i2.item_name, i2.item_spec									")
				;

				if (!item.getParamText("item_code").equals("")) {
					data.param
						.where("from item_mast i ")
						.where("left outer join bom_revs a on a.prnt_item_idcd = i.item_idcd ")
						.where("                          and a.revs_dvcd = :revs_dvcd ", item.fixParameter("revs_dvcd"))
						.where("left outer join item_mast i2 on i2.item_code = :item_code ", item.fixParameter("item_code"))
						.where("where i.item_code = :prnt_item_idcd ", item.fixParameter("prnt_item_idcd"))
					;
				} else {
					data.param
						.where("from item_mast i ")
						.where("left outer join bom_revs a on a.prnt_item_idcd = i.item_idcd ")
						.where("                          and a.revs_dvcd = :revs_dvcd ", item.fixParameter("revs_dvcd"))
						.where("left outer join item_mast i2 on i2.item_code = :item_code ", idcd)
						.where("where i.item_code = :prnt_item_idcd ", item.fixParameter("prnt_item_idcd"))
					;
				}
			//생산BOM
			} else {
				data.param
					.query("select   cast((ifnull(max(a.revs_numb),0)+1) as unsigned) as max_revs			")
					.query("       , i.item_idcd        ,i2.item_idcd as ivst_item_idcd	")
					.query("       , i2.item_name       ,i2.item_spec					")
				;
				data.param
					.where("from item_mast i  ")
					.where("left outer join bom_revs   a on a.prnt_item_idcd = i.item_idcd		")
					.where("and a.revs_dvcd = :revs_dvcd",item.fixParameter("revs_dvcd"))
					.where("left outer join item_mast i2 on i2.item_code = :item_code",item.fixParameter("item_code"))
					.where("where   i.item_code    = :prnt_item_idcd",  item.fixParameter("prnt_item_idcd"))
				;
			}
			revs = data.selectForRow();
			data.clear();

			// SEQ 계산
			data.param
				.query("select  ifnull(max(a.line_seqn),0) + 1	as max_seqn	")
			;
			data.param
				.where("from bom_mast a ")
				.where("where a.prnt_item_idcd = :prnt_item_idcd ", revs.fixParameter("item_idcd"))
				.where("and   a.revs_dvcd      = :revs_dvcd	", item.fixParameter("revs_dvcd"))
				.where("and   a.revs_numb      = :revs_numb	", revs.fixParameter("max_revs"))
			;
			max_seqn = data.selectForRow();
			data.clear();

			// 리비전 생성
			data.param
				.table("bom_revs")

				.where("where prnt_item_idcd = :prnt_item_idcd")
				.where("and   revs_numb      = :revs_numb")
				.where("and   revs_dvcd      = :revs_dvcd")

				.unique("prnt_item_idcd", revs.fixParameter("item_idcd"))
				.unique("revs_numb"		, revs.fixParameter("max_revs"))
				.unique("revs_dvcd"		, item.fixParameter("revs_dvcd"))

				.insert("remk_text", item.getParameter("remk_text") )
				.insert("prnt_idcd", prnt_idcd)
				.insert("drtr_idcd", arg.getParameter("lgin_idcd") )
				.insert("test_date", new SimpleDateFormat("yyyyMMdd").format(new Date()) )
				.insert("adpt_date", new SimpleDateFormat("yyyyMMdd").format(new Date()) )
				.insert("crte_idcd", arg.getParameter("lgin_idcd") )
				.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			;
			data.attach(Action.insert);
			data.execute();
			data.clear();

		// upper가 상위품목코드가 와 같은 경우
		}else{
			// 리비전이 없는 경우
			if (item.getParamText("revs_numb").equals("")) {
				// 품목BOM
				if ("2".equals(item.fixParameter("revs_dvcd"))) {
					data.param
						.query("select cast((ifnull(max(a.revs_numb),1)) as unsigned) as max_revs	")
						.query("     , i.item_idcd,  i2.item_idcd as ivst_item_idcd					")
						.query("     , i2.item_name, i2.item_spec, a.revs_numb as chk				")
					;

					if(!item.getParamText("item_code").equals("")){
						data.param
							.where("from item_mast i ")
							.where("left outer join bom_revs a on  a.prnt_item_idcd = i.item_idcd ")
							.where("                           and a.revs_dvcd = :revs_dvcd ",  item.fixParameter("revs_dvcd"))
							.where("left outer join item_mast i2 on i2.item_code = :item_code ",item.fixParameter("item_code"))
							.where("where i.item_code = :prnt_item_idcd ",  item.fixParameter("prnt_item_idcd"))
						;
					} else {
						data.param
							.where("from item_mast i ")
							.where("left outer join bom_revs a on  a.prnt_item_idcd = i.item_idcd ")
							.where("                           and a.revs_dvcd = :revs_dvcd ",  item.fixParameter("revs_dvcd"))
							.where("left outer join item_mast i2 on i2.item_code = :item_code ",idcd)
							.where("where i.item_code = :prnt_item_idcd",  item.fixParameter("prnt_item_idcd"))
						;
					}
				// 생산BOM
				}else{
					data.param
						.query("select cast((ifnull(max(a.revs_numb),1)) as unsigned) as max_revs	")
						.query("     , i.item_idcd,  i2.item_idcd as ivst_item_idcd					")
						.query("     , i2.item_name, i2.item_spec									")
					;
					data.param
						.where("from item_mast i  ")
						.where("left outer join bom_revs   a on a.prnt_item_idcd = i.item_idcd		")
						.where("left outer join item_mast i2 on i2.item_code = :item_code",item.fixParameter("item_code"))
						.where("where a.revs_dvcd    = :revs_dvcd",  item.fixParameter("revs_dvcd"))
						.where("and   i.item_code    = :prnt_item_idcd",  item.fixParameter("prnt_item_idcd"))
					;
				}
				revs = data.selectForRow();
				data.clear();

				// SEQ 계산
				data.param
					.query("select  ifnull(max(a.line_seqn),0) + 1	as max_seqn	")
				;
				data.param
					.where("from bom_mast a ")
					.where("where a.prnt_item_idcd  = :prnt_item_idcd ", revs.fixParameter("item_idcd"))
					.where("and   a.revs_dvcd       = :revs_dvcd ", item.fixParameter("revs_dvcd"))
					.where("and   a.revs_numb       = :revs_numb ", revs.fixParameter("max_revs"))
				;
				max_seqn = data.selectForRow();
				data.clear();

			// 리비전이 있는 경우
			} else {
				// 품목BOM
				if("2".equals(item.fixParameter("revs_dvcd"))){
					data.param
						.query("select :max_revs as  max_revs ",item.fixParameter("revs_numb"))
						.query("     , i.item_idcd, i2.item_idcd as ivst_item_idcd	")
						.query("     , i2.item_name, i2.item_spec					")
						.query("     , ifnull(a.revs_numb,'null') as chk			")
					;

					if (!item.getParamText("item_code").equals("")){
						data.param
							.where("from item_mast i ")
							.where("left outer join bom_revs a on a.prnt_item_idcd = i.item_idcd ")
							.where("                          and a.revs_dvcd      = :revs_dvcd	 " ,  item.fixParameter("revs_dvcd"))
							.where("                          and a.revs_numb      = :revs_numb	 " ,  item.fixParameter("revs_numb"))
							.where("left outer join item_mast i2 on i2.item_code = :item_code ",item.fixParameter("item_code"))
							.where("where i.item_code = :prnt_item_idcd ",  item.fixParameter("prnt_item_idcd"))
						;
					} else {
						data.param
							.where("from item_mast i ")
							.where("left outer join bom_revs a on a.prnt_item_idcd = i.item_idcd ")
							.where("                          and a.revs_dvcd      = :revs_dvcd	" ,  item.fixParameter("revs_dvcd"))
							.where("                          and a.revs_numb      = :revs_numb	" ,  item.fixParameter("revs_numb"))
							.where("left outer join item_mast i2 on i2.item_code = :item_code", idcd)
							.where("where i.item_code  = :prnt_item_idcd",  item.fixParameter("prnt_item_idcd"))
						;
					}
				// 생산BOM
				}else{
					data.param
						.query("select :max_revs as max_revs ", item.fixParameter("revs_numb"))
						.query("     , i.item_idcd, i2.item_idcd as ivst_item_idcd	")
						.query("     , i2.item_name, i2.item_spec					")
						.query("     , ifnull(a.revs_numb,'null') as chk			")
					;
					data.param
						.where("from item_mast i ")
						.where("left outer join bom_revs a on a.prnt_item_idcd = i.item_idcd ")
						.where("                          and a.revs_dvcd      = :revs_dvcd	 ", item.fixParameter("revs_dvcd"))
						.where("                          and a.revs_numb      = :revs_numb	 ", item.fixParameter("revs_numb"))
						.where("left outer join item_mast i2 on i2.item_code = :item_code ",item.fixParameter("item_code"))
						.where("where i.item_code = :prnt_item_idcd ",  item.fixParameter("prnt_item_idcd"))
					;
				}
				revs = data.selectForRow();
				data.clear();

				// SEQ 계산
				data.param
					.query("select  ifnull(max(a.line_seqn),0) + 1	as max_seqn	")
				;
				data.param
					.where("from bom_mast a  ")
					.where("where a.prnt_item_idcd = :prnt_item_idcd ",  revs.fixParameter("item_idcd"))
					.where("and   a.revs_dvcd      = :revs_dvcd	",  item.fixParameter("revs_dvcd"))
					.where("and   a.revs_numb      = :revs_numb	",  revs.fixParameter("max_revs"))
				;
				max_seqn = data.selectForRow();
				data.clear();

				// 리비전 생성
				if(revs.getParameter("chk").equals("null") || revs.getParamText("chk").equals("")){
					data.param
						.table("bom_revs")

						.where("where prnt_item_idcd = :prnt_item_idcd")
						.where("and   revs_numb      = :revs_numb")
						.where("and   revs_dvcd      = :revs_dvcd")

						.unique("prnt_item_idcd", revs.fixParameter("item_idcd"))
						.unique("revs_numb"		, item.fixParameter("revs_numb"))
						.unique("revs_dvcd"		, item.fixParameter("revs_dvcd"))

						.insert("remk_text", item.getParameter("remk_text") )
						.insert("prnt_idcd", prnt_idcd)
						.insert("drtr_idcd", arg.getParameter("lgin_idcd") )
						.insert("test_date", new SimpleDateFormat("yyyyMMdd").format(new Date()) )
						.insert("adpt_date", new SimpleDateFormat("yyyyMMdd").format(new Date()) )
						.insert("crte_idcd", arg.getParameter("lgin_idcd") )
						.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					;
					data.attach(Action.insert);
					data.execute();
					data.clear();
				}
			}
		}

		data.param
			.table("bom_mast")

			.where("where prnt_item_idcd = :prnt_item_idcd")
			.where("and   revs_numb      = :revs_numb")
			.where("and   revs_dvcd      = :revs_dvcd")
			.where("and   line_seqn      = :line_seqn")

			.unique("prnt_item_idcd", revs.fixParameter("item_idcd"))
			.unique("revs_numb"		, revs.fixParameter("max_revs"))
			.unique("revs_dvcd"		, item.fixParameter("revs_dvcd"))
			.unique("line_seqn"		, max_seqn.fixParameter("max_seqn"))


			.update("ivst_item_idcd", revs.getParameter("ivst_item_idcd"))
			.update("item_name"		, revs.getParameter("item_name"))
			.update("item_spec"		, revs.getParameter("item_spec"))
			.update("mixx_rate"		, item.getParameter("mixx_rate"))


			.insert("prnt_idcd", prnt_idcd )
			.update("sysm_memo", "excel upload")
			.insert("adpt_date", new SimpleDateFormat("yyyyMMdd").format(new Date()) )
			.insert("crte_idcd", arg.getParameter("lgin_idcd") )
			.update("updt_idcd", arg.getParameter("lgin_idcd") )
			.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
			.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return;

	}
}
