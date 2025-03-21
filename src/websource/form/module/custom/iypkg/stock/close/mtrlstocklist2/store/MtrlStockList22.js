 Ext.define('module.custom.iypkg.stock.close.mtrlstocklist2.store.MtrlStockList22', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.close.mtrlstocklist2.model.MtrlStockList22',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/close/mtrlstocklist2/get/search2.do"
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

