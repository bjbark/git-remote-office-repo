Ext.define('module.sale.clam.clamentry1.store.ClamEntry1Lister', { extend:'Axt.data.Store',
	model    : 'module.sale.clam.clamentry1.model.ClamEntry1Lister',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/sale/clam/clamentry1/get/search.do",
			update : _global.api_host_info + "/system/sale/clam/clamentry1/set/record.do"
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

