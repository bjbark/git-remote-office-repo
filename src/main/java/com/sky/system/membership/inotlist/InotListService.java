package com.sky.system.membership.inotlist;

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
public class InotListService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
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
			.where("      , a.resv_date      , a.resv_time      , a.need_time								")
			.where("      , a.drtr_idcd      , u1.user_name as drtr_name									")
			.where("      , a.acce_date      , a.acce_seqn      , a.memo									")
			.where("      , a.resv_stat_dvcd , a.proc_drtr_idcd , u2.user_name as proc_drtr_name			")
			.where("      , a.qntt           , a.proc_date      , a.proc_time								")
			.where("      , m.mmbr_name 																	")
			.where("      , a.user_memo       , a.sysm_memo     , a.prnt_idcd      , a.line_levl			")
			.where("      , a.line_ordr       , a.line_stat     , a.line_clos      , a.find_name			")
			.where("      , a.updt_user_name  , a.updt_ipad     , a.updt_dttm      , a.updt_idcd			")
			.where("      , a.updt_urif																		")
			.where("      , a.crte_user_name  , a.crte_ipad     , a.crte_dttm      , a.crte_idcd			")
			.where("      , a.crte_urif																		")
			.where("from  inot_mast a	 																	")
			.where("      left join mmbr_mast m on a.mmbr_idcd = m.mmbr_idcd								")
			.where("      left join user_mast u1 on a.drtr_idcd      = u1.user_idcd							")
			.where("      left join user_mast u2 on a.proc_drtr_idcd = u2.user_idcd							")
			.where("where  1=1																				")
			.where("and    a.mmbr_idcd   = :mmbr_idcd			" , arg.getParameter("mmbr_idcd"))
			.where("and    a.proc_date   between  :fr_date		" , arg.getParameter("proc_fr_dt"))
			.where("                     and      :to_date		" , arg.getParameter("proc_to_dt"))
			.where("and    a.proc_drtr_idcd   = :proc_drtr_idcd	" , arg.getParameter("drtr_idcd"))
			.where("and    m.mmbr_name        = :mmbr_name		" , arg.getParameter("mmbr_name"))
			.where("and    m.hdph_numb        like %:hdph_numb%	" , arg.getParamText("hdph_numb" )      , !"".equals(arg.getParamText("hdph_numb" )))
			.where("and    a.line_stat	= :line_stat1"		 , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) )
			.where("order by a.proc_date desc, a.proc_drtr_idcd , a.proc_time, a.line_seqn desc				")
			.where("limit 100																				")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
}
