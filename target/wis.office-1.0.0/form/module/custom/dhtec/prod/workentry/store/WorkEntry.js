Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.custom.dhtec.prod.workentry.model.WorkEntry',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/dhtec/prod/workentry/get/search.do",
			update	: _global.location.http() + "/custom/dhtec/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
