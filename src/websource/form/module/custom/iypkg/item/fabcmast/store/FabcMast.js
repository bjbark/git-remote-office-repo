Ext.define('module.custom.iypkg.item.fabcmast.store.FabcMast', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.item.fabcmast.model.FabcMast',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/get/search.do",
			update	: _global.api_host_info + "/system/custom/iypkg/item/fabcmast/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});