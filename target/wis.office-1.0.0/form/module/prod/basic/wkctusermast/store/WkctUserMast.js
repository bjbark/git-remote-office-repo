Ext.define('module.prod.basic.wkctusermast.store.WkctUserMast', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctusermast.model.WkctUserMast',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/wkctusermast/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});