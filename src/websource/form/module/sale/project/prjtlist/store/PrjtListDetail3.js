Ext.define('module.sale.project.prjtlist.store.PrjtListDetail3', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtlist.model.PrjtListDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/detail3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});