Ext.define('module.custom.sjflv.item.bommast.model.BomMastLister3', { extend:'Axt.data.Model',
	fields: [
		{	name: 'prnt_item_idcd'	, type: 'string'
		},{	name: 'revs_numb'		, type: 'string'
		},{	name: 'revs_dvcd'		, type: 'string'
		},{	name: 'line_seqn'		, type: 'float'
		},{	name: 'ivst_item_idcd'	, type: 'string'
		},{	name: 'item_code'		, type: 'string'
		},{	name: 'item_name'		, type: 'string'
		},{	name: 'item_spec'		, type: 'string'
		},{	name: 'mixx_rate'		, type: 'float'		, defaultValue: '0'
		},{	name: 'ofap_mixx_rate'	, type: 'float'		, defaultValue: '0'
		},{	name: 'adpt_date'		, type: 'string'	, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'used_yorn'		, type: 'string'
		},{	name: 'acct_name'		, type: 'string'	// 계정구분

		},{	name: 'kfda'			, type: 'string'
		},{	name: 'fema'			, type: 'string'
		},{	name: 'seqc'			, type: 'string'
		},{	name: 'wdgb'			, type: 'string'
		},{	name: 'caca'			, type: 'string'
		},{	name: 'algy_yorn'		, type: 'string'
		},{	name: 'hala_numb'		, type: 'string'
		},{	name: 'natr_name'		, type: 'string'
		},{	name: 'incm_cost'		, type: 'float '

		},{	name: 'item_idcd'		, type: 'string' // popup용


		},{	name: 'user_memo'		, type: 'string'
		},{	name: 'sysm_memo'		, type: 'string'
		},{	name: 'prnt_idcd'		, type: 'string'
		},{ name: 'line_levl'		, type: 'float'		, defaultValue: '0'
		},{ name: 'line_ordr'		, type: 'float'
		},{ name: 'line_stat'		, type: 'string'	, defaultValue: '0'
		},{ name: 'line_clos'		, type: 'string'
		},{ name: 'find_name'		, type: 'string'
		},{ name: 'updt_user_name'	, type: 'string'
		},{ name: 'updt_ipad'		, type: 'string'
		},{ name: 'updt_dttm'		, type: 'string'
		},{ name: 'updt_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 생성자 명 */
		},{ name: 'updt_urif'		, type: 'string'
		},{ name: 'crte_user_name'	, type: 'string'	, defaultValue : _global.login_nm  /* 데이터 생성자 명 */
		},{ name: 'crte_ipad'		, type: 'string'
		},{ name: 'crte_dttm'		, type: 'string'	, defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{ name: 'crte_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 생성자 명 */
		},{ name: 'crte_urif'		, type: 'string'
		}
	]
});
