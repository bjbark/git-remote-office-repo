Ext.define('module.workshop.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1', { extend:'Axt.data.Store',
	model	: 'module.workshop.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/workshop/stock/isos/goodsosttwork/get/detail1.do",
			update	: _global.location.http() + "/workshop/stock/isos/goodsosttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});