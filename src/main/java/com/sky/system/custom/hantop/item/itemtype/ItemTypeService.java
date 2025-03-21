package com.sky.system.custom.hantop.item.itemtype;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;


@Service
public class ItemTypeService extends DefaultServiceHandler{

	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 집계문
			.total("select count(1) as maxsize													")
		;
		data.param
			.query("select a.wdtp_idcd      , a.wdtp_code      , a.wdtp_name					")
			.query("     , a.wdcl_idcd      , a.wdgr_idcd      , a.wdcl_name					")
			.query("     , a.line_stat      , b.wdgr_idcd      , b.wdgr_name					")
		;

		data.param //퀴리문
			.where("from wind_type a															")
			.where("left outer join wind_grop b on a.wdgr_idcd = b.wdgr_idcd					")
			.where("where       1=1																")
			.where("and         a.find_name  like %:find_name%		"			, arg.getParameter("find_name"))
			.where("and         a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wdtp_idcd														")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap getLookup(HttpRequestArgument arg , int page, int rows) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param //집계문 입력
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select a.wdtp_idcd       , a.wdtp_code      , a.wdtp_name       , a.user_memo		")
			.query("     , a.imge_1fst       , a.imge_2snd      , a.imge_3trd							")
			.query("     , a.imge_4frt       , a.imge_5fit      , a.imge_6six       , a.imge_7svn		")
			.query("     , a.prnt_idcd       , a.line_levl      , a.line_stat							")
			.query("     , a.wdgr_idcd       , g.wdgr_name												")

