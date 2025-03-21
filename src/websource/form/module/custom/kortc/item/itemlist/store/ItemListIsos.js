Ext.define('module.custom.kortc.item.itemlist.store.ItemListIsos', { extend:'Axt.data.Store',
	model	: 'module.custom.kortc.item.itemlist.model.ItemListIsos',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/item/itemmast/get/isos.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});