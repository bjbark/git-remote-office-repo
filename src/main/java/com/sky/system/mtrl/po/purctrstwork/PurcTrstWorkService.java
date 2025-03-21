package com.sky.system.mtrl.po.purctrstwork;

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


@Service("sjflv.PurcTrstWorkService")
public class PurcTrstWorkService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
			data.param
			.query("select a.*																						")
		;
		data.param
			.where("from (																								")
			.where("select a.invc_numb       , a.invc_date       , a.bzpl_idcd       , a.drtr_idcd						")
			.where("     , a.dept_idcd       , a.puch_reqt_dvcd  , a.remk_text       , u.user_name as drtr_name			")
			.where("     , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl						")
			.where("     , a.line_ordr       , a.line_stat       , a.find_name											")
			.where("     , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("     , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("     , a.crte_idcd       , a.crte_urif       , bz.bzpl_name      , t.dept_name						")
			.where("     , (select if(count(*) > 0 , 'Y' , 'N')															")
			.where("		     from purc_trst_item b																	")
			.where("		    where b.invc_numb = a.invc_numb and b.offr_proc_dvcd = '1' and b.line_stat < 2) as offr_proc_dvcd")
			.where("     , i.acpt_numb       , i.acpt_amnd_degr															")
		;
		data.param
			.where("  from purc_trst_mast a																				")
			.where("        left outer join purc_trst_item e on e.invc_numb = a.invc_numb																	")
//			.where("        left outer join purc_ordr_item c on c.invc_numb = e.offr_numb and c.amnd_degr = e.offr_amnd_degr and c.line_seqn = e.offr_seqn 	")
//			.where("        left outer join purc_ordr_mast d on d.invc_numb = c.invc_numb and d.amnd_degr = c.amnd_degr										")
			.where("       left outer join user_mast       u  on a.drtr_idcd = u.user_idcd								")
			.where("       left outer join bzpl_mast       bz on a.bzpl_idcd = bz.bzpl_idcd								")
			.where("       left outer join dept_mast       t  on a.dept_idcd = t.dept_idcd								")
			.where("       left outer join ( select a.invc_numb , a.acpt_numb , a.acpt_amnd_degr						")
			.where("                         from purc_trst_item a														")
			.where("                         group by a.invc_numb														")
			.where("                       ) i on a.invc_numb = i.invc_numb												")
			.where(" where 1 = 1																						")
			.where("   and e.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("   and a.bzpl_idcd   = :bzpl_idcd		" , arg.getParamText("bzpl_idcd" ))
			.where("   and a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("   and a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("   and e.line_clos  = :line_clos		" , arg.getParamText("line_clos"  )) // 마감상태
			.where("   and a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("   and e.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where(")a																									")
			.where("group by a.invc_date desc, a.invc_numb desc															")
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
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select    a.invc_numb       , a.amnd_degr       , a.bzpl_idcd         , a.invc_date				")
			.query("		, a.ordr_dvcd       , a.orig_invc_numb  , a.expt_dvcd         , a.pcod_numb				")
			.query("		, a.deli_date       , a.cstm_idcd       , a.mdtn_prsn         , a.cont_date				")
			.query("		, a.drtr_idcd       , a.dept_idcd       , a.crny_dvcd									")
			.query("		, a.ostt_wrhs_idcd  , a.trut_dvcd       , a.dlvy_cond_dvcd    , a.crdt_exce_yorn		")
			.query("		, a.amnt_lack_yorn  , a.sale_stor_yorn  , a.remk_text         , a.memo					")
			.query("		, a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd    , a.acpt_stat_dvcd		")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif														")
			.query("		, c.cstm_code       , c.cstm_name       , d.user_name as drtr_name						")
			.query("		, w.wrhs_code       , w.wrhs_name														")
			.query("		, i.item_idcd")


		;
		data.param
			.where("from   acpt_mast a																				")
			.where("left   outer join cstm_mast      c  on a.cstm_idcd = c.cstm_idcd								")
			.where("left   outer join user_mast      d  on a.drtr_idcd = d.user_idcd								")
			.where("left   outer join wrhs_mast      w  on a.ostt_wrhs_idcd = w.wrhs_idcd							")
			.where("left   outer join acpt_item      i on a.invc_numb = i.invc_numb									")
			.where("where  1=1																						")
			.where("and    a.ordr_dvcd != '4000'																	")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc1_date" ))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc2_date" ))
			.where("and    a.drtr_idcd   = :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_clos   = :line_clos		" , arg.getParamText("line_clos" ))
			.where("and    i.item_idcd   = :item_idcd		" , arg.getParamText("item_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																	")
			.where("order by a.invc_numb																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select    a.invc_numb      , a.line_seqn      , a.item_idcd      , a.unit_idcd      , a.reqt_qntt		")
			.query("		, a.deli_reqt_date , a.supl_dcnt      , a.coun_iout_dvcd , a.stnd_unit      , a.wrhs_idcd		")
			.query("		, a.cstm_idcd      , a.offr_schd_date , a.pdsd_numb      , a.uper_seqn      , a.disp_seqn		")
			.query("		, i.item_code      , u.unit_name																")
			.query("		, if(a.item_idcd = '', a.item_name, i.item_name) as item_name									")
			.query("		, if(a.item_idcd = '', a.item_spec, i.item_spec) as item_spec		  							")
			.query("		, a.reqt_pric      , a.reqt_amnt      , a.usge_dvcd      , a.offr_proc_dvcd	, a.offr_numb		")
			.query("		, a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
			.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
			.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
			.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
		;
		data.param
			.where("from   purc_trst_item a																					")
			.where("       left outer join item_mast i on a.item_idcd = i.item_idcd											")
			.where("       left outer join unit_mast u on a.unit_idcd = u.unit_code											")
			.where("where  1=1																								")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																					")
		;
		return data.selectForMap();
	}


	/**
	 * invoice 조회
	 */
	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param

			.query("select    a.invc_numb       , a.invc_date       , a.bzpl_idcd       , a.drtr_idcd				")
			.query("        , a.dept_idcd       , a.puch_reqt_dvcd  , a.remk_text       , d.user_name as drtr_name	")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.query("		, a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.query("		, a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.query("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.query("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.query("		, a.crte_idcd       , a.crte_urif       , bz.bzpl_name									")
			.query("from    purc_trst_mast a																		")
			.query("        left outer join user_mast       d  on a.drtr_idcd = d.user_idcd							")
			.query("        left outer join bzpl_mast       bz on a.bzpl_idcd = bz.bzpl_idcd						")
			.query("        left outer join dept_mast       t  on a.dept_idcd = t.dept_idcd							")
			.query("where   1 = 1																					")
			.query("and     a.invc_numb	= :invc_numb  "	, arg.getParamText("invc_numb"))
			.query("and     a.line_stat < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		SqlResultMap info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select    a.invc_numb      , a.line_seqn      , a.item_idcd      , a.unit_idcd      , a.reqt_qntt		")
				.query("		, a.reqt_pric      , a.reqt_amnt																")
				.query("		, a.deli_reqt_date , a.supl_dcnt      , a.coun_iout_dvcd , a.stnd_unit      , a.wrhs_idcd		")
				.query("		, a.cstm_idcd      , a.offr_schd_date , a.pdsd_numb      , a.uper_seqn      , a.disp_seqn		")
				.query("		, i.item_code      , u.unit_name      , a.usge_dvcd												")
				.query("		, if(a.item_idcd = '', a.item_name, i.item_name) as item_name									")
				.query("		, if(a.item_idcd = '', a.item_spec, i.item_spec) as item_spec									")
				.query("		, a.user_memo      , a.sysm_memo      , a.prnt_idcd												")
				.query("		, a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.query("		, a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.query("		, a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.query("from   purc_trst_item a																					")
				.query("       left outer join item_mast i on a.item_idcd = i.item_idcd											")
				.query("       left outer join unit_mast u on a.unit_idcd = u.unit_code											")
				.query("where  1 = 1																								")
				.query("and    a.invc_numb	= :invc_numb  "	, arg.getParamText("invc_numb"))
				.query("and    a.line_stat  < :line_stat  " , "2" , "".equals(arg.getParamText("line_stat" )))
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
				//20220419 - 이강훈 - 수정 후 저장 시 검중을 한다.
				if (rowaction == Action.update) {
					SqlResultMap info = this.getInfo(arg);
					String line_stat = (String)info.get(0).get("line_stat");
					double line_clos = Double.parseDouble((String)info.get(0).get("line_clos"));
					String offr_proc_dvcd = (String)info.get(0).get("offr_proc_dvcd");

					if ("2".equals(line_stat)) {
						throw new ServiceException("삭제된  발주요청 건입니다. 저장 할 수 없습니다." );
					}
					if (1 ==  line_clos) {
						throw new ServiceException("마감된  발주요청 건입니다. 저장 할 수 없습니다." );
					}
					if ("Y".equals(offr_proc_dvcd)) {
						throw new ServiceException("발주가 등록 건 입니다. 저장 할 수 없습니다." );
					}
				}

				// master 등록/수정
				data.param
					.table("purc_trst_mast"													)
					.where("where invc_numb = :invc_numb								")  /*  INVOICE번호  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					//
					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"			))  /*  사업장 ID */
					.update("invc_date"			, row.getParameter("invc_date"			))  /*  INVOICE일자 */
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"			))  /*  담당자 ID  */
					.update("dept_idcd"			, row.getParameter("dept_idcd"			))  /*  부서 ID  */
					.update("puch_reqt_dvcd"	, row.getParameter("puch_reqt_dvcd"		))  /*  구매요청구분코드  */
					.update("remk_text"			, row.getParameter("remk_text"			))  /*  비고 */

					.update("user_memo"			, row.getParameter("user_memo"			))  /*  시스템메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("bzct_dvcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(rowaction);
				data.execute();
				data.clear();

				if(row.getParameter("product", SqlResultMap.class) != null) {
					setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class));
				}
				if (rowaction == Action.modify) {

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
	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map) throws Exception {

		for(SqlResultRow row:map) {
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				// detail 삭제
				data.param
					.table("purc_trst_item"													)
					.where("where invc_numb		= :invc_numb							")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn							")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))
					//
				;
				data.attach(rowaction);

			} else {
				// detail 등록/수정
				data.param
					.table("purc_trst_item"												)
					.where("where invc_numb		= :invc_numb						")  /*  INVOICE번호  */
					.where("and   line_seqn		= :line_seqn						")  /*  INVOICE순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
					.unique("line_seqn"			, row.fixParameter("line_seqn"		))
					//
					.update("item_idcd"			, row.getParameter("item_idcd"		))
					.update("item_name"			, row.getParameter("item_name"		))
					.update("item_spec"			, row.getParameter("item_spec"		))
					.update("unit_idcd"			, row.getParameter("unit_idcd"		))
					.update("reqt_amnt"			, row.getParameter("reqt_amnt"		))
					.update("reqt_qntt"			, row.getParameter("reqt_qntt"		))
					.update("reqt_pric"			, row.getParameter("reqt_pric"		))
					.update("usge_dvcd"			, row.getParameter("usge_dvcd"		))
					.update("supl_dcnt"			, row.getParameter("supl_dcnt"		))
					.update("safe_stok"			, row.getParameter("safe_stok"		))
					.update("curr_stok"			, row.getParameter("curr_stok"		))
					.update("coun_iout_dvcd"	, row.getParameter("coun_iout_dvcd"	))
					.update("stnd_unit"			, row.getParameter("stnd_unit"		))
					.update("wrhs_idcd"			, row.getParameter("wrhs_idcd"		))
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))
					.update("offr_schd_date"	, row.getParameter("offr_schd_date"	))
					.update("pdsd_numb"			, row.getParameter("pdsd_numb"		))
					.update("offr_proc_dvcd"	, row.getParameter("offr_proc_dvcd"	))
					.update("offr_numb"			, row.getParameter("offr_numb"		))
					.update("offr_amnd_degr"	, row.getParameter("offr_amnd_degr"	))
					.update("offr_seqn"			, row.getParameter("offr_seqn"		))
					.update("uper_seqn"			, row.getParameter("uper_seqn"		))
					.update("disp_seqn"			, row.getParameter("disp_seqn"		))


					.update("user_memo"			, row.getParameter("user_memo"			))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"			))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"			))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"			))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"			))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"			))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"			))  /*  마감여부  */
					.update("find_name"			, row.getParamText("invc_numb"			).trim()
												+ row.getParamText("item_idcd"			).trim()
												+ row.getParamText("remk_text"			).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"		))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"			))  /*  수정IP  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"			))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"		))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"			))  /*  생성IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"			))  /*  생성UI  */
				;
				data.attach(Action.modify);
				data.execute();
				data.clear();
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
		SqlResultMap info = this.getInfo(arg);
		String line_stat = (String)info.get(0).get("line_stat");
		double line_clos = Double.parseDouble((String)info.get(0).get("line_clos"));
		String offr_proc_dvcd = (String)info.get(0).get("offr_proc_dvcd");

		if ("2".equals(line_stat)) {
			throw new ServiceException("삭제된  발주요청 건입니다. 삭제장 할 수 없습니다." );
		}
		if (1 ==  line_clos) {
			throw new ServiceException("마감된  발주요청 건입니다. 삭제 할 수 없습니다." );
		}
		if ("Y".equals(offr_proc_dvcd)) {
			throw new ServiceException("발주가 등록 건 입니다. 삭제 할 수 없습니다." );
		}

		data.param
			.table("purc_trst_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("line_stat"		, 2)
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.update);

		data.param
			.table("purc_trst_item")
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

	public SqlResultMap setStps(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//출고일자 //오늘날짜
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"				, row.fixParameter("invc_numb"	))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

			}
		}
		return null;
	}


	public SqlResultMap setItem(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		int i = 0;

		for (SqlResultRow row:map) {
			if(i == 0){
				data.param
					.table("sale_ostt_mast											")
					.where("where invc_numb		= :invc_numb						")

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"	))	//invoice번호

					.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
					.update("cstm_idcd"			, row.getParameter("cstm_idcd"		))	//거래처ID
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
					.update("invc_date"			, row.getParameter("invc_date"		))	//출고일자 //오늘날짜
					.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
					.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
					.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

					.update("updt_idcd"			, row.getParameter("updt_idcd"		))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
					.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"				, row.fixParameter("invc_numb"	))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table("sale_ostt_item												")
					.where("where invc_numb		= :invc_numb							")		//invoice번호
					.where("and   line_seqn		= :line_seqn							")		//순번

					.unique("invc_numb"			, arg.fixParameter("new_invc_numb"		))		//invoice번호
					.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

					.update("acpt_numb"			, row.getParameter("invc_numb"			))		//수주번호
					.update("acpt_seqn"			, row.getParameter("line_seqn"			))		//수주순번
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
					.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
					.update("ostt_qntt"			, row.getParameter("ostt_qntt"			))		//출고수량
					.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
					.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
					.update("sale_amnt"			, row.getParameter("sale_amnt"			))		//판매금액
					.update("vatx_amnt"			, row.getParameter("vatx_amnt"			))		//부가세금액
					.update("ttsm_amnt"			, row.getParameter("ttsm_amnt"			))		//합계금액
					.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
					.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
					.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
					.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
					.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
					.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//원INVOICE번호
					.update("orig_seqn"			, row.getParameter("line_seqn"			))		//원INVOICE항번
					.update("ostt_dvcd"			, "3200"								)		//출고구분코드
					.update("insp_dvcd"			, "1000"								)		//검사구분코드

					.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

					.update("user_memo"			, row.getParameter("user_memo"			))		//비고
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) );
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table("acpt_mast												")
					.where("where invc_numb		= :invc_numb						")		//invoice번호

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))		//invoice번호

					.update("acpt_stat_dvcd"		, "0600"						)		//수주상태
				;
				data.attach(Action.update);
				data.execute();
				data.clear();

			}
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
	 * 발주요청 건 정보를 가져온다.
	 *
	 */
	public SqlResultMap getInfo(HttpRequestArgument arg) throws Exception {

		String invc_numb = "";
		if (arg.containsKey("invc_numb")) {
			invc_numb = (String)arg.getParameter("invc_numb");
		} else {
			invc_numb = (String)arg.getParameter("records", SqlResultMap.class).get(0).getParameter("invc_numb");
		}

		if (StringUtils.isEmpty(invc_numb)) {
			throw new ServiceException("요청번호를 확인할 수 없습니다." );
		}

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select a.line_stat, a.line_clos																														")
			.query("     , (select if(count(*) > 0, 'Y', 'N') from purc_trst_item where invc_numb = a.invc_numb and offr_proc_dvcd = '1' and line_stat < '2') as offr_proc_dvcd	")
			.query("  from purc_trst_mast a																																")
			.query(" where 1 = 1 																																		")
			.query("   and a.invc_numb = :invc_numb	" , invc_numb)
		;

		return data.selectForMap();
	}
}