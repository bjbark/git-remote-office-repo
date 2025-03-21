Ext.define('module.prod.basic.wkctusermast.store.WkctUserMastItem1', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctusermast.model.WkctUserMastItem1',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/prod/basic/wkctusermast/get/item1.do"
			,update : _global.location.http() + "/prod/basic/wkctusermast/set/item1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});