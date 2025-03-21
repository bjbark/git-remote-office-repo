Ext.define('module.stock.lot.lottracking.model.LotTrackingOrdr',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//
		{name: 'line_seqn',				type: 'float '},		//
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'cstm_name',				type: 'string'},		//
		{name: 'deli_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'unit_name',				type: 'string'},		//
		{name: 'offr_qntt',				type: 'float '},		//
		{name: 'qntt'	,				type: 'float '},		//
	]
});
