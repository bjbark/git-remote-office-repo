package com.sky.system.stock.close.dailystockwork;

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
public class DailyStockWorkService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.wkct_idcd       , a.invc_date       , a.item_idcd								")
			.query("        , a.cudt_istt_qntt  , a.cudt_ostt_qntt  , a.chge_qntt         , a.tody_stok_qntt	")
			.query("        , a.optm_stok_qntt  , a.uper_seqn       , a.disp_seqn         , a.pday_stok_qntt	")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif       , w.stok_mngt_yorn							")
			.query("        , i.item_code       , i.item_name       , i.item_spec         , i.unit_idcd			")
			.query("        , u.unit_name       , a.cstm_idcd       , c.cstm_name								")
			.query("        ,(ifnull(a.tody_stok_qntt,0) - ifnull(a.optm_stok_qntt,0))as exc_qntt				")
		;
		data.param
			.where("from daily_stock a																			")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("where    1=1																				")
			.where("and      a.find_name like %:find_name%   " , arg.getParamText("find_name"))
			.where("and      a.invc_date   = :invc_date      " , arg.getParamText("invc_date"))
			.where("and      a.wkct_idcd   = :wkct_idcd      " , arg.getParamText("wkct_idcd"))
			.where("and      a.line_stat   < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.wkct_idcd																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("daily_stock													")
					.where("where wkct_idcd = :wkct_idcd								")		//공정ID
					.where("and   invc_date = :invc_date								")		//invoice 일자
					.where("and   cstm_idcd = :cstm_idcd								")		//거래처ID
					.where("and   item_idcd = :item_idcd								")		//품목ID

					.unique("wkct_idcd"			, row.fixParameter("wkct_idcd"			))
					.unique("invc_date"			, row.fixParameter("invc_date"			))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"			))
					.unique("item_idcd"			, row.fixParameter("item_idcd"			))

					.update("optm_stok_qntt"	, row.getParameter("optm_stok_qntt"		))		//적정재고수량
					.update("pday_stok_qntt"	, row.getParameter("pday_stok_qntt"		))		//전일재고수량
					.update("tody_stok_qntt"	, row.getParameter("tody_stok_qntt"		))		//금일재고수량
					.update("user_memo"			, row.getParameter("user_memo"			))		//메모사항

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.modify);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String wkct_idcd	= arg.getParamText("wkct_idcd") ;
		String invc_date	= arg.getParamText("invc_date");

		data = arg.newStorage("POS");
			data.param
			.query("call daily_stock_make (			")
			.query("   :wkct_idcd "  , wkct_idcd	)  // 공정번호
			.query(" , :invc_date "  , invc_date	)  // 납기일자
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		data = arg.newStorage("POS");

		data.param
			.table("daily_stock"													)
			.where("where wkct_idcd		= :wkct_idcd							")  /*  공정ID  */
			.where("and   invc_date		= :invc_date							")  /*  작업일시  */
			.where("and   cstm_idcd		= :cstm_idcd							")  /*  거래처ID  */
			.where("and   item_idcd		= :item_idcd							")  /*  품목ID  */
			//
			.unique("wkct_idcd"			, arg.fixParameter("wkct_idcd"			))
			.unique("invc_date"			, arg.fixParameter("invc_date"			))
			.unique("cstm_idcd"			, arg.fixParameter("cstm_idcd"			))
			.unique("item_idcd"			, arg.fixParameter("item_idcd"			))
			//
		;
		data.attach(Action.delete);
		data.execute();
		return null;
	}

	public SqlResultMap getWkctSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.query("from (																						")
			.query("select    a.wkct_idcd         , a.wkct_code        , a.wkct_name         , a.wkct_stnm		")
			.query("        , a.bzpl_idcd         , a.dept_idcd        , a.labo_rate_idcd    , a.otod_yorn		")
			.query("        , a.cstm_idcd         , a.rslt_rept_yorn											")
			.query("        , e.labo_rate_name    , b.dept_name        , d.cstm_name							")
			.query("        , a.user_memo         , a.sysm_memo        , a.prnt_idcd         , a.line_levl		")
			.query("        , a.line_ordr         , a.line_stat        , a.line_clos         , a.find_name		")
			.query("        , a.updt_user_name    , a.updt_ipad        , a.updt_dttm         , a.updt_idcd		")
			.query("        , a.updt_urif         , a.crte_user_name   , a.crte_ipad         , a.crte_dttm		")
			.query("        , a.crte_idcd																		")
		;
		data.param
			.query("from    wkct_mast a																			")
			.query("left outer join dept_mast b on a.dept_idcd = b.dept_idcd									")
			.query("left outer join cstm_mast d on a.cstm_idcd = d. cstm_idcd									")
			.query("left outer join labo_rate e on a.labo_rate_idcd = e. labo_rate_idcd							")
			.query("where   1=1																					")
			.query("and     a.line_stat   < :line_stat     "    , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("and     a.stok_mngt_yorn   = :stok_mngt_yorn			", arg.getParamText("stok_mngt_yorn" ))
			.query("order by a.wkct_code ) a																	")
		;
		return data.selectForMap();
	}
}
