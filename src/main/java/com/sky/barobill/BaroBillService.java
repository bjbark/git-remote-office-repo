package com.sky.barobill;

import net.sky.http.dispatch.service.HostPropertiesService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baroservice.api.barobill.Tests;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;


@Service
public class BaroBillService {
	@Autowired
	private HostPropertiesService property;

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	static final String CERTKEY = "1A32DB52-12B8-462E-9B91-C210036CF6D4";
	public String getKey() {
		return CERTKEY;
	}
	public SqlResultMap setBarobillJoin(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		Tests barobill = new Tests();
		SqlResultMap result = new SqlResultMap();
		int chk=0;
		int chkCorp = barobill.CheckCorpIsMember(arg,CERTKEY);
		if(chkCorp == 0){
			chk = barobill.RegistCorp(arg,CERTKEY);
		}else{
			chk = barobill.AddUserToCorp(arg,CERTKEY);
		}
		if(chk == 1){
			data.param
				.table("baro_logn")

				.where("where user_idcd = :user_idcd")
				.where("and   buss_numb = :buss_numb")

				.unique("user_idcd", arg.fixParameter("user_idcd"))
				.unique("buss_numb", arg.fixParameter("buss_numb"))

				.update("lgin_idcd", arg.getParameter("lgin_idcd"))
				.update("lgin_pswd", arg.getParameter("lgin_pswd"))
				.update("tele_numb", arg.getParameter("tele_numb"))
				.update("mail_addr", arg.getParameter("mail_addr"))
			;
			data.attach(Action.modify);
			data.execute();
		}else{
			String text = barobill.GetError( Integer.toString(chk));
			SqlResultRow ro = new SqlResultRow();
			ro.setParameter("result", text);

			result.add(ro);
		}

//		data.execute();
		return result;
	}


	public SqlResultMap getBaro_logn(HttpRequestArgument arg) throws Exception {
		// logic
		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select *									")
			.where("from baro_logn								")
			.where("where user_idcd = :user_idcd ", arg.fixParameter("user_idcd"))
			.where("and   buss_numb = :buss_numb ", arg.getParameter("buss_numb"))
		;

		return data.selectForMap();
	}
	public String getBarobillURL(HttpRequestArgument arg) throws Exception {
		// logic
		Tests barobill = new Tests();
		String chk = barobill.GetBaroBillURL(arg,CERTKEY);
		if(chk.indexOf("https")==-1){
			chk = barobill.GetError(chk);
		}

		return chk;
	}
	public String getBarobillInvoiceURL(HttpRequestArgument arg) throws Exception {
		// logic
		com.baroservice.api.taxinvoice.Tests barobill = new com.baroservice.api.taxinvoice.Tests();
		Tests error = new Tests();

		String chk = barobill.GetTaxInvoicePopUpURL(arg,CERTKEY);
		if(chk.indexOf("https")==-1){
			chk = error.GetError(chk);
		}
		return chk;
	}
	public String setDeleteTax(HttpRequestArgument arg) throws Exception {
		// logic
		com.baroservice.api.taxinvoice.Tests invoice = new com.baroservice.api.taxinvoice.Tests();
		Tests error = new Tests();

		String msg = error.GetError(Integer.toString(invoice.DeleteTaxInvoice(arg,CERTKEY)));

		return msg;
	}
	public String setProcTaxInvoice(HttpRequestArgument arg) throws Exception {
		// logic
		DataMessage data = arg.newStorage("POS");

		com.baroservice.api.taxinvoice.Tests invoice = new com.baroservice.api.taxinvoice.Tests();
		Tests error = new Tests();

		String msg = error.GetError(Integer.toString(invoice.ProcTaxInvoice(arg,CERTKEY)));
		if(msg==""){
			data.param
				.table("txbl_mast")

				.where("where invc_numb = :invc_numb")

				.unique("invc_numb",arg.fixParamText("invc_numb"))

				.update("trsm_yorn", "0")
			;
			data.attach(Action.update);
			data.execute();
			data.clear();
		}
		return msg;
	}
}
