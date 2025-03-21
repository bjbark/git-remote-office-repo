Ext.define('module.sale.project.prjtprocess.store.PrjtProcessMaster', { extend:'Axt.data.Store',
	model : 'module.sale.project.prjtprocess.model.PrjtProcessMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/sale/project/prjtprocess/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});