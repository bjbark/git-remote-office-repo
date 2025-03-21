Ext.define('module.prod.order.workbook.store.WorkBook', { extend:'Axt.data.Store',
	model : 'module.prod.order.workbook.model.WorkBook',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workbook/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});