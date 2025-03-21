Ext.define('module.custom.sjflv.stock.isos.goodsosttwork.store.GoodsOsttWorkInvoiceTest', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/stock/goodsosttwork/test/get/invoiceTest.do",
			update: _global.api_host_info + "/system/custom/sjflv/stock/goodsosttwork/set/invoiceTest.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
