Ext.define('module.eis.project.arlist.store.ARListDetail1', { extend:'Axt.data.Store',
	model : 'module.eis.project.arlist.model.ARListDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/arlist/get/detailsearch.do",
			update : _global.location.http() + "/prod/cvic/arlist/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});