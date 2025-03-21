Ext.define('module.custom.sjflv.prod.order.workbook.store.WorkBookDetail3', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.order.workbook.model.WorkBookDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workbook/get/loss.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});