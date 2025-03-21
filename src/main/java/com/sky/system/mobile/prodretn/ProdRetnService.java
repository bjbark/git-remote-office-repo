package com.sky.system.mobile.prodretn;

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
public class ProdRetnService {

	final Logger logger = LoggerFactory.getLogger(this.getClass());

	public SqlResultMap getSearch(HttpRequestArgument arg, int page, int rows, String sort) throws Exception {
		DataMessage data;
		String hq = arg.getParamText("hqof_idcd") ;
		if (hq.length() > 0 ) { data = new DataMessage(hq+".POS"); }
//		else                  { data = new DataMessage(SqlRepository.NETHOSTING);      }
		else                  { data = new DataMessage("N1000WINFO.POS");            }
		data.param // 집계문
			.total("select count(1) as maxsize																")
		;

		data.param // 조회

			.where("select 																					")
			.where("		m.출고번호			as ostt_numb													")
			.where("		, convert(char(8),m.출고일자 ,112)		as ostt_date								")
			.where("		, m.수주번호		as acpt_numb													")
			.where("		, a.거래처명  		AS cstm_name													")
			.where("		, m.품목코드		as item_code													")
			.where("		, c.품명			as item_name													")
			.where("		, c.규격			as mold_spec													")
			.where("		, f.수량			as qntt															")
			.where("		, m.수량			as ostt_qntt													")
			.where("		, m.단가			as pric															")
			.where("		, m.비고			as remk_text													")
			.where("		, m.수주항번		as acpt_seqn													")
			.where("		, m.출고번호		as cnfm															")
			.where("		, m.납품처			as dlvy_offe													")
			.where("		, m.출고번호2		as cnfm_2snd													")
			.where("		, convert(char(8),(select 수주일자 from 수주서 j where m.수주번호 = j.수주번호) ,112)	as acpt_date")
			.where("from    제품출고대장 m left outer join 거래처마스터 a on m.거래처 = a.거래처코드,품목정보 c,수주대장 f			")
			.where("where   1=1																				")
			.where("and   f.수주번호 = m.수주번호																	")
			.where("and     m.품목코드 = c.품목코드																")
			.where("and     f.수주항번 = m.수주항번																")
			.where("and     d.품명        like %:item_name%	" , arg.getParamText("item_name")					 )
			.where("and     c.거래처명   like %:cstm_name%	" , arg.getParamText("cstm_name")					 )
			.where("and     convert(char(8),m.출고일자 ,112)  between :fr_dt  ", arg.fixParameter("fr_dt")		 )
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt")		 )
			.where("and     d.수주번호 = :acpt_numb	" 		  , arg.getParamText("acpt_numb")					 )
			.where("and     d.수주항번 = :acpt_seqn	" 		  , arg.getParamText("acpt_seqn")					 )
			.where("and		m.수주번호 not in (select 수주번호 from 반품의뢰)											")
			.where("order by ostt_date desc																	")
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
			.total("select count(1) as maxsize																")
		;

		data.param // 조회

			.where("select 																					")
			.where("		m.출고번호			as ostt_numb													")
			.where("		, convert(char(8),m.출고일자 ,112)		as ostt_date								")
			.where("		, m.수주번호		as acpt_numb													")
			.where("		, a.거래처명  		AS cstm_name													")
			.where("		, m.품목코드		as item_code													")
			.where("		, c.품명			as item_name													")
			.where("		, c.규격			as mold_spec													")
			.where("		, f.수량			as qntt															")
			.where("		, m.수량			as ostt_qntt													")
			.where("		, m.단가			as pric															")
			.where("		, m.비고			as remk_text													")
			.where("		, m.수주항번		as acpt_seqn													")
			.where("		, m.출고번호		as cnfm															")
			.where("		, m.납품처			as dlvy_offe													")
			.where("		, convert(char(8),f.납기일자,112)		as deli_date								")
			.where("		, m.출고번호2		as cnfm_2snd													")
			.where("		, convert(char(8),(select 수주일자 from 수주서 j where m.수주번호 = j.수주번호) ,112)	as acpt_date")
			.where("from    제품출고대장 m left outer join 거래처마스터 a on m.거래처 = a.거래처코드,품목정보 c,수주대장 f			")
			.where("where   1=1																				")
			.where("and   f.수주번호 = m.수주번호																	")
			.where("and     m.품목코드 = c.품목코드																")
			.where("and     f.수주항번 = m.수주항번																")
			.where("and     d.품명        like %:item_name%	" , arg.getParamText("item_name")					 )
			.where("and     c.거래처명   like %:cstm_name%	" , arg.getParamText("cstm_name")					 )
			.where("and     convert(char(8),m.출고일자 ,112)  between :fr_dt  ", arg.fixParameter("fr_dt")		 )
			.where("                                          and :to_dt  ", arg.fixParameter("to_dt")		 )
			.where("and     d.수주번호 = :acpt_numb	" 		  , arg.getParamText("acpt_numb")					 )
			.where("and     d.수주항번 = :acpt_seqn	" 		  , arg.getParamText("acpt_seqn")					 )
			.where("and		m.수주번호 in (select 수주번호 from 반품의뢰)												")
			.where("order by ostt_date desc																	")
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




