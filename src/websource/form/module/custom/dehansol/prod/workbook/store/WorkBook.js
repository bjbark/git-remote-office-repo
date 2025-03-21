Ext.define('module.custom.dehansol.prod.workbook.store.WorkBook', { extend:'Axt.data.Store',
	model : 'module.custom.dehansol.prod.workbook.model.WorkBook',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dehansol/prod/workbook/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});