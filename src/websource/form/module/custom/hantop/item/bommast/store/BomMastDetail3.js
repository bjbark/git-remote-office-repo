Ext.define('module.custom.hantop.item.bommast.store.BomMastDetail3', { extend:'Axt.data.TreeStore',
	model	: 'module.custom.hantop.item.bommast.model.BomMastDetail3',
	autoLoad: false,
	root	: { expanded: false },
	proxy	: {
		api	: {
			 read	: _global.location.http() + "/custom/hantop/item/bommast/get/search.do"
			,update : _global.location.http() + "/custom/hantop/item/bommast/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});