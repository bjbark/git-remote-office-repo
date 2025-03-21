Ext.define('module.workshop.sale.order.ordermanage.store.OrderManage', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermanage.model.OrderManage',
	pageSize: 20,
	proxy:{
		api:{
			 read	: _global.location.http() + "/workshop/sale/order/ordermanage/get/search.do"
//			,update : _global.location.http() + "/basic/deptmast/set/record.do"
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});