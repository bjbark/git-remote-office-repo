Ext.define('module.prod.basic.wkctcvicmast.store.WkctCvicDetail', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctcvicmast.model.WkctCvicDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/wkctcvicmast/get/detailsearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});