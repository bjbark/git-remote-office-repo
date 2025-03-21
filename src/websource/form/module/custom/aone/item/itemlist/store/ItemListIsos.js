Ext.define('module.custom.aone.item.itemlist.store.ItemListIsos', { extend:'Axt.data.Store',
	model	: 'module.custom.aone.item.itemlist.model.ItemListIsos',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.api_host_info + "/system/custom/aone/item/itemmast/get/isos.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});