package com.sky.listener.tasker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sky.data.DataMessage;
import com.sky.data.SqlParamText;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.task.TaskExecuter;

public class TaxResponseTasker extends TaskExecuter{
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	public static String TAX_POS_RESPONSE_SMILETAX = "TAX_POS_RESPONSE_SMILETAX";
     
	//private TaskTracking tracker = null;
	
	String invoice = "" ;
	
	public TaxResponseTasker() {
	}
	
	// 웹에서 호출할 사용자  
	public TaxResponseTasker(String process, String storage, int counter, String invoice ) {
		this.process = process;
		this.storage = storage;
		this.counter = counter;
		this.invoice = invoice; 
	}	
	
	public void run() {
		if (TAX_POS_RESPONSE_SMILETAX.equals(this.process)){
			this.transferTAX_POS_RESPONSE_SMILETAX();
		}
	}

	private void transferTAX_POS_RESPONSE_SMILETAX() {
		//this.tracker = new TaskTracking(this.getClass().getName(), this.process, this.storage);
		logger.debug(this.process + " start");		
		try {
			DataMessage read = new DataMessage(this.storage);
			read.param
				.query(" select  a.SYS_HQ_CD , a.sky_issue_no,  a.SYS_TXBILL_GB  , a.serialnum ")
				.query("      ,  a.return_remark , a.nts_send_state, a.nts_result_code, a.state ")
				.query(" from    tsmiletax a             ")
				.query(" where   a.AGENT_GB = '0' or a.state = 'E' ")
				.query(" and     a.serialnum  = :invoice ", this.invoice )
				.query(" limit   :counter " , this.counter , (this.counter > 0)	)  // 수행 개수 지정 
			;
			SqlResultMap map = read.selectForMap();
			if (map.size() > 0) {
				DataMessage sync = new DataMessage(this.storage);
				int current = 0, maxsize = map.size(); 		
				for(SqlResultRow row:map){
					if (logger.isDebugEnabled()){
						logger.debug("taskProcess id = " + this.process + "[ " + ++current + "/" + maxsize + "]"  + "/1:" + row.getParamText("idx_1") + "/2:" + row.getParamText("idx_2") + "/3:" + row.getParamText("idx_3") );  // 수행중인 건수를 보는 로그
					}
					this.disposerTAX_POS_RESPONSE_SMILETAX(sync, row);
				}
				logger.debug(this.process + " end = " + map.size());
			} else {
				logger.debug(this.process + " end = nodata ");
			}
			//try { tracker.logwrite(); } catch (Exception ex) { ex.printStackTrace(); }  // 연동이후 남은 건수에 대한 로그를 기록 한다.
		} catch (Exception e) {
			logger.debug(this.process + " exception ");
			e.printStackTrace();
		}		
	}		
	
