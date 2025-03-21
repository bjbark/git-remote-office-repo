Ext.define('lookup.popup.model.HntopItemClorPopup',{ extend:'Axt.data.Model',
	fields  : [
		{	name: 'item_idcd',				type: 'string'
		},{	name: 'acct_bacd',				type: 'string'
		},{	name: 'item_name',				type: 'string'
		},{	name: 'item_code',				type: 'string'
		},{	name: 'line_seqn',				type: 'float'
		},{	name: 'stnd_pric',				type: 'float'
		},{	name: 'item_spec',				type: 'string'
		},{	name: 'colr_idcd',				type: 'string'
		},{	name: 'colr_name',				type: 'string'
		},{	name: 'cstm_idcd',				type: 'string'
		},{	name: 'cstm_name',				type: 'string'
		},{	name: 'cont_date',				type: 'string', convert : Ext.util.Format.strToDate, serialize: Ext.util.Format.dateToStr
		}
	]
});
