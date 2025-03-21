Ext.define('module.custom.iypkg.item.fabcmast.store.FabcMastDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.item.fabcmast.model.FabcMastBom',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/get/fabcbom.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/set/fabcbom.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});