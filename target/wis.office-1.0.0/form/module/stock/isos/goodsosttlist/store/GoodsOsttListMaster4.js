Ext.define('module.stock.isos.goodsosttlist.store.GoodsOsttListMaster4', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsosttlist.model.GoodsOsttListMaster4',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/stock/isos/goodsosttlist/get/master4.do",
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});