Ext.define('module.custom.kortc.item.itemlist.store.ItemListRett', { extend:'Axt.data.Store',
	model	: 'module.custom.kortc.item.itemlist.model.ItemListRett',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/item/itemmast/get/rett.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});