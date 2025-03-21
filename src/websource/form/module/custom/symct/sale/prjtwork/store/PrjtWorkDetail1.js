Ext.define('module.custom.symct.sale.prjtwork.store.PrjtWorkDetail1', { extend:'Axt.data.Store',
	model : 'module.custom.symct.sale.prjtwork.model.PrjtWorkDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/custom/symct/sale/prjtwork/get/detail1.do",
			update	: _global.location.http() + "/custom/symct/sale/prjtwork/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});