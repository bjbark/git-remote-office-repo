Ext.define('module.qc.project.losswork.store.LossWorkDetail', { extend:'Axt.data.Store',
	model : 'module.qc.project.losswork.model.LossWorkDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/losswork/get/detail.do",
			update	: _global.location.http() + "/qc/project/losswork/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});