Ext.define('module.design.project.dsigplan2.store.DsigPlan2Master', { extend:'Axt.data.Store',
	model : 'module.design.project.dsigplan2.model.DsigPlan2Master',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "design/dsigplan2/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});