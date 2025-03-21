Ext.define('module.project.storeinfo.model.StoreInfoAddon',{ extend:'Axt.data.Model',
    fields:
    [
	  	{name: 'hq_id',            type: 'string'  },
	 	{name: 'ctrl_id',          type: 'string'  },
     	{name: 'stor_id',          type: 'string'  },

     	{name: 'tax_addon_id',      type: 'string'  },
     	{name: 'tax_provider',      type: 'string'  , defaultValue : '0'  },
     	{name: 'tax_api_user',      type: 'string'  },
     	{name: 'tax_api_pswd',      type: 'string'  },
     	{name: 'tax_api_http',      type: 'string'  },
        {name: 'tax_user_memo',     type: 'string'  },

     	{name: 'sms_addon_id',      type: 'string'   },
     	{name: 'sms_provider',      type: 'string'  , defaultValue : '0'  },
     	{name: 'sms_pri',           type: 'float'   , defaultValue : 0 },
     	{name: 'lms_pri',           type: 'float'   , defaultValue : 0 },
     	{name: 'mms_pri',           type: 'float'   , defaultValue : 0 },
     	{name: 'sms_api_user',      type: 'string'  },
     	{name: 'sms_user_memo',     type: 'string'  },

     	{name: 'omp_provider',      type: 'string'  , defaultValue : '0'  },
     	{name: 'omp_api_http',     	type: 'string'  },
     	{name: 'omp_key_code',    	type: 'string'  },
     	{name: 'omp_api_user',      type: 'string'  },
     	{name: 'omp_api_pswd',      type: 'string'  },
     	{name: 'omp_user_memo',     type: 'string'  },

     	{name: 'pos_ddns',          type: 'string'  },
     	{name: 'pjt_id',            type: 'string'  },
     	{name: 'del_yn',            type: 'string'  },

        {name: 'row_sts',           type: 'string'   , defaultValue : 0 } , // defaultValue: false, convert : Ext.util.Format.intToBool, serialize: Ext.util.Format.boolToInt }
	    {name: 'upt_ui',            type: 'string'   , defaultValue: '0000000709'   },
	    {name: 'crt_ui',            type: 'string'   , defaultValue: '0000000709'   },
        {name: 'upt_id',            type: 'string'   , defaultValue : _global.login_pk }, /* 데이터 수정자 명 */
        {name: 'crt_id',            type: 'string'   , defaultValue : _global.login_pk } /* 데이터 생성자 명 */
    ]
});
