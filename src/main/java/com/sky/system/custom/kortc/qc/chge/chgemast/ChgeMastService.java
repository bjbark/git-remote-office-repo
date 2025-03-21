package com.sky.system.custom.kortc.qc.chge.chgemast;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.imageio.ImageIO;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.core.exception.ServiceException;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.log4j.Logger;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.jsoup.select.Evaluator.IsEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;


@Service
public class ChgeMastService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		if(arg.getParameter("4mdv_1fst")!=null){arg.setParameter("4mdv_1fst", '1');}
		if(arg.getParameter("4mdv_2snd")!=null){arg.setParameter("4mdv_2snd", '1');}
		if(arg.getParameter("4mdv_3trd")!=null){arg.setParameter("4mdv_3trd", '1');}
		if(arg.getParameter("4mdv_4frt")!=null){arg.setParameter("4mdv_4frt", '1');}

		data.param
			.total("select count(1) as maxsize		 														")
		;
		data.param
			.query("select *																					")
		;
		data.param
			.where("from (																						")
			.where("select    a.invc_numb       , a.rcpt_date    	, a.cstm_idcd	  	, a.cstm_name			")
			.where("        , a.item_idcd		, a.item_code    	, a.item_name    	, a.crty_bacd			")
			.where("        , a.isir_sbmt_date	, a.isir_apvl_date  , a.fart_adpt_date  , a.fart_dlvy_date		")
			.where("        , a.fart_prod_lott	, a.remk_text													")
			.where(" 		, a.mvfr_lott_1fst  , a.chek_yorn_2snd  , a.mvfr_lott_3trd							")
			.where(" 		, a.chek_yorn_1fst  , a.mvfr_lott_2snd  , a.chek_yorn_3trd							")
			.where(" 		, a.4mdv_1fst 		, a.4mdv_2snd  		, a.4mdv_3trd  , a.4mdv_4frt				")
			.where("        , a.chge_resn		, a.user_memo  		, a.sysm_memo  		, a.prnt_idcd			")
			.where("		, b.upld_dttm		, b.assi_seqn		, b.file_name								")
			/*.where("        , REPLACE(a.mvfr_lott_1fst, '1', '●') as mvfr_lott_1fst								")*/
			//.where("		, (select base_name from base_mast r4  where  r4.base_code	= json_value(i.json_data,'$.crty_bacd')   and r4.prnt_idcd = '9001' and line_stat = 0 limit 1) crty_bacd_name	")
			.where("from chge_mast a																			")
			.where("left outer join apnd_file b on a.invc_numb = b.invc_numb	and	 b.orgn_dvcd = 'chge_mast'	and 	b.assi_seqn = 1")
			.where("where   1=1																					")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name")					)
			.where("and     a.rcpt_date >= :rcpt_date1     " , arg.getParamText("rcpt_date1")					)
			.where("and     a.rcpt_date <= :rcpt_date2     " , arg.getParamText("rcpt_date2")					)
			.where("and     a.item_code like %:item_code%  " , arg.getParamText("item_code")					)
			.where("and     a.cstm_name like %:cstm_name%  " , arg.getParamText("cstm_name")					)
			.where("and		a.4mdv_1fst	 = :4mdv_1fst	   " , arg.getParamText("4mdv_1fst")					)
			.where("and		a.4mdv_2snd	 = :4mdv_2snd	   " , arg.getParamText("4mdv_2snd")					)
			.where("and		a.4mdv_3trd	 = :4mdv_3trd	   " , arg.getParamText("4mdv_3trd")					)
			.where("and		a.4mdv_4frt	 = :4mdv_4frt	   " , arg.getParamText("4mdv_4frt")					)
			.where("and     a.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.rcpt_date desc limit 99999999999													")
			.where(") a																							")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap setRecord(HttpRequestArgument arg) throws Exception {
		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if(("on".equals(row.getParameter("4mdv_1fst")))){row.setParameter("4mdv_1fst", "1");}else{row.setParameter("4mdv_1fst", "");}
			if(("on".equals(row.getParameter("4mdv_2snd")))){row.setParameter("4mdv_2snd", "1");}else{row.setParameter("4mdv_2snd", "");}
			if(("on".equals(row.getParameter("4mdv_3trd")))){row.setParameter("4mdv_3trd", "1");}else{row.setParameter("4mdv_3trd", "");}
			if(("on".equals(row.getParameter("4mdv_4frt")))){row.setParameter("4mdv_4frt", "1");}else{row.setParameter("4mdv_4frt", "");}
			if(("on".equals(row.getParameter("mvfr_lott_1fst")))){row.setParameter("mvfr_lott_1fst", "1");}else{row.setParameter("mvfr_lott_1fst", "");}
			if(("on".equals(row.getParameter("mvfr_lott_2snd")))){row.setParameter("mvfr_lott_2snd", "1");}else{row.setParameter("mvfr_lott_2snd", "");}
			if(("on".equals(row.getParameter("mvfr_lott_3trd")))){row.setParameter("mvfr_lott_3trd", "1");}else{row.setParameter("mvfr_lott_3trd", "");}
			if(("on".equals(row.getParameter("chek_yorn_1fst")))){row.setParameter("chek_yorn_1fst", "1");}else{row.setParameter("chek_yorn_1fst", "");}
			if(("on".equals(row.getParameter("chek_yorn_2snd")))){row.setParameter("chek_yorn_2snd", "1");}else{row.setParameter("chek_yorn_2snd", "");}
			if(("on".equals(row.getParameter("chek_yorn_3trd")))){row.setParameter("chek_yorn_3trd", "1");}else{row.setParameter("chek_yorn_3trd", "");}

			data.param
				.table("chge_mast"														)
				.where("where invc_numb = :invc_numb									")  /*  사업장ID  */
				//
				.unique("invc_numb"			, row.fixParameter("invc_numb"				))  /*  INVOICE번호  */
				//
				.update("rcpt_date"			, row.getParameter("rcpt_date"				))  /*  검사일자  */
				.update("cstm_idcd"			, row.getParameter("cstm_idcd"				))  /*  lot번호  */
				.update("cstm_name"			, row.getParameter("cstm_name"				))  /*  invoice번호  */
				.update("item_idcd"			, row.getParameter("item_idcd"				))  /*  invoice순번  */
				.update("item_code"			, row.getParameter("item_code"				))  /*  합격여부  */
				.update("item_name"			, row.getParameter("item_name"				))  /*  입고수량  */
				.update("crty_bacd"			, row.getParameter("crty_bacd"				))  /*  불량수량  */
				.update("isir_sbmt_date" 	, row.getParameter("isir_sbmt_date"			))  /*  블량율  */
				.update("isir_apvl_date"	, row.getParameter("isir_apvl_date"			))  /*  공정id  */
				.update("fart_adpt_date"	, row.getParameter("fart_adpt_date"			))  /*  비고  */
				.update("fart_dlvy_date"	, row.getParameter("fart_dlvy_date"			))  /*  불량내용 */
				.update("fart_prod_lott"	, row.getParameter("fart_prod_lott"			))  /*  부적합원인 */
				.update("mvfr_lott_1fst"	, row.getParameter("mvfr_lott_1fst"			))  /*  처리방안 */
				.update("mvfr_lott_2snd"	, row.getParameter("mvfr_lott_2snd"			))  /*  처리결과 */
				.update("mvfr_lott_3trd"	, row.getParameter("mvfr_lott_3trd"			))  /*  부서id */
				.update("chek_yorn_1fst"	, row.getParameter("chek_yorn_1fst"			))  /*  처리일자 */
				.update("chek_yorn_2snd"	, row.getParameter("chek_yorn_2snd"			))  /*  처리확인일자 */
				.update("chek_yorn_3trd"	, row.getParameter("chek_yorn_3trd"			))  /*  적합여부  */
				.update("remk_text"			, row.getParameter("remk_text"				))  /*  적합여부  */
				.update("chge_resn"			, row.getParameter("chge_resn"				))  /*  적합여부  */
				.update("4mdv_1fst"			, row.getParameter("4mdv_1fst"				))  /*  적합여부  */
				.update("4mdv_2snd"			, row.getParameter("4mdv_2snd"				))  /*  적합여부  */
				.update("4mdv_3trd"			, row.getParameter("4mdv_3trd"				))  /*  적합여부  */
				.update("4mdv_4frt"			, row.getParameter("4mdv_4frt"				))  /*  적합여부  */

				.update("user_memo"			, row.getParameter("user_memo"            ))  /*  사용자메모  */
				.update("sysm_memo"			, row.getParameter("sysm_memo"            ))  /*  시스템메모  */
				.update("prnt_idcd"			, row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
				.update("line_levl"			, row.getParameter("line_levl"            ))  /*  ROW레벨  */
				.update("line_ordr"			, row.getParameter("line_ordr"            ))  /*  ROW순서  */
				.update("line_stat"			, row.getParameter("line_stat"            ))  /*  ROW상태  */
				.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */
				.update("find_name"			, row.getParamText("cstm_name"            ).trim()
											+ " "
											+ row.getParamText("item_name"            ).trim())
				.update("updt_user_name"	, row.getParameter("updt_user_name"       ))  /*  수정사용자명  */
				.update("updt_ipad"			, row.getParameter("updt_ipad"            ))  /*  수정IP  */
				.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
				.update("updt_idcd"			, row.getParameter("updt_idcd"            ))  /*  수정ID  */
				.update("updt_urif"			, row.getParameter("updt_urif"            ))  /*  수정UI  */
				.insert("crte_user_name"	, row.getParameter("crte_user_name"       ))  /*  생성사 자명  */
				.insert("crte_ipad"			, row.getParameter("crte_ipad"            ))  /*  생성IP  */
				.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
				.insert("crte_idcd"			, row.getParameter("crte_idcd"            ))  /*  생성ID  */
				.insert("crte_urif"			, row.getParameter("crte_urif"            ))  /*  생성UI  */
			;
			data.attach(rowaction);
		}
		data.execute();
		return null ;
	}

	public SqlResultMap setMrb(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			if (rowaction == Action.delete) {
				data.param
					.table("insp_drtr"													)
					.where("where invc_numb		= :invc_numb							")  /*  거래처ID  */
					.where("and   user_idcd		= :user_idcd							")  /*  순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("user_idcd"			, row.fixParameter("user_idcd"			))

				;data.attach(Action.delete);

			} else {
				data.param
					.table("insp_drtr"													)
					.where("where invc_numb		= :invc_numb							")  /*  거래처ID  */
					.where("and   user_idcd		= :user_idcd							")  /*  순번  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"			))
					.unique("user_idcd"			, row.fixParameter("user_idcd"			))
					//
					.update("invc_date"			, row.getParameter("invc_date"           ))  /*  일자  */
					.update("user_memo"			, row.getParameter("user_memo"           ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"           ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"           ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"           ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"           ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"           ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"           ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("cstm_idcd"				).trim()
												+ " "
												+ row.getParamText("drtr_name"				).trim()
												+ " "
												+ row.getParamText("dept_name"				).trim()
												+ " "
												+ row.getParamText("tele_numb"				).trim())
					.update("updt_user_name"	, row.getParameter("updt_user_name"        ))  /*  수정사용자명  */
					.update("updt_ipad"			, row.getParameter("updt_ipad"             ))  /*  수정IP  */
					.update("updt_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  수정일시  */
					.update("updt_idcd"			, row.getParameter("updt_idcd"             ))  /*  수정ID  */
					.update("updt_urif"			, row.getParameter("updt_urif"             ))  /*  수정UI  */
					.insert("crte_user_name"	, row.getParameter("crte_user_name"        ))  /*  생성사용자명  */
					.insert("crte_ipad"			, row.getParameter("crte_ipad"             ))  /*  생성IP  */
					.insert("crte_dttm"			, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )  /*  생성일시  */
					.insert("crte_idcd"			, row.getParameter("crte_idcd"             ))  /*  생성ID  */
					.insert("crte_urif"			, row.getParameter("crte_urif"             ))  /*  생성UI  */
				;
				data.attach(rowaction);
			}
		}
		data.execute();
		return null ;
	}

	// filesearch
	public SqlResultMap getFileSearch(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param
			.total("select count(1) as maxsize  " )
		;
		data.param
			.query("select    a.orgn_dvcd       , a.invc_numb      , a.line_seqn        , a.assi_seqn			")
			.query("		, a.path_name       , a.file_name      , a.file_size        , a.upld_dttm			")
			.query("		, a.remk_text       , a.uper_seqn      , a.disp_seqn								")
		;
		data.param //퀴리문
			.where("from		apnd_file a																		")
			.where("where		1=1																				")
			.where("and			a.invc_numb = :invc_numb" 			, arg.getParameter("invc_numb"				))
			.where("and			a.orgn_dvcd = :orgn_dvcd"			, "chge_mast"								)	// 받아서 처리해야함
			.where("order by	a.line_seqn																		")
		;
		if (page == 0 && rows == 0 ) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	public SqlResultMap upload(HttpRequestArgument arg, UploadItem uploadItem) throws Exception {
		SqlResultMap map = new SqlResultMap();
//			DataMessage data = new DataMessage("NETHOSTING");  //ctrl DB접속할때 쓰임
		DataMessage data = arg.newStorage("POS");
		ArrayList<String> file_name = new ArrayList<String>();
		ArrayList<String> name = new ArrayList<String>();
		ArrayList<Long> file_size = new ArrayList<Long>();
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

//		Date date = new Date();
//		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
//		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
		String regExp = "^([\\S]+(\\.(?i)(jpeg||jpg||png||gif||bmp))$)";
		int assi_seqn = Integer.parseInt(arg.fixParamText("assi_seqn"));

		for (int i = 0; i < file_name.size(); i++) {

			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";

//				imageName = arg.getParamText("drwg_numb")+"-"+arg.getParamText("revs_numb")+".png";
			imageName = arg.fixParamText("invc_numb")+'-'+arg.fixParamText("line_seqn")+"_"+(assi_seqn)+".png";
			System.out.println("************************");
			System.out.println(imageName);


			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// logic 처리 ( DB등 )
					System.out.println(file_name.get(i));
					System.out.println(file_name.get(i).matches(regExp));
					if(file_name.get(i).matches(regExp)){
						ftp.upload(directory, imageName, file[i]);
					}else{
						PDDocument doc = PDDocument.load(file[i].getInputStream());
						PDFRenderer renderer = new PDFRenderer(doc);
						ByteArrayInputStream inputStream = null;
						BufferedImage image = renderer.renderImageWithDPI(0, 300);  // 해상도 조절 300이 좋음
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(image, "png", baos);
						inputStream = new ByteArrayInputStream(baos.toByteArray());

						ftp.upload(directory, imageName, inputStream);		// inputstream로 저장한다 	- 이미지 그대로 저장
						inputStream.close();
						baos.close();
						doc.close();
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
						.unique("assi_seqn"				, assi_seqn++					)

						.update("file_name"				, imageName						)
						.update("file_size"				, file_size.get(i)				)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;
					data.attach(Action.modify);
					data.execute();
					data.clear();

					data.param
						.table("acpt_imeg")
						.where("where invc_numb = :invc_numb" )
						.where("and   line_seqn = :line_seqn" )
						.unique("invc_numb"            , arg.fixParameter("invc_numb"))
						.unique("line_seqn"            , arg.fixParameter("line_seqn"))
						.update("remk_text", imageName)
					;
					data.attach(Action.modify);
					data.execute();
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

	//삭제
	public SqlResultMap setDel_yn(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.table("chge_mast")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.delete);
		data.execute();

		data.param
			.table("insp_drtr")
			.where("where invc_numb = :invc_numb ")

			.unique("invc_numb"		, arg.fixParameter("invc_numb"))
			.update("updt_ipad"		, arg.remoteAddress)
			.update("updt_dttm"		, new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) )
		;
		data.attach(Action.delete);
		data.execute();


		return null;
	}
}
