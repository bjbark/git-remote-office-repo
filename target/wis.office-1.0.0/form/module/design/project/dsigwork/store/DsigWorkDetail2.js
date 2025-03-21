Ext.define('module.design.project.dsigwork.store.DsigWorkDetail2', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigwork.model.DsigWorkDetail2',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigwork/get/search2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});