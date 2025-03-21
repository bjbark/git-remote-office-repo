Ext.define('module.custom.iypkg.prod.worklist2.store.WorkList2', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.prod.worklist2.model.WorkList2',
	autoLoad: false,
	remoteSort	: true,
	pageSize: Const.SELECT.rows,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/prod/worklist2/get/search.do",
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

