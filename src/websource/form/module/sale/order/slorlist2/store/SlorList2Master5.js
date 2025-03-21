Ext.define('module.sale.order.slorlist2.store.SlorList2Master5', { extend:'Axt.data.Store',
	model : 'module.sale.order.slorlist2.model.SlorList2Detail',
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist2/get/search5.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});