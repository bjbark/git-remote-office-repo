Ext.define('module.custom.iypkg.eis.eisreport16.store.EisReport16', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport16.model.EisReport16Chart',
	pageSize : 200,
	proxy : {
		api : {
			read   : _global.api_host_info + "/system/custom/iypkg/eis/eisreport16/get/chart.do"
		},
		actionMethods : { read: 'POST', update : 'POST' },
		extraParams : { token : _global.token_id }
	}
});