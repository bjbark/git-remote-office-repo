package com.sky.listener;

import java.util.Map;

import net.sky.core.common.annotation.ReleaseParam;
import net.sky.core.common.annotation.ReleaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sky.http.HttpMessage;
import com.sky.http.HttpRequestArgument;
import com.sky.http.HttpResponseMessage;


@Controller
public class SeqListener {

	@Autowired
	private SeqListenerService service;

	/**********************************************************************************************
	 *
	 * 기초 일련번호 구하기
	 * @param request
	 * @param response
	 * @throws Exception
	 *
	 *********************************************************************************************/
	@RequestMapping(value="/listener/seq/default.do" )
	public String getDefault(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getDefault(http.argument));
		return http.writer;
	}

	/**
	 * 품목 분류 일련번호 생성
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/listener/seq/maxid.do")
	public String getMaxId( @ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxId(http.argument, page, rows, sort));
		return http.writer;

	}
	@RequestMapping(value="/listener/seq/checkCode.do")
	public String getCheckCode( @ReleaseToken HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getCheckCode(http.argument));
		return http.writer;

	}
	@RequestMapping(value="/listener/set/book.do")
	public String setBook(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="invc_numb" , required=true , defaultValue="" ) String invc_numb,
			@RequestParam(value="line_seqn" , required=false, defaultValue="0") int line_seqn,
			@RequestParam(value="job_dvcd"  , required=true , defaultValue="" ) String job_dvcd
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setBook(http.argument, invc_numb , line_seqn, job_dvcd ));
		return http.writer;
	}
	@RequestMapping(value="/listener/set/lot.do")
	public String setLot(HttpMessage http, Map<String, Object> model,
			@RequestParam(value="invc_numb" , required=true , defaultValue="" ) String invc_numb,
			@RequestParam(value="line_seqn" , required=false, defaultValue="0") int line_seqn,
			@RequestParam(value="item"      , required=true , defaultValue="" ) String item,
			@RequestParam(value="tot_qntt"  , required=false, defaultValue="0") double tot_qntt,
			@RequestParam(value="actn_dvcd" , required=true , defaultValue="" ) String actn_dvcd,
			@RequestParam(value="job_dvcd"  , required=true , defaultValue="" ) String job_dvcd    /**  delete   or  insert   **/
			) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setLot(http.argument, invc_numb , line_seqn, item, tot_qntt , actn_dvcd , job_dvcd  ));
		return http.writer;

	}
	@RequestMapping(value="/listener/set/close.do")
	public String setClose(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.setClose(http.argument ));
		return http.writer;
	}


	/**
	 * 품목 분류 일련번호 생성
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/listener/seq/maxseqn.do")
	public String getMaxSeqn( @ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxSeqn(http.argument, page, rows, sort));
		return http.writer;
	}
	/**
	 * 각종 코드의 마직막 code 찾아 + 1
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/listener/seq/maxcode.do")
	public String getMaxCode( @ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxCode(http.argument, page, rows, sort));
		return http.writer;

	}


	/**********************************************************************************************
	 *
	 * 거래 일련번호 구하기
	 * @param request
	 * @param response
	 * @throws Exception
	 *
	 *********************************************************************************************/
	@RequestMapping(value="/listener/seq/maxidoracle.do" )
	public String getMaxIdOracle(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getMaxIdOracle(http.argument));
		return http.writer;
	}

	/**********************************************************************************************
	 *
	 * 거래 일련번호 구하기
	 * @param request
	 * @param response
	 * @throws Exception
	 *
	 *********************************************************************************************/
	@RequestMapping(value="/listener/seq/invoice.do" )
	public String getInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getInvoice(http.argument));
		return http.writer;
	}

	@RequestMapping(value="/listener/web/invoice.do" )
	public String webInvoice(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.webInvoice(http.argument));
		return http.writer;
	}



	/**********************************************************************************************
	 *
	 * SQL 구하기
	 * @param request
	 * @param response
	 * @throws Exception
	 *
	 *********************************************************************************************/
	/**********************************************************************************************
	 *
	 * 송장 번호 생성
	 *
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 *
	 *********************************************************************************************/
	@RequestMapping(value="/listener/seq/taekbae.do" )
	public String getTaekbae(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getTaekbae(http.argument));
		return http.writer;
	}


	@RequestMapping(value="/listener/seq/product.do" )
	public String getProduct(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProduct(http.argument));
		return http.writer;
	}

	/**
	 * 품목 분류 일련번호 생성
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/listener/seq/product/class.do" )
	public String getProductClass(HttpMessage http, Map<String, Object> model) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getProductClass(http.argument));
		return http.writer;
	}
	/**
	 * 사원번호 최종번호 + 1
	 * @param http
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/listener/seq/empno.do")
	public String getEmpNo( @ReleaseToken HttpMessage http, Map<String, Object> model,
			@RequestParam(value="page" , required=true, defaultValue="1" ) int page,
			@RequestParam(value="limit", required=true, defaultValue="10") int rows,
			@RequestParam(value="sort" , required=false, defaultValue = "" ) String sort) throws Exception {
		model.put(HttpResponseMessage.RECORDS, service.getEmpNo(http.argument, page, rows, sort));
		return http.writer;

	}



}
