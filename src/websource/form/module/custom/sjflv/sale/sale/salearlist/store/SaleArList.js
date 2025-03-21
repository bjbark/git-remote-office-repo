Ext.define('module.custom.sjflv.sale.sale.salearlist.store.SaleArList', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.sale.sale.salearlist.model.SaleArList',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salearlist/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});