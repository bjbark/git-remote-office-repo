Ext.define('module.basic.item.eco.bomlist.store.BomList', { extend:'Axt.data.TreeStore',
	model	: 'module.basic.item.eco.bomlist.model.BomList',
	autoLoad: false,
	root	: { expanded: false },
	proxy	: {
		api	: {
			read	: _global.location.http() + "/basic/item/eco/bomlist/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});

