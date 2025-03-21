package com.sky.system.custom.komec.stock.isos.movemast;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.listener.SeqListenerService;


@Service("komec.MoveMastService")
public class MoveMastService extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequence ;

	public SqlResultMap getSearch(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select   a.lott_numb        , a.stok_type_dvcd   , a.bzpl_idcd				")
			.query("       , a.wrhs_idcd        , a.item_idcd        , a.stok_qntt        		")
			.query("       , i.item_code        , i.item_name        , w.wrhs_name 				")
		;
		data.param
			.where("from lot_isos_sum a															")
			.where("left outer join item_mast i on a.item_idcd = i.item_idcd					")
			.where("left outer join wrhs_mast w on a.wrhs_idcd = w.wrhs_idcd					")
			.where("where a.lott_numb = :lott_numb",arg.fixParameter("lott_numb"))
			.where("and   a.stok_qntt > 0														")
		;

		return data.selectForMap();
	}

	public SqlResultMap setRecords(HttpRequestArgument arg) throws Exception {
		String hq = arg.getParamText("hqof_idcd") ;
		DataMessage data = arg.newStorage("POS");
		if(!hq.equals("")){
			data = new DataMessage(hq+".POS");
		}
		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);
		for(SqlResultRow row : map){
				data.param
					.query("call fn_seq_gen_v2(									")
					.where("	  :stor  ",arg.fixParameter("hqof_idcd")+"1000")
					.where("	, :table ","move_mast")
					.where("	, 'not defined'									")
					.where(")													")
				;
				SqlResultRow temp = data.selectForRow();
				data.clear();

				String new_invc_numb = temp.fixParamText("seq");
				int line_seqn = 1;


				data.param
					.table("move_mast")

					.where("where invc_numb = :invc_numb")

					.unique("invc_numb" , new_invc_numb)

					.update("istt_bzpl_idcd", row.fixParameter("bzpl_idcd"))
					.update("istt_wrhs_idcd", row.fixParameter("wrhs_idcd"))
					.update("ostt_bzpl_idcd", row.fixParameter("bzpl_idcd"))
					.update("ostt_wrhs_idcd", row.fixParameter("wrhs_idcd"))
					.update("invc_date", new SimpleDateFormat("yyyyMMdd").format(new Date()))
					.update("updt_idcd", row.getParameter("crte_idcd"))
					.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_idcd", row.getParameter("crte_idcd"))
					.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.modify);


				data.param
					.table("move_item")

					.where("where invc_numb = :invc_numb")
					.where("and   line_seqn = :line_seqn")

					.unique("invc_numb",new_invc_numb)
					.unique("line_seqn",line_seqn)

					.update("item_idcd", row.fixParameter("item_idcd"))
					.update("move_qntt", row.fixParameter("move_qntt"))
					.update("move_dvcd", "1000")
					.update("lott_numb", row.fixParameter("lott_numb"))

					.update("updt_idcd", row.getParameter("crte_idcd"))
					.update("updt_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
					.insert("crte_idcd", row.getParameter("crte_idcd"))
					.insert("crte_dttm", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()))
				;
				data.attach(Action.insert);
				data.execute();
				data.clear();

				sequence.setBook(arg, new_invc_numb, line_seqn, "이동입고");
				sequence.setBook(arg, new_invc_numb, line_seqn, "이동출고");
		}


		return null;

	}
}
