package com.sky.system.workshop.sale.order.estilist;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.imageio.ImageIO;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.http.HttpRequestArgument;
import com.sky.utils.file.UploadItem;


@Service("workshop.EstiListService")
public class EstiListService  extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;

	/**
	 */
	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_idcd				")
			.where("        , b.shet_size_dvcd  , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_dvcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo as work_memo_item         , sb2.base_name as cvst_bacd_name				")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc , t.shet_name														")
			// covr
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("        , sc.base_name as covr_colr_name        , c.shet_idcd as shet_idcd_corv  				")
			.where("        , t2.shet_name as shet_corv_name        , c.dsgn_yorn       , c.dsgn_code 				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr  									")
			.where("        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr					")
			.where("        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr					")
			.where("        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr					")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			//indx
			.where("        , d.indx_used_yorn  , d.shet_idcd as shet_idcd_indx         , d.volm_indx_qntt			")
			.where("        , t3.shet_name as shet_indx_name        , d.prnt_colr_bacd as prnt_colr_bacd_indx		")
			.where("        , sd.base_name as prnt_colr_name_indx   , d.prnt_yorn       , d.indx_yorn				")
			.where("        , d.esti_pric as esti_pric_indx         , d.esti_amnt as esti_amnt_indx					")
			.where("        , d.cofm_pric as cofm_pric_indx         , d.sply_amnt as sply_amnt_indx					")
			.where("        , d.vatx_amnt as vatx_amnt_indx         , d.ttsm_amnt as ttsm_amnt_indx					")
			.where("        , d.work_memo as work_memo_indx         , d.page_prnt_side  							")
			//proc
			.where("        , e.nocl_cotn_yorn  , e.vosh_cotn_yorn  , e.embo_yorn       , e.ngls_yorn				")
			.where("        , e.ygls_yorn       , e.bkst_yorn       , e.hole_qntt       , e.rdio_bkbd_yorn			")
			.where("        , e.mtrl_wire_yorn  , e.limp_wire_yorn  , e.bind_yorn       , e.scvr_rdio_yorn			")
			.where("        , e.scvr_open_yorn  , e.dduk_yorn       , e.flat_yorn       , e.hfbk_yorn				")
			.where("        , e.etcc_proc_amnt  , e.pric_idcd       , e.work_memo as work_memo_proc 				")
			.where("        , (  ifnull(b.esti_amnt,0)																")
			.where("           + ifnull(c.esti_amnt,0)																")
			.where("           + ifnull(d.esti_amnt,0)																")
			.where("           + ifnull(e.etcc_proc_amnt,0)															")
			.where("        ) as total																				")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_shet       t on b.shet_idcd = t.shet_idcd									")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb and b.line_seqn = c.line_seqn	")
			.where("left outer join base_mast      sc on c.prnt_colr_bacd = sc.base_idcd and sc.prnt_idcd = '3104'	")
			.where("left outer join prnt_shet      t2 on c.shet_idcd = t2.shet_idcd									")
			.where("left outer join prnt_ordr_indx  d on a.invc_numb = d.invc_numb and b.line_seqn = d.line_seqn	")
			.where("left outer join prnt_shet      t3 on d.shet_idcd = t3.shet_idcd									")
			.where("left outer join base_mast      sd on d.prnt_colr_bacd = sd.base_idcd and sd.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_proc  e on a.invc_numb = e.invc_numb and b.line_seqn = e.line_seqn	")

			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%							" , arg.getParameter("find_name"))
			.where("and    a.invc_date >= :invc_date1								" , arg.getParameter("invc_date1"))
			.where("and    a.invc_date <= :invc_date2								" , arg.getParameter("invc_date2"))
			.where("and    b.item_lcls_idcd = :lcls_idcd							" , arg.getParameter("lcls_idcd"))
			.where("and    b.item_mcls_idcd = :mcls_idcd							" , arg.getParameter("mcls_idcd"))
			.where("and    b.item_scls_idcd = :scls_idcd							" , arg.getParameter("scls_idcd"))
			.where("and    a.mmbr_idcd = :mmbr_idcd									" , arg.getParameter("mmbr_idcd"))
			.where("and    a.cofm_yorn = :cofm_yorn									" , arg.getParameter("cofm_yorn"))
			.where("and    a.line_stat = :line_stat									" , arg.getParameter("line_stat"))
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
	}
	public SqlResultMap getLookup(HttpRequestArgument arg, int page, int rows, String sort ) throws Exception {
		DataMessage data = arg.newStorage("POS");
		data.param // 집계문  입력
			.total(" select  count(1) as maxsize  ")
		;
		data.param
			.query("select *																						")
		;
		data.param
			.where("from (																							")
			.where("select    a.invc_numb       , a.invc_date       , a.regi_path_dvcd  , a.mmbr_idcd				")
			.where("        , a.cstm_idcd       , a.tele_numb       , a.mail_addr       , a.corp_idcd				")
			.where("        , a.buss_numb       , a.addr_1fst       , a.addr_2snd       , a.rcvd_dvcd				")
			.where("        , a.invc_name       , a.deli_date       , a.vatx_incl_yorn  , a.dsnt_amnt				")
			.where("        , a.acpt_stat_dvcd  , a.cofm_yorn       , a.cofm_dttm       , a.cofm_drtr_idcd			")
			.where("        , a.hdco_idcd       , a.hdco_name       , a.dvex_burd_dvcd  , a.dlvy_mthd_dvcd			")
			.where("        , a.dlvy_zpcd       , a.dlvy_addr_1fst  , a.dlvy_addr_2snd  , a.dlvy_tele_numb			")
			.where("        , a.rctr_name       , a.dlvy_memo       , a.dinv_numb       , a.dlvy_stat_dvcd			")
			.where("        , a.dlvy_date       , a.dlvy_reqt_memo  , a.camt_colt_dttm  , a.camt_iamt_amnt			")
			.where("        , a.npay_baln_amnt  , a.colt_dttm       , a.colt_drtr_idcd  , a.stot_mthd_dvcd			")
			.where("        , a.colt_acct_numb  , a.colt_amnt       , a.refn_atcl_1fst  , a.refn_atcl_2snd			")
			.where("        , a.cstm_name       , a.dlvy_exps       , u.mmbr_name									")
			//item
			.where("        , b.line_seqn       , b.item_lcls_idcd  , b.item_mcls_idcd  , b.item_scls_idcd			")
			.where("        , b.ttle            , b.prnt_colr_bacd  , b.prnt_mthd_dvcd  , b.shet_idcd				")
			.where("        , b.shet_size_dvcd  , b.horz_leng       , b.vrtl_leng       , b.page_qntt				")
			.where("        , b.colr_page_qntt  , b.volm_qntt       , b.bkbd_kind_dvcd  , b.bkbd_dirt_dvcd			")
			.where("        , b.bkbd_bind       , b.dirt_dvcd       , b.esti_pric									")
			.where("        , b.cvst_bacd       , b.covr_amnt       , b.indx_amnt									")
			.where("        , b.cofm_pric       , b.sply_amnt       , b.vatx_amnt       , b.ttsm_amnt				")
			.where("        , b.esti_amnt       , b.prod_cmpl_dttm  , b.prod_qntt       , b.colr_page_numb			")
			.where("        , b.cvst_qntt       , sb.base_name as prnt_colr_name									")
			.where("        , b.work_memo as work_memo_item         , sb2.base_name as cvst_bacd_name				")
			.where("        , case when c3.clss_name is not null then c3.clss_desc									")
			.where("               else case when c2.clss_name is not null then c2.clss_desc						")
			.where("                         else c1.clss_name														")
			.where("                    end																			")
			.where("          end  as clss_desc , t.shet_name														")
			// covr
			.where("        , c.covr_dsgn_dvcd  , c.covr_spec       , c.prnt_colr_bacd as prnt_colr_bacd_covr		")
			.where("        , sc.base_name as covr_colr_name        , c.shet_idcd as shet_idcd_corv  				")
			.where("        , t2.shet_name as shet_corv_name        , c.dsgn_yorn       , c.dsgn_code 				")
			.where("        , c.covr_wing_dvcd  , c.esti_pric as esti_pric_covr  									")
			.where("        , c.esti_amnt as esti_amnt_covr         , c.cofm_pric as cofm_pric_covr					")
			.where("        , c.sply_amnt as sply_amnt_covr         , c.vatx_amnt as vatx_amnt_covr					")
			.where("        , c.ttsm_amnt as ttsm_amnt_covr         , c.work_memo as work_memo_covr					")
			.where("        , c.fcvr_strg       , c.scvr_strg       , c.bcvr_strg									")
			//indx
			.where("        , d.indx_used_yorn  , d.shet_idcd as shet_idcd_indx         , d.volm_indx_qntt			")
			.where("        , t3.shet_name as shet_indx_name        , d.prnt_colr_bacd as prnt_colr_bacd_indx		")
			.where("        , sd.base_name as indx_colr_name        , d.prnt_yorn       , d.indx_yorn				")
			.where("        , d.esti_pric as esti_pric_indx         , d.esti_amnt as esti_amnt_indx					")
			.where("        , d.cofm_pric as cofm_pric_indx         , d.sply_amnt as sply_amnt_indx					")
			.where("        , d.vatx_amnt as vatx_amnt_indx         , d.ttsm_amnt as ttsm_amnt_indx					")
			.where("        , d.work_memo as work_memo_indx         , d.page_prnt_side  							")
			//proc
			.where("        , e.nocl_cotn_yorn  , e.vosh_cotn_yorn  , e.embo_yorn       , e.ngls_yorn				")
			.where("        , e.ygls_yorn       , e.bkst_yorn       , e.hole_qntt       , e.rdio_bkbd_yorn			")
			.where("        , e.mtrl_wire_yorn  , e.limp_wire_yorn  , e.bind_yorn       , e.scvr_rdio_yorn			")
			.where("        , e.scvr_open_yorn  , e.dduk_yorn       , e.flat_yorn       , e.hfbk_yorn				")
			.where("        , e.etcc_proc_amnt  , e.pric_idcd       , e.work_memo as work_memo_proc 														")


			.where("        , a.user_memo       , a.sysm_memo       , a.prnt_idcd       , a.line_levl				")
			.where("        , a.line_ordr       , a.line_stat       , a.line_clos       , a.find_name				")
			.where("        , a.updt_user_name  , a.updt_ipad       , a.updt_dttm       , a.updt_idcd				")
			.where("        , a.updt_urif       , a.crte_user_name  , a.crte_ipad       , a.crte_dttm				")
			.where("        , a.crte_idcd       , a.crte_urif														")

		;
		data.param
			.where("from prnt_ordr_mast a																			")
			.where("left outer join prnt_mmbr_mast  u on a.mmbr_idcd = u.mmbr_idcd									")
			.where("left outer join prnt_ordr_item  b on a.invc_numb = b.invc_numb									")
			.where("left outer join prnt_shet       t on b.shet_idcd = t.shet_idcd									")
			.where("left outer join base_mast      sb on b.prnt_colr_bacd = sb.base_idcd and sb.prnt_idcd = '3104'	")
			.where("left outer join base_mast     sb2 on b.cvst_bacd = sb2.base_idcd and sb2.prnt_idcd = '3105'		")
			.where("left outer join item_clss      c1 on b.item_lcls_idcd = c1.clss_idcd							")
			.where("left outer join item_clss      c2 on b.item_mcls_idcd = c2.clss_idcd							")
			.where("left outer join item_clss      c3 on b.item_scls_idcd = c3.clss_idcd							")
			.where("left outer join prnt_ordr_covr  c on a.invc_numb = c.invc_numb									")
			.where("left outer join base_mast      sc on c.prnt_colr_bacd = sc.base_idcd and sc.prnt_idcd = '3104'	")
			.where("left outer join prnt_shet      t2 on c.shet_idcd = t2.shet_idcd									")
			.where("left outer join prnt_ordr_indx  d on a.invc_numb = d.invc_numb									")
			.where("left outer join prnt_shet      t3 on d.shet_idcd = t3.shet_idcd									")
			.where("left outer join base_mast      sd on d.prnt_colr_bacd = sd.base_idcd and sd.prnt_idcd = '3104'	")
			.where("left outer join prnt_ordr_proc  e on a.invc_numb = e.invc_numb									")

			.where("where  1=1																						")
			.where("and    a.find_name	like %:find_name%							" , arg.getParamText("find_name"))
			.where("and    a.cofm_yorn <> '1'																		")
			.where("order by a.invc_numb ) a																		")
		;
		if (page == 0 && rows == 0){
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1), sort );
		}
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

		Date date = new Date();
		DateFormat dtfmt = new SimpleDateFormat("yyyyMMddhhmmss");
		String now = dtfmt.format(date);						// 이름 겹치지않게 하기 위한 날짜 fmt
		String regExp = "^([\\S]+(\\.(?i)(jpg||png||gif||bmp))$)";

		// 파일이 이미지일 경우
		for (int i = 0; i < file_name.size(); i++) {

			// FTPTEST 일 경우 ( 해당 DB의 ddns를 보내주면 된다. ) -> 특정 서버 정보를 가져오고자 할떄 HostProperty를 사용
			String hq = arg.getParamText("hqof_idcd");
			HostProperty host = property.getProperty( hq+".IMG" ); // 업로드 서버 정보 가져오기
			// 서버에서 기존 path를 불러온다.
			String directory = host.getHostPath(); // 업로드 경로를 지정한다.
			String imageName="";

//			imageName = arg.getParamText("drwg_numb")+"-"+arg.getParamText("revs_numb")+".png";
			imageName = arg.getParamText("file_name");

			System.out.println("************************");
			System.out.println(imageName);


			// ftp 생성
			FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
			// ftp 접속
			if (ftp.connect(host)) {
				try{
					// logic 처리 ( DB등 )
					if(file_name.get(i).matches(regExp)){
						ftp.upload(directory, imageName, file[i]);
					}else{
						PDDocument doc = PDDocument.load(file[0].getInputStream());
						PDFRenderer renderer = new PDFRenderer(doc);
						ByteArrayInputStream inputStream = null;
						BufferedImage image = renderer.renderImageWithDPI(i, 300);  // 해상도 조절 300이 좋음
						ByteArrayOutputStream baos = new ByteArrayOutputStream();
						ImageIO.write(image, "png", baos);
						inputStream = new ByteArrayInputStream(baos.toByteArray());

						ftp.upload(directory, imageName, inputStream);		// inputstream로 저장한다 	- 이미지 그대로 저장
						inputStream.close();
						baos.close();
						doc.close();
					}

					System.out.println(arg.fixParameter("orgn_dvcd"));
					System.out.println(arg.fixParameter("invc_numb"));
					System.out.println(arg.fixParameter("line_seqn"));
					System.out.println(arg.fixParameter("line_seqn"));
					System.out.println(directory);
					data.param
						.table("apnd_file")
						.where("where orgn_dvcd	= :orgn_dvcd" )
						.where("and invc_numb	= :invc_numb" )
						.where("and line_seqn	= :line_seqn" )
						.where("and assi_seqn	= :assi_seqn" )

						.unique("orgn_dvcd"				, arg.fixParameter("orgn_dvcd"))
						.unique("invc_numb"				, arg.fixParameter("invc_numb"))
						.unique("line_seqn"				, arg.fixParameter("line_seqn")	)
						.unique("assi_seqn"				, assi_seqn						)

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
}
