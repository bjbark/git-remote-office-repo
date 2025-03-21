Ext.define('module.custom.dehansol.cust.cstmmast.store.CstmMast', { extend:'Axt.data.Store',
	model    : 'module.custom.dehansol.cust.cstmmast.model.CstmMast',
	pageSize : 99999,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/dehansol/cust/custmast/get/search.do",
			update : _global.api_host_info + "/system/custom/dehansol/cust/custmast/set/record.do"
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

