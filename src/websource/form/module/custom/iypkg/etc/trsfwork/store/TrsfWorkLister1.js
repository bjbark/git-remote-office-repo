Ext.define('module.custom.iypkg.etc.trsfwork.store.TrsfWorkLister1', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.etc.trsfwork.model.TrsfWorkLister1',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/etc/trsfwork/get/search.do",
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

