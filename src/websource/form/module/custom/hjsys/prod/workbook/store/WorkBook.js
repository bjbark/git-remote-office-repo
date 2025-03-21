Ext.define('module.custom.hjsys.prod.workbook.store.WorkBook', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.prod.workbook.model.WorkBook',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/prod/workbook/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});