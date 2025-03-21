Ext.define('module.prod.order.workentry.store.WorkEntryLister1', { extend:'Axt.data.Store',
	model: 'module.prod.order.workentry.model.WorkEntryLister1',
	autoLoad  : false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/list1.do",
			update : _global.location.http() + "/prod/order/workentry/set/list1.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
