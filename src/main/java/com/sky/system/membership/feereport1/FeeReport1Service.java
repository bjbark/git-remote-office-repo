package com.sky.system.membership.feereport1;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;

@Service
public class FeeReport1Service extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	public SqlResultMap getSummary(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String result = "";
		ParamToJson parse = new ParamToJson();
		result = parse.TranslateAll(arg);

		data.param
			.query("call crct_summary( :param "     , result)
			.query("              )")
		;
		return data.selectForMap();

	}
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select *																					")
		;
		data.param
			.where("from (																					")
			.where("select  a.mmbr_idcd      , a.line_seqn													")
			.where("      , a.acce_date      , a.annc_dvcd													")
			.where("      , a.qntt           , a.pric           , a.amnt									")
			.where("      , a.lssn_stdt      , a.stot_dvcd      , a.acct_nmbr								")
			.where("      , a.drtr_idcd      , e.user_name as drtr_name										")
			.where("      , m.mmbr_name 																	")
			.where("      , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl			")
			.where("      , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd			")
			.where("      , a.updt_urif																		")
			.where("      , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
			.where("      , a.crte_urif																		")
			.where("from  crct_mast a	 																	")
			.where("      left join mmbr_mast m on a.mmbr_idcd = m.mmbr_idcd								")
			.where("      left join user_mast e on a.drtr_idcd = e.user_idcd								")
			.where("where 1=1																				")
			.where("and   a.acce_date = :acce_date 	"	, arg.getParameter("acce_date"))
			.where("order by a.stot_dvcd , a.line_seqn desc													")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}

	}
}
