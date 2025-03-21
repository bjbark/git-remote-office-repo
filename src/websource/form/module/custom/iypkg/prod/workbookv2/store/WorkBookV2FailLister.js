Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2FailLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workbookv2.model.WorkBookV2Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workbookv2/get/fail.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});