Ext.define('module.qc.project.testprod.store.TestProdDetail', { extend:'Axt.data.Store',
	model : 'module.qc.project.testprod.model.TestProdDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/testprod/get/detail.do",
			update	: _global.location.http() + "/qc/project/testprod/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});