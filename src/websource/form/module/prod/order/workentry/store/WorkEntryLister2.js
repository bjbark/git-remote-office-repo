Ext.define('module.prod.order.workentry.store.WorkEntryLister2', { extend:'Axt.data.Store',
	model: 'module.prod.order.workentry.model.WorkEntryLister2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/list2.do",
			update : _global.location.http() + "/prod/order/workentry/set/list2.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
