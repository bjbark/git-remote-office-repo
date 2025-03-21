Ext.define('module.custom.inkopack.prod.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.prod.workentry.model.WorkEntry',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/incopack/prod/workentry/get/search.do",
			update	: _global.location.http() + "/custom/incopack/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
