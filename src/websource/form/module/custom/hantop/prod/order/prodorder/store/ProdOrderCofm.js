Ext.define('module.custom.hantop.prod.order.prodorder.store.ProdOrderCofm', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofm',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/get/cofm.do",
//			update: _global.api_host_info + "/system/custom/iypkg/sale/order/estimast1/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
