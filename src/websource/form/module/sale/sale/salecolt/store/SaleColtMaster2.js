Ext.define('module.sale.sale.salecolt.store.SaleColtMaster2', { extend:'Axt.data.Store',
	model	: 'module.sale.sale.salecolt.model.SaleColtMaster2',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/sale/sale/salecolt/get/master2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});