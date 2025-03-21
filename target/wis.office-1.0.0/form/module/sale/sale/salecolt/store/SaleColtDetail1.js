Ext.define('module.sale.sale.salecolt.store.SaleColtDetail1', { extend:'Axt.data.Store',
	model	: 'module.sale.sale.salecolt.model.SaleColtDetail1',
	pageSize: 100,
	proxy	: {
		api	: {
			read : _global.location.http() + "/sale/sale/salecolt/get/detail1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});