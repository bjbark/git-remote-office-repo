Ext.define('module.design.project.dsigwork.store.DsigWorkMaster2', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigwork.model.DsigWorkMaster2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigwork/get/mastersearch2.do",
			update	: _global.location.http() + "/design/dsigwork/set/delete.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});