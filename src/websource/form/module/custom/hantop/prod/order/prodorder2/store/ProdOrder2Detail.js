Ext.define('module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
