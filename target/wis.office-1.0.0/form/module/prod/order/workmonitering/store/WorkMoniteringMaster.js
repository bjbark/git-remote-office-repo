Ext.define('module.prod.order.workmonitering.store.WorkMoniteringMaster', { extend:'Axt.data.Store',
	model : 'module.prod.order.workmonitering.model.WorkMoniteringMaster',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/workmonitering/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});