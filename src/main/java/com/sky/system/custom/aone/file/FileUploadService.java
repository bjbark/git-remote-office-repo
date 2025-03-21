package com.sky.system.custom.aone.file;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import net.sky.core.connection.HostProperty;
import net.sky.core.connection.ftp.FTPConnector;
import net.sky.http.dispatch.control.DefaultServiceHandler;
import net.sky.http.dispatch.service.HostPropertiesService;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFPicture;
import org.apache.poi.xssf.usermodel.XSSFPictureData;
import org.apache.poi.xssf.usermodel.XSSFShape;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.eclipse.jdt.core.dom.IPackageBinding;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.data.DataMessage;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;

@Service("custom.aone.FileUploadSerivce")
public class FileUploadService extends DefaultServiceHandler {
	@Autowired
	private HostPropertiesService property;

	/**
	 * excel에 있는 이미지 파일을 추출하여 sftp로 파일저장한다.
	 * @param HttpRequestArgument arg
	 * @param CommonsMultipartFile file
	 * @return
	 * @throws Exception
	 */
	public int setExcel(HttpRequestArgument arg,CommonsMultipartFile file,int assi_seqn) throws Exception {
		DataMessage data = arg.newStorage("POS");


		InputStream is = file.getFileItem().getInputStream();

		Workbook workBook = new XSSFWorkbook(is);
		XSSFSheet sheet = (XSSFSheet) workBook.getSheetAt(0);
		XSSFDrawing drawing = sheet.createDrawingPatriarch();

		HostProperty host = property.getProperty( arg.fixParamText("hqof_idcd")+".IMG" );

		String directory = host.getHostPath();

		String imageName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

		int i = 0 ;

		for (XSSFShape shape : drawing.getShapes()) {
			data.clear();
			if (shape instanceof XSSFPicture) {
				XSSFPicture picture = (XSSFPicture) shape;
				XSSFPictureData xssfPictureData = picture.getPictureData();
				InputStream ip = null;

				byte[] imageData = xssfPictureData.getData();

				FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
				try {
					if (ftp.connect(host)) {
						ip = new ByteArrayInputStream(imageData);
						String name = imageName+"_"+(i++)+".png";

						ftp.upload(directory, name, ip);

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

							.update("file_name"				, name							)
							.update("path_name"				, directory						)
							.update("file_ttle"				, arg.getParameter("file_ttle" ))
							.update("uper_seqn"				, arg.getParameter("uper_seqn" ))						// 파일 amnd_degr 관리
							.update("prnt_idcd"				, arg.getParameter("prnt_idcd" ))
							.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
							.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
							.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
							.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
						;data.attach(Action.modify);
						data.execute();
					}

				} catch (Exception e) {
					// TODO: handle exception
				} finally{
					if(ip != null){
						ip.close();
					}
					if(is != null){
						is.close();
					}
					ftp.disconnect();
				}
			}
		}

		return assi_seqn;
	}
	public int setPdf(HttpRequestArgument arg,CommonsMultipartFile file,int assi_seqn) throws Exception {
		DataMessage data = arg.newStorage("POS");

		InputStream is = file.getFileItem().getInputStream();

		HostProperty host = property.getProperty( arg.fixParamText("hqof_idcd")+".IMG" );
		String directory = host.getHostPath();
		String imageName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
		ByteArrayInputStream inputStream = null;
		ByteArrayOutputStream baos = null;
		BufferedImage image = null;
		PDDocument doc = null;
		try {
			if (ftp.connect(host)) {

				doc = PDDocument.load(is);
				PDFRenderer renderer = new PDFRenderer(doc);

				int numPages = doc.getNumberOfPages();

				for (int j = 0; j < numPages; j++) {
					image = renderer.renderImageWithDPI(j, 300);  // 해상도 조절 300이 좋음
					baos = new ByteArrayOutputStream();
					ImageIO.write(image, "png", baos);
					String name = imageName+"_"+(j++)+".png";

					inputStream = new ByteArrayInputStream(baos.toByteArray());

					ftp.upload(directory, name, inputStream);

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

						.update("file_name"				, name							)
						.update("path_name"				, directory						)
						.update("file_ttle"				, arg.getParameter("file_ttle" ))
						.update("uper_seqn"				, arg.getParameter("uper_seqn" ))						// 파일 amnd_degr 관리
						.update("prnt_idcd"				, arg.getParameter("prnt_idcd" ))
						.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
						.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
						.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
						.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
					;data.attach(Action.modify);
					data.execute();
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
		} finally{
			if(doc != null){
				doc.close();
			}
			if(baos != null){
				baos.close();
			}
			if(inputStream != null){
				inputStream.close();
			}
			if(is != null){
				is.close();
			}
			ftp.disconnect();
		}

		return assi_seqn;
	}
	public int setImage(HttpRequestArgument arg,CommonsMultipartFile file,int assi_seqn) throws Exception {
		DataMessage data = arg.newStorage("POS");

		InputStream is = file.getFileItem().getInputStream();

		HostProperty host = property.getProperty( arg.fixParamText("hqof_idcd")+".IMG" );
		String directory = host.getHostPath();
		
		String fileName = file.getOriginalFilename();
		int lastIndex = fileName.lastIndexOf(".");
		String fileName2 = (lastIndex == -1) ? fileName : fileName.substring(0, lastIndex);		
		
		String imageName = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());

		int i = 0 ;

		FTPConnector ftp = FTPConnector.getInstance(FTPConnector.Provider.getValue("sftp"));
		try {
			if (ftp.connect(host)) {

				String name = fileName2 + imageName+"_"+(i++)+".png";

				ftp.upload(directory, name, is);

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

					.update("file_name"				, name							)
					.update("path_name"				, directory						)
					.update("file_ttle"				, arg.getParameter("file_ttle" ))
					.update("uper_seqn"				, arg.getParameter("uper_seqn" ))						// 파일 amnd_degr 관리
					.update("prnt_idcd"				, arg.getParameter("prnt_idcd" ))						
					.update("file_dvcd_1fst"		, arg.getParameter("file_dvcd_1fst" ))
					.update("file_dvcd_2snd"		, arg.getParameter("file_dvcd_2snd" ))
					.update("file_dvcd_3trd"		, arg.getParameter("file_dvcd_3trd" ))
					.update("upld_dttm"				, new SimpleDateFormat("yyyyMMdd").format(new Date()) )
				;data.attach(Action.modify);
				data.execute();
			}

		} catch (Exception e) {
			// TODO: handle exception
		} finally{
			if(is != null){
				is.close();
			}
			ftp.disconnect();
		}

		return assi_seqn;
	}
}
