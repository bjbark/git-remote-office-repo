Ext.define('module.custom.kortc.sale.order.sordermast.store.SorderMastMaster', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sordermast.model.SorderMastMaster',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read  : _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/get/search.do",
			update: _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/set/invoice.do"
		},
		actionMethods: { read : 'POST', update : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
