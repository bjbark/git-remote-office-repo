Ext.define('module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail4', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail4',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/get/cutplan2.do",
//			update : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/set/detail4.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
