Ext.define('module.custom.iypkg.item.fabcmast.store.FabcMastDetail3', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.item.fabcmast.model.FabcMastPric',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/item/fabcmast/get/fabcpric.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});