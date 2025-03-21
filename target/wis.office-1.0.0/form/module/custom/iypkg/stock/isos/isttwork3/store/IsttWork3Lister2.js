Ext.define('module.custom.iypkg.stock.isos.isttwork3.store.IsttWork3Lister2', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.isos.isttwork3.model.IsttWork3Lister2',
	pageSize : 100,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork3/get/search2.do",
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

