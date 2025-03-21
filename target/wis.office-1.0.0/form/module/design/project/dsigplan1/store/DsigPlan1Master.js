Ext.define('module.design.project.dsigplan1.store.DsigPlan1Master', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigplan1.model.DsigPlan1Master',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/design/dsigplan1/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});