Ext.define('module.prod.wmold.wmoldcheck.store.WmoldCheckDetail1', { extend:'Axt.data.Store',
	model : 'module.prod.wmold.wmoldcheck.model.WmoldCheckDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/wmold/wmoldcheck/get/detailsearch1.do",
			update : _global.location.http() + "/prod/wmold/wmoldcheck/set/detail1.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});