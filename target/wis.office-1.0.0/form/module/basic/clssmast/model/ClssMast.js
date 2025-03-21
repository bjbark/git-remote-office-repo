Ext.define('module.basic.clssmast.model.ClssMast', { extend:'Axt.data.Model',
	fields: [
		{	name: 'clss_idcd'		, type: 'string'	//분류ID
		},{	name: 'clss_dvcd'		, type: 'string'	//분류구분코드
		},{	name: 'clss_code'		, type: 'string'	//분류코드
		},{	name: 'clss_code_numb'	, type: 'string'
		},{	name: 'clss_name'		, type: 'string'
		},{	name: 'clss_desc'		, type: 'integer'
		},{	name: 'code_issu_key'	, type: 'integer'	, defaultValue:  0
		},{	name: 'code_leng'		, type: 'string'
		},{	name: 'user_memo'		, type: 'string'
		},{	name: 'sysm_memo'		, type: 'string'
		},{	name: 'prnt_idcd'		, type: 'string'	, defaultValue: '0'
		},{	name: 'line_levl'		, type: 'integer'	, defaultValue:  1
		},{	name: 'line_ordr'		, type: 'integer'	, defaultValue:  1
		},{	name: 'line_stat'		, type: 'string'	, defaultValue: '0'
		},{	name: 'line_clos'		, type: 'string'
		},{	name: 'updt_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 수정자 명 */
		},{ name: 'crte_idcd'		, type: 'string'	, defaultValue : _global.login_pk  /* 데이터 생성자 명 */
		},{ name: 'provider'		, type: 'string'	, defaultValue : _global.provider /* Data Base 종류*/
		},{ name: 'lcls_name'		, type: 'string'	//대분류명
		},{ name: 'mcls_name'		, type: 'string'	//중분류명
		},{ name: 'scls_name'		, type: 'string'	//소분류명
		}
	]
});
