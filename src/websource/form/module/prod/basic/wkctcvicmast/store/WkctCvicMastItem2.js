Ext.define('module.prod.basic.wkctcvicmast.store.WkctCvicMastItem2', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctcvicmast.model.WkctCvicMastItem2',
	pageSize : 300,
	proxy : {
		api : {
			 read	: _global.location.http() + "/prod/basic/wkctcvicmast/get/item2.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});