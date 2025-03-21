Ext.define('module.qc.project.remklist.store.RemkListMaster1', { extend:'Axt.data.Store',
	model : 'module.qc.project.remklist.model.RemkListMaster1',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remklist/get/master1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});