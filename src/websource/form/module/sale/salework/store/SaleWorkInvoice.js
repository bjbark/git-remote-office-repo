Ext.define('module.sale.salework.store.SaleWorkInvoice', { extend:'Axt.data.Store',
	model: 'module.sale.salework.model.SaleWorkInvoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	proxy:{
		api:{
		   read  : _global.api_host_info + "/system/sale/salework/get/invoice.do",
		   update: _global.api_host_info + "/system/sale/salework/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});