Ext.define('module.eis.project.loadcapalist.store.LoadCapaListDetail1', { extend:'Axt.data.Store',
	model : 'module.eis.project.loadcapalist.model.LoadCapaListDetail1',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/loadcapalist/get/detailsearch.do",
			update : _global.location.http() + "/prod/cvic/loadcapalist/set/detail.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});