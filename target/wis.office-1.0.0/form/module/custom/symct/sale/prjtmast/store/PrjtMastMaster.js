Ext.define('module.custom.symct.sale.prjtmast.store.PrjtMastMaster', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtmast.model.PrjtMastMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtmast/get/search.do",
			update : _global.location.http() + "/sale/project/prjtmast/set/record.do"

		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});