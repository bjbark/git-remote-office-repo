Ext.define('module.cust.oembmast.store.OembMastItem1', { extend:'Axt.data.Store',
	model : 'module.cust.oembmast.model.OembMastItem1',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/system/cust/oembmast/get/oembcstm.do"
		   ,update 	: _global.location.http() + "/system/cust/oembmast/set/oembcstm.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});