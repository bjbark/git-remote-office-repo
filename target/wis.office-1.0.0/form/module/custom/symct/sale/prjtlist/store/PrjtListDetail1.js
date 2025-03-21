Ext.define('module.custom.symct.sale.prjtlist.store.PrjtListDetail1', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtlist.model.PrjtListDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/detail1.do",
			update : _global.location.http() + "/sale/project/prjtlist/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});