Ext.define('module.custom.aone.sale.order.sorderlist2.store.SorderList2Master2', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sorderlist2.model.SorderList2Master',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/aone/sale/order/sorderlist2/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});