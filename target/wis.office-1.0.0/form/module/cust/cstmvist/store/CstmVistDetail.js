Ext.define('module.cust.cstmvist.store.CstmVistDetail', { extend:'Axt.data.Store',
	model		: 'module.cust.cstmvist.model.CstmVistDetail',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api : {
			read	: _global.api_host_info + "/system/cust/cstmvist/get/detailsearch.do"
		},

		actionMethods : {
			read	: 'POST',
			update	: 'POST'
		},

		extraParams :{
			token : _global.token_id
		}
	}
});

