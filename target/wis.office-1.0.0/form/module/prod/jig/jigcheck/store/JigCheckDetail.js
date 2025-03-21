Ext.define('module.prod.jig.jigcheck.store.JigCheckDetail', { extend:'Axt.data.Store',
	model : 'module.prod.jig.jigcheck.model.JigCheckDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/jig/jigcheck/get/detailsearch.do",
			update : _global.location.http() + "/prod/jig/jigcheck/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});