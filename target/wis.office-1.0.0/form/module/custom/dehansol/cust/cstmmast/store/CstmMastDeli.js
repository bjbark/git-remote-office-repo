Ext.define('module.custom.dehansol.cust.cstmmast.store.CstmMastDeli', { extend:'Axt.data.Store',
	model		: 'module.custom.dehansol.cust.cstmmast.model.CstmMastDeli',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/dehansol/cust/custmast/get/deli.do",
			update	: _global.api_host_info + "/system/custom/dehansol/cust/custmast/set/deli.do"
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

