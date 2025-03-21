Ext.define('module.custom.hjsys.stock.goodsosttwork.store.GoodsOsttWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.hjsys.stock.goodsosttwork.model.GoodsOsttWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hjsys/stock/goodsosttwork/get/invoice.do",
			update: _global.api_host_info + "/system/custom/hjsys/stock/goodsosttwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
