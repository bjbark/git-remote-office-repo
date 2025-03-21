package com.sky.system.custom.iypkg.item.productmast;

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
import com.sky.listener.ParamToJson;


@Service
public class ProductMastService extends DefaultServiceHandler{

	// 조회
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.prod_idcd       , a.prod_code       , a.prod_name       , a.prod_leng		")
			.query("      , a.prod_widh       , a.prod_hght       , a.prod_spec       , a.scre_dvcd		")
			.query("      , a.bxty_idcd       , a.sgam_relx       , a.scre_spec_frml  , a.scre_spec		")
			.query("      , a.pqty_mxm2       , a.mxm2_pric       , a.pqty_pric       , a.crny_dvcd		")
			.query("      , a.cstm_idcd       , a.pcod_numb       , a.wmld_idcd       , a.wmld_numb		")
			.query("      , a.wmld_size       , a.cpst_numb       , a.inkk_colr_name  , a.uper_seqn		")
			.query("      , a.disp_seqn       , a.user_memo       , a.sysm_memo       , a.prnt_idcd		")
			.query("      , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos		")
			.query("      , a.find_name       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm		")
			.query("      , a.updt_idcd       , a.updt_urif       , a.crte_user_name  , a.crte_ipad		")
			.query("      , a.crte_dttm       , a.crte_idcd       , a.crte_urif       , b.bxty_name		")
			.query("      , b.bxty_leng       , b.bxty_widh       , b.bxty_hght       , a.acct_bacd		")
			.query("      , c.cstm_name       , a.sets_qntt												")
		;
		data.param
			.where("from  product_mast a																")
			.where("left outer join  boxtype_mast b on a.bxty_idcd = b.bxty_idcd						")
			.where("left outer join  cstm_mast    c on a.cstm_idcd = c.cstm_idcd						")
			.where("where   1=1																			")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.prod_idcd       = :prod_idcd		" , arg.getParamText("prod_idcd"))
			.where("and     a.cstm_idcd       = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"))
			.where("and     a.prod_leng       = :prod_leng		" , arg.getParameter("prod_leng") )
			.where("and     a.prod_widh       = :prod_widh		" , arg.getParameter("prod_widh") )
			.where("and     a.prod_hght       = :prod_hght		" , arg.getParameter("prod_hght") )
			.where("and     a.wmld_idcd       = :wmld_idcd		" , arg.getParameter("wmld_idcd") )
			.where("and     a.cpst_numb   like %:cpst_numb%		" , arg.getParameter("cpst_numb") )

			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.prod_code																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	//룩업
	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String find_name = "";

		if(!arg.getParamText("find_name").equals("")){

			String[] find = arg.getParamText("find_name").split(" ");
			if(find.length>0){
				for (int i = 0; i < find.length; i++) {
					String x = "";
					x = find[i].replace("(", "\\(").replace(")", "\\)");
					if(i ==0){
						find_name += "(?=(.*("+x+")){1,})";
					}else{
						find_name += ".*"+x;
					}
				}
			}
		}


		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.prod_idcd       , a.prod_code       , a.prod_name       , a.prod_leng		")
			.query("      , a.prod_widh       , a.prod_hght       , a.prod_spec       , a.scre_dvcd		")
			.query("      , a.bxty_idcd       , a.sgam_relx       , a.scre_spec_frml  , a.scre_spec		")
			.query("      , a.pqty_mxm2       , a.mxm2_pric       , a.pqty_pric       , a.crny_dvcd		")
			.query("      , a.cstm_idcd       , a.pcod_numb       , a.wmld_idcd       , a.wmld_numb		")
			.query("      , a.wmld_size       , a.cpst_numb       , a.inkk_colr_name  , a.uper_seqn		")
			.query("      , a.disp_seqn       , a.user_memo       , a.sysm_memo       , a.prnt_idcd		")
			.query("      , a.line_levl       , a.line_ordr       , a.line_stat       , a.line_clos		")
			.query("      , a.find_name       , a.updt_user_name  , a.updt_ipad       , a.updt_dttm		")
			.query("      , a.updt_idcd       , a.updt_urif       , a.crte_user_name  , a.crte_ipad		")
			.query("      , a.crte_dttm       , a.crte_idcd       , a.crte_urif       , b.bxty_name		")
			.query("      , b.bxty_leng       , b.bxty_widh       , b.bxty_hght       , f.fabc_name		")
			.query("      , f.fabc_idcd       , f.ppln_dvcd       , m.mxm2_qntt       , m.item_fxqt		")
			.query("      , m.item_widh as item_widh2             , m.item_leng as item_leng2			")
			.query("      , f.stnd_pric as fabc_stnd_pric												")
			.query("      , c.cstm_name as ordr_cstm_name         , a.sets_qntt							")
		;
		data.param
			.where("from  product_mast a																")
			.where("left outer join  boxtype_mast  b on a.bxty_idcd = b.bxty_idcd						")
			.where("left outer join  product_bom   m on a.prod_idcd = m.prod_idcd and m.line_seqn = 1	")
			.where("left outer join  fabc_mast     f on m.fabc_idcd = f.fabc_idcd						")
			.where("left outer join  cstm_mast     c on a.cstm_idcd = c.cstm_idcd						")
			.where("where   1=1																			")
			.where("and     a.find_name REGEXP :find_name		" , find_name)
			.where("and     a.prod_idcd       = :prod_idcd		" , arg.getParamText("prod_idcd"))
			.where("and     a.acct_bacd       = :acct_bacd		" , arg.getParamText("acct_bacd"))
			.where("and     a.cstm_idcd       = :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("and     a.prod_leng       = :prod_leng		" , arg.getParameter("prod_leng") )
			.where("and     a.prod_widh       = :prod_widh		" , arg.getParameter("prod_widh") )
			.where("and     a.prod_hght       = :prod_hght		" , arg.getParameter("prod_hght") )

			.where("and     a.cstm_idcd   like  :cstm_like%		" , arg.getParamText("cstm_like"))
			.where("and     a.line_stat       = :line_stat1		" , arg.getParamText("line_stat"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.prod_code																")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	// 조회
	public SqlResultMap getWkctSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.prod_idcd       , a.line_seqn       , a.wkct_idcd       , a.wkun_dvcd		")
			.query("      , a.qntt_unit_idcd  , a.stnd_pric       , a.otod_yorn       , a.otod_cstm_idcd")
			.query("      , a.uper_seqn       , a.disp_seqn       , a.sysm_memo       					")
			.query("      , a.prnt_idcd       , a.line_levl       , a.line_ordr       , a.line_stat		")
			.query("      , a.line_clos       , a.find_name       , a.updt_user_name  , a.updt_ipad		")
			.query("      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name")
			.query("      , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.query("      , w.wkct_name       , u.unit_name       , c.cstm_name							")
			.query("      , a.user_memo as user_memo2													")
			.query("      , REPLACE(json_extract(a.json_data, '$.rep_chek'),'\"','') as rep_chek		")
		;
		data.param
			.where("from  product_bop a																	")
			.where("left outer join  wkct_mast w on a.wkct_idcd = w.wkct_idcd							")
			.where("left outer join  unit_mast u on a.qntt_unit_idcd = u.unit_idcd						")
			.where("left outer join  cstm_mast c on a.otod_cstm_idcd = c.cstm_idcd						")
			.where("where   1=1																			")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.prod_idcd       = :prod_idcd		" , arg.getParamText("prod_idcd"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.line_seqn																")
		;
		return data.selectForMap();
	}
	// 조회
	public SqlResultMap getFabcSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select  a.prod_idcd       , a.line_seqn       , a.fabc_idcd       , a.ppln_dvcd		")
			.query("      , a.item_ttln       , a.item_ttwd       , a.item_leng       , a.item_widh		")
			.query("      , a.item_fxqt																	")
			.query("      , a.uper_seqn       , a.disp_seqn       , a.user_memo       , a.sysm_memo		")
			.query("      , a.prnt_idcd       , a.line_levl       , a.line_ordr       , a.line_stat		")
			.query("      , a.line_clos       , a.find_name       , a.updt_user_name  , a.updt_ipad		")
			.query("      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name")
			.query("      , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
			.query("      , a.mxm2_qntt as mxm2_qntt2       , a.mxm2_pric as mxm2_pric2					")
			.query("      , a.pqty_pric as pqty_pric2       , f.fabc_name								")
		;
		data.param
			.where("from  product_bom a																	")
			.where("left outer join  fabc_mast f on a.fabc_idcd = f.fabc_idcd							")
			.where("where   1=1																			")
			.where("and     a.find_name   like %:find_name%		" , arg.getParamText("find_name"))
			.where("and     a.prod_idcd       = :prod_idcd		" , arg.getParamText("prod_idcd"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.line_seqn																")
		;
		return data.selectForMap();
	}
	public SqlResultMap getPricSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select  a.prod_idcd       , a.line_seqn       , a.cstm_idcd       , a.adpt_date		")
			.query("      , a.sale_pric       , a.befr_pric       , a.last_yorn       , c.cstm_name		")
			.query("      , a.uper_seqn       , a.disp_seqn       , a.user_memo       , a.sysm_memo		")
			.query("      , a.prnt_idcd       , a.line_levl       , a.line_ordr       , a.line_stat		")
			.query("      , a.line_clos       , a.find_name       , a.updt_user_name  , a.updt_ipad		")
			.query("      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name")
			.query("      , a.crte_ipad       , a.crte_dttm       , a.crte_idcd       , a.crte_urif		")
		;
		data.param
			.where("from  product_pric a																")
			.where("left outer join  cstm_mast c on a.cstm_idcd = c.cstm_idcd							")
			.where("where   1=1																			")
			.where("and     a.prod_idcd       = :prod_idcd		" , arg.getParamText("prod_idcd"))
			.where("and     a.line_stat       < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.cstm_idcd, a.adpt_date ,a.line_seqn										")
		;
		return data.selectForMap();
	}
	public SqlResultMap getCalcSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call  product_calc(								")
			.query("   :bxty_idcd	",arg.fixParameter("bxty_idcd"))
			.query(" , :fabc_idcd	",arg.fixParameter("fabc_idcd"))
			.query(" , :prod_leng	",arg.fixParameter("prod_leng"))
			.query(" , :prod_widh	",arg.fixParameter("prod_widh"))
			.query(" , :prod_hght	",arg.fixParameter("prod_hght"))
			.query(" , :sgam_relx	",arg.fixParameter("sgam_relx"))
			.query(")												")
		;
		return data.selectForMap();
	}
	public SqlResultMap getProdCode(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select lpad(   ifnull(  max(prod_code)						")
			.query("                      , concat(substr(:cstm_code,1,3)", arg.fixParameter("cstm_code"))
			.query("                      , '0000'))+10,7,'0'					")
			.query("       ) as prod_code										")
			.query("       , c.sale_cstm_yorn   , c.puch_cstm_yorn				")
			.query("       , c.incm_cstm_yorn   , c.otod_cstm_yorn				")
			.query("from product_mast a											")
			.query("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd	")
			.query("where a.cstm_idcd = :cstm_idcd ", arg.fixParameter("cstm_idcd"))
		;
		return data.selectForMap();
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("product_mast"													)
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID          */
					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			))
					.update("line_stat", 2)
				;
				data.attach(Action.update);
				data.execute();
			} else {
				data.param
					.table("product_mast"													)
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID          */
					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			))
					//
					.update("prod_code"			, row.getParameter("prod_code"           ))  /*  제품코드        */
					.update("prod_name"			, row.getParameter("prod_name"           ))  /*  제품명          */
					.update("acct_bacd"			, row.getParameter("acct_bacd"           ))  /*  계정구분코드          */
					.update("prod_leng"			, row.getParameter("prod_leng"           ))  /*  제품길이        */
					.update("prod_widh"			, row.getParameter("prod_widh"           ))  /*  제품폭          */
					.update("prod_hght"			, row.getParameter("prod_hght"           ))  /*  제품높이        */
					.update("prod_spec"			, row.getParamText("prod_leng"           ).trim()
												+ " "
												+ row.getParamText("prod_widh"            ).trim()
												+ " "
												+ row.getParamText("prod_hght"            ).trim())  /*  제품규격        */
					.update("scre_dvcd"			, row.getParameter("scre_dvcd"           ))  /*  스코어구분코드  */
					.update("sets_qntt"			, row.getParameter("sets_qntt"           ))  /*  세트수량  */
					.update("bxty_idcd"			, row.getParameter("bxty_idcd"           ))  /*  박스형식ID     */
					.update("sgam_relx"			, row.getParameter("sgam_relx"           ))  /*  외날개여유      */
					.update("scre_spec_frml"	, row.getParameter("scre_spec_frml"      ))  /*  스코어규격공식  */
					.update("scre_spec"			, row.getParameter("scre_spec"           ))  /*  스코어규격      */
					.update("pqty_mxm2"			, row.getParameter("pqty_mxm2"           ))  /*  개당제곱미터    */
					.update("mxm2_pric"			, row.getParameter("mxm2_pric"           ))  /*  제곱미터단가    */
					.update("pqty_pric"			, row.getParameter("pqty_pric"           ))  /*  개당단가        */
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"           ))  /*  통화구분코드    */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"           ))  /*  거래처ID       */
					.update("pcod_numb"			, row.getParameter("pcod_numb"           ))  /*  PONO          */
					.update("wmld_idcd"			, row.getParameter("wmld_idcd"           ))  /*  목형ID         */
					.update("wmld_numb"			, row.getParameter("wmld_numb"           ))  /*  목형번호        */
					.update("wmld_size"			, row.getParameter("wmld_size"           ))  /*  목형사이즈      */
					.update("cpst_numb"			, row.getParameter("cpst_numb"           ))  /*  조판번호        */
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"           ))  /*  생산설비ID */
					.update("inkk_colr_name"	, row.getParameter("inkk_colr_name"      ))  /*  잉크컬러명      */

					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  상위순번        */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  하위순번        */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모      */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모      */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID        */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨         */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서         */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태         */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부         */
					.update("find_name"			, row.getParamText("prod_code"           ).trim()
												+ " "
												+ row.getParamText("prod_name"            ).trim())
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
				data.execute();
				data.clear();
				data.param
					.query("call prod_price_update(")
					.query("    :prod_idcd",row.getParameter("prod_idcd"))
					.query("  , :sale_pric",row.getParameter("pqty_pric"))
					.query("  , :cstm_idcd",row.getParameter("cstm_idcd"))
					.query(")")
				;
				data.attach(Action.direct)
				;

				data.execute();
			}
		}
		return null ;
	}
	public SqlResultMap setProdWkct(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("product_bop"												)
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID    */
					.where("and   line_seqn		= :line_seqn							")  /*  순번       */
					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					;data.attach(Action.delete);
			} else {
				ParamToJson trans = new ParamToJson();
				String rep_chek = trans.TranslateRowSelect(row,"rep_chek");
				data.param
					.table("product_bop"												 )
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID      */
					.where("and   line_seqn		= :line_seqn							")  /*  순번         */

					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			 ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			 ))
					//
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"           ))  /* 공정ID           */
					.update("wkun_dvcd"			, row.getParameter("wkun_dvcd"           ))  /* 작업단위구분코드   */
					.update("qntt_unit_idcd"	, row.getParameter("qntt_unit_idcd"      ))  /* 수량단위ID        */
					.update("stnd_pric"			, row.getParameter("stnd_pric"           ))  /* 표준단가           */
					.update("otod_yorn"			, row.getParameter("otod_yorn"           ))  /* 외주여부           */
					.update("otod_cstm_idcd"	, row.getParameter("otod_cstm_idcd"      ))  /* 외주거래처ID      */


					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  상위순번        */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  하위순번        */
					.update("user_memo"			, row.getParameter("user_memo2"          ))  /*  사용자메모      */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모      */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID        */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨         */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서         */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태         */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부         */
					.update("json_data"			, rep_chek								  )  /*  최종공정여부         */
					.update("find_name"			, row.getParamText("prod_idcd"           ).trim()
												+ " "
												+ row.getParamText("wkct_name"            ).trim()
												+ " "
												+ row.getParamText("cstm_name"            ).trim())
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
				data.attach(Action.modify);
			}
			data.execute();
		}
		return null ;
	}
	public SqlResultMap setProdFabc(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("product_bom"												)
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID    */
					.where("and   line_seqn		= :line_seqn							")  /*  순번       */
					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
					;data.attach(Action.delete);
			} else {
				data.param
					.table("product_bom"												 )
					.where("where prod_idcd		= :prod_idcd							")  /*  제품ID      */
					.where("and   line_seqn		= :line_seqn							")  /*  순번         */

					//
					.unique("prod_idcd"			, row.fixParameter("prod_idcd"			 ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			 ))
					//
					.update("fabc_idcd"			, row.getParameter("fabc_idcd"           ))  /* 원단ID		*/
					.update("ppln_dvcd"			, row.getParameter("ppln_dvcd"           ))  /* 지골구분코드	*/
					.update("item_ttln"			, row.getParameter("item_ttln"           ))  /* 품목총장		*/
					.update("item_ttwd"			, row.getParameter("item_ttwd"           ))  /* 품목총폭		*/
					.update("item_leng"			, row.getParameter("item_leng"           ))  /* 품목길이		*/
					.update("item_widh"			, row.getParameter("item_widh"           ))  /* 품목폭		*/
					.update("item_fxqt"			, row.getParameter("item_fxqt"           ))  /* 품목절수		*/
					.update("mxm2_qntt"			, row.getParameter("mxm2_qntt2"           ))  /* 제곱미터수량	*/
					.update("mxm2_pric"			, row.getParameter("mxm2_pric2"           ))  /* 제곱미터단가	*/
					.update("pqty_pric"			, row.getParameter("pqty_pric2"           ))  /* 개당단가		*/


					.update("uper_seqn"			, row.getParameter("uper_seqn"           ))  /*  상위순번        */
					.update("disp_seqn"			, row.getParameter("disp_seqn"           ))  /*  하위순번        */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모      */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모      */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID        */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨         */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서         */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태         */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부         */
					.update("find_name"			, row.getParamText("prod_idcd"           ).trim()
												+ " "
												+ row.getParamText("fabc_name"            ).trim())
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
					.update("bxsw_make_cost"	, row.getParameter("bxee_loss"           )) /* sw가공비		*/
					.update("bxdw_make_cost"	, row.getParameter("bxee_loss"           )) /* dw가공비		*/
					.update("bxtw_make_cost"	, row.getParameter("bxee_loss"           )) /* tw가공비		*/
					.update("bxaa_make_cost"	, row.getParameter("bxee_loss"           )) /* aa골가공비		*/
					.update("bxee_make_cost"	, row.getParameter("bxee_loss"           )) /* e골가공비		*/
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
	public SqlResultMap setPrice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_product_price(						")
			.query("     :cstm_idcd ", arg.fixParameter("cstm_idcd"))
			.query("   , :percent   ", arg.fixParameter("percent"))
			.query("   , :cut       ", arg.fixParameter("cut"))
			.query("   , :per_chk   ", arg.fixParameter("per_chk"))
			.query("   , :chk       ", arg.fixParameter("chk"))
			.query(")												")
		;
		data.attach(Action.direct);
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
					.update("line_stat"			, 2										)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.update);
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
	public SqlResultMap getFabcCalc(HttpRequestArgument arg ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateAll(arg);

		data.param
			.query("call fabc_lwh_calc (			")
			.query("        :param			", param)
			.query(")								")
		;
		return data.selectForMap();
	}

	//코드복사
	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
			data.param
				.query("call auto_prod_copy(						 ")
				.query("     :stor		", arg.fixParameter("stor_id"))
				.query("   , :prod_idcd	", arg.fixParameter("prod_idcd"))
				.query(")")
			;

		return data.selectForMap();
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("product_mast")
			.where("where prod_idcd = :prod_idcd ")

			.unique("prod_idcd"		, arg.fixParameter("prod_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("product_bop")
			.where("where prod_idcd = :prod_idcd ")

			.unique("prod_idcd"		, arg.fixParameter("prod_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		data.param
			.table("product_bom")
			.where("where prod_idcd = :prod_idcd ")

			.unique("prod_idcd"		, arg.fixParameter("prod_idcd"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		return null;

	}

	public void setExcel(HttpRequestArgument arg, SqlResultRow item ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.table("product_mast")
			.where("where prod_idcd = :prod_idcd ")

			.unique("prod_idcd"		, item.fixParameter("prod_idcd"))

			.update("pqty_pric"		, Integer.parseInt(item.fixParamText("pqty_pric").replaceAll(",","")))
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
	}

	public void setExcel2(HttpRequestArgument arg, SqlResultRow item ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		System.out.println(Integer.parseInt(item.getParamText("scre_spec")));
		data.param
			.table("product_mast")
			.where("where prod_idcd = :prod_idcd ")

			.unique("prod_idcd"		, item.fixParameter("prod_idcd"))

			.update("scre_spec"		, Integer.parseInt(item.fixParamText("scre_spec")))
		;
		data.attach(Action.update);
		data.execute();
		data.clear();
	}
}
