Ext.define('module.design.project.dsigwork.store.DsigWorkDetail1', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigwork.model.DsigWorkDetail1',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigwork/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});