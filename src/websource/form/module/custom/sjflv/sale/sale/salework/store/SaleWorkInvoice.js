Ext.define('module.custom.sjflv.sale.sale.salework.store.SaleWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.sale.salework.model.SaleWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/get/invoice.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/sale/salework/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
