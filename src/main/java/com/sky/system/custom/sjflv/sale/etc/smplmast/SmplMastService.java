package com.sky.system.custom.sjflv.sale.etc.smplmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class SmplMastService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 																				")
		;
		data.param
			.query("select *																										")
		;
		data.param
			.where("from (																											")
			.where("select  a.invc_numb      , a.invc_date       , a.amnd_degr       , a.drtr_idcd									")
			.where("      , a.bzpl_idcd      , a.cstm_name       , a.smpl_usge_dvcd  , a.cstm_drtr_name  , a.post_code				")
			.where("      , a.addr_1fst      , a.addr_2snd       , a.tele_numb       , a.reqt_memo       , a.regi_item_yorn			")
			.where("      , a.item_idcd      , a.item_name       , a.item_spec       , a.reqt_qntt       , a.cstm_idcd				")
			.where("      , a.reqt_unit      , a.npay_yorn       , a.sply_amnt       , a.vatx_amnt       , a.ttsm_amnt				")
			.where("      , a.deli_date      , a.ostt_schd_date  , a.prod_date       , a.prod_drtr_idcd  , a.prod_qntt				")
			.where("      , a.prod_unit      , a.ostt_date       , a.ostt_drtr_idcd  , a.ostt_qntt       , a.ostt_unit				")
			.where("      , a.smpl_stat_dvcd , CONVERT(item_memo USING utf8) as item_memo											")
			.where("      , a.user_memo      , a.sysm_memo       , a.prnt_idcd       , a.line_levl									")
			.where("      , a.line_ordr      , a.line_stat       , a.line_clos       , a.find_name       , a.updt_user_name			")
			.where("      , a.updt_ipad      , a.updt_dttm       , a.updt_idcd       , a.updt_urif       , a.crte_user_name			")
			.where("      , a.crte_ipad      , a.crte_dttm       , a.crte_idcd       , a.crte_urif       , b.bzpl_name				")
			.where("      , u1.user_name as drtr_name            , c.cstm_code       , i.item_code       , a.labr_drtr_idcd			")
			.where("      , u2.user_name as prod_drtr_name       , u3.user_name as ostt_drtr_name									")
			.where("      , u4.user_name as labr_drtr_name																			")
			.where("      , a.ostt_amnt      , a.ostt_vatx       , a.ostt_smam														")
			.where("from    smpl_mast a																								")
			.where("        left outer join bzpl_mast b on a.bzpl_idcd = b.bzpl_idcd												")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd												")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("        left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd												")
			.where("        left outer join user_mast u2 on a.prod_drtr_idcd = u2.user_idcd											")
			.where("        left outer join user_mast u3 on a.ostt_drtr_idcd = u3.user_idcd											")
			.where("        left outer join user_mast u4 on a.labr_drtr_idcd = u4.user_idcd											")
			.where("where   1=1																										")
		;

		if (!"on".equals(arg.getParamText("amnd_history"))) {
			data.param
				.where("   and a.amnd_degr = (select max(amnd_degr) from smpl_mast where invc_numb = a.invc_numb)					")
			;
		}

		data.param
			.where("   and a.find_name like %:find_name%			" , arg.getParamText("find_name" ))
			.where("   and a.bzpl_idcd   = :bzpl_idcd				" , arg.getParamText("bzpl_idcd" ))		//사업장
			.where("   and a.invc_date  >= :invc1_date				" , arg.getParamText("invc1_date" ))	//접수일자
			.where("   and a.invc_date  <= :invc2_date				" , arg.getParamText("invc2_date" ))
			.where("   and a.deli_date  >= :deli1_date				" , arg.getParamText("deli1_date" )) 	//납기일자
			.where("   and a.deli_date  <= :deli2_date				" , arg.getParamText("deli2_date" ))
			.where("   and a.drtr_idcd   = :drtr_idcd				" , arg.getParamText("drtr_idcd" )) 	//담당자
			.where("   and a.cstm_drtr_name like %:cstm_drtr_name%	" , arg.getParamText("cstm_drtr_name"))	//요청담당자
			.where("   and a.labr_drtr_idcd = :labr_drtr_idcd		" , arg.getParamText("labr_drtr_idcd" ))//실험담당자
			.where("   and a.smpl_stat_dvcd = :smpl_stat_dvcd		" , arg.getParamText("smpl_stat_dvcd" ))//진행상태
			.where("   and a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))		//상태
			.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																												")
			.where(" order by a.invc_date desc, a.invc_numb																			")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getInvc(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data	= arg.newStorage("POS");
		String STOR			= arg.getParamText("stor_id");
		String table		= arg.getParamText("table_nm");
		String invc_numb	= arg.getParamText("invc_numb");

		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		data.param
			.query("call fn_seq_gen_v2 (			")
			.query("   :STOR      "  , STOR			)
			.query(" , :table     "  , table		)
			.query(" , :invc_numb "  , invc_numb	)
			.query(" )								")
		;
		return data.selectForMap();
	}

	public SqlResultMap setAmend(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String invc_numb = arg.getParamText("invc_numb") ;
		int	   amnd_degr = Integer.parseInt((String)arg.fixParameter("amnd_degr"));
		String hq		 = arg.getParamText("hqof_idcd") ;
		String stor		 = arg.getParamText("stor_id");

		//최신 변경차수인지 검증을 한다.
		data.param
			.query("select ifnull(max(amnd_degr), 0) as amnd_degr ")
			.query("  from smpl_mast" )
			.query(" where invc_numb = :invc_numb", invc_numb)
		;
		SqlResultRow info = data.selectForRow();
		if (amnd_degr < Integer.parseInt(info.getParamText("amnd_degr"))) {
			throw new ServiceException("최신 변경차수만  Amand 할 수 있습니다." );
		}

		data.clear();
		data.param
			.query("select line_clos, smpl_stat_dvcd ")
			.query("  from smpl_mast" )
			.query(" where invc_numb = :invc_numb", invc_numb)
			.query("   and amnd_degr = :amnd_degr", amnd_degr)
		;
		info = data.selectForRow();
		if ("1".equals(info.getParamText("line_clos"))) {
			throw new ServiceException("마감되어 Amand 할 수 없습니다." );
		}
		if ("4000".equals(info.getParamText("smpl_stat_dvcd"))) {
			throw new ServiceException("출고완료되어  Amand 할 수 없습니다." );
		}

		if (hq.length()		== 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call smpl_amend (			")
			.query("  :invc_numb "  , invc_numb	)  // 주문번호
			.query(", :amnd_degr "  , amnd_degr	)  // 주문번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	public SqlResultMap setCopy(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;

		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }

		data.clear();
		data.param
			.query("call auto_sjung_smpl_copy (			")
			.query("   :STOR "       , stor			)  // 본사코드
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("smpl_mast"														)
					.where("where invc_numb = :invc_numb									")  /*  INVOICE번호  */
					.where("and   amnd_degr = :amnd_degr									")  /*  AMD차수 */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"))      /*  INVOICE번호  */
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"))      /*  AMD차수 */

					//
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))  /*  사업장ID */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자ID */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  INVOICE일자 */
					.update("smpl_dvcd"			, row.getParameter("smpl_dvcd"			))  /*  샘플구분코드    */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"			))  /*  거래처명    */
					.update("cstm_name"			, row.getParameter("cstm_name"			))  /*  거래처명    */
					.update("smpl_mcls_name"	, row.getParameter("smpl_mcls_name"		))  /*  샘플중분류명     */
					.update("smpl_usge_dvcd"	, row.getParameter("smpl_usge_dvcd"		))  /*  샘플용도구분코드 */
					.update("item_idcd" 		, row.getParameter("item_idcd"			))  /*  품목ID  */
					.update("item_name" 		, row.getParameter("item_name"			))  /*  품목명  */
					.update("item_spec" 		, row.getParameter("item_spec"			))  /*  품목규격  */
					.update("post_code"			, row.getParameter("post_code"			))  /*  우편번호     */
					.update("addr_1fst"			, row.getParameter("addr_1fst"			))  /*  주소1     */
					.update("addr_2snd"			, row.getParameter("addr_2snd"			))  /*  주소2     */
					.update("tele_numb"			, row.getParameter("tele_numb"			))  /*  전화번호     */
					.update("item_memo"			, row.getParameter("item_memo"			))  /*  품목메모     */
					.update("cstm_drtr_name"	, row.getParameter("cstm_drtr_name"		))  /*  거래처담당자명    */
					.update("test_drtr_name"	, row.getParameter("test_drtr_name"		))  /*  실험담당자명     */
					.update("reqt_qntt"			, row.getParameter("reqt_qntt"			))  /*  결제금액   */
					.update("esti_amnt"			, row.getParameter("esti_amnt"			))  /*  결제금액   */
					.update("sply_amnt"			, row.getParameter("sply_amnt"			))  /*  공급가액   */
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))  /*  부가세액   */
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))  /*  합계금액   */
					.update("deli_date"			, row.getParameter("deli_date"			))  /*  납기일자   */
					.update("labr_drtr_idcd"	, row.getParameter("labr_drtr_idcd"		))  /*  샘플대분류코드    */
					.update("smpl_stat_dvcd"	, row.getParameter("smpl_stat_dvcd"		))  /*  샘플대분류코드    */
					.update("reqt_memo"			, row.getParameter("reqt_memo"			))  /*  요청메모    */

					.update("user_memo"			, row.getParameter("user_memo"            ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"            ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"            ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"            ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"            ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_name"             ).trim()
												+ " "
												+ row.getParamText("item_name"             ).trim())
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
				data.execute();
		}
		data.execute();
		return null ;
	}

	//삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String invc_numb = (String)arg.fixParameter("invc_numb");
		int	   amnd_degr = Integer.parseInt((String)arg.fixParameter("amnd_degr"));

		//최신 변경차수인지 검증을 한다.
		data.param
			.query("select ifnull(max(amnd_degr), 0) as amnd_degr ")
			.query("  from smpl_mast" )
			.query(" where invc_numb = :invc_numb", invc_numb)
		;
		SqlResultRow info = data.selectForRow();
		if (amnd_degr < Integer.parseInt(info.getParamText("amnd_degr"))) {
			throw new ServiceException("최신 변경차수만 삭제할 수 있습니다." );
		}

		data.clear();
		data.param
			.query("select line_clos, smpl_stat_dvcd ")
			.query("  from smpl_mast" )
			.query(" where invc_numb = :invc_numb", invc_numb)
			.query("   and amnd_degr = :amnd_degr" , amnd_degr)
		;
		info = data.selectForRow();
		if ("1".equals(info.getParamText("line_clos"))) {
			throw new ServiceException("마감되어 삭제 할 수 없습니다." );
		}
		if ("4000".equals(info.getParamText("smpl_stat_dvcd"))) {
			throw new ServiceException("출고완료되어  삭제할 수 없습니다." );
		}

		data.clear();
		data.param
			.table("smpl_mast")
			.where("where invc_numb = :invc_numb ")
			.where("  and amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, invc_numb)
			.unique("amnd_degr"		, amnd_degr)
		;
		data.attach(Action.delete);
		data.execute();

		return null;
	}
}
