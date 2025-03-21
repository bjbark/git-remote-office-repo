Ext.define('module.custom.dhtec.sale.order.saleplanorder.store.SalePlanOrder', { extend:'Axt.data.Store',
	model : 'module.custom.dhtec.sale.order.saleplanorder.model.SalePlanOrder',
	pageSize : 20,
	proxy : {
		api : {
			 read	: _global.location.http() + "/basic/wrhsmast/get/search.do"
			,update : _global.location.http() + "/basic/wrhsmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});