Ext.define('module.sale.project.salework.store.SaleWorkDetail', { extend:'Axt.data.Store',
	model : 'module.sale.project.salework.model.SaleWorkDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salework/get/detail.do",
			update : _global.location.http() + "/sale/project/salework/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});