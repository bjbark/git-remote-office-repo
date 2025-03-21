package com.sky.system.mobile.prodostt;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.sky.data.DataMessage;
import com.sky.data.SqlParameter;
import com.sky.data.SqlResultMap;
import com.sky.data.SqlResultRow;
import com.sky.data.SqlParameter.Action;
import com.sky.http.HttpRequestArgument;
import com.sky.data.SqlParamText;

@Service
public class ProdOsttService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		data = new DataMessage(hq+".POS");
		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param // 조회
			.query("select a.* , a.qntt - a.ostt_qntt as not_ostt_qntt										")
		;
		data.param // 조회
			.where("from (																					")
			.where("select 																					")
			.where("		m.수주번호		as acpt_numb														")
			.where("		, d.수주항번		as acpt_seqn													")
			.where("		, m.수주구분		as acpt_dvsn													")
			.where("		, concat(m.수주번호 ,'-', d.수주항번) as acpt_disp										")
			.where("		, m.사업장		as bzpl																")
			.where("		, m.거래처		as cstm																")
			.where("		, c.거래처명  		AS cstm_name													")
			.where("		, m.영업부서		as sale_dept													")
			.where("		, m.영업담당		as sale_drtr													")
			.where("		, (SELECT 성명	FROM 사원정보     R WHERE m.영업담당 = R.사원번호)  AS sale_drtr_name		")
			.where("		, convert(char(8),m.수주일자 ,112)		as acpt_date								")
			.where("		, m.판매구분		as sale_dvsn													")
			.where("		, m.지불조건		as paym_cond													")
			.where("		, m.결제조건		as apvl_cond													")
			.where("		, m.고객발주번호	as cstm_offr_numb													")
			.where("		, m.po종류		as pcod_kind													")
			.where("		, m.구분			as dvsn															")
			.where("		, m.원발주일		as orig_offr_date												")
			.where("		, m.비고구분		as remk_text_dvsn												")
			.where("		, m.사출칼라비고 	as ejac_colr_remk_text												")
			.where("		, m.주의사항		as atpt															")
			.where("		, m.납품장소		as dlvy_loct													")
			.where("		, d.신규여부		as anew_yorn													")
			.where("		, d.품목코드		as item_code													")
			.where("		, d.품명			as item_name													")
			.where("		, d.규격			as spec															")
			.where("		, d.단위			as unit															")
			.where("		, d.수량			as qntt															")
			.where("		, isnull((select sum(수량) from 제품출고대장 r where d.수주번호 = r.수주번호 					")
			.where("				  and    d.수주항번 = r.수주항번),0) as ostt_qntt								")
			.where("		, d.단가			as pric															")
			.where("		, convert(char(8),d.납기일자 ,112)		as deli_date								")
			.where("		, d.비고			as remk_text													")
			.where("		, d.순번			as seqn															")
			.where("		, d.확인			as cnfm															")
			.where("		, d.확인자		as cnfm_amen														")
			.where("		, d.확인일시		as cnfm_dttm													")
			.where("		, d.납품처		as dlvy_offe														")
			.where("		, d.상태			as stat															")
			.where("		, d.고객품목코드	as cstm_item_code													")
			.where("		, d.생산대기		as prod_idle													")
			.where("		, d.확인2		as cnfm_2snd														")
			.where("		, d.확인일시2		as cnfm_dttm_2snd												")
			.where("		, d.납기확정일자2	as deli_fxdt_2snd												")
			.where("		, d.납기확정일자3	as deli_fxdt_3trd												")
			.where("		, d.확인자2		as cnfr_2snd													")
			.where("		, d.확인비고		as cnfm_remk_text												")
			.where("		, d.확인비고2		as cnfm_remk_text_2snd											")
			.where("		, d.출고검사일		as ostt_insp_date												")
			.where("		, d.납기일자변경비고	as dlvy_date_chge_remk_text										")
			.where("		, d.수주완료처리자	as acpt_cmpl_drtr												")
			.where("		, d.수주완료처리일시	as acpt_cmpl_dttm												")
			.where("		, d.수주완료		as acpt_cmpl													")
			.where("		, d.사양확정여부		as optn_cofm_yorn												")
			.where("from    수주대장 d , 수주서 m																	")
			.where("		left outer join 거래처마스터 c on m.거래처 = c.거래처코드									")
			.where("where   d.수주번호 = m.수주번호																")
