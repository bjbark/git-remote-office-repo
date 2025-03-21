Ext.define('module.sale.sale.salework.store.SaleWorkListerMaster2', { extend:'Axt.data.Store',
	model    : 'module.sale.sale.salework.model.SaleWorkListerMaster',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search.do",
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

