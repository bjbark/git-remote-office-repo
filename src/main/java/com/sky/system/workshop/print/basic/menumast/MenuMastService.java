package com.sky.system.workshop.print.basic.menumast;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.imageio.ImageIO;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service
public class MenuMastService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;
	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계
			.total("select count(1) as maxsize																				")
		;
		data.param
			.query("select																									")
			.query("        a.invc_numb      , a.dspl_rank      , a.clss_name      , a.esti_typl_yorn						")
			.query("      , b.base_name as prnt_name																		")

			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.query("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name			")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
		;
		data.param
			.where("from    disp_gods_mast a																				")
			.where("        left outer join base_mast b  on a.prnt_idcd = b.base_idcd and b.prnt_idcd = '6000'				")
			.where("where   1=1																								")
			.where("and     a.find_name   like %:find_name%      " , arg.getParamText("find_name"))
			.where("and     a.line_stat   = :line_stat1          " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat           " , "2" , "".equals(arg.getParamText("line_stat" )) )
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
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																						")
			.query("        a.invc_numb      , a.line_seqn       , a.type_bacd        , a.item_name				")
			.query("      , a.dspl_rank      , a.exmp_strg       , a.chid_item_idcd   , a.chid_item_name		")
			.query("      , a.lkup_kind_dvcd , a.esti_pric       , a.pric_dvcd        , a.feld_idcd				")
			.query("      , b.base_name as feld_name															")
			.query("      , c1.clss_idcd as lcls_idcd            , c2.clss_idcd as mcls_idcd					")
			.query("      , c3.clss_idcd as scls_idcd															")
			.query("      , case when c3.clss_name is not null then c3.clss_desc								")
			.query("             else case when c2.clss_name is not null then c2.clss_desc						")
			.query("                       else c1.clss_name													")
			.query("                  end																		")
			.query("        end  as clss_desc  																	")

			.query("      , a.user_memo  , a.sysm_memo      , a.crte_urif										")
			.query("      , a.prnt_idcd  , a.line_levl      , a.line_ordr      , a.line_stat    , a.line_clos	")
			.query("      , a.find_name  , a.updt_user_name , a.updt_ipad      , a.updt_dttm    , a.updt_idcd	")
			.query("      , a.updt_urif  , a.crte_user_name , a.crte_ipad      , a.crte_dttm    , a.crte_idcd	")

		;
		data.param
			.where("from    disp_gods_item a																	")
			.where("left outer join base_mast b on a.feld_idcd = b.base_idcd and b.prnt_idcd = '4000'			")
			.where("left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd								")
			.where("left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd								")
			.where("left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd								")

			.where("where   1=1																					")
			.where("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("order by dspl_rank																			")
		;

		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select																									")
			.query("        a.invc_numb      , a.dspl_rank      , a.clss_name      , a.esti_typl_yorn						")
			.query("      , b.base_name as prnt_name																		")

			.query("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.query("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name			")
			.query("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.query("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif			")
		;
		data.param
			.where("from    disp_gods_mast a																				")
			.where("        left outer join base_mast b  on a.prnt_idcd = b.base_idcd and b.prnt_idcd = '6000'				")
			.where("where   1=1																								")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"))

		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select																						")
				.query("        a.invc_numb      , a.line_seqn       , a.type_bacd        , a.item_name				")
				.query("      , a.dspl_rank      , a.exmp_strg       , a.chid_item_idcd   , a.chid_item_name		")
				.query("      , a.lkup_kind_dvcd , a.esti_pric       , a.pric_dvcd        , a.feld_idcd				")
				.query("      , b.base_name as feld_name															")
				.query("      , c1.clss_idcd as lcls_idcd            , c2.clss_idcd as mcls_idcd					")
				.query("      , c3.clss_idcd as scls_idcd															")
				.query("      , case when c3.clss_name is not null then c3.clss_desc								")
				.query("             else case when c2.clss_name is not null then c2.clss_desc						")
				.query("                       else c1.clss_name													")
				.query("                  end																		")
				.query("        end  as clss_desc  																	")



				.query("      , a.user_memo  , a.sysm_memo      , a.crte_urif										")
				.query("      , a.prnt_idcd  , a.line_levl      , a.line_ordr      , a.line_stat    , a.line_clos	")
				.query("      , a.find_name  , a.updt_user_name , a.updt_ipad      , a.updt_dttm    , a.updt_idcd	")
				.query("      , a.updt_urif  , a.crte_user_name , a.crte_ipad      , a.crte_dttm    , a.crte_idcd	")

			;
			data.param
				.where("from    disp_gods_item a																	")
				.where("left outer join base_mast b on a.feld_idcd = b.base_idcd and b.prnt_idcd = '4000'			")
				.where("left outer join item_clss      c1 on a.lcls_idcd = c1.clss_idcd								")
				.where("left outer join item_clss      c2 on a.mcls_idcd = c2.clss_idcd								")
				.where("left outer join item_clss      c3 on a.scls_idcd = c3.clss_idcd								")
				.where("where   1=1																					")
				.where("and     a.invc_numb = :invc_numb         " , arg.fixParameter("invc_numb") )
				.where("order by dspl_rank										")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}

		return info;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			// invoice 등록/수정/삭제
			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {
				// master 등록/수정
				data.param
					.table("disp_gods_mast"                                                    )
					.where("where invc_numb       = :invc_numb                           ")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					//
					.update("dspl_rank"			, row.getParameter("dspl_rank"           ))  /*  전시순위      */
					.update("clss_name"			, row.getParameter("clss_name"           ))  /*  분류명        */
					.update("esti_typl_yorn"	, row.getParameter("esti_typl_yorn"      ))  /*  견적표시여부  */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_date"            ).trim()
												+ " "
												+ row.getParamText("istt_wrhs_idcd"       ).trim()
												+ " "
												+ row.getParamText("cstm_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
					.action = rowaction;
				data.attach();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				data.execute();
				/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
				sequence.setBook(arg, row.getParamText("invc_numb"), 0 , "기타입고");
			}
		}
	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("disp_gods_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
				;data.attach(rowaction);


			} else {
				// detail 등록/수정
				data.param
					.table("disp_gods_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"           ))
					.unique("line_seqn"			, row.fixParameter("line_seqn"           ))
					//
					.update("type_bacd"			, row.getParameter("type_bacd"           ))  /*  타입분류코드   */
					.update("lkup_kind_dvcd"	, row.getParameter("lkup_kind_dvcd"      ))  /*  입력구분코드   */
					.update("pric_dvcd"			, row.getParameter("pric_dvcd"           ))  /*  단가구분        */
					.update("esti_pric"			, row.getParameter("esti_pric"           ))  /*  단가           */
					.update("item_name"			, row.getParameter("item_name"           ))  /*  품목명번        */
					.update("dspl_rank"			, row.getParameter("dspl_rank"           ))  /*  전시순위        */
					.update("exmp_strg"			, row.getParameter("exmp_strg"           ))  /*  예시문구        */
					.update("chid_item_name"	, row.getParameter("chid_item_name"      ))  /*  자식품목ID     */
					.update("chid_item_idcd"	, row.getParameter("chid_item_idcd"      ))  /*  자식품목ID     */
					.update("tool_tipp"			, row.getParameter("tool_tipp"           ))  /*  툴팁            */
					.update("feld_idcd"			, row.getParameter("feld_idcd"           ))  /*              */
					.update("lcls_idcd"			, row.getParameter("lcls_idcd"           ))  /*              */
					.update("mcls_idcd"			, row.getParameter("mcls_idcd"           ))  /*              */
					.update("scls_idcd"			, row.getParameter("scls_idcd"           ))  /*              */

					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"            ).trim()
												+ " "
												+ row.getParamText("item_idcd"            ).trim()
												+ " "
												+ row.getParamText("remk_text"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"      ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"           ))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"           ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"           ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"      ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"           ))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"           ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"           ))  /*  생성UI  */
				;data.attach(rowaction);
			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			data.param
				.table("disp_gods_mast")
				.where("where invc_numb = :invc_numb")
				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.param
				.table("disp_gods_item")
				.where("where invc_numb = :invc_numb")
				.unique("invc_numb", row.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
		}
		return null;
	}

	/**
	 * 상품검색
	 */
	public SqlResultMap getProduct(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		String item_idcd[] = new String[map.size()];
		int idx = 0;
		for (SqlResultRow row:map) {
			item_idcd[idx++] = row.getParamText("item_idcd");
		}

		data.param
		.query("select a.*																								")
		.query("     , concat(ifnull(a.lcls_name,''),ifnull(a.mcls_name,''),ifnull(a.scls_name)) as clss_name			")
		.query("from (																									")
		.query("select																									")
		.query("        a.unit_idcd    , (select unit_name from unit_mast where unit_idcd = a.unit_idcd) as unit_name	")
		.query("     ,  a.item_idcd    , a.item_code  , a.item_name  , a.item_spec   , 1 as piece_qty					")
		.query("     ,  0  as cst_pri																					")
		.query("     ,  ( select sum(stok_qntt) from stok_mast s where a.item_idcd = s.item_idcd ) as stok_qntt			")
		.query("     ,  0  as sale_pri																					")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.istt_wrhs_idcd = r.wrhs_idcd) as istt_wrhs_name		")
		.query("     ,  ( select wrhs_name from wrhs_mast r where a.ostt_wrhs_idcd = r.wrhs_idcd) as ostt_wrhs_name		")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.lcls_idcd ) as  lcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.mcls_idcd ) as  mcls_name				")
		.query("     ,  ( select clss_name from item_class  where clss_idcd = a.scls_idcd ) as  scls_name				")
		.query("     ,  a.modl_name																						")
		.query("from    item_mast a																						")
		.query("where   1=1																								")
		.query("and     a.item_idcd   in (:item_idcd) " , item_idcd )
		.query("and     a.line_stat = 0																					")
		.query("and     a.aset_clss_dvcd in ('4000')                       " , "제품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('1000', '5000','6000','7000') " , "자재".equals(arg.getParameter("aset_clss_dvcd")) )
		.query("and     a.aset_clss_dvcd in ('2000', '3000','7000')        " , "재공품".equals(arg.getParameter("aset_clss_dvcd")) )
		.query(") a																										")
		;

		return data.selectForMap();
	}


	/**
	 * 출력
	 */
	public SqlResultMap getPrinting(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select 																		")
			.query("	   a.inv_no   		as inv_no											") /* 매출번호 (바코드) */
			.query("	,  a.inv_dt   		as inv_dt											") /* 매출일자 */
			.query("	,  b.biz_no      	as send_biz_no 										") /* 공급자 등록번호 */
			.query("	,  b.biz_tel_no  	as send_biz_tel_no 									") /* 공급자 전화번호 */
			.query("	,  b.biz_fax_no  	as send_biz_fax_no 									") /* 공급자 팩스번호 */
			.query("	,  b.biz_nm      	as send_biz_nm 										") /* 공급자 상호 */
			.query("	,  b.biz_owner   	as send_biz_owner 									") /* 공급자 성명 */
			.query("	,  b.addr_1 		as send_biz_addr_1 									") /* 공급자 주소 */
			.query("	,  b.addr_2   		as send_biz_addr_2 									") /* 공급자 주소 상세주소 */
			.query("	,  b.biz_kind    	as send_biz_cond 									") /* 공급자 업태 */
			.query("	,  b.biz_type   	as send_biz_types 									") /* 공급자 종목 */

			.query("	,  b.biz_no  	 	as recv_biz_no      								") /* 공급받는자 등록번호 */
			.query("	,  b.biz_tel_no 	as recv_biz_tel_no 									") /* 공급받는자 전화번호 */
			.query("	,  b.biz_fax_no 	as recv_biz_fax_no 									") /* 공급받는자 팩스번호 */
			.query("	,  b.biz_nm     	as recv_biz_nm 										") /* 공급받는자 상호 */
			.query("	,  b.biz_owner  	as recv_biz_owner 									") /* 공급받는자 성명 */
			.query("	,  b.addr_1 		as recv_biz_addr_1 									") /* 공급받는자 주소 */
			.query("	,  b.addr_2  	 	as recv_biz_addr_2 									") /* 공급받는자 주소 상세주소 */
			.query("	,  b.biz_kind   	as recv_biz_cond  									") /* 공급받는자 업태 */
			.query("	,  b.biz_type  		as recv_biz_types 									") /* 공급받는자 종목 */

			.query("	, -a.qty 			as qty 												") /* 수량 */
			.query("	, -a.sply_amt+a.txfree_amt as sply_amt		 							") /* 공급가 */
			.query("	, -a.tax_amt  		as tax_amt 											") /* 세액 */
			.query("	, -a.inv_amt 		as inv_amt 											") /* 계 */
			.query("	, a.usr_memo 		as usr_memo  										") /* 요청메모(kdarkdev수정) */
			.query("	, (to_char(sysdate, 'yyyy-mm-dd hh24:mi:ss')) as crt_dttm 				") /* 발행일자 */
			.query("    , b.stamp_url       as stamp_url										") /* 직인 이미지 URL */
			.query("	, d.emp_nm         	as inv_user_nm 										") /* 작업자명 */

			.query(" from modi_info a															")
			.query("	  join stor b on a.stor_id = b.stor_id									")
			.query("	  left outer join usr_mst d on a.inv_usr_id = d.emp_id					")
			.query("where a.inv_no = :inv_no " 			, arg.fixParameter("inv_no"             ))
			.query("  and a.row_sts = 0 														")
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() == 1) {
			data.clear();
			data.param
				.query("select 																	")
				.query(" 		a.seq_dsp   	as seq_dsp 										") /* 항번 */
				.query("	,   b.itm_shrt_cd   as itm_shrt_cd 									") /* 단축코드 */
				.query("	,   a.item_code   		as item_code 								") /* 코드 */
				.query("	,   b.brcd_1   		as brcd 										") /* 바코드 */
				.query("	,   (a.item_name + '/' + a.item_spec) as item_name 					") /* 품목 / 규격 */
				.query("	,   (select unit_name from itm_unit where unit_idcd = a.unit_idcd) as unit_name	") /* 단위 */
				.query("    ,   ('(' + a.piece_qty + ')') as piece_qty   						") /* 포장량 */
				.query("	,   -a.qty 			as qty 											") /* 수량 */
				.query("	,   a.pri 		    as pri 											") /* 단가 */
				.query("	,   -a.sply_amt+a.txfree_amt as sply_amt 							") /* 금액 */
				.query("	,   -a.tax_amt 		as tax_amt 										") /* 세액 */
				.query("	,   -a.inv_amt 		as inv_amt 										") /* 합계 */
				.query("  from  modi_item a 													")
				.query("		left outer join itm_mst b on a.item_idcd = b.item_idcd 			")
				.query(" where  a.inv_no = :inv_no 		" 	, 		arg.fixParameter("inv_no"    ))
				.query("   and  a.row_sts = 0                   								")
				.query("order by line_seqn		 												")
			;
			info.get(0).put("product", data.selectForMap());
		}

		return info;
	}
	//TODO 도면 업로드
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//				DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}

