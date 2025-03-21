package com.sky.system.custom.sjflv.mtrl.po.purcordr;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("sjflv.PurcOrdrService")
public class PurcOrdrService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date						")
			.where("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd						")
			.where("		, a.divi_cont       , a.crny_dvcd       , a.excg_rate         , a.remk_text						")
			.where("		, a.sysm_memo       , a.prnt_idcd         , a.line_levl											")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm						")
			.where("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd											")
		;
		if("N1000SJUNG".equals(arg.hq.toUpperCase())){
			data.param
				.where("		, b.deli_date						")
			;
		}else{
			data.param
				.where("		, a.deli_date						")
			;
		}
		data.param
			.where("		, c.cstm_name       , c.cstm_code       , d.user_name         , a.supl_dvcd						")
			.where("		, b.amnd_degr	   as line_seqn																		")
			.where("		, sum(b.offr_qntt) as offr_qntt																	")
			.where("		, sum(b.offr_amnt) as offr_amnt																	")
			.where("		, sum(b.offr_vatx) as offr_vatx																	")
			.where("		, sum(b.ttsm_amnt) as ttsm_amnt																	")
			.where("		, json_value(a.json_data,'$.mney_unit') as mney_unit											")
			.where("		, json_value(a.json_data,'$.apvl_yorn') as apvl_yorn											")
			.where("		, json_value(a.json_data,'$.won_pric')  as won_pric												")
			.where("		, im.invc_numb as impt_invc_numb        , im.paym_yorn        , im.paym_send_ddln				")
			.where("		, group_concat(i.item_name separator ' / ') as user_memo										")
			.where("		, (sum(b.offr_amnt) * json_value(a.json_data,'$.won_pric')) as won_ttsm_amnt					")
		;
		// 삼정의 경우 비고에 입고원료명 표시한다.
