Ext.define('module.custom.aone.sale.order.sorderlist3.store.SorderList3Master', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sorderlist3.model.SorderList3Master',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/order/slorlist1/get/search0.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});