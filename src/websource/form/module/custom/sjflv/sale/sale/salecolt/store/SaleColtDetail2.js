Ext.define('module.custom.sjflv.sale.sale.salecolt.store.SaleColtDetail2', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.sale.sale.salecolt.model.SaleColtDetail2',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/sale/sale/salecolt/get/detail2.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});