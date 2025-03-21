Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1Test', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
	pageSize: 100,
	proxy	: {
		api	: {
			read   : _global.location.http() + "/custom/sjflv/stock/goodsosttwork/get/master1Test.do",
//			update : _global.location.http() + "/custom/sjflv/stock/goodsosttwork/set/deleteMaster.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});
