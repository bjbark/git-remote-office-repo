Ext.define('module.prod.order.workbookv5.store.WorkBookV5Detail2', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv5.model.WorkBookV5Detail2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv5/get/searchDetail2.do",
			update	: _global.location.http() + "/prod/order/workbookv5/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
