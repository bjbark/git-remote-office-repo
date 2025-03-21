Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkWorkerLister1', { extend:'Axt.data.Store',
	model	: 'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerLister1',
	pageSize: 9999999,
	proxy	:{
		api	:{
			read  : _global.api_host_info + "/system/custom/nbolt/stock/isos/goodsosttwork/get/workerlister1.do",
		},
		actionMethods	: { read : 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});
