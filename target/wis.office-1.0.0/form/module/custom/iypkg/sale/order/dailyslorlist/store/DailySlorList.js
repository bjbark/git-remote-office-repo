Ext.define('module.custom.iypkg.sale.order.dailyslorlist.store.DailySlorList', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.dailyslorlist.model.DailySlorList',
	autoLoad: false,
	remoteSort	: true,
	pageSize: 99999,
	proxy:{
		api:{
			read	: _global.location.http() + "/custom/iypkg/sale/order/dailyslorlist/get/search.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});