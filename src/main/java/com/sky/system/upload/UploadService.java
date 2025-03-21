package com.sky.system.upload;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletContext;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.initech.util.BufferedOutputStream;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.listener.ParamToJson;
import com.sky.utils.file.UploadItem;



@Service
public class UploadService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;
	@Autowired
	ServletContext cont;
	// filesearch
	public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

//			DataMessage data = new DataMessage("NETHOSTING");
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn			")
			.query("		, a.file_ttle       , a.file_dvcd_1fst , a.file_dvcd_2snd   , a.file_dvcd_3trd		")
			.query("		, a.path_name       , a.file_name      , a.file_size        , a.upld_dttm			")
			.query("		, a.remk_text       , a.uper_seqn      , a.disp_seqn								")
		;
		data.param //퀴리문
			.where("from		apnd_file a																		")
			.where("where		1=1																				")
			.where("and			a.invc_numb = :invc_numb " , 		arg.getParameter("invc_numb"				))
			.where("and			a.orgn_dvcd = :orgn_dvcd " , 		arg.getParameter("orgn_dvcd"				))	// 출처구분(table name)
			.where("and			a.line_seqn = :line_seqn " , 		arg.getParameter("line_seqn"				))
			.where("and			a.uper_seqn = :uper_seqn " , 		arg.getParameter("uper_seqn"				))	// 파일 amnd_degr 관리
			.where("and			a.file_dvcd_1fst = :file_dvcd_1fst " , 	arg.getParameter("file_dvcd_1fst"))	//
			.where("and			a.file_dvcd_2snd = :file_dvcd_2snd " , 	arg.getParameter("file_dvcd_2snd"))	//
			.where("and			a.file_dvcd_3trd = :file_dvcd_3trd " , 	arg.getParameter("file_dvcd_3trd"))	//
			.where("and			ifnull(a.file_dvcd_1fst,'1') = :file_dvcd_1fst_yorn " , 	arg.getParameter("file_dvcd_1fst_yorn"))	//
			.where("order by	a.line_seqn																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getImageSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select      file_name as file_path															")
			.query("         , a.orgn_dvcd         , a.invc_numb          , a.line_seqn       , a.assi_seqn		")
			.query("         , a.file_dvcd_1fst    , a.file_dvcd_2snd     , a.file_dvcd_3trd 					")
		;
		data.param //퀴리문
			.where("from		apnd_file a																	")
			.where("where		1=1																			")
			.where("and			a.invc_numb = :invc_numb " , 		arg.fixParameter("invc_numb"			))
			.where("and			a.line_seqn = :line_seqn " , 		arg.getParameter("line_seqn"			))	// 순번
			.where("and			a.assi_seqn = :assi_seqn " , 		arg.getParameter("assi_seqn"			))	// 보조순번
			.where("and			a.orgn_dvcd = :orgn_dvcd " , 		arg.getParameter("orgn_dvcd"			))	// 출처구분(table name)
			.where("and			a.file_dvcd_1fst = :file_dvcd_1fst " , 	arg.getParameter("file_dvcd_1fst"))	//
			.where("and			a.file_dvcd_2snd = :file_dvcd_2snd " , 	arg.getParameter("file_dvcd_2snd"))	//
			.where("and			a.file_dvcd_3trd = :file_dvcd_3trd " , 	arg.getParameter("file_dvcd_3trd"))	//
			.where("order by	a.line_seqn, a.assi_seqn													")
		;

		return data.selectForMap();

	}
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//		DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
		int assi_seqn = Integer.parseInt((String)arg.getParameter("assi_seqn"));
		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}
