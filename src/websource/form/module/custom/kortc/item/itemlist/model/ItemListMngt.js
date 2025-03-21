Ext.define('module.custom.kortc.item.itemlist.model.ItemListMngt', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'mngt_sbsc_dvcd'		, type: 'string' },		//관리항목구분
		{	name: 'mngt_sbsc_idcd'		, type: 'string' },		//관리항목ID
		{	name: 'mngt_sbsc_name'		, type: 'string' },		//관리항목명
		{	name: 'mngt_sbsc_valu'		, type: 'string' },		//관리항목값
		{	name: 'modify'				, type: 'string' },		//chk'			, type: 'string' },		//메모내용
	]
});

