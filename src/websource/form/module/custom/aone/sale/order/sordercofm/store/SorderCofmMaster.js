Ext.define('module.custom.aone.sale.order.sordercofm.store.SorderCofmMaster', { extend:'Axt.data.Store',
	model: 'module.custom.aone.sale.order.sordercofm.model.SorderCofmMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/aone/sale/order/sordercofm/get/search.do",
			update: _global.api_host_info + "/system/custom/aone/sale/order/sordercofm/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
