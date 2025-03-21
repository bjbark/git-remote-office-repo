Ext.define('module.custom.iypkg.prod.workentry.store.WorkEntryMaster3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.prod.workentry.model.WorkEntry',
	pageSize:  100,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/prod/workentry/get/master3.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
