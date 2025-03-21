Ext.define('module.custom.sjflv.sale.export.costmanagement.store.CostManagementMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
//			read   : _global.location.http() + "/.custom.sjflv.sale.export.costmanagement/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});