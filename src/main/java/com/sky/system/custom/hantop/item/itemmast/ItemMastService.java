package com.sky.system.custom.hantop.item.itemmast;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service("hntop.ItemMastService")
public class ItemMastService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		ArrayList<String> temp = new ArrayList<String>();
		temp.add(arg.getParamText("optn_1"));
		temp.add(arg.getParamText("optn_2"));
		temp.add(arg.getParamText("optn_3"));
		temp.add(arg.getParamText("optn_4"));
		temp.add(arg.getParamText("optn_5"));
		temp.add(arg.getParamText("optn_6"));
		temp.add(arg.getParamText("optn_7"));
		temp.add(arg.getParamText("optn_8"));
		temp.add(arg.getParamText("optn_9"));

		String x = "0";
		for(int i = 0; i< temp.size(); i++){
			if(temp.get(i).equals("on")){
				x = "1";
				break;
			}
		}

		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select a.item_idcd      , a.item_code      , a.item_dvcd      , a.item_name					")
			.query("     , a.item_spec      , a.unit_idcd      , a.acct_bacd      , a.item_leng					")
			.query("     , a.item_widh      , a.item_hght      , a.colr_idcd      , a.colr_name					")
			.query("     , a.wdgr_idcd      , a.rpst_item_idcd , a.brnd_bacd      , a.wdbf_yorn					")
			.query("     , a.wdsf_yorn      , a.wdmf_yorn      , a.wdmc_yorn      , a.bfrn_yorn					")
			.query("     , a.sfrn_yorn      , a.mfrn_yorn      , a.glss_yorn      , a.wryp_yorn					")
			.query("     , a.puch_pric      , a.pkge_unit_qntt , a.pkge_qntt									")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , b.base_name as brnd_name																")
			.query("     , (select base_name  from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
			.query("     , (select item_name  from item_mast i where a.rpst_item_idcd  = i.item_idcd)			")
			.query("       as rpst_item_name																	")
			;
		data.param //퀴리문
			.where("from   wind_item_mast a																		")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code		")
			.where("left outer join wind_item_clor w on a.item_idcd = w.item_idcd								")
			.where("where  1=1																					")
			.where("and   ( 0=:x	", x																		 )
			.where("    or  a.wdbf_yorn  =:item1			" , "1", "on".equals(arg.getParamText("optn_1")))	//매출(체크O)
			.where("    or  a.wdsf_yorn  =:item2			" , "1", "on".equals(arg.getParamText("optn_2")))	//수출(체크O)
			.where("    or  a.wdmf_yorn  =:item3			" , "1", "on".equals(arg.getParamText("optn_3")))	//매입(체크O)
			.where("    or  a.wdmc_yorn  =:item4			" , "1", "on".equals(arg.getParamText("optn_4")))	//수입(체크O)
			.where("    or  a.bfrn_yorn  =:item5			" , "1", "on".equals(arg.getParamText("optn_5")))	//외주(체크O)
			.where("    or  a.sfrn_yorn  =:item6			" , "1", "on".equals(arg.getParamText("optn_6")))	//기타(체크O)
			.where("    or  a.mfrn_yorn  =:item7			" , "1", "on".equals(arg.getParamText("optn_7")))	//기타(체크O)
			.where("    or  a.glss_yorn  =:item8			" , "1", "on".equals(arg.getParamText("optn_8")))	//기타(체크O)
			.where("    or  a.wryp_yorn  =:item9			" , "1", "on".equals(arg.getParamText("optn_9")))	//기타(체크O)
			.where(" )																							")
			.where("and    a.acct_bacd  = :acct_code		" , arg.getParameter("acct_code"))
			.where("and    a.brnd_bacd  = :brnd_bacd		" , arg.getParameter("brnd_bacd"))
			.where("and    w.cstm_idcd  = :cstm_idcd		" , arg.getParameter("cstm_idcd"))
			.where("and    a.item_idcd  = :item_idcd		" , arg.getParameter("item_idcd"))
			.where("and    a.item_code  = :item_code		" , arg.getParameter("item_code"))
			.where("and    a.item_name  = :item_name		" , arg.getParameter("item_name"))
			.where("and    a.find_name  like %:find_name%	" , arg.getParameter("find_name"))
			.where("and    a.line_stat  < :line_stat		", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.item_idcd																")
			;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.item_idcd           , a.line_seqn         , a.colr_idcd         , a.colr_name		")
			.query("        , a.chge_colr_idcd      , a.chge_colr_name    , a.stnd_pric         , a.remk_text		")
			.query("        , a.cstm_idcd           , a.cont_date         , c.cstm_name								")
			.query("        , b.base_name as brnd_name																")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from wind_item_clor a																			")
			.where("left outer join (select * from base_mast where prnt_idcd='4000') b on a.brnd_bacd = b.base_code	")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd										")
			.where("where   1=1																						")
			.where("and    a.item_idcd  = :item_idcd	" , arg.getParameter("item_idcd"))
			.where("and    a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.item_idcd           , a.line_seqn         , a.hqof_yorn         , a.base_yorn		")
			.query("        , a.vrbl_idcd           , a.vrbl_name         , a.atth_idcd         , a.prod_lcls_idcd	")
			.query("        , a.cate_dvcd           , a.rela_item_idcd    , a.minm_widh         , a.maxm_widh		")
			.query("        , a.minm_hght           , a.maxm_hght         , a.cond_dvcd								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from wind_item_assy a																			")
			.where("where   1=1																						")
			.where("and     a.item_idcd  = :item_idcd	" , arg.getParameter("item_idcd"))
			.where("and     a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail3(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.item_idcd           , a.line_seqn         , a.vrbl_idcd         , a.vrbl_name		")
			.query("        , a.vrbl_valu           , a.prod_lcls_idcd    , a.rela_item_idcd    , a.vrbl_desc		")
			.query("        , a.remk_text																			")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")

		;
		data.param
			.where("from wind_item_wdth a																			")
			.where("where   1=1																						")
			.where("and    a.item_idcd  = :item_idcd	" , arg.getParameter("item_idcd"))
			.where("and    a.line_stat  < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail4(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.item_idcd           , a.line_seqn         , a.stnd_abar         , a.hqof_yorn		")
			.query("        , a.oslf_yorn           , a.remk_text													")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from wind_item_sbar a																			")
			.where("where   1=1																						")
			.where("and     a.item_idcd  = :item_idcd	" , arg.getParameter("item_idcd"))
			.where("and     a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail5(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.item_idcd           , a.line_seqn         , a.base_yorn         , a.cntr_idcd		")
			.query("        , a.cntr_name           , a.pckg_qntt         , a.remk_text								")
			.query("        , a.user_memo           , a.sysm_memo         , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr           , a.line_stat         , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name      , a.updt_ipad         , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif           , a.crte_user_name    , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd           , a.crte_urif													")
		;
		data.param
			.where("from wind_item_cntr a																			")
			.where("where    1=1																					")
			.where("and      a.item_idcd  = :item_idcd		" , arg.getParameter("item_idcd"))
			.where("and      a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * 상품기초정보 조회
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.item_idcd																			")
			.query("     , a.item_code			, a.item_name		, a.item_dvcd								")
			.query("     , a.unit_idcd			, a.prnt_idcd		, a.line_levl								")
			.query("     , a.line_stat			, a.acct_bacd		, a.item_leng								")
			.query("     , a.item_widh			, a.item_hght		, a.item_leng								")
			.query("     , (select unit_name from unit_mast u where u.unit_idcd = a.unit_idcd) as unit_name		")
			.query("     , (select base_name from base_mast r where a.acct_bacd  = r.base_code					")
			.query("                                           and   r.prnt_idcd = '1102') as acct_bacd_name	")
		;
		data.param //퀴리문
			.where("from 		wind_item_mast a												")
			.where("where		1=1																")
			.where("and			a.item_idcd = :item_idcd"	, arg.getParameter("item_idcd" 		))
			.where("and			a.item_code = :item_code"	, arg.getParameter("item_code"	 	))
			.where("and			a.item_name = :item_name"	, arg.getParameter("item_name"		))
			.where("and			a.unit_idcd = :unit_idcd"	, arg.getParameter("unit_idcd"		))
			.where("and			a.acct_bacd in ('1001', '1002','1003','1004')" , "자재".equals(arg.getParameter("acct_bacd")) )
			.where("and			a.brnd_bacd = :brnd_bacd"	, arg.getParameter("brnd_bacd"		))
			.where("and			a.find_name like %:find_name%"	, arg.getParameter("find_name"	))
			.where("and			a.line_stat  =  :line_stat1", arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.item_idcd														")
			;
			return data.selectForMap(page, rows, (page == 1)); //
		}


	/**
	 *
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wind_item_mast")
					.where("where item_idcd  = :item_idcd  " )
					//
					.unique("item_idcd"		, row.fixParameter("item_code"         ))
					.update("line_stat"		, 2  )
					.update("updt_idcd"		, row.getParameter("updt_idcd"))
					.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.update);
			} else {
				data.param
					.table("wind_item_mast")
					.where("where item_idcd  = :item_idcd  " )
					//
					.unique("item_idcd"			, row.fixParameter("item_code"))

					.update("item_code"			, row.getParameter("item_code"))
					.update("item_name"			, row.getParameter("item_name"))
					.update("item_spec"			, row.getParameter("item_spec"))
					.update("item_dvcd"			, row.getParameter("item_dvcd"))
					.update("unit_idcd"			, row.getParameter("unit_idcd"))
					.update("wdgr_idcd"			, row.getParameter("wdgr_idcd"))
					.update("brnd_bacd"			, row.getParameter("brnd_bacd"))
					.update("acct_bacd"			, row.getParameter("acct_bacd"))
					.update("item_leng"			, row.getParameter("item_leng"))
					.update("item_widh"			, row.getParameter("item_widh"))
					.update("item_hght"			, row.getParameter("item_hght"))
					.update("puch_pric"			, row.getParameter("puch_pric"))
					.update("colr_idcd"			, row.getParameter("colr_idcd"))
					.update("colr_name"			, row.getParameter("colr_name"))
					.update("wdbf_yorn"			, row.getParameter("wdbf_yorn"))
					.update("wdsf_yorn"			, row.getParameter("wdsf_yorn"))
					.update("wdmf_yorn"			, row.getParameter("wdmf_yorn"))
					.update("wdmc_yorn"			, row.getParameter("wdmc_yorn"))
					.update("bfrn_yorn"			, row.getParameter("bfrn_yorn"))
					.update("sfrn_yorn"			, row.getParameter("sfrn_yorn"))
					.update("mfrn_yorn"			, row.getParameter("mfrn_yorn"))
					.update("glss_yorn"			, row.getParameter("glss_yorn"))
					.update("wryp_yorn"			, row.getParameter("wryp_yorn"))
					.update("rpst_item_idcd"	, row.getParameter("rpst_item_idcd"))
					.update("pkge_unit_qntt"	, row.getParameter("pkge_unit_qntt"))
					.update("pkge_qntt"			, row.getParameter("pkge_qntt"))

					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("find_name"			, row.getParamText("item_code").trim()
												+ row.getParamText("item_name").trim())
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setDetail1(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("wind_item_clor												")
					.where("where item_idcd		= :item_idcd							")
					.where("and line_seqn		= :line_seqn							")

					.unique("item_idcd"					, row.fixParameter("item_idcd"			))	//품목ID
					.unique("line_seqn"					, row.fixParameter("line_seqn"			))	//순번
					//
					.update("colr_idcd"					, row.getParameter("colr_idcd"			))	//컬러ID
					.update("colr_name"					, row.getParameter("colr_name"			))	//컬러명
					.update("chge_colr_idcd"			, row.getParameter("chge_colr_idcd"		))	//대체컬러ID
					.update("chge_colr_name"			, row.getParameter("chge_colr_name"		))	//대체컬려명
					.update("cstm_idcd"					, row.getParameter("cstm_idcd"			))	//구매거래처
					.update("cont_date"					, row.getParameter("cont_date"			))	//계약일자
					.update("stnd_pric"					, row.getParameter("stnd_pric"			))	//표준단가
					.update("remk_text"					, row.getParameter("remk_text"			))	//비고
					.update("brnd_bacd"					, row.getParameter("brnd_bacd"			))	//브랜드분류코드

					.update("user_memo"					, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"					, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"					, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"					, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"					, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"					, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"					, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"					, row.getParamText("item_idcd"			).trim())
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
		return null ;
	}

	public SqlResultMap setDetail2(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("wind_item_assy												")
					.where("where item_idcd		= :item_idcd							")
					.where("and line_seqn		= :line_seqn							")

					.unique("item_idcd"					, row.fixParameter("item_idcd"			))	//품목ID
					.unique("line_seqn"					, row.fixParameter("line_seqn"			))	//순번
					//
					.update("hqof_yorn"					, row.getParameter("hqof_yorn"			))	//본사여부
					.update("base_yorn"					, row.getParameter("base_yorn"			))	//기본여부
					.update("vrbl_idcd"					, row.getParameter("vrbl_idcd"			))	//변수ID
					.update("vrbl_name"					, row.getParameter("vrbl_name"			))	//변수명
					.update("atth_idcd"					, row.getParameter("atth_idcd"			))	//부속ID
					.update("prod_lcls_idcd"			, row.getParameter("prod_lcls_idcd"		))	//제품대분류ID
					.update("cate_dvcd"					, row.getParameter("cate_dvcd"			))	//범주구분코드
					.update("rela_item_idcd"			, row.getParameter("rela_item_idcd"		))	//관련품목ID
					.update("minm_widh"					, row.getParameter("minm_widh"			))	//최소폭
					.update("maxm_widh"					, row.getParameter("maxm_widh"			))	//최대폭
					.update("minm_hght"					, row.getParameter("minm_hght"			))	//최소높이
					.update("maxm_hght"					, row.getParameter("maxm_hght"			))	//최대높이
					.update("cond_dvcd"					, row.getParameter("cond_dvcd"			))	//조건구분코드

					.update("user_memo"					, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"					, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"					, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"					, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"					, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"					, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"					, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"					, row.getParamText("item_idcd"			).trim())
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
		return null ;
	}

	public SqlResultMap setDetail3(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("wind_item_wdth												")
					.where("where item_idcd		= :item_idcd							")
					.where("and line_seqn		= :line_seqn							")

					.unique("item_idcd"					, row.fixParameter("item_idcd"			))	//품목ID
					.unique("line_seqn"					, row.fixParameter("line_seqn"			))	//순번
					//
					.update("vrbl_idcd"					, row.getParameter("vrbl_idcd"			))	//변수ID
					.update("vrbl_name"					, row.getParameter("vrbl_name"			))	//변수명
					.update("vrbl_valu"					, row.getParameter("vrbl_valu"			))	//변수값
					.update("prod_lcls_idcd"			, row.getParameter("prod_lcls_idcd"		))	//제품대분류ID
					.update("rela_item_idcd"			, row.getParameter("rela_item_idcd"		))	//관련품목ID
					.update("vrbl_desc"					, row.getParameter("vrbl_desc"			))	//변수설명
					.update("remk_text"					, row.getParameter("remk_text"			))	//비고

					.update("user_memo"					, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"					, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"					, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"					, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"					, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"					, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"					, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"					, row.getParamText("item_idcd"			).trim())
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
		return null ;
	}

	public SqlResultMap setDetail4(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("wind_item_sbar												")
					.where("where item_idcd		= :item_idcd							")
					.where("and line_seqn		= :line_seqn							")

					.unique("item_idcd"			, row.fixParameter("item_idcd"			))	//품목ID
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))	//순번
					//
					.update("stnd_abar"			, row.getParameter("stnd_abar"			))	//표준바
					.update("hqof_yorn"			, row.getParameter("hqof_yorn"			))	//본사여부
					.update("oslf_yorn"			, row.getParameter("oslf_yorn"			))	//자체여부
					.update("remk_text"			, row.getParameter("remk_text"			))	//비고

					.update("user_memo"			, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"			, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"			, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"			, row.getParamText("item_idcd"			).trim())
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
				data.attach(rowaction);
			}
			data.execute();
		return null ;
	}

	public SqlResultMap setDetail5(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("wind_item_cntr												")
					.where("where item_idcd		= :item_idcd							")
					.where("and line_seqn		= :line_seqn							")

					.unique("item_idcd"					, row.fixParameter("item_idcd"			))	//품목ID
					.unique("line_seqn"					, row.fixParameter("line_seqn"			))	//순번
					//
					.update("base_yorn"					, row.getParameter("base_yorn"			))	//표준바
					.update("cntr_idcd"					, row.getParameter("cntr_idcd"			))	//본사여부
					.update("cntr_name"					, row.getParameter("cntr_name"			))	//자체여부
					.update("pckg_qntt"					, row.getParameter("pckg_qntt"			))	//자체여부
					.update("remk_text"					, row.getParameter("remk_text"			))	//비고

					.update("user_memo"					, row.getParameter("user_memo"			))	//사용자메모
					.update("sysm_memo"					, row.getParameter("sysm_memo"			))	//시스템메모
					.update("prnt_idcd"					, row.getParameter("prnt_idcd"			))	//부모ID
					.update("line_levl"					, row.getParameter("line_levl"			))	//ROW레벨
					.update("line_ordr"					, row.getParameter("line_ordr"			))	//ROW순서
					.update("line_stat"					, row.getParameter("line_stat"			))	//ROW상태
					.update("line_clos"					, row.getParameter("line_clos"			))	//ROW마감
					.update("find_name"					, row.getParamText("item_idcd"			).trim())
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
		return null ;
	}

}



