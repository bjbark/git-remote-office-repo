Ext.define('module.custom.hjsys.prod.workbook.store.WorkBookDetail', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.prod.workbook.model.WorkBookDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/prod/workbook/get/detail.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});