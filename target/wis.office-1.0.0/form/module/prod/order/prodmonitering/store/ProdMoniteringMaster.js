Ext.define('module.prod.order.prodmonitering.store.ProdMoniteringMaster', { extend:'Axt.data.Store',
	model : 'module.prod.order.prodmonitering.model.ProdMoniteringMaster',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/order/prodmonitering/get/mastersearch.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});