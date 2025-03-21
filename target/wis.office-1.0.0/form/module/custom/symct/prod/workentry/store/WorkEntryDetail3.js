Ext.define('module.custom.symct.prod.workentry.store.WorkEntryDetail3', { extend:'Axt.data.Store',
	model: 'module.custom.symct.prod.workentry.model.WorkEntryDetail3',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read   : _global.location.http() + "/custom/symct/prod/get/searchDetail3.do",
			update : _global.location.http() + "/custom/symct/prod/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
