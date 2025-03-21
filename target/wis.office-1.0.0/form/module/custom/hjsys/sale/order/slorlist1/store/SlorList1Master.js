Ext.define('module.custom.hjsys.sale.order.slorlist1.store.SlorList1Master', { extend:'Axt.data.Store',
	model : 'module.custom.hjsys.sale.order.slorlist1.model.SlorList1Master',
	pageSize : 200,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/hjsys/sale/order/slorlist1/get/master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});