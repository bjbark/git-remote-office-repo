Ext.define('module.custom.dhtec.sale.sale.saleplanlist.store.SalePlanListMaster1', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.sale.sale.saleplanlist.model.SalePlanListMaster',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/sale/sale/saleplanlist/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});