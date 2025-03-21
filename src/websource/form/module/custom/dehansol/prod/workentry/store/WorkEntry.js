Ext.define('module.custom.dehansol.prod.workentry.store.WorkEntry', { extend:'Axt.data.Store',
	model: 'module.custom.dehansol.prod.workentry.model.WorkEntry',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/dehansol/prod/workentry/get/search.do",
			update	: _global.location.http() + "/custom/dehansol/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update   : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
