Ext.define('module.prod.order.workbookv2.store.WorkBookV2Detail2', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv2.model.WorkBookV2Detail2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv2/get/detail2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});