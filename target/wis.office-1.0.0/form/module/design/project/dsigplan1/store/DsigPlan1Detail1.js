Ext.define('module.design.project.dsigplan1.store.DsigPlan1Detail1', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigplan1.model.DsigPlan1Detail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigplan1/get/mastersearch.do",
			update : _global.location.http() + "/prod/cvic/dsigplan1/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});