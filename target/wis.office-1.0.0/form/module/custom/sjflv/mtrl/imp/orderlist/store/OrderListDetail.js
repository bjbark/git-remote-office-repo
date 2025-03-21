Ext.define('module.custom.sjflv.mtrl.imp.orderlist.store.OrderListDetail', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListDetail',

	pageSize : 100,
	proxy : {
		api : {
			read  : _global.api_host_info + "/system/custom/sjflv/mtrl/imp/orderlist/get/detail.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});