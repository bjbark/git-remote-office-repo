Ext.define('module.custom.sjflv.sale.order.estimast2.store.EstiMast2Master', { extend:'Axt.data.Store',
	model: 'module.custom.sjflv.sale.order.estimast2.model.EstiMast2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/sjflv/sale/order/estimast2/get/search.do",
			update: _global.api_host_info + "/system/custom/sjflv/sale/order/estimast2/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
