Ext.define('module.prod.order.prodrealtime.store.ProdRealTime2', { extend:'Axt.data.Store',
	model : 'module.prod.order.prodrealtime.model.ProdRealTime',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/prodrealtime/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});