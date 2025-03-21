Ext.define('module.custom.aone.item.itemclass.model.ItemClass', { extend:'Axt.data.Model',
	fields: [
		{	name: 'clss_idcd'		, type: 'string'
		},{	name: 'clss_code'		, type: 'string'
		},{	name: 'clss_name'		, type: 'string'
		},{	name: 'acct_bacd'		, type: 'string'
		},{	name: 'class_no'		, type: 'integer'	, defaultValue:  0
		},{	name: 'user_memo'		, type: 'string'
		},{	name: 'prnt_idcd'		, type: 'string'	, defaultValue: '0'
		},{	name: 'prdt_key'		, type: 'string'	, defaultValue: '0'
		},{	name: 'code_leng'		, type: 'string'	, defaultValue: '0'
		},{	name: 'line_levl'		, type: 'integer'	, defaultValue:  1
		},{	name: 'line_ordr'		, type: 'integer'	, defaultValue:  1
		},{	name: 'line_stat'		, type: 'string'	, defaultValue: '0'
		},{	name: 'updt_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 수정자 명 */
		},{ name: 'crte_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 생성자 명 */
		},{ name: 'provider'		, type: 'string'	, defaultValue : _global.provider /* Data Base 종류*/
		}
		]
});
