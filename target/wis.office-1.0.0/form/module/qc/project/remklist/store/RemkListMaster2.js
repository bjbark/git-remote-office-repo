Ext.define('module.qc.project.remklist.store.RemkListMaster2', { extend:'Axt.data.Store',
	model : 'module.qc.project.remklist.model.RemkListMaster2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remklist/get/master2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});