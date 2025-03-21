Ext.define('module.custom.sjflv.sale.export.nego.store.NegoListerMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.nego.model.NegoListerMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/export/nego/get/listermaster1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});