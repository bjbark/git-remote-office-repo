Ext.define('module.stock.isos.goodsosttlist.store.GoodsOsttListMaster3', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsosttlist.model.GoodsOsttListMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/stock/isos/goodsosttlist/get/master3.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});