		;
		data.param //퀴리문
			.where("from  wind_type a																	")
			.where("left outer join wind_grop g on a.wdgr_idcd = g.wdgr_idcd							")
			.where("where       1=1																		")
			.where("and         a.wdtp_idcd  = :wdtp_idcd			"		, arg.getParameter("wdtp_idcd"))
			.where("and         a.wdtp_name  = :wdtp_name			"		, arg.getParameter("wdtp_name"))
			.where("and         a.wdtp_code  = :wdtp_code			"		, arg.getParameter ("wdtp_code"))
			.where("and         a.wdgr_idcd  = :wdgr_idcd			"		, arg.getParameter("wdgr_idcd"))
			.where("and         a.user_memo  = :user_memo			"		, arg.getParameter("user_memo"))
			.where("and         a.find_name  like %:find_name%		"		, arg.getParameter("find_name"))
			.where("and         a.line_stat	< :line_stat			", "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wdtp_idcd																")
		;
		return data.selectForMap(page, rows, (page == 1)); //
	}


	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){

			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("wind_type")
					.where("where wdtp_idcd  =  :wdtp_idcd			")
					//
					.unique("wdtp_idcd"		, row.getParameter("wdtp_idcd"))
				;data.attach(Action.delete);
			} else {
				data.param
					.table("wind_type")
					.where("where wdtp_idcd  = :wdtp_idcd  ")
					//
					.unique("wdtp_idcd"			, row.fixParameter("wdtp_idcd"))
					//
					.update("wdgr_idcd"			, row.getParameter("wdgr_idcd"))
					.update("wdtp_name"			, row.getParameter("wdtp_name"))
					.update("wdtp_code"			, row.getParameter("wdtp_code"))
					.insert("prnt_idcd"			, row.getParameter("prnt_idcd"))
					.insert("line_levl"			, row.getParameter("line_levl"))
					.update("line_stat"			, row.getParameter("line_stat"))
					.update("user_memo"			, row.getParameter("user_memo"))
					.update("updt_idcd"			, row.getParameter("updt_idcd"))
					.insert("crte_idcd"			, row.getParameter("crte_idcd"))
					.update("find_name"			, row.getParamText("wdtp_code"         ).trim()
												+ " "
												+ row.getParamText("wdtp_name"         ).trim())
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

	/* 파일업로드 */
	public SqlResultMap setFileupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
		DataMessage data = arg.newStorage("POS");
		String chk1 = (String)arg.getParameter("chk1");
		String chk2 = (String)arg.getParameter("chk2");
		String chk3 = (String)arg.getParameter("chk3");
		String chk4 = (String)arg.getParameter("chk4");
		String chk5 = (String)arg.getParameter("chk5");
		String chk6 = (String)arg.getParameter("chk6");
		String chk7 = (String)arg.getParameter("chk7");

		byte[] returnByte =null;
		byte[] returnByte2 =null;
		byte[] returnByte3 =null;
		byte[] returnByte4 =null;
		byte[] returnByte5 =null;
		byte[] returnByte6 =null;
		byte[] returnByte7 =null;

		ByteArrayOutputStream baos =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos2 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos3 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos4 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos5 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos6 =  new ByteArrayOutputStream();
		ByteArrayOutputStream baos7 =  new ByteArrayOutputStream();

		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		ByteArrayInputStream thumnailInputStream = null;
		ByteArrayInputStream thumnailInputStream2 = null;
		ByteArrayInputStream thumnailInputStream3 = null;
		ByteArrayInputStream thumnailInputStream4 = null;
		ByteArrayInputStream thumnailInputStream5 = null;
		ByteArrayInputStream thumnailInputStream6 = null;
		ByteArrayInputStream thumnailInputStream7 = null;

		// 이미지일 경우 섬네일 과정을 거친다.
		if(file[0].getFileItem().getName()==null||file[0].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[0].getInputStream()).size(240, 180).toOutputStream(baos);
			thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
		}
		if(file[1].getFileItem().getName()==null||file[1].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[1].getInputStream()).size(240, 180).toOutputStream(baos2);
			thumnailInputStream2 = new ByteArrayInputStream(baos2.toByteArray());
		}
		if(file[2].getFileItem().getName()==null||file[2].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[2].getInputStream()).size(240, 180).toOutputStream(baos3);
			thumnailInputStream3 = new ByteArrayInputStream(baos3.toByteArray());
		}
		if(file[3].getFileItem().getName()==null||file[3].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[3].getInputStream()).size(240, 180).toOutputStream(baos4);
			thumnailInputStream4 = new ByteArrayInputStream(baos4.toByteArray());
		}
		if(file[4].getFileItem().getName()==null||file[4].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[4].getInputStream()).size(240, 180).toOutputStream(baos5);
			thumnailInputStream5 = new ByteArrayInputStream(baos5.toByteArray());
		}
		if(file[5].getFileItem().getName()==null||file[5].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[5].getInputStream()).size(240, 180).toOutputStream(baos6);
			thumnailInputStream6 = new ByteArrayInputStream(baos6.toByteArray());
		}
		if(file[6].getFileItem().getName()==null||file[6].getFileItem().getName()==""){
		}else{
			Thumbnails.of(file[6].getInputStream()).size(240, 180).toOutputStream(baos7);
			thumnailInputStream7 = new ByteArrayInputStream(baos7.toByteArray());
		}

		int readCount = 0;
		int readCount2 = 0;
		int readCount3 = 0;
		int readCount4 = 0;
		int readCount5 = 0;
		int readCount6 = 0;
		int readCount7 = 0;

		try{
			/* 첫번쨰 사진 저장 */
			if(chk1.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_1fst = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk1.equals("1")){
				byte[] buf = new byte[1024];
				while ((readCount = thumnailInputStream.read(buf))>0) {
					 baos.write(buf,0,readCount);
				}
				returnByte = baos.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_1fst",returnByte)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 두번쨰 사진 저장 */
			if(chk2.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_2snd = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk2.equals("1")){
				byte[] buf2 = new byte[1024];
				while ((readCount2 = thumnailInputStream2.read(buf2))>0) {
					 baos2.write(buf2,0,readCount2);
				}
				returnByte2 = baos2.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_2snd",returnByte2)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 세번쨰 사진 저장 */
			if(chk3.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_3trd = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk3.equals("1")){
				byte[] buf3 = new byte[1024];
				while ((readCount3 = thumnailInputStream3.read(buf3))>0) {
					 baos3.write(buf3,0,readCount3);
				}
				returnByte3 = baos3.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_3trd",returnByte3)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 네번쨰 사진 저장 */
			if(chk4.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_4frt = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk4.equals("1")){
				byte[] buf4 = new byte[1024];
				while ((readCount4 = thumnailInputStream4.read(buf4))>0) {
					 baos4.write(buf4,0,readCount4);
				}
				returnByte4 = baos4.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_4frt",returnByte4)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 다섯번쨰 사진 저장 */
			if(chk5.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_5fit = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk5.equals("1")){
				byte[] buf5 = new byte[1024];
				while ((readCount5 = thumnailInputStream5.read(buf5))>0) {
					 baos4.write(buf5,0,readCount5);
				}
				returnByte5 = baos5.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_5fit",returnByte5)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 여섯번쨰 사진 저장 */
			if(chk6.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_6six = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk6.equals("1")){
				byte[] buf6 = new byte[1024];
				while ((readCount6 = thumnailInputStream6.read(buf6))>0) {
					 baos6.write(buf6,0,readCount6);
				}
				returnByte6 = baos6.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_6six",returnByte6)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}
			/* 일곱번쨰 사진 저장 */
			if(chk7.equals("0")){
				data.param
					.query("update wind_type					")
					.query("       set imge_7svn = null			")
					.query("       where wdtp_idcd = :wdtp_idcd", arg.getParameter("wdtp_idcd"))
				;data.attach(Action.direct);
				data.execute();
				data.clear();
			}else if(chk7.equals("1")){
				byte[] buf7 = new byte[1024];
				while ((readCount7 = thumnailInputStream7.read(buf7))>0) {
					 baos7.write(buf7,0,readCount7);
				}
				returnByte7 = baos7.toByteArray();

				data.param
					.table("wind_type")
					.where("where wdtp_idcd	= :wdtp_idcd" )

					.unique("wdtp_idcd"				, arg.fixParameter("wdtp_idcd"))

					.update("imge_7svn",returnByte7)
				;data.attach(Action.update);
				data.execute();
				data.clear();
			// logic 처리 ( DB등 )
			}

		} catch(Exception ex) {
			throw ex;
		} finally {
			if(baos != null) baos.close();
			if(thumnailInputStream != null) thumnailInputStream.close();
			if(thumnailInputStream2 != null) thumnailInputStream2.close();
			if(thumnailInputStream3 != null) thumnailInputStream3.close();
			if(thumnailInputStream4 != null) thumnailInputStream4.close();
			if(thumnailInputStream5 != null) thumnailInputStream5.close();
			if(thumnailInputStream6 != null) thumnailInputStream6.close();
			if(thumnailInputStream7 != null) thumnailInputStream7.close();
		}

		return map;
	}

	public SqlResultMap getImage(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select imge_1fst										")
			.query(", imge_2snd     , imge_3trd     , imge_4frt				")
			.query(", imge_5fit     , imge_6six     , imge_7svn				")
			.where("from  wind_type											")
			.where("where 1=1												")
			.where("and   wdtp_idcd = :wdtp_idcd",arg.getParameter("wdtp_idcd"))
		;
		return data.selectForMap();
	}


}



