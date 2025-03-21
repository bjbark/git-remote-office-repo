Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkMaster', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkMaster',

	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/master.do",
			update : _global.location.http() + "/custom/symct/sale/prjtwork/set/invoice.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});