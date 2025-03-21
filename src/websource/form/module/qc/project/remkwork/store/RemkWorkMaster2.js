Ext.define('module.qc.project.remkwork.store.RemkWorkMaster2', { extend:'Axt.data.Store',
	model : 'module.qc.project.remkwork.model.RemkWorkMaster2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/remkwork/get/master2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});