//		data.param
//			.where("		, (select group_concat(c.item_name separator ' / ')												")
//			.where("		   from   purc_ordr_item  b																		")
//			.where("		          left outer join item_mast c on b.item_idcd = c.item_idcd								")
//			.where("		   where  b.invc_numb = a.invc_numb																")
//			.where("		   and    b.line_stat < '2') as user_memo														")
//		;
		data.param
			.where("from    purc_ordr_mast a																				")
			.where("        left outer join purc_ordr_item b  on a.invc_numb = b.invc_numb									")
			.where("        left outer join item_mast      i  on i.item_idcd = b.item_idcd									")
			.where("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd									")
			.where("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd									")
			.where("        left outer join impt_ordr_mast im on a.invc_numb = im.orig_invc_numb							")
			.where("where   1=1																								")
			.where("and     a.offr_dvcd = 1100																				")
			.where("and     c.find_name	like %:find_name% " , arg.getParamText("find_name"))
			.where("and     a.invc_date  >= :invc1_date   " , arg.getParamText("invc1_date" ))
			.where("and     a.invc_date  <= :invc2_date   " , arg.getParamText("invc2_date" ))
			.where("and     a.deli_date  >= :deli1_date   " , arg.getParamText("deli1_date" ))
			.where("and     a.deli_date  <= :deli2_date   " , arg.getParamText("deli2_date" ))
			.where("and     a.drtr_idcd   = :drtr_idcd    " , arg.getParamText("drtr_idcd" ) , !"".equals(arg.getParamText("drtr_idcd")))
			.where("and     a.cstm_idcd   = :cstm_idcd    " , arg.getParamText("cstm_idcd" ) , !"".equals(arg.getParamText("cstm_idcd")))
			.where("and     a.line_clos   = :line_clos    " , arg.getParamText("line_clos" ) , !"".equals(arg.getParamText("line_clos")))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.invc_numb  in (select r.invc_numb from purc_ordr_item r where r.item_idcd = :item_idcd)" , arg.getParamText("item_idcd" ))
			.where("and     a.supl_dvcd   = :supl_dvcd    " , arg.getParamText("supl_dvcd" ))
		;
		//2022.04.18 - 이강훈 - 요청자재발주에서 생성된 발주서는 구매발주목록에서 제외한다.
		data.param
			.where("and     not exists (select '1'																		")
			.where("                      from purc_trst_mast tm 														")
			.where("                           left outer join purc_trst_item ti on ti.invc_numb = tm.invc_numb			")
			.where("                     where 1 = 1																	")
			.where("                       and tm.line_stat < '2'														")
			.where("                       and ti.offr_numb = a.invc_numb												")
			.where("                       and ti.offr_amnd_degr = a.amnd_degr)											")
		;
		data.param
			.where("group by a.invc_numb																					")
			.where("order by a.line_clos ,a.invc_date desc limit 999999999													")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	/**
	 * detail 조회
	 *
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
			.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
			.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
			.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date as deli_date2		")
			.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
			.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
			.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
			.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
			.query("		, a.orig_seqn																	")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
			.query("		, a.crte_idcd       , a.crte_urif												")
			.query("		, i.item_code       , i.item_name       , a.item_spec      , i.unit_idcd		")
			.query("		, u.unit_name       , a.vatx_incl_yorn											")
			.query("		, json_value(a.json_data,'$.each_qntt') as each_qntt							")
			.query("		, json_value(a.json_data,'$.pack_qntt') as pack_qntt							")
		;
		data.param
			.where("from   purc_ordr_item a																	")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd							")
			.where("       left outer join unit_mast u on i.unit_idcd = u.unit_idcd							")
			.where("where  1=1																				")
			.query("and     b.item_idcd = :item_idcd" , arg.getParameter("item_idcd							"))
			.where("and    a.invc_numb	      = :invc_numb  "	, arg.getParamText("invc_numb"))
			.where("and    a.line_stat        = :line_stat1 "	, arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )))
			.where("and    a.line_stat   < :line_stat       "	, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb																	")
		;
		return data.selectForMap();
	}

	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date							")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.coun_iout_dvcd    , a.cstm_idcd							")
			.query("		, a.divi_cont       , a.offr_qntt       , a.crny_dvcd         , a.excg_rate							")
			.query("		, a.offr_amnt       , a.offr_vatx       , a.ttsm_amnt         , a.remk_text							")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl							")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name							")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd							")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm							")
			.query("		, a.crte_idcd       , a.crte_urif       , a.stot_dvcd         , a.deli_date							")
			.query("		, c.cstm_name       , c.cstm_code       , d.user_name, a.deli_date									")
			.query("		, a.supl_dvcd																						")
			.query("		, cast(replace(json_extract(a.json_data, '$.apvl_yorn'),'\"','') as char) as apvl_yorn				")
			.query("		, cast(replace(json_extract(a.json_data, '$.trde_trnt_dvcd'),'\"','') as char) as trde_trnt_dvcd	")
			.query("		, cast(replace(json_extract(a.json_data, '$.won_pric'),'\"','') as char) as won_pric				")
			.query("from    purc_ordr_mast a																					")
			.query("        left outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd										")
			.query("        left outer join user_mast      d  on a.drtr_idcd = d.user_idcd										")
			.query("where   1=1																									")
			.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb       , a.amnd_degr       , a.line_seqn      , a.item_idcd		")
				.query("		, a.unit_idcd       , a.cstm_idcd       , a.make_cmpy_name , a.offr_qntt		")
				.query("		, a.offr_pric       , a.vatx_incl_yorn  , a.vatx_rate      , a.offr_amnt		")
				.query("		, a.offr_vatx       , a.ttsm_amnt       , a.deli_reqt_date , a.deli_date as deli_date2	")
				.query("		, a.pric_dvcd       , a.fund_dvcd       , a.dlvy_date      , a.dlvy_time		")
				.query("		, a.send_deli_date  , a.dlvy_wrhs_idcd  , a.krwn_pric      , a.krwn_amnt		")
				.query("		, a.krwn_vatx       , a.krwn_amnt_totl  , a.insd_remk_text , a.otsd_remk_text	")
				.query("		, a.stnd_unit       , a.orig_invc_numb  , a.orig_amnd_degr , a.orig_amnd_degr	")
				.query("		, a.orig_seqn       , a.vatx_incl_yorn											")
				.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd      , a.line_levl		")
				.query("		, a.line_ordr       , a.line_stat       , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm      , a.updt_idcd		")
				.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad      , a.crte_dttm		")
				.query("		, a.crte_idcd       , a.crte_urif												")
				.query("		, i.item_code       , i.item_name       , i.item_spec      , i.unit_idcd		")
				.query("		, u.unit_name																	")
				.query("		, json_value(a.json_data, '$.each_qntt') as each_qntt							")
				.query("		, json_value(a.json_data, '$.pack_qntt') as pack_qntt							")
				.query("		, json_value(a.json_data, '$.won_pric') as won_pric								")
				.query("from    purc_ordr_item a																")
				.query("        left outer join item_mast i on a.item_idcd = i.item_idcd						")
				.query("        left outer join unit_mast u on i.unit_idcd = u.unit_code						")
				.query("where   1=1																				")
				.query("and     a.invc_numb	=:invc_numb  "	, arg.getParamText("invc_numb"))
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	// 수입오더 상태 가져오기
	public SqlResultMap getImpt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select count(*) as cnt																	")
		;
		data.param
			.where("from impt_ordr_mast ")
			.where("where offr_numb = :invc_numb",arg.fixParameter("invc_numb"))
		;
		return data.selectForMap();
	}

	// 수입오더 등록
	public SqlResultMap setImpt(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call auto_impt_insert(						")
			.query("   :invc_numb",arg.fixParameter("invc_numb"))
			.query(" , :crte_idcd",arg.fixParameter("crte_idcd"))
			.query(")											")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	// 승인
	public SqlResultMap setOk(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String [] ary_invc_numb = arg.getParamText("invc_numb").split(",");

		//JSON
		ParamToJson p = new ParamToJson();
		String json = p.Translate(arg, "purc_ordr_mast_json_fields");
		for(String invc_numb : ary_invc_numb) {
			data.param
				.query("update purc_ordr_mast a")
				.query("   set a.json_data = JSON_MERGE_PRESERVE(JSON_REMOVE(ifnull(a.json_data,'{}'),'$.apvl_yorn'),:json)",json)	//json merge  remove로 중복제거 후 merge
				.query(" where a.invc_numb = '" + invc_numb + "'	")
			;
			data.attach(Action.direct);
			data.execute();
			data.clear();
		}
		return null;
	}

	//납기일자 변경
	public SqlResultMap setDeli(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));

		data.param
			.table("purc_ordr_item"					)
			.where("where invc_numb		= :invc_numb")  /*  INVOICE번호  */
			.where("and   amnd_degr		= :amnd_degr")  /*  AMD차수       */
			.where("and   line_seqn		= :line_seqn")  /*  순번          */
			//
			.unique("invc_numb"			, arg.getParameter("invc_numb"))
			.unique("amnd_degr"			, 1)
			.unique("line_seqn"			, arg.getParameter("line_seqn"))
			//
			.update("deli_date"			, arg.getParameter("deli_date"))	/*  필름수령여부  */
			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())) /* 수정일자 */
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		return null;
	}

	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			String amd = "0";

			if (rowaction == Action.delete) {
				throw new ServiceException("삭제불가");
			} else {

				SqlResultMap ordrInfo = this.getOrdrInfo(arg);
				if (!ordrInfo.isEmpty()) {
					String line_stat = (String)ordrInfo.get(0).get("line_stat");
					String apvl_yorn = (String)ordrInfo.get(0).get("apvl_yorn");
					double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
					double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

					if ("2".equals(line_stat)) {
						throw new ServiceException("삭제된  발주 건입니다. 저장 할 수 없습니다." );
					}
					if (1 ==  line_clos) {
						throw new ServiceException("마감된  발주 건입니다. 저장 할 수 없습니다." );
					}
					if ("SJFLV".equals(row.getParamText("mes_system_type").toUpperCase())){
						if ("1".equals(apvl_yorn)) {
							throw new ServiceException("승인된  발주 건입니다. 저장 할 수 없습니다." );
						}
					}
					if (0 != dlvy_qntt) {
						throw new ServiceException("입고된  발주 건입니다. 저장 할 수 없습니다." );
					}
				}

				// 사업장
				data.param
					.query("select optn_char_valu											")
					.query("from optn_mast													")
					.query("where optn_idcd = 'dflt_bzpl_idcd'								")
				;
				String bzpl_idcd = data.selectForMap().toString().replaceAll("[^0-9]","");
				data.clear();
				String remk_text = row.getParamText("remk_text");
				SqlResultRow amndRow = null;
				if(!remk_text.equals("")){
					data.param
						.query("select  max(amnd_degr) as amnd_degr							")
						.where("from    pjod_amnd											")
						.where("where   pjod_idcd = :pjod_idcd",row.fixParameter("remk_text"))
					;
					amndRow = data.selectForRow();
					data.clear();
				}
				if(amndRow != null){
					if(!amndRow.getParamText("amnd_degr").equals("")){
						amd = amndRow.getParamText("amnd_degr");
					}
				}

				ParamToJson trans = new ParamToJson();

				String json = trans.TranslateRow(arg, row, "purc_ordr_mast_json_fields");

				//master 등록/수정
				data.param
					.table("purc_ordr_mast"											)
					.where("where invc_numb = :invc_numb							")	//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))

					.update("offr_dvcd"			, "1100")								//발주구분코드
					.update("bzpl_idcd"			, bzpl_idcd							)	//사업장ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//invoice일자 (발주일자)
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))	//내외자구분코드
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처 ID
					.update("divi_cont"			, row.getParameter("divi_cont"		))	//분할횟수
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))	//합계수량
					.update("crny_dvcd"			, row.getParameter("crny_dvcd"		))	//통화구분코드
					.update("excg_rate"			, row.getParameter("excg_rate"		))	//환율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))	//공급가액계
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))	//부가세계
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))	//합계금액
					.update("supl_dvcd"			, row.getParameter("supl_dvcd"		))	//조달구분
					.update("stot_dvcd"			, row.getParameter("stot_dvcd"		))	//결제구분
					.insert("amnd_degr"			, amd								)	//amd차수
					.update("remk_text"			, row.getParameter("remk_text"		))	//비고
					.update("json_data"			, json)									//json
					.update("user_memo"			, row.getParameter("user_memo"		))	//사용자메모
					.update("prnt_idcd"			, row.getParameter("remk_text"		))	//상위 ID
					.update("line_ordr"			, row.getParameter("line_ordr"		))	//ROW순서
					.update("line_stat"			, row.getParameter("line_stat"		))	//ROW상태
					.update("line_clos"			, row.getParameter("line_clos"		))	//마감여부
					.update("find_name"			, row.getParamText("invc_numb"		).trim()
												+ " "
												+ row.getParamText("cstm_name"		).trim())
					.insert("line_levl"			, row.getParameter("line_levl"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.modify);
				data.execute();
				data.clear();

				// 수입오더관리 수정 (24.06.20)
				String invc_numb2 = "";

				data.param
					.query("select a.invc_numb as invc_numb2							")
					.query("from impt_ordr_mast a										")
					.where("where 1=1													")
					.where("and   a.offr_numb = :invc_numb"    , row.getParamText("invc_numb"))
				;
				SqlResultMap ordr = data.selectForMap();

				if(ordr.size() >= 1) {
					invc_numb2 = (String) ordr.get(0).getParameter("invc_numb2");
				}
				data.clear();


				if(invc_numb2 != "" && invc_numb2 != null) {
					int amnd_degr = Integer.parseInt((String) row.fixParameter("amnd_degr")) + 1;

					data.param
						.table("impt_ordr_mast"												)
						.where("where invc_numb = :invc_numb								")
						.where("and   amnd_degr = :amnd_degr								")

						.unique("invc_numb"			, invc_numb2)
						.unique("amnd_degr"			, amnd_degr)

						.update("updt_idcd"			, row.getParameter("updt_idcd"		))
						.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.insert("crte_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
					data.attach(Action.modify);
					data.execute();
					data.clear();
				}

				if(rowaction == Action.update){
					data.param
						.query("update purc_ordr_item a , purc_ordr_mast b 							")
						.query("set a.prnt_idcd = b.prnt_idcd										")
						.query("where a.invc_numb = b.invc_numb										")
						.query("and   a.invc_numb = :invc_numb", row.fixParameter("invc_numb"		))
					;
					data.attach(Action.direct);
					data.execute();
					data.clear();
				}
				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class),amd,invc_numb2);
				}
			}
		}
	data.execute();

	return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map,String amd, String invc) throws Exception {
		String deli_date2="";
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			deli_date2 = row.getParamText("deli_date2");

			if(deli_date2.matches("^[0-9]+$")){
			}else if(deli_date2.isEmpty() != true){
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}

			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb		= :invc_numb						")		//invoic순번
					.where("and   line_seqn		= :line_seqn						")		//invoic순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

				;
				data.attach(Action.delete);
				data.execute();
				data.clear();
			} else {
				ParamToJson p = new ParamToJson();
				String json = p.TranslateRow(arg, row, "purc_ordr_item_json_fields");

				data.param
					.table("purc_ordr_item"											)
					.where("where invc_numb = :invc_numb							")		//invoice번호
					.where("and   line_seqn = :line_seqn							")		//invoice순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))

					.update("amnd_degr"			, row.getParameter("amnd_degr"		))		//차수
					.update("item_idcd"			, row.getParameter("item_idcd"		))		//invoice일자
					.update("item_spec"			, row.getParameter("item_spec"		))		//invoice일자
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
					.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
					.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
					.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
					.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
					.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//발주금액계
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//발주금액계
					.update("deli_date"			, deli_date2						)		//납기일자
					.update("json_data"			, json)
					.update("prnt_idcd"			, mst.getParameter("remk_text"		))
					.update("user_memo"			, row.getParameter("user_memo"		))
					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				data.attach(Action.modify);
				data.execute();
				data.clear();

				// 수입오더관리 수정
				if(invc != "" && invc != null) {
					String packSize = (String)row.getParameter("pack_qntt");
					String eachQntt = (String)row.getParameter("each_qntt");

					String json2 = "{\"each_qntt\":\"" + eachQntt + "\" , \"pckg_size\":\"" + packSize + "\"}";

					data.param
						.table("impt_ordr_item"										)
						.where("where invc_numb		= :invc_numb					")
						.where("and   amnd_degr		= :amnd_degr					")
						.where("and   line_seqn		= :line_seqn					")
						//
						.unique("invc_numb"			, invc)
						.unique("amnd_degr"			, row.fixParameter("amnd_degr"))
						.unique("line_seqn"			, row.fixParameter("line_seqn"))

						.update("item_idcd"			, row.getParameter("item_idcd"		))
//						.update("item_spec"			, row.getParameter("item_spec"		))
						.update("unit_idcd"			, row.getParameter("unit_idcd"		))
						.update("qntt"				, row.getParameter("offr_qntt"		))
						.update("exch_pric"			, row.getParameter("offr_pric"		))
						.update("exch_amnt"			, row.getParameter("offr_amnt"		))
//						.update("exch_amnt"			, row.getParameter("ttsm_amnt"		))
						.update("deli_date"			, row.getParameter("deli_date"		))
						.update("json_data"			, json2)
						.update("user_memo"			, row.getParameter("user_memo"		))
						.update("updt_idcd"			, row.getParameter("updt_idcd"		))
						.update("updt_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.update("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
				}


			}
		}
	}

	/**
	 * 삭제
	 *
	 */
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		//20220419 - 이강훈 - 삭제 시 검중을 한다.
		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = String.valueOf(ordrInfo.get(0).get("line_stat"));
		String apvl_yorn = String.valueOf(ordrInfo.get(0).get("apvl_yorn"));
		double line_clos = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("line_clos")));
		double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if ("1".equals(apvl_yorn)) {
			throw new ServiceException("승인된  발주 건입니다. 삭제 할 수 없습니다." );
		}
		if (0 != dlvy_qntt) {
			throw new ServiceException("입고된  발주 건입니다. 삭제 할 수 없습니다." );
		}

		data.param
			.table("purc_ordr_mast")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			//
			.unique("invc_numb"		, arg.fixParameter("invc_numb"))

			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);

		// 삼정향료인 경우에 발주서 삭제 시 수입오더를 삭제한다.
		if ("N1000SJFLV".equals(arg.hq.toUpperCase())) {
		// 24.06.11 프로시져의 경우 수입오더의 amend가 여러개일 경우 삭제가 안됨(임시로 모두 삭제되도록 수정)
		// 기존 프로시져는 auto_impt_delete_20240611로 백업해둠
			data.param
				.query("call auto_impt_delete(						")
				.query("   :invc_numb",arg.fixParameter("invc_numb") )
				.query(")											")
			;
			data.attach(Action.direct);

		}
		data.execute();
		return null;
	}

	// 승인취소 체크
	public SqlResultMap chkcancel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		//20220419 - 이강훈 - 삭제 시 검중을 한다.
		SqlResultMap ordrInfo = this.getOrdrInfo(arg);
		String line_stat = (String)ordrInfo.get(0).get("line_stat");
		double line_clos = Double.parseDouble((String)ordrInfo.get(0).get("line_clos"));
		double dlvy_qntt = Double.parseDouble(String.valueOf(ordrInfo.get(0).get("dlvy_qntt")));

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주 건입니다. 승인해지 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주 건입니다. 승인해지 할 수 없습니다." );
		}
		if (0 != dlvy_qntt) {
			throw new ServiceException("입고된  발주 건입니다. 승인해지 할 수 없습니다." );
		}

		return null;
	}

	public SqlResultMap setPayment(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.table("impt_ordr_mast"													)
			.where("where invc_numb = :invc_numb								")
			.where("and   amnd_degr = :amnd_degr								")
			//
			.unique("invc_numb"			, arg.fixParameter("invc_numb"	))
			.unique("amnd_degr"			, arg.fixParameter("amnd_degr"	))

			.update("paym_yorn"			, 1)
			.update("paym_date"			, arg.getParameter("paym_date"	))
			.update("paym_numb"			, arg.getParameter("paym_numb"	))

			.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.modify);
		data.execute();
		data.clear();

		return null;
	}

	public SqlResultMap setIstt2(HttpRequestArgument arg) throws Exception {
		String invc_numb	= arg.getParamText("invc_numb") ;
		String invc_date	= arg.getParamText("invc_date") ;
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call auto_item_rcpt_hntop (			")
			.query("   :invc_numb "  , invc_numb	)  // Invoice 번호
			.query("   :invc_date "  , invc_date	)  // Invoice 번호
			.query(" , :auto_insp "  , "N"			)  // 자동 합격처리 여부
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	/**
	 * 발주요청 건 정보를 가져온다.
	 *
	 */
	public SqlResultMap getOrdrInfo(HttpRequestArgument arg) throws Exception {

		String invc_numb = "";
		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else if (arg.containsKey("records")) {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (StringUtils.isEmpty(invc_numb)) {
			throw new ServiceException("요청번호를 확인할 수 없습니다." );
		}

//		String line_seqn = "";
//		if (arg.containsKey("line_seqn")) {
//			line_clos = (String)arg.getParameter("line_seqn");
//		} else if (arg.containsKey("records")) {
//			line_clos = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("line_seqn");
//		}

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.line_stat, a.line_clos																														")
			.query("     , cast(replace(json_extract(a.json_data, '$.apvl_yorn'),'\"','') as char) as apvl_yorn "														 )
			.query("     , (select ifnull(sum(b.dlvy_qntt), 0) from purc_ordr_item b where b.line_stat < 2 ")
			.query("           and b.invc_numb = :invc_numb2 ", invc_numb)
//			.query("           and b.line_seqn = :line_seqn  ", line_seqn)
			.query("        ) as dlvy_qntt ")
			.query("  from purc_ordr_mast a																																")
			.query(" where 1 = 1 																																		")
			.query("   and a.invc_numb = :invc_numb3	" , invc_numb)
		;

		return data.selectForMap();
	}


	/**
	 * invoice master 등록/수정/삭제
	 */
	public SqlResultMap setInvoiceInsert(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for (SqlResultRow row:map) {
			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceInsertDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
			}
		}
		data.execute();
		return null;
	}

	/**
	 * invoice detail 등록/수정/삭제
	 */
	@SuppressWarnings("deprecation")
	public void setInvoiceInsertDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			String amd = "0";

			// 사업장
			data.param
				.query("select optn_char_valu											")
				.query("from optn_mast													")
				.query("where optn_idcd = 'dflt_bzpl_idcd'								")
			;
			String bzpl_idcd = data.selectForMap().toString().replaceAll("[^0-9]","");
			data.clear();
//			String remk_text = row.getParamText("remk_text");
//			SqlResultRow amndRow = null;
//			if(!remk_text.equals("")){
//				data.param
//					.query("select  max(amnd_degr) as amnd_degr							")
//					.where("from    pjod_amnd											")
//					.where("where   pjod_idcd = :pjod_idcd",row.fixParameter("remk_text"))
//				;
//				amndRow = data.selectForRow();
//				data.clear();
//			}
//			if(amndRow != null){
//				if(!amndRow.getParamText("amnd_degr").equals("")){
//					amd = amndRow.getParamText("amnd_degr");
//				}
//			}

			// STEP 1) invoice
			data.param
				.query("call fn_seq_gen_v2 (				")
				.query("   :STOR "   	, arg.store			)  // 본사코드
				.query(" , :table "  	, "purc_ordr_mast"	)  // 테이블명
				.query(" , :invc_numb " , "not defined"		)  // Invoice 번호
				.query(" ) 									")
			;
			String invc_numb = (String)data.selectForMap().get(0).get("seq");
			data.clear();

			// STEP 2) master 등록
			ParamToJson trans = new ParamToJson();
			String json_data = trans.TranslateRow(arg, mst, "purc_ordr_mast_json_fields");

			data.param
				.table("purc_ordr_mast"												)
				.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */

				.unique("invc_numb"			, invc_numb)

				.update("amnd_degr"			, 1									)	//amd차수
				.update("offr_dvcd"			, "1100")								//발주구분코드
				.update("bzpl_idcd"			, bzpl_idcd							)	//사업장ID
				.update("invc_date"			, mst.getParameter("invc_date"		))	//invoice일자 (발주일자)
				.update("drtr_idcd"			, mst.getParameter("drtr_idcd"		))	//담당자ID
				.update("dept_idcd"			, mst.getParameter("dept_idcd"		))	//부서ID
				.update("supl_dvcd"			, mst.getParameter("supl_dvcd"		))	//조달구분
				.update("coun_iout_dvcd"	, mst.getParameter("coun_iout_dvcd"	))	//내외자구분코드
				.update("cstm_idcd"			, mst.getParameter("cstm_idcd"		))	//거래처 ID
				.update("stot_dvcd"			, mst.getParameter("stot_dvcd"		))	//거래처 ID
				.update("deli_date"			, mst.getParameter("deli_date"		))	//납기일자
				.update("divi_cont"			, mst.getParameter("divi_cont"		))	//분할횟수
				.update("offr_qntt"			, mst.getParameter("offr_qntt"		))	//합계수량
				.update("vatx_incl_yorn"	, mst.getParameter("vatx_incl_yorn"	))	//부가세포함여부
				.update("vatx_rate"			, mst.getParameter("vatx_rate"		))	//부가세율
				.update("offr_amnt"			, mst.getParameter("offr_amnt"		))	//발주금액
				.update("offr_vatx"			, mst.getParameter("offr_vatx"		))	//발주부가세
				.update("ttsm_amnt"			, mst.getParameter("ttsm_amnt"		))	//합계금액
				.update("crny_dvcd"			, mst.getParameter("crny_dvcd"		))	//통화구분코드
				.update("excg_rate"			, mst.getParameter("excg_rate"		))	//환율
				.update("krwn_pric"			, mst.getParameter("krwn_pric"		))	//발주부가세
				.update("krwn_amnt"			, mst.getParameter("krwn_amnt"		))	//합계금액
				.update("krwn_vatx"			, mst.getParameter("krwn_vatx"		))	//통화구분코드
				.update("krwn_amnt_totl"	, mst.getParameter("krwn_amnt_totl"	))	//환율
				.update("remk_text"			, mst.getParameter("remk_text"		))	//비고
				.update("mtrl_ostt_date"	, mst.getParameter("mtrl_ostt_date"	))	//비고
				.update("json_data"			, json_data							)	//json
				.update("user_memo"			, mst.getParameter("user_memo"		))	//사용자메모
				.update("prnt_idcd"			, mst.getParameter("remk_text"		))	//상위 ID
				.update("line_ordr"			, mst.getParameter("line_ordr"		))	//ROW순서
				.update("line_stat"			, mst.getParameter("line_stat"		))	//ROW상태
				.update("line_clos"			, mst.getParameter("line_clos"		))	//마감여부
				.update("find_name"			, mst.getParamText("invc_numb"		).trim()
											+ " "
											+ mst.getParamText("cstm_name"		).trim())
				.insert("line_levl"			, mst.getParameter("line_levl"		))
				.update("updt_idcd"			, mst.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, mst.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			;
			data.attach(rowaction);
			data.execute();
			data.clear();

			// STEP 3) detail 등록
			String deli_date2 = row.getParamText("deli_date2");
			if(deli_date2.matches("^[0-9]+$")){
			}else{
				deli_date2 = df.format(new Date(row.getParamText("deli_date2")));
			}

			// detail 등록/수정
			json_data = trans.TranslateRow(arg, row, "purc_ordr_item_json_fields");

			data.param
				.table("purc_ordr_item"												)
				.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
				.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
				//
				.unique("invc_numb"			, invc_numb)
				.unique("line_seqn"			, 1										 )
				//
				.update("amnd_degr"			, row.getParameter("amnd_degr"		))		//차수
				.update("item_idcd"			, row.getParameter("item_idcd"		))		//품목ID
				.update("item_name"			, row.getParameter("item_name"		))		//품목명
				.update("item_spec"			, row.getParameter("item_spec"		))		//품목규격
				.update("unit_idcd"			, row.getParameter("unit_idcd"		))		//단위ID
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))		//거래처ID
				.update("make_cmpy_name"	, row.getParameter("make_cmpy_name"	))		//제조회사명
				.update("offr_qntt"			, row.getParameter("offr_qntt"		))		//발주수량
				.update("offr_pric"			, row.getParameter("offr_pric"		))		//발주단가
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"	))		//부가세율 포함 여부
				.update("vatx_rate"			, row.getParameter("vatx_rate"		))		//부가세율
				.update("offr_amnt"			, row.getParameter("offr_amnt"		))		//발주금액
				.update("offr_vatx"			, row.getParameter("offr_vatx"		))		//발주부가세
				.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"		))		//발주금액계
				.update("deli_reqt_date"	, row.getParameter("deli_reqt_date"	))		//납기요청일자
				.update("deli_date"			, deli_date2						)		//납기일자
				.update("pric_dvcd"			, row.getParameter("pric_dvcd"		))
				.update("fund_dvcd"			, row.getParameter("fund_dvcd"		))
				.update("dlvy_qntt"			, row.getParameter("dlvy_qntt"		))
				.update("pass_qntt"			, row.getParameter("pass_qntt"		))
				.update("dlvy_date"			, row.getParameter("dlvy_date"		))
				.update("dlvy_time"			, row.getParameter("dlvy_time"		))
				.update("send_deli_date"	, row.getParameter("send_deli_date"	))
				.update("dlvy_wrhs_idcd"	, row.getParameter("dlvy_wrhs_idcd"	))
				.update("krwn_pric"			, row.getParameter("krwn_pric"		))
				.update("krwn_amnt"			, row.getParameter("krwn_amnt"		))
				.update("krwn_vatx"			, row.getParameter("krwn_vatx"		))
				.update("krwn_amnt_totl"	, row.getParameter("krwn_amnt_totl"	))
				.update("isnd_remk_text"	, row.getParameter("isnd_remk_text"	))
				.update("otsd_remk_text"	, row.getParameter("otsd_remk_text"	))
				.update("stnd_unit"			, row.getParameter("stnd_unit"		))
				.update("orig_invc_numb"	, row.getParameter("orig_invc_numb"	))
				.update("orig_amnd_degr"	, row.getParameter("orig_amnd_degr"	))
				.update("orig_seqn"			, row.getParameter("orig_seqn"		))

				.update("json_data"			, json_data)
				.update("prnt_idcd"			, mst.getParameter("remk_text"		))
				.update("user_memo"			, row.getParameter("user_memo"		))
				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
			data.attach(rowaction);
			data.execute();
			data.clear();
			;
//		data.attach(rowaction);
		data.execute();
		data.clear();
		}
	}

	//마지막 INVOICE
	public SqlResultRow getInvoiceNumberInfo(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("SELECT max(invc_numb) as seq		")
			.query("FROM purc_ordr_mast 				")
			.query("WHERE 1=1							")
			.query("and invc_date = :invc_date ", new SimpleDateFormat("yyyyMMdd").format(new Date()))
		;
		return data.selectForRow();
	}
}

