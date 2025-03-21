Ext.define('module.custom.dehansol.cust.cstmmast.store.CstmMastDrtr', { extend:'Axt.data.Store',
	model		: 'module.custom.dehansol.cust.cstmmast.model.CstmMastDrtr',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/dehansol/cust/custmast/get/drtr.do",
			update	: _global.api_host_info + "/system/custom/dehansol/cust/custmast/set/drtr.do"
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

