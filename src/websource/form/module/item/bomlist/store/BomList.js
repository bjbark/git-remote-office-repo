Ext.define('module.item.bomlist.store.BomList', { extend:'Axt.data.TreeStore',
	model	: 'module.item.bomlist.model.BomList',
	autoLoad: false,
	root	: { expanded: false },
	proxy	: {
		api	: {
			read	: _global.location.http() + "/item/bomlist/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});

