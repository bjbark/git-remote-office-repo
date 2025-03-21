Ext.define('module.custom.iypkg.item.fabcmast.store.FabcMastPricLister', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.item.fabcmast.model.FabcMastPric',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/get/fabcpric.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/set/fabcpric.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});