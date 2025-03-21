Ext.define('module.custom.iypkg.sale.order.estimast1.store.EstiMast1Invoice', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast1.model.EstiMast1Invoice',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/get/invoice.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
