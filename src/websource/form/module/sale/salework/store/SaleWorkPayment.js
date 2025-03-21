Ext.define('module.sale.salework.store.SaleWorkPayment', { extend:'Axt.data.Store',
	model: 'module.sale.salework.model.SaleWorkPayment',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
		   read  : _global.api_host_info + "/system/sale/salework/get/payment.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});