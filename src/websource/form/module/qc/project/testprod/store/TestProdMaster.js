Ext.define('module.qc.project.testprod.store.TestProdMaster', { extend:'Axt.data.Store',
	model : 'module.qc.project.testprod.model.TestProdMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/testprod/get/master.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});