Ext.define('module.custom.aone.sale.order.sorderlist2.store.SorderList2Detail', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sorderlist2.model.SorderList2Detail',
	pageSize : 1000,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/aone/sale/order/sorderlist2/get/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});