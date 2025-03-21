package com.sky.listener;

import net.sky.core.exception.ServiceException;



//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlRepository;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class SeqListenerService {

	//private final Logger logger = LoggerFactory.getLogger(SeqListenerService.class);

	private static final Object JOB_DVCD = null;

	/**
	 * 일련번호 요청 공통 패키지
	 * @param repository
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public String getRequest(SqlRepository repository, SqlParameter param) throws Exception {
		try{
			String sequence = repository.selectForStr( param );
			if (sequence != null && sequence.length() > 0 ){
				return sequence ;
			} else {
				throw new ServiceException( "일련번호 생성 실패 " );
			}
		} catch(Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}

	/**********************************************************************************************
	 *
	 * @param data
	 * @param STOR
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getDefault(HttpRequestArgument arg) throws Exception {

		String model = arg.getParamText("model_id") ;
		String place = arg.getParamText("place_id") ;

		if ( model.length() == 0 ){
			model = "default" ;
		}
		if ( place.length() == 0 ){
			place = "1" ;
		}
		return getDefault( arg.newStorage("POS").repository, arg.fixParamText("stor_id"), model, place );
	}


	public String getDefault(SqlRepository repository, String STOR, String model, String place) throws Exception {
//			.query("select net_package_sequence.get_sequance_default " )
//			.query(" ( :STOR "   , STOR       )  // 매장 코드
//			.query(" , :model "   , model   	)  // 요청 모델
//			.query(" , :place "   , place       )  // 요청 위치
//			.query("  ) as sequence from DUAL " )

//			.query("select dbo.GET_SEQUANCE_DEFAULT " )
//			.query(" ( :STOR "    , STOR        )  // 매장 코드
//			.query(" , :model "   , model   	)  // 요청 모델
//			.query(" , :place "   , place       )  // 요청 위치
//        	 return this.getRequest( repository,
//        	 new SqlParameter()
//				.query("select NVL(max(to_number(menu_id)),0)+1 as  sequence		")
//				.query("from MENU_MST                       						")
//				.query("where  trim(translate(menu_id, '1234567890', ' ')) is  null ")
//   			 );
        	 return this.getRequest( repository,
        	 new SqlParameter()
	 			.query("select fn_seq_gen (        ")
	 			.query("   :STOR "   , STOR         )  // 매장 코드
	 			.query(" , :table "  , "all"        )  // 요청 모델
	 			.query(" ) as SEQ                 " )
   			 );
	}
	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultMap getMaxId(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String STOR			= arg.getParamText("stor_id") ;
		String table		= arg.getParamText("table_nm") ;
		String invc_numb	= arg.getParamText("invc_numb") ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}
		if (invc_numb.length() == 0) {
			invc_numb = "not defined" ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call fn_seq_gen_v2 (			")
			.query("   :STOR "   , STOR				)  // 본사코드
			.query(" , :table "  , table			)  // 테이블명
			.query(" , :invc_numb "  , invc_numb	)  // Invoice 번호
			.query(" ) 								")
		;
		return data.selectForMap(sort);
	}
	public SqlResultMap getCheckCode(HttpRequestArgument arg) throws Exception {
		String hq    = arg.getParamText("hqof_idcd") ;

		DataMessage data = new DataMessage(hq+".POS");

		data.param
			.query("select count(1) as seq													")
		;
		data.param
			.where("from  "+arg.fixParamText("table_nm"))
			.where("where 1=1 																")
			.where("and   "+arg.fixParamText("column_nm1")+" = :code" ,arg.fixParameter("code1"))
			.where("and   "+arg.getParamText("column_nm2")+" = :code2",arg.getParameter("code2"))
			.where("and   "+arg.getParamText("column_nm3")+" = :code3",arg.getParameter("code3"))
			.where("and   "+arg.getParamText("column_nm4")+" = :code4",arg.getParameter("code4"))
			.where("and   "+arg.getParamText("notin_column")+" not in (:notin)",arg.getParameter("notin"))
			.where("and   line_stat   < :line_stat   " , "2" , "".equals(arg.getParamText("line_stat" )))
		;
		return data.selectForMap();
	}
	public SqlResultMap setBook(HttpRequestArgument arg, String INVC_NUMB  , int LINE_SEQN  , String JOB_DVCD) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		if (INVC_NUMB.length() == 0) {
			INVC_NUMB = "not defined" ;
		}

		if (hq.length() > 0 )	{ data = new DataMessage(hq+".POS"); }
		else					{ data = arg.newStorage("POS");      }
		System.out.println(INVC_NUMB);
		System.out.println(LINE_SEQN);
		System.out.println(JOB_DVCD);
		switch(JOB_DVCD){
			case "판매출고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "입고접수" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "구매입고" : /* InspEntry3Service 에서 실행한다.... */
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "입고검사_삭제" : /* InspEntry3Service 에서 실행한다.... */
				data.param
					.query("call auto_stock_insp_delete (	")
					.query("   :invc_numb )"  , INVC_NUMB	 )  // Invoice 번호
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "기타입고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "기타출고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "생산출고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "이동입고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "이동출고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "반품입고" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "반품폐기" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "불량폐기" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "기타출고전체삭제" :
				data.param
					.query("call auto_isos_booking (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "삼정테스트" :
				data.param
					.query("call auto_isos_booking_test (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
		}
		return null;
	}

	public SqlResultMap setBook2(HttpRequestArgument arg, String INVC_NUMB , int LINE_SEQN  , String LOTT_NUMB, String JOB_DVCD) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		if (INVC_NUMB.length() == 0) {
			INVC_NUMB = "not defined" ;
		}

		if (hq.length() > 0 )	{ data = new DataMessage(hq+".POS"); }
		else					{ data = arg.newStorage("POS");      }
		System.out.println(INVC_NUMB);
		System.out.println(LINE_SEQN);
