Ext.define('module.stock.isos.goodsrettwork.store.GoodsRettWorkDetail', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkDetail',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/goodsrettwork/get/detail.do",
			update	: _global.location.http() + "/stock/goodsrettwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});