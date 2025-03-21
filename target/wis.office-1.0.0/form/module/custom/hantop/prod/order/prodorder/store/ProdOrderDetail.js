Ext.define('module.custom.hantop.prod.order.prodorder.store.ProdOrderDetail', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder.model.ProdOrderDetail',
	autoLoad: false,
	pageSize: 200,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
