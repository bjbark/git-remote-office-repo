Ext.define('module.qc.project.losswork.store.LossWorkImage', { extend:'Axt.data.Store',
	model : 'module.qc.project.losswork.model.LossWorkImage',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/qc/project/losswork/get/image.do",
			update	: _global.location.http() + "/qc/project/losswork/set/image.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});