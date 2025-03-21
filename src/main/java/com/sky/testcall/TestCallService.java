package com.sky.testcall;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.sql.rowset.serial.SerialBlob;

import net.coobird.thumbnailator.Thumbnails;
import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.batik.transcoder.image.PNGTranscoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.baroservice.api.barobill.Tests;
import com.lowagie.text.pdf.codec.Base64.OutputStream;
import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.test.kabeja.batik.tools.SAXPNGSerializer;
import com.sky.test.kabeja.dxf.DXFDocument;
import com.sky.test.kabeja.parser.*;
import com.sky.test.kabeja.svg.SVGGenerator;
import com.sky.test.kabeja.xml.*;
import com.sky.test.kabeja.parser.Parser;
import com.sky.test.kabeja.xml.SAXSerializer;
import com.sky.utils.file.UploadItem;


@Service
public class TestCallService {
	@Autowired
	private HostPropertiesService property;

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap testCall1(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		// logic

		String hq_id = (String) arg.getParameter("hq_id");
		String stor_id = arg.getParamText("stor_id");
		logger.debug("hq_id --> " + hq_id);
		logger.debug("stor_id --> " + stor_id);
		return null;
	}
	public SqlResultMap getFileDat(HttpRequestArgument arg) throws Exception {
		// logic
		DataMessage data = arg.newStorage("POS");

		String folder = "C:/Users/ws/Desktop/temp";
		File file = new File(folder);
		if(!file.isDirectory()){
			System.out.println("없음");
		}else{
			File[] list = file.listFiles();
			for(File f : list){
				System.out.println("folder name = "+f.getName());
				String fname = f.getName();
				data.param
					.query("select cvic_idcd				")
					.where("from   wt_conv					")
					.where("where  device = :device", fname)
				;
				SqlResultMap wt_conv = data.selectForMap();
				data.clear();
				if(fname.indexOf("DB") > -1){
					File[] fl = f.listFiles();
					for (File f2 : fl) {
						int index = f2.getName().lastIndexOf(".");
						String names = f2.getName().substring(0,index);
						String file_name = names.replace("_","-");
						System.out.println("name = "+file_name);
						try {
							FileReader filereader = new FileReader(f2);
							BufferedReader bufReader = new BufferedReader(filereader);
							String line = "";
							while((line = bufReader.readLine()) != null){
								String test = line.replace("\t", ",");
								String[] arr = test.split(",");
								if(arr.length == 10){
									data.param
										.query("select ifnull(max(line_seqn)+1,1) as line_seqn				")
										.where("from   work_book_cvic										")
										.where("where  invc_numb = :invc_numb", "DW-"+arr[arr.length-2].substring(0,4))
									;
									SqlResultMap a = data.selectForMap();
									data.clear();
									System.out.println("a : "+a.get(0).getParameter("line_seqn"));
									data.param
										.table("work_book_cvic")
										.unique("invc_numb"		, "DW-"+arr[arr.length-2].substring(0,4))
										.unique("line_seqn"		, a.get(0).get("line_seqn"))

										.update("invc_date"			, file_name)
										.update("item_idcd"			, arr[arr.length-2].substring(4,10))
										.update("strt_dttm"			, arr[5].replace(":",""))
										.update("endd_dttm"			, arr[6].replace(":",""))
										.update("cvic_idcd"			, wt_conv.get(0).get("cvic_idcd"))
										.update("cvic_stat_dvcd"	, arr[0])
										.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
										.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
									;data.attach(Action.insert);
									data.execute();
									data.clear();
								}else if(arr.length>1){
									data.param
										.query("select ifnull(max(line_seqn)+1,1) as line_seqn				")
										.where("from   work_book_cvic										")
										.where("where  invc_numb = 'fragment'								")
									;
									SqlResultMap a = data.selectForMap();
									data.clear();
									System.out.println("a : "+a.get(0).getParameter("line_seqn"));
									data.param
										.table("work_book_cvic")
										.unique("invc_numb"		, "fragment")
										.unique("line_seqn"		, a.get(0).get("line_seqn"))

										.update("invc_date"			, file_name)
										.update("strt_dttm"			, arr[5].replace(":",""))
										.update("endd_dttm"			, arr[6].replace(":",""))
										.update("cvic_idcd"			, wt_conv.get(0).get("cvic_idcd"))
										.update("cvic_stat_dvcd"	, arr[0])
										.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
										.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
									;data.attach(Action.insert);
									data.execute();
									data.clear();
								}
							}
							bufReader.close();
						} catch (Exception e) {
							e.printStackTrace();
						}finally{
							try {
							} catch (Exception e2) {
							}
						}
					}
				}
			}
		}
		return null;
	}
	public SqlResultMap getFileNameTest(HttpRequestArgument arg) throws Exception {
		// logic
		DataMessage data = arg.newStorage("POS");

			String folder = "C:/Users/ws/Desktop/Item";
			File file = new File(folder);

			if(!file.isDirectory()){
				System.out.println("없음");
			}else{
				File[] list = file.listFiles();
				for(File f : list){
					int index = f.getName().lastIndexOf(".");
					String names = f.getName().substring(0,index);
					SerialBlob blob = null;
					FileInputStream inputStream = null;
					try {
						 byte[] byteArray = new byte[(int) f.length()];
						inputStream = new FileInputStream(f.getPath());
						inputStream.read(byteArray);
						blob = new javax.sql.rowset.serial.SerialBlob(byteArray);
						data.param
							.table("item_mast")
							.where("item_idcd = :item_idcd")
							.unique("id"				, names)
							.update("item_imge"			, blob)
						;data.attach(Action.update);
						data.execute();
						data.clear();
					} catch (Exception e) {
					}finally{
						try {
							if(inputStream!=null)
							inputStream.close();
						} catch (Exception e2) {
						}
					}
				}
				System.out.println(list.length);
			}
		return null;
	}

