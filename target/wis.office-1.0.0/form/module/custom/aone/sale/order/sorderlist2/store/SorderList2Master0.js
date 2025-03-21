Ext.define('module.custom.aone.sale.order.sorderlist2.store.SorderList2Master0', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sorderlist2.model.SorderList2Master0',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/aone/sale/order/sorderlist2/get/search0.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});