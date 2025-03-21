Ext.define('module.custom.iypkg.sale.order.saleorder.store.SaleOrderWkctCopy', { extend:'Axt.data.Store',
	model		: 'module.custom.iypkg.sale.order.saleorder.model.SaleOrderWkct',
	autoLoad	: false,
	remoteSort	: true,
	pageSize	: Const.SELECT.rows,
	proxy		: {
		api		: {
			read	: _global.api_host_info + "/system/custom/iypkg/sale/order/saleorder/get/wkctcopy.do",
		},
		actionMethods: {
			read	: 'POST',
			update	: 'POST'
		},
		extraParams:{
			token	: _global.token_id
		}
	}
});

