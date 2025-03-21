Ext.define('lookup.popup.model.EstiPricPopup',{ extend:'Axt.data.Model',
	fields: [
		{name: 'invc_numb',			type: 'string'},
		{name: 'ttle',				type: 'string'},
		{name: 'esti_pric',			type: 'float ', defaultValue: '0'},
		{name: 'shet_name',			type: 'string'},
		{name: 'cstm_name',			type: 'string'},
		{name: 'lcls_name',			type: 'string'},
		{name: 'mcls_name',			type: 'string'},
		{name: 'scls_name',			type: 'string'},
		{name: 'invc_date',			type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr},

	]
});
