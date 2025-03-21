Ext.define('module.qc.project.remkwork.store.RemkWorkDetail', { extend:'Axt.data.Store',
	model : 'module.qc.project.remkwork.model.RemkWorkDetail',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remkwork/get/detail.do",
			update	: _global.location.http() + "/qc/project/remkwork/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});