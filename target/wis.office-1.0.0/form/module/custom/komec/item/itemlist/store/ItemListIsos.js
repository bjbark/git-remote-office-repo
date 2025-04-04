Ext.define('module.custom.komec.item.itemlist.store.ItemListIsos', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.item.itemlist.model.ItemListIsos',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/komec/item/itemmast/get/isos.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});