//			.where("and     d.수주완료 in ('0')																	")
			.where("and     d.품명        like %:item_name%	" , arg.getParamText("item_name"))
			.where("and     c.거래처명   like %:cstm_name%	" , arg.getParamText("cstm_name"))
			.where("and     convert(char(10),d.납기일자 ,120) between :fr_dt  ", arg.fixParameter("fr_dt"))
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt"))
			.where(") a																						")
			.where("where   1=1																				")
			.where("and     qntt > ostt_qntt																")
			.where("and     d.수주번호 = :acpt_numb	" , arg.getParamText("acpt_numb"))
			.where("and     d.수주항번 = :acpt_seqn	" , arg.getParamText("acpt_seqn"))
			.where("order by acpt_date desc , acpt_numb														")
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
		data = new DataMessage(hq+".POS");
		data.param // 집계문
			.total("select count(1) as maxsize																")
		;
		data.param // 조회
			.query("select a.* , a.qntt - a.ostt_qntt as not_ostt_qntt										")
		;
		data.param // 조회
			.where("from (																					")
			.where("select 																					")
			.where("		m.수주번호			as acpt_numb													")
			.where("		, d.수주항번		as acpt_seqn													")
			.where("		, m.수주구분		as acpt_dvsn													")
			.where("		, concat(m.수주번호 ,'-', d.수주항번) as acpt_disp										")
			.where("		, m.사업장			as bzpl															")
			.where("		, m.거래처			as cstm															")
			.where("		, c.거래처명  		AS cstm_name													")
			.where("		, m.영업부서		as sale_dept													")
			.where("		, m.영업담당		as sale_drtr													")
			.where("		, (SELECT 성명	FROM 사원정보     R WHERE m.영업담당 = R.사원번호)  AS sale_drtr_name		")
			.where("		, convert(char(8),m.수주일자 ,112)		as acpt_date								")
			.where("		, m.판매구분		as sale_dvsn													")
			.where("		, m.지불조건		as paym_cond													")
			.where("		, m.결제조건		as apvl_cond													")
			.where("		, m.고객발주번호	as cstm_offr_numb													")
			.where("		, m.po종류		as pcod_kind													")
			.where("		, m.구분			as dvsn															")
			.where("		, m.원발주일		as orig_offr_date												")
			.where("		, m.비고구분		as remk_text_dvsn												")
			.where("		, m.사출칼라비고 	as ejac_colr_remk_text												")
			.where("		, m.주의사항		as atpt															")
			.where("		, m.납품장소		as dlvy_loct													")
			.where("		, d.신규여부		as anew_yorn													")
			.where("		, d.품목코드		as item_code													")
			.where("		, d.품명			as item_name													")
			.where("		, d.규격			as spec															")
			.where("		, d.단위			as unit															")
			.where("		, d.수량			as qntt															")
			.where("		, isnull((select sum(수량) from 제품출고대장 r where d.수주번호 = r.수주번호 					")
			.where("				  and    d.수주항번 = r.수주항번),0) as ostt_qntt								")
			.where("		, d.단가			as pric															")
			.where("		, convert(char(8),d.납기일자 ,112)		as deli_date								")
			.where("		, d.비고			as remk_text													")
			.where("		, d.순번			as seqn															")
			.where("		, d.확인			as cnfm															")
			.where("		, d.확인자			as cnfm_amen													")
			.where("		, d.확인일시		as cnfm_dttm													")
			.where("		, d.납품처			as dlvy_offe													")
			.where("		, d.상태			as stat															")
			.where("		, d.고객품목코드		as cstm_item_code												")
			.where("		, d.생산대기		as prod_idle													")
			.where("		, d.확인2			as cnfm_2snd													")
			.where("		, d.확인일시2		as cnfm_dttm_2snd												")
			.where("		, d.납기확정일자2	as deli_fxdt_2snd												")
			.where("		, d.납기확정일자3	as deli_fxdt_3trd												")
			.where("		, d.확인자2		as cnfr_2snd													")
			.where("		, d.확인비고		as cnfm_remk_text												")
			.where("		, d.확인비고2		as cnfm_remk_text_2snd											")
			.where("		, d.출고검사일		as ostt_insp_date												")
			.where("		, d.납기일자변경비고	as dlvy_date_chge_remk_text										")
			.where("		, d.수주완료처리자	as acpt_cmpl_drtr												")
			.where("		, d.수주완료처리일시	as acpt_cmpl_dttm												")
			.where("		, d.수주완료		as acpt_cmpl													")
			.where("		, d.사양확정여부		as optn_cofm_yorn												")
			.where("		, convert(char(8),a.출고일자,112)		as ostt_date								")
			.where("from    수주대장 d , 수주서 m																	")
			.where("		left outer join 거래처마스터 c on m.거래처 = c.거래처코드,									")
			.where("		제품출고대장 a																		")
			.where("where   d.수주번호 = m.수주번호																")
			.where("and     d.수주번호 = a.수주번호																")
			.where("and     d.수주완료 in ('0')																	")
			.where("and     d.품명        like %:item_name%	" , arg.getParamText("item_name"))
			.where("and     c.거래처명   like %:cstm_name%	" , arg.getParamText("cstm_name"))
			.where("and     convert(char(10),a.출고일자 ,120) between :fr_dt  ", arg.fixParameter("fr_dt"))
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt"))
			.where(") a																						")
			.where("where   1=1																				")
			.where("and     ostt_qntt <> 0																	")
			.where("order by ostt_date desc , acpt_date														")
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
		if (hq.length() > 0 ) {
			data = new DataMessage(hq+".POS");
			read = new DataMessage(hq+".POS");
		} else {
			data = new DataMessage("N1000WINFO.POS");
			read = new DataMessage("N1000WINFO.POS");
		};
		SqlResultRow temp ;
		SqlResultRow temp1 ;
		SqlResultRow temp2 ;

		for(SqlResultRow row:arg.getParameter("records", SqlResultMap.class)){
			Action rowaction = SqlParameter.Action.setValue(row.getParameter("_set"));
			System.out.println("rowaction : "+rowaction);
			if (rowaction == Action.delete) {
				data.param
					.table("수주대장")
					.where("where 수주번호  = :acpt_numb")
					.where("and   수주항번  = :acpt_seqn")

					.unique("acpt_numb"			, row.fixParameter("acpt_numb"				))
					.update("acpt_seqn"			, row.fixParameter("acpt_seqn"				))
					.update("상태"				, '2'										)
					;data.attach(Action.update);

			} else {
				data.param
					.table("수주대장")
					.where("where 수주번호  = :acpt_numb										")
					.where("and   수주항번  = :acpt_seqn										")

					.unique("acpt_numb"			, row.fixParameter("acpt_numb"				))
					.update("acpt_seqn"			, row.fixParameter("acpt_seqn"				))

					.update("상태"				, '1'										)
					;data.attach(rowaction);
				read.clear();
				read.param
					.query("select	isnull(max(substring(출고번호,1,11)),'IP-C-190601')  as last_num	")
					.query("from    제품출고대장  a												")
				;
				temp1 = read.selectForRow();
				read.clear();
				read.param
					.query("select	isnull(max(substring(출고번호,12,3)),0) + 1 as last_seq	")
					.query("from    제품출고대장  a												")
					.query("where   substring(출고번호,1,11) = :ostt_numb ", temp1.getParamText("last_num"))
				;
				temp2 = read.selectForRow();

				read.clear();
				read.param
					.query("select a.* , a.qntt - a.ostt_qntt as not_ostt_qntt			")
					.query("from (														")
					.query("select 														")
					.query("		  m.수주번호	as acpt_numb							")
					.query("		, d.수주항번	as acpt_seqn							")
					.query("		, m.거래처		as cstm									")
					.query("		, d.납품처		as dlvy_offe							")
					.query("		, m.영업부서	as sale_dept							")
					.query("		, m.판매구분	as sale_dvsn							")
					.query("		, d.품목코드	as item_code							")
					.query("		, isnull((select sum(수량) 							")
					.query("				  from   제품출고대장 r where d.수주번호 = r.수주번호 	")
					.query("				  and    d.수주항번 = r.수주항번),0) as ostt_qntt	")
					.query("		, d.수량		as qntt									")
					.query("		, d.단위		as unit									")
					.query("		, d.단가		as pric									")
					.query("		, m.영업담당	as sale_drtr							")
					.query("from	수주대장 d , 수주서 m										")
					.query("where	d.수주번호 = m.수주번호									")
					.query("and		d.수주번호  = :acpt_numb " , row.fixParameter("acpt_numb"))
					.query("and		d.수주항번  = :acpt_seqn " , row.fixParameter("acpt_seqn"))
					.query(") a															")
				;
				temp = read.selectForRow();
				if (temp != null) {
					data.clear();
					double amnt	= Double.parseDouble(temp.getParamText("not_ostt_qntt" ))
								* Double.parseDouble(temp.getParamText("pric" ));
					double vatx	= Double.parseDouble(temp.getParamText("not_ostt_qntt" ))
								* Double.parseDouble(temp.getParamText("pric" ))
								* 0.1;
					data.param
						.table("제품출고대장")
						.where("where 출고번호  = :출고번호								")
						.where("and   출고항번  = :출고항번								")

						.unique("출고번호"	, temp1.getParamText("last_num"	)
											+ String.format("%03d",Integer.parseInt(temp2.getParamText("last_seq")))
								)
						.unique("출고항번"	, 1											)

						.update("출고일자"	, new  SimpleDateFormat("yyyyMMdd").format(new Date()))
						.update("거래처"		, temp.getParamText("cstm"					))
						.update("납품처"		, temp.getParamText("dlvy_offe"				))
						.update("부서"		, temp.getParamText("sale_dept"				))
						.update("판매구분"	, temp.getParamText("sale_dvsn"				))
						.update("출고구분"	, new  SqlParamText("'11'"					))
						.update("창고"		, new  SqlParamText("'01'"					))
						.update("품목코드"	, temp.getParamText("item_code"				))
						.update("수량"		, temp.getParamText("not_ostt_qntt"			))
						.update("단위"		, temp.getParamText("unit"					))
						.update("단가"		, temp.getParamText("pric"					))
						.update("금액"		, amnt										)
						.update("부가세"		, vatx										)
						.update("수주번호"	, temp.getParamText("acpt_numb"				))
						.update("수주항번"	, temp.getParamText("acpt_seqn"				))
						.update("입력일시"	, new SimpleDateFormat("yyyyMMdd").format(new Date()))
						.update("영업담당"	, temp.getParamText("sale_drtr"				))
						.update("영업부서"	, temp.getParamText("sale_dept"				))
					;
					data.attach(Action.insert);
				}
			}
		}
		data.execute();
		return null ;
	}


}




