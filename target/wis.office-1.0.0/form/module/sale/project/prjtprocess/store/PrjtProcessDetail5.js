Ext.define('module.sale.project.prjtprocess.store.PrjtProcessDetail5', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtprocess.model.PrjtProcessDetail5',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtprocess/get/detail5.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});