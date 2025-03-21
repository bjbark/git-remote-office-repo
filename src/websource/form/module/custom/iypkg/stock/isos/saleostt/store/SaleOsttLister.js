Ext.define('module.custom.iypkg.stock.isos.saleostt.store.SaleOsttLister', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.stock.isos.saleostt.model.SaleOsttLister',
	autoLoad: false,
	pageSize: 99999,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt/get/search.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt/set/modify.do"
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

