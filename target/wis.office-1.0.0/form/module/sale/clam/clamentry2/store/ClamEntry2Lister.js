Ext.define('module.sale.clam.clamentry2.store.ClamEntry2Lister', { extend:'Axt.data.Store',
	model    : 'module.sale.clam.clamentry2.model.ClamEntry2Lister',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/sale/clam/clamentry2/get/search.do",
			update : _global.api_host_info + "/system/sale/clam/clamentry2/set/record.do"
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

