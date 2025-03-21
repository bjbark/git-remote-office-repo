Ext.define('module.custom.komec.prod.workbook.store.WorkBookPoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.workbook.model.WorkBookPoorLister',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/prod/workbook/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});