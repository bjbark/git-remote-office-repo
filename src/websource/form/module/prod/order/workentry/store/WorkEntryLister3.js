Ext.define('module.prod.order.workentry.store.WorkEntryLister3', { extend:'Axt.data.Store',
	model: 'module.prod.order.workentry.model.WorkEntryLister3',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/list3.do",
			update : _global.location.http() + "/prod/order/workentry/set/list3.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
