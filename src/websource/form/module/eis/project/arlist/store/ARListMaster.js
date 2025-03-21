Ext.define('module.eis.project.arlist.store.ARListMaster', { extend:'Axt.data.Store',
	model : 'module.eis.project.arlist.model.ARListMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/arlist/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});