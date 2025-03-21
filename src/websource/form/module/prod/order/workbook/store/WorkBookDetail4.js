Ext.define('module.prod.order.workbook.store.WorkBookDetail4', { extend:'Axt.data.Store',
	model : 'module.prod.order.workbook.model.WorkBookDetail4',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workbook/get/mtrl.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});