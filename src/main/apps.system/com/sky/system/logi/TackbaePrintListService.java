package com.sky.system.logi;

import java.util.Map;

import net.sky.core.connection.HostProperty;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;


//import com.sky.data.SqlParamText;
//import com.sky.data.SqlParameter;
import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class TackbaePrintListService extends DefaultServiceHandler {

	/**
	 * 미발행 현황
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		String printyn = arg.getParamText("print_yn").toString();
		String searchgb = arg.getParamText("search_gb").toString();
		String searchnm = arg.getParamText("find_name").toString();


		data.param
			.total("select count(1) as maxsize ")
		;

		data.param
			.query(" select a.inv_no     , a.ori_no        , a.hdli_no								")
			.query("	, (select stor_nm from stor where stor_id = a.stor_id) as stor_nm	, a.stor_id						")
			.query("	, (case when a.hdli_no is null then '0' else '1' end ) as taekbae_yn                      ")
			.query("	, a.cust_id      , a.cust_nm 																						")
			.query("	, s.biz_no       , s.biz_nm        , s.biz_type     , s.biz_type                                ")
			.query("	, s.biz_owner    , s.biz_email     , s.biz_tel_no   , s.biz_fax_no                               ")
			.query("	, s.biz_zip_cd   , s.biz_state, s.biz_city, s.biz_dong , s.biz_addr_1 , s.biz_addr_2  ")
			.query("	, a.reve_nm                                                                                  ")
			.query("	, a.reve_email   , a.reve_tel_no   , a.reve_hp_no  , a.reve_fax_no                              ")
			.query("	, a.reve_zip_cd  , a.reve_state    , a.reve_city    , a.reve_dong     , a.reve_addr_1 , a.reve_addr_2 , a.recv_addr3 ,  ")
			.query("	(select case (select count(*) from sale_dtl si where si.inv_no = a.inv_no) ")
			.query("		when 1 then s.item_name else (s.item_name + ' 외 ' + (select count(*) - 1 from sale_dtl si where si.inv_no = a.inv_no) || '건') end as item_name ")
			.query("	from sale_dtl s  ")
			.query("	where s.inv_no = a.inv_no ")
			.query("	and rownum = 1) as item_name ")
		;
		data.param
			.where(" from sale_mst a, stor s																				")
			.where(" where a.stor_id 		= 	:stor_id    	" , arg.fixParameter("stor_id"))
			.where(" and   a.inv_dt between	    :fr_dt    		" , arg.getParameter("fr_dt"))
			.where(" 					and     :to_dt    		" , arg.getParameter("to_dt"))
			.where(" and   a.cust_id 		= 	:cust_id    	" , arg.getParameter("cust_id"))
			.where(" and   a.inv_no 		= 	:sale_inv_no    " , arg.getParameter("sale_inv_no"))
			.where(" and   a.ori_no 		= 	:order_inv_no   " , arg.getParameter("order_inv_no"))
			.where(" and   a.mmb_nm  like %:find_name%  " , searchnm , "1".equals( searchgb )) // 회원명
			.where(" and   a.reve_nm  like %:find_name%  " , searchnm , "2".equals( searchgb )) // 수령자명
			.where(" and   a.stor_id = s.stor_id																					")
			.where(" and   a.row_sts = 0																							")
			;
			if ( "1".equals(printyn) ){ /* 1 : 송장 발행이면  */
				data.param
				.where(" and   a.hdli_no is not null																		")
				;
			} else { /*  미발행이면 */
				data.param
				.where(" and   a.hdli_no is null																			")
				;
			}

			data.param
			.where(" order by a.inv_no																				")
			;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 미전송 현황
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String searchgb = arg.getParamText("search_gb").toString();
		String searchnm = arg.getParamText("find_name").toString();


		data.param
			.total("select count(1) as maxsize ")
			.total("       , sum(a.print_count) as print_count, sum(a.fare) as fare														")
		;

	 	data.param
	 		.query(" select a.hdli_id , a.hdli_no , a.taekbae_dt , a.print_count , a.fare_type , a.fare , a.inv_no , a.taekbae_yn, a.item, a.unit 	")
		 	.query("	, (select bas_nm from base_mst where bas_id = a.hdli_id) as taekbae_nm									")
		 	.query("	, (select stor_nm from stor where stor_id = a.stor_id) as stor_nm	, a.stor_id						")
		 	.query("	, a.cust_id , a.cust_nm 																						")
	      	.query("	, s.biz_no       , s.biz_nm      , s.biz_type   , s.biz_type                                ")
			.query("	, s.biz_owner    , s.biz_email   , s.biz_tel_no , s.biz_fax_no                               ")
			.query("	, s.biz_zip_cd   , s.biz_state   , s.biz_city   , s.biz_dong    , s.biz_addr_1 , s.biz_addr_2  ")
			.query("	, a.reve_nm      , a.reve_tel_no , a.reve_hp_no                                                                             ")
	      	.query("	, a.reve_zip_cd  , a.reve_addr_1  , a.reve_addr_2 ")
	 	;
	 	data.param
		 	.where(" from  seq_taekbae a																								")
		 	.where("       join stor  s on a.stor_id = s.stor_id																		")
		 	.where("       left outer join order_mst  o on a.ori_no = o.ori_no																")
		 	.where(" where a.stor_id 		= 	:stor_id    	"	, 	arg.fixParameter("stor_id"))
		 	.where(" and   a.taekbae_dt between	:fr_dt    		"	, 	arg.getParameter("fr_dt"))
		 	.where(" 					and     :to_dt    		"	, 	arg.getParameter("to_dt"))
		 	.where(" and   a.cust_id 		= 	:cust_id    	"	, 	arg.getParameter("cust_id"))
		 	.where(" and   a.inv_no 		= 	:sale_inv_no    "	, 	arg.getParameter("sale_inv_no"))
		 	.where(" and   a.ori_no 		= 	:order_inv_no   "	, 	arg.getParameter("order_inv_no"))
			.where(" and   o.mmb_nm  like %:find_name%  " , searchnm , "1".equals( searchgb )) // 회원명
			.where(" and   a.reve_nm  like %:find_name%  " , searchgb , "2".equals( searchgb )) // 수령자명
		 	.where(" and   a.taekbae_yn     = '0'																						")
			.where(" and   a.row_sts = 0																							    ")
		 	.where(" order by a.hdli_no desc																							")
	 	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}



	/**
	 * 전송 현황
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");
		String searchgb = arg.getParamText("search_gb").toString();
		String searchnm = arg.getParamText("find_name").toString();


		data.param
			.total("select count(1) as maxsize ")
			.total("       , sum(a.print_count) as print_count, sum(a.fare) as fare														")
		;

		data.param
		 	.query(" select a.hdli_id , a.hdli_no , a.taekbae_dt , a.print_count , a.fare_type , a.fare , a.inv_no	")
		 	.query("    , a.ori_no, a.taekbae_yn, a.item, a.unit 													")
		 	.query("	, (select bas_nm from base_mst where bas_id = a.hdli_id) as taekbae_nm						")
		 	.query("	, (select stor_nm from stor where stor_id = a.stor_id) as stor_nm	, a.stor_id				")
		 	.query("	, s.biz_no       , s.biz_nm      , s.biz_type   , s.biz_type                                ")
			.query("	, s.biz_owner    , s.biz_email   , s.biz_tel_no , s.biz_fax_no                               	")
			.query("	, s.biz_zip_cd   , s.biz_state   , s.biz_city   , s.biz_dong    , s.biz_addr_1 , s.biz_addr_2  ")
	      	.query("	, a.reve_nm      , a.reve_tel_no , a.reve_hp_no                                             ")
	      	.query("	, a.reve_zip_cd  , a.reve_addr_1  , a.reve_addr_2 											")
      	;
	 	data.param
		 	.where(" from seq_taekbae a																				")
		 	.where("      join stor                 s  on a.stor_id = s.stor_id										")
		 	.where("      left outer join sale_mst  sa on a.inv_no = sa.inv_no										")
		 	.where(" where a.stor_id 		= 	:stor_id    	"	, 	arg.fixParameter("stor_id"))
		 	.where("   and   a.taekbae_dt between :fr_dt   		"	, 	arg.getParameter("fr_dt"))
		 	.where(" 					  and     :to_dt   		"	, 	arg.getParameter("to_dt"))
		 	.where("   and   a.cust_id 		= 	:cust_id    	"	, 	arg.getParameter("cust_id"))
		 	.where("   and   a.inv_no 		= 	:sale_inv_no    "	, 	arg.getParameter("sale_inv_no"))
		 	.where("   and   a.ori_no 		= 	:order_inv_no   "	, 	arg.getParameter("order_inv_no"))
			.where("   and  sa.mmb_nm  like %:find_name%  " , searchnm , "1".equals( searchgb )) // 회원명
			.where("   and   a.reve_nm  like %:find_name%  " , searchnm , "2".equals( searchgb )) // 수령자명
		 	.where("   and   a.taekbae_yn     = '1'																	")
			.where("   and   a.row_sts = 0																			")
		 	.where(" order by a.hdli_no desc ")
	 	;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * 택배 정보 변경 저장
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setUpdate(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow inv:map){
			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));

			data.param
				.table("seq_taekbae												")
				.where("where hdli_no  = :hdli_no ", inv.getParameter("hdli_no"	))
				.update("reve_nm"		, inv.getParameter("reve_nm"			))
				.update("reve_tel_no"	, inv.getParameter("reve_tel_no"		))
				.update("reve_hp_no"	, inv.getParameter("reve_hp_no"		))
				.update("reve_zip_cd"	, inv.getParameter("reve_zip_cd"		))
				.update("reve_addr_1"	, inv.getParameter("reve_addr_1"			))
				.update("reve_addr_2"	, inv.getParameter("reve_addr_2"			))
				.update("upt_nm"		, inv.getParameter("upt_nm"			))
				.update("upt_ip"		, arg.remoteAddress						)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = rowaction
			;
			data.attach();
		}

		data.execute();
		return null ;
	}

	/**
	 * 택배 송장 출력전 저장
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setTaekbae(HttpRequestArgument arg) throws Exception {

		Map map = arg.getParameter("model", Map.class);

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("seq_taekbae													")
			.where("where   hdli_no  = :hdli_no ", map.get("hdli_no"     	))
			.update("ori_no"        	, map.get("ori_no"     			))
			.update("inv_no"        	, map.get("inv_no"     			))
			.update("fare_type"         , map.get("fare_type"     		))
			.update("fare"        		, map.get("fare"     			))
			.update("unit"        		, map.get("unit"     			))
			.update("item"        		, map.get("item_name"  			))

			.update("reve_nm"        	, map.get("reve_nm"     		))
			.update("reve_tel_no"       , map.get("reve_tel_no"     	))
			.update("reve_hp_no"       , map.get("reve_hp_no"			))
			.update("reve_zip_cd"       , map.get("reve_zip_cd"			))
			.update("reve_addr_1"        , map.get("reve_addr_1" 			))
			.update("reve_addr_2"        , map.get("reve_addr_2" 			))

			.update("cust_id"           , map.get("cust_id" 			))
			.update("cust_nm"           , map.get("cust_nm" 			))

			.update("user_memo"         , map.get("user_memo"    		))
			.update("upt_nm"         , map.get("upt_nm"    		))
			.update("upt_ip"   	    , arg.remoteAddress              )
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;

		data.attach(Action.update);
		String taekbaeno = map.get("hdli_no" 	).toString() + ",";
		data.param
			.query(" update sale_mst t ")
			.query(" set t.upt_nm = '"+map.get("upt_nm"  ).toString() + "', ")
			.query(" t.upt_ip = '"+arg.remoteAddress + "', ")
			.query(" t.upt_dttm = dbo.to_char(getdate(), 'yyyymmddhh24miss'), ")
			.query(" t.hdli_id = '" + map.get("hdli_id" 	).toString() + "', ")
			.query(" t.hdli_no =  replace( t.hdli_no , :replaceno , '' ) || :replaceno  " )
			.query(" where   t.inv_no  = '"+  map.get("inv_no"    ) + "'" )

			.assign("replaceno", taekbaeno )
		;
		data.attach(Action.direct);

		data.execute();
		return null;
	}

	/**
	 * 실제 택배 연동 저장
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setLinkTaekbae(HttpRequestArgument arg) throws Exception {

		Map map = arg.getParameter("model", Map.class);

		DataMessage data2 = arg.newStorage("POS");

		data2.param
			.query(" SELECT tid, bid, cur_no, dbhost, dbport, 		")
			.query("	dbssid, dbuser, dbpswd, prefix, suffix, stor_id 		")
			.query(" FROM stor_taekbae ")
			.query(" WHERE hdli_id = :hdli_id", map.get("hdli_id").toString())
			.query("   AND stor_id = :stor_id", map.get("stor_id").toString())
		;


		for(SqlResultRow row:data2.selectForMap()){
			map.put("tid", row.getParamText("tid"));
			map.put("bid", row.getParamText("bid"));
			map.put("cur_no", row.getParamText("cur_no"));
			map.put("dbhost", row.getParamText("dbhost"));
			map.put("dbport", row.getParamText("dbport"));
			map.put("dbssid", row.getParamText("dbssid"));
			map.put("dbuser", row.getParamText("dbuser"));
			map.put("dbpswd", row.getParamText("dbpswd"));
			map.put("prefix", row.getParamText("prefix"));
			map.put("suffix", row.getParamText("suffix"));
		}
		HostProperty property = new HostProperty(map.get("stor_id").toString() + map.get("hdli_id"));
		property.setProvider( "oracle" );
		property.setHostName( map.get("dbhost").toString());
		property.setHostPort( Integer.parseInt(map.get("dbport").toString()));
		property.setUserName( map.get("dbuser").toString());
		property.setPassword( map.get("dbpswd").toString());
		property.setDatabase( map.get("dbssid").toString());
		property.setPoolTime( 500 );
		property.setMaxcount( 15 );
		DataMessage data = new DataMessage(property);




		String sttlplcdiv = "";

		if("1".equals(map.get("fare_type"))){
			sttlplcdiv = "3";
		} else if("2".equals(map.get("fare_type"))){
			sttlplcdiv = "4";
		} else if("3".equals(map.get("fare_type"))){
			sttlplcdiv = "1";
		}


		if("5101010".equals(map.get("hdli_id"))){
			data.param
				.query(" SELECT  CLLDLVBRANNM, CLSFCD, ADDRSHORT, clldlvempnm ")
				.query(" FROM    V_IFST_POST_" + map.get("suffix").toString())
				.query(" WHERE   ZIPNUM = :reve_zip_cd ", map.get("reve_zip_cd").toString())
			;

			SqlResultMap info = data.selectForMap();

			// CJ 택배 조회시 데이터가 없을시 익셉션을 던짐
			if(info.size() == 0){
				throw new Exception();
			}

			for(SqlResultRow row:data.selectForMap()){
				map.put("taekbae_did", row.getParamText("clldlvbrannm"));
				map.put("taekbae_tml", row.getParamText("clsfcd"));
				map.put("taekbae_znm", row.getParamText("addrshort"));
				map.put("taekbae_pnm", row.getParamText("clldlvempnm"));
			}
		}

		data.clear();

		data.param
			.query(" INSERT INTO V_IFST_DLV_REQ_"+map.get("suffix").toString())
			.query(" (CLNTNUM, ACPTDT, CLNTORDRNUM, PRNGDIVCD, REQDIVCD ")
			.query(" ,INSTRCDIVCD, STTLDLV, FAREDIVCD, HMDLYSKUCD, CNTRLARCCD ")
			.query(" ,STTLPLCDIV, BOXTYPCD, QTY, FARE, CLNTMGMCUSTCD ")
			.query(" ,SNDPRSNNM, SNDPRSNTELNUM, PSNCHRGCLPHNUM, SNDPRSNZIPNUM, SNDPRSNADDR, SNDPRSNADDRDTL ")
			.query(" ,RCVRNM, RCVRTELNUM, RCVRCLPHNUM, RCVRZIPNUM, RCVRADDR, RCVRADDRDTL")
			.query(" ,ORDUSRNM, ORDUSRTELNUM, ORDUSRCLPHNUM, TRSPBILLNUM, OGNTRSPBILLNUM")
			.query(" ,GTHPREARRDT, GTHPREARRHR, DLVPREARRDT, DLVPREARRHR")
			.query(" ,OUPSTS, ONEPCKNUM, CMDTPRCAMT, RMK1, RMK2")
			.query(" ,CODYN, SKUCD, SKUNM, SKUQTY, UNTITMCD")
			.query(" ,UNTITMNM, SKUPRCAMT, ETC1, ETC2, HDLGDIVCD, ERRMSG)")
			.query(" VALUES")
			.query(" ('"+map.get("tid").toString()+"',to_char(sysdate, 'yyyymmdd'),'"+map.get("ori_no").toString()+"/"+ map.get("hdli_no").toString()+"','01', '01'")
			.query(" ,'1','1','0"+map.get("fare_type").toString()+"','01','01'")
			.query(" ,'"+sttlplcdiv+"','"+map.get("unit").toString()+"',1,"+map.get("fare").toString()+",'"+map.get("tid").toString()+"'")
			.query(" ,'"+map.get("biz_nm").toString()+"','"+map.get("biz_tel_no").toString()+"','"+map.get("biz_tel_no").toString()+"','"+map.get("biz_zip_cd").toString()+"','"+map.get("biz_addr_1").toString()+"','"+map.get("biz_addr_1").toString()+"'")
			.query(" ,'"+map.get("reve_nm").toString()+"','"+map.get("reve_tel_no").toString()+"','"+map.get("reve_hp_no").toString()+"','"+map.get("reve_zip_cd").toString()+"','"+map.get("reve_addr_1").toString()+"','"+map.get("reve_addr_2").toString()+"'")
			.query(" ,'"+map.get("cust_nm").toString()+"',null, null,'"+map.get("hdli_no").toString()+"', null")
			.query(" ,null, null, null, null")
			.query(" ,'02', null, null, null, null ")
			.query(" ,null, null, '"+map.get("item_name").toString()+"','1', null")
			.query(" ,null, null, null, null, '10', null) ")
		;
		data.attach(Action.direct);


		data.param
			.table("seq_taekbae													")
			.where("where   hdli_no  = :hdli_no ", map.get("hdli_no"     	))

			.update("taekbae_tid"       , map.get("tid"     	))
			.update("taekbae_sid"       , map.get("sid"     	))
			.update("taekbae_bid"       , map.get("bid"     	))
			.update("taekbae_zip"       , map.get("suffix"     	))
			.update("taekbae_yn"       	, "1"							)
			.update("user_memo"         , map.get("user_memo"    		))
			.update("upt_nm"         , map.get("upt_nm"    		))
			.update("upt_ip"   	    , arg.remoteAddress              )
			.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		if("5101010".equals(map.get("hdli_id"))){
			data.param
			.update("taekbae_did"       , map.get("taekbae_did"     	))
			.update("taekbae_tml"       , map.get("taekbae_tml"     	))
			.update("taekbae_znm"       , map.get("taekbae_znm"     	))
			.update("taekbae_pnm"       , map.get("taekbae_pnm"     	))
			;
		}
		data.attach(Action.update, map.get("hq_id").toString()+".POS");

		String taekbaeno = map.get("hdli_no" 	).toString() + ",";
		data.param
			.query(" update sale_mst t ")
			.query(" set t.upt_nm = '"+map.get("upt_nm"  ).toString() + "', ")
			.query(" t.upt_ip = '"+arg.remoteAddress + "', ")
			.query(" t.upt_dttm = dbo.to_char(getdate(), 'yyyymmddhh24miss'), ")
			.query(" t.hdli_id = '" + map.get("hdli_id" 	).toString() + "', ")
			.query(" t.hdli_no =  replace( t.hdli_no , :replaceno , '' ) || :replaceno  " )
			.query(" where   t.inv_no  = '"+  map.get("inv_no"    ) + "'" )
			.assign("replaceno" , taekbaeno )
		;
		data.attach(Action.direct, map.get("hq_id").toString()+".POS");

		data.execute();
		return null ;
	}

	/**
	 * 택배 정보 변경 저장
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		for(SqlResultRow inv:map){
			Action rowaction = SqlParameter.Action.setValue(inv.getParameter("_set"));

			data.param
				.table("sale_mst												")
				.where("where inv_no  = :inv_no ", inv.getParameter("inv_no"	))
				.update("biz_nm"		, inv.getParameter("biz_nm"				))
				.update("biz_tel_no"	, inv.getParameter("biz_tel_no"			))
				.update("biz_zip_cd"	, inv.getParameter("biz_zip_cd"			))
				.update("biz_addr_1"		, inv.getParameter("biz_addr_1"			))
				.update("biz_addr_2"		, inv.getParameter("biz_addr_2"			))
				.update("reve_nm"		, inv.getParameter("reve_nm"			))
				.update("reve_tel_no"	, inv.getParameter("reve_tel_no"		))
				.update("reve_hp_no"	, inv.getParameter("reve_hp_no"		))
				.update("reve_zip_cd"	, inv.getParameter("reve_zip_cd"		))
				.update("reve_addr_1"	, inv.getParameter("reve_addr_1"			))
				.update("reve_addr_2"	, inv.getParameter("reve_addr_2"			))
				.update("upt_nm"		, inv.getParameter("upt_nm"			))
				.update("upt_ip"		, arg.remoteAddress						)
				.update("upt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				.action = rowaction
			;
			data.attach();
		}

		data.execute();
		return null ;
	}

}
