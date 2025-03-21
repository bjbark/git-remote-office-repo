Ext.define('module.custom.komec.prod.workbook.store.WorkBookFailLister', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.workbook.model.WorkBookFailLister',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/prod/workbook/get/fail.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});