	public void disposerTAX_POS_RESPONSE_SMILETAX(DataMessage sync, SqlResultRow syc){
		try {
			sync.clear();
			if (!"".equals( syc.getParamText("sky_issue_no"))) {

				String tax_code = "" ;
				switch(syc.getParamText("state")){
					case "N" : tax_code = "N000" ; break; //발행요청 처음데이터를 만들 때 반드시 N으로 입력
					case "T" : tax_code = "T000" ; break; //전송  계산서 발행중, AGENT가 데이터를 EDI서버로 전송함
					case "G" : tax_code = "G000" ; break; //미승인 계산서발행완료(미승인), 상대업체가 아직 승인하지 않은 상태
					case "K" : tax_code = "K000" ; break; // 승인    계산서 승인상태, 상대업체가 계산서를 승인한 상태
					case "O" : tax_code = "O000" ; break; // 반송  계산서 반송처리, 상대업체가 계산서를 반송함, RETURN_REMARK 필드에 반송사유가 있음
					case "S" : tax_code = "S000" ; break; // 취소  계산서 취소상태
					case "Q" : tax_code = "Q000" ; break;  // 승인취소요청     승인취소요청(매입계산서) 
					case "E" : tax_code = "E000" ; break;  // 발행에러    세금계산서 발행에러 RETURN_REMARK에 발생사유 있음
				}
				
				

				
				
				String tax_memo = syc.getParamText("return_remark"  );
				//syc.getParamCopy("biz_kind"   	  , 30 , Charset.forName("euc-kr") )
				
				String nts_code = ""; 
				switch(syc.getParamText("nts_send_state")){
					case  "N" : nts_code = "N000" ; break;  // 전송대기 
					case  "T" : nts_code = "G000" ; break;  // 국세청 전송요청 
					case "01" : nts_code = "F000" ; break;  // 국세청 처리완료
					case "02" : nts_code = "K000" ; break;  // 국세청 전송완료 
					case "03" : nts_code = "E000" ; break;  // 국세청 처리불가 
				}
//N  = N  
//G  = T 
//K  = 02 
//F  = 01 
//E  = 03 				
				String nts_memo = "";
				switch (syc.getParamText("nts_result_code")){
					case "SUC001" :	nts_memo = "성공";  break;
					case "SYN002" : nts_memo = "공급사업자, 수탁자 전자서명 오류"; break;
					case "SYN003" : nts_memo = "승인번호 중복 오류"; break;
					case "SYN004" : nts_memo = "전자세금계산서 스키마 오류"; break;
					case "ERR001" :	nts_memo = "공급자 사업자번호 오류"; break;
					case "ERR002" :	nts_memo = "공급받는자 사업자번호 오류"; break;
					case "ERR003" :	nts_memo = "수탁사업자등록번호 오류"; break;
					case "ERR004" :	nts_memo = "전송일시 오류"; break;
					case "ERR005" :	nts_memo = "발행일시 오류"; break;
					case "ERR006" :	nts_memo = "작성일자 오류"; break;
					case "ERR007" :	nts_memo = "공급가액, 세액 오류"; break;
					case "ERR008" :	nts_memo = "코드유형 오류"; break;
					case "ERR010" :	nts_memo = "국세청 등록번호 오류"; break;
					case "ERR999" :	nts_memo = "기타 오류"; break;
				}				
				sync.param
					.table("sale_taxbill")
					.where("where tax_no  = :tax_no ")
					//
					.unique("tax_no"           , syc.fixParameter("sky_issue_no" ))
					.update("result_dt"        , new SqlParamText("date_format(sysdate(),'%Y%m%d%H%i%S')" ))
				;
				if ("0".equals(syc.getParamText("SYS_TXBILL_GB"))) { // 0 : 과세
					sync.param
						.update("taxation_sts"      , tax_code  , !"".equals(tax_code.trim()))
						.update("taxation_sts_memo" , tax_memo)
						.update("taxation_nts"      , nts_code  , !"".equals(nts_code.trim()))
						.update("taxtn_nts_memo" , nts_memo)
					;
				} else { // 1 : 면세
					sync.param
						.update("tax_free_sts"      , tax_code  , !"".equals(tax_code.trim()))
						.update("tax_free_sts_memo" , tax_memo)
						.update("tax_free_nts"      , nts_code  , !"".equals(nts_code.trim()))
						.update("txfree_nts_memo" , nts_memo)
					;
				}
				;sync.attach( Action.update    , syc.fixParamText("SYS_HQ_CD" ) + ".POS" );
			}
			// 계산서 임시 서버에 시스템 처리 상태를 마크 한다.  
			sync.param
				.table("tsmiletax")
				.where("where serialnum = :serialnum" )
				//
				.unique("serialnum"      , syc.fixParamText("serialnum" ))
				.update("AGENT_GB"  , "7" )
			;
			sync.attach(Action.update).execute();
			
		} catch (Exception e) {
			e.printStackTrace();
			try {
				sync.clear();
				sync.param
					.table("tsmiletax")
					.where("where serialnum = :serialnum" )
					//
					.unique("serialnum"      , syc.fixParamText("serialnum" ))
					.update("AGENT_GB"  , "3" )
				;
				sync.attach(Action.update).execute();
			} catch (Exception e1) {}
		}
	}	
}
