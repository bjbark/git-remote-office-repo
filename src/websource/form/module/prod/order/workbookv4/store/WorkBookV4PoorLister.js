Ext.define('module.prod.order.workbookv4.store.WorkBookV4PoorLister', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv4.model.WorkBookV4Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv4/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});