//			Date date = new Date();
//			DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
//			String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
		String regExp = "^([\\S]+(\\.(?i)(jpeg||jpg||png||gif||bmp))$)";
		int assi_seqn = Integer.parseInt(arg.fixParamText("assi_seqn"));

		for (int i = 0; i < file_name.size(); i++) {

			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";

//					imageName = arg.getParamText("drwg_numb")+"-"+arg.getParamText("revs_numb")+".png";
			imageName = arg.fixParamText("invc_numb")+'-'+arg.fixParamText("line_seqn")+"_"+(assi_seqn)+".png";

			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// logic 처리 ( DB등 )
					System.out.println(file_name.get(i));
					System.out.println(file_name.get(i).matches(regExp));
					if(file_name.get(i).matches(regExp)){
						ftp.upload(directory, imageName, file[i]);
					}else{
						PDDocument doc = PDDocument.load(file[i].getInputStream());
						PDFRenderer renderer = new PDFRenderer(doc);
						ByteArrayInputStream inputStream = null;
						BufferedImage image = renderer.renderImageWithDPI(0, 300);  // 해상도 조절 300이 좋음
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(image, "png", baos);
						inputStream = new ByteArrayInputStream(baos.toByteArray());

						ftp.upload(directory, imageName, inputStream);		// inputstream로 저장한다 	- 이미지 그대로 저장
						inputStream.close();
						baos.close();
						doc.close();
					}

					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
						.unique("assi_seqn"				, assi_seqn++					)

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect();
				}
			}
		}
		data.execute();
		return map;
	}
}
