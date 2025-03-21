Ext.define('module.cust.cstmlist.store.CstmListDrtr', { extend:'Axt.data.Store',
	model		: 'module.cust.cstmlist.model.CstmListDrtr',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/cust/cstmmast/get/drtr.do",
			update	: _global.api_host_info + "/system/cust/cstmmast/set/drtr.do"
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

