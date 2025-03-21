Ext.define('module.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/stock/goodsosttwork/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});