	public void testCall2() throws Exception {
		// logic
	}
	public SqlResultMap setGantt(HttpRequestArgument arg) throws Exception {
		System.out.println(arg);
		int seqn = 0;
		DataMessage data = arg.newStorage("POS");
		SqlResultMap map = arg.getParameter("tasks", SqlResultMap.class);
		data.param
			.table("gantt_chart_tasks									")
			;data.attach(Action.delete);
			data.execute();
			System.out.println("delete 완료");
		for (SqlResultRow row:map) {
				data.param
					.table("gantt_chart_tasks"                                                    )
					.where("where id       = :id												 ")
					//
					.unique("id"				, row.fixParameter("id"							 ))  //id,
					//
					.update("seqn"				, seqn++										  )  /*  순번  */
					.update("name"				, row.getParameter("name"                        ))  /*  name  */
					.update("progress"			, row.getParameter("progress"                    ))  /*  진행률  */
					.update("progressByWorklog"	, row.getParameter("progressByWorklog"           ))
					.update("relevance"			, row.getParameter("relevance"                   ))
					.update("type"				, row.getParameter("type"                        ))
					.update("typeld"			, row.getParameter("typeld"                      ))
					.update("description"		, row.getParameter("description"                 ))  /*   */
					.update("code"				, row.getParameter("code"                        ))  /*  코드  */
					.update("level"				, row.getParameter("level"                       ))  /*  들여쓰기(작업의 종속)  */
					.update("status"			, row.getParameter("status"                      ))  /*  작업의 상태  STATUS_ACTIVE, STATUS_DONE, STATUS_FAILED, STATUS_SUSPENDED, STATUS_UNDEFINED가 있으며 ganttTest.jsp에서 select 변경으로 변경도 가능 */
					.update("depends"			, row.getParameter("depends"                     ))  /*  종속관계 및 진행관계 */
					.update("start"				, row.getParameter("start"                       ))  /*  시작일  */
					.update("duration"			, row.getParameter("duration"                    ))  /*  소요기간  */
					.update("end"				, row.getParameter("end"                         ))  /*  종료일자  */
					.update("startismilestone"	, row.getParameter("startismilestone"            ))  /*    */
					.update("endismilestone"	, row.getParameter("endismilestone"              ))  /*    */
					.update("collapsed"			, row.getParameter("collapsed"                   ))  /*    */
					.update("canWrite"			, row.getParameter("canWrite"                    ))  /*    */
					.update("canAdd"			, row.getParameter("canAdd"                      ))  /*   */
					.update("canDelete"			, row.getParameter("canDelete"                   ))  /*    */
					.update("canaddlssue"		, row.getParameter("canaddlssue"                 ))  /*    */
					.update("hasChild"			, row.getParameter("hasChild"                    ))  /*    */
					.update("endTime"			, row.getParameter("endTime"                     ))  /* 시작시간 */
					.update("startTime"			, row.getParameter("startTime"                   ))  /* 종료시간 */

				;data.attach(Action.modify);

				setAssigs(arg,data,row,row.getParameter("assigs", SqlResultMap.class));

		}
	data.execute();
	return null;
	}
	public SqlResultMap setAssigs(HttpRequestArgument arg,DataMessage data,SqlResultRow mst, SqlResultMap map) throws Exception {
		data.param
			.table("gantt_chart_assigs")
			.where("where id  = :id")
			.unique("id"			, mst.fixParameter("id"					))
		;data.attach(Action.delete);
		for(SqlResultRow row:map){
				data.param
					.table("gantt_chart_assigs")
					.where("where id	= :id" )
					.where("and   resourceId	= :resourceId" )

					.unique("id"					, mst.fixParameter("id"))
					.unique("resourceId"			, row.fixParameter("resourceId"))

					.update("roleId"				, row.getParameter("roleId"))
					.update("effort"				, row.getParameter("effort"))

				;data.attach(Action.modify);
		}
		return null ;
	}

