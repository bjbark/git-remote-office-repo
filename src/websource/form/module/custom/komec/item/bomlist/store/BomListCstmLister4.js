Ext.define('module.custom.komec.item.bomlist.store.BomListCstmLister4', { extend:'Axt.data.TreeStore',
	model : 'module.custom.komec.item.bomlist.model.BomListCstmLister4',
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