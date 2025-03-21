Ext.define('module.custom.iypkg.stock.isos.saleostt2.store.SaleOstt2Lister', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2Lister',
	autoLoad: false,
	pageSize: 99999,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt2/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt2/set/modify.do"
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

