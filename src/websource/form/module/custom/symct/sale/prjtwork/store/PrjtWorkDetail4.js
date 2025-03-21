Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkDetail4', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkDetail4',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/detail4.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});