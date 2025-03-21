package com.sky.system.item;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

@Service
public class ItemBunchService  extends DefaultServiceHandler {

//	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select i.item_idcd                     ")
			.query("      ,i.item_code                     ")
			.query("      ,i.item_name                     ")
			.query("      ,s.bunch_gb                    ")
		;
		data.param // 조건
			.where("  from item_bunch a                  ")
			.where("       join itm_stor s             ")
			.where("         on s.stor_id = a.stor_id  ")
			.where("        and s.item_idcd = a.item_idcd    ")
			.where("       join itm_mst i              ")
			.where("         on i.item_idcd = a.item_idcd    ")
			.where(" where a.stor_id = :stor_id        ", arg.fixParameter("stor_id"))
			.where("   and a.item_idcd = :item_idcd          ", arg.getParameter("item_idcd"))
			.where("   and a.prnt_id = '0'             ")
			.where("   and a.row_sts <= 1              ")
			.where(" order by a.item_idcd                  ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.query("select a.prnt_id                   ")
			.query("      ,a.item_idcd                     ")
			.query("      ,i.item_code                     ")
			.query("      ,i.item_name                     ")
			.query("      ,i.item_spec                     ")
			.query("      ,u.unit_name                     ")
			.query("      ,i.unt_qty                    ")
			.query("      ,a.item_qty                    ")
			.query("      ,a.option_yn                   ")
			.query("      ,a.row_ord                   ")
			.query("      ,a.user_memo                   ")
			.query("  from item_bunch a                  ")
			.query("       join itm_mst i              ")
			.query("         on i.item_idcd = a.item_idcd    ")
			.query("       left outer join item_unit u   ")
			.query("         on u.unit_idcd = i.unit_idcd    ")
			.query(" where a.stor_id = :stor_id        ", arg.fixParameter("stor_id"))
			.query("   and a.prnt_id = :prnt_id      ", arg.fixParameter("prnt_id"))
			.query("   and a.row_sts <= 1              ")
			.query(" order by a.row_ord                ")
		;

		return data.selectForMap();
	}

