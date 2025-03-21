Ext.define('module.stock.lot.lottracking.model.LotTrackingAcpt',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',				type: 'string'},		//
		{name: 'line_seqn',				type: 'float '},		//
		{name: 'unit_name',				type: 'string'},		//
		{name: 'invc_qntt',				type: 'float '},		//
		{name: 'invc_pric',				type: 'float '},		//
		{name: 'sply_amnt',				type: 'float '},		//
		{name: 'vatx_amnt',				type: 'float '},		//
		{name: 'invc_amnt',				type: 'float '},		//
		{name: 'cstm_lott_numb',		type: 'string'},		//
		{name: 'dlvy_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'invc_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
		{name: 'ostt_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},		//
	]
});
