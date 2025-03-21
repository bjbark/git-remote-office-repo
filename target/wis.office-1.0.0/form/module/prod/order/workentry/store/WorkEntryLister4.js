Ext.define('module.prod.order.workentry.store.WorkEntryLister4', { extend:'Axt.data.Store',
	model: 'module.prod.order.workentry.model.WorkEntryLister4',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/list4.do",
			update : _global.location.http() + "/prod/order/workentry/set/list4.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
