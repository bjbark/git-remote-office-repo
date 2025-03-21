Ext.define('module.qc.project.losswork.store.LossWorkMaster', { extend:'Axt.data.Store',
	model : 'module.qc.project.losswork.model.LossWorkMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/losswork/get/master.do",
			update	: _global.location.http() + "/qc/project/losswork/set/record.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});