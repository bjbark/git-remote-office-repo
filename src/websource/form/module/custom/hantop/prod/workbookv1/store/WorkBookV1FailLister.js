Ext.define('module.custom.hantop.prod.workbookv1.store.WorkBookV1FailLister', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/hantop/prod/workbookv1/get/fail.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});