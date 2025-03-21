Ext.define('module.prod.order.workbookv3.store.WorkBookV3PoorLister', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv3.model.WorkBookV3Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv3/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});