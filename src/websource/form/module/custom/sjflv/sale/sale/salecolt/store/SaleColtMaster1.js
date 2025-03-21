Ext.define('module.custom.sjflv.sale.sale.salecolt.store.SaleColtMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.sale.salecolt.model.SaleColtMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/sale/sale/salecolt/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});