Ext.define('module.sale.sale.salelist1.store.SaleList1', { extend:'Axt.data.Store',
	model    : 'module.sale.sale.salelist1.model.SaleList1',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/sale/sale/salelist1/get/search.do",
		},
		actionMethods: {
			read   : 'POST',
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

