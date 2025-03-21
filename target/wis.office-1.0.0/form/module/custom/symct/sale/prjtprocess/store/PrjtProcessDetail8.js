Ext.define('module.custom.symct.sale.prjtprocess.store.PrjtProcessDetail8', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtprocess.model.PrjtProcessDetail8',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtprocess/get/detail8.do",
			update	: _global.location.http() + "/custom/symct/sale/prjtprocess/set/colt.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});