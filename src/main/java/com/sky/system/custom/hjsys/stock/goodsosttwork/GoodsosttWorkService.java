package com.sky.system.custom.hjsys.stock.goodsosttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
@Service("hjsys.GoodsosttWorkService")

public class GoodsosttWorkService extends DefaultServiceHandler {

	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getMaster1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  *																			 		")
		;
		data.param
			.where("from (																				 		")
			.where("select    a.invc_numb        , a.invc_date       , a.bzpl_idcd        , a.expt_dvcd 		")
			.where("        , a.cstm_idcd        , a.ostt_dvcd       , a.drtr_idcd        , a.dept_idcd			")
			.where("        , a.trut_dvcd        , a.dlvy_cond_dvcd  , a.deli_date        , a.sale_stor_yorn	")
			.where("        , a.crny_dvcd        , a.excg_rate       , a.remk_text								")
			.where("        , a.user_memo        , a.sysm_memo       , a.prnt_idcd        , a.line_levl			")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , c.cstm_name        , u.user_name as drtr_name										")
			.where("from sale_ostt_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join sale_ostt_item s on a.invc_numb = s.invc_numb								")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%    " , arg.getParamText("find_name"  ))
			.where("and     s.item_idcd  = :item_idcd       "  , arg.getParamText("item_idcd"  ))
			.where("and     a.invc_date >= :invc_date1       " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2       " , arg.getParamText("invc_date2" ))
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.invc_numb  = :invc_numb        " , arg.getParamText("invc_numb" ))
			.where("and     a.line_stat   = :line_stat1      " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
			.where("group by a.invc_numb																		")
			.where("order by a.invc_numb desc																	")
			.where(") a																							")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb         , a.line_seqn      , a.acpt_numb        , a.item_idcd			")
			.query("        , a.sale_unit        , a.norm_sale_pric , a.sale_stnd_pric   , a.sale_pric			")
			.query("        , a.ostt_qntt        , a.vatx_incl_yorn , a.vatx_rate        , a.sale_amnt			")
			.query("        , a.vatx_amnt        , a.ttsm_amnt      , a.deli_date        , a.dlvy_date			")
			.query("        , a.dlvy_hhmm        , a.stnd_unit      , a.stnd_unit_qntt   , a.wrhs_idcd			")
			.query("        , a.dlvy_cstm_idcd   , a.dsct_yorn      , a.ostt_dvcd        , a.insp_dvcd			")
			.query("        , a.insp_date        , a.pcod_numb      , a.sale_date        , a.sale_invc_numb		")
			.query("        , a.user_memo        , a.sysm_memo      , a.prnt_idcd        , a.line_levl			")
			.query("        , a.line_ordr        , a.line_stat      , a.line_clos        , a.find_name			")
			.query("        , a.updt_user_name   , a.updt_ipad      , a.updt_dttm        , a.updt_idcd			")
			.query("        , a.updt_urif        , a.crte_user_name , a.crte_ipad        , a.crte_dttm			")
			.query("        , a.crte_idcd        , a.crte_urif      , a.lott_numb        , i.item_code			")
			.query("        , i.item_name        , i.item_spec      , i.modl_name        , w.wrhs_name			")
			.query("        , a.orig_invc_numb   , a.orig_seqn      , a.acpt_seqn        , i2.item_name as acpt_item_name	")
			.query("        , c.cstm_name																		")
		;
		data.param
			.where("from sale_ostt_item a																		")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd									")
			.where("left outer join acpt_item b on a.acpt_numb = b.invc_numb									")
			.where("left outer join acpt_mast m on a.acpt_numb = m.invc_numb									")
			.where("left outer join item_mast i2 on b.item_idcd = i2.item_idcd									")
			.where("left outer join cstm_mast c on c.cstm_idcd = m.cstm_idcd									")
			.where("where   1=1																					")
			.where("and     a.invc_numb   = :invc_numb    " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat   < :line_stat    " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.line_seqn																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap info;

		data.param
			.query("select  *																						")
		;
		data.param
			.where("from (  select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn											")
			.where("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
			.where("        , a.invc_pric as sale_pric        , a.invc_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
			.where("        , a.item_idcd        , a.unit_idcd as sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric			")
			.where("        , a.stnd_unit        , a.stnd_unit_qntt               , a.wrhs_idcd        , a.dlvy_cstm_idcd			")
			.where("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
			.where("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
			.where("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
			.where("        , a.ostt_qntt        , (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid			")
			.where("        , a.user_memo        , a.sysm_memo       , a.line_levl        , a.invc_numb as prnt_idcd")
			.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
			.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
			.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
			.where("        , i.item_code        , i.item_name       , i.item_spec								")
			.where("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd        , c.cstm_name			")
			.where("from acpt_item a 																			")
			.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
			.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn	")
			.where("                  from sale_ostt_item s 													")
			.where("                  left outer join sale_ostt_item m on s.invc_numb = m.invc_numb				")
			.where("                  where m.line_stat < 2														")
			.where("                  group by s.acpt_numb, s.acpt_seqn											")
			.where("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn			")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
			.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
			.where("where   1=1																					")
			.where("and     (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0					")
			.where("and     b.acpt_stat_dvcd > 0010												")
			.where("and     a.ostt_qntt < a.invc_qntt											")
			.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
			.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
			.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
			.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
			.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb,a.line_seqn															")
			.where(") a																							")
		;
		info = data.selectForMap();

		if (info.size() >=1) {
			data.clear();
			data.param
				.query("select  *																					")
			;
			data.param
				.where("from (  select a.invc_numb as acpt_numb   , a.line_seqn as acpt_seqn											")
				.where("        , a.sply_amnt as sale_amnt        , a.invc_amnt as ttsm_amnt       , a.deli_date        , a.vatx_amnt	")
				.where("        , a.invc_pric as sale_pric        , x.need_qntt as trst_qntt       , a.vatx_incl_yorn   , a.vatx_rate	")
				.where("        , a.item_idcd        , a.unit_idcd as sale_unit       , a.norm_sale_pric   , a.sale_stnd_pric			")
				.where("        , a.stnd_unit        , a.stnd_unit_qntt               , a.wrhs_idcd        , a.dlvy_cstm_idcd			")
				.where("        , '0' as dsct_yorn   , a.ostt_dvcd       , '2000'  as insp_dvcd            , null as insp_date			")
				.where("        , a.pcod_numb        , '0' as ostt_yorn  , null as ostt_date											")
				.where("        , a.user_memo        , a.sysm_memo       , a.invc_numb as prnt_idcd        , a.line_levl				")
				.where("        , a.crte_idcd        , a.crte_urif       , i.modl_name        , b.invc_date	as acpt_date				")
				.where("        , a.ostt_qntt        , (ifnull(x.need_qntt,0)-ifnull(s.ostt_qntt,0)) as unpaid		")
				.where("        , a.line_ordr        , a.line_stat       , a.line_clos        , a.find_name			")
				.where("        , a.updt_user_name   , a.updt_ipad       , a.updt_dttm        , a.updt_idcd			")
				.where("        , a.updt_urif        , a.crte_user_name  , a.crte_ipad        , a.crte_dttm			")
				.where("        , i.item_code        , i.item_name       , i.item_spec								")
				.where("        , b.drtr_idcd        , b.dept_idcd       , b.cstm_idcd        , c.cstm_name			")
				.where("        , i2.item_name as work_item_name         , x.item_idcd as work_item_idcd			")
				.where("from acpt_item a 																			")
				.where("left outer join acpt_mast b on a.invc_numb = b.invc_numb									")
				.where("left outer join mtrl_need x on a.invc_numb = x.invc_numb									")
				.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
				.where("left outer join item_mast i2 on x.item_idcd = i2.item_idcd									")
				.where("left outer join unit_mast u on i.unit_idcd = u.unit_idcd									")
				.where("left outer join ( select sum(ifnull(s.ostt_qntt,0))as ostt_qntt, s.acpt_numb, s.acpt_seqn, s.item_idcd			")
				.where("                  from sale_ostt_item s 													")
				.where("                  left outer join sale_ostt_item m on s.invc_numb = m.invc_numb				")
				.where("                  where m.line_stat < 2														")
				.where("                  group by s.acpt_numb, s.acpt_seqn											")
				.where("                  ) s on a.invc_numb = s.acpt_numb and a.line_seqn = s.acpt_seqn and x.item_idcd = s.item_idcd	")
				.where("left outer join ( select a.invc_numb,a.line_seqn  											")
				.where("                  from pror_item a															")
				.where("                  where line_seqn = ( select max(r.line_seqn) 								")
				.where("                                      from pror_item r										")
				.where("                                      where r.invc_numb = a.invc_numb )						")
				.where("                ) y on  SUBSTRING_INDEX(y.invc_numb,'-',1)  = x.invc_numb 					")
				.where("                    and SUBSTRING_INDEX(y.invc_numb,'-',-1) = x.line_seqn					")
				.where("left outer join ( select invc_numb,wkod_numb,wkod_seqn from work_book 						")
				.where("                  where prog_stat_dvcd = 3													")
				.where("                  group by wkod_numb ,wkod_seqn												")
				.where("                ) f on y.invc_numb = f.wkod_numb and y.line_seqn = f.wkod_seqn				")
				.where("left outer join cstm_mast c on b.cstm_idcd = c.cstm_idcd									")
				.where("where   1=1																					")
				.where("and     f.invc_numb is not null												")
				.where("and     (ifnull(a.invc_qntt,0)-ifnull(s.ostt_qntt,0)) > 0					")
				.where("and     b.acpt_stat_dvcd > 0010												")
				.where("and     a.ostt_qntt < a.invc_qntt											")
				.where("and     a.deli_date >= :deli_date1       " , arg.getParamText("deli_date1" ))
				.where("and     a.deli_date <= :deli_date2       " , arg.getParamText("deli_date2" ))
				.where("and     a.item_idcd = :item_idcd         " , arg.getParamText("item_idcd"  ))
				.where("and     b.cstm_idcd = :cstm_idcd         " , arg.getParamText("cstm_idcd"  ))
				.where("and     a.invc_numb = :invc_numb         " , arg.getParamText("invc_numb"  ))
				.where("and     a.line_stat < :line_stat         " , "2" , "".equals(arg.getParamText("line_stat" )))
				.where("order by a.deli_date,a.line_seqn															")
				.where(") a																							")
			;
			info.get(0).put("product", data.selectForMap());
			return info;
		}
		return info;
	}

	public SqlResultMap setInvoice(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		String invc_numb = "";
		String spts_invc = null;
		boolean check = false;
		for (SqlResultRow row:map) {
			if(!row.getParamText("invc_numb").equals(null)||row.getParamText("invc_numb").trim().length()>0){
				spts_invc = row.getParamText("invc_numb");
			}
			 if(row.getParamText("new_invc_numb").length()>0){
				invc_numb = row.getParamText("new_invc_numb");
			 }
			data.param
				.table("sale_ostt_mast											")
				.where("where invc_numb		= :invc_numb						")	//invoice번호

				.unique("invc_numb"			, row.fixParameter("new_invc_numb"	))	//invoice번호

				.update("bzpl_idcd"			, row.getParameter("bzpl_idcd"		))	//사업장ID
				.update("cstm_idcd"			, row.getParameter("product", SqlResultMap.class).get(0).getParameter("cstm_idcd"))	//거래처ID
				.update("drtr_idcd"			, row.getParameter("drtr_idcd"		))	//담당자ID
				.update("invc_date"			, row.getParameter("ostt_date"		))	//Invoice일자
				.update("dept_idcd"			, row.getParameter("dept_idcd"		))	//부서ID
				.update("deli_date"			, row.getParameter("deli_date"		))	//납기일자
				.update("ostt_dvcd"			, "3200")								//출고구분(판매출고)

				.update("updt_idcd"			, row.getParameter("updt_idcd"		))
				.insert("crte_idcd"			, row.getParameter("crte_idcd"		))
				.update("updt_ipad"			, arg.remoteAddress )
				.insert("crte_ipad"			, arg.remoteAddress )
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
			;data.attach(Action.insert);
			data.execute();
			data.clear();

			if(row.getParameter("product", SqlResultMap.class) != null) {
				setInvoiceDetail(arg, data, row, row.getParameter("product", SqlResultMap.class), invc_numb);
			}
			data.execute();
			data.clear();
		}
	return null;
	}

	public void setInvoiceDetail(HttpRequestArgument arg, DataMessage data, SqlResultRow mst, SqlResultMap map, String invc_numb) throws Exception {
		System.out.println(map);
		for(SqlResultRow row:map) {

			data.param
				.table("sale_ostt_item												")
				.where("where invc_numb		= :invc_numb							")		//invoice번호
				.where("and   line_seqn		= :line_seqn							")		//순번

				.unique("invc_numb"			, mst.fixParameter("new_invc_numb"		))		//invoice번호
				.unique("line_seqn"			, row.fixParameter("new_line_seqn"		))		//순번

				.update("acpt_numb"			, row.fixParameter("acpt_numb"			))		//수주번호
				.update("acpt_seqn"			, row.fixParameter("acpt_seqn"			))		//수주순번
				.update("item_idcd"			, row.fixParameter("work_item_idcd"		))		//품목ID
				.update("sale_unit"			, row.getParameter("sale_unit"			))		//판매단위
				.update("norm_sale_pric"	, row.getParameter("norm_sale_pric"		))		//정상판매단가
				.update("sale_stnd_pric"	, row.getParameter("sale_stnd_pric"		))		//판매기준단가
				.update("sale_pric"			, row.getParameter("sale_pric"			))		//판매단가
				.update("ostt_qntt"			, row.getParameter("ostt_qntt2"			))		//출고수량
				.update("vatx_incl_yorn"	, row.getParameter("vatx_incl_yorn"		))		//부가세포함여부
				.update("vatx_rate"			, row.getParameter("vatx_rate"			))		//부가세율
				.update("sale_amnt"			, row.getParameter("new_sale_amnt"		))		//판매금액
				.update("vatx_amnt"			, row.getParameter("new_vatx_amnt"		))		//부가세금액
				.update("ttsm_amnt"			, row.getParameter("new_ttsm_amnt"		))		//합계금액
				.update("deli_date"			, row.getParameter("deli_date"			))		//납기일자
				.update("lott_numb"			, row.getParameter("lott_numb"			))		//LOT번호
				.update("dlvy_hhmm"			, row.getParameter("dlvy_hhmm"			))		//납품시분
				.update("stnd_unit"			, row.getParameter("stnd_unit"			))		//기준단위
				.update("stnd_unit_qntt"	, row.getParameter("stnd_unit_qntt"		))		//기준단위수량
				.update("wrhs_idcd"			, mst.getParameter("wrhs_idcd"			))		//창고ID
				.update("dlvy_cstm_idcd"	, row.getParameter("dlvy_cstm_idcd"		))		//납품거래처ID
				.update("dsct_yorn"			, row.getParameter("dsct_yorn"			))		//중단여부
				.update("ostt_dvcd"			, row.getParameter("ostt_dvcd"			))		//출고구분코드
				.update("insp_dvcd"			, row.getParameter("insp_dvcd"			))		//검사구분코드
				.update("orig_invc_numb"	, row.getParameter("invc_numb"			))		//출하지시번호
				.update("orig_seqn"			, row.getParameter("line_seqn"			))		//출하지시항번

				.update("pcod_numb"			, row.getParameter("pcod_numb"			))		//PONO

				.update("sale_invc_numb"	, row.getParameter("sale_invc_numb"		))		//판매invoice번호
				.update("sale_qntt"			, row.getParameter("sale_qntt"			))		//판매수량
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

			/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
			sequence.setBook(arg, invc_numb , 0 , "판매출고");
		}
	}

	public SqlResultMap deleteMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String invc_numb = arg.getParamText("invc_numb");

		data.param
			.table("sale_ostt_mast												")
			.where("where invc_numb = :invc_numb								")		//invoice번호
			.unique("invc_numb"			, arg.fixParameter("invc_numb"			))
			.update("line_stat"			, "2" )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		data.param
			.table("sale_ostt_item													")
			.where("where invc_numb = :invc_numb									")		//invoice번호
			.unique("invc_numb"			, arg.fixParameter("invc_numb"				))
			.update("line_stat"			, "2" )
			.update("ostt_qntt"			, "0" )
		;
		data.attach(Action.update);
		data.execute();
		data.clear();

		/* 재고에 반영하기 위해서는 먼저 Commit이 되어 있어야 하므로 별도로 처리한다.......*/
		sequence.setBook(arg, arg.getParamText("invc_numb"), 0 , "판매출고");

		data.param
			.query("select *									")
			.where("from sale_ostt_item							")
			.where("where invc_numb = :invc_numb2				" ,invc_numb)
		;

		SqlResultMap map = data.selectForMap();
		data.clear();

		for (SqlResultRow row:map) {
			data.param
				.table("spts_mast															")
				.where("where invc_numb = :orig_invc_numb									")		//invoice번호
				.unique("orig_invc_numb"			, row.fixParameter("orig_invc_numb"		))
				.update("ostt_yorn"			, "0" )
			;
			data.attach(Action.update);
			data.execute();
			data.clear();

			data.param
				.table("acpt_mast													")
				.where("where  0 = (select ifnull(count(*),0)						")
				.where("			from   sale_ostt_item							")
				.where("			where  acpt_numb = :acpt_numb1					")
				.unique("acpt_numb1", row.fixParameter("acpt_numb"					))
				.where("			and line_stat < 2								")
				.where("			)												")
				.where("and invc_numb = :acpt_numb2									")
				.unique("acpt_numb2", row.fixParameter("acpt_numb"					))
				.update("acpt_stat_dvcd"			, "0200")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}

		return null ;
	}
}
