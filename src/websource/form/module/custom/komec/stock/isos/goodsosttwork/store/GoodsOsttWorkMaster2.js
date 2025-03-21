Ext.define('module.custom.komec.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2', { extend:'Axt.data.Store',
	model	: 'module.custom.komec.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster2',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/komec/stock/isos/goodsosttwork/get/master2.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});