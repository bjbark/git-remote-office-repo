Ext.define( 'module.custom.iypkg.stock.close.mtrlstocklist2.model.MtrlStockList22', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_date'           , type: 'string' , convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'asmt_idcd'           , type: 'string'
		},{	name: 'asmt_dvcd'           , type: 'string'
		},{	name: 'item_name'           , type: 'string'
		},{	name: 'istt_qntt'           , type: 'float'
		},{	name: 'ostt_qntt'           , type: 'float'
		}
	]
});
