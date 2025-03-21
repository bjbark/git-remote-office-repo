package com.sky.system.custom.iypkg.mtrl.po.purcordr3;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service
public class PurcOrdr3Service extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;


	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_numb       , a.line_seqn       , b.invc_date       , b.cstm_idcd						")
			.where("		, c.cstm_name       , a.item_idcd       , ba.prod_idcd      , ba.prod_name 						")
			.where("		, p.prod_code       , ba.item_leng      , ba.item_widh      , ba.item_hght						")
			.where("		, ba.pcod_numb      , ifnull(ba.prod_qntt,0) as prod_qntt   , a.offr_qntt						")
			.where("		, a.offr_pric       , a.deli_date       , ba.invc_numb as acpt_numb								")
			.where("		, c2.cstm_name as acpt_cstm_name																")
			.where("		, a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("		, a.crte_idcd       , a.crte_urif       , a.user_memo											")
			.where("from   purc_ordr_item a																					")
			.where("   left outer join purc_ordr_mast b on b.invc_numb = a.invc_numb										")
			.where("   left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd												")
			.where("   left outer join boxx_acpt ba on a.orig_invc_numb = ba.invc_numb										")
			.where("   left outer join product_mast p on ba.prod_idcd = p.prod_idcd											")
			.where("   left outer join cstm_mast c2 on ba.cstm_idcd = c2.cstm_idcd											")
			.where("where  1=1																								")
			.where("and    (json_value(b.json_data , '$**.offr_path_dvcd')) = 3												")
			.where("and    ba.acpt_dvcd = '4000'																			")
			.where("and    a.find_name  like %:find_name%			" , arg.getParamText("find_name" ))
			.where("and    b.invc_date  >= :invc1_date				" , arg.getParamText("fr_dt"))
			.where("and    b.invc_date  <= :invc2_date				" , arg.getParamText("to_dt"))
			.where("and    p.prod_idcd  >= :prod_idcd1				" , arg.getParamText("prod_idcd1"))
			.where("and    p.prod_idcd  <= :prod_idcd2				" , arg.getParamText("prod_idcd2"))
			.where("and    a.line_stat   = :line_stat				" , arg.getParamText("line_stat" ))
			.where("order by b.invc_date asc, a.invc_numb asc limit 99999													")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																								")
		;
		data.param
			.where("from (																									")
			.where("select    a.invc_date       , a.cstm_idcd       , c.cstm_name       , a.invc_numb as acpt_numb			")
			.where("		, a.item_leng       , a.item_widh       , a.item_hght       , a.acpt_qntt						")
			.where("		, a.deli_date       , a.prod_idcd       , p.prod_code       , a.prod_name						")
			.where("		, ifnull(a.prod_qntt,0) as prod_qntt    , (a.acpt_qntt - ifnull(pi.offr_qntt,0)) as unoffr		")
//			.where("		, a.pqty_pric as offr_pric																		")
			.where("		, 0 as offr_pric																				") // 대아요청사항.
			.where("		, a.line_clos       , a.find_name       , a.user_memo       , a.sysm_memo						")
			.where("		, a.line_ordr       , a.line_stat       , a.crte_idcd       , a.crte_urif						")
			.where("		, a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd						")
			.where("		, a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm						")
			.where("from   boxx_acpt a																						")
			.where("   left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd												")
			.where("   left outer join product_mast p on a.prod_idcd = p.prod_idcd											")
			.where("   left outer join ( select sum(a.offr_qntt) as offr_qntt, a.orig_invc_numb								")
			.where("                     from purc_ordr_item a																")
			.where("                     left outer join purc_ordr_mast b on a.invc_numb = b.invc_numb						")
			.where("                     where (json_value(b.json_data , '$**.offr_path_dvcd')) = 3							")
			.where("                     group by a.orig_invc_numb															")
			.where("                   ) pi on a.invc_numb = pi.orig_invc_numb												")
			.where("where  1=1																								")
			.where("and    a.acpt_dvcd = '4000'																				")
			.where("and    a.acpt_qntt-ifnull(pi.offr_qntt,0) > 0															")
			.where("and    a.line_clos   = 0																				")
			.where("and    a.invc_date  >= :invc1_date		" , arg.getParamText("invc_date1"))
			.where("and    a.invc_date  <= :invc2_date		" , arg.getParamText("invc_date2"))
			.where("and    a.prod_idcd   = :prod_idcd		" , arg.getParamText("prod_idcd" ))
			.where("and    a.cstm_idcd   = :cstm_idcd		" , arg.getParamText("cstm_idcd" ))
			.where("and    a.line_stat   < :line_stat		" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb																					")
			.where(") a																										")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort) ;
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}


	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select a.invc_numb      , a.line_seqn      , a.fabc_idcd      , a.fabc_name     , a.need_qntt		")
			.query("     , f.ppln_dvcd      , a.item_leng      , a.item_widh      , a.item_fxqt							")
			.query("     , a.mxm2_qntt      , p.cstm_name      , p.invc_date      , ifnull(a.istt_yorn,0) as istt_yorn	")
			.query("     , a.uper_seqn      , a.disp_seqn      , a.user_memo      , a.sysm_memo							")
			.query("     , a.prnt_idcd      , a.line_levl      , a.line_ordr      , a.line_stat							")
			.query("     , a.line_clos      , a.find_name      , a.updt_user_name , a.updt_ipad							")
			.query("     , a.updt_dttm      , a.updt_idcd      , a.updt_urif      , a.crte_user_name					")
			.query("     , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif							")
		;
		data.param
			.where("from   boxx_acpt_bom a																				")
			.where("       left outer join boxx_acpt b on a.invc_numb = b.invc_numb										")
			.where("       left outer join fabc_mast f on a.fabc_idcd = f.fabc_idcd										")
			.where("       left outer join ( select c.cstm_name as cstm_name, b.invc_date as invc_date, a.orig_invc_numb")
			.where("                              , json_value(a.json_data , '$**.acpt_numb') as acpt_numb				")
			.where("                         from purc_istt_item a														")
			.where("                         left outer join purc_istt_mast b on a.invc_numb = b.invc_numb				")
			.where("                         left outer join purc_ordr_mast p on a.orig_invc_numb = p.invc_numb			")
			.where("                         left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd					")
			.where("                         where (json_value(p.json_data , '$**.offr_path_dvcd')) = 1					")
			.where("                       ) p on p.acpt_numb = a.invc_numb												")
			.where("where  1=1																							")
			.where("and    a.invc_numb	=:invc_numb		" , arg.getParamText("invc_numb"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("group by a.invc_numb, a.line_seqn																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		int i = 0;					//mast에 한번 item에 여러번 등록 되도록 주는 변수

		for (SqlResultRow row:map) {
			ParamToJson p = new ParamToJson();
			String json = p.TranslateRow(arg, row, "purc_ordr_mast_json_fields");
			String json2 = p.TranslateRow(arg, row, "purc_ordr_item_json_fields");
			if(i == 0){
				//등록
				data.param
					.table ("purc_ordr_mast")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))		//INVOICE번호
					.unique("amnd_degr"        , 1 )									//차수

					.update("bzpl_idcd"        , row.getParameter("bzpl_idcd"))			//사업장ID
					.update("offr_dvcd"        , 1400						)			//발주구분코드
					.update("invc_date"        , row.getParameter("offr_date"))			//발주일자
					.update("drtr_idcd"        , row.getParameter("drtr_idcd"))			//담당자ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("json_data"        , json						)			//jsondata
//					.update("user_memo"        , row.getParameter("user_memo"))
					.update("sysm_memo"        , row.getParameter("sysm_memo"))
					.insert("line_levl"			, row.getParameter("line_levl"			))
					.insert("line_stat"			, row.getParameter("line_stat"			))
					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				data.param
					.table ("purc_ordr_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("amnd_degr"        , 1 )
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("item_idcd"        , row.getParameter("prod_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("offr_qntt"        , row.getParameter("offr_qntt"))			//발주수량
					.update("offr_pric"        , row.getParameter("offr_pric"))			//발주단가
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("offr_amnt"        , row.getParameter("offr_amnt"))			//발주금액
					.update("offr_vatx"        , row.getParameter("offr_vatx"))			//발주부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("vatx_incl_yorn"   , 1							)			//부가세포함여부
					.update("orig_invc_numb"   , row.getParameter("acpt_numb"))			//원INVOICE번호
					.update("json_data"        , json2						)			//jsondata
					.update("find_name"        , row.getParameter("prod_code")
												+ "	"
												+ row.getParameter("prod_name"))
					.update("user_memo"			, row.getParameter("user_memo"))
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
				data.attach(Action.insert);
				data.execute();
				data.clear();

				i =+ 1;

			}else{
				data.param
					.table ("purc_ordr_item")
					.where ("where invc_numb = :invc_numb")
					.where ("and   amnd_degr = :amnd_degr")
					.where ("and   line_seqn = :line_seqn")

					.unique("invc_numb"        , row.fixParameter("new_invc_numb"))
					.unique("amnd_degr"        , 1 )
					.unique("line_seqn"        , row.fixParameter("new_line_seqn"))

					.update("item_idcd"        , row.getParameter("prod_idcd"))			//품목ID
					.update("cstm_idcd"        , row.getParameter("cstm_idcd"))			//거래처ID
					.update("offr_qntt"        , row.getParameter("offr_qntt"))			//발주수량
					.update("offr_pric"        , row.getParameter("offr_pric"))			//발주단가
					.update("deli_date"        , row.getParameter("deli_date"))			//납기일자
					.update("offr_amnt"        , row.getParameter("offr_amnt"))			//발주금액
					.update("offr_vatx"        , row.getParameter("offr_vatx"))			//발주부가세
					.update("ttsm_amnt"        , row.getParameter("ttsm_amnt"))			//합계금액
					.update("vatx_incl_yorn"   , 1							)			//부가세포함여부
					.update("orig_invc_numb"   , row.getParameter("acpt_numb"))			//원INVOICE번호
					.update("json_data"        , json2						)			//jsondata
					.update("find_name"        , row.getParameter("prod_code")
												+ "	"
												+ row.getParameter("prod_name"))
					.update("user_memo"			, row.getParameter("user_memo"))
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
				data.attach(Action.insert);
				data.execute();
				data.clear();

			}
		}
		return null;
	}


	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		DataMessage temp = arg.newStorage("POS");

		data.param
			.table("purc_ordr_item")
			.where("where invc_numb = :invc_numb ")
			.where("and   line_seqn = :line_seqn ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.unique("line_seqn"		, arg.fixParameter("line_seqn"))
		;
		data.attach(Action.delete);
		data.execute();
		data.clear();

		//item에 없으면 mast에서도 삭제되게끔
		temp.param
			.query("select if((b.line_seqn),'1','0') as yorn						")
			.query("from  purc_ordr_mast a											")
			.query("left outer join purc_ordr_item b on a.invc_numb = b.invc_numb	")
			.query("where a.invc_numb = :invc_numb		", arg.fixParameter("invc_numb"))
		;
		SqlResultRow yorn = temp.selectForRow();

		System.out.println("여부"+yorn.getParamText("yorn"));

		if(yorn.getParamText("yorn").equals("0")){
			data.param
				.table("purc_ordr_mast")
				.where("where invc_numb = :invc_numb ")

				.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			;
			data.attach(Action.delete);
			data.execute();
			data.clear();
		}
		return null;
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

}
