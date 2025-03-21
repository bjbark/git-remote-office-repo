Ext.define('module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read  : _global.api_host_info + "/system/custom/komec/stock/isos/goodsosttwork/get/invoice.do",
			update: _global.api_host_info + "/system/custom/komec/stock/isos/goodsosttwork/set/invoice.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});
