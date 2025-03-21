Ext.define('module.custom.iypkg.eis.eisreport1.store.EisReport1Master', { extend:'Axt.data.Store',
	model : 'module.custom.iypkg.eis.eisreport1.model.EisReport1Master',
	pageSize : 100,
	proxy : {
		api : {
			read  : _global.api_host_info + "/system/custom/iypkg/eis/eisreport1/get/search1.do",
		},
		actionMethods: { read: 'POST', update : 'POST' },
		extraParams:{ token : _global.token_id }
	}
});