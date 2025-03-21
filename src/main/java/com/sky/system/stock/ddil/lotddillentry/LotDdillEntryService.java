package com.sky.system.stock.ddil.lotddillentry;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class LotDdillEntryService extends DefaultServiceHandler {

	public SqlResultMap getSearch1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String invc_date = arg.getParamText("invc_date");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select   a.item_idcd   , a.lott_numb   , a.wrhs_idcd   , i.item_code   , i.item_name   , i.item_spec		")
			.query("       , sum(ifnull(a.bfre_qntt,0)) as bfre_qntt 															")
			.query("       , sum(ifnull(a.istt_qntt,0)) as istt_qntt															")
			.query("       , sum(ifnull(a.ostt_qntt,0)) as ostt_qntt															")
			.query("       , sum(ifnull(a.bfre_qntt,0)) + sum(ifnull(a.istt_qntt,0)) - sum(ifnull(a.ostt_qntt,0)) as tdtt_qntt 	")
		;
		data.param //퀴리문
			.where("from  ( select item_idcd , lott_numb , wrhs_idcd															")
			.where("             , case when invc_date < :invc1_date then qntt * stok_symb else 0 end as bfre_qntt"             ,arg.getParamText("invc_date"))
			.where("             , case when invc_date = :invc2_date  and isos_dvcd between 1000 and 1999"    ,arg.getParamText("invc_date"))
			.where("               then qntt  else 0 end as istt_qntt															")
			.where("             , case when invc_date = :invc3_date  and isos_dvcd between 2000 and 3000",arg.getParamText("invc_date"))
			.where("               then qntt  else 0 end as ostt_qntt															")
			.where("from   lot_isos_book 																						")
			.where("where  invc_date <= :invc4_date) a ",arg.getParamText("invc_date"))
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd													")
			.where("where  1=1																									")
			.where("and    wrhs_idcd   = :wrhs_idcd   " , arg.getParamText("wrhs_idcd" ))
			.where("and    find_name like %:find_name% " , arg.getParamText("find_name"))
			.where("group by a.item_idcd , i.item_name , i.item_spec , a.lott_numb												")
			.where("order by a.lott_numb																						")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select   a.invc_numb        , a.line_seqn         , a.lott_numb          , a.acct_bacd			")
			.query("       , a.item_idcd        , a.zone_idcd         , a.unit_idcd          , a.unit_idcd			")
			.query("       , a.stnd_unit        , a.book_good_qntt    , a.book_poor_qntt     , a.book_issb_qntt		")
			.query("       , a.book_qntt_ttsm   , a.ddil_good_qntt    , a.ddil_poor_qntt     , a.ddil_issb_qntt		")
			.query("       , a.ddil_qntt_ttsm   , a.diff_good_qntt    , a.diff_poor_qntt     , a.stor_plac			")
			.query("       , a.user_memo        , a.sysm_memo         , a.prnt_idcd          , a.line_levl			")
			.query("       , a.line_ordr        , a.line_stat         , a.line_clos          , a.find_name			")
			.query("       , a.updt_user_name   , a.updt_ipad         , a.updt_dttm          , a.updt_idcd			")
			.query("       , a.updt_urif        , a.crte_user_name    , a.crte_ipad          , a.crte_dttm			")
			.query("       , a.crte_idcd        , a.crte_urif														")
			.query("       , i.item_code        , i.item_name         , i.item_spec          , u.unit_name			")
		;
		data.param
			.where("from   ddil_lot_item a																			")
			.where("left outer join ddil_lot_mast d on a.invc_numb = d.invc_numb									")
			.where("left outer join item_mast     i on a.item_idcd = i.item_idcd									")
			.where("left outer join unit_mast     u on i.unit_idcd = u.unit_idcd									")
			.where("where    1=1																					")
			.where("and      a.find_name like %:find_name%    " , arg.getParamText("find_name"))
			.where("and      d.invc_date   = :invc_date       " , arg.getParamText("invc_date"))
			.where("and      d.wrhs_idcd   = :wrhs_idcd       " , arg.getParamText("wrhs_idcd"))
			.where("and      a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.lott_numb																			")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
				data.param
					.table("ddil_lot_item												")
					.where("where invc_numb = :invc_numb								")		//invoice번호
					.where("and   line_seqn = :line_seqn								")		//순번

					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("line_seqn"			, row.fixParameter("line_seqn"			))

					.update("stor_plac"			, row.getParameter("stor_plac"			))		//보관장소
					.update("item_idcd"			, row.getParameter("item_idcd"			))		//품목ID
					.update("book_good_qntt"	, row.getParameter("book_good_qntt"		))		//장부재고
					.update("ddil_good_qntt"	, row.getParameter("ddil_good_qntt"		))		//실사수량
					.update("diff_good_qntt"	, row.getParameter("diff_good_qntt"		))		//차이수량
					.update("user_memo"			, row.getParameter("user_memo"			))		//메모

					.update("updt_idcd"			, row.getParameter("updt_idcd"			))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"			))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
				data.attach(rowaction);
			}
		data.execute();
		return null ;
	}

	public SqlResultMap setWrite(HttpRequestArgument arg) throws Exception {

		DataMessage data;
		String hq			= arg.getParamText("hqof_idcd");
		String stor			= arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call ddil_lot_change (				")
			.query("       :fr_dt"         , arg.fixParamText("invc_date")		)		// invoice일자
			.query("     , :crte_idcd"     , arg.fixParamText("crte_idcd")		)		// 생성ID
			.query(" ) 									")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}
}
