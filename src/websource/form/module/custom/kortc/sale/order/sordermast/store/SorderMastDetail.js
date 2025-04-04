Ext.define('module.custom.kortc.sale.order.sordermast.store.SorderMastDetail', { extend:'Axt.data.Store',
	model: 'module.custom.kortc.sale.order.sordermast.model.SorderMastDetail',
	autoLoad: false,
	pageSize: Const.SELECT.rows,
	remoteSort	: true,
	proxy:{
		api:{
			read : _global.api_host_info + "/system/custom/kortc/sale/order/sordermast/get/detail.do"
		},
		actionMethods: { read : 'POST' },
		extraParams:{
			token : _global.token_id
		}
	}
});
