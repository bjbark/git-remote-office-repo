Ext.define('module.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/stock/goodsosttwork/get/invoice.do",
			update: _global.api_host_info + "/system/stock/goodsosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
