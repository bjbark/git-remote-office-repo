Ext.define('module.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/goodsosttwork/get/detail1.do",
			update	: _global.location.http() + "/stock/goodsosttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});