Ext.define('module.custom.aone.sale.order.sordermast.store.SorderMastFilePopup', { extend:'Axt.data.Store',
	model : 'module.custom.aone.sale.order.sordermast.model.SorderMastFilePopup',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/upload/get/filesearch.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});