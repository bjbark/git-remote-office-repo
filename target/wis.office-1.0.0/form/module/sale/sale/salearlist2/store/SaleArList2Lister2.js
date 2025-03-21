Ext.define('module.sale.sale.salearlist2.store.SaleArList2Lister2', { extend:'Axt.data.Store',
	model : 'module.sale.sale.salearlist2.model.SaleArList2',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/sale/sale/salearlist2/get/list2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});