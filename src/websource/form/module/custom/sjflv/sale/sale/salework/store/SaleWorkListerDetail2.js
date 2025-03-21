Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkListerDetail2', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.sale.sale.salework.model.SaleWorkListerDetail2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/detail2.do",
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