//		long file_size = file.getSize();						//파일크기
//		String file_name = arg.getParamText("file_name").substring(0,arg.getParamText("file_name").lastIndexOf(".")); //확장자 제외 파일이름

		Date date = new Date();
		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt

		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";

		String imageYn;
		// 파일이 이미지일 경우
		for (int i = 0; i < file_name.size(); i++) {

			if(file_name.get(i).matches(regExp)){
				imageYn = "Y";
			}else{
				imageYn = "N";
			}
//			ByteArrayInputStream thumnailInputStream = null;
//			// 이미지일 경우 섬네일 과정을 거친다.
//			if("Y".equals(imageYn)) {
//			//  이미지 파일 사이즈 체크
////				if (file.getSize()/1024/1024 > 0) {
////					throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
////				}
//
//				// 섬네일에 강제 사이즈 지정 후 스트림 과정
//				ByteArrayOutputStream baos = new ByteArrayOutputStream();
//				Thumbnails.of(file[i].getInputStream()).size(200, 200).toOutputStream(baos);
//				thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
//			}


			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				imageName = name.get(i)+now;
			}else{
				// 파일이름지정 ( 확장자는 유지 )
				imageName = name.get(i) + now + file_name.get(i).substring(file[i].getFileItem().getName().lastIndexOf("."));
							 // 파일이름, 현재시간, 파일 확장자
			}

			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// 업로드 진행
					// 이미지일 경우
					if("Y".equals(imageYn)){
						ftp.upload(directory, imageName, file[i]);		// inputstream로 저장한다 	- 이미지 그대로 저장
						System.out.println(directory);
					} else {
						System.out.println("**********************");
						System.out.println(directory);
						System.out.println(imageName);
						System.out.println(file[i]);
						ftp.upload(directory, imageName, file[i]); // 파일 자체를 올린다.
					}
					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
						.unique("assi_seqn"				, assi_seqn++	)

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("uper_seqn"				, arg.getParameter("uper_seqn" ))						// 파일 amnd_degr 관리
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;data.attach(Action.modify);

					// logic 처리 ( DB등 )

				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect();
				}
			}
		}
		data.execute();
		return map;
	}

	public SqlResultMap download(HttpRequestArgument arg) throws Exception {
		SqlResultMap map = new SqlResultMap();
		String hq = arg.getParamText("hqof_idcd");
		HostProperty host = property.getProperty( hq+".IMG" );
		String directory = host.getHostPath();													// 업로드 경로를 지정한다.
		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));	// FTPConnector의 싱글톤 패턴 인스턴트를 생성한다. 이때 "sftp"로 진행한다.
		FileOutputStream fos = null;
		BufferedOutputStream bos = null;
		String path = cont.getRealPath("/resource/downloadFile");					// 저장폴더
		File folder = new File(path);														// 폴더 path를 File형태로 담아둔다.

		System.out.println(ftp);
		System.out.println(path);

		if(!folder.exists()){																// 폴더가 있는지 확인한다.
			try {
				folder.mkdir();																// 폴더를 만든다.
			} catch (Exception e) {
				// TODO: handle exception
				e.getStackTrace();
			}
		}
		int readCount = 0;

		if (ftp.connect(host)) {//sftp에 접속한다.
			try{
				ByteArrayInputStream bais = ftp.download(directory, arg.getParamText("file_name"));	// bais에 파일정보를 담는다.
				fos = new FileOutputStream(path+"//"+arg.getParamText("file_name"));				// outputstream할 정보를 담는다.
				bos = new BufferedOutputStream(fos);												// 버퍼
				byte[] buffer = new byte[55555];													// 바이트
				while ((readCount = bais.read(buffer))>0) {											// bais에 있는 만큼 실행
					bos.write(buffer,0,readCount);													// 다운로드진행
				}
			} catch(Exception ex) {
				System.out.println("error = "+ex.getMessage());
				ex.getStackTrace();
			} finally {
				ftp.disconnect();																	// sftp연결종료
				try {
					if(bos != null) bos.close();													// 각 스트림 연결종료
					if(fos != null) fos.close();
				} catch (Exception e) {
					// TODO: handle exception
					e.getStackTrace();
				}
			}
		}else{
			System.out.println("******************* error ***************");
			System.out.println(ftp.toString());
			return null;
		}
		return map;
	}
	public SqlResultMap localDelete(HttpRequestArgument arg){
		SqlResultMap map = new SqlResultMap();
		String path = cont.getRealPath("/resource/downloadFile");					// 저장폴더
		String file_name = arg.getParamText("file_name");
		File file = new File(path+"/"+file_name);
		String msg = "";
		if( file.exists() ){
			if(file.delete()){
				msg = "파일삭제 성공";
			}else{
				msg = "파일삭제 실패";
			}
		}else{
			msg = "파일이 존재하지 않습니다.";
		}
		return map;
	}
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.query("select    ifnull(MAX(assi_seqn),0) as assi_seqn								")
		;
		data.param //퀴리문
			.where("from        apnd_file 														")
			.where("where       1=1																")
			.where("and         invc_numb = :invc_numb        " , arg.getParameter("invc_numb"))
			.where("and         orgn_dvcd = :orgn_dvcd        " , arg.getParameter("orgn_dvcd"))
			.where("and         line_seqn = :line_seqn        " , arg.getParameter("line_seqn"))
		;
		return data.selectForMap();
	}
	public SqlResultMap fileDelete(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String hq = arg.getParamText("hqof_idcd");
		HostProperty host = property.getProperty( hq+".IMG" );
		SqlResultMap map = new SqlResultMap();
		String file_name = arg.getParamText("file_name");

		Session session = null;
		Channel channel = null;
		ChannelSftp sftp = null;
		JSch jsch = new JSch();																			// sftp연결해주는 api
		try {
			session = jsch.getSession(host.getUserName(),host.getHostName(),host.getHostPort());	// 연결정보
			session.setPassword(host.getPassword());

			java.util.Properties config = new java.util.Properties();
			config.put("StrictHostKeyChecking", "no");												// 접속정보확인 거절
			session.setConfig(config);
			session.connect();																		// 연결
			channel = session.openChannel("sftp");

			channel.connect();																		// 접속
			sftp = (ChannelSftp) channel;															// 실사용
			sftp.rm(host.getHostPath()+"//"+file_name);												// 삭제실행 (rm = remove)
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
		}finally{
			sftp.quit();
			session.disconnect();
		}
		data.param
			.table("apnd_file")
			.where("where orgn_dvcd	= :orgn_dvcd" )
			.where("and invc_numb	= :invc_numb" )
			.where("and line_seqn	= :line_seqn" )
			.where("and assi_seqn	= :assi_seqn" )

			.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
			.unique("invc_numb"				, arg.fixParameter("invc_numb"))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"				, arg.fixParameter("assi_seqn"))

		;data.attach(Action.delete);
		data.execute();
		return map;
	}
	public SqlResultMap fileRename(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		String hq = arg.getParamText("hqof_idcd");
		HostProperty host = property.getProperty( hq+".IMG" );
		SqlResultMap map = new SqlResultMap();
		String file_name = arg.getParamText("file_name");

		Session session = null;
		Channel channel = null;
		ChannelSftp sftp = null;
		JSch jsch = new JSch();																			// sftp연결해주는 api
			try {
				session = jsch.getSession(host.getUserName(),host.getHostName(),host.getHostPort());	// 연결정보
				session.setPassword(host.getPassword());

				java.util.Properties config = new java.util.Properties();
				config.put("StrictHostKeyChecking", "no");												// 접속정보확인 거절
				session.setConfig(config);
				session.connect();																		// 연결
				channel = session.openChannel("sftp");

				channel.connect();																		// 접속
				sftp = (ChannelSftp) channel;															// 실사용
				sftp.rename(host.getHostPath()+"//"+arg.getParamText("be_file_name"),host.getHostPath()+"//"+file_name);		// 이름변경
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
			}finally{
				sftp.quit();
				session.disconnect();
			}
			data.param
				.table("apnd_file")
				.where("where orgn_dvcd	= :orgn_dvcd" )
				.where("and invc_numb	= :invc_numb" )
				.where("and line_seqn	= :line_seqn" )
				.where("and assi_seqn	= :assi_seqn" )

				.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
				.unique("invc_numb"				, arg.fixParameter("invc_numb"))
				.unique("line_seqn"				, arg.fixParameter("line_seqn"))
				.unique("assi_seqn"				, arg.fixParameter("assi_seqn"))

				.update("file_name"				, arg.fixParameter("file_name"))
			;data.attach(Action.update);
			data.execute();

		return map;
	}
	public SqlResultMap modifyUpload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultRow row = new SqlResultRow();
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();

		String hq = arg.getParamText("hqof_idcd");
		HostProperty host = property.getProperty( hq+".IMG" );

		Session session = null;
		Channel channel = null;
		ChannelSftp sftp = null;

		data.param
			.query("select   a.file_name , count(b.invc_numb) as cnt				")
			.where("from     apnd_file a 											")
			.where("inner    join apnd_file b on a.file_name = b.file_name 			")
			.where("where    a.invc_numb = :invc_numb	",arg.fixParameter("invc_numb"))
			.where("and      a.orgn_dvcd = :orgn_dvcd	",arg.fixParameter("orgn_dvcd"))
			.where("and      a.line_seqn = :line_seqn	",arg.fixParameter("line_seqn"))
			.where("and      a.assi_seqn = :assi_seqn	",arg.fixParameter("assi_seqn"))
		;
		row = data.selectForRow();
		data.clear();
		if(row!=null){
			if(!row.getParamText("file_name").equals("") && Integer.parseInt(row.getParamText("cnt")) < 2){
				JSch jsch = new JSch();																		// sftp연결해주는 api
				try {
					session = jsch.getSession(host.getUserName(),host.getHostName(),host.getHostPort());	// 연결정보
					session.setPassword(host.getPassword());

					java.util.Properties config = new java.util.Properties();
					config.put("StrictHostKeyChecking", "no");												// 접속정보확인 거절
					session.setConfig(config);
					session.connect();																		// 연결
					channel = session.openChannel("sftp");

					channel.connect();																		// 접속
					sftp = (ChannelSftp) channel;															// 실사용
					sftp.rm(host.getHostPath()+"//"+row.fixParamText("file_name"));							// 삭제실행 (rm = remove)
				} catch (Exception e) {
					// TODO: handle exception
					System.out.println(e.getMessage());
				}finally{
					sftp.quit();
					session.disconnect();
				}
			}
		}
		data.param
			.table("apnd_file")
			.where("where orgn_dvcd	= :orgn_dvcd" )
			.where("and   invc_numb	= :invc_numb" )
			.where("and   line_seqn	= :line_seqn" )
			.where("and   assi_seqn	= :assi_seqn" )

			.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
			.unique("invc_numb"				, arg.fixParameter("invc_numb"))
			.unique("line_seqn"				, arg.fixParameter("line_seqn"))
			.unique("assi_seqn"				, arg.fixParameter("assi_seqn"))
		;data.attach(Action.delete);
		data.execute();
		data.clear();

		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.
		for (int i = 0; i < file.length; i++) {
			file_name.add(file[i].getFileItem().getName());
			file_size.add(file[i].getFileItem().getSize());
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				name.add(file_name.get(i));
			}else{
				name.add(file_name.get(i).substring(0,file[i].getFileItem().getName().lastIndexOf(".")));
			}
		}

		Date date = new Date();
		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt

		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";

		String imageYn;
		// 파일이 이미지일 경우
		for (int i = 0; i < file_name.size(); i++) {

			if(file_name.get(i).matches(regExp)){
				imageYn = "Y";
			}else{
				imageYn = "N";
			}
			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";
			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
				imageName = name.get(i)+now;
			}else{
				// 파일이름지정 ( 확장자는 유지 )
				imageName = name.get(i) + now + file_name.get(i).substring(file[i].getFileItem().getName().lastIndexOf("."));
							 // 파일이름, 현재시간, 파일 확장자
			}

			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// 업로드 진행
					// 이미지일 경우
					if("Y".equals(imageYn)){
						ftp.upload(directory, imageName, file[i]);		// inputstream로 저장한다 	- 이미지 그대로 저장
						System.out.println(directory);
					} else {
						ftp.upload(directory, imageName, file[i]); // 파일 자체를 올린다.
					}
					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn"))
						.unique("assi_seqn"				, arg.fixParameter("assi_seqn"))

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;data.attach(Action.modify);

					// logic 처리 ( DB등 )

				} catch(Exception ex) {
					throw ex;
				} finally {
					ftp.disconnect();
				}
			}
		}
		data.execute();
		return null;
	}
	public SqlResultMap setHomeTaxExcel(HttpRequestArgument arg) throws Exception {

		SqlResultMap map = arg.getParameter("records", SqlResultMap.class);

		ParamToJson parse = new ParamToJson();

		String json = parse.TranslateGantt(arg, map,"", "invc_numb,line_seqn");
		DataMessage data = arg.newStorage("POS");
		data.param
			.query("call home_tax_excel( :param",json)
			.query(")")
		;
		SqlResultMap result = data.selectForMap();

		File excel = new File(cont.getRealPath("/resource/sample/")+"/homeTaxExcelOrigin.xls"); 				//웹서버에 있는 양식 불러오기.

		FileInputStream inputStream = new FileInputStream(excel);													// inputstream으로 만들기
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");											// 파일명 겹치지 않게
		String file_name = format.format(new Date())+"_hometax.xls";												// 파일명
		FileOutputStream os = null;
		Workbook workbook = null;
		Sheet sheet = null;
		try {
			os = new FileOutputStream(cont.getRealPath("/resource/downloadFile/")+"/"+file_name);  // 웹서버 다운로드 파일 폴더에 임시저장
			workbook = WorkbookFactory.create(inputStream);								// workbook(excel)에 담기
			sheet = workbook.getSheetAt(0);													// sheet지정

		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			inputStream.close();
		}



		int rowCount = 5;													// row 데이터 있는 부분 마지막. sheet.getLastRowNum()쓰면 완전 마지막이라 106번째가 나옴.
		try {
			for (SqlResultRow record:result) {															// query 데이터로 수정하기.
				rowCount++;
				sheet.getRow(rowCount).getCell(0).setCellValue(record.getParamText("vatx_dvcd"			));
				sheet.getRow(rowCount).getCell(1).setCellValue(record.getParamText("invc_date"			));
				sheet.getRow(rowCount).getCell(2).setCellValue(record.getParamText("corp_buss_numb"		));
				sheet.getRow(rowCount).getCell(4).setCellValue(record.getParamText("corp_buss_name"		));
				sheet.getRow(rowCount).getCell(5).setCellValue(record.getParamText("corp_boss_name"		));
				sheet.getRow(rowCount).getCell(6).setCellValue(record.getParamText("corp_addr"			));
				sheet.getRow(rowCount).getCell(7).setCellValue(record.getParamText("corp_buss_type"		));
				sheet.getRow(rowCount).getCell(8).setCellValue(record.getParamText("corp_buss_kind"		));
				sheet.getRow(rowCount).getCell(10).setCellValue(record.getParamText("cust_buss_numb"	));
				sheet.getRow(rowCount).getCell(12).setCellValue(record.getParamText("cust_buss_name"	));
				sheet.getRow(rowCount).getCell(13).setCellValue(record.getParamText("cust_boss_name"	));
				sheet.getRow(rowCount).getCell(14).setCellValue(record.getParamText("cust_addr"			));
				sheet.getRow(rowCount).getCell(15).setCellValue(record.getParamText("cust_buss_type"	));
				sheet.getRow(rowCount).getCell(16).setCellValue(record.getParamText("cust_buss_kind"	));
				sheet.getRow(rowCount).getCell(19).setCellValue(record.getParamText("sale_amnt"			));
				sheet.getRow(rowCount).getCell(20).setCellValue(record.getParamText("vatx_amnt"			));
				sheet.getRow(rowCount).getCell(22).setCellValue(record.getParamText("to_day"			));
				sheet.getRow(rowCount).getCell(23).setCellValue(record.getParamText("prod_name"			));
				sheet.getRow(rowCount).getCell(27).setCellValue(record.getParamText("sale_amnt"			));
				sheet.getRow(rowCount).getCell(28).setCellValue(record.getParamText("vatx_amnt"			));
				sheet.getRow(rowCount).getCell(58).setCellValue(record.getParamText("rqod_rcvd_dvcd"	));
			}
		} catch (Exception e) {
			e.getStackTrace();
		}finally{
			workbook.write(os);																			//
			os.close();
		}

		SqlResultRow returnRow = new SqlResultRow();
		SqlResultMap returnMap = new SqlResultMap();

		returnRow.setParameter("file_name", file_name);						// 다운로드할때 필요한 file_name을 넣어준다.
		returnMap.add(returnRow);											// sqlResultMap 형식의 함수이므로 넣어서 return한다.

		return returnMap;
	}
}
