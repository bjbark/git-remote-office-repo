Ext.define('module.workshop.sale.order.estilist.store.EstiListCopy', { extend:'Axt.data.Store',
	model: 'module.workshop.sale.order.estilist.model.EstiList',
	pageSize: 20,
	proxy:{
		api:{
			read	: _global.location.http() + "/workshop/sale/order/estilist/get/search.do",
			update	: _global.location.http() + "/workshop/sale/order/estilist/set/records.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});