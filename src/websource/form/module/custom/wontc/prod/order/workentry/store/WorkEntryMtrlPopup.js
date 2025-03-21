Ext.define('module.custom.wontc.prod.order.workentry.store.WorkEntryMtrlPopup', { extend:'Axt.data.Store',
	model :'module.custom.wontc.prod.order.workentry.model.WorkEntryMtrlPopup',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/wontc/prod/order/workentry/get/mtrlstock.do",
			update : _global.api_host_info + "/system/custom/wontc/prod/order/workentry/set/isos.do"
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});