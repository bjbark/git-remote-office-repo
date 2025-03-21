Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1', { extend:'Axt.data.Store',
	model	: 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
	pageSize: 200,
	proxy	: {
		api	: {
			read : _global.location.http() + "/custom/sjflv/stock/goodsosttwork/get/detail1.do",
			update	: _global.location.http() + "/custom/sjflv/stock/goodsosttwork/set/record.do"
		},
		actionMethods	: { read: 'POST', update : 'POST' },
		extraParams		: { token : _global.token_id }
	}
});