//		System.out.println(ORIG_INVC_NUMB);
		System.out.println(LOTT_NUMB);
		System.out.println(JOB_DVCD);
		switch(JOB_DVCD){
			case "판매출고" :
				data.param
					.query("call auto_isos_booking_2 (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//					.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
					.query(" , :lott_numb "  , LOTT_NUMB	 )
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "입고접수" :
				data.param
					.query("call auto_isos_booking_2 (		")
					.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
					.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//					.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
					.query(" , :lott_numb "  , LOTT_NUMB	 )
					.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
					.query(" ) 								")
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "구매입고" : /* InspEntry3Service 에서 실행한다.... */
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "입고검사_삭제" : /* InspEntry3Service 에서 실행한다.... */
				data.param
					.query("call auto_stock_insp_delete (	")
					.query("   :invc_numb )"  , INVC_NUMB	 )  // Invoice 번호
				;
				data.attach(Action.direct);
				data.execute();
				break;
			case "기타입고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "기타출고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;				data.attach(Action.direct);
				data.execute();
				break;
			case "생산출고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "이동입고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "이동출고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "반품입고" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "반품폐기" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
			case "불량폐기" :
				data.param
				.query("call auto_isos_booking_2 (		")
				.query("   :invc_numb "  , INVC_NUMB	 )  // Invoice 번호
				.query(" , :line_seqn "  , LINE_SEQN	 )  // 순번(0일 경우 Invoice 단위로 처리된다.)
//				.query(" , :orig_invc_numb " , ORIG_INVC_NUMB )
				.query(" , :lott_numb "  , LOTT_NUMB	 )
				.query(" , :job_dvcd  "  , JOB_DVCD		 )  // 작업구분
				.query(" ) 								")
			;
				data.attach(Action.direct);
				data.execute();
				break;
		}
//		System.out.println(arg.getParamText("orig_invc_numb"));

		return null;
	}
	public SqlResultMap setLot(HttpRequestArgument arg, String INVC_NUMB  , int LINE_SEQN , String ITEM , double TOT_QNTT, String ACTN_DVCD, String JOB_DVCD ) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;
		if (INVC_NUMB.length() == 0) {
			INVC_NUMB = "not defined" ;
		}

		if (hq.length() > 0 )	{ data = new DataMessage(hq+".POS"); }
		else					{ data = arg.newStorage("POS");      }
		data.param
			.query("call auto_lot_use (				")
			.query("   :invc_numb  "  , INVC_NUMB	)  // Invoice 번호
			.query(" , :line_seqn  "  , LINE_SEQN	)  // Invoice 순번
			.query(" , :item       "  , ITEM			)  // 출고 품목코드
			.query(" , :tot_qntt   "  , TOT_QNTT		)  // 총 출고수량
			.query(" , :source_dvcd"  , ACTN_DVCD		)  // 용도구분
			.query(" , :job_dvcd   "  , JOB_DVCD		)  // 작업구분 (입고접수 , 입고검사 , 기타입고 , 기타출고 )
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();

		return null;
	}
	public SqlResultMap setClose(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		String hq    = arg.getParamText("hqof_idcd") ;

		if (hq.length() > 0 )	{ data = new DataMessage(hq+".POS"); }
		else					{ data = arg.newStorage("POS");      }
		data.param
			.query("call auto_close (				")
			.query("   :STOR      "  , arg.getParamText("hqof_idcd")	)  // 본사코드
			.query(" , :table     "  , arg.getParamText("table")		)  // 마감할 테이블명(실제 명을 전달)
			.query(" , :invc_numb "  , arg.getParamText("invc_numb")	)  // Invoice 번호
			.query(" , :job_dvcd  "  , arg.getParamText("line_clos")	)  // 작업구분 (마감(1) 또는 해지(0) )
			.query(" ) 								")
		;
		data.attach(Action.direct);
		data.execute();
		return null;
	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultMap getMaxSeqn(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String STOR  = arg.getParamText("stor_id") ;
		String table = arg.getParamText("table_nm") ;
		String prnt_idcd = arg.getParamText("prnt_idcd") ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("call prc_seqn_gen (            ")
			.query("   :STOR      "  , STOR         )  // 매장 코드
			.query(" , :table     "  , table        )  // 요청 모델
			.query(" , :prnt_idcd "  , prnt_idcd    )  // 요청 모델
			.query(" )                             ")
		;
		return data.selectForMap(sort);
	}
	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
//	public DataMessage getSql(HttpRequestArgument arg, String PATH , String MODULE, String METHOD, String QUERY ) throws Exception {
//		return getSql( arg.fixParamText("hq_id"), PATH , MODULE , METHOD , QUERY );
//	}
//
//	/**********************************************************************************************
//	 * //data.repository
//	 * @param data
//	 * @param STOR
//	 * @return
//	 * @throws Exception
//	 *********************************************************************************************/
//	public DataMessage getSql(String HQ_ID , String PATH , String MODULE , String METHOD , String QUERY ) throws Exception {
//		DataMessage data;
//		data = new DataMessage(HQ_ID+".POS");
//		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
//		sql.param.query("select * from rnd_query                        ");
//		sql.param.where("where  q_path_nm   = :path      ", PATH         );
//		sql.param.where("and    q_module_nm = :module    ", MODULE       );
//		sql.param.where("and    q_method    = :method    ", METHOD       );
//		sql.param.where("and    q_query_nm  = :query     ", QUERY        );
//		sql.param.where("order  by line_no                              ");
//		SqlResultMap map = sql.selectForMap();
//		if (map.size() > 0) {
//			for(SqlResultRow row:map){
//				if ( "W".equals(row.getParamText("q_sql_gbcd"))){
//					if (!"".equals(row.getParamText("q_param"))){
//						data.param.where(row.getParamText("q_sql"), arg.getParamText("broff_id") );
//					}else {
//					data.param.where(row.getParamText("q_sql"));
//					}
//				}
//				if (!"W".equals(row.getParamText("q_sql_gbcd"))){data.param.query(row.getParamText("q_sql"));}
//			}
//		}
//		return data;
//	}
	 /*********************************************************************************************/
	public DataMessage getSql(HttpRequestArgument arg, String PATH , String MODULE, String QUERY, DataMessage data , String BODY) throws Exception {
		DataMessage sql = new DataMessage(SqlRepository.NETHOSTING);
		String ISFIRST="Yes";
		String fnd = "";
		sql.clear();
		sql.param.query("select * from cert_query                                ");
		sql.param.where("where  path_name        = :path         " , PATH         );
		sql.param.where("and    srvc_name        = :module       " , MODULE       );
		sql.param.where("and    modl_name        = :query        " , QUERY        );
		sql.param.where("and    qury_dvsn in ('Q','F','J')       " , "body".equals(BODY));
		sql.param.where("and    qury_dvsn not in ('E')           " , "footer".equals(BODY));
		sql.param.where("order  by line_numb                                     ");
		SqlResultMap map = sql.selectForMap();
		if (map.size() > 0) {
			for(SqlResultRow row:map){
				if	( "Q".equals(row.getParamText("qury_dvsn").replaceAll("(^\\p{Z}+|\\p{Z}+$)", ""))){
					data.param.query(row.getParamText("qury_text"));
				}
				if ("F".equals(row.getParamText("qury_dvsn").replaceAll("(^\\p{Z}+|\\p{Z}+$)", ""))
						||"J".equals(row.getParamText("qury_dvsn").replaceAll("(^\\p{Z}+|\\p{Z}+$)", ""))
					){	if	(!"".equals(row.getParamText("dlvy_valu").trim())) {
							if	(!"".equals(arg.getParamText(row.getParamText("dlvy_valu").trim()))){
								data.param.where(row.getParamText("qury_dvsn"), arg.getParamText(row.getParamText("dlvy_valu").trim()));
							}
						} else {
							if (!"".equals(row.getParamText("cnst_valu").trim())) {
								data.param.where(row.getParamText("qury_text"), row.getParamText("cnst_valu"));
							} else {
								data.param.where(row.getParamText("qury_text"));
							}
						}
				}
				if ("E".equals(row.getParamText("qury_dvsn").replaceAll("(^\\p{Z}+|\\p{Z}+$)", ""))){
					if ("Yes".equals(ISFIRST)) {
						data.param.where("and     a.line_stat   = :line_stat8   " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) );
						data.param.where("and     a.line_stat   < :line_stat9   " , "2" , "".equals(arg.getParamText("line_stat" )) );
					}
					ISFIRST="";
					data.param.where(row.getParamText("qury_text"));
				}
			}
		}
		if ("Yes".equals(ISFIRST)) {
			data.param.where("and     a.line_stat   = :line_stat8   " , arg.getParamText("line_stat" ) , !"".equals(arg.getParamText("line_stat" )) );
			data.param.where("and     a.line_stat   < :line_stat9   " , "2" , "".equals(arg.getParamText("line_stat" )) );
		}
		return data;
	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultMap getMaxCode(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		String STOR  = arg.getParamText("stor_id") ;
		String table = arg.getParamText("table_nm") ;
		DataMessage data;
		String hq    = arg.getParamText("hq_id") ;
		String stor  = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
			data.param
			.query("select fn_code_gen (        ")
			.query("   :STOR "   , STOR          )  // 매장 코드
			.query(" , :table "  , table         )  // 요청 모델
			.query(" ) as SEQ                   ")
		;
		return data.selectForMap(sort);
	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getMaxIdOracle(HttpRequestArgument arg ) throws Exception {
		return getInvoiceOracle(arg.newStorage().repository , arg.fixParamText("stor_id") );
	}

	/**********************************************************************************************
	 * //data.repository
	 * @param data
	 * @param STOR
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getInvoiceOracle(SqlRepository repository, String STOR ) throws Exception {
		return this.getRequest( repository,
			new SqlParameter()
			.query("select net_package_sequence.get_sequance_default " )
			.query(" ( :STOR "   , STOR         )  // 매장 코드
			.query(" , :model "   , "invoice"   )  // 요청 모델
			.query(" , :place "   , "1"         )  // 요청 위치
			.query("  ) as sequence from DUAL " )
		);
	}


	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getInvoice(HttpRequestArgument arg ) throws Exception {
		return getInvoice(arg.newStorage().repository , arg.fixParamText("hq_id") , arg.fixParamText("stor_id") , arg.fixParamText("table_nm") );
	}

	/**********************************************************************************************
	 * //data.repository
	 * @param data
	 * @param STOR
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getInvoice(SqlRepository repository, String HQ , String STOR , String TABLE_NM) throws Exception {
//		return this.getRequest( repository,
//			new SqlParameter()
//			.query("select net_package_sequence.get_sequance_invoice " )
//			.query(" ( :STOR "   , STOR         )  // 매장 코드
//			.query(" , :model "   , "invoice"   )  // 요청 모델
//			.query(" , :place "   , "1"         )  // 요청 위치
//			.query("  ) as sequence from DUAL " )
//		);
		if (HQ.length() == 0  && STOR.length() >= 10 ) {
			HQ = STOR.substring(0,10) ;
		}
		return this.getRequest( repository,
			new SqlParameter()
				.query("select fn_seq_gen (        ")
				.query("   :STOR "   , STOR         )  // 매장 코드
				.query(" , :table "  , TABLE_NM     )  // 요청 모델
				.query(" ) as SEQ                 " )
		);



	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String webInvoice(HttpRequestArgument arg ) throws Exception {
		return webInvoice(new SqlRepository(arg.fixParamText("web_ddns")) );
	}

	/**********************************************************************************************
	 * //data.repository
	 * @param data
	 * @param STOR
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String webInvoice(SqlRepository repository) throws Exception {
		SqlParameter sqlp = new SqlParameter();
		repository.execute("update SEQ_DEFAULT set seq_id=last_insert_id(seq_id+1)");
		return repository.selectForStr( sqlp.query(" select concat('9', lpad( cast( last_insert_id() as char), 13,'0'))  " ));
	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getProduct(HttpRequestArgument arg) throws Exception {
		return getProduct(arg.newStorage().repository, arg.fixParamText("stor_id"), arg.fixParamText("model_id"), arg.fixParamText("place_id"));
	}

	/**********************************************************************************************
	 *
	 * @param data
	 * @param STOR
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getProduct(SqlRepository repository, String STOR, String model, String place) throws Exception {
		return this.getRequest( repository,
			new SqlParameter()
			.query("select net_package_sequence.get_sequance_product " )
			.query(" ( :STOR "   , STOR         )  // 매장 코드
			.query(" , :model "   , model       )  // 요청 모델
			.query(" , :place "   , place       )  // 요청 위치
			.query("  ) as sequence from DUAL " )
		);
	}

	/**********************************************************************************************
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public SqlResultRow getProductClass(HttpRequestArgument arg) throws Exception {

		DataMessage data = arg.newStorage("POS");
		data.param
			.query("select lpad( NVL( max( clss_cd ) ,0 ) + 1 , 2, '0' ) as serial	")
			.query("from   ITM_CLSS a												")
			.query("where  a.hq_id  = :hq_id		" , arg.fixParameter("hq_id"	))
			.query("and    a.stor_grp  = :stor_grp	" , arg.fixParameter("stor_grp"	))
			.query("and    a.prnt_id = :prnt_id		" , arg.fixParameter("prnt_id"	))
			.query("and    a.row_lvl = :row_lvl		" , arg.getParameter("row_lvl"	))
		;
		String clss_id = "" ;
		String clss_cd = data.selectForStr();
		String stor_grp = (String)arg.fixParameter("stor_grp"  );

		if (clss_cd != null ){
			if (arg.getParameter("prnt_id").equals("0")){
				int index = stor_grp.length();
				clss_id = stor_grp.substring(index -4, index) + clss_cd ;
			} else {
				clss_id = arg.fixParameter("prnt_id" ) + clss_cd ;
			}
			SqlResultRow row = new SqlResultRow();
			row.put("clss_id", clss_id );
			row.put("clss_cd", clss_cd );
			return row ;
		} else {
			throw new ServiceException( "일련번호 생성 실패 " );
		}
	}


	/**********************************************************************************************
	 *
	 * 택배사 송장 번호 생성
	 *
	 * @param http
	 * @return
	 * @throws Exception
	 *********************************************************************************************/
	public String getTaekbae(HttpRequestArgument arg) throws Exception {
		return getTaekbae(arg.newStorage().repository, arg.fixParamText("STOR"), arg.fixParamText("model"), arg.fixParamText("place"));
	}

	/**
	 *
	 * @param repository
	 * @param STOR
	 * @param model
	 * @param place
	 * @return
	 * @throws Exception
	 */
	public String getTaekbae(SqlRepository repository, String STOR, String model, String place) throws Exception {
		return this.getRequest( repository,
			new SqlParameter()
			.query("select net_package_sequence.get_sequance_taekbae " )
			.query(" ( :STOR "   , STOR         )  // 매장 코드
			.query(" , :model "   , model       )  // 택배사 ID
			.query(" , :place "   , place       )  // 미사용
			.query("  ) as sequence from DUAL " )
		);
	}

	/**
	 */
	public SqlResultMap getEmpNo(HttpRequestArgument arg, int page, int rows, String lang_gbcd) throws Exception {
//		DataMessage data = arg.newStorage("POS");
		DataMessage data;
		String hq = arg.getParamText("hq_id") ;
		String stor = arg.getParamText("stor_id");
		if (hq.length() == 0  && stor.length() >= 10 ) {
			hq = stor.substring(0,10) ;
		}

		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
		else                  { data = arg.newStorage("POS");      }
		data.param // 쿼리문  입력
			.query("select *																")
		;
		data.param
			.where("from (												                    ")
			.where("select  ifnull(convert(max(a.emp_no),integer),0) + 1  as seq			")
			.where("from    hr_emp_mst a                                                    ")
			.where("where   1=1                                                             ")
			.where("and     a.row_sts   < '2'     											")
			.where("and     a.hq_id     = :hq_id       " , arg.fixParamText("hq_id") )
			.where("and     a.emp_no REGEXP '^[0-9]+$'										")
			.where(") a																		")
			;
		return data.selectForMap(page, rows, (page == 1) );
	}



}


