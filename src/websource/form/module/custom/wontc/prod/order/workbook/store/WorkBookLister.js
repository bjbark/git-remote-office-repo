Ext.define('module.custom.wontc.prod.order.workbook.store.WorkBookLister', { extend:'Axt.data.Store',
	model : 'module.custom.wontc.prod.order.workbook.model.WorkBookLister',
	pageSize: 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custem/wontc/prod/order/workbook/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});