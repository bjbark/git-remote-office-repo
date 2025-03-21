Ext.define('module.custom.hjsys.stock.goodsosttwork.store.GoodsOsttWorkMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.hjsys.stock.goodsosttwork.model.GoodsOsttWorkMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/hjsys/stock/goodsosttwork/get/master1.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});