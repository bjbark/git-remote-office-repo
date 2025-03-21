Ext.define('module.custom.sjflv.haccp.docmmast.model.DocmMastModel1', { extend:'Axt.data.Model',
	fields: [
		{	name: 'mngt_numb'		, type: 'string'	// 관리번호
		},{	name: 'docm_bacd_1fst'	, type: 'string'	// 문서분류#1
		},{	name: 'docm_bacd_2snd'	, type: 'string'	// 문서분류#2
		},{	name: 'docm_bacd_3trd'	, type: 'string'	// 문서분류#3
		},{	name: 'docm_name'		, type: 'string'	// 문서명
		},{	name: 'docm_numb'		, type: 'string'	// 문서번호
		},{	name: 'dwup_ccle_dvcd'	, type: 'string'	// 작성주기
		},{	name: 'line_stat'		, type: 'string'	// 상태
		},{	name: 'html_docm'		, type: 'string'	// HTML문서
		}
	],
});
