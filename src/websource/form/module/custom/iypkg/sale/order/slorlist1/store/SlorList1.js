Ext.define('module.custom.iypkg.sale.order.slorlist1.store.SlorList1', { extend:'Axt.data.Store',
	model	: 'module.custom.iypkg.sale.order.slorlist1.model.SlorList1',
	autoLoad: false,
	pageSize : 1000,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/iypkg/sale/order/slorlist1/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});