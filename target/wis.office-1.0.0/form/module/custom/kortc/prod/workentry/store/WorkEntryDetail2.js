Ext.define('module.custom.kortc.prod.workentry.store.WorkEntryDetail2', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.workentry.model.WorkEntryDetail2',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/kortc/prod/workentry/get/searchDetail2.do",
			update	: _global.location.http() + "/custom/kortc/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
