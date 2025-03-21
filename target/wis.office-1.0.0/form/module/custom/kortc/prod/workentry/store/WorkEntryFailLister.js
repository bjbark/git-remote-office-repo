Ext.define('module.custom.kortc.prod.workentry.store.WorkEntryFailLister', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.workentry.model.WorkEntryDetail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/kortc/prod/workentry/get/fail.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});