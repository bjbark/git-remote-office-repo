Ext.define('module.stock.isos.goodsrettwork.store.GoodsRettWorkMaster', { extend:'Axt.data.Store',
	model	: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkMaster',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/stock/goodsrettwork/get/master.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});