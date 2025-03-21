Ext.define('module.custom.iypkg.sale.order.slorlist2.store.SlorList2', { extend:'Axt.data.Store',
	model    : 'module.custom.iypkg.sale.order.slorlist2.model.SlorList2',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy    : {
		api  : {
			read   : _global.api_host_info + "/system/custom/iypkg/sale/order/slorlist2/get/search.do",
		},
		actionMethods: {
			read   : 'POST'
		},
		extraParams:{
			token : _global.token_id
		}
	}
});

