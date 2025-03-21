Ext.define('module.workshop.sale.order.ordermast.store.OrderMastMaster', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.ordermast.model.OrderMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/ordermast/get/search.do",
			update	: _global.location.http() + "/workshop/sale/order/ordermast/set/records.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
