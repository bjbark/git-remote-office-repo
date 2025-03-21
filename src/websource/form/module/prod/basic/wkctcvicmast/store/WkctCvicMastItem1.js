Ext.define('module.prod.basic.wkctcvicmast.store.WkctCvicMastItem1', { extend:'Axt.data.Store',
	model : 'module.prod.basic.wkctcvicmast.model.WkctCvicMastItem1',
	pageSize : 300,
	proxy : {
		api : {
			 read	: _global.location.http() + "/prod/basic/wkctcvicmast/get/item1.do"
			,update : _global.location.http() + "/prod/basic/wkctcvicmast/set/item1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams :{ token : _global.token_id }
	}
});