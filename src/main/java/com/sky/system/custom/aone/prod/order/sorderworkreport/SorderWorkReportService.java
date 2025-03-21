package com.sky.system.custom.aone.prod.order.sorderworkreport;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.apache.commons.lang.StringUtils;
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
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service("aone.order.SorderWorkReportService")
public class SorderWorkReportService  extends DefaultServiceHandler {
	@Autowired
	SeqListenerService sequance;

	//마스터 조회
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param // 집계문  입력
			.total(" select  count(1) as maxsize																	")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.query("from (																							")
			.query("	select  a.invc_numb       , a.amnd_degr       , a.acpt_dvcd       , a.invc_date				")
			.query("		,   a.cstm_idcd       , a.acpt_stat_dvcd  , a.memo										")
			.query("		,   b.invc_qntt       , b.remk_text       , b.line_seqn									")
			.query("		,   json_value(b.json_data,'$.repa_stat_dvcd') as repa_stat_dvcd						")
			.query("		,   json_value(b.json_data,'$.pdod_date') as pdod_date									")
			.query("		,   json_value(b.json_data,'$.sral_numb') as sral_numb        , c.cstm_name				")
			.query("		,   concat(date_format(json_value(b.json_data,'$.plan_strt_date' ), '%Y-%m-%d'), ' ~ ', date_format(json_value(b.json_data,'$.plan_endd_date'), '%Y-%m-%d')) as  plan_date ")
			.query("		,   d.item_name       , d.item_spec														")
			.query("		,   f.work_strt_dttm  , f.work_endd_dttm  , f.need_time       , f.invc_numb as work_invc_numb	")
			.query("		,   f.user_memo																			")
			.query("		,   g.user_name as prod_drtr_name														")
		;
		data.param
			.query("	from acpt_mast a																			")
			.query("		 left outer join acpt_item b on a.invc_numb = b.invc_numb and a.amnd_degr = b.amnd_degr	")
			.query("		 left outer join cstm_mast c on a.cstm_idcd = c.cstm_idcd								")
			.query("		 left outer join item_mast d on b.item_idcd = d.item_idcd								")
			.query("		 left outer join work_book f on a.invc_numb = f.wkod_numb and a.amnd_degr = f.wkod_seqn	")
			.query("		 left outer join user_mast g on g.user_idcd = json_value(b.json_data,'$.prod_drtr_idcd')")
		;
		data.param
			.query("	where 1 = 1																					")
			.query("	and   ifnull(a.ordr_dvcd,0) != '4000'														")
			.query("	and   a.acpt_stat_dvcd > 1000																")
			.query("	and   a.find_name   like %:find_name%     " , arg.getParamText("find_name" ))
			.query("	and   a.invc_date      >= :invc1_date     " , arg.getParamText("invc1_date"))
			.query("	and   a.invc_date      <= :invc2_date     " , arg.getParamText("invc2_date"))
			.query("	and   a.acpt_stat_dvcd  = :acpt_stat_dvcd " , arg.getParamText("acpt_stat_dvcd" ))
			.query("	and   json_value(b.json_data,'$.repa_stat_dvcd')  = :repa_stat_dvcd      " , arg.getParamText("repa_stat_dvcd" ))
			.query("	and   json_value(b.json_data,'$.prod_drtr_idcd')  = :prod_drtr_idcd      " , arg.getParamText("prod_drtr_idcd" ))
			.query("	and   a.acpt_dvcd       = :acpt_dvcd      " , arg.getParamText("acpt_dvcd" ))
			.query("	and   a.cstm_idcd       = :cstm_idcd      " , arg.getParamText("cstm_idcd" ))
			.query("	and   b.item_idcd       = :item_idcd      " , arg.getParamText("item_idcd" ))
			.query("	and   json_value(b.json_data,'$.prod_drtr_idcd')  = :drtr_idcd           " , arg.getParamText("drtr_idcd" ))
			.query("	and   json_value(b.json_data,'$.sral_numb') like %:sral_numb%   " , arg.getParamText("sral_numb"))
			.query("	and   a.line_stat       < :line_stat      " , "2" , "".equals(arg.getParamText("line_stat" )))
			.query("	order by a.invc_numb desc, a.amnd_degr desc limit 99999999									")
			.query(") a																								")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	// detail 조회
	public SqlResultMap getDetail(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");

		data.param
			.where("select a.invc_numb		,a.item_idcd		,a.need_qntt		,a.line_seqn						")
			.where("	 , c.item_code		,c.item_name		,c.item_spec											")
			.where("	 , cast(replace(json_extract(a.json_data, '$.pric'),'\"','') as char) as pric														")
			.where("	 , cast(replace(json_extract(a.json_data, '$.amnt'),'\"','') as char) as amnt														")
			.where("from work_book_mtrl a																				")
			.where("	   left outer join work_book b on b.invc_numb = a.invc_numb										")
			.where("	   left outer join item_mast c on c.item_idcd = a.item_idcd										")
			.where("where  a.invc_numb	=:work_invc_numb		" , arg.getParamText("work_invc_numb"))
			.where("group by a.line_seqn																				")
		;
		return data.selectForMap();
	}

	//이미지 불러오기
	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select item_imge , item_imge2 		")
			.where("from  work_book						")
			.where("where 1=1							")
			.where("      and  invc_numb = :work_invc_numb", arg.getParameter("work_invc_numb"))
		;
		return data.selectForMap();
	}


}