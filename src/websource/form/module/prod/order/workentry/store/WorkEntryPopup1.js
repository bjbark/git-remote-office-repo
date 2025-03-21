Ext.define('module.prod.order.workentry.store.WorkEntryPopup1', { extend:'Axt.data.Store',
	model :'module.prod.order.workentry.model.WorkEntryPopup1',
	autoLoad: false,
//	pageSize: 16,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/lookup.do",
			update : _global.location.http() + "/prod/order/workentry/set/list1.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});