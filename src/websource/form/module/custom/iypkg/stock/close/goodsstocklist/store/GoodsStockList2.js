Ext.define('module.custom.iypkg.stock.close.goodsstocklist.store.GoodsStockList2', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.close.goodsstocklist.model.GoodsStockList',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/close/goodsstocklist/get/search2.do"
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