	public SqlResultMap getGantt(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param // 조회
			.query("select *																								")
		;
		data.param // 조회
			.where("from gantt_chart_tasks																					")
			.where("where   1=1																								")
			.where("order by seqn																							")
		;
		return data.selectForMap();
	}
	public SqlResultMap getAssigs(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select *																								")
		;
		data.param // 조회
			.where("from gantt_chart_assigs																					")
			.where("where   1=1																								")
		;

		return data.selectForMap();
	}
	public SqlResultMap getCvic(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
		.query("select    cvic_idcd,cvic_name		")
		;
		data.param
		.where("from cvic_mast																			")

		.where("where   1=1																				")
		.where("and     line_stat < 2																	")
		.where("order by cvic_idcd asc																	")
		;
		return data.selectForMap();

	}
	public SqlResultMap getUser(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    user_idcd,user_name		")
		;
		data.param
			.where("from user_mast																			")

			.where("where   1=1																				")
			.where("and     line_stat < 2																	")
		;
		return data.selectForMap();

	}
	public SqlResultMap getMWkct(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    wkct_idcd,wkct_name		")
		;
		data.param
			.where("from wkct_mast																			")

			.where("where   1=1																				")
			.where("and     line_stat < 2																	")
		;
		return data.selectForMap();

	}
	// TODO 도원 모바일관련된것들

