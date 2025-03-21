Ext.define('module.prod.basic.wkctcvicmast.store.WkctCvicMast', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctcvicmast.model.WkctCvicMast',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/basic/wkctcvicmast/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});