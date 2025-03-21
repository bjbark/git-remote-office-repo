Ext.define('module.custom.nbolt.eis.project.eisreport.store.EisReport', { extend:'Axt.data.Store',
	model	: 'module.custom.nbolt.eis.project.eisreport.model.EisReport',
	pageSize: 100,
	proxy	: {
		api	: {
			read : _global.location.http() + "/prod/order/prodorderlist/get/search.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});