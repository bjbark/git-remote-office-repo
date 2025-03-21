Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastSearch', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.blmast.model.BlMastSearch',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/blmast/get/search.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});