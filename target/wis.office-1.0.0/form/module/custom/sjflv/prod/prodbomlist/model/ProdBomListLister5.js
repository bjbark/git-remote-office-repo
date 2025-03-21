Ext.define('module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister5', { extend:'Axt.data.Model',
	fields: [
		{	name: 'invc_numb'		, type: 'string'
		},{	name: 'line_seqn'		, type: 'float'
		},{	name: 'prnt_item_code'	, type: 'string'
		},{	name: 'prnt_item_name'	, type: 'string'
		},{	name: 'ivst_item_code'	, type: 'string'
		},{	name: 'ivst_item_name'	, type: 'string'
		},{	name: 'ivst_item_spec'	, type: 'string'
		},{	name: 'mixx_rate'		, type: 'float'		, defaultValue: '0'
		},{	name: 'used_qntt'		, type: 'float'		, defaultValue: '0'
		},{	name: 'stok_qntt'		, type: 'float'		, defaultValue: '0'
		}
	]
});
