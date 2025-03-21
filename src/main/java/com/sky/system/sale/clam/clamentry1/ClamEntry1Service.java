package com.sky.system.sale.clam.clamentry1;

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
public class ClamEntry1Service {


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
			.where("select  a.invc_numb      , a.invc_date       , a.bzpl_idcd       , a.drtr_idcd       , a.cstm_idcd				")
			.where("      , a.clam_dvcd      , a.item_idcd       , a.make_cmpy_name  , a.prod_date       , a.prod_qntt				")
			.where("      , a.ostt_date      , a.ostt_qntt       , a.stok_qntt       , a.unit_idcd       , a.clam_qntt				")
			.where("      , CONVERT(clam_cont USING utf8) as clam_cont																")
			.where("      , a.clam_resn      , a.ttle            , a.pcmt            , a.proc_date									")
			.where("      , a.proc_drtr_idcd , a.clam_proc_dvcd  , a.stok_proc_dvcd  , a.caus_memo       , a.proc_memo				")
			.where("      , a.mesu_memo      , a.orig_invc_numb  , a.orig_seqn       , a.proc_invc_numb  , a.proc_seqn				")
			.where("      , a.labr_cnfm_date , a.labr_drtr_idcd  , a.labr_memo       , a.qult_cnfm_date  , a.qult_drtr_idcd			")
			.where("      , a.qult_memo      , a.prod_cnfm_date  , a.prod_drtr_idcd  , a.pckg_drtr_idcd  , a.lott_numb				")
			.where("      , a.prod_memo      , a.istt_date       , a.istt_qntt       , a.mker_lott_numb								")
			.where("      , a.user_memo      , a.sysm_memo       , a.prnt_idcd  , a.line_levl										")
			.where("      , a.line_ordr      , a.line_stat       , a.line_clos  , a.find_name   , a.updt_user_name					")
			.where("      , a.updt_ipad      , a.updt_dttm       , a.updt_idcd  , a.updt_urif   , a.crte_user_name					")
			.where("      , a.crte_ipad      , a.crte_dttm       , a.crte_idcd  , a.crte_urif										")
			.where("      , i.item_name      , i.item_spec       , i.item_code  , u1.user_name as drtr_name							")
			.where("      , u2.user_name as proc_drtr_name       , u3.user_name as labr_drtr_name  , u4.user_name as prod_drtr_name	")
			.where("      , u5.user_name as pckg_drtr_name       , c.cstm_name  , c.cstm_code   , i.acct_bacd						")
			.where("      , concat(left(a.invc_numb, 2), '-', right(a.invc_numb, 3)) as clam_numb									")
			.where("from    clam_mast a																								")
			.where("        left outer join item_mast i on a.item_idcd = i.item_idcd												")
			.where("        left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("        left outer join user_mast u1 on a.drtr_idcd = u1.user_idcd												")
			.where("        left outer join user_mast u2 on a.proc_drtr_idcd = u2.user_idcd											")
			.where("        left outer join user_mast u3 on a.labr_drtr_idcd = u3.user_idcd											")
			.where("        left outer join user_mast u4 on a.prod_drtr_idcd = u4.user_idcd											")
			.where("        left outer join user_mast u5 on a.pckg_drtr_idcd = u5.user_idcd											")
			.where("where   1=1																										")
			.where("and     a.find_name   like %:find_name% " , arg.getParamText("find_name" ))
			.where("and		a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and		a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and		a.ostt_date  >= :ostt1_date		" , arg.getParamText("ostt1_date" ))
			.where("and		a.ostt_date  <= :ostt2_date		" , arg.getParamText("ostt2_date" ))
			.where("and		a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and		a.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and		a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and		a.proc_drtr_idcd = :proc_drtr_idcd		" , arg.getParamText("proc_drtr_idcd" ))
			.where("and		a.clam_dvcd   = :clam_dvcd		" , arg.getParamText("clam_dvcd" ))
			.where("and		a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and		a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(") a																							")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

				data.param
					.table("clam_mast"														)
					.where("where invc_numb = :invc_numb									")  /*  사업장ID  */
					.where("and   invc_date = :invc_date									")		/*  접수일자  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"				))  /*  INVOICE번호  */
					.unique("invc_date"			, row.fixParameter("invc_date"				))  /*  INVOICE일자  */
					//
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"				))  /*  사업장ID  */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"				))  /*  담당자ID  */
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"				))  /*  거래처ID  */
					.update("clam_dvcd"			, row.getParameter("clam_dvcd"				))  /*  클레임구분코드  */
					.update("item_idcd"			, row.getParameter("item_idcd"				))  /*  품목ID  */
					.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"			))  /*  제조사명  */
					.update("prod_date"			, row.getParameter("prod_date"				))  /*  생산일자  */
					.update("prod_qntt" 		, row.getParameter("prod_qntt"				))  /*  생산수량  */
					.update("ostt_date"			, row.getParameter("ostt_date"				))  /*  출고일자  */
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"				))  /*  출고수량  */
					.update("stok_qntt"			, row.getParameter("stok_qntt"				))  /*  재고수량 */
					.update("unit_idcd"			, row.getParameter("unit_idcd"				))  /*  단위ID */
					.update("clam_qntt"			, row.getParameter("clam_qntt"				))  /*  클레임수량 */
					.update("clam_cont"			, row.getParameter("clam_cont"				))  /*  클레임낸용 */
					.update("clam_resn"			, row.getParameter("clam_resn"				))  /*  클레임사유 */
					.update("ttle"				, row.getParameter("ttle"					))  /*  제목 */
					.update("pcmt"				, row.getParameter("pcmt"					))  /*  특이사항 */
					.update("proc_date"			, row.getParameter("proc_date"				))  /*  처리일자  */
					.update("proc_drtr_idcd"	, row.getParameter("proc_drtr_idcd"			))  /*  처리담당자ID  */
					.update("clam_proc_dvcd"	, row.getParameter("clam_proc_dvcd"			))  /*  클레임처리구분코드  */
					.update("stok_proc_dvcd"	, row.getParameter("stok_proc_dvcd"			))  /*  재고처리구분코드 */
					.update("caus_memo"			, row.getParameter("caus_memo"				))  /*  원인메모  */
					.update("proc_memo"			, row.getParameter("proc_memo"				))  /*  처리메모  */
					.update("mesu_memo"			, row.getParameter("mesu_memo"				))  /*  대첵메모  */
					.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"			))  /*  원INVOICE번호  */
					.update("orig_seqn"			, row.getParameter("orig_seqn"				))  /*  원순번  */
					.update("proc_invc_numb"	, row.getParameter("proc_invc_numb"			))  /*  처리INVOICE번호  */
					.update("proc_seqn"			, row.getParameter("proc_seqn"				))  /*  처리순번 */
					.update("labr_cnfm_date"	, row.getParameter("labr_cnfm_date"			))  /*  연구소확인일자 */
					.update("labr_drtr_idcd"	, row.getParameter("labr_drtr_idcd"			))  /*  연구소담당자ID */
					.update("labr_memo"			, row.getParameter("labr_memo"				))  /*  연구소메모  */
					.update("qult_cnfm_date"	, row.getParameter("qult_cnfm_date"			))  /*  품질확인일자  */
					.update("qult_drtr_idcd"	, row.getParameter("qult_drtr_idcd"			))  /*  품질담당자ID  */
					.update("qult_memo"			, row.getParameter("qult_memo"				))  /*  품질메모  */
					.update("prod_cnfm_date"	, row.getParameter("prod_cnfm_date"			))  /*  생산확인일자  */
					.update("prod_drtr_idcd"	, row.getParameter("prod_drtr_idcd"			))  /*  생산담당자ID  */
					.update("pckg_drtr_idcd"	, row.getParameter("pckg_drtr_idcd"			))  /*  포장담당자ID  */
					.update("lott_numb"			, row.getParameter("lott_numb"				))  /*  Batch No */
					.update("prod_memo"			, row.getParameter("prod_memo"				))  /*  생산메모  */
					.update("istt_date"			, row.getParameter("istt_date"				))  /*  입고일자  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"				))  /*  입고수량  */
					.update("mker_lott_numb"	, row.getParameter("mker_lott_numb"			))  /*  제조사 LOT번호  */

					.update("user_memo"			, row.getParameter("user_memo"            ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"            ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"            ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"            ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"            ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("item_name"            ).trim()
												+ " "
												+ row.getParamText("item_spec"            ).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"       ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"            ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"            ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"            ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"       ))  /*  생성사 자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"            ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"            ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"            ))  /*  생성UI  */
				;data.attach(rowaction);

		}
		data.execute();
		return null ;
	}

	//삭제
		public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.table("clam_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
				.update("line_stat"		, 2)
				.update("updt_ipad"		, arg.remoteAddress)
				.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;
			data.attach(Action.update);
			data.execute();


			return null;
		}
}
