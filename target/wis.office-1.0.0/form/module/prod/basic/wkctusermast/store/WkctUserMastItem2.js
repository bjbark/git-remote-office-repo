Ext.define('module.prod.basic.wkctusermast.store.WkctUserMastItem2', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctusermast.model.WkctUserMastItem2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/wkctusermast/get/item2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});