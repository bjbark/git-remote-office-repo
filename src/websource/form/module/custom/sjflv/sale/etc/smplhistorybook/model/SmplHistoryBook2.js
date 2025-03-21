Ext.define('module.custom.sjflv.sale.etc.smplhistorybook.model.SmplHistoryBook2', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'ostt_date'		, type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'ostt_drtr_idcd'	, type: 'string'
		},{	name: 'ostt_drtr_name'	, type: 'string'
		},{	name: 'ostt_qntt'		, type: 'string'
		}
	]
});
