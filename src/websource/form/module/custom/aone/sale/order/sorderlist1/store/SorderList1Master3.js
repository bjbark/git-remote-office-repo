Ext.define('module.custom.aone.sale.order.sorderlist1.store.SorderList1Master3', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sorderlist1.model.SorderList1Master',
	pageSize : 210,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/aone/sale/order/sorderlist1/get/search3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});