Ext.define('module.workshop.sale.order.ordermast.store.OrderMastFilePopup', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.ordermast.model.OrderMastFilePopup',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});