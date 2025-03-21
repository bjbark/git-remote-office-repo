Ext.define('module.custom.iypkg.prod.workbookv1.store.WorkBookV1Detail2', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workbookv1.model.WorkBookV1Detail2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workbookv1/get/searchDetail2.do",
			update	: _global.location.http() + "/custom/iypkg/prod/workbookv1/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
