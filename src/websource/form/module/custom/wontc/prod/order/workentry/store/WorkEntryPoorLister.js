Ext.define('module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.wontc.prod.order.workentry.model.WorkEntryPoorLister',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/wontc/prod/order/workentry/get/poor.do",
			update	: _global.location.http() + "/custom/wontc/prod/order/workentry/set/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});