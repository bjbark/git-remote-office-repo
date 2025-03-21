Ext.define('module.custom.sjflv.sale.sale.salearlist2.store.SaleArList2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.sale.sale.salearlist2.model.SaleArList2',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salearlist2/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});