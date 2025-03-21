Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkInvoice', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkInvoice',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/invoice.do",
			update	: _global.location.http() + "/custom/symct/sale/prjtwork/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});