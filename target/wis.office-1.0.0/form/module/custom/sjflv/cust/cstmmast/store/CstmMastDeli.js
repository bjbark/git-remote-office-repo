Ext.define('module.custom.sjflv.cust.cstmmast.store.CstmMastDeli', { extend:'Axt.data.Store',
	model		: 'module.custom.sjflv.cust.cstmmast.model.CstmMastDeli',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: 99999,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/get/deli.do",
			update	: _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/set/deli.do"
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

