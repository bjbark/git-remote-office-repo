Ext.define('module.custom.sjflv.sale.export.nego.store.NegoWorkerDetail', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.nego.model.NegoWorkerDetail',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/nego/get/workerdetail.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});