Ext.define('module.custom.sjflv.sale.export.nego.store.NegoSearch', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.nego.model.NegoSearch',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/nego/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});