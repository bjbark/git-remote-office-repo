Ext.define('module.stock.lot.lottracking.model.LotTrackingIstt',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//
		{name: 'line_seqn',				type: 'float '},		//
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'istt_qntt',				type: 'float '},		//
	]
});
