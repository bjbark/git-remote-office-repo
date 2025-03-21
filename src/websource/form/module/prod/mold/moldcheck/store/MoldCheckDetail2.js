Ext.define('module.prod.mold.moldcheck.store.MoldCheckDetail2', { extend:'Axt.data.Store',
	model : 'module.prod.mold.moldcheck.model.MoldCheckDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/mold/moldcheck/get/detailsearch2.do",
			update : _global.location.http() + "/prod/mold/moldcheck/set/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});