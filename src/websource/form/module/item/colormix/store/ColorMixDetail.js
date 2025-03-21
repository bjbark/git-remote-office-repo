Ext.define('module.item.colormix.store.ColorMixDetail', { extend:'Axt.data.Store',
	model : 'module.item.colormix.model.ColorMixDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/item/colormix/get/detailsearch.do",
			update : _global.location.http() + "/item/colormix/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});