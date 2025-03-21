Ext.define('module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail3', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtprocess/get/detail3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});