Ext.define('module.custom.iypkg.prod.workbookv1.store.WorkBookV1PoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workbookv1.model.WorkBookV1Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workbookv1/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});