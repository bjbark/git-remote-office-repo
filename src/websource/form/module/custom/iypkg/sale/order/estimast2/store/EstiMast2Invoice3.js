Ext.define('module.custom.iypkg.sale.order.estimast2.store.EstiMast2Invoice3', { extend:'Axt.data.Store',
	model: 'module.custom.iypkg.sale.order.estimast2.model.EstiMast2Invoice3',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/iypkg/sale/order/estimast2/get/invoice3.do",
			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast2/set/invoice3.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
