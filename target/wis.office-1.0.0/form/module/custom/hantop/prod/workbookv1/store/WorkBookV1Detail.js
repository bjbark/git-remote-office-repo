Ext.define('module.custom.hantop.prod.workbookv1.store.WorkBookV1Detail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/hantop/prod/workbookv1/get/searchDetail.do",
			update	: _global.location.http() + "/custom/hantop/prod/workbookv1/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
