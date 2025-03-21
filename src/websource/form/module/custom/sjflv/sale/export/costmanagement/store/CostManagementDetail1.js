Ext.define('module.custom.sjflv.sale.export.costmanagement.store.CostManagementDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.export.costmanagement.model.CostManagementDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
//			read : _global.location.http() + "/.custom.sjflv.sale.export.costmanagement/get/detail1.do",
//			update	: _global.location.http() + "/.custom.sjflv.sale.export.costmanagement/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});