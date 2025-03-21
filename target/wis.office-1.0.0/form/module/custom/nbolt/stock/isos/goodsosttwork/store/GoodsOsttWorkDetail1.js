Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/nbolt/stock/isos/goodsosttwork/get/detail1.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});