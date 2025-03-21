Ext.define('module.sale.order.slorlist2.store.SlorList2Detail', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist2.model.SlorList2Detail',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist2/get/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});