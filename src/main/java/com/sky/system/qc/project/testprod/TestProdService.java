package com.sky.system.qc.project.testprod;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

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
public class TestProdService  extends DefaultServiceHandler {
	@Autowired
	private SeqListenerService sequance;

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.pjod_idcd        , a.line_seqn         , a.regi_date       , a.wkct_idcd		")
			.where("        , a.cvic_idcd        , a.strt_date         , a.sttm            , a.endd_date		")
			.where("        , a.edtm             , a.indn_qntt         , a.poor_qntt       , a.pass_qntt		")
			.where("        , a.drtr_idcd																		")
			.where("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.where("        , a.line_ordr        , a.line_stat         , a.line_clos       , a.find_name		")
			.where("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.where("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.where("        , a.crte_idcd        , a.crte_urif													")
			.where("        , c.cvic_name        , w.wkct_name         , u.user_name as drtr_name				")
			.where("        , substring(a.sttm,1,8) as sttm1           , substring(a.sttm, 9,4) as sttm2		")
			.where("        , substring(a.edtm,1,8) as edtm1           , substring(a.edtm, 9,4) as edtm2		")
			.where("        , p.item_name																		")
			.where("from pjod_test_ordr a																		")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("left outer join pjod_mast p on a.pjod_idcd = p.pjod_idcd									")
			.where("where  1=1																					")
			.where("and     p.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.regi_date >= :regi_date1     " , arg.getParamText("regi_date1" ))
			.where("and     a.regi_date <= :regi_date2     " , arg.getParamText("regi_date2" ))
			.where("and     p.cstm_idcd  = :cstm_idcd      " , arg.getParamText("cstm_idcd"  ))
			.where("and     a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and     a.line_stat   < :line_stat     " , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.pjod_idcd																		")
			.where(") a																							")
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
			.query("select    a.pjod_idcd        , a.line_seqn         , a.regi_date       , a.wkct_idcd		")
			.query("        , a.cvic_idcd        , a.prod_qntt         , a.poor_qntt       , a.pass_qntt		")
			.query("        , a.loss_rate        , a.drtr_idcd         , a.sttm            , a.edtm				")
			.query("        , a.user_memo        , a.sysm_memo         , a.prnt_idcd       , a.line_levl		")
			.query("        , a.line_ordr        , a.line_stat         , a.line_clos       , a.find_name		")
			.query("        , a.updt_user_name   , a.updt_ipad         , a.updt_dttm       , a.updt_idcd		")
			.query("        , a.updt_urif        , a.crte_user_name    , a.crte_ipad       , a.crte_dttm		")
			.query("        , a.crte_idcd        , a.crte_urif         , a.orig_seqn							")
			.query("        , c.cvic_name        , w.wkct_name         , u.user_name as drtr_name				")
			.query("        , substring(a.sttm,1,8) as sttm1           , substring(a.sttm, 9,4) as sttm2		")
			.query("        , substring(a.edtm,1,8) as edtm1           , substring(a.edtm, 9,4) as edtm2		")
		;
		data.param
			.where("from pjod_test_prod a																		")
			.where("left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd									")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd									")
			.where("left outer join user_mast u on a.drtr_idcd = u.user_idcd									")
			.where("where  1=1																					")
			.where("and    a.pjod_idcd	=:pjod_idcd		" , arg.getParamText("pjod_idcd"))
			.where("and    a.orig_seqn	=:orig_seqn		" , arg.getParamText("orig_seqn"))
			.where("and    a.line_stat   < :line_stat	" , "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select count(*) as line_seqn																")
		;
		data.param
			.where("from		pjod_test_prod a   																")
			.where("where		1=1																				")
			.where("and			a.pjod_idcd = :pjod_idcd		" , arg.getParameter("pjod_idcd"				))
			.where("and			a.line_stat = 0																	")
		;
		return data.selectForMap();
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			String sttm = (String) row.getParameter("sttm1")+row.getParameter("sttm2");
			String edtm = (String) row.getParameter("edtm1")+row.getParameter("edtm2");

			if (rowaction == Action.delete) {
				data.param
					.table("pjod_test_prod")
					.where("where pjod_idcd  = :pjod_idcd						")
					.where("and   line_seqn  = :line_seqn						")

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))

					.update("line_stat"			, "2"							)
				;data.attach(Action.update);
			} else {
				data.param
					.table("pjod_test_prod")
					.where("where pjod_idcd = :pjod_idcd"	)
					.where("and   line_seqn = :line_seqn"	)

					.unique("pjod_idcd"			, row.fixParameter("pjod_idcd"	))
					.unique("line_seqn"			, row.fixParameter("line_seqn"	))

					.update("orig_seqn"			, row.getParameter("orig_seqn"	))
					.update("regi_date"			, row.getParameter("regi_date"	))
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"	))
					.update("cvic_idcd"			, row.getParameter("cvic_idcd"	))
					.update("prod_qntt"			, row.getParameter("prod_qntt"	))
					.update("poor_qntt"			, row.getParameter("poor_qntt"	))
					.update("pass_qntt"			, row.getParameter("pass_qntt"	))
					.update("loss_rate"			, row.getParameter("loss_rate"	))
					.update("drtr_idcd"			, row.getParameter("drtr_idcd"	))
					.update("sttm"				, sttm							)
					.update("edtm"				, edtm							)
					.update("user_memo"			, row.getParameter("user_memo"	))
					.update("find_name"			, row.getParamText("pjod_idcd"	))

					.insert("line_levl"			, row.getParameter("line_levl"))
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
}
