Ext.define('module.custom.kortc.prod.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.workentry.model.WorkEntry',
	autoLoad  : false,
	remoteSort: false,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/kortc/prod/workentry/get/search.do",
			update	: _global.location.http() + "/custom/kortc/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
