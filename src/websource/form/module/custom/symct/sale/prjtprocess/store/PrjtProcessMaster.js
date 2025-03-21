Ext.define('module.custom.symct.sale.prjtprocess.store.PrjtProcessMaster', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtprocess.model.PrjtProcessMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtprocess/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});