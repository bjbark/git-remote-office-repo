package com.sky.system.prod.order.prodnotlist;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;


@Service
public class ProdNotListService extends DefaultServiceHandler {

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select  a.invc_numb       , a.line_seqn       , p.pdod_date       , b.work_strt_dttm	")
			.query("      , b.work_endd_dttm  , w.wkct_name       , cs.cstm_name      , cv.cvic_name		")
			.query("      , i.item_name       , i.item_spec       , c.poor_qntt       , a.indn_qntt			")
			.query("      , b.prod_qntt       , ba.base_name   as  poor_caus_bacd	 						")
		;
		data.param
			.where("from pror_item a ")
			.where("left outer join pror_mast p    on a.invc_numb  = p.invc_numb								")
			.where("left outer join work_book b    on a.invc_numb  = b.wkod_numb and a.line_seqn = b.wkod_seqn	")
			.where("left outer join work_book_qc c on b.invc_numb  = c.invc_numb								")
			.where("left outer join wkct_mast w    on a.wkct_idcd  = w.wkct_idcd								")
			.where("left outer join cstm_mast cs   on cs.cstm_idcd = a.cstm_idcd								")
			.where("left outer join cvic_mast cv   on cv.cvic_idcd = a.cvic_idcd								")
			.where("left outer join item_mast i    on a.item_idcd  = i.item_idcd								")
			.where("left outer join ( select * from base_mast where prnt_idcd = '6001'							")
			.where(") ba on c.poor_bacd = ba.base_code															")
			.where("where 1=1																					")
			.where("and     ifnull(c.poor_qntt,0) > 0															")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"))
			.where("and     p.pdod_date >= :pdod_date1     " , arg.getParamText("pdod_date1" ))
			.where("and     p.pdod_date <= :pdod_date2     " , arg.getParamText("pdod_date2" ))
			.where("and     substring(b.work_strt_dttm,1,8) >= :work_strt_dttm1   " , arg.getParamText("work_strt_dttm1" ))
			.where("and     substring(b.work_strt_dttm,1,8) <= :work_strt_dttm2   " , arg.getParamText("work_strt_dttm2" ))
			.where("and     substring(b.work_endd_dttm,1,8) >= :work_endd_dttm1   " , arg.getParamText("work_endd_dttm1" ))
			.where("and     substring(b.work_endd_dttm,1,8) <= :work_endd_dttm2   " , arg.getParamText("work_endd_dttm2" ))
			.where("and     a.line_stat   = :line_stat     " , arg.getParamText("line_stat"  ))
			.where("and     a.cstm_idcd   = :cstm_idcd     " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.invc_numb																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
