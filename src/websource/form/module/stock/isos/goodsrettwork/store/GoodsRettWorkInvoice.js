Ext.define('module.stock.isos.goodsrettwork.store.GoodsRettWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.stock.isos.goodsrettwork.model.GoodsRettWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/stock/goodsrettwork/get/invoice.do",
			update: _global.api_host_info + "/system/stock/goodsrettwork/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
