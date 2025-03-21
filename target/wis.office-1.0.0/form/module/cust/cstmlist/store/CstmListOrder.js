Ext.define('module.cust.cstmlist.store.CstmListOrder', { extend:'Axt.data.Store',
	model		: 'module.cust.cstmlist.model.CstmListOrder',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/cust/cstmmast/get/order.do",
//			update	: _global.api_host_info + "/system/cust/cstmmast/set/drtr.do"
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

