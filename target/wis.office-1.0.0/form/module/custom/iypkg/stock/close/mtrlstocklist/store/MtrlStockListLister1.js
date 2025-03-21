Ext.define('module.custom.iypkg.stock.close.mtrlstocklist.store.MtrlStockListLister1', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.close.mtrlstocklist.model.MtrlStockListLister1',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/close/mtrlstocklist/get/search.do",
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

