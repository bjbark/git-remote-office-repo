package com.sky.system.custom.sjflv.sale.etc.smplmast2;

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
import com.sky.listener.ParamToJson;


@Service
public class SmplMast2Service {


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
			.where("  select a.invc_numb as new_invc_numb         , a.invc_date      , a.smpl_dvcd          , a.cstm_name			")
			.where("       , a.item_name      , a.spec_1fst       , a.spec_2snd      , a.smpl_qntt_cont     , a.smpl_esti_cont		")
			.where("       , a.smpl_usge_dvcd , a.lott_numb 	  , a.sale_drtr_name , a.labr_drtr_name		, a.pcmt				")
			.where("       , a.remk_text      , a.sply_amnt  	  , a.deli_date 	 , a.prog_memo		 	, a.rslt_proc			")
			.where("       , cast(json_value(a.json_data,'$.fema'      ) as char) as fema											")
			.where("       , cast(json_value(a.json_data,'$.hala_cont' ) as char) as hala_cont										")
			.where("       , case when a.smpl_dvcd = 1 then b.base_name																")
			.where("              when a.smpl_dvcd = 3 then c.base_name																")
			.where("              else null 																						")
		    .where("         end as smpl_clss_name 																					")
		    .where("       , smpl_clss_code 																						")
			.where("  from smpl_trst_mast a																							")
			.where("       left outer join base_mast b on a.smpl_clss_code  = b.base_code	and b.prnt_idcd = '4200'				")
			.where("       left outer join base_mast c on a.smpl_clss_code  = c.base_code	and c.prnt_idcd = '4210'				")
			.where(" where 1 = 1																									")
		;
		data.param
			.where("   and a.find_name like %:find_name%			" , arg.getParamText("find_name" ))
			.where("   and a.invc_date  >= :invc_date1				" , arg.getParamText("invc_date1" ))
			.where("   and a.invc_date  <= :invc_date2				" , arg.getParamText("invc_date2" ))
			.where("   and a.smpl_dvcd   = :smpl_dvcd				" , arg.getParamText("smpl_dvcd" ))
			.where("   and a.line_clos   = :line_clos				" , arg.getParamText("line_clos" ))		//상태
		;
		if(!arg.getParamText("smpl_dvcd" ).equals("5")){
			data.param
				.where("   and a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			;
		}
		data.param
			.where(" order by a.invc_date asc, a.invc_numb asc																		")
			.where(") a																												")
		;
		if(arg.getParamText("smpl_dvcd" ).equals("5")){
			data.param
				.where(" order by a.invc_date, a.cstm_name, a.deli_date																")
			;
		}

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


	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("smpl_trst_mast												")
					.where("where invc_numb  = :invc_numb								")

					.unique("invc_numb"			, row.fixParameter("new_invc_numb"		))

					.update("line_stat"         , 2)
					.update("updt_ipad"			, arg.remoteAddress)
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.update("updt_idcd"			, row.getParameter("upt_id"             ))
				;data.attach(Action.update);
			} else {
				ParamToJson p = new ParamToJson();
				String json = p.TranslateRow(arg, row, "smpl_trst_mast_json_fields");

				data.param
					.table("smpl_trst_mast"												)
					.where("where invc_numb = :invc_numb							   ")  /*  사업장ID  */
					//
					.unique("invc_numb"			, row.fixParameter("new_invc_numb")		)  /*  INVOICE번호  */

					//
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  INVOICE일자 */
					.update("smpl_dvcd"			, row.getParameter("smpl_dvcd"			))  /*  샘플구분코드    */
					.update("cstm_name"			, row.getParameter("cstm_name"			))  /*  거래처명    */
					.update("item_name" 		, row.getParameter("item_name"			))  /*  품목명  */
					.update("spec_1fst"			, row.getParameter("spec_1fst"			))  /*  규격1     */
					.update("spec_2snd"			, row.getParameter("spec_2snd"			))  /*  규격2     */

					.update("smpl_qntt_cont"	, row.getParameter("smpl_qntt_cont"		))  /*  샘플수량내용     */
					.update("smpl_esti_cont"	, row.getParameter("smpl_esti_cont"		))  /*  샘플견적내용     */
					.update("smpl_usge_dvcd"	, row.getParameter("smpl_usge_dvcd"		))  /*  샘플용도구분코드 */
					.update("smpl_clss_code"	, row.getParameter("smpl_clss_code"		))  /*  샘플분류코드    */

					.update("lott_numb"			, row.getParameter("lott_numb"			))  /*  LOT번호      */
					.update("sale_drtr_name"	, row.getParameter("sale_drtr_name"		))  /*  영업담당자명    */
					.update("labr_drtr_name"	, row.getParameter("labr_drtr_name"		))  /*  연구담당자명     */
					.update("pcmt"				, row.getParameter("pcmt"				))  /*  특이사항      */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고      */

					.update("prog_memo"			, row.getParameter("prog_memo"			))  /*  샘플진행     */
					.update("deli_date"			, row.getParameter("deli_date"			))  /*  전달일자     */
					.update("rslt_proc"			, row.getParameter("rslt_proc"          ))  /*  테스트결과  */
					.update("json_data"			, json)  /*    */

					.update("user_memo"			, row.getParameter("user_memo"            ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"            ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"            ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"            ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"            ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */

					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("upt_id"                ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crt_id"                ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;

				String find_name = "";
				String spec = row.getParamText("spec_1fst").concat(row.getParamText("spec_2snd"));
				if ("4".equals(row.getParameter("smpl_dvcd"))) {
					find_name = row.getParameter("cstm_name") + " " + row.getParameter("item_name")      + " " + row.getParameter("spec_1fst")
				              + row.getParameter("sale_drtr_name") + " " + row.getParameter("labr_drtr_name");
				} else if ("5".equals(row.getParameter("smpl_dvcd"))) {
					find_name = row.getParameter("labr_drtr_name") + " " + row.getParameter("cstm_name")      + " " + row.getParameter("hala_name")
				              + row.getParameter("item_name") + " " + row.getParameter("fema");
				} else {
					find_name = row.getParameter("cstm_name") + " " + row.getParameter("item_name")      + " " + spec
				               + " " + row.getParameter("sale_drtr_name") + " " + row.getParameter("labr_drtr_name");
				}

				data.param
					.update("find_name"			, find_name);

				data.attach(Action.modify);
				data.execute();
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setDelete(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("smpl_trst_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;data.attach(Action.update);
		data.execute();
		return null;
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

			.unique("invc_numb"		, invc_numb)
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
}
