Ext.define('module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail2',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/get/cofmdetail3_2.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
