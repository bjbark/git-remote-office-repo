Ext.define('lookup.popup.vend.model.VendPopup',{ extend:'Axt.data.Model',
    fields: [
			{name: 'hq_id' ,             type: 'string'  , defaultValue : _global.hq_id }, /* 본사 ID */
			{name: 'stor_id' ,             type: 'string'  , defaultValue : _global.stor_id }, /* 매장 ID  ( 발주 등록 매장 ) */
    	    {name: 'vend_id',         	    type: 'string'  },
            {name: 'vend_nm',       	    type: 'string'  },
            {name: 'vend_cd',       	    type: 'string'  },
            {name: 'vend_gb',       	    type: 'string'  },
            {name: 'vend_sts',       	    type: 'string'  },
            {name: 'biz_no',       	    	type: 'string'  },
            {name: 'biz_owner',       	    type: 'string'  },

    		{ name : 'biz_nm' 				, type : 'string' }, /* 사업자 등록명칭 */
    		{ name : 'biz_type' 			, type : 'string' }, /* 사업자 업태 */
    		{ name : 'biz_type' 			, type : 'string' }, /* 사업자 업종 */
    		{ name : 'biz_state' 		, type : 'string' }, /* 사업장 시도 */
    		{ name : 'biz_city' 		, type : 'string' }, /* 사업장 군구 */
    		{ name : 'biz_dong' 		, type : 'string' }, /* 사업장 읍면동 */
    		{ name : 'biz_zip_cd' 			, type : 'string'  , convert : Ext.util.Format.StrToZip, serialize : Ext.util.Format.ZipToStr }, /* 사업장 우편번호 */
    		{ name : 'biz_addr_1' 			, type : 'string' }, /* 사업장 지역주소 */
    		{ name : 'biz_addr_2' 			, type : 'string' }, /* 사업장 상세주소 */
    		{ name : 'biz_email' 			, type : 'string' }, /* 사업자 전자메일 */
    		{ name : 'biz_hp_no'			, type : 'string' }, /* 휴대전화 */
    		{ name : 'biz_tel_no'			, type : 'string' }, /* 전화번호 */
    		{ name : 'biz_fax_no' 			, type : 'string' }, /* 팩스번호 */

            { name : 'reve_nm' 				, type : 'string' }, /* 수령자 명 */
    		{ name : 'reve_state' 			, type : 'string' }, /* 수령지 시도 */
    		{ name : 'reve_city' 			, type : 'string' }, /* 수령지 군구 */
    		{ name : 'reve_dong' 			, type : 'string' }, /* 수령지 읍면동 */
    		{ name : 'reve_zip_cd'			, type : 'string' }, /* 수령지 우편번호 */
    		{ name : 'reve_addr_1' 			, type : 'string' }, /* 수령지 지역주소 */
    		{ name : 'reve_addr_2' 			, type : 'string' }, /* 수령지 상세주소 */
    		{ name : 'recv_addr3' 			, type : 'string' }, /* 수령지 주소설명 */
    		{ name : 'reve_email' 			, type : 'string' }, /* 수령자 전자메일 */
    		{ name : 'reve_hp_no' 			, type : 'string' }, /* 수령자 휴대전화 */
    		{ name : 'reve_tel_no'			, type : 'string' }, /* 수령자 전화번호 */
    		{ name : 'reve_fax_no'			, type : 'string' }  /* 수령자 팩스번호 */
    ]
});
