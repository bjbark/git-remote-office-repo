Ext.define('module.custom.sjflv.prod.prodbomlist.model.ProdBomListLister7', { extend:'Axt.data.Model',
	fields: [
	      {	name: 'item_code'		, type: 'string'
		},{	name: 'item_name'		, type: 'string'
		},{	name: 'item_spec'		, type: 'string'		
		},{	name: 'used_qntt'		, type: 'float'		, defaultValue: '0'
		},{	name: 'lott_used_qntt'	, type: 'float'		, defaultValue: '0'
		},{	name: 'stok_qntt'		, type: 'float'		, defaultValue: '0'
		},{	name: 'lott_numb'		, type: 'string'
		}
	]
});
