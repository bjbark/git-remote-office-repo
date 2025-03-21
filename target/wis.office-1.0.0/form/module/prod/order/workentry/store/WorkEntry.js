Ext.define('module.prod.order.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.prod.order.workentry.model.WorkEntry',
	autoLoad  : false,
	remoteSort: true,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
			read   : _global.location.http() + "/prod/order/workentry/get/search.do",
			update : _global.location.http() + "/prod/order/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
