Ext.define('module.sale.sale.salelist2.store.SaleList2', { extend:'Axt.data.Store',
	model    : 'module.sale.sale.salelist2.model.SaleList2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/sale/sale/salelist2/get/search.do",
		},
		actionMethods: {
			read   : 'POST',
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

