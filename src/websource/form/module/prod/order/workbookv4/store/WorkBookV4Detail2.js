Ext.define('module.prod.order.workbookv4.store.WorkBookV4Detail2', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv4.model.WorkBookV4Detail2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv4/get/searchDetail2.do",
			update	: _global.location.http() + "/prod/order/workbookv4/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
