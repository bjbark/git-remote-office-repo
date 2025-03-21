package com.sky.system.edi;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.listener.SeqListenerService;
import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service
public class EdiPromotionService  extends DefaultServiceHandler {

	@Autowired
	private SeqListenerService seqlistener;

	/**
	 * master 조회
	 *
	 * @param arg
	 * @param page
	 * @param rows
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");
		data.param // 집계
			.total("select count(1) as maxsize ")
		;
		data.param // 조회
			.query("select a.prom_id                               ")
			.query("      ,a.prom_nm                               ")
			.query("      ,a.to_dt                                 ")
			.query("      ,a.vend_nm                               ")
		;
		data.param // 조건
			.where("  from prom_info a                             ")
			.where("       left outer join dept_mst b  on b.dept_id = a.dept_id  ")
			.where("       left outer join usr_mst c   on c.emp_id = a.emp_id    ")
			.where(" where a.row_clos = 0                          ")
			.where("   and a.row_sts = 0 				           ")
			.where("   and a.prom_gb = '5' 				           ")
			.where("   and a.fr_dt <= dbo.to_char(getdate(), 'yyyymmdd') ")
			.where("   and a.to_dt >= dbo.to_char(getdate(), 'yyyymmdd') ")
//			.where("   and a.hq_id = :hq_id                  ", arg.fixParameter("hq_id"))
			.where("   and a.prom_dt between :fr_dt                ", arg.fixParameter("fr_dt"))
			.where("                     and :to_dt                ", arg.fixParameter("to_dt"))
			.where("   and a.vend_id = :vend_id                    ", arg.getParameter("vend_id"))
			.where(" order by a.prom_id desc                       ")
		;

		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort);
		}
	}

	/**
	 * detail 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {

//		DataMessage data = arg.newStorage("POS");
		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");
		data.param // 쿼리문  입력
			.query("select a.prom_id                   ")
			.query("      ,a.item_idcd                    ")
			.query("      ,i.item_code                    ")
			.query("      ,i.item_name                    ")
			.query("      ,i.item_spec                    ")
			.query("      ,u.unit_name                    ")
			.query("      ,i.unt_qty                   ")
			.query("      ,a.recv_price                ")
			.query("      ,m.bas_nm as mfg_nm          ")
			.query("      ,r.bas_nm as brand_nm        ")
			.query("      ,o.bas_nm as origin_nm       ")
			.query("      ,i.cst_pri                   ")
			.query("  from prom_item a                 ")
			.query("       left outer join itm_mst i   on i.item_idcd = a.item_idcd    ")
			.query("       left outer join item_unit u on u.unit_idcd = i.unit_idcd    ")
			.query("       left outer join base_mst r  on r.bas_id = i.brand_id  ")
			.query("       left outer join base_mst m  on m.bas_id = i.mfg_id    ")
			.query("       left outer join base_mst o  on o.bas_id = i.origin_id ")
			.query(" where a.prom_id = :prom_id         ", arg.fixParameter("prom_id"))
			.query("   and a.row_sts = 0 		  	    ")
		;

		return data.selectForMap();
	}

	/**
	 * 거래처상태 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap getCustSts(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		data.param // 쿼리문  입력
			.query("select cust_sts                          ")
			.query("      ,isnull(cust_nm, ' ')  as cust_nm  ")
			.query("      ,isnull(sts_memo, ' ') as sts_memo ")
			.query("  from cust_mst a                        ")
			.query(" where cust_id = :cust_id  ", arg.fixParameter("cust_id"))
		;

	    return data.selectForMap();
	}

	/**
	 * 신규 문서번호 조회
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public String seqInvoice(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.fixParamText("epodb_id") + ".POS");

		return seqlistener.getInvoice(data.repository, arg.fixParamText("stor_id"));
	}

	/**
	 * 발주 처리
	 *
	 * @param arg
	 * @return
	 * @throws Exception
	 */
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		SqlResultRow srr = map.get(0);
		DataMessage data = new DataMessage(srr.fixParamText("epodb_id") + ".POS");

		// 신규 문서번호 조회
		arg.put("epodb_id", srr.fixParamText("epodb_id"));
		arg.put("stor_id", srr.fixParamText("stor_id"));
		String inv_no = seqInvoice(arg);

