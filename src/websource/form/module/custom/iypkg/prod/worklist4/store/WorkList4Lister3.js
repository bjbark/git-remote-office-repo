Ext.define('module.custom.iypkg.prod.worklist4.store.WorkList4Lister3', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.prod.worklist4.model.WorkList4Lister2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/prod/worklist4/get/search3.do",
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

