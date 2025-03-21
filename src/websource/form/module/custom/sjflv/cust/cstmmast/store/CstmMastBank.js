Ext.define('module.custom.sjflv.cust.cstmmast.store.CstmMastBank', { extend:'Axt.data.Store',
	model		: 'module.custom.sjflv.cust.cstmmast.model.CstmMastBank',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/get/bank.do",
			update	: _global.api_host_info + "/system/custom/sjflv/cust/cstmmast/set/bank.do"
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