	/**
	 * 상품검색
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 쿼리문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param // 쿼리문  입력
			.query("  select a.stor_grp     , a.stor_id 				")
			.query("     ,   a.mst_itm_id   , b.mst_itm_cd   , b.unt_qty  ")
			.query("     ,   b.item_idcd       , b.item_code       , b.item_name   	")
			.query("     ,   b.unit_idcd       ,(select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name ")
			.query("     ,   b.mfg_id       ,(select bas_nm from base_mst where bas_id = b.mfg_id) as mfg_nm ")
			.query("     ,   b.brand_id     ,(select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm ")
			.query("     ,   case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
			.query("     ,   b.item_spec       , b.po_pri  , b.notax_yn  , a.pack_gb  , a.vend_id ")
		;
		data.param // 조건문 입력
			.where("  from   itm_stor      a                           ")
			.where("         join itm_mst  b on b.item_idcd = a.item_idcd  ")
			.where("  where  a.bunch_gb in ('1', '2')                    ")
			.where("  and    a.stor_id    = :stor_id  " , arg.fixParameter("stor_id"  ))
			.where("  and    b.item_name like %:item_name%  " , arg.getParameter("item_name"   ))
			.where("  and    a.item_idcd  in ( select item_idcd  from scan_mst  where scan_cd like :scan_cd% ) " , arg.getParameter("barcode"   ))
			.where("  and    b.class_id in ( select class_id from item_class start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where("  and    b.mfg_id     = :mfg_id     " , arg.getParameter("mfg_id"   ))
			.where("  and    b.brand_id   = :brand_id   " , arg.getParameter("brand_id" ))
			.where("  and    a.vend_id    = :vend_id    " , arg.getParameter("vend_id"  ))
			.where("  and    a.row_sts  = :row_sts   " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("  and    a.row_sts <= :row_sts   " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 세트상품 검색
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getParentItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select  a.stor_grp     , a.stor_id                            ")
			.query("   ,    a.mst_itm_id      , b.mst_itm_cd   , b.unt_qty              ")
			.query("   ,    b.item_idcd      , b.item_code   , b.item_name  , b.item_spec  ")
			.query("   ,    b.unit_idcd      , b.mfg_id    , b.brand_id , b.notax_yn ")
			.query("   ,    (select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name   ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.mfg_id) as mfg_nm     ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm ")
			.query("   ,    case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		;
		data.param // 조건
			.where("  from   itm_stor      a                           ")
			.where("         join itm_mst  b on b.item_idcd = a.item_idcd  ")
			.where("  where  a.stor_id    = :stor_id  " , arg.fixParameter("stor_id"  ))
			.where("  and    b.item_name like %:item_name%  " , arg.getParameter("item_name"   ))
			.where("  and    a.item_idcd  in ( select item_idcd  from scan_mst  where scan_cd like :scan_cd% ) " , arg.getParameter("barcode"   ))
			.where("  and    b.class_id in ( select class_id from item_class start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where("  and    b.mfg_id     = :mfg_id     " , arg.getParameter("mfg_id"   ))
			.where("  and    b.brand_id   = :brand_id   " , arg.getParameter("brand_id" ))
			.where("  and    a.vend_id    = :vend_id    " , arg.getParameter("vend_id"  ))
//			.where("  and    a.sale_epo   = '1'  										") /* 수주가능 */
			.where("  and    a.row_sts  = :row_sts   " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("  and    a.row_sts <= :row_sts   " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("  and    a.item_idcd not in (select item_idcd from item_bunch where stor_id = :stor_id) ", arg.fixParameter("stor_id")) // 세트상품이나 구성상품으로 이미 등록된 상품은 제외
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 세트 구성상품 검색
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getChildItem(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select  a.stor_grp     , a.stor_id                            ")
			.query("   ,    a.mst_itm_id      , b.mst_itm_cd   , b.unt_qty              ")
			.query("   ,    b.item_idcd      , b.item_code   , b.item_name  , b.item_spec  ")
			.query("   ,    b.unit_idcd      , b.mfg_id    , b.brand_id , b.notax_yn ")
			.query("   ,    (select unit_name from item_unit where unit_idcd = b.unit_idcd) as unit_name   ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.mfg_id) as mfg_nm     ")
			.query("   ,    (select bas_nm from base_mst where bas_id = b.brand_id) as brand_nm ")
			.query("   ,    case when a.stad_sale_pri = 0 then b.stad_sale_pri else a.stad_sale_pri end as stad_sale_pri ")
		;
		data.param // 조건
			.where("  from   itm_stor      a                           ")
			.where("         join itm_mst  b on b.item_idcd = a.item_idcd  ")
			.where("  where  a.stor_id    = :stor_id  " , arg.fixParameter("stor_id"  ))
			.where("  and    b.item_name like %:item_name%  " , arg.getParameter("item_name"   ))
			.where("  and    a.item_idcd  in ( select item_idcd  from scan_mst  where scan_cd like :scan_cd% ) " , arg.getParameter("barcode"   ))
			.where("  and    b.class_id in ( select class_id from item_class start with class_id = :class_id  connect by prior class_id = prnt_id )" , arg.getParameter("class_id"  ))
			.where("  and    b.mfg_id     = :mfg_id     " , arg.getParameter("mfg_id"   ))
			.where("  and    b.brand_id   = :brand_id   " , arg.getParameter("brand_id" ))
			.where("  and    a.vend_id    = :vend_id    " , arg.getParameter("vend_id"  ))
//			.where("  and    a.sale_epo   = '1'  										") /* 수주가능 */
			.where("  and    a.row_sts  = :row_sts   " , "0"  ,( "0".equals(arg.getParamText("row_sts")) )) // 정상 거래처만 조회 요청한 경우
			.where("  and    a.row_sts <= :row_sts   " , "1"  ,(!"0".equals(arg.getParamText("row_sts")) )) // 정상 거래처가 없거나.. 다른 값인 경우
			.where("  and    a.item_idcd not in (select item_idcd from item_bunch where stor_id = :stor_id and prnt_id = '0') ", arg.fixParameter("stor_id")) // 세트상품으로 이미 등록된 상품은 제외
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 * 세트상품 등록/수정/삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				data.param
	    			.table("item_bunch")
	    			.where("where stor_id  = :stor_id                       ")
	    			.where("  and (( item_idcd = :item_idcd and prnt_id = '0' ) ")
	    			.where("      or prnt_id = :prnt_id                   ")
	    			.where("      )                                           ")
	        		//
        			.unique("stor_id" , row.fixParameter("stor_id"))
        			.unique("item_idcd"  , row.fixParameter("item_idcd"))
        			.unique("prnt_id", row.fixParameter("item_idcd"))
	        	;data.attach(rowaction);

				data.param
	    			.table("itm_stor")
        			.where("where stor_id = :stor_id ")
        			.where("  and item_idcd = :item_idcd   ")
        			//
        			.unique("stor_id"    , row.fixParameter("stor_id"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.update("bunch_gb"    , "0")
					.update("upt_id"   , row.getParameter("upt_id"))
					.update("upt_ip"   , arg.remoteAddress)
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				;data.attach(Action.update);
			} else {

				data.param
	    			.table("item_bunch")
        			.where("where stor_id = :stor_id ")
        			.where("  and item_idcd = :item_idcd   ")
        			.where("  and prnt_id = '0'      ")
        			//
		        	.insert("hq_id"    , row.fixParameter("hq_id"))
		        	.insert("stor_grp"    , row.fixParameter("stor_grp"))
        			.unique("stor_id"    , row.fixParameter("stor_id"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.insert("item_qty"    , row.getParameter("item_qty"))
	        		.insert("option_yn"   , row.getParameter("option_yn"))
//					.update("user_memo"   , row.getParameter("user_memo"))
//					.update("sys_memo"   , row.getParameter("sys_memo"))
//					.update("row_ord"   , row.getParameter("row_ord"))
//					.update("row_sts"   , row.getParameter("row_sts"))
        			.insert("prnt_id"   , row.getParameter("prnt_id"))
					.update("upt_id"   , row.getParameter("upt_id"))
					.update("upt_ip"   , arg.remoteAddress)
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_id"   , row.getParameter("crt_id"))
					.insert("crt_ip"   , arg.remoteAddress)
					.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				;data.attach(rowaction);

				// 세트상품의 구분이 '결합상품'인 경우 구성상품은 모두 '필수상품'으로 저장
				if (rowaction == Action.update && "1".equals(row.getParamText("bunch_gb"))) {

					data.param
		    			.table("item_bunch")
		    			.where("where stor_id = :stor_id   ")
		    			.where("  and prnt_id = :prnt_id ")
		    			//
		    			.unique("stor_id"    , row.fixParameter("stor_id"))
		    			.unique("prnt_id"   , row.fixParameter("item_idcd"))
		        		.update("option_yn"   , "0") // 0:필수상품/1:옵션상품
						.update("upt_id"   , row.getParameter("upt_id"))
						.update("upt_ip"   , arg.remoteAddress)
						.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					;data.attach(rowaction);
				}

				data.param
	    			.table("itm_stor")
        			.where("where stor_id = :stor_id ")
        			.where("  and item_idcd = :item_idcd   ")
        			//
        			.unique("stor_id"    , row.fixParameter("stor_id"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.update("bunch_gb"    , row.getParameter("bunch_gb"))
					.update("upt_id"   , row.getParameter("upt_id"))
					.update("upt_ip"   , arg.remoteAddress)
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				;data.attach(Action.update);
			}
		}

		data.execute();
		return null;
	}

	/**
	 * 구성상품 등록/수정/삭제
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {

				data.param
	    			.table("item_bunch")
	    			.where("where stor_id  = :stor_id  ")
	    			.where("  and item_idcd = :item_idcd     ")
	    			.where("  and prnt_id = :prnt_id ")
	        		//
        			.unique("stor_id" , row.fixParameter("stor_id"))
        			.unique("item_idcd"  , row.fixParameter("item_idcd"))
        			.unique("prnt_id", row.fixParameter("prnt_id"))
	        	;data.attach(rowaction);

			} else {

				data.param
	    			.table("item_bunch")
	    			.where("where stor_id  = :stor_id  ")
	    			.where("  and item_idcd = :item_idcd     ")
	    			.where("  and prnt_id = :prnt_id ")
        			//
		        	.insert("hq_id"    , row.fixParameter("hq_id"))
		        	.insert("stor_grp"    , row.fixParameter("stor_grp"))
        			.unique("stor_id"    , row.fixParameter("stor_id"))
        			.unique("item_idcd"     , row.fixParameter("item_idcd"))
	        		.update("item_qty"    , row.getParameter("item_qty"))
	        		.update("option_yn"   , row.getParameter("option_yn"))
					.update("user_memo"   , row.getParameter("user_memo"))
//					.update("sys_memo"   , row.getParameter("sys_memo"))
					.update("row_ord"   , row.getParameter("row_ord"))
//					.update("row_sts"   , row.getParameter("row_sts"))
        			.unique("prnt_id"   , row.getParameter("prnt_id"))
					.update("upt_id"   , row.getParameter("upt_id"))
					.update("upt_ip"   , arg.remoteAddress)
					.update("upt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
					.insert("crt_id"   , row.getParameter("crt_id"))
					.insert("crt_ip"   , arg.remoteAddress)
					.insert("crt_dttm"   , new SqlParamText("to_char(sysdate, 'yyyymmddhh24miss')"))
				;data.attach(rowaction);
			}
		}

		data.execute();
		return null;
	}
}
