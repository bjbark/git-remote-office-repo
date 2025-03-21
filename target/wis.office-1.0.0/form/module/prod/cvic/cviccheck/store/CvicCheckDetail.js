Ext.define('module.prod.cvic.cviccheck.store.CvicCheckDetail', { extend:'Axt.data.Store',
	model : 'module.prod.cvic.cviccheck.model.CvicCheckDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/cviccheck/get/detailsearch.do",
			update : _global.location.http() + "/prod/cvic/cviccheck/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});