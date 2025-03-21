Ext.define('lookup.popup.model.MembPopup',{ extend:'Axt.data.Model',
    fields: [
    	     {name: 'hq_id'      , type: 'string'  , defaultValue : _global.hq_id },
//   		 {name: 'stor_grp'      , type: 'string'  , defaultValue : _global.stor_grp },
    		 {name: 'stor_id'      , type: 'string'  , defaultValue : _global.stor_id },
    		 {name: 'wrhs_id'      , type: 'string'  },
    		 {name: 'cust_grp'       , type: 'string'  },
    		 {name: 'cust_id'       , type: 'string'  },
    	     {name: 'cust_cd'       , type: 'string'  },
    	     {name: 'cust_nm'       , type: 'string'  },
    	     {name: 'cust_en'       , type: 'string'  },
    	     {name: 'cust_gb'       , type: 'string'  , defaultValue : '1' },
    	     {name: 'mmb_id'       , type: 'string'  },
    	     {name: 'mmb_nm'       , type: 'string'  },
    	     {name: 'memb_gb'       , type: 'string'  , defaultValue : '3' },
    	     {name: 'memb_sts'      , type: 'string'  , defaultValue : '1' },

    	     {name: 'cust_sts'      , type: 'string'  },
    	     {name: 'sts_memo'      , type: 'string'  },



			 {name: 'biz_yn' 		, type: 'string' , defaultValue : '0' , persist : false }, /* 0 개인, 1 법인 */
			 {name: 'biz_no' 		, type: 'string' , persist : false }, /* 사업자 등록번호 */
			 {name: 'biz_nm' 		, type: 'string' , persist : false }, /* 사업자 등록명칭 */
			 {name: 'biz_type' 		, type: 'string' , persist : false }, /* 사업자 업태 */
			 {name: 'biz_type' 	, type: 'string' , persist : false }, /* 사업자 업종 */
			 {name: 'biz_owner' 	, type: 'string' , persist : false }, /* 사업자 대표자명 */
			 {name: 'biz_tel_no' 	, type: 'string' , persist : false }, /* 전화번호 */
			 {name: 'biz_hp_no' 	, type: 'string' , persist : false }, /* 전화번호 */
			 {name: 'biz_fax_no' 	, type: 'string' , persist : false }, /* 팩스번호 */
			 {name: 'biz_email' 	, type: 'string' , persist : false }, /* 사업자 전자메일 */
			 {name: 'biz_state' 	, type: 'string' , persist : false }, /* 사업장 시도 */
			 {name: 'biz_city' 		, type: 'string' , persist : false }, /* 사업장 군구 */
			 {name: 'biz_dong' 		, type: 'string' , persist : false }, /* 사업장 읍면동 */
			 {name: 'biz_zip_cd' 	, type: 'string' , persist : false }, /* 사업장 우편번호 */
			 {name: 'biz_addr_1' 	, type: 'string' , persist : false }, /* 사업장 지역주소 */
			 {name: 'biz_addr_2' 	, type: 'string' , persist : false }, /* 사업장 상세주소 */

			 {name: 'reve_nm' 		, type: 'string' , persist : false }, /* 수령자 명 */
			 {name: 'reve_state' 	, type: 'string' , persist : false }, /* 수령지 시도 */
			 {name: 'reve_city' 	, type: 'string' , persist : false }, /* 수령지 군구 */
			 {name: 'reve_dong' 	, type: 'string' , persist : false }, /* 수령지 읍면동 */
			 {name: 'reve_zip_cd' 	, type: 'string' , persist : false }, /* 수령지 우편번호 */
			 {name: 'reve_addr_1' 	, type: 'string' , persist : false }, /* 수령지 지역주소 */
			 {name: 'reve_addr_2' 	, type: 'string' , persist : false }, /* 수령지 상세주소 */
			 {name: 'reve_tel_no' 	, type: 'string' , persist : false }, /* 수령지 전화번호 */
			 {name: 'recv_hp_no' 	, type: 'string' , persist : false }, /* 수령지 전화번호 */
			 {name: 'reve_fax_no' 	, type: 'string' , persist : false }, /* 수령지 팩스번호 */
			 {name: 'reve_email' 	, type: 'string' , persist : false }, /* 수령지 전자메일 */

			 {name: 'memb_tel_no' 	, type: 'string' , persist : false }, /* 회원 전화번호 */
			 {name: 'memb_addr_1' 	, type: 'string' , persist : false }, /* 회원 주소 */

			 {name: 'npay_amt'        , type: 'float'  , defaultValue : 0 , persist : false }, /* 미수금액 */
			 {name: 'balance_limit'  , type: 'float'  , defaultValue : 0 , persist : false }, /* 미수한도 */
			 {name: 'balance_amount' , type: 'float'  , defaultValue : 0 , persist : false }, /* 미수한도 - 미수금액 */
			 {name: 'limit_control'  , type: 'string' , defaultValue : '0' , persist : false }, /* 한도 초과 대응 0:없음, 1:경고, 3:중지 */
			 {name: 'colt_schd_type'    , type: 'string' , defaultValue : '1' , persist : false }, /* 수금예정타입 */
			 {name: 'colt_schd_term'    , type: 'string' , persist : false }, /* 수금예정일 */
			 {name: 'vaccount_no'    , type: 'string' , persist : false }, /* 가상계좌번호 */
			 {name: 'price_no'       , type: 'int'    , defaultValue : 7 }, /* 판매가격번호 0:통합고객가격, 1~5:출하가, 6:소비자가, 7:포스가, 8:B2C가, 9.구매가, 10.직원가, 11:B2B */

    	     {name: 'row_sts'     , type: 'boolean' , defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt },
    	     {name: 'user_memo'     , type: 'string'  }/* 고객메모 */
    ]
});
