Ext.define('module.sale.project.prjtchange.store.PrjtChangeDetail1', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtchange.model.PrjtChangeDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtchange/get/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});