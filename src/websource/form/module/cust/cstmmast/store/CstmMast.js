Ext.define('module.cust.cstmmast.store.CstmMast', { extend:'Axt.data.Store',
	model    : 'module.cust.cstmmast.model.CstmMast',
	pageSize : 99999,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/cust/cstmmast/get/search.do",
			update : _global.api_host_info + "/system/cust/cstmmast/set/record.do"
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

