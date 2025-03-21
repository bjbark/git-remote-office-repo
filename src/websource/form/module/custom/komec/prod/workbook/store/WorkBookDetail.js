Ext.define('module.custom.komec.prod.workbook.store.WorkBookDetail', { extend:'Axt.data.Store',
	model: 'module.custom.komec.prod.workbook.model.WorkBookDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/komec/prod/workbook/get/search.do",
			update	: _global.location.http() + "/custom/komec/prod/workbook/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
