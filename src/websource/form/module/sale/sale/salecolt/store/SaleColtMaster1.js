Ext.define('module.sale.sale.salecolt.store.SaleColtMaster1', { extend:'Axt.data.Store',
	model	: 'module.sale.sale.salecolt.model.SaleColtMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/sale/sale/salecolt/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});