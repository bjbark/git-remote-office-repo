Ext.define('module.custom.symct.prod.workentry.store.WorkEntryDetail', { extend:'Axt.data.Store',
	model: 'module.custom.symct.prod.workentry.model.WorkEntryDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/symct/prod/get/searchDetail.do",
			update	: _global.location.http() + "/custom/symct/prod/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
