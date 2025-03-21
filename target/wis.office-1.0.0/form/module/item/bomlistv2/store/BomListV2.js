Ext.define('module.item.bomlistv2.store.BomListV2', { extend:'Axt.data.TreeStore',
	model	: 'module.item.bomlistv2.model.BomListV2',
	autoLoad: false,
	root	: { expanded: false },
	proxy	: {
		api	: {
			read	: _global.location.http() + "/item/bomlistv2/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});

