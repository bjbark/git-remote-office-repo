Ext.define('module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/komec/stock/isos/goodsosttwork/get/master1.do",
			update : _global.location.http() + "/custom/komec/stock/isos/goodsosttwork/set/deleteMaster.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});