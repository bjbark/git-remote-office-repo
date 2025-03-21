Ext.define('module.custom.hantop.prod.workbookv1.store.WorkBookV1Detail3', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.workbookv1.model.WorkBookV1Detail3',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/hantop/prod/workbookv1/get/searchDetail3.do",
			update : _global.location.http() + "/custom/hantop/prod/workbookv1/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
