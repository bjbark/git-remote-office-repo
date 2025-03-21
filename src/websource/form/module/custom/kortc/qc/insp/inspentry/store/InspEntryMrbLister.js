Ext.define('module.custom.kortc.qc.insp.inspentry.store.InspEntryMrbLister', { extend:'Axt.data.Store',
	model    : 'module.custom.kortc.qc.insp.inspentry.model.InspEntryLister',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/kortc/qc/insp/inspentry/get/mrb.do",
			update : _global.api_host_info + "/system/custom/kortc/qc/insp/inspentry/set/mrb.do"
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

