package com.sky.system.custom.sjflv.sale.etc.smplostt;

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
import com.sky.utils.StringUtil;


@Service
public class SmplOsttService {


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

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			String smpl_stat_dvcd = (String)row.getParameter("smpl_stat_dvcd");
			String ostt_date = (String)row.getParameter("ostt_date");
			String ostt_drtr_idcd = (String)row.getParameter("ostt_drtr_idcd");
			double ostt_qntt = Double.parseDouble((String)row.getParameter("ostt_qntt"));

			if ("1000".equals(smpl_stat_dvcd)) {
				if (!StringUtil.isEmpty(ostt_date) && !StringUtil.isEmpty(ostt_drtr_idcd) && ostt_qntt > 0) {
					smpl_stat_dvcd = "4000";
				}
			}
				data.param
					.table("smpl_mast"														)
					.where("where invc_numb = :invc_numb									")  /*  사업장ID  */
					.where("and   amnd_degr = :amnd_degr									")		/*  접수일자  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"				))  /*  INVOICE번호  */
					.unique("amnd_degr"			, row.fixParameter("amnd_degr"				))  /*  INVOICE일자  */
					//
					.update("prod_date"			, row.getParameter("prod_date"				))  /*  생산일자 */
					.update("prod_drtr_idcd"	, row.getParameter("prod_drtr_idcd"			))  /*  생산담당자ID    */
					.update("prod_qntt"			, row.getParameter("prod_qntt"				))  /*  생산수량     */
					.update("prod_unit"			, row.getParameter("prod_unit"				))  /*  생산단위     */
					.update("ostt_date"			, ostt_date)  									/*  출고일자     */
					.update("ostt_drtr_idcd"	, ostt_drtr_idcd)  								/*  출고담당자ID  */
					.update("ostt_qntt"			, ostt_qntt)  									/*  출고수량     */
					.update("ostt_amnt"			, row.getParameter("ostt_amnt"				))  /*  공급가액     */
					.update("ostt_vatx"			, row.getParameter("ostt_vatx"				))  /*  부가세     */
					.update("ostt_smam"			, row.getParameter("ostt_smam"				))  /*  합계     */
					.update("npay_yorn"			, row.getParameter("npay_yorn"				))  /*  과세     */
					.update("smpl_stat_dvcd"	, smpl_stat_dvcd)  								/*  샘플상태구분코드 */

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
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;data.attach(rowaction);

		}
		data.execute();
		return null ;
	}

	//마감
	public SqlResultMap setClose_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String invc_numb = (String)arg.fixParameter("invc_numb");
		int	   amnd_degr = Integer.parseInt((String)arg.fixParameter("amnd_degr"));
		String line_clos = (String)arg.fixParameter("line_clos");

		//최신 Amnd인지 검증을 한다.
		data.param
			.query("select ifnull(max(amnd_degr), 0) as amnd_degr ")
			.query("  from smpl_mast" )
			.query(" where invc_numb = :invc_numb1", invc_numb)
		;
		SqlResultRow info = data.selectForRow();
		if( amnd_degr < Integer.parseInt(info.getParamText("amnd_degr"))) {
			throw new ServiceException("최신 변경차수만 " + ("0".equals(line_clos) ? "마감해지를" : "마감을") + " 할 수 있습니다." );
		}

		//Amnd를 마감 또는 해치 처리한다.
		data.clear();
		data.param
			.table("smpl_mast")
			.where("where invc_numb = :invc_numb ")
			.where("and   amnd_degr = :amnd_degr ")

			.unique("invc_numb"		, invc_numb)
			.unique("amnd_degr"		, amnd_degr)

			.update("line_clos"		, line_clos)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);
		data.execute();

		return null;
	}
}
