Ext.define('module.prod.order.workbookv2.store.WorkBookV2Detail1', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv2.model.WorkBookV2Detail1',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv2/get/detail1.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});