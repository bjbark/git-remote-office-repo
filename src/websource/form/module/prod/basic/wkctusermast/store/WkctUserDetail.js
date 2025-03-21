Ext.define('module.prod.basic.wkctusermast.store.WkctUserDetail', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctusermast.model.WkctUserDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/wkctusermast/get/detailsearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});