Ext.define('module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Detail3', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Detail4',
	autoLoad: false,
	pageSize: 100,
	remoteSort	: true,
	proxy:{
		api:{
			update : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/set/plan.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