		// order_mst
    	data.param
	    	.query("insert into order_mst ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, pos_no, inv_no, inv_dt, inv_tm, inv_nm, ret_yn, ret_no, inv_work_id, inv_work_gb, inv_dept_id, inv_usr_id, salesman_id, sts_cd, pay_dt, ori_no, ori_dt, ori_tm, cust_grp, cust_id, cust_nm, cust_gb, mmb_id, mmb_nm, item_point, item_halin, price_no, tax_type, tax_rt, tax_free, taxation, sply_amt, tax, amount, charge, payable, payment, npay_amt, perpay_yn, qty, org_ord_qty, ship_qty, point_rate_type, cash_point_rate, card_point_rate, add_point, use_point, req_msg, biz_no, biz_nm, biz_type, biz_type, biz_owner, biz_state, biz_city, biz_dong, biz_zip_cd, biz_addr_1, biz_addr_2, biz_email, biz_tel_no, biz_fax_no, reve_nm, reve_state, reve_city, reve_dong, reve_zip_cd, reve_addr_1, reve_addr_2, recv_addr3, reve_email, reve_tel_no, reve_fax_no, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, reve_hp_no, cours_id, sales_gb, tax_recv, rest_qty, converted, prom_id ) ")
	    	.query("select c.corp_id                                                                                                                                ")
	    	.query("      ,c.hq_id                                                                                                                                ")
	    	.query("      ,c.stor_grp                                                                                                                                ")
	    	.query("      ,c.stor_id                                                                                                                                ")
	    	.query("      ,c.stor_id                                                                                                                                ")
	    	.query("      ,:pos_no                                                                                                                                   ", srr.fixParameter("pos_no"))
	    	.query("      ,'" + inv_no + "'                                                                                                                          ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmdd')                                                                                                              ")
	    	.query("      ,dbo.to_char(getdate(), 'hh24mi')                                                                                                                ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,'0'                                                                                                                                       ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,'5'                                                                                                                                       ") // 1:메인/2:포스/3:B2C/4:B2B
	    	.query("      ,'1'                                                                                                                                       ") // 1:주문작업에서 생성/2: 매출에서 자동생성
	    	.query("      ,:inv_dept_id                                                                                                                              ", srr.fixParameter("inv_dept_id"))
	    	.query("      ,:inv_usr_id                                                                                                                              ", srr.fixParameter("inv_usr_id"))
	    	.query("      ,:inv_usr_id                                                                                                                              ", srr.fixParameter("inv_usr_id"))
	    	.query("      ,'0010'                                                                                                                                    ") // 0010:승인대기/0200:배송대기/0300:포장처리/0400:부분배송/0500:배송처리
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmdd')                                                                                                              ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmdd')                                                                                                              ")
	    	.query("      ,dbo.to_char(getdate(), 'hh24mi')                                                                                                                ")
	    	.query("      ,c.cust_grp                                                                                                                                 ")
	    	.query("      ,c.cust_id                                                                                                                                 ")
	    	.query("      ,c.cust_nm                                                                                                                                 ")
	    	.query("      ,c.cust_gb                                                                                                                                 ")
	    	.query("      ,c.mmb_id                                                                                                                                 ")
	    	.query("      ,c.mmb_nm                                                                                                                                 ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,b.item_halin                                                                                                                              ")
	    	.query("      ,c.price_no                                                                                                                                ")
	    	.query("      ,'0'                                                                                                                                       ") // 0:부가세포함/1:부가세별도
	    	.query("      ,:tax_rt                                                                                                                                 ", srr.fixParameter("tax_rt"))
	    	.query("      ,b.tax_free                                                                                                                                ")
	    	.query("      ,b.taxation                                                                                                                                ")
	    	.query("      ,b.sply_amt                                                                                                                                ")
	    	.query("      ,b.tax                                                                                                                                     ")
	    	.query("      ,b.sply_amt+b.tax+b.tax_free                                                                                                               ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,b.sply_amt+b.tax+0                                                                                                                        ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,c.npay_amt                                                                                                                                 ")
	    	.query("      ,'0'                                                                                                                                       ")
	    	.query("      ,b.qty                                                                                                                                     ")
	    	.query("      ,b.qty                                                                                                                                     ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,'0'                                                                                                                                       ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,c.biz_no                                                                                                                                  ")
	    	.query("      ,c.biz_nm                                                                                                                                  ")
	    	.query("      ,c.biz_type                                                                                                                                ")
	    	.query("      ,c.biz_type                                                                                                                               ")
	    	.query("      ,c.biz_owner                                                                                                                               ")
	    	.query("      ,c.biz_state                                                                                                                               ")
	    	.query("      ,c.biz_city                                                                                                                                ")
	    	.query("      ,c.biz_dong                                                                                                                                ")
	    	.query("      ,c.biz_zip_cd                                                                                                                              ")
	    	.query("      ,c.biz_addr_1                                                                                                                               ")
	    	.query("      ,c.biz_addr_2                                                                                                                               ")
	    	.query("      ,c.biz_email                                                                                                                               ")
	    	.query("      ,c.biz_tel_no                                                                                                                              ")
	    	.query("      ,c.biz_fax_no                                                                                                                              ")
	    	.query("      ,isnull(c.mmb_nm, c.biz_owner)                                                                                                               ")
	    	.query("      ,c.biz_state                                                                                                                               ")
	    	.query("      ,c.biz_city                                                                                                                                ")
	    	.query("      ,c.biz_dong                                                                                                                                ")
	    	.query("      ,c.biz_zip_cd                                                                                                                              ")
	    	.query("      ,c.biz_addr_1                                                                                                                               ")
	    	.query("      ,c.biz_addr_2                                                                                                                               ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,c.biz_email                                                                                                                               ")
	    	.query("      ,c.biz_tel_no                                                                                                                              ")
	    	.query("      ,c.biz_fax_no                                                                                                                              ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,0                                                                                                                                         ")
	    	.query("      ,:upt_nm                                                                                                                                ", srr.fixParameter("upt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                                                               ")
	    	.query("      ,dboto_char(getdate(), 'yyyymmddhh24miss')                                                                                                      ")
	    	.query("      ,:crt_nm                                                                                                                                ", srr.fixParameter("crt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                                                               ")
	    	.query("      ,dbo.to_char(getdate(), 'yyyymmddhh24miss')                                                                                                      ")
	    	.query("      ,c.hp_no                                                                                                                                  ")
	    	.query("      ,c.cours_id                                                                                                                               ")
	    	.query("      ,c.sales_gb                                                                                                                                ")
	    	.query("      ,'0'                                                                                                                                       ") // 0:부가세포함/1:부가세별도
	    	.query("      ,b.qty                                                                                                                                     ")
	    	.query("      ,null                                                                                                                                      ")
	    	.query("      ,a.prom_id                                                                                                                                 ")
	    	.query("  from prom_info a                                                                                                                               ")
	    	.query("       join (                                                                                                                                    ")
	    	.query("            select prom_id                                                                                                                       ")
	    	.query("                  ,sum(qty)                                                                          as qty                                      ")
	    	.query("                  ,sum((unit_price-price)*qty)                                                       as item_halin                               ")
	    	.query("                  ,sum(case when notax_yn = '0' then 0 else price*stor_qty end)                      as tax_free                                 ")
	    	.query("                  ,sum(case when notax_yn = '0' then price*qty else 0 end)                           as taxation                                 ")
	    	.query("                  ,sum(case when notax_yn = '0' then round((price*qty)/(:tax_rt/100+1)) else 0 end )) as sply_amt          ", srr.fixParameter("tax_rt"))
	    	.query("                  ,sum(case when b.notax_yn = '0' then (price*qty)-round((price*qty)/(:tax_rt/100+1)) else 0 end )) as tax ", srr.fixParameter("tax_rt"))
	    	.query("              from (                                                                                                                             ")
	    ;

    	int idx = 0;
		for (SqlResultRow row:map) {
			if(idx++ > 0) {
		    	data.param
		    	.query("                   union all                                                                                                                     ")
		    	;
			}

	    	data.param
	    	.query("                   select a.prom_id                                                                                                              ")
	    	.query("                         ,a.prom_price                                                       as price                                            ")
	    	.query("                         ," + row.getParamText("qty") + "                                    as qty                                              ")
	    	.query("                         ,case when s.stad_sale_pri = 0 then i.stad_sale_pri else s.stad_sale_pri end as unit_price                                       ")
	    	.query("                         ,i.notax_yn                                                         as notax_yn                                         ")
	    	.query("                     from prom_item a                                                                                                            ")
	    	.query("                          left outer join itm_stor s                                                                                           ")
	    	.query("                            on s.stor_id = '" + row.getParamText("stor_id") + "'                                                               ")
	    	.query("                           and s.item_idcd = a.item_idcd                                                                                             ")
	    	.query("                          left outer join itm_mst i                                                                                            ")
	    	.query("                            on i.item_idcd = s.item_idcd                                                                                             ")
	    	.query("                    where a.prom_id = '" + row.getParamText("prom_id") + "'                                                                      ")
	    	.query("                      and a.item_idcd = '" + row.getParamText("item_idcd") + "'                                                                      ")
	    	;
		}

    	data.param
	    	.query("                   )                                                                                                                             ")
	    	.query("             group by prom_id                                                                                                                    ")
	    	.query("            ) b                                                                                                                                  ")
	    	.query("         on a.prom_id = b.prom_id                                                                                                                ")
	    	.query("       cross join (                                                                                                                              ")
	    	.query("                  select x.corp_id                                                                                                              ")
	    	.query("                        , x.hq_id                                                                                                             ")
	    	.query("                        , x.stor_grp                                                                                                             ")
	    	.query("                        , x.stor_id                                                                                                             ")
	    	.query("                        , x.stor_nm                                                                                                             ")
	    	.query("                        , x.cours_id                                                                                                            ")
	    	.query("                        , x.cours_nm                                                                                                            ")
	    	.query("                        , b.cust_gb  , a.cust_id , b.cust_cd , b.cust_nm  , b.cust_grp                                                             ")
	    	.query("                        , c.mmb_id     , c.mmb_nm     ,  c.memb_gb     , c.login_id  , a.sales_gb                                               ")
	    	.query("                        , b.biz_no      , b.biz_nm      ,  b.biz_tel_no  , b.biz_fax_no   , b.biz_email                                           ")
	    	.query("                        , b.biz_type    , b.biz_type   ,  b.biz_owner   , b.biz_tax_gb   , b.biz_gb                                              ")
	    	.query("                        , b.biz_zip_cd  , b.biz_state   ,  b.biz_city    , b.biz_dong     , b.biz_addr_1 , b.biz_addr_2                             ")
	    	.query("                        , b.colt_schd_type , b.colt_schd_term                                                                                           ")
	    	.query("                        , a.salesman_id , (select emp_nm from usr_mst where stor_grp = a.stor_grp and emp_id = a.salesman_id ) as salesman_nm ")
	    	.query("                        , a.clss_1 , (select bas_nm from base_mst where bas_id = a.clss_1 ) as cls1_nm                                       ")
	    	.query("                        , a.clss_2 , (select bas_nm from base_mst where bas_id = a.clss_2 ) as cls2_nm                                       ")
	    	.query("                        , a.clss_3 , (select bas_nm from base_mst where bas_id = a.clss_3 ) as cls3_nm                                       ")
	    	.query("                        , a.clss_4 , (select bas_nm from base_mst where bas_id = a.clss_4 ) as cls4_nm                                       ")
	    	.query("                        , a.clss_5 , (select bas_nm from base_mst where bas_id = a.clss_5 ) as cls5_nm                                       ")
	    	.query("                        , a.clss_6 , (select bas_nm from base_mst where bas_id = a.clss_6 ) as cls6_nm                                       ")
	    	.query("                        , c.tel_no       , c.hp_no       , c.email                                                                               ")
	    	.query("                        , a.npay_amt      , a.balance_limit  ,  a.limit_control                                                                    ")
	    	.query("                        , case when a.price_no = 0 then b.price_no else a.price_no end as price_no                                                ")
	    	.query("                        , a.user_memo   , a.row_sts                                                                                             ")
	    	.query("                    from (                                                                                                                       ")
	    	.query("                         select d.corp_id    as corp_id                                                                                        ")
	    	.query("                               ,d.hq_id    as hq_id                                                                                        ")
	    	.query("                               ,d.stor_grp    as stor_grp                                                                                        ")
	    	.query("                               ,d.stor_id    as stor_id                                                                                        ")
	    	.query("                               ,d.stor_nm    as stor_nm                                                                                        ")
	    	.query("                               ,c.cust_id     as cust_id                                                                                         ")
	    	.query("                               ,b.cours_id                                                                                                      ")
	    	.query("                               ,b.cours_nm                                                                                                      ")
	    	.query("                           from epo_course a                                                                                                     ")
	    	.query("                                join epo_course b  on b.cours_id = a.prnt_id                                                                  ")
	    	.query("                                join stor c       on c.stor_id  = a.stor_id                                                                   ")
	    	.query("                                join stor d       on d.stor_id  = b.stor_id                                                                   ")
	    	.query("                                join cust_mst i   on i.owner_id  = d.stor_id and i.cust_id = c.cust_id                                         ")
	    	.query("                          where a.stor_id = :stor_id                                                                                           ", srr.fixParameter("login_stor_id"))
	    	.query("                            and a.row_lvl = 2                                                                                                  ")
	    	.query("                            and b.row_lvl = 1                                                                                                  ")
	    	.query("                         ) x                                                                                                                     ")
	    	.query("                         join cust_stor a                                                                                                       ")
	    	.query("                  		    on  a.cust_id   = x.cust_id                                                                                          ")
	    	.query("                  		    and a.stor_id  = x.stor_id                                                                                         ")
	    	.query("                  		    and a.row_sts = 0                                                                                                  ")
	    	.query("                         join cust_mst  b                                                                                                       ")
	    	.query("                              on  b.cust_id    = x.cust_id                                                                                       ")
	    	.query("                              and b.cust_sts  = '1'                                                                                              ")
	    	.query("                              and b.row_sts =  0                                                                                               ")
	    	.query("                         join cust_memb  c on c.cust_id = x.cust_id                                                                              ")
	    	.query("                   where rownum = 1                                                                                                              ")
	    	.query("                  ) c                                                                                                                            ")
	    	.query(" where a.prom_id = :prom_id                                                                                                                      ", srr.fixParameter("prom_id"))
	    ;
    	data.attach(Action.direct);

		// order_pack
    	data.param
	    	.query("insert into order_pack ( corp_id, hq_id, stor_grp, stor_id, wrhs_id, inv_no, inv_dt, sts_cd, pack_no, pack_gb, pack_seq, pack_vend_id, pack_zone_id, sales_id, tax_free, taxation, sply_amt, tax, amount, qty, ship_qty, user_memo, sys_memo, row_clos, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, org_ord_qty, inv_gb, rest_qty, converted ) ")
	    	.query("select c.corp_id                                                                                   ")
	    	.query("      ,c.hq_id                                                                                   ")
	    	.query("      ,c.stor_grp                                                                                   ")
	    	.query("      ,c.stor_id                                                                                   ")
	    	.query("      ,c.stor_id                                                                                   ")
	    	.query("      ,'" + inv_no + "'                                                                             ")
	    	.query("      ,convert(cahr(10),getdate(),112)                                                              ")
	    	.query("      ,'0010'                                                                                       ") // 0010:승인대기/0200:배송대기/0300:포장처리/0400:부분배송/0500:배송처리
	    	.query("      ,'" + inv_no + "' + to_char(rownum)                                                           ")
	    	.query("      ,b.pack_gb                                                                                    ")
	    	.query("      ,rownum                                                                                       ")
	    	.query("      ,b.pack_vend_id                                                                               ")
	    	.query("      ,b.pack_zone_id                                                                               ")
	    	.query("      ,b.sales_id                                                                                   ")
	    	.query("      ,b.tax_free                                                                                   ")
	    	.query("      ,b.taxation                                                                                   ")
	    	.query("      ,b.sply_amt                                                                                   ")
	    	.query("      ,b.tax                                                                                        ")
	    	.query("      ,b.sply_amt+b.tax+b.tax_free                                                                  ")
	    	.query("      ,b.qty                                                                                        ")
	    	.query("      ,0                                                                                            ")
	    	.query("      ,null                                                                                         ")
	    	.query("      ,null                                                                                         ")
	    	.query("      ,0                                                                                            ")
	    	.query("      ,0                                                                                            ")
	    	.query("      ,0                                                                                            ")
	    	.query("      ,:upt_nm                                                                                   ", srr.fixParameter("upt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                  ")
	    	.query("      ,dbo.today_char()                                                                             ")
	    	.query("      ,:crt_nm                                                                                   ", srr.fixParameter("crt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                  ")
	    	.query("      ,dbo.today_char() 					                                                        ")
	    	.query("      ,b.qty                                                                                        ")
	    	.query("      ,'1'                                                                                          ") // 1:주문/2:발주
	    	.query("      ,b.qty                                                                                        ")
	    	.query("      ,null                                                                                         ")
	    	.query("  from prom_info a                                                                                  ")
	    	.query("       join (                                                                                       ")
	    	.query("            select prom_id                                                                          ")
	    	.query("                  ,sum(qty)                                                             as qty      ")
	    	.query("                  ,sum(case when notax_yn = '0' then 0 else price*stor_qty end )        as tax_free ")
	    	.query("                  ,sum(case when notax_yn = '0' then price*qty else 0 end )             as taxation ")
	    	.query("                  ,sum(case when notax_yn = '0' then round((price*qty)/(:tax_rt/100+1)) else 0)  as sply_amt ", srr.fixParameter("tax_rt"))
	    	.query("                  ,sum(case when b.notax_yn ='0' then (price*qty)-round((price*qty)/(:tax_rt/100+1)) else 0 end ) as tax      ", srr.fixParameter("tax_rt"))
	    	.query("                  ,max(sales_id)                                       as sales_id                  ")
	    	.query("                  ,vend_id                                             as pack_vend_id              ")
	    	.query("                  ,pack_zone_id                                        as pack_zone_id              ")
	    	.query("                  ,max(pack_gb)                                        as pack_gb                   ")
	    	.query("              from (                                                                                ")
	    ;

    	idx = 0;
		for (SqlResultRow row:map) {
			if(idx++ > 0) {
		    	data.param
		    	.query("                   union all                                                                        ")
		    	;
			}

	    	data.param
	    	.query("                   select a.prom_id                                                                 ")
	    	.query("                         ,a.prom_price                    as price                                  ")
	    	.query("                         ," + row.getParamText("qty") + " as qty                                    ")
	    	.query("                         ,i.sales_id                                                                ")
	    	.query("                         ,s.vend_id                                                                 ")
	    	.query("                         ,s.pack_zone_id                                                            ")
	    	.query("                         ,s.pack_gb                                                                 ")
	    	.query("                         ,i.notax_yn                                                                ")
	    	.query("                     from prom_item a                                                               ")
	    	.query("                          left outer join itm_stor s                                              ")
	    	.query("                            on s.stor_id = '" + row.getParamText("stor_id") + "'                  ")
	    	.query("                           and s.item_idcd = a.item_idcd                                                ")
	    	.query("                          left outer join itm_mst i                                               ")
	    	.query("                            on i.item_idcd = s.item_idcd                                                ")
	    	.query("                    where a.prom_id = '" + row.getParamText("prom_id") + "'                         ")
	    	.query("                      and a.item_idcd = '" + row.getParamText("item_idcd") + "'                         ")
	    	;
		}

    	data.param
	    	.query("                   )                                                                                ")
	    	.query("             group by prom_id, case when :sales_gb ='1' then sales_id else '' end  ", srr.fixParameter("sales_gb"))
	    	.query("                   , vend_id, pack_zone_id          												")
	    	.query("            ) b                                                                                     ")
	    	.query("         on a.prom_id = b.prom_id                                                                   ")
	    	.query("       join order_mst c                                                                            ")
	    	.query("         on c.prom_id = a.prom_id                                                                   ")
	    	.query(" where a.prom_id = :prom_id                                                                         ", srr.fixParameter("prom_id"))
	    	.query("   and c.inv_no = '" + inv_no + "'                                                                  ")
	    ;
    	data.attach(Action.direct);

		// order_item
    	data.param
	    	.query("insert into order_item ( hq_id, stor_grp, stor_id, wrhs_id, inv_no, line_seqn, seq_top, seq_dsp, ret_yn, ret_no, ret_seq, ori_no, ori_seq, pack_no, pack_gb, pack_vend_id, pack_zone_id, mst_itm_id, mst_itm_cd, unit_idcd, unt_qty, item_idcd, item_code, item_name, item_spec, sales_id, notax_yn, cust_price, cust_halin, unit_price, unit_point, point_rate, item_point, item_halin, price, qty, org_ord_qty, ship_qty, tax_free, taxation, sply_amt, tax, amount, po_pri, po_pri_type, po_pri_rt, user_memo, sys_memo, row_ord, row_sts, upt_nm, upt_ip, upt_dttm, crt_nm, crt_ip, crt_dttm, rest_qty, converted ) ")
	    	.query("select c.hq_id                                                                                          ")
	    	.query("      ,c.stor_grp                                                                                          ")
	    	.query("      ,c.stor_id                                                                                          ")
	    	.query("      ,c.stor_id                                                                                          ")
	    	.query("      ,'" + inv_no + "'                                                                                    ")
	    	.query("      ,rownum                                                                                              ")
	    	.query("      ,rownum                                                                                              ")
	    	.query("      ,rownum                                                                                              ")
	    	.query("      ,'0'                                                                                                 ")
	    	.query("      ,null                                                                                                ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,null                                                                                                ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,d.pack_no                                                                                           ")
	    	.query("      ,b.pack_gb                                                                                           ")
	    	.query("      ,b.pack_vend_id                                                                                      ")
	    	.query("      ,b.pack_zone_id                                                                                      ")
	    	.query("      ,b.mst_itm_id                                                                                           ")
	    	.query("      ,b.mst_itm_cd                                                                                           ")
	    	.query("      ,b.unit_idcd                                                                                           ")
	    	.query("      ,b.unt_qty                                                                                          ")
	    	.query("      ,b.item_idcd                                                                                           ")
	    	.query("      ,b.item_code                                                                                           ")
	    	.query("      ,b.item_name                                                                                           ")
	    	.query("      ,b.item_spec                                                                                           ")
	    	.query("      ,b.sales_id                                                                                          ")
	    	.query("      ,b.notax_yn                                                                                          ")
	    	.query("      ,b.cust_price                                                                                        ")
	    	.query("      ,b.cust_halin                                                                                        ")
	    	.query("      ,b.unit_price                                                                                        ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,b.item_halin                                                                                        ")
	    	.query("      ,b.price                                                                                             ")
	    	.query("      ,b.qty                                                                                               ")
	    	.query("      ,b.qty                                                                                               ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,b.tax_free                                                                                          ")
	    	.query("      ,b.taxation                                                                                          ")
	    	.query("      ,b.sply_amt                                                                                          ")
	    	.query("      ,b.tax                                                                                               ")
	    	.query("      ,b.sply_amt+b.tax+b.tax_free                                                                         ")
	    	.query("      ,b.po_pri                                                                                          ")
	    	.query("      ,b.po_pri_type                                                                                     ")
	    	.query("      ,b.po_pri_rt                                                                                     ")
	    	.query("      ,null                                                                                                ")
	    	.query("      ,null                                                                                                ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,0                                                                                                   ")
	    	.query("      ,:upt_nm                                                                                          ", srr.fixParameter("upt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                         ")
	    	.query("      ,dbo.today_char()                                                                                    ")
	    	.query("      ,:crt_nm                                                                                          ", srr.fixParameter("crt_nm"))
	    	.query("      ,'" + arg.remoteAddress + "'                                                                         ")
	    	.query("      ,dbo.today_char()                                                                                    ")
	    	.query("      ,b.qty                                                                                               ")
	    	.query("      ,null                                                                                                ")
	    	.query("  from prom_info a                                                                                         ")
	    	.query("       join (                                                                                              ")
	    	.query("            select prom_id                                                                                 ")
	    	.query("                  ,qty                                                                                     ")
	    	.query("                  ,case when notax_yn = '0' then  0 else  price*stor_qty end                   as tax_free ")
	    	.query("                  ,case when notax_yn = '0' then  price*qty else 0 end                         as taxation ")
	    	.query("                  ,case when notax_yn = '0' then  round((price*qty)/(:tax_rt/100+1)) else  0 end as sply_amt ", srr.fixParameter("tax_rt"))
	    	.query("                  ,case when b.notax_yn= '0' then (price*qty)-round((price*qty)/(:tax_rt/100+1)) else 0 end as tax     ", srr.fixParameter("tax_rt"))
	    	.query("                  ,sales_id                                       as sales_id                              ")
	    	.query("                  ,vend_id                                        as pack_vend_id                          ")
	    	.query("                  ,pack_zone_id                                   as pack_zone_id                          ")
	    	.query("                  ,pack_gb                                        as pack_gb                               ")
	    	.query("                  ,mst_itm_id                                                                                 ")
	    	.query("                  ,mst_itm_cd                                                                                 ")
	    	.query("                  ,unit_idcd                                                                                 ")
	    	.query("                  ,unt_qty                                                                                ")
	    	.query("                  ,item_idcd                                                                                 ")
	    	.query("                  ,item_code                                                                                 ")
	    	.query("                  ,brand_nm + '/' + item_name as item_name                                                       ")
	    	.query("                  ,item_spec                                                                                 ")
	    	.query("                  ,notax_yn                                                                                ")
	    	.query("                  ,cust_price                                                                              ")
	    	.query("                  ,(cust_price-price)*qty as cust_halin                                                    ")
	    	.query("                  ,unit_price                                                                              ")
	    	.query("                  ,(unit_price-price)*qty as item_halin                                                    ")
	    	.query("                  ,price                                                                                   ")
	    	.query("                  ,case when po_pri_type = '1' then po_pri else price*po_pri_rt/100 end  as po_pri ")
	    	.query("                  ,po_pri_type                                                                           ")
	    	.query("                  ,po_pri_rt                                                                           ")
	    	.query("              from (                                                                                       ")
	    ;

    	idx = 0;
		for (SqlResultRow row:map) {
			if(idx++ > 0) {
		    	data.param
		    	.query("                   union all                                                                               ")
		    	;
			}

	    	data.param
	    	.query("                   select a.prom_id                                                                        ")
	    	.query("                         ,a.prom_price                    as price                                         ")
	    	.query("                         ," + row.getParamText("qty") + " as qty                                           ")
	    	.query("                         ,i.sales_id                                                                       ")
	    	.query("                         ,s.vend_id                                                                        ")
	    	.query("                         ,s.pack_zone_id                                                                   ")
	    	.query("                         ,s.pack_gb                                                                        ")
	    	.query("                         ,i.mst_itm_id                                                                        ")
	    	.query("                         ,i.mst_itm_cd                                                                        ")
	    	.query("                         ,i.unit_idcd                                                                        ")
	    	.query("                         ,i.unt_qty                                                                       ")
	    	.query("                         ,a.item_idcd                                                                        ")
	    	.query("                         ,i.item_code                                                                        ")
	    	.query("                         ,i.item_name                                                                        ")
	    	.query("                         ,(select bas_nm from base_mst where bas_id = i.brand_id) as brand_nm           ")
	    	.query("                         ,i.item_spec                                                                        ")
	    	.query("                         ,i.notax_yn                                                                       ")
	    	.query("                         ,a.cust_price                                                                     ")
	    	.query("                         ,case when s.stad_sale_pri = 0 then i.stad_sale_pri else s.stad_sale_pri end as unit_price ")
	    	.query("                         ,a.recv_price as po_pri                                                         ")
	    	.query("                         ,case when s.po_pri_type = '0' then i.po_pri_type else s.po_pri_type end  as po_pri_type  ")
	    	.query("                         ,case when s.po_pri_rt =  0  then i.po_pri_rt else s.po_pri_rt end  as po_pri_rt  ")
	    	.query("                     from prom_item a                                                                      ")
	    	.query("                          left outer join itm_stor s                                                     ")
	    	.query("                            on s.stor_id = '" + row.getParamText("stor_id") + "'                         ")
	    	.query("                           and s.item_idcd = a.item_idcd                                                       ")
	    	.query("                          left outer join itm_mst i                                                      ")
	    	.query("                            on i.item_idcd = s.item_idcd                                                       ")
	    	.query("                    where a.prom_id = '" + row.getParamText("prom_id") + "'                                ")
	    	.query("                      and a.item_idcd = '" + row.getParamText("item_idcd") + "'                                ")
	    	;
		}

    	data.param
	    	.query("                   )                                                                                       ")
	    	.query("            ) b                                                                                            ")
	    	.query("         on a.prom_id = b.prom_id                                                                          ")
	    	.query("       join order_mst c             on c.prom_id = a.prom_id                                              ")
	    	.query("       left outer join order_pack d  on d.inv_no = c.inv_no                                                ")
	    	.query("        and isnull(d.sales_id, ' ') = isnull(b.sales_id, ' ')                                              ")
	    	.query("        and isnull(d.pack_vend_id, ' ') = isnull(b.pack_vend_id, ' ')                                      ")
	    	.query("        and isnull(d.pack_zone_id, ' ') = isnull(b.pack_zone_id, ' ')                                      ")
	    	.query(" where a.prom_id = :prom_id                                                                                ", srr.fixParameter("prom_id"))
	    	.query("   and c.inv_no = '" + inv_no + "'                                                                         ")
	    ;
    	data.attach(Action.direct);

		data.execute();
		return null;
	}
}
