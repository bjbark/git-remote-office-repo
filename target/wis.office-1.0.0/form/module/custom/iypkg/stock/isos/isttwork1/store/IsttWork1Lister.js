Ext.define('module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1Lister', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1Lister',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/isttwork1/set/record2.do"
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

