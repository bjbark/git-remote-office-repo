Ext.define('module.custom.hantop.prod.order.prodorder.store.ProdOrderMaster', { extend:'Axt.data.Store',
	model: 'module.custom.hantop.prod.order.prodorder.model.ProdOrderMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/get/search.do",
//			update: _global.api_host_info + "/system/custom/hntop/prod/order/prodorder/set/cofmcancel.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
