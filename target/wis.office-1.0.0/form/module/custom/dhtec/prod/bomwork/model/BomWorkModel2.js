Ext.define('module.custom.dhtec.prod.bomwork.model.BomWorkModel2',{ extend:'Axt.data.Model',
	fields:
	[
		{	name: 'line_ordr'		, type: 'float'		// 순번
		},{	name: 'line_seqn'		, type: 'float'		// 채번
		},{	name: 'acct_bacd'		, type: 'string'	// 계정구분코드
		},{	name: 'acct_name'		, type: 'string'	// 계정구분
		},{	name: 'ivst_item_idcd'	, type: 'string'	// 투입품목ID
		},{	name: 'item_code'		, type: 'string'	// 투입품목코드
		},{	name: 'item_name'		, type: 'string'	// 투입품목명
		},{	name: 'item_spec'		, type: 'string'	, defaultValue: ''	// 투입품목규격
		},{	name: 'need_qntt'		, type: 'string'	// 소요량
		},{	name: 'wkct_idcd'		, type: 'string'	// 투입공정ID
		},{	name: 'wkct_name'		, type: 'string'	// 투입공정명
		},{	name: 'prnt_item_idcd'	, type: 'string'	// 부모품목ID
		},{	name: 'revs_numb'		, type: 'string'	, defaultValue: '1'	// 리비젼번호
		},{	name: 'revs_dvcd'		, type: 'string'	, defaultValue: '1'	// 리비젼번호
		},
	]
});
