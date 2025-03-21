Ext.define('module.design.project.dsigwork.store.DsigWorkMaster1', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigwork.model.DsigWorkMaster1',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "design/dsigwork/get/mastersearch1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});