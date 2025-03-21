Ext.define('module.qc.project.remklist.store.RemkListDetail', { extend:'Axt.data.Store',
	model : 'module.qc.project.remklist.model.RemkListDetail',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remklist/get/detail.do",
			update	: _global.location.http() + "/qc/project/remklist/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});