Ext.define('module.custom.sjflv.sale.export.nego.store.NegoWorkerEditor', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.nego.model.NegoWorkerEditor',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/nego/get/workereditor.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});