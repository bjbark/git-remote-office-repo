package com.sky.system.mobile.mtrlistt;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlParameter.Action;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.http.HttpRequestArgument;

@Service
public class MtrlIsttService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		data.param // 집계문
			.total("select count(1) as maxsize										")
		;

		data.param // 조회
			.query("select															")
			.query("		  convert(char(8),a.검사일자 ,112)	  as insp_date		")
			.query("		, a.검사순번		as insp_seqn							")
			.query("		, a.거래선구분	as cstm_dvsn							")
			.query("		, a.거래처		as cstm									")
			.query("		, c.거래처명		as cstm_name							")
			.query("		, a.검사자		as insp_drtr							")
			.query("		, a.검사방법		as insp_mthd							")
			.query("		, a.테스트방법	as test_mthd							")
			.query("		, a.제품코드		as prod_code							")
			.query("		, a.품목코드		as item_code							")
			.query("		, i.품명			as item_name							")
			.query("		, isnull(i.규격,'') as item_spec							")
			.query("		, a.공정코드		as wkct_code							")
			.query("		, a.색상			as colr									")
			.query("		, a.색상2		as colr_2snd							")
			.query("		, a.입고수량		as istt_qntt							")
			.query("		, a.시료수		as smor_qntt							")
			.query("		, a.불량시료수	as poor_smor_qntt						")
			.query("		, a.불량구분#1	as poor_dvsn_1fst						")
			.query("		, a.불량수량#1	as poor_qntt_1fst						")
			.query("		, a.불량구분#2	as poor_dvsn_2snd						")
			.query("		, a.불량수량#2	as poor_qntt_2snd						")
			.query("		, a.불량구분#3	as poor_dvsn_3trd						")
			.query("		, a.불량수량#3	as poor_qntt_3trd						")
			.query("		, a.판정구분		as judt_dvsn							")
			.query("		, a.합격수량		as pass_qntt							")
			.query("		, a.합격수량		as istt_idle							")
			.query("		, a.비고			as remk_text							")
			.query("		, a.발주번호		as offr_numb							")
			.query("		, a.발주항번		as offr_seqn							")
			.query("		, a.접수일자		as acpt_date							")
			.query("		, a.접수번호		as acpt_numb							")
			.query("		, a.접수구분		as acpt_dvsn							")
			.query("		, a.외주출고번호	as otod_ostt_numb						")
			.query("		, a.상태			as stat									")
			.query("		, a.긴급유무		as emgc_yorn							")
			.query("		, a.test방법		as test_mthd							")
			.query("		, a.수주번호		as acpt_numb							")
			.query("		, a.수주항번		as acpt_seqn							")
			.query("		, a.조치사항		as trtm_atcl							")
			.query("		, a.검사차수		as insp_degr							")
			.query("		, a.무검사구분		as ninp_dvsn						")
		;
		data.param
			.where("from	수입검사대장 a												")
			.where("		left outer join 거래처마스터 c on a.거래처   = c.거래처코드		")
			.where("		left outer join 품목정보	 i  on a.품목코드 = i.품목코드		")
			.where("where   a.판정구분 in ('01')										")
			.where("and	    a.상태 in ('0')											")
			.where("and	    c.거래처명 like  %:cstm%		", arg.getParameter("cstm_name"))
			.where("and	    i.품명 like    %:item_name% 	", arg.getParameter("item_name"))
			.where("and     convert(char(10),a.검사일자 ,120) between :fr_dt  ", arg.fixParameter("fr_dt"))
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt"))
			.where("order  by a.검사일자 desc 											")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}
	public SqlResultMap getSearch2(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		data.param // 집계문
			.total("select count(1) as maxsize										")
		;

		data.param // 조회
			.query("select															")
			.query("		  convert(char(8),a.검사일자 ,112)	  as insp_date			")
			.query("		, a.검사순번		as insp_seqn							")
			.query("		, convert(char(8),b.입고일자 ,112)		as istt_date		")
			.query("		, b.발주번호		as offr_numb							")
			.query("		, b.거래처			as cstm_name							")
			.query("		, b.품목코드		as item_code							")
			.query("		, b.품명			as item_name							")
			/*.query("		, b.납기일자		as deli_date							")*/
			.query("		, b.수량			as offr_qntt							")
			.query("		, a.입고수량		as istt_qntt							")
			.query("		, isnull(b.규격,'') as item_spec							")
			.query("		, a.공정코드		as wkct_code							")
			.query("		, a.색상			as colr									")
			.query("		, a.색상2			as colr_2snd							")
			.query("		, a.입고수량		as istt_qntt							")
			.query("		, a.시료수			as smor_qntt							")
			.query("		, a.불량시료수		as poor_smor_qntt						")
			.query("		, a.불량구분#1		as poor_dvsn_1fst						")
			.query("		, a.불량수량#1		as poor_qntt_1fst						")
			.query("		, a.불량구분#2		as poor_dvsn_2snd						")
			.query("		, a.불량수량#2		as poor_qntt_2snd						")
			.query("		, a.불량구분#3		as poor_dvsn_3trd						")
			.query("		, a.불량수량#3		as poor_qntt_3trd						")
			.query("		, a.판정구분		as judt_dvsn							")
			.query("		, a.합격수량		as pass_qntt							")
			.query("		, a.합격수량		as istt_idle							")
			.query("		, a.비고			as remk_text							")
			.query("		, a.발주번호		as offr_numb							")
			.query("		, a.발주항번		as offr_seqn							")
			.query("		, a.접수일자		as acpt_date							")
			.query("		, a.접수번호		as acpt_numb							")
			.query("		, a.접수구분		as acpt_dvsn							")
			.query("		, a.외주출고번호	as otod_ostt_numb							")
			.query("		, a.상태			as stat									")
			.query("		, a.긴급유무		as emgc_yorn							")
			.query("		, a.test방법		as test_mthd							")
			.query("		, a.수주번호		as acpt_numb							")
			.query("		, a.수주항번		as acpt_seqn							")
			.query("		, a.조치사항		as trtm_atcl							")
			.query("		, a.검사차수		as insp_degr							")
			.query("		, a.무검사구분		as ninp_dvsn							")
		;
		data.param
			.where("from	수입검사대장 a														")
			.where("		,자재입고대장 b  														")
			.where("where	a.검사순번   = b.검사번호  										  ")
			.where("and     c.거래처명 like  %:cstm%				", arg.getParameter("cstm_name"))
			.where("and	    i.품명 like    %:item_name% 	", arg.getParameter("item_name"))
			.where("and	    a.상태 in(1)													")
			.where("and     convert(char(8),b.입고일자 ,112) between :fr_dt  ", arg.fixParameter("fr_dt"))
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt"))
			.where("order  by a.검사일자 desc 											")
		;
		if (page == 0 && rows == 0) {
			return data.selectForMap(sort);
		} else {
			return data.selectForMap(page, rows, (page==1),sort);
		}
	}

	/**
	 *
	 */
	public SqlResultMap setMaster(HttpRequestArgument arg) throws Exception {
		DataMessage data;
		DataMessage read;
		String hq = arg.getParamText("hqof_idcd") ;

		if (hq.length() > 0 )	{
			data	= new DataMessage(hq+".POS");
			read	= new DataMessage(hq+".POS");
		} else {
			data	= new DataMessage("N1000WINFO.POS");
			read	= new DataMessage("N1000WINFO.POS");
		}


		SqlResultRow temp ;
		SqlResultRow temp1 ;
		double rcpt_qntt	= 0;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(arg.getParameter("_set"));
			String set = (String)arg.getParameter("_set");
			System.out.println(set);
			if (set.equals("insert")) {
				data.clear();
				data.param
					.query("update 수입검사대장 set 상태 = '1'								")
					.query("where convert(char(8),검사일자 ,112) = :insp_date ", row.fixParameter("insp_date"	))
					.query("and   검사순번 = :insp_seqn ", row.fixParameter("insp_seqn"	))
				;
				data.attach(Action.direct);
				data.execute();
			}else if(set.equals("delete")){
				data.clear();
				data.param
					.query("update 수입검사대장 set 상태 = '0'								")
					.query("where convert(char(8),검사일자 ,112) = :insp_date ", row.fixParameter("insp_date"	))
					.query("and   검사순번 = :insp_seqn ", row.fixParameter("insp_seqn"	))
				;
				data.attach(Action.direct);
				data.execute();

				data.clear();
				data.param
					.query("delete from 자재입고대장																")
					.query("where convert(char(10),입고일자 ,120) = :istt_date " , row.fixParameter("istt_date"	))
					.query("and 검사번호 = :insp_seqn "							, row.fixParameter("insp_seqn"	))
				;
				data.attach(Action.direct);


			}


			read.clear();
			read.param
				.query("select	isnull(max(입고번호),0) + 1 as last_num					")
				.query("from    자재입고대장  a											")
				.query("where   a.입고일자  = :istt_date ", new  SimpleDateFormat("yyyyMMdd").format(new Date()))
			;
			temp1 = read.selectForRow();

			read.clear();
			read.param
				.query("select														")
				.query("		convert(char(8),a.검사일자 ,112)  as insp_date			")
				.query("		, isnull(a.검사순번,'')		as insp_seqn			")
				.query("		, isnull(a.발주번호,'')		as offr_numb			")
				.query("		, isnull(a.발주항번,'')		as offr_seqn			")
				.query("		, isnull(a.거래처,'')			as cstm					")
				.query("		, isnull(a.품목코드,'')		as item_code			")
				.query("		, isnull(i.품명,'')			as item_name			")
				.query("		, isnull(i.규격,' ')			as item_spec			")
				.query("		, isnull(a.합격수량,0)		as pass_qntt			")
				.query("		, isnull(d.단가,0)			as pric					")
				.query("		, isnull(a.합격수량 * d.단가,0)  as amnt				")
				.query("		, isnull(d.화폐단위,'')	as mney_unit				")
				.query("from    수입검사대장 a											")
				.query("		left outer join 거래처마스터 c on a.거래처   = c.거래처코드	")
				.query("		left outer join 품목정보     i on a.품목코드 = i.품목코드 	")
				.query("		left outer join 발주대장 d   on a.발주번호 = d.발주번호 and a.발주항번 = d.발주항번	")
				.query("where   a.검사일자 = :insp_date " , row.fixParameter("insp_date"))
				.query("and     a.검사순번 = :insp_seqn " , row.fixParameter("insp_seqn"))
			;
			temp = read.selectForRow();
			System.out.println("temp : "+temp);
			if (temp != null ) {
				if(set.equals("insert")){
					rcpt_qntt	= Double.parseDouble(temp.getParamText("pass_qntt" ));
					double amnt	= Double.parseDouble(temp.getParamText("pric" ))  * rcpt_qntt ;
					data.clear();
					data.param
						.query("insert into 자재입고대장									")
						.query("       (입고일자											")
						.query("       ,검사번호											")
						.query("       ,입고창고											")
						.query("       ,입고구분											")
						.query("       ,발주번호											")
						.query("       ,발주항번											")
						.query("       ,거래처											")
						.query("       ,품목코드											")
						.query("       ,품명												")
	//					.query("       ,규격												")
						.query("       ,계정구분											")
						.query("       ,수량												")
						.query("       ,단가												")
						.query("       ,금액												")
						.query("       ,화폐단위											")
						.query("       ,입력일시											")
						.query("       ) values (										")
						.query("       convert(smalldatetime,:istt_date) "		, new  SimpleDateFormat("yyyyMMdd").format(new Date()) )
						.query("      ,:insp_seqn "		, temp.getParamText( "insp_seqn"))
						.query("      ,:istt_wrhs"		, "11"							)
						.query("      ,:istt_dvsn"		, "02"							)
						.query("      ,:offr_numb"		, temp.getParameter("offr_numb"	))
						.query("      ,:offr_seqn"		, temp.getParameter("offr_seqn"	))
						.query("      ,:cstm"			, temp.getParameter("cstm"		))
						.query("      ,:item_code"		, temp.getParameter("item_code"	))
						.query("      ,:item_name"		, temp.getParameter("item_name"	))
	//					.query("      ,:spec"			, temp.getParameter("item_spec"	))
						.query("      ,:acct_dvsn"		, "3"			)
						.query("      ,:qntt"			, temp.getParameter("pass_qntt"	))
						.query("      ,:pric"			, temp.getParameter("pric"		))
						.query("      ,:amnt"			, amnt							)
						.query("      ,:mney_unit"		, temp.getParameter("mney_unit"	))
						.query("      ,convert(smalldatetime,:iput_dttm)"		, new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()) )
						.query("     )													")
					;
					data.attach(Action.direct);
				}else if(set.equals("delete")){
					System.out.println("delete 들어옴");
					data.clear();
					data.param
						.query("delete from 자재입고대장																")
						.query("where convert(char(8),입고일자 ,112) = :istt_date " , row.fixParameter("istt_date"	))
						.query("and 검사번호 = :insp_seqn "							, row.fixParameter("insp_seqn"	))
					;
					data.attach(Action.direct);
				}
			}
		}
	data.execute();
	return null ;
	}

}