	public SqlResultMap getPjod(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    pjod_idcd		")
		;
		data.param
			.where("from pjod_mast																			")

			.where("where   1=1																				")
			.where("and     line_stat < 2																	")
			.where("and     line_clos = 0																	")
			.where("order by pjod_idcd desc																	")
		;
		return data.selectForMap();

	}
	public SqlResultMap getSeqn(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    ifnull(MAX(assi_seqn),0) as assi_seqn										")
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
	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//		DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
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
		for (int i = 0; i < file_name.size(); i++) {
			System.out.println("file_name : "+file_name.get(i));
			System.out.println("file_size : "+file_size.get(i));
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
			ByteArrayInputStream thumnailInputStream = null;
			// 이미지일 경우 섬네일 과정을 거친다.
			if("Y".equals(imageYn)) {
				//  이미지 파일 사이즈 체크
//				if (file.getSize()/1024/1024 > 0) {
//					throw new ServiceException("1M 이하 파일만 사용 가능 합니다.");
//				}

				// 섬네일에 강제 사이즈 지정 후 스트림 과정
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				Thumbnails.of(file[i].getInputStream()).size(200, 200).toOutputStream(baos);
				thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
			}


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
						ftp.upload(directory, imageName, thumnailInputStream);		// inputstream로 저장한다
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
					.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
					.unique("assi_seqn"				, assi_seqn++	)

					.update("file_name"				, imageName						)
					.update("file_size"				, file_size.get(i)				)
					.update("path_name"				, directory						)
					.update("file_ttle"				, arg.getParameter("file_ttle" ))
					.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
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

	public SqlResultMap getWkct(HttpRequestArgument arg) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		data.param
			.query("select    a.wkct_idcd        , a.wkct_code   , a.wkct_name       , a.wkct_stnm				")
			.query("		, a.dept_idcd        , a.user_memo   , a.sysm_memo       , a.prnt_idcd				")
			.query("		, a.line_stat        , a.line_clos   , a.find_name       , a.updt_user_name			")
			.query("		, a.updt_ipad        , a.updt_dttm   , a.updt_idcd       , a.updt_urif				")
			.query("		, a.crte_user_name   , a.crte_ipad   , a.crte_dttm       , a.crte_idcd				")
			.query("		, a.crte_urif        , b.dept_name   , a.labo_rate_idcd  , a.rslt_rept_yorn			")
			;
		data.param //퀴리문
			.where("from	wkct_mast a																			")
			.where("		left outer join dept_mast b on a.dept_idcd = b.dept_idcd							")
			.where("		left outer join labo_rate c on a.labo_rate_idcd = c.labo_rate_idcd					")
			.where("where	1=1																					")
			.where("and		a.find_name	like %:find_name%		" , arg.getParameter("find_name"					))
			.where("and		a.wkct_idcd = :wkct_idcd			" , arg.getParameter("wkct_idcd"					))
			.where("and		a.rslt_rept_yorn = :rslt_rept_yorn	" , arg.getParameter("rslt_rept_yorn"		))
			.where("and		a.line_stat	< :line_stat		" , "2" , "".equals(arg.getParamText("line_stat")))
			.where("order by a.wkct_idcd"																		)
		;
		return data.selectForMap(); //
	}

	public SqlResultMap getTotal_Board4(HttpRequestArgument arg) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.work_schd_dvcd   , a.idcd             , a.line_seqn		")
			.where("    , a.invc_date        , a.sttm             , a.edtm             , a.wkct_idcd		")
			.where("    , a.work_item_idcd   , a.item_name        , a.item_spec        , a.modl_name		")
			.where("    , a.indn_qntt        , a.work_cont        , a.otod_yorn        , a.cvic_idcd		")
			.where("    , a.rsps_idcd        , a.ivst_pcnt        , a.need_dcnt        , a.ivst_mnhr		")
			.where("    , a.prog_stat_dvcd   , a.perf_rate        , a.befr_wkct_idcd   , a.aftr_wkct_idcd	")
			.where("    , a.remk_text        , a.uper_seqn        , a.work_ordr_dvcd						")
			.where("    , a.disp_seqn        , a.user_memo        , a.sysm_memo        , a.prnt_idcd		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , a.crte_idcd		")
			.where("    , a.crte_urif        , b.item_name as mold_name ,b.deli_date   , c.cvic_name		")
			.where("from    pjod_work_plan a																")
			.where("        left outer join pjod_mast b on a.pjod_idcd = b.pjod_idcd						")
			.where("        left outer join cvic_mast c on a.cvic_idcd = c.cvic_idcd						")
			.where("where   1=1																				")
			.where("and     a.otod_yorn = :otod_yorn" , "0"													 )
			.where("and     a.ordr_degr = (select MAX(p.ordr_degr) from pjod_work_schd p					")
			.where("                       where p.pjod_idcd = a.pjod_idcd									")
			.where("                       and   p.id = a.idcd												")
			.where("                       and   p.work_schd_dvcd = '2000'									")
			.where("                       and   p.work_ordr_dvcd = a.work_ordr_dvcd						")
			.where("                      )																	")
			.where("and     a.work_item_idcd not in (select  p.prnt_idcd 									")
			.where("                          from pjod_work_plan p											")
			.where("                          where a.pjod_idcd = p.pjod_idcd								")
			.where("                          and   a.work_ordr_dvcd = p.work_ordr_dvcd						")
			.where("                          and   a.ordr_degr = p.ordr_degr								")
			.where("                         )"											 					 )
			.where("and     b.line_clos != 1																")
			.where("and     a.prog_stat_dvcd in(0,2)														")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd")						 )
			.where("order by a.pjod_idcd ) a																")

		;
		return data.selectForMap();
	}

