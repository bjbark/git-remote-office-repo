Ext.define('module.custom.sjflv.sale.sale.salearlist.store.SaleArListLister', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.sale.sale.salearlist.model.SaleArListLister',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salearlist/get/search2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});