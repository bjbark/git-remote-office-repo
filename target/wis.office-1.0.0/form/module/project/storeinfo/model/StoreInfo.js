Ext.define('module.project.storeinfo.model.StoreInfo',{ extend:'Axt.data.Model',
    fields: [
     	{name: '_ctrl_id',         	type: 'string'  , mapping : 'ctrl_id' },
     	{name: 'ctrl_id',          	type: 'string'  },
     	{name: 'ctrl_nm',          	type: 'string'  },
        {name: 'rqust_dt',         	type: 'string'   , defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 발주 일자 */
        {name: 'trmn_dt',          	type: 'string'   , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr } , /* 발주 일자 */
     	{name: 'rqust_gb',         	type: 'string'   , defaultValue : 'A' },
     	{name: 'rqust_type',       	type: 'string'   , defaultValue : '0' },
     	{name: 'cont_cont',        	type: 'string'   },

     	{name: 'chnl_id',          	type: 'string'  , defaultValue : '000-000-000' },
     	{name: 'distr_nm',         	type: 'string'  },

     	{name: 'agent_id',         	type: 'string'  , defaultValue : '000-000-000' },
     	{name: 'mngt_chnl_nm',    	type: 'string'  },

     	{name: 'call_cntr_id',      type: 'string'  , defaultValue : '000-000-000' },
     	{name: 'phone_nm',          type: 'string'  },

     	{name: 'pjt_id',           	type: 'string'  },
     	{name: 'pjt_url',          type: 'string'  , persist : false },
     	{name: 'sys_clnt_reg_yn',   type: 'string'  , defaultValue : '1' },
     	{name: 'bizmeka_id',        type: 'string'  },

     	{name: 'pos_ddns',          type: 'string'  },
     	{name: 'web_ddns',          type: 'string'  },

     	{name: 'own_stor_id',       type: 'string'  },
        {name: 'corp_id',          	type: 'string'  },
        {name: 'corp_nm',          	type: 'string'  },
        {name: 'hq_id',          	type: 'string'  },
        {name: 'hq_nm',          	type: 'string'  },

        {name: 'hq_grp',          	type: 'string'  },
        {name: 'hq_gb',          	type: 'string'  },

        {name: 'stor_grp',          type: 'string'  },
        {name: 'stor_id',          	type: 'string'  },
        {name: 'stor_nm',          	type: 'string'  },
        {name: 'stor_gb',          	type: 'string'  },  /* 매장 구분 */

        {name: 'erp_id',          	type: 'string'  },  /* 백오피스 로그인 ID */
        {name: 'erp_pwd',          	type: 'string'  },  /* 백오피스 로그인 PW */

        {name: 'login_id',          type: 'string'  },  /* 초기 ID */
        {name: 'login_pwd',         type: 'string'  },  /* 초기 비빌번호 */
        {name: 'converted',         type: 'string'  },  /* 과거 */
        {name: 'switch_br',         type: 'string'  },  /* 과거 */
        {name: 'switch_pk',         type: 'string'  },  /* 과거 */

        {name: 'etax_ofr_id',     	type: 'string'   , defaultValue : '0' },
        {name: 'etax_ofr_cd',     	type: 'string'  },
        {name: 'etax_ofr_pwd',     	type: 'string'  },

        {name: 'sms_ofr_id',     	type: 'string'   , defaultValue : '0' },
        {name: 'sms_ofr_cd',     	type: 'string'  },
        {name: 'sms_ofr_pwd',     	type: 'string'  },

        {name: 'fax_ofr_id',     	type: 'string'   , defaultValue : '0' },
        {name: 'fax_ofr_cd',     	type: 'string'  },
        {name: 'fax_ofr_pwd',     	type: 'string'  },

        {name: 'hq_sts',         	type: 'string'   , defaultValue : '1000'  },

        {name: '_rqust_sts',        type: 'string'   , defaultValue : '1000' , mapping : 'ctrl_sts' },
        {name: 'rqust_sts',         type: 'string'   , defaultValue : '1000' },

        {name: '_chrg_id',        	type: 'string'  , mapping : 'chrg_id' }, /* 과금 채널 */
        {name: 'chrg_id',         	type: 'string'   }, /* 과금 채널 */
        {name: 'chrg_nm',         	type: 'string'   }, /* 과금 채널 */
        {name: 'trns_sts',        	type: 'string'   }, /* 과금 채널 */

        {name: 'hq_ver',         	type: 'string'  },
        {name: 'del_yn',         	type: 'string'   , defaultValue : '0' },

//        {name: 'stor_fee',        type: 'float'  },
//        {name: 'intl_fee',        type: 'float'  },
//        {name: 'mn_fee',         	type: 'float'  },

        {name: 'warn_msg',         	type: 'string'  },

        {name: 'last_read_dt',      type: 'string'  , persist: false  , convert : Ext.util.Format.strToDate },
        {name: 'last_sale_dt',      type: 'string'  , persist: false  , convert : Ext.util.Format.strToDate },


        {name: 'biz_gb',			type: 'string'   , defaultValue : '1' },/*사업자 구분 */
        {name: 'biz_no',			type: 'string'  },/*사업자 등록 번호*/
        {name: 'biz_nm',			type: 'string'  },/*사업자 등록 명칭*/
        {name: 'biz_type',			type: 'string'  },/*사업장 업태*/
        {name: 'biz_kind',			type: 'string'  },/*사업장 업종*/
        {name: 'biz_owner',			type: 'string'  },/*사업장 대표자*/
        {name: 'biz_email',			type: 'string'  },/*사업장 메일주소*/
        {name: 'biz_tel_no',		type: 'string'  },/*사업장 메일주소*/
        {name: 'biz_hp_no',			type: 'string'  },/*사업장 휴대전화*/
        {name: 'biz_fax_no',		type: 'string'  },/*사업장 메일주소*/
        {name: 'biz_zip_cd',		type: 'string'   , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr },/*사업자 등록증의 우편번호  , convert : Ext.util.Format.StrToZip ,  */
	    {name: 'biz_addr_1',        type: 'string'   , serialize : function (value, record) { return record.get('biz_state') +  ' ' +  record.get('biz_city') +  ' ' +  record.get('biz_dong') }},
        //{name: 'biz_addr_1',		type: 'string'  },/*사업자 등록증의 나머지 주소*/
        {name: 'biz_addr_2',		type: 'string'  },/*사업자 등록증의 나머지 주소*/
        {name: 'biz_state',	type: 'string'  },/*사업자 등록증의 시/도*/
        {name: 'biz_city',		type: 'string'  },/*사업자 등록증의 군/구*/
        {name: 'biz_dong',		type: 'string'  },/*사업자 등록증의 읍/면/동*/

        {name: 'zip_cd',			type: 'string'   , convert : Ext.util.Format.StrToZip , serialize: Ext.util.Format.ZipToStr },/*사업장의 우편번호  , convert : Ext.util.Format.StrToZip ,  */
        {name: 'state',		type: 'string'  },/*사업장의 시/도*/
        {name: 'city',			type: 'string'  },/*사업장의 군/구*/
        {name: 'dong',			type: 'string'  },/*사업장의 읍/면/동*/
        {name: 'addr_1',			type: 'string'  , serialize : function (value, record) { return record.get('state') +  ' ' +  record.get('city') +  ' ' +  record.get('dong') }},

        {name: 'addr_2',			type: 'string'  },/*사업장의 나머지 주소*/
        {name: 'map_url',		    type: 'string'  },

        {name: 'prnt_id',         	type: 'string'},
        {name: 'row_lvl',         	type: 'string', defaultValue : 0 },

        {name: 'erp_chain',         type: 'string'},

        {name: 'find_nm',         type: 'string' 	, serialize : function ( value , record) { return resource.fusion( '#{stor_id}/#{ctrl_nm}/#{stor_nm}' , record ) } },

        {name: 'usr_memo',         	type: 'string'},
        {name: 'row_sts',         	type: 'string', defaultValue : 0 } , // defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }

	    {name: 'upt_ui',         type: 'string'  , defaultValue: ''   },
	    {name: 'crt_ui',         	type: 'string'  , defaultValue: ''   },
        {name: 'upt_id',         type: 'string', defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
        {name: 'crt_id',         	type: 'string', defaultValue : _global.login_pk }, /* 데이터 생성자 명 */
        {name: '_login_issue_yn',   type: 'string', defaultValue : '0' } // 신규 로그인 ID 발급
    ]
});
