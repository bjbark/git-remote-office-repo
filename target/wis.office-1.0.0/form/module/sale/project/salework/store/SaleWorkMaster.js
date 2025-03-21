Ext.define('module.sale.project.salework.store.SaleWorkMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.salework.model.SaleWorkMaster',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salework/get/master.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});