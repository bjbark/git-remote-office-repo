Ext.define('module.custom.kortc.prod.order.prodnotlist.store.ProdNotListLister', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.prod.order.prodnotlist.model.ProdNotListLister',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/prod/order/prodnotlist/get/lister.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
