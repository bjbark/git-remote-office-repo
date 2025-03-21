Ext.define('module.sale.project.prjtchange.store.PrjtChangeDetail4', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtchange.model.PrjtChangeDetail4',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtchange/get/detail4.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});