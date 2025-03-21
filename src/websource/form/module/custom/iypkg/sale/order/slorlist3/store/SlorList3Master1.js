Ext.define('module.custom.iypkg.sale.order.slorlist3.store.SlorList3Master1', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.sale.order.slorlist3.model.SlorList3Master',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/iypkg/sale/order/slorlist3/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});