Ext.define('module.custom.sjflv.stock.close.mtrlstocklist.store.MtrlStockListDetail2', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.close.mtrlstocklist.model.MtrlStockList',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/stock/mtrlstocklist/get/detail2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
})