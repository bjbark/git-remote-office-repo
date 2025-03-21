package com.sky.system.custom.aone.file;

import java.io.File;
import java.io.InputStream;
import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;

@Service("custom.aone.FileUpload")
@Controller
public class FileUpload extends DefaultControlHandler {

	@Autowired
	private FileUploadService service;

	/** master 조회
	 *
	 * @param page
	 * @param rows
	 * @param http
	 * @param response
	 * @throws Exception */
	@RequestMapping(value = "/custom/aone/fileupload/set/upload1.do")
	public String getSearch(HttpMessage http, Map<String, Object> model, UploadItem files) throws Exception {
		CommonsMultipartFile[] file = files.getFiles();
		int assi_seqn = 1;
		if(!http.argument.getParamText("assi_seqn").equals("")){
			assi_seqn = Integer.parseInt(http.argument.getParamText("assi_seqn"));
		}
		for (CommonsMultipartFile f : file) {
			String file_name = f.getOriginalFilename();
			if (file_name != null) {
				String fileExtension = file_name.substring(file_name.lastIndexOf(".")).toLowerCase();
				if (fileExtension.equals(".jpg") || fileExtension.equals(".png") || fileExtension.equals(".gif") || fileExtension.equals(".jpeg")) {
					// 이미지일 경우
					model.put(HttpResponseMessage.RECORDS, (assi_seqn = service.setImage(http.argument,f,assi_seqn++)));
				} else if(fileExtension.equals(".xlsx") || fileExtension.equals(".xlsm")|| fileExtension.equals(".xls")){
					// 엑셀일 경우
					model.put(HttpResponseMessage.RECORDS, (assi_seqn = service.setExcel(http.argument,f,assi_seqn++)));
				} else if(fileExtension.equals(".pdf")){
					// pdf일 경우
					model.put(HttpResponseMessage.RECORDS, (assi_seqn = service.setPdf(http.argument,f,assi_seqn++)));
				}
			}
		}
		return http.writer;
	}

}
