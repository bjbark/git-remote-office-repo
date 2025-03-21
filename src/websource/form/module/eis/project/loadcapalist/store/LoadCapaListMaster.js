Ext.define('module.eis.project.loadcapalist.store.LoadCapaListMaster', { extend:'Axt.data.Store',
	model : 'module.eis.project.loadcapalist.model.LoadCapaListMaster',
	pageSize : 20,
	proxy : {
		api : {
			read	: _global.location.http() + "/prod/cvic/loadcapalist/get/mastersearch.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});