Ext.define('module.prod.order.lotchange.store.LotChangeInvoice', { extend:'Axt.data.Store',
	model: 'module.prod.order.lotchange.model.LotChangeInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/sale/order/lotchange/get/invoice.do",
			update: _global.api_host_info + "/system/sale/order/lotchange/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
