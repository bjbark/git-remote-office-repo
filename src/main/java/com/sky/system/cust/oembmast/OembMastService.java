package com.sky.system.cust.oembmast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;

@Service
public class OembMastService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	//OEM 조회
	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param // 조회
			.query("select *																								")
		;
		data.param // 조회
			.where("from (																									")
			.where("select a.oemb_idcd																						")
			.where("     , a.oemb_name																						")
			.where("     , a.drtr_idcd																						")
			.where("     , b.user_name	as drtr_name																		")
			.where("     , a.user_memo																						")
			.where("     , a.line_stat																						")
			.where("     , a.oemb_idcd  as orig_oemb_idcd																	")
			.where("from oemb_mast a																						")
			.where("     left outer join user_mast b on b.user_idcd = a.drtr_idcd											")
			.where("where 1 = 1																							")
			.where("and   a.find_name like %:find_name% "	, arg.getParameter("find_name")									 )
			.where("and   a.line_stat  = :line_stat "		, arg.getParamText("line_stat" ), !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.oemb_idcd																					")
			.where(") a																										")
		;

		return data.selectForMap();
	}

	//OEM 거래처  조회
	public SqlResultMap getOembCstm(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param // 조회
			.query("select *																								")
			;

		data.param // 조회
			.where("from (																									")
			.where("select a.oemb_idcd																						")
			.where("     , a.cstm_idcd																						")
			.where("     , b.cstm_code																						")
			.where("     , b.cstm_name																")
			.where("from oemb_cstm a																						")
			.where("     left outer join cstm_mast b on b.cstm_idcd = a.cstm_idcd											")
			.where("where 1 = 1																								")
			.where("and   a.oemb_idcd = :oemb_idcd  " , arg.getParameter("oemb_idcd" )										 )
			.where("order by b.cstm_name																					")
			.where(") a																										")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//거래처  조회
	public SqlResultMap getCstmMast(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;

		data.param // 조회
			.query("select *																								")
		;

		data.param // 조회
			.where("from (																									")
			.where("select a.cstm_idcd																						")
			.where("     , a.cstm_code																						")
			.where("     , a.cstm_name																						")
			.where("from  cstm_mast a																						")
			.where("where 1 = 1																								")
			.where("and   a.sale_cstm_yorn = '1'")
			.where("and	  a.line_stat = :line_stat"	, "0" , "".equals(arg.getParamText("line_stat" )))
			.where("and   not exists(")
			.where("                 select *")
			.where("                   from oemb_cstm b")
			.where("                  where 1 = 1")
			.where("                    and b.oemb_idcd = :oemb_idcd  " , arg.getParameter("oemb_idcd" ))
			.where("                    and b.cstm_idcd = a.cstm_idcd")
			.where("                 )")
			.where("order by a.cstm_name																					")
			.where(") a																										")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	//OEM 거래처 추가
	public SqlResultMap setOembCstm(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row : arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("oemb_cstm")
					.where("where oemb_idcd = :oemb_idcd")
					.where("and   cstm_idcd = :cstm_idcd")

					.unique("oemb_idcd"			, row.fixParameter("oemb_idcd"		))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"		))
					;data.attach(rowaction);

			} else {
				data.param
					.table("oemb_cstm")
					.where("where oemb_idcd	= :oemb_idcd" )
					.where("and   cstm_idcd	= :cstm_idcd" )

					.unique("oemb_idcd"			, row.fixParameter("oemb_idcd"))
					.unique("cstm_idcd"			, row.fixParameter("cstm_idcd"))

					.insert("find_name"			, row.getParameter("cstm_code")
												+ " "
												+ row.getParameter("cstm_name"))

					.insert("line_levl"			, row.getParameter("line_levl"))
					.insert("line_stat"			, row.getParameter("line_levl"))
					.update("updt_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_ipad"			, arg.remoteAddress )
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	//OEM 추가
	public SqlResultMap setOembMast(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row : arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("oemb_mast")
					.where("where oemb_idcd = :oemb_idcd")

					.unique("oemb_idcd"			, row.fixParameter("oemb_idcd") )

					.update("line_stat"			, 2)
					.update("updt_ipad"			, arg.remoteAddress )
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
				;
				data.attach(Action.update);

			} else {
				// 23.08.17 - 코드 중복 검증을 한다.
				boolean isDupCheck = true;

				if (rowaction == Action.update) {
					if (row.getParameter("oemb_idcd" ).equals(row.getParameter("orig_oemb_idcd"))) {
						isDupCheck = false;
					}
				}

				if (isDupCheck) {
					data.param
						.where("select count(*) as count ")
						.where("  from oemb_mast a ")
						.where(" where a.oemb_idcd = :oemb_idcd " , row.getParameter("oemb_idcd" ))
					;
					if (Integer.parseInt(data.selectForRow().getParamText("count")) > 0) {
						throw new ServiceException("등록되어 있는 코드 입니다. 확인 후 진행 하세요.");
					}
				}
				// 23.08.17 - 이강훈 - 수정이면서 코드가 변경된 경우 처리되도록 분리 처리
				data.clear();
				if (rowaction == Action.update && isDupCheck) {
					data.param
						.query("update oemb_mast				")
						.query("   set oemb_idcd = :oemb_idcd " 			, row.getParameter("oemb_idcd"))
						.query("     , line_stat = :line_stat "				, row.getParameter("line_stat"))
						.query("     , oemb_name = :oemb_name "				, row.getParameter("oemb_name"))
						.query("     , drtr_idcd = :drtr_idcd "				, row.getParameter("drtr_idcd"))
						.query("     , find_name = :find_name "				, row.getParameter("oemb_idcd") + " " + row.getParameter("oemb_name"))
						.query("     , user_memo = :user_memo "				, row.getParameter("user_memo"))
						.query("     , updt_dttm = DATE_FORMAT(now(),'%Y%m%d%H%i%S')")
						.query("     , updt_idcd = :updt_idcd "				, arg.login)
						.query(" where oemb_idcd = :orig_oemb_idcd "		, row.getParameter("orig_oemb_idcd"))
					;
					data.attach(Action.direct);

					data.clear();
						data.param
						.query("update oemb_cstm				")
						.query("   set oemb_idcd = :oemb_idcd " , row.fixParameter("oemb_idcd"))
						.query("     , updt_dttm = DATE_FORMAT(now(),'%Y%m%d%H%i%S')")
						.query("     , updt_idcd = :updt_idcd "		, arg.login)
						.query(" where oemb_idcd = :oemb_idcd2 ", row.fixParameter("orig_oemb_idcd"))
					;
					data.attach(Action.direct);
				} else {
					data.param
						.table("oemb_mast")
						.where("where oemb_idcd	= :oemb_idcd" )

						.unique("oemb_idcd"			, row.fixParameter("oemb_idcd"))

						.update("oemb_name"			, row.getParameter("oemb_name"))
						.update("drtr_idcd"			, row.getParameter("drtr_idcd"))
						.update("find_name"			, row.getParameter("oemb_idcd")
													+ " "
													+ row.getParameter("oemb_name"))
						.update("user_memo"			, row.getParameter("user_memo"))
						.insert("line_levl"			, row.getParameter("line_levl"))
						.update("line_stat"			, row.getParameter("line_stat"))
						.update("updt_ipad"			, arg.remoteAddress )
						.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.update("updt_idcd"			, arg.login)
						.insert("crte_ipad"			, arg.remoteAddress )
						.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_idcd"			, arg.login)
					;
					data.attach(rowaction);
				}
			}
		}
		data.execute();
		return null ;
	}
}