Ext.define('module.custom.sjflv.mtrl.imp.blmast.store.BlMastListerDetail', { extend:'Axt.data.Store',
	model    : 'module.custom.sjflv.mtrl.imp.blmast.model.BlMastListerDetail',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search.do",
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

