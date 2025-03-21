Ext.define('module.custom.sjflv.item.bomlist.store.BomListLister3', { extend:'Axt.data.TreeStore',
	model : 'module.custom.sjflv.item.bomlist.model.BomListLister3',
	autoLoad: false,
	root	: { expanded: false },
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/sjflv/item/bomlist/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	},
});