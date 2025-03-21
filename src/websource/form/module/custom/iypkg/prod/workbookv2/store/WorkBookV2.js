Ext.define('module.custom.iypkg.prod.workbookv2.store.WorkBookV2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workbookv2.model.WorkBookV2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workbookv2/get/search.do",
			update	: _global.location.http() + "/custom/iypkg/prod/workbookv2/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
