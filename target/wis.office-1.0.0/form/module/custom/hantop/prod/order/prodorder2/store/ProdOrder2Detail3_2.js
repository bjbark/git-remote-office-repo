Ext.define('module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3_2', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail3_2',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/get/detail3.do",
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