	public SqlResultMap getTotal_Board5(HttpRequestArgument arg ) throws Exception {

		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select																					")
			.where("      a.pjod_idcd        , a.wkct_idcd        , a.idcd             , b.line_seqn		")
			.where("    , a.invc_date        , a.name             , a.progress         , a.wker_idcd_1fst	")
			.where("    , a.wker_idcd_2snd   , a.wker_idcd_3trd   , a.item_idcd        , a.cvic_idcd		")
			.where("    , a.indn_qntt        , a.prod_qntt        , a.good_qntt        , c.item_name as it_name")
			.where("    , a.poor_qntt        , a.work_sttm        , a.work_edtm        , a.need_time		")
			.where("    , a.work_mnhr        , a.work_pcnt        , a.work_cond_1fst   , a.work_cond_2snd	")
			.where("    , a.work_cond_3trd   , a.work_cond_5fit   , a.work_cond_6six   , a.line_seqn as line_seqn2	")
			.where("    , a.work_cond_7svn   , a.work_dvcd        , a.wkct_insp_yorn   , a.crte_idcd		")
			.where("    , a.last_wkct_yorn   , a.work_para        , a.mtrl_ivst_yorn   , d.cvic_name		")
			.where("    , a.user_memo        , a.sysm_memo        , a.prnt_idcd        , a.crte_urif		")
			.where("    , a.line_stat        , a.line_clos        , a.find_name        , a.updt_user_name	")
			.where("    , a.updt_ipad        , a.updt_dttm        , a.updt_idcd        , a.updt_urif		")
			.where("    , a.crte_user_name   , a.crte_ipad        , a.crte_dttm        , b.work_cont		")
			.where("    , u.user_name        , c.item_name as mold_name                , b.ordr_degr		")
			.where("    , b.item_name        , b.prog_stat_dvcd   , b.work_ordr_dvcd   , a.work_endd_date	")
			.where("from    pjod_work_book a																")
			.where("        left outer join user_mast u on a.wker_idcd_1fst = u.user_idcd					")
			.where("        left outer join pjod_mast c on a.pjod_idcd = c.pjod_idcd						")
			.where("        left outer join pjod_work_plan b on a.pjod_idcd = b.pjod_idcd					")
			.where("        left outer join cvic_mast d on a.cvic_idcd = d.cvic_idcd						")
			.where("where   1=1																				")
			.where("and     a.wkct_idcd = :wkct_idcd" , arg.getParameter("wkct_idcd")						 )
			.where("and     b.otod_yorn = :otod_yorn" , "0"													 )
			.where("and     a.idcd = b.idcd																	")
			.where("and     b.prog_stat_dvcd = 1															")
			.where("and     a.prog_stat_dvcd = 1															")
			.where("and     a.item_idcd = b.work_item_idcd													")
			.where("and   (a.line_seqn) in (select max(a.line_seqn) from pjod_work_book a 					")
			.where("                               where a.pjod_idcd = b.pjod_idcd							")
			.where("                               and a.prog_stat_dvcd = 1									")
			.where("                               and a.item_idcd = b.work_item_idcd group by a.idcd)		")
			.where("and		a.line_stat	< :line_stat"		, "2" , "".equals(arg.getParamText("line_stat" )))
			.where("order by a.pjod_idcd ) a																")
		;
		return data.selectForMap();
	}

