Ext.define('module.cust.oembmast.store.OembMastItem2', { extend:'Axt.data.Store',
	model : 'module.cust.oembmast.model.OembMastItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/system/cust/oembmast/get/cstmmast.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});