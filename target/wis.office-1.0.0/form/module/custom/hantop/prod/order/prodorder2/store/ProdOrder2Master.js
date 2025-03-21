Ext.define('module.custom.hantop.prod.order.prodorder2.store.ProdOrder2Master', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder2.model.ProdOrder2Master',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder2/get/search.do",
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
