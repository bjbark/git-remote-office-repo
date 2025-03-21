package com.sky.system.custom.sjflv.stock.isos.osttwork;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;

import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class OsttWorkService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize																	")
		;
		data.param
			.query("select    a.cstm_idcd         , a.item_idcd     , a.bzpl_idcd         , a.drtr_idcd			")
			.query("        , a.ostt_work_cont    , i.item_name     , i.item_spec         , c.cstm_name			")
			.query("        , u.user_name as drtr_name              , i.item_code         , c.cstm_code			")
			.query("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd         , a.line_levl			")
			.query("        , a.line_ordr       , a.line_stat       , a.line_clos         , a.find_name			")
			.query("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm         , a.updt_idcd			")
			.query("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad         , a.crte_dttm			")
			.query("        , a.crte_idcd       , a.crte_urif   												")

		;
		data.param //퀴리문
			.where("from   ostt_work_mast a																		")
			.where("left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd									")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where  1=1																					")
			.where("and    a.find_name	like %:find_name%	" , arg.getParamText("find_name"))
			.where("and    a.item_idcd  = :item_idcd       "  , arg.getParamText("item_idcd"  ))
			.where("and    a.cstm_idcd  = :cstm_idcd       "  , arg.getParamText("cstm_idcd"  ))
			.where("and    a.drtr_idcd  = :drtr_idcd       "  , arg.getParamText("drtr_idcd"  ))
			.where("and    a.line_stat = :line_stat " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("order by a.cstm_idcd													")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("ostt_work_mast")
					.where("where   cstm_idcd  = :cstm_idcd  " )
					.where("and     item_idcd  = :item_idcd  " )
					//
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"         ))
					.unique("item_idcd"			, row.fixParameter("item_idcd"         ))

				;data.attach(Action.delete);
			} else {
				data.param
					.table("ostt_work_mast")
					.where("where   cstm_idcd  = :cstm_idcd  " )
					.where("and     item_idcd  = :item_idcd  " )
					//
					.update("cstm_idcd"			, row.fixParameter("cstm_idcd"))
					.update("item_idcd"			, row.fixParameter("item_idcd"))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
					.update("ostt_work_cont"	, row.getParameter("ostt_work_cont"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("find_name"			, row.getParamText("cstm_code").trim()
												+ " "
												+ row.getParamText("cstm_name").trim()
												+ " "
												+ row.getParamText("item_code").trim()
												+ " "
												+ row.getParamText("item_name_name").trim())
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("updt_ipad"			, arg.remoteAddress )
					.insert("crte_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		//2023.01.04 - 이강흔 - 패킹단위를 수중에서 거래처의 패킹단위로 변경
		data.param
			.query("select s.deli_date, s.cstm_idcd, s.cstm_code, s.item_idcd, s.cstm_name, s.item_code, s.item_name, s.item_spec							")
			.query("     , s.invc_qntt, s.invc_numb, s.line_seqn																							")
			.query("     , s.dlvy_addr, s.user_memo, s.dely_cstm_name																						")
			.query("     , ifnull((select a.mngt_sbsc_valu from cstm_sbsc a 																				")
			.query("                where a.mngt_sbsc_idcd = '000008' and a.cstm_idcd = s.cstm_idcd limit 1)												")
			.query("            , 10) as pack_qntt																											")
		;

		data.param
			.where(" from (																																	")
			.where("       select b.deli_date, a.cstm_idcd, c.cstm_code, c.cstm_name, b.item_idcd  , d.item_code , d.item_name , d.item_spec				")
			.where("            , b.invc_qntt, b.invc_numb, b.line_seqn																						")
			.where("            , concat(e.dlvy_addr_1fst, ' ', e.dlvy_addr_2snd) as dlvy_addr																")
			.where("            , b.user_memo                 , e.dely_cstm_name																			")
		;

		data.param
			.where("         from acpt_mast a																												")
			.where("              left outer join acpt_item b on b.invc_numb = a.invc_numb																	")
			.where("              left outer join cstm_mast c on c.cstm_idcd = a.cstm_idcd																	")
			.where("              left outer join item_mast d on d.item_idcd = b.item_idcd																	")
			.where("              left outer join cstm_deli e on e.cstm_idcd = a.cstm_idcd and e.dlvy_cstm_idcd = a.dlvy_cstm_idcd							")
			.where("        where 1 = 1																														")
			.where("          and a.find_name like :find_name	" , arg.getParamText("find_name"))
			.where("          and b.deli_date >= :invc1_date	" , arg.getParamText("invc1_date"))
			.where("          and b.deli_date <= :invc2_date	" , arg.getParamText("invc2_date"))
			.where("          and a.cstm_idcd =  :cstm_idcd		" , arg.getParamText("cstm_idcd"))
			.where("          and a.drtr_idcd =  :drtr_idcd		" , arg.getParamText("drtr_idcd" ))
			.where("          and b.item_idcd =  :item_idcd		" , arg.getParamText("item_idcd"))
			.where("          and a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("     ) s																																")
			.where("     order by s.deli_date desc																											")
		;
		return data.selectForMap();
	}

	public SqlResultMap getLabel(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		ParamToJson trans = new ParamToJson();
		String param = trans.TranslateRowRec(map,"", "invc_numb,line_seqn,pack_qntt,box_weigth");

		data.param
			.query("call product_box_label_print   (")
			.query("   :param "  , param			 )
			.query(" ) 								")
		;

		return data.selectForMap();
	}
}