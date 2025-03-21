Ext.define('module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister2', { extend:'Axt.data.Store',
	model: 'module.custom.wontc.prod.order.workentry.model.WorkEntryPoorLister2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/wontc/prod/order/workentry/get/poor2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});