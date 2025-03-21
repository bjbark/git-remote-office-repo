Ext.define('module.prod.order.workbookv2.store.WorkBookV2', { extend:'Axt.data.Store',
	model : 'module.prod.order.workbookv2.model.WorkBookV2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workbookv2/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});