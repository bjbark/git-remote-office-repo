package com.sky.system.pos;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;

@Service
public class JungsanReportService  extends DefaultServiceHandler {


	/**
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
			.total("	, isnull(sum(a.started_amount), 0) as started_amount ")
			.total("	, isnull(sum(a.rotated_amount), 0) as rotated_amount ")
			.total("	, isnull(sum(a.collect_amount), 0) as collect_amount ")
			.total("	, isnull(sum(a.halfway_amount), 0) as halfway_amount ")
			.total("	, isnull(sum(a.account_amount), 0) as account_amount ")
			.total("	, isnull(sum(a.cashbox_amount), 0) as cashbox_amount ")
			.total("	, isnull(sum(a.residue_amount), 0) as residue_amount ")
			.total("	, isnull(sum(a.cashbox_rotate), 0) as cashbox_rotate ")
			.total("	, isnull(sum(a.halfway_closer), 0) as halfway_closer ")
			.total(" 	, isnull(sum(a.pay_card_amt),0)    as card_amount          							 			")
			.total(" 	, isnull(sum(a.pay_etc_amt + a.pay_dc_amt + a.pay_point_amt + a.pay_nopay_amt), 0) as etc_amount	")
		;

		data.param // 쿼리문  입력
			.query("select a.jungsan_dt, a.jungsan_pos_no, 															")
			.query(" 	   a.started_amount, a.rotated_amount, a.collect_amount, a.halfway_amount, a.account_amount,")
			.query(" 	   a.cashbox_amount, a.residue_amount, a.cashbox_rotate, a.halfway_closer, 					")
			.query(" 	   a.pay_card_amt as card_amount,         							 						")
			.query(" 	   a.pay_etc_amt + a.pay_dc_amt + a.pay_point_amt + a.pay_nopay_amt as etc_amount,  		")
			.query(" 	   (select stor_nm from stor where stor_id = a.stor_id) as stor_nm 					")
		;
		data.param
			.where("  from pos_jungsan a")
			.where(" where a.jungsan_gb     = '1000' ") // 정산 구분(1000=일정산/2000:사용자)
			.where("   and a.jungsan_status = '2000' ") // 정산 상태(1000=개점/2000:폐점)
			.where("   and a.jungsan_dt between :fr_dt     ", arg.fixParameter("fr_dt"))
			.where("   and :to_dt                          ", arg.fixParameter("to_dt"))
			.where("   and a.stor_id = :stor_id          ", arg.getParameter("stor_id"))
		;

		if (page == 0 && rows == 0){
			return data.selectForMap();
		} else {
			return data.selectForMap(page, rows, (page==1));
		}
	}


}
