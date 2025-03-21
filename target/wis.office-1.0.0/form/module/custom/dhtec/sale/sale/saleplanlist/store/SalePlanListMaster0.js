Ext.define('module.custom.dhtec.sale.sale.saleplanlist.store.SalePlanListMaster0', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.sale.sale.saleplanlist.model.SalePlanListMaster0',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/dhtec/sale/sale/saleplanlist/get/search.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});