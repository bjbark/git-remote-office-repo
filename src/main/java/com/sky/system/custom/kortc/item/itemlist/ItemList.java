 package com.sky.system.custom.kortc.item.itemlist;

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


@Service("custom.kortc.ItemList")
@Controller
public class ItemList  extends DefaultControlHandler{

	@Autowired
	private ItemListService service;

	@RequestMapping(value="/custom/kortc/item/itemlist/get/search.do"  )
	public String getSearch(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getSearch(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/isos.do"  )
	public String getIsos(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getIsos(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/rett.do"  )
	public String getRett(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getRett(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookup.do"  )
	public String getLookup(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookup3.do"  )
	public String getLookup3(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookup3(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookupdehansol.do"  )
	public String getLookupDehansol(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookupDehansol(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookupdehansol2.do"  )
	public String getLookupDehansol2(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookupDehansol2(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookupspec.do"  )
	public String getLookupspec(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookupspec(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/acpt.do"  )
	public String getAcpt(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getAcpt(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/prod.do"  )
	public String getProd(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProd(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/osttrett.do"  )
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getOsttRett(http.argument ));
		return http.writer;
	}


	// 룩업
	@RequestMapping(value="/custom/kortc/item/itemlist/get/product.do"  )
	public String getProduct(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/itemacpt.do"  )
	public String getItemAcpt(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemAcpt(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/custom/kortc/item/itemlist/get/itemCode.do"  )
	public String getItemCode(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemCode(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/custom/kortc/item/itemlist/get/itemCodeCheck.do"  )
	public String getItemCodeCheck(HttpMessage http, Map<String, Object> model ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemCodeCheck(http.argument));
		return http.writer;
	}



	@RequestMapping(value="/custom/kortc/item/itemlist/get/image.do"  )
	public String  getImage(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getImage(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/record.do"  )
	public String  setRecord(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setRecord(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/simple.do"  )
	public String  setSimple(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSimple(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/add.do"  )
	public String  setAdd(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAdd(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/add_hj.do"  )
	public String  setAdd_Hj(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setAdd_Hj(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/item_memo.do"  )
	public String  setItem_Memo(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem_Memo(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/item_mngt.do"  )
	public String  setItem_Mngt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem_Mngt(http.argument));
		return http.writer;
	}
	// 이미지업로드
	@RequestMapping(value="custom/kortc/item/itemlist/set/fileUpload.do"  )
	public String setFileupload(HttpMessage http,  Map<String, Object> model, UploadItem uploadItem) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setFileupload(http.argument, uploadItem));
		return http.writer;
	}
	@RequestMapping(value="custom/kortc/item/itemlist/get/item_bolt_calc.do"  )
	public String getItem_Bolt_Calc(HttpMessage http,  Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem_Bolt_Calc(http.argument));
		return http.writer;
	}
	@RequestMapping(value="custom/kortc/item/itemlist/set/item_bolt_calc.do"  )
	public String setItem_Bolt_Calc(HttpMessage http,  Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem_Bolt_Calc(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlistget/itemdesc.do"  )
	public String getItemDesc(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItemDesc(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/item_memo.do"  )
	public String getItem_Memo(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem_Memo(http.argument, page, rows, sort ));
		return http.writer;
	}

	@RequestMapping(value="/custom/kortc/item/itemlist/get/item_mngt.do"  )
	public String getItem_Mngt(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem_Mngt(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/item_pkge.do"  )
	public String getItem_Pkge(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getItem_Pkge(http.argument, page, rows, sort ));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/item_pkge.do"  )
	public String  setItem_Pkge(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setItem_Pkge(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/pckg_bacd.do"  )
	public String getPckg_Bacd(HttpMessage http, Map<String, Object> model,
		@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
		@RequestParam(value="limit", required=true, defaultValue="10") int rows,
		@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort ) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getPckg_Bacd(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/set/copy.do"  )
	public String  setCopy(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setCopy(http.argument));
		return http.writer;
	}
	@RequestMapping(value="/custom/kortc/item/itemlist/get/lookupnbolt.do"  )
	public String getLookupNbolt(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getLookupNbolt(http.argument));
		return http.writer;
	}




}
