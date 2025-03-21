Ext.define('module.custom.komec.item.bommast.model.BomMastLister2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'prnt_item_idcd'	, type: 'string'
		},{	name: 'revs_numb'		, type: 'string'
		},{	name: 'revs_dvcd'		, type: 'string'
		},{	name: 'befr_splr_name'	, type: 'string'
		},{	name: 'splr_name'		, type: 'string'
		},{	name: 'usag_qntt_memo'	, type: 'string'
		},{	name: 'ecod_purp'		, type: 'string'
		},{	name: 'drtr_idcd'		, type: 'string'
		},{	name: 'drtr_name'		, type: 'string'
		},{	name: 'test_date'		, type: 'string'
		},{	name: 'adpt_date'		, type: 'string', defaultValue : Ext.Date.format(new Date(),'Ymd'), convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'remk_text'		, type: 'string'
		},{	name: 'prnt_idcd'		, type: 'string'//상위
		},{	name: 'item_name'		, type: 'string'//상위품명
		},{	name: 'item_code'		, type: 'string'//상위품목코드
		},{	name: 'line_stat'		, type: 'string'
		}
	]
});
