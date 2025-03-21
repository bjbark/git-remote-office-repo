Ext.define('module.custom.kitec.prod.workentry.store.WorkEntryPoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.kitec.prod.workentry.model.WorkEntryDetail',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/kitec/prod/workentry/get/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});