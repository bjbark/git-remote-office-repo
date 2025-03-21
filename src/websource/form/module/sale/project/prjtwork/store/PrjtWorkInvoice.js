Ext.define('module.sale.project.prjtwork.store.PrjtWorkInvoice', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtwork.model.PrjtWorkInvoice',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtwork/get/invoice.do",
			update	: _global.location.http() + "/sale/project/prjtwork/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});