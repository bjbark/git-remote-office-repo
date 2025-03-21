Ext.define('module.prod.order.prodinput.store.ProdInputMaster2', { extend:'Axt.data.Store',
	model : 'module.prod.order.prodinput.model.ProdInputMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/prodinput/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});