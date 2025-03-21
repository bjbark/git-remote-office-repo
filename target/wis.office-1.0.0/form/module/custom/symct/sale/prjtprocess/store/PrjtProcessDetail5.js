Ext.define('module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail5', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail5',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtprocess/get/detail5.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});