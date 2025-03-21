Ext.define('module.custom.inkopack.prod.workentry.store.WorkEntryPoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.inkopack.prod.workentry.model.WorkEntryDetail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/incopack/prod/workentry/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});