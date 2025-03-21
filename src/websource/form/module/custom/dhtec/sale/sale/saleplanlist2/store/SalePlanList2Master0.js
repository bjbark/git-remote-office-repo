Ext.define('module.custom.dhtec.sale.sale.saleplanlist2.store.SalePlanList2Master0', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.sale.sale.saleplanlist2.model.SalePlanList2Master0',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/sale/sale/saleplanlist2/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});