Ext.define('module.custom.iypkg.sale.sale.salecolt.store.SaleColtDetail', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.sale.sale.salecolt.model.SaleColtDetail',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/detail.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});