Ext.define('module.cust.oembmast.store.OembMast', { extend:'Axt.data.Store',
	model : 'module.cust.oembmast.model.OembMast',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/system/cust/oembmast/get/search.do"
			,update : _global.location.http() + "/system/cust/oembmast/set/oembmast.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});