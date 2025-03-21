Ext.define('module.sale.project.prjtprocess.store.PrjtProcessDetail8', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtprocess.model.PrjtProcessDetail8',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtprocess/get/detail8.do",
			update	: _global.location.http() + "/sale/project/prjtprocess/set/colt.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});