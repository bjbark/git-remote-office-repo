Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.blmast.model.BlMastMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/blmast/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});