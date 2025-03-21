Ext.define('module.custom.kortc.qc.chge.chgemast.store.ChgeMastLister', { extend:'Axt.data.Store',
	model	: 'module.custom.kortc.qc.chge.chgemast.model.ChgeMastLister',
	pageSize: 100,
	proxy	: {
	api		: {
			read   : _global.api_host_info + "/system/custom/kortc/qc/chge/chgemast/get/search.do",
			update : _global.api_host_info + "/system/custom/kortc/qc/chge/chgemast/set/record.do"
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
