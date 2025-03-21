Ext.define('module.sale.sale.salearlist1.store.SaleArList1', { extend:'Axt.data.Store',
	model : 'module.sale.sale.salearlist1.model.SaleArList1',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/sale/sale/salearlist1/get/search.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});