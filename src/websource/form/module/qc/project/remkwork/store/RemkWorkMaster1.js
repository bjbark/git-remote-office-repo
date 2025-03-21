Ext.define('module.qc.project.remkwork.store.RemkWorkMaster1', { extend:'Axt.data.Store',
	model : 'module.qc.project.remkwork.model.RemkWorkMaster1',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remkwork/get/master1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});