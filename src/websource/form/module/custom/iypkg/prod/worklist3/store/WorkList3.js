Ext.define('module.custom.iypkg.prod.worklist3.store.WorkList3', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.prod.worklist3.model.WorkList3',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/prod/worklist3/get/search.do",
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

