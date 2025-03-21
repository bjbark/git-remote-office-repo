Ext.define('module.custom.iypkg.basic.boxtype.model.BoxTypeMemo', { extend:'Axt.data.Model',
	fields: [
		{	name: 'item_idcd'			, type: 'string' },		//품목ID
		{	name: 'line_seqn'			, type: 'float' },		//순번
		{	name: 'orgn_dvcd'			, type: 'string' },		//구분
		{	name: 'memo_dvcd'			, type: 'string' },		//메모구분
		{	name: 'drtr_name'			, type: 'string' },		//담당자명
		{	name: 'memo_date'			, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd') , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},
		{	name: 'drtr_idcd'			, type: 'string' },		//담당자ID
		{	name: 'item_memo'			, type: 'string' },		//메모내용
		{	name: 'modify'				, type: 'string' },		//chk'			, type: 'string' },		//메모내용
	]
});

