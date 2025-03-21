Ext.define('module.prod.order.workbookv5.store.WorkBookV5PoorLister', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv5.model.WorkBookV5Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv5/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});