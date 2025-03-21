Ext.define('module.custom.sjflv.mtrl.imp.orderlist.store.OrderListListerPopup', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListListerPopup',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/listerpopup.do",
			update : _global.location.http() + "/sale/project/salecolt/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});