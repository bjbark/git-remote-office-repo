Ext.define('module.custom.sjflv.prod.order.workbook.store.WorkBookDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.order.workbook.model.WorkBookDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workbook/get/qc.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});