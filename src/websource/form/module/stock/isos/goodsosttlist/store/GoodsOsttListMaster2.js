Ext.define('module.stock.isos.goodsosttlist.store.GoodsOsttListMaster2', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsosttlist.model.GoodsOsttListMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/stock/isos/goodsosttlist/get/master2.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});