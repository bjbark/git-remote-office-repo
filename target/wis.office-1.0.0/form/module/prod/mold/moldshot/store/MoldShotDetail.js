Ext.define('module.prod.mold.moldshot.store.MoldShotDetail', { extend:'Axt.data.Store',
	model : 'module.prod.mold.moldshot.model.MoldShotDetail',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/mold/moldshot/get/detailsearch.do",
			update	: _global.location.http() + "/prod/mold/moldshot/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});