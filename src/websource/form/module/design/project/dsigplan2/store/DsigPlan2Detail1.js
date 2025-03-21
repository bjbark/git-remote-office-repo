Ext.define('module.design.project.dsigplan2.store.DsigPlan2Detail1', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigplan2.model.DsigPlan2Detail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigplan2/get/search1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});