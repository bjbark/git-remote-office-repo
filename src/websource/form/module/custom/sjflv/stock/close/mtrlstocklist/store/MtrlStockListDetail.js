Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.close.mtrlstocklist.model.MtrlStockList',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/stock/mtrlstocklist/get/detail.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
})