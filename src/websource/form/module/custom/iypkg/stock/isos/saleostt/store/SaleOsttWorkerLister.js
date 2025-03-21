Ext.define('module.custom.iypkg.stock.isos.saleostt.store.SaleOsttWorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.saleostt.model.SaleOsttWorkerLister',
	autoLoad: false,
	pageSize	: 99999,
	remoteSort	: false,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
