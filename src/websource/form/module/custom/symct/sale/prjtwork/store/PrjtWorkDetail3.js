Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkDetail3', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkDetail3',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/detail3.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});