Ext.define('module.custom.symct.sale.prjtlist.store.PrjtListInvoice', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtlist.model.PrjtListInvoice',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtlist/get/invoice.do",
			update	: _global.location.http() + "/sale/project/prjtlist/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});