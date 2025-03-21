Ext.define('module.sale.sale.salelist3.store.SaleList3', { extend:'Axt.data.Store',
	model	: 'module.sale.sale.salelist3.model.SaleList3',
	pageSize: 100,
	proxy	: {
		api	: {
			read	: _global.api_host_info + "/system/sale/sale/salelist3/get/search.do",
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

