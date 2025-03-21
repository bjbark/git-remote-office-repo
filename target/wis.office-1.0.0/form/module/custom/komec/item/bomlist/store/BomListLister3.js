Ext.define('module.custom.komec.item.bomlist.store.BomListLister3', { extend:'Axt.data.TreeStore',
	model : 'module.custom.komec.item.bomlist.model.BomListLister3',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/komec/item/bomlist/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});