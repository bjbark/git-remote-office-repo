Ext.define('module.prod.order.workbookv4.store.WorkBookV4', { extend:'Axt.data.Store',
	model: 'module.prod.order.workbookv4.model.WorkBookV4',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/prod/order/workbookv4/get/search.do",
			update	: _global.location.http() + "/prod/order/workbookv4/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
