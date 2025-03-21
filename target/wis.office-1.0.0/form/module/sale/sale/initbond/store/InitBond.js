Ext.define('module.sale.sale.initbond.store.InitBond', { extend:'Axt.data.Store',
	model    : 'module.sale.sale.initbond.model.InitBond',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/sale/sale/initBond/get/search.do",
			update : _global.api_host_info + "/system/sale/sale/initBond/set/record.do"
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

