package com.sky.system.custom.kortc.qc.insp.inspentry;

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


@Service("kortc.InspEntryService")
public class InspEntryService {


	@Autowired
	private HostPropertiesService property;

	Logger logger = org.apache.log4j.Logger.getLogger(this.getClass());

	/**
	 * 리스트
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 														")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select    a.invc_date       , a.bzpl_idcd    , a.istt_wrhs_idcd							")
			.where("        , a.coun_iout_dvcd , a.cstm_idcd       , a.drtr_idcd    , a.dept_idcd			")
			.where("        , b.istt_qntt      , a.vatx_incl_yorn 											")
			.where("        , a.krwn_pric      , a.krwn_amnt												")
			.where("        , a.krwn_vatx      , a.krwn_amnt_totl  , a.remk_text    , a.expr_date			")
			.where("        , b.make_cmpy_name , b.make_date       , b.rtil_ddln    , a.publ_date			")
			.where("        , c.cstm_code      , c.cstm_name       , w.wrhs_name    as istt_wrhs_name		")
			.where("        , u.user_name as drtr_name             , b.orig_seqn    , b.orig_invc_numb		")
			.where("        , b.line_seqn      , b.item_idcd       , b.istt_pric    , b.orig_amnd_degr		")
			.where("        , b.user_memo      , b.sysm_memo       , b.prnt_idcd    , b.line_levl			")
			.where("        , b.line_ordr      , b.line_stat       , b.line_clos    , b.find_name			")
			.where("        , i.item_code      , i.item_name       , i.item_spec    , un.unit_name			")
			.where("        , b.invc_numb as invc_numb2														")
			.where("        , (select base_name from base_mast r4  where  r4.base_code	= json_value(i.json_data,'$.crty_bacd')   and r4.prnt_idcd = '9001' and line_stat = 0 limit 1) crty_bacd_name	")
			.where("        , sp.poor_qntt     , sp.poor_rate      , sp.pass_yorn							")
			.where("from purc_istt_item b																	")
			.where("left outer join purc_istt_mast a on a.invc_numb      = b.invc_numb						")
			.where("left outer join cstm_mast c      on b.cstm_idcd      = c.cstm_idcd						")
			.where("left outer join wrhs_mast w      on b.istt_wrhs_idcd = w.wrhs_idcd						")
			.where("left outer join user_mast u      on a.drtr_idcd      = u.user_idcd						")
			.where("left outer join item_mast i      on b.item_idcd      = i.item_idcd						")
			.where("left outer join unit_mast un     on i.unit_idcd      = un.unit_idcd						")
			.where("left outer join insp_mast sp     on b.invc_numb      = sp.invc_orgn and b.line_seqn = sp.invc_orgn_seqn	")
			.where("where   1=1																				")
			.where("and     sp.invc_orgn is null   														")
			.where("and     sp.invc_orgn_seqn is null   												")
			.where("and     i.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     a.invc_date >= :invc_date1     " , arg.getParamText("invc_date1" ))
			.where("and     a.invc_date <= :invc_date2     " , arg.getParamText("invc_date2" ))
			.where("and     b.orig_invc_numb  = :invc_numb1" , arg.getParamText("invc_numb1" ))
			.where("and     b.item_idcd  = :item_idcd      " , arg.getParamText("item_idcd"  ))
			.where("and     b.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_date desc limit 99999999999												")
			.where(") a																						")
		;

		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	// 조회
		public SqlResultMap getMrb(HttpRequestArgument arg , int page, int rows, String sort) throws Exception {

			DataMessage data = arg.newStorage("POS");

			data.param
				.total("select count(1) as maxsize  " )
			;
			data.param
				.query("select *																							")
			;
			data.param
				.where("from (																								")
				.where("select  a.invc_date      , u.user_name      , d.dept_name											")
				.where("      , a.user_memo      , a.sysm_memo      , a.prnt_idcd											")
				.where("      , a.line_levl      , a.line_ordr      , a.line_stat      , a.line_clos      , a.find_name		")
				.where("      , a.updt_user_name , a.updt_ipad      , a.updt_dttm      , a.updt_idcd      , a.updt_urif		")
				.where("      , a.crte_user_name , a.crte_ipad      , a.crte_dttm      , a.crte_idcd      , a.crte_urif		")
				.where("from    insp_drtr a																					")
				.where("left  outer join user_mast u on a.user_idcd = u.user_idcd											")
				.where("left  outer join dept_mast d on u.dept_idcd = d.dept_idcd											")
				.where("where   1=1																							")
				.where("and     a.invc_numb   = :invc_numb       " , arg.getParamText("invc_numb") )
				.where("and     a.line_stat   < :line_stat       " , "2" , "".equals(arg.getParamText("line_stat" )) )
				.where("order by a.invc_numb																				")
				.where(") a																									")

			;
			if (page == 0 && rows == 0 ) {
				return data.selectForMap(sort);
			} else {
				return data.selectForMap(page, rows, (page==1),sort);
			}
		}

	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {

		DataMessage data = arg.newStorage("POS");

		data.param
			.total("select count(1) as maxsize		 														")
		;
		data.param
			.query("select *																				")
		;
		data.param
			.where("from (																					")
			.where("select    a.insp_date      , a.lott_numb       , a.pass_yorn      , a.istt_qntt			")
			.where("        , a.poor_qntt      , a.poor_rate       , w.wkct_name      , a.remk_text			")
			.where("        , a.poor_cont      , a.incn_caus       , a.proc_rslt							")
			.where("        , a.proc_date      , a.proc_cnfm_date  , a.fitg_yorn      , p.item_name			")
			.where("        , p.item_code      , p.cstm_name       , p.crty_bacd_name						")
			.where("        , a.user_memo      , a.sysm_memo       , a.prnt_idcd      , a.line_levl			")
			.where("        , a.line_ordr      , a.line_stat       , a.line_clos      , a.find_name			")
			.where("        , a.invc_numb      , p.invc_date												")
			.where("        , if(a.proc_schm = '1000', '1', '0') as optn_1									")
			.where("        , if(a.proc_schm = '2000', '1', '0') as optn_2									")
			.where("        , if(a.proc_schm = '3000', '1', '0') as optn_3									")
			.where("        , if(a.proc_schm = '4000', '1', '0') as optn_4								 	")
			.where("        , if(a.proc_schm = '5000', '1', '0') as optn_5									")
			.where("        , if(a.proc_schm = '6000', '1', '0') as optn_6									")
			.where("        , if(a.proc_schm = '7000', '1', '0') as optn_7									")
			.where("        , if(a.fitg_yorn = '1', '1', '0') as use_yorn									")
			.where("        , if(a.fitg_yorn = '0', '1', '0') as nuse_yorn									")
			.where("from insp_mast a																		")
			.where("left outer join wkct_mast w on a.wkct_idcd = w.wkct_idcd 								")
			.where("left outer join dept_mast d on a.dept_idcd = d.dept_idcd								")
			.where("left outer join (select  a.invc_numb , a.line_seqn , i.item_name						")
			.where("                       , i.item_code , c.cstm_name , p.invc_date						")
			.where("                       , (select base_name from base_mast r4  where  r4.base_code = json_value(i.json_data,'$.crty_bacd')   and r4.prnt_idcd = '9001'	")
			.where("                          and line_stat = 0 limit 1) crty_bacd_name						")
			.where("                 from purc_istt_item a													")
			.where("                 left outer join purc_istt_mast p on a.invc_numb = p.invc_numb			")
			.where("                 left outer join item_mast      i on a.item_idcd = i.item_idcd			")
			.where("                 left outer join cstm_mast      c on a.cstm_idcd = c.cstm_idcd			")
			.where("                 ) p on a.invc_orgn = p.invc_numb and a.invc_orgn_seqn = p.line_seqn	")
			.where("where   1=1																				")
			.where("and     a.find_name like %:find_name%  " , arg.getParamText("find_name"  ))
			.where("and     b.line_stat  = :line_stat      " , arg.getParamText("line_stat"  ) , !"".equals(arg.getParamText("line_stat" )))
			.where("order by a.invc_numb desc limit 99999999999												")
			.where(") a																						")
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

				data.param
					.table("insp_mast"														)
					.where("where invc_numb = :invc_numb									")  /*  사업장ID  */
					//
					.unique("invc_numb"			, row.fixParameter("invc_numb"				))  /*  INVOICE번호  */
					//
					.update("insp_date"			, row.getParameter("insp_date"				))  /*  검사일자  */
					.update("lott_numb"			, row.getParameter("lott_numb"				))  /*  lot번호  */
					.update("invc_orgn"			, row.getParameter("invc_numb2"				))  /*  invoice번호  */
					.update("invc_orgn_seqn"	, row.getParameter("line_seqn"				))  /*  invoice순번  */
					.update("pass_yorn"			, row.getParameter("pass_yorn"				))  /*  합격여부  */
					.update("istt_qntt"			, row.getParameter("istt_qntt"				))  /*  입고수량  */
					.update("poor_qntt"			, row.getParameter("poor_qntt"				))  /*  불량수량  */
					.update("poor_rate" 		, row.getParameter("poor_rate"				))  /*  블량율  */
					.update("wkct_idcd"			, row.getParameter("wkct_idcd"				))  /*  공정id  */
					.update("remk_text"			, row.getParameter("remk_text"				))  /*  비고  */
					.update("poor_cont"			, row.getParameter("poor_cont"				))  /*  불량내용 */
					.update("incn_caus"			, row.getParameter("incn_caus"				))  /*  부적합원인 */
					.update("proc_schm"			, row.getParameter("proc_schm"				))  /*  처리방안 */
					.update("proc_rslt"			, row.getParameter("proc_rslt"				))  /*  처리결과 */
					.update("dept_idcd"			, row.getParameter("dept_idcd"				))  /*  부서id */
					.update("proc_date"			, row.getParameter("proc_date"				))  /*  처리일자 */
					.update("proc_cnfm_date"	, row.getParameter("proc_cnfm_date"			))  /*  처리확인일자 */
					.update("fitg_yorn"			, row.getParameter("fitg_yorn"				))  /*  적합여부  */

					.update("user_memo"			, row.getParameter("user_memo"            ))  /*  사용자메모  */
					.update("sysm_memo"			, row.getParameter("sysm_memo"            ))  /*  시스템메모  */
					.update("prnt_idcd"			, row.getParameter("prnt_idcd"            ))  /*  상위 ID  */
					.update("line_levl"			, row.getParameter("line_levl"            ))  /*  ROW레벨  */
					.update("line_ordr"			, row.getParameter("line_ordr"            ))  /*  ROW순서  */
					.update("line_stat"			, row.getParameter("line_stat"            ))  /*  ROW상태  */
					.update("line_clos"			, row.getParameter("line_clos"            ))  /*  마감여부  */
					.update("find_name"			, row.getParamText("item_name"            ).trim()
												+ " "
												+ row.getParamText("item_spec"            ).trim())
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
				data.attach(Action.modify);

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
				.table("insp_mast")
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
