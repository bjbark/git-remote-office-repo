Ext.define('module.item.colormix.store.ColorMixMaster', { extend:'Axt.data.Store',
	model : 'module.item.colormix.model.ColorMixMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/item/colormix/get/mastersearch.do",
			update : _global.location.http() + "/item/colormix/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});