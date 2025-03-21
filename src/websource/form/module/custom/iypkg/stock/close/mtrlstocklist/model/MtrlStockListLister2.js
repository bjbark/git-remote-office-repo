Ext.define( 'module.custom.iypkg.stock.close.mtrlstocklist.model.MtrlStockListLister2', { extend : 'Axt.data.Model',
	fields: [
		{	name: 'invc_date'           , type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		},{	name: 'fabc_name'           , type: 'string'
		},{	name: 'fabc_spec'           , type: 'string'
		},{	name: 'ppln_dvcd'           , type: 'string'
		},{	name: 'item_idcd'           , type: 'string'
		},{	name: 'istt_qntt'           , type: 'float'
		},{	name: 'ostt_2100'           , type: 'float'
		},{	name: 'ostt_2300'           , type: 'float'
		},{	name: 'amnt'                , type: 'float'
		},{	name: 'pric'                , type: 'float'
		}
	]
});
