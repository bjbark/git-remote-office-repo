Ext.define('module.prod.mold.moldcheck.store.MoldCheckDetail1', { extend:'Axt.data.Store',
	model : 'module.prod.mold.moldcheck.model.MoldCheckDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/mold/moldcheck/get/detailsearch1.do",
			update : _global.location.http() + "/prod/mold/moldcheck/set/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});