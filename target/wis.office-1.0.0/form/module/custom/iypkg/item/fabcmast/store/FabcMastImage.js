Ext.define('module.custom.iypkg.item.fabcmast.store.FabcMastImage', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.item.fabcmast.model.FabcMast',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/item/fabcmast/get/image.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});