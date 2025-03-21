Ext.define('module.custom.iypkg.sale.sale.salecolt.store.SaleColtDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.sale.sale.salecolt.model.SaleColtDetail2',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/detail2.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});