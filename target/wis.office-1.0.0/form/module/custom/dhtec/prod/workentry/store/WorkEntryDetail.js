Ext.define('module.custom.dhtec.prod.workentry.store.WorkEntryDetail', { extend:'Axt.data.Store',
	model: 'module.custom.dhtec.prod.workentry.model.WorkEntryDetail',
	autoLoad  : false,
	remoteSort: true,
	pageSize: 200,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/dhtec/prod/workentry/get/searchDetail.do",
			update	: _global.location.http() + "/custom/dhtec/prod/workentry/set/setMaster.do"
		},
		actionMethods: { read   : 'POST' , update : 'POST' },
		extraParams:{
			token	: _global.token_id
		}
	}
});
