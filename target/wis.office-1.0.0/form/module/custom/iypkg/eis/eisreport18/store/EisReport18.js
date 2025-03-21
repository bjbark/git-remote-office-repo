Ext.define('module.custom.iypkg.eis.eisreport18.store.EisReport18', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.eis.eisreport18.model.EisReport18',
	pageSize : 200,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/eis/eisreport18/search.do",
		},
		actionMethods: {
			read   : 'POST',
			update : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

