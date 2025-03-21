Ext.define('module.prod.basic.wkctmast.store.WkctMast', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctmast.model.WkctMast',
	pageSize : 100,
	proxy : {
		api : {
			 read	: _global.location.http() + "/prod/basic/wkctmast/get/search.do"
			,update : _global.location.http() + "/prod/basic/wkctmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});