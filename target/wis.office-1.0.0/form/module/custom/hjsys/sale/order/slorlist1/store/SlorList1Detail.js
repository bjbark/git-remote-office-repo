Ext.define('module.custom.hjsys.sale.order.slorlist1.store.SlorList1Detail', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.slorlist1.model.SlorList1Detail',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/slorlist1/get/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});