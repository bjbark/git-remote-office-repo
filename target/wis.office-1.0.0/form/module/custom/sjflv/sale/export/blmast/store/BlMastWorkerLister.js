Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastWorkerLister', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.blmast.model.BlMastWorkerLister',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/blmast/get/workerlister.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});