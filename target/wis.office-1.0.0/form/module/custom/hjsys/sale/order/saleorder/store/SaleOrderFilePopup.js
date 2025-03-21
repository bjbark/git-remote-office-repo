Ext.define('module.custom.hjsys.sale.order.saleorder.store.SaleOrderFilePopup', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.saleorder.model.SaleOrderFilePopup',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});