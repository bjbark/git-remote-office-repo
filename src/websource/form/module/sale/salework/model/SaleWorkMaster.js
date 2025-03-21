Ext.define('module.sale.salework.model.SaleWorkMaster', { extend:'Axt.data.Model',
    fields: [

		{name: 'corp_id' 		, type: 'string' , defaultValue : _global.corp_id }, /* 법인 ID */
		{name: 'hq_id' 			, type: 'string' , defaultValue : _global.hq_id }, /* 본사 ID */
		{name: 'stor_grp' 		, type: 'string' , defaultValue : _global.stor_grp }, /* 매장 그룹 */
		{name: 'stor_id' 		, type: 'string' , defaultValue : _global.stor_id }, /* 매장 ID */
		{name: 'stor_nm' 		, type: 'string' , defaultValue : _global.stor_nm }, /* 매장 ID */
		{name: 'wrhs_id' 		, type: 'string' , defaultValue : _global.wrhs_id }, /* 출고매장 ID */
		{name: 'wareh_nm' 		, type: 'string' , defaultValue : _global.wareh_nm , persist : false }, /* 출고매장 ID */
		{name: 'pos_no' 		, type: 'string' , defaultValue : _global.work_pos }, /* 포스 번호 */
		{name: 'invc_numb' 		, type: 'string' }, /* 매출 번호 */

		{name: 'tax_no' 		, type: 'string' }, /* 세금 계산서 번호 */
		{name: 'sts_cd' 		, type: 'string' , defaultValue : '0500' }, /* 상태 코드 */
        {name: 'inv_dt' 		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 발주 일자 */
		{name: 'inv_tm' 		, type: 'string' , defaultValue : Ext.Date.format(new Date(),'Hi' )}, /* 매출 시간 */

		{name: 'inv_inpt_path' 	, type: 'string' , defaultValue : 1 }, /* 매출서 작업 위치 */


		{name: 'inv_work_gb' 	, type: 'string' , defaultValue : 2 }, /* 매출서 작업 위치 */
		{name: 'inv_dept_id' 	, type: 'string' , defaultValue : _global.dept_id }, /* 매출서 작성 부서 */
		{name: 'inv_dept_nm' 	, type: 'string' , persist: false }, /* 매출서 작성 부서명 */
		{name: 'inv_usr_id' 	, type: 'string' , defaultValue : _global.login_pk }, /* 작업 담당자 */
		{name: 'sales_man_id' 	, type: 'string' }, /* 영업 사원 */
		{name: 'salesman_nm' 	, type: 'string' , persist: false }, /* 영업 사원명 */
		{name: 'cust_idcd' 		, type: 'string' }, /* 거래처 코드 */
		{name: 'cust_cd' 		, type: 'string' }, /* 거래처 코드 */
		{name: 'cust_name' 		, type: 'string' }, /* 거래처 명  */
		{name: 'chnl' 			, type: 'string' }, /* 거래처 구분 */
		{name: 'mmb_id' 		, type: 'string' }, /* 회원 ID */
		{name: 'mmb_nm' 		, type: 'string' }, /* 회원명 */
		{name: 'cust_sts' 		, type: 'string' }, /* 거래처 상태 코드 */
		{name: 'sts_memo' 		, type: 'string' }, /* 거래정지 사유 */

		{ name : 'pnt_type'  	, type : 'string' ,defaultValue : '0'  }, /* 포인트 적립타입  0:미적립, 1:매장적립, 2:고객적립 */
		{ name : 'pnt_rt'  		, type : 'float'  ,defaultValue : 0 }, /* 포인트 적립율 */
		{ name : 'cash_pnt_rt'  , type : 'float'  ,defaultValue : 0 }, /* 현금 포인트 적립율 */
		{ name : 'card_pnt_rt'  , type : 'float'  ,defaultValue : 0 }, /* 카드 포인트 적립율 */

		{name: 'tax_type' 		, type: 'string'  , defaultValue : _global.tax_type }, /* 세율 타입  0 :부가세 별도 , 1 : 부가세 포함  */
		{name: 'tax_rt' 		, type: 'float'   , defaultValue : _global.tax_rt      }, /* 적용 세율 */
		{name: 'txfree_amt' 	, type: 'float'   , defaultValue : 0 }, /* 면세금액 */
		{name: 'taxtn_amt' 		, type: 'float'   , defaultValue : 0 }, /* 과세금액 */
		{name: 'sply_amt' 		, type: 'float'   , defaultValue : 0 }, /* 공급가 */
		{name: 'tax_amt' 		, type: 'float'   , defaultValue : 0 }, /* 세액 */
		{name: 'inv_amt'		, type: 'float'   , defaultValue : 0 }, /* 합계금액 */


		{name: 'colt_schd_amt'     		, type: 'float'   , defaultValue : 0 }, /* 받을금액 */
		{name: 'payment'     		, type: 'float'   , defaultValue : 0 }, /* 받은금액 */

//
//		{name: 'payment'		, type: 'float'   , defaultValue : 0 }, /* 합계금액 */
//		{name: 'tax_yn'			, type: 'float'   , defaultValue : 0 }, /* 합계금액 */
//		{name: 'tax_no'			, type: 'float'   , defaultValue : 0 }, /* 합계금액 */

		{name: 'tax_yn' 		, type: 'string' , defaultValue : '0' , persist : false }, /* 계산서 발행 여부  */
		{name: 'tax_dt' 		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr , persist : false }, /* 계산서 발행 일시 */
		{name: 'issue_dt' 		, type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr , persist : false }, /* 계산서 작성 일시 */
		//.query("     , a.txfree_amt, a.sply_amt, a.tax_amt , a.inv_amt , a.payment , a.tax_yn , a.tax_no  ")


		{name: 'biz_yn' 		, type: 'string' }, /* 0 개인, 1 법인 */
		{name: 'biz_no' 		, type: 'string' , convert : Ext.util.Format.StrToBiz , serialize: Ext.util.Format.BizToStr }, /* 사업자 등록번호 */
		{name: 'biz_nm' 		, type: 'string' }, /* 사업자 등록명칭 */
		{name: 'biz_kind' 		, type: 'string' }, /* 사업자 업태 */
		{name: 'biz_type' 		, type: 'string' }, /* 사업자 업종 */
		{name: 'biz_owner' 		, type: 'string' }, /* 사업자 대표자명 */
		{name: 'biz_tel_no' 	, type: 'string' }, /* 전화번호 */
		{name: 'biz_hp_no' 	, type: 'string' }, /* 휴대전화 */
		{name: 'biz_fax_no' 	, type: 'string' }, /* 팩스번호 */
		{name: 'biz_email' 		, type: 'string' }, /* 사업자 전자메일 */
		{name: 'biz_state' 		, type: 'string' }, /* 사업장 시도 */
		{name: 'biz_city' 		, type: 'string' }, /* 사업장 군구 */
		{name: 'biz_dong' 		, type: 'string' }, /* 사업장 읍면동 */
		{name: 'biz_zip_cd' 	, type: 'string' , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr }, /* 사업장 우편번호 */
		{name: 'biz_addr_1' 		, type: 'string' }, /* 사업장 지역주소 */
		{name: 'biz_addr_2' 		, type: 'string' }, /* 사업장 상세주소 */

		{name: 'reve_nm' 		, type: 'string' }, /* 수령자 명 */
		{name: 'reve_state' 	, type: 'string' }, /* 수령지 시도 */
		{name: 'reve_city' 		, type: 'string' }, /* 수령지 군구 */
		{name: 'reve_dong' 		, type: 'string' }, /* 수령지 읍면동 */
		{name: 'reve_zip_cd' 	, type: 'string' , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr }, /* 수령지 우편번호 */
		{name: 'reve_addr_1' 	, type: 'string' }, /* 수령지 지역주소 */
		{name: 'reve_addr_2' 	, type: 'string' }, /* 수령지 상세주소 */
		{name: 'reve_tel_no' 	, type: 'string' }, /* 수령지 전화번호 */
		{name: 'reve_hp_no' 	, type: 'string' }, /* 수령지 전화번호 */
		{name: 'reve_fax_no' 	, type: 'string' }, /* 수령지 팩스번호 */
		{name: 'reve_email' 	, type: 'string' }, /* 수령지 전자메일 */

		{name: '_recv_tel_no' 	, type: 'string' }, /* 참고사항 전화번호 */
		{name: '_recv_tel_hp' 	, type: 'string' }, /* 참고사항 휴대전화 */
		{name: '_recv_fax_no' 	, type: 'string' }, /* 참고사항 팩스번호 */
		{name: '_recv_email' 	, type: 'string' }, /* 참고사항 전자메일 */

		{name: 'pri_no' 		, type: 'int'     , defaultValue : 7 }, /* 판매가격번호 0:통합고객가격, 1~5:출고가, 6:소비자가, 7:포스가, 8:B2C가, 9.구매가, 10.직원가, 11:B2B */

		{name: 'user_memo' 		, type: 'string' }, /* 작업 메모 */
		//{name: 'row_clos'		, type: 'string'  , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },/* 데이터 마감 0=마감전/1:마감후 */
		{name: 'row_clos'		, type: 'string'  , defaultValue: '0' },/* 데이터 마감 0=마감전/1:마감후 */

		{name: 'upt_usr_nm' 		, type: 'string'  , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
		{name: 'crt_usr_nm' 		, type: 'string'  , defaultValue : _global.login_pk }, /* 데이터 생성자 명 */

		/*----------------------------------------------------------*/
		{name: 'cust_owner' 	, type: 'string'  , persist : false }, /* 사업자 대표자명 */
		{name: 'cust_usr_memo' , type: 'string'  , persist : false}, /* 고객메모 */
		{name: 'npay_amt'        , type: 'float'   , defaultValue :  0 , persist : false }, /* 미수금액 */
		{name: 'ar_amt_lmt'  , type: 'float'   , defaultValue :  0 , persist : false }, /* 미수한도 */
		{name: 'balance_amount' , type: 'float'   , defaultValue :  0 , persist : false }, /* 미수한도 - 미수금액 */
		{name: 'lmt_cntl'  , type: 'string'  , defaultValue : '0' , persist : false }, /* 한도 초과 대응 0:없음, 1:경고, 3:중지 */
		{name: 'colt_schd_type'    , type: 'string'  , defaultValue : '1' , persist : false }, /* 수금예정타입 */
		{name: 'colt_schd_term'    , type: 'string'  , persist : false }, /* 수금예정일 */
//		{name: 'vaccount_no'    , type: 'string'  }, /* 가상 계좌번호 */

		{name: 'cls1_nm' 		, type: 'string' , persist : false }, /* 고객분류1명 */
		{name: 'cls2_nm' 		, type: 'string' , persist : false }, /* 고객분류2명 */
		{name: 'cls3_nm' 		, type: 'string' , persist : false }, /* 고객분류3명 */
		{name: 'cls4_nm' 		, type: 'string' , persist : false }, /* 배달방법명 */
		{name: 'cls5_nm' 		, type: 'string' , persist : false }, /* 수금방법명 */
		{name: 'cls6_nm' 		, type: 'string' , persist : false },  /* 수금기일명 */

//		{name : '_recv_nm' 		, type : 'string' , convert: function (value, model) { if (!model.get('reve_nm'  	)) {return model.get('biz_owner');  }else{ return model.get('reve_nm'    );  }}}, /* 수령자 명 */
//		{name : '_recv_state' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_state'  )) {return model.get('biz_state');  }else{ return model.get('reve_state' );  }}}, /* 수령지 시도 */
//		{name : '_recv_city' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_city'  	)) {return model.get('biz_city'	);  }else{ return model.get('reve_city'  );  }}}, /* 수령지 군구 */
//		{name : '_recv_dong' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_dong'  	)) {return model.get('biz_dong'	);  }else{ return model.get('reve_dong'  );  }}}, /* 수령지 읍면동 */
//		{name : '_recv_zip_cd'	, type : 'string' , convert: function (value, model) { if (!model.get('reve_zip_cd' )) {return model.get('biz_zip_cd'); }else{ return model.get('reve_zip_cd');  }}}, /* 수령지 우편번호 */
//		{name : '_recv_addr_1' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_addr_1'  )) {return model.get('biz_addr_1');  }else{ return model.get('reve_addr_1' );  }}}, /* 수령지 지역주소 */
//		{name : '_recv_addr_2' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_addr_2'  )) {return model.get('biz_addr_2');  }else{ return model.get('reve_addr_2' );  }}}, /* 수령지 상세주소 */
		{name : '_recv_tel_no'	, type : 'string' , convert: function (value, model) { if (!model.get('reve_tel_no' )) {return model.get('biz_tel_no'); }else{ return model.get('reve_tel_no');  }}}, /* 수령지 전화번호 */
		{name : '_recv_tel_hp'	, type : 'string' , convert: function (value, model) { if (!model.get('reve_hp_no' )) {return model.get('biz_hp_no'); }else{ return model.get('reve_hp_no');  }}}, /* 수령지 휴대전화 */
		{name : '_recv_fax_no'	, type : 'string' , convert: function (value, model) { if (!model.get('reve_fax_no' )) {return model.get('biz_fax_no'); }else{ return model.get('reve_fax_no');  }}}, /* 수령지 팩스번호 */
		{name : '_recv_email' 	, type : 'string' , convert: function (value, model) { if (!model.get('reve_email'  )) {return model.get('biz_email');  }else{ return model.get('reve_email' );  }}}, /* 수령지 전자메일 */

		{name : 'sales_id'		, type : 'string' , defaultValue : '5105000' }, /* 매출계정 ID */
		{name: 'retn_yn'      	, type: 'string'  , defaultValue : '0' }, /* 반품 여부 */
		{name: 'chnl' 			, type: 'string'  , defaultValue : '1' }, /* 주문 작업 위치  1:메인2:포스3:B2C4:B2B */
		{name: 'pay_dt'      	, type: 'string'  , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 수금 예정 일자 */
		{name: 'org_invc_numb'     , type: 'string'  }, /* 주문 번호 */
		{name: 'cust_grp'     	, type: 'string'  }, /* 거래처 그룹 */
		{name : 'itm_pnt'		, type : 'float'  , defaultValue : 0 }, /* 총상품포인트 */
		{name : 'itm_dsnt'		, type : 'float'  , defaultValue : 0 }, /* 상품할인충액 */
		{name: 'fee_amt'      	, type: 'float'   , defaultValue : 0 }, /* 배송비 */

		{name: 'npay_amt'     	, type: 'float'   , defaultValue : 0 }, /* 미수금액 */

		{ name : '_qty' 		, type : 'float'  , defaultValue : 0 , mapping : 'qty' }, /* 발주 합계 수량(ABS) */
		{name: 'qty'         	, type: 'float'   , defaultValue : 0 }, /* 발주 합계 수량(ABS) */
		{name: 'org_ord_qty'    , type: 'float'   , defaultValue : 0 }, /* 원주문 합계 수량(ABS) */
		{name: 'deli_qty'    	, type: 'float'   , defaultValue : 0 }, /* 매입량 합계 수량(ABS) */
		{name: 'point_rate_type', type: 'string'  , defaultValue : '0' }, /* 포인트적립타입, 0:미적립 */
		{name: 'cash_pnt_rt'   	, type: 'float'   , defaultValue : 0 }, /* 현금 포인트 적립율 */
		{name: 'card_pnt_rt'   	, type: 'float'   , defaultValue : 0 }, /* 카드 포인트 적립율 */
		{name: 'add_pnt'   		, type: 'float'   , defaultValue : 0 }, /* 사용 포인트 */
		{name: 'use_pnt'   		, type: 'float'   , defaultValue : 0 }, /* 적립 포인트 */
		{name: 'req_msg'     	, type: 'string'  }, /* 발주 요청  메세지 */
		{name: 'recv_addr3' 	, type : 'string' }, /* 수령지 상세주소 */
		{name: 'hdli_id' 		, type : 'string' }, /* 택배사 ID */
		{name: 'taekbae_nm' 	, type : 'string' , persist : false }, /* 택배사 ID */
		{name: 'hdli_no' 		, type : 'string' }, /* 송장번호 */
		{name: 'inv_prt_cnt' 	, type : 'int'    , defaultValue : 0 }, /* 택배수량 */
		{name : 'ctrl_id' 		, type : 'string' }, /* 계약 매장 ID (오피스알파 쇼핑몰 주문) */
		{name : 'mro_no'      	, type: 'string'  }, /* mro 주문 번호 */
		{name : 'mro_id'      	, type: 'string'  },  /* mro id */
		{name : 'retn_gb'	    , type: 'string'  } /* 0 : 결제1 : 취소 # red3 : 반품4 : 환불 */
    ]
});
