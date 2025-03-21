Ext.define('module.prod.wmold.wmoldcheck.store.WmoldCheckDetail2', { extend:'Axt.data.Store',
	model : 'module.prod.wmold.wmoldcheck.model.WmoldCheckDetail2',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/wmold/wmoldcheck/get/detailsearch2.do",
			update : _global.location.http() + "/prod/wmold/wmoldcheck/set/detail2.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});