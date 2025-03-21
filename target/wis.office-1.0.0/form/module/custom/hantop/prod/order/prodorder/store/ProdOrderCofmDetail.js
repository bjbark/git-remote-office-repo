Ext.define('module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/get/detail3.do",
			update : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/set/detail3.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
