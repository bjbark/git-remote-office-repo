Ext.define('module.custom.wontc.prod.order.workentry.store.WorkEntryLister', { extend:'Axt.data.Store',
	model: 'module.custom.wontc.prod.order.workentry.model.WorkEntryLister',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.api_host_info + "/system/custom/wontc/prod/order/workentry/get/search.do",
			update : _global.api_host_info + "/system/custom/wontc/prod/order/workentry/set/setWorkBook.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			  token : _global.token_id
		}
	}
});
