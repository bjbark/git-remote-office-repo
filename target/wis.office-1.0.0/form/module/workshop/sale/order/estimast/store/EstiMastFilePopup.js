Ext.define('module.workshop.sale.order.estimast.store.EstiMastFilePopup', { extend:'Axt.data.Store',
	model : 'module.workshop.sale.order.estimast.model.EstiMastFilePopup',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});