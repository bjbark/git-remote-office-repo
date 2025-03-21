Ext.define('module.custom.sjflv.mtrl.imp.orderlist.store.OrderListMaster2', { extend:'Axt.data.Store',
	model : 'module.custom.sjflv.mtrl.imp.orderlist.model.OrderListMaster2',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/salecolt/get/master.do",
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});