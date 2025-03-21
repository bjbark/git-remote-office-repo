Ext.define('module.custom.sjflv.cust.cstmmast.model.CstmMastMngt', { extend:'Axt.data.Model',
	fields: [
		{	name: 'cstm_idcd'			, type: 'string' },		//거래처ID
		{	name: 'mngt_sbsc_dvcd'		, type: 'string' },		//관리항목구분
		{	name: 'mngt_sbsc_idcd'		, type: 'string' },		//관리항목ID
		{	name: 'mngt_sbsc_name'		, type: 'string' },		//관리항목명
		{	name: 'mngt_sbsc_valu'		, type: 'string' },		//관리항목값
		{	name: 'modify'				, type: 'string' },		//chk'			, type: 'string' },		//메모내용
	]
});

