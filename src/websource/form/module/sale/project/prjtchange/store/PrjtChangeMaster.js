Ext.define('module.sale.project.prjtchange.store.PrjtChangeMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtchange.model.PrjtChangeMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtchange/get/master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});