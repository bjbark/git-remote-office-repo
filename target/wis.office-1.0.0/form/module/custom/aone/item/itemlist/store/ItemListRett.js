Ext.define('module.custom.aone.item.itemlist.store.ItemListRett', { extend:'Axt.data.Store',
	model	: 'module.custom.aone.item.itemlist.model.ItemListRett',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.api_host_info + "/system/custom/aone/item/itemmast/get/rett.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});