Ext.define('module.custom.kortc.qc.insp.inspentry.store.InspEntryLister', { extend:'Axt.data.Store',
	model    : 'module.custom.kortc.qc.insp.inspentry.model.InspEntryLister',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/kortc/qc/insp/inspentry/get/search.do",
			update : _global.api_host_info + "/system/custom/kortc/qc/insp/inspentry/set/record.do"
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

