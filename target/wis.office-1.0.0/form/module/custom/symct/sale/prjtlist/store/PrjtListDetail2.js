Ext.define('module.custom.symct.sale.prjtlist.store.PrjtListDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtlist.model.PrjtListDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/detail2.do",
			update : _global.location.http() + "/sale/project/prjtlist/set/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});