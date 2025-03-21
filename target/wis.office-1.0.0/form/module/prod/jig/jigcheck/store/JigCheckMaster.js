Ext.define('module.prod.jig.jigcheck.store.JigCheckMaster', { extend:'Axt.data.Store',
	model : 'module.prod.jig.jigcheck.model.JigCheckMaster',
	pageSize : 100,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/jig/jigcheck/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});