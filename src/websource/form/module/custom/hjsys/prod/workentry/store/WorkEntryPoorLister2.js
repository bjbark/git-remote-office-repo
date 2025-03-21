Ext.define('module.custom.hjsys.prod.workentry.store.WorkEntryPoorLister2', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister2',
	autoLoad: false,
	pageSize: 100,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/hjsys/prod/workentry/get/poor2.do",
		},
		actionMethods: { read: 'POST'  },
		extraParams:{ token : _global.token_id }
	}
});