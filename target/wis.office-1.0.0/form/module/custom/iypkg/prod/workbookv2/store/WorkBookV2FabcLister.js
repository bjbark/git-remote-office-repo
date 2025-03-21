Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2FabcLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workbookv2.model.WorkBookV2FabcLister',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workbookv2/get/fabc.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});