	public SqlResultMap getEis_Query1(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");
		data.param
		.query("call project_eis_query_1_v2(:work_ordr_dvcd)",arg.getParameter("work_ordr_dvcd"));
		;
		return data.selectForMap();
	}

	// TODO 끝

	public SqlResultMap setDXFupload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//		DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = new DataMessage(arg.getParamText("hqof_idcd")+".POS");

		CommonsMultipartFile[] file = uploadItem.getFiles(); // 이미지 파일을 가져온다.

		FileOutputStream o=new FileOutputStream("C:\\Users\\ws\\Desktop\\temp\\test.png");
		Parser dxfParser = ParserBuilder.createDefaultParser();
		dxfParser.parse(file[0].getInputStream(), "");
		DXFDocument doc = dxfParser.getDocument();

//		PNGTranscoder png = new PNGTranscoder();
//
//
//		ByteArrayOutputStream os = new ByteArrayOutputStream();

		SVGGenerator generator = new SVGGenerator();

		SAXSerializer out = new com.sky.test.kabeja.batik.tools.SAXPNGSerializer();
		out.setOutput(o);
		generator.generate(doc,out,new HashMap());
		o.close();


//		long file_size = file.getSize();						//파일크기
//		String file_name = arg.getParamText("file_name").substring(0,arg.getParamText("file_name").lastIndexOf(".")); //확장자 제외 파일이름

//		Date date = new Date();
//		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
//		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
//
//		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";
//
//		String imageYn;
//		// 파일이 이미지일 경우
//		for (int i = 0; i < file_name.size(); i++) {
//
//			if(file_name.get(i).matches(regExp)){
//				imageYn = "Y";
//			}else{
//				imageYn = "N";
//			}
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
//		        Thumbnails.of(file[i].getInputStream()).size(200, 200).toOutputStream(baos);
//		        thumnailInputStream = new ByteArrayInputStream(baos.toByteArray());
//			}
//
//
//	        // FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
//			String hq = arg.getParamText("hqof_idcd");
//			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
//			// 서버에서 기존 path를 불러온다.
//			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
//			String imageName="";
//			if(file[i].getFileItem().getName().lastIndexOf(".") == -1){
//				imageName = name.get(i)+now;
//			}else{
//				// 파일이름지정 ( 확장자는 유지 )
//				imageName = name.get(i) + now + file_name.get(i).substring(file[i].getFileItem().getName().lastIndexOf("."));
//							 // 파일이름, 현재시간, 파일 확장자
//			}
//			// ftp 생성
//			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
//
//			// ftp 접속
//			if (ftp.connect(host)) {
//				try{
//					// 업로드 진행
//					// 이미지일 경우
//					if("Y".equals(imageYn)){
//						ftp.upload(directory, imageName, thumnailInputStream);		// inputstream로 저장한다
//					} else {
//						ftp.upload(directory, imageName, file[i]); // 파일 자체를 올린다.
//					}
//					data.param
//						.table("apnd_file")
//						.where("where orgn_dvcd	= :orgn_dvcd" )
//						.where("and invc_numb	= :invc_numb" )
//						.where("and line_seqn	= :line_seqn" )
//						.where("and assi_seqn	= :assi_seqn" )
//
//						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
//						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
//						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
//						.unique("assi_seqn"				, assi_seqn++	)
//
//						.update("file_name"				, imageName						)
//						.update("file_size"				, file_size.get(i)				)
//						.update("path_name"				, directory						)
//						.update("file_ttle"				, arg.getParameter("file_ttle" ))
//						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
//						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
//					;data.attach(Action.modify);
//
//					// logic 처리 ( DB등 )
//
//			   	} catch(Exception ex) {
//					throw ex;
//				} finally {
//					ftp.disconnect();
//				}
//			}
//		}
//		data.execute();
		return map;
	}


}
