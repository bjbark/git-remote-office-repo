Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerDetail',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/detail.do",
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

