package com.sky.system.qc.insp.inspentry6;

import java.util.Map;

import net.sky.http.dispatch.control.DefaultControlHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpResponseMessage;

@Controller
public class InspEntry6 extends DefaultControlHandler{

	@Autowired
	private InspEntry6Service service;

	@RequestMapping(value="/qc/insp/inspentry6/get/master.do"  )
	public String getMaster( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getMaster(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry6/get/lister1.do"  )
	public String getLister1( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLister1(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry6/get/lister2.do"  )
	public String getLister2( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLister2(http.argument, page, rows, sort));
		return http.writer;
	}

	@RequestMapping(value="/qc/insp/inspentry6/get/lister3.do"  )
	public String getLister3( HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="100") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {

		model.put(HttpResponseMessage.RECORDS, service.getLister3(http.argument, page, rows, sort));
		return http.writer;
	}




	//공정검사 최종검사 출고검사 재작업 지시
	@RequestMapping(value="/qc/insp/inspentry6/set/repror.do"  )
	public String setRepror( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setRepror(http.argument ));
	return http.writer;
	}

	//공정검사 폐기
	@RequestMapping(value="/qc/insp/inspentry6/set/drop1.do"  )
	public String setDrop1( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDrop1(http.argument ));
	return http.writer;
	}

	//최종검사 폐기
	@RequestMapping(value="/qc/insp/inspentry6/set/drop2.do"  )
	public String setDrop2( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDrop2(http.argument ));
	return http.writer;
	}

	//출고검사 폐기
	@RequestMapping(value="/qc/insp/inspentry6/set/drop3.do"  )
	public String setDrop3( HttpMessage http, Map<String, Object> model) throws Exception {
			model.put(HttpResponseMessage.RECORDS, service.setDrop3(http.argument ));
	return http.writer;
	}
	//수입검사 업체반품
	@RequestMapping(value="/qc/insp/inspentry6/set/return.do"  )
	public String setReturn(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReturn(http.argument ));
		return http.writer;
	}

	//공정검사 반품
	@RequestMapping(value="/qc/insp/inspentry6/set/return1.do")
	public String setReturn1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReturn1(http.argument));
		return http.writer;
	}
	//최종반품
	@RequestMapping(value="/qc/insp/inspentry6/set/return2.do")
	public String setReturn2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReturn2(http.argument));
		return http.writer;
	}
	//출고반품
	@RequestMapping(value="/qc/insp/inspentry6/set/return3.do")
	public String setReturn3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setReturn3(http.argument));
		return http.writer;
	}

	//불량폐기
	@RequestMapping(value="/qc/insp/inspentry6/set/dsse.do"  )
	public String setDsse(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setDsse(http.argument ));
		return http.writer;
	}

	//공정검사 특채
	@RequestMapping(value="/qc/insp/inspentry6/set/special1.do")
	public String setSpecial1(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSpecial1(http.argument));
		return http.writer;
	}
	//최종검사 특채
	@RequestMapping(value="/qc/insp/inspentry6/set/special2.do")
	public String setSpecial2(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSpecial2(http.argument));
		return http.writer;
	}
	//출고검사 특채
	@RequestMapping(value="/qc/insp/inspentry6/set/special3.do")
	public String setSpecial3(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setSpecial3(http.argument));
		return http.writer;
	}
}