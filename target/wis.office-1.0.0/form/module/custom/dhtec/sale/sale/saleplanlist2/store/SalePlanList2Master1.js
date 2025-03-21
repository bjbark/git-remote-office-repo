Ext.define('module.custom.dhtec.sale.sale.saleplanlist2.store.SalePlanList2Master1', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.sale.sale.saleplanlist2.model.SalePlanList2Master',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/sale/sale/saleplanlist2/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});