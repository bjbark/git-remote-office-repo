Ext.define('module.custom.iypkg.stock.close.stocklist1.store.StockList1', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.close.stocklist1.model.StockList1',
	pageSize : 100,
	proxy    : {
		api  : {
//			read   : _global.api_host_info + "/system/custom/iypkg/sale/order/slorlist2/get/search.do",
//			update : _global.api_host_info + "/system/custom/iypkg/sale/order/slorlist2/set/record.do"
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

