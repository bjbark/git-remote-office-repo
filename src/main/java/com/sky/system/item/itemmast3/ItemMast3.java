 package com.sky.system.item.itemmast3;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;
import com.sky.utils.file.UploadItem;
@Service()
@Controller
public class ItemMast3  extends DefaultControlHandler{

	@Autowired
	private ItemMast3Service service;

	@RequestMapping(value="/item/itemmast3/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/get/isos.do"  )
	public String getIsos(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIsos(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/item/itemmast3/get/rett.do"  )
	public String getRett(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRett(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/item/itemmast3/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/get/acpt.do"  )
	public String getAcpt(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAcpt(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/get/osttrett.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOsttRett(http.argument ));
		return http.writer;
	}


	// 룩업
	@RequestMapping(value="/item/itemmast3/get/product.do"  )
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/get/itemacpt.do"  )
	public String getItemAcpt(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemAcpt(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/item/itemmast3/get/itemCode.do"  )
	public String getItemCode(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemCode(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/item/itemmast3/get/itemCodeCheck.do"  )
	public String getItemCodeCheck(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemCodeCheck(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/item/itemmast3/set/record.do"  )
	public String  setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/item/itemmast3/set/simple.do"  )
	public String  setSimple(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSimple(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/item/itemmast3/set/add.do"  )
	public String  setAdd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAdd(http.argument));
		return http.writer;
	}

	// 이미지업로드
	@RequestMapping(value="/item/itemmast3/set/fileUpload.do"  )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
	}

	@RequestMapping(value="/item/itemmast3/set/copy.do"  )
	public String  setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}
}
