Ext.define('module.custom.sjflv.sale.sale.salearlist2.store.SaleArListLister2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.sale.sale.salearlist2.model.SaleArListLister2',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/sjflv/sale/sale/salearlist2/get/search2.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});