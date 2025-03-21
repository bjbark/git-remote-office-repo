Ext.define('module.custom.iypkg.stock.isos.saleostt2.store.SaleOstt2WorkerLister', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2WorkerLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt2/get/search3.do",
			update: _global.api_host_info + "/system/custom/iypkg/stock/isos/saleostt2/set/record.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
