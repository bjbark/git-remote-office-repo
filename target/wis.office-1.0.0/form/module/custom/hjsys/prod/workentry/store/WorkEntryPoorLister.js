Ext.define('module.custom.hjsys.prod.workentry.store.WorkEntryPoorLister', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/hjsys/prod/workentry/get/poor.do",
			update	: _global.location.http() + "/custom/hjsys/prod/workentry/set/poor.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});