Ext.define('module.sale.project.prjtchange.store.PrjtChangeDetail5', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtchange.model.PrjtChangeDetail5',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtchange/get/detail5.do",
			update	: _global.location.http() + "/sale/project/prjtchange/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});