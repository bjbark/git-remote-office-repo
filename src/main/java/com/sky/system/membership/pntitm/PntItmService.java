package com.sky.system.membership.pntitm;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class PntItmService extends DefaultServiceHandler {
	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize " )
		;
		data.param // 쿼리문  입력
            .query("select  *										                                                  ")
        ;
		data.param
	        .where("from (												                                              ")
			.where("select                                                                                            ")
			.where("          a.item_idcd        , a.hq_id       , a.itm_sts        , a.mst_itm_grp   , a.mst_itm_id     ")
			.where("        , a.mst_itm_cd    , a.unit_idcd      , a.item_code         , a.item_name        , a.item_spec         ")
			.where("        , a.itm_gb        , a.clss_id     , a.etc_clss_1     , a.etc_clss_2    , a.cst_pri        ")
			.where("        , a.stad_sale_pri , a.sale_pri    , a.sale_pri_1     , a.sale_pri_2    , a.sale_pri_3     ")
			.where("        , a.sale_pri_4    , a.sale_pri_5  , a.brcd_1         , a.brcd_2        , a.brcd_3         ")
			.where("        , a.brcd_4        , a.brcd_5      , a.brcd_6         , a.brcd_7        , a.brcd_8         ")
			.where("        , a.dsnt_rt_1     , a.dsnt_rt_2   , a.dsnt_rt_3      , a.dsnt_rt_4     , a.dsnt_rt_5      ")
			.where("        , a.evnt_pri      , a.cpn_mthd    , a.chg_itm_id     , a.img_1         , a.img_2          ")
			.where("        , a.img_3         , a.img_4       , a.img_5          , a.img_6         , a.itm_desct      ")
			.where("        , a.itm_notice                                                                            ")
			.where("        , a.user_memo      , a.sys_memo    , a.prnt_id                                             ")
			.where("        , a.row_lvl       , a.row_ord     , a.row_sts        , a.row_clos      , a.find_name        ")
			.where("        , a.upt_usr_nm    , a.upt_ip      , a.upt_dttm       , a.upt_id        , a.upt_ui         ")
			.where("        , a.crt_usr_nm    , a.crt_ip      , a.crt_dttm       , a.crt_id        , a.crt_ui         ")
			.where("from    pnt_itm a                                                                                 ")
			.where("where   1=1                                                                                       ")
			.where("and     a.hq_id   = :hq_id         " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name like %:find_name%  " , arg.getParamText  ("find_name") )
			.where("and     a.item_idcd  = :item_idcd        " , arg.getParamText  ("item_idcd") )
			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 */
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows) throws Exception {
//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param
			.total("select count(1) as maxsize ")
		;
		data.param // 쿼리문  입력
			.query("select *																	                      ")
		;
		data.param
	        .where("from (												                                              ")
			.where("select                                                                                            ")
			.where("          a.item_idcd        , a.hq_id       , a.itm_sts        , a.mst_itm_grp   , a.mst_itm_id     ")
			.where("        , a.mst_itm_cd    , a.unit_idcd      , a.item_code         , a.item_name        , a.item_spec         ")
			.where("        , a.itm_gb        , a.clss_id     , a.etc_clss_1     , a.etc_clss_2    , a.cst_pri        ")
			.where("        , a.stad_sale_pri , a.sale_pri    , a.sale_pri_1     , a.sale_pri_2    , a.sale_pri_3     ")
			.where("        , a.sale_pri_4    , a.sale_pri_5  , a.brcd_1         , a.brcd_2        , a.brcd_3         ")
			.where("        , a.brcd_4        , a.brcd_5      , a.brcd_6         , a.brcd_7        , a.brcd_8         ")
			.where("        , a.dsnt_rt_1     , a.dsnt_rt_2   , a.dsnt_rt_3      , a.dsnt_rt_4     , a.dsnt_rt_5      ")
			.where("        , a.evnt_pri      , a.cpn_mthd    , a.chg_itm_id     , a.img_1         , a.img_2          ")
			.where("        , a.img_3         , a.img_4       , a.img_5          , a.img_6         , a.itm_desct      ")
			.where("        , a.itm_notice                                                                            ")
			.where("        , a.user_memo      , a.sys_memo    , a.prnt_id                                             ")
			.where("        , a.row_lvl       , a.row_ord     , a.row_sts        , a.row_clos      , a.find_name        ")
			.where("        , a.upt_usr_nm    , a.upt_ip      , a.upt_dttm       , a.upt_id        , a.upt_ui         ")
			.where("        , a.crt_usr_nm    , a.crt_ip      , a.crt_dttm       , a.crt_id        , a.crt_ui         ")
			.where("from    pnt_itm a                                                                                 ")
			.where("where   1=1                                                                                       ")
			.where("and     a.hq_id   = :hq_id         " , arg.fixParamText  ("hq_id") )
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name") )
			.where("and     a.item_idcd  = :item_idcd        " , arg.getParamText("item_idcd") )
			.where("and     a.row_sts < :row_sts       " , arg.getParamText("row_sts" ) , !"".equals(arg.getParamText("row_sts" )) )
			.where("and     a.row_sts < :row_sts       " , "2" , "".equals(arg.getParamText("row_sts" )) )
			.where(") a  " )

		;
		return data.selectForMap(page, rows, (page == 1) );
	}

	/**
	 */
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

//		DataMessage data = new DataMessage("N1000FNGCH"+".POS");
		DataMessage data;
		String hq   = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow row:map){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
	        	data.param
        			.table("pnt_itm")
        			.where("where hq_id   = :hq_id    " )
        			.where("and   item_idcd  = :item_idcd   " )
        			//
        			.unique("hq_id"            , row.fixParameter("hq_id"          ))
        			.unique("item_idcd"           , row.fixParameter("item_idcd"         ))

        			.update("row_sts"          , 2                                   )
        			.update("upt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
	        	;data.attach(Action.update);
			}else{
			data.param
				.table("pnt_itm"                                                        )
				.where("where hq_id           = :hq_id                                 ")  /*  품목ID  */
				.where("and   item_idcd          = :item_idcd                                ")  /*  품목ID  */
			    //
				.unique("hq_id"               , row.fixParameter("hq_id"               ))
				.unique("item_idcd"              , row.fixParameter("item_idcd"              ))
			    //
				.update("itm_sts"             , row.getParameter("itm_sts"             ))  /*  품목상태  */
				.update("mst_itm_grp"         , row.getParameter("mst_itm_grp"         ))  /*  대표품목그룹  */
				.update("mst_itm_id"          , row.getParameter("mst_itm_id"          ))  /*  대표품목ID  */
				.update("mst_itm_cd"          , row.getParameter("mst_itm_cd"          ))  /*  대표품목코드  */
				.update("unit_idcd"              , row.getParameter("unit_idcd"              ))  /*  단위ID  */
				.update("item_code"              , row.getParameter("item_code"              ))  /*  품목코드  */
				.update("item_name"              , row.getParameter("item_name"              ))  /*  품목명  */
				.update("item_spec"              , row.getParameter("item_spec"              ))  /*  품목규격  */
				.update("itm_gb"              , row.getParameter("itm_gb"              ))  /*  품목구분  */
				.update("clss_id"             , row.getParameter("clss_id"             ))  /*  분류ID  */
				.update("etc_clss_1"          , row.getParameter("etc_clss_1"          ))  /*  기타분류1  */
				.update("etc_clss_2"          , row.getParameter("etc_clss_2"          ))  /*  기타분류2  */
				.update("cst_pri"             , row.getParameter("cst_pri"             ))  /*  소비자단가  */
				.update("stad_sale_pri"       , row.getParameter("stad_sale_pri"       ))  /*  표준판매단가  */
				.update("sale_pri"            , row.getParameter("sale_pri"            ))  /*  판매단가  */
				.update("sale_pri_1"          , row.getParameter("sale_pri_1"          ))  /*  판매단가1  */
				.update("sale_pri_2"          , row.getParameter("sale_pri_2"          ))  /*  판매단가2  */
				.update("sale_pri_3"          , row.getParameter("sale_pri_3"          ))  /*  판매단가3  */
				.update("sale_pri_4"          , row.getParameter("sale_pri_4"          ))  /*  판매단가4  */
				.update("sale_pri_5"          , row.getParameter("sale_pri_5"          ))  /*  판매단가5  */
				.update("brcd_1"              , row.getParameter("brcd_1"              ))  /*  바코드1  */
				.update("brcd_2"              , row.getParameter("brcd_2"              ))  /*  바코드2  */
				.update("brcd_3"              , row.getParameter("brcd_3"              ))  /*  바코드3  */
				.update("brcd_4"              , row.getParameter("brcd_4"              ))  /*  바코드4  */
				.update("brcd_5"              , row.getParameter("brcd_5"              ))  /*  바코드5  */
				.update("brcd_6"              , row.getParameter("brcd_6"              ))  /*  바코드6  */
				.update("brcd_7"              , row.getParameter("brcd_7"              ))  /*  바코드7  */
				.update("brcd_8"              , row.getParameter("brcd_8"              ))  /*  바코드8  */
				.update("dsnt_rt_1"           , row.getParameter("dsnt_rt_1"           ))  /*  할인율1  */
				.update("dsnt_rt_2"           , row.getParameter("dsnt_rt_2"           ))  /*  할인율2  */
				.update("dsnt_rt_3"           , row.getParameter("dsnt_rt_3"           ))  /*  할인율3  */
				.update("dsnt_rt_4"           , row.getParameter("dsnt_rt_4"           ))  /*  할인율4  */
				.update("dsnt_rt_5"           , row.getParameter("dsnt_rt_5"           ))  /*  할인율5  */
				.update("evnt_pri"            , row.getParameter("evnt_pri"            ))  /*  행사판매가  */
				.update("cpn_mthd"            , row.getParameter("cpn_mthd"            ))  /*  쿠폰방식  */
				.update("chg_itm_id"          , row.getParameter("chg_itm_id"          ))  /*  대체품목ID  */
				.update("img_1"               , row.getParameter("img_1"               ))  /*  이미지1  */
				.update("img_2"               , row.getParameter("img_2"               ))  /*  이미지2  */
				.update("img_3"               , row.getParameter("img_3"               ))  /*  이미지3  */
				.update("img_4"               , row.getParameter("img_4"               ))  /*  이미지4  */
				.update("img_5"               , row.getParameter("img_5"               ))  /*  이미지5  */
				.update("img_6"               , row.getParameter("img_6"               ))  /*  이미지6  */
				.update("itm_desct"           , row.getParameter("itm_desct"           ))  /*  품목설명  */
				.update("itm_notice"          , row.getParameter("itm_notice"          ))  /*  품목고시  */
				.update("user_memo"            , row.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("sys_memo"            , row.getParameter("sys_memo"            ))  /*  시스템메모  */
				.update("prnt_id"             , row.getParameter("prnt_id"             ))  /*  상위 ID  */
				.update("row_lvl"             , row.getParameter("row_lvl"             ))  /*  ROW레벨  */
				.update("row_ord"             , row.getParameter("row_ord"             ))  /*  ROW순서  */
				.update("row_sts"             , row.getParameter("row_sts"             ))  /*  ROW상태  */
				.update("row_clos"            , row.getParameter("row_clos"            ))  /*  마감여부  */
	        	.update("find_name"      	      , row.getParamText("item_idcd"       	   ).trim()
					                          + row.getParamText("item_name"              ).trim()
					                          + row.getParamText("item_spec"              ).trim() )
				.update("upt_usr_nm"          , row.getParameter("upt_usr_nm"          ))  /*  수정사용자명  */
				.update("upt_ip"              , row.getParameter("upt_ip"              ))  /*  수정IP  */
				.update("upt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("upt_id"              , row.getParameter("upt_id"              ))  /*  수정ID  */
				.update("upt_ui"              , row.getParameter("upt_ui"              ))  /*  수정UI  */
				.insert("crt_usr_nm"          , row.getParameter("crt_usr_nm"          ))  /*  생성사용자명  */
				.insert("crt_ip"              , row.getParameter("crt_ip"              ))  /*  생성IP  */
				.insert("crt_dttm"            , new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crt_id"              , row.getParameter("crt_id"              ))  /*  생성ID  */
				.insert("crt_ui"              , row.getParameter("crt_ui"              ))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

}
