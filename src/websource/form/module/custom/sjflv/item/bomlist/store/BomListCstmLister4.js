Ext.define('module.custom.sjflv.item.bomlist.store.BomListCstmLister4', { extend:'Axt.data.TreeStore',
	model : 'module.custom.sjflv.item.bomlist.model.BomListCstmLister4',
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