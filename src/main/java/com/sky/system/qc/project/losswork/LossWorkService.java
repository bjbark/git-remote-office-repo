package com.sky.system.qc.project.losswork;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.SeqListenerService;
import com.sky.utils.file.UploadItem;


@Service
public class LossWorkService  extends DefaultServiceHandler {

	public SqlResultMap getMaster(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																					")
			.where("select     a.invc_numb      , a.invc_date      , a.pjod_idcd      , a.wker_idcd			")
			.where("         , a.prts_name      , a.dept_idcd      , a.resp_dept_idcd , a.crte_urif			")
			.where("         , a.occr_date      , a.proc_date      , a.loss_dvcd      , a.dtil_cont			")
			.where("         , a.cnfm_drtr_idcd , a.cnfm_date      , a.user_memo							")
			.where("         , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
			.where("         , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name	")
			.where("         , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
			.where("         , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
			.where("         , d1.dept_name as dept_name           , d2.dept_name as resp_dept_name			")
			.where("         , u1.user_name as wker_name           , u2.user_name as cnfm_drtr_name			")
			.where("         , b.loss_amnt as loss_amnt_ttsm 												")
			.where("from pjod_loss_mast a																	")
			.where("left outer join ( select invc_numb, sum(loss_amnt) as loss_amnt							")
			.where("                  from pjod_loss_item													")
			.where("                  group by invc_numb													")
			.where("                ) b on a.invc_numb = b.invc_numb										")
			.where("left outer join dept_mast d1 on a.dept_idcd      = d1.dept_idcd							")
			.where("left outer join dept_mast d2 on a.resp_dept_idcd = d2.dept_idcd							")
			.where("left outer join user_mast u1 on a.wker_idcd      = u1.user_idcd							")
			.where("left outer join user_mast u2 on a.cnfm_drtr_idcd = u2.user_idcd							")
			.where("where 1=1																				")
			.where("and   a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and   a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and   a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and   a.occr_date >= :occr_date1     " , arg.getParamText("occr_date1" ))
			.where("and   a.occr_date <= :occr_date2     " , arg.getParamText("occr_date2" ))
			.where("and   a.proc_date >= :proc_date1     " , arg.getParamText("proc_date1" ))
			.where("and   a.proc_date <= :proc_date2     " , arg.getParamText("proc_date2" ))
			.where("and   a.pjod_idcd  = :pjod_idcd      " , arg.getParamText("pjod_idcd"  ))
			.where("and   a.cvic_idcd  = :cvic_idcd      " , arg.getParamText("cvic_idcd"  ))
			.where("order by a.invc_date																	")
			.where(")a																						")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}

	public SqlResultMap getDetail(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select     a.invc_numb      , a.line_seqn      , a.work_cont      , a.work_time			")
		.query("         , a.work_pric      , a.loss_amnt      , a.user_memo							")
		.query("         , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
		.query("         , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name	")
		.query("         , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
		.query("         , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
		;
		data.param
		.where("from pjod_loss_item a																	")
		.where("where 1=1																				")
		.where("and   a.invc_numb	=:invc_numb  " , arg.getParamText("invc_numb"						))
		.where("and   a.line_stat   <:line_stat  " , "2" , "".equals(arg.getParamText("line_stat")		))
		.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getImage(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
		.total(" select  count(1) as maxsize  ")
		;
		data.param
		.query("select     a.invc_numb      , a.line_seqn      , a.imge_1fst      , a.user_memo			")
		.query("         , a.sysm_memo      , a.prnt_idcd      , a.line_levl      , a.line_ordr			")
		.query("         , a.line_stat      , a.line_clos      , a.find_name      , a.updt_user_name	")
		.query("         , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif			")
		.query("         , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd			")
		;
		data.param
		.where("from pjod_loss_imge a																	")
		.where("where 1=1																				")
		.where("and   a.invc_numb	=:invc_numb  " , arg.getParamText("invc_numb"						))
		.where("and   a.line_stat   <:line_stat  " , "2" , "".equals(arg.getParamText("line_stat")		))
		.where("order by a.line_seqn																	")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
		.query("select     ifnull(max(a.line_seqn),0)+1 as seq											")
		;
		data.param
		.where("from pjod_loss_item a																	")
		.where("where 1=1																				")
		.where("and   a.invc_numb	=:invc_numb  " , arg.getParamText("invc_numb"						))
		.where("and   a.line_stat   <:line_stat  " , "2" , "".equals(arg.getParamText("line_stat")		))
		;
		return data.selectForMap();
	}
	public SqlResultMap getImgSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select     ifnull(max(a.line_seqn),0)+1 as seq											")
		;
		data.param
			.where("from pjod_loss_imge a																	")
			.where("where 1=1																				")
			.where("and   a.invc_numb	=:invc_numb  " , arg.getParamText("invc_numb"						))
			.where("and   a.line_stat   <:line_stat  " , "2" , "".equals(arg.getParamText("line_stat")		))
		;
		return data.selectForMap();
	}
	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
					.table("pjod_loss_mast")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("pjod_loss_item")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				;data.attach(Action.delete);
				data.execute();
				data.clear();

				data.param
					.table("pjod_loss_imge")
					.where("where invc_numb  = :invc_numb")

					.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				;data.attach(Action.delete);

			} else {
				data.param
					.table("pjod_loss_mast")
					.where("where invc_numb	= :invc_numb" )

					.unique("invc_numb"				, row.fixParameter("invc_numb"))

					.update("find_name"				, row.getParameter("pjod_idcd")
													+ " "
													+ row.fixParameter("prts_name"))
					.update("line_stat"				, row.getParameter("line_stat"))

					.update("invc_date"				, row.getParameter("invc_date"))
					.update("pjod_idcd"				, row.getParameter("pjod_idcd"))
					.update("wker_idcd"				, row.getParameter("wker_idcd"))
					.update("prts_name"				, row.getParameter("prts_name"))
					.update("dept_idcd"				, row.getParameter("dept_idcd"))
					.update("resp_dept_idcd"		, row.getParameter("resp_dept_idcd"))
					.update("occr_date"				, row.getParameter("occr_date"))
					.update("proc_date"				, row.getParameter("proc_date"))
					.update("loss_dvcd"				, row.getParameter("loss_dvcd"))
					.update("dtil_cont"				, row.getParameter("dtil_cont"))
					.update("loss_amnt_ttsm"		, row.getParameter("loss_amnt_ttsm"))
					.update("cnfm_drtr_idcd"		, row.getParameter("cnfm_drtr_idcd"))
					.update("cnfm_date"				, row.getParameter("cnfm_date"))

					.update("updt_idcd"				, row.getParameter("updt_idcd"))
					.insert("crte_idcd"				, row.getParameter("crte_idcd"))
					.update("updt_ipad"				, arg.remoteAddress )
					.insert("crte_ipad"				, arg.remoteAddress )
					.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
					.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
				;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setDetail(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));

			if (rowaction == Action.delete) {
				data.param
				.table("pjod_loss_item")
				.where("where invc_numb  = :invc_numb")
				.where("and   line_seqn  = :line_seqn")

				.unique("invc_numb"			, row.fixParameter("invc_numb"		))
				.unique("line_seqn"			, row.fixParameter("line_seqn"		))
				;data.attach(Action.delete);
			} else {
				data.param
				.table("pjod_loss_item")
				.where("where invc_numb	= :invc_numb" )
				.where("and   line_seqn	= :line_seqn" )

				.unique("invc_numb"				, row.fixParameter("invc_numb"))
				.unique("line_seqn"				, row.fixParameter("line_seqn"))

				.update("find_name"				, row.getParameter("invc_numb")
						+ " "
						+ row.getParameter("work_cont"))
						.update("line_stat"				, row.getParameter("line_stat"))

						.update("work_cont"				, row.getParameter("work_cont"))
						.update("work_time"				, row.getParameter("work_time"))
						.update("work_pric"				, row.getParameter("work_pric"))
						.update("loss_amnt"				, row.getParameter("loss_amnt"))

						.update("updt_idcd"				, row.getParameter("updt_idcd"))
						.insert("crte_idcd"				, row.getParameter("crte_idcd"))
						.update("updt_ipad"				, arg.remoteAddress )
						.insert("crte_ipad"				, arg.remoteAddress )
						.update("updt_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						.insert("crte_dttm"				, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
						;data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}
	public SqlResultMap setImage(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		int line_seqn = Integer.parseInt(arg.getParamText("line_seqn"));

		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		System.out.println(file.length);

		for (int i = 0; i < file.length; i++) {
			ByteArrayInputStream thumnailInputStream = null;
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        Thumbnails.of(file[i].getInputStream()).size(200, 200).toOutputStream(baos);
	        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
	        int readCount = 0;
	        try{
	        	byte[] returnByte =null;
	        	byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();
				data.param
					.table("pjod_loss_imge")
					.where("where invc_numb	= :invc_numb" )
					.where("and   line_seqn	= :line_seqn" )

					.unique("invc_numb"				, arg.fixParameter("invc_numb"))
					.unique("line_seqn"				, line_seqn)

					.insert("imge_1fst",returnByte)
				;data.attach(Action.insert);
				data.execute();
				data.clear();
				line_seqn++;
			} catch(Exception ex) {
				throw ex;
			} finally {
				if(baos != null) baos.close();
				if(thumnailInputStream != null) thumnailInputStream.close();
			}
		}
		return map;
	}
	public SqlResultMap setDeleteImage(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.table("pjod_loss_imge")
			.where("where invc_numb  = :invc_numb")
			.where("and   line_seqn  = :line_seqn")

			.unique("invc_numb"			, arg.fixParameter("invc_numb"		))
			.unique("line_seqn"			, arg.fixParameter("line_seqn"		))
		;data.attach(Action.delete);
		data.execute();
		return null ;
	}
}