Ext.define('module.custom.sjflv.sale.export.blmast.store.BlMastWorkerEditor', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.blmast.model.BlMastWorkerEditor',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/blmast/get/workereditor.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});