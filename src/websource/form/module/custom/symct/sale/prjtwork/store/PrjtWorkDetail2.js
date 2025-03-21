Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkDetail2', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/detail0.do",
			update	: _global.location.http() + "/custom/symct/sale/prjtwork/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});