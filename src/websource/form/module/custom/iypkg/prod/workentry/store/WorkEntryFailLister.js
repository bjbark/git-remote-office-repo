Ext.define('module.custom.iypkg.prod.workentry.store.WorkEntryFailLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry.model.WorkEntryDetail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/prod/workentry/get/fail.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});