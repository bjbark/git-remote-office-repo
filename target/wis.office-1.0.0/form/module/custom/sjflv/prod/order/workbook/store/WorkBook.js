Ext.define('module.custom.sjflv.prod.order.workbook.store.WorkBook', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.prod.order.workbook.model.WorkBook',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/sjflv/prod/workbook/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});