Ext.define('module.workshop.sale.order.estimast.store.EstiMastMaster', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estimast.model.EstiMastMaster',
	autoLoad: false,
//	pageSize: Const.SELECT.rows,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/estimast/get/search.do",
			update	: _global.location.http() + "/workshop/sale/order/estimast/set/records.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
